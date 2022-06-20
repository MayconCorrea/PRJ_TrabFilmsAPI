import { API_KEY, BASE_URL, generos, URL_POPULAR, IMG_URL_W500, IMG_URL_W300} from './Api.js'

const divLista = document.querySelector('#lista-generos')
const ulLista = document.querySelector('#ul-lista-generos')
// const divPopulares = document.querySelector('#populares')
// const containerImgPopulares = document.querySelector('#populares-container-img')

const rowPopulares = document.querySelector('#row-populares')
const divListagem = document.querySelector('#listagem-populares')
const btn = document.querySelector('#btnPopulares')
const campoBusca = document.querySelector('#input-search')
const btnBusca = document.querySelector('#btn-busca')

let qtdPorPagina = 7
let esconderBtn = false;

let ref = ''
window.onload = () => {
    console.log('window-home');

    listaFilmesPopular(qtdPorPagina)
}


const listaFilmesPopular = async ( qtd ) => {
    const filmes = await fetch(`${BASE_URL}/${URL_POPULAR}&${API_KEY}`)
        .then(resp => resp.json())

    filmes.results.map( (value, index) => {
        if(index > qtd){
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

        const containerDescricao = document.createElement('div')

        const p = document.createElement('p')
        p.style.fontWeight = 'bold'
        p.style.display = 'inline-block'
        p.innerText = 'Descrição '

        const descricao = document.createElement('p')
        descricao.setAttribute('class', 'mb-3')
        descricao.innerHTML = value.overview
        descricao.style.display = 'inline-block'

        const data = document.createElement('p')
        data.innerText = `Data: ${value.release_date}`
        data.style.fontWeight = 'bold'

        containerDescricao.appendChild(p)
        containerDescricao.appendChild(descricao)
        containerDescricao.appendChild(data)


        div.appendChild(imgPopulares)
        div.appendChild(titulo)
        div.appendChild(containerDescricao)

        divListagem.appendChild(div)
        if(index == 19){
            esconderBtn = true
        }

        imgPopulares.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${value.id}`
        })

    })

    if(!esconderBtn){
        const div = document.createElement('div')
        div.setAttribute('class', 'col-12 text-right')
        
        const btnBuscarMais = document.createElement('button')
        btnBuscarMais.setAttribute('class', 'btn btn-primary')
        btnBuscarMais.innerHTML = 'Buscar mais'

        div.appendChild(btnBuscarMais)
        rowPopulares.appendChild(div)


        btnBuscarMais.onclick = async() => {
            btnBuscarMais.style.display = 'none'
            let todos = document.querySelectorAll('.div-listagem-populares');
            let last = todos[ qtdPorPagina  ].getAttribute('href')
            ref = last;

            divListagem.innerHTML = ''
            
            await listaFilmesPopular(qtdPorPagina += qtdPorPagina)
            window.location.href = last

        }
    }

}

btnBusca.onclick = () => {

    if(campoBusca.value.length == 0){
        return false
    } else {

        window.location.href = `pesquisa.html?busca=${campoBusca.value}`
    }
}