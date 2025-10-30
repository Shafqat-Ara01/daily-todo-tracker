const todoList = document.querySelector(".todoList");
const addTodo = document.querySelector(".addTodo");
const todoInput = document.querySelector("#todoInput");
const tasksLeft = document.querySelector(".tasksLeft");
const clearComplete = document.querySelector(".clearComplete");
const allVisibility = document.querySelector(".All");
const activeVisibility = document.querySelector(".Active");
const completedVisibility = document.querySelector(".Completed");
let currentFilter = "all";

let toDos = [
  {
    text: "Learn javaScript",
    completed: false,
  },
  {
    text: "Build mini Projects",
    completed: false,
  },
  {
    text: "Post on LinkedIn",
    completed: false,
  },
];

//for applying .completed and checking of checkbox
todoList.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  if (e.target.type === "checkbox") {
    toDos[index].completed = e.target.checked;
  }
  renderTodos();
});

//for adding new todo
addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    return;
  }
  0;

  toDos.push({ text: newTodo, completed: false });
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

//for removing clear by re-rendring
clearComplete.addEventListener("click", (e) => {
  e.preventDefault();
  toDos = toDos.filter((todo) => !todo.completed);
  currentFilter="all";
  setActiveFilter(allVisibility);
  renderTodos();
});

//for showimg all todos
allVisibility.addEventListener("click", (e) => {
  e.preventDefault();
  currentFilter = "all";
  setActiveFilter(allVisibility);
  renderTodos();
});

//for showing visible one's
activeVisibility.addEventListener("click", (e) => {
  e.preventDefault();
  currentFilter = "active";
  setActiveFilter(activeVisibility);
  renderTodos();
});

//for showing completed one's
completedVisibility.addEventListener("click", (e) => {
  e.preventDefault();
  currentFilter = "completed";
  setActiveFilter(completedVisibility);
  renderTodos();
});

//main function
function renderTodos() {
  todoList.innerHTML = "";
  let visibleTodos = toDos;
  if (currentFilter === "active") {
    visibleTodos = toDos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    visibleTodos = toDos.filter((todo) => todo.completed);
  }
  visibleTodos.forEach((todo, idx) => {
    const li = document.createElement("li");

    //checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("data-index", idx);
    //span
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (checkbox.checked) {
      span.classList.add("completed");
    }

    li.append(checkbox, span);
    todoList.append(li);
  });

  //tasks left
  const remaining = toDos.filter((todo) => !todo.completed).length; //as initially all are false so they become true and filtered out and when they turn true this filter makes them false and they get excluded.
  tasksLeft.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;
  //clear complete
  const hasCompleted = toDos.some((todo) => todo.completed);
  clearComplete.style.visibility = hasCompleted ? "visible" : "hidden";
}
renderTodos();

//for setting active filter
function setActiveFilter(selected) {
  [allVisibility, activeVisibility, completedVisibility].forEach((link) =>
    link.classList.remove("active")
  );

  selected.classList.add("active");
}
