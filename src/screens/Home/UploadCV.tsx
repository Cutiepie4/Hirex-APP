import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView } from 'react-native'
import { colors, fonts, sizes } from "@/theme";
import google from '@assets/images/google.png'
import { Icon } from "@rneui/base";
import PDF from '@assets/images/PDF.png'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RootNavigation from "@/route/RootNavigation";
import BottomModal from "@/components/BottomModal";
import { BASE_API } from "@/services/BaseApi";
import { toastResponse } from "@/utils/toastResponse";

type Resume = {
    id: number
    nameFile: string
    fileBase64: string
}

export const UploadCV = ({ route }) => {
    let workId = route.params.workId || null;
    const upload = uploadStyle
    const [showBottomModal, setShowBottomModal] = React.useState<boolean>(false)
    const [selected, setSelected] = React.useState<Resume>(null)
    const [resumes, setResumes] = React.useState<Resume[]>([])
    const [information, setInformation] = React.useState<string>(null)
    
    React.useEffect(() => {
        BASE_API.get("resumes").then((res) => {
            setResumes(res.data)
        }).catch((err) => {
            toastResponse({type: 'error', content: err.message})
        })
    }, [])


    const removeUpload = () => {
        setSelected(null)
    }

    return (
        <KeyboardAwareScrollView>
            <View style={upload.container}>
                <View style={upload.logoContainer}>
                    <View style={upload.logo}>
                        <Image source={google} />
                    </View>
                </View>

                <View style={upload.header_container}>

                    <Text style={upload.desc_text_1}>UI/UX Designer</Text>
                    <Text style={upload.desc_text_2}>Google    <Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Carlifornia   <Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   1 day ago</Text>
                </View>

                <View style={{ marginTop: 20, paddingLeft: 25, paddingRight: 25 }}>
                    <View>
                        <Text style={[upload.desc_text_3, { color: colors.primary }]}>Upload CV
                        </Text>
                        <Text style={upload.desc_text_4}>Add your CV/Resume to apply for a job</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={async () => {
                            setShowBottomModal(true)
                        }} style={{ minHeight: 100, backgroundColor: selected ? colors.tertiary_light : 'none', borderColor: colors.primary, borderWidth: selected ? 0 : 1, borderRadius: 25, borderStyle: selected ? "solid" : "dashed" }}>
                            {!selected ? (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
                                <Icon name="upload-file" />
                                <Text style={upload.desc_text_5}>  Choose Your CV/Resume</Text>
                            </View>) : (<View style={{ minHeight: 100 }}>
                                <View style={{ margin: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={PDF} style={{ width: 50, height: 50 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text numberOfLines={1} style={[upload.desc_text_5]}>{selected?.nameFile}</Text>
                                        {/* <Text style={upload.desc_text_6}>{selected?.updatedAt}</Text> */}
                                    </View>

                                </View>
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 0, marginBottom: 20 }} onPress={removeUpload} >
                                    <Icon color={'red'} name="delete" size={30} />
                                    <Text style={[upload.desc_text_6, { color: 'red' }]}>Remove file</Text>
                                </TouchableOpacity>
                            </View>)}

                        </TouchableOpacity>
                    </View>



                    <View style={{ marginTop: 20 }}>
                        <Text style={[upload.desc_text_3, { color: colors.primary }]}>Information
                        </Text>
                        <View style={{ marginTop: 20 }}>
                            <KeyboardAvoidingView>
                                <TextInput style={{
                                        height: 230,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        fontSize: sizes.h12,
                                        fontFamily: fonts.dMSans.regular,
                                        color: colors.primary,
                                        padding: 25, display: 'flex'
                                    }} textAlignVertical="top" 
                                    placeholder={`Explain why you are the right person for ${'\n'}the job`} 
                                    multiline
                                    value={information}
                                    onChangeText={setInformation}
                                >
                                </TextInput>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </View>


                <View style={{ position: 'absolute', width: '100%', height: 70, backgroundColor: colors.background, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {/* Bottom button */}

                    <TouchableOpacity onPress={() => {
                        if (selected) {
                            BASE_API.post('resume_works', {
                                resumeId: selected.id,
                                workId: workId,
                                informartion: information
                            })
                                .then((res) => {
                                    RootNavigation.navigate("UploadCVSuccess", {
                                        filename: selected?.nameFile, filesize: 1000
                                    })
                                }).catch((err) => {
                                    toastResponse({type: 'error', content: err.message})
                                })
                        } else {
                            Alert.alert('NO FILE SELECTED', 'Please select a file for upload')
                        }
                    }} style={{ height: 50, width: '80%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                        <Text style={[upload.desc_text_3, { color: 'white' }]}>APPLY NOW</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <BottomModal
                showBottomModal={showBottomModal}
                setShowBottomModal={setShowBottomModal}
                options={resumes.map(resume => {
                    return {
                        icon: <Image source={PDF} style={{ width: 40, height: 40 }} />,
                        title: resume.nameFile,
                        onPressOption: () => {
                            setShowBottomModal(false)
                            setSelected(resume)
                        }
                    }
                })}
            />
        </KeyboardAwareScrollView>
    )
}

export default UploadCV;

const uploadStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background_2,
        display: 'flex',
        position: 'relative',
        height: '100%',
        paddingTop: '15%',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        zIndex: 2
    },
    logo: {
        height: 70,
        width: 70,
        backgroundColor: colors.incognito,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    header_container: {
        height: 130,
        backgroundColor: colors.grey,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: -20,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h16,
        color: colors.primary
    },
    desc_text_2: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h16,
        color: colors.primary,
        marginTop: 15
    },
    desc_text_3: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h14
    },
    desc_text_4: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        marginTop: 10
    },
    desc_text_5: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.primary

    },
    desc_text_6: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.nega

    },
})
