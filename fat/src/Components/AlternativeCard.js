import React from 'react'
import { Card, Divider, Grid, Image } from 'semantic-ui-react'

class AlternativeCard extends React.Component {
    render() {
        return (
            <Card>
                <Card style={{ marginBottom: '0' }}>
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Image
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Image
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider vertical>OR</Divider>
                    </Card.Content>
                </Card>
                <Card.Content style={{ borderTop: 0, }}>
                    <Card.Header>Tofu</Card.Header>
                    <Card.Meta>alternative to Bacon </Card.Meta>
                    <Card.Description>
                        klkfslsafdlkasdjv aldkflafdj afd
                        dsfklkafdkjl asdfkjafdsdslkaflkdsfdkjlsdfjklfsakafdk
                    </Card.Description>

                </Card.Content>
                <Card.Content extra textAlign="center">
                    x% better
                </Card.Content>
            </Card>
        );
    }
}

export default AlternativeCard;