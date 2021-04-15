import React from 'react';
import { Grid } from 'semantic-ui-react';
import AlternativeCard from './AlternativeCard';


class AlternativeList extends React.Component {

    // this.props.products

    renderAlternative(product, alt) {
        return <Grid.Column key={alt['id'].toString() + product['id'].toString()}><AlternativeCard onClick={this.props.callback} product={product} alternative={alt} /></Grid.Column>
    }

    getAlternatives(product) {
        if (this.props.shallow)
            return this.renderAlternative(product, product['alternatives'][0]) 
        else
            return product['alternatives'].map(alt =>this.renderAlternative(product, alt)) 
    }

render() {
    if (this.props.products && this.props.products.length > 0 && this.props.products[0])
        return (
            <Grid stackable doubling columns={4} style={{paddingLeft:'5%', paddingRight:'5%', paddingTop:'5%', paddingBottom: '2%'}}>
                {this.props.products.map(p => this.getAlternatives(p))}
            </Grid>
        )
    else
        return <></>
}
}

AlternativeList.defaultProps = {
    shallow: false
}

export default AlternativeList