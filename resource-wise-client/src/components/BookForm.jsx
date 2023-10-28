import { useEffect, useState } from "react"
import ProductTable from "./ProductTable"
import ProductCreator from "./ProductCreator"

function BookForm({ productOwner="Lorem Ipsum" }) {
	const [form, setForm] = useState({
		address: "",
		details: ""
	})

	const [errors, setErrors] = useState({
		address: ""
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

	const handleSubmit = () => {
		if (Object.values(errors).every(str => str.length == 0)) {
			
		}
	}

	useEffect(() => {
		if (form.address.length == 0) {
			handleFieldError("address", "Adresa este obligatorie")
		} else {
			handleFieldError("address", "")
		}
	}, [form.address])

	return (
		<div className="w-full text-black p-4 space-y-4 flex flex-col">
			<h1 className="text-xl font-bold self-center mb-4">Rezerva produsele oferite de &quot;{productOwner}&quot;</h1>

			<div className="space-y-4">
				<div className="flex flex-col space-y-1">
					<label>Adresa de primire <span className="text-red-400">*</span></label>
					<input onChange={handleField} name="address" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="text" value={form.address} required spellCheck={false}/>
					<span className="text-red-400 text-sm">{errors.address}</span>
				</div>

				<div className="text-sm text-gray-500">*Informatii aditionale de contact, precum numarul de telefon si adresa de email vor fi preluate din contul dumneavoastra</div>

				<div className="flex flex-col space-y-1">
					<label>Detalii aditionale</label>
					<textarea onChange={handleField} name="details" className="border border-gray-400 border-1 rounded-sm outline-none pl-1 text-sm text-gray-700 p-2 h-[6em] text-justify" value={form.details} spellCheck={false}/>
				</div>
			</div>

			<button className="bg-bgbutton px-6 py-2 rounded-lg text-black" onClick={handleSubmit}>Rezerva</button>
		</div>
	)
}

export default BookForm