import { endpointsConfig } from './src/scripts/utils/apiUtils.js'
import { RequestUtils } from './src/scripts/utils/requestUitls.js'


export class FrontendHelper {
    static async addTextErrorInPage(errText = 'Ошибка!', app) {
        app.errorMessage = errText; // Устанавливаем сообщение об ошибке в реактивное свойство
    }
}


/**
 * Класс, отвечающий за процесс авторизации пользователя и получение данных
 * 
 * @example
 * export const dataReader = new DataReader()
 * await dataReader.authLogin('your_login', 'your_password')
*/
export class DataReader {
    constructor() {
        this.loginEndpoint = endpointsConfig.getEndpointConfig('login')
        this.getUsersEndpoint = endpointsConfig.getEndpointConfig('getUsers')
        // this.initEndpoint = endpointsConfig.getEndpointConfig('init')
    }
    
    /**
     * Поплучает информацию о пользователях с бекенда
    */
    async getUsersInfo() {
        try {
            let result = await RequestUtils.sendRequest(this.getUsersEndpoint);
            
            if ((typeof result === 'object' && result !== null) || typeof result === 'string') {
                if (typeof result === 'string') {
                    let jsonResult = JSON.parse(result);
                    // console.log('jsonResult', jsonResult);
                    return jsonResult;
                }
                console.log('Вернулся объект! Запрос успешно выполнен!');
            } else if (result === 401) {
                // Возвращаем ошибку 401
                throw new Error('Ошибка 401: Не авторизованы');
            } else {
                // В случае неизвестной ошибки
                throw new Error(`Неведомая ошибка: ${result}`);
            }
    
            console.log('Результат запроса', result);
        } catch (error) {
            // Бросаем ошибку для дальнейшей обработки
            throw new Error(`Ошибка при запросе данных пользователей: ${error.message}`);
        }
    }

    /**
     * Выполняет запрос к ендпоинту авторизации
     * 
     * @param {string} login - логин пользователя
     * @param {string} password - пароль пользователя
     * 
     * @example
     * 
     * await DataReader.authLogin('your_login', 'your_password')
    */
    async authLogin(login = 'login', password = 'passwor') {
        const additionalParams = { login: login, password: password };
        let result = await RequestUtils.sendRequest(this.loginEndpoint, additionalParams)
        if (typeof result === 'object') {
            alert('Вы успешно авторизовались!')
        } else if (result === 401) {
            return result
        } else {
            let errText = `Неведомая ошибка: ${result}` 
            return errText
        }
    }
} 


export const dataReader = new DataReader()