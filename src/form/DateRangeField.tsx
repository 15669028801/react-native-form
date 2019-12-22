import React, { Component } from "react";
import { View } from "react-native";
import XDate from "xdate";

import { formStyles, getTimeMill } from "../utils";
import DateField from "./DateField";
import Item from "./Item";

export interface IProps {
  label: string;
  title?: string;
  required?: boolean;
  props?: any;
  computed?: boolean; // 自动计算时长
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: [string | {day: "string", zones: "上午" | "下午" }, string | {day: "string", zones: "上午" | "下午" }];
  interval?: boolean; // 是否有间距
  type?: "date" | "datetime" | "halfday" ;
  styleType?: "form" | "details" | "borderform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  controlType?: number; // 套件类型
  onValueChange?: (val, prosp) => void;
  onDurationChange?: (time, prosp) => void; // 时长改变时间（因时长计算为异步，需单独回调）
  duration?: string; // 时长
  workingTime?: {
    forenoon: [string, string];
    afternoon: [string, string];
  }
}

/**
 * 日期区间
 */
export default class DateRangeField extends Component<IProps, any> {
  public static defaultProps = {
    workingTime: {
      forenoon: ["09:00:00", "12:00:00"],
      afternoon: ["14:00:00", "18:00:00"],
    },
  };
  constructor( props: IProps ) {
    super(props);
    this.state = {
      visible: false,
      myvalue: props.defaultValue || [],
      diffDays: "",
    };
    this.onChange = this.onChange.bind(this);
    this.computeTitle = this.computeTitle.bind(this);
    this.computeDuration = this.computeDuration.bind(this);
    this._onValueChange = this._onValueChange.bind(this);
  }
  public componentWillReceiveProps(props, state) {
    if (props.defaultValue !== state.myvalue) {
      state.myvalue = props.defaultValue;
      this.setState({myvalue: props.defaultValue}, () => {
        this.computeDuration(false);
      });
    }
    if (props.type !== this.props.type) {
      this.setState({myvalue: props.defaultValue}, () => {
        this.computeDuration(false);
      });
    }
  }
  public componentDidMount() {
    this.computeDuration(false);
  }
  public onChange(val, index) {
    const { myvalue = [] } = this.state;
    const { type } = this.props;
    const startTime = index === 0 ? val : myvalue[0];
    const endTime = index === 1 ? val : myvalue[1];
    if (startTime && endTime) {
      let verifyRes = true;
      switch (type) {
        case "date":
          verifyRes = compareTime(startTime, endTime, true);
          break;
        case "datetime":
          verifyRes = compareTime(startTime, endTime, false);
          break;
        case "halfday":
          verifyRes = compareHalfday(startTime, endTime);
          break;
      }
      this.setState((state) => {
        const value = state.myvalue || [];
        if (verifyRes) {
          value[index] = val;
        } else {
          value[index] = "";
        }
        return {myvalue: value};
      }, () => {
        this._onValueChange();
      });
    } else {
      // 当有一个未选中则直接setState
      this.setState((state) => {
        const value = state.myvalue || [];
        value[index] = val;
        return {myvalue: value};
      }, () => {
        this._onValueChange();
      });
    }
  }
  public _onValueChange() {
    const { onValueChange, props } = this.props;
    const { myvalue } = this.state;
    if (onValueChange) {
      onValueChange(myvalue, props);
      this.computeDuration();
    }
  }
  // 计算时长
  public computeDuration(isTransmit = true) {
    const { controlType, onDurationChange, props, type, styleType, duration, workingTime } = this.props;
    const { afternoon, forenoon } = workingTime;
    const { myvalue = [] } = this.state;
    let startTime = myvalue[0] || "";
    let endTime = myvalue[1] || "";
    if (styleType === "details" ) {
      this.setState({diffDays: duration});
      return;
    }
    if (!(startTime && endTime)) {
      // 当没有开始时间和结束时间
      this.setState({ diffDays: ""}, () => {
        if (onDurationChange && isTransmit) {
          onDurationChange("", props);
        }
      });
      return;
    }
    // 半天的情况
    if (type === "halfday") {
      // 开始结束时刻
      const startMoment = myvalue[0].zones === "上午" ? forenoon[0] : afternoon[0];
      const endMoment = myvalue[1].zones === "上午" ? forenoon[1] : afternoon[1];
      startTime = `${myvalue[0].day} ${startMoment}`;
      endTime = `${myvalue[1].day} ${endMoment}`;

      // 如果结束时刻小于开始时刻，则加一天（次日）
      if (getTimeMill(endMoment) <= getTimeMill(startMoment)) {
        endTime = new XDate(endTime).addDays(1).toString("yyyy-MM-dd HH:mm:ss");
      }
    }
    this.setState({
      diffDays:
      type === "datetime"
      ? new XDate(startTime).diffHours(endTime).toFixed(2)
      : new XDate(startTime).diffDays(endTime).toFixed(2),
    });
  }
  public computeTitle() {
    const { title, type, controlType } = this.props;
    if (controlType) {
      if (type === "datetime") {
        return "时长（小时）";
      } else {
        return "时长（天）";
      }
    } else {
      return title;
    }
  }
  public render() {
    const {
      label = '["开始时间", "结束时间"]', required, computed, title = "时长（天）",
      interval, disabled, styleType, type,
    } = this.props;
    const { myvalue, diffDays } = this.state;
    let labelArr = ["开始时间", "结束时间"];
    const styles = formStyles(styleType);
    try {
      labelArr = JSON.parse(label);
    } catch (error) {
      // json失败
    }
    return (
      <View style={ interval ? styles.interval : {}}>
        <DateField
          label={labelArr[0]}
          required={required}
          defaultValue={myvalue[0]}
          onValueChange={this.onChange}
          props={0}
          interval={false}
          disabled={disabled}
          style={disabled ? {} : styles.border}
          styleType={styleType}
          type={type}
        />
        <DateField
          label={labelArr[1]}
          required={required}
          defaultValue={myvalue[1]}
          onValueChange={this.onChange}
          props={1}
          interval={false}
          style={computed ? styles.border : {}}
          styleType={styleType}
          disabled={disabled}
          type={type}
        />
        {
          computed ? (
            <Item
              styleType={styleType}
              label={this.computeTitle()}
              value={diffDays.toString()}
              required={required}
              placeholder=" "
              showArrow={false}
              interval={false}
            />
          ) : null
        }
      </View>
    );
  }
}

/**
 * 比较判断 比较开始时间是否小于(等于)结束时间
 * @param firstTimeStr 第一个时间string
 * @param lastTimeStr 第二个时间string
 * @param isEqual 是否包含等于
 */
function compareTime(startTimeStr: string, endTimeStr: string, isEqual: boolean): boolean {
  console.log("验证市场1", startTimeStr, endTimeStr);
  const startTime = new XDate(startTimeStr).getTime();
  const endTime = new XDate(endTimeStr).getTime();
  console.warn("验证市场2", startTime, endTime);
  if (isEqual) {
    return startTime <= endTime;
  } else {
    return startTime < endTime;
  }
}

/**
 * 比较开始时间是否小于等于结束时间
 * @param startTime 开始时间
 * @param endTime 结束时间
 */
function compareHalfday(startTime: {day: "string", zones: "上午" | "下午" }, endTime: {day: "string", zones: "上午" | "下午" }) {
  console.warn("验证半天", startTime, endTime);

  const startDay = new XDate(`${startTime.day} ${startTime.zones === "上午" ? "09:00" : "14:00"}`).getTime();
  const endDay = new XDate(`${endTime.day} ${endTime.zones === "上午" ? "09:00" : "14:00"}`).getTime();
  console.warn("验证半天", startDay, endDay);
  return startDay <= endDay;
}
