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
 * obtiene lista de categorias
 * GET /categoria-unidad
 */
async function getListCategoriaUnidad() {
    const testUrl = URL_API + '/categoria-unidad';
    try {
        logger.info('TESTING GET '+ testUrl);
        let response = await axios.get(testUrl);
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

module.exports = {
    getListCategoriaUnidad
}