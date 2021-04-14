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
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {},
    label: {
        marginBottom: '14px',
    },
    button: {
        width: '100%',
        marginTop: '24px',
    },
    mt16: {
        marginTop: '16px'
    }
}));

const validationSchema = yup.object({
    fio: yup
        .string()
        .required('Это поле обязательно')
});

export default function DirsDriversForm(props) {
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
        fio: '',
    });

    const handleSubmit = (values) => {
        if (isEditing) {
            updateDriver({
                variables: {
                    id: router.query.driverID,
                    fio: values.fio,
                    is_active: driver.Driver.is_active
                }
            });
        } else {
            createDriver({
                variables: {
                    id: uuidv4(),
                    fio: values.fio,
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
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" className={classes.label} disabled>Водитель</FormLabel>
                            <TextField
                                id="fio"
                                label="ФИО без сокращений"
                                variant="outlined"
                                value={formikProps.values.fio}
                                onChange={formikProps.handleChange('fio')}
                                helperText={formikProps.touched.fio ? formikProps.errors.fio : ""}
                                error={formikProps.touched.fio && Boolean(formikProps.errors.fio)}/>
                        </FormControl>

                        <Button variant="contained"
                                color="primary"
                                disableElevation
                                type='submit'
                                className={classes.button}>Сохранить</Button>
                    </form>
                </FormWrapper>
            )}
        </Formik>
    )
}