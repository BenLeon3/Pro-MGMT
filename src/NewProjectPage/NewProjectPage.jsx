import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './newprojectpage.css';
import { newProjectActions, userActions } from '../_actions';
import BodyClassName from 'react-body-classname';
const mongoose = require('mongoose');

class NewProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newProject: {
                projectName: '',
                description: '',
                finishDate: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newProject } = this.state;
        this.setState({
            newProject: {
                ...newProject,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { newProject } = this.state;
        const { dispatch } = this.props;
        console.log('new pro a', newProjectActions);
        console.log('user act', userActions)
        if (newProject.projectName && newProject.description && newProject.finishDate) {
            dispatch(newProjectActions.createProject(newProject));
        }
    }

    render() {
        
        const { creatingproject  } = this.props;
        const { newProject ,submitted } = this.state;
        return (
            <BodyClassName className='projectpageclass'>
            <div className="col-md-6 col-md-offset-3 newprojectback1">
                <h2>Start a Project</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !newProject.projectName ? ' has-error' : '')}>
                        <label htmlFor="projectName">Project Name</label>
                        <input type="text" className="form-control" name="projectName" value={newProject.projectName} onChange={this.handleChange} />
                        {submitted && !newProject.projectName &&
                            <div className="help-block">Project Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !newProject.description ? ' has-error' : '')}>
                        <label htmlFor="description">Project Description</label>
                        <input type="text" className="form-control" name="description" value={newProject.description} onChange={this.handleChange} />
                        {submitted && !newProject.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && newProject.finishDate ? ' has-error' : '')}>
                        <label htmlFor="finishDate">Estimated Completion Date</label>
                        <input type="date" className="form-control" name="finishDate" value={newProject.finishDate} onChange={this.handleChange} />
                        {submitted && !newProject.finishDate &&
                            <div className="help-block">Estimated Completion Date is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Start Project</button>
                        {creatingproject && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </BodyClassName>
        );
    }
}

function mapStateToProps(state) {
    const { creatingproject } = state.newProjectCreation;
    return {
        creatingproject
    };
}

const connectedNewProjectPage = connect(mapStateToProps)(NewProjectPage);
export { connectedNewProjectPage as NewProjectPage };