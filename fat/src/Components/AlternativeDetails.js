import React from 'react';

import { Modal, Container, Image, Divider, Grid, Header, Segment, Card } from 'semantic-ui-react'
import MarkdownRenderer from 'react-markdown-renderer'

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
    }

    render() {
        if (!this.props.alternative || !this.props.product)
            return (<></>)
        else {
            const betterInPercentage = Math.round(((this.props.product['emissions'] - this.props.alternative['emissions']) / this.props.product['emissions']) * 100)
            return (
                <Modal
                    centered={false}
                    open={this.state.isOpen}
                    onClose={this.props.onClose}>
                    <Container>
                        <Segment>
                            <Grid columns={2} verticalAlign='middle'>
                                <Grid.Column>
                                    <Image style={{ margin: 'auto' }}
                                        size='small'
                                        src={this.state.product.imageLink}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image style={{ margin: 'auto' }}
                                        size='small'
                                        src={this.state.product.imageLink}
                                        src={this.state.alternative.imageLink}
                                    />
                                </Grid.Column>
                            </Grid>
                            <Divider vertical><p>REPLACED BY</p></Divider>
                        </Segment>
                        <Container style={{ paddingLeft: '20%', paddingRight: '20%', paddingBottom: '2em', paddingTop: '1em' }}>
                            <Header as='h2'>{this.state.product.name} replaced by {this.state.alternative.name}</Header>
                            <p>
                                <MarkdownRenderer markdown={this.state.alternative.description} />
                            </p>
                        </Container>
                        <Divider />
                        <Container textAlign="center">
                            <Header as='h3'>Impact</Header>
                            <Card style={{ margin: 'auto', padding: '2em' }}>
                                <b>
                                    {betterInPercentage}% more sustainable
                                </b>
                            </Card>
                            <Segment>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Card style={{ margin: 'auto', padding: '2em', backgroundColor: '#FF5151' }}>
                                            <b>
                                                {this.state.product.emissions} {this.state.product.unit}
                                            </b>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card style={{ margin: 'auto', padding: '2em', backgroundColor: '#F2EC64' }}>
                                            <b>
                                                {this.state.alternative.emissions} {this.state.alternative.unit}
                                            </b>
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
}

export default AlternativeDetails