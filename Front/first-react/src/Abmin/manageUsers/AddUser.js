import React from 'react';
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
const AddUser = () => {
    return (
        <div className='login-container'>
        <h1> Add new User</h1>
            <Form>
            <Form.Group className='mb-3'>
                    <textarea  className='form-control  w-50'rows={1}  placeholder='ID'></textarea>
                
                </Form.Group>
                <Form.Group className='mb-3'>
                    <textarea  className='form-control  w-50'rows={1}  placeholder='Name'></textarea>
                
                </Form.Group>
                <Form.Group className='mb-3'>
                    <textarea  className='form-control  w-50 'rows={1}  placeholder='Email'></textarea>
                
                </Form.Group>
                <Form.Group className='mb-3'>
                    <textarea  className='form-control w-50'rows={1}  placeholder='PhonNumber'></textarea>
                
                </Form.Group>
                <Form.Group className='mb-3'>
                    <textarea  className='form-control w-50'rows={1}  placeholder='Status'></textarea>
                
                </Form.Group>
                <Form.Group className='mb-3'>
                    <textarea  className='form-control w-50'rows={1}  placeholder='Type'></textarea>
                
                </Form.Group>
                <Form.Group>
                    <input type='file' className='form-control w-50'/>
                </Form.Group>

                <button className="btn btn-dark w-20 " variant="primary" type='submit' >
                    Add
                </button>
            </Form>
        </div>
    );
};

export default AddUser;