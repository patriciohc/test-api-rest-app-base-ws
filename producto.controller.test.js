const axios = require('axios');
const logger = require('./logger');
const accountApi = require('./account.controller.test');
const URL_API = require('./constant').URL_API;
const unidadApi = require('./unidad.controller.test');

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
        headers.Authorization = 'Bearer ' + account.token;
    }
}

/**
 * obtiene lista de categorias
 * GET /producto/public
 */
async function getListProductos() {
    const testUrl = URL_API + '/producto/public';

    const unidades = await unidadApi.getListUnidadesPublicAll();

   const urlWithParameters = testUrl + '?unidadId=' + unidades[0].id
    try {
        logger.info('TESTING GET '+ urlWithParameters);
        let response = await axios.get(urlWithParameters);
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
    getListProductos
}