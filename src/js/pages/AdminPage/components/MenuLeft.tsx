import React from "react";
import {Menu} from "semantic-ui-react";

type Props = {
    contentType: string;
    onClick: (contentType: string) => void
}

export const MenuLeft: React.FunctionComponent<Props> = ({
                                                             contentType = "patient",
                                                             onClick,
                                                             ...props
                                                         }) => {

    return (
        <Menu pointing vertical>
            <Menu.Item
                name="patient"
                active={contentType === "patient"}
                onClick={(e)=>onClick("patient")}
            />
            <Menu.Item
                name="personal"
                active={contentType === "personal"}
                onClick={()=>onClick("personal")}
            />
        </Menu>
    )
}
