export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    
    // here we will make async call to database
    
    const firestore = getFirestore();

    const profile = getState().firebase.profile; // to get the name
    const authorId = getState().firebase.auth.uid; // to get the id
    
    // add new created project
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then( () => {
      dispatch({type: 'CREATE_PROJECT', project: project})
    }).catch( (err) => {
      dispatch({type: 'CREATE_PROJECT_ERROR', err})
    })
  };
  
  /* without thunk
    return {
      type: 'ADD_PROJECT',
      project: project
  } */
}