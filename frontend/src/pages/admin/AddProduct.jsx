import React,{useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from '@mui/material';
import SideNav from './SideNav';
import publicApi from '../../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';


const AddProduct = () =>{
    const [categories, setCategories] = useState([])
    const [productData, setProductData]= useState({
        name: '', description:'', image: '', images: [], price: '', currency: '', quantity: '', category: [], discountPercentage: ''
    })
    const getCategories = async () => {
        const { data } = await publicApi.get('/category/get')
        console.log(data)
        setCategories(data)
    }
    const saveFiles = (e) => {
        let imgArr = [];
        let images = e.target.files;
        for(let i = 0; i < images.length; i++){
            imgArr = [...imgArr, images[i]]
        }
        setProductData({...productData, images: imgArr})
    }

    const addProducts = async (e) =>{
        try {
            e.preventDefault();
            let formData = new FormData ();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('quantity', productData.quantity);
            formData.append('price', productData.price);
            //appending images
            formData.append('image', productData.image);
            productData.images.forEach((img)=> {
                formData.append('images', img)
            })
            formData.append('category', productData.category);
            formData.append('discountPercentage', productData.discountPercentage);
            const { data } = await publicApi.post('/products/create', formData)
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    }, [])

    return(
        <div>
            <SideNav/>
            <Container style={styles.cont}>
                <h3 style={styles.head}>Add Product.</h3>
                <Form onSubmit={addProducts}>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Name</Form.Label>
                        <Form.Control style={styles.input} type="text" placeholder="Name" required value={productData.name} onChange={(e)=> {setProductData({...productData, name: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Description</Form.Label>
                        <Form.Control style={styles.input} as="textarea" type="text" placeholder="description"  required value={productData.description} onChange={(e)=> {setProductData({...productData, description: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Quantity</Form.Label>
                        <Form.Control style={styles.input} type="number" placeholder="Quantity" required value={productData.quantity} onChange={(e)=> {setProductData({...productData, quantity: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Price</Form.Label>
                        <Form.Control style={styles.input} type="number" placeholder="Price" required value={productData.price} onChange={(e)=> {setProductData({...productData, price: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Main Image</Form.Label>
                        <Form.Control style={styles.input} type="file" onChange={(e)=> setProductData({...productData, image: e.target.files[0]})} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Images</Form.Label>
                        <Form.Control style={styles.input} type="file" multiple onChange={saveFiles} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Category</Form.Label>
                        <p>{productData.category.map((item) => item+' ')}</p>
                        {
                            productData.category.length > 0?
                            <DeleteIcon onClick={()=> setProductData({...productData, category:[]})}/>
                            : null
                        }

                        <Form.Select style={styles.input} onChange={(e)=> {setProductData({...productData, category: [...productData.category, e.target.value]})}}>
                            <option></option>
                            {
                                categories.map((category)=>{
                                    return(
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={styles.name}>Discount Percentage</Form.Label>
                        <Form.Control style={styles.input} type="number" placeholder="Discount Percentage"  value={productData.discountPercentage} onChange={(e)=> {setProductData({...productData, discountPercentage: e.target.value})}}/>
                    </Form.Group>
                    <Button type="submit" style={styles.button}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

const styles={
    cont: {
        marginLeft: '200px',
        width: 'calc(100vw - 230px)'
    },
    head: {
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        border: '1px solid grey'
    },
    name: {
        fontSize: '20px'
    },
    button: {
        width: '85vw',
        background: 'rgb(0, 0, 0)',
        fontSize: '20px'
    }
}

export default AddProduct