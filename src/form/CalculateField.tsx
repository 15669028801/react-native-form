import nzhcn from "nzh/cn";
import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import { placeholderTextColor } from "../styles/styles";
import { formStyles } from "../utils";
import Item from "./Item";
import NumberInput from "./NumberInputField";

export interface IProps {
  label: string;
  props?: any;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  makeLower?: boolean; // 是否显示大写
  interval?: boolean; // 是否有间距
  styleType?: "form" | "details" | "borderform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props) => void;
}

/**
 * 计算公式
 */
export default class CalculateField extends PureComponent<IProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      myvalue: props.defaultValue || "",
    };
    this.onChangeText = this.onChangeText.bind(this);
  }
  public componentWillReceiveProps(props, state) {
    if (props.defaultValue !== state.myvalue) {
      this.setState({myvalue: props.defaultValue});
    }
  }
  public onChangeText(myvalue) {
    const { onValueChange, props } = this.props;
    this.setState({myvalue}, () => {
      if (onValueChange) {
        onValueChange(myvalue, props);
      }
    });
  }
  public render() {
    const {
      placeholder, props, disabled, label, defaultValue,
      required, interval = true, makeLower, styleType,
    } = this.props;
    const { myvalue } = this.state;
    const styles = formStyles(styleType);
    return (
      <View style={[styles.moneyMain, interval ? styles.interval : {}]}>
        <NumberInput
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onValueChange={this.onChangeText}
          interval={false}
          props={props}
          styleType={styleType}
        />
        {
          makeLower ? (
            styleType === "form" ? (
              <View style={styles.moneyRow}>
                <Text style={styles.moneyLabel}>大写</Text>
                <Text style={styles.moneyVal}>{nzhcn.toMoney(myvalue, {outSymbol: false})}</Text>
              </View>
            ) : (
              <Item
                label="大写"
                showArrow={false}
                required={required}
                interval={interval}
                styleType={styleType}
                valueStyle={{color: placeholderTextColor}}
                value={nzhcn.toMoney(myvalue, {outSymbol: false})}
              />
            )
          ) : null
        }
      </View>
    );
  }
}
