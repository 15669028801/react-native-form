/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps, StyleProp, ViewStyle } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: string;
  size?: number;
  color?: string | string[];
  style?: StyleProp<ViewStyle>;
  adaptive?: boolean;
  onPress?: () => void;
}

declare const Icon: FunctionComponent<Props>;

export = Icon;
