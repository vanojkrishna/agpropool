if ("serviceWorker" in navigator) {
  // we are checking here to see if the browser supports the service worker api
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("sw.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "Service Worker registration was successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );

    navigator.serviceWorker.ready
      .then(function(registration) {
        console.log("Service Worker Ready");
        return registration.sync.register("sendFormData");
      })
      .then(function() {
        console.log("sync event registered");
      })
      .catch(function() {
        // system was unable to register for a sync,
        // this could be an OS-level restriction
        console.log("sync registration failed");
      });
  });
}
function submitFunction(event) {
  event.preventDefault();
  console.log("submitted", event);
  name = $("#name").val();
  age = $("#age").val();
  gender = $("input[name='gender']:checked").val();
  village = $("#village").val();
  phone = $("#phone").val();
  console.log("values,", name, age, gender, village, phone);
  $("#addFarmerForm").hide();
  // send  to server
  var data = {
    name: name,
    age: Number(age),
    gender: gender,
    village: village,
    phone_number: phone,
    created_by: "Agent1"
  };
  // send message to service worker via postMessage
  var msg = {
    form_data: data
  };
  navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
      // Let's see if you have a subscription already
      return serviceWorkerRegistration.pushManager.getSubscription();
    })
    .then(function(subscription) {
      if (!subscription) {
        // You do not have subscription
      }
      // You have subscription.
      // Send data to service worker
      navigator.serviceWorker.controller.postMessage(msg); // <--- This line right here sends our data to sw.js
    });

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/v1/farmer",
    contentType: "application/json",
    crossDomain: true,
    headers: { api_key: "abcd" },
    data: JSON.stringify(data),
    success: function(response) {
      console.log(response);
      console.log("data sent to server successfully");
      $("#addFarmerForm")[0].reset();
    },
    dataType: "json"
  });
  return false;
}
function getFarmersList(selId) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/v1/listFarmers",
    contentType: "application/json",
    crossDomain: true,
    headers: { api_key: "abcd" },
    success: function(response) {
      $.each(response, function(i, item) {
        $("#" + selId).append(
          $("<option>", {
            value: item.id,
            text: item.name
          })
        );
      });
    },
    dataType: "json"
  });
}

function addTransaction() {
  let farmerId = $("#farmersList").val();
  let date = $("#txnDate").val();
  let cropsData = {};
  let cropCummulativeData = [];
  $("#cropsDiv")
    .children()
    .each(function(ele) {
      let cid = $(this)
        .find("select")
        .val();
      let cqty = $(this)
        .find("input")
        .val();
      if (cqty > 0) {
        if (cropsData.hasOwnProperty(cid)) {
          cropsData[cid] += Number(cqty);
        } else {
          cropsData[cid] = Number(cqty);
        }
      }
    });
  $.each(cropsData, function(id, qty) {
    cropCummulativeData.push({ crop_id: id, qty: qty });
  });
  let reqObj = {};
  reqObj.farmer_id = farmerId;
  reqObj.date = date;
  reqObj.created_by = "Agent1";
  reqObj.crops = cropCummulativeData;
  console.log(reqObj);
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/v1/transaction",
    contentType: "application/json",
    crossDomain: true,
    headers: { api_key: "abcd" },
    data: JSON.stringify(reqObj),
    success: function(response) {
      console.log(response);
      $("#addTransactionForm")[0].reset();
    },
    dataType: "json"
  });
  return false;
}
function getInventory() {
  let date = $("#invDate").val();
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/v1/inventory",
    contentType: "application/json",
    crossDomain: true,
    headers: { api_key: "abcd" },
    data: "date=" + date,
    success: function(response) {
      if (!$.isEmptyObject(response)) {
        let tblStr = "";
        $.each(response, function(k, obj) {
          tblStr +=
            "<tr><td>" +
            obj.crop_name +
            "</td><td>" +
            obj.quantity +
            "</td></tr>";
        });
        $("#resultDiv").html(
          "<table class='table'><thead><tr><th>Crop</th><th>Quantity</th></tr></thead><tbody>" +
            tblStr +
            "</tbody></table>'"
        );
      } else {
        $("#resultDiv").html(
          "<div class='alert alert-danger w-100'>No data</div>"
        );
      }
    }
  });
  return false;
}
