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
		<td> <i class="bi bi-x-square del-disease" aria-hidden="true"></i></td>\
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

	// $('.ui.search.disease')
	// .search({
	//   // change search endpoint to a custom endpoint by manipulating apiSettings
	//   apiSettings: {
	//     url: '/complaints/api/get_disease/?q={query}',
	//     onResponse: function(githubResponse) {
	//         var
	//           response = {
	//       		  results : Array()
	//           }
	//         ;
	//         // translate GitHub API response to work with search
	//         $.each(githubResponse, function(index, item) {
	//           // add result to category
	//           response.results.push({
	//         	id: item.id,
	//             title       : item.name,
	//           });
	//         });
	//         return response;
	//       },
	//   },
	//       minCharacters : 3,
	//       onSelect: function(result, response){
	// 	      	console.log(result);
	// 	      	console.log(response);
		      	
	// 		    var str = diseaseDispalyString(result.id,result.title);
	// 	    	$('#added_disease').append(str);
		    	
		    	
	// 	    	$(document).off("click",".del-disease");
		    	
	// 	    	$(document).on("click", ".del-disease" , function(event) {
	// 	    		event.stopImmediatePropagation();
	// 	    		$(this).parent().parent().parent().remove();
	// 	    	});
		    	
	// 	    	$('#id_disease').val("")
	// 	    	$('#id_disease').focus();
	// 	    	show_success("Diagnosis Added!!!", " press F2 to view the report." );
	// 	      },

	// })
	// ;

	const baseUrl = window.location.origin 
	? window.location.origin + '/'
	: window.location.protocol + '/' + window.location.host + '/';
	new Autocomplete('id_disease', {
		// search delay
		delay: 1000,

		// add button 'x' to clear the text from
		// the input filed
		clearButton: false,
	  
		// default selects the first item in
		// the list of results
		selectFirst: true,
	  
		// add text to the input field as you move through
		// the results with the up/down cursors
		insertToInput: true,
	  
		// the number of characters entered
		// should start searching
		howManyCharacters: 3,
		onSearch: ({currentValue}) => {
			const api = `${baseUrl}/complaints/api/get_disease/?q=${encodeURI(
				currentValue
			  )}`;
			  return $.ajax({
				url: api,
				method: 'GET',
				})
				.done(function (data) {
					return data;
				})
				.fail(function (xhr) {
					console.error(xhr);
			});
		},
		onResults: ({ matches }) => {
			console.log("Onresult called " + JSON.stringify(matches));
			
			return matches.map((el) => {
				return `<li class="search-list-item" data-id="${el.id}" data-name="${el.name}">${el.name}</li>`;
			}).join("")
		} ,
		// the onSubmit function is executed when the user
		// submits their result by either selecting a result
		// from the list, or pressing enter or mouse button
		onSubmit: ({ index, element, object, results }) => {
			console.log("complex: ", index, element, object, results);
			let node= results.childNodes[index];
			console.log(node.getAttribute("data-name"))
			var str = diseaseDispalyString(node.getAttribute("data-id"),node.getAttribute("data-name"));
		    $('#added_disease').append(str);
		    	
		    	
		    $(document).off("click",".del-disease");
		    	
		    $(document).on("click", ".del-disease" , function(event) {
		    		event.stopImmediatePropagation();
		    		$(this).parent().parent().parent().remove();
		    });
		    	
			$('#id_disease').val("")
			$('#id_disease').focus();
			show_success("Diagnosis Added!!!", " press F2 to view the report." );

			// window.open(`https://www.imdb.com/find?q=${encodeURI(input)}`)
		},

		// get index and data from li element after
		// hovering over li with the mouse or using
		// arrow keys ↓ | ↑
		onSelectedItem: ({ index, element, object }) => {
			console.log("onSelectedItem:", index, element.value, object);
		},

		// the callback presents no results
		noResults: ({ element, template }) => {
			template(`<li>No results found: "${element.value}"</li>`);
		}
		
	});

});
