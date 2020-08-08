let db;
const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("transactions", {autoIncrement: true});
}

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
}

request.onerror = function(event) {
    console.log("Error" + event.target.errorCode);
}

function saveRecord(transactionRecord) {
    console.log(transactionRecord);
    const transaction = db.transaction(["transactions"], "readwrite");
    const transactionStore = transaction.objectStore("transactions");

    transactionStore.add(transactionRecord);
}

function checkDatabase() {
    const transaction = db.transaction(["transactions"], "readwrite");
    const transactionStore = transaction.objectStore("transactions");
    const getAll = transactionStore.getAll();

    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                const transaction = db.transaction(["transactions"], "readwrite");
                const transactionStore = transaction.objectStore("transactions");
                transactionStore.clear();
            });
        }
    };
};

window.addEventListener("online",checkDatabase);
