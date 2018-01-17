var logfile = '';
var starttime = 0.0;
var originalstr = '';
var scoreupdated = 0; 
function appendLog(logstr){
	if (logfile == '')
		alert('You did not save age/education/first lang, pls do that');
	else{
		$.post('appendlog.php',{logstr: logstr, logfile: logfile},function(msg){
			console.log(msg);
		}); 
	}

}

function scoreNow(){
	var litexts = [];
	$('#dest li').each(function() {
		litexts.push($(this).text());
	});
	var listr = litexts.join(' ');
	listr = listr.trim();
	console.log('Orig ' + originalstr + ', new ' + listr);
	var sc = $('#score').text();
	console.log('Score ' + sc);
	if (originalstr === listr){
		//if (scoreupdated == 0){
			$('#score').text(parseInt(sc) + 1);
			$('#smiley').attr("src","res/images/smile.gif");
			appendLog('SCORE: 1, ASSMBLD_SENT: ' + listr +' '+ Date.now());
		//	scoreupdated = 1;
		//	}
		//else 
		//	scoreupdated = 0;
		}
	else
		{
		$('#smiley').attr("src","res/images/sad.gif");
		appendLog('SCORE: 0, ASSMBLD_SENT: ' + listr + ' ' + Date.now());
		}
}

var el1 = document.getElementById('source');
var sortable1 = Sortable.create(el1,{
			group: { name: "mylist", pull: true, put: true },
			handle: '.my-handle',
  			animation: 250,
			onStart: function(evt){
				//The Date.now() method returns the number of milliseconds i
				//elapsed since January 1, 1970 00:00:00 UTC.
				starttime = Date.now();
			},
			onEnd: function (evt){
				//SRC:DST itemEl.innerText evt.oldIndex evt.newIndex
				var itemEl = evt.item;
				var endtime = Date.now();
				var logstr = 'SRC:DST '+itemEl.innerText+' '
					     +evt.oldIndex+' '+evt.newIndex+' '
					     +starttime+' '+endtime;
				appendLog(logstr);
				if ( $('#source li').length == 0){
					scoreNow();
					}
				}
			});
var el2 = document.getElementById('dest');
var sortable2 = Sortable.create(el2,{
			group: { name: "mylist", put: true, pull: true },
			handle: '.my-handle',
  			animation: 150,
			onStart: function(evt){
				starttime = Date.now();
			},
			onEnd: function (evt){
				//DST:SRC itemEl.innerText evt.oldIndex evt.newIndex
				var itemEl = evt.item; 
				var endtime = Date.now();
				var logstr = 'DST:SRC '+itemEl.innerText+' '
					     +evt.oldIndex+' '+evt.newIndex+' '
					     +starttime+' '+endtime;
				appendLog(logstr);
				if ( $('#source li').length == 0){
					scoreNow();
					}
				}

			//onSort: function (evt) {
				//DST:DST itemEl.innerText evt.oldIndex evt.newIndex
				//var itemEl = evt.item; 
				//var endtime = Date.now();
				//var logstr = 'DST:DST '+itemEl.innerText+' '
				//	     +evt.oldIndex+' '+evt.newIndex+' '
				//	     +starttime+' '+endtime;
				//appendLog(logstr);
				//if ( $('#source li').length == 0){
				//	scoreNow();
				//	}
				//}

			});

function getRandomInt(max) {
  	return Math.floor(Math.random() * Math.floor(max));
}

function setRandomWords(element){
	$.post('getsentence.php',function(str){
		originalstr = str.trim();
		str = originalstr;	
		var words = str.split(" ");
		while(words.length > 0){
		  	var index = getRandomInt(words.length);
			var theword = words[index];
			var litext = '<li class="my-handle">'+theword.trim()+'</li>';
			element.append(litext);	
			if (index > -1){
				words.splice(index,1);
			}
		}
		appendLog('ORIG_SENT: ' + str + ' ' + Date.now());
	});
}

$(document).ready(function(){

	        	
	$('#submit').click(function(){
		var age=$('#age').val();
		if (age == '') {
			alert('Your age is required');
			return;
		}
		var edu=$('#edu').val();
		var lan=$('#lan').val();
		$.post("createfile.php", {
			age: age, 
			edu: edu, 
			lan: lan 
			}, function(reply){
				logfile = reply;
				console.log('File '+reply+' created');
        			
				setRandomWords($('#source'));
				
				$('#mytable').css('visibility','visible');
				$('#infotable').css('visibility','hidden');
			});
	});
	$('#more').click(function(){
		$('#source').empty();
		setRandomWords($('#source'));
		$('#dest').empty();
		$('#dest').append('<li></li>');
	});

});
