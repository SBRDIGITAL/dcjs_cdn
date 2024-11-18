const { createApp } = Vue;
import { dataReader } from './dataReader.js';



const app = createApp({
    data() {
        return {
            message: 'Загрузка информации о пользователях...', // Сообщение о загрузке
            users: [], // Массив для хранения информации о пользователях
            errorMessage: '',
            isFormVisible: false, // Скрываем форму
        };
    },
    methods: {
        /**
         * ## Метод получения данных о пользователях
        */
        async fetchUsersInfo() {
            try {
                const usersInfo = await dataReader.getUsersInfo();
                // for (let cicl = 0; cicl < 50; cicl++) {
                //     for (let i = 0; i < usersInfo.length; i++) {
                //         // console.log(`element`, el)
                //         let el = usersInfo[i];
                //         newUsersInfo.push(el)
                //     }
                // }

                this.message = 'Информация о пользователях';
                this.users = usersInfo; // Обновляем список пользователей
            } catch (error) {
                // Если произошла ошибка, выводим сообщение об ошибке
                this.errorMessage = `Не удалось загрузить данные пользователей: ${error.message}`;
                console.error(error);  // Выводим ошибку в консоль
            }
        }
    },
    async mounted() {
        console.log("Vue приложение успешно смонтировано");
        await this.fetchUsersInfo();  // Запрашиваем данные о пользователях при монтировании компонента
    }
});

app.mount('#app');