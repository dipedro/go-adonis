'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')
const Sentry = use('@sentry/node')
const Config = use('Config')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') return response.status(error.status).send(error.messages)

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  // eslint-disable-next-line require-await
  async report (error) {
    Sentry.init({ dsn: Env.get.SENTRY_DSN })
    Sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
