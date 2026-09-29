const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `
            <div class="task-content">
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-text ${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn" onclick="deleteTask(${task.id})">
                Hapus
            </button>
        `;

        taskList.appendChild(li);
    });
}

function clearInput() {
    taskInput.value = "";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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

saveTasks();
renderTasks();
}

function toggleTask(id) {
    tasks.forEach(function (task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });

   saveTasks();
renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});