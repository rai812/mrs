
var medicineDispalyString = function(id,type,medicine,frequency,dosage,duration,remarks) {
	var str = '\
		<tr class="medicine-display" data-id="' + id + '"> \
		<td>' + medicine + ' : ' + dosage + '</td> \
		<td>' + frequency + '</td> \
		<td>' + ' for ' +  duration + '</td> \
		<td>' +  remarks + '</td> \
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
	var remarks = $('#id_medicine_remarks').val();
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
        data : JSON.stringify({'medicine':medicine, 'duration':duration, 'dosage':dosage, 'frequency':frequency, 'type':type,
        	'remarks':remarks}),
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
        	
		    var str = medicineDispalyString(data.id,data.type,data.medicine,data.frequency,data.dosage,data.duration,data.remarks);
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
	    	$('#id_input_dosage').val("")
	    	$('#id_input_duration').val("")
	    	$('#id_medicine_remarks').val("")
	    	$('.ui.normal.dropdown.frequency')
  				.dropdown('clear');
	    	$('#id_input_medicine').focus();
        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
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

var imesetup = function () {
	$( 'body' ).on( 'focus.ime', '.hindi-text', function () {
			var $input = $( this );
			$input.ime( {
				imePath: $.myproject.STATIC_URL + 'ime/',
				languages: [ 'en', 'hi'],
			} );
			imeselector = 	$input.data('imeselector');
			imeselector.selectLanguage('hi');
			imeselector.selectIM('hi-transliteration');
	} )
}


$(document).ready(function() {

	// add medicine delete function for class medicine if any
	
	$(document).off("click",".del-medicine");
	
	$(document).on("click", ".del-medicine" , function( event ) {
		/*
		 * Assuming this in td and we want to remove the row
		 */
		$(this).parent().parent().remove();
	});

	$('.ui.normal.dropdown.frequency')
  		.dropdown({
    	maxSelections: 3
  	});

  	console.log($.myproject.STATIC_URL + 'ime/');

  	/*
	$( '.hindi-text' ).ime( { imePath: $.myproject.STATIC_URL + 'ime/', languages: ['hi','en']});
	*/
	imesetup();


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
	            description : item.dosage + " " + item.frequency + " for " + item.duration + " days" ,
	            type: item.type,
	            dosage: item.dosage,
	            frequency: item.frequency,
	            duration: item.duration,
	            remarks: item.remarks
	          });
	        });
	        return response;
	      },
	  },
	      minCharacters : 3,
	      onSelect: function(result, response){
	      	console.log(result);
	      	console.log(response);
	      	
		    var str = medicineDispalyString(result.id,result.type,result.title,result.frequency,result.dosage,result.duration,
		    	result.remarks);
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

