import React from 'react';
import { Container, Grid, Header, GridColumn, Divider, Form, TextArea, Message, Button, Sticky, creat, Rail, Ref } from 'semantic-ui-react'
import AlternativeForm from './AlternativeForm';
import GridProductView from './GridProductView';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      alternative: null,
      rank: 0,

    };
  }

  selectProduct(product) {
    this.setState({
      product: product,
    })
  }

  selectAlternative(alternative) {
    this.setState({
      alternative: alternative,
    })
  }

  handleFormChange(e, value) {
    console.log(value)
  }

  clearSelection = () => {
  }

  contextRef = React.createRef()

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: '1em', paddingLeft: '10em', paddingRight: '10em' }} fluid>
        <Header as="h1" >Find Alternative To - Alternative Form</Header>
        <p style={{ marginBottom: '2em' }}>Tipp: You can use the search-bar to search for product-categories</p>
        <Ref innerRef={this.contextRef}>
          <Grid columns={3}>
            <Grid.Column style={{ borderRight: "1px solid rgb(212, 212, 212)" }}>
              <GridProductView callback={(product) => this.selectProduct(product)} heading="Product" />
            </Grid.Column>
            <Grid.Column style={{ borderRight: "1px solid rgb(212, 212, 212)" }}>
              <GridProductView callback={(product) => this.selectAlternative(product)} heading="Alternative" />
            </Grid.Column>
            <Grid.Column>
              <Sticky context={this.contextRef} >
                <Header>Form</Header>
                <AlternativeForm product={this.state.product} alternative={this.state.alternative} callback={this.clearSelection} />
              </Sticky>
            </Grid.Column>
          </Grid>
        </Ref>
      </Container>
    );
  }
}

export default App;
