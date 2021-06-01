import {PlainObject} from "../../types/interfaces/PlainObject";
import React from "react";
import {useHistory} from "react-router-dom";
import {Card, Divider, Header, Icon, Item} from "semantic-ui-react";

type Props = {
    profileData: PlainObject;
}

const UserPage: React.FunctionComponent<Props> = ({profileData = {}, ...props}) => {
    const history = useHistory();

    const fullName = profileData.firstName + " " + profileData.lastName;


    return (
        <div>
            <Header>
                USER PAGE
            </Header>
            <Divider/>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content>
                        <Item.Header>
                            {fullName}
                        </Item.Header>
                        <Item.Meta>
                            <span className='price'>{profileData.dateOfBirth}</span>
                            <span className='stay'>1 Month</span>
                        </Item.Meta>
                        <Item.Description>Hey</Item.Description>
                    </Item.Content>
                </Item>

            </Item.Group>
        </div>
    )
}


export default UserPage;