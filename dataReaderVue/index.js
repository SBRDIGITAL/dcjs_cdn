const { createApp } = Vue;
import { dataReader } from './dataReader.js';
import { CookieUtils } from './src/scripts/utils/cookieUtils.js'


const app = createApp({
    data() {
        return {
            message: 'Введите ваш пароль для авторизации', // Текст по умолчанию
            password: '',
            errorMessage: '',
            userLogin: '',
            users: [], // Массив для хранения информации о пользователях
            isFormVisible: true, // Видимость формы
        };
    },
    methods: {
        // Метод авторизации
        async login() {
            this.errorMessage = ''; // Сброс сообщения об ошибке
            try {
                // Запрашиваем информацию о пользователях
                await dataReader.authLogin(this.userLogin, this.password)
                CookieUtils.setCookie('isAuth', 'true', 179);  // Устанавливаем куку на 1.59ч
                await this.fetchUsersInfo()
                this.isFormVisible = false;  // Скрываем форму
            } catch (error) {
                this.errorMessage = 'Произошла ошибка: ' + error.message;
                console.error(error);
            }
        },

        // Метод получения данных о пользователях
        async fetchUsersInfo() {
            try {
                const usersInfo = await dataReader.getUsersInfo();
                this.message = 'Информация о пользователях';
                this.users = usersInfo; // Обновляем список пользователей
                // console.warn('this.users', this.users);
            } catch (error) {
                // Если произошла ошибка, выводим сообщение об ошибке
                this.errorMessage = `Не удалось загрузить данные пользователей: ${error.message}`;
                
                // Дополнительная логика для ошибки 401
                if (error.message.includes('Ошибка 401')) {
                    this.message = 'Введите ваш пароль для авторизации'; // В случае ошибки 401
                    this.isFormVisible = true;  // Показываем форму авторизации
                }
                
                console.error(error);  // Выводим ошибку в консоль
            }
        },

        // Метод для проверки наличия куки и авторизации
        async checkAuth() {
            const isAuth = CookieUtils.getCookie('isAuth');
            if (isAuth === 'true') {
                this.isFormVisible = false;  // Скрываем форму при наличии куки
                this.message = 'Информация о пользователях'; // Отображаем сообщение о пользователях
                await this.fetchUsersInfo();  // Запрашиваем данные о пользователях
            }
        }
    },
    async mounted() {
        console.log("Vue приложение успешно смонтировано");
        await this.checkAuth();  // Проверяем авторизацию при монтировании компонента
    }
});

app.mount('#app');
