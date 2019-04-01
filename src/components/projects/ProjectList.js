import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
  // const projects = props.projects; // write ({projects}) instead of (props)
  /* 
    We make it {projects && projects.map} : 
    to check first if there are some projects or not!
  */
  return (
    <div className='projec-list section'>
      { projects && projects.map( project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} key={project.id} />
          </Link>
        )
      })}

      {
      /* we can then ignore repeating this code
        <ProjectSummary />
        <ProjectSummary />
        <ProjectSummary />
        <ProjectSummary />
      */
     }
    </div>
  )
}


export default ProjectList;