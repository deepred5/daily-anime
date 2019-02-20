import * as vscode from 'vscode';
function getSourchPath(path: string) {
  const diskpath = vscode.Uri.file(path);

  return diskpath.with({ scheme: 'vscode-resource' });
}

function getLoadingContent(config: any) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>每日番剧</title>
      <link rel="stylesheet" href="${config.cssPath}">
  </head>
  <body>
  <div class="loading-container">
    <div class="loading">
        <img src="${config.imgPath}" alt="loading">
        <h1>正在加载中...</h1>
    </div>
  </div>
    <script>
    </script>
  </body>
  </html>`;
}

function getWebviewContent(config: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>每日番剧</title>
		<link rel="stylesheet" href="${config.cssPath}">
</head>
<body>
<div class="bangumi-containr">
    <header class="bangumi-header" id="bangumi-header">
      <h1>每日放送</h1>
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


export { getSourchPath, getWebviewContent, getLoadingContent };