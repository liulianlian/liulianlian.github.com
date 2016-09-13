  window.onload=function(){
        function title(){
            var oUl=document.getElementById('ul1');
            var aLi=oUl.children;
            var oBar=aLi[aLi.length-1];
            for(var i=0;i<aLi.length-1;i++){
                aLi[i].onmouseover=function(){
                    move(oBar,this.offsetLeft);
                };
            }

            var left=0;
            var timer=null;
            var speed=0;

            function move(obj,iTarget){
                clearInterval(timer);
                timer=setInterval(function(){

                    speed+=(iTarget-obj.offsetLeft)/5;
                    speed*=0.7 
                    left+=speed;

                    obj.style.left=Math.round(left)+'px';

                    if(speed<1 && iTarget==obj.offsetLeft){
                        clearInterval(timer);
                    }
                },30);
            }
        };
    title();
   
     function tab(){
        var oUl=document.getElementById('ul2');
        var aLi=oUl.children;
        var oOl=document.getElementById('ol1');
        var ahead=oOl.children;
        for(var i=0;i<ahead.length;i++){
            (function(index){
                ahead[i].onclick=function(){
                    for(var j=0;j<ahead.length;j++){
                        ahead[j].className='';
                        aLi[j].style.display='none';
                    }
                    this.className='on';
                    aLi[index].style.display='block';
                }
            })(i)
        }
    }
    tab()
}