import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { USER_RANKS, USER_TYPE } from '../constants'
import { calculateRank, convertToRoman } from '../utils'

import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet'
import DeleteIcon from '../assets/icons/DeleteIcon'
import PhoneIcon from '../assets/icons/PhoneIcon'
import ProductTable from './ProductTable'
import { useSelector } from 'react-redux'

const markerIcon = new Icon({
	iconUrl: "../images/marker.svg",
	iconSize: [38, 38]
})

const dateDummy = new Date()
dateDummy.setDate(dateDummy.getDate() + 2)

function Post({
	toggleBookingForm,
	ownerId=1,
	name="La Gigel S.R.L.", 
	donations=11,
	products=[{
		name: "Happy Meal",
		quantity: 3,
		expiresAt: new Date().toDateString()
	},
	{
		name: "Carne vita",
		quantity: 1,
		expiresAt: dateDummy.toDateString()
	}],
	coords=[44.447907739838676, 26.09889528465695],
	description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at venenatis lorem. Nulla metus metus, ultrices vel elit in, lacinia lobortis mauris. Pellentesque dapibus ultrices varius. Donec risus nunc, venenatis id fermentum eu, blandit quis ex. Ut massa dolor, maximus non ultricies vel, blandit sit amet tellus. Mauris sodales magna ac auctor facilisis. Etiam arcu felis, maximus in commodo sed, malesuada vitae quam. Vivamus orci nibh, faucibus et dolor laoreet, hendrerit bibendum ligula.Sed sed nunc euismod, pharetra est eget, imperdiet urna.Vivamus pretium sodales placerat.Praesent massa massa, luctus at dui ut, vestibulum aliquet urna.Nulla mollis aliquam mauris."
}) {
	const { id, type } = useSelector(state => state.user)

	const handlePostBooking = () => {
		if (toggleBookingForm) {
			toggleBookingForm(name)
		}
	}

	const handlePostDelete = () => {

	}

	return (
		<div className="w-full text-black border border-gray-200 rounded-lg">
			{/* Header */}
			<div className="w-full h-2 rounded-t-lg bg-bgbanner"/>
			<div className="flex items-center justify-between p-4 text-bgprimary">
				<h1 className="font-bold drop-shadow-lg">{name}</h1>
				<h2 className={`text-sm${donations > 11 ? " text-red-600 font-bold" : " text-bgprimary"}`}>{calculateRank(donations)}</h2>
			</div>

			{/* Body */}
			<div>
				<div className="px-4 py-2 text-sm text-gray-500">
					Oferim urmatoarele produse:
				</div>

				{/* Table */}
				<ProductTable className="w-[calc(100%-4vmin)] ml-4" products={products}/>

				<div className="px-4 py-2 text-sm text-gray-500">Ne puteti gasi la aceasta adresa:</div>

				<MapContainer center={coords} zoom={16}>
					<TileLayer
						url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>

					<Marker position={coords} icon={markerIcon}></Marker>
				</MapContainer>

				<div className="p-4 text-sm text-justify text-gray-500">{description}</div>
			</div>

			<div className="flex items-center justify-end w-full h-10 px-4 space-x-4 rounded-b-lg bg-bgbanner">
				{
					type == USER_TYPE.ONG ? (
						<span className="relative group">
							<PhoneIcon className="w-6 cursor-pointer fill-white" onClick={handlePostBooking} />
							<div className="absolute invisible w-32 p-1 text-sm bg-white border border-gray-300 shadow-lg -top-8 group-hover:visible">Rezerva produsele</div>
						</span>
					) : <></>
				}

				{
					ownerId == id ? (
						<span className="relative group">
							<DeleteIcon className="w-6 cursor-pointer fill-white" onClick={handlePostDelete}/>
							<div className="absolute invisible w-32 p-1 text-sm bg-white border border-gray-300 shadow-lg -top-8 group-hover:visible">Sterge postarea</div>
						</span>
					) : <></>
				}
			</div>
		</div>
	)
}

export default Post