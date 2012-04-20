/* Author:

*/

$(window).scroll(function() {
	if ($(window).scrollTop()>160) {
		$(".controls").css("position", "fixed");
		$(".controls").css("top", 0)
	} else {
		$(".controls").css("position", "absolute");
		$(".controls").css("top", 162)
	}
})