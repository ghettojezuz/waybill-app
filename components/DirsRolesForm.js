import FormWrapper from "./FormWrapper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import * as yup from "yup";
import {useState} from "react";
import {Formik} from "formik";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import {roles} from "../data/roles";

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
    driversDir: yup
        .array()
        .min(1, 'Выберите минимум одну роль'),
    carsDir: yup
        .array()
        .min(1, 'Выберите минимум одну роль'),
});

export default function DirsRolesForm({}) {
    const classes = useStyles();

    const [initialValues, setInitialValues] = useState({
        driversDir: [],
        carsDir: [],
    });

    const getMultipleRenderValue = (selected) => {
        let result = [];

        for (let i = 0; i < roles.length; i++) {
            for (let j = 0; j < selected.length; j++) {
                if (roles[i].value === selected[j]) {
                    result.push(roles[i].role)                }
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
                        <FormLabel component="legend" disabled>Права на редактирование справочников</FormLabel>

                        <FormControl variant="outlined"
                                     fullWidth
                                     className={classes.mt16}
                                     error={formikProps.touched.driversDir && Boolean(formikProps.errors.driversDir)}
                        >
                            <InputLabel id="driversDir_label" style={{padding: "0 4px", backgroundColor: "#ffffff"}}>
                                Справочник водителей
                            </InputLabel>
                            <Select
                                id="driversDir"
                                labelId="driversDir_label"
                                multiple
                                fullWidth
                                value={formikProps.values.driversDir}
                                onChange={(e) => {
                                    formikProps.setFieldValue('driversDir', e.target.value);
                                }}
                                renderValue={(selected) => getMultipleRenderValue(selected)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.value}>{role.role}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formikProps.touched.driversDir ? formikProps.errors.driversDir : ""}</FormHelperText>
                        </FormControl>

                        <FormControl variant="outlined"
                                     fullWidth
                                     className={classes.mt16}
                                     error={formikProps.touched.carsDir && Boolean(formikProps.errors.carsDir)}
                        >
                            <InputLabel id="carsDir_label" style={{padding: "0 4px", backgroundColor: "#ffffff"}}>
                                Справочник автомобилей
                            </InputLabel>
                            <Select
                                id="carsDir"
                                labelId="carsDir_label"
                                multiple
                                fullWidth
                                value={formikProps.values.carsDir}
                                onChange={(e) => {
                                    formikProps.setFieldValue('carsDir', e.target.value);
                                }}
                                renderValue={(selected) => getMultipleRenderValue(selected)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.value}>{role.role}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formikProps.touched.carsDir ? formikProps.errors.carsDir : ""}</FormHelperText>
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