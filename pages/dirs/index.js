import {useRouter} from "next/router";
import styles from '../../styles/DirsPage.module.scss';
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useQuery} from '@apollo/client';
import {GET_DRIVERS, GET_CARS} from "../../graphql/queries";
import CustomList from "../../components/List";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: '-1px 4px 4px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.15)',
    },
    subHeader: {
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    listItem: {
        "&:last-child": {
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
        }
    }
}));

export default function DirsPage() {
    const classes = useStyles();
    const router = useRouter();

    const {loading: driversLoading, error: driversError, data: drivers} = useQuery(GET_DRIVERS, {
        fetchPolicy: "cache-and-network"
    });
    const {loading: carsLoading, error: carsError, data: cars} = useQuery(GET_CARS, {
        fetchPolicy: "cache-and-network"
    });

    function handleRedirect(to) {
        router.push(to);
    }

    return (
        <>
            <div className={styles.grid}>
                <div>
                    <Button variant="contained"
                            color="primary"
                            disableElevation
                            fullWidth
                            className={styles.button}
                            onClick={() => handleRedirect('/dirs/drivers/new')}>
                        Новый водитель
                    </Button>

                    {driversLoading ?
                        <>Loading...</>
                        :
                        drivers ?
                            <CustomList header={"Водители"}
                                        data={drivers.allDrivers}
                                        primary={'fio'}
                                        redirectUrl={'/dirs/drivers/[driverID]'}
                                        redirectAsUrl={'/dirs/drivers/'}
                                        hasFooter
                            />
                            :
                            <>Error</>
                    }
                </div>

                <div>
                    <Button variant="contained"
                            color="primary"
                            disableElevation
                            fullWidth
                            className={styles.button}
                            onClick={() => handleRedirect('/dirs/cars/new')}>
                        Новый автомобиль
                    </Button>

                    {carsLoading ?
                        <>Loading...</>
                        :
                        cars ?
                            <CustomList header={"Автомобили"}
                                        data={cars.allCars}
                                        primary={'brand'}
                                        secondary={'number'}
                                        redirectUrl={'/dirs/cars/[carID]'}
                                        redirectAsUrl={'/dirs/cars/'}
                                        hasFooter
                            />
                            :
                            <>Error</>
                    }

                </div>
            </div>
        </>
    )
}