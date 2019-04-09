import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import FormatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 0,
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val })
	};
	 uploadFile =  async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sickfits');
		const response = await fetch('https://api.cloudinary.com/v1_1/dsajrhrbc/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await response.json();
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		})
	}
	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form onSubmit={async e => {
						e.preventDefault();
						//wait for id
						const response = await createItem();
						//route them to item page by id
						Router.push({
							pathname: '/item',
							query: {
								id: response.data.createItem.id
							}
						})
				
					}}>
					<Error error={error} /> 
						<fieldset disabled={loading} aria-busy={loading}>
						<label htmlFor="file">
								File
								<input
									type="file"
									id="file"
									name="file"
									required
									// value={this.state.image}
									onChange={this.uploadFile}
								/>
							</label>
							{this.state.image && <img src={this.state.image} width="200" alt="upload preview" />}
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									value={this.state.title}
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
									value={this.state.price}
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
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
							<button
								type="submit"
							>
								Submit
                </button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		)
	}
}
export default CreateItem;
export { CREATE_ITEM_MUTATION };