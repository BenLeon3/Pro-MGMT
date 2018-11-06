import { newProjectConstants } from '../_constants';
import { newProjectService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const newProjectActions = {
    createProject,
    getAll,
    delete: _delete
};

function createProject(newProject) {
    return dispatch => {
        dispatch(request(newProject));
        console.log('newprojserv', newProjectService)
        newProjectService.createProject(newProject)
            .then(
                newProject => { 
                    dispatch(success());
                    history.push('/projectMap');
                    dispatch(alertActions.success('New Project successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(newProject) { return { type: newProjectConstants.NEW_PROJECT_REQUEST, newProject } }
    function success(newProject) { return { type: newProjectConstants.NEW_PROJECT_SUCCESS, newProject } }
    function failure(error) { return { type: newProjectConstants.NEW_PROJECT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        newProjectService.getAll()
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: newProjectConstants.GETALL_REQUEST } }
    function success(projects) { return { type: newProjectConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: newProjectConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        newProjectService.delete(id)
            .then(
                newProject => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: newProjectConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: newProjectConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: newProjectConstants.DELETE_FAILURE, id, error } }
}