import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmails, sendEmail } from '../../redux/email/asyncActions'
import { setPage } from '../../redux/email/emailSlice'
import { validateForm } from '../../utils/validateForm'
import {
    TextField,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Pagination,
} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EmailForm = () => {
    const [body, setBody] = useState('')
    const [recipient, setRecipient] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ recipient: '', title: '', body: '' })
    const { count, limit, page } = useSelector((state) => state.email)
    const sender = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        if (validateForm(setError, recipient, title, body)) {
            dispatch(
                sendEmail({ sender: sender?.id, recipient, subject: title, message: body }),
            ).then(() => {
                setRecipient('')
                setTitle('')
                setBody('')
                setOpen(false)
                dispatch(fetchEmails(`/emails/?limit=${limit}&offset=${(page - 1) * limit}`))
            })
        }
    }

    const handlePageChange = (event, value) => {
        dispatch(setPage(value))
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Send Email
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>Send Email</DialogTitle>
                <DialogContent style={{ height: '50vh' }}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <TextField label="Sender" value={sender?.email} disabled fullWidth />
                        <TextField
                            label="Recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            helperText={error.recipient}
                            error={!!error.recipient}
                            fullWidth
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            helperText={error.title}
                            error={!!error.title}
                            fullWidth
                        />
                        <ReactQuill value={body} onChange={setBody} style={{ height: '150px' }} />
                        {error.body && <div style={{ color: 'red' }}>{error.body}</div>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Send Email
                    </Button>
                </DialogActions>
            </Dialog>
            <Box marginTop={4} marginBottom={4}>
                <Pagination
                    count={Math.ceil(count / limit)}
                    page={page}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                />
            </Box>
        </div>
    )
}

export default EmailForm
