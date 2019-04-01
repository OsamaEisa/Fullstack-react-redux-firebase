import React from 'react';
import moment from "moment";

const ProjectSummary = ({project}) => {
  // insted of writing the title statically, we put it using project props,
  return (
    <div className='project-summary card z-depth-0'>
        <div className='card-content grey-text text-darken-3'>
          <span className='card-title'>{project.title}</span>
          <p>Posted by {project.authorFirstName + ' ' + project.authorLastName } </p>
          <p className='grey-text'>{ moment(project.createdAt.toDate()).calendar() }</p>
        </div>
      </div>
  )
}


export default ProjectSummary;