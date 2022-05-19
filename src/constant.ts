export enum Command { // 命令
  WARN_TOAST = 'WARN_TOAST',
  GITHUB = 'yapi.github',
  LOGOUT = 'yapi.logout',
  REFRESH = 'yapi.refresh',
  DOWNLOAD_EXTENSION = 'yapi.download.extension',
  INSERT_TYPE = 'yapi.insert.type', // 注入类型
  FIX_ALL = 'yapi.fixall', // 修复所有
}

export enum MsgType { // 消息类型
  /** slidebar和vscode通信 */
  COMMAND = 'COMMAND',
  LOGIN_STATUS = 'LOGIN_STATUS',
  LOGIN_NOW = 'LOGIN_NOW',
  FETCH_GROUP = 'FETCH_GROUP',
  FETCH_PROJECT = 'FETCH_PROJECT',
  FETCH_DIR = 'FETCH_DIR',
  FETCH_ITEM = 'FETCH_ITEM',
  FETCH_DETAIL = 'FETCH_DETAIL',
  WEBVIEW_DONE = 'WEBVIEW_DONE',
  SERVER_URL = 'SERVER_URL',
  FRESH_DATA = 'FRESH_DATA',
  /** panel和vscode通信 */
  PANEL_KEY_CHANGE = 'PANEL_KEY_CHANGE',
  FETCH_CURRENT_KEY = 'FETCH_CURRENT_KEY',
  /** LSP和client通信 */
  FIX_ALL = 'FIX_ALL',
  /** 获取API文件 */
  API_FILE_HANDLER = 'API_FILE_HANDLER',
  /** 导航到文件 */
  OPEN_FILE = 'OPEN_FILE',
  LSP_DONE = 'LSP_DONE',
}

export enum SideBarView { // 左侧栏
  YAPI_VIEW = 'yapi.view',
}

export enum ContextEnum { // 上下文
  SHOW_TREE_VIEW = 'tree.view.show',
}

export enum StorageType { // 储存类型
  USER_INFO = 'userInfo',
  LOGIN_INFO = 'loginInfo',
  COOKIE = 'cookie',
  DATA_GROUP = 'DATA_GROUP',
  DATA_PROJECT = 'DATA_PROJECT',
  DATA_DIR = 'DATA_DIR',
  DATA_ITEM = 'DATA_ITEM',
  SERVER_URL = 'SERVER_URL',
  API_DETAIL = 'API_DETAIL',
  LOGIN_STAMP = 'LOGIN_STAMP',
  LAST_CHECKVERSION_STAMP = 'LAST_CHECKVERSION_STAMP', // 上次检查更新的时间
  WEBVIEW_DONE = 'WEBVIEW_DONE',
  API_TYPE_LIST = 'API_TYPE_LIST',
}

export const GIT_REMOTE_URL = 'http://git.hljnbw.cn/hui_xu/yapi-mate'

export const YapiResponseName = 'YapiResponse'

export const CHECK_VERSION_TIME_DUR = 1 * 3600 * 1e3 // 1小时检查一次更新

export const VERSION = '0.0.9' // 版本号，每次升级时需要修改

export const HLJ_YAPI_SERVER_URL = 'http://api.hljnbw.cn/'

export enum YAPI_RESPONSE_TYPE {
  RETURN = 'return',
  GENERIC = 'methodGeneric',
}
