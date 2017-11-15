	var getCookie = function(name){
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	};
	
	var csrfSafeMethod = function(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	};

	
	var createPatientString = function(i,item) {
	    var str = '\
	        <div class="card-xl patient-card bCw curP bS-5" data-id="' + item.id +'"  data-fname="' + item.first_name + '" data-mname="' + item.middle_name + 
	        '" data-lname="' + item.last_name + '" data-sex="' + item.sex + '" data-age="' + item.age + '" data-dob="'+ item.dob + 
	        '" data-mob="' + item.mob + '" > \
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

	var createMedicineFieldString = function(i,item) {
	    var str = '\
	        <div class="card-xl medicine--field-card bCw curP bS-5" data-name="' + item.value + '" > \
	            <div class="pLR-16 pTB-8"> \
	                <div class="fS16 title-text c-31"> \
	                    <span>' + item.value + '</span> \
	                </div> \
	            </div> \
	        </div>';
	    return str;
	}



	var createMedicineString = function(i,item) {
	    var str = '\
	        <div class="card-xl medicine-card bCw curP bS-5" data-id="' + item.id +'"  data-type="' + item.type + '" data-medicine="' + item.medicine + 
	        '" data-dosage="' + item.dosage + '" data-frequency="' + item.frequency + '" data-duration="' + item.duration + '" > \
	            <div class="pLR-16 pTB-8"> \
	                <div class="fS16 title-text c-31"> \
	                    <span>' + item.type + ' - ' + item.medicine +  '</span> \
	                </div> \
	                <div class="mT-8"> \
	                    <div class="mT4 row-flex fill"> \
	                        <div class="light-txt"> \
	                            <span class="b">' + item.dosage + '</span> \
	                        </div> \
	                        <div class="light-txt"> \
	                            <span class="b">' + item.frequency + '</span> \
	                        </div> \
	                        <div class="light-txt"> \
	                            <span class="b">Duration:</span> \
	                            <span>' + item.duration + '</span> \
	                        </div> \
	                    </div> \
	                </div> \
	            </div> \
	        </div>';
	    return str;
	}


	var createComplaintString = function(i,item) {
	    var str = '\
	        <div class="card-xl complaint-card bCw curP bS-5" data-id="' + item.id +'"  data-description="' + item.name +
	        	'"  data-remarks="' + item.remarks +'" > \
	            <div class="pLR-16 pTB-8"> \
	                <div class="fS16 title-text c-31"> \
	                    <span>' + item.name + '</span> \
	                </div> \
	                <div class="mT-8"> \
	                <div class="mT4 row-flex fill"> \
	                    <div class="light-txt"> \
	                        <span class="b">' + item.remarks + '</span> \
	                    </div> \
	                </div> \
	            </div> \
	            </div> \
	        </div>';
	    return str;
	}

	var complaintDispalyString = function(id,value) {
		var str = '\
			<span class="tag label label-info c-31 complaint-display" data-id="' + id + '"> \
			<span>' + value + '</span> \
			<i class="fa fa-times-circle del-complaint" aria-hidden="true"></i> \
			</span>';
		
		return str;

	}

	var diseaseDispalyString = function(id,value) {
		var str = '\
			<span class="tag label label-info c-31 disease-display " data-id="' + id + '"> \
			<span>' + value + '</span> \
			<i class="fa fa-times-circle del-disease" aria-hidden="true"></i> \
			</span>';
		
		return str;

	}

	
	var medicineDispalyString = function(id,type,medicine,frequency,dosage,duration) {
		var str = '\
			<tr class="medicine-display" data-id="' + id + '"> \
			<td>' + type + ' - ' + medicine + ' : ' + dosage + '</td> \
			<td>' + frequency + '</td> \
			<td>' + ' for ' +  duration + '</td> \
			<td> <i class="fa fa-times-circle del-medicine" aria-hidden="true"></i> </td>\
			</tr>';
		
		return str;

	}

	var vitalsDispalyString = function(data) {
		var str = '\
			<tr class="vitals-display" data-id="' + data.id + '"> \
			<td> Weight: ' + data.weight + '</td> \
			<td> Height: ' + data.height + '</td> \
			<td> OE: ' + data.oe + '</td> \
			<td> P/CL/CN/I/O/L: ' + data.pce+ '</td> \
			<td> Temp: ' + data.temp + '</td> \
			<td> Pulse: ' + data.pulse + '</td> \
			<td> BP: ' + data.bp + '</td> \
			<td> RR: ' + data.rr + '</td> \
			<td> CNS: ' + data.cns + '</td> \
			<td> Chest: ' + data.chest + '</td> \
			<td> CVS: ' + data.cvs + '</td> \
			<td> PA: ' + data.pa + '</td> \
			<td> Tests: ' + data.tests + '</td> \
			</tr>';
		
		return str;

	}

	

	var addComplaintString  = function(value) {
		
	    var str = '\
	        <div class="card-xl bCw curP bS-5" > \
	            <div class="pLR-16 pTB-8 add-complaint-button" data-url="/complaints/api/add_complaints/"> \
	                <div class="fS16 title-text c-31"> \
	                    <span id="add-complaint-value">' + value + '</span> \
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

	
var add_medicine = function () {
	
	var medicine = $('#id_input_medicine').val();
	var type = $('#id_input_type').val();
	var frequency = $('#id_input_frequency').val();
	var dosage = $('#id_input_dosage').val();
	var duration = $('#id_input_duration').val();
	
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
        data : JSON.stringify({'medicine':medicine, 'duration':duration, 'dosage':dosage, 'frequency':frequency, 'type':type}),
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
        	
		    var str = medicineDispalyString(data.id,data.type,data.medicine,data.frequency,data.dosage,data.duration);
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
	    	$('#id_input_frequency').val("")
	    	$('#id_input_dosage').val("")
	    	$('#id_input_duration').val("")
	    	
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

var add_vitals = function () {
	
	var weight = $('#id_input_weight').val();
	var height = $('#id_input_height').val();
	var oe = $('#id_input_oe').val();
	var pce = $('#id_input_pce').val();
	var bp = $('#id_input_bp').val();
	var rr = $('#id_input_rr').val();
	var temp = $('#id_input_temp').val();
	var pulse = $('#id_input_pulse').val();
	var cvs = $('#id_input_cvs').val();
	var cns = $('#id_input_cns').val();
	var chest = $('#id_input_chest').val();
	var pa = $('#id_input_pa').val();
	var tests = $('#id_input_tests').val();
	
	console.log(weight);
	console.log(height);
	console.log(oe);
	console.log(pce);
	console.log(bp);
	console.log(rr);
	console.log(temp);
	console.log(pulse);
	console.log(cvs);
	console.log(cns);
	console.log(chest);
	console.log(pa);
	console.log(tests);


    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
	
	
    $.ajax({
        cache: false,
        url : window.location.origin+"/core/api/add_vitals/",
        type: "POST",
        dataType : "json",
        contentType: "application/json;",
        data : JSON.stringify({'weight':weight, 'height':height, 'oe':oe, 'pce':pce, 'bp':bp, 'rr':rr, 'temp':temp, 'pulse':pulse, 'cvs':cvs, 'cns':cns, 'chest': chest
        	, 'pa':pa, 'tests':tests}),
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
        	
		    var str = vitalsDispalyString(data);
	    	$('#added_vitals').append(str);
	    	
	    	/*
	    	 * Remove all input boxes
	    	 */
	    	$('#id_input_weight').val("")
	    	$('#id_input_height').val("")
	    	$('#id_input_oe').val("");       
	    	$('#id_input_pce').val("");     
			$('#id_input_bp').val("");       
			$('#id_input_rr').val("");       
			$('#id_input_temp').val("");   
			$('#id_input_pulse').val(""); 
			$('#id_input_cvs').val("");     
			$('#id_input_cns').val("");     
			$('#id_input_chest').val(""); 
			$('#id_input_pa').val("");       
			$('#id_input_tests').val(""); 
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
	var Remark = $("#id_input_remarks").val()
	
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
        data : JSON.stringify({'complaints':complaintIds, 'medicines':medicineIds, 'diseases':diseaseIds, 'vitals':vitalId, 'remark':Remark }),
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
        	
        	$('a[href="#div_id_report"]').removeClass("disabled")
        	$('a[href="#div_id_report"]').tab('show')
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


$(document).ready(function() {
var thread = null;

    function formatMember(data) {
    
    console.log($(this));
    console.log(data);
    
    if(data.length == 0 && !($(this).hasClass("add-term")))
    	return
    	
    
    var final_str = "";


	data_type = $(this).data('type')
	
	if(data_type == 'patient')
	{
		$.each(data,function (i,item) {
			final_str += createPatientString(i,item)
		});
	}
	else if(data_type == 'disease')
	{
		$.each(data,function (i,item) {
			final_str += createDiseaseString(i,item)
		});
		
		final_str +=  addDiseaseString($(this).val())
	}
	else if(data_type == 'medicine')
	{
		$.each(data,function (i,item) {
			final_str += createMedicineString(i,item)
		});	
	}
	else if(data_type == 'complaints')
	{
		$.each(data,function (i,item) {
			final_str += createComplaintString(i,item)
		});
		
		final_str +=  addComplaintString($(this).val())
	}
	else if(data_type == 'medicine-type' || data_type == 'medicine-frequency' || data_type == 'medicine-dosage')
	{
		$.each(data,function (i,item) {
			final_str += createMedicineFieldString(i,item)
		});	
	}


	

    var pos = $(this).position();
    
    if($('#search-results').length == 0) {
    	  //it doesn't exist
    	console.log("Creating new search-result")
    	$('<div id="search-results"> </div>')
        .html(final_str)
        .css({
            top: pos.top + $(this).height()  + 5,
            left: pos.left,
            position: 'absolute',
            width: $(this).width()
        }).insertAfter($(this)).css("z-index", "1000").addClass("bS-5 position-abs");
    }
    else
    {
    	console.log("Editing existing search-result")
        $('#search-results')
        .html(final_str)
        .css({
            top: pos.top + $(this).height()  + 5,
            left: pos.left,
            position: 'absolute',
            width: $(this).width()
        }).css("z-index", "1000");
    }
    
    if($('#search-close').length == 0)
    {
    	console.log("Creating close button")
        $('<div id="search-close"> </div>')
        .html("close")
        .css({
            top: pos.top + $(this).height()  + 2,
            left: pos.left + $(this).width() - 35,
            position: 'absolute',
            opacity: 0.8,
        }).insertAfter($(this)).css("z-index", "2000").addClass("curP position-abs c-red")
        
        $(document).off("click","#search-close");
        
        $(document).on("click", "#search-close" , function(event) {
        	event.stopImmediatePropagation();
            $('#search-results').remove();
            $('#search-close').remove();
        });
        
    }
    
    	/*
    	 * bind click action to add-button 
    	 */
    	
	    $(document).off("click",".add-complaint-button");
	    
	    $(document).on("click", ".add-complaint-button" , function(event) {
	    
		    	event.stopImmediatePropagation();
		    	
		    $.ajaxSetup({
		        beforeSend: function(xhr, settings) {
		            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		            }
		        }
		    });
		    //Save Form Data........
		    
		    var complaints = {}
		    complaint_name = $('#add-complaint-value').text() 
		    console.log(complaint_name)
		    $.ajax({
		        cache: false,
		        url : window.location.origin+$(this).data("url"),
		        type: "POST",
		        dataType : "json",
		        contentType: "application/json;",
		        data : JSON.stringify({'complaint_name':complaint_name}),
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
		        	
				    var str = complaintDispalyString(data.id,data.description);
			    	$('#added_complaint').append(str);
			    	
			    	$(document).off("click",".del-complaint");
			    	
			    	$(document).on("click", ".del-complaint" , function( event ) {
			    		$(this).parent().remove();
			    	});
			    	
			    	$('#id_complaints').val("")
			    	
			    	event.stopImmediatePropagation();
			    	
			        $('#search-close').remove();
			        $('#search-results').remove();
		        	
		        },
		        error : function (xhRequest, ErrorText, thrownError) {
		            //alert("Failed to process annotation correctly, please try again");
		            console.log('xhRequest: ' + xhRequest + "\n");
		            console.log('ErrorText: ' + ErrorText + "\n");
		            console.log('thrownError: ' + thrownError + "\n");
		        }
		    });	

	    	
	    });
    

	    $(document).off("click",".add-disease-button");
	    
	    $(document).on("click", ".add-disease-button" , function(event) {
	    
		    	event.stopImmediatePropagation();
		    	
		    $.ajaxSetup({
		        beforeSend: function(xhr, settings) {
		            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		            }
		        }
		    });
		    //Save Form Data........
		    
		    disease_name = $('#add-disease-value').text() 
		    
		    $.ajax({
		        cache: false,
		        url : window.location.origin+$(this).data("url"),
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
			    		$(this).parent().remove();
			    	});
			    	
			    	$('#id_disease').val("")
			    	
			    	event.stopImmediatePropagation();
			    	
			        $('#search-close').remove();
			        $('#search-results').remove();
		        	
		        },
		        error : function (xhRequest, ErrorText, thrownError) {
		            //alert("Failed to process annotation correctly, please try again");
		            console.log('xhRequest: ' + xhRequest + "\n");
		            console.log('ErrorText: ' + ErrorText + "\n");
		            console.log('thrownError: ' + thrownError + "\n");
		        }
		    });	

	    	
	    });

    
	if(data_type == 'patient')
	{
	    $(document).off("click",".patient-card");
	    
	    $(document).on("click", ".patient-card" , function(event ) {
	    	
	        console.log($(this).data("fname"))
	        console.log($(this).data("mname"))
	        console.log($(this).data("lname"))
	        console.log($(this).data("sex"))
	        console.log($(this).data("age"))
	        console.log($(this).data("dob"))
	        console.log($(this).data("mob"))
	        
	        $('#id_patient-id').val($(this).data("id"))
	        $('#id_first-name').val($(this).data("fname"))
	        $('#id_middle-name').val($(this).data("mname"))
	        $('#id_last-name').val($(this).data("lname"))
	        $('#id_sex').val($(this).data("sex"))
	        $('#id_age').val($(this).data("age"))
	        $('#id_dob').val($(this).data("dob"))
	        $('#id_mobile-number').val($(this).data("mob"))
	        event.stopImmediatePropagation();
	        $('#search-close').remove();
	        $('#search-results').remove();
	    });
	}
	else if(data_type == 'disease')
	{
	    $(document).off("click",".disease-card");
	    
	    $(document).on("click", ".disease-card" , function() {
	    	
	    	console.log($(this))
		    var str = diseaseDispalyString($(this).data("id"),$(this).data("name"));
	    	$('#added_disease').append(str);
	    	
	    	
	    	$(document).off("click",".del-disease");
	    	
	    	$(document).on("click", ".del-disease" , function(event) {
	    		event.stopImmediatePropagation();
	    		$(this).parent().remove();
	    	});
	    	
	    	$('#id_disease').val("")
	    	
	        $('#search-close').remove();
	        $('#search-results').remove();
	        
	    });
	}
	else if(data_type == 'medicine')
	{
	    $(document).off("click",".medicine-card");
	    
	    $(document).on("click", ".medicine-card" , function(event) {
	    	
	        console.log($(this).data("name"))
	        console.log($(this).data("id"))
	        
		    var str = medicineDispalyString($(this).data("id"),$(this).data("type"),$(this).data("medicine"),$(this).data("frequency"),$(this).data("dosage"),$(this).data("duration"));
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
	    	$('#id_input_frequency').val("")
	    	$('#id_input_dosage').val("")
	    	$('#id_input_duration').val("")
	    	
	        event.stopImmediatePropagation();
	        $('#search-close').remove();
	        $('#search-results').remove();
	    });
	}
	else if(data_type == 'complaints')
	{
	    $(document).off("click",".complaint-card");
	    
	    $(document).on("click", ".complaint-card" , function() {
	    	
	    	console.log($(this))
		    var str = complaintDispalyString($(this).data("id"),$(this).data("description"));
	    	$('#added_complaint').append(str);
	    	
	    	
	    	$(document).off("click",".del-complaint");
	    	
	    	$(document).on("click", ".del-complaint" , function(event) {
	    		event.stopImmediatePropagation();
	    		$(this).parent().remove();
	    	});
	    	
	    	$('#id_complaints').val("")
	    	
	        $('#search-close').remove();
	        $('#search-results').remove();
	        
	    });
	}
	else if(data_type == 'medicine-type' || data_type == 'medicine-frequency' || data_type == 'medicine-dosage')
	{
		$(document).off("click",".medicine-field-card");
	    $(document).on("click", ".medicine-field-card" , function() {
	    	
	    	console.log($(this))
	    	
	    	$(this).val(data.value)
	    	
	        $('#search-close').remove();
	        $('#search-results').remove();
	        
	    });
		
	}
 }
    
    function findMember(t,ele) {
    if(t.length >=3)
    {
        console.log(ele);
        url = ele.data('url')
        console.log(url)
        $.ajax({
            // the URL for the request
            url: window.location.origin+url,
         
            // the data to send (will be converted to a query string)
            data: {
                format:'json',
                q:t
            },
         
            context: ele,
            
            // whether this is a POST or GET request
            type: "GET",
         
            // the type of data we expect back
            dataType : "json",
         
            // code to run if the request succeeds;
            // the response is passed to the function
            success: formatMember,
         
            // code to run if the request fails; the raw request and
            // status codes are passed to the function
            error: function( xhr, status, errorThrown ) {
                //alert( "Sorry, there was a problem!" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
                /*
                 var snackbarContainer = document.querySelector('#flash_message');
                 var msg = {message: "Something went wrong. Try Again!!!"};
                 snackbarContainer.MaterialSnackbar.showSnackbar(msg);
                */
            },
         
            // code to run regardless of success or failure
            complete: function( xhr, status ) {
                //alert( "The request is complete!" );
            }
        });
    }
    else{
    	$('#search-results').remove();
    	$('#search-close').remove();
    }
    
    
    }

    $('.search-term').keyup(function() {
      clearTimeout(thread);
      var $this = $(this); thread = setTimeout(function(){findMember($this.val(),$this)}, 500);
    });
    });