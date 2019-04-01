const initialState = {
  projects: [
    {id: '1', title: 'this is the title 1', content: 'this is the content 1' },
    {id: '2', title: 'this is the title 2', content: 'this is the content 2' },
    {id: '3', title: 'this is the title 3', content: 'this is the content 3' }
  ]
}

const projectReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_PROJECT':
      console.log('created project', action.project)
      return state;
    case 'CREATE_PROJECT_ERROR':
      return state;
    default:
      return state;
  }
  // return state
}

export default projectReducer