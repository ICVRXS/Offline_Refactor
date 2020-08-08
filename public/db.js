const request = window.indexedDB.open("budget", 1);
let db;

request.onupgradeneeded = function(event){
    const db = event.target.result;
    db.createObjectStore("transactions", {autoIncrement: true});
}

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine){
        checkDatabase();
    }
}

request.onerror = function(event) {
    console.log("Error" + event.target.errorCode);
}

function saveRecord(transactionRecord){
    console.log(transactionRecord);
    const transaction = db.transaction(["transactions"], "readwrite");
    const transactionStore = transaction.objectStore("transactions");

    transactionStore.add(transactionRecord);
}

function checkDatabase() {
    const transaction = db.transaction(["transactions"], "readwrite");
    const transactionStore = transaction.objectStore("transactions");
    const getRequest = transactionStore.getAll();
    getRequest.onsuccess = () => {
        console.log(getRequest.result);
    }

    fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getRequest.result),
        headers: {
            Accept: "application/json, text/plain, */*",
            "content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json();
        transactionStore.clear();
    })
    .then(data => {
        if (err){
            throw err;
        }else{

        }
    });
}
