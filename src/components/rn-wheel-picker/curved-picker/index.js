'use strict';

import React, { Component } from 'react'
import WheelCurvedPicker from './WheelCurvedPicker'
const PickerItem = WheelCurvedPicker.Item
import _ from 'lodash'

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


export default class CurvedPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this._findValue(props)
    };
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
    let resIndex = 0
    for (let i = 0; i < pickerData.length; i++) {
      const item = pickerData[i];
      const isObj = typeof(item) === "object";
      if ( isObj && item[vValue] === selectedValue[vValue]) {
        resIndex = i;
        break;
      } else if (item === selectedValue) {
        resIndex = i;
        break;
      }
    }
    return resIndex
  }
  render() {
    const { onValueChange, pickerData, itemStyle, style, vLabel, ...props } = this.props
    const $Label = vLabel || "label";
    const { selectedValue } = this.state;
    return (
      <WheelCurvedPicker
        {...props}
        style={[styles.picker, style]}
        itemStyle={_.assign({}, styles.picker__item, itemStyle)}
        selectedValue={selectedValue}
        onValueChange={(value) => {
          this.setState({ selectedValue: value })
          onValueChange && onValueChange( pickerData[value], this.props.type )
        }}
      >
        {pickerData.map((data, index) => {
            return <PickerItem key={index} value={index} label={data[$Label] || data.toString()} />
          }
        )}
      </WheelCurvedPicker>
    )
  }

  getValue() {
    return this.state.selectedValue
  }
}
