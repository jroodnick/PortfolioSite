function gallerybox() { 
 $('body').on('click','.gallerybox', function(e) {
 
		var href = $(this).attr('src');
		var imageName = href.substring(href.lastIndexOf('/') + 1, href.length - 4);

	$.getJSON('/image/' + imageName,function(image) {
		
		// check to see if galleryBox already exists in the body
        if ($('#gallerybox').length > 0) {
            
			//insert all the content from JSON
            $('#gallerybox img').attr('src', image.src);
            $('#gallerybox img.gallerybox-user-thumb').attr('src', '');
            $('#gallerybox header').text(image.title);
            $('#gallerybox h4').text( 'Uploaded on ' + image.created_at);
            $('#gallerybox h1').text(image.author);
            $('#gallerybox a').attr('href', '/user/' + image.username);
            $('#gallerybox h3').text(image.prof_title + ' @ ' + image.current_employer);
            $('#gallerybox h2').text(image.description);
			
			//disable body scrolling
			$('body').addClass('scroll');
			
            $('#gallerybox').show();
        }
        else { // else if galleryBox does not exist, insert the markup into the body. (Only once)
            var gallerybox =
            "<div id='gallerybox'><div id='galleryboxremove' class='gallerybox-remove'></div><div id='gallerybox-wrap'><div id='gallerybox-content-wrap'>" +
            "<header>"+ image.title +"</header><h4>"+ 'Uploaded on ' + image.created_at +"</h4><div class='gallerybox-img-wrap'><img class='gallerybox-img' onload='fadeIn(this)' src='" + image.src + "'></img></div><div id='gallerybox-user-content-wrap'><div class='gallerybox-user-thumb'" + 
			"style='background:url(" + '"' + image.portrait + '"' +") no-repeat scroll 0 0 / cover rgba(0, 0, 0, 0);'></div><a href='/user/" + image.username +"'><h1>" + image.author + "</h1></a><h3>"+ image.prof_title + ' @ ' + image.current_employer +"</h3><h2>"+ image.description +"</h2></div><p>X</p>" +
            "</div>";
			
			//disable body scrolling
			$('body').addClass('scroll');
			
            //insert gallerybox HTML into page
            $('body').append(gallerybox);
        }
	});
		
		// Check if user is inspired by image
		// $.ajax({
			// type: 'POST',
			// url: '/isinspired',
			// data: 'imageid=' + imageHref,
			// success: function(data) {	
				// if (data.success == true) {							
						// $('.expandphoto-hover-icon').addClass('expandphoto-success');
					// } else if (data.success == false) {

					// }
				// }
			// });
			
		// load in image
		$( '.gallerybox-img .gallerybox-img-default' ).load(function() {
			$('.gallerybox-img .gallerybox-img-default').fadeIn(800);
			$('.gallerybox-img .upload-icon').fadeOut(200);
			//$('.gallerybox-img .gallerybox-img-low').fadeOut(200);
			$('#gallerybox-user, #gallerybox-stat-wrap').fadeIn(500);
			$('#gallerybox-stat-wrap').fadeIn(800);
			$('#gallerybox-nav').css('display', 'inline-block');
		});
    });
    //Click anywhere on the page to get rid of gallerybox window
    $('body').on('click', '#gallerybox p, .gallerybox-remove', function() { //must use live, as the gallerybox element is inserted into the DOM
		//reset
		$('#gallerybox-content-wrap').css('display', 'block');
		$('#gallerybox-enlarge').css('display', 'none');
		
		// remove content on close
		$('#gallerybox img').attr('src', '');           
		$('#gallerybox header').empty();
        $('#gallerybox h2').empty();
        $('#gallerybox h4').empty();
        $('#gallerybox h3').empty();
        $('#gallerybox h1').empty();
        $('#gallerybox img.gallerybox-img').hide();
	
		// hide gallerybox
		$('#gallerybox').hide();
		
		//enable body scrolling	
		$('body').removeClass('scroll');
    });
	
	// Enlarge image
	$('body').on('click', '.gallerybox-enlarge', function() {
		//hide gallerybox-content-wrap
		$('#gallerybox-content-wrap').hide();
		$('#gallerybox-wrap').addClass('gallerybox-enlarge-wrap');
		$('#galleryboxremove').removeClass('gallerybox-remove');
		$('#galleryboxremove').addClass('gallerybox-enlarge-remove');
		//show gallerybox-enlarge
		$('#gallerybox-enlarge').show();
	});
	
	// Minimize image
	$('body').on('click', '.gallerybox-minimize', function() {
		$('#gallerybox-wrap').removeClass('gallerybox-enlarge-wrap');
		$('#galleryboxremove').addClass('gallerybox-remove');
		$('#galleryboxremove').removeClass('gallerybox-enlarge-remove');
		$('#gallerybox-enlarge').hide();
		$('#gallerybox-content-wrap').show();
		
		// Reset background to transparent
		$('#gallerybox').removeClass();
	});
	
	// Toggle background to black
	$('body').on('click', '.gallerybox-bg-dark', function() {
		$('#gallerybox').removeClass();
		$('#gallerybox').addClass('gallerybox-remove-dark');
	});
	
	// Toggle background to white
	$('body').on('click', '.gallerybox-bg-light', function() {
		$('#gallerybox').removeClass();
		$('#gallerybox').addClass('gallerybox-remove-light');
	});
	
	// Toggle background to transparent
	$('body').on('click', '.gallerybox-bg-transparent', function() {
		$('#gallerybox').removeClass();
	});
	 
	$('body').on('click', '.gallerybox-enlarge-remove', function() {
		// reset gallerybox-remove
		$('#galleryboxremove').removeClass('gallerybox-enlarge-remove');
		$('#galleryboxremove').addClass('gallerybox-remove');
		$('#gallerybox-wrap').removeClass('gallerybox-enlarge-wrap');
		
		$('#gallerybox-enlarge').hide();
		$('#gallerybox-content-wrap').show();
		
		// Reset background to transparent
		$('#gallerybox').removeClass();
	});	
	
	// Inspired Button
	// $('body').on('click', '.expandphoto-hover-icon', function(event) {
	
	    // var imageHref = $(this).attr('data');
		// var $statCount = $(this).attr('id');
		
		// event.preventDefault();
		// event.stopPropagation();
	
			// $.ajax({
				// type: 'POST',
				// url: '/inspired',
				// data: 'imageid='+imageHref,
				// success: function(data) {	
					// if (data.success == true) {						
						// $('.expandphoto-hover-icon').addClass('expandphoto-success');
						// $('.expandphoto-hover-icon h4').text(parseInt($statCount) + 1);
					// } else if (data.success == false) {
						// event.preventDefault();
						// event.stopPropagation();
					// }
				// }
			// });
	// });
}
// Initiate scrips on page load
$(document).ready(function () {
	gallerybox();
});