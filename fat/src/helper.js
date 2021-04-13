import appConfig from './config'

async function fetchProducts (){
    const ip = appConfig.isDev ? appConfig.devApiIp : appConfig.productionApiIp;
    var result = await fetch(ip + '/products')
    result = await result.json()
    return result
}

export default fetchProducts;