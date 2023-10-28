import { useEffect, useState } from 'react'
import Post from '../Post'
import { deleteCookie, fetchRequest, getCookie } from '../../utils'
import { useNavigate } from 'react-router-dom'
import PostForm from '../PostForm'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, setDonationCount, setUserName, setUserType } from '../../state/slices/userSlice'
import { USER_TYPE } from '../../constants'
import BookForm from '../BookForm'

function HomePage() {
	const [createPostForm, toggleCreatePostForm] = useState(false)
	const [bookingForm, toggleBookingForm] = useState(false)
	const [bookingProductOwner, setBookingProductOwner] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { type } = useSelector(state => state.user)

	// Permite afisarea paginii numai daca utilizatorul este autentificat
	useEffect(() => {
		const cookies = document.cookie;

		if (cookies.includes("session-id")) {
			(async () => {
				const res = await fetchRequest("/auth/sessions/" + getCookie("session-id"), "GET")

				if (res.status != 200) {
					resetUser()
					navigate("/")
					return
				}

				const body = await res.json()

				dispatch(setUserName(body.user.name))
				dispatch(setUserType(body.user.userType))
				dispatch(setDonationCount(body.user.donations))
			})()
		} else {
			resetUser()
			navigate("/")
		}
	}, [])

	const handleDisconnect = async () => {
		const res = await fetchRequest("/auth/sessions/" + getCookie("session-id"), "DELETE")

		if(res.status == 200) {
			deleteCookie("session-id")
			navigate("/")
		}
	}

	const handleBookingForm = (productOwner) => {
		toggleBookingForm(!bookingForm)
		setBookingProductOwner(productOwner)
	}

	const handleCreatePostForm = () => {
		toggleCreatePostForm(!createPostForm)
	}

	return (
		<div className="w-full h-full text-white font-outfit">
			<nav className="w-full h-[8vmin] bg-bgprimary flex">
				<div className="flex items-center w-1/2 h-full pl-4">
					<h1 className="text-2xl font-bold">ResourceWise</h1>
				</div>

				<div className="flex justify-end w-1/2 h-full">
					{
						type == USER_TYPE.RESTAURANT ? (
							<button className="h-full px-4" onClick={handleCreatePostForm}>Publica anunt</button>
						) : <></>
					}
					<button className="h-full px-4" onClick={handleDisconnect}>Deconectare</button>
				</div>
			</nav>

			{/* Container */}
			<div className="flex justify-center w-full pb-8 space-x-4">
				{/* Posts */}
				<div className="w-1/2 space-y-4 mt-4 min-w-[35em]">
					<Post toggleBookingForm={handleBookingForm} />
					<Post toggleBookingForm={handleBookingForm} />
				</div>

				{
					(createPostForm && !bookingForm) ? (
						<div className="w-1/3 space-y-4 mt-4 min-w-[20em]">
							<PostForm/>
						</div>
					) : <></>
				}

				{
					(!createPostForm && bookingForm) ? (
						<div className="w-1/3 space-y-4 mt-4 min-w-[20em]">
							<BookForm productOwner={bookingProductOwner} />
						</div>
					) : <></>
				}
			</div>
		</div>
	)
}

export default HomePage