import * as vscode from 'vscode';
import hitokoto from './command/hitokoto';
import anime from './command/anime';

export function activate(context: vscode.ExtensionContext) {

	let dailyAnimeCommand = vscode.commands.registerCommand('extension.dailyAnime', () => {
		anime(context);
	});

	let hitokotoCommand = vscode.commands.registerCommand('extension.hitokoto', hitokoto);

	context.subscriptions.push(dailyAnimeCommand);
	context.subscriptions.push(hitokotoCommand);
}

