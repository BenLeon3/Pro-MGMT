import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import '../ProjectPage/main.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { newProjectActions } from '../_actions';
import BodyClassName from 'react-body-classname';

// configure({ adapter: new Adapter() });

// export class projectpage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             user: {
//                 firstName: '',
//                 lastName: '',
//                 username: '',
//                 password: ''
//             },
//             submitted: false
//         };

//         // this.handleChange = this.handleChange.bind(this);
//         // this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const { name, value } = event.target;
//         const { user } = this.state;
//         this.setState({
//             user: {
//                 ...user,
//                 [name]: value
//             }
//         });
//     }
class ProjectPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(newProjectActions.getAll());
    }

    handleDeleteproject(id) {
        return (e) => this.props.dispatch(newProjectActions.delete(id));
    }


    render() {
        const createProject = this.props.createProject || [];
        const projectlist = createProject.map( project => {
            return (
                <tr id='projectTable'>
                   
                    <Link to='/newTask'>  <td className='a'>{ project.projectName }</td>
                            <td className='b'>{ project.description }</td>
                            <td className='e'> {project.finishDate}</td>
                            <td className='d'> {project.endDate}</td>
                    </Link>
                    {/* kevin Code deleting the project--------------------*/}
                    {/* {Project.loading && <em>Loading users...</em>}
                    {Project.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {Project.items &&
                        <ul>
                            {newProject.items.map((Project, index) =>
                                <li key={Project.id}>
                                    {
                                        Project.deleting ? <em> - Deleting...</em>
                                        : Project.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteproject(id)}>Delete</a></span>
                                    }
                                </li>
                            )}
                        </ul>
                     } */}
                    {/*----------------------------------------- */}
                </tr>
            )
        }
            );
        const { user, users } = this.props;
        return (
            <BodyClassName className='ProjectPageClass'>
            <section id='projectpage' className='hideMe backlook'>
            <p className="Logoutback">
                    <h1 className="left">Hi! Here are your current projects.</h1>
                    <Link to="/project">Add New Project</Link>  
                    <Link to="/login">Logout</Link>    
                </p>
                {/* <form action='' className='project-form' id='newProjectJS'>
                    <input className='longer-input' id='newProjectName' type='text' placeholder='New project name' required />
                    <input className='longer-input' id='newProjectPredeccesor' type='text' placeholder='New project predeccesor' required />
                    <input className='shorter-input' id='newProjectDuration' type='number' min='0' placeholder='Days' required />
                    <input className='shorter-input' id='newProjectStart' type='text' placeholder='Start date' required />
                    <select name='status' id='status' required>
                    <option value='Planning'>Planning</option>
                        <option value='On Going'>On Going</option>
                        <option value='Paused'>Paused</option>
                        <option value='Canceled'>Canceled</option>
                        <option value='Completed'>Complete</option>
                    </select>
                    <button type='submit'>+ New Project</button>
                </form> */}
                <table id='projectTable'>
                    <thead>
                        <tr className='table-headers'>
                            <th className='a'>Project Name</th>
                            <th className='b'>Description</th>
                            <th className='e'>Finish Date</th>
                            <th className='d'>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { projectlist }
                    </tbody>
                </table>
            </section>
            </BodyClassName>
        )
    }
}

function mapStateToProps(state) {
    
    console.log("yo", state);
    const { createProject } = state;
    // const { user } = authentication;
    return {
        // newProject,
        createProject: state.projects.items
        
    };
}

const connectedProjectPage = connect(mapStateToProps)(ProjectPage);
export { connectedProjectPage as ProjectPage };