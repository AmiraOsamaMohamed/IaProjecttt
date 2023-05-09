
import Form from 'react-bootstrap/Form';
const ContactPage = () => {
   
   
   
    
    return (
        <>
        <h2>We always here to help you </h2>
        <Form className='form'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Your Email Address" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
      </>
    );
}
 
export default ContactPage;
