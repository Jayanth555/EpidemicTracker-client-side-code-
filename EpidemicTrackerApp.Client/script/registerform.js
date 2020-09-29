function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function registerForm(){
  
 var rePassword = document.getElementById("txt-repwd");
 var password = document.getElementById("txt-rpwd");
  
  let registerdt = {
    userId:  0,
    firstName: document.getElementById("txt-rfn").value,
    lastName: document.getElementById("txt-rln").value,
    userName: document.getElementById("txt-run").value,
    password: document.getElementById("txt-rpwd").value,
  };

  password = password.value; 
  debugger; rePassword = rePassword.value; 

  if (password == '') 
      alert ("Please enter Password"); 
        
  else if (rePassword == '') 
      alert ("Please enter confirm password"); 
        
  else if (password != rePassword) { 
      alert ("\nPassword did not match: Please try again...") 
      return false; 
  } 

  var url = "http://localhost:64494/api/User";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registerdt)
  })
     .then(res => {
         res.json().then(
        data => {
     debugger;   console.log("Success: ", data);
    })
    })
    .catch(error => console.error("Error: ", error));

                   

}



