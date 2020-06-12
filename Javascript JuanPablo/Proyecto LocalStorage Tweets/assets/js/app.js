//variables
const listaTweets = document.querySelector('#lista-tweets');


eventListener();


//event listeener
function eventListener() {

    //cuando se envia el form
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar Tweet
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido Cargado
    //DOMCONTENLOADED ES CUANDO SE CARGA TODO EL DOCUMENTO
    document.addEventListener('DOMContentLoaded', localStorageListo);

}
//funciones
function agregarTweet(e) {
    //prevenimos que nos lleve a algun lugar
    e.preventDefault();
    //leer valor text area
    const tweet = document.querySelector('#tweet').value;

    //crear boton borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    //creamos elemento li
    const li = document.createElement('li');

    //a su texto le asigamos el valor del text area
    li.innerText = tweet;
    //anade boton borrar
    li.appendChild(botonBorrar);

    //a lista tweet le agregamos nuestro nuevo li
    listaTweets.appendChild(li);

    //agregar Tweet al Local Storage
    agregarTweetLocalStorage(tweet);

}

//funcion borrar tweet
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Agregar Tweet al Local Storage

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //anadir nuevo tweet
    tweets.push(tweet);
    //Convertir de string a array
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Comprobar si hay elemento en el LocalStorage
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores del Local Storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Mostrar datos en LOCAL STORAGE EN LA LISTA
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        //SE LE AGREGA LO MISMO QUE Agregar Tweet

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        //creamos elemento li
        const li = document.createElement('li');

        //a su texto le asigamos el valor del text area
        li.innerText = tweet;
        //anade boton borrar
        li.appendChild(botonBorrar);

        //a lista tweet le agregamos nuestro nuevo li
        listaTweets.appendChild(li);
    });
}

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetborrar;
    //elimina la X del tweet
    tweetborrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();

    //se le agrega el index que nos indica la poscion en que estamoss
    tweets.forEach(function(tweet, index) {
        if (tweetborrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}