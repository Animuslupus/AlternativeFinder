import React from 'react';


import { Container, Header, Loader } from 'semantic-ui-react'
import { Trans } from 'react-i18next';
import i18n from './i18n';

import 'semantic-ui-css/semantic.min.css'


import AlternativeList from "./Components/AlternativeList";
import SearchBar from "./Components/SearchBar";
import AlternativeDetails from "./Components/AlternativeDetails";
import { pushEvent, fetchProducts } from './helper';
import AlternativeCard from './Components/AlternativeCard';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            language: 'en',
            productSelected: null
        };
        window.addEventListener("beforeunload", (e) => {
            pushEvent('UserLeave')
        });

    }


    loadProducts(lng) {
        fetchProducts(lng).then((result) => {
            console.log(result)
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
            language: lng,
            loading: false,
        });
    }


    componentDidMount() {
        pushEvent('UserJoin');

        this.changeLanguage(window.location.pathname.substring(1));
        // this.loadProducts();
    }

    render() {
        if (this.state.loading)
            return (<Loader />)
        else
            return (
                <Container textAlign="center" >
                    <Container fluid style={{ backgroundColor: '#1a531b', paddingTop: '1em', maxHeight: 200, marginBottom: '1em' }}>
                        <Header inverted>
                            <Trans>
                                Welcome
                        </Trans>
                        </Header>
                        <SearchBar
                            products={this.state.products}
                            onProductSelection={(product) => { this.setState({ productSelected: product }) }}
                        />
                    </Container>
                    <AlternativeList products={[this.state.products[24]]} />
                </Container>
            )
    }
}

export default App;
