function converterMoeda(cotReal, cotDolar, cotEuro, cotBitcoin) {
	const valor = parseFloat(document.getElementById("valor").value);

	const convertidoReal = (valor / cotReal).toFixed(2);
	const convertidoDolar = (valor / cotDolar).toFixed(2);
	const convertidoEuro = (valor / cotEuro).toFixed(2);
	const convertidoBitcoin = (valor / cotBitcoin).toFixed(6);

	document.getElementById("resultado__real").innerHTML = `R$ ${convertidoReal}`;
	document.getElementById("resultado__dolar").innerHTML = `$ ${convertidoDolar}`;
	document.getElementById("resultado__euro").innerHTML = `€ ${convertidoEuro}`;
	document.getElementById("resultado__bitcoin").innerHTML = `BTC ${convertidoBitcoin}`;
}

function obterCotacao(opcao) {
	const moedas = ["USD", "EUR", "BRL", "BTC"];
	const simbolo = {"USD": "$", "EUR": "€", "BRL": "R$", "BTC": "₿"};

	let cotReal = 1;
	let cotDolar = 1;
	let cotEuro = 1;
	let cotBitcoin = 1;

	let stringCotacao = "";

	moedas.forEach((value, index) => {
		if (opcao != value) {
			stringCotacao += `${moedas[index]}-${opcao}`
		}
	});

	stringCotacao = stringCotacao.replace(/(.{7})?(.{7})?(.{7})/, "$1,$2,$3");

	fetch(`https://economia.awesomeapi.com.br/last/${stringCotacao}`)
		.then(resposta => resposta.json())
		.then(json => exibirCotacao(json));
		
		function exibirCotacao(json) {
			for (let obj in json){
				if (json[obj].code == "BRL") {
					cotReal = parseFloat(json[obj].ask).toFixed(2);
				}
				else if (json[obj].code == "USD") {
					cotDolar = parseFloat(json[obj].ask).toFixed(2);
				}
				else if (json[obj].code == "EUR") {
					cotEuro = parseFloat(json[obj].ask).toFixed(2);
				}
				else if (json[obj].code == "BTC") {
					cotBitcoin = (parseFloat(json[obj].ask)*1000).toFixed(2);
				}
			}

			document.getElementById("cotacao__real").innerHTML = `${simbolo[opcao]} ${cotReal}`;
			document.getElementById("cotacao__dolar").innerHTML = `${simbolo[opcao]} ${cotDolar}`;
			document.getElementById("cotacao__euro").innerHTML = `${simbolo[opcao]} ${cotEuro}`;
			document.getElementById("cotacao__bitcoin").innerHTML = `${simbolo[opcao]} ${cotBitcoin}`;

			converterMoeda(cotReal, cotDolar, cotEuro, cotBitcoin);
		};
}

function obterMoedaSelecionada() {
	const campoMoeda = document.getElementsByName("moeda");
	let opcao;

	campoMoeda.forEach((value, index) => {
		if (campoMoeda[index].checked) {
			opcao = campoMoeda[index].value;
		};
	});

	return opcao;
}

const btnConverter = document.querySelector("#formulario__botao");

btnConverter.addEventListener("click", (e) => {
	e.preventDefault();

	let opcao = obterMoedaSelecionada();

	obterCotacao(opcao);
});