function converterMoeda() {
	const valorReal = parseFloat(document.getElementById("valor").value);

	const valorDolar = 5.0;
	const valorEuro = 5.5;
	const valorBitcoin = 195482.0;

	const convertidoDolar = (valorReal / valorDolar).toFixed(2);
	const convertidoEuro = (valorReal / valorEuro).toFixed(2);
	const convertidoBitcoin = (valorReal / valorBitcoin).toFixed(6);

	document.getElementById("resultado__texto--dolar").innerHTML = `$ ${convertidoDolar}`;
	document.getElementById("resultado__texto--euro").innerHTML = `€ ${convertidoEuro}`;
	document.getElementById("resultado__texto--bitcoin"	).innerHTML = `BTC ${convertidoBitcoin}`;
}

function obterCotacao() {
	const txtDolar = document.getElementById("cotacao__texto--dolar");
	const txtEuro = document.getElementById("cotacao__texto--euro");
	const txtBitcoin = document.getElementById("cotacao__texto--bitcoin");
	
	fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
		.then(resposta => resposta.json())
		.then(json => imprimeResult(json));

	function imprimeResult(json) {
		for (let obj in json){
			if (json[obj].code == "USD") {
				txtDolar.innerHTML = `R$ ${parseFloat(json[obj].ask).toFixed(2)}`;
			}
			else if (json[obj].code == "EUR") {
				txtEuro.innerHTML = `R$ ${parseFloat(json[obj].ask).toFixed(2)}`;
			}
			else if (json[obj].code == "BTC") {
				txtBitcoin.innerHTML = `R$ ${(parseFloat(json[obj].ask)*1000).toFixed(2)}`;
			}
		}
	};

}