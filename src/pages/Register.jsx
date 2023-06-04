import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";

import TopLoadingBar from "react-top-loading-bar";

import { GrMapLocation } from "react-icons/gr";

function Register() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProgress(30);
		if (!name || !email || !password) {
			setError("Please fill in all fields");
			setProgress(100);
			return;
		}

		await fetch(buildUrl("auth/register"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		}).then((res) => {
			if (res.status === 200) {
				setProgress(100);
				setTimeout(() => {
					navigate("/");
				}, 1000);
			} else {
				res.json().then((data) => {
					setError(data.msg);
					setProgress(100);
				});
			}
		});
	};

	return (
		<div className='font-main'>
			<TopLoadingBar
				color='#000'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='mt-40 m-auto w-4/12 shadow-2xl py-10 px-14'>
				<h1 className='flex flex-row gap-4 items-center text-xl'>
					<GrMapLocation /> Navigrater
				</h1>
				<h1 className='text-3xl font-bold'>Register</h1>
				{error && <p className='text-red-500 mt-4'>{error}</p>}
				<form
					className='flex flex-col gap-3'
					onSubmit={handleSubmit}>
					<label
						htmlFor='name'
						className='relative top-6 left-4 bg-white w-24 text-center font-semibold'>
						Full Name
					</label>
					<input
						type='text'
						name='name'
						required
						className={`border-2 border-gray-300 rounded-md p-4 focus:outline-none ${
							error && "border-red-500"
						}`}
						onChange={(e) => setName(e.target.value)}
					/>
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
							error && "border-red-500"
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
						Sign up
					</button>
				</form>
				<p className='text-center mt-4'>
					Already have an account?{" "}
					<Link
						to='/'
						className='font-semibold italic underline'>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
