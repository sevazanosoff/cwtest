import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmails, deleteEmail } from '../../redux/email/asyncActions'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    TableContainer,
    Paper,
    Alert,
    IconButton,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const EmailList = () => {
    const { emails, status, error, limit, page } = useSelector((state) => state.email)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmails(`/emails/?limit=${limit}&offset=${(page - 1) * limit}`))
    }, [page, limit, dispatch])

    const handleDelete = (emailId) => {
        dispatch(deleteEmail(emailId)).then(() => {
            dispatch(fetchEmails(`/emails/?limit=${limit}&offset=${(page - 1) * limit}`))
        })
    }

    console.log(emails)

    if (status === 'loading') {
        return <CircularProgress />
    }

    if (status === 'failed') {
        return <Alert severity="error">{error}</Alert>
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Recipient</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.map((email) => (
                            <TableRow key={email.id}>
                                <TableCell>{email.id}</TableCell>
                                <TableCell>{email.recipient}</TableCell>
                                <TableCell>{email.subject}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="View"
                                        color="primary"
                                        component={Link}
                                        to={`/emails/${email.id}`}
                                    >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        color="secondary"
                                        onClick={() => handleDelete(email.id)}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EmailList
