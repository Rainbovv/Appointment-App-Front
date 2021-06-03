import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTokenExpired} from "../../selectors/auth";
import {useHistory} from "react-router-dom";


const AuthLayout = ({children}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isTokenExpired = useSelector(getTokenExpired);
    useEffect(() => {
        if (isTokenExpired) {
            history.push("/");
            dispatch({type: "SET_TOKEN_EXPIRED",
                                payload: false});
        }
    }, [isTokenExpired])

    return <>{children}</>;
};

export default AuthLayout;