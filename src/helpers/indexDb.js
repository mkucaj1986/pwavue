class IndexDB {
  constructor () {
    this.indexDb = null;
    this.initDB();
  }

  get database () {
    return this.indexDb;
  }

  initDB () {
    if ('indexedDB' in window) {
      console.log('Browser support indexedDB" in window');
    }
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    let request = indexedDB.open('Vue-db', 4);

    request.onupgradeneeded = event => {
      this.indexDb = event.target.result;
      let objectStore = this.indexDb.createObjectStore('person', {
        keyPath: 'id'
      });
      objectStore.createIndex('username', 'username', { unique: false });
      objectStore.createIndex('age', 'age', { unique: false });
      objectStore.createIndex('sex', 'sex', { unique: false });
    };

    request.onsuccess = event => {
      this.indexDb = event.target.result;
    };

    request.onerror = event => {
      alert("Why didn't you allow my web app to use IndexedDB?!");
    };

    return request;
  }

  addToDB (store, data) {
    let transaction = this.indexDb.transaction([store], 'readwrite');
    let objectStore = transaction.objectStore(store);
    let objectStoreRequest = objectStore.add(data);
    objectStoreRequest.onsuccess = event => {
      console.log('The data has been written successfully');
    };

    objectStoreRequest.onerror = event => {
      console.log('The data has been written failed');
    };
    return objectStoreRequest;
  }
  getFromDB (store) {
    if (this.indexDb !== null) {

      // open a read/write db transaction, ready for retrieving the data
      let transaction = this.indexDb.transaction([store], 'readwrite');

      // report on the success of the transaction completing, when everything is done
      transaction.oncomplete = event => {
        console.log('The data has been getting successfully');
      };

      transaction.onerror = event => {
        console.log('The data has been getting failed');
      };

      // create an object store on the transaction
      let objectStore = transaction.objectStore(store);

      // Make a request to get a record by key from the object store
      let objectStoreRequest = objectStore.getAll();

      return objectStoreRequest;
    } else {
      return false;
    }
  }
  deleteFromDB (store) {

    // open a read/write db transaction, ready for deleting the data
    let transaction = this.indexDb.transaction([store], 'readwrite');

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = event => {
      console.log('The data has been getting successfully');
    };

    transaction.onerror = event => {
      console.log('The data has been getting failed');
    };

    // create an object store on the transaction
    let objectStore = transaction.objectStore(store);

    // Make a request to delete the specified record out of the object store
    let objectStoreRequest = objectStore.delete(1);

    return objectStoreRequest;
  }
}

export default IndexDB;
