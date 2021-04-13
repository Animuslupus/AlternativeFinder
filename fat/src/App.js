import React from 'react';


import { Container } from 'semantic-ui-react'
import { Trans } from 'react-i18next';
import i18n from './i18n';

import 'semantic-ui-css/semantic.min.css'


import AlternativeList from "./Components/AlternativeList";
import SearchBar from "./Components/SearchBar";
import AlternativeDetails from "./Components/AlternativeDetails";
import { pushEvent, fetchProducts } from './helper';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsSelected: false,
            products: [],
            loading: false,
        };
        window.addEventListener("beforeunload", (e) => {
            pushEvent('UserLeave')
        })
    }



    loadProducts() {
        fetchProducts().then((result) => {
            var prodList = [];
            for (var x in result) {

                var y = {
                    ...result[x],
                    title: result[x].nameGerman
                }
                prodList.push(y)
            }

            this.setState({
                products: prodList
            });

            console.log(prodList)
        })
    }

    //change lng of internatinalization package
    //'en' or 'de' are the implemented languages
    changeLanguage(lng) {
        i18n.changeLanguage(lng);
    }

    getOverviewOrDetails() {
        if (this.state.detailsSelected) {
            return (
                <AlternativeDetails />

            )
        } else
            return (
                <Container>
                    <SearchBar
                        products={this.state.products}
                    />
                    <AlternativeList />
                </Container >
            )
    };

    componentDidMount() {
        pushEvent('UserJoin');

        this.loadProducts();
    }

    render() {
        return (
            <Container textAlign="center" style={{ marginTop: '1em', paddingLeft: '10em', paddingRight: '10em' }}
                fluid>

                <header>
                    <p>
                        <Trans >
                            Welcome
                            </Trans>
                    </p>
                </header>

                {this.getOverviewOrDetails()}




            </Container>
        )
    }
}

export default App;
