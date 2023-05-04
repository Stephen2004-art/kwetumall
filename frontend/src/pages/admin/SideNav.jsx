import React from 'react';


const SideNav = () => {
    return(
        <div style={styles.sideNav}>
        <h3 style={styles.heading}>Kwetu Mall</h3>
        <a href="/add/product" style={styles.btn}>Add products</a>
        <a href="/categories" style={styles.btn}>Categories</a>
        {/* <button style={styles.btn}>Add products</button> */}
    </div>
  )
}
const styles = {
    sideNav: {
        height: '100vh',
        background: '#000',
        width: '200px',
        position: 'fixed',
        borderRadius: '0 10px 0 0'
    },
    btn: {
        border: 'none',
        background: 'none',
        color: '#fff',
        fontWeight: 700,
        width: '100%',
        paddingTop: '20px',
        display: 'block'
    },
    heading: {
        color: '#fff',
        textAlign: 'center'
    }
}

export default SideNav