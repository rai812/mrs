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
		$.uiAlert({
			textHead: head, // header
			text: message,
			bgcolor: '#19c3aa', // background-color
			textcolor: '#fff', // color
			position: 'bottom-center',// position . top And bottom ||  left / center / right
			icon: 'checkmark box', // icon in semantic-UI
			time: 4, // time
			  })
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
