import * as vscode from 'vscode';
import * as path from 'path';

import Dove from '../utils/dove';
import { MsgType } from '../constant';

// import createFile from './createFile';

export class SlideBarWebview implements vscode.WebviewViewProvider {
  context: vscode.ExtensionContext
  dove: Dove | undefined
  onDidMount: any
  onUnMount: any
  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
    }
    webviewView.webview.html = this.render()
    /** 初始化通信增强能力 */
    const dove = new Dove((data: any) => {
      webviewView.webview.postMessage(data)
    })
    webviewView.webview.onDidReceiveMessage((e) => {
      dove.receiveMessage(e)
    })
    webviewView.onDidDispose(() => {
      this.onUnMount?.(this.dove!)
    })
    this.dove = dove
    this.onDidMount?.(this.dove!)
  }

  constructor(context: vscode.ExtensionContext) {
    this.context = context
  }

  freshAll() {
    this.dove?.sendMessage(MsgType.FRESH_DATA, '')
  }

  render() {
    const slideBarPath = vscode.Uri.file(path.join(this.context.extensionPath, 'dist', 'slideBar.js')).with({
      scheme: 'vscode-resource',
    })

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>webview</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script src="${slideBarPath}"></script>
    </html>`
  }
}
