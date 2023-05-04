import React, {useState, useEffect} from 'react'
import SideNav from './SideNav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import publicApi from '../../api/publicApi';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
    const {id} = useParams();
    const [categoryData, setCategoryData] = useState({name: ''});
    const getCategory = async () =>{
        const {data} = await publicApi.get(`/category/${id}`)
        console.log(data)
        setCategoryData(data)
    }
    const updateCategory = async(e)=>{
        e.preventDefault();
        const {data}= await publicApi.post(`/category/update/${id}`, categoryData)
        console.log(data)
    }
    useEffect(()=>{
        getCategory()
    }, [])
  return (
    <div>
    <SideNav/>
    <Container style={styles.cont}>
        <h3>Edit category</h3>
        <Form onSubmit={updateCategory}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required value={categoryData.name}
                onChange={(e)=>setCategoryData({...categoryData, name: e.target.value})}/>
            </Form.Group>
            <button style={styles.btn}>Edit</button>
        </Form>
    </Container>
   </div>
  )
}
const styles = {
    btn: {
        width: '100%',
        background: '#000',
        color: '#fff',
        fontWeight: 500,
        border: 'none',
        borderRadius: '5px'
    },
    cont: {
        marginLeft: '200px',
        width: 'calc(100vw - 230px)'
    }
}
export default EditCategory