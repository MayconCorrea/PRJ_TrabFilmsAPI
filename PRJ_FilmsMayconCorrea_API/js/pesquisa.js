import {searchURL, API_KEY, BASE_URL, IMG_URL_W300} from './Api.js'
const divListagem = document.querySelector('#listagem-populares')

window.onload = async() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const busca = url.searchParams.get("busca");
    console.log(busca);

    listagem(busca)   
}

const listagem = async(busca) => {
    const filmes = await fetch(`${searchURL}&query=${busca}`)
        .then(resp => resp.json())
    
    filmes.results.map( (value, index) => {
        if(!value.poster_path){
            return false
        }
        const div = document.createElement('div')
        div.setAttribute('class', 'col-sm-12 col-md-3 col-lg-3 d-flex flex-column align-items-center mb-4 div-listagem-populares')
        div.setAttribute('id', `img-${value.id}`)
        div.setAttribute('data-index', index)
        div.setAttribute('href', `#img-${value.id}`)
     
        const imgPopulares = document.createElement('img')
        imgPopulares.setAttribute('class', 'mb-3') 
        imgPopulares.src = IMG_URL_W300+value.poster_path
        imgPopulares.id = value.id

        const titulo = document.createElement('h3')
        titulo.innerHTML = value.title
        titulo.setAttribute('class', 'mb-3')

        div.appendChild(imgPopulares)
        div.appendChild(titulo)
        divListagem.appendChild(div)

    })
}