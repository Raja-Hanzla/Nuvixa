export interface GitParam {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface GitScenario {
  id: string;
  label: string;
  category: string;
  description: string;
  params: GitParam[];
  build: (values: Record<string, string>) => string;
  note?: string;
}

function val(values: Record<string, string>, key: string, fallback: string): string {
  const raw = values[key];
  return raw && raw.trim() ? raw.trim() : fallback;
}

export const gitScenarios: GitScenario[] = [
  {
    id: "undo-soft",
    label: "Undo last commit, keep changes staged",
    category: "Undo & reset",
    description: "Removes the last commit but leaves its changes staged, ready to re-commit.",
    params: [],
    build: () => "git reset --soft HEAD~1",
  },
  {
    id: "undo-mixed",
    label: "Undo last commit, keep changes unstaged",
    category: "Undo & reset",
    description: "Removes the last commit and unstages its changes — they stay in your working directory.",
    params: [],
    build: () => "git reset HEAD~1",
  },
  {
    id: "undo-hard",
    label: "Undo last commit, discard changes completely",
    category: "Undo & reset",
    description: "Removes the last commit and its changes entirely. This can't be undone once run.",
    params: [],
    build: () => "git reset --hard HEAD~1",
  },
  {
    id: "amend-message",
    label: "Amend the last commit's message",
    category: "Undo & reset",
    description: "Rewrites the message on your most recent commit without changing its content.",
    params: [{ key: "message", label: "New commit message", placeholder: "fix: correct typo", defaultValue: "fix: correct typo" }],
    build: (v) => `git commit --amend -m "${val(v, "message", "fix: correct typo")}"`,
  },
  {
    id: "unstage-file",
    label: "Unstage a file",
    category: "Undo & reset",
    description: "Removes a file from the staging area without touching its contents.",
    params: [{ key: "file", label: "File path", placeholder: "src/index.ts", defaultValue: "src/index.ts" }],
    build: (v) => `git restore --staged ${val(v, "file", "src/index.ts")}`,
  },
  {
    id: "discard-file",
    label: "Discard uncommitted changes to a file",
    category: "Undo & reset",
    description: "Reverts a single file back to its last committed state.",
    params: [{ key: "file", label: "File path", placeholder: "src/index.ts", defaultValue: "src/index.ts" }],
    build: (v) => `git restore ${val(v, "file", "src/index.ts")}`,
  },
  {
    id: "discard-all",
    label: "Discard all local changes",
    category: "Undo & reset",
    description: "Resets tracked files and removes untracked files and directories. Irreversible.",
    params: [],
    build: () => "git reset --hard\ngit clean -fd",
  },
  {
    id: "stash-push",
    label: "Stash current changes",
    category: "Staging & stash",
    description: "Sets aside uncommitted changes so you can switch branches with a clean working directory.",
    params: [{ key: "message", label: "Stash message (optional)", placeholder: "WIP on login form", defaultValue: "WIP" }],
    build: (v) => `git stash push -m "${val(v, "message", "WIP")}"`,
  },
  {
    id: "stash-pop",
    label: "Apply the most recent stash",
    category: "Staging & stash",
    description: "Re-applies your latest stashed changes and removes them from the stash list.",
    params: [],
    build: () => "git stash pop",
  },
  {
    id: "remove-cached",
    label: "Remove a file from Git but keep it locally",
    category: "Staging & stash",
    description: "Stops tracking a file — useful for something that should have been in .gitignore. The file stays on disk.",
    params: [{ key: "file", label: "File path", placeholder: ".env", defaultValue: ".env" }],
    build: (v) => `git rm --cached ${val(v, "file", ".env")}`,
    note: "Add the file to .gitignore afterward so it doesn't get re-tracked next commit.",
  },
  {
    id: "new-branch",
    label: "Create and switch to a new branch",
    category: "Branches",
    description: "Creates a branch off your current one and checks it out immediately.",
    params: [{ key: "branch", label: "New branch name", placeholder: "feature/login-form", defaultValue: "feature/login-form" }],
    build: (v) => `git checkout -b ${val(v, "branch", "feature/login-form")}`,
  },
  {
    id: "rename-branch",
    label: "Rename the current branch",
    category: "Branches",
    description: "Renames the branch you're currently on, locally.",
    params: [{ key: "branch", label: "New branch name", placeholder: "feature/login-form", defaultValue: "feature/login-form" }],
    build: (v) => `git branch -m ${val(v, "branch", "feature/login-form")}`,
  },
  {
    id: "delete-local-branch",
    label: "Delete a local branch",
    category: "Branches",
    description: "Deletes a branch on your machine. Git will refuse if it has unmerged changes.",
    params: [{ key: "branch", label: "Branch name", placeholder: "old-feature", defaultValue: "old-feature" }],
    build: (v) => `git branch -d ${val(v, "branch", "old-feature")}`,
  },
  {
    id: "delete-remote-branch",
    label: "Delete a remote branch",
    category: "Branches",
    description: "Deletes a branch on the remote (e.g. GitHub) — doesn't touch your local copy.",
    params: [
      { key: "remote", label: "Remote name", placeholder: "origin", defaultValue: "origin" },
      { key: "branch", label: "Branch name", placeholder: "old-feature", defaultValue: "old-feature" },
    ],
    build: (v) => `git push ${val(v, "remote", "origin")} --delete ${val(v, "branch", "old-feature")}`,
  },
  {
    id: "set-upstream",
    label: "Set the upstream branch for push/pull",
    category: "Branches",
    description: "Links your current local branch to a remote branch so plain git push/pull work.",
    params: [
      { key: "remote", label: "Remote name", placeholder: "origin", defaultValue: "origin" },
      { key: "branch", label: "Remote branch name", placeholder: "main", defaultValue: "main" },
    ],
    build: (v) => `git branch --set-upstream-to=${val(v, "remote", "origin")}/${val(v, "branch", "main")}`,
  },
  {
    id: "squash-commits",
    label: "Squash the last N commits into one",
    category: "History & remote",
    description: "Combines your most recent commits into a single commit with a new message.",
    params: [
      { key: "count", label: "Number of commits", placeholder: "3", defaultValue: "3" },
      { key: "message", label: "New commit message", placeholder: "feat: add login form", defaultValue: "feat: add login form" },
    ],
    build: (v) => `git reset --soft HEAD~${val(v, "count", "3")}\ngit commit -m "${val(v, "message", "feat: add login form")}"`,
  },
  {
    id: "revert-commit",
    label: "Revert a specific commit",
    category: "History & remote",
    description: "Creates a new commit that undoes the changes from an earlier one — safe for shared branches.",
    params: [{ key: "hash", label: "Commit hash", placeholder: "a1b2c3d", defaultValue: "a1b2c3d" }],
    build: (v) => `git revert ${val(v, "hash", "a1b2c3d")}`,
  },
  {
    id: "force-push-safe",
    label: "Force-push safely",
    category: "History & remote",
    description: "Overwrites the remote branch with yours, but aborts if someone else pushed in the meantime.",
    params: [
      { key: "remote", label: "Remote name", placeholder: "origin", defaultValue: "origin" },
      { key: "branch", label: "Branch name", placeholder: "feature/login-form", defaultValue: "feature/login-form" },
    ],
    build: (v) => `git push --force-with-lease ${val(v, "remote", "origin")} ${val(v, "branch", "feature/login-form")}`,
  },
  {
    id: "tag-release",
    label: "Tag the current commit and push it",
    category: "History & remote",
    description: "Creates an annotated tag (e.g. for a release) and pushes it to the remote.",
    params: [
      { key: "tag", label: "Tag name", placeholder: "v1.2.0", defaultValue: "v1.2.0" },
      { key: "message", label: "Tag message", placeholder: "Release 1.2.0", defaultValue: "Release 1.2.0" },
      { key: "remote", label: "Remote name", placeholder: "origin", defaultValue: "origin" },
    ],
    build: (v) =>
      `git tag -a ${val(v, "tag", "v1.2.0")} -m "${val(v, "message", "Release 1.2.0")}"\ngit push ${val(v, "remote", "origin")} ${val(v, "tag", "v1.2.0")}`,
  },
  {
    id: "change-remote-url",
    label: "Change a remote's URL",
    category: "History & remote",
    description: "Points an existing remote at a different URL — useful after a repo transfer or provider switch.",
    params: [
      { key: "remote", label: "Remote name", placeholder: "origin", defaultValue: "origin" },
      { key: "url", label: "New URL", placeholder: "git@github.com:user/repo.git", defaultValue: "git@github.com:user/repo.git" },
    ],
    build: (v) => `git remote set-url ${val(v, "remote", "origin")} ${val(v, "url", "git@github.com:user/repo.git")}`,
  },
  {
    id: "log-oneline",
    label: "View commit history, one line per commit",
    category: "History & remote",
    description: "A compact, graph-annotated view of recent history — easier to scan than the default log.",
    params: [{ key: "count", label: "Number of commits", placeholder: "10", defaultValue: "10" }],
    build: (v) => `git log --oneline --graph --decorate -${val(v, "count", "10")}`,
  },
  {
    id: "clone-single-branch",
    label: "Clone only a specific branch",
    category: "History & remote",
    description: "Clones a repo shallowly, fetching just one branch's history instead of the whole thing.",
    params: [
      { key: "branch", label: "Branch name", placeholder: "main", defaultValue: "main" },
      { key: "url", label: "Repository URL", placeholder: "git@github.com:user/repo.git", defaultValue: "git@github.com:user/repo.git" },
    ],
    build: (v) => `git clone --branch ${val(v, "branch", "main")} --single-branch ${val(v, "url", "git@github.com:user/repo.git")}`,
  },
];

export const gitScenarioCategories: string[] = Array.from(new Set(gitScenarios.map((s) => s.category)));
