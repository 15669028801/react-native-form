import React, { Component, PureComponent } from "react";
import { Platform, StyleProp, TextInput, ViewStyle } from "react-native";
import { itemInputFontSize, placeholderTextColor} from "../styles/styles";
import { formStyles } from "../utils";
import Item from "./Item";

export interface IProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  interval?: boolean; // 是否有间距
  props?: any;
  styleType?: "form" | "details" | "borderform" | "crmform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props) => void;
}

export default class InputField extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      placeholder: props.placeholder || "请输入",
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public onChangeText(value) {
    const { onValueChange, props } = this.props;
    if (onValueChange) {
      onValueChange(value, props);
    }
  }
  public onFocus(nativeEvent) {
    this.setState({ placeholder: "" });
  }
  public onBlur() {
    this.setState({
      placeholder: this.props.placeholder || "请输入",
    });
  }
  public render() {
    const { disabled, label, defaultValue = "", required, interval, styleType} = this.props;
    const { placeholder } = this.state;
    const styles = formStyles(styleType);
    const placeholderColor = (styleType && styleType === "crmform") ? "#7C828B" : placeholderTextColor;
    const inputFontSize = (styleType && styleType === "crmform") ? itemInputFontSize : "normal";
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
          <TextInput
            style={[styles.val, Platform.OS === "ios" ? {lineHeight: 40} : {} ]}
            placeholderTextColor={placeholderColor}
            defaultValue={defaultValue.toString()}
            placeholder={placeholder}
            editable={!disabled}
            onChangeText={value => that.onChangeText(value)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </Item>
      );
    }
  }
}
