import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import {handleRedirect} from "../helpers/handleRedirect";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {useRouter} from "next/router";
import Button from "@material-ui/core/Button";

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
    },
    footer: {
        padding: '0',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
    },
    footerButton: {
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
    }
}));

export default function CustomList({header, data, primary, secondary, redirectUrl, redirectAsUrl, hasFooter, onLoad}) {
    const classes = useStyles();
    const router = useRouter();

    return (
        <List className={classes.root}
              subheader={
                  <ListSubheader component="div" className={classes.subHeader} disableSticky>
                      {header}
                  </ListSubheader>
              }>
            {data.map((item) => {
                return (
                    <ListItem button
                              key={item.id}
                              onClick={() => handleRedirect(router, redirectUrl, `${redirectAsUrl}${item.id}`)}>
                        <ListItemText primary={primary ? item[primary] : undefined}
                                      secondary={secondary ? item[secondary] : undefined}/>
                    </ListItem>
                );
            })}
            {hasFooter ?
                <ListItem className={classes.footer}>
                    <Button className={classes.footerButton}
                            fullWidth
                            disabled
                    >
                        Загрузить еще
                    </Button>
                </ListItem>
                :
                null
            }

        </List>
    )
}