import React from 'react';
import logo from '../assets/pharma.png';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='container text-center clr-blue' style={{ marginTop: "200px" }}>

                <hr className='bdr-radius10' style={{ borderWidth: 10, backgroundColor:"#2B2273" }} />
                <img src={logo} alt="..." />
                <hr className='bdr-radius10' style={{ borderWidth: 10, backgroundColor:"#FFB000" }} />
            </div>
        );
    }
}

export default HomePage;



