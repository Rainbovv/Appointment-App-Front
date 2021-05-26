import React from "react";
import {Menu} from "semantic-ui-react";

type Props = {
    contentType: string;
    onClick: (contentType: string) => void
}

export const MenuLeft: React.FunctionComponent<Props> = ({
                                                             contentType = "patients",
                                                             onClick,
                                                             ...props
                                                         }) => {
    const handleIncrement = () => {
    };

    return (
        <Menu pointing vertical>
            <Menu.Item
                name="patients"
                active={contentType === "patients"}
                onClick={()=>onClick("patients")}
            />
            <Menu.Item
                name="personal"
                active={contentType === "personal"}
                onClick={()=>onClick("personal")}
            />
        </Menu>
    )
}
