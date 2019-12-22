import { StyleSheet } from "react-native";

export const placeholderTextColor = "#999";
export const itemInputFontSize = (30);
const color = "#35BCAB";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    flex: 1,
    height: "100%",
  },
  main: {
    flex: 1,
    paddingBottom: (200),
  },
  bottom: {
    paddingHorizontal: (10),
    paddingVertical: (15),
    backgroundColor: "#fff",
  },
  btn: {
    height: (100),
    lineHeight: (100),
    backgroundColor: color,
    textAlign: "center",
    fontSize: (36),
    color: "#fff",
  },
});

// 表单公共样式
export const itemStyle = StyleSheet.create({
  labelWidth: {
    width: (300),
  },
  row: {
    position: "relative",
    flexDirection: "row",
    paddingHorizontal: (29),
    paddingVertical: (20),
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  interval: {
    marginBottom: (20),
  },
  label: {
    width: (300),
    color: "#030303",
    fontSize: (36),
    height: (80),
    textAlignVertical: "center",
    lineHeight: (80),
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  clearIcon: {
    height: "100%",
    textAlignVertical: "center",
    lineHeight: (80),
    padding: (20),
    paddingRight: 0,
  },
  val: {
    flex: 1,
    color: "#030303",
    fontSize: (30),
    textAlign: "right",
    padding: 0,
    minHeight: (80),
    lineHeight: (80),
  },
  bg: {
    backgroundColor: "#fff",
  },
  placeholder: {
    color: placeholderTextColor,
  },
  required: {
    position: "absolute",
    left: (10),
    top: (45),
    color: "#F56C6C",
  },
  textareaRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textarea: {
    minHeight: (200),
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
    borderBottomWidth: (1),
  },
  photoRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  photolist: {
    flexDirection: "row",
    flexWrap: "wrap",
    // flex: 1,
  },
  moneyRow: {
    flexDirection: "row",
    paddingBottom: (10),
  },
  moneyLabel: {
    width: (300),
    color: placeholderTextColor,
    fontSize: (26),
    textAlignVertical: "center",
    paddingVertical: (5),
    paddingHorizontal: (29),
  },
  moneyVal: {
    flex: 1,
    color: placeholderTextColor,
    fontSize: (26),
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
    fontSize: (36),
    padding: 0,
    height: (80),
    marginLeft: (20),
    color,
  },
  lacatVal: {
    textAlign: "left",
  },
  locatlabel: {
    width: (200),
  },
  textNote: {
    fontSize: (25),
    marginBottom: (20),
    color: "#030303",
    paddingLeft: (29),
  },
  particularsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: (29),
    paddingVertical: (20),
  },
  particularsText: {
    fontSize: (25),
    color: "#999",
  },
  particularsDel: {
    color,
  },
  particularsAdd: {
    textAlign: "center",
    paddingVertical: (20),
    fontSize: (40),
    color,
    backgroundColor: "#fff",
  },
  btnTxt: {
    color,
  },
});

// 表单公共样式
export const crmItemStyle = StyleSheet.create({
  labelWidth: {
    width: (300),
  },
  row: {
    position: "relative",
    flexDirection: "row",
    paddingLeft: (29),
    paddingVertical: (20),
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderBottomWidth: (2),
    borderColor: "#F1F1F1",
  },
  interval: {
    marginBottom: (20),
  },
  label: {
    // width: (250),
    color: "#030303",
    fontSize: (30),
    height: (80),
    textAlignVertical: "center",
    lineHeight: (80),
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  clearIcon: {
    height: "100%",
    textAlignVertical: "center",
    lineHeight: (80),
    padding: (20),
    paddingRight: 0,
  },
  val: {
    flex: 1,
    color: "#030303",
    fontSize: (36),
    textAlign: "right",
    padding: 0,
    minHeight: (80),
    lineHeight: (80),
    textAlignVertical: "center",
  },
  bg: {
    backgroundColor: "#fff",
  },
  placeholder: {
    color: "#7C828B",
    fontSize: (15),
  },
  required: {
    position: "absolute",
    left: (10),
    top: (45),
    color: "#F56C6C",
  },
  textareaRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textarea: {
    minHeight: (200),
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
    borderBottomWidth: (1),
  },
  photoRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  photolist: {
    flexDirection: "row",
    flexWrap: "wrap",
    // flex: 1,
  },
  moneyRow: {
    flexDirection: "row",
    paddingBottom: (10),
  },
  moneyLabel: {
    width: (300),
    color: placeholderTextColor,
    fontSize: (26),
    textAlignVertical: "center",
    paddingVertical: (5),
    paddingHorizontal: (29),
  },
  moneyVal: {
    flex: 1,
    color: placeholderTextColor,
    fontSize: (26),
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
    fontSize: (36),
    padding: 0,
    height: (80),
    marginLeft: (20),
    color,
  },
  lacatVal: {
    textAlign: "left",
  },
  locatlabel: {
    width: (200),
  },
  textNote: {
    fontSize: (25),
    marginBottom: (20),
    color: "#030303",
    paddingLeft: (29),
  },
  particularsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: (29),
    paddingVertical: (20),
  },
  particularsText: {
    fontSize: (25),
    color: "#999",
  },
  particularsDel: {
    color,
  },
  particularsAdd: {
    textAlign: "center",
    paddingVertical: (20),
    fontSize: (40),
    color,
    backgroundColor: "#fff",
  },
  btnTxt: {
    color,
  },
});

export const borderItemStyles = Object.assign({}, itemStyle, StyleSheet.create({row: {
  position: "relative",
  flexDirection: "row",
  paddingHorizontal: (29),
  paddingVertical: (20),
  justifyContent: "space-between",
  alignItems: "flex-start",
  backgroundColor: "#fff",
  borderTopWidth: (2),
  borderBottomWidth: (2),
  borderColor: "#999",
}}));

export default styles;
