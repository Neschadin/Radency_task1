import data from '../data.json';
import { generateId } from './utils';

export const mockupDB = data.data;
export const archiveDB = [];
export const categories = ['Task', 'Random Thought', 'Idea'];

export function getTaskById(id) {
  return mockupDB.find((task) => task.id === +id);
}

export function deleteFromDB(id, targetDB) {
  const db =
    targetDB === 'mockupDB'
      ? mockupDB
      : targetDB === 'archiveDB'
      ? archiveDB
      : null;

  if (!db) return;

  try {
    const i = db.findIndex((task) => task.id === +id);
    if (i === -1) return;

    db.splice(i, 1);
  } catch (error) {
    console.error('An error occurred while deleting from the database:', error);
  }
}

export function moveTaskBetweenDatabases(id, action) {
  const sourceDB =
    action === 'archive' ? mockupDB : action === 'unarchive' ? archiveDB : null;
  const targetDB =
    action === 'archive' ? archiveDB : action === 'unarchive' ? mockupDB : null;

  if (!sourceDB || !targetDB) return;

  try {
    const i = sourceDB.findIndex((task) => task.id === +id);
    if (i === -1) return;

    const task = sourceDB.splice(i, 1)[0];
    targetDB.push(task);
  } catch (error) {
    console.error('An error occurred while moving between databases:', error);
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

export function updateTaskInDB(id, newTask) {
  const i = mockupDB.findIndex((task) => task.id === id);

  try {
    if (i !== -1) mockupDB[i] = newTask;
  } catch (error) {
    console.error('An error occurred while updating the database:', error);
  }
}

export function saveTaskToDB(newTask) {
  const preparedNewTask = prepareTaskToSave(newTask);

  try {
    if (newTask.id) {
      updateTaskInDB(newTask.id, preparedNewTask);
    } else {
      mockupDB.push(preparedNewTask);
    }
  } catch (error) {
    console.error('An error occurred while saving into the databases:', error);
  }
}
