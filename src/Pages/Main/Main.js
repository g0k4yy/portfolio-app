import React from 'react'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import { Redirect } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext'
import {useState, useEffect } from "react";
import currencies from "../../currencies.json"
import '../../App.css';

import axios from 'axios'

function Main() {
    const { loggedIn } = useAuth();
    const [filterText, setFilterText] = useState("");
    
    const [data, setData] = useState({})
    const [isLoading, setisLoading] = useState(true)
       useEffect(  () => {
           async function fetchData() {
           await axios(`https://v6.exchangerate-api.com/v6/5411e3c0093d4ee9da80fe60/latest/USD`).then((res) =>{ setData(res.data); setisLoading(false) })}
           fetchData();
       }, [])


    const [ratio, setRatio] = useState("");
    const [show, setShow] = useState(false);
    const [modalElement, setmodalElement] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (element) =>  {
        setmodalElement(element)
        setRatio(data.conversion_rates[(element.substring(0,3))])
        setShow(true); 
    }
    if (!loggedIn) {
        return <Redirect to="/signup"/>;
    }

    let json_data = currencies
    let arr = []
    for (var i in json_data)
        arr.push([i.concat("-", json_data[i])])
    const filtered = arr.filter((item) => {
        return Object.keys(item).some((key) =>
            item[key]
                .toString()
                .toLowerCase()
                .includes(filterText.toLocaleLowerCase())
        );
    });

    return (
        <div>
            <Container>
                <input type="text" className="search" placeholder="Currency search" value={filterText} onChange={
                    (e) => {
                        setFilterText(e.target.value)
                    }
                } />
                <Row>
                    <Col xs={12}>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>{modalElement}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{ modalElement.substring(0,3) + "  "  + ratio }
                            <Button variant="danger" style={{float:"right"}} onClick={handleClose}>
                                    Sell
                                </Button>
                                <Button variant="success" style={{float:"right" , marginRight:"5px"} } onClick={handleClose}>
                                    Buy
                                </Button></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <ListGroup >
                            {isLoading ? <div>Loading... </div> : filtered.map((currency) => {
                                return (currency.map((element, index) => {
                                    return (
                                        <ListGroup.Item key={index} onClick={() => {handleShow(element) }}>{element}</ListGroup.Item>
                                        
                                    )
                                }))
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Main
