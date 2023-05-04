import React, {useState} from 'react'
import SideNav from './SideNav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import publicApi from '../../api/publicApi';
const AddCategory = () => {
    const [categoryData, setCategoryData] = useState({name: ''});
    const addCategories = async (e) =>{
        e.preventDefault();
        const { data } = await publicApi.post('/category/create', categoryData)
        console.log(data)
    }
  return (
    <div>
         <SideNav/>
        <Container style={styles.cont}>
            <h3>Add category</h3>
            <Form onSubmit={addCategories}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required value={categoryData.name}
                onChange={(e)=>setCategoryData({...categoryData, name: e.target.value})}/>
            </Form.Group>
            <button style={styles.btn}>Add Category</button>
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
export default AddCategory