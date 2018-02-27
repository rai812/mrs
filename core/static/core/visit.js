
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
	var Remark = $("#id_input_remarks").val();
	var Tests = $("#id_input_tests").val();
	var patient_id = $('.patient-display').attr('data-id');
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
        data : JSON.stringify({'complaints':complaintIds, 'medicines':medicineIds, 'diseases':diseaseIds, 'vitals':vitalId, 'remark':Remark, 'patient_id':patient_id,
        	'tests': Tests, 'visit_container_id': $("#id_visit_container_id").val()}),
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
        	
        	$('.ui.menu').find('.item').tab('change tab', 'report');
        	$('#id_btn_report').attr("href").val(window.location.origin + "visit/report/"+ data.visit_container_id)
        	
        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var show_report = function(element) {
	$('.ui.modal')
	  .modal('show')
	;
	$("#added_patient").focus();
};

var goto_add_visit = function(element) {
	console.log($(element));
	window.location.href = window.location.origin+"/visit/add-visit/?visit_container_id=" + $(element).data('id');
}

var add_new_visit = function(element) {
	console.log($(element));
	window.location.href = window.location.origin+"/visit/add-visit/?visit_id=" + $(element).data('id') + '&use_as_template=True';	
}

$(document).ready(function() {
	
	$('#id_full_name').focus();
	$(document).off("keydown");	  
	$(document).on("keydown" , function(e) {
		  if (e.ctrlKey) {
		  if(e.keyCode == 39) { // right  
			  $('.ui.menu').find('.item').tab('change tab', 'history');
	        	e.stopImmediatePropagation();
	        }
		  }
		  else if(e.keyCode == 113){
			// F2 key press show the modal
			  show_report();
		  }
		});

	
	$('.tabular.menu .item').tab(
			{
		'onVisible': function(name){
			console.log(name);
			if("patient" == name){

				$('#id_full_name').focus();
				$(document).off("keydown");	  
				$(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
					  if(e.keyCode == 39) { // right  
						  $('.ui.menu').find('.item').tab('change tab', 'history');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});
				
			}else if("history" == name){
				  $('#id_status').focus();
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
					        if (e.keyCode == 37) { // left      
					        	$('.ui.menu').find('.item').tab('change tab', 'patient');
					        	e.stopImmediatePropagation();
					        }
					        else if(e.keyCode == 39) { // right
					        
					        	$('.ui.menu').find('.item').tab('change tab', 'complaints');
					        	e.stopImmediatePropagation();
					        }					  
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});
				
			}else if("complaints" == name){
				  $('#id_complaints').focus();
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
				        if (e.keyCode == 37) { // left      
				        	$('.ui.menu').find('.item').tab('change tab', 'history');
				        	e.stopImmediatePropagation();
				        }
				        else if(e.keyCode == 39) { // right
				        
				        	$('.ui.menu').find('.item').tab('change tab', 'vitals');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});
				
			}else if("vitals" == name){
				$('#id_input_weight').focus();
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
				        if (e.keyCode == 37) { // left      
				        	$('.ui.menu').find('.item').tab('change tab', 'complaints');
				        	e.stopImmediatePropagation();
				        }
				        else if(e.keyCode == 39) { // right
				        
				        	$('.ui.menu').find('.item').tab('change tab', 'medicine');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});

			}else if("medicine" == name){
				  $('#id_input_medicine').focus();
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) { 
					  if (e.keyCode == 37) { // left      
				        	$('.ui.menu').find('.item').tab('change tab', 'vitals');
				        	e.stopImmediatePropagation();
				        }
				        else if(e.keyCode == 39) { // right
				        
				        	$('.ui.menu').find('.item').tab('change tab', 'diagnosis');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});
				
			}else if("diagnosis" == name){
				$('#id_disease').focus();
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
				        if (e.keyCode == 37) { // left      
				        	$('.ui.menu').find('.item').tab('change tab', 'medicine');
				        	e.stopImmediatePropagation();
				        }
				        else if(e.keyCode == 39) { // right
					        
				        	$('.ui.menu').find('.item').tab('change tab', 'report');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});

			}else if("report" == name){
				  $(document).off("keydown");	  
				  $(document).on("keydown" , function(e) {
					  if (e.ctrlKey) {
				        if (e.keyCode == 37) { // left      
				        	$('.ui.menu').find('.item').tab('change tab', 'diagnosis');
				        	e.stopImmediatePropagation();
				        }
					  }
					  else if(e.keyCode == 113){
							// F2 key press show the modal
							  show_report();
						  }

					});
				
			}
				
		},
	});
});