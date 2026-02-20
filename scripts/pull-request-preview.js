import { execSync } from "child_process";

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf-8" }).toString();
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1].trim();
console.log("[DEPLOY_PREVIEW]: END");

console.log("[GITHUB_COMMENT]: START");
const { GITHUB_REPOSITORY, GITHUB_PULL_REQUEST_NUMBER, GITHUB_TOKEN } =
  process.env;
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`;

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: `token ${GITHUB_TOKEN}`,
  accept:
    "application/vnd.github.v3+json; application/vnd.github.antiope-preview+json",
};

fetch(
  `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${GITHUB_PULL_REQUEST_NUMBER}/comments`,
  {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      body: GH_COMMENT,
    }),
  },
)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error(
      `Failed to post comment: ${response.status} ${response.statusText}`,
    );
  })
  .catch((error) => {
    console.log("[GITHUB_COMMENT]: ERROR");
    throw new Error(`Error posting comment: ${error.message}`);
  })
  .finally(() => {
    console.log("[GITHUB_COMMENT]: FINISHED");
  });
