import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/wallpaper.jpg";
import { buildUrl } from "../utils/buildUrl.js";

import TopLoadingBar from "react-top-loading-bar";

import { GrMapLocation } from "react-icons/gr";
function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		setProgress(30);

		if (!email || !password) {
			setProgress(100);
			setError("Please fill in all fields");
			return;
		}

		await fetch(buildUrl("auth/login"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					console.log(data);
					localStorage.setItem("token", data.token);
					localStorage.setItem("name", data.user.name);
					localStorage.setItem("userID", data.user._id);
					setProgress(100);
					setTimeout(() => {
						navigate("/map");
					}, 1000);
				});
			} else {
				setProgress(100);
				res.json().then((data) => {
					setError(data.msg);
				});
			}
		});
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}, [error]);

	return (
		<div className='font-main flex flex-row'>
			<TopLoadingBar
				color='#000'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<img
				src={Bg}
				className='object-cover	h-screen w-7/12'
			/>
			<div className='w-6/12 flex flex-col gap-4 py-10 px-24 bg-[#f5f4f7]'>
				<div className='bg-white p-10 rounded-lg m-auto shadow-2xl'>
					<div className='mt-4'>
						<h1 className='font-extrabold text-6xl flex items-center gap-8'>
							<GrMapLocation />
							Navigrater
						</h1>
						<p className='w-11/12 mt-2'>
							Pin your favorite location and provide a rating with a little comment
							about it!
						</p>
					</div>
					{error && <p className='text-red-500 mt-8'>{error}</p>}
					<form
						className='flex flex-col gap-3 mt-4'
						onSubmit={handleSubmit}>
						<label
							htmlFor='email'
							className='relative top-6 left-4 bg-white w-16 text-center font-semibold'>
							Email
						</label>
						<input
							type='email'
							name='email'
							required
							className={`border-2 border-gray-300 rounded-md p-4 focus:outline-none ${
								error === "User does not exist" && "border-red-500"
							}`}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label
							htmlFor='password'
							className='relative top-6 left-4 bg-white w-24 text-center font-semibold'>
							Password
						</label>
						<input
							type='password'
							name='password'
							required
							className={`border-2 border-gray-300 rounded-md p-4 focus:outline-none ${
								error === "Incorrect password" && "border-red-500"
							}`}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type='submit'
							className='bg-[#6e737b] py-3 rounded-md font-bold text-white mt-14 hover:bg-black duration-150'>
							Log in
						</button>
					</form>
					<p className='text-center mt-4'>
						Don't have an account yet?{" "}
						<Link
							to='/register'
							className='font-semibold italic underline'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
