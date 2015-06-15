//function getJson() {
	var url = "jsonExample.js";
	var request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.onload = function() {
  		if (request.status >= 200 && request.status < 400){
    		// Success!
    		data = JSON.parse(request.responseText);
  		} else {
    		alert("There seems to be an error reaching the JSON file");
  		}
	};

	request.onerror = function() {
  		alert("There seems to be an error reaching the JSON file");
	};

	request.send();

//}