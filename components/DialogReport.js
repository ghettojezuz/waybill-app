import {useState, useEffect, useRef} from 'react';
import styles from '../styles/DialogReport.module.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from "@material-ui/core/MenuItem";
import RuLocalizedUtils from '../utils/date-fns-ru';
import ruLocale from "date-fns/locale/ru";
import {Formik} from "formik";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import {useQuery} from "@apollo/client";
import {GET_CARS} from "../graphql/queries";
import LoadingIndicator from "./LoadingIndicator";
import Chip from "@material-ui/core/Chip";
import {fuel} from "../data/fuel";


export default function DialogReport({isOpen, handleClose}) {
    const [periodValue, setPeriodValue] = useState('allTime');
    const [carsAmountValue, setCarsAmountValue] = useState('all');
    const [initialValues, setInitialValues] = useState({
        date_period_start: null,
        date_period_end: null,
        date_single: null,
        fuel: "",
        auto_multiple: [],
        auto_single: "",
    });

    const {loading: carsLoading, error: carsError, data: cars} = useQuery(GET_CARS, {
        fetchPolicy: "cache-and-network"
    });

    const handlePeriodChange = (event) => {
        setPeriodValue(event.target.value);
    };

    const handleCarsAmountChange = (event) => {
        setCarsAmountValue(event.target.value);
    };

    const handleSubmit = (values) => {
        let result = {
            fuel: values.fuel
        };

        if (periodValue === 'allTime') {
            result.allTime = true;
        } else if (periodValue === 'period') {
            result.date_period_start = values.date_period_start;
            result.date_period_end = values.date_period_end;
        } else if (periodValue === 'date') {
            result.date_single = values.date_single;
        }

        if (carsAmountValue === 'all') {
            result.allCars = true;
        } else if (carsAmountValue === 'multiple') {
            result.auto_multiple = values.auto_multiple;
        } else if (carsAmountValue === 'single') {
            result.auto_single = values.auto_single;
        }

        console.log(result)
    };

    const getMultipleRenderValue = (selected) => {
        let result = [];

        for (let i = 0; i < cars.allCars.length; i++) {
            for (let j = 0; j < selected.length; j++) {
                if (cars.allCars[i].id === selected[j]) {
                    result.push(`${cars.allCars[i].brand} ${cars.allCars[i].number}`)                }
            }
        }

        return (
            <div className="disableScrollbar">
                {result.map((item) => (
                    <Chip key={item} label={item} style={{marginRight: "6px"}}/>
                ))}
            </div>
        );
    };

    return (
        <Dialog
            open={isOpen}
            scroll={'body'}
            onClose={handleClose}
            maxWidth={'sm'}
            fullWidth
        >
            <Formik onSubmit={(values) => {
                handleSubmit(values);
            }}
                    initialValues={initialValues}
                    enableReinitialize={true}
            >
                {(formikProps) => (
                    <form onSubmit={formikProps.handleSubmit}>
                        <DialogTitle>Построение отчетной таблицы</DialogTitle>
                        <DialogContent className={styles.dialogContent}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" focused={false} className={styles.label}>Выберите отрезок
                                    времени</FormLabel>
                                <RadioGroup value={periodValue} onChange={handlePeriodChange} row>
                                    <FormControlLabel value="allTime" control={<Radio color="primary"/>}
                                                      label="Все время"/>
                                    <FormControlLabel value="period" control={<Radio color="primary"/>} label="Период"/>
                                    <FormControlLabel value="date" control={<Radio color="primary"/>} label="Дата"/>
                                </RadioGroup>
                            </FormControl>

                            <Collapse in={periodValue === 'period'} timeout='auto' unmountOnExit>
                                <div className={`${styles.margin} ${styles.grid}`}>
                                    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                                        <DatePicker
                                            autoOk
                                            label="Начало"
                                            inputVariant="outlined"
                                            format={'d MMM yyyy'}
                                            cancelLabel={'Отмена'}
                                            invalidDateMessage={'Неправильный формат даты'}
                                            disableFuture
                                            animateYearScrolling
                                            fullWidth
                                            value={formikProps.values.date_period_start}
                                            onChange={(value) => {
                                                formikProps.setFieldValue('date_period_start', value);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                                        <DatePicker
                                            autoOk
                                            label="Конец"
                                            inputVariant="outlined"
                                            format={'d MMM yyyy'}
                                            cancelLabel={'Отмена'}
                                            invalidDateMessage={'Неправильный формат даты'}
                                            disableFuture
                                            animateYearScrolling
                                            fullWidth
                                            value={formikProps.values.date_period_end}
                                            onChange={(value) => {
                                                formikProps.setFieldValue('date_period_end', value);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Collapse>

                            <Collapse in={periodValue === 'date'} timeout='auto' unmountOnExit>
                                <div className={styles.margin}>
                                    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                                        <DatePicker
                                            label="Дата"
                                            inputVariant="outlined"
                                            format={'d MMM yyyy'}
                                            cancelLabel={'Отмена'}
                                            invalidDateMessage={'Неправильный формат даты'}
                                            disableFuture
                                            animateYearScrolling
                                            fullWidth
                                            value={formikProps.values.date_single}
                                            onChange={(value) => {
                                                formikProps.setFieldValue('date_single', value);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Collapse>

                            <FormControl component="fieldset" className={styles.margin}>
                                <FormLabel component="legend" disabled className={styles.label}>Топливо</FormLabel>
                                <TextField
                                    select
                                    name="fuel"
                                    label="Вид топлива"
                                    variant="outlined"
                                    value={formikProps.values.fuel}
                                    onChange={(e) => {
                                        formikProps.setFieldValue('fuel', e.target.value);
                                    }}
                                >
                                    {fuel.map((fuelItem) => (
                                        <MenuItem key={fuelItem.id} value={fuelItem.value}>{fuelItem.fuel}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl component="fieldset">
                                <FormLabel component="legend" focused={false}
                                           className={styles.label}>Автомобили</FormLabel>
                                <RadioGroup value={carsAmountValue} onChange={handleCarsAmountChange} row>
                                    <FormControlLabel value="all" control={<Radio color="primary"/>} label="Все авто"/>
                                    <FormControlLabel value="multiple" control={<Radio color="primary"/>}
                                                      label="Несколько авто"/>
                                    <FormControlLabel value="single" control={<Radio color="primary"/>} label="Одно авто"/>
                                </RadioGroup>
                            </FormControl>

                            <Collapse in={carsAmountValue === 'multiple'} timeout='auto'>
                                <div className={styles.margin}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="auto_multiple_label" style={{padding: "0 4px", backgroundColor: "#ffffff"}}>
                                            Автомобили
                                        </InputLabel>
                                        <Select
                                            id="auto_multiple"
                                            labelId="auto_multiple_label"
                                            multiple
                                            fullWidth
                                            value={formikProps.values.auto_multiple}
                                            onChange={(e) => {
                                                formikProps.setFieldValue('auto_multiple', e.target.value);
                                            }}
                                            renderValue={(selected) => getMultipleRenderValue(selected)}
                                        >
                                            {carsLoading ?
                                                <LoadingIndicator/>
                                                :
                                                cars.allCars.map((car) => (
                                                    <MenuItem key={car.id} value={car.id}>{car.brand} {car.number}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </Collapse>

                            <Collapse in={carsAmountValue === 'single'} timeout='auto'>
                                <div className={styles.margin}>
                                    <TextField
                                        name="auto_single"
                                        select
                                        fullWidth
                                        label="Автомобиль"
                                        variant="outlined"
                                        value={formikProps.values.auto_single}
                                        onChange={(e) => {
                                            formikProps.setFieldValue('auto_single', e.target.value);
                                        }}
                                    >
                                        {carsLoading ?
                                            <LoadingIndicator/>
                                            :
                                            cars.allCars.map((car) => (
                                                <MenuItem key={car.id} value={car.id}>{car.brand} {car.number}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </div>
                            </Collapse>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Закрыть
                            </Button>
                            <Button type="submit" variant='contained' disableElevation color="primary">
                                Построить
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}