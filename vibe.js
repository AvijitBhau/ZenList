
const inputDate = document.getElementById("taskDate");
const now = new Date();
const formatted = now.toISOString().slice(0, 16);
const createBox = document.getElementById("createTask");
const createIcon = document.querySelectorAll(".overlay p");
const button = document.querySelectorAll(".btns button");
inputDate.min = formatted;

createIcon[0].addEventListener('click', () => {
    createBox.style.animation = "popup 0.1s linear forwards";
    document.body.style.pointerEvents = "none";
    createBox.style.pointerEvents = "all";
    document.body.style.overflow = "hidden";
    formCreation.reset();
})

button[1].addEventListener("click", () => {
    createBox.style.animation = "popcancel 0.1s linear forwards";
    document.body.style.pointerEvents = "all";
    document.body.style.overflow = "";
})

const createTask = (name, date) => {
    let list = document.createElement("li");
    list.classList.add("item");
    
    let cbox = document.createElement("div");
    cbox.classList.add("checkbox");
    
    let inputCheck = document.createElement("input");
    inputCheck.name = "tasks";
    inputCheck.type = "checkbox";
    
    let content = document.createElement("div");
    content.classList.add("content");
    
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    label1.textContent = name;
    label2.textContent = date;
    
    taskListing.appendChild(list);
    list.appendChild(cbox);
    cbox.appendChild(inputCheck);
    list.appendChild(content);
    content.appendChild(label1);
    content.appendChild(label2);
}

const dustbin = document.getElementById("dustbin");

const removeTask = () => {
    document.querySelectorAll('.checkbox input[type="checkbox"]');
        // console.log("checked");
}

dustbin.addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "flex";
    document.getElementById("parent").style.pointerEvents = "none";
    document.getElementById("deleteDB").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "flex";
    document.body.style.overflow = "hidden";

})

document.querySelectorAll("#delbtns button")[0].addEventListener('click', () => {
    removeTask();
})

document.querySelectorAll("#delbtns button")[1].addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "";
    document.getElementById("parent").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "none";
    document.body.style.overflow = "";
})

const inputName = document.getElementById("taskName");
const inputDesc = document.getElementById("taskDesc");
const formCreation = document.getElementById("taskForm");

let main = document.querySelector("main");
let taskListing = document.createElement("ul");
taskListing.classList.add("listings");
main.appendChild(taskListing);


const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => {
    createTask(task.name, task.date);
})



let nothingToShow = document.createElement("div");
nothingToShow.classList.add("no-task");
nothingToShow.textContent = "No tasks added yet!";
taskListing.appendChild(nothingToShow);

if (tasks.length === 0) {
    nothingToShow.style.display = "flex";
}
else {
    nothingToShow.style.display = "none";
}

const saveTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.push({
        name: inputName.value,
        date: inputDate.value,
        desc: inputDesc.value
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

formCreation.addEventListener('submit', () => {
    createBox.style.animation = "popright 0.1s linear forwards";
    if (inputDesc.value === "") {inputDesc.value = "undefined";}
    saveTask();
    createTask(inputName.value, inputDate.value);
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
