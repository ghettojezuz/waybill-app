import makeStyles from "@material-ui/core/styles/makeStyles";
import CustomList from "../../components/List";
import Button from "@material-ui/core/Button";
import {handleRedirect} from "../../helpers/handleRedirect";
import ClearRegForm from "../../components/ClearRegForm";
import DirsRolesForm from "../../components/DirsRolesForm";
import DefaultPagesForm from "../../components/DefaultPagesForm";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
    },
    gridColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '36px',
    },
    mb24: {
        marginBottom: '24px',
    },
}));

export default function AdminPage() {
    const classes = useStyles();
    const router = useRouter();
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
            <div className={classes.gridColumn}>
                <div>
                    <Button variant="contained"
                            color="primary"
                            disableElevation
                            fullWidth
                            className={classes.mb24}
                            onClick={() => handleRedirect(router,'/admin/users/new')}>
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

            <div className={classes.gridColumn}>
                <ClearRegForm/>
                <DirsRolesForm/>
                <DefaultPagesForm/>
            </div>

        </div>
    )
}