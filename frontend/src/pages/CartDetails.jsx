import React, {useState, useEffect} from 'react';
import privateApi from '../api/privateApi'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckoutModal from '../components/CheckoutModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartDetails = () =>{
const [cart, setCart] = useState([]);
const backendUrl = import.meta.env.VITE_APP_BACKEND_URL

    const getCart = async () => {
        const { data } = await privateApi.get('/cart/getitems')
        console.log(data)
        setCart(data.data)
    }
    const getTotalAmount = () => {
        let sum = 0;
        for (let i = 0; i< cart.length; i++){
            let cartItemSum = cart [i].product.price * (cart[i].cartQuantity? cart[i].cartQuantity : 1);
            sum = cartItemSum + sum
        }
        return sum
    }
    const removeFromCart = async (productId) => {
        const { data } = await privateApi.post(`/cart/remove/${productId}`)
        console.log(data)
        if(data.message === 'Removed from Cart Successfully!'){
            getCart()
        }
    }

    useEffect(()=>{
        getCart()
    },[])

    return(
        <div>
            <div style={styless.use}>
                <p style={styless.mall}>Kwetumall</p>
                <div>
                    <AccountCircleIcon style={styless.acc}/>
                    <ShoppingCartIcon style={styless.carts}/>
                </div>
            </div>
            <div style={styless.border2}></div>
            <h2 style={styless.caat}>Your Cart</h2>
            <div style={styless.border}></div>
           { 
           cart.map((cartItem)=> {
                return (
                    <div key={cartItem.product._id} className='mb-3' style={styless.prod}>
                        <img alt={cartItem.product.name} src={backendUrl + cartItem.product.mainImage} style={styless.picc}/>
                        <p style={styless.namm}>{cartItem.product.name}</p>
                        <p style={styless.cash}>Ksh. {cartItem.product.price}</p>
                        <p style={styless.quan}>{cartItem.cartQuantity ? cartItem.cartQuantity: 1}</p>
                        <DeleteIcon onClick={()=> removeFromCart(cartItem.product._id)} style={styless.del}/>
                    </div>
                )
            })
            }
            <p style={styless.total}>Total: Ksh {getTotalAmount()}</p>
            <CheckoutModal style={styless.modal}/>
        </div>
    )
}

const styless= {
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
    caat: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '50px',
        color: 'rgb(80, 100, 100)'
    },
    border: {
        height: '1px',
        background: 'rgb(0, 0, 0)',
        width: '80%',
        display: 'flex',
        margin: '0px 0px 0px 120px'
    },
    prod: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '3px solid grey',
        height: '100px',
        margin: '20px 10px 20px 10px',
        borderRadius: '10px'
    },
    picc: {

    },
    namm: {
        paddingTop: '30px',
        fontWeight: '700'
    },
    cash: {
        paddingTop: '30px',
        fontWeight: '700'
    },
    quan: {
        paddingTop: '30px'
    },
    del: {
        margin: '35px'
    },
    total: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '25px',
        margin: '50px',
        fontWeight: '800'
    },
    modal: {
        
    }

}

export default CartDetails