// racf
import React from 'react'
// for connectiong to redux
import { connect } from 'react-redux'
// for connectiong to firebase
import { firestoreConnect } from 'react-redux-firebase'
// for connect both of them as higher order components 
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from "moment";

const ProjectDetails = (props) => {
  /* props already get to ProjectDetails as it's in the Route,
     so we can access these options using props.options
  */
  const { project, auth } = props;
  if(!auth.uid) return <Redirect to='/signin' />
  // we use this id inside the project title for testing
  // const id = props.match.params.id; // no longer need it
  if (project) {
    return (
      <div className='project-details container section'>
        <div className='card z-depth-0'>
          <div className='card-content'>
            <span className='card-title'>{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className='card-action grey lighten-4 grey-text'>
            <div>Posted by { project.authorFirstName } { project.authorLastName } </div>
            <div>{ moment(project.createdAt.toDate()).calendar() }</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container center'>
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);  
  const id = ownProps.match.params.id; // 
  const projects = state.firestore.data.projects; // 
  const project = projects ? projects[id] : null; // 
  return {
    project: project, // pass the returned project as props
    auth: state.firebase.auth
  }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects' } // now we have the access to projects on the state
    ])
) (ProjectDetails);