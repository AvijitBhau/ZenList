const inputDate = document.getElementById("taskDate");
const now = new Date();
const formatted = now.toISOString().slice(0, 16);
const createBox = document.getElementById("createTask");
const createIcon = document.querySelectorAll(".overlay p");
const button = document.querySelectorAll(".btns button");
inputDate.min = formatted;

createIcon[0].addEventListener('click', () => {
    createBox.style.animation = "popup 0.1s linear forwards";
    formCreation.reset();
})

button[1].addEventListener("click", () => {
    createBox.style.animation = "popcancel 0.1s linear forwards";
    // window.location.reload();
})

const inputName = document.getElementById("taskName");
const inputDesc = document.getElementById("taskDesc");
const formCreation = document.getElementById("taskForm");
let a = 0;

formCreation.addEventListener('submit', () => {
    event.preventDefault();
    createBox.style.animation = "popright 0.1s linear forwards";

    if (inputDesc.value === "") {inputDesc.value = "undefined";}

    localStorage.setItem('taskName', inputName.value);
    localStorage.setItem('taskDate', formatted);
    localStorage.setItem('taskDesc', inputDesc.value);
    
    const savedName = localStorage.getItem('taskName');
    const savedDate = localStorage.getItem('taskDate');
    const savedDesc = localStorage.getItem('taskDesc');
    // document.querySelectorAll(".content label")[0].textContent = savedName;
    // document.querySelectorAll(".content label")[1].textContent = savedDate;
    // console.log(savedName);
    // console.log(savedDate);
    // console.log(savedDesc);

    
    // console.log(taskListing);
    // console.log(a);
    // console.log(taskListing[a]);
    
    
    let taskListing = document.getElementsByClassName("listings");
    let list = document.createElement("li");
    list.classList.add("item");

    let cbox = document.createElement("div");
    cbox.classList.add("checkbox");

    let inputCheck = document.createElement("input");
    inputCheck.id = "newTask";
    inputCheck.name = "tasks";
    inputCheck.type = "checkbox";

    let content = document.createElement("div");
    content.classList.add("content");

    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    label1.textContent = savedName;
    label2.textContent = savedDate;

    taskListing[a].appendChild(list);
    list.appendChild(cbox);
    cbox.appendChild(inputCheck);
    list.appendChild(content);
    content.appendChild(label1);
    content.appendChild(label2);
    a++;
})

const navDate = document.querySelectorAll(".date p");

const currentTime = () => {
    const dayName = now.toLocaleString('default', {weekday: 'long'});
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'long'});
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
        // second: '2-digit'
    });

    navDate[0].textContent = `${dayName} | ${month} ${day}, ${year} | ${time}`;
}

currentTime();


