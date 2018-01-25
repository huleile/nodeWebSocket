$(function(){
	var name = $('#name').text();
	var socket = io.connect('http://localhost:3070');
	socket.on('connected',function(){
		console.log('已连接');
		socket.send("系统："+name+" 连接成功");
	});
	socket.on('content',function(msg){
		var talker="";
		var talk="";
		var talkString="";
		if(msg.indexOf(':')>0){
			talker=msg.substring(0,msg.indexOf(':'));
			if(msg.indexOf("<script>")>0&&msg.indexOf("</script>")>0) {
				msg = msg.replace("<script>", "");
				msg = msg.replace("</script>", "");
			}
			talk=msg.substring(msg.indexOf(':')+1);
			if(talker==name){
				talkString="<div class='row talkString' align='right'>" +
					"<span class='myTalk'>"+talk+"</span>" +
					"<span> "+talker+"</span>" +
					"</div>";
			}else{
				talkString="<div class='row talkString'>" +
					"<span>"+talker+": </span>" +
					"<span class='myTalk'>"+talk+"</span>" +
					"</div>";
			}
		}else{
			talkString="<div class='row'>"+msg+"</div>";
		}
		$('#content').append(talkString);
		scrollBar();
	});
	$('button').click(function(){
		var myWord=$('#myWord').val();

		if(socket){
			socket.send(name+":"+myWord);
			$('#myWord').val("");
			scrollBar();
		}else{
			return;
		}
	});
	//回车发送消息
	document.onkeydown = function(e){
		var ev = document.all ? window.event : e;
		if(ev.keyCode==13) {
			$('button').click();
		}
	}

	function scrollBar(){
		$(".chatContent").scrollTop($(".chatContent")[0].scrollHeight);
	}
});

