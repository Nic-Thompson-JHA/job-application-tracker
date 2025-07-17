import AddJobApplication from './JobApplication/AddJobApplication';
import JobApplicationList from './JobApplication/JobApplicationList';
import EditJobApplication from './JobApplication/EditJobApplication';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navheader">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/AddJobApplication'} className="nav-link">Add Job Application</Link>
            </li>
            <li className="nav-item">
              <Link to={'/JobApplicationList'} className="nav-link">Job Application List</Link>
            </li>
          </ul>
        </div>
      </nav> <br />
      <Routes>
        <Route path='/' element={<JobApplicationList/>} />
        <Route path='/AddJobApplication' element={<AddJobApplication/>} />
        <Route path='/EditJobApplication/:id' element={<EditJobApplication/>} />
        <Route path='/JobApplicationList' element={<JobApplicationList/>} />
      </Routes>
    </div>
  );
}

export default App;