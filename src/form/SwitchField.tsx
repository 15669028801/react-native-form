import React, { PureComponent } from "react";
import {  StyleProp, Switch, ViewStyle } from "react-native";
import Item from "./Item";

export interface IProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  thumbColor?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  interval?: boolean; // 是否有间距
  props?: any;
  styleType?: "form" | "details" | "borderform" | "crmform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props) => void;
}

export default class SwitchField extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public onChangeText(value) {
    const { onValueChange , props} = this.props;
    if (onValueChange) {
      onValueChange(value, props);
    }
  }
  public render() {
    const {
      disabled, label, defaultValue = false, required, interval, styleType,
      activeColor = "#3C82FE", inActiveColor = "#E9E9E9", thumbColor = "#BFCBDC",
    } = this.props;
    const that = this;
    // 禁用展示
    if (disabled) {
      return <Item
              label={label}
              showArrow={false}
              required={required}
              interval={interval}
              styleType={styleType}
              value={defaultValue}
            />;
    } else {
      // 正常
      return (
        <Item label={label} required={required} interval={interval} styleType={styleType}>
          <Switch
            thumbColor={thumbColor}
            trackColor={{false: inActiveColor, true: activeColor}}
            value={defaultValue}
            onValueChange={value => that.onChangeText(value)}
          />
        </Item>
      );
    }
  }
}
