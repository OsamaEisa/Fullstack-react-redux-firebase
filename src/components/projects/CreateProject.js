// rce
import React, { Component } from 'react'
import { createProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {

  state = {
    title: '',
    content: '',
    projectErr: ''
  }

  /* to get what is typed in inputs
     and we use [e.target.id] to specify which input is been written in
  */ 
  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // the createProject we declare down in dispatch
      if(this.state.title !== '' && this.state.content !== '' ) {
        this.props.createProject(this.state);
        this.props.history.push('/') // redirect to home page
        // console.log(this.state)
      } else {
         this.setState({
           projectErr: 'Cannot create a blank project!'
         })
      }
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className='white'>
          <h5 className='grey-text text-darken-3'>Create new project</h5>
          <div className='input-field'>
            <label htmlFor='title'>Project Title</label>
            <input type='text' id='title' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label htmlFor='content'>Project Content</label>
            <textarea id='content' className='materialize-textarea' onChange={this.handleChange}></textarea>
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Create</button>
            <div className='red-text center'>
            { <p><strong>{this.state.projectErr}</strong></p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapToDispatchToProps = (dispatch) => {
  return {
    // anyname for the fun : (parameters) => dispatch(reducerName(params))
    createProject: (project) => dispatch(createProject(project))
  }
} 

export default connect(mapStateToProps, mapToDispatchToProps)(CreateProject);
