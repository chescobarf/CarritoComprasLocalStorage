//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');

//listado donde vamos a dejar los cursos
const listaCursos = document.querySelector('#lista-carrito tbody')

const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//listener
cargarEventListener();

function cargarEventListener() {
    //dispara cuando se presiona agregarCarrito

    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}


//functions
//funcion que anade curso a carrito
function comprarCurso(e) {
    e.preventDefault();
    //solo se ejecuta cuando el elemento que le damos click es agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        //aqui buscamos la info del curso, buscando al padre del padre del elemento
        const curso = e.target.parentElement.parentElement;

        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    //tomamos los datos del curso mediante query selector
    const datosCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(datosCurso);
}

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    //Creamos el formato que tendra cuando creemos un producto en el carrito
    row.innerHTML = `
    <td>
        <img src="${curso.imagen}" width=100 >
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
    //aqui se la entregamos el objeto y el formato a la lista para que lo agregue
    listaCursos.appendChild(row);
    //Almacenar en localStorage
    guardarCursoLS(curso);
}

//Eliminar el curso del la lista
// revisamos que el boton presionado sea justamente el de borrar
//seleccionamos al padre del padre del elemento y lo eliminamos  (en este caso es el tr)
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }

}

function vaciarCarrito(e) {
    //forma lenta
    //e.preventDefault();
    //listaCursos.innerHTML = "";

    //forma rapida es mas recomendada
    // mientras la lista de cursos tenga hijos se iran borrando hasta que quede sin ninguno
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
}

//almacenar cursos en local storage
function guardarCursoLS(curso) {
    let cursos;
    //toma el valor del arreglo con datos o vacio del LS
    cursos = obtenerCursosLocalStorage();
    //el cursos seleccionado se agrega al arreglo
    cursos.push(curso);

    //aqui localStorage sobreescribe
    //Funcion que convierte arreglo a string JSON.stringyfy
    localStorage.setItem('cursos', JSON.stringify(cursos));
}


//comprueba que haya elementos en Local Strage
function obtenerCursosLocalStorage() {
    let cursosLs;
    //comprobamos si hay algo en LS
    if (localStorage.getItem('cursos') === null) {
        cursosLs = [];
    } else {
        cursosLs = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLs;
}