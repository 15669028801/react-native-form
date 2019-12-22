'use strict';

import React, { Component } from 'react'
import { View, StyleSheet, Button, Text, Picker } from 'react-native'
import { Modal } from "@ant-design/react-native"
import styles from "../style"
import WheelCurvedPicker from "../curved-picker/WheelCurvedPicker.ios";

export default class WeelPicker extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      selectedValue: this._findValue(props),
    };
    this.onSure = this._onSure.bind(this);
  }

  static defaultProps = {
    pickerData: []
  }

  componentWillReceiveProps( nextProps, nextContext ) {
    const { vValue, selectedValue } = nextProps;
    if (selectedValue) {
      if (selectedValue[vValue] !== this.state.selectedValue[vValue]) {
        const index = this._findValue(nextProps);
        this.setState({ selectedValue: index });
      }
    }else{
      this.setState({ selectedValue: 0 });
    }
  }

  _findValue( props ) {
    const { selectedValue = {}, pickerData = [], vValue = "value" } = props;
    for (let i = 0; i < pickerData.length; i++) {
      if (pickerData[i][vValue] === selectedValue[vValue]) {
        return i
      }
    }
    return 0
  }

  _onSure() {
    const { onSure, onClose, pickerData } = this.props;
    const { selectedValue } = this.state;
    onClose();
    onSure && onSure(selectedValue ? pickerData[selectedValue] : pickerData[0])
  }

  render() {
    const { onValueChange, pickerData, itemStyle, style, visible, onClose, title, vLabel, vValue, ...props } = this.props;
    const $label = vLabel ? vLabel : "label";
    return (
      <Modal
        popup
        visible={ visible }
        maskClosable
        animationType="slide-up"
        onClose={ onClose }
      >
        <View style={ styles.row }>
          <Button title={ "取消" } color={ "#578EF3" } onPress={ onClose }/>
          <Text style={ { ...styles.title, textAlign: "center" } }>{ title ? title : "" }</Text>
          <Button title={ "确认" } color={ "#578EF3" } onPress={ this.onSure }/>
        </View>
        <WheelCurvedPicker
          { ...props }
          onValueChange={ ( value ) => {
            this.setState({ selectedValue: value })
            onValueChange && onValueChange(pickerData[value])
          } }
          selectedValue={ this.state.selectedValue }
          locale={ "zh" }
        >
          { pickerData.map(( data, index ) => (
              <Picker.Item key={ index } label={ data[$label] } value={ index }/>
            )
          ) }
        </WheelCurvedPicker>
      </Modal>
    )
  }
}

