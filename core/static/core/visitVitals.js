var vitalsDispalyString = function(data) {
	var str = '\
		<tr class="vitals-display" data-id="' + data.id + '"> \
		<td> Weight: ' + data.weight + '</td> \
		<td> P/CL/CN/I/O/L: ' + data.pce+ '</td> \
		<td> Temp: ' + data.temp + '</td> \
		<td> Pulse: ' + data.pulse + '</td> \
		<td> BP: ' + data.bp + '</td> \
		<td> RR: ' + data.rr + '</td> \
		<td> CNS: ' + data.cns + '</td> \
		<td> Chest: ' + data.chest + '</td> \
		<td> CVS: ' + data.cvs + '</td> \
		<td> PA: ' + data.pa + '</td> \
		</tr>';
	return str;

}

var add_vitals = function () {
	
	var weight = $('#id_input_weight').val();
//	var height = $('#id_input_height').val();
//	var oe = $('#id_input_oe').val();
	var pce = $('#id_input_pce').val();
	var bp = $('#id_input_bp').val();
	var rr = $('#id_input_rr').val();
	var temp = $('#id_input_temp').val();
	var pulse = $('#id_input_pulse').val();
	var cvs = $('#id_input_cvs').val();
	var cns = $('#id_input_cns').val();
	var chest = $('#id_input_chest').val();
	var pa = $('#id_input_pa').val();
//	var tests = $('#id_input_tests').val();
	
	console.log(weight);
//	console.log(height);
//	console.log(oe);
	console.log(pce);
	console.log(bp);
	console.log(rr);
	console.log(temp);
	console.log(pulse);
	console.log(cvs);
	console.log(cns);
	console.log(chest);
	console.log(pa);
//	console.log(tests);


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
        data : JSON.stringify({'weight':weight, 'pce':pce, 'bp':bp, 'rr':rr, 'temp':temp, 'pulse':pulse, 'cvs':cvs, 'cns':cns, 'chest': chest
        	, 'pa':pa}),
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
	    	$('#id_input_pce').val("");     
			$('#id_input_bp').val("");       
			$('#id_input_rr').val("");       
			$('#id_input_temp').val("");   
			$('#id_input_pulse').val(""); 
			$('#id_input_cvs').val("");     
			$('#id_input_cns').val("");     
			$('#id_input_chest').val(""); 
			$('#id_input_pa').val("");       
        	
        },
        error : function (xhRequest, ErrorText, thrownError) {
            //alert("Failed to process annotation correctly, please try again");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });	
}