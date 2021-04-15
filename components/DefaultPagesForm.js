import FormWrapper from "./FormWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as yup from "yup";
import {useState} from "react";
import {Formik} from "formik";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {pages} from '../data/pages'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    mt16: {
        marginTop: '16px'
    },
    mt20: {
        marginTop: '20px'
    }
}));

const validationSchema = yup.object({
    forDriver: yup
        .string()
        .required('Это поле обязательно'),
    forMechanic: yup
        .string()
        .required('Это поле обязательно'),
    forAdmin: yup
        .string()
        .required('Это поле обязательно'),
});

export default function DefaultPagesForm({}) {
    const classes = useStyles();

    const [initialValues, setInitialValues] = useState({
        forDriver: "",
        forMechanic: "",
        forAdmin: "",
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
                <FormWrapper padding="32px 20px">
                    <form onSubmit={formikProps.handleSubmit}>
                        <FormLabel component="legend" disabled>Страницы ролей по умолчанию</FormLabel>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                select
                                id="forDriver"
                                label="Для водителя"
                                variant="outlined"
                                className={classes.mt16}
                                value={formikProps.values.forDriver}
                                onChange={formikProps.handleChange('forDriver')}
                                helperText={formikProps.touched.forDriver ? formikProps.errors.forDriver : ""}
                                error={formikProps.touched.forDriver && Boolean(formikProps.errors.forDriver)}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.id} value={page.value}>{page.page}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                select
                                id="forMechanic"
                                label="Для механика"
                                variant="outlined"
                                className={classes.mt16}
                                value={formikProps.values.forMechanic}
                                onChange={formikProps.handleChange('forMechanic')}
                                helperText={formikProps.touched.forMechanic ? formikProps.errors.forMechanic : ""}
                                error={formikProps.touched.forMechanic && Boolean(formikProps.errors.forMechanic)}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.id} value={page.value}>{page.page}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <TextField
                                select
                                id="forAdmin"
                                label="Для администратора"
                                variant="outlined"
                                className={classes.mt16}
                                value={formikProps.values.forAdmin}
                                onChange={formikProps.handleChange('forAdmin')}
                                helperText={formikProps.touched.forAdmin ? formikProps.errors.forAdmin : ""}
                                error={formikProps.touched.forAdmin && Boolean(formikProps.errors.forAdmin)}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.id} value={page.value}>{page.page}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <Button variant="contained"
                                color="primary"
                                disableElevation
                                type='submit'
                                fullWidth
                                className={classes.mt20}
                        >
                            Сохранить
                        </Button>
                    </form>
                </FormWrapper>
            )}
        </Formik>
    )
}