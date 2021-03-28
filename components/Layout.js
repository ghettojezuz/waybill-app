import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {isLoginDispatch} from "../store/app/actions";
import {makeStyles} from '@material-ui/core/styles';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    Breadcrumbs,
} from '@material-ui/core';
import ListItemLink from './ListItemLink';
import Chip from "@material-ui/core/Chip";
import styles from '../styles/Layout.module.scss'


const drawerWidth = 223;

const useStyles = makeStyles((theme) => ({
    root: {},
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        height: '95px',
        backgroundColor: '#F7F5F3',
        boxShadow: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: {height: '155px'},
    content: {
        flexGrow: 1,
        backgroundColor: '#F7F5F3',
        marginLeft: drawerWidth,
    },
    title: {
        flexGrow: 1,
        fontSize: '16px',
        lineHeight: '19px',
        color: 'rgba(150, 150, 150, 0.5)',
    },
    listItem: {
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: '24px',
        margin: 0,
    },
    listItemNested: {
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '47px',
        margin: 0,
    },
    listItemText: {
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '16px',
        fontSize: '14px',
    },
    bold: {
        fontWeight: 'bold',
    },
    breadcrumbs: {
        color: 'rgba(150, 150, 150, 0.5)',
    }
}));

const Layout = ({children}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const router = useRouter();
    const breadcrumbNameMap = useSelector(state => state.app.breadcrumbNameMap);

    useEffect(() => {
        if (router.pathname === '/') {
            router.push('/pl');
        }
    }, []);

    function logout() {
        dispatch(isLoginDispatch(false));
    }

    function getBreadcrumbs() {
        let pathnames = router.pathname.split('/').filter((x) => x);
        return (
            <Breadcrumbs className={classes.breadcrumbs}>
                {pathnames.map((value, index) => {
                    // const last = index === pathnames.length - 1;
                    // const href = `/${pathnames.slice(0, index + 1).join('/')}`;
                    //
                    // return last ? (
                    //     <Typography color="inherit" key={href}>
                    //         {breadcrumbNameMap[href]}
                    //     </Typography>
                    // ) : (
                    //     <Link color="inherit" href={href} key={href}>
                    //         <a>
                    //             {breadcrumbNameMap[href]}
                    //         </a>
                    //     </Link>
                    // );

                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <Typography color="inherit" key={href}>
                            {breadcrumbNameMap[href]}
                        </Typography>
                    );
                })}
            </Breadcrumbs>
        )
    }

    return (
        <div className={classes.root}>

            <AppBar position={'static'} className={classes.appBar}>
                <Toolbar>
                    {getBreadcrumbs()}
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">

                <div className={`${styles.user}`}>
                    <img src="/icons/Logo.png" alt=""/>
                    <p className={`${styles.user__name}`}>Кузнецов Никита</p>
                    <Chip label="Администратор" onClick={() => {}} size="small"/>
                    <button className={`${styles.user__logout}`} onClick={logout}>Выйти</button>
                </div>

                <Divider/>

                <List>
                    <ListItemLink href="/pl" primaryTypographyProps={{className: classes.listItemText}}/>
                    <ListItemLink href="/dirs" primaryTypographyProps={{className: classes.listItemText}}/>
                    <ListItemLink href="/reg" primaryTypographyProps={{className: classes.listItemText}}/>
                    {/*<ListItemLink href="/admin" primaryTypographyProps={{className: classes.listItemText}}/>*/}
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
};

export default Layout;