import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newTaskActions, userActions } from '../_actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import ReactDOM from 'react-dom';
// import { KanBanBoard } from '../KanBanBoard';


class TasksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTask: {
                projectTask: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newTask } = this.state;
        this.setState({
            newTask: {
                ...newTask,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { newTask } = this.state;
        const { dispatch } = this.props;
        console.log('new pro a', newTaskActions);
        console.log('user act', userActions)
        if (newTask.projectTask) {
            dispatch(newTaskActions.createTask(newTask));
        }
    }

    //add to page
    componentDidMount() {
        this.props.dispatch(newTaskActions.getAll());

        // todo: put tasks into state
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(newProjectActions.delete(id));
    }

    // onDragEnd = result => {
    //     // todo
    // };
    //drag items
    

    render() {
        const { creatingtask } = this.props;
        const { newTask, submitted } = this.state;
        //add to page
        const createTask = this.props.createTask || [];
        const tasklist = createTask.map( task => {
            return (
                <tr>
                    <td>{ task.projectTask }</td>
                    <td>{ task.createdDate }</td>
                </tr>
            )
        });

        return (
            <div>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Add a Task</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !newTask.projectTask ? ' has-error' : '')}>
                            <label htmlFor="projectTask">Task Description</label>
                            <input type="text" className="form-control" name="projectTask" value={newTask.projectTask} onChange={this.handleChange} />
                            {submitted && !newTask.projectTask &&
                                <div className="help-block">A Project Task is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Add Task</button>
                            {creatingtask && 
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>New Task</h2>
                    <table id='taskTable-new'>
                        <thead>
                            <tr className='table-headers'>
                                    <th className='a'>Task Description</th>
                                    <th className='b'>Created On</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tasklist }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>In Progress</h2>
                    <table id='taskTable-inProgress'>
                        <thead>
                            <tr className='table-headers'>
                                    <th className='a'>Task Description</th>
                                    <th className='b'>Created On</th>
                            </tr>
                        </thead>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                        <tbody>
                            {/* { tasklist } */}
                        </tbody>
                        </DragDropContext>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>Completed</h2>
                    <table id='taskTable-Complete'>
                        <thead>
                            <tr className='table-headers'>
                                    <th className='a'>Task Description</th>
                                    <th className='b'>Created On</th>
                            </tr>
                        </thead>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                        <tbody>
                            {/* { tasklist } */}
                        </tbody>
                        </DragDropContext>
                    </table>
                </div>
                
            </div>
        );
    } 
    
}

function mapStateToProps(state) {
    const { creatingtask } = state.newTaskCreation;
    const { createTask } = state;
    return {
        creatingtask,
        createTask: state.tasks.items
    };
}

const connectedTasksPage = connect(mapStateToProps)(TasksPage);
export { connectedTasksPage as TasksPage };