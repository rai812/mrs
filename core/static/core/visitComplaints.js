
var complaintDispalyString = function(id,value) {
	var str = '\
		<tr> <td> \
		<span class="tag label label-info c-31 complaint-display" data-id="' + id + '"> \
		<span>' + value + '</span> \
		<i class="fa fa-times-circle del-complaint" aria-hidden="true"></i> \
		</span> </tr> </td>';
	return str;

}

var add_complaints = function () {
	
	var complaint_name = $('#id_complaints').val();
	
	console.log(complaint_name);

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
    
    //Save Form Data........
    
    $.ajax({
        cache: false,
        url : window.location.origin+"/complaints/api/add_complaints",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'complaint_name':complaint_name}),
        context : this,
        success : function (data) {
        	
        	if(data.ret == 'False')
        	{
        		/*
        		 * TODO add some visual indication for the user
        		 */
        		console.log(data.result);
        		return;
        	}
        	
        	complaintExitAction(data.id,data.description);	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var complaintExitAction = function(id, description) {

	var str = complaintDispalyString(id,description);
	$('#added_complaint').append(str);
	
	$(document).off("click",".del-complaint");
	
	$(document).on("click", ".del-complaint" , function( event ) {
		$(this).parent().parent().parent().remove();
	});
	
	$('#id_complaints').val("")
	$('#id_complaints').focus();
	show_success("Complaint Added!!!", " press F2 to view the report." );
}

$(document).ready(function() {

    // add delete complaint action for each element if present
    $(document).off("click",".del-complaint");
    
    $(document).on("click", ".del-complaint" , function( event ) {
        $(this).parent().parent().parent().remove();
    });

	$('.ui.search.complaint')
	  .search({
	    // change search endpoint to a custom endpoint by manipulating apiSettings
	    apiSettings: {
	      url: '/complaints/api/get_complaints/?q={query}',
	      onResponse: function(githubResponse) {
	          var
	            response = {
	        		  results : Array()
	            }
	          ;
	          // translate GitHub API response to work with search
	          $.each(githubResponse, function(index, item) {
	            // add result to category
	            response.results.push({
	            	id: item.id,
	              title       : item.name,
	              description : item.remark
	            });
	          });
	          return response;
	        },
	    },
	        minCharacters : 3,
	        onSelect: function(result, response){
	        	console.log(result);
	        	console.log(response);
	        	complaintExitAction(result.id,result.title);
	        },

	  })
	;
});
