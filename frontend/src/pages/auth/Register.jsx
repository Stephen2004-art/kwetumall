import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import publicApi from '../../api/publicApi'

const Register = () =>{
    const [validated, setValidated] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const [formData, setFormData] = useState({firstName: '', lastName: '', country: '', phoneNumber: '', gender: '', email: '', password: ''})
    const registerUser = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        setValidated(true);
    
        try {
            setErrorMsg(null)
            const { data } = await publicApi.post('/signup', formData)
            console.log(data)
            if(data.message === 'Created Account Successfully!'){
                window.open('/login','_self')
            }
        } catch (error) {
            setErrorMsg('Something went wrong')
            console.log(error)
        }
    }   
    return(
        <div>
            <Form noValidate validated={validated} onSubmit={registerUser}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={(e)=> {setFormData({...formData, firstName: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please write your first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={(e)=> {setFormData({...formData, lastName: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please write your last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Country"onChange={(e)=> {setFormData({...formData, country: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please select your country.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone" onChange={(e)=> {setFormData({...formData, phoneNumber: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please insert your phone number.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" onChange={(e)=> {setFormData({...formData, email: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please insert your E-mail.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={(e)=> {setFormData({...formData, gender: e.target.value})}}>
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=> {setFormData({...formData, password: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a strong password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter password" onChange={(e)=> {setFormData({...formData, password: e.target.value})}} required/>
                    <Form.Control.Feedback type="invalid">
                        Please choose a strong password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Check me out" required/>
                    <Form.Control.Feedback type="invalid">
                        Select check box!
                    </Form.Control.Feedback>
                </Form.Group>
                {errorMsg? <p style={{color: 'red', fontSize: '0.8em'}}>{errorMsg}</p>: null}
                <Button variant="primary" type="submit">
                    Submit
                 </Button>
            </Form>
        </div>
    )
}

export default Register
