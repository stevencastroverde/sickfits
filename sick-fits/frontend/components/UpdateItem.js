import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import FormatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            price
            description
        }
    }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
                id: $id
                title: $title
                description: $description
                price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;


class UpdateItem extends Component {
    state = {};
    updateItemHandler = async (e, mutation) => {
        e.preventDefault();
        const response = await mutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        })
        console.log(response)
        
    }
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) * 100 : value;
		this.setState({ [name]: val })
	};
	render() {
		return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, loading}) => {
                    if (loading) return <p>Loading...</p>
                    if (!data.item) return <p>No Item Found for ID {this.props.id}</p>
                    return (
                        
			<Mutation mutation={UPDATE_ITEM_MUTATION}>
				{(updateItem, { loading, error }) => (
					<Form onSubmit={e => this.updateItemHandler(e, updateItem)}>
					<Error error={error} /> 
						<fieldset disabled={loading} aria-busy={loading}>
							{this.state.image && <img src={this.state.image} width="200" alt="upload preview" />}
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									defaultValue={data.item.title}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="price">
								Price
								<input
									type="number"
									id="price"
									name="price"
									placeholder="Price"
									required
									defaultValue={data.item.price}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="description">
								Description
								<textarea
									id="description"
									name="description"
									placeholder="Enter a description"
									required
									defaultValue={data.item.description}
									onChange={this.handleChange}
								/>
							</label>
							<button
								type="submit"
							>
								Save Changes
                </button>
						</fieldset>
					</Form>
				)}
			</Mutation>
            )
        }}
    </Query>
		)
	}
}
export default UpdateItem;
export { UPDATE_ITEM_MUTATION };