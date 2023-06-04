import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TopLoadingBar from "react-top-loading-bar";

function Navbar({ name, handlePinModeToggle, pinMode }) {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);

	const logout = () => {
		setProgress(30);

		try {
			localStorage.removeItem("token");
			localStorage.removeItem("name");
			localStorage.removeItem("userID");
			setProgress(100);
			setTimeout(() => {
				navigate("/");
			}, 2500);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='flex flex-row justify-between p-8 shadow-md bg-black font-main sticky z-10'>
			<TopLoadingBar
				color='#fff'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex flex-row gap-8 items-center'>
				<h1 className='font-extrabold text-4xl flex items-center gap-4 text-white'>
					NavigRater
				</h1>
				<h1 className='text-white text-xl'>
					Welcome back <span className='font-bold'>{name}</span>
				</h1>
			</div>
			<div className='flex flex-row gap-7 items-center'>
				<button
					onClick={handlePinModeToggle}
					className=' outline outline-white text-white z-50 px-8 py-2 rounded-md'>
					{pinMode ? "Exit Pin Mode" : "Enter Pin Mode"}
				</button>
				{pinMode ? (
					<p className='duration-150 text-white'>Click anywhere on the map</p>
				) : (
					<p className='duration-150 text-white'>
						Click button or Press 1 to Enter Pin Mode
					</p>
				)}
			</div>
			<div className='flex flex-row'>
				<button
					className='text-black bg-white px-4 rounded-full font-bold'
					onClick={logout}>
					Log out
				</button>
			</div>
		</div>
	);
}

export default Navbar;
