import * as vscode from 'vscode';
import * as path from 'path';
import { getSourchPath, getWebviewContent, getLoadingContent } from './util';
import { getCalendar, getHitokoto } from './api';

export function activate(context: vscode.ExtensionContext) {

	let dailyAnimeCommand = vscode.commands.registerCommand('extension.dailyAnime', () => {

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
		const imgPath = getSourchPath(path.join(context.extensionPath, 'src/template/assets', 'loading.png'));

		panel.webview.html = getLoadingContent({ cssPath, imgPath });

		Promise.all([getCalendar(), getHitokoto('a')]).then(([bangumi, hitokoto]) => {
			panel.webview.html = getWebviewContent({ cssPath, jsPath, data: { bangumi, hitokoto } });
		});

	});

	let hitokotoCommand = vscode.commands.registerCommand('extension.hitokoto', () => {
		getHitokoto().then((res: any) => {
			const { hitokoto = '都是时臣的错' } = res;
			vscode.window.showInformationMessage(hitokoto);
		});
	});

	context.subscriptions.push(dailyAnimeCommand);
	context.subscriptions.push(hitokotoCommand);
}

