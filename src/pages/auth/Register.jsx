import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/asyncActions'
import { TextField, Button, Alert, Box, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { validateRegister } from '../../utils/validateRegister'

const Register = () => {
    const [username, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({ login: '', password: '', email: '' })
    const [registerError, setRegisterError] = useState(null)
    const [submitAttempted, setSubmitAttempted] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (validateRegister(setError, username, email, password)) {
            try {
                const actionResult = await dispatch(register({ username, password, email }))
                if (register.fulfilled.match(actionResult)) {
                    navigate('/emails')
                } else {
                    if (actionResult.payload && actionResult.payload.username) {
                        setRegisterError(actionResult.payload.username[0])
                    }
                }
            } catch (err) {
                setError((prev) => ({ ...prev, error: err.message }))
            }
        } else {
            setSubmitAttempted(true)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box sx={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <Typography variant="h4" component="h1" mb={4}>
                    SIGN UP
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Login"
                        value={username}
                        onChange={(e) => setLogin(e.target.value)}
                        error={!!error.login}
                        helperText={error.login}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error.email}
                        helperText={error.email}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        error={!!error.password}
                        helperText={error.password}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        Have an account?
                    </Button>
                    {submitAttempted && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            Please correct the above errors before submitting.
                        </Alert>
                    )}
                    {registerError && !submitAttempted && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {registerError}
                        </Alert>
                    )}
                </form>
            </Box>
        </Box>
    )
}

export default Register
