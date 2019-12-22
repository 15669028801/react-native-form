'use strict';

import React, { Component } from 'react'
import { DatePickerIOS, View, Button, Text } from 'react-native'
import { Modal } from "@ant-design/react-native"
import moment from 'moment'
import styles from "../style"



export default class DatePicker extends Component {
  constructor( props ) {
    super(props)
    this.state = { date: verifyDate(props.date) };
    this.transform = ( date ) => {
      let redate = ""
      switch (this.props.mode) {
        case "date":
          redate = moment(date).format("YYYY-MM-DD")
          break;
        case "datetime":
          redate = moment(date).format("YYYY-MM-DD HH:mm:ss")
          break;
        case "time":
          redate = moment(date).format("HH:mm:ss")
          break;
        default:
          break;
      }
      return redate
    }
    this.onSure = this._onSure.bind(this)
  }
  componentWillReceiveProps(props) {
    if (moment(props.date).format("YYYY-MM-DD HH:mm:ss") !== moment( this.props.date).format("YYYY-MM-DD HH:mm:ss")) {
      const date = verifyDate(props.date);
      this.setState({
        date
      })
    }
  }
  static defaultProps = {
    mode: 'date',
    date: new Date()
  }
  _onSure() {
    const { onSure, onClose } = this.props;
    const {date} = this.state;
    onClose();
    onSure && onSure(this.transform(date))
  }

  render() {
    const { onDateChange, date, maximumDate, minimumDate, visible, maskClosable, onClose, title, ...props } = this.props;
    return (
      <Modal
        popup
        visible={ visible }
        maskClosable
        animationType="slide-up"
        onClose={onClose}
      >
        <View style={styles.row}>
          <Button title={ "取消" } color={ "#578EF3" } onPress={ onClose }/>
          <Text style={styles.title}>{title ? title : ""}</Text>
          <Button title={"确认"} color={"#578EF3"} onPress={this.onSure}/>
        </View>
        <DatePickerIOS
          { ...props }
          maximumDate={ maximumDate ? new Date(maximumDate) : null }
          minimumDate={ minimumDate ? new Date(minimumDate) : null }
          onDateChange={ ( date ) => {
            this.setState({ date });
            onDateChange && onDateChange(this.transform(date))
          } }
          date={ this.state.date }
          locale={ "zh" }
        />
      </Modal>
    )
  }

  getValue() {
    return this.state.date
  }
}


/**
 * 验证date，并返回
 * @param {*} date 
 */
function verifyDate(date) {
  if (date && (typeof(date) === "string" || date instanceof Date)) {
    return new Date(date)
  } else {
    return new Date()
  }
}