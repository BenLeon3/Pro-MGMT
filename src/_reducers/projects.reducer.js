import { newProjectConstants } from '../_constants';

export function projects(state = {items: [], loading: false, error: '', deleting: false}, action) {
  switch (action.type) {
    case newProjectConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case newProjectConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.projects
      };
    case newProjectConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case newProjectConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(newProject =>
            newProject.id === action.id
            ? { ...newProject, deleting: true }
            : newProject
        )
      };
    case newProjectConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(newProject => newProject.id !== action.id)
      };
    case newProjectConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(newProject => {
          if (newProject.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...newProjectCopy } = newProject;
            // return copy of user with 'deleteError:[error]' property
            return { ...newProjectCopy, deleteError: action.error };
          }

          return newProject;
        })
      };
    default:
      return state
  }
}