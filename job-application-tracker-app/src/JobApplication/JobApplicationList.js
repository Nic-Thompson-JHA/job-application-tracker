import "../JobApplication/CSS/JobApplicationList.css";
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { withRouter } from '../withRouter';

class JobApplicationList extends Component {
    constructor(props) {
        super(props);
        this.state = { applicationData: [] };
        this.navigateToList = this.navigateToList.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost/JobApplications/applications')
            .then(response => {
                this.setState({ applicationData: response.data });
             })
            .catch(function (error) {
                console.log(error);
            })
    }

    navigateToList()
    {
        window.location.reload();
    }

    formatDate = (date) => {
        return format(date, 'dd/MM/yyyy');
    }

    handleDeleteJobApplication = async (id) => {
        await axios.delete('http://localhost/JobApplications/applications/' + id)
            .then(json => {
                if (json.status === 200) {
                    alert('Record deleted successfully!!');
                    this.navigateToList();
                }
            });
    }

    render() {
        return (
            <div>
                <h4 align="center">Job Application List</h4>
                <div align="center">
                    <table className="table table-striped" style={{ marginTop: 10 }}>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Date Applied</th>
                                <th>Actions</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.applicationData.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.companyName}
                                </td>
                                <td>
                                    {item.position}
                                </td>
                                <td>
                                    {item.status}
                                </td>
                                <td>
                                    {this.formatDate(item.dateApplied)}
                                </td>
                                <td>
                                    {item.actions}
                                </td>
                                <td align="right">
                                    <Link to={"/EditJobApplication/" + item.id} className="btn btn-success btn-edit">Edit</Link>
                                </td>
                                <td>
                                    <button type="button" onClick={this.handleDeleteJobApplication.bind(this, item.id)} className="btn btn-danger btn-delete">Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(JobApplicationList);