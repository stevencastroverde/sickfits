import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;
export default class SignIn extends Component {
    state = {
        email: '',
        name: '',
        password: '',
    }
    saveToState = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
  render() {
    return (
        <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
            {(signin, { error, loading }) => (
                <Form method="post" onSubmit={async event => {
                    event.preventDefault()
                    const res = await signin()
                    console.log(res)
                    this.setState({
                        email: '',
                        name: '',
                        password: ''
                    })
                }}>
                    <fieldset fieldset={loading.toString()} aria-busy={loading.toString()}>
                    <h2>Sign Into Account</h2>
                    <Error error={error} />
                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}></input>
                    </label>    
                    <label htmlFor="password">
                        Password
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}></input>
                    </label>
                    <button type="submit">Sign In!</button>
                    </fieldset>
                </Form>
            )}
        </Mutation>
    )
  }
}
