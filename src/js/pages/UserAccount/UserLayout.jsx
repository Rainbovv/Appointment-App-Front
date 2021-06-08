import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getUserLoaded} from "../../selectors/auth";
import {useHistory} from "react-router-dom";


const UserLayout = ({children}) => {
    const history = useHistory();
    const isUserLoaded = useSelector(getUserLoaded);
    useEffect(() => {
        if (!isUserLoaded) {
            history.push("/");
        }

    }, [])

    return  <>{children}</>;
};

export default UserLayout;