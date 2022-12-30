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

	var show_success = function(head,message) {

		const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

	const alert = (message, type) => {
  		const wrapper = document.createElement('div')
  		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>'
		].join('')

  		alertPlaceholder.append(wrapper)
	};
    alert(message, 'primary');
		// $.uiAlert({
		// 	textHead: head, // header
		// 	text: message,
		// 	bgcolor: '#19c3aa', // background-color
		// 	textcolor: '#fff', // color
		// 	position: 'bottom-center',// position . top And bottom ||  left / center / right
		// 	icon: 'checkmark box', // icon in semantic-UI
		// 	time: 4, // time
		// 	  })
	}
	
	var show_info = function(head,message) {
		$.uiAlert({
			textHead: head, // header
			text: message,
			bgcolor: '#55a9ee', // background-color
			textcolor: '#fff', // color
			position: 'bottom-center',// position . top And bottom ||  left / center / right
			icon: 'info circle', // icon in semantic-UI
			time: 4, // time
			  })
	}
	
	var show_danger = function(head,message) {
		$.uiAlert({
			textHead: head, // header
			text: message,
			bgcolor: '#DB2828', // background-color
			textcolor: '#fff', // color
			position: 'bottom-center',// position . top And bottom ||  left / center / right
			icon: 'remove circle', // icon in semantic-UI
			time: 4, // time
			  })
	}

	var show_tab = function(tabName) {
		$('.nav-tabs button[data-bs-target="#'+ tabName+'"]').tab('show');
	}

	var show_modal = function(){
		var myModalEl = document.querySelector('#modalDialogScrollable')
		var modal = bootstrap.Modal.getOrCreateInstance(myModalEl) // Returns a Bootstrap modal instance
		modal.show()
	}