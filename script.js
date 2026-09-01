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
        <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${task.id})"
        >

        <span class="task-text ${task.completed ? "completed" : ""}">
            ${task.text}
        </span>
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

function toggleTask(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}