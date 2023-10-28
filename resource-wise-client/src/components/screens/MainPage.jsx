import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainPage() {
	const navigate = useNavigate()

	const redirectRegister = () => {
		navigate("/register")
	}

	const redirectLogin = () => {
		navigate("/login")
	}

	return (
		<div className="w-full h-full bg-bgprimary font-outfit flex justify-center items-center flex-col text-white space-y-12">
			<div className="space-y-2">
				<h1 className="text-6xl font-bold">ResourceWise</h1>
				<h2 className="text-lg">Conecteaza-te cu viitorul, reduce risipa cu noi</h2>
			</div>

			<div className="space-y-2 flex flex-col">
				<button onClick={redirectLogin} className="bg-bgbutton px-6 py-2 rounded-lg text-black">Autentificare</button>
				<span>Nu ai cont? <a onClick={redirectRegister} className="underline cursor-pointer">Inregistreaza-te</a> aici</span>
			</div>
		</div>
	)
}

export default MainPage