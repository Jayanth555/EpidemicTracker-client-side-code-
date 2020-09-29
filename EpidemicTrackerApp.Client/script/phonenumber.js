var jwt = localStorage.getItem("myJwt");

let pId = 0;
function getparams() {
  const urlParams = new URLSearchParams(window.location.search);
  this.pId = urlParams.get('pId');
console.log(this.pId);
}
getparams();

function savephoneNumber() {

  //hospitalDropdown
  var hospitalDropdown = document.getElementById("select-hospital");
  var hospitalId = hospitalDropdown.options[hospitalDropdown.selectedIndex].value;

  //PatientDropdown
  var patientDropdown= document.getElementById("select-patient");
  var patientId = patientDropdown.options[patientDropdown.selectedIndex].value;
  // 1. read object

  var phoneId = parseInt(document.getElementById("txt-id").value);

  let phonedt = {

    phoneId: (phoneId) ? phoneId : 0,

    type: document.getElementById("txt-pt").value,
    phone: parseInt(document.getElementById("txt-pn").value),
    patientId: parseInt(patientId),
    hospitalId: parseInt(hospitalId)
  }
  console.log(phonedt);


  var url = "http://localhost:64494/api/PhoneNumber";


  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(phonedt)
  })
  .then(response => {
    response.json();
      console.log("Success: ", response);
      getPhone();
    if(this.pId){
      window.location = "treatment.html?pId=" + this.pId;

    }

  })
  .catch(error => console.error("Error: ", error));


}getPhone();


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

//Bootstrap Data Tables
function getPhone() {
  var url = "http://localhost:64494/api/PhoneNumber";
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

            // loop
            data.forEach((phonenumber) => {
              row += "<tr>";
              row += "<td>" + phonenumber.name + "</td>";
              row += "<td>" + phonenumber.type + "</td>";
              row += "<td>" + phonenumber.phone + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info" onclick="editPhone(${phonenumber.phoneId})">Edit</button><br><button class="btn btn-xs btn-outline-info" onclick="deletePhone(${phonenumber.phoneId})">Delete</button></td></tr></tr>`;

            })
            document.getElementById("phonedata").innerHTML = row;
          }
        });
    });
}
getPhone();


//Passing Id and linking to the Get method
function editPhone(phoneId) {
  var url = "http://localhost:64494/api/PhoneNumber/" + phoneId;
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
          document.getElementById("txt-id").value = data.phoneId;
          document.getElementById("txt-pt").value = data.type;
          document.getElementById("txt-pn").value = data.phone;
        });

    });

}
//Passing Id and linking to the Get method
function deletePhone(phoneId) {
  var url = "http://localhost:64494/api/PhoneNumber/" + phoneId;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => console.log(res))

  delete data['phoneId'];
  delete data['type'];
  delete data['phone'];
  delete data['patientId'];
  delete data['hospitalId'];

}

//Clear Form
function clearForm() {
  document.getElementById("form-reset").reset();

}
//Dropdown List
function showHospital(){
  document.getElementById('div').style.display ='inline';
}
function showPatient(){
  document.getElementById('div-1').style.display = 'inline';
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
