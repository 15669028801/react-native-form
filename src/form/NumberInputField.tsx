import React, { Component } from "react";
import { Platform, StyleProp, TextInput, ViewStyle } from "react-native";
import { itemInputFontSize , placeholderTextColor } from "../styles/styles";
import { checkFloat, formStyles } from "../utils";
import Item from "./Item";

export interface IProps {
  label: string;
  unit?: string;
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

export default class NumberInputField extends Component<IProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      myvalue: (typeof props.defaultValue !== "undefined") ? props.defaultValue : "",
      placeholder: props.placeholder || "请输入",
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  public componentWillReceiveProps(props, state) {
    if (typeof props.defaultValue !== "undefined" && props.defaultValue !== state.myvalue) {
      this.setState({myvalue: props.defaultValue});
    }
  }
  public shouldComponentUpdate(nextProps, nextState) {
    if (this.state.myvalue !== nextState.myvalue) {
      return true;
    }
    if (this.props.defaultValue !== nextProps.defaultValue) {
      return true;
    }
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }
    if (this.state.placeholder !== nextState.placeholder) {
      return true;
    }
    return false;
  }
  public onChangeText(myvalue) {
    const { onValueChange, props } = this.props;
    if (myvalue.length > 20) {
      return;
    }
    if (checkFloat(myvalue) || myvalue === "" ) {
      this.setState({myvalue}, () => {
        if (onValueChange) {
          onValueChange(myvalue, props);
        }
      });
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
    const { myvalue, placeholder } = this.state;
    const { disabled, label, defaultValue, required, unit, style, interval, styleType } = this.props;
    const styles = formStyles(styleType);
    const placeholderColor = (styleType && styleType === "crmform") ? "#7C828B" : placeholderTextColor;
    const inputFontSize = (styleType && styleType === "crmform") ? itemInputFontSize : "normal";
    // 只读
    if (disabled) {
      return <Item
              label={unit ? `${label}（${unit}）` : label}
              required={required}
              style={style}
              interval={interval}
              disabled={disabled}
              styleType={styleType}
              value={defaultValue}
            />;
    } else {
      return (
        <Item
          label={unit ? `${label}（${unit}）` : label}
          required={required}
          style={style}
          interval={interval}
          disabled={disabled}
          styleType={styleType}
        >
          <TextInput
            value={ `${myvalue}` }
            style={[styles.val, Platform.OS === "ios" ? {lineHeight: 40} : {} ]}
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            placeholder={placeholder}
            editable={!disabled}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </Item>
      );
    }
  }
}
