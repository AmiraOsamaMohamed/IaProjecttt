import React from "react";
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
//import "./Updateuser.css";
import { useState, useRef } from "react";
import { getAuthUser } from "../../Storage/Storage";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const UpdateUser = () => {
    let{id}=useParams();
  const auth = getAuthUser();
  let token = null;
  if (auth) {
    token = auth.token;
  }

  const [user, setuser] = useState({
    
    status:"",
    loading: false,
    err: null,
  });



  const UpdateUserfun = (e) => {
    e.preventDefault();
    setuser({ ...user, loading: true, err: [] });

 
    const formData = new FormData();
    formData.append("status", user.status);

    axios
      .put("http://localhost:4000//update-user-status/"+id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        setuser({
          ...user,
          status:"",
          loading: false,
          err: null,
          success: "user Updated Successfully !",
        });
        
      })
      .catch((errors) => {
        setuser({
          ...user,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  console.log(user);
  return (
    <div className="login-container ">
      <h1> Update user</h1>

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

      <Form onSubmit={UpdateUserfun}>


        <Form.Group className="mb-5">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="status"
            value={user.status}
            onChange={(e) =>
              setuser({ ...user, status: e.target.value })
            }
          ></textarea>
        </Form.Group>
 

        <button type="submit" className="btn btn-dark ">
          Update 
        </button>
      </Form>
    </div>
  );
};

export default UpdateUser;