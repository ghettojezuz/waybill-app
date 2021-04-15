import FormWrapper from "./FormWrapper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useState} from "react";
import {Formik} from "formik";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {frequency} from "../data/frequency";

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
    frequency: yup
        .string()
        .required('Это поле обязательно')
});

export default function ClearRegForm({}) {
    const classes = useStyles();

    const [initialValues, setInitialValues] = useState({
        frequency: "",
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
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" disabled>Очистка реестра</FormLabel>

                            <TextField
                                select
                                id="frequency"
                                label="Частота очистки"
                                variant="outlined"
                                className={classes.mt16}
                                value={formikProps.values.frequency}
                                onChange={formikProps.handleChange('frequency')}
                                helperText={formikProps.touched.frequency ? formikProps.errors.frequency : ""}
                                error={formikProps.touched.frequency && Boolean(formikProps.errors.frequency)}
                            >
                                {frequency.map((freq) => (
                                    <MenuItem key={freq.id} value={freq.value}>{freq.frequency}</MenuItem>
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
                        <Button variant="outlined"
                                color="secondary"
                                disableElevation
                                fullWidth
                                type='button'
                                className={classes.mt16}
                        >
                            Очистить сейчас
                        </Button>
                    </form>
                </FormWrapper>
            )}
        </Formik>
    )
}