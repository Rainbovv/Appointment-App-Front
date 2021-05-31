import React from "react";
import {RootState} from "../../store";

type AddUserPageState = {
    columnNames: Array<string>;
    contentType: string
};


interface AddUserPageProps extends RootState{
}

export default class AddUserPage extends React.Component<RootState, AddUserPageState> {



}
