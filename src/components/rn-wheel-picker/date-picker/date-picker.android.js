'use strict';

import React, { PureComponent } from 'react'
import { Button, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'
import $styles from "../style"
import DateSliderAndroid from "./date-slider-android";


export default class DatePicker extends PureComponent {
  constructor( props ) {
    super(props)
    this.state = {
      dayTime: this.props.date || "",
    }
    this.onDateChange = this.onDateChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onSure = this.onSure.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.date !== this.state.dayTime) {
      this.setState({ dayTime: props.date});
    }
  }
  getValue() {
    const date = new Date(this.state.dayTime);
    let redate = ""
    switch (this.props.mode) {
      case "date":
        redate = moment(date).format("YYYY-MM-DD")
        break;
      case "datetime":
        redate = moment(date).format("YYYY-MM-DD HH:mm")
        break;
      case "time":
        redate = moment(date).format("HH:mm")
        break;
      default:
        redate = moment(date).format("YYYY-MM-DD")
        break;
    }
    return redate
  }
  onSure() {
    this.props.onClose && this.props.onClose()
    this.props.onSure && this.props.onSure(this.getValue())
  }
  onDateChange(value) {
    this.setState({  dayTime: value }, () => {
      const { onDateChange } = this.props;
      if ( onDateChange ) {
        onDateChange(value);
      }
    });
  }
  render() {
    const { visible, onClose, title, onSure, onDateChange, ...otherProps } = this.props;

    return (
      <Modal
        popup
        visible={ visible }
        maskClosable
        animationType="slide"
        onClose={ onClose }
        transparent={true}
        onRequestClose={ onClose }
      >
        <View style={$styles.main}>
          <View style={ $styles.row }>
            <Button title={ "取消" } color={ "#578EF3" } onPress={ onClose }/>
            <Text style={ $styles.title }>{ title ? title : "" }</Text>
            <Button title={ "确认" } color={ "#578EF3" } onPress={ this.onSure }/>
          </View>
          <DateSliderAndroid {...otherProps} onDateChange={this.onDateChange} />
        </View>
        {/* 背景遮罩层点击 */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={$styles.wrapper}>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
