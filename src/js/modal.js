const addTaskButton = document.getElementById('add-task');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalContent = document.getElementById('modal-content');

addTaskButton.addEventListener('click', openModalForAdd);

export function openModalForAdd() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');

//   modalName.value = '';
//   modalCategory.value = 'Task';
//   modalContent.value = '';
}


export function openModalForEdit(taskId) {
  const taskData = getTaskById(taskId); // Replace this with your function to get task data by ID

  if (taskData) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    modalName.value = taskData.name;
    modalCategory.value = taskData.category;
    modalContent.value = taskData.content;
  }
}

const noteForm = document.getElementById('note-form');
noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
});


// {const notesTable = document
//   .getElementById('notes-table-container')
//   .getElementsByTagName('table')[0];
// notesTable.addEventListener('click', (event) => {
//   if (event.target && event.target.id.startsWith('edit_')) {
//     const taskId = event.target.id.replace('edit_', '');
//     openModalForEdit(taskId);
//   }
// });
// }