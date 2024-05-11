import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, ScrollView, TextInput } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import SliderCustomLabel from "../../components/SliderCustomLabel";
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';


const { height: heightScreen } = Dimensions.get('window');

const textTransformer = (value: any) => {
    return '$' + value + 'k';
};

const TIME = { min: 0, max: 50 }
const SliderPad = 12;


const DoubleSlider = ({ }) => {
    const { min, max } = TIME;
    const [width, setWidth] = useState(280);
    const [selected, setSelected] = useState(null);

    if (!selected) {
        setSelected([min, max]);
    }

    const onLayout = (event: any) => {
        setWidth(event.nativeEvent.layout.width - SliderPad * 2);
    };
    const onValuesChangeFinish = (values: any) => {
        setSelected(values);
    };

    return (
        <View onLayout={onLayout} style={styles.wrapper}>
            <MultiSlider
                min={min}
                max={max}
                allowOverlap
                values={selected}
                sliderLength={width}
                onValuesChangeFinish={onValuesChangeFinish}
                enableLabel={true}
                customLabel={SliderCustomLabel(textTransformer)}
                trackStyle={{
                    height: 3,
                    borderRadius: 8,
                }}
                markerOffsetY={3}
                selectedStyle={{
                    backgroundColor: "#FF9228",
                }}
                unselectedStyle={{
                    backgroundColor: "#CCC4C2",
                }}

                markerStyle={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 3,
                    borderColor: "#000000",
                }}
            />
        </View>
    );
}

const DropDownList = () => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Tìm kiếm' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //     // <AntDesign
            //     //     style={styles.icon}
            //     //     color={isFocus ? 'blue' : 'black'}
            //     //     name="Safety"
            //     //     size={20}
            //     // />
            // )}
            renderItem={renderItem}
        />
    )
}


export default function Filter() {

    const jobType = [
        {
            index: 1,
            title: 'On-site',
        },

        {
            index: 2,
            title: 'Hybird',
        },

        {
            index: 3,
            title: 'Remote',
        },
    ]

    const navigation = useNavigation();
    const [chosenCheckBox, setChosenCheckBox] = useState(-1);

    const handleCheckBoxIndex = (index: any) => {
        setChosenCheckBox(index === chosenCheckBox ? -1 : index);
    }

    const reset = () => {
        setChosenCheckBox(-1)
    }

    return (
        <View style={{ backgroundColor: '#F5F5F5', height: '100%', justifyContent: 'space-between' }}>
            <SafeAreaView style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ color: '#150B3D', fontSize: 22, fontWeight: '600', textAlign: 'center', width: '100%' }}>Filter</Text>
                </View>
                <Text style={styles.text}>Chuyên môn</Text>
                <DropDownList></DropDownList>

                <Text style={styles.text}>Nghề nghiệp</Text>
                <DropDownList></DropDownList>

                <Text style={styles.text}>Location</Text>
                <View style={{ height: 45, borderWidth: 0.5, borderRadius: 10, width: '95%', alignSelf: 'center', borderColor: 'gray', justifyContent: 'center' }}>
                    <TextInput style={{ marginLeft: 5 }}></TextInput>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text}>Lương thấp nhất</Text>
                        <Text style={styles.text}>Lương cao nhất</Text>
                    </View>
                    <DoubleSlider />
                </View>

                <Text style={styles.text}>Loại hình làm việc</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <View style={styles.textJobType}>
                        <Text style={{ fontSize: 13 }}>Full time</Text>
                    </View >

                    <View style={styles.textJobType}>
                        <Text style={{ fontSize: 13 }}>Past time</Text>
                    </View>

                    <View style={styles.textJobType}>
                        <Text style={{ fontSize: 13 }}>Remote</Text>
                    </View>
                </View>

                <Text style={styles.text}>Loại hình làm việc</Text>
                {jobType.map((type, index) => (
                    <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center' }} key={type.index}>
                        <TouchableOpacity onPress={() => handleCheckBoxIndex(type.index)}>
                            <MaterialIcons
                                name={chosenCheckBox === type.index ? "radio-button-checked" : "radio-button-unchecked"}
                                size={24}
                                color={chosenCheckBox === type.index ? "#FF9228" : "#524B6B"}
                            />
                        </TouchableOpacity>
                        <View style={{ rowGap: 5 }}>
                            <Text>{type.title}</Text>
                            {/* <Text style={{ color: '#AAA6B9' }}>{type.describe}</Text> */}
                        </View>
                    </View>
                ))}


            </SafeAreaView >
            <View style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                marginHorizontal: 20,
                // position: 'absolute',
                // bottom: 0,
                columnGap: 10,
                alignSelf: 'center'
            }}>
                <TouchableOpacity style={[styles.buttonApply, { backgroundColor: '#FFF', width: '30%' }]} onPress={reset}>
                    <Text style={{ color: 'red' }}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonApply, { backgroundColor: '#130160', width: '68%' }]}>
                    <Text style={{ color: '#FFF' }}>Apply now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        // backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        marginVertical: 10,
        rowGap: 20,
        justifyContent: 'space-between',
    },

    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textItem: {
        flex: 1,
        fontSize: 14,
    },

    wrapper: {
        marginHorizontal: SliderPad * 2,
        justifyContent: "center",
        alignItems: "center",
    },

    dropdown: {
        width: '96%',
        alignSelf: 'center',
        height: 45,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    placeholderStyle: {
        fontSize: 12,
        color: 'gray'
    },

    selectedTextStyle: {
        fontSize: 14,
    },

    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    text: {
        fontSize: 14,
        color: '#150B3D',
        fontWeight: '500'
    },

    textJobType: {
        backgroundColor: '#FFD6AD',
        paddingVertical: 8,
        paddingHorizontal: 35,
        borderRadius: 6,
    },

    buttonApply: {
        paddingVertical: heightScreen / 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
});
