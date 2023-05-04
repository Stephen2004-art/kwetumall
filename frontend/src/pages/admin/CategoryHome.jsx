import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import SideNav from './SideNav';
import Container from 'react-bootstrap/Container';
import publicApi from '../../api/publicApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CategoryHome = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const getCategories = async() => {
        const { data } = await publicApi.get('/category/get')
        console.log(data)
        setCategories(data)
    }
    const deleteCategory = async(categoryId) =>{
      const {data} = await publicApi.post(`/category/delete/${categoryId}`)
      console.log(data)
      if(data === 'Deleted successfully'){
        setCategories(categories.filter((category)=>{
          return category._id !== categoryId
        }))
      }
    }
    useEffect(()=>{
        getCategories()
    },[]);
  return (
    <div>
        <SideNav/>
        <Container style={styles.cont}>
            <a href='/add/category'>+ Category</a>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            categories.map((category)=>{
                return(
                    <tr key={category._id}>
                        <td>{category._id}</td>
                        <td>{category.name}</td>
                        <td>
                            <span onClick={()=> navigate(`/edit/category/${category._id}`)}><EditIcon/> </span>
                            <span onClick={()=>deleteCategory(category._id)}><DeleteIcon/></span>
                        </td>
                    </tr>
                )
            })
        }
      </tbody>
    </Table>
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
export default CategoryHome