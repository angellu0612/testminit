/*
 * @Author: your name
 * @Date: 2021-08-12 11:09:32
 * @LastEditTime: 2021-08-25 11:13:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /template/src/utils/tree.js
 */
import { isArray } from './type';

// 构建树结构
export function createTree(decider, data, parent) {
  const [list, rest] = collector(decider, data, parent);
  if (!rest.length) return list;
  return list.map(({ ...item }) => {
    const children = createTree(decider, rest, item);
    if (children.length) item.children = children;
    return item;
  });
}

// 扁平树结构
export function flatTree(walker, data, parent, level = 1) {
  return data.reduce((arr, item) => {
    const value = walker(item, parent, level);
    arr.push(value);
    if (isArray(item.children)) {
      arr.push(...flatTree(walker, item.children, value, level + 1));
    }
    return arr;
  }, []);
}

const collector = (decider, data, parent) =>
  data.reduce(
    (arr, item) => {
      const bool = decider(item, parent);
      arr[+!bool].push(item);
      return arr;
    },
    [[], []]
  );

// 从树结构中找到目标节点
export const findNode = (decider, data) =>
  data.reduce((target, item) => {
    if (target) return target;
    if (decider(item)) return item;
    const hasChild = !!item.children?.length;
    if (hasChild) return findNode(decider, item.children);
    return target;
  }, undefined);

const walkParent = (path, decider, list) =>
  isArray(list) &&
  list.some(item => {
    if (decider(item)) return true;
    path.push(item);
    const isTarget = walkParent(path, decider, item.children);
    if (!isTarget) path.pop();
    return isTarget;
  });

// 获取树结构的父节点元素列表
export const getParentsFromTree = (decider, data) => {
  const list = [];
  walkParent(list, decider, data);
  return list;
};

// 遍历树结构数据
export const walkTree = (transfer, data = []) =>
  data.map(({ children, ...node }) => {
    const newNode = transfer(node);
    if (isArray(children)) newNode.children = walkTree(transfer, children);
    return newNode;
  });

// 剪切掉只有一个子节点的节点，并用子节点取而代之
export const cutNodeOfOneSon = menu => {
  if (!Array.isArray(menu)) return menu;
  // 保存剪切之后的路由树
  const res = [];
  menu.forEach(val => {
    if (val.children) {
      let cur = JSON.parse(JSON.stringify(val));
      // 若子节点数量为1时，用子节点顶替掉当前节点，重复此步骤，直到子节点数量不为1
      while (cur.children?.length === 1) {
        // 是否使用父节点图标
        const icon = cur.children[0].icon || cur.icon;
        cur = { ...cur.children[0], icon };
      }
      // 递归剪切子树
      cur.children = cutNodeOfOneSon(cur.children);
      res.push(cur);
    } else {
      res.push(val);
    }
  });
  return res;
};
