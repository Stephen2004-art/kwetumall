import React, {useState, useEffect} from "react";
import publicApi from '../api/publicApi'
import Product from '../components/Product';
import Carousel from "react-bootstrap/Carousel";
import '../App.css';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from "@mui/material";


const Home = () =>{
    const getProducts = async () => {
        const { data } = await publicApi.get('/products')
        console.log(data)
        setProducts(data.data)
    }
    useEffect(()=>{
        getProducts()
    })

    return(
        <div>
            <Container>
                <h2 style={stylee.hed} className="white">Kwetu Mall</h2>
                <div style={stylee.inp}>
                    <input placeholder="Kwetu Mall" style={stylee.boder}/>
                    <SearchIcon style={stylee.icon}/>
                </div>
                <div style={stylee.pic}>
                    <Carousel>
                        <Carousel.Item interval={1000} style={stylee.page}>
                            <img
                            className="d-block w-100"
                            src='Rectangle 52.png'
                            alt="home picture"
                            style={stylee.img}
                            />
                            <Carousel.Caption>
                                <div style={stylee.carr}>
                                    <h4>Items on Sale! </h4>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                {/* <div style={stylee.prod}> */}
                    <div style={stylee.line}>
                        <Product style={stylee.box}/>
                        {/* <Product style={stylee.box}/> */}
                        {/* <Product style={stylee.box}/> */}
                    </div>
                {/* </div> */}
            </Container>
        </div>
    )
}

const stylee= {
    hed: {
        display: 'flex',
        justifyContent: 'center',
        color: 'rgb(200, 150, 100)',
        letterSpacing: '5px'
    },
    inp: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 20px 20px 0px'
    },
    boder: {
        width: '95%',
        borderRadius: '10px',
        borderColor: 'rgb(0, 0, 0)',
        height: '30px'
    },
    icon: {
        marginLeft: '-40px',
        paddingTop: '5px'
    },
    pic: {
        borderRadius: '20px',
        paddingBottom: '50px'
    },
    img: {
       width: '100%',
       borderRadius: '5px' 
    },
    carr: {

    },
    prod: {
        // display: 'flex',
        // justifyContent: 'space-around'
    },
    line: {
        // display: 'block',
        justifyContent: 'space-between',
        // padding: '20px',
        margin: '10px',

    },
    box: {
        // 
        width: '50px',
        
    }
}


export default Home