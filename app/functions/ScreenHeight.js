import React from 'react';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

const unAvailableHeight = () => {
    return window.height - screen.height;
}

const unAvailableWidth = () => {
    return window.width - screen.width;
}

export { unAvailableHeight, unAvailableWidth };