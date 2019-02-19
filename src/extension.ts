import * as vscode from 'vscode';
import * as path from 'path';
import { getSourchPath, getWebviewContent, getLoadingContent } from './util';
import { getCalendar, getHitokoto } from './api';

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

		const cssPath = getSourchPath(path.join(context.extensionPath, 'src/template/css', 'anime.css'));
		const jsPath = getSourchPath(path.join(context.extensionPath, 'src/template/js', 'anime.js'));

		panel.webview.html = getLoadingContent({cssPath});

		Promise.all([getCalendar(), getHitokoto()]).then(([bangumi, hitokoto]) => {
			panel.webview.html = getWebviewContent({ cssPath, jsPath, data: { bangumi, hitokoto } });
		});

	});

	context.subscriptions.push(disposable);
}

