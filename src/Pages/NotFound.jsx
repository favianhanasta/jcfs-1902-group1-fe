import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='container clr-blue' style={{ textAlign: "center", marginTop:200 }}>
                <hr style={{ borderWidth: 15, borderRadius: 10, backgroundColor: "#FFB000" }} />
                <p style={{ fontSize: 70, padding: 100, fontWeight:"bolder" }}>404 PAGE NOT FOUND</p>
                <hr style={{ borderWidth: 15, borderRadius: 10, backgroundColor: "#2B2273" }} />
            </div>
        );
    }
}

export default NotFound;