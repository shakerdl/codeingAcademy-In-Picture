"use strict";
function init() {
  var gCurrQuestIdx = 0;
  var answered = [];
  var gQuests = [
    {
      id: 1,
      text: "Which logo fits ?",
      opts: [
        { id: 1, text: "codeacademy", isCorrect: true },
        { id: 2, text: "codecamp" },
      ],
      image: "img/1.png",
    },
    {
      id: 2,
      text: "is turtle?",
      opts: [
        { id: 1, text: "yes", isCorrect: true },
        { id: 2, text: "no" },
      ],
      image: "img/2.png",
    },
  ];

  // app start here
  const container = document.querySelector(".container");
  render(container);
  function render(container) {
    // render question start here...
    goNext(container);
    //container is the root element in the dom.
  }

  function goNext(container) {
    if (gCurrQuestIdx === 0) {
      answered = [];
    }
    container.innerHTML = ""; // rest for the next game
    const currQuestion = gQuests[gCurrQuestIdx];
    const renderedQuestion = renderQuestion(currQuestion, onAnswer);
    container.appendChild(renderedQuestion);
  }
  function renderQuestion(question, onAnswered) {
    const root = createElement("div");
    root.classList.add("question");
    const renderedImage = renderImage(question.image, question.text);
    const renderedText = renderQuestionText(question.text);
    root.appendChild(renderedImage);
    root.appendChild(renderedText);
    for (var index = 0; index < question.opts.length; index++) {
      const currOpt = question.opts[index];
      const renderedAnswer = renderAnswer(currOpt);
      renderedAnswer.onclick = () => {
        onAnswered(question, currOpt);
      };
      root.appendChild(renderedAnswer);
    }
    return root;
    // return dom element
  }
  function renderAnswer(answer) {
    const elAnswer = createElement("div");
    elAnswer.classList.add("answer");
    elAnswer.innerText = answer.text;
    return elAnswer;
  }

  function renderImage(src, alt) {
    const image = createElement("img");
    image.src = src;
    image.alt = alt;
    return image;
  }

  function onAnswer(question, opt) {
    answered.push({ question, answer: opt });
    // dp something with the result
    const nextIndex = gCurrQuestIdx++;
    if (nextIndex === gQuests.length - 1) {
      gCurrQuestIdx = 0; // reset to the start.
      renderResult(container);
      // no more question
    } else {
      goNext(container); // go to the next question.
    }
  }
  function renderResult(container) {
    container.innerHTML = "";
    // container.style.display = 'none'
    const root = createElement("div");
    root.classList.add("victory-container");
    // render heading success or faild.
    const heading = createElement("h1");
    heading.classList.add("victory-heading");
    const arrAnswered = getSuccessOrFaild();
    var isSuccessAll = true;
    for (let index = 0; index < arrAnswered.length; index++) {
      const isSuccess = arrAnswered[index];
      if (!isSuccess) {
        isSuccessAll = false;
        break;
      }
    }
    if (isSuccessAll) {
      heading.innerHTML = "Victory";
      heading.classList.add("victory-success");
    } else {
      heading.innerHTML = "faild";
      heading.classList.add("victory-faild");
    }
    // render reset button
    const button = createElement("button");
    button.innerHTML = "RESET";
    button.classList.add("victory-button");
    button.classList.add("btn");
    button.onclick = () => {
      // button, onclick
      // this is all what you need to reset the app..
      goNext(container);
    };
    root.appendChild(heading);
    root.appendChild(button);
    container.appendChild(root);
    //answered is global, bad practice.
  }

  function getSuccessOrFaild() {
    const stringBuilder = []; // just example.
    for (let i = 0; i < answered.length; i++) {
      const elAnswer = answered[i].answer;
      stringBuilder.push(elAnswer.isCorrect);
    }
    return stringBuilder;
  }
  function renderQuestionText(text) {
    const heading = createElement("h2");
    heading.innerText = text;
    return heading;
  }
}
