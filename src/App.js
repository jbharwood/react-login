import React from 'react';
import './App.css';
import { Form, Button } from 'semantic-ui-react'

class App extends React.Component {

	state = {
		username: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	postUser = () => {
		fetch(`http://localhost:3000/api/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors) {
				alert(response.errors)
			} else {
				console.log(response.user.username);
			}
		})
	}

	handleSubmit = () => {
		this.postUser()
	}

	render(){
		return (
			<div className="top" ref={this.topRef}>
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Button type='submit'>Log In</Button>
		  </Form>
			</div>
		)
	}
}

export default App
