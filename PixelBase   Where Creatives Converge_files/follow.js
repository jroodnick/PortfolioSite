// This library controls the ability to see followers and users that you or another user are
// following. Following a user and seeing the lists of followers/following.
function followUser() {
	
	var $followArray = $('#follow'); // grab all the attr information of the user
	
	// variables with user information and messages
	var $followingId = $followArray.attr('class');
	var $followingPortrait = $followArray.attr('data');
	var $followingName = $followArray.attr('alt');
	var $followingMessage = ('Are you sure you want to follow '+$followingName+' ?');
	var $unfollowMessage = ('Are you sure you want to stop following '+$followingName+' ?');
	var $followedMessage = ('You are now following '+$followingName+' !');
	var $unfollowedMessage = ('You are no longer following '+$followingName+'.');
	
	// Button vars
	var $followButton = ('<div id="followRequest">Follow</div>');
	var $unfollowButton = ('<div id="unfollowRequest">Unfollow</div>');
	var $cancelButton = ('<div id="cancelRequest">Cancel</div>');
	var $unfollowCancelButton = ('<div id="unfollowCancelRequest">Cancel</div>');
	var $okButton = ('<div style="display:none;" id="okRequest">Ok</div>');
	var $unfollowOkButton = ('<div style="display:none;" id="unfollowOkRequest">Ok</div>');
	
	var $template = ("<div id='followuser-wrap' style='display:none;'><div id='followuser-remove'></div><div id='alert-container'><div id='alert-messagewrap'><img src='"+$followingPortrait+"'></img><p>"+$followingMessage+"</p></div><div id='alert-choicewrap'>"+$followButton+$okButton+$cancelButton+"</div></div></div>\
	<div id='unfollowuser-wrap' style='display:none;'><div id='followuser-remove'></div><div id='alert-container'><div id='alert-messagewrap'><img src='"+$followingPortrait+"'></img><p>"+$unfollowMessage+"</p></div><div id='alert-choicewrap'><a class='followRequest'>"+$unfollowButton+$unfollowOkButton+$unfollowCancelButton+"</div></div></div>");
	
	// insert templates for follow and unfollow
	$('#nav_menu').append($template);
	
	// Button id's to initiate event
	var $followPrompt = $('#followuser-wrap');	
	var $unfollowPrompt = $('#unfollowuser-wrap');	
	var $followCancel = $('#cancelRequest');	
	var $unfollowCancel = $('#unfollowCancelRequest');	
	var $followRequest = $('#followRequest');
	var $unfollowRequest = $('#unfollowRequest');	
	var $okRequest = $('#okRequest');	
	var $unfollowOkRequest = $('#unfollowOkRequest');	
	
		// Clicking the Follow button Event
		$('#signature-following').click(function(event) {	
			event.preventDefault();
		
			//Toggle message on click
			$followPrompt.toggle();
			
			//disable body scrolling
			$('body').addClass('scroll');
			
			return false;
		});
		
		// Clicking the Unfollow button Event
		$('#signature-unfollowing').click(function(event) {	
			event.preventDefault();
		
			//Toggle message on click
			$unfollowPrompt.toggle();
			
			//disable body scrolling
			$('body').addClass('scroll');
			
			return false;
		});
		
		//Cancel Button
		$unfollowCancel.click(function() {
		
			//remove alert
			$unfollowPrompt.toggle();
			
			//enable page body scrolling 
			$('body').removeClass('scroll');
			
			return false;
		});
		
		//Cancel Button
		$followCancel.click(function() {
		
			//remove alert
			$followPrompt.toggle();
			
			//enable page body scrolling 
			$('body').removeClass('scroll');
			
			return false;
		});
		
		//if user followed other user(success), Ok Button to remove prompt
		$okRequest.click(function() {
		
			//remove alert
			$followPrompt.toggle();
			
			//enable page body scrolling 
			$('body').removeClass('scroll');
			
			location.reload();
			return false;
		});

		//if user followed other user(success), Ok Button to remove prompt
		$unfollowOkRequest.click(function() {
		
			//remove alert
			$unfollowPrompt.toggle();
			
			//enable page body scrolling 
			$('body').removeClass('scroll');
			
			// reload the page
			location.reload();
			return false;
		});
		
		//Follow Button
		$followRequest.click(function(event) {
			// Prevent double clicking
			event.preventDefault();
			// check to see if the user is already following the user.
			$.ajax({
				type: 'POST',
				url: '/follow',
				data: 'id='+$followingId,
				success: function(data) {		
					if (data.success == true) {
					// if true show successMessage and refresh the page. // change follow icon depending if the user is following or not.
					
					//tell the user, they are now following that user.
					$('#followuser-wrap p').html($followedMessage);
					// hide follow and cancel button
					$followCancel.hide();
					$followRequest.hide();
					// show ok buttton to close popup
					$okRequest.toggle();
						
					} else {
					// Error
					}
				}
			});
		});		
		
		//Follow Button
		$unfollowRequest.click(function() {
			// check to see if the user is already following the user.
			$.ajax({
				type: 'POST',
				url: '/follow',
				data: 'id='+$followingId,
				success: function(data) {		
					if (data.success == true) {
					// if true show successMessage and refresh the page. // change follow icon depending if the user is following or not.
					
					//tell the user, they are now following that user.
					$('#unfollowuser-wrap p').html($unfollowedMessage);
					// hide unfollow and cancel button
					$unfollowCancel.hide();
					$unfollowRequest.hide();;
					// show ok buttton to close popup
					$unfollowOkRequest.toggle();
						
					} else {
					// Error
					}
				}
			});
		});	
		
}

function followerList(e) {
	
	var $followerList = $('#followerList-wrap');
	var $closeFollowerList = $('#closeFollowerList');
	
	// click follower initiate popup.
	var $showFollowList = $('.stats-followers-container #stats-info-container header');

	// Press Esc close the popup
	$(document).on( 'keydown', function (e) {
		if ( e.keyCode === 27 ) { // ESC
			$followerList.hide();
		}
	});
	
// Show Follow List
	$('body').on('click', '.stats-followers-container header', function(popup) {
		// Prevent Default
		popup.preventDefault();
		
		//remove page body scrolling 
		$('body').addClass('scroll');
		
		$followerList.show();
		
		return false;
	});
	
// Close Follow List
	 $('body').on('click', '.asideremove', function(popupfollow) {
		
		$followerList.hide();
		
		//enable page body scrolling 
		$('body').removeClass('scroll');
		
		return false;
	});
}
	
function followingList(e) {
	
	var $followingList = $('#followingList-wrap');
	var $closeFollowingList = $('#closeFollowingList');
	
	// click following h2 to initiate list popup.
	var $showFollowingList = $('#user-stats-container .stats-following-container');
	
	// Press Esc close the popup
	$(document).on( 'keydown', function (e) {
		if ( e.keyCode === 27 ) { // ESC
			$followingList.hide();
		}
	});
		
	// show following list
	$('body').on('click', '.stats-following-container header', function(popup) {
	//$('body').on('click','#user-stats-container .stats-following-container', function(popup) {	
		
		// Prevent Default
		popup.preventDefault();
		
		//remove page body scrolling 
		$('body').addClass('scroll');
		
		$followingList.show();
	});
	
	// hide following list
	 $('body').on('click', '.asideremove', function(popupfollowing) {
			
		// Hide the popup
		$followingList.hide();
		
		//enable page body scrolling 
		$('body').removeClass('scroll');
	});

}

$(document).ready(function() {
	followingList();
	followerList();
	followUser();
});