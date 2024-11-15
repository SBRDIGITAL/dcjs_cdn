/**
 * Класс RequestUtils предоставляет утилиты для отправки HTTP-запросов.
*/
export class RequestUtils {
    constructor () {}
    
    /**
     * Отправляет HTTP-запрос на указанный URL с заданными параметрами.
     *
     * @param {Object} endpointInfo - Информация о конечной точке запроса.
     * @param {string} endpointInfo.url - URL, на который будет отправлен запрос.
     * @param {string} endpointInfo.method - HTTP-метод запроса (например, 'GET', 'POST').
     * @param {string} endpointInfo.endpoint - Название конечной точки (для логирования).
     * @param {Object} [additionalParams={}] - Дополнительные параметры, которые будут отправлены в теле запроса (только для POST-запросов).
     * 
     * @returns {Promise<Object>} - Возвращает промис, который разрешается с данными ответа от сервера в формате JSON.
     * 
     * @throws {Error} - Вызывает ошибку, если запрос завершился неудачно (например, если статус ответа не в диапазоне 200-299).
     * 
     * @example
     * const requestUtils = new RequestUtils();
     * const endpointInfo = {
     *     url: 'https://api.example.com/data',
     *     method: 'POST',
     *     endpoint: 'Create Data'
     * };
     * const additionalParams = { name: 'John', age: 30 };
     * 
     * requestUtils.sendRequest(endpointInfo, additionalParams)
     *     .then(data => console.log('Полученные данные:', data))
     *     .catch(error => console.error('Ошибка:', error));
    */
    static async sendRequest(endpointInfo, additionalParams = {}) {
        // Извлекаем информацию о конечной точке
        const { url, method, endpoint } = endpointInfo;
    
        // console.log(`Отправка запроса на: ${url}`);
        // console.log(`Метод: ${method}`);
        // console.log(`Конечная точка: ${endpoint}`);
        // Определяем параметры запроса
        const options = {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: method === 'POST' ? JSON.stringify(additionalParams) : undefined,
        };
    
        try {
            const response = await fetch(url, options);

            if (response.ok) {  // если запрос выполнен успешно(статус 200), возвращает объект
                const data = await response.json();
                // console.log(`Ответ от сервера: ${JSON.stringify(data)}\nКонечная точка: ${endpoint}`);
                return data; // Возвращаем данные ответа
            } else if (response.status === 401) {  // если не авторизован, возвращаем статус
                return response.status
            } else if (response.status === 422) {  // если Unprocessable Entity, возвращаем статус
                return response.status
            } else {  // если произошла ошибка
                throw new Error('Сетевая ошибка: ' + response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }



}