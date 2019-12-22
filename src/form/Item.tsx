import React, { PureComponent } from "react";
import { StyleProp, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle  } from "react-native";
import { AntIcon } from "../components/Icon";
import { formStyles } from "../utils";

export interface IProps {
  label: string; // 提示信息
  style?: StyleProp<ViewStyle>; // 最外层样式
  labelStyle?: StyleProp<TextStyle>; // label样式
  valueStyle?: StyleProp<TextStyle>; // value样式
  disabled?: boolean; // 是否禁用
  required?: boolean; // 是否必填
  value?: string; // 表单值
  clearable?: boolean; // 是否清除按钮（默认false）
  showArrow?: boolean; // 是否右箭头 （默认ture）
  placeholder?: string; // 提示文本
  interval?: boolean; // 是否有间距 （默认true）
  styleType?: "form" | "details" | "borderform" | "crmform"; // 区分是审批表单还是审批详情（两套样式）,（默认 form）
  onPress?: () => void;
  onClear?: () => void;
}

/**
 * 通用label
 */
export class Item extends PureComponent<IProps, any> {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  public onPress() {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  }
  public handleClear() {
    const { onClear } = this.props;
    if (onClear) {
      onClear();
    }
  }
  public render() {
    const {
      label,
      value,
      children,
      required,
      clearable,
      placeholder,
      style = {},
      labelStyle = {},
      valueStyle = {},
      showArrow = true,
      interval = true,
      disabled = false,
      styleType = "form",
    } = this.props;
    const styles = formStyles(styleType);
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.row, style, interval ? styles.interval : {}]}>
          {
            required ? <Text style={styles.required}>*</Text> : null
          }
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {
            children ? (
              children
            ) : (
              <View style={styles.right}>
                <Text style={[styles.val, value ? {} : styles.placeholder, valueStyle]}>
                  { value || placeholder || (clearable ? "请选择" : "请输入") }
                </Text>
                {
                  !disabled ? (
                    value && clearable ? (
                      <AntIcon
                        name="shanchuguanbicha2"
                        size={20} color="#999"
                        onPress={this.handleClear}
                        iconStyle={styles.clearIcon}
                      />
                    ) :  showArrow ? (
                      <AntIcon name="you1" size={20} color="#999" iconStyle={styles.clearIcon} />
                    ) : null
                  ) : null
                }
              </View>
            )
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Item;
