[file name]: main.js
[file content begin]
let name = document.getElementById("name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let message = document.getElementById("message");
let inputs = document.querySelectorAll("input, textarea");

let form = document.querySelector("form");
let button = document.getElementById("button");

let sideBar = document.getElementById("side-bar");
let allowForm = true;

const CHAT_ID = "1682195869";
const BOT_TOKEN = "8129002117:AAFsEYM6PGd1U8oaARgUtFwHC3dSMWcIsxU";

function sendForm() {
  allowForm = true; // Сбрасываем значение каждый раз при отправке
  
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      allowForm = false;
      break;
    }
  }
  
  if (!allowForm) {
    alert("Пожалуйста, введите все данные");
    return false; // Прерываем выполнение
  } else {
    const data = {
      chat_id: CHAT_ID,
      text: `New offer:\nИмя: ${name.value}\nКоличество: ${age.value}\nEmail: ${email.value}\nСообщение: ${message.value}\n`,
    };

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);
      form.innerHTML = `<h1>Сообщение отправлено!</h1>`;
      button.style.display = "none";
      
      // Очистка полей формы
      inputs.forEach(input => input.value = "");
    })
    .catch(err => {
      console.log(err);
      alert("Ошибка при отправке сообщения. Попробуйте еще раз.");
    });
  }
}

function openSideBar() {
  sideBar.style.right = "0";
}

function closeSideBar() {
  sideBar.style.right = "-200px";
}
[file content end]
