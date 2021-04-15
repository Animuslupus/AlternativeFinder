import React from 'react';


import {Container, Header, Loader} from 'semantic-ui-react'
import {Trans} from 'react-i18next';
import i18n from './i18n';

import 'semantic-ui-css/semantic.min.css'


import AlternativeList from "./Components/AlternativeList";
import SearchBar from "./Components/SearchBar";
import AlternativeDetails from "./Components/AlternativeDetails";
import {pushEvent, fetchProducts, shuffle} from './helper';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            productSelectedDetails: null,
            productSelectedList:null,
            alternativeSelected: null,
            language: 'en',
            modalIsOpen: false
        };
        window.addEventListener("beforeunload", (e) => {
            pushEvent('UserLeave')
        });

    }


    loadProducts(lng) {
        fetchProducts(lng).then((result) => {
            this.setState({
                products: result,
                loading: false,
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

        pushEvent('UserJoin', {language: lng});
        this.setState({
            language: lng,
        });
    }

    componentDidMount() {
        this.changeLanguage(window.location.pathname.substring(1));
        // this.loadProducts();
    }

    onCardClick = (product, alternative) => {
        pushEvent('ViewDetails', {
            productName: product['name'], productId: product['id'],
            alternativeName: alternative['name'], alternativeId: alternative['id'],
            wasRecommended: !this.state.productSelectedList
        });
        this.setState({
            modalIsOpen: true,
            productSelectedDetails: product,
            alternativeSelected: alternative
        })
    };

    onModalClose = () => {
        pushEvent('CloseDetails', {
            productName: this.state.productSelectedDetails['name'],
            productId: this.state.productSelectedDetails['id'],
            alternativeName: this.state.alternativeSelected['name'],
            alternativeId: this.state.alternativeSelected['id'],
        });
        this.setState({modalIsOpen: false})
    };

    randomProducts() {
        if (!this.state.products)
            return null;
        else {
            var indexArray = [...Array(this.state.products.length).keys()];
            indexArray = shuffle(indexArray);
            var randomArray = [];
            for (var i = 0; i < 8; i++) {
                randomArray.push(this.state.products[indexArray[i]])
            }
            return randomArray
        }
    }

    selectProduct = (product) => {
        if (product) {
            pushEvent('searchedProductSelected', {
                productName: product['name'], productId: product['id'],
            });
            this.setState({productSelectedList: product})
        }
        else{
            this.setState({productSelectedList: null})
        }
    };

    render() {
        if (this.state.loading)
            return (<Loader/>);
        else {
            return (
                <Container textAlign="center">
                    <Container fluid style={{
                        backgroundColor: '#1a531b',
                        paddingTop: '1em',
                        height: 200,
                        marginBottom: '1em'
                    }}>
                        <Header inverted>
                            <Trans>Welcome</Trans>
                        </Header>
                        <SearchBar
                            products={this.state.products}
                            onProductSelection={this.selectProduct}
                        />
                    </Container>
                    <AlternativeList
                        shallow={!this.state.productSelectedList}
                        products={this.state.productSelectedList ? [this.state.productSelectedList] : this.randomProducts()}
                        callback={this.onCardClick}/>

                    <AlternativeDetails
                        onClose={this.onModalClose}
                        isOpen={this.state.modalIsOpen}
                        alternative={this.state.alternativeSelected}
                        product={this.state.productSelectedDetails}
                    />

                </Container>
            )
        }
    }
}

export default App;
