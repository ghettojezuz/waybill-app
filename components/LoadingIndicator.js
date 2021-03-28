import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export default function LoadingIndicator() {

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0'
        }}>
            <CircularProgress/>
        </div>
    )
}