import React from "react";
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import "./Updatejob.css";
import { useState, useRef } from "react";
import { getAuthUser } from "../../Storage/Storage";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const UpdateJob = () => {
    let{id}=useParams();
  const auth = getAuthUser();
  let token = null;
  if (auth) {
    token = auth.token;
  }

  const [job, setJob] = useState({
    position: "",
    qualification: "",
    max_candidate_number: "",
    offer: "",
    description: "",
    loading: false,
    err: null,
  });

  const image = useRef(null);

  const UpdateJobFun = (e) => {
    e.preventDefault();
    setJob({ ...job, loading: true, err: [] });

    console.log(image);
    const formData = new FormData();
    formData.append("position", job.position);
    formData.append("description", job.description);
    formData.append("qualification", job.qualification);
    formData.append("max_candidate_number", job.max_candidate_number);
    formData.append("offer", job.offer);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }

    axios
      .put("http://localhost:4000//update-all-data-of-specific-job/"+id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        setJob({
          ...job,
          position: "",
          qualification: "",
          max_candidate_number: "",
          offer: "",
          description: "",
          loading: false,
          err: null,
          success: "Job Updated Successfully !",
        });
        image.current.value = null;
      })
      .catch((errors) => {
        setJob({
          ...job,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  console.log(job);
  return (
    <div className="login-container ">
      <h1> Update Job</h1>

      {job.err && (
        <Alert variant="danger" className="p-2">
          {job.err}
        </Alert>
      )}

      {job.success && (
        <Alert variant="success" className="p-2">
          {job.success}
        </Alert>
      )}

      <Form onSubmit={UpdateJobFun}>
        <Form.Group className="mb-3 w-50 ">
          <Form.Control
            type="text"
            placeholder="Job position"
            value={job.position}
            onChange={(e) => setJob({ ...job, position: e.target.value })}
          />
        </Form.Group>
        {/* <Form.Group className='mb-3 '>
                    <textarea  className='form-control w-50 m-50'rows={2}
                      placeholder='Position'
                      value={AddJob.position}
                      onChange={(e) => setAddJob({...AddJob,position:e.target.value})}
                      ></textarea>
                
    </Form.Group> */}
        <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={2}
            placeholder="Description"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="Qualfication"
            value={job.qualification}
            onChange={(e) => setJob({ ...job, qualification: e.target.value })}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="Offer"
            value={job.offer}
            onChange={(e) => setJob({ ...job, offer: e.target.value })}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="max_candidate_number"
            value={job.max_candidate_number}
            onChange={(e) =>
              setJob({ ...job, max_candidate_number: e.target.value })
            }
          ></textarea>
        </Form.Group>
        {/* <Form.Group>
          <input
            type="file"
            className="form-control w-50"
            value={job.image}
            onChange={(e) => setjob({ ...job, image: e.target.value })}
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} required />
        </Form.Group>

        <button type="submit" className="btn btn-dark ">
          Update 
        </button>
      </Form>
    </div>
  );
};

export default UpdateJob;