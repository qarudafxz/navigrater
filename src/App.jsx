import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/home/Map";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/map'
					element={<Map />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
