import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchEmailById } from '../../redux/email/asyncActions'
import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'

const EmailContainer = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    width: '70%',
    border: '1px solid #ddd',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))

const Header = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}))

const GoBackButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
}))

const EmailDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { selectedEmail, selectedEmailStatus } = useSelector((state) => state.email)

    console.log(selectedEmail)

    useEffect(() => {
        dispatch(fetchEmailById(id))
    }, [dispatch, id])

    if (selectedEmailStatus === 'loading' || selectedEmailStatus === 'idle') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <EmailContainer>
            <Header variant="h4" gutterBottom>
                {selectedEmail.subject}
            </Header>
            <Typography variant="subtitle1" gutterBottom>
                From: {selectedEmail.sender}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Message:
            </Typography>
            <Box
                sx={{
                    border: '1px solid #ccc',
                    padding: '1em',
                    borderRadius: '4px',
                    overflow: 'auto',
                    width: '500px',
                    maxWidth: '100%',
                    maxHeight: '200px',
                    marginBottom: '1em',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.message || '' }}
                />
            </Box>
            <GoBackButton variant="contained" color="primary" onClick={() => navigate(-1)}>
                Go Back
            </GoBackButton>
        </EmailContainer>
    )
}

export default EmailDetails
