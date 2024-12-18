const { createApp } = Vue;
import { dataReader } from './dataReader.js';



const app = createApp({
    data() {
        return {
            classicMessage: 'Информация о пользователях',
            sortEndTxt: 'убыванию',
            sortFilterByTxt: 'Фильтруем по ',
            sortMessage: '',
            message: 'Загрузка информации о пользователях...', // Сообщение о загрузке
            // Списки для хранения информации
            users: [], // Массив для хранения информации о пользователях
            companies: [], // Массив для хранения информации о компаниях
            contacts: [], // Массив для хранения информации о контактах
            leads: [], // Массив для хранения информации о лидах
            deals: [], // Массив для хранения информации о сделках
            // 
            errorMessage: '',
            isFormVisible: false, // Скрываем форму
            sortOrder: 'asc',  // Порядок сортировки
            maxUsersCount: 0,
            maxUsersWithContactsCount: 0,
            usersPercentage: null,
        };
    },
    methods: {
        /**
         * Преобразует строку даты в объект Date.
         * @param {string} dateString - Строка, представляющая дату.
         * @returns {Date} - Объект Date, созданный из строки даты.
        */
        parseCurrentDate(dateString) {
            return new Date(dateString);
        },
        /**
         * Преобразует даты для каждого пользователя в массиве userInfo.
         * @param {Array} userInfo - Массив объектов пользователей.
         * @returns {Array} - Массив объектов пользователей с добавленным полем createdAtDate.
        */
        parseDates(userInfo) {
            // Преобразуем время для каждого пользователя
            userInfo.forEach(user => {
                if (user.created_at) {
                    user.createdAtDate = this.parseCurrentDate(user.created_at);
                }
            });
            return userInfo
        },
        /**
         * Получает данные о пользователях с сервера и обновляет состояние приложения.
         * Обрабатывает ошибки, если они возникают во время запроса.
         * @async
         * @returns {Promise<void>}
         */
        async fetchUsersInfo() {
            try {
                this.message = this.classicMessage;

                // Объект информации о пользователях
                const usersInfoData = await dataReader.getUsersInfo();
                // информация о пользователях
                this.users = this.parseDates(JSON.parse(usersInfoData.users_info)) || []
                // информация о кол-ве пользователей ТИП ДАННЫХ number
                this.maxUsersCount = usersInfoData.max_users || 0
                // информация о кол-ве пользователей с указанными контаками ТИП ДАННЫХ number
                this.maxUsersWithContactsCount = usersInfoData.max_users_with_contacts || 0
                

            } catch (error) {
                // Если произошла ошибка, выводим сообщение об ошибке
                this.errorMessage = `Не удалось загрузить данные пользователей: ${error.message}`;
                console.error(error);  // Выводим ошибку в консоль
            }
        },
        /**
         * Получает информацию связанную с битриксом от фронтенда 
        */
        async fetchBitrixData() {
            try {
                const bitrixInfo = await dataReader.getBitrixInfo()
                this.companies = bitrixInfo.companies
                this.contacts = bitrixInfo.contacts
                this.deals = bitrixInfo.deals
                this.leads = bitrixInfo.leads

            } catch (error) {
                // Если произошла ошибка, выводим сообщение об ошибке
                this.errorMessage = `Не удалось загрузить данные о битриксе: ${error.message}`;
                console.error(error);  // Выводим ошибку в консоль
            }
        },
        /**
         * Меняет текст переменной `sortMessage` в зависимости от текущего порядка сортировки.
        */
        changeSortMessageText() {
            if (this.sortOrder === 'asc') {
                this.sortEndTxt = 'убыванию'
            } else {
                this.sortEndTxt = 'возрастанию'
            }
            this.sortMessage = this.sortFilterByTxt + this.sortEndTxt
        },
        /**
         * Переключает порядок сортировки пользователей и обновляет список пользователей.
        */
        sortUsers() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Переключаем порядок сортировки
            this.users = this.users.slice().reverse(); // Создаем новый массив и переворачиваем его
            this.changeSortMessageText()
        },
        /**
         * Расчитываем процент пользователей с указанными контактами 
        */
        async percentageUsersCount() {
            let per = (this.maxUsersWithContactsCount / this.maxUsersCount) * 100
            this.usersPercentage = `${per.toFixed(2)}%`
        },
        /**
         * Вызывает методы, которые делают запросы к API 
        */
        async fetchData() {
            await this.fetchUsersInfo();  // Запрашиваем данные
            await this.fetchBitrixData();  // Запрашиваем данные инфы битрикса
        }
    },
    /**
     * Метод, который вызывается при монтировании компонента.
     * Запрашивает данные о пользователях и устанавливает начальное сообщение о сортировке.
     * @async
     * @returns {Promise<void>}
    */
    async mounted() {
        this.sortMessage = this.sortFilterByTxt + this.sortEndTxt
        console.log("Vue приложение успешно смонтировано");
        await this.fetchData();
        await this.percentageUsersCount();  // Расчитываем процент пользователей с указанными контактами
    }
});

app.mount('#app');