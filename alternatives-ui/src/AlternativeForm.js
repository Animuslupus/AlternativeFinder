import React from 'react'
import { Form, Message, TextArea } from 'semantic-ui-react'
import uiConfig from './config';

const rankings = [
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5', value: 5 },
    { key: '6', text: '6', value: 6 },
    { key: '7', text: '7', value: 7 },
    { key: '8', text: '8', value: 8 },
    { key: '9', text: '9', value: 9 },
    { key: '10', text: '10', value: 10 },
]

class AlternativeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionDE: '',
            descriptionEN: '',
            ranking: 1,
            submitted: false,
            submissionError: false,
            statusMessage: '',
        };
    }

    handleFormChange = (e, { name, value }) => { this.setState({ [name]: value }) }

    handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: this.props.product['id'],
                alternativeId: this.props.alternative['id'],
                descriptionGerman: this.state.descriptionDE,
                descriptionEnglish: this.state.descriptionEN,
                ranking: this.state.ranking
            })
        };
        const ip = uiConfig.isDev ? uiConfig.devApiIp : uiConfig.productionApiIp;
        fetch(ip + '/alternative', requestOptions).then((r) => {
            if (r.status !== 200) {
                r.json().then(
                    (value) => {
                        this.setState({ submitted: true, submissionError: true, statusMessage: value['message'] })
                        setTimeout(() => { this.setState({ submitted: false }) }, 10000)
                    }
                )
            } else {
                this.setState({ submitted: true, submissionError: false, statusMessage: 'Your Product-Alternative pair was added to the database' })
                setTimeout(() => { this.setState({ submitted: false }) }, 5000)
                this.props.callback()
            }
        })

    }

    getDisplayMessage(selectDuplicate, entryDuplicate) {
        if (selectDuplicate)
            return "You selected the same Product as its alternative - please choose a different product or alternative."
        else if (entryDuplicate)
            return "The selected alternative is already listed as alternative for the selected product."
        else
            return this.state.statusMessage
    }

    render() {

        const productsDefined = this.props.product && this.props.alternative
        var emissionsSaved = productsDefined ? this.props.product['emissions'] - this.props.alternative['emissions'] : 0;
        emissionsSaved = Math.round(emissionsSaved * 100) / 100
        const selectDuplicate = productsDefined ? this.props.product['id'] === this.props.alternative['id'] : false

        const entryDuplicate = productsDefined ? this.props.alternative['id'] in this.props.product['alternatives'].map(a => a['id']) : false

        return (
            <Form widths="equal" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input label="Selected Product" readOnly
                        value={this.props.product ? this.props.product['nameGerman'] : 'No Product Selected'} />
                    <Form.Input label="Selected Alternative" readOnly
                        value={this.props.alternative ? this.props.alternative['nameGerman'] : 'No Alternative Selected'} />
                </Form.Group>
                <Form.Group>
                    <Form.Field control={TextArea} label="Description German" name="descriptionDE" value={this.state.descriptionDE} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Field control={TextArea} label="Description English" name="descriptionEN" value={this.state.descriptionEN} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group >
                    <Form.Input label="Emission Saved" readOnly placeholder='None'
                        error={emissionsSaved < 0} value={emissionsSaved} />
                    <Form.Select
                        label='Ranking'
                        name="ranking"
                        value={this.state.ranking}
                        onChange={this.handleFormChange}
                        options={rankings}
                        placeholder='Ranking'
                    />
                </Form.Group>
                <Message
                    visible={selectDuplicate || this.state.submitted || entryDuplicate}
                    success={!selectDuplicate && !this.state.submissionError && !entryDuplicate}
                    error={selectDuplicate || this.state.submissionError || entryDuplicate}
                    header={selectDuplicate || entryDuplicate ? "Duplication" : this.state.submissionError ? "Submission Error" : "Submission Successful"}
                    content={this.getDisplayMessage(selectDuplicate, entryDuplicate)}
                />
                <Form.Button content='Submit' disabled={selectDuplicate || !productsDefined} />
            </Form>
        );
    }
}

export default AlternativeForm;