const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${task.text}</span>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function clearInput() {
    taskInput.value = "";
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Tugas tidak boleh kosong.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    renderTasks();

    clearInput();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});