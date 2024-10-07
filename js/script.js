const totalCards = 8; // Total de cartas (4 pares)
const availableCards = ['senor', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let currentMove = 0;
let currentAttempts = 0;

// Define un objeto con las imágenes
const cardImages = {
    senor: ['../img/camaron.jpg', '../img/camaron1.jpg'],
    K: ['../img/fabric.jpg', '../img/fabric1.jpg'],
    Q: ['../img/factory.jpg', '../img/factory1.jpg'],
    J: ['../img/folder.jpg', '../img/folder1.jpg'],
};

let cardTemplate = '<div class="card-prueba"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelectorAll('.face')[0].id == selectedCards[1].querySelectorAll('.face')[0].id) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

// Crear un arreglo de pares de cartas
let cardPairs = [];

// Crear pares de cartas
availableCards.forEach(card => {
    cardPairs.push(card, card); // Agrega cada carta dos veces para crear un par
});

// Mezclar el arreglo de pares de cartas
cardPairs.sort(() => Math.random() - 0.5);

// Almacenar imágenes usadas para evitar duplicados
let usedImages = {};

// Crear cartas
for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);

    let faceValue = cardPairs[i]; // Obtener el valor de la carta

    // Asignar imágenes a las cartas
    let images = cardImages[faceValue];
    
    // Asegurarse de que cada carta obtenga imágenes únicas
    let randomImageIndex;
    let randomImage;

    do {
        randomImageIndex = Math.floor(Math.random() * images.length);
        randomImage = images[randomImageIndex];
    } while (usedImages[randomImage]); // Repetir si la imagen ya fue usada

    // Marcar la imagen como usada
    usedImages[randomImage] = true;

    // Asignar ID y fondo de la carta
    cards[i].querySelectorAll('.face')[0].id = faceValue;
    cards[i].querySelectorAll('.face')[0].style.backgroundImage = `url(${randomImage})`; // Asigna la imagen

    console.log(`Card ${i}: ID = ${faceValue}, Image = ${randomImage}`); // Debugging

    cards[i].querySelectorAll('.card-prueba')[0].addEventListener('click', activate);
}
