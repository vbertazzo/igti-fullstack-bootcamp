import express from 'express'
import logger from './logger.js'
import gradesRouter from './routes/grades.js'

global.logger = logger

const app = express()

app.use(express.json())

app.use('/api/grades', gradesRouter)

const errorHandler = (error, request, response, next) => {
  const errors = {
    ValidationError: { statusCode: 400, errorMessage: error.message },
    FileNotFound: { statusCode: 500, errorMessage: 'Internal server error' },
  }

  if (errors[error.name]) {
    const { statusCode, errorMessage } = errors[error.name]
    logger.error(
      `${request.method} - ${request.originalUrl} - [${statusCode}] - ${errorMessage}`
    )
    return response.status(statusCode).send({ error: errorMessage })
  }

  logger.error(
    `${request.method} - ${request.originalUrl} - [${error.statusCode}] - ${error.message}`
  )

  return response.status(error.statusCode).send({ error: error.message })
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
