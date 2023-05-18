import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEmails } from '../../redux/email/asyncActions'
import { logout } from '../../redux/auth/authSlice'
import EmailForm from '../../components/email/EmailForm'
import EmailList from '../../components/email/EmailList'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
} from '@mui/material'

const Email = () => {
    const userInfo = JSON.parse(localStorage.getItem('user')) || {}
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchEmails('/emails/?limit=5&offset=0'))
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
        navigate('/login')
    }

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Emails
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ my: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Current User:</Typography>
                        <Typography variant="body1">Id: {userInfo.id}</Typography>
                        <Typography variant="body1">Name: {userInfo.username}</Typography>
                        <Typography variant="body1">Email: {userInfo.email}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ my: 3 }}>
                <EmailForm />
            </Box>
            <Box sx={{ my: 3 }}>
                <EmailList />
            </Box>
        </Container>
    )
}

export default Email
