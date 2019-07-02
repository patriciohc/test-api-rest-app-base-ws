const axios = require('axios');
const logger = require('./logger');
const URL_API = require('./constant').URL_API;
const CREDENTIALS = require('./constant').CREDENTIALS;

/**
 * GET /account/tokenrefresh 
 */
async function getTokenrefresh() {
    const testUrl = URL_API + '/account/tokenrefresh';
    const headers = {
        Authorization: "Basic " + CREDENTIALS
    }
    try {
        logger.info('TESTING GET ' + testUrl);
        let response = await axios.get(testUrl, {headers});
        if (response.data.token && typeof response.data.token == 'string') {
            logger.success('success');
            return response.data.token;
        } else {
            logger.warn('failed');
            throw('respuesta no esperada');
        }
    } catch (error) {
        logger.error('failed');
        throw error;
    }
}

/**
 * GET /account 
 */
async function getAccount() {
    let testUrl = URL_API + '/account?tipo=socio'
    try {
        let token = await getTokenrefresh();
        const headers = {
            Authorization: 'Bearer  ' + token
        }
        logger.info('TESTING GET ' + testUrl);
        let response = await axios.get(testUrl, {headers})
        if (response.data.token && typeof response.data.token == 'string') {
            logger.success('success');
            return response.data
        } else {
            logger.warn('failed');
            throw('respuesta no esperada');
        }
    } catch (error) {
        logger.error('failed');
        throw error;
    }
}

module.exports = {
    getTokenrefresh,
    getAccount
}