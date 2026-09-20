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

## 简历：这里只有成品 PDF，源在别处（2026-09-19 起改 LaTeX）

```
源      C:\AI\work\me\简历\CV-en\cv.tex          ← 要改简历改这个，不在本仓库
构建    C:\AI\work\me\简历\CV-en\build.ps1        ← 编译并把 PDF 复制到下面这个路径
成品    pdf/CV_SHIKUN QIN.pdf                     ← index/experience/book 三个页面链它
```

**不要在本仓库里改简历**，这里的 PDF 是构建产物，手改会被下次构建覆盖。
源放在 `C:\AI` 私有仓库是因为本仓库公开，可编辑源传上去等于公开可编辑版简历；
PDF 放这里是因为三个页面用相对路径链它，成品必须物理在这个目录。
指路牌与改法见 `work\me\简历\README.md`。

**只发 PDF**：`.docx` / `.tex` 等可编辑源已被 .gitignore 挡掉，**不要提交**。
2026-09-19 之前的 Word 版已废弃，在 `.claude\_todelete\pdf\`。

流程：① 改 `cv.tex`；② 跑 `build.ps1`（它会把 PDF 送过来）；③ 提交并推送，
**推送＝公开发布，只有 Jesse 本人做**。推送前确认 `git status` 里没有本该被忽略的文件。

## 目录

`.claude\memory\`（会话记忆，开工自动加载）、`.claude\settings.local.json`（权限白名单 + autoMemoryDirectory）。
