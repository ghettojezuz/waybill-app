import styles from '../styles/PLItem.module.scss'
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import {convertDate} from "../helpers/dateConvert";
import {fioReduction} from "../helpers/fioReduction";
import {handleRedirect} from "../helpers/handleRedirect";
import {useRouter} from "next/router";

export default function PLItem({active = false, type = 'default', data}) {
    const router = useRouter();

    // id: "2d345898-0496-4717-aa6a-c3a65034f64b"

    return (
        <Card elevation={0} className={styles.plItem__wrapper}>
            <CardActionArea onClick={() => handleRedirect(router, '/reg/[PLID]', `/reg/${data.id}`)}>
                <CardContent className={styles.plItem}>
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Дата</p>
                        <p className={styles.plItem__block__text}>{convertDate(data.date_start)}</p>
                    </div>
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Автомобиль</p>
                        <p className={styles.plItem__block__text}>{data.Car.brand}</p>
                    </div>
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Гос. номер</p>
                        <p className={styles.plItem__block__text}>{data.Car.number}</p>
                    </div>
                    {type === 'reg' &&
                        <div className={styles.plItem__block}>
                            <p className={styles.plItem__block__title}>Водитель</p>
                            <p className={styles.plItem__block__text}>{fioReduction(data.Driver.fio)}</p>
                        </div>
                    }
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Топливо</p>
                        <p className={styles.plItem__block__text}>{data.Car.fuel}</p>
                    </div>
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Пробег при выезде</p>
                        <p className={styles.plItem__block__text}>{data.mileage_start} км</p>
                    </div>
                    <div className={styles.plItem__block}>
                        <p className={styles.plItem__block__title}>Пробег за день</p>
                        <p className={styles.plItem__block__text}>{active ? '-' : `${parseInt(data.mileage_end) - parseInt(data.mileage_start)} км`}</p>
                    </div>

                    {type === 'default' &&
                        <div className={styles.plItem__block}>
                            <p className={styles.plItem__block__title}>Статус</p>
                            <p className={styles.plItem__block__text}>
                                <span className={`${styles.plItem__status} ${active ? styles.plItem__status__active : styles.plItem__status__closed}`}></span>
                                {active ? 'Активно' : 'Закрыто'}
                            </p>
                        </div>
                    }

                </CardContent>
            </CardActionArea>
        </Card>
    )
}