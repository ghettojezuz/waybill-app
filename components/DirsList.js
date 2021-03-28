import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {handleRedirect} from "../helpers/handleRedirect";
import {useRouter} from "next/router";

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

export default function DirsList({type, data, title}) {
    const classes = useStyles();
    const router = useRouter();

    return (
        <List className={classes.root}
              subheader={
                  <ListSubheader component="div" className={classes.subHeader} disableSticky>
                      {title}
                  </ListSubheader>
              }>
            {data.map((item) => {
                if (type === 'cars')
                    return (
                        <ListItem button
                                  className={classes.listItem}
                                  key={item.id}
                                  onClick={() => handleRedirect(router, '/dirs/cars/[carID]', `/dirs/cars/${item.id}`)}>
                            <ListItemText primary={item.brand} secondary={item.number}/>
                        </ListItem>
                    );

                if (type === 'drivers')
                    return (
                        <ListItem button
                                  className={classes.listItem}
                                  key={item.id}
                                  onClick={() => handleRedirect(router, '/dirs/drivers/[driverID]', `/dirs/drivers/${item.id}`)}>
                            <ListItemText primary={item.fio}/>
                        </ListItem>
                    )
            })}
        </List>
    )
}