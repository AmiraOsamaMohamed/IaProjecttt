import React from 'react';
import { Table } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
//import "../../css/Managejobs.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../Storage/Storage.js";


const ManageJobs = () =>  {
    
    const auth = getAuthUser();
    const [jobs, setjobs] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });
useEffect(()=>{
    setjobs({ ...jobs, loading: true });
    axios
      .get("http://localhost:4000//get-jobs",
    {headers:{token:auth.token,"Content-Type":"multipart/form-data"}} )
    .then((resp) => {
        setjobs({ ...jobs, results: resp.data, loading: false, err: null });


      })
      .catch((err) => {
        setjobs({
          ...jobs,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [jobs.reload]);

const deletejob = (id) => {
    axios
      .delete("http://localhost:4000//delete-job/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setjobs({ ...jobs, reload: jobs.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="manage-jobs p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage jobs</h3>
        <Link to={"AddJob"} className="btn btn-success">
          Add New job +
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Image</th>
            <th> Name</th>
            <th> Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.results.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>
                <img
                  src={job.image_url}
                  alt={job.position}
                  className="image-avatar"
                />
              </td>
              <td> {job.position} </td>
              <td>{job.description}</td>
              <td>{job.qualification}</td>
              <td>{job.offer}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deletejob(job.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + job.id}
                  className="btn btn-sm btn-primary mx-2">
                  update
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageJobs;