const notesContainer = document.getElementById('app');
const addBtn = document.getElementById('add-note');

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.appendChild(noteElement);
});

addBtn.addEventListener("click", () => addNote());


function getNotes(){
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}

function createNoteElement(id, content){
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note";

  element.addEventListener("change", function() {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", function() {
    deleteNote(id, element);
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
  id: Math.floor(Math.random() * 100000),
  content: ""};

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}