export const validateForm = (setError, recipient, title, body) => {
    let valid = true
    setError({ recipient: '', title: '', body: '' })
    if (!recipient) {
        setError(prev => ({ ...prev, recipient: 'Recipient field is required.' }))
        valid = false
    }
    if (!title) {
        setError(prev => ({ ...prev, title: 'Title field is required.' }))
        valid = false
    }
    if (!body) {
        setError(prev => ({ ...prev, body: 'Body field is required.' }))
        valid = false
    }
    if (!/.+@.+\..+/.test(recipient) || recipient.length > 254) {
        setError(prev => ({ ...prev, recipient: 'Invalid email.' }))
        valid = false
    }
    return valid
}