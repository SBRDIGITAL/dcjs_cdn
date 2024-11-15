/**
 * Константы для HTTP-методов.
 * @constant {string} GET_STR - Метод HTTP GET.
 * @constant {string} POST_STR - Метод HTTP POST.
*/
export const GET_STR = 'GET'
export const POST_STR = 'POST'


export class ApiConfig {
    /**
     * Класс конфигурации для подключения к API.
     * @param {string} protocol - Протокол соединения с сервером.
     * @param {string} domen - Домен, на котором расположен API.
    */
    constructor (protocol = 'http://', domen = 'localhost:8000') {
        if (protocol !== 'http://' && protocol !== 'https://') {
            console.error('Протокол может быть только https:// или https://')
        }
        this.protocol = protocol
        this.domen = domen
        this.apiUrl = this.protocol + this.domen + '/'  // Полный URL адрес, по которому расположен API.
    }
}
const dcApiConfig = new ApiConfig('https://', 'sbrdigital.pro')  // Для продакшена
// const dcApiConfig = new ApiConfig()  // для локальной работы



/**
 * @typedef {Object} ApiEndpoint
 * @property {string} endpoint - Короткое имя для эндпоинта.
 * @property {string} method - HTTP-метод для эндпоинта (GET или POST).
 * @property {string} [url] - Полный URL для эндпоинта (добавляется позже).
 */

/**
 * Объект, содержащий конфигурации для различных API-эндпоинтов.
 * Каждое свойство объекта представляет собой эндпоинт с его коротким именем, полным URL и методом.
 * 
 * @type {Object<string, ApiEndpoint>}
 */
export const apiEndpoints = {
    login: {
        endpoint: 'auth/login',
        method: POST_STR
    },
    getUsers: {
        endpoint: 'get_info/get_users',
        method: POST_STR
    },
    init: {
        endpoint: 'dev/init',
        method: GET_STR
    },
};


/**
 * Функция для добавления полного URL к каждому элементу apiEndpoints.
 * 
 * @param {ApiConfig} dcApiConfig - Объект конфигурации API, содержащий apiUrl и dataPath.
 * @param {Object} apiEndpoints - Объект, содержащий конфигурации для различных API-эндпоинтов.
 * Каждое свойство этого объекта должно содержать короткое имя эндпоинта (endpoint) и метод (method).
 * 
 * @returns {void} - Функция не возвращает значения, но модифицирует объект apiEndpoints, добавляя к каждому элементу свойство url.
*/
function addUrls(apiConfig, apiEndpoints) {
    for (let key in apiEndpoints) {
        if (apiEndpoints.hasOwnProperty(key)) {
            apiEndpoints[key].url = `${apiConfig.apiUrl}${apiEndpoints[key].endpoint}`;
        }
    }
}

// Вызов функции для добавления endpoint-ов
addUrls(dcApiConfig, apiEndpoints);

// Проверка результата
// console.log(apiEndpoints);