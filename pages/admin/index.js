import makeStyles from "@material-ui/core/styles/makeStyles";
import CustomList from "../../components/List";
import Button from "@material-ui/core/Button";
import {handleRedirect} from "../../helpers/handleRedirect";

const useStyles = makeStyles((theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
    },
    mb24: {
        marginBottom: '24px',
    }
}));

export default function AdminPage() {
    const classes = useStyles();
    const users = [
        {
            id: 1,
            fio: 'Кузнецов Никита Сергеевич',
            role: 'Администратор'
        },
        {
            id: 2,
            fio: 'Дачный Игорь Петрович',
            role: 'Механик'
        },
        {
            id: 3,
            fio: 'Русский Иван Олегович',
            role: 'Водитель'
        },

    ];

    return (
        <div className={classes.grid}>
            <div>
                <Button variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        className={classes.mb24}
                        onClick={() => handleRedirect('/admin/users/new')}>
                    Новый пользователь
                </Button>

                <CustomList header={"Пользователи"}
                            data={users}
                            primary={'fio'}
                            secondary={'role'}
                            redirectUrl={'/admin/users/[userID]'}
                            redirectAsUrl={'/admin/users/'}
                            hasFooter
                />
            </div>

        </div>
    )
}