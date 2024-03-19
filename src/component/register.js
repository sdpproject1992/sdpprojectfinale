import '../App.css';
import passwordLogo from "../images/locked.png";
import userLogo from "../images/user.png";
import appLogo from "../images/logo.png"
import { useState } from 'react';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { set, ref } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from './AuthDetails';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    console.log(email)

    const signUp = (e) => {
        e.preventDefault();
        if (!firstname) {
            alert("Enter your first name!");
            return;
        }
        if (!lastname) {
            alert("Enter your last name!");
            return;
        }
        if (!email) {
            alert("Enter an email!");
            return;
        }
        if (!password) {
            alert("Enter a password!");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                window.alert("User Created!")
                const user = userCredential.user
                set(ref(db, 'users/' + user.uid), {
                    fullName: firstname + " " + lastname,
                    fname: firstname,
                    lname: lastname,
                    email: email,
                    id: user.uid
                }).then(() => {
                    window.open('/main', '_self');
                }).catch((error) => {
                    console.error(error);
                    alert("Failed to write user data to Realtime Database!");
                });
            }).catch((error) => {
                console.log(error);
                alert("An error has occurred please retry!")
            });
    }




    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            <div className='' style={{ width: "100%", height: "8%", backgroundColor: "#10074D" }}>
                <img src={appLogo} style={{ height: "40px", width: "auto", marginTop: "18px", marginLeft: "10px" }} />
            </div>

            <div style={{ flex: 1, backgroundColor: '#0A0236', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div className="formBorder" style={{ display: 'flex', flexDirection: 'column', width: "850px", height: "600px", border: "solid", borderColor: "white", borderWidth: "1px", margin: "auto", marginBottom: "80px" }}>


                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={signUp}>

                        <div style={{ textAlign: "left" }}>
                            <h1 style={{ margin: "0px", marginRight: "400px", color: "#8F8F8F", fontFamily: "Bellota Text", marginTop: "10px", fontSize: "1.3em", marginTop: "50px" }}> START FOR FREE </h1>
                        </div>

                        <div style={{ textAlign: "left" }}>
                            <h1 style={{ margin: "0px" }}>
                                <span style={{ color: "white", fontSize: "3.5rem", fontFamily: "Bellota Text" }}>Create new</span>{" "}
                                <span style={{ color: "#0C5CBA", marginRight: "90px", fontSize: "3.5rem", fontFamily: "Bellota Text" }}>account</span>
                            </h1>
                        </div>


                        <div style={{ color: "white", fontFamily: "Bellota Text", marginBottom: "10px", marginRight: "370px" }}>Already A Member?<button type="button" style={{ color: "#0C5CBA", fontFamily: "Bellota Text", fontSize: "1rem", background: "none", border: "none" }} onClick={() => { window.open("/", "_self") }}>Log in</button></div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: "0px" }}>
                            <div className="FirstName" style={{
                                border: "solid",
                                borderColor: "#0C5CBA",
                                backgroundColor: "#0050E3E",
                                width: "calc(50% - 30px)", // Adjusted width for two elements side by side
                                height: "70px",
                                borderRadius: "25px",
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: '0 10px',
                                marginBottom: "20px"
                            }}>
                                <div style={{ flex: 1 }}>
                                    <input className="INPUTFIRSTNAME" style={{ color: "white", width: '100%', border: 'none', background: 'none', outline: 'none', fontFamily: 'Bellota Text', fontSize: '1.5rem', }} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>

                            <div className="LastName" style={{
                                border: "solid",
                                borderColor: "#0C5CBA",
                                backgroundColor: "#0050E3E",
                                width: "calc(50% - 30px)", // Adjusted width for two elements side by side
                                height: "70px",
                                borderRadius: "25px",
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: '0 10px',
                                marginBottom: "20px"
                            }}>
                                <div style={{ flex: 1 }}>
                                    <input className="INPUTLASTNAME" style={{ color: "white", width: '100%', border: 'none', background: 'none', outline: 'none', fontFamily: 'Bellota Text', fontSize: '1.5rem', }} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </div>

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

                        <div className="passwordHolder" style={{
                            border: "solid",
                            borderColor: "#0C5CBA",
                            backgroundColor: "#0050E3E",
                            width: "550px",
                            height: "70px",
                            borderRadius: "25px",
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '0 10px'
                        }}>
                            <div className="LOGOPASSWORD" style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={[passwordLogo]} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <input className="LABELPASSWORD" style={{ color: "white", width: '100%', border: 'none', background: 'none', outline: 'none', fontFamily: 'Bellota Text', fontSize: '1.5rem', }} placeholder="Password" onChange={(e) => setPassword(e.target.value)} ></input>
                            </div>
                        </div>

                        <div className="loginButton">
                            <button className="loginGrad" type="submit" style={{
                                fontFamily: 'Mulish',
                                border: "none"
                            }}> Register </button>
                        </div>

                    </form>

                    <AuthDetails />
                </div>
            </div>
        </div>
    )
}