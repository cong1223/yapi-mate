import * as vscode from 'vscode'
import * as path from 'path'

import { SlideBarWebview } from './webviewTemplate'
import Dove from '../utils/dove'
import { Command, MsgType, ContextEnum, StorageType } from '../constant'
import login from '../service/login'
import { getGroupList, getProject, getDir, getItemList, getApiDetail } from '../service/api'
import storage from '../utils/storage'
import createFile from './createFile'
import { data2Type } from '../webview/utils/yapiData2type'

export const getSlideBarWebview = (context: vscode.ExtensionContext) => {
  const wv = new SlideBarWebview(context)
  const gatherKey: Symbol[] = []
  wv.onDidMount = (dove: Dove) => {
    // 注册消息监听
    gatherKey.push(
      // 监听命令类型
      dove.subscribe(MsgType.COMMAND, ({ command, data }) => {
        vscode.commands.executeCommand(command, data)
      }),
      // serverUrl变化
      dove.subscribe(MsgType.SERVER_URL, (serverUrl) => {
        try {
          const { origin } = new URL(serverUrl)
          storage.setStorage(StorageType.SERVER_URL, origin)
        } catch (e) {
          storage.setStorage(StorageType.SERVER_URL, '')
        }
      }),
      // 监听登录类型
      dove.subscribe(MsgType.LOGIN_NOW, ({ username, password }) => {
        return login(username, password)
          .then((res) => {
            if (res.success) {
              // 储存登录信息
              storage.setStorage(StorageType.LOGIN_INFO, {
                username,
                password,
              })
              storage.setStorage(StorageType.USER_INFO, res.data?.userInfo)
              // 切换webview
              vscode.commands.executeCommand('setContext', ContextEnum.SHOW_TREE_VIEW, true)
              // 设置是否可以接收
              if (storage.getStorage(StorageType.WEBVIEW_DONE)) {
                const apiTypeList = storage.getStorage(StorageType.API_TYPE_LIST)
                dove.sendMessage(MsgType.API_FILE_HANDLER, apiTypeList)
              }
              return true
            } else {
              vscode.commands.executeCommand(Command.WARN_TOAST, res.msg)
              return false
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }),
      // 监听是否webview加载完成
      dove.subscribe(MsgType.WEBVIEW_DONE, () => {
        console.log('webview loaded')

        // 判断当前是否登录
        const isLogin = Boolean(storage.getStorage(StorageType.USER_INFO))
        dove.sendMessage(MsgType.LOGIN_STATUS, isLogin)
        /** 设置导航栏中的menu */
        vscode.commands.executeCommand('setContext', ContextEnum.SHOW_TREE_VIEW, isLogin)
        // 设置是否可以接收
        if (isLogin) {
          const apiTypeList = storage.getStorage(StorageType.API_TYPE_LIST)
          dove.sendMessage(MsgType.API_FILE_HANDLER, apiTypeList)
        }
        // 加载完毕
        storage.setStorage(StorageType.WEBVIEW_DONE, true)
      }),
      // 监听webview主动获取组
      dove.subscribe(MsgType.FETCH_GROUP, async (params: { needFresh: boolean }) => {
        const groupData = params.needFresh ? null : storage.getStorage(StorageType.DATA_GROUP)

        if (!groupData) {
          const { data } = await getGroupList()
          storage.setStorage(StorageType.DATA_GROUP, data)
          return data
        } else {
          return groupData
        }
      }),
      // 获取yapi项目文件夹
      dove.subscribe(MsgType.FETCH_PROJECT, async (params: { needFresh: boolean; groupId: number }) => {
        const projectData = params.needFresh
          ? null
          : storage.getStorage(`${StorageType.DATA_PROJECT}_${params.groupId}`)
        if (!projectData) {
          const { data }: any = await getProject(params.groupId)
          storage.setStorage(`${StorageType.DATA_PROJECT}_${params.groupId}`, data)
          return data
        } else {
          return projectData
        }
      }),
      // 获取yapi文件夹
      dove.subscribe(MsgType.FETCH_DIR, async (params: { needFresh: boolean; dirId: number }) => {
        const dirData = params.needFresh ? null : storage.getStorage(`${StorageType.DATA_DIR}_${params.dirId}`)

        if (!dirData) {
          const { data }: any = await getDir(params.dirId)
          storage.setStorage(`${StorageType.DATA_DIR}_${params.dirId}`, data)
          return data
        } else {
          return dirData
        }
      }),
      // 获取item数据
      dove.subscribe(MsgType.FETCH_ITEM, async (params: { needFresh: boolean; itemId: number }) => {
        const itemData = params.needFresh ? null : storage.getStorage(`${StorageType.DATA_ITEM}_${params.itemId}`)

        if (!itemData) {
          const { data }: any = await getItemList(params.itemId)
          storage.setStorage(
            `${StorageType.DATA_ITEM}_${params.itemId}`,
            data || {
              count: 0,
              total: 0,
              list: [],
            },
          )
          return data
        } else {
          return itemData
        }
      }),
      // 获取详情数据
      dove.subscribe(MsgType.FETCH_DETAIL, async ({ id, title, subTitle }) => {
        const { data }: any = await getApiDetail(id).catch((e: any) => {
          console.log('请求失败')
          vscode.commands.executeCommand(Command.WARN_TOAST, e?.toString())
          return {
            data: null,
          }
        })
        if (data) {
          const tsData = data2Type(data)
          createFile([tsData.reqQueryType, tsData.reqBodyType, tsData.resBodyType].filter(Boolean).join('\n'))
        }
      }),
      // 打开指定文件
      dove.subscribe(MsgType.OPEN_FILE, async (data) => {
        if (data) {
          openLocalFile(data?.replace('file://', ''))
        }
      }),
    )
  }
  wv.onUnMount = (dove: Dove) => {
    // 卸载消息监听
    console.log('卸载消息')
    storage.setStorage(StorageType.WEBVIEW_DONE, false)
    gatherKey.map((key) => {
      dove.unSubscribe(key)
    })
  }
  return wv
}

export function openLocalFile(filePath: string) {
  // 获取TextDocument对象
  vscode.workspace
    .openTextDocument(filePath)
    .then(
      (doc) => {
        // 在VSCode编辑窗口展示读取到的文本
        vscode.window.showTextDocument(doc)
      },
      (err) => {
        console.log(`Open ${filePath} error, ${err}.`)
      },
    )
    .then(undefined, (err) => {
      console.log(`Open ${filePath} error, ${err}.`)
    })
}
