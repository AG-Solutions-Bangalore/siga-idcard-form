import React from "react";
import { useParams } from 'react-router-dom';


const Thankyou = () => {
    let { id } = useParams();
    
    return (
        <>
            <div className="container-fluid">
                <div className="forms-container">
                    <div className="signin-signups">
                        <form action="#" id="addIndiv" className="sign-in-form">
                            <h2 className="titles"><span style={{fontSize:'2rem'}}>Thank you</span>, <br/>
                                <br/>Your details submitted successfully 
                                <br/> & we sent a copy of your details 
                                <br/> to your email id
                                <br/> if any changes required please call 
                                <br/> @ <a href="tel:8867171060" style={{textDecoration:'none', color:'#c4513c'}}>8867171060</a>.</h2>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <img src="https://southindiagarmentsassociation.com/assets/images/bg-heading-web29.png" className="image" alt="" />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Thankyou;