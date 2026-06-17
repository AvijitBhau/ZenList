
const inputDate = document.getElementById("taskDate");
const now = new Date();
const formatted = now.toISOString().slice(0, 16);
inputDate.min = formatted;
const createBox = document.getElementById("createTask");
const createIcon = document.querySelectorAll(".overlay p");
const button = document.querySelectorAll(".btns button");
const description = document.getElementById("description");
const descriptionName = description.querySelector(".tName");
const descriptionDate = description.querySelector(".tDate");
const descriptionDesc = description.querySelector(".tDescrip");

const loadDescription = (name, date, desc) => {
    descriptionName.innerHTML = `<strong>Name:</strong> ${name}`;
    descriptionDate.innerHTML = `<strong>Due Date:</strong> ${date}`;
    descriptionDesc.innerHTML = `<strong>Description:</strong> ${desc || "No description"}`;
};


/* When Create(+) is clicked, pops up with a creating a new goal page. */
createIcon[0].addEventListener('click', () => {
    createBox.style.animation = "popup 0.1s linear forwards";
    document.body.style.pointerEvents = "none";
    createBox.style.pointerEvents = "all";
    document.body.style.overflow = "hidden";
    formCreation.reset();
})

/* On form submition page, when "cancel" button is clicked, this event runs; hiding the form. */
button[1].addEventListener("click", () => {
    createBox.style.animation = "popcancel 0.1s linear forwards";
    document.body.style.pointerEvents = "all";
    document.body.style.overflow = "";
})

/* Creates each individual tasks based on its Id, Name, Date, Desc. */
const createTask = (id, name, date, desc) => {
    let list = document.createElement("li");
    list.classList.add("item");
    list.dataset.id = id;

    let cbox = document.createElement("div");
    cbox.classList.add("checkbox");

    let inputCheck = document.createElement("input");
    inputCheck.name = "tasks";
    inputCheck.type = "checkbox";

    let content = document.createElement("div");
    content.classList.add("content");

    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    let label3 = document.createElement("label");
    label1.textContent = name;
    label2.textContent = date;
    label3.textContent = '[Show details]';
    label3.classList.add("show-datails");

    label3.addEventListener('click', () => {
        loadDescription(name, date, desc);
        description.style.animation = "zoomPopUp .1s linear forwards";
        document.getElementById("parent").style.pointerEvents = "none";
        document.getElementById("deleteDB").style.pointerEvents = "all";
        document.querySelector(".bg-cover").style.display = "flex";
        document.body.style.overflow = "hidden";
    });
    
    document.getElementById("okBtn").addEventListener("click", () => {
        description.style.animation = "zoomPopBack .1s linear forwards";
        document.getElementById("parent").style.pointerEvents = "";
        document.getElementById("deleteDB").style.pointerEvents = "";
        document.querySelector(".bg-cover").style.display = "";
        document.body.style.overflow = "";
    })

    

    taskListing.appendChild(list);
    list.appendChild(cbox);
    cbox.appendChild(inputCheck);
    list.appendChild(content);
    content.appendChild(label1);
    content.appendChild(label2);
    content.appendChild(label3);
}




/* removeTask() removes the task selected by pressing the delete icon.
It uses unique task-Ids to match and delete the tasks. */
// Note: This function deletes the task from the webpage only.
const removeTask = () => {
    const idIsToDelete = [];
    let checkBoxes = document.querySelectorAll('.checkbox input:checked');
    checkBoxes.forEach(box => {
        const li = box.closest("li");
        
        idIsToDelete.push(
            Number(li.dataset.id)
        );
        li.remove();
    })
    deleteTasks(idIsToDelete);
}

const dustbin = document.getElementById("dustbin");

/* Events works when the delete icon is clicked. */
dustbin.addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "flex";
    document.getElementById("parent").style.pointerEvents = "none";
    document.getElementById("deleteDB").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "flex";
    document.body.style.overflow = "hidden";

})

/* Deletes the task which is selected based on matching task-Ids. */
document.querySelectorAll("#delbtns button")[0].addEventListener('click', () => {
    removeTask();
    document.getElementById("deleteDB").style.display = "none";
    document.getElementById("parent").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "none";
    document.body.style.overflow = "";
    window.location.reload();
})

/* Cancels the deletion of the tasks. */
document.querySelectorAll("#delbtns button")[1].addEventListener('click', () => {
    document.getElementById("deleteDB").style.display = "";
    document.getElementById("parent").style.pointerEvents = "all";
    document.querySelector(".bg-cover").style.display = "none";
    document.body.style.overflow = "";
})

const inputName = document.getElementById("taskName");
const inputDesc = document.getElementById("taskDesc");
const formCreation = document.getElementById("taskForm");

/* Created a "ul" tag to store tasks within "li". */
let main = document.querySelector("main");
let taskListing = document.createElement("ul");
taskListing.classList.add("listings");
main.appendChild(taskListing);


/* Loading tasks from localeStorage */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => {
    createTask(task.id, task.name, task.date, task.desc);
})

/* Formatting tasks - Date and time properly to display. */
const refinedTimeForTask = () => {
    const dateForTask = new Date(inputDate.value);
    const date = dateForTask.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
    return date;
}

/* Created an element to show "no tasks" when there isn't any tasks added to prevent blank spaces */
let nothingToShow = document.createElement("div");
nothingToShow.classList.add("no-task");
nothingToShow.textContent = "No tasks added yet!";
taskListing.appendChild(nothingToShow);

const updateEmptyStatus = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks.length === 0) {
        nothingToShow.style.display = "flex";
    }
    else {
        nothingToShow.style.display = "none";
    }
}
updateEmptyStatus();

/* saveTask() saves the tasks to localeStorage as soon as it is submitted through the form. */
const saveTask = () => {
    const id = Date.now();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        id,
        name: inputName.value,
        date: refinedTimeForTask(),
        desc: inputDesc.value
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return id;
}

/* deleteTasks() deletes the task from the localeStorage. 
whereas removeTask() deletes the task from webpage. */
const deleteTasks = (idIsToDelete) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => !idIsToDelete.includes(task.id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* This event happens only when the submit button is clicked inside the form (while creating tasks).
It creates tasks on webpage with createTask() and save it in localeStorage. */
formCreation.addEventListener('submit', () => {
    // event.preventDefault();
    createBox.style.animation = "popright 0.1s linear forwards";
    if (inputDesc.value === "") { inputDesc.value = "undefined"; }
    const id = saveTask();
    createTask(id, inputName.value, refinedTimeForTask(), inputDesc.value);
})


/* Sets the current time in a proper format */
const navDate = document.querySelectorAll(".date p");

const currentTime = () => {
    const dayName = now.toLocaleString('default', { weekday: 'long' });
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
        // second: '2-digit'
    });

    navDate[0].textContent = `${dayName} | ${month} ${day}, ${year} | ${time}`;
}

currentTime();

/* This function sets the visiblity of "settings" icon in nav tray for big screens */
const footerIconText = (settings) => {
    let msgToAdd = document.querySelectorAll(".navbar i");
    if (window.matchMedia("(min-width: 1200px)").matches) {
        msgToAdd[0].textContent = "Home";
        msgToAdd[1].style.display = "none";
        msgToAdd[2].textContent = "Calender";
        msgToAdd[3].textContent = "Profile";
        settings.textContent = "Settings";
    }
    else if (window.matchMedia("(min-width: 768px)").matches) {
        msgToAdd[0].textContent = "Home";
        msgToAdd[1].style.display = "none";
        msgToAdd[2].textContent = "Calender";
        msgToAdd[3].textContent = "Profile";
        settings.textContent = "Settings";  
    }
    else {
        msgToAdd[0].textContent = "";
        msgToAdd[1].style.display = "none";
        msgToAdd[2].textContent = "";
        msgToAdd[3].textContent = "";
    }
}

/* Created new icon "settings" when screen is resized for bigger screens  */
let navbar = document.querySelector(".navbar");
let settings = document.createElement("i");
settings.setAttribute('class', 'fa-solid fa-gear');
navbar.appendChild(settings);
footerIconText(settings);

/* Sets an indicator tray for navigation icons to track which sections are currently opened. */
const footerNav = document.querySelectorAll(".navbar i");
const indicator = document.querySelector(".indicator");

const moveIndicator = (button) => {
    indicator.style.left = button.offsetLeft + (button.offsetWidth - indicator.offsetWidth) / 2 + "px";
}

/* Helper function to apply glow to active icon in dark theme */
const updateActiveIconGlow = () => {
    if (!isLightTheme) {
        document.querySelectorAll(".navbar i").forEach(icon => {
            if (icon.classList.contains("active")) {
                icon.style.textShadow = "0 0 15px #c0edca";
            } else {
                icon.style.textShadow = "";
            }
        });
    }
}

moveIndicator(document.querySelector(".active"));
footerNav.forEach(icons => {
    icons.addEventListener('click', () => {
        footerNav.forEach(icon => {
            icon.classList.remove("active");
        })
        icons.classList.add("active");
        moveIndicator(icons);
        updateActiveIconGlow();
    })
})

/* "Settings" icon in the navigation tray toggles wrt the screen size */
window.addEventListener("resize", footerIconText);


/* These functions toggles between the dark theme and the light theme. */
const toggleDarkTheme = document.querySelector(".icons i");
let isLightTheme = (localStorage.getItem('theme') || 'light') === 'light';
const darkTheme = () => {
    document.body.style.backgroundColor = "#333333";
    main.style.color = "#fefff8";
    document.querySelectorAll(".listings li").forEach(task => {
        task.style.backgroundColor = "#1a1919";
    })
    taskListing.style.color = "#fefff8";
    dustbin.style.color = "white";
    document.querySelector("header").style.backgroundColor = "rgb(35, 46, 33)";
    document.querySelector("header").style.color = "white";
    nothingToShow.style.backgroundColor = "#1a1919";
    nothingToShow.style.color = "#fefff8";
    document.querySelector(".overlay p").style.backgroundColor = "#c0edca";
    document.querySelector(".overlay p").style.color = "rgb(35, 46, 33)";
    document.querySelector(".overlay").style.boxShadow = "0 0 20px #c0edca";
    document.querySelector(".navbar").style.backgroundColor = "rgb(35, 46, 33)";
    document.querySelectorAll(".navbar i").forEach(icon => {
        icon.style.color = "white";
    });
    updateActiveIconGlow();
    document.getElementById("createTask").style.color = "#c0edca";
    document.getElementById("createTask").style.backgroundColor = "#333333";
    document.getElementById("createTask").style.borderColor = "#c0edca";
    document.querySelectorAll("#taskForm input").forEach(inputColorChanger => {
        inputColorChanger.style.backgroundColor = "black";
        inputColorChanger.style.border = "1px solid #c0edca";
        inputColorChanger.style.borderRadius = "2px";
        inputColorChanger.style.color = "white";
        inputColorChanger.style.colorScheme = "dark";
    });
    document.querySelector('.btns button[type="submit"]').style.backgroundColor = "#c0edca";
    document.querySelector('.btns button[type="submit"]').style.color = "black";
    document.querySelector('.btns button[type="reset"]').style.backgroundColor = "transparent";
    document.querySelector('.btns button[type="reset"]').style.color = "#c0edca";
    document.querySelector('.btns button[type="reset"]').style.borderColor = "#c0edca";
    document.querySelector(".indicator").style.backgroundColor = "#c0edca";
    document.querySelectorAll('.checkbox input[type="checkbox"]').forEach(checkBoxColor => {
        checkBoxColor.style.borderColor = "#c0edca";
    });
    document.getElementById("deleteDB").style.backgroundColor = "#333333";
    document.getElementById("deleteDB").style.borderColor = "#c0edca";
    document.getElementById("deleteDB").style.color = "#eaf1ec";
    document.querySelector('#delbtns button[type="submit"]').style.backgroundColor = "#c0edca";
    document.querySelector('#delbtns button[type="submit"]').style.color = "black";
    document.querySelector('#delbtns button[type="submit"]').style.borderColor = "#c0edca";
    document.querySelectorAll('#delbtns button')[1].style.backgroundColor = "transparent";
    document.querySelectorAll('#delbtns button')[1].style.color = "#c0edca";
    document.querySelectorAll('#delbtns button')[1].style.borderColor = "#c0edca";
    description.style.backgroundColor = "#333333";
    description.style.borderColor = "#c0edca";
    description.style.color = "#c0edca";
    document.querySelector(".descBoxOkButton button").style.backgroundColor = "transparent";
    document.querySelector(".descBoxOkButton button").style.color = "#c0edca";
    document.querySelector(".descBoxOkButton button").style.borderColor = "#c0edca";
    
}
const lightTheme = () => {
    document.body.style.backgroundColor = "";
    main.style.color = "";
    document.querySelectorAll(".listings li").forEach(task => {
        task.style.backgroundColor = "";
    })
    taskListing.style.color = "";
    dustbin.style.color = "";
    document.querySelector("header").style.backgroundColor = "";
    document.querySelector("header").style.color = "";
    nothingToShow.style.backgroundColor = "";
    nothingToShow.style.color = "";
    document.querySelector(".overlay p").style.backgroundColor = "";
    document.querySelector(".overlay p").style.color = "";
    document.querySelector(".overlay").style.boxShadow = "";
    document.querySelector(".navbar").style.backgroundColor = "";
    document.querySelectorAll(".navbar i").forEach(icon => {
        icon.style.color = "";
    });
    document.getElementById("createTask").style.color = "";
    document.getElementById("createTask").style.backgroundColor = "";
    document.getElementById("createTask").style.borderColor = "";
    document.querySelectorAll("#taskForm input").forEach(inputColorChanger => {
        inputColorChanger.style.backgroundColor = "";
        inputColorChanger.style.border = "";
        inputColorChanger.style.borderRadius = "";
        inputColorChanger.style.color = "";
        inputColorChanger.style.colorScheme = "";
    });
    document.querySelector('.btns button[type="submit"]').style.backgroundColor = "";
    document.querySelector('.btns button[type="submit"]').style.color = "";
    document.querySelector('.btns button[type="reset"]').style.backgroundColor = "";
    document.querySelector('.btns button[type="reset"]').style.color = "";
    document.querySelector('.btns button[type="reset"]').style.borderColor = "";
    document.querySelector(".indicator").style.backgroundColor = "";
    document.querySelectorAll('.checkbox input[type="checkbox"]').forEach(checkBoxColor => {
        checkBoxColor.style.borderColor = "";
    });
    document.getElementById("deleteDB").style.backgroundColor = "";
    document.getElementById("deleteDB").style.borderColor = "";
    document.getElementById("deleteDB").style.color = "";
    document.querySelector('#delbtns button[type="submit"]').style.backgroundColor = "";
    document.querySelector('#delbtns button[type="submit"]').style.color = "";
    document.querySelector('#delbtns button[type="submit"]').style.borderColor = "";
    document.querySelectorAll('#delbtns button')[1].style.backgroundColor = "";
    document.querySelectorAll('#delbtns button')[1].style.color = "";
    document.querySelectorAll('#delbtns button')[1].style.borderColor = "";
    description.style.backgroundColor = "";
    description.style.borderColor = "";
    description.style.color = "";
    document.querySelector(".descBoxOkButton button").style.backgroundColor = "";
    document.querySelector(".descBoxOkButton button").style.color = "";
    document.querySelector(".descBoxOkButton button").style.borderColor = "";
}

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    isLightTheme = false;
    darkTheme();
    toggleDarkTheme.classList.remove('fa-moon');
    toggleDarkTheme.classList.add('fa-sun');
} else {
    isLightTheme = true;
    lightTheme();
    toggleDarkTheme.classList.remove('fa-sun');
    toggleDarkTheme.classList.add('fa-moon');
}

toggleDarkTheme.addEventListener("click", () => {
    if (isLightTheme) {
        toggleDarkTheme.style.animation = "ghumar .5s linear forwards";
        setTimeout(() => {
            darkTheme();
            toggleDarkTheme.classList.remove("fa-moon");
            toggleDarkTheme.classList.add("fa-sun");
        }, 300);
    }
    else {
        toggleDarkTheme.style.animation = "ghumar1 .7s linear forwards";
        setTimeout(() => {
            lightTheme();
            toggleDarkTheme.classList.remove("fa-sun");
            toggleDarkTheme.classList.add("fa-moon");
        }, 300);
    }
    isLightTheme = !isLightTheme;
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
})