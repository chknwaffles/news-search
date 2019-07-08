import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log('Logging In', this.state)
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      }else {
        console.log(data)
        localStorage.setItem("token", data.token)
        this.props.setCurrentUser(data.user)
        this.props.history.push(`/users/${data.user.id}`)
      }
    }) 
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </Container>
    )
  }

}

export default LoginForm
