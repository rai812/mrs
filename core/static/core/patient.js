var get_patients = function () {
	

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
    field = $("#id_search_field").val();
	query = $("#id_patient_search").val();
    $.ajax({
        cache: false,
        url : window.location.origin+"/core/get_patient_list/?field="+field+"&q="+query,
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


$(document).ready(function() {
	$('.ui.selection.dropdown')
	  .dropdown()
	;
});