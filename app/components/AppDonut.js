import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import Svg, { G, Circle } from 'react-native-svg'

export default function Donut({
    percentage = 0,
    radius = 60,
    strokeWidth = 10,
    duration = 500,
    delay = 0,
    textColor,
    max = 100,
}) {

    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;
    const maxPerc = 100 * percentage / max;
    const [strokeDashOffset, setStrokeDashOffset] = useState(circleCircumference - (circleCircumference * maxPerc) / 100)

    useEffect(
        () => {
            const maxPerc = 100 * percentage / max;
            setStrokeDashOffset(circleCircumference - (circleCircumference * maxPerc) / 100);
        }, [percentage]
    )


    return (
        <Svg
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
            <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                <Circle
                    cx='50%'
                    cy='50%'
                    stroke='grey'
                    strokeWidth={strokeWidth}
                    fill='transparent'
                    strokeOpacity={0.3}
                    r={radius}
                />
                <Circle
                    cx='50%'
                    cy='50%'
                    stroke='black'
                    strokeWidth={strokeWidth}
                    fill='transparent'
                    r={radius}
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashOffset}
                    strokeLinecap='round'
                />
            </G>
        </Svg>
    );
}
