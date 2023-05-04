import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import publicApi from '../api/publicApi'
import privateApi from '../api/privateApi'
import Alert from 'react-bootstrap/Alert';



const CheckoutModal = () =>{
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [pickupPoints, setPickupPoints] = useState([])
    const [locations, setLocations] = useState([])
    const [locationNames, setLocationNames] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getPickupPoints = async () => {
        const { data } = await publicApi.get('/pickuppoint')
        console.log(data)
        let newLocationArr = []
        let allPickupPoints = data.data
        for(let i = 0; i<allPickupPoints.length; i++){
            newLocationArr= [...newLocationArr, allPickupPoints[i].location]
        }
        console.log(newLocationArr)
        console.log(new Set(newLocationArr))
        setLocations([...new Set(newLocationArr)])
        setPickupPoints(data.data)
    }

const findLocationNames = (e) => {
    const locationNames = pickupPoints.filter((pickupPoint)=>{
        return pickupPoint.location === e
    })
    console.log(locationNames)
    setLocationNames(locationNames)
}

const checkout = async (e) => {
    e.preventDefault();
    console.log('getting here')
    const { data } = await privateApi.post('/cart/checkout')
    console.log(data)
    if(data.message === 'checked out successfully!'){
        setShowAlert(true)
    }
}

    useEffect(()=>{
        getPickupPoints()
    }, [])

    return(
        <div>
            <>
                <Button variant="primary" onClick={handleShow} style={stylees.buton}>
                    Proceed To Checkout
                </Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                    <Modal.Title style={stylees.title}>Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            showAlert?
                            <Alert  style={stylees.alert} variant="success" dismissible>
                                <Alert.Heading>Successfully checked out!</Alert.Heading>
                                <p>
                                    Pick item(s) within seven days of ordering.<br/>
                                    Continue shopping <Alert.Link href="/">here</Alert.Link>
                                </p>
                            </Alert>
                            :null
                        }
                        <div>
                            <Form onSubmit={checkout}>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Pick checkout location</Form.Label>
                                    <Form.Select required onChange={(e)=>findLocationNames(e.target.value)}>
                                        <option>Checkout Location</option>
                                        {
                                            locations.map((location)=>{
                                                return(
                                                    <option value={location}>{location}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Choose pick up point</Form.Label>
                                    <Form.Select required>
                                        <option>Pick up point</option>
                                        {
                                            locationNames.map((locationName)=>{
                                                return(
                                                    <option value={locationName.name}>{locationName.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="This is my correct pickup point!" />
                                </Form.Group>
                                <Button variant="primary" style={stylees.check} onClick={checkout}>
                                    Check Out <ArrowForwardIcon/>
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

const stylees= {
    buton: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '480px',
        width: '400px',
        height: '50px',
        background: 'rgb(0, 0, 0)',
        fontSize: '20px',
        border: '0px'
    },
    title: {
        fontSize: '30px'
    },
    alert: {
        background: '#52FFA8',
        color: '#000'
    },
    check: {
        width: '100%',
        background: 'rgb(0, 0, 0)',
        border: '0px'
    }
}



// closeButton
export default CheckoutModal