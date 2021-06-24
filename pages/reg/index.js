import Button from "@material-ui/core/Button";
import PLItem from "../../components/PLItem";
import DialogReport from "../../components/DialogReport";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_CLOSED_WAYBILLS} from "../../graphql/queries";


export default function RegPage() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const {loading: waybillsLoading, error: waybillsError, data: waybills} = useQuery(GET_CLOSED_WAYBILLS, {
        fetchPolicy: "cache-and-network"
    });

    function handleCloseDialog() {
        setDialogIsOpen(false);
    }

    function handleOpenDialog() {
        setDialogIsOpen(true);
    }

    return (
        <>
            <div className="btn__wrapper">
                <Button variant="contained" color="primary" disableElevation onClick={handleOpenDialog}>
                    Построить отчетную таблицу
                </Button>
            </div>

            <div style={{marginTop: '24px'}}>
                {waybillsLoading ?
                    'Loading...'
                    :
                    waybills.allWaybills.map((waybill) => {
                        return <PLItem key={waybill.id} page='reg' data={waybill}/>
                    })

                }

            </div>

            <DialogReport isOpen={dialogIsOpen} handleClose={handleCloseDialog}/>

        </>
    )
}