
let elementos = {
  negro:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/1/f/f/1ffd9e753c8054cc61456ac7fac1ac89.mp3",
  blanco:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/d/5/0/d508fe45cecaf653904a0e774084bb5c.mp3",
  azul: "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/4/8/d/48d6215903dff56238e52e8891380c8f.mp3",
  rojo: "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/b/d/a/bda9643ac6601722a28f238714274da4.mp3",
  verde:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/f/d/4/fd4eda9d43965d7746cdf911757e85b2.mp3",
  amarillo:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/d/4/8/d487dd0b55dfcacdd920ccbdaeafa351.mp3",
  triangulo:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/c/e/f/cef44b46f16ae8ecf664df4266ffdbf9.mp3",
  circulo:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/9/b/6/9b6ddeba5b33e577c07c35d8505c6072.mp3",
  rectangulo:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/d/9/8/d98492c62533926b6961f41406756a4e.mp3",
  cuadrado:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/2/f/c/2fc01ec765ec0cb3dcc559126de20b30.mp3",
  estrella:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/8/f/f/8ff953dd97c4405234a04291dee39e0b.mp3",
  perro:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/0/6/d/06d80eb0c50b49a509b49f2424e8c805.mp3",
  gato: "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/d/0/7/d077f244def8a70e5ea758bd8352fcd8.mp3",
  rana: "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/9/3/8/938c2cc0dcc05f2b68c4287040cfcf71.mp3",
  serpiente:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/d/e/1/de1b2a7baf7850243db71c4abd4e5a39.mp3",
  manzana:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/1/f/3/1f3870be274f6c49b3e31a0c6728957f.mp3",
  pera: "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/8/8/9/8893dc16b1b2534bab7b03727145a2bb.mp3",
  fresa:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/4/9/5/495bf9840649ee1ec953d99f8e769889.mp3",
  naranja:
    "https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/f/e/0/fe01d67a002dfa0f3ac084298142eccd.mp3",
};

function reproducirAudio(clase) {
  console.log(clase);
  document.querySelector(
    `.${clase}`
  ).innerHTML += `<audio src=${elementos[clase]} autoplay></audio>`;
}

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question_text");
const optionContainer = document.querySelector(".option-container");
const quizBox = document.querySelector(".quiz");
const resultBox = document.querySelector(".result-box");

const spanCorrect = document.querySelector(".correct");
const spanIncorrect = document.querySelector(".incorrect");

const enviar = document.querySelector("#btnEnviar");

const nombre = document.querySelector(".nombre");
const edad = document.querySelector(".edad");
let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
function setAvailableQuestion() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestion.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.innerHTML =
    "Pregunta " + (questionCounter + 1) + " de " + quiz.length;
  const questionIndex =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestion.indexOf(questionIndex);
  availableQuestion.splice(index1, 1);

  //opciones

  const optionLen = currentQuestion.opciones.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";
  for (let i = 0; i < optionLen; i++) {
    const optIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.opciones[optIndex];
    option.id = i;
    option.className = "option_q";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function getResult(opt) {
  const id = parseInt(opt.id);
  if (id === currentQuestion.respuesta) {
    opt.classList.add("correcto");
    correctAnswers++;
    console.log("correcto");
  } else {
    opt.classList.add("incorrecto");
    incorrectAnswers++;
    console.log("incorrecto");
  }
}
function next() {
  if (questionCounter === quiz.length) {
    quizOver();
    console.log("uwuw");
  } else {
    getNewQuestion();
  }
}
function quizOver() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  quizResult();
}

function quizResult() {
  spanCorrect.innerHTML = correctAnswers;
  spanIncorrect.innerHTML = incorrectAnswers;
}
window.onload = function () {
  setAvailableQuestion();
  getNewQuestion();
};
/*
const database = getDatabase(app)
enviar.addEventListener("click", (e) => {
  database.ref("/Estudiante").set({
    nombre: nombre.value.trim(),
    edad: edad.value.trim(),
    correctas: correctAnswers,
    incorrectas: incorrectAnswers,
  });
});*/
