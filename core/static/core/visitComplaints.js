var createComplaintString = function(i,item) {
    var str = '\
        <div class="card-xl complaint-card bCw curP bS-5" data-id="' + item.id +'"  data-description="' + item.name +
        	'"  data-remarks="' + item.remarks +'" > \
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
		<span class="tag label label-info c-31 complaint-display" data-id="' + id + '"> \
		<span>' + value + '</span> \
		<i class="fa fa-times-circle del-complaint" aria-hidden="true"></i> \
		</span>';
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
	    		$(this).parent().remove();
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
    $(document).off("click",".complaint-card");
    
    $(document).on("click", ".complaint-card" , function() {
    	
    	console.log($(this))
	    var str = complaintDispalyString($(this).data("id"),$(this).data("description"));
    	$('#added_complaint').append(str);
    	
    	
    	$(document).off("click",".del-complaint");
    	
    	$(document).on("click", ".del-complaint" , function(event) {
    		event.stopImmediatePropagation();
    		$(this).parent().remove();
    	});
    	
    	$('#id_complaints').val("")
    	
        $('#search-close').remove();
        $('#search-results').remove();
        
    });

}