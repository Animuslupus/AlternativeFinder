import React from 'react';

import {Container, Grid, Search, Label} from 'semantic-ui-react'

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            results: [],
            value: '',
            products: props.products,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            products: nextProps.products,
            results: nextProps.products[1]
        });
    }

    handleSearchChange = (e, {value}) => {
        this.setState({value: value, loading:true});
        setTimeout(() => {

            const re = new RegExp(this.state.value, 'i');
            const isMatch = (value) => re.test(value['nameGerman']) || re.test(value['categoryGerman']);

            const filteredProducts = this.state.products.filter(isMatch);

            this.setState({
                results: filteredProducts,
                loading:false
            })
        }, 300)

    };

    resultRenderer = (x) => {
        return(
            <Label>{x.nameGerman}</Label>
        )
    };

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Column width={6}>
                        <Search
                            loading={this.state.loading}
                            onResultSelect={(e, data) =>
                            {this.props.onProductSelection(data.result)}
                            }
                            resultRenderer={this.resultRenderer}
                            onSearchChange={this.handleSearchChange}
                            results={this.state.results}
                            value={this.state.value}
                        />
                    </Grid.Column>
                </Grid> </Container>
        )
    }
}

export default SearchBar