var medicalHistoryDispalyString = function(id, status) {
	
	var str = '\
		<tr class="medicalHistory-display" data-id="' + id + '">'
		/*
		<td> ' + data.disease + ' </td> \
		<td> ' + data.diagnose_at + ' </td>';
	if (data.active == "True")
	{
		str += '<td> <i class="fa fa-check c-red" aria-hidden="true"></i> </td>'
	}
	else
	{
		str += '<td> <i class="fa fa-times " aria-hidden="true"></i> </td>'
	}
	if (data.allergic == "True")
	{
		str += '<td> <i class="fa fa-check c-red" aria-hidden="true"></i> </td>'
	}
	else
	{
		str += '<td> <i class="fa fa-times " aria-hidden="true"></i> </td>'
	}
	if (data.infectious == "True")
	{
		str += '<td> <i class="fa fa-check c-red" aria-hidden="true"></i> </td>'
	}
	else
	{
		str += '<td> <i class="fa fa-times " aria-hidden="true"></i> </td>'
	}
	*/
	str += '<td> ' + status + ' </td> \
		</tr>';
	return str;

}

var medicalFilesDispalyString = function(data) {
	var str = '\
		<tr class="medicalFiles-display" data-id="' + data.id + '"> \
		<td> ' + data.description + ' </td> \
		<td> ' + data.uploaded_at + ' </td> \
		<td> <a href="' + data.document_url + 'target="_blank">' + data.document_name + '</a> </td> \
		</tr>';
	return str;

}



var add_history = function () {
	
	var status = $('#id_status').val();
	var patient_id = $(".patient-display").data("id")
	console.log(status);
	console.log(patient_id);


    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/history/add-history-api/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'status':status, 'patient_id':patient_id}),
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
        	
		    var str = medicalHistoryDispalyString(data.id,data.status);
	    	$('#added_medicalHistory').append(str);
	    	/*
	    	 * Remove all input boxes
	    	 */
	    	$('#id_status').val(data.sex);
        	$('a[href="#div_id_complaints"]').tab('show')
        	show_success("History Added!!!", " press F2 to view the report." );
        	$('.ui.menu').find('.item').tab('change tab', 'complaints');
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}

var get_history = function (patient_id) {
	
	console.log(patient_id);


    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/history/get-history-api/?patient_id="+String(patient_id),
        type: "GET",
        dataType : "json",
        contentType: "application/json;",
        context : this,
        success : function (data) {
        	
        	console.log(data);
        	var final_str  = "" 
			$.each(data,function (i,item) {
				final_str += medicalHistoryDispalyString(item.id,item.status); 
			});
        	console.log(final_str);
	    	$('#added_medicalHistory').append(final_str);
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}
