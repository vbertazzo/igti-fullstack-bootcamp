import express from 'express'

const gradesRouter = express.Router()

gradesRouter.get('/', (request, response, next) => {
  try {
    logger.info(
      `${request.method} - ${request.baseUrl} - ${response.statusCode} - 'Ok'`
    )
    response.send('Ok')
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

export default gradesRouter
