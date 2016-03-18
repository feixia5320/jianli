
$(function(){
	$(window).resize();
	$("#block-nav").css("z-index", 1);

	// 导航条固定顶部
	$("#block-nav").navFixed();

	//平滑滚动导航
	$('#fstPage-down a, nav a, #logo').bind('click',function(event){
		var $anchor = $(this);
		$('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top-52}, 600);
		event.preventDefault();
	});
});

$(window).resize(function(){ 

	//首页满屏
	$("#block-firstPage").css("height", $(window).height());
	//首页文字效果
	$('.blockTitle').stop().fadeIn("normal").animate({
		"top" : ($(window).height() - $('.blockTitle').outerHeight())/2
	},500); 

	$("#block-wantMore").css("height", $(window).height()-52 + "px");
	$('#block-wantMore>p').css("top", ($("#block-wantMore").outerHeight(true) - $('#block-wantMore>p').outerHeight())/2 + "px"); 
});

// 专业技能横向滚动
$(function(){
    $("#skill-tab li a").click(function(){ 
		var idx = $("#skill-tab li a").index(this);
		showBrandList(idx);
		return false;
   }).eq(0).click();
});
//显示不同的模块
function showBrandList(index){
	var $rollobj = $("#skill-list div");
    var rollWidth = $rollobj.find("li").outerWidth();
	rollWidth = rollWidth * 5; //一个版面的宽度
	$rollobj.stop(true,false).animate({ left : -rollWidth*index},1000);
}


// work

window.onload=function(){
	var iDrew=false;
	changeColor();
	
}
function changeColor(){
	var colors=["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50"
	,"#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b"];
	var li=document.getElementById("webDesign").getElementsByTagName("li");
	for(var i in li){
		li[i].onmouseover=function(e){
			if(checkHover(e,this)){
			fnStartRun(this,{opacity:"100"});
			this.style.background=colors[selectFrom(0,colors.length)];
			}
		}
		li[i].onmouseout=function(e){
			if(checkHover(e,this)){
			fnStartRun(this,{opacity:"30"});
			}
		}
	}
	var selectFrom=function(lowerValue,upperValue){
		var choices=upperValue-lowerValue+1;
		return Math.floor(Math.random()*choices);
	}
}

/*引入运动框架*/
function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];//兼容IE
		}
		else{
			return getComputedStyle(obj,false)[attr];//兼容FF
		}
	}


function fnStartRun(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bStop=true;
			for(attr in json){
			var iCur=0;
			if(attr=='opacity')/*兼容透明度*/
			{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);/*去掉小数避免小数带来的BUG*/
			}
			else
			{
			iCur=parseInt(getStyle(obj, attr));
			}
		
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bStop=false;
			}
			if(attr=="opacity"){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
				}			
			if(bStop){
				clearInterval(obj.timer);
					
			}
		}
		},30);
	}


	/*防止js鼠标事件多次触发*/
function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
    } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}
function checkHover(e,target){
    if (getEvent(e).type=="mouseover")  {
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
    } else {
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
    }
}function getEvent(e){
    return e||window.event;
}