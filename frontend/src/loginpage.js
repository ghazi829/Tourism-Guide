import React, { useState } from "react";
import Axios from "axios";
import "./loginstyle.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doadd = () => {
        const userdata = { uemail: email, upassword: password };
        console.log("Sending login request");

        Axios.post("http://localhost:3000/login", userdata) // Removed trailing slash
            .then((res) => {
                alert(res.data); // Show server response
                console.log("Record has been added");
            })
            .catch((err) => {
                alert("Error: " + (err.response?.data || err.message));
                console.error("Error adding record:", err);
            });
    };

    return (
        <div class="login-container">
        <h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
        Login to Na<span style={{ color: '#ffd700' }}>Tours</span>
</h2>
        <form>
            {/* <label>Email</label> */}
            <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            {/* <label>Password</label> */}
            <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </form>
            <button onClick={doadd}>LOG IN</button>

        <Link to="/signup" style={{ marginTop: '10px', display: 'block', textAlign: 'center' }}>Create an Account</Link>
        </div>
    );
}