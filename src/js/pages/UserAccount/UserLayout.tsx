import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {getUserLoaded} from "../../selectors/auth";
import {useHistory} from "react-router-dom";


export default function UserLayout(props: { children: any; }) {

    const history = useHistory();
    const isUserLoaded: boolean = useSelector(getUserLoaded);

    useEffect(() => {
        if (!isUserLoaded) {
            history.push("/");
        }

    }, [isUserLoaded]);

    return  <div className="page-container">{props.children}</div>;
}