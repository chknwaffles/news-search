import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Form(props) {
    const [fields, setFields] = useState({email: '', password: '', passwordConfirmation: ''})

    const handleChange = (event) => setFields({...fields, [event.target.name]: event.target.value})

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.signup) {
            if(fields.password !== fields.passwordConfirmation) {
                alert("Incorrect Passwords")
                return
            }
        }
        const URL = (props.signup) ? 'users' : 'login'
        fetch(`http://localhost:3000/${URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(fields)
        })
        .then(response => response.json())
        .then(data => {
          if (data.errors) {
            alert(data.errors)
          } else {
            localStorage.setItem("token", data.token)
            props.setCurrentUser(data.user)
            props.history.push('/profile')
          }
        }) 
    }

    return (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {props.signup ? 'Sign up' : 'Login'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={fields.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={fields.password}
              onChange={handleChange}
            />

            { props.signup ? 
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirmation"
                    label="Confirm Password"
                    type="password"
                    value={fields.passwordConfirmation}
                    onChange={handleChange}
                />
                :
                ""
            }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {props.signup ? 'Sign up' : 'Login'}
            </Button>
          </form>
        </Container>
    )
}