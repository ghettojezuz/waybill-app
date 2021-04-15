import {LOGIN} from "./actions";

const initialAppState = {
    logedIn: true,
    breadcrumbNameMap: {
        '/pl': 'Мои путевые листы',
        '/pl/new': 'Создание путевого листа',
        '/pl/[PLID]': 'Редактирование путевого листа',
        '/dirs': 'Справочники',
        '/dirs/cars/new': 'Создание автомобиля',
        '/dirs/cars/[carID]': 'Редактирование автомобиля',
        '/dirs/drivers/new': 'Создание водителя',
        '/dirs/drivers/[driverID]': 'Редактирование водителя',
        '/reg': 'Реестр путевых листов',
        '/reg/[PLID]': 'Редактирование путевого листа',
        '/admin': 'Панель администратора',
        '/admin/users/new': 'Создания пользователя',
        '/admin/users/[userID]': 'Редактирование пользователя',
    },
};

export const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                logedIn: action.payload,
            };
        default:
            return state
    }
};