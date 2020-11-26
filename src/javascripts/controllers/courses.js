import { Course } from '../models/course'
import { getCurrentUser } from '../config/routes'
import { User } from '../models/user'

//GET api/courses
export const allCoursesAPI = (req, res, next) => {
  Course.find().select('').populate('addedBy').exec((err, courses) => {
    if(err) {
      res.json({success: false, message: "Query failed"})
      res.end()
    } else {
      console.log(courses)
      res.write(JSON.stringify(courses))
      res.end()
    }
  })
}

//GET api/courses.:id
export const oneCourseAPI = (req, res, next) => {
  Course.findOne({_id: req.params.id}).select('').exec((err, course) => {
    if(err) {
      res.json({success: false, message: "Query failed"})
      res.end()
    } else {
      res.write(JSON.stringify(course))
      res.end()
    }
  })
}

//POST api/courses
export const createCourseAPI = (req, res, next) => {
  let course = new Course(req.body)
  course.addedBy = new User(getCurrentUser(req))
  course.addedAt = new Date()
  course.updatedAt = new Date()
  course.save((err) => {
    if(err) {
      res.json({success: false, message: "Course creation failed"})
      res.end()
    } else {
      res.end()
    }
  })
}

//PUT api/courses/:id
export const updateCourseAPI = (req, res, next) => {
  Course.findOne({_id: req.params.id}).select('').exec((err, course) => {
    if(err) {
      res.json({success: false, message: "Unable to update"})
      res.end()
    } else {
      Object.assign(course, req.body)
      course.updated_at = new Date()
      course.save(err => {
        if(err) {
          res.json({success: false, message: "Unable to update course"})
          res.end()
        } else {
          res.end()
        } 
      })
    }
  })
}

//DELETE api/courses/:id
export const deleteCourseAPI = (req, res, next) => {
  console.log("test")
  Course.findOne({_id: req.params.id}).select('').exec((err, course) => {
    if(err) {
      console.log(err)
      res.json({success: false, message: "Unable to delete"})
      res.end()
    } else {
      Course.findByIdAndDelete(req.params.id, err => {
        if(err) {
          res.json({success: false, message: "Unable to delete course"})
          res.end()
        } else {
          res.end()
        } 
      }) 
    }
  })
}