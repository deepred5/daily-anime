import * as vscode from 'vscode';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.dailyAnime', () => {

		const panel = vscode.window.createWebviewPanel(
			'dailyAnime',
			'每日番剧',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		const onCssDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'src/template/css', 'anime.css')
		);

		const cssPath = onCssDiskPath.with({ scheme: 'vscode-resource' });

		const onJsDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'src/template/js', 'anime.js')
		);

		const jsPath = onJsDiskPath.with({ scheme: 'vscode-resource' });


		panel.webview.html = getWebviewContent({cssPath, jsPath});
	});

	context.subscriptions.push(disposable);
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
<p id="test"></p>
<script src="${config.jsPath}"></script>
</body>
</html>`;
}
