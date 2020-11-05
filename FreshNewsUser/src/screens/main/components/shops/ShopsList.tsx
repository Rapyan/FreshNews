import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {MontserratRegular} from '../../../../share/fonts';
import {data} from '../../../../share/info';
import {ShopsListItem} from './ShopsListItem';
import {size16, size20, WINDOW_WIDTH} from '../../../../share/consts';
import {NavigationProps} from '../../../../share/interfaces';
import {HeaderText} from '../HeaderText';
import shopsStore from "../../../../stores/ShopsStore";
import {PulseIndicator} from 'react-native-indicators';
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../../../share/components/Header";
import {LogoAndTitle} from "../../../../share/components/LogoAndTitle";
import HeaderContentMarket from "../headerContent/HeaderContentMarket";

interface ShopsListInterface {
    getGeocodeAsync: any,
    navigation: any,
}

@observer
export default class ShopsList extends React.Component<ShopsListInterface, NavigationProps> {

    state = {
        shopData: [],
        refreshing: true,
    }

    async componentDidMount() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            if (toJS(shopsStore.getShopsItem).shops.length > 0) {
                this.setState({
                    refreshing: false,
                    shopData: toJS(shopsStore.getShopsItem)
                })
            }
        }, 1000)
    };

    onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false,
                shopData: toJS(shopsStore.getShopsItem)
            })
        }, 1000)
    };

    handleNavigation(id: number) {
        shopsStore.getShop(id)
        this.props.navigation.navigate('ShopPage')
    };

    render() {
        return (
            <View style={styles.shopsListContainer}>
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
                            <>
                                <Header
                                    style={{
                                        width: WINDOW_WIDTH,
                                        paddingTop: size20,
                                    }}
                                    headerLeft={
                                        <AntDesign
                                            onPress={() => this.props.navigation.goBack()}
                                            style={{paddingLeft: 8}}
                                            name={'left'}
                                            size={size16}
                                            color={'#000'}
                                        />
                                    }
                                    headerMid={
                                        <LogoAndTitle/>
                                    }
                                />
                                <FlatList
                                    ListHeaderComponent={
                                        <>
                                            <HeaderContentMarket
                                                name={this.props.navigation.state.params.shopName}
                                                navigation={this.props.navigation}
                                            />
                                            <HeaderText
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    alignSelf: "center",
                                                }}
                                                title={'Магазины ринка'}
                                            />
                                        </>
                                    }
                                    scrollEnabled={true}
                                    keyExtractor={item => item.id.toString()}
                                    showsVerticalScrollIndicator={true}
                                    data={this.state.shopData.length === 0 ? data : this.state.shopData.shops}
                                    renderItem={({item, index}) => (
                                        <ShopsListItem
                                            key={index}
                                            logo={item.image}
                                            time={item.time}
                                            name={item.name}
                                            rating={item.rating}
                                            reviews={item.reviews_count}
                                            backgroundImage={item.background_image}
                                            onPressNavigation={() => this.handleNavigation(item.id)}
                                        />
                                    )}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                />
                            </>
                        )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shopsListContainer: {width: '100%', flex: 1},
    footerContainer: {
        backgroundColor: '#F5F4F4',
        alignItems: 'flex-start',
        paddingLeft: 30,
        flex: 1,
        paddingTop: 16,
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: size16,
        fontFamily: MontserratRegular,
        textAlign: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 29,
    },
    categoryContainer: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
});