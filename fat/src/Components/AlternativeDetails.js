import React from 'react';

import { Modal, Container, Image, Divider, Grid, Header, Segment, Icon } from 'semantic-ui-react'
import MarkdownRenderer from 'react-markdown-renderer'
import {capitalize} from '../helper'
import { Trans } from 'react-i18next';

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
                    closeIcon
                    centered={false}
                    open={this.state.isOpen}
                    onClose={this.props.onClose}>
                    <Container>
                        <Segment style={{ margin: 0 }}>
                            <Grid columns={2} verticalAlign='middle'>
                                <Grid.Column >
                                    <Image style={{ margin: 'auto', maxHeight: 200, width:'auto' }}
                                        size='small'
                                        src={this.state.product.imageLink}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image style={{ margin: 'auto',maxHeight: 200, width:'auto' }}
                                        size='small'
                                        src={this.state.product.imageLink}
                                        src={this.state.alternative.imageLink}
                                    />
                                </Grid.Column>
                            </Grid>
                            <Grid columns={2} verticalAlign='middle'>
                                <Grid.Column textAlign='center'>
                                    <b>
                                        {this.state.product.emissions} {this.state.product.unit}
                                    </b>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <b>
                                        {this.state.alternative.emissions} {this.state.alternative.unit}
                                    </b>
                                </Grid.Column>
                            </Grid>
                            <Divider vertical>
                                <Icon name="angle double right" style={{ fontSize: '2em' }} color='black' />
                            </Divider>
                        </Segment>
                        <Container style={{ paddingBottom: '1em', paddingTop: '1em', backgroundColor: '#1a531b' }} textAlign='center'>
                            <Header style={{ color: '#fff' }} as='h3'>{betterInPercentage}% <Trans>better</Trans></Header>
                        </Container>
                        <Container style={{ paddingLeft: '20%', paddingRight: '20%', paddingBottom: '2em', paddingTop: '1em' }}>
                            <Header style={{ color: '#1a531b' }} as='h2'>{capitalize(this.state.product.name)} <Trans>replaces</Trans> {capitalize(this.state.alternative.name)}</Header>
                            <p>
                                <MarkdownRenderer markdown={this.state.alternative.description} />
                            </p>
                        </Container>

                    </Container>
                </Modal>
            )
        }
    }
}

export default AlternativeDetails