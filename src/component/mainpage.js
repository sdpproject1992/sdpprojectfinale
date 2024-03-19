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
export default function MainPage() {


    const [showButtons, setShowButtons] = useState(true)
    const [userSaves, setUserSaves] = useState()
    console.log(userSaves)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${user.uid}/saves`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserSaves(snapshot.val());
                    } else {
                        console.log("No data available");
                        setUserSaves([]);
                    }
                }).catch((error) => {
                    console.error(error);
                    setUserSaves([]);
                });
            } else {
                console.log("No user signed in");
                setUserSaves([]);
            }
        });

        return () => unsubscribe();
    }, []);



    const [code1, setCode1] = useState('');
    const [complexity1, setComplexity1] = useState(0);
    const [complexityRating1, setComplexityRating1] = useState('');

    const [code2, setCode2] = useState('');
    const [complexity2, setComplexity2] = useState(0);
    const [complexityRating2, setComplexityRating2] = useState('');



    const [showSecondTextarea, setShowSecondTextarea] = useState(false);

    const handleAddTextarea = () => {
        setShowSecondTextarea(true);
    };
    const handleDeleteTextarea = () => {
        setShowSecondTextarea(false);
    };

    const [showResult1, setShowResult1] = useState(false);
    const handleResult1 = () => {
        setShowResult1(true);
    };

    const [ShowResult2, setShowResult2] = useState(false);
    const hadleResult2 = () => {
        setShowResult2(true);
    };

    function calculateComplexity() {
        const calculatedComplexity = calculateCyclomaticComplexity(code1);
        setComplexity1(calculatedComplexity);
    }

    function calculateComplexity2() {
        const calculatedComplexity = calculateCyclomaticComplexity(code2);
        setComplexity2(calculatedComplexity);
    }

    function calculateCyclomaticComplexity(code) {
        const lines = code.trim().split('\n');

        let complexity = 1;

        lines.forEach(line => {
            const logicalOperators = (line.match(/(&&|\|\|)/g) || []).length;
            const conditionals = (line.match(/if|else if|switch|case/g) || []).length;
            const loops = (line.match(/for|while|do while/g) || []).length;

            complexity += logicalOperators + conditionals + loops;
        });
        return complexity;
    }

    function saveToFirebase(id) {
        const user = auth.currentUser.uid;
        let complexityRating;
        let code;
        let complexity;

        let currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear() % 100;
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        let formattedDate = day + '/' + month + '/' + year;


        if (id === 1) {
            complexityRating = rateCyclomaticComplexity(complexity1);
            code = code1
            complexity = complexity1
        } else if (id === 2) {
            complexityRating = rateCyclomaticComplexity(complexity2);
            code = code2
            complexity = complexity2
        } else {
            console.error("Invalid id:", id);
            return;
        }
        const saveId = uuidv4();
        set(ref(db, `users/${user}/saves/${saveId}`), {

            rating: complexityRating,
            code: code,
            complexity: complexity,
            date: formattedDate
        }).then(() => {
            alert("Successfull!")
        }).catch((error) => {
            console.error(error);
            alert("Error!");
        });
    }

    function rateCyclomaticComplexity(complexity) {
        if (complexity >= 1 && complexity <= 10) {
            return "Very Good";
        } else if (complexity >= 11 && complexity <= 20) {
            return "Good";
        } else if (complexity >= 21 && complexity <= 50) {
            return "Medium";
        } else if (complexity > 50) {
            return "Poor";
        } else {
            return "Very Poor";
        }
    }

    function calculateNumberOfLines(code) {
        if (typeof code === 'string') {
            const lines = code.split('\n');
            return lines.length;
        } else {
            return 0;
        }
    }

    function getUserSaves() {
        const user = auth.currentUser.uid;
        get(ref(db, `users/${user}/saves/`)).then((snapshot) => {
            const userSaves = snapshot.val();
            setUserSaves(userSaves)
        }).catch((error) => {
            console.error(error);
            alert("Error occurred while retrieving user saves!");
        });
    }

    if (!userSaves) {
        return (
            <div><h1>LOADING</h1></div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div className='' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: "8%", backgroundColor: "#10074D" }}>
                <div>
                    <img src={appLogo} style={{ height: "40px", width: "auto", marginTop: "15px", marginLeft: "10px" }} alt="App Logo" />
                </div>
                <div>
                    <AuthDetails />
                </div>
            </div>

            <div style={{ flex: 1, backgroundColor: '#0A0236', minHeight: '50vh', display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {showResult1 && (
                        <div style={{ position: 'relative', zIndex: '0', height: "500px", width: "500px", borderRadius: "10px", verticalAlign: "top", background: "#161D40", border: "solid", color: "white", display: "flex", flexDirection: "column", padding: "10px" }}>
                            <label style={{ textAlign: "center", marginBottom: "20px", fontSize: "3rem" }}> RESULTS </label>
                            <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Cyclomatic Complexity: {complexity1}</label>
                            <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Rating: {rateCyclomaticComplexity(complexity1)}</label>
                            <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Number Of Nodes: </label>
                            <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Number Of Edges: </label>
                            <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Code Length: {calculateNumberOfLines(code1)} lines</label>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                <button style={{ marginTop: "50px", width: "55px", height: "30px" }} onClick={() => { setShowResult1(false); setShowButtons(true)}}> BACK </button>
                                <button
                                    id="code1"
                                    style={{ marginTop: "50px", marginLeft: "10px", width: "55px", height: "30px" }}
                                    onClick={() => { saveToFirebase(1) }}>
                                    SAVE
                                </button>
                            </div>
                        </div>
                    )}
                    {!showResult1 && (
                        <div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ height: "504px", width: "500px", backgroundColor: "white", border: "1px solid #ccc", marginRight: "30px", borderRadius: "10px", verticalAlign: "top" }}>
                                    <h2 style={{ margin: "0px", marginLeft: "5px" }}>Previous Results</h2>
                                    <div style={{ display: "flex", color: "black", }}>
                                        <label style={{ marginLeft: "15px" }}>Date</label>
                                        <label style={{ marginLeft: "70px" }}>Complexity</label>
                                        <label style={{ marginLeft: "57px" }}>Rating</label>
                                        <label style={{ marginLeft: "120px" }}>Code </label>
                                    </div>
                                    <div style={{width:"1000px", height:"1px", backgroundColor:"black", marginTop:"10px"}}></div>
                                    <div style={{ height: "440px", width: "500px", backgroundColor: "transparent", overflowY: "scroll" }}>
                                        <ul style={{ listStyleType: "none", padding: 0, marginTop: "10px" }}>
                                            {Object.entries(userSaves).length === 0 ? (
                                                <div>
                                                    <h1 style={{margin:"0px", textAlign:"center", marginTop:"175px"}}>NO SAVES</h1>
                                                </div>
                                            ) : (
                                                Object.entries(userSaves).map(([taskId, taskData]) => {
                                                    if (taskData.uid && taskData.uid !== auth.currentUser.uid) {
                                                        return null;
                                                    }
                                                    const taskName = taskId;
                                                    return (
                                                        <div key={taskId}>
                                                            <SaveItem
                                                                complexity={taskData.complexity}
                                                                code={taskData.code}
                                                                rating={taskData.rating}
                                                                date={taskData.date}
                                                            />
                                                        </div>
                                                    );
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



                    )}
                    {!showSecondTextarea && (
                        <div style={{ marginLeft: "20px", width: "40px", height: "40px", border: "solid", borderRadius: "50px", borderWidth: "2px", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "transparent", border: "none", color: "white", fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleAddTextarea}>+</button>
                        </div>
                    )}
                    {showSecondTextarea && (
                        <div>
                            {showResult1 && (
                                <div style={{ position: 'relative', zIndex: '0', height: "500px", width: "500px", borderRadius: "10px", verticalAlign: "top", background: "#161D40", border: "solid", color: "white", display: "flex", flexDirection: "column", padding: "10px" }}>
                                    <label style={{ textAlign: "center", marginBottom: "20px", fontSize: "3rem" }}> RESULTS </label>
                                    <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Cyclomatic Complexity: {complexity2}</label>
                                    <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Rating: {rateCyclomaticComplexity(complexity2)}</label>
                                    <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Number Of Nodes: </label>
                                    <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Number Of Edges: </label>
                                    <label style={{ marginBottom: "30px", fontSize: "1.5rem" }}> Code Length: {calculateNumberOfLines(code2)} lines </label>

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <button style={{ marginTop: "50px", width: "55px", height: "30px" }} onClick={() => { setShowResult1(false); setShowButtons(true) }}> BACK </button>
                                        <button id="code2" style={{ marginTop: "50px", marginLeft: "10px", width: "55px", height: "30px" }} onClick={() => { alert("Not Implemented Yet!") }}> SAVE </button>
                                    </div>
                                </div>
                            )}
                            {!showResult1 && (
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <textarea id="textArea2" style={{ marginLeft: "30px", height: "500px", width: "500px", borderRadius: "10px", verticalAlign: "top" }} onChange={(e) => { setCode2(e.target.value) }} placeholder="Enter Code" ></textarea>
                                    </div>
                                    <div style={{ marginLeft: "20px", width: "40px", height: "40px", border: "solid", borderRadius: "50px", borderWidth: "2px", color: "red", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <button style={{ width: "40px", height: "40px", borderRadius: "50px", backgroundColor: "transparent", border: "none", color: "red", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center", }} onClick={handleDeleteTextarea}>-</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <div style={{ marginTop: "10px" }}>
                    {!showSecondTextarea && showButtons && (
                        <button className="loginGrad"
                            type='submit'
                            style={{
                                fontFamily: 'Mulish',
                                border: "none",
                                marginLeft: "470px"
                            }}
                            onClick={() => { setShowResult1(true); calculateComplexity(); setShowButtons(false) }}

                        > Calculate </button>
                    )}
                    {showSecondTextarea && showButtons && (
                        <button className="loginGrad"
                            type='submit'
                            style={{
                                fontFamily: 'Mulish',
                                border: "none",
                                marginLeft: "470px"

                            }}
                            onClick={() => { setShowResult1(true); calculateComplexity(); setShowResult2(true); calculateComplexity2(); setShowButtons(false); }}

                        > Compare </button>
                    )}
                </div>
            </div>





            <div>

            </div>
        </div>
    );
}
