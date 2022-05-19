import request from './request';

import storage from '../../utils/storage';
import { StorageType } from '../../constant';
import { LOGIN_PATH } from './constant';
import { componseRequest } from '../../utils/componse';

const getUrl = (path: string) => {
  return storage.getStorage<string>(StorageType.SERVER_URL) + path;
};

/** 登录 */
export const login = (body: { email: string; password: string }): any =>
  request.post(getUrl(LOGIN_PATH), {
    data: body,
  });
/** 获取分组列表 */
export const getGroupList = () => request.get(getUrl('/api/group/list'));
/** 获取项目列表 */
export const getProject = (groupId: number) =>
  request.get(getUrl('/api/project/list'), {
    params: {
      group_id: groupId,
      page: 1,
      limit: 1000,
    },
  });
/** 获取文件夹列表 */
export const getDir = componseRequest(
  (dirId: number) =>
    request.get(getUrl('/api/project/get'), {
      params: {
        id: dirId,
      },
    }),
  600e3
); //合并请求10分钟
/** 获取item列表 */
export const getItemList = (itemId: number) =>
  request.get(getUrl('/api/interface/list_cat'), {
    params: {
      page: 1,
      limit: 1000,
      catid: itemId,
    },
  });
/** 获取接口详情 */
export const getApiDetail = componseRequest(
  (apiId: string) =>
    request.get(getUrl('/api/interface/get'), {
      params: {
        id: apiId,
      },
    }),
  300e3
); // 合并请求5分钟
/** 查找接口 */
export const searchApi = componseRequest(
  (path: string) =>
    request.get(getUrl('/api/project/search'), {
      params: {
        q: path,
      },
    }),
  600e3
); //合并请求10分钟
