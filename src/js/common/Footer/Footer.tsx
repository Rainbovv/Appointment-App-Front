import React, {Fragment} from "react";

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Item,
    List,
    Segment,
} from "semantic-ui-react";

import "./footer-style.css";

type Props = {}

const Footer: React.FunctionComponent<Props> = (props) => {
    return (
        <footer className="footer-container">
            <Segment inverted vertical style={{padding: "5em 0em", backgroundColor: "#25283e"}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item>Sitemap</List.Item>
                                    <List.Item>Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    All rights reserved
                                </Header>
                                <p>
                                    This site and service is powered by Stefanini EMEA
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </footer>
    )
};

export default Footer;