import React, { PureComponent } from "react";
import { Button, DatePickerIOS, DatePickerIOSProps, Modal, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import XDate from "xdate";
import CurvedPicker from "../curved-picker/index";
import DateSliderAndroid from "../date-picker/date-slider-android";

import $styles from "../style";

interface IProps {
  visible: boolean;
  title?: string;
  defaultValue?: {day: "string", zones: "上午" | "下午" };
  minimumDate?: string;
  maximumDate?: string;
  onSure: (value: {day: string, zones: "上午" | "下午" }) => void;
  onClose: () => void;
}

/**
 * 时间段选择器（上午下午）
 */
export default class TimeFramePicker extends PureComponent<IProps, any> {
  constructor(props) {
    super(props);
    const { defaultValue = {} } = props;
    this.state = {
      day: defaultValue.day ? new Date(defaultValue.day) : new Date(),
      zones: defaultValue && defaultValue.zones || "上午",
      zonesList: ["上午", "下午"],
      active: 0,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onZonesChange = this.onZonesChange.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onSure = this.onSure.bind(this);
  }
  public onDateChange(day) {
    this.setState({ day });
  }
  public onZonesChange(zones) {
    this.setState({ zones });
  }
  public handleTab(active) {
    this.setState({active});
  }
  public onSure() {
    const { day, zones } = this.state;
    const  { onSure } = this.props;
    if ( onSure ) {
      onSure({ day: new XDate(day).toString("yyyy-MM-DD"), zones });
    }
  }
  public render() {
    const { visible, onClose, minimumDate = "", maximumDate = "" } = this.props;
    const { day , zones, zonesList, active } = this.state;
    return (
      <Modal
        transparent
        visible={ visible }
        onRequestClose={ onClose }
        >
        <View style={$styles.main}>
          <View style={ [$styles.row, {paddingLeft: 0, justifyContent: "space-between"}] }>
            <View style={ $styles.between }>
              <TouchableWithoutFeedback onPress={this.handleTab.bind(this, 0)}>
                <Text style={[$styles.tab, active === 0 ? $styles.activeTab : {}]}>
                  { new XDate(day).toString("yyyy-MM-DD") }
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.handleTab.bind(this, 1)}>
                <Text style={[$styles.tab, active === 1 ? $styles.activeTab : {}]}>{ zones }</Text>
              </TouchableWithoutFeedback>
            </View>
            <Button title={ "确认" } color={ "#578EF3" } onPress={ this.onSure }/>
          </View>
          <View style={$styles.timeMain}>
            <View style={active === 1 ? {display: "none"} : {}}>
              <DatePicker
                mode="date"
                date={ day }
                minimumDate={minimumDate ? new Date(minimumDate) : null}
                maximumDate={maximumDate ? new Date(maximumDate) : null}
                onDateChange={this.onDateChange}
                locale="zh"
              />
            </View>
            <View style={active === 0 ? {display: "none"} : {}}>
              <CurvedPicker
                pickerData={zonesList}
                selectedValue={zones}
                onValueChange={this.onZonesChange}
              />
            </View>
          </View>

        </View>
        {/* 背景遮罩层点击 */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[$styles.wrapper, {backgroundColor: "#000", opacity: 0.3}]}>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

/**
 * 时间滑块
 * @param props
 */
const DatePicker = (props: DatePickerIOSProps) => {
  if ( Platform.OS === "ios" ) {
    const { date , ...otherProps } = props;
    return <DatePickerIOS date={date}  locale= "zh" {...otherProps} />;
  } else {
    return <DateSliderAndroid {...props} />;
  }
};
