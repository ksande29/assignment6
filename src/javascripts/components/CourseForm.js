import React, {useContext, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {CourseContext} from './CourseList'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format, parse } from 'date-fns';
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

toast.configure()

export function VHelp({message}) {
  return <p className="has-text-danger">{message}</p>
  }

const validationSchema = yup.object({
  CRN: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  instructor: yup.string().required(),
  creditHours: yup.number().required().min(0),
  semester: yup.string().required(),
  year: yup.date().required(),
  posterImage: yup.string().url().required(),
  beginDate: yup.string().required(),
  endDate: yup.string().required()
})

export default function CourseForm() {
  let {courses, setCourses, authenticated, setAuthenticated} = useContext(CourseContext)
  let {cid} = useParams()

  if (!authenticated) {
    document.location ='./signin'
    return <></>
  }

  let course = cid ? courses.find(c => c.id == cid) : {}
  let is_new = cid === undefined
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: is_new ? {
      CRN: "",
      title: "",
      description: "",
      instructor: "",
      creditHours: "",
      semester: "",
      year: "",
      posterImage: "",
      beginDate: new Date(),
      endDate: new Date()
    } : {...course},
    validationSchema,
    onSubmit(values){
      fetch(`/api/courses${is_new ? '' : '/' + course.id}`, {
        method: is_new ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then(() => {
        toast('Successfully submitted', {
          onClose: () => {
            document.location = "/courses"
          }
        })
      }).catch((error) => {
        toast('Failed to submit', {
          onClose: () => {
            document.location = "/courses"
          }
        })
      })
    }
  })

  let [id, setId] = useState(course.id)
  
  const history = useHistory()
  const submit = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title">Adding/Editing a Course</h2>

      <div className="field">
        <label className="label" htmlFor="CRN">CRN</label>
        <div className="control">
        <input className="input" type="text" name="CRN" value={values.CRN} onChange={handleChange}></input>
          <VHelp message={errors.CRN} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="title">Title</label>
        <div className="control">
        <input className="input" type="text" name="title" value={values.title} onChange={handleChange}></input>
        <VHelp message={errors.title} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="description">Description</label>
        <div className="control">
        <textarea className="textarea" type="text" name="description" value={values.description} onChange={handleChange}></textarea>
        <VHelp message={errors.description} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="instructor">Instructor</label>
        <div className="control">
        <input className="input" type="text" name="instructor" value={values.instructor} onChange={handleChange}></input>
          <VHelp message={errors.instructor} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="creditHours">Credit Hours</label>
        <div className="control">
        <input className="input" type="text" name="creditHours" value={values.creditHours} onChange={handleChange}></input>
        <VHelp message={errors.creditHours} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="semester">Semester</label>
        <div className="control">
        <input className="input" type="text" name="semester" value={values.semester} onChange={handleChange}></input>
          <VHelp message={errors.semester} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="year">Year</label>
        <div className="control">
        <input className="input" type="text" name="year" value={values.year} onChange={handleChange}></input>
          <VHelp message={errors.year} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="posterImage">Poster Image</label>
        <div className="control">
        <input className="input" type="text" name="posterImage" value={values.posterImage} onChange={handleChange}></input>
          <VHelp message={errors.posterImage} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="beginDate">Begin Date</label>
        <div className="control">
        <DatePicker className="input" name="beginDate" selected={values.beginDate} onChange={date => setFieldValue('beginDate', date)}></DatePicker>
          <VHelp message={errors.beginDate} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="endDate">End Date</label>
        <div className="control">
        <DatePicker className="input" name="endDate" selected={values.endDate} onChange={date => setFieldValue('endDate', date)}></DatePicker>
          <VHelp message={errors.endnDate} />
        </div>
      </div>

      

      <div className="field">
        <label></label>
        <div className="control">
          <div className="buttons">
            <button className="button is-info">Submit</button>
            <button className="button is-info is-outlined" onClick={() => history.push('/courses')}>Cancel</button>
          </div>
        </div>
      </div>

    </form>
  )
}