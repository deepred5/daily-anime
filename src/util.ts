import * as vscode from 'vscode';

interface HtmlConfig {
  isChinese?: boolean;
  cssPath?: string;
  imgPath?: string;
  jsPath?: string;
  data?: {
    bangumi: Array<object>,
    hitokoto: object,
    isChinese: boolean
  };
}



function getSourchPath(path: string): object {
  const diskpath = vscode.Uri.file(path);

  return diskpath.with({ scheme: 'vscode-resource' });
}

function getLoadingContent(config: HtmlConfig): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${config.isChinese ? '每日番剧' : 'Daily Anime'}</title>
      <link rel="stylesheet" href="${config.cssPath}">
  </head>
  <body>
  <div class="loading-container">
    <div class="loading">
        <img src="${config.imgPath}" alt="loading">
        <h1>${config.isChinese ? '正在加载中...' : 'Loading...'}</h1>
    </div>
  </div>
    <script>
    </script>
  </body>
  </html>`;
}

function getWebviewContent(config: HtmlConfig): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${config.isChinese ? '每日番剧' : 'Daily Anime'}</title>
		<link rel="stylesheet" href="${config.cssPath}">
</head>
<body>
<div class="bangumi-containr">
    <header class="bangumi-header" id="bangumi-header">
      <h1>${config.isChinese ? '每日放送' : 'Daily Anime'}</h1>
      <span class="date" id="date"></span>
      <p class="hitokoto" id="hitokoto"></p>
    </header>
    <div class="bangumi-list-container">
      <ul class="anime-list" id="anime-list">
      </ul>
    </div>
	</div>
	<script>
		window.GLOBAL_DATA = ${JSON.stringify(config.data)};
	</script>
<script src="${config.jsPath}"></script>
</body>
</html>`;
}

function isChineseLanguage(): boolean {
  let language = (vscode.env.language || '').toLowerCase();

  return language === 'zh-cn' || language === 'zh-tw';
}


export { getSourchPath, getWebviewContent, getLoadingContent, isChineseLanguage };