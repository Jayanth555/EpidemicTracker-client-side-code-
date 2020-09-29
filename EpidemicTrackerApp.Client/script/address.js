var jwt = localStorage.getItem("myJwt");

let pId = 0;
function getparams() {
  const urlParams = new URLSearchParams(window.location.search);
  this.pId = urlParams.get('pId');
console.log(this.pId);
}
getparams();


function saveAddress() {


  var hospitalDropdown = document.getElementById("select-hospital");
  var hospitalId = hospitalDropdown.options[hospitalDropdown.selectedIndex].value;

  var patientDropdown = document.getElementById("select-patient");
  var patientId = patientDropdown.options[patientDropdown.selectedIndex].value;

  var stateDropdown = document.getElementById("select-state");
  var stateId = stateDropdown.options[stateDropdown.selectedIndex].value;

  var countryDropdown = document.getElementById("select-country");
  var countryId = countryDropdown.options[countryDropdown.selectedIndex].value;
 

  var addressId = parseInt(document.getElementById("txt-id").value);

  let addressdt = {

    addressId: (addressId) ? addressId : 0,
    type: document.getElementById("txt-at").value,
    addressA: document.getElementById("txt-ad").value,
    city: document.getElementById("txt-ct").value,
    pincode: document.getElementById("txt-pc").value,
    patientId: parseInt(patientId),
    hospitalId: parseInt(hospitalId),
    stateId: parseInt(stateId),
    countryId: parseInt(countryId)

  };
  console.log(addressdt);
  var state = parseInt(addressdt.stateId);
  localStorage.setItem("myValue", state);
  console.log(state);

  var url = "http://localhost:64494/api/Address";
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(addressdt)
  })
    .then(response => {
      response.json();
      getAddress();
      console.log("Success: ", response);
      if(this.pId){

        window.location = "phoneNumber.html?pId=" + this.pId;

      }
    })
    .catch(error => console.error("Error: ", error));
}

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

//State Dropdown
var url = "http://localhost:64494/api/State/";
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
    dropDown += `<option value="${user.stateId}">${user.state}</option> `;
  });
  document.getElementById("select-state").innerHTML = dropDown;
 

});


//Country Dropdown
var url = "http://localhost:64494/api/Country/";
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
    dropDown += `<option value="${user.countryId}">${user.country}</option> `;
  });
  document.getElementById("select-country").innerHTML = dropDown;
 

});

//Bootstrap Table
function getAddress() {
  var url = "http://localhost:64494/api/Address";
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
            data.forEach((address) => {
              row += "<td>" + address.name + "</td>";
              row += "<td>" + address.type + "</td>";
              row += "<td>" + address.addressA + "</td>";
              row += "<td>" + address.city + "</td>";
              row += "<td>" + address.pincode + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info" onclick="editData(${address.addressId})">Edit</button>&nbsp;<button class="btn btn-xs btn-outline-info"onclick="deleteAddress(${address.addressId})">Delete</button></a></td></tr>`;

            })
            document.getElementById("addressData").innerHTML = row;
          }
        });
    });
}
getAddress();


//Passing Id and linking to the Get method
function editData(addressId) {
  var url = "http://localhost:64494/api/Address/" + addressId;
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
          document.getElementById("txt-at").value = data.type;
          document.getElementById("txt-ad").value = data.addressA;
          document.getElementById("txt-ct").value = data.city;
          document.getElementById("txt-pc").value = data.pincode;
          document.getElementById("txt-id").value = data.addressId;
        });
    });

}
getAddress();
//Passing Id and linking to the Get method
function deleteAddress(addressId) { 
  var url = "http://localhost:64494/api/Address/" + addressId;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  })    .then(res => res.json())
    .then(res => console.log(res))

  delete data['addressId'];
  delete data['type'];
  delete data['addressA'];
  delete data['city'];
  delete data['state'];
  delete data['country'];
  delete data['pincode'];
  delete data['patientId'];
  delete data['hospitalId'];

}
getAddress();
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
