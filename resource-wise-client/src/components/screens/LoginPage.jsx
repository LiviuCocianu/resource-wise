import { useEffect, useState } from 'react'
import { fetchRequest, setCookie } from '../../utils'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		email: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		email: " ",
		password: " "
	})

	const [topError, setTopError] = useState(" ")

	const handleField = (e) => {
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleFieldError = (name, message) => {
		setErrors(prev => ({
			...prev,
			[name]: message
		}))
	}

	const handleSubmit = async () => {
		setTopError(" ")

		if (Object.values(errors).every(str => str == " ")) {
			try {
				const res = await fetchRequest("/auth/users/", "POST", form)
	
				if (res.status == 200) {
					const body = await res.json()
					setCookie("session-id", body.sessionId, 2)
					navigate("/home")
				} else {
					setTopError("Numele sau parola sunt incorecte")
				}
			} catch(e) {
				setTopError("Autentificare esuata! Incearca mai tarziu")
			}
		} else {
			setTopError("Completeaza campurile!")
		}
	}

	useEffect(() => {
		if (form.email.length > 0 && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			handleFieldError("email", "Formatul este invalid")
		} else {
			handleFieldError("email", " ")
		}
	}, [form.email])

	useEffect(() => {
		if (form.password.length < 6) {
			handleFieldError("password", "Parola trebuie sa aiba minim 6 caractere")
		} else {
			handleFieldError("password", " ")
		}
	}, [form.password])

	return (
		<div className="w-full h-full bg-bgprimary font-outfit flex justify-center items-center flex-col">
			<div className="w-[50vmin] py-6 px-4 bg-white rounded-lg flex flex-col space-y-6">
				<div className="flex flex-col items-center">
					<h1 className="text-xl font-bold">Acceseaza platforma</h1>
					<span className="text-red-400 text-sm">{topError}</span>
				</div>

				<div>
					<div className="flex flex-col space-y-1">
						<label>Email <span className="text-red-400">*</span></label>
						<input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={handleField} name="email" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="email" required placeholder="emailultau@mail.com" />
						<span className="text-red-400 text-sm">{errors.email}</span>
					</div>

					<div className="flex flex-col space-y-1">
						<label>Parola <span className="text-red-400">*</span></label>
						<input minLength={6} onChange={handleField} name="password" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="password" required />
						<span className="text-red-400 text-sm">{errors.password}</span>
					</div>
				</div>

				<button className="bg-bgbutton px-6 py-2 rounded-lg text-black" onClick={handleSubmit}>Autentificare</button>
			</div>
		</div>
	)
}

export default LoginPage