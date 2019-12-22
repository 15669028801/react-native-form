import React, { PureComponent } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";

import { itemStyle as styles } from "../styles/styles";

/**
 * 说明文
 */

export interface IProps {
  label: string;
  link: string;
  color: string;
  styleType?: "form" | "details" | "borderform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
}

export default class TextNoteField extends PureComponent<IProps, null> {
  constructor(props) {
    super(props);
    this.handleGoWeb = this.handleGoWeb.bind(this);
  }
  public handleGoWeb() {
    const { link } = this.props;
    if (link) {
      // 即将跳转到link页面
    }
  }
  public render() {
    const { label, color = "#030303" } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleGoWeb}>
        <Text style={[styles.textNote, {color}]}> {label} </Text>
      </TouchableWithoutFeedback>
    );
  }
}
