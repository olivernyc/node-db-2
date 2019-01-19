import Octokit from "@octokit/rest";

const octokit = Octokit();

const OWNER = "olivernyc";
const REPO = "node-db-2";

/*
TODO:
  * Editing
  * Writing files
*/

export async function authenticate(token) {
  octokit.authenticate({ type: "oauth", token });
}

export async function fetchNodesApi() {
  const headCommit = await octokit.repos.getCommitRefSha({
    owner: OWNER,
    repo: REPO,
    ref: "master"
  });
  const { sha } = headCommit.data;
  const treeRes = await octokit.git.getTree({
    owner: OWNER,
    repo: REPO,
    tree_sha: sha,
    recursive: 1
  });
  const { tree } = treeRes.data;
  const nodeFiles = tree.filter(file => file.path.indexOf("data/nodes/") === 0);
  const nodes = nodeFiles.map(nodeFile => ({
    id: nodeFile.path.match(/\/(\d*).json/)[1],
    url: nodeFile.url
  }));
  return nodes;
}

export async function fetchNodeApi(node) {
  const res = await fetch(node.url, {
    headers: {
      Accept: "application/vnd.github.VERSION.raw"
    }
  });
  return await res.json();
}

async function updateNode(node) {
  // Commit file
}
