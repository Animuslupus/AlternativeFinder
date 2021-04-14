import React from 'react'
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
                                    size='small'
                                    src={this.props.product['imageLink']}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Icon name="angle double right" size='big' color='black' />
                            </Grid.Column>
                            <Grid.Column>
                                <Image
                                    size='small'
                                    src={this.props.alternative['imageLink']}
                                />
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
                <Card.Content style={{ borderTop: 0, }}>
                    <Card.Header>{capitalize(this.props.alternative['name'])}</Card.Header>
                    <Card.Meta>alternative to {capitalize(this.props.product['name'])}</Card.Meta>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    {betterInPercentage}% better
                </Card.Content>
            </Card>
        );
    }
}

export default AlternativeCard;