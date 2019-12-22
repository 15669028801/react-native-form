import * as React from "react";
import { ReactElement } from "react";
// import glyphMap from "../assets/font/iconfont.json";
import { StyleProp, ViewStyle } from "react-native";
import Icon from "./iconfont/Icon.js";

// const Icon = createIconSet(glyphMap, "iconfont", "iconfont.ttf");

// 图标配置项
export interface IIconConfig {
  name: string;
  size: number;
  color?: string;
  iconStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  borderRadius?: number;
  adaptive?: boolean; // icon字号size 是否需要自适应，默认false
  onPress?: () => void;
  children?: ReactElement;
}

// 字体图标组件
export const AntIcon = ( { size = 20, color = "#999", adaptive = false, ...other }: IIconConfig) => (
  <Icon
    name={other.name}
    size={size}
    color={color}
    onPress={other.onPress}
    style={other.iconStyle}
  />
);
