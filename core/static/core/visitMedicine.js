var createMedicineFieldString = function(i,item) {
    var str = '\
        <div class="card-xl medicine--field-card bCw curP bS-5" data-name="' + item.value + '" > \
            <div class="pLR-16 pTB-8"> \
                <div class="fS16 title-text c-31"> \
                    <span>' + item.value + '</span> \
                </div> \
            </div> \
        </div>';
    return str;
}


var createMedicineString = function(i,item) {
    var str = '\
        <div class="card-xl medicine-card bCw curP bS-5" data-id="' + item.id +'"  data-type="' + item.type + '" data-medicine="' + item.medicine + 
        '" data-dosage="' + item.dosage + '" data-frequency="' + item.frequency + '" data-duration="' + item.duration + '" > \
            <div class="pLR-16 pTB-8"> \
                <div class="fS16 title-text c-31"> \
                    <span>' + item.type + ' - ' + item.medicine +  '</span> \
                </div> \
                <div class="mT-8"> \
                    <div class="mT4 row-flex fill"> \
                        <div class="light-txt"> \
                            <span class="b">' + item.dosage + '</span> \
                        </div> \
                        <div class="light-txt"> \
                            <span class="b">' + item.frequency + '</span> \
                        </div> \
                        <div class="light-txt"> \
                            <span class="b">Duration:</span> \
                            <span>' + item.duration + '</span> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div>';
    return str;
}

var medicineDispalyString = function(id,type,medicine,frequency,dosage,duration) {
	var str = '\
		<tr class="medicine-display" data-id="' + id + '"> \
		<td>' + type + ' - ' + medicine + ' : ' + dosage + '</td> \
		<td>' + frequency + '</td> \
		<td>' + ' for ' +  duration + '</td> \
		<td> <i class="fa fa-times-circle del-medicine" aria-hidden="true"></i> </td>\
		</tr>';
	return str;

}

var add_medicine = function () {
	
	var medicine = $('#id_input_medicine').val();
	var type = $('#id_input_type').val();
	var frequency = $('#id_input_frequency').val();
	var dosage = $('#id_input_dosage').val();
	var duration = $('#id_input_duration').val();
	
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/medicines/api/add_medicine/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'medicine':medicine, 'duration':duration, 'dosage':dosage, 'frequency':frequency, 'type':type}),
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
        	
		    var str = medicineDispalyString(data.id,data.type,data.medicine,data.frequency,data.dosage,data.duration);
	    	$('#added_medicine').append(str);
	    	
	    	$(document).off("click",".del-medicine");
	    	
	    	$(document).on("click", ".del-medicine" , function( event ) {
	    		/*
	    		 * Assuming this in td and we want to remove the row
	    		 */
	    		$(this).parent().parent().remove();
	    	});
	    	
	    	/*
	    	 * Remove all input boxes
	    	 */
	    	$('#id_input_medicine').val("")
	    	$('#id_input_type').val("")
	    	$('#id_input_frequency').val("")
	    	$('#id_input_dosage').val("")
	    	$('#id_input_duration').val("")
	    	
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

var addMedicineCardAction = function() {
    $(document).off("click",".medicine-card");
    
    $(document).on("click", ".medicine-card" , function(event) {
    	
        console.log($(this).data("name"))
        console.log($(this).data("id"))
        
	    var str = medicineDispalyString($(this).data("id"),$(this).data("type"),$(this).data("medicine"),$(this).data("frequency"),$(this).data("dosage"),$(this).data("duration"));
    	$('#added_medicine').append(str);
    	
    	$(document).off("click",".del-medicine");
    	
    	$(document).on("click", ".del-medicine" , function( event ) {
    		/*
    		 * Assuming this in td and we want to remove the row
    		 */
    		$(this).parent().parent().remove();
    	});
    	
    	/*
    	 * Remove all input boxes
    	 */
    	$('#id_input_medicine').val("")
    	$('#id_input_type').val("")
    	$('#id_input_frequency').val("")
    	$('#id_input_dosage').val("")
    	$('#id_input_duration').val("")
    	
        event.stopImmediatePropagation();
        $('#search-close').remove();
        $('#search-results').remove();
    });
}

var addMedicineFieldCardAction = function () {
	$(document).off("click",".medicine-field-card");
    $(document).on("click", ".medicine-field-card" , function() {
    	
    	console.log($(this))
    	
    	$(this).val(data.value)
    	
        $('#search-close').remove();
        $('#search-results').remove();
        
    });

}

$(document).ready(function() {
	$('.ui.search.medicine')
	.search({
	  // change search endpoint to a custom endpoint by manipulating apiSettings
	  apiSettings: {
	    url: '/medicines/api/get_medicine/?q={query}',
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
	            title       : item.medicine,
	            description : item.dosage + " " + item.frequency + " for " + item.duration ,
	            type: item.type,
	            dosage: item.dosage,
	            frequency: item.frequency,
	            duration: item.duration,
	          });
	        });
	        return response;
	      },
	  },
	      minCharacters : 3,
	      onSelect: function(result, response){
	      	console.log(result);
	      	console.log(response);
	      	
		    var str = medicineDispalyString(result.id,result.type,result.title,result.frequency,result.dosage,result.duration);
	    	$('#added_medicine').append(str);
	    	
	    	$(document).off("click",".del-medicine");
	    	
	    	$(document).on("click", ".del-medicine" , function( event ) {
	    		/*
	    		 * Assuming this in td and we want to remove the row
	    		 */
	    		$(this).parent().parent().remove();
	    	});
	    	
	    	show_success("Medicine Added!!!", " press F2 to view the report." );
	    	
	    	$('#id_input_medicine').focus();
	      },

	})
	;

	$('.ui.search.dosage')
	.search({
	  // change search endpoint to a custom endpoint by manipulating apiSettings
	  apiSettings: {
	    url: '/medicines/api/get_dosage_values/?q={query}',
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
	            title       : item.value,
	          });
	        });
	        return response;
	      },
	  },
	      minCharacters : 1,
	})
	;

	$('.ui.search.frequency')
	.search({
	  // change search endpoint to a custom endpoint by manipulating apiSettings
	  apiSettings: {
	    url: '/medicines/api/get_frequency_values/?q={query}',
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
	            title       : item.value,
	          });
	        });
	        return response;
	      },
	  },
	      minCharacters : 1,
	})
	;
	
	
	
});

