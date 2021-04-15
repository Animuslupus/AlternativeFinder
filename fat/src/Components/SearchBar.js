import React from 'react';
import '../index.css';

import { Container, Search, Label } from 'semantic-ui-react'
import { pushEvent } from '../helper';
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

const searchIcon={
    icon: 'search'
};

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            value: '',
            loading: false,
            products: props.products,
            icon: searchIcon,
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
        if (value.length === this.tmpMaxSearchLength - 1 && !this.searchSuccessful)
            pushEvent('FailedSearch', {
                searchQuery: value
            });
        else if (value.length > this.tmpMaxSearchLength)
            this.tmpMaxSearchLength = value.length;
        else if (value.length === 0){
            this.tmpMaxSearchLength = 0;
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

    closeIcon ={
        icon: (
          <Icon name='close'
                onClick={ ()=>{
                    this.searchSuccessful = false;
                    this.setState({
                        value: '',
                        icon: searchIcon,
                    });
                    this.props.onProductSelection(undefined)
                }}
                link
          />

        )
    };

    render() {
        return (
            <Container style={{ margin: '2em', padding: '2em' }}>

                <Search
                    loading={this.state.loading}
                    onResultSelect={(e, data) => {
                        this.searchSuccessful = true;
                        this.setState({
                            value: data.result.name,
                            icon: this.closeIcon,
                        });
                        this.props.onProductSelection(data.result)
                    }
                    }
                    resultRenderer={this.resultRenderer}
                    onSearchChange={this.handleSearchChange}
                    results={this.state.results}
                    value={this.state.value}
                    input={this.state.icon}
                />

            </Container>
        )
    }
}

export default SearchBar