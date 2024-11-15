import { apiEndpoints } from '../config/apiConsts.js'


/**
 * @typedef {Object} ApiEndpoint
 * @property {string} endpoint - Короткое имя для эндпоинта.
 * @property {string} method - HTTP-метод для эндпоинта (GET или POST).
 * @property {string} [url] - Полный URL для эндпоинта (добавляется позже).
*/

export class EndpointsConfig {
    /**
     * @param {ApiEndpoint} endpoints - Путь к ендпоинтам, связанным с пользователем.
    */
    constructor () {
        this.endpoints = apiEndpoints
    }

        /**
         * Получает конфигурацию для указанного эндпоинта.
         * @param {string} endpointName - Имя эндпоинта.
         * @returns {ApiEndpoint|null} - Конфигурация эндпоинта или null, если не найдено.
        */
        getEndpointConfig(endpointName) {
            return this.endpoints[endpointName] || null

        }
    }

export const endpointsConfig = new EndpointsConfig()