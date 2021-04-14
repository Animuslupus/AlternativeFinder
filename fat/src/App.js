import React from 'react';


import {Container} from 'semantic-ui-react'
import {Trans} from 'react-i18next';
import i18n from './i18n';

import 'semantic-ui-css/semantic.min.css'


import AlternativeList from "./Components/AlternativeList";
import SearchBar from "./Components/SearchBar";
import AlternativeDetails from "./Components/AlternativeDetails";
import {pushEvent, fetchProducts} from './helper';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: false,
            language: 'en'
        };
        window.addEventListener("beforeunload", (e) => {
            pushEvent('UserLeave')
        });

        this.changeLanguage(window.location.pathname.substring(1));
    }


    loadProducts(lng) {
        fetchProducts(lng).then((result) => {
            this.setState({
                products: result
            });
        })
    }

    //change lng of internatinalization package
    //'en' or 'de' are the implemented languages
    changeLanguage(lng) {
        if((lng !== 'en') && (lng !== 'de')){
            console.log("Unknown language parameter: "+lng);
            lng='en'
        }

        i18n.changeLanguage(lng).then(
            this.loadProducts(lng)
        );

        this.setState({
            language: lng
        });
    }

    getOverviewOrDetails() {
        if (this.state.detailsSelected) {
            return (
                <AlternativeDetails/>

            )
        } else
            return (
                <Container>
                    <SearchBar
                        products={this.state.products}
                        onProductSelection={(product)=> console.log(product)}
                    />
                    <AlternativeList/>
                </Container>
            )
    };

    componentDidMount() {
        pushEvent('UserJoin');

        // this.loadProducts();
    }

    render() {
        return (
            <Container textAlign="center" style={{marginTop: '1em', paddingLeft: '10em', paddingRight: '10em'}}
                       fluid>

                <header>
                    <p>
                        <Trans>
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
