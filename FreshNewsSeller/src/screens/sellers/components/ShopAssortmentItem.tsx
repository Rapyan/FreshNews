import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {WINDOW_WIDTH} from "../../../share/consts";
import {MontserratMedium, MontserratSemiBold} from "../../../share/fonts";

export const ShopAssortmentItem = (
    {id, title, number, image, handleOpenEditModal, handleOpenInfoModal}:
        { id: any, title: string, number: number, image: string, handleOpenEditModal: any, handleOpenInfoModal: any }
) => {
    return (
        <TouchableOpacity
            onPress={() => handleOpenInfoModal(id)}
            style={{
                width: WINDOW_WIDTH / 2.2,
                height: 220,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: number < 6 ? 'rgba(217, 99, 99, .1)' : '#fff',
                borderColor: number < 6 ? 'rgba(212, 46, 46, .1)' : '#fff',
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 10,
                paddingRight: 15,
                paddingLeft: 15,
            }}
        >
            <Image
                source={{uri: image}}
                style={{
                    width: 135,
                    height: 100,
                }}
                resizeMode={"cover"}
            />
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: "center",
                    marginBottom: 15
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: '400',
                        fontFamily: MontserratMedium,
                        textAlign: "center"
                    }}
                >
                    {title}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: '100%'
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: number < 6 ? '#d96363' : '#8cc83f',
                            fontFamily: MontserratSemiBold
                        }}
                    >
                        {number} {''}
                        <Text
                            style={{
                                fontFamily: MontserratMedium,
                                color: '#000'
                            }}
                        >
                            ед.
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleOpenEditModal(id)}
                    style={{
                        height: 20,
                        borderRadius: 8,
                        backgroundColor: number < 6 ? '#d96363' : '#8cc83f',
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 7,
                        paddingRight: 7
                    }}
                >
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: '400',
                            fontFamily: MontserratMedium,
                            color: '#fff'
                        }}
                    >
                        Изменить
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
