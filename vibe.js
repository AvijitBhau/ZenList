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
})

const createTask = (name, date) => {
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
    
    taskListing.appendChild(list);
    list.appendChild(cbox);
    cbox.appendChild(inputCheck);
    list.appendChild(content);
    content.appendChild(label1);
    content.appendChild(label2);
}

const dustbin = document.getElementById("dustbin");

const removeTask = () => {
    if (document.getElementById("newTask").checked) {
        // document.getElementsByClassName("list")[0].remove();
        console.log("checked");
    }
}

dustbin.addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "flex";
    document.getElementById("parent").style.pointerEvents = "none";
    document.getElementById("deleteDB").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "flex";
    // document.getElementById("parent").style.background = "black";

})

document.querySelectorAll("#delbtns button")[0].addEventListener('click', () => {
    removeTask();
})

document.querySelectorAll("#delbtns button")[1].addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "";
    document.getElementById("parent").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "none";
    
})

const inputName = document.getElementById("taskName");
const inputDesc = document.getElementById("taskDesc");
const formCreation = document.getElementById("taskForm");

let main = document.querySelector("main");
let taskListing = document.createElement("ul");
taskListing.classList.add("listings");
main.appendChild(taskListing);
// console.log(localStorage.getItem("taskName"));

const savedName = localStorage.getItem("taskName");
const savedDate = localStorage.getItem('taskDate');
const savedDesc = localStorage.getItem('taskDesc');

if (savedName) {
    createTask(savedName, savedDate);
}


let nothingToShow = document.createElement("div");
nothingToShow.classList.add("no-task");
nothingToShow.textContent = "No tasks added yet!";
taskListing.appendChild(nothingToShow);

if (taskListing.children.length == 1) {
    nothingToShow.style.display = "flex";
}
else {
    nothingToShow.style.display = "none";
}

formCreation.addEventListener('submit', () => {
    // event.preventDefault();
    createBox.style.animation = "popright 0.1s linear forwards";
    
    if (inputDesc.value === "") {inputDesc.value = "undefined";}
    
    localStorage.setItem('taskName', inputName.value);
    localStorage.setItem('taskDate', inputDate.value);
    localStorage.setItem('taskDesc', inputDesc.value);

    createTask(savedName, savedDate);
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


const footerNav = document.querySelectorAll(".navbar i");
const indicator = document.querySelector(".indicator");

const moveIndicator = (button) => {
    indicator.style.left = button.offsetLeft + (button.offsetWidth - indicator.offsetWidth) / 2 + "px";
}
moveIndicator(document.querySelector(".active"));
footerNav.forEach(icons => {
    icons.addEventListener('click', () => {
        footerNav.forEach(icon => {
            icon.classList.remove("active");
        })
        icons.classList.add("active");
        moveIndicator(icons);
    })
})
