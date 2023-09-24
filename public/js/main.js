let initApp = function(DATA) {
	const filters = document.querySelector('#filters');	
	filters.addEventListener('input', filterGoods);

	function filterGoods() {
		const
			manufacturer = filters.querySelector('#manufacturer').value,
			priceMin = document.querySelector('#price-min').value,
			priceMax = document.querySelector('#price-max').value,
			search = document.querySelector('#search').value;

	
		outputGoods(DATA.filter(item => (
			(!manufacturer || item.manufacturer === manufacturer) &&
			(!priceMin || priceMin <= +item.price) &&
			(!priceMax || priceMax >= +item.price) &&
			(!search || item.name.toLowerCase().includes(search.toLowerCase()))
		)));
	}
	
	function outputGoods(goods) {
		document.getElementById('goods').innerHTML = goods.map(item => `
			<tr>
				<td><img style="max-width: 150px; max-height: 150px" src="${item.image}" alt="фото не загрузилось(("></td>
				<td class="fw-bold align-middle" style="width: 200px">${item.name}</td>
				<td class="align-middle text-start" style="width: 450px;">${item.description}</td>
				<td class="align-middle" style="width: 100px;">${item.manufacturer}</td>
				<td class="align-middle" style="width: 100px;">${item.country}</td>
				<td class="fs-3 fw-bold align-middle" style="min-width: 200px;">${item.price} &#8381;</td>
				<td class="align-middle">
					<a class="btn" href="/edit/${item.id}">
						<img style="max-width: 40px" src="img/edit.svg" alt="delete">
					</a>
				</td>
				<td class="align-middle">
					<form action="delete/${item.id}" method="POST">
						<button class="btn" type="submit">
							<img style="max-width: 40px" src="img/delete.svg" alt="delete">
						</button>
					</form>
				</td>
			</tr>
		`).join('');
	}

	outputGoods(DATA);
}

