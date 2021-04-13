import React from 'react';


import {Container} from 'semantic-ui-react'

import SearchBar from "./Components/SearchBar";

import 'semantic-ui-css/semantic.min.css'

import AlternativeList from "./Components/AlternativeList";
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
                <div>
                    Details
                <AlternativeDetails/>
                </div>
            )
        } else
            return (
                <div>
                    List
                    <SearchBar/>
                    <AlternativeList/>
                </div>
            )
    };


    render() {
        return (
            <div>
                <Container textAlign="center" style={{marginTop: '1em', paddingLeft: '10em', paddingRight: '10em'}}
                           fluid>

                    <header>
                        <p>
                            Some BlaBla as introduction. Multilanguage.
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
