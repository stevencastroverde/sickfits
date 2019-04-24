import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATTION = gql`
    mutation SIGNUP_MUTATTION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;
export default class Signup extends Component {
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
        <Mutation mutation={SIGNUP_MUTATTION} variables={this.state}>
            {(signup, { error, loading }) => (
                <Form method="post" onSubmit={async event => {
                    event.preventDefault()
                    const res = await signup()
                    console.log(res)
                    this.setState({
                        email: '',
                        name: '',
                        password: ''
                    })
                }}>
                    <fieldset fieldset={loading.toString()} aria-busy={loading.toString()}>
                    <h2>Sign Up for an Account</h2>
                    <Error error={error} />
                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}></input>
                    </label>
                    <label htmlFor="name">
                        Name
                        <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.saveToState}></input>
                    </label>    
                    <label htmlFor="password">
                        Password
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}></input>
                    </label>
                    <button type="submit">Sign Up!</button>
                    </fieldset>
                </Form>
            )}
        </Mutation>
    )
  }
}
