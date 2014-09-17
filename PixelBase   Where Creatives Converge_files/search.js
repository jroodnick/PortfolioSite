// Full Text Categorie Widget
 $.widget( "custom.catcomplete", $.ui.autocomplete, {
_renderMenu: function( ul, items ) {
var that = this,
currentCategory = "";
$.each( items, function( index, item ) {
if ( item.category != currentCategory ) {
ul.append( "<li class='ui-autocomplete-category'>"+"Artist"+"</li>" );
currentCategory = item.category;
}

// set default destination
$destination = "";

if ( item.destination != $destination ) {
	$destination = item.destination;
} else {
	$destination = "Location";
}

// set portrait-icon image default (if blank set default image);
$portrait = "";

if (item.portrait == $portrait || item.portrait == null) {
	$portrait = "<img src='/img/portrait-thumb.png'></img>";
} else {
	$portrait = "<img style='width:40px;height:40px;display:inline-block;' src='" + decodeURIComponent(item.portrait) + "'></img>";
}

//that._renderItemData( ul, item );
return $( "<li>" )
.append( "<a href='/user/"+ item.label +"'>"+ $portrait +"<div style='display:inline-block;'><p style='font-size:16px;position:relative;top:-10px;margin-left:10px;'>" + item.first +" "+ item.last + " - " + $destination + "</p></div></a>" )
.appendTo( ul );
});
}
});

// Full Text Search test

$( "#nav-search-master #fulltextsearch" ).catcomplete({
	minLength: 1,
	source: function( request, response ) {
		$.ajax({
			url: "/autocomplete/search",
			type: "POST",
			dataType: "json",
			data: {
				term: request.term
				},
			success: function( data ) {
				response(data);
			}
		});
	},
			  
	// focus: function( event, ui ) {
		// $( "#nav-search-master #fulltextsearch" ).val( ui.item.label );
	// return false;
	// },
	select: function( event, ui ) {
		// decode Portrait URL
		var $iconUrl = decodeURIComponent(ui.item.portrait); 
		
		$( "#nav-search-master #fulltextsearch" ).val( ui.item.label );
		//$( "#employer-id" ).val( ui.item.value );
		$( "#nav-search-master #fts-description" ).html( ui.item.destination );
		$( "#nav-search-master #fulltextsearch-icon" ).attr( "src", $iconUrl );
		return false;
	}
})