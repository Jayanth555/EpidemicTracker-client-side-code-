var jwt = localStorage.getItem("myJwt");

//Query Parameter
let pId = 0;
function getparams() {
  const urlParams = new URLSearchParams(window.location.search);
  this.pId = urlParams.get('pId');
  console.log(this.pId);
}
getparams();

//Disease dropdown
var url = "http://localhost:64494/api/Disease/";
var bearer = 'Bearer ' + jwt;
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': bearer,
    'Content-Type': 'application/json'
  }
})
  .then((response) => response.json())
  .then((json) => {
    let diseaseDropdown = null;
    diseaseDropdown += `<option value="">select</option> `;
    json.forEach((disease) => {
      diseaseDropdown += `<option value = "${disease.diseaseId}">${disease.name}</option> `;
    });
    document.getElementById("select-disease").innerHTML = diseaseDropdown;
  });

//Hospital dropdown list
var url = "http://localhost:64494/api/Hospital/";
var bearer = 'Bearer ' + jwt;
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': bearer,
    'Content-Type': 'application/json'
  }
})
  .then((response) => response.json())
  .then((json) => {
    let hospitalDropdown = null;
    hospitalDropdown += `<option value="">select</option> `;

    json.forEach((user) => {
      hospitalDropdown += `<option value="${user.hospitalId}">${user.hospitalName}</option> `;
    });
    document.getElementById("select-hospital").innerHTML = hospitalDropdown;
  });


//Patient Dropdown
var url = "http://localhost:64494/api/Patient/";
var bearer = 'Bearer ' + jwt;
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': bearer,
    'Content-Type': 'application/json'
  }
})
  .then((response) => response.json())
  .then((json) => {
    let dropDown = null;
    dropDown += `<option value="">select</option> `;

    json.forEach((user) => {
      dropDown += `<option value="${user.patientId}">${user.name}</option> `;
    });
    document.getElementById("select-patient").innerHTML = dropDown;
    document.getElementById("select-patient").value = this.pId;

  });




//2. Treatmentone object

function saveTreatment() {
  //hospital Dropdown
  var hospitalDropdown = document.getElementById("select-hospital");
  var hospitalId = hospitalDropdown.options[hospitalDropdown.selectedIndex].value;

  //Patient Dropdown
  var PatientDropdown = document.getElementById("select-patient");
  var patientId = PatientDropdown.options[PatientDropdown.selectedIndex].value;

  //Disease Dropdown
  var diseaseDropdown = document.getElementById("select-disease");
  var DiseaseId = diseaseDropdown.options[diseaseDropdown.selectedIndex].value;

  var treatmentId = parseInt(document.getElementById("txt-id").value);


  let trtdetail = {
    treatmentId: (treatmentId) ? treatmentId : 0,
    admittedDate: document.getElementById("txt-ao").value,
    currentStage: document.getElementById("txt-stage").value,
    relievingDate: document.getElementById("txt-rd").value,
    isFatality: document.getElementById("txt-if").value,
    prescription: document.getElementById("txt-ptn").value,
    patientId: parseInt(patientId),
    hospitalId: parseInt(hospitalId),
    diseaseId: parseInt(DiseaseId)
  };

  var url = "http://localhost:64494/api/Treatment";
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(trtdetail)
  })
    .then(response => {
      response.json();
      getTreatment();
      console.log("Success: ", response);

    })
    .catch(error => console.error("Error: ", error));
}

//Bootstrap Tables
function getTreatment() {
  var url = "http://localhost:64494/api/Treatment";
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
            data.forEach((treatment) => {
              row += "<tr>";
              row += "<td>" + treatment.name + "</td>";
              row += "<td>" + treatment.admittedDate + "</td>";
              row += "<td>" + treatment.currentStage + "</td>";
              row += "<td>" + treatment.relievingDate + "</td>";
              row += "<td>" + treatment.isFatality + "</td>";
              row += "<td>" + treatment.prescription + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info"onclick="edittreatment(${treatment.treatmentid})">Edit</button><button class="btn btn-xs btn-outline-info" onclick="deleteTreatment(${treatment.treatmentid})">Delete</button></a></td></tr>`;
            })
            document.getElementById("treatmentdata").innerHTML = row;
          }
        });
    });
}
getTreatment();//refresh 

//Passing Id and linking to the Get method
function edittreatment(treatmentid) {
  var url = "http://localhost:64494/api/Treatment/" + treatmentid;
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
          document.getElementById("txt-id").value = data.treatmentid;
          document.getElementById("txt-ao").value = data.admittedDate;
          document.getElementById("txt-stage").value = data.currentStage;
          document.getElementById("txt-rd").value = data.relievingDate;
          document.getElementById("txt-if").value = data.isFatality;
          document.getElementById("txt-ptn").value = data.prescription;
        });

    });

}


function deleteTreatment(treatmentid) {
  
  var url = "http://localhost:64494/api/Treatment/" + treatmentid;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  }) 
    .then(res => {
      res.json();
      getTreatment();
      console.log("Success: ", response);

    })
  delete data['currentStage'];
  delete data['treatmentid'];
  delete data['admittedDate'];
  delete data['relievingDate'];
  delete data['isFatality'];
  delete data['prescription'];
  delete data['patientId'];
  delete data['hospitalId'];
  delete data['diseaseId'];

}
getTreatment();

//Clear Form
function clearForm() {
  document.getElementById("form-reset").reset();

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




