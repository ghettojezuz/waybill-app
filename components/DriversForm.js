import makeStyles from "@material-ui/core/styles/makeStyles";
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as yup from 'yup';
import {Formik} from 'formik';
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_DRIVER, UPDATE_DRIVER} from "../graphql/mutations";
import {v4 as uuidv4} from 'uuid';
import {GET_DRIVER_BY_ID} from "../graphql/queries";
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
        marginBottom: '14px',
    },
    button: {
        width: '100%'
    },
    mt16: {
        marginTop: '16px'
    }
}));

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('Это поле обязательно'),
    secondName: yup
        .string()
        .required('Это поле обязательно'),
    lastName: yup
        .string()
        .required('Это поле обязательно')
});

export default function DriversForm(props) {
    const {isEditing} = props;
    const classes = useStyles();
    const router = useRouter();

    const [createDriver, {data: createDriverData}] = useMutation(CREATE_DRIVER, {
        onCompleted(data) {
            router.push('/dirs')
        }
    });

    const [updateDriver, {data: updateDriverData}] = useMutation(UPDATE_DRIVER, {
        onCompleted(data) {
            router.push('/dirs')
        }
    });

    const {loading: driverLoading, error: driverError, data: driver} = useQuery(GET_DRIVER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {id: router.query.driverID},
        skip: !isEditing,
        onCompleted(data) {
            setInitialValues({fio: data.Driver.fio})
        }
    });

    const [initialValues, setInitialValues] = useState({
        firstName: '',
        secondName: '',
        lastName: ''
    });

    const handleSubmit = (values) => {
        if (isEditing) {
            updateDriver({
                variables: {
                    id: router.query.driverID,
                    firstName: values.firstName,
                    is_active: driver.Driver.is_active
                }
            });
        } else {
            createDriver({
                variables: {
                    id: uuidv4(),
                    firstName: values.firstName,
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
                    <FormLabel component="legend" className={classes.label} disabled>Водитель</FormLabel>
                    <form className={classes.form} onSubmit={formikProps.handleSubmit}>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="firstName"
                                label="Имя"
                                variant="outlined"
                                value={formikProps.values.firstName}
                                onChange={formikProps.handleChange('firstName')}
                                helperText={formikProps.touched.firstName ? formikProps.errors.firstName : ""}
                                error={formikProps.touched.firstName && Boolean(formikProps.errors.firstName)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="secondName"
                                label="Фамилия"
                                variant="outlined"
                                value={formikProps.values.secondName}
                                onChange={formikProps.handleChange('secondName')}
                                helperText={formikProps.touched.secondName ? formikProps.errors.secondName : ""}
                                error={formikProps.touched.secondName && Boolean(formikProps.errors.secondName)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="lastName"
                                label="Отчество"
                                variant="outlined"
                                value={formikProps.values.lastName}
                                onChange={formikProps.handleChange('lastName')}
                                helperText={formikProps.touched.lastName ? formikProps.errors.lastName : ""}
                                error={formikProps.touched.lastName && Boolean(formikProps.errors.lastName)}/>
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