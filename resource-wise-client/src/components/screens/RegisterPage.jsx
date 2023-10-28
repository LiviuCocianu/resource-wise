import { useEffect, useState } from 'react'
import { fetchRequest } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { USER_TYPE } from '../../constants'

function RegisterPage() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		email: "",
		phone: "",
		name: "",
		userType: USER_TYPE.ONG,
		password: "",
		confirmPassword: ""
	})

	const [errors, setErrors] = useState({
		email: " ",
		phone: " ",
		name: " ",
		password: " ",
		confirmPassword: " "
	})

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
		if (Object.values(errors).every(str => str == " ")) {
			const {confirmPassword, ...toSubmit} = form

			const res = await fetchRequest("/api/users/", "POST", toSubmit)

			if(res.status == 200) {
				navigate("/login")
			}
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
		if (form.phone.length > 0 && !form.phone.match(/^(?=0[723][2-8]\d{7})(?!.*(.)\1{2,}).{10}$/)) {
			handleFieldError("phone", "Formatul este invalid")
		} else {
			handleFieldError("phone", " ")
		}
	}, [form.phone])

	useEffect(() => {
		if (form.name.length < 4) {
			handleFieldError("name", "Numele trebuie sa aiba minim 4 caractere")
		} else {
			handleFieldError("name", " ")
		}
	}, [form.name])

	useEffect(() => {
		if (form.password.length < 6) {
			handleFieldError("password", "Parola trebuie sa aiba minim 6 caractere")
		} else {
			handleFieldError("password", " ")
		}
	}, [form.password])

	useEffect(() => {
		if(form.confirmPassword.length > 0 && form.password != form.confirmPassword) {
			handleFieldError("confirmPassword", "Parolele nu sunt identice")
		} else {
			handleFieldError("confirmPassword", " ")
		}
	}, [form.password, form.confirmPassword])

	return (
		<div className="w-full h-full bg-bgprimary font-outfit flex justify-center items-center flex-col">
			<div className="w-[50vmin] py-6 px-4 bg-white rounded-lg flex flex-col space-y-6">
				<h1 className="text-xl font-bold self-center">Creeaza un cont</h1>

				<div>
					<div className="flex flex-col space-y-1">
						<label>Email <span className="text-red-400">*</span></label>
						<input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={handleField} name="email" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="email" required placeholder="emailultau@mail.com" />
						<span className="text-red-400 text-sm">{errors.email}</span>
					</div>

					<div className="flex flex-col space-y-1">
						<label>Numar de telefon <span className="text-red-400">*</span></label>
						<input pattern="^(?=0[723][2-8]\d{7})(?!.*(.)\1{2,}).{10}$" onChange={handleField} name="phone" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="tel" required placeholder="07123456678" />
						<span className="text-red-400 text-sm">{errors.phone}</span>
					</div>

					<div className="flex flex-col space-y-1">
						<label>Nume firma/organizatie <span className="text-red-400">*</span></label>
						<input minLength={4} onChange={handleField} name="name" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="text" required placeholder="La Gigel S.R.L." />
						<span className="text-red-400 text-sm">{errors.name}</span>
					</div>

					<div className="flex flex-col space-y-1 my-2">
						<label>Tip organizatie <span className="text-red-400">*</span></label>

						<div className="flex space-x-4 text-sm">
							<div className="space-x-2">
								<input onChange={handleField} type="radio" name="userType" id="ong" value={USER_TYPE.ONG} checked={form.userType == USER_TYPE.ONG}/>
								<label htmlFor="ong">ONG</label>
							</div>

							<div className="space-x-2">
								<input onChange={handleField} type="radio" name="userType" id="restaurant" value={USER_TYPE.RESTAURANT} checked={form.userType == USER_TYPE.RESTAURANT} />
								<label htmlFor="restaurant">Restaurant</label>
							</div>
						</div>
					</div>

					<div className="flex flex-col space-y-1">
						<label>Parola <span className="text-red-400">*</span></label>
						<input minLength={6} onChange={handleField} name="password" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="password" required />
						<span className="text-red-400 text-sm">{errors.password}</span>
					</div>

					<div className="flex flex-col space-y-1">
						<label>Confirma parola <span className="text-red-400">*</span></label>
						<input minLength={6} onChange={handleField} name="confirmPassword" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="password" required />
						<span className="text-red-400 text-sm">{errors.confirmPassword}</span>
					</div>
				</div>

				<button className="bg-bgbutton px-6 py-2 rounded-lg text-black" onClick={handleSubmit}>Inregistrare</button>
			</div>
		</div>
	)
}

export default RegisterPage