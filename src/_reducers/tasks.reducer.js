import { newTaskConstants } from '../_constants';

export function tasks(state = {items: [], loading: false, error: '', deleting: false}, action) {
  switch (action.type) {
    case newTaskConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case newTaskConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.tasks
      };
    case newTaskConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case newTaskConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(newTask =>
            newTask.id === action.id
            ? { ...newTask, deleting: true }
            : newTask
        )
      };
    case newTaskConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(newTask => newTask.id !== action.id)
      };
    case newTaskConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(newTask => {
          if (newTask.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...newTaskCopy } = newTask;
            // return copy of user with 'deleteError:[error]' property
            return { ...newTaskCopy, deleteError: action.error };
          }

          return newTask;
        })
      };
    default:
      return state
  }
}