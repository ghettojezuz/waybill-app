import Button from "@material-ui/core/Button";
import {Divider} from "@material-ui/core";
import PLItem from "../../components/PLItem";
import {useRouter} from "next/router";
import {gql, useMutation, useQuery} from '@apollo/client';

export default function PLPage() {
    const router = useRouter();

    function handleRedirect() {
        router.push('/pl/new');
    }
    return (
        <>
            <div className="btn__wrapper">
                <Button variant="contained" color="primary" disableElevation onClick={handleRedirect}>
                    Новый путевой лист
                </Button>
            </div>

            <h3>Активные путевые листы</h3>
            <Divider style={{marginBottom: '20px'}}/>
            <PLItem active/>

            <h3>Закрытые путевые листы</h3>
            <Divider style={{marginBottom: '20px'}}/>
            <PLItem/>
        </>
    )
}