import { StyleSheet } from "react-native";

export const placeholderTextColor = "#999";
const defaultFont = 30;
const defaultHeight = 30;
const defultLineHeight = 30;
const labelWidth = 130;
const color = "#35BCAB";

// 表单公共样式
export const detailsStyle = StyleSheet.create({
  labelWidth: {
    width: labelWidth,
  },
  row: {
    position: "relative",
    flexDirection: "row",
    paddingHorizontal: 29,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  interval: {
    marginBottom: 20,
  },
  label: {
    width: labelWidth,
    color: "#999",
    fontSize: defaultFont,
    minHeight: defaultHeight,
    // textAlignVertical: "center",
    textAlign: "right",
    marginRight: 20,
    paddingVertical: 2,
    lineHeight: defultLineHeight,
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  clearIcon: {
    height: "100%",
    textAlignVertical: "center",
    padding: 20,
    paddingRight: 0,
  },
  val: {
    flex: 1,
    color: "#030303",
    fontSize: defaultFont,
    textAlign: "left",
    padding: 0,
    paddingVertical: 2,
    minHeight: defaultHeight,
    lineHeight: defultLineHeight,
    // textAlignVertical: "center",
  },
  bg: {
    backgroundColor: "#fff",
  },
  placeholder: {
    color: placeholderTextColor,
  },
  required: {
    position: "absolute",
    left: 10,
    top: 45,
    color: "#F56C6C",
  },
  textareaRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textarea: {
    minHeight: 200,
    textAlignVertical: "top",
    width: "100%",
    textAlign: "left",
    flex: 0,
    height: "auto",
  },
  multiRow: {
    alignItems: "flex-start",
  },
  multi: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  multiRight: {
    flex: 1,
    flexDirection: "row",
  },
  multiText: {
    flex: 0,
  },
  dateRangeRow: {
    marginBottom: 0,
  },
  border: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  photoRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  photolist: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  moneyRow: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  moneyLabel: {
    width: labelWidth,
    color: "#999",
    fontSize: defaultFont,
    minHeight: defaultHeight,
    // textAlignVertical: "center",
    textAlign: "right",
    marginRight: 20,
    lineHeight: defultLineHeight,
  },
  moneyVal: {
    flex: 1,
    color: placeholderTextColor,
    fontSize: 26,
    textAlign: "right",
    textAlignVertical: "center",
  },
  moneyMain: {
    backgroundColor: "#fff",
  },
  locatRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locatBtn: {
    fontSize: 36,
    padding: 0,
    height: 80,
    marginLeft: 20,
    color,
  },
  lacatVal: {
    textAlign: "left",
  },
  locatlabel: {
    width: labelWidth,
  },
  textNote: {
    fontSize: 25,
    marginBottom: 20,
    color: "#030303",
    paddingLeft: 29,
  },
  particularsTitle: {
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 29,
    paddingVertical: 20,
  },
  particularsText: {
    fontSize: 25,
    color: "#030303",
  },
  particularsDel: {
    color,
  },
  particularsAdd: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 40,
    color,
    backgroundColor: "#fff",
  },
  btnTxt: {
    color,
  },
});
