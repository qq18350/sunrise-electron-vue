/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 10:35:24
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-03 09:03:50
 * @Description: element ui Dom元素操作工具
 */
import XEUtils from "xe-utils";
import { Message, Notification } from "element-ui";

let duration = 1500;

export default {
  /**
   * 树展开状态切换
   * @param {*} treeVNode 树对象，传入this.$refs['xxx']
   * @param {*} isExpand 是否展开
   */
  treeExpandSwitch(treeVNode, isExpand) {
    if (XEUtils.isBoolean(isExpand) && treeVNode.store) {
      let allVNode = treeVNode.store._getAllNodes();
      allVNode.forEach(vnode => {
        vnode.expanded = isExpand;
      });
    }
  },
  /**
   * 获取树所有的Key链，通过子节点的key集合
   * @param {*} treeVNode 树VNode对象
   * @param {*} keys 子节点的key集合
   * @param {*} keyStr key字符串
   */
  getTreeKeyChainsByCheckKey(treeVNode, keys, keyStr) {
    let keyChains = [];
    keys.forEach(value => {
      //获取key所对应的树链Node
      let nodeChain = treeVNode.getNode(value);
      let keyChain = [];
      //获取key链
      XEUtils.getTreeKeyChainByNodeChain(nodeChain, keyStr, keyChain);
      let item = Object.assign({}, nodeChain.data, {
        chain: keyChain,
        httpurl: !!nodeChain.data["httpurl"]
      });
      keyChains.push(item);
    });
    return keyChains;
  },
  /**
   * 获取树的Key链，通过节点链
   * @param {*} nodeChain 节点链
   * @param {*} keyStr key字符串
   * @param {*} keyChain 存放key链的容器
   */
  getTreeKeyChainByNodeChain(nodeChain, keyStr, keyChain) {
    if (Array.isArray(keyChain)) {
      if (nodeChain.data[keyStr]) keyChain.unshift(nodeChain.data);
      if (nodeChain.parent)
        XEUtils.getTreeKeyChainByNodeChain(nodeChain.parent, keyStr, keyChain);
    }
  },
  //系统级警告
  saySysWarn(message) {
    Notification({
      title: "警告",
      message: message,
      type: "warning",
      duration: duration
    });
  },
  //系统级消息
  saySysInfo(message) {
    Notification({
      title: "消息",
      message: message,
      type: "info",
      duration: duration
    });
  },
  //系统级成功
  saySysSuccess(message) {
    Notification({
      title: "成功",
      message: message,
      type: "success",
      duration: duration
    });
  },
  //系统级错误
  saySysError(message) {
    Notification({
      title: "错误",
      message: message,
      type: "error",
      duration: duration
    });
  },
  //操作级警告
  sayOpWarn(message) {
    Message({
      title: "警告",
      message: message,
      type: "warning",
      duration: duration
    });
  },
  //操作级消息
  sayOpInfo(message) {
    Message({
      title: "消息",
      message: message,
      type: "info",
      duration: duration
    });
  },
  //操作级成功
  sayOpSuccess(message) {
    Message({
      title: "成功",
      message: message,
      type: "success",
      duration: duration
    });
  },
  //操作级错误
  sayOpError(message) {
    Message({
      title: "错误",
      message: message,
      type: "error",
      duration: duration
    });
  },
  //表格字典列反显格式化
  tableColDictFormt(dictKey, key) {
    let result = key;
    if (dictKey && key) result = XEUtils.getDictSelectValue(dictKey, key);
    return result;
  },
  //表格时间列反显格式化
  tableColTimeFormt(row, column, cellValue, index){
    if(!cellValue)return null
    return XEUtils.toDateString(cellValue,'yyyy-MM-dd HH:mm:ss')
  }
};
