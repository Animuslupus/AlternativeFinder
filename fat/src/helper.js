import {appConfig, eventDB, firebase} from './config'

async function fetchProducts (){
    const ip = appConfig.isDev ? appConfig.devApiIp : appConfig.productionApiIp;
    var result = await fetch(ip + '/products')
    result = await result.json()
    return result
}

function pushEvent(eventType, userId, params={}){
    eventDB.collection("FATEvents").add({
        type:eventType,
        userId:userId,
        createdAt: firebase.firestore.Timestamp.now(),
        params: params
    })
}

export {fetchProducts, pushEvent};