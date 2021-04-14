import React from 'react';


import {Container, Button} from 'semantic-ui-react'
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
            products: undefined,
            loading: false,
            language: 'en',
            modalIsOpen: false
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
        if ((lng !== 'en') && (lng !== 'de')) {
            console.log("Unknown language parameter: " + lng);
            lng = 'en'
        }

        i18n.changeLanguage(lng).then(
            this.loadProducts(lng)
        );

        this.setState({
            language: lng
        });
    }

    componentDidMount() {
        pushEvent('UserJoin');

        // this.loadProducts();
    }

    render() {
        if (!this.state.products)
            return (
                <Container>
                    LOADING SCREEN
                </Container>
            );
        else
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
                    <Container>
                        <SearchBar
                            products={this.state.products}
                            onProductSelection={(product) => console.log(product)}
                        />
                        <AlternativeList/>
                    </Container>

                    <Button onClick={() => {
                        this.setState({
                            modalIsOpen: true
                        });
                    }}>
                        Open/Close Modal
                    </Button>

                    <AlternativeDetails
                        isOpen={this.state.modalIsOpen}
                        alternative={this.state.products[98].alternatives[0]}
                        product={this.state.products[98]}
                    />


                </Container>
            )
    }
}

export default App;
