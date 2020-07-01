const axios = require('axios');
const logger = require('./logger');
const URL_API = require('./constant').URL_API;
const CREDENTIALS = require('./constant').CREDENTIALS;
const firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "AIzaSyD5dt4bZipYnSUboDpzTvr84AoNiUWJjFg",
    authDomain: "logposeapp.firebaseapp.com",
    databaseURL: "https://logposeapp.firebaseio.com",
    projectId: "logposeapp",
    storageBucket: "logposeapp.appspot.com",
    messagingSenderId: "251307182807",
    appId: "1:251307182807:web:5e28e6e95957d908c27e92"
});

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
async function getAccount(tipo='socio') {
    let testUrl = URL_API + '/account?tipo=' + tipo
    try {
        let token = await getTokenrefresh();
        await app.auth().signInWithCustomToken(token);
        const idToken = await app.auth().currentUser.getIdToken(true)

        const headers = {
            Authorization: 'Bearer ' + idToken
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