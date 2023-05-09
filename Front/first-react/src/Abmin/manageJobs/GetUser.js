import React from 'react';
import { Table } from 'react-bootstrap';
import { Link ,useParams } from 'react-router-dom';
import { getAuthUser } from "../../Storage/Storage.js";
import { useState ,useEffect} from 'react';
import axios from 'axios';
const GetUser = () => {
  let{id}=useParams();
    const auth = getAuthUser();
    const [job_application, setuser] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });
useEffect(()=>{
    setuser({ ...job_application, loading: true });
    axios
      .get("http://localhost:4000//get-requestedJobs",
    {headers:{token:auth.token,"Content-Type":"multipart/form-data"}} )
    .then((resp) => {
        setuser({ ...job_application, results: resp.data, loading: false, err: null });


    })
    .catch((err) => {
        setuser({
        ...job_application,
        loading: false,
        err: " something went wrong, please try again later ! ",
        });
    });
  }, [job_application.reload]);

  const AcceptUserFun = () => {
   // e.preventDefault();
    //setuser({ ...job_application.acceptance, loading: true, err: [] });
    const formData = new FormData();
    formData.append("acceptance", job_application.acceptance);


    axios
      .put("http://localhost:4000//update-job-acceptance/"+id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        setuser({
          ...job_application,
          acceptance:1,
          loading: false,
          err: null,
          success: "user Updated Successfully !",
        });
      })
      .catch((errors) => {
        setuser({
          ...job_application,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  
  const RejectUserFun = () => {
    // e.preventDefault();
     //setuser({ ...job_application.acceptance, loading: true, err: [] });
     const formData = new FormData();
     formData.append("acceptance", job_application.acceptance);
 
 
     axios
       .put("http://localhost:4000//update-job-acceptance/"+id, formData, {
         headers: {
           token: auth.token,
           "Content-Type": "multipart/form-data",
         },
       })
       .then((resp) => {
         console.log(resp);
         setuser({
           ...job_application,
           acceptance:"0",
           loading: false,
           err: null,
           success: "user Updated Successfully !",
         });
       })
       .catch((errors) => {
         setuser({
           ...job_application,
           loading: false,
           success: null,
           err: errors.response.data.errors,
         });
       });
   };
  console.log(job_application);

    return (
        <div>
        <h1> Applied User</h1>
        <Table striped bordered hover size='1m'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>user_id</th>
                    <th> Accept</th>
                  <th>user Qualification</th>
                    <th>FirstName</th>
                    <th>Phone</th>
                    <th>Skill </th>
                    <th>status</th>
                    <th>position</th>
                    <th>Reject</th>
                    <th>Acceptence</th>
                    </tr>
                    </thead>
                    <tbody>
                    {job_application.results.map((user) => (   
                    <tr key={user.id}>
                    <td> {user.user_id} </td>
                    <td> {user.acceptance} </td>
                    <td> {user.qualification} </td>
                    <td> {user.firstName} </td>
                    <td> {user.phone} </td>
                    <td> {user.skill} </td>
                    <td> {user.status} </td>
                    <td> {user.description} </td>
                    <td> {user.position} </td>

                      <td><button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    RejectUserFun();
                  }}>
                  Reject
                </button> </td> 

<td>
                <button
                  className="btn btn-sm btn-dark"
                  onClick={(e) => {
                    AcceptUserFun();
                  }}>
                  Accept
                </button> 
</td>
                </tr>   
 ))}
 </tbody>
    </Table>


        </div>
    );
};

export default GetUser;