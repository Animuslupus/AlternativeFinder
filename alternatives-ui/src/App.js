import React from 'react';
import { Container, Grid, Header, Sticky, Checkbox, Ref } from 'semantic-ui-react'
import AlternativeForm from './AlternativeForm';
import GridProductView from './GridProductView';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      alternative: null,
      rank: 0,
      language: 'English'
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

  clearSelection = () => {
  }

  contextRef = React.createRef()

  handleLanguageSwitch = (e,d)=>{
    if (d['checked'])
      this.setState({language:'German'})
    else
      this.setState({language:'English'})
  }

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: '1em', paddingLeft: '10em', paddingRight: '10em' }} fluid>
        <Header as="h1" >Find Alternative To - Alternative Form</Header>
        <p style={{ marginBottom: '20px' }}>Tipp: You can use the search-bar to search for product-categories</p>
        <Checkbox style={{ marginBottom: '2em' }} toggle onChange={this.handleLanguageSwitch} label="Make Form German"/>
        <Ref innerRef={this.contextRef}>
          <Grid columns={3}>
            <Grid.Column style={{ borderRight: "1px solid rgb(212, 212, 212)" }}>
              <GridProductView callback={(product) => this.selectProduct(product)} heading="Product" productLanguage={this.state.language}/>
            </Grid.Column>
            <Grid.Column style={{ borderRight: "1px solid rgb(212, 212, 212)" }}>
              <GridProductView callback={(product) => this.selectAlternative(product)} heading="Alternative" productLanguage={this.state.language}/>
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
