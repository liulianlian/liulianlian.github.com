function setStyle(){
	//alert(arguments[2]);
	if(arguments.length==2){
		for(var name in arguments[1]){
			arguments[0].style[name]=arguments[1][name];
		}
	}else{
		arguments[0].style[arguments[1]]=arguments[2];
	}
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

function getStyle(obj,sStyle){
	if(obj.currentStyle){
		return obj.currentStyle[sStyle];
	}else{
		return getComputedStyle(obj,false)[sStyle];
	}
}

function findInArray(n,arr){
	for(var i=0; i<arr.length; i++){
		if(arr[i]==n){
			return true;
		}
	}
	return false;
}

function toDou(n){
	return n<10?'0'+n:''+n;
}

function getByClass(oParent,sClass){
	var arr=[];
	if(oParent.getElementsByClassName){
		arr=oParent.getElementsByClassName(sClass);
	}else{
		var aEl=oParent.getElementsByTagName('*');
		for(var i=0; i<aEl.length; i++){
			var arr1=aEl[i].className.split(' ');
			for(var j=0; j<arr1.length; j++){
				if(arr1[j]==sClass){
					arr.push(aEl[i]);
				}
			}
		}
	}

	return arr;
}


function addEvent(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,fn);
	}
}

function removeEvent(obj,ev,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(ev,fn,false);
	}else{
		obj.detachEvent('on'+ev,fn)
	}
} 


function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return{left:l,top:t}
} 


function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		var e=ev||event;
		var down=false;
		if(e.wheelDelta){
			down=e.wheelDelta<0?true:false;// 负 下  other
		}else{
			down=e.detail>0?true:false;//正3 下  ff
		}
		fn(down);
	}
}


var timer=null;
function move(obj,iTarget,time){
	var start=obj.offsetWidth;
	var dis=iTarget-start;
	var count=Math.round(time/30);
	var n=0;
	clearInterval(timer)
	timer=setInterval(function(){
		n++;
		obj.style.width=start+n*dis/count+'px';
		if(n==count){
			clearInterval(timer);
		}
	},30);
}