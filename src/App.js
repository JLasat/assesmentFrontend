import React, { useEffect, useState, } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import ModalEdit from "./components/ModalEdit";
function App() {

  const [employe, setEmploye] = useState();
  const [employes, setEmployes] = useState([]);
  const [employe2, setEmploye2] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true)
    setEmploye2(value)
  };

  const getData = async () =>{
    try {
      const data = await fetch("http://localhost:5000/get-employee")

      const res = await data.json();
      setEmployes(res) ;
      console.log(res);


    } catch (error) {
      console.log(error.message)
    }

  }
  const deleteEmployee = async (id) =>{
 
    try {

      const data = await fetch("http://localhost:5000/delete-employee/"+id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", }
    })
      const res = await data.json();
      getData()  

    } catch (error) {
      console.log(error.message)
    }

  }
  const addEmployee = async () =>{
    console.log(employe);
    try {
      const suppbody = {
        name: employe,
       
    }
      const data = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(suppbody)
    })
      const res = await data.json();
  
     getData();
     setEmploye("")
    } catch (error) {
      console.log(error.message)
    }

  }
  useEffect(() =>{
    getData()
  },[])
  

  return (
    <div className="App">

      <Container>
        <Row>
          <Form>
            <Col sm={8}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" value={employe} onChange={(e) => setEmploye(e.target.value)} placeholder="Enter Employee Name" />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Button onClick={addEmployee} variant="primary">
                Add
              </Button>
            </Col>
          </Form>
        </Row>
        <Row>
          <Col sm={8}>
            <Table striped bordered hover mt={10}>
              <thead>
                <tr>
                  <th>id#</th>
                  <th>Employee Name</th>
                </tr>
              </thead>
              <tbody>
              {employes.map((value,index) => (
                  <tr>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td><Button onClick={(e) => handleShow(value)} variant="warning">Edit</Button></td>
                  <td><Button onClick={(e) => deleteEmployee(value.id)} variant="danger">Delete</Button></td>
                </tr>
              ))}
                
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

     <ModalEdit show={show} handleClose={handleClose} handleShow={handleShow} employe={employe2} refresh={getData}  />           

    </div>

  );
}

export default App;
