var jwt = localStorage.getItem("myJwt");

let sId = 0;
function getparams() {
  const urlParams = new URLSearchParams(window.location.search);
  this.sId = urlParams.get('sId');
  console.log(this.sId);
   casesbyState(this.sId);

}
getparams();

function casesbyState(sId){
   var url = "http://localhost:64494/api/Treatment/GetCasesByState?stateId=" + sId;
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
                var row = "";
                row += "<td>" + data.activeCase + "</td><br>";
                row += "<td>" + data.curedCase + "</td><br>";
                row += "<td>" + data.deathCase + "</td>";
          document.getElementById("casesData").innerHTML = row;
              });
          });
     
}