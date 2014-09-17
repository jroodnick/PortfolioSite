// Script Description
//-- Creates a text mask over label inputs with pb-watermark as a class--

$(function() {
	$.fn.watermark = function(mark) {
		return this.each(function() {
			var label, input;
			if (this.tagName != "LABEL") {
				input = $(this);
				label = $('<label for="' + this.id + '">' + (mark || this.title || this.value) + '</label>') .insertBefore(this);
			} else {
				label = $(this);
				input = $("#" + label.attr("for"));
			}
			
			label.addClass("pb-watermark");
			
			if (input.val()) {
				label.hide();
			}
			if (!input.attr("title")) {
				input.attr("title", label.text());
			}
			input.focus(function() {
				if (!this.value)
					label.fadeOut("fast");
			}).blur(function() {
				if (!this.value)
					label.fadeIn("fast");
			});
		});
	};
});

$(document).ready(function() {
    $('.imgfrontwrap').fadeIn(2000);
});

jQuery(document).ready(function($) {
    $("label").watermark();
});