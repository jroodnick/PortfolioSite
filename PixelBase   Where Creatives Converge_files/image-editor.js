// Click on image thumb within upload page - show editable popup
// editable popup: small image thumb, editable title & description
// future functionality: add tags - color, industry, theme(environment art, character art)
// future privacy settings: showcase in gallery? showcase to friends only, showcase private. 

function imageEditor() {	
	
	$('section#master-upload-images-wrap').on('click', '.image', function() {
	
	// get data from images
    var editImageSrc = $(this).attr('src');
    var editImageTitle = $(this).attr('alt');
	var editImageDescription = $(this).attr('data');
	var editImageCount = $(this).attr('count');
	var $deleteImageId = $(this).attr('id');
	
	// show delete button on thumb click.
	$('#photoeditor-content-wrap div.delete').show();
	
	//show form (title, description)
	$('#photoeditor-content #delete').hide();
	$('#photoeditor-content .edit-upload, #photoeditor-content .edit-area-upload').show();
	
	// remove flash data on new thumb click.
	$('.master-flash-settings-message, .master-flash-settings-message-error').remove();
       
	   //place href as img src value
        $('#photoeditor-thumb').html("<img src='"+ editImageSrc +"'></img>");
        $('.image').html("<img src='"+ editImageSrc +"'></img>");
        $('.edit-upload').attr('value', editImageTitle);
        $('.edit-area-upload').html(editImageDescription);
		
		// logic for inspired count. 
		// if (editImageCount < 1) {
		// $('.photoeditor-inspired').addClass('photoeditor-inspired-change');
		// $('.photoeditor-inspired').html("<h3>Their are currently no stats for " + editImageTitle + ".</h3>");
		// } else { 
		// $('.photoeditor-inspired').removeClass('photoeditor-inspired-change');
		// $('.photoeditor-inspired').html("<div class='mosaic-thumb-inspireCount'></div><h4>" + editImageCount + "</h4>");
		// }

		// Replace deleteImageId #photoeditor-delete-choice-wrap alt, grab for delete later
		$('body #photoeditor-delete-choice-wrap').attr('alt', $deleteImageId);
		$('.edit-upload').attr('id', 'title-' + $deleteImageId);
		$('#photoeditor-content-wrap .delete, #photoeditor-save .delete-image').attr('value', $deleteImageId);
		$('.edit-area-upload').attr('id', 'description-' + $deleteImageId);
		
		// show the delete button
		$('#photoeditor-save').show();
		
		//scroll to form on .image click	
		$('html, body').animate({
			scrollTop: $("#photoeditor-thumb").offset().top -200
		}, 400);	
	});

// Delete the Image
	$('body').on('click', '#photoeditor-content-wrap div.delete', function(event){
		
		// grab the id
		var $deleteImageId = $(this).attr('value');	
			
		// Button vars
		var $deleteButton = ('<form action="/upload/delete" method="post" enctype="multipart/form-data"><input name="remove" type="hidden" value="'+$deleteImageId+'"></input><input type="submit" value="Delete" id="projectDelete"></input></form>');
		var $deleteCancelButton = ('<div class="projectDeleteCancel">Cancel</div>');

		// Delete alert vars
		var $deleteProjectMessage = ('Are you sure you want to delete this image ?');	
			
		// Alert for deleting an existing project
		var $projectDeletePrompt = ("<div id='deleteProject-wrap' style='display:none;'><div id='deleteProject-alert-container'>\
		<p>"+$deleteProjectMessage+"</p><div id='deleteProject-choicewrap'>"+$deleteButton+$deleteCancelButton+"</div></div></div>");

		// insert templates for follow and unfollow
		$('body').append($projectDeletePrompt);

		$('#deleteProject-wrap').show();
	});		

	// Pressing the cancel button 
	$('body').on('click', '#deleteProject-choicewrap .projectDeleteCancel', function(del){
		
		//remove alert
		$('#deleteProject-wrap').remove();
			
		return false;
	});
}

function uploadImage() {

	$('#upload-settings-master-wrap input[type="submit"]').click(function(e) {
		
	// shadow and loading gif
	$("#settings-master-container").append("<div id='uploadImage-wrap' style='display:none;'><div class='uploading-wrap'><h1>Uploading</h1><div class='upload-icon'></div></div></div>");
	
	var $uploadMessage = $('#uploadImage-wrap');
	
	// Show Upload Message
	$uploadMessage.toggle();
	
	//disable body scrolling
	$('body').addClass('scroll');
	});
}

// Initiate scrips on page load
$(document).ready(function () {
	imageEditor();
	uploadImage();
}); 