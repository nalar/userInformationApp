$(document).ready(function(){
	$("#searchTerm").keyup(function(event) {
		$.post(("/matches/?searchTerm="+$("#searchTerm").val()), function(response, status){
			$("#searchResults").html("<ul>");
			for(result in response){
				//$("#searchResults").append(response[result].firstName + " " + response[result].lastName + "<br>");
				$("#searchResults").append("<li>" + response[result].firstName + " " + response[result].lastName + "</li>");
			}
		});
	});
});

