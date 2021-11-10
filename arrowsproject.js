var d = document.getElementById("area_de_dibujo");
var color = document.getElementById("seleccionar_color");
var borrar = document.getElementById("boton_borrar");
var guardar = document.getElementById("guardar_canvas");
var fondo = document.getElementById("color_fondo");

var lienzo = d.getContext("2d")

var empezarDibujo = false;
var xInicial, yInicial, xFinal, yFinal;
document.addEventListener("mousedown", primerPunto);
document.addEventListener("mousemove", movimiento);
document.addEventListener("mouseup", terminarDibujo);
borrar.addEventListener("click", borrarDibujo);
guardar.addEventListener("click", guardarCanvas);
fondo.addEventListener("input", cambiarFondo); //Para llamar la funcion de que se cambie el fondo

function cambiarFondo() {
    lienzo.fillStyle = fondo.value;
    lienzo.fillRect(0, 0, d.width, d.height); 
}


function primerPunto(mouseEvent)
{
    xInicial = mouseEvent.layerX;
    yInicial = mouseEvent.layerY;
    empezarDibujo = true;

}

function movimiento(mouseEvent)
{
    if (empezarDibujo == true)
    {
        xFinal = mouseEvent.layerX;
        yFinal = mouseEvent.layerY;
        dibujar_linea(color.value, xInicial, yInicial, xFinal, yFinal, lienzo);
        xInicial = xFinal;
        yInicial = yFinal;
    }
}

function terminarDibujo()
{
    empezarDibujo = false;
}


function dibujar_linea(color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 5;
    lienzo.moveTo(xinicial,yinicial);
    lienzo.lineTo(xfinal,yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

function borrarDibujo()
{
    lienzo.clearRect(0, 0, d.width, d.height);
}

function guardarCanvas()
{
    const dataURL = d.toDataURL('image/png');
    var newWindow = window.open();
    newWindow.document.write('<img src="'+dataURL+'"/>');


}