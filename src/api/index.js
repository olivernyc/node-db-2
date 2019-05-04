import Octokit from "@octokit/rest";

const octokit = Octokit();

const OWNER = "olivernyc";
const REPO = "node-db-2";

/*
TODO:
  * Editing
*/

export async function fetchNodesApi() {
  return await fetchFile("data/nodes.json");
}

export async function fetchLinksApi() {
  return await fetchFile("data/links.json");
}

export async function fetchFile(path) {
  const contents = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO,
    path
  });
  return JSON.parse(atob(contents.data.content));
}

export async function authenticate(token) {
  octokit.authenticate({ type: "oauth", token });
}

export async function writeNodesApi(node, nodeFile) {
  console.log(node, nodeFile);
  await octokit.repos.updateFile({
    owner: OWNER,
    repo: REPO,
    path: `data/nodes/${node.id}.json`,
    message: `update node ${node.id}`,
    content: btoa(JSON.stringify(node, null, 2) + "\n"),
    sha: nodeFile.sha
  });
}
