var medicalHistoryDispalyString = function(data) {
	
	var str = '\
		<tr class="medicalHistory-display" data-id="' + data.id + '"> \
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
	
	str += '<td> ' + data.status + ' </td> \
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
