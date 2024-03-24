import React from "react";
import { View, Dimensions, TextInput, StyleSheet } from "react-native";
import { EvilIcons} from '@expo/vector-icons';

const heightScreen  = Dimensions.get('window').height;

const Search = ({text, button, width}) => {
    return (
        <View style={[styles.search, { width: width }]}>
            {/* <EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} /> */}
            {button}
            <TextInput
                placeholder={text}
                style={{
                    height: heightScreen / 19,
                    marginLeft: 3
                }}
            >
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    search: { 
        flexDirection: 'row', 
        borderRadius: 10,  
        alignSelf: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white' 
    },

})

export default Search