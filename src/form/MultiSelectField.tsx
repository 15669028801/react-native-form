import React, { Component } from "react";
import { Text, View } from "react-native";
import { AntIcon } from "../components/Icon";
import MuliplePicker from "../components/rn-wheel-picker/multiple-picker";
import { formStyles, tryJSON } from "../utils";
import Item from "./Item";

export interface IProps {
  label: string;
  options: Array<{ label: string, value: any }>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: [] | string;
  interval?: boolean; // 是否有间距
  props?: any;
  styleType?: "form" | "details" | "borderform" | "crmform"; // 区分是审批表单还是审批详情（两套样式）,默认 form
  onValueChange?: (val, props) => void;
  vValue?: string;
  vLabel?: string;
}

/**
 * 多选
 */
export default class MultiSelectField extends Component<IProps, any> {
  public static defaultProps = {
    vValue: "value",
    vLabel: "label",
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      myvalue: findMultiValue(props.options , tryJSON(props.defaultValue || []), props.vValue),
    };
    this.handleSure = this.handleSure.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  public componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options || this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({
        myvalue: findMultiValue(nextProps.options , tryJSON(nextProps.defaultValue || []), nextProps.vValue),
      });
    }
  }
  // 确定事件
  public handleSure(arr: any[]) {
    this.onChange(arr);
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
      this.onChange([]);
    }
  }
  // 关闭事件
  public onClose() {
    this.setState({ visible: false });
  }
  // 改变值
  public onChange(item) {
    const { onValueChange, props, vValue } = this.props;
    this.setState({ visible: false, myvalue: item }, () => {
      if (onValueChange) {
        onValueChange(item.map((i) => i[vValue]), props);
      }
    });
  }
  public render() {
    const {
      label, required, placeholder = "请选择", options = [],
      interval, disabled, styleType, vLabel, vValue,
    } = this.props;
    const { visible, myvalue } = this.state;
    const styles = formStyles(styleType);
    if (disabled) {
      return <Item
        label={label}
        placeholder={placeholder}
        required={required}
        onPress={this.onClick}
        clearable
        onClear={this.onClear}
        style={styles.multiRow}
        interval={interval}
        disabled={disabled}
        styleType={styleType}
        value={myvalue && myvalue.map((item) => item[vLabel]).join("；") || ""}
      />;
    } else {
      return (
        <View>
          <Item
            label={label}
            placeholder={placeholder}
            required={required}
            onPress={this.onClick}
            clearable
            onClear={this.onClear}
            style={styles.multiRow}
            interval={interval}
            disabled={disabled}
            styleType={styleType}
          >
            <View style={styles.right}>
              {
                myvalue && myvalue.length > 0 ? (
                  <View style={styles.multiRight}>
                    <View style={styles.multi}>
                      {
                        myvalue.map((item) => (
                          <Text style={[styles.val, styles.multiText]} key={item.value}>{item[vLabel]}</Text>
                        ))
                      }
                    </View>
                    {
                      !disabled ? (
                        <View style={{height: 80, justifyContent: "center"}}>
                          <AntIcon
                            name="shanchuguanbicha2"
                            size={20} color="#999"
                            onPress={this.onClear}
                            iconStyle={styles.clearIcon}
                          />
                        </View>
                      ) : null
                    }
                  </View>
                ) : (
                    <View style={styles.multiRight}>
                      <Text style={[styles.val, styles.placeholder]}>{placeholder}</Text>
                      <View style={{height: 80, justifyContent: "center"}}>
                        <AntIcon name="you1" size={20} color="#999" iconStyle={styles.clearIcon} />
                      </View>
                    </View>
                  )
              }
            </View>
          </Item>
          <MuliplePicker
            visible={visible}
            pickerData={options}
            selectedValue={myvalue}
            onSure={this.handleSure}
            vLabel={vLabel}
            vValue={vValue}
            onClose={this.onClose}
          />
        </View>
      );
    }
  }
}

/**
 * 遍历出多选的项目
 * @param options 选项列表
 * @param valueArr 选中的数据
 * @param vValue value的key名
 */
function findMultiValue(options: any[], valueArr: any[], vValue: string): any[] {
  return   options.filter(item => valueArr.includes(item[vValue]));
}
