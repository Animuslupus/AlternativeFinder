import React from 'react';
import { Card, Grid, Loader, Segment, Container, Image, Search, Header, List } from "semantic-ui-react";
import uiConfig from './config';

class GridProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            //searchLoading: false,
            searchQuery: '',
            //searchResults: [],
            productsFiltered: [],
            products: [],
            selectedProduct: -1,
        };
    }

    queryData = () => {
        const ip = uiConfig.isDev ? uiConfig.devApiIp : uiConfig.productionApiIp;
        fetch(ip + "/products")
            .then(response => response.json())
            .then(
                // handle the result
                (result) => {
                    this.setState({
                        isLoaded: true,
                        products: result,
                        productsFiltered: this.state.searchQuery ? this.state.productsFiltered : result,
                    });
                },

                // Handle error 
                (error) => {
                    console.log(error)
                },
            )

    }

    componentDidMount() {
        setInterval(this.queryData, 2000)
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ searchQuery: value })
        setTimeout(() => {
            if (this.state.searchQuery.length < 1) return this.setState({ productsFiltered: this.state.products })

            const re = new RegExp(this.state.searchQuery, 'i')
            const isMatch = (value) => re.test(value['name' + this.props.productLanguage]) || re.test(value['category' + this.props.productLanguage])

            const filteredProducts = this.state.products.filter(isMatch)
            this.setState({
                productsFiltered: filteredProducts,
            })
        }, 300)
    }

    onCardClick = (product) => {
        this.props.callback(product)
        this.setState({ selectedProduct: product['id'] })
    }

    render() {
        const { error, isLoaded, searchQuery, productsFiltered } = this.state;
        if (error) {
            return <Segment>{error}</Segment>
        } else if (!isLoaded) {
            return <Container textAlign="center"><Loader>Loading</Loader></Container>
        } else {
            return (
                <Container>
                    <Header>{this.props.heading}</Header>
                    
                    <Search
                        style={{ marginBottom: '1em' }}
                        showNoResults={false}
                        resultRenderer={() => {}}
                        /*onResultSelect={(e, data) =>
                            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                        }*/
                        //loading={searchLoading}
                        onSearchChange={this.handleSearchChange}
                        //results={searchResults}
                        value={searchQuery}
                    />
                    <Grid columns={3} stackable>
                        {
                            productsFiltered.map(product => (
                                <Grid.Column key={product['id']}>
                                    <Card
                                        onClick={() => { this.onCardClick(product) }}
                                        color={this.state.selectedProduct === product['id'] ? "green" : "grey"}
                                    >
                                        <Image src={product['imageLink']} style={{ maxHeight: '150px' }} centered />
                                        <Card.Content>
                                            <Card.Description style={{ fontWeight: 'bold' }}>{product['name' + this.props.productLanguage]}</Card.Description>
                                            <Card.Meta>Category: {product['category' + this.props.productLanguage]}</Card.Meta>
                                            <Card.Description>Emissions: {product['emissions']}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <List>
                                                {product['alternatives'].map(product => (
                                                    <List.Item key={product['id']}>{product['name' + this.props.productLanguage]}</List.Item>
                                                ))}
                                            </List>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            ))
                        }
                    </Grid>
                </Container>
            );
        }
    }
}

export default GridProductView