<h1 align="center">Module 2 Challenge: Grades Control API</h1>

<div align="center">
	<img alt="IGTI Fullstack logo" src="https://res.cloudinary.com/voss/image/upload/v1594901380/readme_logos/igti-fullstack.png"/>
</div>

[IGTI - Bootcamp: Full Stack Development](https://www.igti.com.br/custom/bootcamp-desenvolvedor-full-stack/)

## 🎯 Objective

Create a backend application named "grades-control-api" that provides an API that allows user to control grades from students.

## ✔️ Requirements

- Develop endpoints to: create grade, update grade, delete grade and read grade.
- A file (grades.json) previously populated with grades information will be used as database for this challenge.
- Endpoints:

  - create (POST /grades): receives JSON in the request body with 'student', 'subject', 'type' and 'value' properties. The grade must be saved on database with a unique id and timestamp. The endpoint must return the created grade.
  - update (PUT /grades/:id): receives JSON in the request body with 'student', 'subject', 'type' and 'value' properties and 'id' as request parameter. The endpoint must check if the grade already exists, if it doesn't, an error should be returned. If the grade exists, it should be updated with the new data.
  - delete (DELETE /grades/:id): receives 'id' as request parameter and delete from the database if it exists.
  - read (GET /grades/:id): receives 'id' as request parameter and return grade if it exists.
  - read (POST /grades/subject): receives JSON in the request body with 'student' and 'subject' properties. The endpoint must return the sum of all activities grades related to the specified subject.
  - read (POST /grades/average): receives JSON in the request body with 'type' and 'subject' properties. The endpoint must return the grade average of all activities related to the specified subject and type.
  - read (POST /grades/top3): receives JSON in the request body with 'type' and 'subject' properties. The endpoint must return an array with the top 3 grades of the specified subject and type, on descending order.

> GitHub [@vbertazzo](https://github.com/vbertazzo) &nbsp;&middot;&nbsp;
> Twitter [@vtazzo](https://twitter.com/vtazzo)
