import React from "react";
import {Menu} from "semantic-ui-react";
import {adminContentTypes} from "../../../config/parameters";

type Props = {
    contentType: string;
    onClick: (contentType: string) => void
}

export const MenuLeft: React.FunctionComponent<Props> = ({
                                                             contentType = adminContentTypes.PATIENT,
                                                             onClick,
                                                             ...props
                                                         }) => {

    return (
        <Menu pointing vertical>
            <Menu.Item
                name={adminContentTypes.PATIENT}
                active={contentType === adminContentTypes.PATIENT}
                onClick={(e)=>onClick(adminContentTypes.PATIENT)}
            />
            <Menu.Item
                name={adminContentTypes.PERSONAL}
                active={contentType === adminContentTypes.PERSONAL}
                onClick={()=>onClick(adminContentTypes.PERSONAL)}
            />
        </Menu>
    )
}
