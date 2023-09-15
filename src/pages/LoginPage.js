import './loginpage.scss'
import logo from "../images/logo.svg";
import login from  "../images/login.png"
import {Button, Snackbar, TextField} from "@mui/material";

import {verifyVendor} from "../api/auth";
import {useAuth} from "../context/AuthContext";
import {useState} from "react";
import {data} from "../components/charts/SalesChart";



const LoginPage = () => {

    const [ typedVendorId , setTypedVendorId] = useState('')
    const { setIsAuthenticated, setVendorId, setVendorName } = useAuth()


    const [snackBarState, setsnackBarState] = useState({
        open: false,
        vertical: 'left',
        horizontal: 'bottom',
    });

    const { vertical, horizontal, open } = snackBarState;

    const handleChange = (event) => {
        setTypedVendorId(event.target.value);
    };

    const showSnackBar = () => {
        setsnackBarState({ vertical: 'left', horizontal: 'bottom', open: true });
    }

    const handleClose = () => {
        setsnackBarState({ ...snackBarState, open: false });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Vendor ID submitted:", typedVendorId);

        if(!isObjectId(typedVendorId)) {
            showSnackBar();
            return
        }

        verifyVendor(typedVendorId)
            .then((result) => {

                if(!!result.vendor) {
                    setVendorId(typedVendorId);
                    setIsAuthenticated(true)
                    setVendorName(result.vendor.name)

                } else {
                    showSnackBar();
                }

            })
            .catch((error) => {
                console.error("Kontrol sırasında hata oluştu:", error);

            });
    };

    return (

            <div className="login-area">
                <div className="login-form">
                    <div className="logo-content">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Type Vendor ID to Login"
                            variant="standard"
                            value={typedVendorId}
                            onChange={handleChange}
                            margin="normal"
                            required/>
                        <Button
                            sx={{
                                ':hover': {
                                    bgcolor:  '#311f25', // theme.palette.primary.main
                                    color: 'white',
                                },
                                 background: '#532D3C' ,
                            }}
                            type="submit"
                            variant="contained"

                            fullWidth
                            style={{marginTop: '16px'}}
                        >
                            Login
                        </Button>
                    </form>
                </div>
                <div className="login-image">
                    <a href="https://lonca.co/" target="_blank">
                        <img src={login}/>
                    </a>

                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    message="User not found"
                    key={vertical + horizontal}
                    onClose={handleClose}
                />
            </div>


    )

};

function isObjectId(value) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(value);
}


export default LoginPage;