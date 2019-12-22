'use strict';

import React, { Component } from 'react'
import WheelCurvedPicker from '../curved-picker/WheelCurvedPicker.android'
const PickerItem = WheelCurvedPicker.Item;
import _ from 'lodash'
import { Button, Text, View, Modal, TouchableWithoutFeedback } from "react-native";
import $styles from "../style";

const styles = {
  picker: {
    backgroundColor: '#d3d3d3',
    height: 220
  },
  picker__item: {
    color: '#333333',
    fontSize: 26
  }
}


export default class WeelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this._findValue(props)
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
  _findValue(props) {
    const {selectedValue = {}, pickerData = [], vValue = "value"} = props;
    for (let i = 0; i < pickerData.length; i++) {
      if (pickerData[i][vValue] === selectedValue[vValue]) {
        return i
      }
    }
    return 0
  }
  _onSure() {
    const { onSure, onClose, pickerData } = this.props;
    const {selectedValue} = this.state;
    onClose();
    onSure && onSure(selectedValue ? pickerData[selectedValue] : pickerData[0])
  }

  render() {
    const { onValueChange, pickerData, itemStyle, style, visible, onClose, title, vLabel , vValue , ...props } = this.props;
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
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={ onClose }>
            <View style={{flex: 1}}></View>
          </TouchableWithoutFeedback>
          <View style={ $styles.row }>
            <Button title={ "取消" } color={ "#578EF3" } onPress={ onClose }/>
            <Text style={{...styles.title, textAlign: "center"}}>{ title ? title : "" }</Text>
            <Button title={ "确认" } color={ "#578EF3" } onPress={ this.onSure }/>
          </View>
          {
            pickerData && pickerData.length > 0 ? (
              <WheelCurvedPicker
                style={[styles.picker, style]}
                itemStyle={_.assign({}, styles.picker__item, itemStyle)}
                selectedValue={this.state.selectedValue}
                onValueChange={(value) => {
                  this.setState({ selectedValue: value })
                  onValueChange && onValueChange( pickerData[value] )
                }}
              >
                {pickerData.map((data, index) => (
                    <PickerItem key={index} value={index} label={vLabel ? data[vLabel] : data.label} />
                  )
                )}
              </WheelCurvedPicker>
            ) : null
          }
        </View>
      </Modal>
    )
  }

  getValue() {
    return this.state.selectedValue
  }
}

