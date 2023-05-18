import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/asyncActions'
import { TextField, Button, Alert, Box, Grid, Typography, CircularProgress } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!username || !password) {
            setLoginError('All fields is required!')
            return
        }
        setIsLoading(true)
        const actionResult = await dispatch(login({ username, password }))
        setIsLoading(false)

        if (login.fulfilled.match(actionResult)) {
            navigate('/emails')
        } else {
            if (actionResult.payload) {
                setLoginError(actionResult.payload.message)
            } else {
                setLoginError('Auth error.')
            }
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
            <Grid container spacing={2} maxWidth="400px">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" align="center" mb={4}>
                        SIGN IN
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            aria-label="Username"
                        />
                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            aria-label="Password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                            sx={{ mt: 2 }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Don&apos;t have an account?
                        </Button>
                        {loginError && (
                            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                                {loginError}
                            </Alert>
                        )}
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Auth
