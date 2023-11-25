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

import Courts from "./components/Courts";

import CourtView from "./components/CourtView";

import Groups from "./components/Groups";

import CreateGroup from "./components/CreateGroup";

import ViewGroup from "./components/ViewGroup";

import Events from "./components/Events";

import CreateEvent from "./components/CreateEvent";

import ViewEvent from "./components/ViewEvent";

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
					<Route
						path="/courts"
						element={<Courts />}
					/>
					<Route
						path="/courtView"
						element={<CourtView />}
					/>
					<Route
						path="/groups"
						element={<Groups />}
					/>
					<Route
						path="/createGroup"
						element={<CreateGroup />}
					/>
					<Route
						path="/viewGroup"
						element={<ViewGroup />}
					/>
					<Route
						path="/events"
						element={<Events />}
					/>
					<Route
						path="/createEvent"
						element={<CreateEvent />}
					/>
					<Route
						path="/viewEvent"
						element={<ViewEvent />}
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
