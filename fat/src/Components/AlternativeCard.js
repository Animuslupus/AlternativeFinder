import React from 'react'
import { Card, Divider, Grid, Icon, Image } from 'semantic-ui-react'

class AlternativeCard extends React.Component {

    //this.props.product
    //this.props.alternative

    //TODO: fix percentages
    //TODO: fix dividers
    //TODO: fix language

    render() {
        const betterInPercentage = Math.round(((this.props.alternative['emissions'] - this.props.product['emissions']) / this.props.product['emissions']) * 100)
        return (
            <Card>
                <Card style={{ marginBottom: '0' }}>
                    <Card.Content>
                        <Grid columns={3} verticalAlign='middle'>
                            <Grid.Column>
                                <Image
                                    size='mini'
                                    src={this.props.product['imageLink']}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="arrow right" />
                            </Grid.Column>
                            <Grid.Column>
                                <Image
                                    size='mini'
                                    src={this.props.alternative['imageLink']}
                                />
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
                <Card.Content style={{ borderTop: 0, }}>
                    <Card.Header>{this.props.alternative['name']}</Card.Header>
                    <Card.Meta>alternative to {this.props.product['name']}</Card.Meta>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    {betterInPercentage}% better
                </Card.Content>
            </Card>
        );
    }
}

export default AlternativeCard;