const axios = require('axios');
const logger = require('./logger');
const accountApi = require('./account.controller.test');
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
        account = await accountApi.getAccount('empleado');
    }
    if (headers.Authorization == undefined) {
        headers.Authorization = 'Bearer ' + account.token;
    }
}


/**
 * crear un nuevo empleado
 * POST empleado/
 */
async function createEmpeloyed() {
    try {
        await init();
        const testUrl = URL_API + '/empleado/'
        logger.info('TESTING POST '+ testUrl);
        const empleado = {}
        let response = await axios.post(testUrl, empleado, {headers});
        logger.success('success');
        return response.data;
    } catch (error) {
        logger.error('failed');
        if (error.message) logger.error(error.message)
        throw error;
    }
}


module.exports = {
    createEmpeloyed
}