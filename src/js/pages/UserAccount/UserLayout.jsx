import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "../../selectors/auth";
import {useHistory} from "react-router-dom";


const UserLayout = ({children}) => {
    const history = useHistory();
    const userData = useSelector(getUserData);
    useEffect(() => {
        if (userData == null) {
            history.push("/");
        }

    }, [userData])

    return  <>{children}</>;
};

export default UserLayout;