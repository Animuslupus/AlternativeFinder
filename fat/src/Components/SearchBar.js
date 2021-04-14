import React from 'react';
import '../index.css';

import { Container, Image, Search, Label } from 'semantic-ui-react'
import { pushEvent } from '../helper';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            value: '',
            loading: false,
            products: props.products,
        };
        this.tmpMaxSearchLength = 0;
        this.searchSuccessful = false
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            products: nextProps.products,
            loading: false,
        });
    }

    handleSearchChange = (e, { value }) => {
        if (value.length == this.tmpMaxSearchLength - 1 && !this.searchSuccessful)
            pushEvent('FailedSearch', {
                searchQuery: value
            });
        else if (value.length > this.tmpMaxSearchLength)
            this.tmpMaxSearchLength = value.length
        else if (value.length == 0){
            this.tmpMaxSearchLength = 0
            this.searchSuccessful = false
        }

        this.setState({ value: value, loading: true });
        setTimeout(() => {

            const re = new RegExp(this.state.value, 'i');
            const isMatch = (value) => re.test(value['name']) || re.test(value['category']);

            const filteredProducts = this.state.products.filter(isMatch);

            this.setState({
                results: filteredProducts,
                loading: false
            })
        }, 300)

    };

    resultRenderer = (x) => {
        return (
            <div>
                <Label>
                    {x.name}
                    <img src={x.imageLink} />
                </Label>
            </div>

        )
    };

    render() {
        return (
            <Container style={{ margin: '2em', padding: '2em' }}>

                <Search
                    loading={this.state.loading}
                    onResultSelect={(e, data) => {
                        this.searchSuccessful = true
                        this.setState({
                            value: data.result.name
                        });
                        this.props.onProductSelection(data.result)
                    }
                    }
                    resultRenderer={this.resultRenderer}
                    onSearchChange={this.handleSearchChange}
                    results={this.state.results}
                    value={this.state.value}
                />

            </Container>
        )
    }
}

export default SearchBar