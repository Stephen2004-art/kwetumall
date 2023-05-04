import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import publicApi from '../api/publicApi'
import privateApi from '../api/privateApi'
import { Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () =>{
    const{ id } = useParams()
    const [product, setProduct] = useState({})
    const [counter, setCounter] = useState (1)
    const [errMsg, setErrMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL
    console.log(id)

    const getProduct = async () => {
        const { data } = await publicApi.get(`/products/${id}`)
        console.log(data)
        setProduct(data.data)
    }
const subtractCounter = () => setCounter(counter-1)
const addCounter = () => setCounter(counter+1)
const addToCart = async () => {
    if(counter < 1){
        setErrMsg('Add at least one item')
    }else{
        try {
            const { data } = await privateApi.post(`/cart/addtocart/${id}`, {quantity: counter})
            console.log(data)
            setSuccessMsg(data.message)  
        } catch (error) {
            setErrMsg(error.message)
        }
   

    }
}

    useEffect(()=>{
        getProduct()
    },[])

    if(!product.images){
        return(
            <p>Loading...</p>
        )
    }
    return(
        <div>
            <div style={stylee.use}>
                <p style={stylee.mall}>Kwetumall</p>
                <div>
                    <AccountCircleIcon style={stylee.acc}/>
                    <ShoppingCartIcon style={stylee.carts}  href='/cartdetails'/>
                </div>
            </div>
            <div style={stylee.border2}></div>
            <Container style={stylee.detail}>
                <div style={stylee.photo}>
                    <img src={backendUrl + product.mainImage} alt={product.name} style={stylee.cont}/>
                    <div style={stylee.flex}>
                        {
                            product.images.map((img)=>{
                                return(
                                    <img src={backendUrl + img} alt='product' style={stylee.imejs}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={stylee.dets}>
                    <h2 style={stylee.name}>{product.name}</h2>
                    <div style={stylee.border}></div>
                    <p style={stylee.desc}>{product.description}</p>
                    <p style={stylee.desc}>This product is a popular item sold online that provides a convenient solution to a common problem. It is a small, handheld device that uses advanced technology to simplify a task that would otherwise require a lot of time and effort. It is compact and easy to use, making it a favorite among busy individuals who are always on the go. Its sleek design and affordable price point make it an attractive option for anyone looking to simplify their daily routine. It is compatible with most devices and can be easily charged via USB, making it a versatile and convenient accessory.</p>
                    <div style={stylee.many}>
                        <div style={stylee.counter}>
                            <button onClick={subtractCounter} style={stylee.btn}>-</button>
                            <p style={stylee.num}>{counter}</p>
                            <button onClick={addCounter} style={stylee.btn}>+</button>
                        </div>
                        <div style={stylee.money}>
                            <p>Ksh. {product.price}</p>
                        </div>
                    </div>
                    <button onClick={addToCart} style={stylee.cart}>Add to Cart</button>
                    {errMsg?<p style={stylee.errmsg}>{errMsg}</p>:null}
                    {successMsg?<>
                    <p style={stylee.succmsg}>{successMsg}</p>
                    <a href='/cartdetails'>View Cart</a> 
                    </>:null}

                </div>
            </Container>
        </div>
    )
}


const stylee= {
    use: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    acc: {
        marginRight: '25px'
    },
    carts: {
        marginRight: '15px'
    },
    mall: {
        fontSize: '15px',
        color: 'rgb(0, 0, 0)',
        marginTop: '10px',
        fontWeight: '700'
    },
    border2: {
        height: '1px',
        background: 'rgb(128, 128, 128)',
        width: '100%',
        marginTop: '-15px'
    },
    detail: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    photo: {
        width: '40%'
    },
    cont: {
        width: '400px',
        height: '350px',
        margin: '10px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    imejs: {
        width: '100px',
        height: '100px',
        borderRadius: '0px'
        // display: 'block',
        // border: '10px solid green'
    },
    dets: {
        width: '40%'
    },
    name: {
        margin: '20px',
        fontWeight: '900',
    },
    border: {
        height: '1px',
        background: 'rgb(0, 0, 0)',
        width: '100%',
        display: 'flex',
        // margin: '0px 0px 0px 20px'
    },
    desc: {

    },
    many: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    counter: {
       display: 'flex',
       justifyContent: 'space-between',
       width: '100px',
    //    margin: '50px'
    },
    money: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '800',
        marginTop: '20px'
    },
    btn: {
        width: '50px',
        margin: '10px'
    },
    num: {
        margin: '20px'
    },
    cart: {
        width: '80%',
        background: 'rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
        margin: '50px',
        height: '50px',
        borderRadius: '10px'
    },
    errmsg: {
        color: 'rgb(100, 0, 0)',
        fontSize: '20px'
    },
    succmsg: {
        color: 'rgb(0, 100, 0)',
        fontSize: '20px'
    }
}
export default ProductDetails



 //red in color and smaller font
//green in color and smaller font