let card = document.getElementsByClassName("card");
let cardsContainer = document.getElementById('cardsContainer');
let titlecard;
let logoCard;
let contract;
let nameCompany;
let json;
let jobLocation;
let postedAt;
let role;
let level;
let skills;
let cardFilter;
let p;


const createCard = () => {
    let crearCard = document.createElement('div');
    crearCard.classList.add('card')
    crearCard.innerHTML = card[0].innerHTML
    cardsContainer.insertBefore(crearCard, card[0])
}

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

function info(i) {
    titleCard[i].textContent = json[i].position
    logoCard[i].setAttribute('src', json[i].logo)
    nameCompany[i].textContent = json[i].company
    contract[i].textContent = json[i].contract
    jobLocation[i].textContent = json[i].location
    postedAt[i].textContent = json[i].postedAt
    role[i].textContent = json[i].role
    level[i].textContent = json[i].level

    if(json[i].tools.length>0){
        for (let u = 0; u < json[i].tools.length; u++) {
            let createP = document.createElement('p');
            createP.textContent = json[i].tools[u];
            createP.classList.add('p-filter');
            cardFilter[i].insertBefore(createP, skills[i]);
            cardFilter[i].appendChild(createP);
        }
    }
    for (let u = 0; u <json[i].languages.length; u++) {
        let createP = document.createElement('p');
        createP.textContent = json[i].languages[u]
        createP.classList.add('p-filter')
        cardFilter[i].insertBefore(createP, skills[i])
        cardFilter[i].appendChild(createP)
    }
    if(json[i].new == true){
        createP = document.createElement('p')
        createP.classList.add('new')
        createP.textContent ="NEW!"
        cardInfoGeneral[i].appendChild(createP)

    }
    if(json[i].featured == true){
        createP = document.createElement('p')
        createP.classList.add('featured')
        createP.textContent ="FEATURED"
        cardInfoGeneral[i].appendChild(createP)
    }
   
}


function callData() {

    console.log(card)

    fetch('json/data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            json = data
            let contador = data.length
            for (let i = 1; i < contador; i++) {
                createCard()
            }
            for (let i = 0; i < contador; i++) {
                checkCards()
                info(i)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
}

callData()