import { newProjectConstants } from '../_constants';

export function newProjectCreation(state = {}, action) {
  switch (action.type) {
    case newProjectConstants.NEW_PROJECT_REQUEST:
      return { creatingproject: true };
    case newProjectConstants.NEW_PROJECT_SUCCESS:
      return {};
    case newProjectConstants.NEW_PROJECT_FAILURE:
      return {};
    default:
      return state
  }
}