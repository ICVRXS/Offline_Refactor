# Offline_Refactor
A budget PWA which will take in transactions and add them to a database for bulk upload if the user enters transactions while in offline mode. The site can be downloaded to a desktop or phone and used as an app. It contains a full manifest so even if the user is not connected, the site will still render the same and they can still utilize the site by entering recent transactions. When the site comes back online, their entries are pushed from the local database to the website's database.

## installation
The repository can be cloned to a local machine and the app can be run using `npm start` once all npm packages have been installed. To access the running app, go to `localhost:3000` in your browser. The app is also deployed to Heroku for a live environment.