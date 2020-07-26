import express from 'express'
import { promises as fs } from 'fs'

const gradesRouter = express.Router()

const createCustomError = (type, message) => {
  const error = new Error()
  error.name = type
  error.message = message
  return error
}

gradesRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    let gradesData = JSON.parse(await fs.readFile('./data/grades.json'))

    const grade = gradesData.grades.find((grade) => grade.id === Number(id))

    if (!grade) {
      throw createCustomError('ValidationError', 'Invalid id')
    }

    logger.info(
      `${request.method} - ${
        request.originalUrl
      } - [200] - Grade displayed: ${JSON.stringify(grade)}`
    )

    response.status(200).json(grade)
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

gradesRouter.post('/subject', async (request, response, next) => {
  try {
    let { student, subject } = request.body

    if (!(student && subject)) {
      throw createCustomError('ValidationError', 'Invalid parameters')
    }

    student = student.trim().toLowerCase()
    subject = subject.trim().toLowerCase()

    let gradesData = JSON.parse(await fs.readFile('./data/grades.json'))

    const studentAndSubjectExists = gradesData.grades.some(
      (grade) =>
        grade.student.trim().toLowerCase() === student &&
        grade.subject.trim().toLowerCase() === subject
    )

    if (!studentAndSubjectExists) {
      throw createCustomError(
        'ValidationError',
        'Student and/or Subject not found'
      )
    }

    if (studentAndSubjectExists) {
      const subjectGrade = gradesData.grades.reduce((acc, curr) => {
        if (
          curr.student.trim().toLowerCase() === student &&
          curr.subject.trim().toLowerCase() === subject
        ) {
          return acc + curr.value
        }
        return acc
      }, 0)

      logger.info(
        `${request.method} - ${
          request.originalUrl
        } - [200] - Total grade for { ${student}, ${subject} } = ${JSON.stringify(
          subjectGrade
        )}`
      )

      response.status(200).json({ grade: subjectGrade })
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

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
        request.originalUrl
      } - [201] - Grade created: ${JSON.stringify(newGrade)}`
    )

    response.status(201).json(newGrade)
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

gradesRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const { student, subject, type, value } = request.body

    if (!(student && subject && type && value)) {
      throw createCustomError('ValidationError', 'Invalid parameters')
    }

    let gradesData = JSON.parse(await fs.readFile('./data/grades.json'))

    const gradeIndex = gradesData.grades.findIndex(
      (grade) => grade.id === Number(id)
    )

    if (gradeIndex === -1) {
      throw createCustomError('ValidationError', 'Invalid id')
    }

    gradesData.grades[gradeIndex] = {
      ...gradesData.grades[gradeIndex],
      student,
      subject,
      type,
      value,
    }

    await fs.writeFile('./data/grades.json', JSON.stringify(gradesData))

    logger.info(
      `${request.method} - ${
        request.originalUrl
      } - [200] - Grade updated: ${JSON.stringify(
        gradesData.grades[gradeIndex]
      )}`
    )

    response.status(200).json(gradesData.grades[gradeIndex])
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

gradesRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    let gradesData = JSON.parse(await fs.readFile('./data/grades.json'))

    const numberOfOriginalGrades = gradesData.grades.length
    const removedGrade = gradesData.grades.filter(
      (grade) => grade.id === Number(id)
    )
    const filteredGrades = gradesData.grades.filter(
      (grade) => grade.id !== Number(id)
    )

    const numberOfFilteredGrades = filteredGrades.length

    if (numberOfOriginalGrades === numberOfFilteredGrades) {
      logger.info(
        `${request.method} - ${request.originalUrl} - [204] - No grades removed: id (${id}) not found`
      )
    }

    if (numberOfOriginalGrades !== numberOfFilteredGrades) {
      const newGrades = { ...gradesData, grades: filteredGrades }

      await fs.writeFile('./data/grades.json', JSON.stringify(newGrades))

      logger.info(
        `${request.method} - ${
          request.originalUrl
        } - [204] - Grade removed: ${JSON.stringify(removedGrade)}`
      )
    }

    response.status(204).end()
  } catch (error) {
    if (error.code === 'ENOENT') {
      error.name = 'FileNotFound'
    }

    next(error)
  }
})

export default gradesRouter
