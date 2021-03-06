var createDiseaseString = function(i,item) {
    var str = '\
        <div class="card-xl disease-card bCw curP bS-5" data-id="' + item.id +'"  data-name="' + item.name + '" > \
            <div class="pLR-16 pTB-8"> \
                <div class="fS16 title-text c-31"> \
                    <span>' + item.name + '</span> \
                </div> \
            </div> \
        </div>';
    return str;
}

var diseaseDispalyString = function(id,value) {
	var str = '\
		<tr> <td> \
		<span class="tag label label-info c-31 disease-display " data-id="' + id + '"> \
		<span>' + value + '</span> \
		<i class="fa fa-times-circle del-disease" aria-hidden="true"></i> \
		</span> </td> </tr>';
	
	return str;

}

var addDiseaseString  = function(value) {
	
    var str = '\
        <div class="card-xl bCw curP bS-5" > \
            <div class="pLR-16 pTB-8 add-disease-button" data-url="/complaints/api/add_disease/"> \
                <div class="fS16 title-text c-31"> \
                    <span id="add-disease-value">' + value + '</span> \
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


var addDisease = function() {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
    //Save Form Data........
	    
    disease_name = $('#id_disease').val() 
	    
    $.ajax({
        cache: false,
        url : window.location.origin+'/complaints/api/add_disease/',
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'disease_name':disease_name}),
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
        	
		    var str = diseaseDispalyString(data.id,data.name);
	    	$('#added_disease').append(str);
	    	
	    	$(document).off("click",".del-disease");
	    	
	    	$(document).on("click", ".del-disease" , function( event ) {
	    		$(this).parent().parent().parent().remove();
	    	});
	    	
	    	$('#id_disease').val("")
	    	$('#id_disease').focus();

        	
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

	// add delete disease action if any
    $(document).off("click",".del-disease");
    	
	$(document).on("click", ".del-disease" , function( event ) {
		$(this).parent().parent().parent().remove();
	});

	$('.ui.search.disease')
	.search({
	  // change search endpoint to a custom endpoint by manipulating apiSettings
	  apiSettings: {
	    url: '/complaints/api/get_disease/?q={query}',
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
	          });
	        });
	        return response;
	      },
	  },
	      minCharacters : 3,
	      onSelect: function(result, response){
		      	console.log(result);
		      	console.log(response);
		      	
			    var str = diseaseDispalyString(result.id,result.title);
		    	$('#added_disease').append(str);
		    	
		    	
		    	$(document).off("click",".del-disease");
		    	
		    	$(document).on("click", ".del-disease" , function(event) {
		    		event.stopImmediatePropagation();
		    		$(this).parent().parent().parent().remove();
		    	});
		    	
		    	$('#id_disease').val("")
		    	$('#id_disease').focus();
		    	show_success("Diagnosis Added!!!", " press F2 to view the report." );
		      },

	})
	;

});
