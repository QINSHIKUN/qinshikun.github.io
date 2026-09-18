# CLAUDE.md — 个人主页 qinshikun.github.io

通用红线与记忆规则见 `C:\Users\shiku\.claude\CLAUDE.md`。本文件只讲这个仓库。

## 性质

**公开站点。** 远程 https://github.com/QINSHIKUN/qinshikun.github.io ，GitHub Pages。
往这里 push = 对外发布，落在全局红线三"不对外发送"里——**动手前先问 Jesse，由他决定是否推送**。

## 发布

`git pub "说明"`（全局别名：`add -A` → 有改动才 commit → `pull --rebase` → `push`），
或双击根目录 `publish.ps1`（本机文件，已被 .gitignore 排除）。

- 仓库设了 `pull.rebase=true` + `push.autoSetupRemote=true`。
- Jesse 有时直接在 GitHub 网页版改文件，**动手前先 `git fetch` 看本地是否落后**。
- `.git` 属主是另一个 Windows 账户 `CodexSandboxOffline`，不加 `safe.directory` 任何 git 命令都报
  dubious ownership。已写进全局 gitconfig，换仓库或重装可能复现。
- 推送后 Pages 重建要 1–2 分钟，`curl -sIL <文件URL>` 看 Content-Length 变没变。

## 只发 PDF 版简历

`pdf/CV_SHIKUN QIN.pdf`。`.docx` 等可编辑源已被 .gitignore 挡掉，**不要提交**——
这是公开仓库，传上去等于公开可编辑版简历。

推送前确认 `git status` 里没有本该被忽略的文件。

## 目录

`.claude\memory\`（会话记忆，开工自动加载）、`.claude\settings.local.json`（权限白名单 + autoMemoryDirectory）。
