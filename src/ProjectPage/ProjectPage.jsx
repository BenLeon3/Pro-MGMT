import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../ProjectPage/main.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { newProjectActions } from '../_actions';


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

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(newProjectActions.delete(id));
    }


    render() {
        const createProject = this.props.createProject || [];
        const projectlist = createProject.map( project => {
            return (
                <tr>
                    <td>{ project.projectName }</td>
                    <td>{ project.description }</td>
                    <td> {project.finishDate}</td>
                    <td> {project.endDate}</td>
                </tr>
            )
        }
            );
        const { user, users } = this.props;
        return (
            <section id='projectpage' className='hideMe backlook'>
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
                <p className="Logoutback">
                    <h1 className="left">Hello!</h1> 

                    <Link to="/login">Logout</Link>    
                </p>
                <table id='projectTable'>
                    <thead>
                        <tr className='table-headers'>
                            <th className='a'>Project Name</th>
                            <th className='b'>Description</th>
                            <th className='e'>Finish Date</th>
                            <th className='d'>Status</th>
                            <th><Link to="/project">Add New Project</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                    { projectlist }
                    </tbody>
                </table>
            </section>
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