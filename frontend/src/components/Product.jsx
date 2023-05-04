import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import publicApi from '../api/publicApi';
import '../App.css';



const Product = () => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const { data } = await publicApi.get('/products/get')
        console.log(data)
        setProducts(data.data)
    }
    useEffect(()=>{
        getProducts()
    },[])
    const navigate = useNavigate()
    return(
        <div>
            <Row xs={1} md={4} className="g-4" style={styles.row}>
            {products.map((product) =>(
                <Col key={product._id}>
                    <Card className="mb-3" style={styles.card}>
                        <Card.Img variant="top" src={backendUrl + product.mainImage} style={styles.cadimg}/>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <div style={styles.price}>
                                <Card.Text>Kshs.{product.price}</Card.Text>
                                <button onClick={()=> navigate(`/productdetails/${product._id}`)} style={styles.btnn} className="button button1">View</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </div>
    )
}

const styles= {
    row: {
        paddingBottom: '50px'
    },
    card: {
        // margin: '20px',
        width: '270px',
        borderRadius: '11px'
    },
    cadimg: {
        width: '100%',
        height: '250px'
    },
    price: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    btnn: {
        // borderRadius: '20px',
        // width: '150px',
        // border: '1px solid black',
        // background: 'transparent',
        // color: 'black',
        // cursor: 'pointer'
    }
}

export default Product



