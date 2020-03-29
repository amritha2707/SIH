var console_url = 'http://127.0.0.1:9999'
            function repeat() 
            {
                var xmlhttp = new XMLHttpRequest();
                var url = console_url+"/data/room_contents.json";
                // var url = "https://api.myjson.com/bins/1267vm";
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        
                        var myArr = JSON.parse(this.responseText);
                        for ( var key in myArr) {
                          if (myArr.hasOwnProperty(key)) {
                            var thediv = document.getElementById(key);
                            thediv.innerHTML="";
                            for ( var i = 0 ; i < myArr[key].length ; i++ ) 
                            {
                            thediv.innerHTML += myArr[key][i] + "<br>";
                            }
                            if(myArr[key].length>0)
                                putDot(key);
                            
                            }
                        }
                    }
                }
                // console.log("url = "+url);
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
    
            function should_i_start_alarm()
            {
                var xmlhttp = new XMLHttpRequest();
                var url = console_url+'/sound_alarm';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // console.log('should_i_start_alarm: received'+this.responseText);
                        var json = JSON.parse(this.responseText);
                        if(json.start)
                            soundthealarm(json.msg);
                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();   
            }

            function check_updates()
            {
                var xmlhttp = new XMLHttpRequest();
                var url = console_url+'/webpage_update';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log('check_updates: received'+this.responseText);
                        var json = JSON.parse(this.responseText);
                        if(json.type=='entry')
                        {
                            if(json.number>0 && json.number > last_id)
                            {
                                var ul = document.getElementById('list');
                                var listitem = document.createElement("li");
                                console.log(listitem);
                                listitem.appendChild(document.createTextNode(json.text));
                                console.log(listitem);
                                ul.appendChild(listitem);
                            }
                        }
                        else if (json.type=='request')
                        {
                            if(json.number>0 && json.number > last_id)
                            {
                                var ul = document.getElementById('list');
                                var li = document.createElement("li");
                                console.log(li);
                                li.appendChild(document.createTextNode("ID: "+json.text));
                                li.appendChild(document.createTextNode("From: "+json.from));
                                li.appendChild(document.createTextNode("To: "+json.to));
                                li.appendChild(document.createTextNode("Guard: "+json.who));
                                console.log(li);
                                ul.appendChild(li);

                            }
                        }
                        last_id=json.number;
                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();   
            }
        setInterval(repeat, 2000);
        setInterval(should_i_start_alarm,1000);
        setInterval(check_updates,1000);

        var ul = document.getElementById('list');
        var last_id = -1;

        var alarm_running = false;
    
    
            //when prisoner escapes
           
                function soundthealarm(message="DANGER DANGER! PRISONER XYZ ESCAPING!") {
                
                    if ( alarm_running ) {
                        console.log('returned coz alarm_running');
                        return;
                    }
                alarm_running=true;
                var source='klaxon.mp3';
                var audio=document.createElement('audio');
                audio.setAttribute("id","audio");
                audio.addEventListener("load",function() {
                    audio.play();
                },true);
                audio.src=source;
                audio.load();
                audio.play();
                document.body.appendChild(audio);

                var p = document.createElement('div');
                p.setAttribute("id","pulser");
                document.body.appendChild(p);
                
                var msg = document.createElement('div');
                msg.setAttribute("id","msg");
                msg.textContent=message; //XYZ replace with prsioner id
                document.getElementById("pulser").appendChild(msg);
                
                var but = document.createElement("button");
                but.setAttribute("id","dismissAlert");
                but.innerHTML="CAUGHT HIM? THEN PRESS HERE";
    
                
                document.getElementById("pulser").appendChild(but);
                
                // but.setAttribute("onclick")
    
    
                but.setAttribute("onclick",
                    "var audio=document.getElementById('audio'); audio.pause();console.log('m4');audio.parentNode.removeChild(audio);"+"console.log('m1');document.body.removeChild(document.getElementById('pulser'));console.log('m2');"+"alarm_running=false;");
    
            }
            

            function putDot(location) {
                if(location == 'cella')
                {
                    x=100;
                    y=100;
                }
                else if(location == 'cellb') {
                    x=1050;
                    y=100;

                }

                else if(location == 'cellc') {
                    x=200;
                    y=360;

                }
                else if(location == 'canteen') {
                    
                    x=1050;
                    y=330;

                }

                else if(location == 'telephone') {
                    
                    x=1050;
                    y=555;

                }

                
                	var elem = document.getElementById('reddot');
                	if(elem==null)
                	                    var elem = document.createElement('div');
	                    elem.setAttribute("class","gps_ring");
	                    elem.setAttribute("id",'reddot'); 
	                    document.body.appendChild(elem);     
                
                	elem.style.top = y+'px';
                	elem.style.left = x+'px'; 
                
                }
                
                function searchPrisoner() {
                	var input = document.getElementById("Search");
                	var filter = input.value.toLowerCase();
                	var nodes = document.getElementsByClassName('ae');
                	for(i=0; i<nodes.length; i++) {
                		if (nodes[i].innerText.toLowerCase().includes(filter))
                		{
                			nodes[i].style.color="red";
                		}
                		
                	}
                } 
    