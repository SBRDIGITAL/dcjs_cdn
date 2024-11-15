/**
 * Класс FrontendHelpers предоставляет утилиты для работы с объектами 
 * в контексте фронтенд-разработки.
 * Включает методы для глубокого копирования объектов и вывода объектов в консоль.
*/
export class FrontendHelpers {

    /**
     * Получает время истечения в формате UTC на основе заданного количества минут.
     * @param {number} minutes - Время истечения в минутах.
     * @returns {string} Время истечения в формате UTC.
    */
    static getExpiresTime(minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000)); // Устанавливаем время истечения
        return date.toUTCString(); 
    }

    /**
     * Возвращает новый объект.
     * @param {Object} inputData - Входные данные, которые нужно скопировать.
     * @returns {Object} Новый объект, созданный на основе входных данных.
    */
    static async getNewObject(inputData) {
        return JSON.parse(JSON.stringify(inputData))
    }


    /**
     * Выводит объект в консоль.
     * @param {Object} inputData - Объект, который нужно вывести в консоль.
     * @returns {Promise<void>} 
    */
    static async logToConsole(inputData) {
        const data = await FrontendHelpers.getNewObject(inputData)
        console.log(data)
    }

    /**
     * Проверяет, содержит ли элемент указанный класс или хотя бы один из классов из списка.
     *
     * @param {Element} element - DOM-элемент, который нужно проверить.
     * @param {string|string[]} selector_or_selector - Один класс (строка) или массив классов 
     * (строки), которые нужно проверить.
     * @returns {Promise<boolean>} - Возвращает true, если элемент содержит указанный класс
     *  или хотя бы один из классов из списка, иначе false.
    */
    static async ifElementContainsClass(element, selector_or_selector) {
        if (typeof selector_or_selector === 'string') {
            return element.classList.contains(selector_or_selector)
        }
        
        if (Array.isArray(selector_or_selector)) {
            for (const className of selector_or_selector) {
                if (element.classList.contains(className)) {
                    return true
                }
            }
        }
        
        return false  // Если classes не строка и не массив, возвращаем false
    }

}


export class DOMObserver {


    
    /**
     * Ожидает изменения в DOM элемента.
     *
     * @param {Element} targetElement - Элемент, за которым нужно следить.
     * @param {Object} config - Конфигурация для наблюдателя.
     * @returns {Promise<void>} Возвращает промис, который разрешается при изменении DOM.
     * 
     * @example
     * // Предположим, у нас есть элемент, за которым мы хотим следить
     *   const targetElement = document.querySelector('#myElement');
     *        // Проверяем, существует ли элемент
     *   if (targetElement) {
     *       console.log('Начинаем наблюдение за изменениями в элементе:', targetElement);
     *            // Используем метод waitForDOMChange для ожидания изменений в DOM
     *       DOMObserver.waitForDOMChange(targetElement)
     *           .then(() => {
     *               console.log('Изменения в DOM были обнаружены!');
     *               // Здесь можно выполнить дополнительные действия после обнаружения изменений
     *           })
     *           .catch((error) => {
     *               console.error('Произошла ошибка при ожидании изменений в DOM:', error);
     *           });
     *   } else {
     *       console.log('Элемент с id #myElement не найден.');
     *   }
    */
    static waitForDOMChange(targetElement, config = { childList: true, subtree: true }) {
        return new Promise((resolve) => {
            const callback = (mutationsList, observer) => {
                observer.disconnect(); // Останавливаем наблюдение после первого изменения
                resolve(); // Разрешаем промис
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetElement, config); // Начинаем наблюдение
        });
    }
}



/**
 * Создает задержку на заданное количество миллисекунд.
 *
 * @function delay
 * @param {number} ms - Время задержки в миллисекундах.
 * @returns {Promise} Промис, который разрешается после истечения времени задержки.
 *
 * @example
 * // Использование функции delay для создания паузы в 2 секунды
 * delay(2000).then(() => {
 *     console.log('2 секунды прошли!');
 * });
 *
 * @example
 * // Использование с async/await
 * (async () => {
 *     console.log('Начинаем паузу...');
 *     await delay(3000); // Пауза на 3 секунды
 *     console.log('3 секунды прошли!');
 * })();
*/
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))