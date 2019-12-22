'use strict';

import React from 'react';
import createReactClass from "create-react-class";
import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';
import _ from 'lodash';


const defaultItemStyle = { color: 'white', fontSize: 26 };
const WheelCurvedPicker = createReactClass ({

	getDefaultProps() {
		return {
			itemSpace: 20
		};
	},

	getInitialState: function() {
		return this._stateFromProps(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState(this._stateFromProps(nextProps));
	},

	_stateFromProps: function(props) {
		let selectedIndex = 0;
		let items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

    let itemStyle = _.assign({}, defaultItemStyle, props.itemStyle);
		let textSize = itemStyle.fontSize
		let textColor =itemStyle.color

		return {selectedIndex, items, textSize, textColor};
	},

	_onValueChange: function(e) {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	},

	render() {
		return <WheelCurvedPickerNative
				{...this.props}
				onValueChange={this._onValueChange}
				data={this.state.items}
				textColor={this.state.textColor}
				textSize={this.state.textSize}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
});


WheelCurvedPicker.Item = createReactClass({
	// propTypes: {
	// 	value: React.any, // string or integer basically
	// 	label: React.string,
	// },

	render: function() {
		// These items don't get rendered directly.
		return null;
	},
});

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
