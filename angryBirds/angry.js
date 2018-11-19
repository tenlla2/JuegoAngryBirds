xmlns = "http://www.w3.org/2000/svg";
var svgContainer = document.getElementById("escenario");
var flecha = document.getElementsByClassName("arrow")[0];
var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var velocidadX = 1;
var velocidadY = 0;
var cont = -20;
var jugando = false;
var puntos = document.getElementById("puntos");
var puntuacion=0;
puntos.innerText = "Puntos = 0";

class Pajaro {
    constructor(posX, posY) {
        this.pajarito = document.createElementNS(xmlns, "circle");
        this.pajarito.setAttributeNS(null, "id", "pajarito");
        this.pajarito.setAttributeNS(null, "cx", posX);
        this.pajarito.setAttributeNS(null, "cy", posY);
        this.pajarito.setAttributeNS(null, "r", "50");
        svgContainer.appendChild(this.pajarito);
        this.r = parseInt(this.pajarito.getAttribute("r"));

    }
}
class Pared{
    constructor(alto,ancho,x,y) {
        this.pared = document.createElementNS(xmlns, "rect");
        this.pared.setAttributeNS(null, "id", "pared");
        this.pared.setAttributeNS(null, "x", x);
        this.pared.setAttributeNS(null, "y", y);
        this.pared.setAttributeNS(null, "height", alto);
        this.pared.setAttributeNS(null, "width", ancho);
        svgContainer.appendChild(this.pared);
    }
}

class Catapulta {
    constructor() {
        this.catapulta = document.createElementNS(xmlns, "rect");
        this.catapulta.setAttributeNS(null, "id", "catapulta");
        this.catapulta.setAttributeNS(null, "x", "2.5%");
        this.catapulta.setAttributeNS(null, "y", "45%");
        this.catapulta.setAttributeNS(null, "height", "200px");
        this.catapulta.setAttributeNS(null, "width", "200px");
        svgContainer.appendChild(this.catapulta);
        flecha.style.transform = "rotate(0deg)";
        this.angulo = "";
        this.anguloInt = 0;
    }
    conseguirAngulo() {
        if (this.angulo == "") {

            for (var i = 0; i < flecha.style.transform.length; i++) {
                for (var j = 0; j <= numeros.length; j++) {
                    if (flecha.style.transform.charAt(i) == numeros[j]) {
                        this.angulo = this.angulo + flecha.style.transform.charAt(i);
                    }
                }
            }
            this.anguloInt = parseInt(this.angulo);
        }

    }

    mover(direccion) {
        this.conseguirAngulo();
        this.anguloMas10 = (this.anguloInt - 1);
        this.anguloMenos10 = (this.anguloInt + 1);
        switch (direccion) {
            case "arriba":
                if (parseInt(this.anguloInt) > -20) {
                    flecha.style.transform = `rotate(${(this.anguloMas10)}deg)`;
                    this.angulo = String(this.anguloMas10);
                    this.anguloInt = this.anguloMas10;
                    this.posActual = parseFloat(bala.circulo.getAttribute("cy"));
                    this.porcentaje = `${(this.posActual - 0.6)}%`
                    bala.circulo.setAttributeNS(null, "cy", this.porcentaje);

                }

                break;

            case "abajo":
                if (parseInt(this.anguloInt) < 20) {
                    flecha.style.transform = `rotate(${(this.anguloMenos10)}deg)`;
                    this.angulo = String(this.anguloMenos10);
                    this.anguloInt = this.anguloMenos10;
                    this.posActual = parseFloat(bala.circulo.getAttribute("cy"));
                    this.porcentaje = `${(this.posActual + 0.6)}%`
                    bala.circulo.setAttributeNS(null, "cy", this.porcentaje);
                }

                break;
        }
    }
}

class Pelota {
    constructor() {
        this.circulo = document.createElementNS(xmlns, "circle");
        this.circulo.setAttributeNS(null, "id", "bala");
        this.circulo.setAttributeNS(null, "cx", "20%");
        this.circulo.setAttributeNS(null, "cy", "52%");
        this.circulo.setAttributeNS(null, "r", "30");
        svgContainer.appendChild(this.circulo);
        this.velocidadX = velocidadX;
        this.velocidadY = velocidadY;
        this.r = parseInt(this.circulo.getAttribute("r"));
        this.rebote = 0;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
    }

    compruebaDireccion() {
        for (var i = -20; i <= 20; i++) {
            if (flecha.style.transform == `rotate(${(i)}deg)`)
                bala.velocidadY = i / 20;
        }
    }



    colisiones() {

        //Con los ejes
        if (this.circulo.posX > 97) {
            this.velocidadX = -this.velocidadX;
            this.rebote++;

        }
        if (this.circulo.posX < 3) {
            this.velocidadX = -this.velocidadX;
            this.rebote++;
        }
        if (this.circulo.posY < 4 || this.circulo.posY > 96) {
            this.velocidadY = -this.velocidadY;
            this.rebote++;
        }
        //con los pajaros
        this.dx = Math.abs(this.circulo.posX - parseFloat(p1.pajarito.getAttribute("cx")));
        this.dy = Math.abs(this.circulo.posY - parseFloat(p1.pajarito.getAttribute("cy")));
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        if (this.distance < (this.r / 10 + p1.r / 10) - 3) {
            svgContainer.removeChild(p1.pajarito);
            p1.r = 0;
            this.rebote = 5;
            puntuacion=puntuacion+10;
            puntos.innerText="Puntos = "+puntuacion;
        }

        this.dx = Math.abs(this.circulo.posX - parseFloat(p2.pajarito.getAttribute("cx")));
        this.dy = Math.abs(this.circulo.posY - parseFloat(p2.pajarito.getAttribute("cy")));
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        if (this.distance < (this.r / 10 + p2.r / 10) - 4) {
            svgContainer.removeChild(p2.pajarito);
            p2.r = 0;
            this.rebote = 5;
            puntuacion=puntuacion+10;
            puntos.innerText="Puntos = "+puntuacion;
        }

        this.dx = Math.abs(this.circulo.posX - parseFloat(p3.pajarito.getAttribute("cx")));
        this.dy = Math.abs(this.circulo.posY - parseFloat(p3.pajarito.getAttribute("cy")));
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (this.distance < (this.r / 10 + p3.r / 10) - 4) {
            svgContainer.removeChild(p3.pajarito);
            p3.r = 0;
            this.rebote = 5;
            puntuacion=puntuacion+10;
            puntos.innerText="Puntos = "+puntuacion;
        }

        //con la pared

        if (this.circulo.posX + this.r >= parseFloat(pared1.pared.getAttribute("width")) && this.circulo.posX <= parseFloat(pared1.pared.getAttribute("x"))+1 + parseFloat(pared1.pared.getAttribute("width")) && this.circulo.posX <= 53 && this.circulo.posX + this.r/10 -1> parseFloat(pared1.pared.getAttribute("x")) && this.circulo.posY > parseFloat(pared1.pared.getAttribute("y")) &&  this.circulo.posY < parseFloat(pared1.pared.getAttribute("y")) + parseFloat(pared1.pared.getAttribute("height"))){
            this.velocidadX = -this.velocidadX;
            this.rebote++;
        }
        if (this.circulo.posX + this.r >= parseFloat(pared2.pared.getAttribute("width")) && this.circulo.posX <= parseFloat(pared2.pared.getAttribute("x"))+1 + parseFloat(pared2.pared.getAttribute("width")) && this.circulo.posX <= 53 && this.circulo.posX + this.r/10 -1> parseFloat(pared2.pared.getAttribute("x")) && this.circulo.posY > parseFloat(pared2.pared.getAttribute("y")) &&  this.circulo.posY < parseFloat(pared2.pared.getAttribute("y")) + parseFloat(pared2.pared.getAttribute("height"))){
            this.velocidadX = -this.velocidadX;
            this.rebote++;
        }
        if (this.circulo.posX + this.r >= parseFloat(pared4.pared.getAttribute("width")) && this.circulo.posX <= parseFloat(pared4.pared.getAttribute("x"))+1 + parseFloat(pared4.pared.getAttribute("width")) && this.circulo.posX <= 53 && this.circulo.posX + this.r/10 -1> parseFloat(pared4.pared.getAttribute("x")) && this.circulo.posY > parseFloat(pared4.pared.getAttribute("y")) &&  this.circulo.posY < parseFloat(pared4.pared.getAttribute("y")) + parseFloat(pared4.pared.getAttribute("height"))){
            this.velocidadX = -this.velocidadX;
            this.rebote++;
        }
        if (this.circulo.posX + this.r >= parseFloat(pared5.pared.getAttribute("width")) && this.circulo.posX <= parseFloat(pared5.pared.getAttribute("x"))+1 + parseFloat(pared5.pared.getAttribute("width")) && this.circulo.posX <= 53 && this.circulo.posX + this.r/10 -1> parseFloat(pared5.pared.getAttribute("x")) && this.circulo.posY > parseFloat(pared5.pared.getAttribute("y")) &&  this.circulo.posY < parseFloat(pared5.pared.getAttribute("y")) + parseFloat(pared5.pared.getAttribute("height"))){
            this.velocidadX = -this.velocidadX;
            this.rebote++;
        }
        	
        
    }
    mover() {
        this.circulo.posX = parseFloat(this.circulo.getAttribute("cx"));
        this.circulo.posY = parseFloat(this.circulo.getAttribute("cy"));
        this.colisiones();
        this.suma1 = this.circulo.posX + this.velocidadX;
        this.suma2 = this.circulo.posY + this.velocidadY;
        this.porcentajeX = `${(this.suma1)}%`
        this.porcentajeY = `${(this.suma2)}%`
        this.circulo.setAttribute("cx", this.porcentajeX);
        this.circulo.setAttribute("cy", this.porcentajeY);
    }



}



function myStopFunction(funcion) {
    clearInterval(funcion);
}
var c = new Catapulta();
var p1 = new Pajaro("80%", "10%");
var p2 = new Pajaro("90%", "50%");
var p3 = new Pajaro("75%", "81%");
var pared1 = new Pared("30%","1%","50%","60%");
var pared2 = new Pared("30%","1%","50%","10%");
var pared4 = new Pared("4%","1%","50%","96%");
var pared5 = new Pared("4%","1%","50%","0%");
var bala = new Pelota();

var FPS = 60;


document.body.addEventListener("keydown", moverDireccion);

function moverDireccion(event) {
    if (jugando == false) {
        if (event.code == "ArrowUp") {
            bala.compruebaDireccion();
            c.mover("arriba");
        }
        if (event.code == "ArrowDown") {
            bala.compruebaDireccion();
            c.mover("abajo");
        }
        if (event.code == "Enter") {
            jugando = true;
            var mueve = setInterval(function () {
                if (bala.rebote < 5) { bala.mover(); }
                else {
                    ganar();
                    myStopFunction(mueve);
                    jugando = false;
                    svgContainer.removeChild(bala.circulo);
                    c.angulo = "";
                    bala = new Pelota();
                    bala.circulo.style.fill = "url(#attachedImage2)";
                    flecha.style.transform = "rotate(0deg)";
                }

            }, 1000 / 60);
        }
    }

}

function ponerImagenes() {
    p1.pajarito.style.fill = "url(#attachedImage)";
    p2.pajarito.style.fill = "url(#attachedImage)";
    p3.pajarito.style.fill = "url(#attachedImage)";
    bala.circulo.style.fill = "url(#attachedImage2)";
    c.catapulta.style.fill = "url(#attachedImage3)";
}

function ganar() {
    if (p1.r == 0 && p2.r == 0 && p3.r == 0) { alert('Has ganado!'); }
}
function inicio() {
    ponerImagenes();

}

inicio();