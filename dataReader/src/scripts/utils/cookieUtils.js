import { FrontendHelpers } from './helpers.js'

/**
 * Класс CookieUtils предоставляет утилиты для работы с cookie в браузере.
 * Включает методы для установки и получения cookie.
*/
export class CookieUtils {
    constructor() {
        // Конструктор может быть пустым или содержать инициализацию
    }

    /**
     * Устанавливает cookie с заданным именем, значением и временем истечения.
     * @param {string} name - Имя cookie.
     * @param {string} value - Значение cookie.
     * @param {number} minutes - Время истечения в минутах.
    */
    static setCookie(name, value, minutes) {
        const expires = "expires=" + FrontendHelpers.getExpiresTime(minutes);
        console.warn('expires', expires)
        document.cookie = `${name}=${value}; ${expires}; path=/`; // Устанавливаем cookie
    }

    /**
     * Получает значение cookie по заданному имени.
     * @param {string} name - Имя cookie, значение которого нужно получить.
     * @returns {string|null} Значение cookie или null, если cookie не найдено.
    */
    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Возвращаем null, если cookie не найдено
    }
}
