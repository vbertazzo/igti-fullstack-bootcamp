import express from 'express'
import { promises as fs } from 'fs'

const gradesRouter = express.Router()

gradesRouter.post('/', async (request, response, next) => {
  try {
    const { student, subject, type, value } = request.body

    if (!(student && subject && type && value)) {
      throw new Error('Missing parameters')
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
    logger.error(
      `${request.method} - ${request.baseUrl} [400] - ${error.message}`
    )
    response.status(400).send({ error: 'missing parameters' })
  }
})

export default gradesRouter
