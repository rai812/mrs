
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
	var vitalcnsId = $(".vitals-display").attr("vitalcns-id")
	var Remark = $("#id_input_remarks").val();
	var Tests = $("#id_input_tests").val();
	var patient_id = $('.patient-display').attr('data-id');
	console.log(complaintIds);
	console.log(medicineIds);
	console.log(diseaseIds);
	console.log(vitalId);
	console.log(vitalcnsId);
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
        data : JSON.stringify({'complaints':complaintIds, 'medicines':medicineIds, 'diseases':diseaseIds, 'vitals':vitalId, 'vitalscns': vitalcnsId,
         'remark':Remark, 'patient_id':patient_id,
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
        	$('#id_btn_report').attr("href", window.location.origin + "/visit/report/"+ data.visit_container_id)
        	$('#id_btn_report').removeClass("disabled");
        	
        	
        	
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
	// $('.ui.modal')
	//   .modal('show')
	// ;
	show_modal();
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

var goto_new_visit = function(element) {
	console.log($(element));
	window.location.href = window.location.origin+"/visit/add-visit/";	
}

var get_visits = function () {
	

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
    field = $("#id_visit_search_type").val();
	query = $("#id_visit_search").val();
    $.ajax({
        cache: false,
        url : window.location.origin+"/visit/get_visit_list/?field="+field+"&q="+query,
        type: "GET",
        dataType : "html",
        context : this,
        success : function (data) {
	    	$('#id_patient_list').html(data);
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var assignKeyboardShortcuts =  function(name){
	const tabNames = [
		{ "name": "patient", "id": "#id_full_name"}, 
		{"name": "history", "id": "#id_status"}, 
		{"name": "complaints", "id": "#id_complaints"},
		{"name": "cdhs", "id": "#id_input_remarks"},
		{"name": "vitals", "id": "#id_input_weight"},
		{"name": "medicine", "id": "#id_input_medicine"},
		{"name": "diagnosis", "id": "#id_disease"},
		{"name": "remark", "id": "#id_medicine_remarks"}, 
		{"name": "report", "id": "#id_btn_report"}];
	// console.log(name);
	tabNames.forEach((element, index) => {
		if(element.name == name)
		{
			$(element.id).focus()
			// console.log("Adding key event for " + name); 

			$(document).off("keydown");	  
			$(document).keydown((e) => {
				// console.log("key press "+ e.ctrlKey + " " + e.which)
				if (e.ctrlKey) {
					if (e.which == 37) { // left
						if(index != 0)
						{
							// console.log("Assiging " + tabNames[index-1].name + " to left of " + name);
							show_tab(tabNames[index-1].name)
							e.stopImmediatePropagation();
						}
						
					}
					if(e.which == 39) { // right  
						if(index != tabNames.length -1)
						{
							// console.log("Assiging " + tabNames[index+1].name + " to right of " + name);
							show_tab(tabNames[index +1 ].name)
							e.stopImmediatePropagation();
						}
					}
				}
				else if(e.which == 113){
					// F2 key press show the modal
						show_report();
				}
			});
		}
	});
}


$(document).ready(function() {
	
	// $('.ui.selection.dropdown')
	//   .dropdown()
	// ;
	
	$('#id_full_name').focus();


	var tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]')
	console.log("tabs elements  " + tabEl);
	tabEl.forEach(element => {
		element.addEventListener('shown.bs.tab', function (event) {
			console.log("shown event for " + event.target.getAttribute('data-bs-target'))
			  var newTab = event.target.getAttribute('data-bs-target') // newly activated tab
			//   var oldTab = event.relatedTarget.value // previous active tab
	
			  assignKeyboardShortcuts(newTab.replace('#',''));
			})	
	});	
	console.log("before assiging");
	show_tab("patient");
});