import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components' ; 

const StyledContainer = styled.button`
  background-color: red;
`

export default function MainPage() {
  return ( 
  <div>
    <h1> HomePage </h1> 
    <Button> TEST </Button>
    <Form>
      <Form.Group className="mb-" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
    <StyledContainer> TEST TEST </StyledContainer>
  </div>
  ) ;
}