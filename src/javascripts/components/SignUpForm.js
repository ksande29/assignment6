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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required()
})

export function SignUpForm() {
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    },
    validationSchema,
    onSubmit(values){
      fetch('/api/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then((response) => {
        if(!response.ok) throw Error('Failed to sign up')
        return response.text()
      }).then(() => {
        toast('Successfully signed up', {
          onClose: () => {
            document.location = "/courses"
          }
        })
      }).catch((error) => {
        toast('Failed to sign up', {
          onClose: () => {
            document.location = "/courses"
          }
        })
      })
    }
  })
  
  const history = useHistory()

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Sign Up</h2>
          <div className="field">
            <label className="label" htmlFor="firstName">First Name</label>
            <div className="control">
            <input className="input" id="firstName" type="text" name="firstName" value={values.firstName} onChange={handleChange}></input>
              <VHelp message={errors.firstName} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="lastName">Last Name</label>
            <div className="control">
            <input className="input" id="lastName" type="text" name="lastName" value={values.lastName} onChange={handleChange}></input>
              <VHelp message={errors.lastName} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control">
            <input className="input" id="email" type="text" name="email" value={values.email} onChange={handleChange}></input>
              <VHelp message={errors.email} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="username">User Name</label>
            <div className="control">
            <input className="input" id="username" type="text" name="username" value={values.username} onChange={handleChange}></input>
              <VHelp message={errors.username} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="control">
            <input className="input" id="password" type="password" name="password" value={values.password} onChange={handleChange}></input>
            <VHelp message={errors.password} />
            </div>
          </div>
          <div className="field">
            <label></label>
            <div className="control">
              <div className="buttons">
                <button className="button is-info" type="submit">Submit</button>
                <button className="button is-info is-outlined" onClick={() => document.location = '/courses'}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}