// @ts-ignore
import {action, observable} from 'mobx';
// import Geolocation from 'react-native-geolocation-service';
import {Region} from '../share/interfaces';

class LocationStore {
    @observable locationUser: Region = {
        latitude: 55.755826,
        longitude: 37.6173,
        latitudeDelta: 0.0013,
        longitudeDelta: 0.0004,
    };

    @action
    getUserLocation = async () => {
        // await Geolocation.getCurrentPosition(
        //     position => {
        //         this.locationUser = {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //             latitudeDelta: 0.0113,
        //             longitudeDelta: 0.0004,
        //         };
        //         console.log(position);
        //     },
        //     error => {
        //         // See error code charts below.
        //         console.log(error.code, error.message);
        //     },
        //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        // );
    };
}

const locationStore = new LocationStore();
export default locationStore;
