function signIn() {

  let validatedt = {

    userName: document.getElementById("txt-un").value,
    password: document.getElementById("txt-pwd").value

  };
  debugger; console.log(validatedt.userName);
  var url = "http://localhost:64494/api/User/SignIn";
  fetch(url, {

    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Body': 'validatedt'
    },

    body: JSON.stringify(validatedt)
  }).then(response => {

    if (response.status == 204) {
      alert("Please Enter Valid Username/Password.");
    }

    return response.json();
  }).then(jsonResponse => {

    console.log(jsonResponse);
    if (jsonResponse.token != null) {
      console.log(jsonResponse);
      var jwt = jsonResponse.token;
      localStorage.setItem("myJwt", jwt);
      window.location.href = "Patient.html";
      alert("Login Successfull.")

    }
  }).catch(error => {

    console.log(error)

  })
  
}