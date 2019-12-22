import React, { Component } from "react";
import { Button, Modal, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import CheckBox from "react-native-check-box";
import $styles, { multipleStyles as styles } from "../style";

interface IProps {
  visible: boolean;
  pickerData: any[];
  selectedValue: any[];
  vValue?: string;
  vLabel?: string;
  title?: string;
  onSure: (value) => void;
  onClose: () => void;
}

/**
 * 多选picker
 */
export class MuliplePicker extends Component<IProps, any> {
  public static defaultProps = {
    vValue: "value",
    vLabel: "label",
    titel: "请选择",
  };
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      checkedList: [],
    };
    this._onSure = this._onSure.bind(this);
    this.computeCheckedValueList = this.computeCheckedValueList.bind(this);
  }
  public componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue) {
      const nextValue = this.computeCheckedValueList(nextProps.selectedValue).sort().toString();
      const nowValue = this.computeCheckedValueList().sort().toString();
      if (nextValue !== nowValue) {
        this.setState({checkedList: nextProps.selectedValue});
      }
    }
  }
  public _onSure() {
    const { onSure, onClose } = this.props;
    const { checkedList } = this.state;
    onClose();
    if (onSure) {
      onSure(checkedList);
    }
  }
  public computeCheckedValueList(arr = null) {
    const { vValue = "value" } = this.props;
    const checkedList = arr || this.state.checkedList;
    return checkedList.map((item) => item[vValue]);
  }
  public handleChecked(item) {
    const { vValue = "value" } = this.props;

    const list = this.computeCheckedValueList();
    const index = list.indexOf(item[vValue]);
    this.setState((state) => {
      if (index === -1) {
        state.checkedList.push(item);
      } else {
        state.checkedList.splice(index, 1);
      }
      return {checkedList: state.checkedList};
    });
  }
  public render() {
    const {
      pickerData = [],
      vLabel = "label",
      vValue = "value",
      visible = false,
      onClose,
      title,
    } = this.props;

    const selectValueList = this.computeCheckedValueList();
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}
      >
        <View style={styles.main}>
          {/* 空白点击 */}
          <TouchableWithoutFeedback onPress={onClose}><View style={styles.mask}></View></TouchableWithoutFeedback>
          <View>
            {/* header */}
            <View style={$styles.row}>
              <Button title={"取消"} color={"#578EF3"} onPress={onClose} />
              <Text style={{ textAlign: "center" }}>{title ? title : "请选择"}</Text>
              <Button title={"确认"} color={"#578EF3"} onPress={this._onSure} />
            </View>
            <ScrollView style={styles.scroll} >
              {
                pickerData && pickerData.map((item, index) => (
                  <CheckBox
                    key={item[vValue]}
                    style={styles.checked}
                    onClick={this.handleChecked.bind(this, item, index)}
                    isChecked={selectValueList.indexOf(item[vValue]) !== -1}
                    rightText={item[vLabel]}
                  />
                ))
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MuliplePicker;
