import React from 'react';
import { Grid } from 'semantic-ui-react';
import AlternativeCard from './AlternativeCard';


class AlternativeList extends React.Component {

    // this.props.products

    render_alternative(product) {
        console.log(this.props.products)
        return product['alternatives'].map(alt => <Grid.Column key={alt['id']}><AlternativeCard product={product} alternative={alt} /></Grid.Column>)
    }

    render() {
        if (this.props.products && this.props.products.length > 0 && this.props.products[0])
            return (
                <Grid doubling stackable columns={4}>
                    {this.props.products.map(p => this.render_alternative(p))}
                </Grid>
            )
        else
            return <></>
    }
}

export default AlternativeList