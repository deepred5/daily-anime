import * as vscode from 'vscode';
import { getHitokoto } from '../api';

export default function () {
  getHitokoto().then((res: any) => {
    const { hitokoto = '都是时臣的错', from='Fate' } = res;
    vscode.window.showInformationMessage(`${hitokoto} ---${from}`);
  });
}