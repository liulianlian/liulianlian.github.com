window.onload=function(){
	function box3d(){
		var oDiv=document.querySelector('.box3d');
		oUl=oDiv.children[0];
		var y=30; 
		var x=-60;
		document.addEventListener('mousedown',function(ev){
			var disX=ev.clientX-x;
			var disY=ev.clientY-y;
			function fnMove(ev){
				x=ev.clientX-disX;
				y=ev.clientY-disY;
				oUl.style.transform='perspective(800px) rotateY('+x+'deg) rotateX('+y+'deg)';
			};
			function fnUp(ev){
				document.removeEventListener('mousemove',fnMove,false);
				document.removeEventListener('mouseup',fnUp,false);
			}
			document.addEventListener('mousemove',fnMove,false);		
			document.addEventListener('mouseup',fnUp,false);  
			return false;
		},false);

	}
	box3d()
	function rnd(n,m){
		return parseInt(Math.random()*(m-n)+n);	
	}
	function split(){
		var oB=document.querySelector('.banner');
		var R=4;
		var C=7;
		for(var r=0;r<R;r++){
			for(var c=0; c<C;c++){
				var oSpan=document.createElement('span');
				oSpan.innerHTML='<i></i><em></em>';
				oSpan.style.width=oB.offsetWidth/C+'px';
				oSpan.style.height=oB.offsetHeight/R+'px';
				oSpan.style.left=c*oB.offsetWidth/C+'px';
				oSpan.style.top=r*oB.offsetHeight/R+'px';
				oSpan.children[0].style.backgroundPosition=-c*oB.offsetWidth/C+'px '+-r*oB.offsetHeight/R+'px';
				
				oB.appendChild(oSpan);

			}	
		}
		
		var aSpan=oB.children;
		var iNow=0;
		var bReady=true;
		
		oB.onclick=function(){
			if(!bReady)return;
			bReady=false;
			iNow++;
			for(var i=0; i<aSpan.length;i++){
				
				aSpan[i].style.transition='0.8s all ease';
				
				var x=-(oB.offsetWidth/2-aSpan[i].offsetLeft-aSpan[i].offsetWidth/2);
				var y=-(oB.offsetHeight/2-aSpan[i].offsetTop-aSpan[i].offsetHeight/2);
				
				
				aSpan[i].style.transform='perspective(800px) scale(3) translate3d('+x+'px,'+y+'px,'+rnd(0,100)+'px) rotateY('+rnd(-360,360)+'deg)  rotateX('+rnd(-360,360)+'deg)';
				aSpan[i].style.opacity=0;
			}	
		};
		
		
		aSpan[0].addEventListener('transitionend',function(){
			for(var i=0;i<aSpan.length;i++){
				aSpan[i].style.transition='none';
				aSpan[i].style.transform='perspective(800px) scale(1) translate(0) rotateY(0deg)  rotateX(0deg)';
				aSpan[i].style.opacity=1;
				aSpan[i].children[0].style.backgroundImage='url(img/baozha/'+iNow%3+'.jpg)';
				oB.style.backgroundImage='url(img/baozha/'+(iNow+1)%3+'.jpg)';
				bReady=true;
			}
			
			
		},false);
		
	}
	split();
	function setclock(){
		var oSpan=document.getElementById('bell');
		aSpan=oSpan.children;
		function clock(){
			var oDate=new Date();
			
			var oH=oDate.getHours();
			var oM=oDate.getMinutes();
			var oS=oDate.getSeconds();	
			var oMs=oDate.getMilliseconds();
			aSpan[0].style.transform='rotate('+(oH%12*30+oM/60*30)+'deg)';
			aSpan[1].style.transform='rotate('+(oM*6+oS/60*6)+'deg)';
aSpan[2].style.transform='rotate('+(oS*6+oMs/1000*6)+'deg)';	
			}
		clock();
		setInterval(clock,30);

	}
	setclock();
	function translate(){
		var oBox=document.querySelector('.box');
		var oPage=oBox.children[0];
		var oFront=oPage.children[0];
		var oBack=oPage.children[1];
		var oPage2=oBox.children[1];
		
		var iNow=0;
		
		var bReady=true;
		
		oBox.onclick=function(){
			if(!bReady){
				return;	
			}
			bReady=false;
			iNow++;
			oPage.style.transition='1s all ease';
			oPage.style.transform='perspective(800px) rotateY(-180deg)';
			
		};
		
		//过渡完毕时
		oPage.addEventListener('transitionend',function(){
			oPage.style.transition='none';
			oPage.style.transform='perspective(800px) rotateY(0deg)';
			
			//变图   ../img/splitblock/0.jpg
			oBox.style.backgroundImage='url(img/splitblock/'+iNow%2+'.jpg)';
			oFront.style.backgroundImage='url(img/splitblock/'+iNow%2+'.jpg)';
			oBack.style.backgroundImage='url(img/splitblock/'+(iNow+1)%2+'.jpg)';
			oPage2.style.backgroundImage='url(img/splitblock/'+(iNow+1)%2+'.jpg)';
			
			bReady=true;
			
		},false);
		
			

	}
	translate();
	function circle(){
		var oList=document.querySelector('.list');
		var N=11;
		for(var i=0; i<N;i++){
			var oLi=document.createElement('li');
			//../img/yuanhuan/1.jpg
			oLi.style.background='url(img/yuanhuan/'+(i+1)+'.jpg)';
			oList.appendChild(oLi);
			oLi.style.transition='0.3s all ease '+(N-i)*100+'ms';
			(function(obj,index){
				setTimeout(function(){
					obj.style.transform='rotateY('+(index*360/N)+'deg) translateZ(350px)';	
				},0);	
			})(oLi,i);
		}
		
		var aLi=oList.children;
		
		var y=10;
		var x=0;
		
		var speedX=0;
		var speedY=0;
		
		var lastX=0;
		var lastY=0;
		
		var timer=null;
		
		document.onmousedown=function(ev){
			
			var disX=ev.clientX-x;
			var disY=ev.clientY-y;
			document.onmousemove=function(ev){
				x=ev.clientX-disX;
				y=ev.clientY-disY;
				change(x/3,y/3);
				
				speedX=ev.clientX-lastX;
				speedY=ev.clientY-lastY;
	
				lastX=ev.clientX;
				lastY=ev.clientY;
			}
			document.onmouseup=function(ev){
				document.onmouseup=null;
				document.onmousemove=null;
				clearInterval(timer);
				timer=setInterval(function(){
					//y+=speedX*0.95;
					speedX*=0.95;
					speedY*=0.95;
					x+=speedX;
					y+=speedY;
					
					change(x/3,y/3);
					
					if(Math.abs(speedX)<1 && Math.abs(speedY)<1){
						clearInterval(timer);
					}
					
				},30);
					
			};	
			return false;
		};
		
		function change(x,y){
			oList.style.transform='perspective(800px) rotateX('+-y+'deg)';
				
			for(var i=0; i<aLi.length;i++){
				aLi[i].style.transition='none';
				aLi[i].style.transform='rotateY('+(i*360/N+x)+'deg) translateZ(350px)';
				
				var scale=Math.abs(Math.abs(i*360/N+x)%360-180)/180;
				
				aLi[i].style.opacity=scale;
			}	
		}

	}
	circle();
};