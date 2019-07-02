const axios = require('axios');
const logger = require('./logger');
const accountApi = require('./account.controller.test');
const URL_API = require('./constant').URL_API;

var headers = {
    Authorization: undefined
}
var account = undefined;

/**
 * esta funcion inicicializa los haders con el token para poder 
 * hacer llamadas a la API 
 */
async function init() {
    if (account == undefined) {
        account = await accountApi.getAccount();
    }
    if (headers.Authorization == undefined) {
        headers.Authorization = 'Bearer  ' + account.token;
    }
}

/**
 * obtiene lista de unidades en base al cliente logueado
 * GET /unidad
 */
async function getListUnidadesByClient() {
    const testUrl = URL_API + '/unidad';
    try {
        await init();
        logger.info('TESTING GET '+ testUrl);
        let response = await axios.get(testUrl, {headers});
        if (Array.isArray(response.data)) {
            logger.success('success');
            return response.data;
        } else {
            logger.warn('failed');
            throw('Respues no esperada');
        }
    } catch (error) {
        logger.error('failed');
        throw error;
    }
}

/**
 * agrega todos los productos a una unidad
 * PUT /unidad/:id/productos
 */
async function addAllProductsToUnidad() {
    try {
        let list = await getListUnidadesByClient();
        if (list.length > 0) {
            const testUrl = URL_API + '/unidad/' + list[0].id + '/productos?all=true'
            logger.info('TESTING PUT '+ testUrl);
            let response = await axios.get(testUrl, {headers});
            logger.success('success');
        } else {
            logger.warn('failed')
            throw('No hay unidaddes para probrar')
        }
        return response.data;
    } catch (error) {
        logger.error('failed');
        if (error.message) logger.error(error.message)
        throw error;
    }
}

module.exports = {
    getListUnidadesByClient,
    addAllProductsToUnidad
}