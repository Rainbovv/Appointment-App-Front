import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTokenExpired} from "../../selectors/auth";
import {useHistory} from "react-router-dom";
import {Button, Modal} from "semantic-ui-react";
import {History} from "history";


const AuthWrapper: React.FC = ({children}) => {
    const history: History = useHistory();
    const dispatch = useDispatch();
    const isTokenExpired: boolean = useSelector(getTokenExpired);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect((): void => {
        if (isTokenExpired) {
            history.push("/");
            setIsOpen(true);
            dispatch({type: "SET_TOKEN_EXPIRED",
                                payload: false});
        }

    }, [isTokenExpired])

    return (
        <div className="content-layout">
            <Modal
                centered={false}
                open={isOpen}
            >
                <Modal.Header>You session has expired</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        To continue working please sign-in.
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={(): void => setIsOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>
            {children}
        </div>
    );
};

export default AuthWrapper;