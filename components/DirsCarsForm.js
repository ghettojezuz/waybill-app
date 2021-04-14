import makeStyles from "@material-ui/core/styles/makeStyles";
import {useRouter} from "next/router";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {useState} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_CAR, UPDATE_CAR} from "../graphql/mutations";
import {GET_CAR_BY_ID} from "../graphql/queries";
import {v4 as uuidv4} from "uuid";
import FormWrapper from "./FormWrapper";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px 32px',
        alignItems: 'start',
    },
    formControl: {},
    label: {
        gridColumnStart: 'span 2',
    },
    button: {
        width: '100%',
    },
    mt16: {
        marginTop: '16px'
    }
}));

const validationSchema = yup.object({
    brand: yup
        .string()
        .required('Это поле обязательно'),
    number: yup
        .string()
        .required('Это поле обязательно'),
    mileage: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
    fuel: yup
        .string()
        .required('Это поле обязательно'),
    fuel_remaining: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
    fuel_consumption: yup
        .number().typeError('Введите число')
        .required('Это поле обязательно'),
});

export default function DirsCarsForm(props) {
    const {isEditing} = props;
    const classes = useStyles();
    const router = useRouter();

    const [createCar, {data: createCarData}] = useMutation(CREATE_CAR, {
        onCompleted(data) {
            router.push('/dirs')
        }
    });

    const [updateCar, {data: updateCarData}] = useMutation(UPDATE_CAR, {
        onCompleted(data) {
            router.push('/dirs')
        }
    });

    const {loading: carLoading, error: carError, data: car} = useQuery(GET_CAR_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {id: router.query.carID},
        skip: !isEditing,
        onCompleted(data) {
            setInitialValues({
                brand: data.Car.brand,
                number: data.Car.number,
                mileage: data.Car.mileage,
                fuel: data.Car.fuel,
                fuel_remaining: data.Car.fuel_remaining,
                fuel_consumption: data.Car.fuel_consumption
            })
        }
    });

    const [initialValues, setInitialValues] = useState({
        brand: "",
        number: "",
        mileage: "",
        fuel: "",
        fuel_remaining: "",
        fuel_consumption: ""
    });

    const handleSubmit = (values) => {
        if (isEditing) {
            updateCar({
                variables: {
                    id: router.query.carID,
                    brand: values.brand,
                    number: values.number,
                    mileage: parseInt(values.mileage),
                    fuel: values.fuel,
                    fuel_remaining: parseFloat(values.fuel_remaining),
                    fuel_consumption: parseFloat(values.fuel_consumption),
                    is_active: car.Car.is_active
                }
            })
        } else {
            createCar({
                variables: {
                    id: uuidv4(),
                    brand: values.brand,
                    number: values.number,
                    mileage: parseInt(values.mileage),
                    fuel: values.fuel,
                    fuel_remaining: parseFloat(values.fuel_remaining),
                    fuel_consumption: parseFloat(values.fuel_consumption),
                    is_active: false
                }
            })
        }
    };

    return (
        <Formik onSubmit={(values) => {
            handleSubmit(values);
        }}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}>

            {(formikProps) => (
                <FormWrapper>
                    <form className={classes.form} onSubmit={formikProps.handleSubmit}>

                        <FormLabel component="legend" className={classes.label} disabled>Автомобиль</FormLabel>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="brand"
                                label="Марка автомобиля"
                                variant="outlined"
                                value={formikProps.values.brand}
                                onChange={formikProps.handleChange('brand')}
                                helperText={formikProps.touched.brand ? formikProps.errors.brand : ""}
                                error={formikProps.touched.brand && Boolean(formikProps.errors.brand)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="number"
                                label="Гос. номер"
                                variant="outlined"
                                value={formikProps.values.number}
                                onChange={formikProps.handleChange('number')}
                                helperText={formikProps.touched.number ? formikProps.errors.number : ""}
                                error={formikProps.touched.number && Boolean(formikProps.errors.number)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="fuel_consumption"
                                label="Норма расхода"
                                variant="outlined"
                                value={formikProps.values.fuel_consumption}
                                onChange={formikProps.handleChange('fuel_consumption')}
                                helperText={formikProps.touched.fuel_consumption ? formikProps.errors.fuel_consumption : ""}
                                error={formikProps.touched.fuel_consumption && Boolean(formikProps.errors.fuel_consumption)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                select
                                id="fuel"
                                label="Вид топлива"
                                variant="outlined"
                                value={formikProps.values.fuel}
                                onChange={formikProps.handleChange('fuel')}
                                helperText={formikProps.touched.fuel ? formikProps.errors.fuel : ""}
                                error={formikProps.touched.fuel && Boolean(formikProps.errors.fuel)}>
                                <MenuItem value='ДТ'>ДТ</MenuItem>
                                <MenuItem value='АИ-92'>АИ-92</MenuItem>
                                <MenuItem value='АИ-95'>АИ-95</MenuItem>
                            </TextField>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="mileage"
                                label="Пробег"
                                variant="outlined"
                                value={formikProps.values.mileage}
                                onChange={formikProps.handleChange('mileage')}
                                helperText={formikProps.touched.mileage ? formikProps.errors.mileage : ""}
                                error={formikProps.touched.mileage && Boolean(formikProps.errors.mileage)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="fuel_remaining"
                                label="Остаток топлива"
                                variant="outlined"
                                value={formikProps.values.fuel_remaining}
                                onChange={formikProps.handleChange('fuel_remaining')}
                                helperText={formikProps.touched.fuel_remaining ? formikProps.errors.fuel_remaining : ""}
                                error={formikProps.touched.fuel_remaining && Boolean(formikProps.errors.fuel_remaining)}/>
                        </FormControl>

                        <div className="grid-span-2">
                            <Button variant="contained"
                                    color="primary"
                                    disableElevation
                                    type='submit'
                                    className={classes.button}>Сохранить</Button>
                        </div>

                    </form>
                </FormWrapper>
            )}
        </Formik>
    )
}