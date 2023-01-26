import React, { useEffect, useState, } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const ModalEdit = ({show, handleShow, handleClose, employe, refresh}) => {
    const [employe2, setEmploye2] = useState();

    useEffect(() =>{
        setEmploye2(employe)
      },[employe])

    const saveChanges = async () =>{
            console.log("sds");
        try {
            const suppbody = {
              name: employe2,
             
          }
 
            const data = await fetch("http://localhost:5000/update-employee/"+employe.id, {
              method: "PUT",
              headers: { "Content-Type": "application/json", },
              body: JSON.stringify(suppbody)
          })
          console.log(data.status);

            const res = await data.json();
            refresh()
            handleClose()
          } catch (error) {
            console.log(error.message)
          }

    }  
    
    return (
        <div> 
         
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Control value={employe2 && employe2.name} onChange={(e) => setEmploye2(e.target.value)}  type="text"  placeholder="Enter Employee Name" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ModalEdit