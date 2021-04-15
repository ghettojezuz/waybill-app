import {LOGIN} from "./actions";

const initialAppState = {
    logedIn: true,
    breadcrumbNameMap: {
        '/pl': 'Мои путевые листы',
        '/pl/new': 'Новый путевой лист',
        '/pl/[PLID]': 'Редактирование путевого листа',
        '/dirs': 'Справочники',
        '/dirs/cars/new': 'Новый автомобиль',
        '/dirs/cars/[carID]': 'Редактирование автомобиля',
        '/dirs/drivers/new': 'Новый водитель',
        '/dirs/drivers/[driverID]': 'Редактирование водителя',
        '/reg': 'Реестр путевых листов',
        '/reg/[PLID]': 'Редактирование путевого листа',
        '/admin': 'Панель администратора',
        '/admin/users/new': 'Новый пользователь',
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