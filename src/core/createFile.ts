import * as vscode from 'vscode';
import * as path from 'path';

const createFile = async (content: string) => {
  const document = await vscode.workspace.openTextDocument({
    language: 'typescript',
    content,
  });
  vscode.window.showTextDocument(document);
};

export default createFile;
