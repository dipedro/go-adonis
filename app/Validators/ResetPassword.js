'use strict'

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password_confirmation: 'required|confirmed'
    }
  }
}

module.exports = ResetPassword
