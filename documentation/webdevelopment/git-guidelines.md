# GIT Branching Strategy

## Feature Branch

### Creating a feature branch [](https://nvie.com/posts/a-successful-git-branching-model/#creating-a-feature-branch)

When starting work on a new feature, branch off from the `preprod` branch.

```
$ git checkout -b myfeature preprod
Switched to a new branch "myfeature"
```

When pushing the branch to remote, add -u to track it:

```
git push -u origin branch
```

### Incorporating a finished feature on preprod [](https://nvie.com/posts/a-successful-git-branching-model/#incorporating-a-finished-feature-on-develop)

Finished features may be merged into the `preprod` branch to definitely add them to the upcoming release:

```
$ git checkout preprod
Switched to branch 'preprod'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin preprod
```

The `--no-ff` flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature.

### Release branches [](https://nvie.com/posts/a-successful-git-branching-model/#release-branches)

May branch off from: preprod
Must merge back into: `preprod` and `main`
Branch naming convention: release-\*

### Finishing a release branch [](https://nvie.com/posts/a-successful-git-branching-model/#finishing-a-release-branch)

When the state of the release branch is ready to become a real release, some actions need to be carried out. First, the release branch is merged into `main` (since every commit on `main` is a new release *by definition*, remember). Next, that commit on `main` must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into `preprod`, so that future releases also contain these bug fixes.

The first two steps in Git:

```
$ git checkout main
Switched to branch 'main'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2
```

The release is now done, and tagged for future reference.

To keep the changes made in the release branch, we need to merge those back into `preprod`, though. In Git:

```
$ git checkout preprod
Switched to branch 'preprod'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
```

This step may well lead to a merge conflict. If so, fix it and commit.

## Hotfix branches [¶](https://nvie.com/posts/a-successful-git-branching-model/#hotfix-branches)

May branch off from: main
Must merge back into: `preprod` and `main`
Branch naming convention: hotfix-\*

### Creating the hotfix branch

```
$ git checkout -b hotfix-1.2.1 main
Switched to a new branch "hotfix-1.2.1"
$ ./bump-version.sh 1.2.1
Files modified successfully, version bumped to 1.2.1.
$ git commit -a -m "Bumped version number to 1.2.1"
[hotfix-1.2.1 41e61bb] Bumped version number to 1.2.1
1 files changed, 1 insertions(+), 1 deletions(-)
```

Don’t forget to bump the version number after branching off!

Then, fix the bug and commit the fix in one or more separate commits.

```
$ git commit -m "Fixed severe production problem"
[hotfix-1.2.1 abbe5d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```

### Finishing a hotfix branch [](https://nvie.com/posts/a-successful-git-branching-model/#finishing-a-hotfix-branch)

When finished, the bugfix needs to be merged back into `main`, but also needs to be merged back into `main`, in order to safeguard that the bugfix is included in the next release as well. This is completely similar to how release branches are finished.

First, update `main` and tag the release.

```
$ git checkout main
Switched to branch 'main'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2.1
```

> Edit: You might as well want to use the `-s` or `-u <key>` flags to sign your tag cryptographically.

Next, include the bugfix in `preprod`, too:

```
$ git checkout preprod
Switched to branch 'preprod'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
```

The one exception to the rule here is that, when a release branch currently exists, the hotfix changes need to be merged into that release branch, instead of `preprod`. Back-merging the bugfix into the release branch will eventually result in the bugfix being merged into `develop` too, when the release branch is finished. (If work in `develop` immediately requires this bugfix and cannot wait for the release branch to be finished, you may safely merge the bugfix into `develop` now already as well.)

Finally, remove the temporary branch:

```
$ git branch -d hotfix-1.2.1
Deleted branch hotfix-1.2.1 (was abbe5d6).
```

https://nvie.com/posts/a-successful-git-branching-model/
