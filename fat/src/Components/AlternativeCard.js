import React from 'react'
import { Trans } from 'react-i18next';
import { Card, Grid, Icon, Image } from 'semantic-ui-react'
import { capitalize } from '../helper';

class AlternativeCard extends React.Component {

    //this.props.product
    //this.props.alternative

    //TODO: fix language

    render() {
        const betterInPercentage = Math.round(((this.props.product['emissions'] - this.props.alternative['emissions']) / this.props.product['emissions']) * 100)
        return (
            <Card onClick={() => { this.props.onClick(this.props.product, this.props.alternative) }}>
                <Card style={{ marginBottom: '0' }}>
                    <Card.Content>
                        <Grid columns={3} verticalAlign='middle'>
                            <Grid.Column>
                                <Image
                                    style={{ maxHeight: 50, width: 'auto' }}
                                    size='small'
                                    src={this.props.product['imageLink']}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Icon name="angle double right" size='big' color='black' />
                            </Grid.Column>
                            <Grid.Column>
                                <Image
                                    style={{ height: 60, width: 'auto' }}
                                    size='small'
                                    src={this.props.alternative['imageLink']}
                                />
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
                <Card.Content style={{ borderTop: 0, }}>
                    <Card.Header>{capitalize(this.props.alternative['name'])}</Card.Header>
                    <Card.Meta><Trans>alternative</Trans> {capitalize(this.props.product['name'])}</Card.Meta>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    {betterInPercentage}% <Trans>better</Trans>
                </Card.Content>
            </Card>
        );
    }
}

export default AlternativeCard;