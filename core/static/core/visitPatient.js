var createPatientString = function(i,item) {
    var str = '\
        <div class="card-xl patient-card bCw curP bS-5" data-id="' + item.id +'"  data-fname="' + item.first_name + '" data-mname="' + item.middle_name + 
        '" data-lname="' + item.last_name + '" data-sex="' + item.sex + '" data-age="' + item.age + '" data-dob="'+ item.dob + 
        '" data-mob="' + item.mob +'" data-full_name= "' + item.full_name + '" tabindex="1" > \
            <div class="pLR-16 pTB-8"> \
                <div class="fS16 title-text c-31"> \
                    <span>' + item.full_name + '</span> \
                </div> \
                <div class="mT-8"> \
                    <div class="mT4 row-flex fill"> \
                        <div class="light-txt"> \
                            <span class="b">' + item.age + '</span> \
                            <span class="b">' + item.sex + '</span> \
                        </div> \
                        <div class="light-txt"> \
                            <span class="b">Mob:</span> \
                            <span>' + item.mob + '</span> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div>';
    return str;
}

var createPatientString1 = function(i, item) {
	var str= '\
		'
}


var patientDispalyString = function(id, full_name, age, sex) {
	var str = '\
		<tr class="patient-display" data-id="' + id + '"> \
		<td> <span class="fS16 c-31 "> Name: </span> \
		<span id="span_id_name" class="fS24 mL-32">' + full_name + ' </span> </td> \
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
        data : JSON.stringify({'full_name':full_name, 'age':age, 'sex':sex}),
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

        	patientExitAction(data.id,data.full_name,data.age,data.sex, "");        	
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


var addPatientCardAction = function(prevElement) {
	
	/*
	 * New patient is being added so remove the last one
	 */
	$('.del-patient').parent().parent().remove();
	/*
	 * Add focus to patient card
	 */
	$(document).off("keydown",".patient-card");
	
	$(document).on("keydown", ".patient-card" , function(e ) {
        if (e.keyCode == 40) {
        	e.stopImmediatePropagation();
        	console.log("Down Key pressed");
            $(".patient-card:focus").next().focus();
   
        }
        if (e.keyCode == 38) {
        	e.stopImmediatePropagation();
        	console.log("UP Key pressed");
            $(".patient-card:focus").prev().focus();
        }
        
        if(e.keyCode == 13)
        {
        	e.stopImmediatePropagation();
            console.log($(this).data("fname"))
            console.log($(this).data("mname"))
            console.log($(this).data("lname"))
            console.log($(this).data("sex"))
            console.log($(this).data("age"))
            console.log($(this).data("dob"))
            console.log($(this).data("mob"))
            
            patientExitAction($(this).data("id"),$(this).data("full_name"),$(this).data("age"),$(this).data("sex"), "");            
        }
        
        if(e.keyCode == 27)
        {
        	e.stopImmediatePropagation();
            $('#search-close').remove();
            $('#search-results').remove();
            prevElement.focus();
        }
        
	});
	
	
	
    $(document).off("click",".patient-card");
    
    $(document).on("click", ".patient-card" , function(event ) {
    	
        console.log($(this).data("fname"))
        console.log($(this).data("mname"))
        console.log($(this).data("lname"))
        console.log($(this).data("sex"))
        console.log($(this).data("age"))
        console.log($(this).data("dob"))
        console.log($(this).data("mob"))
    
        patientExitAction($(this).data("id"),$(this).data("full_name"),$(this).data("age"),$(this).data("sex"), "");
        event.stopImmediatePropagation();
    });
}

var patientExitAction = function(id, full_name, age, sex, mobile) {

	$('.del-patient').parent().parent().remove();

	
    var str = patientDispalyString(id,full_name,age,sex);
	$('#added_patient').append(str);

	$(document).off("click",".del-patient");
	
	$(document).on("click", ".del-patient" , function( event ) {
		/*
		 * Assuming this in td and we want to remove the row
		 */
		$(this).parent().parent().remove();
		$(".medicalHistory-display").remove();
//		$('a[href="#div_id_patient"]').tab('show')
		$('.ui.menu').find('.item').tab('change tab', 'patient');
	});
	get_history(id);	
	$('#id_full_name').val(full_name)
	$('#id_age').val(age)
	$('#id_sex').val(sex);
	
	show_success("Added Successfully!!!", " " + full_name + " selected as patient." );
	
	$('.ui.menu').find('.item').tab('change tab', 'history');
	
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
	          $.each(githubResponse.results, function(index, item) {
	            // add result to category
	            response.results.push({
	            	id: item.patient_id,
	              title       : item.full_name,
	              description : item.age + " " + item.sex ,
	              sex: item.sex,
	              age: item.age,
	            });
	          });
	          return response;
	        },
	    },
	        minCharacters : 3,
	        onSelect: function(result, response){
	        	console.log(result);
	        	console.log(response);
	        	patientExitAction(result.id,result.title,result.age,result.sex,"");
	        },

	  })
	;
});