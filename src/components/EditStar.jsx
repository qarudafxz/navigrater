import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ editRate, setEditRate, disabled = false }) => {
	const [hover, setHover] = useState(null);

	return (
		<div className='flex items-center'>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				let color;
				if (!disabled) {
					if (hover) {
						color =
							ratingValue <= (hover || editRate) ? "text-brown" : "text-gray-200";
					} else {
						color =
							ratingValue <= (hover || editRate) ? "text-primary" : "text-gray-200";
					}
				} else {
					color = "text-gray-200 opacity-40";
				}

				return (
					<label
						key={i}
						className='transform transition hover:scale-125 ease-in-out lg:text-2xl'>
						<input
							type='radio'
							name='rating'
							className='hidden'
							value={ratingValue}
							disabled={disabled}
							onClick={() => {
								setEditRate(ratingValue);
							}}
						/>
						<FaStar
							className={
								`${
									!disabled && "active:text-brown"
								}  cursor-pointer transition ease-in-out ` + color
							}
							size='30px'
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default Star;
