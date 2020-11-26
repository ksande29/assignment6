import React, {useState, createContext, useEffect} from 'react'
import {Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'
import {Course} from './Course'
import CourseForm from './CourseForm'
import CourseDetails from './CourseDetails'
import {useCookies} from 'react-cookie'

export const CourseContext = createContext()

export function CourseList() {
  const [courses, setCourses] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory()

  useEffect(() => {
    if (!courses) {
      fetch('/api/courses', {
        credentials: 'same-origin'
      })
    .then(response => response.text())
    .then((data) => {
      setCourses(JSON.parse(data, (key, value) => {
        const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
        if(typeof value === 'string' && dateFormat.test(value)){
          return new Date(value)
        }
        return value
      }))
    })
    .catch(console.error)
    }
  })
  if(!courses)
      return <p>Loading...</p>

  return (
    <CourseContext.Provider value={{courses, setCourses, authenticated, setAuthenticated}}>
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column buttonGroup">
            <Route exact path="/courses">
              <button className="button is-info" onClick={() => history.push('/courses/new')}>
                Add a New Class
              </button>
            </Route>
            <div className=" dropdown is-hoverable">
              <div className="dropdown-trigger">
                <Route exact path="/courses">
                  <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu">
                    Sort Classes...
                  </button>
                </Route>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a className="dropdown-item" onClick={() => {
                      courses.sort((a, b) => {
                        if (a.CRN > b.CRN) {
                          return -1;
                        }
                        if (b.CRN > a.CRN) {
                            return 1;
                        }
                        return 0;
                      })
                      setCourses(courses.map(m => m))}}>
                    Sort by CRN
                  </a>
                  <a className="dropdown-item" onClick={() => {
                    courses.sort((a, b) => {
                      if (a.semester > b.semester) {
                        return -1;
                      }
                      if (b.semester > a.semester) {
                          return 1;
                      }
                      return 0;
                    })
                    setCourses(courses.map(m => m))}}>
                    Sort by Semester
                  </a>
                  <a className="dropdown-item" onClick={() => {
                    courses.sort((a, b) => a.beginDate - b.beginDate)
                    setCourses(courses.map(m => m))}}>
                    Sort by Beginning Date
                  </a>
                  <a className="dropdown-item" onClick={() => {
                    courses.sort((a, b) => b.addedAt - a.addedAt)
                    setCourses(courses.map(m => m))}}>
                    Sort by Added At
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path="/courses">
            <div className="columns is-multiline">
              {courses.map(course => <Course key={course.id} course={course} {...course}/>)}
            </div>
          </Route>
          <Route path="/courses/new"><CourseForm/></Route>
          <Route path="/courses/:cid/edit"><CourseForm/></Route>
          <Route path="/courses/:cid/view"><CourseDetails/></Route>
          <Redirect from="" to="/courses"></Redirect>
        </Switch>
      </div>
    </div>

    </ CourseContext.Provider>
  )
}
