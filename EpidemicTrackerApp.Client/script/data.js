var jwt = localStorage.getItem("myJwt");
console.log(jwt)

let pId = 0;
function getparams() {
  
  const urlParams = new URLSearchParams(window.location.search);
  this.pId = urlParams.get('pId');
  console.log(this.pId);
  GetPatientDetails(this.pId);
  GetTreatmentDetails(this.pId);
  GetAddressDetails(this.pId);
  GetPhoneNumberDetails(this.pId);

}
getparams();

function GetPatientDetails(pId) {

  var url = "http://localhost:64494/api/Patient/" + pId;
  var bearer = 'Bearer ' + jwt;
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json',
    }
  })
    .then(
      res => {
        res.json().then(
          data => {
            var row = "";
            row += "<td>" + data.name + "</td>";
            row += "<td>" + data.age + "</td>";
            row += "<td>" + data.sex + "</td>";
            row += "<td>" + data.aadharNo + "</td>";
            row += "<td>" + data.occupation + "</td>";
            row += "<td>" + data.workName + "</td></tr>";
            document.getElementById("patientData").innerHTML = row;
          });
      })
}

function GetTreatmentDetails(pId) {

  var url = "http://localhost:64494/api/Treatment/GetPatientId?id=" + pId;
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
          {
            var row = "";
            data.forEach((data) => {
              row += "<td>" + data.admittedDate + "</td>";
              row += "<td>" + data.currentStage + "</td>";
              row += "<td>" + data.relievingDate + "</td>";
              row += "<td>" + data.isFatality + "</td>"
              row += "<td>" + data.prescription + "</td></tr>";
            })
            document.getElementById("treatmentData").innerHTML = row;
            var last = data[data.length - 1];
            this.GetDiseaseDetails(last.diseaseId);
            this.GetHospitalDetails(last.hospitalId);
            this.GetTreatmentDetails(last.treatmentId);
            console.log(lastId);
          }
        });
    }
  )

}

function GetPhoneNumberDetails(pId) {

  var url = "http://localhost:64494/api/PhoneNumber/GetPatientId?id=" + pId
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
          debugger; console.log(data);
          {
            var row = "";
            data.forEach((data) => {
              row += "<td>" + data.type + "</td>";
              row += "<td>" + data.phone + "</td></tr>";
            })
            document.getElementById("phoneData").innerHTML = row;
          }
        });
    }
  )

}

function GetAddressDetails(pId) {

  var url = "http://localhost:64494/api/Address/GetPatientId?id=" + pId;
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
            {
              var row = "";
              data.forEach((data) => {
                row += "<td>" + data.type + "</td>";
                row += "<td>" + data.city + "</td>";
                row += "<td>" + data.pincode + "</td>";
                row += "<td>" + data.addressA + "</td></tr>";
              })
              document.getElementById("addressData").innerHTML = row;
            }
          });
      });

}

function GetHospitalDetails(pId) {
  
    var url = "http://localhost:64494/api/Hospital/" + pId;
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
            var row = "";
            row += "<td>" + data.hospitalName + "</td>";
            document.getElementById("hospitalData").innerHTML = row;
          });
      });

  }


function GetDiseaseDetails(pId) {

  var url = "http://localhost:64494/api/Disease/" + pId
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
          var row = "";
          row += "<td>" + data.name + "</td>";
          row += "<td>" + data.type + "</td>";
          document.getElementById("diseaseData").innerHTML = row;
        });
    });

}

