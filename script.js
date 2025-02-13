let notes = [];
let nextId = 0;
let moveCompletedToEnd = false;

const listContainer = document.getElementById("list");
const textInput = document.getElementById("text");
const addBtn = document.getElementById("add-btn");
const toggleCompleted = document.getElementById("toggle-completed");

function addNote() {
  const text = textInput.value.trim();
  if (!text) return;

  notes.push({ id: nextId++, text, done: false });
  textInput.value = "";
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  renderNotes();
}

function toggleCheck(id) {
  notes = notes.map((note) =>
    note.id === id ? { ...note, done: !note.done } : note
  );
  renderNotes();
}

function renderNotes() {
  listContainer.innerHTML = "";

  let displayNotes = [...notes];
  if (moveCompletedToEnd) {
    displayNotes.sort((a, b) => a.done - b.done);
  }

  displayNotes.forEach(({ id, text, done }) => {
    listContainer.innerHTML += `
      <div class="todo-item">
        <p style="text-decoration: ${
          done ? "line-through" : "none"
        }">${text}</p>
        <input type="checkbox" ${
          done ? "checked" : ""
        } onclick="toggleCheck(${id})">
        <img src="https://w7.pngwing.com/pngs/29/45/png-transparent-delete-key-logo-button-text-rectangle-logo-thumbnail.png" 
             class="delete-btn" alt="Delete" onclick="deleteNote(${id})">
      </div>
    `;
  });
}

addBtn.onclick = addNote;
textInput.onkeyup = (e) => e.key === "Enter" && addNote();
toggleCompleted.onchange = () => {
  moveCompletedToEnd = toggleCompleted.checked;
  renderNotes();
};

renderNotes();
