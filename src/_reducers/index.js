import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { newProjectCreation } from './newProject.reducer';
import {projects} from './projects.reducer';
import { tasks } from './tasks.reducer';
import { newTaskCreation } from './newTask.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  newProjectCreation,
  projects,
  newTaskCreation,
  tasks
});

export default rootReducer;