import { appConfig, eventDB, firebase } from './config'
import publicIp from "public-ip"
import cookie from 'react-cookies'

const userId = cookie.load('userId');

async function fetchProducts(lng) {
    const ip = appConfig.isDev ? appConfig.devApiIp : appConfig.productionApiIp;
    let result = await fetch(ip + '/products');
    result = await result.json();


    let suf=lng == 'en'? 'English' : 'German';
    let results_mapped = result.map((x)=>{
        return{
            ...x,
            name: x['name'+suf],
            category: x['category'+suf],
        }
    });
    return results_mapped
}

async function pushEvent(eventType, params = {}) {
    const ip = await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    })
    if (!appConfig.isDev)
        eventDB.collection("FATEvents").add({
            type: eventType,
            userId: userId?userId:'',
            ipAddress: ip,
            createdAt: firebase.firestore.Timestamp.now(),
            params: params
        })
}

export { fetchProducts, pushEvent };