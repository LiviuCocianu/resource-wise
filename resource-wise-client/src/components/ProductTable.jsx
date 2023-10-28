function ProductTable({ products, className="" }) {
	return (
		<div className={"border border-gray-200 grid grid-cols-3 place-items-center text-center mb-2 " + className}>
			<h3 className="w-full py-2 bg-gray-200">Produs</h3>
			<h3 className="w-full py-2 bg-gray-200">Cantitate</h3>
			<h3 className="w-full py-2 bg-gray-200">Data expirarii</h3>

			{
				products.map((rs, i) => {
					const toRender = []

					let index = 0;
					for(let val of Object.values(rs)) {
						toRender.push(
							<div key={val + i + index} className="px-2 w-full h-full border-b-[1px] border-gray-300 flex justify-center items-center py-1">
								<p className="break-all">{val}</p>
							</div>
						)
						index++
					}

					return toRender
				})
			}
		</div>
	)
}

export default ProductTable