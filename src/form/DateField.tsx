import React, { Component } from "react";
import { DatePickerAndroid , Platform , StyleProp , TimePickerAndroid, View, ViewStyle } from "react-native";
import XDate from "xdate";
import DatePicker from "../components/rn-wheel-picker/date-picker";
import TimeFramePicker from "../components/rn-wheel-picker/time-frame-picker";
import Item from "./Item";

export interface IProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  defaultValue?: string | {day: "string", zones: "上午" | "下午" };
  props?: any;
  style?: StyleProp<ViewStyle>;
  interval?: boolean; // 是否有间距
  type?: "date" | "datetime" | "time" | "halfday"; // halfday: 半天
  styleType?: "form" | "details" | "borderform" | "crmform" ; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props) => void;
}

/**
 * 日期选择
 */
export default class DateField extends Component<IProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      // date: this.getDate(),
      visible: false,
    };
    this.handleSure = this.handleSure.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.computeValue = this.computeValue.bind(this);
  }
  public shouldComponentUpdate(nextProps, nextState) {
    if (this.state.visible !== nextState.visible) {
      return true;
    }
    if (this.props.defaultValue !== nextProps.defaultValue) {
      return true;
    }
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }
    if (this.props.type !== nextProps.type) {
      return true;
    }
    return false;
  }
  // 确定事件
  public handleSure(item) {
    this.onChange(item);
  }
  // 点击事件
  public onClick() {
    const { disabled, type, defaultValue = new Date()  } = this.props;
    const isAndroid = Platform.OS === "android";
    if (!disabled) {
      if (isAndroid && type === "datetime") {
        const datetime = new Date(defaultValue as string);
        DatePickerAndroid.open({ date: datetime , mode: "spinner"}).then(res => {
          const { action, year, month, day } = res as any;
          if (action !== DatePickerAndroid.dismissedAction) {
            TimePickerAndroid.open({
              hour: datetime.getHours(),
              minute: datetime.getMinutes(),
              is24Hour: true, // Will display '2 PM'
              mode: "spinner",
            }).then(res2 => {
              const { hour, minute } = res2 as any;
              if (res2.action === TimePickerAndroid.timeSetAction) {
                this.onChange(new XDate(year, month, day, hour, minute, 0, 0).toString("yyyy-MM-dd HH:mm"));
              }
            });
          }
        });
      } else {
        this.setState({visible: true});
      }
    }
  }
  // 清除事件
  public onClear() {
    const { disabled } = this.props;
    if (!disabled) {
      this.onChange("");
    }
  }
  // 关闭
  public onClose() {
    this.setState({visible: false});
  }
  // 改变值
  public onChange(item) {
    const { onValueChange, props } = this.props;
    // console.log(item, props, "onChange")
    this.setState({visible: false}, () => {
      if (onValueChange) {
        onValueChange(item, props);
      }
    });
  }
  // 计算显示的value
  public computeValue() {
    const { type, defaultValue } = this.props;
    if (defaultValue) {
      if (type === "halfday" ) {
        return `${(defaultValue as {day: "string", zones: "上午" | "下午" }).day} ${(defaultValue as {day: "string", zones: "上午" | "下午" }).zones}`;
      } else {
        return (defaultValue as string);
      }
    } else {
      return "";
    }
  }
  public render() {
    const {
      label, required, placeholder, style, interval,
      styleType, disabled, type, defaultValue, clearable,
    } = this.props;
    const { visible } = this.state;
    return (
      <View style={{position: "relative"}}>
        <Item
          label={label}
          placeholder={placeholder}
          value={this.computeValue()}
          required={required}
          onPress={this.onClick}
          clearable={clearable}
          onClear={this.onClear}
          style={style}
          interval={interval}
          styleType={styleType}
          disabled={disabled}
        />
        {
          type === "halfday" ? (
            <TimeFramePicker
              visible={visible}
              title={"请选择时间"}
              defaultValue={(defaultValue as {day: "string", zones: "上午" | "下午" })}
              onSure={this.handleSure}
              onClose={this.onClose}
            />
          ) : (
            <DatePicker
              visible={visible}
              title={"请选择时间"}
              mode={type}
              date={defaultValue}
              onSure={this.handleSure}
              onClose={this.onClose}
            />
          )
        }
      </View>
    );
  }
}
