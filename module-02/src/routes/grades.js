import express from 'express'
import { promises as fs } from 'fs'

const gradesRouter = express.Router()

const createCustomError = (type, message) => {
  const error = new Error()
  error.name = type
  error.message = message
  return error
}

gradesRouter.post('/', async (request, response, next) => {
  try {
    const { student, subject, type, value } = request.body

    if (!(student && subject && type && value)) {
      throw createCustomError('ValidationError', 'Invalid parameters')
    }

    const gradesData = JSON.parse(await fs.readFile('./data/grades.json'))

    const newGrade = {
      id: gradesData.nextId,
      student,
      subject,
      type,
      value,
      timestamp: new Date().toISOString(),
    }

    const newGrades = {
      nextId: gradesData.nextId + 1,
      grades: [...gradesData.grades, newGrade],
    }

    await fs.writeFile('./data/grades.json', JSON.stringify(newGrades))

    logger.info(
      `${request.method} - ${
        request.baseUrl
      } [201] - Grade created successfully: ${JSON.stringify(newGrade)}`
    )

    response.status(201).json(newGrade)
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

export default gradesRouter
