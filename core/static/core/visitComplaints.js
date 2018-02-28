var createComplaintString = function(i,item) {
    var str = '\
        <div class="card-xl complaint-card bCw curP bS-5" data-id="' + item.id +'"  data-description="' + item.name +
        	'"  data-remarks="' + item.remarks +'" tabindex="1" > \
            <div class="pLR-16 pTB-8"> \
                <div class="fS16 title-text c-31"> \
                    <span>' + item.name + '</span> \
                </div> \
                <div class="mT-8"> \
                <div class="mT4 row-flex fill"> \
                    <div class="light-txt"> \
                        <span class="b">' + item.remarks + '</span> \
                    </div> \
                </div> \
            </div> \
            </div> \
        </div>';
    return str;
}

var complaintDispalyString = function(id,value) {
	var str = '\
		<tr> <td> \
		<span class="tag label label-info c-31 complaint-display" data-id="' + id + '"> \
		<span>' + value + '</span> \
		<i class="fa fa-times-circle del-complaint" aria-hidden="true"></i> \
		</span> </tr> </td>';
	return str;

}

var addComplaintString  = function(value) {
	
    var str = '\
        <div class="card-xl bCw curP bS-5" > \
            <div class="pLR-16 pTB-8 add-complaint-button" data-url="/complaints/api/add_complaints/"> \
                <div class="fS16 title-text c-31"> \
                    <span id="add-complaint-value">' + value + '</span> \
                </div> \
                <div class="mT-8"> \
                <div class="mT4 row-flex fill"> \
                    <div class="light-txt "> \
                        <span class="b" > Add to Database </span> \
                    </div> \
                </div> \
            </div> \
            </div> \
        </div>';
    return str;
}


var addComplaints = function() {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
    
    //Save Form Data........
    
    var complaints = {}
    complaint_name = $('#add-complaint-value').text() 
    console.log(complaint_name)
    $.ajax({
        cache: false,
        url : window.location.origin+$(this).data("url"),
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
        	
		    var str = complaintDispalyString(data.id,data.description);
	    	$('#added_complaint').append(str);
	    	
	    	$(document).off("click",".del-complaint");
	    	
	    	$(document).on("click", ".del-complaint" , function( event ) {
	    		$(this).parent().parent().parent().remove();
	    	});
	    	
	    	$('#id_complaints').val("")
	    	
	    	event.stopImmediatePropagation();
	    	
	        $('#search-close').remove();
	        $('#search-results').remove();
        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var addComplaintsCardAction = function() {
	
	/*
	
    $(document).off("click",".add-complaint-button");
    
    $(document).on("click", ".add-complaint-button" , function(event) {
    
	    	event.stopImmediatePropagation();
	    	
	    	addComplaints.apply(this, arguments);
	    	
    });
	 */
	
	$(document).off("keydown",".complaint-card");
	
	$(document).on("keydown", ".complaint-card" , function(e ) {
        if (e.keyCode == 40) {
        	e.stopImmediatePropagation();
        	console.log("Down Key pressed");
            $(".complaint-card:focus").next().focus();
   
        }
        if (e.keyCode == 38) {
        	e.stopImmediatePropagation();
        	console.log("UP Key pressed");
            $(".complaint-card:focus").prev().focus();
        }
        
        if(e.keyCode == 13)
        {
        	e.stopImmediatePropagation();
            
        	complaintExitAction($(this).data("id"),$(this).data("description"));            
        }
        
        if(e.keyCode == 27)
        {
        	e.stopImmediatePropagation();
            $('#search-close').remove();
            $('#search-results').remove();
            prevElement.focus();
        }
        
	});
	
	
	
    $(document).off("click",".complaint-card");
    
    $(document).on("click", ".complaint-card" , function() {
    	
    	console.log($(this))
    	complaintExitAction($(this).data("id"),$(this).data("description"));
    });
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
