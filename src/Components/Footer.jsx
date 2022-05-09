import React from 'react';
import { BsInstagram,BsTwitter,BsFacebook } from "react-icons/bs";

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div  style={{padding:'3%',background:'#2B2273',marginTop:'4%'}}>
                <div className='container-fluid row' style={{margin:'auto'}}>
                    <div className='col-4 d-flex justify-content-end'>
                        <div>
                        <h5 style={{fontWeight:'bold',color:'white'}}>Social Media</h5>
                        <div className='text-center' style={{fontSize:'25px',color:'white'}}>
                            <BsInstagram/>
                            <BsTwitter className='mx-4'/>
                            <BsFacebook/>
                        </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div>
                            <h5 style={{fontWeight:'bold',color:'white'}}>Kantor</h5>
                            <p style={{color:'white'}}>Jl. H. Nawi Raya No.45B, RT.6/RW.10, Gandaria Utara, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12420</p>
                        </div>
                    </div>
                    <div className='col-4'>
                    <div style={{color:'white'}}>
                        <h5 style={{fontWeight:'bold'}}>Kontak Kami</h5>
                        <div className='d-flex'>
                            <p>Telp <br/> <span style={{color:'white'}}>081386727078</span></p>
                            <p className='mx-3'>Email<br/> <span style={{color:'white'}}>pharma@shop.co,</span></p>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
         );
    }
}
 
export default FooterComp;