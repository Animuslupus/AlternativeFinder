import { appConfig, eventDB, firebase } from './config'
import publicIp from "public-ip"
import cookie from 'react-cookies'
import { deviceDetect } from 'react-device-detect'

const userId = cookie.load('userId');
const deviceInfo = deviceDetect()


async function fetchProducts(lng) {
    const ip = appConfig.isDev ? appConfig.devApiIp : appConfig.productionApiIp;
    let result = await fetch(ip + '/altproducts');
    result = await result.json();


    let suf = lng === 'en' ? 'English' : 'German';
    let results_mapped = result.map((x) => {
        return {
            ...x,
            name: x['name' + suf],
            category: x['category' + suf],
            alternatives: x['alternatives'].map(alt => {
                return ({
                    ...alt,
                    name: alt['name' + suf],
                    category: alt['category' + suf],
                    description: alt['description' + suf],
                })
            })
        }
    });
    return results_mapped
}

async function pushEvent(eventType, params = {}) {
    const ip = await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    })
    const eventData = {
        type: eventType,
        userId: userId ? userId : '',
        ipAddress: ip,
        deviceInfo: deviceInfo,
        createdAt: firebase.firestore.Timestamp.now(),
        params: params
    }
    if (!appConfig.isDev)
        eventDB.collection("FATEvents").add(eventData)
    else
        console.log(eventData)
}

function shuffle(array) {
    // From: https://github.com/coolaj86/knuth-shuffle
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function capitalize(string) {
    if (string)
        return string.replace(/^\w/, (c) => c.toUpperCase());
    else
        return string
}

export { fetchProducts, pushEvent, capitalize, shuffle };