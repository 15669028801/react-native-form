'use strict';

import React, { Component, PureComponent } from 'react'
import { Button, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'
import Picker from '../../curved-picker/index'
import moment from 'moment'
import _ from 'lodash'

const styles = {
  picker: {
    flex: 1
  }
}

const dayNumOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]    // 各个月份的天数

export default class DateSliderAndroid extends PureComponent {
  static defaultProps = {
    labelUnit: { year: '年', month: '月', day: '日' },
    mode: 'date',
    maximumDate: moment().add(50, 'years').toDate(),
    minimumDate: new Date("1990-01-01"),
    date: new Date()
  }
  constructor( props ) {
    super(props)
    const date = props.date ? new Date(props.date) : new Date();
    this.newValue = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }
    let dayNum = getCurrentDayNumOfMonth(this.newValue)
    let minYear = this.props.minimumDate ? new Date(this.props.minimumDate).getFullYear() : 1970;
    let maxYear = this.props.maximumDate ? new Date(this.props.maximumDate).getFullYear() : new Date().getFullYear() + 100;
    let yearRange;
    if ((maxYear - minYear) >= 1) {
      yearRange = _.map(_.range(minYear, maxYear + 1), ( n ) => {
        return { value: n, label: `${ n }${ props.labelUnit.year }` }
      })
    } else {
      yearRange = [{ value: minYear, label: `${ minYear }${ props.labelUnit.year }` }]
    }

    this.state = {
      date: props.date ? new Date(props.date) : new Date(),
      dayRange: this._genDateRange(dayNum),
      monthRange: _.times(12, ( n ) => {
        return { value: n + 1, label: `${ n + 1 }${ props.labelUnit.month }` }
      }),
      yearRange,
    };

    this.onSure = this.onSure.bind(this)
    this.onValueChange = this.onValueChange.bind(this)

  }
  componentWillReceiveProps(props) {
    if ( props.date && moment(props.date).format("YYYY-MM-DD HH:mm") !== moment( this.props.date).format("YYYY-MM-DD HH:mm")) {
      const date = props.date ? new Date(props.date) : new Date();
      this.setState({
        date
      })
      this.newValue = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
      }
    }
  }

  onSure() {
    this.props.onClose && this.props.onClose()
    this.props.onSure && this.props.onSure(this.getValue())
  }
  render() {
    // const { visible, onClose, title} = this.props;
    return (
      <View style={{flexDirection: "row"}}>
        { this.datePicker }
        { this.timePicker }
      </View>
    )
  }

  onValueChange(item, props) {
    if (typeof item === "string") {
      this.newValue[props] =  item;
    } else {
      this.newValue[props] = props === "month" ? item.value - 1 : item.value;
    }

    this.props.onDateChange && this.props.onDateChange(this.getValue());
  }

  get datePicker() {

    if (!_.includes(['date', 'datetime'], this.props.mode)) {
      return []
    }
    return [
      <View key="year" style={ styles.picker }>
        <Picker
          ref="year"
          type="year"
          selectedValue={ {value: this.state.date.getFullYear()} }
          pickerData={ this.state.yearRange }
          onValueChange={ this.onValueChange }
        />
      </View>,
      <View key="month" style={ styles.picker }>
        <Picker
          ref="month"
          type="month"
          selectedValue={ {value: this.state.date.getMonth() + 1} }
          pickerData={ this.state.monthRange }
          onValueChange={ this.onValueChange }
        />
      </View>,
      <View key="date" style={ styles.picker }>
        <Picker
          ref="date"
          type="day"
          selectedValue={{value: this.state.date.getDate()} }
          pickerData={ this.state.dayRange }
          onValueChange={ this.onValueChange }
        />
      </View>
    ]
  }

  get timePicker() {
    if (!_.includes(['time', 'datetime'], this.props.mode)) {
      return []
    }
    return [
      <View key="hour" style={ styles.picker }>
        <Picker
          ref="hour"
          type="hour"
          selectedValue={ this.state.date.getHours() }
          pickerData={ _.range(0, 24) }
          onValueChange={ this.onValueChange }
        />
      </View>,
      <View key="minute" style={ styles.picker }>
        <Picker
          ref="minute"
          type="minute"
          selectedValue={ this.state.date.getMinutes() }
          pickerData={ _.range(0, 60) }
          onValueChange={ this.onValueChange }
        />
      </View>
    ]
  }

  _checkDate( oldYear, oldMonth, oldDay ) {                             // 检查新的值是否合法
    let currentMonth = this.newValue.month
    let currentYear = this.newValue.year
    let currentDay = this.newValue.day


    let dayRange = this.state.dayRange
    let dayNum = dayRange.length
    if (oldMonth !== currentMonth || oldYear !== currentYear) {            // 月份有发动
      dayNum =getCurrentDayNumOfMonth(this.newValue)
    }
    if (dayNum !== dayRange.length) {                                   // 天数有变
      dayRange = this._genDateRange(dayNum)
      if (currentDay > dayNum) {
        currentDay = this.newValue.day = dayNum
        this.refs.date.state.selectedValue = dayNum
      }
      this.setState({ dayRange })
    }

    let unit = undefined
    if (this.props.mode === 'date') {
      unit = 'day'
    }

    let { year, month, day, hour, minute } = this.newValue
    let currentTime = moment([year, month, day, hour, minute])
    let min = this.props.minimumDate ? moment(new Date(this.props.minimumDate)) : null;
    let max = this.props.maximumDate ? moment(new Date(this.props.maximumDate)) : null;
    let adjustToTime = currentTime
    if (currentTime.isBefore(min, unit)) {    // 超出最小值
      adjustToTime = min
    }
    if (currentTime.isAfter(max, unit)) {     // 超出最大值
      adjustToTime = max
    }
    if (!currentTime.isSame(adjustToTime)) {  // 超出选择范围
      year = adjustToTime.get('year')
      month = adjustToTime.get('month') + 1
      day = adjustToTime.get('date')
      hour = adjustToTime.get('hour')
      minute = adjustToTime.get('minute')

      // this.refs.year && this.refs.year.setState({ selectedValue: year })
      // this.refs.month && this.refs.month.setState({ selectedValue: month })
      // this.refs.date && this.refs.date.setState({ selectedValue: day })
      // this.refs.hour && this.refs.hour.setState({ selectedValue: hour })
      // this.refs.minute && this.refs.minute.setState({ selectedValue: minute })
    }
  }



  _genDateRange( dayNum ) {     // 生成日期范围
    return _.times(dayNum, ( n ) => {
      return { value: n + 1, label: `${ n + 1 }${ this.props.labelUnit.day }` }
    })
  }

  getValue() {
    const { year, month, day, hour, minute } = this.newValue

    const date = new Date(year, month, day, hour, minute);
    let redate = ""
    switch (this.props.mode) {
      case "date":
        redate = moment(date).format("YYYY-MM-DD")
        break;
      case "datetime":
        redate = moment(date).format("YYYY-MM-DD HH:mm:ss")
        break;
      case "time":
        redate = moment(date).format("HH:mm")
        break;
      default:
        break;
    }
    return redate
  }
}

function getCurrentDayNumOfMonth(newValue) {
  let currentMonth = newValue.month
  let currentYear = newValue.year
  let dayNum

  if (currentMonth === 1) {                // 当前为2月份
    if (moment([currentYear]).isLeapYear()) {
      dayNum = 29    // 闰年2月29天
    } else {
      dayNum = 28    // 否则28天
    }
  } else {
    dayNum = dayNumOfMonth[currentMonth]
  }

  return dayNum
}
