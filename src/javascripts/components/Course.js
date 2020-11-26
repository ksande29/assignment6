import React from 'react'
import {useHistory} from 'react-router-dom'
import {format} from 'date-fns';

export function Course(props) {
  const c = props.course
  const history = useHistory()
 
  console.log(c)
  return (
    <>
    <div className="column is-half is-one-third-desktop has-text-centered">
      <div className="card">
        <div className="card-image">
            <figure className="image is-4by3">
              <img 
                src={c.posterImage} alt={c.title} />
            </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h2 className="title has-text-info">{c.title}</h2>
            <p className="subtitle has-text-info">{c.CRN}</p>
            <p className="has-text-left"><strong>Credit Hours: </strong>{c.creditHours}</p>
            <p className="has-text-left"><strong>Instructor: </strong> {c.instructor}</p>
            <p className="has-text-left"><strong>Semester: </strong>{c.semester}</p>
            <p className="has-text-left"><strong>Year: </strong>{c.year}</p>
            <p className="has-text-left"><strong>Start Date: </strong>{format(c.beginDate, 'MM/dd/yyyy')}</p>
            <p className="has-text-left"><strong>End Date: </strong>{format(c.endDate, 'MM/dd/yyyy')}</p>
            <p className="has-text-left"><strong>Description: </strong>{c.description}</p>
            <p className="has-text-left"><strong>Added: </strong>{format(c.addedAt, 'MM/dd/yyyy pp')} </p>
            <p className="has-text-left"><strong>Updated: </strong>{format(c.updatedAt, 'MM/dd/yyyy pp')}</p>
            <p className="has-text-left"><strong>Created By: </strong>{c.addedBy.firstName} {c.addedBy.lastName}</p> 
          </div>
        </div>
        <footer className="card-footer">
          <div className="card-footer-item">
            <div className="buttons">
              <button className="button is-info" onClick={() => history.push(`/courses/${props.id}/view`)}>See More</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}