import React, {Component} from 'react';
import {NavigationProps} from "../../../../share/interfaces";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {size16, size20, WINDOW_WIDTH} from "../../../../share/consts";
import {MontserratBold, MontserratMedium, MontserratRegular, MontserratSemiBold} from "../../../../share/fonts";
import Header from "../../../../share/components/Header";
import {observer} from "mobx-react";
import shopsStore from "../../../../stores/ShopsStore";
// @ts-ignore
import {PulseIndicator} from 'react-native-indicators';
import {toJS} from "mobx";

@observer
export default // @ts-ignore
class PurchaseHistory extends Component<NavigationProps> {

    state = {
        refreshing: false,
        allOrders: null,
    };

    componentDidMount() {
        shopsStore.getAllOrders();
        const newFile = shopsStore.allOrders.map((item: any) => {
            return {...item, bool: false};
        });
        this.setState({
            allOrders: newFile
        })
    };

    handleClick = (id: number) => {
        console.log(id);
        const newItemsArr = this.state.allOrders.map((item: any) => {
            if (item.id == id) {
                item.bool = !item.bool
            }
            return item;
        });
        this.setState({
            allOrders: newItemsArr
        })
    };

    onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            shopsStore.getAllOrders();
            this.setState({
                refreshing: false,
                allOrders: shopsStore.allOrders
            })
        }, 1000)
    };

    renderFinishItem(item: any) {
        console.log('item', toJS(item));
        return (
            <View
                key={item.id}
                style={{
                    width: '100%',
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        width: '65%',
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                >
                    <Text style={{fontSize: 16, fontFamily: MontserratRegular}}>{item.product.name}</Text>
                </View>
                <View
                    style={{
                        width: '35%',
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <Text style={{fontSize: 14, fontFamily: MontserratRegular}}>{item.weight}<Text
                        style={{color: '#8AC83E', fontSize: 14}}> г</Text></Text>
                    <Text style={{fontSize: 14, fontFamily: MontserratRegular}}>{Math.ceil(parseInt(item.price))}<Text
                        style={{color: '#8AC83E', fontSize: 14}}> Р</Text></Text>
                </View>
            </View>
        )
    }

    renderItem(item: any) {
        if (item.status === 1) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FinishOfferPage', {
                        id: item.id,
                        transaction: true,
                        status: item.status
                    })}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#000'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#000'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text>Собирается</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: '100%',
                            height: 50,
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratRegular
                                }}
                            >
                                Дата заказа
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.status === 3) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FinishOfferPage', {
                        id: item.id,
                        transaction: item.transaction,
                    })}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#000'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#000'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        {
                            item.transaction === null
                                ? (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: 'center',
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text>
                                            Ожидает оплаты
                                        </Text>
                                    </View>
                                )
                                : (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: 'center',
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text>
                                            Оплачино
                                        </Text>
                                    </View>
                                )
                        }

                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: '100%',
                            height: 50,
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratRegular
                                }}
                            >
                                Дата заказа
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.status === 4) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FinishOfferPage', {
                        id: item.id,
                        transaction: item.transaction,
                    })}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#000'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#000'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        {
                            item.transaction === null
                                ? (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: 'center',
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text>
                                            Ожидает оплаты
                                        </Text>
                                    </View>
                                )
                                : (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: 'center',
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text>
                                            Оплачино
                                        </Text>
                                    </View>
                                )
                        }

                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: '100%',
                            height: 50,
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratRegular
                                }}
                            >
                                Дата заказа
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.status === 5) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MapPage', {
                        order_id: item.id
                    })}
                    style={{
                        width: "100%",
                        backgroundColor: '#8CC83F',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#fff'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#fff'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text style={{color: '#fff', marginRight: 10}}>В пути</Text>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{
                                    fontFamily: MontserratSemiBold,
                                    color: '#000'
                                }}>{item.delivery_time} мин</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: '100%',
                            height: 50,
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratRegular,
                                    color: '#fff'
                                }}
                            >
                                Дата заказа
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold,
                                    color: '#fff'
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (item.status === 6) {
            console.log('item.items', toJS(item.items[0].price));
            return (
                <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('FinishOfferPage', {
                    //     id: item.id,
                    //     transaction: item.transaction,
                    //     status: item.status
                    // })}
                    onPress={() => this.handleClick(item.id)}
                    style={{
                        width: "100%",
                        backgroundColor: '#F5F4F4',
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        paddingBottom: item.bool ? 20 : 0,
                        marginBottom: 15
                    }}
                    key={item.id}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: MontserratRegular,
                                    color: '#000'
                                }}
                            >
                                Заказ {' '}
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: MontserratBold,
                                        color: '#000'
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Text style={{marginRight: 10}}>Подробнее</Text>
                            <View
                                style={{
                                    backgroundColor: '#8CC83F',
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <FontAwesome5
                                    name={'check'}
                                    size={size16}
                                    color={'#fff'}
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: '100%',
                            height: 50,
                            borderBottomWidth: item.bool ? 1 : 0,
                            marginBottom: item.bool ? 10 : 0
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratRegular
                                }}
                            >
                                Дата заказа
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: MontserratSemiBold
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    </View>
                    {
                        item.bool
                            ? (
                                <View
                                    style={{
                                        width: '100%',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            marginBottom: 60
                                        }}
                                    >
                                        {
                                            item.items.map((item: any) => {
                                                return this.renderFinishItem(item)
                                            })
                                        }
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Text style={{
                                                fontFamily: MontserratMedium,
                                                color: '#000',
                                                fontSize: 17
                                            }}>Итог </Text>
                                            <Text style={{
                                                fontFamily: MontserratSemiBold,
                                                color: '#8CC83F',
                                                fontSize: 17
                                            }}> {Math.ceil(item.items[0].price)}
                                                <Text style={{
                                                    fontFamily: MontserratSemiBold,
                                                    color: '#000',
                                                    fontSize: 17
                                                }}> Р.</Text>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text></Text>
                                        </View>
                                    </View>
                                </View>
                            )
                            : null
                    }
                </TouchableOpacity>
            )
        }
    };

    render() {
        return (
            <>
                <Header
                    style={styles.header}
                    headerLeft={
                        <AntDesign
                            style={{paddingLeft: 8}}
                            onPress={() => this.props.navigation.navigate('MainScreen')}
                            name={'left'}
                            size={18}
                            color={'#464646'}
                        />
                    }
                    headerMid={
                        <Text style={styles.headerMiddleTitle}>
                            История заказов
                        </Text>
                    }
                    headerRight={
                        <View/>
                    }
                />
                {
                    this.state.refreshing
                        ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <PulseIndicator
                                    size={100}
                                    color='#8CC83F'
                                />
                            </View>
                        )
                        : (
                            <ScrollView
                                style={{
                                    flex: 1,
                                }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            >
                                <View
                                    style={{
                                        width: WINDOW_WIDTH - 40,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        paddingTop: 30,
                                        paddingBottom: 50,
                                    }}
                                >
                                    {
                                        this.state.allOrders !== null
                                            ? (
                                                this.state.allOrders.map((item: any) => (
                                                    this.renderItem(item)
                                                ))
                                            )
                                            : (
                                                <View
                                                    style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text>
                                                        У вас нет заказов
                                                    </Text>
                                                </View>
                                            )
                                    }
                                </View>
                            </ScrollView>
                        )
                }
            </>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    header: {
        paddingTop: size16,
        borderBottomWidth: 2,
        opacity: 0.8
    },
    headerMiddleTitle: {
        fontFamily: MontserratRegular,
        fontSize: size20,
        color: '#000000',
    },
});

