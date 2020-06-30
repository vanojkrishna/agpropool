var CACHE_NAME = "offline-agpropool";
var FOLDER_NAME = "post_requests";
var IDB_VERSION = 1;
var form_data;
var urlsToCache = [
  "/",
  "/transaction",
  "/static/script.js",
  "https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

function getObjectStore(storeName, mode) {
  return our_db.transaction(storeName, mode).objectStore(storeName);
}

function savePostRequests(url, payload) {
  var request = getObjectStore(FOLDER_NAME, "readwrite").add({
    url: url,
    payload: payload,
    method: "POST"
  });
  request.onsuccess = function(event) {
    console.log("added new post request");
  };

  request.onerror = function(error) {
    console.error(error);
  };
}

function openDatabase() {
  var indexedDBOpenRequest = indexedDB.open("agpropool");

  indexedDBOpenRequest.onerror = function(error) {
    console.error("IndexedDB error:", error);
  };

  indexedDBOpenRequest.onupgradeneeded = function() {
    // This should only execute if there's a need to create/update db.
    this.result.createObjectStore(FOLDER_NAME, {
      autoIncrement: true,
      keyPath: "id"
    });
  };

  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function() {
    our_db = this.result;
  };
}

var our_db;
openDatabase();

self.addEventListener("fetch", function(event) {
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  } else if (event.request.clone().method === "POST") {
    event.respondWith(
      fetch(event.request.clone()).catch(function(error) {
        savePostRequests(event.request.clone().url, form_data);
      })
    );
  }
});

self.addEventListener("message", function(event) {
  console.log("form data", event.data);
  if (event.data.hasOwnProperty("form_data")) {
    form_data = event.data.form_data;
  }
});

function sendPostToServer() {
  var savedRequests = [];
  var req = getObjectStore(FOLDER_NAME).openCursor();

  req.onsuccess = async function(event) {
    var cursor = event.target.result;

    if (cursor) {
      savedRequests.push(cursor.value);
      cursor.continue();
    } else {
      for (let savedRequest of savedRequests) {
        var requestUrl = savedRequest.url;
        var payload = JSON.stringify(savedRequest.payload);
        var method = savedRequest.method;
        var headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          api_key: "abcd"
        };
        fetch(requestUrl, {
          headers: headers,
          method: method,
          body: payload
        })
          .then(function(response) {
            if (response.status < 400) {
              getObjectStore(FOLDER_NAME, "readwrite").delete(savedRequest.id);
            }
          })
          .catch(function(error) {
            console.error("Failed to send", error);
            throw error;
          });
      }
    }
  };
}
self.addEventListener("sync", function(event) {
  if (event.tag === "sendFormData") {
    event.waitUntil(sendPostToServer());
  }
});
