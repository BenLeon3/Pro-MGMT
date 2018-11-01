import { newTaskConstants } from '../_constants';
import { newTaskService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const newTaskActions = {
    createTask,
    getAll,
    delete: _delete
};

function createTask(newTask) {
    return dispatch => {
        dispatch(request(newTask));
        console.log('newtaskserv', newTaskService)
        newTaskService.createTask(newTask)
            .then(
                newTask => { 
                    dispatch(success());
                    history.push('/newTask');
                    dispatch(alertActions.success('New Task successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(newTask) { return { type: newTaskConstants.NEW_TASK_REQUEST, newTask } }
    function success(newTask) { return { type: newTaskConstants.NEW_TASK_SUCCESS, newTask } }
    function failure(error) { return { type: newTaskConstants.NEW_TASK_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        newTaskService.getAll()
            .then(
                tasks => dispatch(success(tasks)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: newTaskConstants.GETALL_REQUEST } }
    function success(tasks) { return { type: newTaskConstants.GETALL_SUCCESS, tasks } }
    function failure(error) { return { type: newTaskConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        newTaskService.delete(id)
            .then(
                newTask => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: newTaskConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: newTaskConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: newTaskConstants.DELETE_FAILURE, id, error } }
}