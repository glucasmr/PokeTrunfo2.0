console.clear();

var carta1 = {
	nome: "Bulbassauro",
	img:
		"https://img.elo7.com.br/product/zoom/31CCAE3/escultura-em-papel-pokemon-bulbassauro-com-base-em-pvc-actionfigure.jpg",
	atributos: {
		atk: 7,
		def: 8,
		mp: 6
	}
};

var carta2 = {
	nome: "Charmander",
	img: "https://tm.ibxk.com.br/2021/04/05/05180502007300.jpg?ims=1200x675",
	atributos: {
		atk: 9,
		def: 6,
		mp: 4
	}
};

var carta3 = {
	nome: "Squirtle",
	img: "https://miro.medium.com/max/750/1*W_ITBT0_dDNGyy_yPRQO3g.jpeg",
	atributos: {
		atk: 7,
		def: 9,
		mp: 5
	}
};

var cartas = [carta1, carta2, carta3];
var cartaMaquina;
var cartaJogador;

var elementoResultado = document.getElementById("resultado");
var divCartaMaquina = document.getElementById("carta-maquina");
divCartaMaquina.style.backgroundImage =
	"url(https://2.bp.blogspot.com/-sXAI7b4oeq4/WhLOk-JokUI/AAAAAAAAd2M/4lkSFTTqjVIdo5clUWDGpow5XyuaLYzagCLcBGAs/s1600/DPEGusZWkAE46FS.jpg)";
var divCartaJogador = document.getElementById("carta-jogador");
divCartaJogador.style.backgroundImage =
	"url(https://2.bp.blogspot.com/-sXAI7b4oeq4/WhLOk-JokUI/AAAAAAAAd2M/4lkSFTTqjVIdo5clUWDGpow5XyuaLYzagCLcBGAs/s1600/DPEGusZWkAE46FS.jpg)";
var divResultado = document.getElementById("resultado");

function sortearCarta() {
	var nmrMaquina = parseInt(Math.random() * 3);
	var nmrJogador = parseInt(Math.random() * 3);

	while (nmrMaquina == nmrJogador) {
		nmrJogador = parseInt(Math.random() * 3);
	}

	cartaMaquina = cartas[nmrMaquina];
	cartaJogador = cartas[nmrJogador];

	document.getElementById("btnSortear").disabled = true;
	document.getElementById("btnJogar").disabled = false;
	exibirCartaJogador();
}

function exibirCartaJogador() {
	var divCartaJogador = document.getElementById("carta-jogador");
	divCartaJogador.style.backgroundImage = `url(${cartaJogador.img})`; //template string, essa sintaxe permite passar um código JS dentro da string que vai ser encaminhada, exemplo abaixo faz o mesmo:
	//divCartaJogador.style.backgroundImage = "url(" + cartaJogador.img + ")";

	var moldura =
		'<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
	var tagHTML = "<div id='opcoes' class='carta-status'>";

	var opcoesTexto = "";
	for (var atributo in cartaJogador.atributos) {
		opcoesTexto +=
			"<input type='radio' name='atributoJog' value='" +
			atributo +
			"'>" +
			"<span class='atributoJog'>" +
			atributo +
			" " +
			cartaJogador.atributos[atributo] +
			"</span><br>";
	}
	var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
	divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
	var divCartaMaquina = document.getElementById("carta-maquina");
	divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.img})`;
	var moldura =
		'<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
	var tagHTML = "<div id='opcoes' class='carta-status'>";

	var opcoesTexto = "";
	for (var atributo in cartaMaquina.atributos) {
		opcoesTexto +=
			"<p class='atributoMaq' id='" +
			atributo +
			"'>" +
			atributo +
			" " +
			cartaMaquina.atributos[atributo] +
			"</p>";
	}
	var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
	divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartas() {}

function jogar() {
	var atributoSelecionado = obtemAtributo();
	//console.log(atributoSelecionado);
	if (atributoSelecionado == undefined) {
		return;
	}
	var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];

	if (atributoSelecionado == "atk") {
		var valorCartaMaquina = cartaMaquina.atributos.def;
		var atributoMaq = "def";
	} else if (atributoSelecionado == "def") {
		var valorCartaMaquina = cartaMaquina.atributos.atk;
		var atributoMaq = "atk";
	} else {
		var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];
		var atributoMaq = "mp";
	}

	var htmlResultado = "";
	if (valorCartaJogador > valorCartaMaquina) {
		htmlResultado = "<p class='resultado-final'>Você venceu!</p>";
		var corInputJog = "green";
		var corInputMaq = "red";
	} else if (valorCartaMaquina > valorCartaJogador) {
		htmlResultado = "<p class='resultado-final'>Você perdeu!</p>";
		var corInputJog = "red";
		var corInputMaq = "green";
	} else {
		htmlResultado = "<p class='resultado-final'>Você empatou!</p>";
		var corInputJog = "gray";
		var corInputMaq = "gray";
	}
	divResultado.innerHTML = htmlResultado;
	//document.getElementById("btnJogar").disabled = true;
	exibirCartaMaquina();

	const collectionJog = document.getElementsByName("atributoJog");

	for (var i = 0; i < collectionJog.length; i++) {
		//console.log(collectionJog[i]);
		if (collectionJog[i].value == `${atributoSelecionado}`) {
			collectionJog[i].nextElementSibling.style.color = `${corInputJog}`;
		} else {
			collectionJog[i].nextElementSibling.style.color = "white";
		}
	}

	const collectionMaq = document.getElementsByClassName("atributoMaq");
	console.log(document.getElementsByClassName("atributoMaq")[0]);

	for (var i = 0; i < collectionMaq.length; i++) {
		//	console.log(collectionMaq[i]);
		if (collectionMaq[i].id == `${atributoMaq}`) {
			collectionMaq[i].style.color = `${corInputMaq}`;
			console.log("AWAWAWA");
		} else {
			//collectionMaq[i].nextElementSibling.style.color = "white";
			console.log("AWOOF" + collectionMaq[i].id);
		}
	}
}

function obtemAtributo() {
	var radioAtributo = document.getElementsByName("atributoJog");
	for (var i = 0; i < radioAtributo.length; i++) {
		if (radioAtributo[i].checked == true) {
			return radioAtributo[i].value;
		}
	}
	divResultado.innerHTML =
		"<p class='resultado-final'>Você deve selecionar um atributo!</p>";
}
