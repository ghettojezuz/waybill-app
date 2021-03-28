import Button from "@material-ui/core/Button";
import {Divider} from "@material-ui/core";
import PLItem from "../../components/PLItem";
import {useRouter} from "next/router";
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_USER_WAYBILLS} from "../../graphql/queries";
import {handleRedirect} from "../../helpers/handleRedirect";

export default function PLPage() {
    const router = useRouter();

    const {loading: waybillsActiveLoading, error: waybillsActiveError, data: waybillsActive} = useQuery(GET_USER_WAYBILLS, {
        fetchPolicy: "cache-and-network",
        variables: {
            user_id: "fae86ee8-ada5-413f-b290-308a0ecdafa1",
            is_active: true
        }
    });

    const {loading: waybillsNonActiveLoading, error: waybillsNonActiveError, data: waybillsNonActive} = useQuery(GET_USER_WAYBILLS, {
        fetchPolicy: "cache-and-network",
        variables: {
            user_id: "fae86ee8-ada5-413f-b290-308a0ecdafa1",
            is_active: false
        }
    });

    return (
        <>
            <div className="btn__wrapper">
                <Button variant="contained" color="primary" disableElevation
                        onClick={() => handleRedirect(router, "/pl/new")}>
                    Новый путевой лист
                </Button>
            </div>

            <h3>Активные путевые листы</h3>
            <Divider style={{marginBottom: '20px'}}/>
            {waybillsActiveLoading ?
                <div style={{marginBottom: "20px"}}>Loading...</div>
                :
                waybillsActive.allWaybills.length > 0 ?
                    waybillsActive.allWaybills.map((waybill) => {
                        return <PLItem key={waybill.id} page={'pl'} data={waybill} active/>
                    })
                    :
                    <div style={{marginBottom: "30px"}}>Нет активных путевых листов</div>
            }

            <h3>Закрытые путевые листы</h3>
            <Divider style={{marginBottom: '20px'}}/>
            {waybillsNonActiveLoading ?
                <div style={{marginBottom: "20px"}}>Loading...</div>
                :
                waybillsNonActive.allWaybills.length > 0 ?
                    waybillsNonActive.allWaybills.map((waybill) => {
                        return <PLItem key={waybill.id} page={'pl'} data={waybill}/>
                    })
                    :
                    <div style={{marginBottom: "20px"}}>Нет закрытых путвых листов</div>
            }
        </>
    )
}