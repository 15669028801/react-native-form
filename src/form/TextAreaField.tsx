import React, { Component } from "react";
import { Platform, StyleProp, TextInput, ViewStyle } from "react-native";
import { placeholderTextColor } from "../styles/styles";
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

/**
 * 多行输入框
 */
export default class TextAreaField extends Component<IProps, any> {
  public inputView: any;
  constructor(props) {
    super(props);
    this.state = {
      myvalue: props.defaultValue || "",
    };
  }
  public componentWillReceiveProps(props, state) {
    if (props.defaultValue !== state.myvalue) {
      state.myvalue = props.defaultValue;
    }
  }
  public shouldComponentUpdate(nextProps, nextState) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      return true;
    }
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }
    if (this.props.props !== nextProps.props) {
      return true;
    }
    return false;
  }

  public onChangeText(value) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, this.props.props);
    }
  }
  public render() {
    const { placeholder, disabled, label, defaultValue, required, interval, styleType } = this.props;
    const styles = formStyles(styleType);
    const that = this;
    if (disabled) {
      return (
        <Item
          label={label}
          required={required}
          interval={interval}
          disabled={disabled}
          styleType={styleType}
          value={defaultValue}
        />
      );
    } else {
      return (
        <Item
          label={label}
          required={required}
          style={styles.textareaRow}
          interval={interval}
          disabled={disabled}
          styleType={styleType}
        >
          <TextInput
            ref={(ref) => this.inputView = ref}
            multiline={true}
            style={[styles.val, styles.textarea, Platform.OS === "ios" ? {lineHeight: 40} : {} ]}
            // numberOfLines={}
            placeholderTextColor={placeholderTextColor}
            defaultValue={defaultValue}
            placeholder={placeholder || "请输入"}
            editable={!disabled}
            onChangeText={value => that.onChangeText(value)}
          />
        </Item>
      );
    }
  }
}
