import React from 'react';


import {Container} from 'semantic-ui-react'
import { Trans } from 'react-i18next';

import 'semantic-ui-css/semantic.min.css'


import AlternativeList from "./Components/AlternativeList";
import SearchBar from "./Components/SearchBar";
import AlternativeDetails from "./Components/AlternativeDetails";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsSelected: false
        }
    }

    getOverviewOrDetails() {
        if (this.state.detailsSelected) {
            return (
                <AlternativeDetails/>

            )
        } else
            return (
                <Container>
                    <SearchBar/>
                    <AlternativeList/>
                </Container>
            )
    };


    render() {
        return (
            <div>
                <Container textAlign="center" style={{marginTop: '1em', paddingLeft: '10em', paddingRight: '10em'}}
                           fluid>

                    <header>
                        <p>
                            <Trans >
                                Welcome
                            </Trans>
                        </p>
                    </header>
                    <body>

                    {this.getOverviewOrDetails()}


                    </body>


                </Container>
            </div>
        )
    }
}

export default App;
