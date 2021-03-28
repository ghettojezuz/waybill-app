import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import textInputChange from '../helpers/textInputChange';
import {isLoginDispatch} from "../store/app/actions";
import styles from "../styles/SignIn.module.scss"
import Link from "next/link";

export default function SignIn() {
    const [state, setState] = useState({email: '', password: ''});
    const dispatch = useDispatch();

    function login(e) {
        e.preventDefault();

        console.log(state)

        // if (state.email === 'admin' && state.password === '12345') {
        //     dispatch(isLoginDispatch(true));
        // }
    }

    return (
        <div className={`${styles.signin__wrapper}`}>
            <div className={`${styles.signin}`}>
                <div className={styles.logo}>
                    <img src="/icons/Logo.png" alt=""/>
                </div>
                <form className={`${styles.signin__form}`}
                      noValidate
                      onSubmit={(e) => login(e)}>
                    <TextField
                        variant="outlined"
                        color="primary"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={state.email}
                        onChange={(e) => textInputChange(e, state, setState)}
                    />
                    <TextField
                        variant="outlined"
                        color="primary"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.password}
                        onChange={(e) => textInputChange(e, state, setState)}
                    />
                    <Button variant="contained" color="primary" type="submit" disableElevation className={`${styles.signin__btn} ${styles.signin__btn__filled}`}>
                        Войти
                    </Button>
                    {/*<Button variant="outlined" color="secondary" disableElevation className={`${styles.signin__btn} ${styles.signin__btn__blink}`}>*/}
                    {/*    Зарегистрироваться*/}
                    {/*</Button>*/}
                </form>
                {/*<Link href={'/'}>*/}
                {/*    <a className={`${styles.signin__link}`}>*/}
                {/*        Не помню логин/пароль*/}
                {/*    </a>*/}
                {/*</Link>*/}
            </div>
        </div>
    );
}