const request = window.indexedDB.open("budget", 1);
let db;

request.onupgradeneeded = event => {
    const db = even.target.result;
    const transactions = db.createObjectStore("transactions");
}

request.onsuccess = () => {
    db = request.result;
}

function saveRecord(transactionRecord){
    const transaction = db.transaction(["transactions"], "readwrite");
    const transactionStore = transaction.objectStore("transactions");

    transactionStore.add(transactionRecord);
}
