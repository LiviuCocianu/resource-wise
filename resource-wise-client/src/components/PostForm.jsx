import { useEffect, useState } from "react"
import ProductTable from "./ProductTable"
import ProductCreator from "./ProductCreator"

function PostForm() {
	const [form, setForm] = useState({
		address: "",
		description: "",
	})

	const [errors, setErrors] = useState({
		address: "",
		products: ""
	})
	
	const [products, setProducts] = useState([])

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

	useEffect(() => {
		if (products.length == 0) {
			handleFieldError("products", "Va rugam sa adaugati cel putin un produs")
		} else {
			handleFieldError("products", "")
		}
	}, [products])

	return (
		<div className="flex flex-col w-full p-4 space-y-4 text-black">
			<h1 className="self-center mb-4 text-xl font-bold">Creeaza un anunt</h1>

			<div className="space-y-4">
				<div className="flex flex-col space-y-1">
					<label>Adresa firmei <span className="text-red-400">*</span></label>
					<input onChange={handleField} name="address" className="pl-1 border border-gray-400 rounded-sm outline-none border-1" type="text" value={form.address} required spellCheck={false}/>
					<span className="text-sm text-red-400">{errors.address}</span>
				</div>

				<div className="flex flex-col space-y-4">
					<label>Produse de oferit <span className="text-red-400">*</span></label>
					<span className="text-sm text-red-400">{errors.products}</span>

					{ products.length == 0 ? (
						<div className="text-sm text-gray-500">Niciun produs adaugat</div>
					) : <ProductTable className="w-full" products={products}/> }

					<ProductCreator setProducts={setProducts}/>
				</div>

				<div className="flex flex-col space-y-1">
					<label>Descrierea anuntului</label>
					<textarea onChange={handleField} name="description" className="border border-gray-400 border-1 rounded-sm outline-none pl-1 text-sm text-gray-700 p-2 h-[6em] text-justify" value={form.description} spellCheck={false} placeholder="Va recomandam sa adaugati o descriere anuntului pentru a informa corespunzator organizatiile partenere. Informatii utile pot fi starea produselor, informatii de contact, etc"/>
				</div>
			</div>

			<button className="px-6 py-2 text-black rounded-lg bg-bgbutton" onClick={handleSubmit}>Publica</button>
		</div>
	)
}

export default PostForm