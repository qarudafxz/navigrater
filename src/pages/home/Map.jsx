import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../../helpers/getToken.js";
import { getName } from "../../helpers/getName.js";
import { getUserID } from "../../helpers/getUserID.js";
import { buildUrl } from "../../utils/buildUrl.js";

import Instructions from "../../components/Instructions.jsx";
import Star from "../../components/Star.jsx";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar.jsx";
import Ratings from "../../components/Ratings.jsx";

function Map() {
	const icon = new L.Icon({
		iconUrl:
			"https://static.vecteezy.com/system/resources/previews/022/102/114/original/red-pin-map-location-heart-png.png",
		iconAnchor: null,
		iconSize: new L.Point(40, 60),
	});

	const rateIcon = new L.Icon({
		iconUrl:
			"https://images.vexels.com/media/users/3/141915/isolated/preview/fa18fbc911311b5371870c880fa5f75a-location-pin.png",
		iconAnchor: null,
		iconSize: new L.Point(60, 60),
	});

	const myRateIcon = new L.Icon({
		iconUrl:
			"https://static.vecteezy.com/system/resources/previews/009/385/892/original/pin-location-icon-sign-free-png.png",
		iconAnchor: null,
		iconSize: new L.Point(40, 50),
	});

	const userID = getUserID();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [locationInfo, setLocationInfo] = useState([]);

	const [pinMode, setPinMode] = useState(false);
	//butuan
	const center = [8.947093281680594, 125.5426187733828];
	const name = getName();
	const navigate = useNavigate();
	const token = getToken();

	const [ratings, getRatings] = useState([]);
	const [myRatings, getMyRatings] = useState([]);

	const handlePinModeToggle = () => {
		setPinMode(!pinMode);
	};

	const fetchRatings = async () => {
		await fetch(buildUrl(`rate/get-rates/`), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				data.forEach((dat) => {
					dat.location.forEach((loc) => {
						getRatings((prevRatings) => [
							...prevRatings,
							{
								id: dat._id,
								owner: dat.owner,
								raterName: loc.raterName,
								name: loc.name,
								lat: loc.lat,
								lng: loc.lng,
								rating: loc.rating,
								comment: loc.comment,
							},
						]);
					});
				});
			});
	};

	const fetchMyRatings = async () => {
		await fetch(buildUrl(`rate/get-rates/${userID}`), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				data.forEach((dat) => {
					dat.location.forEach((loc) => {
						getMyRatings((prevRatings) => [
							...prevRatings,
							{
								owner: dat.owner,
								name: loc.name,
								lat: loc.lat,
								lng: loc.lng,
								rating: loc.rating,
								comment: loc.comment,
							},
						]);
					});
				});
			});
		console.log(myRatings);
	};

	const handleMapClick = async (e) => {
		if (pinMode) {
			const { lat, lng } = e.latlng;
			try {
				const response = await fetch(
					`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=730ba2fdcc7d41909b77c5e802b6d7e7`
				);
				if (response.ok) {
					const data = await response.json();
					const locationName = data.results[0].formatted;
					setLocationInfo((prevLocationInfo) => [
						...prevLocationInfo,
						{
							name: locationName,
							lat,
							lng,
						},
					]);
				} else {
					// Handle API error
					console.error("Failed to fetch location name from the API");
				}
			} catch (error) {
				// Handle network error
				console.error("Failed to fetch location name", error);
			}
		}
	};

	const addRating = async (e) => {
		e.preventDefault();
		await fetch(buildUrl("rate/"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				owner: userID,
				location: {
					raterName: name,
					name: locationInfo[locationInfo.length - 1].name,
					lat: locationInfo[locationInfo.length - 1].lat,
					lng: locationInfo[locationInfo.length - 1].lng,
					rating,
					comment,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				getRatings((prevRatings) => [
					...prevRatings,
					{
						name: locationInfo[locationInfo.length - 1].name,
						lat: locationInfo[locationInfo.length - 1].lat,
						lng: locationInfo[locationInfo.length - 1].lng,
						rating,
						comment,
					},
				]);
				toast("Rate added!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "light",
					type: "success",
				});
			});
	};

	const deleteRate = async (location) => {
		try {
			await fetch(buildUrl(`rate/delete/${location}`), {
				method: "DELETE",
				headers: {
					Authentication: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.ok) {
					getRatings((prevRatings) =>
						prevRatings.filter((rating) => rating.id !== location)
					);
					toast("Rate deleted!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
						theme: "light",
						type: "success",
					});
				}
			});
		} catch (err) {
			console.error(err);
			console.log(err);
		}
	};

	const removePin = (e, index) => {
		e.preventDefault;
		const newLocationInfo = [...locationInfo];
		newLocationInfo.splice(index, 1);
		setLocationInfo(newLocationInfo);
	};

	function MapClickHandler() {
		useMapEvents({
			click: handleMapClick,
		});
		return null;
	}

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		fetchRatings();
		fetchMyRatings();
	}, []);

	useEffect(() => {
		const triggerPinMode = (e) => {
			if (e.key === "1") {
				setPinMode(!pinMode);
			}
		};

		window.addEventListener("keydown", triggerPinMode);

		return () => {
			window.removeEventListener("keydown", triggerPinMode);
		};
	});

	return (
		<div className='flex flex-col overflow-hidden'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<Navbar
				name={name}
				handlePinModeToggle={handlePinModeToggle}
				pinMode={pinMode}
			/>
			<Instructions />
			<Ratings ratings={myRatings} />
			<MapContainer
				center={center}
				zoom={11}
				setMinZoom={11}
				setMaxZoom={18}
				style={{
					width: "100vw",
					height: "100vh",
					cursor: pinMode ? "pointer" : "default !important",
				}}
				className='absolute -z-10'
				scrollWheelZoom={true}>
				<TileLayer
					url='https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=8QSiXxwJjBuySKIAaifQ'
					attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'></TileLayer>
				{locationInfo?.map((location, index) => (
					<Marker
						key={index}
						position={[location.lat, location.lng]}
						icon={icon}>
						<Popup>
							<div>
								<h1 className='text-lg font-bold'>{location.name}</h1>
								<form onSubmit={addRating}>
									<div className='flex justify-between'>
										<p className='font-bold'>Rating: </p>
										<Star
											rating={rating}
											setRating={setRating}
										/>
									</div>
									<textarea
										placeholder='Comment'
										value={location.comment}
										onChange={(e) => setComment(e.target.value)}
										className='border-2 border-black rounded-md p-2 my-2 w-full'
									/>
									<button
										type='submit'
										className='bg-black text-white rounded-md p-2 my-2 w-full'>
										Submit
									</button>
								</form>
								<button
									onClick={(e) => removePin(e, index)}
									className='bg-black text-white rounded-md p-2 my-2 w-full'>
									Delete Pin
								</button>
							</div>
						</Popup>
					</Marker>
				))}
				{ratings?.map((location, index) => (
					<Marker
						key={index}
						icon={location.owner === userID ? myRateIcon : rateIcon}
						position={[location.lat, location.lng]}>
						<Popup>
							<div>
								<h1 className='text-lg font-bold'>{location.name}</h1>
								<h1 className='font-semibold my-2 bg-black text-white text-center py-2 rounded-md'>
									Rated By: {location?.raterName}
								</h1>
								<div className='flex flex-row gap-4'>
									<h1 className='font-extrabold'>{location.rating}</h1>
									<div>
										{(() => {
											const stars = [];
											const rating = Math.floor(location.rating);

											for (let i = 0; i < rating; i++) {
												stars.push(<FaStar key={i} />);
											}

											for (let i = rating; i < 5; i++) {
												stars.push(<AiOutlineStar key={i} />);
											}

											return (
												<div className='flex'>
													{stars.map((star, index) => (
														<span
															className='text-sm'
															key={index}>
															{star}
														</span>
													))}
												</div>
											);
										})()}
									</div>
								</div>
								<p className='font-semibold'>Comment</p>
								<h1 className='text-sm font-thin border border-black py-2 pl-2 rounded-md'>
									{location.comment}
								</h1>
								{location.owner === userID && (
									<button
										onClick={() => {
											deleteRate(location.id);
										}}
										className='bg-black rounded-md text-white font-bold w-full py-2 mt-4'>
										Delete my rate
									</button>
								)}
							</div>
						</Popup>
					</Marker>
				))}

				<MapClickHandler />
			</MapContainer>
		</div>
	);
}

export default Map;
