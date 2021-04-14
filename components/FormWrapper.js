import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#FFFFFF',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px'
    },
}));

export default function FormWrapper({children, padding = '32px'}) {
    const classes = useStyles();

    return (
        <div className={classes.root}
             style={{padding: padding}}
        >
            {children}
        </div>
    )
}