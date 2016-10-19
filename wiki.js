
$( document ).ready(function() {
    $("#wiki-inpt").keypress(function(e){
      if(e.keyCode===13)
      $('#wiki-srch').click();
    });

    $("#wiki-srch").click(searchWiki);

    $("#wiki-rndm").click(function(){
    	$("#search-results").html('');
		$("<iframe>", {
		   src: 'https://en.wikipedia.org/wiki/Special:Random',
		   class:  'wiki-results',
		   width:"800px",
		   height:"1000px",
		   scrolling: 'yes'
		   }).appendTo("#search-results");
    });
    
});


function searchWiki(){
	var search = $("#wiki-inpt").val().split(' ').join('%20');
	var apiArray = ["https://en.wikipedia.org/w/api.php?",  //separated for easy readability
				"action=opensearch",
				"&formatversion=2",
				"&format=json",
				"&prop=pageimages|extracts",
				"&search="+search,
				"&formatversion=2",
				"&pilimit=max",
				"&wbptterms=description"];
	var api = apiArray.join('');
	$.ajax({
	    url: api,
	    dataType: 'jsonp', //jsonfm for debugging purposes. Change back to json when time to launch
	    success: function(data) {
        	displayWiki(data);
	    },
      error: function( errObj, errStr ) {
        console.log( "ERROR:  " + errStr );
      }
	});	
}// close searchWiki

function displayWiki(data){
	$("#search-results").html('');
	//start at 1 to avoid displaying search query
	for (var i=1; i<data[1].length; i++){
		// create div
        $("#search-results").append("<div class = 'wiki-results well well-lg'>"
        	//start link
        	+"<a href='"+data[3][i]+"' target='_blank' >"
        	//title
        	+"<h2>" + data[1][i] + "</h2>"
        	+"</a>" //close link
        	//link description
            +"<h4>" + data[2][i] + "</h4>"
            //close div
            +"</div>");
    }
}

