let card = document.getElementsByClassName("card");
let cardsContainer = document.getElementById('cardsContainer');
let clearBtn = document.getElementById('clearBtn')
let containerFilter = document.querySelector("body > main > section.section-filter > div.container-filter");
let allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div > div:nth-child(1) > p")
let filtroContainer = document.getElementById('containerFilter')
let json;
let clearActive = "false"
let titlecard;
let logoCard;
let contract;
let idNoEliminar = []
let nameCompany;
let jobLocation;
let postedAt;
let role;
let level;
let skills;
let fov;
let cardFilter;
let contador;
let numberOfDeleteCards;
let newSearch;
let arrayNewSearch = [];
let seAgregoEventoBtn = 0;
let counterEvents = 0
let filterArray = [];
let filterActive = "false"
//Traer al JSON

function callData() {
    console.log(card)
    fetch('json/data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            json = data
            contador = data.length
            for (let i = 1; i < contador; i++) {
                createCard()
            }
            for (let i = 0; i < contador; i++) {
                checkCards()
                infoGeneral(i, json)
                infoTextFilters(i, json)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
}

//Create Card

const createCard = () => {
    let crearCard = document.createElement('div');
    crearCard.classList.add('card')
    crearCard.innerHTML = card[0].innerHTML
    cardsContainer.insertBefore(crearCard, card[0])
}


//Check Cards

function checkCards() {
    card = document.getElementsByClassName("card");
    titleCard = document.querySelectorAll("#cardsContainer > div > div.card-info > div.card-info-position > h1");
    logoCard = document.querySelectorAll("#cardsContainer > div> div.logo > img");
    nameCompany = document.querySelectorAll("#cardsContainer > div> div.card-info > div.card-info-general > p:nth-child(1)")
    contract = document.querySelectorAll("#cardsContainer > div > div.card-info > div.card-info-more > p:nth-child(2)")
    jobLocation = document.querySelectorAll("#cardsContainer > div> div.card-info > div.card-info-more > p:nth-child(3)")
    postedAt = document.querySelectorAll("#cardsContainer > div > div.card-info > div.card-info-more > p:nth-child(1)")
    role = document.querySelectorAll("#cardsContainer > div > div.card-filter > p.p-filter.role")
    level = document.querySelectorAll("#cardsContainer > div> div.card-filter > p.p-filter.level")
    skills = document.querySelectorAll("#cardsContainer > div> div.card-filter > p:nth-child(3)")
    cardFilter = document.querySelectorAll("#cardsContainer > div > div.card-filter")
    cardInfoGeneral = document.querySelectorAll("#cardsContainer > div > div.card-info > div.card-info-general")

}

//Agregar info a las tarjetas

function infoGeneral(i, laInfo) {
    //InsertJSON
    titleCard[i].textContent = [laInfo[i].position]
    logoCard[i].setAttribute('src', [laInfo[i].logo])
    nameCompany[i].textContent = [laInfo[i].company]
    contract[i].textContent = [laInfo[i].contract]
    jobLocation[i].textContent = [laInfo[i].location]
    postedAt[i].textContent = [laInfo[i].postedAt]

}

function infoTextFilters(i, laInfo) {
    //Filtros

    role[i].textContent = [laInfo[i].role]
    role[i].addEventListener('click', function () {
        filterJSON(role[i].textContent, "role")
        createPFilter(role[i].textContent)

    })

    level[i].textContent = [laInfo[i].level]
    level[i].addEventListener('click', function () {
        filterJSON(level[i].textContent, "level")
        createPFilter(level[i].textContent)

    })

    if (laInfo[i].tools.length > 0) {

        for (let u = 0; u < laInfo[i].tools.length; u++) {
            let createP = document.createElement('p');
            createP.textContent = [laInfo[i].tools[u]]
            createP.classList.add('p-filter');
            createP.classList.add('tools');
            cardFilter[i].insertBefore(createP, skills[i]);
            cardFilter[i].appendChild(createP);

            createP.addEventListener('click', function(e){
                allFiltersfilterArrayTools(e)

            containerFilter = document.querySelector("body > main > section.section-filter > div.container-filter")
            filterDesing = `<div><p class="p-filter" >${e.target.innerText}</p></div><div class="button-x"><span class="top-line"></span><span class="bottom-line"></span></div>`
            createDiv = document.createElement('div')
            createDiv.classList.add('filter')
            createDiv.innerHTML = filterDesing
            containerFilter.appendChild(createDiv)


            allFilters = document.querySelectorAll("#containerFilter > div")
            allFilters[counterEvents].addEventListener('click', function (e) {

                if (e.path.length == 10) {
                    e.path[2].remove()
                    counterEvents--
                    if(!counterEvents >=1){
                        filterActive = "true"
                    }
                    allFilters = document.querySelectorAll("#containerFilter > div")
                    allFiltersfilterArrayLanguagues(e)
                    nombreBuscar = e.path[3].innerText
                    deleteOneFilterLanguagesAndTools(nombreBuscar)
                }

                if (e.path.length == 9) {
                    e.path[1].remove()
                    counterEvents--
                    if(!counterEvents >=1){
                        filterActive = "true"
                    }
                    allFilters = document.querySelectorAll("#containerFilter > div")
                    nombreBuscar = e.path[2].innerText
                    deleteOneFilterLanguagesAndTools(nombreBuscar)
                }

                if (allFilters.length < 1) {
                    clearFilter()
                }

                filterActive = "false"
            })
            counterEvents++
            })


        }
    }

    for (let u = 0; u < laInfo[i].languages.length; u++) {
        let createP = document.createElement('p');
        createP.textContent = [laInfo[i].languages[u]]
        createP.classList.add('p-filter')
        createP.classList.add('lenguages');
        cardFilter[i].insertBefore(createP, skills[i])
        cardFilter[i].appendChild(createP)

        createP.addEventListener('click', function (e) {

            allFiltersfilterArrayLanguagues(e)

            containerFilter = document.querySelector("body > main > section.section-filter > div.container-filter")
            filterDesing = `<div><p class="p-filter" >${e.target.innerText}</p></div><div class="button-x"><span class="top-line"></span><span class="bottom-line"></span></div>`
            createDiv = document.createElement('div')
            createDiv.classList.add('filter')
            createDiv.innerHTML = filterDesing
            containerFilter.appendChild(createDiv)
            allFilters = document.querySelectorAll("#containerFilter > div")
            allFilters[counterEvents].addEventListener('click', function (e) {

                if (e.path.length == 10) {
                    e.path[2].remove()
                    counterEvents--
                    if(!counterEvents >=1){
                        filterActive = "true"
                    }
                    allFilters = document.querySelectorAll("#containerFilter > div")
                    allFiltersfilterArrayLanguagues(e)
                    nombreBuscar = e.path[3].innerText
                    deleteOneFilterLanguagesAndTools(nombreBuscar)
                }

                if (e.path.length == 9) {
                    e.path[1].remove()
                    counterEvents--
                    if(!counterEvents >=1){
                        filterActive = "true"
                    }
                    allFilters = document.querySelectorAll("#containerFilter > div")
                    nombreBuscar = e.path[2].innerText
                    deleteOneFilterLanguagesAndTools(nombreBuscar)
                }

                if (allFilters.length < 1) {
                    clearFilter()
                }

                filterActive = "false"
            })
            counterEvents++

        })
    }


    //New and featured
    if (laInfo[i].new == true) {
        createP = document.createElement('p')
        createP.classList.add('new')
        createP.textContent = "NEW!"
        cardInfoGeneral[i].appendChild(createP)

    }
    if (laInfo[i].featured == true) {
        card[i].classList.add('featured-active')
        createP = document.createElement('p')
        createP.classList.add('featured')
        createP.textContent = "FEATURED"
        cardInfoGeneral[i].appendChild(createP)
    }
}


//Aplicar filtros

function filterJSON(element, section) {

    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")

    if (filterArray.length < 1 || clearActive == "true" || filterActive == "true" ) {
        clearActive = "false"
        filterArray = json.filter(function (array) {
            console.log(element)
            return array[section] == element
        })
    } else {
        clearActive = "false"
        filterArray = filterArray.filter(function (array) {
            console.log(element)
            return array[section] == element
        })
        for (let i = 1; i < contador; i++) {
            card[i].classList.remove('display-none')
        }
    }
    numberOfDeleteCards = (contador - filterArray.length)
    idNoEliminar = []

    clearActive = "false"

    //mete id para no eliminar
    for (let i = 0; i < filterArray.length; i++) {
        idNoEliminar.push(filterArray[i].id)
    }

    for (let i = 0; i < (numberOfDeleteCards + idNoEliminar.length); i++) {
        card[i].classList.add('display-none')
    }
    for (let i = 0; i < idNoEliminar.length; i++) {
        id = idNoEliminar[i]
        card[id - 1].classList.remove('display-none')
    }

    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")
    clearActive = "false"

}


//Crea P en cada tarjeta para filtrar

function createPFilter(nameFilter) {
    containerFilter = document.querySelector("body > main > section.section-filter > div.container-filter")
    filterDesing = `<div><p class="p-filter" >${nameFilter}</p></div><div class="button-x"><span class="top-line"></span><span class="bottom-line"></span></div>`
    createDiv = document.createElement('div')
    createDiv.classList.add('filter')
    createDiv.innerHTML = filterDesing
    containerFilter.appendChild(createDiv)



    allFilters = document.querySelectorAll("#containerFilter > div")
    allFilters[counterEvents].addEventListener('click', function (e) {

        if (e.path.length == 10) {
            e.path[2].remove()
            counterEvents--
            filterActive = "true"
            allFilters = document.querySelectorAll("#containerFilter > div")
            filterJSON(e.path[3].innerText, "role")
            deleteOnefilterArrayAndLevel()
        }

        if (e.path.length == 9) {
            e.path[1].remove()
            counterEvents--
            filterActive = "true"
            allFilters = document.querySelectorAll("#containerFilter > div")
            filterJSON(e.path[2].innerText, "role")
            deleteOnefilterArrayAndLevel()
        }

        if (allFilters.length < 1) {
            clearFilter()
        }

        filterActive = "false"
    })
    counterEvents++
}



//funcion para filtrar

function clearFilter() {
    containerFilter.innerHTML = " "
    for (let i = 0; i <= numberOfDeleteCards; i++) {
        card[i].classList.remove('display-none')
    }
    counterEvents = 0
    clearActive = "true"

}

callData()

//Clear Filter event
clearBtn.addEventListener('click', () => {
    clearFilter()

})


function deleteOnefilterArrayAndLevel() {
    filtroContainer = document.getElementById('containerFilter')
    newSearch = filtroContainer.innerText;
    arrayNewSearch = newSearch.split("\n\n")
    console.log(arrayNewSearch)

    if (arrayNewSearch[0] == "Fullstack" || arrayNewSearch[0] == "Backend" || arrayNewSearch[0] == "Frontend") {
        filterJSON(arrayNewSearch[0], "role")
    }
    if (arrayNewSearch[0] == "Senior" || arrayNewSearch[0] == "Junior" || arrayNewSearch[0] == "Midweight") {
        filterJSON(arrayNewSearch[0], "level")

    }
    filterActive = "false"

}

function deleteOneFilterLanguagesAndTools() {
    filtroContainer = document.getElementById('containerFilter')
    newSearch = filtroContainer.innerText;
    arrayNewSearch = newSearch.split("\n\n")
    console.log(arrayNewSearch)

    if (arrayNewSearch[0] == "CSS" || arrayNewSearch[0] == "JavaScript" || arrayNewSearch[0] == "HTML" || arrayNewSearch[0] == "Python") {
        buscar = arrayNewSearch[0]
        allFiltersfilterArrayLanguagues(buscar)
    }
    filterActive = "false"
}

//filter lenguajes and tools

allTools = document.querySelectorAll("#cardsContainer > div > div.card-filter > p.tools")

//filtrar array

function allFiltersfilterArrayLanguagues(e) {
    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")
    console.log(e)

    if(e.type == "click"){
        e= e.target.innerText
    }

    if (filterArray.length < 1 || clearActive == "true" || filterActive == "true" ) {

        filterArray = json.filter(element => element.languages.includes(e))
        clearActive == "false"
        filterActive == "false"

    }

    else {
        clearActive = "false"
        filterActive == "false"
        filterArray = filterArray.filter(function (array) {
            console.log(e)
            return array.languages.includes(e)
        })
        for (let i = 1; i < contador; i++) {
            card[i].classList.remove('display-none')
        }
    }

    
    numberOfDeleteCards = (contador - filterArray.length);
    idNoEliminar = []

    //mete id para no eliminar
    for (let i = 0; i < filterArray.length; i++) {
        idNoEliminar.push(filterArray[i].id)
    }

    for (let i = 0; i < (numberOfDeleteCards + idNoEliminar.length); i++) {
        card[i].classList.add('display-none')
    }
    for (let i = 0; i < idNoEliminar.length; i++) {
        id = idNoEliminar[i]
        card[id - 1].classList.remove('display-none')
    }

    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")

    clearActive = "false"
    filterActive = "false"

}

function allFiltersfilterArrayTools(e) {
    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")
    console.log(e)

    if(e.type == "click"){
        e= e.target.innerText
    }

    if (filterArray.length < 1 || clearActive == "true" || filterActive == "true") {

        filterArray = json.filter(element => element.tools.includes(e))
        clearActive == "false"
        filterActive == "false"

    }

    else {
        clearActive = "false"
        filterActive == "false"
        filterArray = filterArray.filter(function (array) {
            console.log(e)
            return array.tools.includes(e)
        })
        for (let i = 1; i < contador; i++) {
            card[i].classList.remove('display-none')
        }
    }

    
    numberOfDeleteCards = (contador - filterArray.length);
    idNoEliminar = []

    //mete id para no eliminar
    for (let i = 0; i < filterArray.length; i++) {
        idNoEliminar.push(filterArray[i].id)
    }

    for (let i = 0; i < (numberOfDeleteCards + idNoEliminar.length); i++) {
        card[i].classList.add('display-none')
    }
    for (let i = 0; i < idNoEliminar.length; i++) {
        id = idNoEliminar[i]
        card[id - 1].classList.remove('display-none')
    }

    allFilters = document.querySelectorAll("body > main > section.section-filter > div.container-filter > div")

    clearActive = "false"
    filterActive = "false"

}