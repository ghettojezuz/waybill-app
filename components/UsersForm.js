import makeStyles from "@material-ui/core/styles/makeStyles";
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as yup from 'yup';
import {Formik} from 'formik';
import {useMutation, useQuery} from "@apollo/client";
import FormWrapper from "./FormWrapper";
import MenuItem from "@material-ui/core/MenuItem";
import {roles} from "../data/roles";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px 32px;',
        alignItems: 'start',
    },
    label: {
        marginBottom: '14px',
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
        .required('Это поле обязательно'),
    email: yup
        .string()
        .email('Введите корректную почту')
        .required('Это поле обязательно'),
    role: yup
        .string()
        .required('Это поле обязательно')
});

export default function UsersForm({isEditing}) {
    const classes = useStyles();
    const router = useRouter();

    // const [createUser, {data: createUserData}] = useMutation(CREATE_USER, {
    //     onCompleted(data) {
    //         router.push('/admin')
    //     }
    // });
    //
    // const [updateUser, {data: updateUserData}] = useMutation(UPDATE_USER, {
    //     onCompleted(data) {
    //         router.push('/admin')
    //     }
    // });
    //
    // const {loading: userLoading, error: userError, data: user} = useQuery(GET_USER_BY_ID, {
    //     fetchPolicy: "cache-and-network",
    //     variables: {id: router.query.userID},
    //     skip: !isEditing,
    //     onCompleted(data) {
    //         setInitialValues({
    //             fio: data.User.fio,
    //             email: data.User.email,
    //             role: data.User.role,
    //         })
    //     }
    // });

    const [initialValues, setInitialValues] = useState({
        firstName: '',
        secondName: '',
        lastName: '',
        email: '',
        role: '',
    });

    const handleSubmit = (values) => {
        console.log(values)
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
                            <TextField
                                id="firstName"
                                label="Имя"
                                variant="outlined"
                                value={formikProps.values.firstName}
                                onChange={formikProps.handleChange('firstName')}
                                helperText={formikProps.touched.firstName ? formikProps.errors.firstName : ""}
                                error={formikProps.touched.firstName && Boolean(formikProps.errors.firstNamefirstName)}/>
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

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                id="email"
                                label="E-mail"
                                variant="outlined"
                                value={formikProps.values.email}
                                onChange={formikProps.handleChange('email')}
                                helperText={formikProps.touched.email ? formikProps.errors.email : ""}
                                error={formikProps.touched.email && Boolean(formikProps.errors.email)}/>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                select
                                id="role"
                                label="Роль"
                                variant="outlined"
                                value={formikProps.values.role}
                                onChange={formikProps.handleChange('role')}
                                helperText={formikProps.touched.role ? formikProps.errors.role : ""}
                                error={formikProps.touched.role && Boolean(formikProps.errors.role)}>
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.value}>{role.role}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <div className="grid-span-2">
                            <Button variant="contained"
                                    color="primary"
                                    disableElevation
                                    type='submit'
                                    fullWidth
                                    className={classes.button}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </FormWrapper>
            )}
        </Formik>
    )
}