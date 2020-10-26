import {action, observable, toJS} from 'mobx';
import axios from 'axios';
import {SERVER_BASE} from "../share/consts";
import AsyncStorage from "@react-native-community/async-storage";

class PaymentStore {
    @observable isSelectedPayment: string = 'online';
    @observable cartUserInfo: any = [];
    @observable order: any = null;
    @observable time: any = [];
    @observable selectAddress: any = [];
    @observable selectTime: any = [];
    @observable Error: any = null;

    @action
    onSelectPayment = (value: string) => {
        this.isSelectedPayment = value
    };

    @action
    orderUserTime = async () => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};

        axios.get(`${SERVER_BASE}/orders/time`, {headers})
            .then((res) => {
                this.time = res.data;
            })
            .catch((e) => {
                console.log('orderUserTime error', e)
                this.Error = e
            })
    };

    @action
    getOrder = async (id: any) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let strTrue = str.substring(0, str.length - 1)
        const headers = {Authorization: `Bearer ${strTrue}`};
        console.log(`${SERVER_BASE}/orders/show/${id}`);
        axios.get(`${SERVER_BASE}/orders/show/${id}`, {headers})
            .then((res) => {
                this.order = res.data;
            })
            .catch((e) => {
                console.log('getOrder error', e)
                this.Error = e
            })
    };

    @action
    orderUserCheckout = async (address: string, porch: string, floor: number, intercom: string, comment: string, date: string, time: string) => {
        let getToken = await AsyncStorage.getItem('Token')
        let str = getToken.slice(1)
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${str}`);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(`${SERVER_BASE}/orders/checkout?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}comment=${comment}&date=${date}&time=${time}`)

        fetch(`${SERVER_BASE}/orders/checkout?address=${address}&porch=${porch}&floor=${floor}&intercom=${intercom}comment=${comment}&date=${date}&time=${time}`, requestOptions)
            .then(res => {
                console.log('res pay===--------', res)
            })
            .catch((e) => {
                console.log('orderUserTime error', e)
                this.Error = e
            })
    };

    @action
    getSelectAddress = async (address: any) => {
        this.selectAddress = address;
    }

    @action
    getSelectTime = async (time: any) => {
        this.selectTime = time;
    };

    @action
    finishPayment = async (id: any, payment: any) => {
        let pay;
        if (payment === 'cardToCourier') {
            pay = 2
        } else if (payment === 'cash') {
            pay= 3
        } else if (payment === 'online') {
            pay = 1
        }
        let getToken = await AsyncStorage.getItem('Token');
        let str = getToken.slice(1);
        let strTrue = str.substring(0, str.length - 1);
        const headers = {Authorization: `Bearer ${strTrue}`};
        console.log(`${SERVER_BASE}/transactions/?order_id=${id}&type=${pay}`);
        var requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow'
        };
        fetch(`${SERVER_BASE}/transactions/?order_id=${id}&type=${pay}`, requestOptions)
            .then((res) => {
                console.log('res', res)
                this.order = res;
            })
            .catch((e) => {
                console.log('finishPayment error', e)
                this.Error = e
            })
    }

    @action
    closeErrorModal = () => {
        this.Error = null;
    };
}

const paymentStore = new PaymentStore();
export default paymentStore;
