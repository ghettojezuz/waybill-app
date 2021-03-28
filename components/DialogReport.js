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


export default function DialogReport({isOpen, handleClose}) {

    const [periodValue, setPeriodValue] = useState('allTime');
    const [carsAmountValue, setCarsAmountValue] = useState('all');

    const handlePeriodChange = (event) => {
        setPeriodValue(event.target.value);
    };

    const handleCarsAmountChange = (event) => {
        setCarsAmountValue(event.target.value);
    };

    return (
        <Dialog
            open={isOpen}
            scroll={'body'}
            onClose={handleClose}
            maxWidth={'sm'}
            fullWidth
        >
            <DialogTitle>Построение отчетной таблицы</DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <FormControl component="fieldset">
                    <FormLabel component="legend" focused={false} className={styles.label}>Выберите отрезок времени</FormLabel>
                    <RadioGroup value={periodValue} onChange={handlePeriodChange} row>
                        <FormControlLabel value="allTime" control={<Radio color="primary"/>} label="Все время"/>
                        <FormControlLabel value="period" control={<Radio color="primary"/>} label="Период"/>
                        <FormControlLabel value="date" control={<Radio color="primary"/>} label="Дата"/>
                    </RadioGroup>
                </FormControl>

                <Collapse in={periodValue === 'period'} timeout='auto' unmountOnExit>
                    <div className={`${styles.margin} ${styles.grid}`}>
                        <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                            <DatePicker
                                label="Начало"
                                inputVariant="outlined"
                                format={'d MMM yyyy'}
                                value={new Date('2020-01-01')}
                                cancelLabel={'Отмена'}
                                invalidDateMessage={'Неправильный формат даты'}
                                disableFuture
                                animateYearScrolling
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                            <DatePicker
                                label="Конец"
                                inputVariant="outlined"
                                format={'d MMM yyyy'}
                                value={new Date('2020-01-01')}
                                cancelLabel={'Отмена'}
                                invalidDateMessage={'Неправильный формат даты'}
                                disableFuture
                                animateYearScrolling
                                fullWidth
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
                                value={new Date('2020-01-01')}
                                cancelLabel={'Отмена'}
                                invalidDateMessage={'Неправильный формат даты'}
                                disableFuture
                                animateYearScrolling
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </Collapse>

                <FormControl component="fieldset" className={styles.margin}>
                    <FormLabel component="legend" disabled className={styles.label}>Топливо</FormLabel>
                    <TextField
                        select
                        id="name"
                        label="Вид топлива"
                        variant="outlined"
                        value="">
                        <MenuItem value="dt">ДТ</MenuItem>
                        <MenuItem value="ai92">АИ-92</MenuItem>
                        <MenuItem value="ai95">АИ-95</MenuItem>
                    </TextField>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend" focused={false} className={styles.label}>Автомобили</FormLabel>
                    <RadioGroup value={carsAmountValue} onChange={handleCarsAmountChange} row>
                        <FormControlLabel value="all" control={<Radio color="primary"/>} label="Все авто"/>
                        <FormControlLabel value="several" control={<Radio color="primary"/>} label="Несколько авто"/>
                        <FormControlLabel value="one" control={<Radio color="primary"/>} label="Одно авто"/>
                    </RadioGroup>
                </FormControl>

                <Collapse in={carsAmountValue === 'several'} timeout='auto' unmountOnExit>
                    <div className={styles.margin}>
                        <TextField
                            select
                            fullWidth
                            id="name"
                            label="Автомобиль"
                            variant="outlined"
                            value="">
                            <MenuItem value="dt">Toyota Prado ф001сб</MenuItem>
                            <MenuItem value="ai92">Lada Granta л923ох</MenuItem>
                        </TextField>
                    </div>
                </Collapse>

                <Collapse in={carsAmountValue === 'one'} timeout='auto' unmountOnExit>
                    <div className={styles.margin}>
                        <TextField
                            select
                            fullWidth
                            id="name"
                            label="Автомобиль"
                            variant="outlined"
                            value="">
                            <MenuItem value="dt">Toyota Prado ф001сб</MenuItem>
                            <MenuItem value="ai92">Lada Granta л923ох</MenuItem>
                        </TextField>
                    </div>
                </Collapse>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Закрыть
                </Button>
                <Button onClick={handleClose} variant='contained' disableElevation color="primary">
                    Построить
                </Button>
            </DialogActions>
        </Dialog>
    );
}