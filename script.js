let buttonCreateCard = document.getElementById('buttonCreateCard');
let closeModal = document.getElementById('closeModal');
let modalCriacao = document.getElementById('modalCriacao');
let titleCardInput = document.getElementById('newCardTitle').value;
let titleCard = document.getElementById('titleCard');
let btCriarCard = document.getElementById('btCriarCard');
let btCancelCard = document.getElementById('btCancelCard');
let cardObjects = [];
let containerCards = document.getElementById('containerCards');
// let iconLixeira = document.getElementById('iconLixeira');
let html = "";


buttonCreateCard.addEventListener('click', () => {
    modalCriacao.style.display = "flex";
    titleCard.value = document.getElementById('newCardTitle').value;
    console.log(document.getElementById('newCardTitle').value)
});
closeModal.addEventListener('click', () => {
    modalCriacao.style.display = "none";
    resetInputs();
});
btCancelCard.addEventListener('click', () => {
    modalCriacao.style.display = "none";
    resetInputs();
});
btCriarCard.addEventListener('click', () => {
    const dataObj = new Date(document.getElementById('dateCard').value);
    const dia = dataObj.getDate();
    const mes = dataObj.toLocaleString("pt-BR", { month: "long" });
    if (isNaN(dataObj.getTime())) return alert(`Data inválida: ${dataObj}`)
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
        return alert(`
                VALORES INVALIDOS, VALIDE:
                {
                    Título: ${document.getElementById('titleCard').value},
                    Mês: ${mes},
                    Dia: ${dia},
                    Valor: ${document.getElementById('valueCard').value}
                }
                `)
    }

    console.log(cardObjects);
    salvarCards()
    carregarCards();
    resetInputs();
});

containerCards.addEventListener("click", (e) => {
    const card = e.target.closest('.contaBox');
    let cardTargetId = card.dataset.id;
    const checkbox = card.querySelector(".cardCheckbox");
    const iconLixeira = card.querySelector(".iconLixeira");
    // se clicou diretamente no checkbox, não faz nada
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") return;
    if (e.target.tagName === "IMG") {
        alert('ola mundo')
        cardObjects = cardObjects.filter(card => card.id.toString() !== cardTargetId.toString());
        console.log(cardObjects)
        salvarCards();
        carregarCards();
    };


    if (checkbox.checked) {
        checkbox.checked = false;
        iconLixeira.style.display = "none";
    } else {
        checkbox.checked = true;
        iconLixeira.style.display = "block";
    }
    checkbox.addEventListener("input", () => {
        if (checkbox.checked) {
            checkbox.checked = false;
            iconLixeira.style.display = "none";
        } else {
            checkbox.checked = true;
            iconLixeira.style.display = "block";
        }
    })

})

function pushCards() {
    // containerCards.innerHTML = "";
    html = "";
    cardObjects.forEach(card => {
        html += `<div class="contaBox" data-id="${card.id}">\
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


// carregar os cards quando a página abre
window.addEventListener("DOMContentLoaded", () => {
  carregarCards();
});

// salvar os cards sempre que recarregar/fechar
window.addEventListener("beforeunload", () => {
  salvarCards();
});