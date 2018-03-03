
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
		<td> <i class="fa fa-times-circle del-patient" aria-hidden="true"></i> </td>\
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

	$('.del-patient').parent().parent().remove();

	
    var str = patientDispalyString(id,full_name,age,sex, mobile);
	$('#added_patient').append(str);

	$(document).off("click",".del-patient");
	
	$(document).on("click", ".del-patient" , function( event ) {
		/*
		 * Assuming this in td and we want to remove the row
		 */
		$(this).parent().parent().remove();
		$(".medicalHistory-display").remove();
		$('.ui.menu').find('.item').tab('change tab', 'patient');
	});
	get_history(id);	
	$('#id_full_name').val(full_name)
	$('#id_age').val(age)
	$('#id_sex').val(sex);
    $('#id_mobile').val(mobile);
	
	show_success("Added Successfully!!!", " " + full_name + " selected as patient." );
	
	$('.ui.menu').find('.item').tab('change tab', 'complaints');
	
}

$(document).ready(function() {
	$('#id_sex').dropdown();
	/*
	 * Test function for UI search
	 */
	$('.ui.search.patient')
	  .search({
	    // change search endpoint to a custom endpoint by manipulating apiSettings
	    apiSettings: {
	      url: '/core/api/get_patients/?q={query}',
	      onResponse: function(githubResponse) {
	          var
	            response = {
	        		  results : Array()
	            }
	          ;
	          // translate GitHub API response to work with search
	          console.log("printing result from server");
	          console.log(githubResponse.results);
	          $.each(githubResponse.results, function(index, item) {
	            // add result to category
	            response.results.push({
	            	id: item.id,
	              title       : item.full_name,
	              description : item.age + " " + item.sex ,
	              sex: item.sex,
	              age: item.age,
                  mobile: item.mobile
	            });
	          });
	          return response;
	        },
	    },
	        minCharacters : 3,
	        onSelect: function(result, response){
	        	console.log(result);
	        	console.log(response);
	        	patientExitAction(result.id,result.title,result.age,result.sex,result.mobile);
	        },

	  })
	;
});