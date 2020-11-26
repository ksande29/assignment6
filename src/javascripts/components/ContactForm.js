import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'

toast.configure()

export function VHelp({message}) {
  return <p className="has-text-danger">{message}</p>
  }

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required()
})

export function ContactForm() {
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "", 
    },
    validationSchema,
    onSubmit(values){
      fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //credentials: 'same-origin',
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
  
  const history = useHistory()

  return (
    <div className="section lightGreenBackground">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">Name</label>
            <div className="control">
            <input className="input" id="name" type="text" name="name" value={values.name} onChange={handleChange}></input>
              <VHelp message={errors.name} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="name">Email</label>
            <div className="control">
            <input className="input" id="email" type="text" name="email" value={values.email} onChange={handleChange}></input>
              <VHelp message={errors.email} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="message">Message</label>
            <div className="control">
            <textarea className="textarea" name="message" value={values.message} onChange={handleChange}></textarea>
              <VHelp message={errors.message} />
            </div>
          </div>
          <div className="field">
            <label></label>
            <div className="control">
              <div className="buttons">
                <button className="button greenBackground has-text-white" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}