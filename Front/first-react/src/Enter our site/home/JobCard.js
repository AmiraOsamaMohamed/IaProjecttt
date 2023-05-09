import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Link, useParams} from "react-router-dom";
import "./JobCard.css";
import axios from 'axios';
import { useState,useEffect} from 'react';
 import { getAuthUser } from "../../Storage/Storage.js";

const JobCard=(props)=> {
 
  let{id}=useParams();
  let token = null;
 
  const auth = getAuthUser();
   if (auth) {
    token = auth.token;
  }
  
  const [jobs, setjobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });


  const Applyjob=()=>{
    axios
      .post("http://localhost:4000//apply"+id,
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
      });};
  
  return (
    <div>
    <Card  className='card'>
      <Card.Img
      className='card-img'
       variant="top" 
       src={props.image_url} />
      <Card.Body>
        <Card.Title>{props.position}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text>
          {props.qualification}
        </Card.Text>
        <Card.Text>
          {props.offer}
        </Card.Text>


       
        {/* <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={(e) => {
                    Applyjob(id);
                  }}>
                  apply
                </button> */}

<Link className="btn btn-dark w-100 m-0" onSubmit={Applyjob} to={"/GetJob" }>
           Apply
          </Link>
      </Card.Body>
    </Card></div>
  );
};

export default JobCard;