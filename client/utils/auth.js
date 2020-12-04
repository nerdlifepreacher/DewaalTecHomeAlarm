import decode from 'jwt-decode'
export function isAuthenticated() { 
    const token = localStorage.getItem('token')
    
    if (token) {
      const payload = decode(token)
      console.log(JSON.stringify(payload))
        const expiry = payload.exp

    if (expiry < new Date().getTime() / 1000) {
        removeUser()
        return false
    }
    return true
  } else {
    return false
  }
}
export function removeUser () {
 localStorage.removeItem('token')
}
