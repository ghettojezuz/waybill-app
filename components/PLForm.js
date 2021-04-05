import {TextField} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import RuLocalizedUtils from '../utils/date-fns-ru';
import LoadingIndicator from "./LoadingIndicator";
import {useMutation, useQuery} from "@apollo/client";
import {GET_WAYBILL_BY_ID, GET_FREE_CARS, GET_FREE_DRIVERS} from "../graphql/queries";
import {Formik} from "formik";
import * as yup from "yup";
import {calculateWaybillFields} from "../helpers/calculatedFields";
import {OPEN_WAYBILL, UPDATE_FULL_WAYBILL} from "../graphql/mutations";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles((theme) => ({
    form: {
        background: '#FFFFFF',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px',
        alignItems: 'start',
    },
    gridColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '36px',
    },
    formControl: {},
    label: {
        marginBottom: '14px',
    },
    button: {
        width: '100%',
    },
    mt16: {
        marginTop: '16px'
    }
}));

const validationSchemaOpen = yup.object({
    driver_id: yup
        .string()
        .required('Это поле обязательно'),
    car_id: yup
        .string()
        .required('Это поле обязательно'),
    date_start: yup
        .date()
        .nullable()
        .required('Это поле обязательно'),
});

const validationSchemaFull = yup.object({
    driver_id: yup
        .string()
        .required('Это поле обязательно'),
    car_id: yup
        .string()
        .required('Это поле обязательно'),
    date_start: yup
        .date()
        .nullable()
        .required('Это поле обязательно'),
    date_end: yup
        .date()
        .nullable()
        .required('Это поле обязательно'),
    mileage_start: yup
        .string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "Введите целое число")
        .required('Это поле обязательно'),
    mileage_end: yup
        .string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "Введите целое число")
        .required('Это поле обязательно'),
    fuel_fill: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
    fuel_consumption_fact: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
    fuel_remaining_start: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
});

// Types: full, open, close
export default function PLForm({editing = false, type, page}) {
    const classes = useStyles();
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        // ---- Waybill ----
        // id пользователя
        user_id: "",
        // id водителя
        driver_id: "",
        // id автомобиля
        car_id: "",
        // дата выезда
        date_start: null,
        // дата заезда
        date_end: null,
        // пробег при выезде
        mileage_start: "",
        // пробег при заезде
        mileage_end: "",
        // заправлено топлива
        fuel_fill: "",
        // расход по факту
        fuel_consumption_fact: "",
        // остаток топлива при выезде
        fuel_remaining_start: "",
        // активный ли
        is_active: "",
        // ---- Car ----
        // вид топлива
        fuel: "",
        // норма расхода
        fuel_consumption: "",
        // ---- Вычисляемые поля ----
        // остаток топлива при заезде
        fuel_remaining_end: "",
        // пробег за день
        mileage_sum: "",
        // расход по норме
        fuel_consumption_norm: "",
    });

    const {loading: driversLoading, error: driversError, data: drivers} = useQuery(GET_FREE_DRIVERS, {
        fetchPolicy: "cache-and-network"
    });

    const {loading: carsLoading, error: carsError, data: cars} = useQuery(GET_FREE_CARS, {
        fetchPolicy: "cache-and-network"
    });

    const dirsAreLoaded = cars !== undefined && drivers !== undefined;

    const {loading: waybillLoading, error: waybillError, data: waybill} = useQuery(GET_WAYBILL_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {id: router.query.PLID},
        skip: !editing || !dirsAreLoaded,
        onCompleted(data) {
            const newWaybill = data.Waybill;
            const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(newWaybill.mileage_start, newWaybill.mileage_end, newWaybill.Car.fuel_consumption, newWaybill.fuel_remaining_start, newWaybill.fuel_fill);

            setInitialValues((prevValues) => ({
                ...prevValues,
                driver_id: newWaybill.Driver.id,
                car_id: newWaybill.Car.id,
                fuel: newWaybill.Car.fuel,
                fuel_consumption: newWaybill.Car.fuel_consumption,
                date_start: newWaybill.date_start ? new Date(newWaybill.date_start) : null,
                date_end: newWaybill.date_end ? new Date(newWaybill.date_end) : null,
                mileage_start: newWaybill.mileage_start ? newWaybill.mileage_start : "",
                mileage_end: newWaybill.mileage_end ? newWaybill.mileage_end : "",
                mileage_sum: mileage_sum,
                fuel_fill: newWaybill.fuel_fill ? newWaybill.fuel_fill : "",
                fuel_remaining_start: newWaybill.fuel_remaining_start ? newWaybill.fuel_remaining_start : "",
                fuel_remaining_end: fuel_remaining_end,
                fuel_consumption_norm: fuel_consumption_norm,
                fuel_consumption_fact: newWaybill.fuel_consumption_fact ? newWaybill.fuel_consumption_fact : "",
            }));
        }
    });

    const [openWaybill, {data: openWaybillData}] = useMutation(OPEN_WAYBILL, {
        onCompleted(data) {
            router.push(page)
        }
    });

    const [updateFullWaybill, {data: updateFullWaybillData}] = useMutation(UPDATE_FULL_WAYBILL, {
        onCompleted(data) {
            router.push(page)
        }
    });

    const handleSubmit = (values) => {
        if (editing) {
            updateFullWaybill({
                variables: {
                    id: router.query.PLID,
                    user_id: waybill.Waybill.User.id,
                    driver_id: values.driver_id,
                    car_id: values.car_id,
                    date_start: values.date_start,
                    date_end: values.date_end,
                    mileage_start: parseInt(values.mileage_start),
                    mileage_end: parseInt(values.mileage_end),
                    fuel_fill: parseFloat(values.fuel_fill),
                    fuel_remaining_start: parseFloat(values.fuel_remaining_start),
                    fuel_consumption_fact: parseFloat(values.fuel_consumption_fact),
                    is_active: waybill.Waybill.is_active
                }
            });
        } else {
            // ИЗМЕНИТЬ ПРИ ПОЯВЛЕНИИ БЭКА
            openWaybill({
                variables: {
                    id: uuidv4(),
                    user_id: "fae86ee8-ada5-413f-b290-308a0ecdafa1",
                    driver_id: values.driver_id,
                    car_id: values.car_id,
                    date_start: values.date_start,
                    date_end: "",
                    mileage_start: parseInt(values.mileage_start),
                    mileage_end: 0,
                    fuel_fill: 0.0,
                    fuel_remaining_start: parseFloat(values.fuel_remaining_start),
                    fuel_consumption_fact: 0.0,
                    is_active: true
                }
            });
        }
    };

    return (
        <Formik onSubmit={(values) => {
            handleSubmit(values);
        }}
                initialValues={initialValues}
                validationSchema={type === 'open' ? validationSchemaOpen : validationSchemaFull}
                enableReinitialize={true}
        >
            {(formikProps) => (
                <form className={classes.form} onSubmit={formikProps.handleSubmit}>
                    <div className={classes.gridColumn}>
                        <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend" className={classes.label} disabled>Дата</FormLabel>
                                <DateTimePicker
                                    autoOk
                                    label="Дата выезда"
                                    inputVariant="outlined"
                                    format={'d MMM yyyy HH:mm'}
                                    value={formikProps.values.date_start}
                                    onChange={(value) => formikProps.setFieldValue('date_start', value)}
                                    helperText={formikProps.touched.date_start ? formikProps.errors.date_start : ""}
                                    error={formikProps.touched.date_start && Boolean(formikProps.errors.date_start)}
                                    cancelLabel={'Отмена'}
                                    invalidDateMessage={'Неправильный формат даты'}
                                    ampm={false}
                                    disableFuture
                                    animateYearScrolling
                                    fullWidth
                                    disabled={type === 'close'}
                                />
                                <DateTimePicker
                                    autoOk
                                    label="Дата заезда"
                                    inputVariant="outlined"
                                    format={'d MMM yyyy HH:mm'}
                                    value={formikProps.values.date_end}
                                    onChange={(value) => {formikProps.setFieldValue('date_end', value)}}
                                    helperText={formikProps.touched.date_end ? formikProps.errors.date_end : ""}
                                    error={formikProps.touched.date_end && Boolean(formikProps.errors.date_end)}
                                    cancelLabel={'Отмена'}
                                    invalidDateMessage={'Неправильный формат даты'}
                                    ampm={false}
                                    disableFuture
                                    animateYearScrolling
                                    fullWidth
                                    className={classes.mt16}
                                    disabled={type === 'open'}
                                />
                            </FormControl>
                        </MuiPickersUtilsProvider>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Автомобиль</FormLabel>
                            <TextField
                                select
                                id="car_id"
                                label="Автомобиль"
                                variant="outlined"
                                value={formikProps.values.car_id}
                                onChange={(e) => {
                                    formikProps.setFieldValue('car_id', e.target.value);
                                    const {fuel, fuel_consumption, mileage, fuel_remaining} = cars.allCars.filter((item) => {
                                        return item.id === e.target.value
                                    })[0];
                                    formikProps.setFieldValue('fuel', fuel);
                                    formikProps.setFieldValue('fuel_consumption', fuel_consumption);
                                    if (page !== '/reg') {
                                        formikProps.setFieldValue('mileage_start', mileage);
                                        formikProps.setFieldValue('fuel_remaining_start', fuel_remaining);
                                    }

                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(formikProps.values.mileage_start, formikProps.values.mileage_end, fuel_consumption, formikProps.values.fuel_remaining_start, formikProps.values.fuel_fill);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.car_id ? formikProps.errors.car_id : ""}
                                error={formikProps.touched.car_id && Boolean(formikProps.errors.car_id)}
                                disabled={type === 'close'}
                            >
                                {carsLoading ?
                                    <LoadingIndicator/>
                                    :
                                    cars.allCars.map((car) => (
                                        <MenuItem key={car.id} value={car.id}>{car.brand} {car.number}</MenuItem>
                                    ))
                                }
                            </TextField>

                            <TextField
                                id="fuel"
                                label="Вид топлива"
                                variant="outlined"
                                value={formikProps.values.fuel}
                                onChange={formikProps.handleChange('fuel')}
                                helperText={formikProps.touched.fuel ? formikProps.errors.fuel : ""}
                                error={formikProps.touched.fuel && Boolean(formikProps.errors.fuel)}
                                className={classes.mt16}
                                disabled/>

                            <TextField
                                id="fuel_consumption"
                                label="Норма расхода"
                                variant="outlined"
                                value={formikProps.values.fuel_consumption}
                                onChange={(e) => {
                                    formikProps.setFieldValue('fuel_consumption', e.target.value);
                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(formikProps.values.mileage_start, formikProps.values.mileage_end, e.target.value, formikProps.values.fuel_remaining_start, formikProps.values.fuel_fill);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.fuel_consumption ? formikProps.errors.fuel_consumption : ""}
                                error={formikProps.touched.fuel_consumption && Boolean(formikProps.errors.fuel_consumption)}
                                className={classes.mt16}
                                disabled/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Топливо</FormLabel>
                            <TextField
                                id="fuel_fill"
                                variant="outlined"
                                label="Заправлено топлива"
                                value={formikProps.values.fuel_fill}
                                onChange={(e) => {
                                    formikProps.setFieldValue('fuel_fill', (e.target.value).toString().replace(",", "."));
                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(formikProps.values.mileage_start, formikProps.values.mileage_end, formikProps.values.fuel_consumption, formikProps.values.fuel_remaining_start, e.target.value);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.fuel_fill ? formikProps.errors.fuel_fill : ""}
                                error={formikProps.touched.fuel_fill && Boolean(formikProps.errors.fuel_fill)}
                                disabled={type === 'open'}
                            />
                            <TextField
                                id="fuel_remaining_start"
                                variant="outlined"
                                label="Остаток топлива при выезде"
                                value={formikProps.values.fuel_remaining_start}
                                onChange={(e) => {
                                    formikProps.setFieldValue('fuel_remaining_start', (e.target.value).toString().replace(",", "."));
                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(formikProps.values.mileage_start, formikProps.values.mileage_end, formikProps.values.fuel_consumption, e.target.value, formikProps.values.fuel_fill);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.fuel_remaining_start ? formikProps.errors.fuel_remaining_start : ""}
                                error={formikProps.touched.fuel_remaining_start && Boolean(formikProps.errors.fuel_remaining_start)}
                                className={classes.mt16}
                                disabled={type === 'close' || type === 'open'}
                            />
                            <TextField
                                id="fuel_remaining_end"
                                variant="outlined"
                                label="Остаток топлива при заезде"
                                value={formikProps.values.fuel_remaining_end}
                                onChange={formikProps.handleChange('fuel_remaining_end')}
                                helperText={formikProps.touched.fuel_remaining_end ? formikProps.errors.fuel_remaining_end : ""}
                                error={formikProps.touched.fuel_remaining_end && Boolean(formikProps.errors.fuel_remaining_end)}
                                className={classes.mt16}
                                disabled
                            />
                        </FormControl>
                    </div>


                    <div className={classes.gridColumn}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Водитель</FormLabel>
                            <TextField
                                select
                                id="driver_id"
                                label="ФИО"
                                variant="outlined"
                                value={formikProps.values.driver_id}
                                onChange={formikProps.handleChange('driver_id')}
                                helperText={formikProps.touched.driver_id ? formikProps.errors.driver_id : ""}
                                error={formikProps.touched.driver_id && Boolean(formikProps.errors.driver_id)}
                                disabled={type === 'close'}
                            >
                                {driversLoading ?
                                    <LoadingIndicator/>
                                    :
                                    drivers.allDrivers.map((driver) => (
                                        <MenuItem key={driver.id} value={driver.id}>{driver.fio}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Пробег</FormLabel>
                            <TextField
                                id="mileage_start"
                                variant="outlined"
                                label="Пробег при выезде"
                                value={formikProps.values.mileage_start}
                                onChange={(e) => {
                                    formikProps.setFieldValue('mileage_start', e.target.value);
                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(e.target.value, formikProps.values.mileage_end, formikProps.values.fuel_consumption, formikProps.values.fuel_remaining_start, formikProps.values.fuel_fill);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.mileage_start ? formikProps.errors.mileage_start : ""}
                                error={formikProps.touched.mileage_start && Boolean(formikProps.errors.mileage_start)}
                                disabled={type === 'close' || type === 'open'}
                            />
                            <TextField
                                id="mileage_end"
                                variant="outlined"
                                label="Пробег при заезде"
                                className={classes.mt16}
                                value={formikProps.values.mileage_end}
                                onChange={(e) => {
                                    formikProps.setFieldValue('mileage_end', e.target.value);
                                    const [mileage_sum, fuel_consumption_norm, fuel_remaining_end] = calculateWaybillFields(formikProps.values.mileage_start, e.target.value, formikProps.values.fuel_consumption, formikProps.values.fuel_remaining_start, formikProps.values.fuel_fill);
                                    formikProps.setFieldValue('mileage_sum', mileage_sum);
                                    formikProps.setFieldValue('fuel_consumption_norm', fuel_consumption_norm);
                                    formikProps.setFieldValue('fuel_remaining_end', fuel_remaining_end);
                                }}
                                helperText={formikProps.touched.mileage_end ? formikProps.errors.mileage_end : ""}
                                error={formikProps.touched.mileage_end && Boolean(formikProps.errors.mileage_end)}
                                disabled={type === 'open'}
                            />
                            <TextField
                                id="mileage_sum"
                                variant="outlined"
                                label="Пробег за день"
                                className={classes.mt16}
                                value={formikProps.values.mileage_sum}
                                onChange={(e) => {
                                    formikProps.setFieldValue('mileage_sum', e.target.value);
                                }}
                                helperText={formikProps.touched.mileage_sum ? formikProps.errors.mileage_sum : ""}
                                error={formikProps.touched.mileage_sum && Boolean(formikProps.errors.mileage_sum)}
                                disabled
                            />
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Расход</FormLabel>
                            <TextField
                                id="fuel_consumption_norm"
                                variant="outlined"
                                label="Расход по норме"
                                value={formikProps.values.fuel_consumption_norm}
                                onChange={formikProps.handleChange('fuel_consumption_norm')}
                                helperText={formikProps.touched.fuel_consumption_norm ? formikProps.errors.fuel_consumption_norm : ""}
                                error={formikProps.touched.fuel_consumption_norm && Boolean(formikProps.errors.fuel_consumption_norm)}
                                disabled
                            />
                            <TextField
                                id="fuel_consumption_fact"
                                variant="outlined"
                                label="Расход по факту"
                                className={classes.mt16}
                                value={formikProps.values.fuel_consumption_fact}
                                onChange={(e) => {
                                    formikProps.setFieldValue('fuel_consumption_fact', (e.target.value).toString().replace(",", "."))
                                }}
                                helperText={formikProps.touched.fuel_consumption_fact ? formikProps.errors.fuel_consumption_fact : ""}
                                error={formikProps.touched.fuel_consumption_fact && Boolean(formikProps.errors.fuel_consumption_fact)}
                                disabled={type === 'open'}
                            />
                        </FormControl>
                    </div>

                    <div className="grid-span-2">
                        <Button variant="contained"
                                color="primary"
                                disableElevation
                                type='submit'
                                className={classes.button}>Сохранить</Button>
                    </div>

                </form>
            )}
        </Formik>
    )
}