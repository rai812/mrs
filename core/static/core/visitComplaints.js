
var complaintDispalyString = function(id,value,duration) {
	var str = '\
		<tr> <td> \
		<span class="tag label label-info c-31 complaint-display" data-id="' + id + '"> \
		<span>' + value + ' for ' + duration + '</span> \
		<td> <i class="bi bi-x-square del-complaint" aria-hidden="true"></i></td>\
		</span> </tr> </td>';
	return str;

}

var add_complaints = function () {
	
	var complaint_name = $('#id_complaints').val();
	var complaint_duration = $('#id_input_c_duration').val();
	console.log(complaint_name);
	console.log(complaint_duration);

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
        url : window.location.origin+"/complaints/api/add_complaints/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'complaint_name':complaint_name,'complaint_duration':complaint_duration}),
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
        	
        	complaintExitAction(data.id,data.description,data.duration);	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var complaintExitAction = function(id, description,duration) {

	var str = complaintDispalyString(id,description,duration);
	$('#added_complaint').append(str);
	
	$(document).off("click",".del-complaint");
	
	$(document).on("click", ".del-complaint" , function( event ) {
		$(this).parent().parent().parent().remove();
	});
	
	$('#id_complaints').val("")
	$('#id_input_c_duration').val("")
	$('#id_complaints').focus();
	show_success("Complaint Added!!!", " press F2 to view the report." );
}

$(document).ready(function() {

    // add delete complaint action for each element if present
    $(document).off("click",".del-complaint");
    
    $(document).on("click", ".del-complaint" , function( event ) {
        $(this).parent().parent().parent().remove();
    });

	// $('.ui.search.complaint')
	//   .search({
	//     // change search endpoint to a custom endpoint by manipulating apiSettings
	//     apiSettings: {
	//       url: '/complaints/api/get_complaints/?q={query}',
	//       onResponse: function(githubResponse) {
	//           var
	//             response = {
	//         		  results : Array()
	//             }
	//           ;
	//           // translate GitHub API response to work with search
	//           $.each(githubResponse, function(index, item) {
	//             // add result to category
	//             response.results.push({
	//             	id: item.id,
	//               title       : item.name,
	//               description : item.remark
	//             });
	//           });
	//           return response;
	//         },
	//     },
	//         minCharacters : 3,
	//       /*  onSelect: function(result, response){
	//         	console.log(result);
	//         	console.log(response);
	//         	complaintExitAction(result.id,result.title);
	//         },*/
			

	//   })
	// ;
	const baseUrl = window.location.origin 
	? window.location.origin + '/'
	: window.location.protocol + '/' + window.location.host + '/';
	new Autocomplete('id_complaints', {
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
			const api = `${baseUrl}/complaints/api/get_complaints/?q=${encodeURI(
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
				return `<li class="search-list-item" data-id="${el.id}" data-name="${el.name}" data-remark="${el.remark}" data-duration="${el.duration}">${el.name}</li>`;
			}).join("")
		} ,
		// the onSubmit function is executed when the user
		// submits their result by either selecting a result
		// from the list, or pressing enter or mouse button
		onSubmit: ({ index, element, object, results }) => {
			console.log("complex: ", index, element, object, results);
			let node= results.childNodes[index];
			console.log(node.getAttribute("data-name"))
			complaintExitAction(node.getAttribute("data-id"),node.getAttribute("data-name"),node.getAttribute("data-duration"));
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
