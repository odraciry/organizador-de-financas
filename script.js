let buttonCreateCard = document.getElementById('buttonCreateCard');
let closeModal = document.getElementById('closeModal');
let modalCriacao = document.getElementById('modalCriacao');
let titleCardInput = document.getElementById('newCardTitle').value;
let titleCard = document.getElementById('titleCard');
let btCriarCard = document.getElementById('btCriarCard');
let btCancelCard = document.getElementById('btCancelCard');
let cardObjects = [];
let containerCards = document.getElementById('containerCards');
let message = document.getElementById('message');
let messageStatus = ""
let html = "";
let isMobile = false;
const mediaQuery = window.matchMedia("(max-width: 768px)");
window.addEventListener("DOMContentLoaded", () => isMobileFunction())
mediaQuery.addEventListener("change", () => isMobileFunction());

buttonCreateCard.addEventListener('click', () => {
    document.querySelector('body').classList.add("no-scroll")
    modalCriacao.style.display = "flex";
    titleCard.value = document.getElementById('newCardTitle').value;
    console.log(document.getElementById('newCardTitle').value)
});
closeModal.addEventListener('click', () => {
    document.querySelector('body').classList.remove("no-scroll")
    modalCriacao.style.display = "none";
    resetInputs();
});
btCancelCard.addEventListener('click', () => {
    document.querySelector('body').classList.remove("no-scroll")
    modalCriacao.style.display = "none";
    resetInputs();
});
btCriarCard.addEventListener('click', () => {
    const dataObj = new Date(document.getElementById('dateCard').value);
    const dia = dataObj.getDate();
    const mes = dataObj.toLocaleString("pt-BR", { month: "long" });
    if (isNaN(dataObj.getTime())) {
        messageStatus = "red"
        message.innerText = `Data invalida`
        return notification();
    }
    if (mes != '' && mes != 'Invalid Date' && dia > 0 && document.getElementById('titleCard').value != '' && document.getElementById('valueCard').value != '') {
        modalCriacao.style.display = "none";
        cardObjects.push({
            id: generateId(),
            title: document.getElementById('titleCard').value,
            day: dia,
            month: mes,
            value: document.getElementById('valueCard').value
        })
    } else {
        messageStatus = "red"
        message.innerText = "falha campos invalidos"
        return notification();

    }
    document.querySelector('body').classList.remove("no-scroll")
    console.log(cardObjects);
    message.innerText = "card criado com sucesso"
    messageStatus = "green"

    notification();
    salvarCards();
    carregarCards();
    resetInputs();

});

containerCards.addEventListener("click", (e) => {
    const card = e.target.closest('.contaBox');
    cardSize(card)
    let cardTargetId = card.dataset.id;
    const checkbox = card.querySelector(".cardCheckbox");
    const iconLixeira = card.querySelector(".iconLixeira");
    // se clicou diretamente no checkbox, não faz nada
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox"){
        if (!checkbox.checked) {
                console.log("if2")

                iconLixeira.style.display = "none";
            } else {
                console.log("else2")

                iconLixeira.style.display = "block";
            }
            return
    };
    if (e.target.tagName === "IMG") {
        // alert('ola mundo')
        cardObjects = cardObjects.filter(card => card.id.toString() !== cardTargetId.toString());
        console.log(cardObjects)
        salvarCards();
        carregarCards();
    };


    if (!isMobile) {
        if (checkbox.checked) {
            console.log("if1")
            checkbox.checked = false;
            iconLixeira.style.display = "none";
        } else {
            console.log("else1")

            checkbox.checked = true;
            iconLixeira.style.display = "block";
        }
        checkbox.addEventListener("input", () => {
            if (checkbox.checked) {
                console.log("if2")

                checkbox.checked = false;
                iconLixeira.style.display = "none";
            } else {
                console.log("else2")

                checkbox.checked = true;
                iconLixeira.style.display = "block";
            }
        })
    }



})

function cardSize(card) {
    console.log(isMobile)
    if (window.matchMedia("(max-width: 768px)").matches) {
        console.log(card)
        card.addEventListener("touchstart", () => {
            console.log("ta DENTRO do LISTENER")
            card.classList.remove("contaBoxMobile")
        })
        card.addEventListener("mouseleave", () => {
            console.log("ta FORA do LISTENER")
            card.classList.add("contaBoxMobile")
        })
    }
}

function isMobileFunction() {
    if (window.innerWidth < 768) {
        return isMobile = true;
    } else {
        return isMobile = false;
    }
}

function pushCards() {
    // containerCards.innerHTML = "";
    html = "";
    cardObjects.forEach(card => {
        html += `<div class="contaBox contaBoxMobile" data-id="${card.id}">\
                <div class="divContaHeader">\
                    <div>\
                        <span>${card.month}</span>\
                        <p>${card.day}</p>\
                    </div>\
                    <input type="checkbox" class="cardCheckbox">\
                </div>\
                <div class="contaInfos">\
                    <h2 class="titleCard">${card.title}</h2>\
                </div>\
                <div class="contaValores">\
                    <p class="valorConta">R$ ${card.value.replace(".", ",")}</p>\
                    <img src="img/lixeira.png" alt="" class="iconLixeira">\
                </div>\
            </div>`
    });
    containerCards.innerHTML = html;

}

function resetInputs() {
    document.getElementById('titleCard').value = "";
    document.getElementById('newCardTitle').value = "";
    document.getElementById('valueCard').value = "";
    document.getElementById('dateCard').value = "";
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

function salvarCards() {
    localStorage.setItem("cards", JSON.stringify(cardObjects));
}

function carregarCards() {
    cardObjects = JSON.parse(localStorage.getItem("cards")) || [];
    pushCards(); // redesenha os cards no HTML
}

function notification() {
    const messageNotification = document.getElementById("messageNotification");
    if (messageStatus == "green") {
        messageNotification.style.borderTopColor = "rgb(7, 229, 7)"

    } else {
        messageNotification.style.borderTopColor = "red"
    }
    // mostra
    messageNotification.classList.remove("notificationOff");
    messageNotification.classList.add("notificationOn");

    // depois de 3s, começa a sumir
    setTimeout(() => {
        messageNotification.classList.add("notificationSumir");
    }, 3000);

    // depois de 4s, esconde de vez
    setTimeout(() => {
        messageNotification.classList.remove("notificationSumir");
        messageNotification.classList.remove("notificationOn");
        messageNotification.classList.add("notificationOff");
    }, 5000);
}

// carregar os cards quando a página abre
window.addEventListener("DOMContentLoaded", () => {
    localStorage
    carregarCards();
});

// salvar os cards sempre que recarregar/fechar
window.addEventListener("beforeunload", () => {
    salvarCards();
});