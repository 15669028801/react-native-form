import { StyleSheet } from 'react-native'
import { shadow } from "../../utils";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 0.5,
    ...shadow(3, 0, 2, 0.25, 10, "#000"),
  },
  title: {
    flex: 1,
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    zIndex: 3
  },
  main:{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 5,
  },
  between: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  row2: {
    flexDirection: "row",
    
  },
  tab: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#888",
    lineHeight: 40,
    height: 40,
  },
  activeTab: {
    fontWeight: "600",
    borderBottomWidth: 2,
    color: "#030303",
  },
  timeMain: {
    backgroundColor: "#fff",
  }
});

export const multipleStyles = StyleSheet.create({
  main: {
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1,
  },
  picker__item: {
    color: "#333333",
    fontSize: 26,
  },
  scroll: {
    height: 350,
    padding: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    backgroundColor: "#d3d3d3",
    height: 220,
  },
  checked: {
    padding: 10,
  },
  mask: {
    flex: 1,
  }
})

export default styles;