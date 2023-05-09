import React from "react";
import { useState,useEffect } from "react";
import "./Home.css";
import JobCard from "./JobCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate=useNavigate();
const auth=getAuthUser();
let token=null;
if(auth){ token =auth.token}
// if (!auth  ){
//     navigate("/login")
//   }


  const [jobs,setjobs]=useState({
    loading:true , 
    results: [],
    err: null,
    reload: 0,
  });
 
 console.log(auth);

  const [search, setSearch] = useState("");


  useEffect(() => {
    setjobs({ ...jobs, loading: true });
    axios
      .get("http://localhost:4000//get-jobs", {
        params: {
          search: search,
        },
        headers: {token:token}
      })
     
      .then((resp) => {
        console.log(resp);
        setjobs({ ...jobs, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setjobs({
          ...jobs,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  },[jobs.reload]);
  const searchjobs = (e) => {
    e.preventDefault();
    setjobs({ ...jobs, reload: jobs.reload + 1 });
    
  };
     console.log(jobs);
   return(

      <div className="home-container p-5">
     {jobs.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
     )}

{jobs.loading === false && jobs.err == null && (
<>
      <Form onSubmit={searchjobs}>
      <Form.Group className=" d-flex mb-3 ">
        
        <Form.Control type="text"
         placeholder="Search your job"
          className="  rounded-0 "
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         />
          <Button className =" btn btn-dark rounded-0" >
        Search
      </Button>
      </Form.Group>
    </Form>



      {/* jobs */}
        <div className="row">
          {jobs.results.map((job) => (
    <div className="col-3 card-job-container  "key={job.id}>
      <JobCard
     
      position={job.position}
      description={job.description}
      offer={job.offer}
      image_url={job.image_url}
      qualification={job.qualification}

      />
    </div>

          ))}
          </div>
          </>
 )} 
{jobs.loading === false && jobs.err == null && (
  <Alert variant="danger" className="p-2" > {jobs.err} </Alert>
)}
{jobs.loading===false&&
jobs.err==null&&
jobs.results.length===0&&
(<Alert variant="info" className="p-2">   No jobs, please try again later !</Alert>)}
</div>
   );
          };

 

   
 
export default HomePage;