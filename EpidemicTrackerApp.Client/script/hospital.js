var jwt = localStorage.getItem("myJwt");

function saveHospital() {

  var hospitalId = parseInt(document.getElementById("txt-id").value);


  let hospitaldt = {

    hospitalId: (hospitalId) ? hospitalId : 0,
    hospitalName: document.getElementById("txt-hn").value,
    
  };

 debugger; var url = "http://localhost:64494/api/Hospital";
 var bearer = 'Bearer ' + jwt;
   fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(hospitaldt)
  })
    .then(response => {
      response.json();
      getHospital();
      console.log("Success: ", response);

    })
    .catch(error => console.error("Error: ", error));

}

//Bootstrap Data Tables

function getHospital() {
  var url = "http://localhost:64494/api/Hospital";
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  })
.then(
    res => {
      res.json().then(
        data => {
          console.log(data);
          var row = "";
          if (data.length > 0) {

            data.forEach((edit) => {
              row += "<td>" + edit.hospitalName + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info" onclick="editData(${edit.hospitalId})">Edit</button></td></tr>`;
            })

            document.getElementById("hospitaldata").innerHTML = row;
          }
        });
    });
}
getHospital();


//Passing Id and linking to the Get method
function editData(hospitalId) {
  var url = "http://localhost:64494/api/Hospital/" + hospitalId;
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
          document.getElementById("txt-hn").value = data.hospitalName;
          document.getElementById("txt-id").value = data.hospitalId;
          


        });
    });

}
//Clear Form
function clearForm() {
  document.getElementById("form-reset").reset();

}



