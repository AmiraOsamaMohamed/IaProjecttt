import React from 'react';
import { Table } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
//import "../../css/Manageuser.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../Storage/Storage.js";


const ManageUser = () =>  {
    
    const auth = getAuthUser();
    const [user, setuser] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });
useEffect(()=>{
    setuser({ ...user, loading: true });
    axios
      .get("http://localhost:4000//get-users",
    {headers:{token:auth.token,"Content-Type":"multipart/form-data"}} )
    .then((resp) => {
        setuser({ ...user, results: resp.data, loading: false, err: null });


    })
    .catch((err) => {
        setuser({
        ...user,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [user.reload]);

const DeleteUser = (id) => {
    axios
      .delete("http://localhost:4000//delete-user/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setuser({ ...user, reload: user.reload + 1 });
      })
      .catch((err) => {});
  };



  return (
    <div className="manage-user p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage user</h3>
        <Link to={"AddUser"} className="btn btn-success">
          Add New user +
        </Link>
        <Link
                  to={"../manageJobs/GetUser"}
                  className="btn btn-sm btn-primary mx-2">
                  GetListUser
        </Link>
      </div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>FirstName</th>
            <th> LastName</th>
            <th> Email</th>
            <th>PhoneNumber</th>
            <th>skill</th>
            <th>AboutYou</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {user.results.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td> {user.firstName} </td>
              <td> {user.lastName} </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.skill}</td>
              <td>{user.aboutYou}</td>
              <td>{user.status}</td>
              <td>
              <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    DeleteUser(user.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={" " + user.id}
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

export default ManageUser;