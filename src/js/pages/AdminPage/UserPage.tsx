import React, {useEffect, Fragment} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    profileContentLoaded,
    selectedUserProfile
} from "../../selectors/profiles";
import {getProfileById} from "../../actions/profiles";
import {UrlParams} from "../../types/interfaces/UrlParams";
import {PlainObject} from "../../types/interfaces/PlainObject";


import {
    Button,
    Divider,
    Header,
    Item,
    Loader
} from "semantic-ui-react";
import Moment from "react-moment";


type Props = {
    profileContentLoaded: boolean;
    userData: PlainObject;
}

const UserPage: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const {profileId} = useParams<UrlParams>();
    const dispatch = useDispatch();
    const userData = useSelector(selectedUserProfile);
    const userDataLoaded = useSelector(profileContentLoaded);

    const fullName = (userData && userData.firstName && userData.firstName)
        + "  " + (userData && userData.lastName && userData.lastName)
    const roles = userData && userData.user && userData.user.roles && userData.user.roles;

    useEffect(() => {
        if (!userData || !userData.id) {
            dispatch(getProfileById(parseInt(profileId)));
        }
    }, []);

    return (
        <Fragment>
            {userDataLoaded ?
                <Fragment>
                    <Header>
                        {fullName && fullName}
                    </Header>
                    <Divider/>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                            <Item.Content>
                                {roles.map((role: PlainObject) => {
                                    console.log("----------------", role.name)
                                    return <Item.Header key={role.id}>
                                        {role.name & role.name}
                                    </Item.Header>
                                })}
                                <Item.Meta>
                                    <span className='stay'>
                                        {userData && userData.dateOfBirth ?
                                            <Moment format="DD/MM/YYYY" date={userData.dateOfBirth}/>
                                            :
                                            "no birthdate"
                                        }
                                    </span>
                                </Item.Meta>
                                <Item.Description>{userData && userData.about ? userData.about : "No information about this user"}</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>


                </Fragment>
                :
                <Loader active>
                    Loading...
                </Loader>
            }
            <Button
                primary
                floated="right"
                onClick={() => history.push("/admin")}
            >
                Back
            </Button>
        </Fragment>
    )
}

export default UserPage;