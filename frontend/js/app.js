const API_URL = "https://localhost:5000/api/todos";

const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector(".todo-list");

/* FETCH TODOS */
document.addEventListener("DOMContentLoaded", fetchTodos);

async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const result = await res.json();

    if (result.success) {
      todoList.innerHTML = "";
      result.data.forEach((todo) => {
        createTodoItem(todo);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

/* ADD TODO */
addBtn.addEventListener("click", async () => {
  if (!input.value.trim()) return;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });

  const result = await res.json();
  if (result.success) {
    createTodoItem(result.data);
    input.value = "";
  }
});

/* CREATE TODO ITEM */
function createTodoItem(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo._id;

  if (todo.completed) li.classList.add("completed");

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.title;

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "✔";
  saveBtn.style.display = "none";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "✖";
  cancelBtn.style.display = "none";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";

  let originalText = todo.title;

  /* COMPLETE */
  completeBtn.addEventListener("click", async () => {
    li.classList.toggle("completed");

    await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: li.classList.contains("completed") }),
    });
  });

  /* DELETE */
  deleteBtn.addEventListener("click", async () => {
    await fetch(`${API_URL}/${todo._id}`, { method: "DELETE" });
    li.remove();
  });

  /* EDIT */
  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.value = textSpan.textContent;
    editInput.className = "edit-input";

    li.replaceChild(editInput, textSpan);
    editInput.focus();

    completeBtn.style.display = "none";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  /* SAVE */
  saveBtn.addEventListener("click", async () => {
    const editInput = li.querySelector("input");
    if (!editInput.value.trim()) return;

    textSpan.textContent = editInput.value;

    await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editInput.value }),
    });

    li.replaceChild(textSpan, editInput);
    reset();
  });

  /* CANCEL */
  cancelBtn.addEventListener("click", () => {
    const editInput = li.querySelector("input");
    textSpan.textContent = originalText;
    li.replaceChild(textSpan, editInput);
    reset();
  });

  function reset() {
    completeBtn.style.display = "inline-block";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  }

  actions.append(completeBtn, editBtn, saveBtn, cancelBtn, deleteBtn);
  li.append(textSpan, actions);
  todoList.appendChild(li);
}
