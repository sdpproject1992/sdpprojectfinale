import '../App.css';
import passwordLogo from "../images/locked.png";
import userLogo from "../images/user.png";
import appLogo from "../images/logo.png"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebaseConfig/firebaseConfig';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        window.alert("Logged in successfully!")
        window.open('/main', '_self');
      }).catch((error) => {
        console.log(error);
        window.alert("Incorrect login!")
      });
  }



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <div className='TOP BAR' style={{ width: "100%", height: "8%", backgroundColor: "#10074D" }}>   </div>

      <div style={{ flex: 1, backgroundColor: '#0A0236', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div className="formBorder" style={{ display: 'flex', flexDirection: 'column', width: "850px", height: "600px", border: "solid", borderColor: "white", borderWidth: "1px", margin: "auto", marginBottom: "150px" }}>


          <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={signIn}>
            <img src={appLogo} style={{ height: "80px", width: "auto", marginTop: "75px", marginBottom: "50px" }} />

            <div style={{ color: "white", fontFamily: "Bellota Text", marginBottom: "2px", marginRight: "325px" }}>
              Don't have an account?
              <button type="button" style={{ color: "#0C5CBA", fontFamily: "Bellota Text", fontSize: "1rem", background: "none", border: "none" }} onClick={() => { window.open("/register", "_self") }}>Register</button>
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
                <input className="LABELPASSWORD" style={{ color: "white", width: '100%', border: 'none', background: 'none', outline: 'none', fontFamily: 'Bellota Text', fontSize: '1.5rem', }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
              </div>
            </div>

            <div className="forgotPassword" style={{ marginTop: "1px", marginLeft: "440px" }}>
              <button type="button" style={{ color: "white", fontStyle: "italic", border: "none", background: "none" }} onClick={() => { window.open("/forgotpassword", "_self") }}> Forgot Password? </button>
            </div>

            <div className="loginButton">
              <button className="loginGrad"
                type='submit'
                style={{
                  fontFamily: 'Mulish',
                  border: "none"
                }}> LOGIN </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}