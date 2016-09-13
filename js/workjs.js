window.onload=function(){
    function change(){
		var oUl=document.getElementById('ul1');
		var aLi=oUl.children;
		var zIndex=2;
		var aPos=[];
		for(var i=0;i<aLi.length;i++){
			aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';	
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.position='absolute';	
			aLi[i].style.margin=0;
			aLi[i].index=i;
		}
		for(var i=0;i<aLi.length;i++){
			drag(aLi[i]);	
		}
		function drag(obj){
			obj.onmousedown=function(ev){
				clearInterval(obj.timer);
				obj.style.zIndex=zIndex++;
				var e=ev||event;
				var disX=e.clientX-obj.offsetLeft;
				var disY=e.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var e=ev||event;	
					obj.style.left=e.clientX-disX+'px';
					obj.style.top=e.clientY-disY+'px';
					
					var nearObj=findNearest(obj);
					if(nearObj && nearObj!=obj){
						var n=obj.index;
						var m=nearObj.index;
						
						for(var i=0;i<aLi.length;i++){
							if(n<m){
							
								if(aLi[i].index>n && aLi[i].index<=m){
									aLi[i].index--;	
									move(aLi[i],aPos[aLi[i].index]);
								}
							}else if(n>m){
								if(aLi[i].index<n && aLi[i].index>=m){
									aLi[i].index++;
									move(aLi[i],aPos[aLi[i].index]);
								}
							}
								
						}
						
						obj.index=m;
					}
				};	
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					
					move(obj,aPos[obj.index],{duration:1000});
				};
				return false;
			};	
			
		}
		
		function findNearest(obj){
			var minNum=9999999;
			var minNumIndex=-1;
			for(var i=0;i<aLi.length;i++){
				
				if(collTest(obj,aLi[i])){
					
					var minDis=getDis(obj,aLi[i]);
					if(minDis<minNum){
						minNum=minDis;
						minNumIndex=i;
					}
				}
			}
			if(minNumIndex==-1){
				return null;
			}else{
				return aLi[minNumIndex];
			}
			
		}
		
		function getDis(obj1,obj2){
			var a=aPos[obj2.index].left-obj1.offsetLeft;
			var b=aPos[obj2.index].top-obj1.offsetTop;
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj1,obj2){
			var l1=obj1.offsetLeft;
			var t1=obj1.offsetTop;
			var r1=obj1.offsetLeft+obj1.offsetWidth;
			var b1=obj1.offsetTop+obj1.offsetHeight;
			var l2=aPos[obj2.index].left;
			var t2=aPos[obj2.index].top;
			var r2=aPos[obj2.index].left+obj2.offsetWidth;
			var b2=aPos[obj2.index].top+obj2.offsetHeight;
			
			if(l1>r2||t1>b2||r1<l2||b1<t2){
				return false;
			}else{
				return true;	
			}
		}
    }
    change()

    function getpos(obj){
    	var l=0;
    	var t=0;
    
    	while(obj){
    		l+=obj.offsetLeft;
    		t+=obj.offsetTop;
    		obj=obj.offsetParent;
    	}
    	return {left:l,top:t};
    }
    function resize(){
    	var oDiv=document.getElementById('dock');
    	var oBox=document.getElementById('dock_box');
		var aImg=oDiv.getElementsByTagName('img');
		oBox.onmousemove=function(ev){
			var e=ev||event;
			for(var i=0;i<aImg.length;i++){
				var a=getpos(aImg[i]).left-e.pageX+aImg[i].offsetWidth/2;
				var b=getpos(aImg[i]).top-e.pageY+aImg[i].offsetHeight/2;
				var c=Math.sqrt(a*a+b*b);
				var dis=c/300;
				var scale=1-dis;
				if(scale<0.5){scale=0.5};
				aImg[i].style.width=128*scale+'px';
				aImg[i].style.height=128*scale+'px';
			}
				
		}

    }
    resize()
    function rolling(){
    	var oPlay=document.getElementById('play');
		var aHead=oPlay.getElementsByTagName('ol')[0].children;
		var oUl=oPlay.getElementsByTagName('ul')[0];
		var oPrev=oPlay.children[0];
		var oNext=oPlay.children[1];
		var now=0;
		var ready=true;
		oUl.innerHTML+=oUl.innerHTML;
		oUl.style.width=oUl.children[0].offsetWidth*oUl.children.length+'px';
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onclick=function(){
					now=index;
					tab();
				};
			})(i);
		}
		
		oNext.onclick=function(){
			if(!ready)return;
			ready=false;
			now++;
			tab();
		};
		
		
		oPrev.onclick=function(){
			if(!ready)return;
			ready=false;
			if(now==0){
				
				oUl.style.left=-oUl.offsetWidth/2+'px';
				now=4;
			}else{
				now--
			}
			tab();	
		};
		function tab(){
			for(var i=0;i<aHead.length;i++){
				aHead[i].className='';	
			}
			if(now==5){
				aHead[0].className='active';
			}else{
				aHead[now].className='active';	
			}
			move(oUl,{left:-now*470},{duration:1000,complete:function(){
				if(now==5){
					oUl.style.left= 0;
					now=0;	
				}
				ready=true;
			}});	
		}

    }
    rolling()
    function splitblock(){
    	var oDiv=document.getElementById('box1');
		var oBtn=document.getElementById('btn');
		var aBox=oDiv.children;
		var col=7;
		var row=4;
		var now=0;
		var ready=true;
		for(var r=0;r<row;r++){
			for(var c=0;c<col;c++){
				var oBox=document.createElement('div');
				oBox.style.width=700/col+'px';
				oBox.style.height=400/row+'px';
				oDiv.appendChild(oBox);
				oBox.style.backgroundPosition=-oBox.offsetWidth*c+'px '+ -oBox.offsetHeight*r +'px';
				oBox.r=r;
				oBox.c=c;
			}
		}


		oBtn.onclick=function(){
			if(!ready) return;
			ready=false;
			
			for(var i=0;i<aBox.length;i++){
				(function(index){
					setTimeout(function(){
						move(aBox[index],{opacity:0},{duration:800})
					},Math.random()*500);
				})(i);
			}
			
			setTimeout(function(){
				now++;
				now%=3;
				for(var i=0;i<aBox.length;i++){
					aBox[i].style.backgroundImage='url(img/splitblock/'+now+'.jpg)';//../img/splitblock/1.jpg
					aBox[i].style.opacity=1;
				}
				oDiv.style.backgroundImage='url(  img/splitblock/'+(now+1)%3+'.jpg)';
				ready=true;
			},500+800+100);
		};
    }
    splitblock();
    function drag(){
	    var oDiv=document.getElementById('drag');
		var oUl=oDiv.children[0];
		var aImg=oUl.getElementsByTagName('img');
		var aLi=oUl.getElementsByTagName('li');
		var aSpan=oUl.getElementsByTagName('span');
		oUl.style.width=oUl.children.length*oUl.children[0].offsetWidth+'px';
		
		oUl.onmousedown=function(ev){
			var e=ev||event;
			var disX=e.clientX-oUl.offsetLeft;	
			document.onmousemove=function(ev){
				var e=ev||event;
				var l=e.clientX-disX;
				
				if(l>oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth)
				l=oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth;
				if(l<oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth)
				l=oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth;
				
				oUl.style.left=l+'px';
				
				setSize();
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;	
			};
			return false;
			
		};
		
		function setSize(){
			for(var i=0;i<aLi.length;i++){
				var dis=Math.abs(oDiv.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2));
				var scale=1-dis/800;
				if(scale<0.5) scale=0.5;
				
				aSpan[i].innerHTML=scale.toFixed(2);
				aImg[i].style.width=scale*520+'px';
				aImg[i].style.height=scale*358+'px';
				aImg[i].style.left=(aLi[i].offsetWidth-aImg[i].offsetWidth)/2+'px';
				aImg[i].style.top=(aLi[i].offsetHeight-aImg[i].offsetHeight)/2+'px';
				aImg[i].style.zIndex=parseInt(scale*10000);
				aImg[i].style.opacity=scale;
			}
		}
		
		setCenter(3);
		function setCenter(n){
			oUl.style.left=oDiv.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';	
		}
		setSize();
		window.onresize=setSize;
	}
	drag()
}; 