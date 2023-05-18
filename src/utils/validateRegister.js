export const validateRegister = (setError, username, email, password) => {
    let valid = true
    if (!/^[\w.@+-]+$/.test(username) || username.length > 150 || username.length < 1) {
        setError(prev => ({ ...prev, login: 'Invalid login.' }))
        valid = false
    }

    if (!/.+@.+\..+/.test(email) || email.length > 254) {
        setError(prev => ({ ...prev, email: 'Invalid email.' }))
        valid = false
    }

    if (password.length > 128 || password.length < 1) {
        setError(prev => ({ ...prev, password: 'Invalid password.' }))
        valid = false
    }
    return valid
}