function login() {
	var user = document.getElementById("userName").value;
	var pw = document.getElementById("password").value;
	params = "userName="+user+"&password="+pw;
	var url = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";
	var localRequest = new XMLHttpRequest();

    localRequest.open("POST", url, false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.setRequestHeader("Content-length", params.length);
    localRequest.setRequestHeader("Connection", "close");
    localRequest.send(params);

    if(localRequest.readyState == 4 && localRequest.status == 200) {
		var dataDiv = document.getElementById("errorMessage");

		var responseJson = JSON.parse(localRequest.responseText);
		if(responseJson["result"] == "invalid") {
			dataDiv.innerHTML = "Your login information was " + responseJson["result"];

		} else if (responseJson["result"] == "valid") {
			localStorage.setItem('cs2550timestamp',user + " " + responseJson["timestamp"]);
			//localStorage.setItem('timestamp',responseJson["timestamp"]);
			location.href = 'index.html';
		}
		//dataDiv.innerHTML = "Response: " + responseJson["result"];
	} else {
		dataDiv.innerHTML = "Server seems to be unavailable";
	}
}