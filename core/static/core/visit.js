
var add_visit = function() {
	
	var complaintIds = new Array();	
	$('.complaint-display').each(function () {
		console.log($(this))
		complaintIds.push($(this).attr('data-id'));
        console.log($(this).attr('data-id'));
    });

	var medicineIds = new Array();	
	$('.medicine-display').each(function () {
		console.log($(this))
		medicineIds.push($(this).attr('data-id'));
        console.log($(this).attr('data-id'));
    });

	var diseaseIds = new Array();	
	$('.disease-display').each(function () {
		console.log($(this))
		diseaseIds.push($(this).attr('data-id'));
        console.log($(this).attr('data-id'));
    });

	var vitalId = $(".vitals-display").data("id")
	var Remark = $("#id_input_remarks").val()
	
	console.log(complaintIds);
	console.log(medicineIds);
	console.log(diseaseIds);
	console.log(vitalId);
	console.log(Remark);
	
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/visit/api/add_visit/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'complaints':complaintIds, 'medicines':medicineIds, 'diseases':diseaseIds, 'vitals':vitalId, 'remark':Remark }),
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
        	
        	$('a[href="#div_id_report"]').removeClass("disabled")
        	$('a[href="#div_id_report"]').tab('show')
	    	event.stopImmediatePropagation();
        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}


$(document).ready(function() {
var thread = null;

    function formatMember(data) {
    
	    console.log($(this));
	    console.log(data);
	    
	    if(data.length == 0 && !($(this).hasClass("add-term")))
	    	return
	    	
	    
	    var final_str = "";
	
	
		data_type = $(this).data('type')
		
		if(data_type == 'patient')
		{
			$.each(data,function (i,item) {
				final_str += createPatientString(i,item)
			});
		}
		else if(data_type == 'disease')
		{
			$.each(data,function (i,item) {
				final_str += createDiseaseString(i,item)
			});
			
			final_str +=  addDiseaseString($(this).val())
		}
		else if(data_type == 'medicine')
		{
			$.each(data,function (i,item) {
				final_str += createMedicineString(i,item)
			});	
		}
		else if(data_type == 'complaints')
		{
			$.each(data,function (i,item) {
				final_str += createComplaintString(i,item)
			});
			
			final_str +=  addComplaintString($(this).val())
		}
		else if(data_type == 'medicine-type' || data_type == 'medicine-frequency' || data_type == 'medicine-dosage')
		{
			$.each(data,function (i,item) {
				final_str += createMedicineFieldString(i,item)
			});	
		}
	
		/*
		 * Creating search result to be displayed
		 */
	    var pos = $(this).position();
	    
	    if($('#search-results').length == 0) {
	    	  //it doesn't exist
	    	console.log("Creating new search-result")
	    	$('<div id="search-results"> </div>')
	        .html(final_str)
	        .css({
	            top: pos.top + $(this).height()  + 5,
	            left: pos.left,
	            position: 'absolute',
	            width: $(this).width()
	        }).insertAfter($(this)).css("z-index", "1000").addClass("bS-5 position-abs");
	    }
	    else
	    {
	    	console.log("Editing existing search-result")
	        $('#search-results')
	        .html(final_str)
	        .css({
	            top: pos.top + $(this).height()  + 5,
	            left: pos.left,
	            position: 'absolute',
	            width: $(this).width()
	        }).css("z-index", "1000");
	    }
	    
	    if($('#search-close').length == 0)
	    {
	    	console.log("Creating close button")
	        $('<div id="search-close"> </div>')
	        .html("close")
	        .css({
	            top: pos.top + $(this).height()  + 2,
	            left: pos.left + $(this).width() - 35,
	            position: 'absolute',
	            opacity: 0.8,
	        }).insertAfter($(this)).css("z-index", "2000").addClass("curP position-abs c-red")
	        
	        $(document).off("click","#search-close");
	        
	        $(document).on("click", "#search-close" , function(event) {
	        	event.stopImmediatePropagation();
	            $('#search-results').remove();
	            $('#search-close').remove();
	        });
	        
	    }
	    
		/*
		 * bind click action to add-buttons 
		 */
	    	
	    $(document).off("click",".add-complaint-button");
		    
	    $(document).on("click", ".add-complaint-button" , function(event) {
	    
		    	event.stopImmediatePropagation();
		    	
		    	addComplaints.apply(this, arguments);
		    	
	    });
	    
	    $(document).off("click",".add-disease-button");
	    $(document).on("click", ".add-disease-button" , function(event) {
	    
	    	event.stopImmediatePropagation();
	    	
	    	addDisease.apply(this, arguments);
		    	
	    });
	
	    
		if(data_type == 'patient')
		{
			$(this).keydown( function(e) {
		        if (e.keyCode == 40) {      
		        	$('.patient-card:first').focus();
		        }
			})
			
			addPatientCardAction($(this));
		}
		else if(data_type == 'disease')
		{
			addDiseaseCardAction();
		}
		else if(data_type == 'medicine')
		{
			addMedicineCardAction();
		}
		else if(data_type == 'complaints')
		{
			addComplaintsCardAction();
		}
		else if(data_type == 'medicine-type' || data_type == 'medicine-frequency' || data_type == 'medicine-dosage')
		{
			addMedicineFieldCardAction();
		}
    }
    
    function findMember(t,ele) {
	    if(t.length >=3)
	    {
	        console.log(ele);
	        url = ele.data('url')
	        console.log(url)
	        $.ajax({
	            // the URL for the request
	            url: window.location.origin+url,
	         
	            // the data to send (will be converted to a query string)
	            data: {
	                format:'json',
	                q:t
	            },
	         
	            context: ele,
	            
	            // whether this is a POST or GET request
	            type: "GET",
	         
	            // the type of data we expect back
	            dataType : "json",
	         
	            // code to run if the request succeeds;
	            // the response is passed to the function
	            success: formatMember,
	         
	            // code to run if the request fails; the raw request and
	            // status codes are passed to the function
	            error: function( xhr, status, errorThrown ) {
	                //alert( "Sorry, there was a problem!" );
	                console.log( "Error: " + errorThrown );
	                console.log( "Status: " + status );
	                console.dir( xhr );
	                /*
	                 var snackbarContainer = document.querySelector('#flash_message');
	                 var msg = {message: "Something went wrong. Try Again!!!"};
	                 snackbarContainer.MaterialSnackbar.showSnackbar(msg);
	                */
	            },
	         
	            // code to run regardless of success or failure
	            complete: function( xhr, status ) {
	                //alert( "The request is complete!" );
	            }
	        });
	    }
	    else{
	    	$('#search-results').remove();
	    	$('#search-close').remove();
	    }
    }

    $('.search-term').keyup(function() {
      clearTimeout(thread);
      var $this = $(this); thread = setTimeout(function(){findMember($this.val(),$this)}, 500);
    	});
    });