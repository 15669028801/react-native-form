import React, { Component } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Picker from "../components/rn-wheel-picker/index";
import Item from "./Item";

export interface IProps {
  label: string;
  options: Array<{ label: string, value: any }>;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  clearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  interval?: boolean; // 是否有间距
  props?: any;
  type?: "leave";
  oaUser?: any;
  vValue?: string;
  vLabel?: string;
  styleType?: "form" | "details" | "borderform" | "crmform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props, item?: any) => void; // val 选中的value值， props自定义传入的props, item选中的整个对象
}

/**
 * 单选组件
 */
export default class SelectField extends Component<IProps, any> {
  public static defaultProps = {
    vValue: "value",
    vLabel: "label",
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      myvalue: props.defaultValue,
      myname: findValue(props.defaultValue, props.options, props.vValue, props.vLabel),
      vacationList: [], // 假期列表
    };
    this.handleSure = this.handleSure.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  public componentDidMount() {
    const { type, vValue, vLabel } = this.props;
    const { myvalue } = this.state;
  }
  public componentWillReceiveProps(props) {
    const { state } = this;
    const { vValue, vLabel } = this.props;
    if
    (
      props.defaultValue !== undefined
      && props.defaultValue !== state.myvalue
      || props.options !== this.props.options
    ) {
      const { type, options, vacationList } = props;
      this.setState({
        myvalue: props.defaultValue,
        myname: findValue(props.defaultValue, options, vValue, vLabel),
      });
    }
  }
  public shouldComponentUpdate(nextProps, nextState) {
    if (this.state.myvalue !== nextState.myvalue) {
      return true;
    }
    if (this.state.myname !== nextState.myname) {
      return true;
    }
    if (this.state.visible !== nextState.visible) {
      return true;
    }
    if (this.props.defaultValue !== nextProps.defaultValue) {
      return true;
    }
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }
    if (this.props.options !== nextState.options) {
      return true;
    }
    return false;
  }
  // 确定事件
  public handleSure(item) {
    this.onChange(item);
  }
  // 点击事件
  public onClick() {
    const { disabled } = this.props;
    if (!disabled) {
      this.setState({ visible: true });
    }
  }
  // 清除事件
  public onClear() {
    const { disabled } = this.props;
    if (!disabled) {
      this.onChange({});
    }
  }
  // 关闭
  public onClose() {
    this.setState({ visible: false });
  }
  // 改变值
  public onChange(item) {
    const { vLabel, vValue, onValueChange, props } = this.props;
    this.setState({ visible: false, myvalue: item[vValue], myname: item[vLabel] }, () => {
      if (onValueChange) {
        onValueChange(item[vValue], props, item);
      }
    });
  }
  public render() {
    const {
      label, required, placeholder, options = [],
      interval, type, disabled, styleType, vValue, vLabel, clearable,
    } = this.props;
    const { visible, myname, myvalue, vacationList } = this.state;
    return (
      <View>
        <Item
          label={label}
          placeholder={placeholder}
          value={myname}
          required={required}
          onPress={this.onClick}
          clearable={clearable}
          onClear={this.onClear}
          interval={interval}
          disabled={disabled}
          styleType={styleType}
        />
        <Picker
          selectedValue={{ [`${vValue}`]: myvalue }}
          visible={visible}
          title={`请选择${label}`}
          vValue={vValue}
          vLabel={vLabel}
          pickerData={type === "leave" ? vacationList : options}
          onSure={this.handleSure}
          onClose={this.onClose}
        />
      </View>
    );
  }
}

function findValue(value, list = [], vValue, vLabel) {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    if (String(list[i][vValue]) === String(value)) {
      return list[i][vLabel];
    }
  }
  return "";
}
