import express from 'express'
import logger from './logger.js'
import gradesRouter from './routes/grades.js'

global.logger = logger

const app = express()

app.use(express.json())

app.use('/api/grades', gradesRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
