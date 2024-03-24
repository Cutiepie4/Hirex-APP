import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    runOnJS,
} from 'react-native-reanimated';

// Define the type for the context
type GestureHandlerContext = {
    startX: number;
};

const RangeSlider = ({ sliderWidth, min, max, step, onValueChange }: {
    sliderWidth: number;
    min: number;
    max: number;
    step: number;
    onValueChange: ({ min, max }: { min: number; max: number; }) => void;
}) => {
    const position = useSharedValue(0);
    const position2 = useSharedValue(sliderWidth);
    const opacity = useSharedValue(0);
    const opacity2 = useSharedValue(0);
    const zIndex = useSharedValue(0);
    const zIndex2 = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureHandlerContext>({
        onStart: (_, ctx) => {
            ctx.startX = position.value;
        },
        onActive: (event, ctx) => {
            opacity.value = 1;
            position.value = event.translationX + ctx.startX;
            if (position.value < 0) {
                position.value = 0;
            } else if (position.value > position2.value) {
                position.value = position2.value;
                zIndex.value = 1;
                zIndex2.value = 0;
            }
        },
        onEnd: () => {
            opacity.value = 0;
            runOnJS(onValueChange)({
                min:
                    min +
                    Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
                        step,
                max:
                    min +
                    Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
                        step,
            });
        },
    });

    const gestureHandler2 = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureHandlerContext>({
        onStart: (_, ctx) => {
            ctx.startX = position2.value;
        },
        onActive: (event, ctx) => {
            opacity2.value = 1;
            position2.value = event.translationX + ctx.startX;
            if (position2.value > sliderWidth) {
                position2.value = sliderWidth;
            } else if (position2.value < position.value) {
                position2.value = position.value;
                zIndex.value = 0;
                zIndex2.value = 1;
            }
        },
        onEnd: () => {
            opacity2.value = 0;
            runOnJS(onValueChange)({
                min:
                    min +
                    Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
                        step,
                max:
                    min +
                    Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
                        step,
            });
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
        zIndex: zIndex.value,
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        transform: [{ translateX: position2.value }],
        zIndex: zIndex2.value,
    }));

    const opacityStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const opacityStyle2 = useAnimatedStyle(() => ({
        opacity: opacity2.value,
    }));

    const sliderStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
        width: position2.value - position.value,
    }));

    return (
        <View style={[styles.sliderContainer, { width: sliderWidth }]}>
            <View style={[styles.sliderBack, { width: sliderWidth }]} />
            <Animated.View style={[sliderStyle, styles.sliderFront]} />
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[animatedStyle, styles.thumb]}>
                    <Animated.View style={[opacityStyle, styles.label]}>
                        <TextInput
                            style={styles.labelText}
                            editable={false}
                            defaultValue={'0'}
                        />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler onGestureEvent={gestureHandler2}>
                <Animated.View style={[animatedStyle2, styles.thumb]}>
                    <Animated.View style={[opacityStyle2, styles.label]}>
                        <TextInput
                            style={styles.labelText}
                            editable={false}
                            defaultValue={'0'}
                        />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default RangeSlider;

const styles = StyleSheet.create({
    sliderContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    sliderBack: {
        height: 8,
        backgroundColor: '#DFEAFB',
        borderRadius: 20,
    },
    sliderFront: {
        height: 8,
        backgroundColor: '#3F4CF6',
        borderRadius: 20,
        position: 'absolute',
    },
    thumb: {
        left: -10,
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundColor: 'white',
        borderColor: '#3F4CF6',
        borderWidth: 5,
        borderRadius: 10,
    },
    label: {
        position: 'absolute',
        top: -40,
        bottom: 20,
        backgroundColor: 'black',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: 'white',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
    },
});
