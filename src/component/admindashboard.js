
import React, { useState } from "react";
import AuthDetails from "./AuthDetails";
import appLogo from "../images/logo.png";
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { set, ref } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import SaveItem from "./saveitem";
import { get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useEffect } from "react";
import { child } from "firebase/database";

export default function AdminDashboard() {
    const [userSaves, setUserSaves] = useState()
    console.log(userSaves)
    const [code1, setCode1] = useState('');


    useEffect(() => {
        function getAllUserSaves() {
            const usersRef = ref(db, 'users');
            let allUserSaves = {};

            return get(usersRef).then((snapshot) => {
                const promises = [];
                snapshot.forEach((userSnapshot) => {
                    const userId = userSnapshot.key;
                    const userSavesRef = ref(db, `users/${userId}/saves/`);
                    promises.push(
                        get(userSavesRef).then((savesSnapshot) => {
                            const userSaves = savesSnapshot.val();
                            if (userSaves !== null) {
                                allUserSaves[userId] = userSaves;
                            } else {
                                console.log(`User ${userId} has no saves.`);
                            }
                        }).catch((error) => {
                            console.error(`Error retrieving saves for user ${userId}:`, error);
                        })
                    );
                });
                return Promise.all(promises).then(() => allUserSaves);
            }).catch((error) => {
                console.error('Error retrieving list of users:', error);
            });
        }
        getAllUserSaves().then((data) => setUserSaves(data));
    }, []);


    function getUserEmailFromId(id) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                return (snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }



    if (!userSaves) {
        return <div><h1>LOADING</h1></div>;
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div className='' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: "8%", backgroundColor: "#10074D" }}>
                <div>
                    <img src={appLogo} style={{ height: "40px", width: "auto", marginTop: "15px", marginLeft: "10px" }} alt="App Logo" />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button className="loginGrad" onClick={() => window.open("/main", "_self")}>Dashboard</button>
                    <AuthDetails />
                </div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#0A0236', minHeight: '50vh', display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
                <div style={{ display: "flex", alignItems: "center" }}>


                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ height: "504px", width: "700px", backgroundColor: "white", border: "1px solid #ccc", marginRight: "30px", borderRadius: "10px", verticalAlign: "top" }}>
                                <h2 style={{ margin: "0px", marginLeft: "5px" }}>All Results</h2>
                                <div style={{ display: "flex", flexDirection: "row", color: "black", marginBottom: "10px", marginLeft: "10px", width: "100%" }}>
                                    <label style={{}}>Date</label>
                                    <label style={{ marginLeft: "60px" }}>Complexity</label>
                                    <label style={{ marginLeft: "100px" }}>Rating</label>
                                    <label style={{ marginLeft: "130px" }}>User</label>
                                    <label style={{ marginLeft: "132px" }}>Code</label>
                                </div>
                                <div style={{ width: "1000px", height: "1px", backgroundColor: "black", marginTop: "10px" }}></div>
                                <div style={{ height: "440px", width: "700px", backgroundColor: "transparent", overflowY: "scroll" }}>
                                    <ul style={{ listStyleType: "none", padding: 0, marginTop: "10px" }}>
                                        {Object.entries(userSaves).length === 0 ? (
                                            <div>
                                                <h1 style={{ margin: "0px", textAlign: "center", marginTop: "175px" }}>NO SAVES</h1>
                                            </div>
                                        ) : (
                                            Object.entries(userSaves).map(([userId, userSaves]) => {
                                                const uEmail = getUserEmailFromId(userId)
                                                console.log(uEmail)
                                                return Object.entries(userSaves).map(([taskId, taskData]) => {
                                                    if (taskData.uid && taskData.uid !== auth.currentUser.uid) {
                                                        return null;
                                                    }
                                                    return (
                                                        <div key={taskId} style={{}}>
                                                            <SaveItem
                                                                complexity={taskData.complexity}
                                                                code={taskData.code}
                                                                rating={taskData.rating}
                                                                date={taskData.date}
                                                                name={taskData.email}
                                                            />
                                                        </div>
                                                    );
                                                });
                                            })
                                        )}

                                    </ul>


                                </div>

                            </div>

                            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <textarea id="textArea1" style={{ height: "500px", width: "500px", borderRadius: "10px", verticalAlign: "top" }} placeholder="Enter Code" onChange={(e) => { setCode1(e.target.value) }} value={code1} />
                            </div>
                        </div>
                    </div>







                </div>

            </div>





            <div>

            </div>
        </div>
    )
}