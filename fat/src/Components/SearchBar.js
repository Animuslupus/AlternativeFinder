import React from 'react';
import '../index.css';


import {Container, Image, Search, Label} from 'semantic-ui-react'

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
        });
    }

    handleSearchChange = (e, {value}) => {
        this.setState({value: value, loading: true});
        setTimeout(() => {

            const re = new RegExp(this.state.value, 'i');
            const isMatch = (value) => re.test(value['nameGerman']) || re.test(value['categoryGerman']);

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
                    {x.nameGerman}
                    <img src={x.imageLink}/>
                </Label>
            </div>

        )
    };

    render() {
        return (
            <Container style={{backgroundColor: '#1a531b', margin: '2em', padding: '2em'}}>

                <Search
                    loading={this.state.loading}
                    onResultSelect={(e, data) => {
                        this.setState({
                            value:data.result.nameGerman
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