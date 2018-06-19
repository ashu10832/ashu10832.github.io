var colors = ["#9C27B0","#673AB7","#2196F3","#009688","#03A9F4","#1DE9B6","#78909C"];
 var i = 0;
function generateQuote(){
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
		//crossDomain = true,
		headers:{"X-Mashape-Key":"0G3ylzs1lvmshxCRzlC9rzRWlIcNp1nvrNWjsngl5zOT7lxPi9","Content-Type":"application/x-www-form-urlencoded","Accept": "application/json"},
		success: function(json){
			if(i>6)
				i = 0;
			var newcolor = colors[i];
			$("#quotes").fadeOut(500,function(){
				$("#quotes").css({color: newcolor});
				$(this).html(json[0].quote).fadeIn(500);
				console.log();
				 i++;
			});
			$("#author").fadeOut(500,function(){
				$(this).css({color: newcolor});
				$(this).html("-" + json[0].author).fadeIn(500);
			});
			$("body").animate({backgroundColor:newcolor},1000);
			console.log("SUCCESS: ", json);
			$("#new-quote").animate({backgroundColor:newcolor},1000);
			$("#icon-twitter").animate({backgroundColor:newcolor},1000);
		},
		error: function(error){
			console.log("ERROR:",e);
		}
		});
	}
$(document).ready(function(){
		generateQuote();
		$("#new-quote").on("click",generateQuote);
		$("#icon-twitter").on("click",function(){
			var quote = $("#quotes").text();
			quote = quote.replace(" ","+");
			var url = "https://twitter.com/intent/tweet?text=" + quote;
			window.open(url);
		})
		});
