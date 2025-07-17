import React from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../JobApplication/CSS/AddJobApplication.css';
import { withRouter } from '../withRouter';
import { format } from 'date-fns';

class EditJobApplication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
            CompanyName: '',
            Position: '',
            DateApplied: '',
            Status: '',
            Actions: ''
        };

        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDateApplied = this.onChangeDateApplied.bind(this);
        this.onChangeActions = this.onChangeActions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToList = this.navigateToList.bind(this);
   }

    navigateToList()
    {
        this.props.navigate('/JobApplicationList');
        window.location.reload();
    }

    componentDidMount = async () => {
        await axios.get('http://localhost/JobApplications/applications/' + this.props.params.id)
            .then(response => {
                this.setState({
                    Id: response.data.id,
                    CompanyName: response.data.companyName,
                    Position: response.data.position,
                    DateApplied: format(new Date(response.data.dateApplied), "yyyy-MM-dd"),
                    Status: response.data.status,
                    Actions: response.data.actions
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeCompanyName = (e) => {
        this.setState({
            CompanyName: e.target.value
        });
    }

    onChangePosition = (e) => {
        this.setState({
            Position: e.target.value
        });
    }

    onChangeDateApplied = (e) => {
        this.setState({
            DateApplied: e.target.value
        });
    }

    onChangeStatus = (e) => {
        this.setState({
            Status: e.target.value
        });
    }

    onChangeActions = (e) => {
        this.setState({
            Actions: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            Id: this.props.params.id,
            CompanyName: this.state.CompanyName,
            Position: this.state.Position,
            DateApplied: this.state.DateApplied,
            Status: this.state.Status,
            Actions: this.state.Actions
        };

        await axios.put('http://localhost/JobApplications/applications/' + this.props.params.id, obj)
            .then(res => console.log(res.data));

        this.navigateToList();
    }

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Update Job Application Information</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="CompanyName" sm={2}>Company Name</Label>
                            <Col sm={5}>
                                <Input type="text" name="CompanyName" value={this.state.CompanyName} onChange={this.onChangeCompanyName} placeholder="Enter Company Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Position" sm={2}>Position</Label>
                            <Col sm={5}>
                                <Input type="text" name="Position" value={this.state.Position} onChange={this.onChangePosition} placeholder="Enter Position" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="DateApplied" sm={2}>Date Applied</Label>
                            <Col sm={3}>
                                <Input type="date" name="DateApplied" value={this.state.DateApplied} onChange={this.onChangeDateApplied} placeholder="Enter Date Applied" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Status" sm={2}>Status</Label>
                            <Col sm={3}>
                                <Input type="select"  name="Status" onChange={this.onChangeStatus} value={this.state.Status} placeholder="Select Status">
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Actions" sm={2}>Actions</Label>
                            <Col sm={10}>
                                <Input type="textarea" rows="5" name="Actions" value={this.state.Actions} onChange={this.onChangeActions} placeholder="Enter Actions" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}></Col>
                            <Col sm={1}>
                                <Button type="submit" color="success">Submit</Button>{' '}
                            </Col>
                            <Col sm={1}>
                                <Button color="danger" onClick={this.navigateToList}>Cancel</Button>{' '}
                            </Col>
                            <Col sm={5}></Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }

}

export default withRouter(EditJobApplication);