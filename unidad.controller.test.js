const axios = require('axios');
const logger = require('./logger');
const accountApi = require('./account.controller.test');
const categoriaUnidadApi = require('./catetoria-unidad.controller.test');
const URL_API = require('./constant').URL_API;
const querystring = require('querystring');


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


/**
 * obtiene lista de unidades, en base a posicion y elementos de filtrado
 * PUT /unidad/public
 */
async function getListUnidadesPublicSearch() {
    const testUrl = URL_API + '/unidad/public';

    // let categorias = await categoriaUnidadApi.getListCategoriaUnidad();

    try {
        let urlParams = querystring.stringify({
            lat:19.4568192,
            lng:-99.2043008,
            // categoriaId: categorias[0].id
        }); 
        let urlWithParams = testUrl + '?' + urlParams;
        logger.info('TESTING GET '+ urlWithParams);
        let response = await axios.get(urlWithParams);
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
 * obtiene lista de unidades, en base a posicion y elementos de filtrado
 * PUT /unidad/public
 */
async function getListUnidadesPublicAll() {
    const testUrl = URL_API + '/unidad/public';
    try {
        logger.info('TESTING GET '+ testUrl);
        const response = await axios.get(testUrl);
        if (Array.isArray(response.data)) {
            logger.success('success');
            return response.data;
        } else {
            logger.warn('failed');
            throw('Respues no esperada');
        }
    } catch (error) {
        if (error.response.status === 400) {
            logger.success('success')
        } else {
            logger.error('failed');
        }
    }

}

module.exports = {
    getListUnidadesByClient,
    addAllProductsToUnidad,
    getListUnidadesPublicSearch,
    getListUnidadesPublicAll
}