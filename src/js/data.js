import { data } from '../data.json';
import { generateId } from './utils';

export const mockupDB = data;
export const categories = ['Task', 'Random Thought', 'Idea'];

export function getTaskById(id) {
  return mockupDB.find((task) => task.id === +id);
}

function indexFinder(id) {
  return mockupDB.findIndex((task) => task.id === +id);
}

export function checkerArchiveTasks() {
  return mockupDB.some((item) => item.archived);
}

export function deleteFromDB(id) {
  try {
    const i = indexFinder(id);
    if (i === -1) return;

    mockupDB.splice(i, 1);
  } catch (error) {
    console.error('An error occurred while deleting from the database:', error);
  }
}

export function toggleTaskArchivedStatus(id, action) {
  try {
    const i = indexFinder(id);
    if (i === -1) return;

    if (action === 'archive') {
      mockupDB[i].archived = true;
    } else if (action === 'unarchive') {
      delete mockupDB[i].archived;
    }
  } catch (error) {
    console.error('An error occurred while marking task as archived:', error);
  }
}

function prepareTaskToSave(newTask) {
  const { id, name, content, category } = newTask;

  if (id) {
    const existingTask = getTaskById(id);
    return { ...existingTask, name, content, category };
  } else {
    const now = new Date();
    return {
      id: generateId(),
      createdAt: now.toISOString().slice(0, 19),
      name,
      content,
      category,
    };
  }
}

export function saveTaskToDB(newTask) {
  const preparedNewTask = prepareTaskToSave(newTask);
  const { id } = newTask;

  try {
    if (id) {
      const i = indexFinder(id);
      if (i !== -1) mockupDB[i] = preparedNewTask;
    } else {
      mockupDB.push(preparedNewTask);
    }
  } catch (error) {
    console.error('An error occurred while saving into the databases:', error);
  }
}
