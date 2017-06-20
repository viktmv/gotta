class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(user) {
    localStorage.setItem('auth_token', user.auth_token)
    localStorage.setItem('email', user.email)
    localStorage.setItem('name', user.name)
    localStorage.setItem('id', user.id)
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('auth_token') !== null
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.clear()
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getUser() {
    let user = {}
    user.name = localStorage.getItem('name')
    user.email = localStorage.getItem('email')
    user.auth_token = localStorage.getItem('token')
    user.id = localStorage.getItem('id')

    return user
  }

}

export default Auth
