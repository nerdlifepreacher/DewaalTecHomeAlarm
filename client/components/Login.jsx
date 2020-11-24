import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const Login = ({ title }) => (
    <div style={{ height: "100vh" }}>
    <div className="container h-100 ">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="">
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>login</Card.Title>
                    <Card.Text>
                    Do Login shit here 
                    </Card.Text>
                </Card.Body>
                    </Card>
            </div>
    </div>
        </div>
        </div>
  )
  
      function handleClick(e) {
        e.preventDefault();
  
  }

  
export default Login