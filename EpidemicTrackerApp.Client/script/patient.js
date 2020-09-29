var jwt = localStorage.getItem("myJwt");
console.log('jwt',jwt);

window.history.forward();
function previousPage() {
  window.history.forward();
}

function savePatient() {
  var patientId = parseInt(document.getElementById("txt-id").value);
  var isSave = (patientId) ? false : true;
  
  //Read object
  let patientdt = {

    patientId: (patientId) ? patientId : 0,
    name: document.getElementById("txt-name").value,
    age: parseInt(document.getElementById("txt-age").value),
    sex: document.getElementById("btn-sex").value,
    aadharNo: parseInt(document.getElementById("txt-aadhar").value),
    occupation: document.getElementById("txt-oc").value,
    workName: document.getElementById("txt-wn").value,

  };

  var url = "http://localhost:64494/api/Patient";
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(patientdt)
  })
    .then(res => {
      res.json().then(
        data => {
          getPatients();
          console.log("Success: ", data);
          if (isSave) {
            window.location = "address.html?pId=" + (data.patientId);
          }
        })
    })
    .catch(error => console.error("Error: ", error));

}

//Bootstrap Data Table
function getPatients() {
  var url = "http://localhost:64494/api/Patient";
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
            if (data.length > 0) {
              var row = "";
              data.forEach((patient) => {
                row += "<td>" + patient.name + "</td>";
                row += "<td>" + patient.age + "</td>";
                row += "<td>" + patient.sex + "</td>";
                row += "<td>" + patient.aadharNo + "</td>";
                row += "<td>" + patient.occupation + "</td>";
                row += "<td>" + patient.workName + "</td>";
                row += `<td><button class="btn btn-xs btn-outline-info" onclick="editpatient(${patient.patientId})">Edit</button><br><button class="btn btn-xs btn-outline-info" onclick="deletePatient(${patient.patientId})">Delete</button><button class="btn btn-xs btn-outline-info"onclick="getPatientDetails(${patient.patientId});">Details</button></td></tr>`;
              })
              document.getElementById("patientdata").innerHTML = row;
            }
          });
      })
}

getPatients();

//Edit data values

function editpatient(patientId) {
  var url = "http://localhost:64494/api/Patient/" + patientId;
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
          document.getElementById("txt-id").value = data.patientId;
          document.getElementById("txt-name").value = data.name;
          document.getElementById("txt-age").value = data.age;
          document.getElementById("btn-sex").value = data.sex;
          document.getElementById("txt-aadhar").value = data.aadharNo;
          document.getElementById("txt-oc").value = data.occupation;
          document.getElementById("txt-wn").value = data.workName;

        });

    });

}

//Delete Function
function deletePatient(patientId) {
  var url = "http://localhost:64494/api/Patient/" + patientId;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    res.json();
    getPatients();
    console.log("Success: ", response);
  })
  console.log(data);
  delete data['patientId'];
  delete data['name'];
  delete data['age'];
  delete data['sex'];
  delete data['aadharNo'];
  delete data['occupation'];
  delete data['workName'];

}
getPatients();

//Clear Form       
function clearForm() {
  document.getElementById("form-reset").reset();
}

//Redirecting to data.html
function getPatientDetails(patientId) {
  window.location = "data.html?pId=" + patientId;
}

//Search Function
function mySearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("search");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


