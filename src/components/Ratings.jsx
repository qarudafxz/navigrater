import React from "react";
import { MdOutlineLocationSearching } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

function Ratings({ ratings }) {
	return (
		<div className='absolute top-40 left-4 p-4 backdrop-blur-lg text-white'>
			<h1 className='font-bold text-2xl text-white mb-4'>Rated Locations</h1>
			{ratings.map((rating) => {
				return (
					<div className='flex flex-row justify-between gap-10'>
						<h1 className='flex flex-row gap-2 items-center'>
							<MdOutlineLocationSearching />
							{rating.name}
						</h1>
						<h1 className='flex flex-row gap-2 items-center'>
							<AiFillStar /> {rating.rating}
						</h1>
					</div>
				);
			})}
		</div>
	);
}

export default Ratings;
