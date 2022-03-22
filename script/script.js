function converterMoeda(cotDolar, cotEuro, cotBitcoin, cotReal) {
	const valorReal = parseFloat(document.getElementById("valor").value);

	const convertidoReal = (valorReal / cotReal).toFixed(2);
	const convertidoDolar = (valorReal / cotDolar).toFixed(2);
	const convertidoEuro = (valorReal / cotEuro).toFixed(2);
	const convertidoBitcoin = (valorReal / cotBitcoin).toFixed(6);

	document.getElementById("resultado__texto--real").innerHTML = `R$ ${convertidoReal}`;
	document.getElementById("resultado__texto--dolar").innerHTML = `$ ${convertidoDolar}`;
	document.getElementById("resultado__texto--euro").innerHTML = `€ ${convertidoEuro}`;
	document.getElementById("resultado__texto--bitcoin"	).innerHTML = `BTC ${convertidoBitcoin}`;
}

function obterCotacao() {
	const campoReal = document.getElementById("cotReal");
	const campoDolar = document.getElementById("cotDolar");
	const campoEuro = document.getElementById("cotEuro");
	const campoBitcoin = document.getElementById("cotBitcoin");

	let cotReal = 1;
	let cotDolar;
	let cotEuro;
	let cotBitcoin;
	
	fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
		.then(resposta => resposta.json())
		.then(json => imprimirResultado(json));

	function imprimirResultado(json) {

		campoReal.innerHTML = `R$ ${cotReal}`;

		for (let obj in json){
			if (json[obj].code == "USD") {
				cotDolar = parseFloat(json[obj].ask).toFixed(2);
				campoDolar.innerHTML = `R$ ${cotDolar}`;
			}
			else if (json[obj].code == "EUR") {
				cotEuro = parseFloat(json[obj].ask).toFixed(2);
				campoEuro.innerHTML = `R$ ${cotEuro}`;
			}
			else if (json[obj].code == "BTC") {
				cotBitcoin = (parseFloat(json[obj].ask)*1000).toFixed(2);
				campoBitcoin.innerHTML = `R$ ${cotBitcoin}`;
			}
		}

		converterMoeda(cotDolar, cotEuro, cotBitcoin, cotReal);
	};

}