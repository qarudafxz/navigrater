import React from "react";

function Instructions() {
	return (
		<div className='font-main relative flex flex-row gap-4 place-items-center justify-center'>
			<h1 className='text-center py-2 text-white'>
				Use scroll to zoom in/zoom out
			</h1>
			<div className='flex gap-4'>
				<div className='bg-green-500 w-6 h-auto'>ㅤ</div>
				<h1 className='font-bold text-white'>Your ratings</h1>
				<div className='bg-blue-500 w-6 h-auto'>ㅤ</div>
				<h1 className='font-bold text-white'>Other people's ratings</h1>
			</div>
		</div>
	);
}

export default Instructions;
