(function(win,doc){
	function setFont(){
				doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';
	}
	setFont();
	win.addEventListener('risize',setFont,false);
})(window,document)