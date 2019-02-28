import * as vscode from 'vscode';
import * as path from 'path';
import { getSourchPath, getWebviewContent, getLoadingContent, isChineseLanguage } from '../util';
import { getCalendar, getHitokoto } from '../api';

export default function (context: vscode.ExtensionContext) {
  const isChinese = isChineseLanguage();

  const panel = vscode.window.createWebviewPanel(
    'dailyAnime',
    isChinese ? '每日番剧' : 'Daily Anime',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  const cssPath = getSourchPath(path.join(context.extensionPath, 'template/css', 'anime.css')).toString();
  const jsPath = getSourchPath(path.join(context.extensionPath, 'template/js', 'anime.js')).toString();
  const imgPath = getSourchPath(path.join(context.extensionPath, 'template/assets', 'loading.png')).toString();

  panel.webview.html = getLoadingContent({ cssPath, imgPath, isChinese });

  Promise.all([getCalendar(), getHitokoto('a')]).then(([bangumi, hitokoto]) => {
    panel.webview.html = getWebviewContent({ cssPath, jsPath, isChinese, data: { bangumi, hitokoto, isChinese } });
  });
}