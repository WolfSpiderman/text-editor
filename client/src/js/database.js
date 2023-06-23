import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const req = store.put({ value: content, id: 1 });
  const res = await req;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve all saved objects and sort them by ID
  const objects = await store.getAll();
  objects.sort((a, b) => (a.id > b.id ? 1 : -1));

  // Retrieve the value of the latest object or return empty string if no objects retrieved
  const latestObject = objects.length > 0 ? objects[objects.length - 1] : { value: '' };
  return latestObject.value;
};


initdb();
