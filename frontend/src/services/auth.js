const login = (token) => {
    localStorage.setItem("token", token)
    window.location.reload()
}

const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}

export default {
    login,
    logout
}