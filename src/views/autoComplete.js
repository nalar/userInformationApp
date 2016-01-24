var requestTime = 0;
var lastRequestTime = 0;

$(document).ready(function(){
	$("#searchTerm").on('keyup',function(event) {
		requestTime = event.timeStamp;
		if(requestTime - lastRequestTime > 300 || lastRequestTime === 0){
			console.log("Updating, difference over 300ms: " + (requestTime-lastRequestTime) + "ms");
			lastRequestTime = requestTime
			$.post(("/matches/?searchTerm="+$("#searchTerm").val()), function(response, status){
				$("#searchResults").html("<ul>");
				for(result in response){
					$("#searchResults").append("<li>" + response[result].firstName + " " + response[result].lastName + "</li>");
				};
			})
		} else{
			console.log("Not updating, difference under 300ms: " + (requestTime-lastRequestTime) + "ms")
		};;
	});
});