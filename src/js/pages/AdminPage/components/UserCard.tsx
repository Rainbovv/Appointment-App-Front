import React, {Fragment} from "react";
import {PlainObject} from "../../../types/interfaces/PlainObject";

import {
    Item,
    Loader
} from "semantic-ui-react";
import Moment from "react-moment";


type Props = {
    userData: PlainObject;
}

const UserCard: React.FunctionComponent<Props> = (props) => {
        const userData: PlainObject = props.userData;
        const roles: Array<PlainObject> = userData && userData.user && userData.user.roles && userData.user.roles.map((role: PlainObject) => {
            return <span className='stay' key={role.id}>
            {role.name}
        </span>
        });

        return (

            <Item.Group>
                <Item>
                    <Item.Image size='tiny' src='build/images/user_avatar.png'/>
                    <Item.Content>
                        <Item.Meta>
                                <span className='price'>
                                    role:
                                </span>
                            {roles}
                        </Item.Meta>
                        <Item.Extra>
                                    <span className='price'>
                                    date of birth:
                                    </span>
                            <span className='stay'>
                                        {userData && userData.dateOfBirth ?
                                            <Moment format="DD/MM/YYYY" date={userData.dateOfBirth}/>
                                            :
                                            "no birthdate"
                                        }
                                    </span>
                        </Item.Extra>
                        <Item.Extra>
                                    <span className='price'>
                                        description:
                                    </span>
                        </Item.Extra>
                        <Item.Description>
                            {userData && userData.about ? userData.about : "No information about this user"}
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    }
;

export default UserCard;