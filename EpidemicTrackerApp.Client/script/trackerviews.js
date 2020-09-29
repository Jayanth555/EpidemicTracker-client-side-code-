function getStates() {
  fetch("http://localhost:64494/api/State").then(
    res => {
      res.json().then(
        data => {
          if (data.length > 0) {
            var row = "";
             data.forEach((data) => {
              row += "<td>" + data.state + "</td>";
              row += `<td><button class="btn btn-xs btn-outline-info" onclick="casesbyState(${data.stateId})">Details</button></td></tr>`;
            })
            document.getElementById("statesData").innerHTML = row;


          }
        });
    });
}
getStates();



function casesbyState(stateId){
  fetch("http://localhost:64494/api/Treatment/GetCasesByState?stateId=" + parseInt(stateId)).then(
    res => {
      res.json().then(
        data => {
         console.log(data);
      data => {
            var row = "";
            row += "<td>" + data.activeCase + "</td><br>";
            row += "<td>" + data.curedCase + "</td><br>";
            row += "<td>" + data.deathCase + "</td>";
            document.getElementById("casesbystate").innerHTML = row;
          };
        });

    }); 
}
//Redirecting to statecases.html
function casesbyState(stateId) {
  window.location = "statecases.html?sId=" +  stateId;

}




