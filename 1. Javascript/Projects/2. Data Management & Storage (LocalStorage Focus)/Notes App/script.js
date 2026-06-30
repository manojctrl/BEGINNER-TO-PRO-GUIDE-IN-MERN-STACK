const noteArea = document.getElementById("note-area");
const statusBadge = document.getElementById("status-badge");
let timeout = null;

window.addEventListener("DOMContentLoaded", () => {
  const savedNote = localStorage.setItem("live_note_separated", noteArea.value);
  if (savedNote) {
    noteArea.value = savedNote;
  }
});

noteArea.addEventListener("input", () => {
  statusBadge.textContent = "saving";
  statusBadge.style.backgroundColor = "#e67e22";

  setTimeout(timeout);

  timeout = setTimeout(() => {
    localStorage.setItem("live_note_separated", noteArea.value);
    statusBadge.textContent = "Saved";
    statusBadge.style.backgroundColor = "#2ecc71";
  }, 500);
});
