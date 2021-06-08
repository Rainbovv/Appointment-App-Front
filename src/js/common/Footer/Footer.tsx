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
                <Container textAlign="justified">
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item as="a">
                                        <a href="https://stefanini.com/en/contact-us">
                                            Contact Us
                                        </a>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <List>
                                    <List.Item>
                                        <List.Icon name='users' />
                                        <List.Content>Stefanini EMEA</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='marker' />
                                        <List.Content>Jaguariúna , BRA</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>
                                            <a href='mailto:stefanini@stefanini.com'>
                                                stefanini@stefanini.com
                                            </a>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='linkify' />
                                        <List.Content>
                                            <a href="https://stefanini.com/">
                                                stefanini.com
                                            </a>
                                        </List.Content>
                                    </List.Item>
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