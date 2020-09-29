 var jwt = localStorage.getItem("myJwt");

 var url = "http://localhost:64494/api/Treatment/GetCases";
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
      document.getElementById("cases").innerHTML = row;
          });
      });
 

    
//logIn
  debugger;    document.querySelector('.img-btn').addEventListener('click', function()
      {
        document.querySelector('.cont').classList.toggle('s-signup');
      }
    );
    
  