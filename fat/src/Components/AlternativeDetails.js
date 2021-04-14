import React from 'react';

import {Modal, Container, Image, Divider, Grid, Header, Segment, Card} from 'semantic-ui-react'

class AlternativeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            alternative: {
                imageLink: undefined
            },
            product: {
                imageLink: undefined
            },
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isOpen: nextProps.isOpen,
            alternative: nextProps.alternative,
            product: nextProps.product
        });
        console.log(nextProps.product)
    }

    render() {
        return (
            <Modal
                open={this.state.isOpen}
                onClose={() => {
                    this.setState({
                        isOpen: false
                    });
                }
                }>
                <Container>
                    <Container style={{backgroundColor: '#1a531b', margin: '2em', padding: '2em'}}>
                        <Segment style={{backgroundColor: '#1a531b'}}>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Image style={{margin: 'auto'}}
                                           src={this.state.product.imageLink}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image style={{margin: 'auto'}}
                                           src={this.state.alternative.imageLink}
                                    />
                                </Grid.Column>
                            </Grid>
                            <Divider vertical>REPLACED BY</Divider>
                        </Segment>
                    </Container>
                    <Container style={{paddingLeft: '20%', paddingRight: '20%', paddingBottom: '2em', paddingTop: '1em'}}>
                        <Header as='h2'>{this.state.product.name} replaced by {this.state.alternative.name}</Header>
                        <p>
                            {this.state.alternative.description}
                        </p>
                    </Container>
                    <Divider>
                    </Divider>
                    <Container textAlign="center" >
                        <Header as='h3'>Absolute Impact</Header>
                        <Segment >
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Card style={{margin: 'auto'}}>
                                        {this.state.product.emissions}
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card style={{margin: 'auto'}}>
                                        {this.state.alternative.emissions}
                                    </Card>
                                </Grid.Column>
                            </Grid>
                            <Divider vertical>VS</Divider>
                        </Segment>
                    </Container>
                </Container>
            </Modal>
        )
    }
}

export default AlternativeDetails