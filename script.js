let currentMessageIndex = 0;
const messages = [
    "Olá neném!",
    "Lembra q eu estava estudando programação e você seria a primeira a testar algo q eu iria criar?",
    "Então hj vim trazer um pouco do meu \"estudo\" através de um little pedido de desculpa, preciso q você responda essas pequenas dúvidas.",
    "te deixei chateada?",
    "você pode me perdoar?!",
    "hummm, estou analisando suas respostas, agora irei para ultima pergunta.",
    "você ainda me ama?",
    "espero q saiba q eu te amo mt, peço desculpa por n ter te tratado da forma q eu deveria. Você é tudo q eu tenho.",
    "pode voltar pro chat agora HEHE"
];

const responses = [
    [{text: "Olá coração!"}],
    [{text: "Sim"}, {text: "Não"}],
    [{text: "HUMM"}],
    [{text: "Sim, deixou!!"}, {text: "Não viaja"}],
    [{text: "Sim coração"}, {text: "Não, você foi mt bocó"}],
    [{text: "HUMM"}],
    [{text: "Claro, coração eu te amo mt"}, {text: "Não te amo pq eu sou mal"}],
    [{text: "Vou gravar isso coração"}],
    [{text: "Tá bom"}]
];

const messagesContainer = document.getElementById("messages");
const optionsContainer = document.getElementById("options-container");

const confetti = document.createElement("div");
confetti.id = "confetti";
confetti.innerText = "🎉🎉🎉";
document.body.appendChild(confetti);

function displayMessage() {
    const message = document.createElement("p");
    message.classList.add("message");
    message.textContent = messages[currentMessageIndex];
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(message);

    const options = responses[currentMessageIndex];
    displayOptions(options);
    showConfetti(currentMessageIndex === messages.length - 1); // Show confetti at the last message
}

function displayOptions(options) {
    optionsContainer.innerHTML = ''; // Clear previous buttons
    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = option.text;
        button.addEventListener("click", () => handleAnswer(button, options));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(button, options) {
    // Disable all buttons after an answer
    const buttons = optionsContainer.querySelectorAll('.button');
    buttons.forEach(b => b.classList.add('disabled'));

    // Handle custom responses (no green/red logic here, only turn green for specific responses)
    if (button.textContent === "Olá coração!" || button.textContent === "HUMM" || button.textContent === "Vou gravar isso coração" || button.textContent === "Tá bom") {
        button.classList.add('green'); // Change color to green for these specific answers
    } else {
        // Change button color based on the answer clicked (green for positive, red for negative)
        if (button.textContent.includes("Sim") || button.textContent.includes("Claro")) {
            button.classList.add('green');
        } else {
            button.classList.add('red');
        }
    }

    // Wait before moving to the next message
    setTimeout(() => {
        currentMessageIndex++;
        if (currentMessageIndex < messages.length) {
            displayMessage();
        }
    }, 1000); // Adjust the time for each answer
}

function showConfetti(show) {
    if (show) {
        confetti.style.display = "block";
        setTimeout(() => {
            confetti.style.display = "none";
        }, 3000);
    }
}
let respostas = [];

function mostrarResposta(pergunta, resposta) {
    // Armazena a resposta
    respostas.push({pergunta: pergunta, resposta: resposta});
    // Exibe as respostas no console (pode ser visto no Console do navegador)
    console.log(respostas);
}

// Função chamada ao clicar na resposta
function clicarResposta(resposta, pergunta) {
    // Chama a função para armazenar a resposta
    mostrarResposta(pergunta, resposta);
    // Remover a pergunta atual e passar para a próxima, etc.
}

window.onload = () => {
    displayMessage();
};