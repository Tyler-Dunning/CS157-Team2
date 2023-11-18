// Filename - App.js

import "./App.css";
// importing components from react-router-dom package
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

// import Home component
import Login from "./components/Login";
// import About component
import Home from "./components/Home";

import FriendMessages from "./components/FriendMessages";

import CreateAccount from "./components/CreateAccount";
function App() {
	return (
		<>
			{/* This is the alias of BrowserRouter i.e. Router */}
			<Router>
				<Routes>
					{/* This route is for home component 
		with exact path "/", in component props 
		we passes the imported component*/}
					<Route
						exact
						path="/"
						element={<Login />}
					/>


					{/* This route is for contactus component
		with exact path "/contactus", in 
		component props we passes the imported component*/}
					<Route
						path="/home"
						element={<Home />}
					/>

					<Route
						path="/createAccount"
						element={<CreateAccount />}
					/>
					<Route
						path="/friendMessages"
						element={<FriendMessages />}
					/>
					{/* If any route mismatches the upper 
		route endpoints then, redirect triggers 
		and redirects app to home component with to="/" */}
					{/* <Redirect to="/" /> */}
					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
