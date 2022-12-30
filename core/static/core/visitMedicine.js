
var medicineDispalyString = function(id,medicine,frequency,dosage,duration,remarks,category) {
	var str = '\
		<tr class="medicine-display" data-id="' + id + '"> \
		<td>' + medicine + ' : '  + dosage + '</td> \
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
	var category = $('#id_input_m_category').val();
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
        	'remarks':remarks,'category':category}),
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
        	
		    var str = medicineDispalyString(data.id,data.type,data.medicine,data.frequency,data.dosage,data.duration,data.remarks,data.category);
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
			$('#id_input_m_category').val("")
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


	// $('.ui.search.medicine')
	// .search({
	//   // change search endpoint to a custom endpoint by manipulating apiSettings
	//   apiSettings: {
	//     url: '/medicines/api/get_medicine/?q={query}',
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
	//           	id: item.id,
	//             title       : item.medicine + ' ( ' + item.category + ')',
	//             description : item.dosage + " " + item.frequency + " for " + item.duration + " days" ,
	//             type: item.type,
	//             dosage: item.dosage,
	//             frequency: item.frequency,
	//             duration: item.duration,
	//             remarks: item.remarks
	//           });
	//         });
	//         return response;
	//       },
	//   },
	//       minCharacters : 3,
	//       onSelect: function(result, response){
	//       	console.log(result);
	//       	console.log(response);
	      	
	// 	    var str = medicineDispalyString(result.id,result.type,result.title,result.frequency,result.dosage,result.duration,
	// 	    	result.remarks,result.category);
	//     	$('#added_medicine').append(str);
	    	
	//     	$(document).off("click",".del-medicine");
	    	
	//     	$(document).on("click", ".del-medicine" , function( event ) {
	//     		/*
	//     		 * Assuming this in td and we want to remove the row
	//     		 */
	//     		$(this).parent().parent().remove();
	//     	});
	    	
	//     	show_success("Medicine Added!!!", " press F2 to view the report." );
	    	
	//     	$('#id_input_medicine').focus();
	//       },

	// })
	// ;

	const baseUrl = window.location.origin 
	? window.location.origin + '/'
	: window.location.protocol + '/' + window.location.host + '/';
	new Autocomplete('id_input_medicine', {
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
			const api = `${baseUrl}/medicines/api/get_medicine/?q=${encodeURI(
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
				return `<li class="" data-id="${el.id}" 
				data-medicine="${el.medicine}" data-remark="${el.remark}" data-duration="${el.duration}"
				data-category="${el.category}"
				data-frequency="${el.frequency}"
				data-dosage="${el.dosage}">
				<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">${el.medicine} ( ${el.category} )</h5>
				</div>
				<p class="mb-1">${el.dosage} ${el.frequency} for ${el.duration} days</p>
				</li>`;
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
			var str = medicineDispalyString(node.getAttribute("data-id"),node.getAttribute("data-medicine"),node.getAttribute("data-frequency"),
			node.getAttribute("data-dosage"),node.getAttribute("data-duration"),
			node.getAttribute("data-iremark"),node.getAttribute("data-category"));
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

	// $('.ui.search.dosage')
	// .search({
	//   // change search endpoint to a custom endpoint by manipulating apiSettings
	//   apiSettings: {
	//     url: '/medicines/api/get_dosage_values/?q={query}',
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
	//             title       : item.value,
	//           });
	//         });
	//         return response;
	//       },
	//   },
	//       minCharacters : 1,
	// })
	// ;

	new Autocomplete('id_input_dosage', {
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
		howManyCharacters: 1,
		onSearch: ({currentValue}) => {
			const api = `${baseUrl}/medicines/api/get_dosage_values/?q=${encodeURI(
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
				return `<li class="" data-id="${el.id}" 
				data-value="${el.value}">
				<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">${el.value}</h5>
				</div>
				</li>`;
			}).join("")
		},
		// the callback presents no results
		noResults: ({ element, template }) => {
			template(`<li>No results found: "${element.value}"</li>`);
		}
		
	});

	
	// $('.ui.search.m_category')
	// .search({
	//   // change search endpoint to a custom endpoint by manipulating apiSettings
	//   apiSettings: {
	//     url: '/medicines/api/get_category_values/?q={query}',
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
	//             title       : item.value,
	//           });
	//         });
	//         return response;
	//       },
	//   },
	//       minCharacters : 1,
	// })
	// ;
	new Autocomplete('id_input_m_category', {
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
		howManyCharacters: 1,
		onSearch: ({currentValue}) => {
			const api = `${baseUrl}/medicines/api/get_category_values/?q=${encodeURI(
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
				return `<li class="" data-id="${el.id}" 
				data-value="${el.value}">
				<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">${el.value}</h5>
				</div>
				</li>`;
			}).join("")
		},
		// the callback presents no results
		noResults: ({ element, template }) => {
			template(`<li>No results found: "${element.value}"</li>`);
		}
		
	});
	
	
});

