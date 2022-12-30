
var patientDispalyString = function(id, full_name, age, sex, mobile) {
	var str = '\
		<tr class="patient-display" data-id="' + id + '"> \
		<td> <span class="fS16 c-31 "> Name: </span> \
		<span id="span_id_name" class="fS24 mL-32">' + full_name + ' </span> </td> \
        <td> <span class="fS16 c-31 "> Mobile: </span> \
        <span id="span_id_age" class="fS24 mL-32">' + mobile + ' </span> </td> \
		<td> <span class="fS16 c-31 "> Age: </span> \
		<span id="span_id_age" class="fS24 mL-32">' + age + ' </span> </td> \
		<td> <span class="fS16 c-31 "> Sex: </span> \
		<span id="span_id_sex" class="fS24 mL-32">' + sex + ' </span> </td> \
		<td> <i class="bi bi-x-square del-patient"></i></td>\
		</tr>';
	return str;
}


var add_patient = function () {
	
	var full_name = $('#id_full_name').val();
	var age = $('#id_age').val();
	var sex = $('#id_sex').val();
    var mobile = $('#id_mobile').val();
	
	console.log(full_name);
	console.log(age);
	console.log(sex);


    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/core/api/add_patient/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'full_name':full_name, 'age':age, 'sex':sex, 'mobile':mobile}),
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

        	patientExitAction(data.id,data.full_name,data.age,data.sex, data.mobile);        	        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var patientExitAction = function(id, full_name, age, sex, mobile) {

	// $('.del-patient').parent().parent().remove();

	
    var str = patientDispalyString(id,full_name,age,sex, mobile);
	$('#added_patient').append(str);

	$(document).off("click",".del-patient");
	
	$(document).on("click", ".del-patient" , function( event ) {
		/*
		 * Assuming this in td and we want to remove the row
		 */
		$(this).parent().parent().remove();
		$(".medicalHistory-display").remove();
		// $('.ui.menu').find('.item').tab('change tab', 'patient');
		show_tab('patient')
	});
	get_history(id);	
	$('#id_full_name').val(full_name)
	$('#id_age').val(age)
	$('#id_sex').val(sex);
    $('#id_mobile').val(mobile);
	
	show_success("Added Successfully!!!", " " + full_name + " selected as patient." );
	
	// $('.ui.menu').find('.item').tab('change tab', 'complaints');
	show_tab('history');
}

$(document).ready(function() {
	// $('#id_sex').dropdown();
	$(document).on("click", "#id-patient-reset" , function( event ) {
		/*
		 * Assuming this in td and we want to remove the row
		 */
		console.log("resetting the patient information");
		$('#id_full_name').val("")
		$('#id_age').val("")
		$('#id_sex').val("Male");
		$('#id_mobile').val("");
	});
	/*
	 * Test function for UI search
	 */
	const baseUrl = window.location.origin 
	? window.location.origin + '/'
	: window.location.protocol + '/' + window.location.host + '/';
	new Autocomplete('id_full_name', {
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
			const api = `${baseUrl}/core/api/get_patients/?q=${encodeURI(
				currentValue
			  )}`;
			// const api = `https://jsonplaceholder.typicode.com/posts`;
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
			
			return matches.results.map((el) => {
				console.log("individual entry " + el.full_name);
				return `<li class="search-list-item" data-id=${el.id} data-fullName=${el.full_name} data-sex=${el.sex} data-mob=${el.mobile} data-age=${el.age}>${el.full_name}</li>`;
			}).join("")
		} ,
		// the onSubmit function is executed when the user
		// submits their result by either selecting a result
		// from the list, or pressing enter or mouse button
		onSubmit: ({ index, element, object, results }) => {
			console.log("complex: ", index, element, object, results);
			let node= results.childNodes[index];
			console.log(node.getAttribute("data-fullName"))
			patientExitAction(node.getAttribute("data-id"),node.getAttribute("data-fullName"),node.getAttribute("data-age"),node.getAttribute("data-sex"),node.getAttribute("data-mob"));
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
