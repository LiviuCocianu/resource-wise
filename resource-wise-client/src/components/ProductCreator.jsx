import { useState } from "react"
import { formatDate } from "../utils"

function ProductCreator({ setProducts }) {
	const defaultForm = {
		name: "",
		quantity: 1,
		expiresAt: formatDate(new Date().toDateString())
	}

	const [form, setForm] = useState(defaultForm)
	
	const handleField = (e) => {
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = () => {
		if (form.name.length < 4) return
		if (form.quantity < 1) return

		setProducts(prev => ([
			...prev,
			form
		]))

		setForm(defaultForm)
	}

	return (
		<div className="w-full bg-gray-300 rounded-lg p-4 flex flex-col">
			<div className="flex flex-col space-y-1">
				<label>Denumire produs <span className="text-red-400">*</span></label>
				<input onChange={handleField} name="name" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="text" value={form.name} required />
			</div>

			<div className="flex flex-col space-y-1">
				<label>Cantitate <span className="text-red-400">*</span></label>
				<input onChange={handleField} name="quantity" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="number" value={form.quantity} required min={1}/>
			</div>

			<div className="flex flex-col space-y-1">
				<label>Data expirare <span className="text-red-400">*</span></label>
				<input onChange={handleField} name="expiresAt" className="border border-gray-400 border-1 rounded-sm outline-none pl-1" type="date" value={form.expiresAt} required min={formatDate(new Date().toDateString())}/>
			</div>

			<button className="bg-white border border-black px-6 py-2 rounded-lg text-black mt-10 hover:bg-gray-200" onClick={handleSubmit}>Adauga</button>
		</div>
	)
}

export default ProductCreator