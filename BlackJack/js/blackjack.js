//importanto design do canvas
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// classe carta
class carta{
    //as variaveis estaticas pertecem a essa classe
    static x = 50;
    static y = 50;

    constructor(valor,naipe){
        this.img = new Image();
        this.valor = valor;
        this.naipe = naipe;
    }
}

// variaveis que vamos usar
var cartas = [];
var cartasJogador = [];
var cartasCpu = [];
var indiceCarta = 0;
var naipes = ["S","H","D","C"];

// Gerador de cartas . com os valores dos naipes

for (i = 0; i < 4; i++){
    for(j = 1; j <= 13; j++){
        cartas.push(new carta(j, naipes[i]));
    }
}

//Embaralhando as cartas
for (i = 0; i < 100; i++){
    cartas.splice(Math.random()
    * 52, 0,cartas[0]);
    cartas.shift();
}

function destribuirCarta(CJ){
    //Temos que primeiro carregar a carta e depois adicionar o src
	//Caso contrário, as letras não carregam na página
    CJ.img.onload = () => {
        ctx.drawImage(CJ.img,carta.x, carta.y, 239,335);
        carta.x += 300;
    };
    //Para carregar a imagem correta, concatenamos o número e o stick, que corresponde ao nome do arquivo
    CJ.img.src = "imagens/cartas/" + CJ.valor.toString() + CJ.naipe + ".svg";
}

function pedirCarta(){
    //Colocamos um máximo de cartas que podem desenhar para que o Pokista também possa desenhar o seu próprio
    if (indiceCarta < 8){
        let CJ = cartas 
        [indiceCarta]; //Carta jogada
        cartasJogador.push(CJ);
        destribuirCarta(CJ);
        indiceCarta++;
    }
}

function jogarMao(){
    document.getElementById("pedir").disabled = true;
    document.getElementById("jogarMao").disabled = true;
    document.getElementById("reset").style.visibility = "visible";
    let pointsUser = 0;
    let pointsCpu = 0;
    let info = document.getElementById("info");
    // Contar e mostrar os pontos do jogador
    for (i in cartasJogador){
        pointsUser +=
        cartasJogador[i].valor;
    }
    // Sacar as cartas da cpu e contar os pontos
    while (pointsCpu < 17){
        cartasCpu.push(cartas[indiceCarta]);
        pointsCpu += cartas [indiceCarta].valor;
        indiceCarta++;
    }
    // pontos da partida colocando na informação
    info.innerHTML = "Pontuação do jogador:  " + pointsUser + 
   "<br>Pontuação da Cpu: "
   + pointsCpu;
   // mostrar as cartas da cpu
   carta.x = 50;
   carta.y = 400;
   for (i in cartasCpu) {
    destribuirCarta (cartasCpu[i]);
   }
   // Mostar o Vencedor
   if(pointsUser == 21){
    info.innerHTML += "<br><b>BlackJack!!! Vencedor! Bem Vindo ao Melhor dos Mundos</br>";
   }else if (pointsUser > 21)
   {
    info.innerHTML
    +="<br><b>Perdeu .. Ultrapassou os pontos</br>";
   }else if(pointsCpu > 21){
    info.innerHTML += "<br><b>Você Ganhou !! A Cpu passou dos Pontos</br>";
   } else if (pointsCpu >= pointsUser){
    info.innerHTML += "<br><b>  Cpu Venceu ... </br>";
   } else {
    info.innerHTML += "<br><b> Você Ganhou!!!!</br>";
   }
}

//Recarrer a pagina quando o botão é selecionado
function playagain(){
    location.reload(true);
}