import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const AuthDetails = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });
        return () => {
            listen();
        }

    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign out successful")
        }).catch(error => console.log(error))
    }


    return (
        <div>
            {authUser ? (
                <>
                        <button className= "loginGrad"  style={{}} onClick={() => { userSignOut(); window.open("/", "_self"); }}>Sign Out</button>

                </>
            ) : (
                <p></p>
            )}
        </div>

    )
}


export default AuthDetails