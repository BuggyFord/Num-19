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
 // console.error('putDb not implemented');
  const contentDb = await openDB('jate', 1);
  const tx = contentDb.transaction('', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content});
  const result = await request;
  console.log('Data saved to the database', result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //  const contentDb = await openDB.apply('jate', 1);
  try {
    const contentDb = await openDB('jate', 1);
    console.log("DB: ", contentDb)
    const tx = contentDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = await store.get(1);
    console.log("Request Store: ", request)
    const result = request;
    console.log("Results: ", result)
    console.log('result.value', result.value);
    return result.value;
    
  } catch (error) {
    
    console.error("Error: ", error);
}
};

initdb();
