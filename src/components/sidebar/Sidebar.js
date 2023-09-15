import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { motion } from "framer-motion";
import {
    UilPackage,
    UilChart,
    UilSignOutAlt,
} from "@iconscout/react-unicons";
import logo from '../../images/logo.svg';
import IconButton from "@mui/material/IconButton";
import {useAuth} from "../../context/AuthContext";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

const sidebarNavItems = [
    {
        display: 'Monthly Sales',
        icon: <UilChart />,
        to: '/',
        section: ''
    },
    {
        display: 'Product Sales',
        icon: <UilPackage />,
        to: '/product_sales',
        section: 'started'
    },

]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const { setIsAuthenticated, setVendorId, setVendorName, vendorName } = useAuth()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    function handleLogOut() {
        setIsAuthenticated(false)
        setVendorId('')
        setVendorName('')
        window.location.href = '/';
    }

    return <motion.div className='sidebar'>
        <div className="sidebar__logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="sidebar-welcome" >
            <p>Hello <span className= "vendorname"> { vendorName }</span>   !</p>
            <p>Welcome to Lonca Supplier Panel !</p>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div className='sidebar-logout' >
            <IconButton  onClick={handleClickOpen} >
                <p className='sidebar-logout-p' > Logout</p>
                <UilSignOutAlt  size={30} />
            </IconButton>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to logout?"}
            </DialogTitle>

            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleLogOut} autoFocus>
                    Yes, I'm sure
                </Button>
            </DialogActions>
        </Dialog>
    </motion.div>;
};

export default Sidebar;