let initApp = function(DATA) {
	const filters = document.querySelector('#filters');	
	filters.addEventListener('input', filterGoods);

	function filterGoods() {
		const
			manufacturer = filters.querySelector('#manufacturer').value,
			priceMin = document.querySelector('#price-min').value,
			priceMax = document.querySelector('#price-max').value;
	
		outputGoods(DATA.filter(item => (
			(!manufacturer || item.manufacturer === manufacturer) &&
			(!priceMin || priceMin <= +item.price) &&
			(!priceMax || priceMax >= +item.price)
		)));
	}
	
	function outputGoods(goods) {
		document.getElementById('goods').innerHTML = goods.map(item => `
			<tr>
				<td><img style="max-width: 150px; max-height: 150px" src="${item.image}" alt=""></td>
				<td class="fw-bold align-middle" style="max-width: 200px">${item.name}</td>
				<td class="align-middle text-start" style="max-width: 450px">${item.description}</td>
				<td class="align-middle">${item.manufacturer}</td>
				<td class="align-middle">${item.country}</td>
				<td class="fs-3 fw-bold align-middle" style="min-width: 200px;">${item.price} &#8381;</td>
			</tr>
		`).join('');
	}

	outputGoods(DATA);
}

