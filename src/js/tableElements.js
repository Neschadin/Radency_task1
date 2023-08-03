import { extractDatesFromContent, formatDate } from './utils';

function createBtn(id, icon) {
  return `
      <td class="bg-gray-500 bg-opacity-20">
      <button id="${id}">
      <span class="material-symbols-outlined">${icon}</span>
      </button>
      </td>
    `;
}

export function createCategoryIcon(category) {
  let iconName = '';

  switch (category) {
    case 'Task':
      iconName = 'task';
      break;
    case 'Idea':
      iconName = 'emoji_objects';
      break;
    case 'Random Thought':
      iconName = 'psychology';
      break;
    default:
      break;
  }

  return `<span class="material-symbols-outlined">${iconName}</span>`;
}

export function createTableRow(data, isArchive = false) {
  const { id, name, createdAt, content, category } = data;
  const newRow = document.createElement('tr');
  newRow.id = id;
  const archAction = isArchive ? 'unarchive' : 'archive';
  const icon = archAction;
  const editBtnCell = isArchive ? '' : createBtn('edit_' + id, 'edit');

  newRow.innerHTML = `
      <td>${createCategoryIcon(category)}</td>
      <td>${name}</td>
      <td>${formatDate(createdAt)}</td>
      <td>${category}</td>
      <td>${content}</td>
      <td>${extractDatesFromContent(content) || ''}</td>
      ${editBtnCell}
      ${createBtn(archAction + '_' + id, icon)}
      ${createBtn('delete_' + id, 'delete')}
    `;

  return newRow;
}

export function emptyMessage(message) {
  return `<tr><td colspan="10" class="text-xl text-center font-semibold">${message}</td></tr>`;
}
