import { useState } from "react";
import userLogo from "../images/user.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";
export default function ForgotPass() {

    const [email, setEmail] = useState('');

    console.log(email)

    const handleReset = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email).then(data => {
            alert("A link will be sent if you are registered!")
            window.open("/", "_self")
        }).catch(err => {
            alert("Invalid Email!")
        })
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            <div className='' style={{ width: "100%", height: "8%", backgroundColor: "#10074D" }}> TEST </div>

            <div style={{ flex: 1, backgroundColor: '#0A0236', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div className="formBorder" style={{ display: 'flex', flexDirection: 'column', width: "850px", height: "600px", border: "solid", borderColor: "white", borderWidth: "1px", margin: "auto", marginBottom: "80px" }}>

                    <h1 style={{ color: "white", fontSize: "5rem", fontFamily: "Bellota Text", textAlign: "center", margin: "0px", marginTop: "80px" }}> RESET PASSWORD </h1>
                    <label style={{ margin: "0px", color: "white", fontSize: "1.4rem", fontFamily: "Bellota Text", textAlign: "center", fontStyle: "italic", marginBottom: "20px" }}> Enter the email you registered with. </label>

                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleReset} >

                        <div className="userNameHolder" style={{
                            border: "solid",
                            borderColor: "#0C5CBA",
                            backgroundColor: "#0050E3E",
                            width: "550px",
                            height: "70px",
                            borderRadius: "25px",
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '0 10px',
                            marginBottom: "20px"

                        }}>
                            <div className="LOGOPASSWORD" style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={userLogo} style={{ maxWidth: "100%", maxHeight: "100%" }} />

                            </div>
                            <div style={{ flex: 1 }}>
                                <input className="LABELPASSWORD" style={{ color: "white", width: '100%', border: 'none', background: 'none', outline: 'none', fontFamily: 'Bellota Text', fontSize: '1.5rem', }} placeholder="Email " value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                            </div>


                        </div>


                        <div className="loginButton">
                            <button className="loginGrad"
                                type='submit'
                                style={{
                                    fontFamily: 'Mulish',
                                    border: "none",
                                    margin:"0px",
                                    marginTop:"25px"
                                }}> RESET </button>
                        </div>

                        <div className="backToHome">
                            <button className="loginGrad"
                                type='button'
                                onClick={(e) => window.open("/", "_self")}
                                style={{
                                    fontFamily: 'Mulish',
                                    border: "none",
                                    margin:"0px",
                                    width: "150px",
                                    marginTop:"10px"
                                }}> BACK </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}