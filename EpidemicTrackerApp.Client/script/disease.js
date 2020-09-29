var jwt = localStorage.getItem("myJwt");

function saveDisease() {

  var diseaseId = parseInt(document.getElementById("txt-id").value);

  let diseasedt = {

    diseaseId: (diseaseId) ? diseaseId : 0,
    name: document.getElementById("txt-dn").value,
    type: document.getElementById("txt-dt").value,

  };

  var url = "http://localhost:64494/api/Disease";
  var bearer = 'Bearer ' + jwt;
   fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer

    },
    body: JSON.stringify(diseasedt)
  })
    .then(response => {
      response.json();
      getDisease();
      console.log("Success: ", response);

    })
    .catch(error => console.error("Error: ", error));
}





//Bootstrap Data Tables

var latestdId;
function getDisease() {

  var url = "http://localhost:64494/api/Disease";
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  }).then(
    res => {
      res.json().then(
        data => {
          console.log(data);
          if (data.length > 0) {
            var row = "";

            // loop
            data.forEach((disease) => {
              row += "<tr>";
              row += "<td>" + disease.name + "</td>";
              row += "<td>" + disease.type + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info" onclick="editData(${disease.diseaseId})">Edit</button></td></tr>`;

            })
            document.getElementById("diseasedata").innerHTML = row;
            latestdId = data[data.length - 1];

            debugger; console.log(latestdId.diseaseId);

          }
        });
    });
}
getDisease();

//Edit Function
function editData(diseaseId) {
  var url = "http://localhost:64494/api/Disease/" + diseaseId;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  }).then(
    res => {
      res.json().then(
        data => {
          console.log(data);
          document.getElementById("txt-id").value = data.diseaseId;
          document.getElementById("txt-dn").value = data.name;
          document.getElementById("txt-dt").value = data.type;


        });
    });
}

//Clear Form
function resetForm() {
  document.getElementById("form-reset").reset();

}