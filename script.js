let buttonCreateCard = document.getElementById('buttonCreateCard');
let closeModal = document.getElementById('closeModal');
let modalCriacao = document.getElementById('modalCriacao');
let titleCardInput = document.getElementById('newCardTitle').value;
let btCriarCard = document.getElementById('btCriarCard');
let btCancelCard = document.getElementById('btCancelCard');
let cardObjects = [];
let containerCards = document.getElementById('containerCards');
let html = ""


buttonCreateCard.addEventListener('click', () => {
    modalCriacao.style.display = "flex";
    titleCard.value = document.getElementById('newCardTitle').value;
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
    cardObjects.forEach(card => {


        html = `<div class="contaBox">\
                <div class="divContaHeader">\
                    <div>\
                        <span>${card.month}</span>\
                        <p>${card.day}</p>\
                    </div>\
                    <input type="checkbox" class="cardCheckbox">\
                </div>\
                <div class="contaInfos">\
                    <h2>${card.title}</h2>\
                </div>\
                <div class="contaValores">\
                    <p class="valorConta">R$ ${card.value.replace(".", ",")}</p>\
                </div>\
            </div>`
    });
    containerCards.innerHTML += html;
    resetInputs();
});

containerCards.addEventListener("click", (e) => {
    const card = e.target.closest('.contaBox');
    // se clicou diretamente no checkbox, não faz nada
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") return;

    const checkbox = card.querySelector(".cardCheckbox");
    if (checkbox.checked) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    console.log(checkbox);
    console.log("card clicado", card.innerHTML);
})

function resetInputs() {
    document.getElementById('titleCard').value = "";
    document.getElementById('newCardTitle').value = "";
    document.getElementById('valueCard').value = "";
    document.getElementById('dateCard').value = "";
}