import express from 'express'

import {indexPage, aboutPage, contactPage, signInPage, signUpPage} from '../controllers/index'
import {allCoursesAPI, oneCourseAPI, createCourseAPI, updateCourseAPI, deleteCourseAPI} from '../controllers/courses'
import {contactAPI} from '../controllers/contacts'
import {registerUserAPI, signUserInAPI} from '../controllers/users'
import jwt from 'jsonwebtoken'
import {APP_SECRET} from './vars'

let router = express.Router()

function isSignedIn(req) {
  try {
    jwt.verify(req.cookies.token, APP_SECRET)
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

function requireSignIn(req, res, next) {
  if (isSignedIn(req)) {
    next()
  } else {
    res.status(401)
    res.end()
  }
}

export function getCurrentUser(req){
  if(req.cookies.token){
    return jwt.decode(req.cookies.token, APP_SECRET) 
  }else {
    return null
  }
}

export function configureRoutes(app) {
  app.all('*', (req, res, next) => {
    app.locals.signedIn = isSignedIn(req)
    app.locals.currentUser = getCurrentUser(req)
    next()
  })
  
  router.get('/', indexPage)
  router.get('/about', aboutPage)
  router.get('/contact', contactPage)
  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)
  router.get('/courses*', indexPage)
  router.get('/register', indexPage)
  router.get('/signin', indexPage)

  //course API endpoints
  router.get('/api/courses', allCoursesAPI)
  router.get('/api/courses/:id', oneCourseAPI)
  router.post('/api/courses', requireSignIn, createCourseAPI)
  router.put('/api/courses/:id', requireSignIn, updateCourseAPI)
  router.delete('/api/courses/:id', requireSignIn, deleteCourseAPI)

  //contact API endpoints
  router.post('/api/contact', contactAPI)

  //users API endpoints
  router.post('/api/users/register', registerUserAPI)
  router.post('/api/users/signin', signUserInAPI)

  app.use('/', router)
}