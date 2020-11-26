import React, {useContext, useState} from 'react'
import {CourseContext} from './CourseList'
import {useHistory, useParams} from 'react-router-dom'
import { format } from 'date-fns';
import Modal from 'react-modal'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function CourseDetails() {
  let {courses, setCourses, authenticated, setAuthenticated} = useContext(CourseContext)
  let [modalOpen, setModalOpen] = useState(false)
  let {cid} = useParams()
  let course = cid ? courses.find(c => c.id == cid) : {}

  const deleteCourse = () => {
    fetch(`/api/courses/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin',
    }).then(() => {
      toast('Successfully deleted', {
        onClose: () => {
          document.location = "/courses"
        }
      })
      setModalOpen(false)
    }).catch((error) => {
      toast('Failed to submit', {
        onClose: () => {
          document.location = "/courses"
        }
      })
    })
  }

  let [id, setId] = useState(course.id)
  let [CRN, setCRN] = useState(course.CRN)
  let [title, setTitle] = useState(course.title)
  let [description, setDescription] = useState(course.description)
  let [instructor, setInstructor] = useState(course.instructor)
  let [creditHours, setCreditHours] = useState(course.creditHours)
  let [semester, setSemester] = useState(course.semester)
  let [year, setYear] = useState(course.year)
  let [posterImage, setPosterImage] = useState(course.posterImage)
  let [beginDate, setBegintDate] = useState(course.beginDate)
  let [endDate, setEndDate] = useState(course.endDate)
  let [addedAt, setAddedAt] = useState(course.addedAt)
  let [updatedAt, setUpdatedAt] = useState(course.updatedAt)
  let [addedBy, setAddedBy] = useState(course.addedBy)
  
  const history = useHistory()

  return (
    <>
    <div className="column has-text-centered">
      <div className="card is-shadowless">
        <div className="card-image">
            <figure className="image is-4by3">
              <img 
                src={posterImage} alt={title} />
            </figure>
        </div>
        <div className="card-content">
          <div className="content has-text-left">
            <h2 className="title has-text-info has-text-centered">{title}</h2>
            <p className="subtitle has-text-info has-text-centered">{CRN}</p>
            <p className=""><strong>Credit Hours: </strong>{creditHours}</p>
            <p className=""><strong>Instructor: </strong> {instructor}</p>
            <p className=""><strong>Semester: </strong>{semester}</p>
            <p className=""><strong>Year: </strong>{year}</p>
            <p className=""><strong>Start Date: </strong>{format(beginDate, 'MM/dd/yyyy')}</p>
            <p className=""><strong>End Date: </strong>{format(endDate, 'MM/dd/yyyy')}</p>
            <p className=""><strong>Description: </strong>{description}</p>
            <p className=""><strong>Added: </strong>{format(addedAt, 'MM/dd/yyyy pp')}</p>
            <p className=""><strong>Updated: </strong>{format(updatedAt, 'MM/dd/yyyy pp')}</p>
            <p className=""><strong>Created By: </strong>{addedBy.firstName} {addedBy.lastName}</p>
            <br/>
            <div className="buttons">
              <button className="button is-info" onClick={() => history.push('/courses')}>Back</button>
              <button className="button is-info" onClick={() => history.push(`/courses/${course.id}/edit`)}>Edit Course</button>
              <button className="button is-info" onClick={() => {
                if (authenticated) setModalOpen(true)
                else document.location = '/signin'
              }}>Delete Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)} style={customStyles} contentLabel="Are you sure?">
      <p>Are you sure you want to delete this course?</p>
      <br/>
      <div className="buttons">
        <button className="is-info button" onClick={deleteCourse}>Confirm Delete</button>
        <button className="is-info button" onClick={() => setModalOpen(false)}>Cancel</button>
      </div>
    </Modal>
    </>
  )

}