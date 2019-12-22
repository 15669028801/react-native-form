import XDate from "xdate";
import { itemStyle, borderItemStyles, crmItemStyle } from "./styles/styles";
import { detailsStyle } from "./styles/default-styles";
import { checkArrayEmpty } from "../../utils/commom";

export const formStyles = (type: "form" | "details" | "borderform" | "crmform") => {
  let styles = null;
  switch (type) {
    case "form":
      styles = itemStyle;
      break;
    case "details":
      styles = detailsStyle;
      break;
    case "borderform":
      styles = borderItemStyles;
      break;
      case "crmform":
        styles = crmItemStyle;
        break;
    default:
      styles = itemStyle;
      break;
  }
  return styles;
};

/**
 * 验证是否是浮点数
 * @param str 验证字段
 */
export function checkFloat(str: string): boolean {
  return /^(-?\d+)(\.)?(\d+)?$/.test(str);
}

/**
 * 对象深拷贝
 * @param {} obj 需要拷贝的对象
 */
export function deepClone(obj: any): any {
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        result[key] = deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 返回阴影
 * @param elevation 安卓阴影
 * @param shadowOffset 偏移量
 * @param shadowOpacity 不透明度
 * @param shadowRadius 模糊半径
 * @param shadowColor 阴影色
 */
// tslint:disable-next-line: max-line-length
export const shadow = (elevation, shadowOffsetwidth, shadowOffsetheight, shadowOpacity, shadowRadius, shadowColor ) => ({
  shadowColor,
  shadowOffset: {width: shadowOffsetwidth, height: shadowOffsetheight},
  shadowOpacity,
  shadowRadius,
  elevation,
});

/**
 * 根据公式计算 对应值
 * @param formulaArr 公式数组
 * @param varSet 变量
 */
export function formulaCompute( formulaArr, varSet) {
  let formulaStr = "";

  // 1.将所有对象替换成字符串变量`${}`格式字符串
  for (let i = 0; i < formulaArr.length; i++) {
  const item = formulaArr[i];
  if (typeof(item) === "object") {
      formulaArr[i] = `\${${item.code}}`;
    }
  }
  // 2.将数组转换成string
  formulaStr = formulaArr.join("");
  formulaStr = formulaStr.replace(/＋/g, "+")
  .replace(/－/g, "-")
  .replace(/×/g, "*")
  .replace(/÷/g, "/");

  // 3.正则查找所有变量
  const myVarArr = formulaStr.match(/\$\{.*?\}/g);

  // 4.变量替换成常量
  myVarArr.map((item) => {
    const key = item.substring(2, item.length - 1);
    formulaStr = formulaStr.replace(item, varSet[key]);
  });
  // 5.转换计算
  try {
    // tslint:disable-next-line: no-eval
    return eval(formulaStr);
  } catch (error) {
    return new Error("编辑的公式不符合计算法则，无法计算");
  }
}

/**
 * 尝试JSON对象，返回JSON后对象
 * @param str any
 */
export const tryJSON = (str: any) => {
  if (typeof str === "string") {
    try {
      const res = JSON.parse(str);
      return typeof(res) === "number" ? str : res;
    } catch (error) {
      return str;
    }
  } else {
    return str;
  }
};

/**
 * 处理审批流程数据
 * @param list 流程数据
 */
export function processFlowData(list) {
  const res = [];
  const len = list.length;
  for (let i = 0; i < len; i++) {
    const row = list[i];
    const nodeUser = list[i].properties.nodeUser || [];
    const rowList = [];
    const rowLen = nodeUser.length;
    if (rowLen === 0 && list[i].type === 1) {
      return false;
    }
    for (let j = 0; j < rowLen; j++) {
      const item = nodeUser[j];
      rowList.push({
        userId: item.userId || item.id,
        approvalType: row.properties.approvalType,
        type: row.type,
        nodeId: row.nodeId,
      });
    }
    res.push(rowList);
  }
  return res;
}

/**
 * 处理表单数据
 * @param list 表单数组
 */
export function processFormData(list: any[]) {
  let arr = [];
  const len = list.length;
  for (let i = 0; i < len; i++) {
    const item = list[i];
    const { childrenList } = item;
    if (childrenList) {
      const childLen = childrenList.length;
      arr.push(Object.assign(item, {approvalFormId: item.id}));
      for (let j = 0; j < childLen; j++) {
        const element = childrenList[j];
        const childform = processFormData(element);
        if (childform instanceof Array) {
          arr = arr.concat(childform);
        } else {
          return childform;
        }
      }
    } else {
      // 验证必填项是否填写
      const { content } = item;
      if ((content === "" || content === undefined || checkArrayEmpty(content)) && (item.permission === 0 && item.required === 1) ) {
        return item;
      }
      arr.push(Object.assign(item, {approvalFormId: item.id}));
    }
  }
  return arr;
}

/**
 * 提取时间区间
 * @param list 处理好的form数据
 */
export function extractTimeRange(list = [], workingTime) {
  const applyTimes = [];
  let leaveTypeId = null;
  list.map((item) => {
    const { content, controlType, type } = item;
    // 将时间单独处理
    if (controlType !== 0 && type === 9 && content) {
      if (item.attr.type === "halfday") {
        const { afternoon, forenoon } = workingTime;
        const startMoment = content[0].zones === "上午" ? forenoon[0] : forenoon[1];
        const endMoment = content[1].zones === "上午" ? afternoon[0] : afternoon[1];
        const startTime = `${content[0].day} ${startMoment}`;
        let endTime = `${content[1].day} ${endMoment}`;
        // 如果结束时刻小于开始时刻，则加一天（次日）
        if (getTimeMill(endMoment) <= getTimeMill(startMoment)) {
          endTime = new XDate(endTime).addDays(1).toString("yyyy-MM-dd HH:mm:ss");
        }
        applyTimes.push({
          beginTime: startTime,
          endTime,
        });
      } else {
        applyTimes.push({
          beginTime: content[0],
          endTime: content[1],
        });
      }
    }
    if (controlType === 1 && type === 3) {
      leaveTypeId = content;
    }
  });
  return { applyTimes, leaveTypeId};
}

/**
 * 将时间转毫秒
 * @param time 时间 “HH:mm:ss”
 */
export function getTimeMill(time: string): number {
  if (time) {
    const [ hour, minute, second] = time.split(":");
    return parseInt(hour, 0) * 3600 + parseInt(minute, 0) * 60 + Number(second);
  } else {
    return 0;
  }
}
