import { defineConfig } from "hoks";

export default defineConfig({
  include: [],
  installOnLockChange: true,
  branchName: {
    pattern: "^(feature/.+|bugfix/.+|hotfix/.+|release/.+|main|develop)$",
    message:
      "Branch name must start with 'feature/', 'bugfix/', 'hotfix/', 'release/'",
  },
  commitMessage: false,
  preCommit: ["npm run test"],
  staged: {
    "*": "npm run format",
    "*.{ts,js}": "npm run lint",
  },
  preventCommit: false,
  syncBeforePush: false,
  enforceConventionalCommits: false,
  noTodos: false,
  testChanged: false,
});
