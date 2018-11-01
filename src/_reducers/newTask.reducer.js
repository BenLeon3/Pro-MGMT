import { newTaskConstants } from '../_constants';

export function newTaskCreation(state = {}, action) {
  switch (action.type) {
    case newTaskConstants.NEW_TASK_REQUEST:
      return { creatingtask: true };
    case newTaskConstants.NEW_TASK_SUCCESS:
      return {};
    case newTaskConstants.NEW_TASK_FAILURE:
      return {};
    default:
      return state
  }
}