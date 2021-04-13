import { appConfig, eventDB, firebase } from './config'
import publicIp from "public-ip"

async function fetchProducts() {
    const ip = appConfig.isDev ? appConfig.devApiIp : appConfig.productionApiIp;
    var result = await fetch(ip + '/products')
    result = await result.json()
    return result
}

async function pushEvent(eventType, userId, params = {}) {
    const ip = await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    })
    if (!appConfig.isDev)
        eventDB.collection("FATEvents").add({
            type: eventType,
            userId: userId,
            ipAddress: ip,
            createdAt: firebase.firestore.Timestamp.now(),
            params: params
        })
}

export { fetchProducts, pushEvent };