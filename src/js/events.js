const toggleTableBtn = document.getElementById('toggle-archive-btn');
const archiveTable = document.getElementById('archive-table');

toggleTableBtn.addEventListener('click', () => {
  archiveTable.classList.toggle('mb-10');
  const maxHeight = archiveTable.style.maxHeight;

  archiveTable.style.maxHeight = maxHeight
    ? null
    : archiveTable.scrollHeight + 'px';
});

function handleAddNote() {}

function handleEditNote(noteId) {}

function handleRemoveNote(noteId) {}

function handleArchiveNote(noteId) {}

function handleUnarchiveNote(noteId) {}
