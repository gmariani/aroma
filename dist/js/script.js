/*
 * Shadowbox.js, version 3.0.3
 * http://shadowbox-js.com/
 *
 * Copyright 2007-2010, Michael J. I. Jackson
 * Date: 2011-05-14 13:06:50 +0000
 */
(function(au,k){var Q={version:"3.0.3"};var J=navigator.userAgent.toLowerCase();if(J.indexOf("windows")>-1||J.indexOf("win32")>-1){Q.isWindows=true}else{if(J.indexOf("macintosh")>-1||J.indexOf("mac os x")>-1){Q.isMac=true}else{if(J.indexOf("linux")>-1){Q.isLinux=true}}}Q.isIE=J.indexOf("msie")>-1;Q.isIE6=J.indexOf("msie 6")>-1;Q.isIE7=J.indexOf("msie 7")>-1;Q.isGecko=J.indexOf("gecko")>-1&&J.indexOf("safari")==-1;Q.isWebKit=J.indexOf("applewebkit/")>-1;var ab=/#(.+)$/,af=/^(light|shadow)box\[(.*?)\]/i,az=/\s*([a-z_]*?)\s*=\s*(.+)\s*/,f=/[0-9a-z]+$/i,aD=/(.+\/)shadowbox\.js/i;var A=false,a=false,l={},z=0,R,ap;Q.current=-1;Q.dimensions=null;Q.ease=function(K){return 1+Math.pow(K-1,3)};Q.errorInfo={fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}};Q.gallery=[];Q.onReady=aj;Q.path=null;Q.player=null;Q.playerId="sb-player";Q.options={animate:true,animateFade:true,autoplayMovies:true,continuous:false,enableKeys:true,flashParams:{bgcolor:"#000000",allowfullscreen:true},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",onChange:aj,onClose:aj,onFinish:aj,onOpen:aj,showMovieControls:true,skipSetup:false,slideshowDelay:0,viewportPadding:20};Q.getCurrent=function(){return Q.current>-1?Q.gallery[Q.current]:null};Q.hasNext=function(){return Q.gallery.length>1&&(Q.current!=Q.gallery.length-1||Q.options.continuous)};Q.isOpen=function(){return A};Q.isPaused=function(){return ap=="pause"};Q.applyOptions=function(K){l=aC({},Q.options);aC(Q.options,K)};Q.revertOptions=function(){aC(Q.options,l)};Q.init=function(aG,aJ){if(a){return}a=true;if(Q.skin.options){aC(Q.options,Q.skin.options)}if(aG){aC(Q.options,aG)}if(!Q.path){var aI,S=document.getElementsByTagName("script");for(var aH=0,K=S.length;aH<K;++aH){aI=aD.exec(S[aH].src);if(aI){Q.path=aI[1];break}}}if(aJ){Q.onReady=aJ}P()};Q.open=function(S){if(A){return}var K=Q.makeGallery(S);Q.gallery=K[0];Q.current=K[1];S=Q.getCurrent();if(S==null){return}Q.applyOptions(S.options||{});G();if(Q.gallery.length){S=Q.getCurrent();if(Q.options.onOpen(S)===false){return}A=true;Q.skin.onOpen(S,c)}};Q.close=function(){if(!A){return}A=false;if(Q.player){Q.player.remove();Q.player=null}if(typeof ap=="number"){clearTimeout(ap);ap=null}z=0;aq(false);Q.options.onClose(Q.getCurrent());Q.skin.onClose();Q.revertOptions()};Q.play=function(){if(!Q.hasNext()){return}if(!z){z=Q.options.slideshowDelay*1000}if(z){R=aw();ap=setTimeout(function(){z=R=0;Q.next()},z);if(Q.skin.onPlay){Q.skin.onPlay()}}};Q.pause=function(){if(typeof ap!="number"){return}z=Math.max(0,z-(aw()-R));if(z){clearTimeout(ap);ap="pause";if(Q.skin.onPause){Q.skin.onPause()}}};Q.change=function(K){if(!(K in Q.gallery)){if(Q.options.continuous){K=(K<0?Q.gallery.length+K:0);if(!(K in Q.gallery)){return}}else{return}}Q.current=K;if(typeof ap=="number"){clearTimeout(ap);ap=null;z=R=0}Q.options.onChange(Q.getCurrent());c(true)};Q.next=function(){Q.change(Q.current+1)};Q.previous=function(){Q.change(Q.current-1)};Q.setDimensions=function(aS,aJ,aQ,aR,aI,K,aO,aL){var aN=aS,aH=aJ;var aM=2*aO+aI;if(aS+aM>aQ){aS=aQ-aM}var aG=2*aO+K;if(aJ+aG>aR){aJ=aR-aG}var S=(aN-aS)/aN,aP=(aH-aJ)/aH,aK=(S>0||aP>0);if(aL&&aK){if(S>aP){aJ=Math.round((aH/aN)*aS)}else{if(aP>S){aS=Math.round((aN/aH)*aJ)}}}Q.dimensions={height:aS+aI,width:aJ+K,innerHeight:aS,innerWidth:aJ,top:Math.floor((aQ-(aS+aM))/2+aO),left:Math.floor((aR-(aJ+aG))/2+aO),oversized:aK};return Q.dimensions};Q.makeGallery=function(aI){var K=[],aH=-1;if(typeof aI=="string"){aI=[aI]}if(typeof aI.length=="number"){aF(aI,function(aK,aL){if(aL.content){K[aK]=aL}else{K[aK]={content:aL}}});aH=0}else{if(aI.tagName){var S=Q.getCache(aI);aI=S?S:Q.makeObject(aI)}if(aI.gallery){K=[];var aJ;for(var aG in Q.cache){aJ=Q.cache[aG];if(aJ.gallery&&aJ.gallery==aI.gallery){if(aH==-1&&aJ.content==aI.content){aH=K.length}K.push(aJ)}}if(aH==-1){K.unshift(aI);aH=0}}else{K=[aI];aH=0}}aF(K,function(aK,aL){K[aK]=aC({},aL)});return[K,aH]};Q.makeObject=function(aH,aG){var aI={content:aH.href,title:aH.getAttribute("title")||"",link:aH};if(aG){aG=aC({},aG);aF(["player","title","height","width","gallery"],function(aJ,aK){if(typeof aG[aK]!="undefined"){aI[aK]=aG[aK];delete aG[aK]}});aI.options=aG}else{aI.options={}}if(!aI.player){aI.player=Q.getPlayer(aI.content)}var K=aH.getAttribute("rel");if(K){var S=K.match(af);if(S){aI.gallery=escape(S[2])}aF(K.split(";"),function(aJ,aK){S=aK.match(az);if(S){aI[S[1]]=S[2]}})}return aI};Q.getPlayer=function(aG){if(aG.indexOf("#")>-1&&aG.indexOf(document.location.href)==0){return"inline"}var aH=aG.indexOf("?");if(aH>-1){aG=aG.substring(0,aH)}var S,K=aG.match(f);if(K){S=K[0].toLowerCase()}if(S){if(Q.img&&Q.img.ext.indexOf(S)>-1){return"img"}if(Q.swf&&Q.swf.ext.indexOf(S)>-1){return"swf"}if(Q.flv&&Q.flv.ext.indexOf(S)>-1){return"flv"}if(Q.qt&&Q.qt.ext.indexOf(S)>-1){if(Q.wmp&&Q.wmp.ext.indexOf(S)>-1){return"qtwmp"}else{return"qt"}}if(Q.wmp&&Q.wmp.ext.indexOf(S)>-1){return"wmp"}}return"iframe"};function G(){var aH=Q.errorInfo,aI=Q.plugins,aK,aL,aO,aG,aN,S,aM,K;for(var aJ=0;aJ<Q.gallery.length;++aJ){aK=Q.gallery[aJ];aL=false;aO=null;switch(aK.player){case"flv":case"swf":if(!aI.fla){aO="fla"}break;case"qt":if(!aI.qt){aO="qt"}break;case"wmp":if(Q.isMac){if(aI.qt&&aI.f4m){aK.player="qt"}else{aO="qtf4m"}}else{if(!aI.wmp){aO="wmp"}}break;case"qtwmp":if(aI.qt){aK.player="qt"}else{if(aI.wmp){aK.player="wmp"}else{aO="qtwmp"}}break}if(aO){if(Q.options.handleUnsupported=="link"){switch(aO){case"qtf4m":aN="shared";S=[aH.qt.url,aH.qt.name,aH.f4m.url,aH.f4m.name];break;case"qtwmp":aN="either";S=[aH.qt.url,aH.qt.name,aH.wmp.url,aH.wmp.name];break;default:aN="single";S=[aH[aO].url,aH[aO].name]}aK.player="html";aK.content='<div class="sb-message">'+s(Q.lang.errors[aN],S)+"</div>"}else{aL=true}}else{if(aK.player=="inline"){aG=ab.exec(aK.content);if(aG){aM=ad(aG[1]);if(aM){aK.content=aM.innerHTML}else{aL=true}}else{aL=true}}else{if(aK.player=="swf"||aK.player=="flv"){K=(aK.options&&aK.options.flashVersion)||Q.options.flashVersion;if(Q.flash&&!Q.flash.hasFlashPlayerVersion(K)){aK.width=310;aK.height=177}}}}if(aL){Q.gallery.splice(aJ,1);if(aJ<Q.current){--Q.current}else{if(aJ==Q.current){Q.current=aJ>0?aJ-1:aJ}}--aJ}}}function aq(K){if(!Q.options.enableKeys){return}(K?F:M)(document,"keydown",an)}function an(aG){if(aG.metaKey||aG.shiftKey||aG.altKey||aG.ctrlKey){return}var S=v(aG),K;switch(S){case 81:case 88:case 27:K=Q.close;break;case 37:K=Q.previous;break;case 39:K=Q.next;break;case 32:K=typeof ap=="number"?Q.pause:Q.play;break}if(K){n(aG);K()}}function c(aK){aq(false);var aJ=Q.getCurrent();var aG=(aJ.player=="inline"?"html":aJ.player);if(typeof Q[aG]!="function"){throw"unknown player "+aG}if(aK){Q.player.remove();Q.revertOptions();Q.applyOptions(aJ.options||{})}Q.player=new Q[aG](aJ,Q.playerId);if(Q.gallery.length>1){var aH=Q.gallery[Q.current+1]||Q.gallery[0];if(aH.player=="img"){var S=new Image();S.src=aH.content}var aI=Q.gallery[Q.current-1]||Q.gallery[Q.gallery.length-1];if(aI.player=="img"){var K=new Image();K.src=aI.content}}Q.skin.onLoad(aK,W)}function W(){if(!A){return}if(typeof Q.player.ready!="undefined"){var K=setInterval(function(){if(A){if(Q.player.ready){clearInterval(K);K=null;Q.skin.onReady(e)}}else{clearInterval(K);K=null}},10)}else{Q.skin.onReady(e)}}function e(){if(!A){return}Q.player.append(Q.skin.body,Q.dimensions);Q.skin.onShow(I)}function I(){if(!A){return}if(Q.player.onLoad){Q.player.onLoad()}Q.options.onFinish(Q.getCurrent());if(!Q.isPaused()){Q.play()}aq(true)}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(S,aG){var K=this.length>>>0;aG=aG||0;if(aG<0){aG+=K}for(;aG<K;++aG){if(aG in this&&this[aG]===S){return aG}}return -1}}function aw(){return(new Date).getTime()}function aC(K,aG){for(var S in aG){K[S]=aG[S]}return K}function aF(aH,aI){var S=0,K=aH.length;for(var aG=aH[0];S<K&&aI.call(aG,S,aG)!==false;aG=aH[++S]){}}function s(S,K){return S.replace(/\{(\w+?)\}/g,function(aG,aH){return K[aH]})}function aj(){}function ad(K){return document.getElementById(K)}function C(K){K.parentNode.removeChild(K)}var h=true,x=true;function d(){var K=document.body,S=document.createElement("div");h=typeof S.style.opacity==="string";S.style.position="fixed";S.style.margin=0;S.style.top="20px";K.appendChild(S,K.firstChild);x=S.offsetTop==20;K.removeChild(S)}Q.getStyle=(function(){var K=/opacity=([^)]*)/,S=document.defaultView&&document.defaultView.getComputedStyle;return function(aJ,aI){var aH;if(!h&&aI=="opacity"&&aJ.currentStyle){aH=K.test(aJ.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";return aH===""?"1":aH}if(S){var aG=S(aJ,null);if(aG){aH=aG[aI]}if(aI=="opacity"&&aH==""){aH="1"}}else{aH=aJ.currentStyle[aI]}return aH}})();Q.appendHTML=function(aG,S){if(aG.insertAdjacentHTML){aG.insertAdjacentHTML("BeforeEnd",S)}else{if(aG.lastChild){var K=aG.ownerDocument.createRange();K.setStartAfter(aG.lastChild);var aH=K.createContextualFragment(S);aG.appendChild(aH)}else{aG.innerHTML=S}}};Q.getWindowSize=function(K){if(document.compatMode==="CSS1Compat"){return document.documentElement["client"+K]}return document.body["client"+K]};Q.setOpacity=function(aG,K){var S=aG.style;if(h){S.opacity=(K==1?"":K)}else{S.zoom=1;if(K==1){if(typeof S.filter=="string"&&(/alpha/i).test(S.filter)){S.filter=S.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi,"")}}else{S.filter=(S.filter||"").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi,"")+" alpha(opacity="+(K*100)+")"}}};Q.clearOpacity=function(K){Q.setOpacity(K,1)};function o(K){return K.target}function V(K){return[K.pageX,K.pageY]}function n(K){K.preventDefault()}function v(K){return K.keyCode}function F(aG,S,K){jQuery(aG).bind(S,K)}function M(aG,S,K){jQuery(aG).unbind(S,K)}jQuery.fn.shadowbox=function(K){return this.each(function(){var aG=jQuery(this);var aH=jQuery.extend({},K||{},jQuery.metadata?aG.metadata():jQuery.meta?aG.data():{});var S=this.className||"";aH.width=parseInt((S.match(/w:(\d+)/)||[])[1])||aH.width;aH.height=parseInt((S.match(/h:(\d+)/)||[])[1])||aH.height;Shadowbox.setup(aG,aH)})};var y=false,al;if(document.addEventListener){al=function(){document.removeEventListener("DOMContentLoaded",al,false);Q.load()}}else{if(document.attachEvent){al=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",al);Q.load()}}}}function g(){if(y){return}try{document.documentElement.doScroll("left")}catch(K){setTimeout(g,1);return}Q.load()}function P(){if(document.readyState==="complete"){return Q.load()}if(document.addEventListener){document.addEventListener("DOMContentLoaded",al,false);au.addEventListener("load",Q.load,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",al);au.attachEvent("onload",Q.load);var K=false;try{K=au.frameElement===null}catch(S){}if(document.documentElement.doScroll&&K){g()}}}}Q.load=function(){if(y){return}if(!document.body){return setTimeout(Q.load,13)}y=true;d();Q.onReady();if(!Q.options.skipSetup){Q.setup()}Q.skin.init()};Q.plugins={};if(navigator.plugins&&navigator.plugins.length){var w=[];aF(navigator.plugins,function(K,S){w.push(S.name)});w=w.join(",");var ai=w.indexOf("Flip4Mac")>-1;Q.plugins={fla:w.indexOf("Shockwave Flash")>-1,qt:w.indexOf("QuickTime")>-1,wmp:!ai&&w.indexOf("Windows Media")>-1,f4m:ai}}else{var p=function(K){var S;try{S=new ActiveXObject(K)}catch(aG){}return !!S};Q.plugins={fla:p("ShockwaveFlash.ShockwaveFlash"),qt:p("QuickTime.QuickTime"),wmp:p("wmplayer.ocx"),f4m:false}}var X=/^(light|shadow)box/i,am="shadowboxCacheKey",b=1;Q.cache={};Q.select=function(S){var aG=[];if(!S){var K;aF(document.getElementsByTagName("a"),function(aJ,aK){K=aK.getAttribute("rel");if(K&&X.test(K)){aG.push(aK)}})}else{var aI=S.length;if(aI){if(typeof S=="string"){if(Q.find){aG=Q.find(S)}}else{if(aI==2&&typeof S[0]=="string"&&S[1].nodeType){if(Q.find){aG=Q.find(S[0],S[1])}}else{for(var aH=0;aH<aI;++aH){aG[aH]=S[aH]}}}}else{aG.push(S)}}return aG};Q.setup=function(K,S){aF(Q.select(K),function(aG,aH){Q.addCache(aH,S)})};Q.teardown=function(K){aF(Q.select(K),function(S,aG){Q.removeCache(aG)})};Q.addCache=function(aG,K){var S=aG[am];if(S==k){S=b++;aG[am]=S;F(aG,"click",u)}Q.cache[S]=Q.makeObject(aG,K)};Q.removeCache=function(K){M(K,"click",u);delete Q.cache[K[am]];K[am]=null};Q.getCache=function(S){var K=S[am];return(K in Q.cache&&Q.cache[K])};Q.clearCache=function(){for(var K in Q.cache){Q.removeCache(Q.cache[K].link)}Q.cache={}};function u(K){Q.open(this);if(Q.gallery.length){n(K)}}Q.lang={code:"en",of:"of",loading:"loading",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};var D,at="sb-drag-proxy",E,j,ag;function ax(){E={x:0,y:0,startX:null,startY:null}}function aA(){var K=Q.dimensions;aC(j.style,{height:K.innerHeight+"px",width:K.innerWidth+"px"})}function O(){ax();var K=["position:absolute","cursor:"+(Q.isGecko?"-moz-grab":"move"),"background-color:"+(Q.isIE?"#fff;filter:alpha(opacity=0)":"transparent")].join(";");Q.appendHTML(Q.skin.body,'<div id="'+at+'" style="'+K+'"></div>');j=ad(at);aA();F(j,"mousedown",L)}function B(){if(j){M(j,"mousedown",L);C(j);j=null}ag=null}function L(S){n(S);var K=V(S);E.startX=K[0];E.startY=K[1];ag=ad(Q.player.id);F(document,"mousemove",H);F(document,"mouseup",i);if(Q.isGecko){j.style.cursor="-moz-grabbing"}}function H(aI){var K=Q.player,aJ=Q.dimensions,aH=V(aI);var aG=aH[0]-E.startX;E.startX+=aG;E.x=Math.max(Math.min(0,E.x+aG),aJ.innerWidth-K.width);var S=aH[1]-E.startY;E.startY+=S;E.y=Math.max(Math.min(0,E.y+S),aJ.innerHeight-K.height);aC(ag.style,{left:E.x+"px",top:E.y+"px"})}function i(){M(document,"mousemove",H);M(document,"mouseup",i);if(Q.isGecko){j.style.cursor="-moz-grab"}}Q.img=function(S,aG){this.obj=S;this.id=aG;this.ready=false;var K=this;D=new Image();D.onload=function(){K.height=S.height?parseInt(S.height,10):D.height;K.width=S.width?parseInt(S.width,10):D.width;K.ready=true;D.onload=null;D=null};D.src=S.content};Q.img.ext=["bmp","gif","jpg","jpeg","png"];Q.img.prototype={append:function(S,aI){var aG=document.createElement("img");aG.id=this.id;aG.src=this.obj.content;aG.style.position="absolute";var K,aH;if(aI.oversized&&Q.options.handleOversize=="resize"){K=aI.innerHeight;aH=aI.innerWidth}else{K=this.height;aH=this.width}aG.setAttribute("height",K);aG.setAttribute("width",aH);S.appendChild(aG)},remove:function(){var K=ad(this.id);if(K){C(K)}B();if(D){D.onload=null;D=null}},onLoad:function(){var K=Q.dimensions;if(K.oversized&&Q.options.handleOversize=="drag"){O()}},onWindowResize:function(){var aH=Q.dimensions;switch(Q.options.handleOversize){case"resize":var K=ad(this.id);K.height=aH.innerHeight;K.width=aH.innerWidth;break;case"drag":if(ag){var aG=parseInt(Q.getStyle(ag,"top")),S=parseInt(Q.getStyle(ag,"left"));if(aG+this.height<aH.innerHeight){ag.style.top=aH.innerHeight-this.height+"px"}if(S+this.width<aH.innerWidth){ag.style.left=aH.innerWidth-this.width+"px"}aA()}break}}};var ao=false,Y=[],q=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],aa,ae,Z,m=true;function N(aG,aQ,aN,aL,aR){var K=(aQ=="opacity"),aM=K?Q.setOpacity:function(aS,aT){aS.style[aQ]=""+aT+"px"};if(aL==0||(!K&&!Q.options.animate)||(K&&!Q.options.animateFade)){aM(aG,aN);if(aR){aR()}return}var aO=parseFloat(Q.getStyle(aG,aQ))||0;var aP=aN-aO;if(aP==0){if(aR){aR()}return}aL*=1000;var aH=aw(),aK=Q.ease,aJ=aH+aL,aI;var S=setInterval(function(){aI=aw();if(aI>=aJ){clearInterval(S);S=null;aM(aG,aN);if(aR){aR()}}else{aM(aG,aO+aK((aI-aH)/aL)*aP)}},10)}function aB(){aa.style.height=Q.getWindowSize("Height")+"px";aa.style.width=Q.getWindowSize("Width")+"px"}function aE(){aa.style.top=document.documentElement.scrollTop+"px";aa.style.left=document.documentElement.scrollLeft+"px"}function ay(K){if(K){aF(Y,function(S,aG){aG[0].style.visibility=aG[1]||""})}else{Y=[];aF(Q.options.troubleElements,function(aG,S){aF(document.getElementsByTagName(S),function(aH,aI){Y.push([aI,aI.style.visibility]);aI.style.visibility="hidden"})})}}function r(aG,K){var S=ad("sb-nav-"+aG);if(S){S.style.display=K?"":"none"}}function ah(K,aJ){var aI=ad("sb-loading"),aG=Q.getCurrent().player,aH=(aG=="img"||aG=="html");if(K){Q.setOpacity(aI,0);aI.style.display="block";var S=function(){Q.clearOpacity(aI);if(aJ){aJ()}};if(aH){N(aI,"opacity",1,Q.options.fadeDuration,S)}else{S()}}else{var S=function(){aI.style.display="none";Q.clearOpacity(aI);if(aJ){aJ()}};if(aH){N(aI,"opacity",0,Q.options.fadeDuration,S)}else{S()}}}function t(aO){var aJ=Q.getCurrent();ad("sb-title-inner").innerHTML=aJ.title||"";var aP,aL,S,aQ,aM;if(Q.options.displayNav){aP=true;var aN=Q.gallery.length;if(aN>1){if(Q.options.continuous){aL=aM=true}else{aL=(aN-1)>Q.current;aM=Q.current>0}}if(Q.options.slideshowDelay>0&&Q.hasNext()){aQ=!Q.isPaused();S=!aQ}}else{aP=aL=S=aQ=aM=false}r("close",aP);r("next",aL);r("play",S);r("pause",aQ);r("previous",aM);var K="";if(Q.options.displayCounter&&Q.gallery.length>1){var aN=Q.gallery.length;if(Q.options.counterType=="skip"){var aI=0,aH=aN,aG=parseInt(Q.options.counterLimit)||0;if(aG<aN&&aG>2){var aK=Math.floor(aG/2);aI=Q.current-aK;if(aI<0){aI+=aN}aH=Q.current+(aG-aK);if(aH>aN){aH-=aN}}while(aI!=aH){if(aI==aN){aI=0}K+='<a onclick="Shadowbox.change('+aI+');"';if(aI==Q.current){K+=' class="sb-counter-current"'}K+=">"+(++aI)+"</a>"}}else{K=[Q.current+1,Q.lang.of,aN].join(" ")}}ad("sb-counter").innerHTML=K;aO()}function U(aH){var K=ad("sb-title-inner"),aG=ad("sb-info-inner"),S=0.35;K.style.visibility=aG.style.visibility="";if(K.innerHTML!=""){N(K,"marginTop",0,S)}N(aG,"marginTop",0,S,aH)}function av(aG,aM){var aK=ad("sb-title"),K=ad("sb-info"),aH=aK.offsetHeight,aI=K.offsetHeight,aJ=ad("sb-title-inner"),aL=ad("sb-info-inner"),S=(aG?0.35:0);N(aJ,"marginTop",aH,S);N(aL,"marginTop",aI*-1,S,function(){aJ.style.visibility=aL.style.visibility="hidden";aM()})}function ac(K,aH,S,aJ){var aI=ad("sb-wrapper-inner"),aG=(S?Q.options.resizeDuration:0);N(Z,"top",aH,aG);N(aI,"height",K,aG,aJ)}function ar(K,aH,S,aI){var aG=(S?Q.options.resizeDuration:0);N(Z,"left",aH,aG);N(Z,"width",K,aG,aI)}function ak(aM,aG){var aI=ad("sb-body-inner"),aM=parseInt(aM),aG=parseInt(aG),S=Z.offsetHeight-aI.offsetHeight,K=Z.offsetWidth-aI.offsetWidth,aK=ae.offsetHeight,aL=ae.offsetWidth,aJ=parseInt(Q.options.viewportPadding)||20,aH=(Q.player&&Q.options.handleOversize!="drag");return Q.setDimensions(aM,aG,aK,aL,S,K,aJ,aH)}var T={};T.markup='<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>';T.options={animSequence:"sync",counterLimit:10,counterType:"default",displayCounter:true,displayNav:true,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:false,overlayColor:"#000",overlayOpacity:0.5,resizeDuration:0.35,showOverlay:true,troubleElements:["select","object","embed","canvas"]};T.init=function(){Q.appendHTML(document.body,s(T.markup,Q.lang));T.body=ad("sb-body-inner");aa=ad("sb-container");ae=ad("sb-overlay");Z=ad("sb-wrapper");if(!x){aa.style.position="absolute"}if(!h){var aG,K,S=/url\("(.*\.png)"\)/;aF(q,function(aI,aJ){aG=ad(aJ);if(aG){K=Q.getStyle(aG,"backgroundImage").match(S);if(K){aG.style.backgroundImage="none";aG.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+K[1]+",sizingMethod=scale);"}}})}var aH;F(au,"resize",function(){if(aH){clearTimeout(aH);aH=null}if(A){aH=setTimeout(T.onWindowResize,10)}})};T.onOpen=function(K,aG){m=false;aa.style.display="block";aB();var S=ak(Q.options.initialHeight,Q.options.initialWidth);ac(S.innerHeight,S.top);ar(S.width,S.left);if(Q.options.showOverlay){ae.style.backgroundColor=Q.options.overlayColor;Q.setOpacity(ae,0);if(!Q.options.modal){F(ae,"click",Q.close)}ao=true}if(!x){aE();F(au,"scroll",aE)}ay();aa.style.visibility="visible";if(ao){N(ae,"opacity",Q.options.overlayOpacity,Q.options.fadeDuration,aG)}else{aG()}};T.onLoad=function(S,K){ah(true);while(T.body.firstChild){C(T.body.firstChild)}av(S,function(){if(!A){return}if(!S){Z.style.visibility="visible"}t(K)})};T.onReady=function(aH){if(!A){return}var S=Q.player,aG=ak(S.height,S.width);var K=function(){U(aH)};switch(Q.options.animSequence){case"hw":ac(aG.innerHeight,aG.top,true,function(){ar(aG.width,aG.left,true,K)});break;case"wh":ar(aG.width,aG.left,true,function(){ac(aG.innerHeight,aG.top,true,K)});break;default:ar(aG.width,aG.left,true);ac(aG.innerHeight,aG.top,true,K)}};T.onShow=function(K){ah(false,K);m=true};T.onClose=function(){if(!x){M(au,"scroll",aE)}M(ae,"click",Q.close);Z.style.visibility="hidden";var K=function(){aa.style.visibility="hidden";aa.style.display="none";ay(true)};if(ao){N(ae,"opacity",0,Q.options.fadeDuration,K)}else{K()}};T.onPlay=function(){r("play",false);r("pause",true)};T.onPause=function(){r("pause",false);r("play",true)};T.onWindowResize=function(){if(!m){return}aB();var K=Q.player,S=ak(K.height,K.width);ar(S.width,S.left);ac(S.innerHeight,S.top);if(K.onWindowResize){K.onWindowResize()}};Q.skin=T;au.Shadowbox=Q})(window);/*!
 * Shadowbox.js, version @VERSION
 * http://shadowbox-js.com/
 *
 * Copyright 2007-2010, Michael J. I. Jackson
 * @DATE
 */
(function(window, undefined) {
/**
 * The Shadowbox object.
 *
 * @type    {Object}
 * @public
 */
var S = {

    /**
     * The current version of Shadowbox.
     *
     * @type    {String}
     * @public
     */
    version: "3.0.3"

}

Array.prototype.contains = Array.prototype.contains || function (obj) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i] === obj) {
            return true;
        }
    }

    return false;
}

var galleryName = /^(light|shadow)box\[(.*?)\]/i,
    inlineParam = /\s*([a-z_]*?)\s*=\s*(.+)\s*/,
    fileExtension = /[0-9a-z]+$/i,
    scriptPath = /(.+\/)shadowbox\.js/i,

root = document.documentElement,

/**
 * True if Shadowbox is currently open, false otherwise.
 *
 * @type    {Boolean}
 * @private
 */
open = false,

/**
 * True if Shadowbox has been initialized, false otherwise.
 *
 * @type    {Boolean}
 * @private
 */
initialized = false,

/**
 * The previous set of options that were used before Shadowbox.applyOptions
 * was called.
 *
 * @type    {Object}
 * @private
 */
lastOptions = {},

/**
 * The delay in milliseconds that the current gallery uses.
 *
 * @type    {Number}
 * @private
 */
slideDelay = 0,

/**
 * The time at which the current slideshow frame appeared.
 *
 * @type    {Number}
 * @private
 */
slideStart,

/**
 * The timeout id for the slideshow transition function.
 *
 * @type    {Number}
 * @private
 */
slideTimer,

/**
 * True if this browser supports opacity.
 *
 * @type    {Boolean}
 * @private
 */
supportsOpacity = "opacity" in root.style && typeof root.style.opacity === "string",

/**
 * True if the browser supports fixed positioning.
 *
 * @type    {Boolean}
 * @private
 */
supportsFixed = false;

(function () {
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.margin = 0;
    div.style.top = "20px";
    root.appendChild(div, root.firstChild);
    supportsFixed = div.offsetTop == 20;
    root.removeChild(div);
})();

/**
 * The index of the current object in the gallery array.
 *
 * @type    {Number}
 * @public
 */
S.current = -1;

/**
 * The current dimensions of Shadowbox.
 *
 * @type    {Object}
 * @public
 */
S.dimensions = null;

/**
 * Easing function used for animations. Based on a cubic polynomial.
 *
 * @param   {Number}    state   The state of the animation (% complete)
 * @return  {Number}            The adjusted easing value
 * @public
 */
S.ease = function(state) {
    return 1 + Math.pow(state - 1, 3);
}

/**
 * An object containing names of plugins and links to their respective download pages.
 *
 * @type    {Object}
 * @public
 */
S.errorInfo = {
    fla: {
        name: "Flash",
        url:  "http://www.adobe.com/products/flashplayer/"
    },
    qt: {
        name: "QuickTime",
        url:  "http://www.apple.com/quicktime/download/"
    }
};

/**
 * The content objects in the current set.
 *
 * @type    {Array}
 * @public
 */
S.gallery = [];

/**
 * A function that will be called as soon as the DOM is ready.
 *
 * @type    {Function}
 * @public
 */
S.onReady = noop;

/**
 * The URL path to the Shadowbox script.
 *
 * @type    {String}
 * @public
 */
S.path = null;

/**
 * The current player object.
 *
 * @type    {Object}
 * @public
 */
S.player = null;

/**
 * The id to use for the Shadowbox player element.
 *
 * @type    {String}
 * @public
 */
S.playerId = "sb-player";

/**
 * Various options that control Shadowbox' behavior.
 *
 * @type    {Object}
 * @public
 */
S.options = {

    /**
     * True to enable animations.
     *
     * @type    {Boolean}
     */
    animate: true,

    /**
     * True to enable opacity animations.
     *
     * @type    {Boolean}
     */
    animateFade: true,

    /**
     * True to automatically play movies when the load.
     *
     * @type    {Boolean}
     */
    autoplayMovies: true,

    /**
     * True to enable the user to skip to the first item in a gallery from the last using
     * next.
     *
     * @type    {Boolean}
     */
    continuous: false,

    /**
     * True to enable keyboard navigation.
     *
     * @type    {Boolean}
     */
    enableKeys: true,

    /**
     * Parameters to pass to flash <object>'s.
     *
     * @type    {Object}
     */
    flashParams: {
        bgcolor: "#000000",
        allowfullscreen: true
    },

    /**
     * Variables to pass to flash <object>'s.
     *
     * @type    {Object}
     */
    flashVars: {},

    /**
     * The minimum required Flash version.
     *
     * Note: The default is 9.0.115. This is the minimum version suggested by
     * the JW FLV player.
     *
     * @type    {String}
     */
    flashVersion: "9.0.115",

    /**
     * Determines how oversized content is handled. If set to "resize" the
     * content will be resized while preserving aspect ratio. If "drag" will display
     * the image at its original resolution but it will be draggable. If "none" will
     * display the content at its original resolution but it may be cropped.
     *
     * @type    {String}
     */
    handleOversize: "resize",

    /**
     * Determines how unsupported content is handled. If set to "remove" will
     * remove the content from the gallery. If "link" will display a helpful
     * link to a page where the necessary browser plugin can be installed.
     *
     * @type    {String}
     */
    handleUnsupported: "link",

    /**
     * A hook function to be fired when changing from one gallery item to the
     * next. Is passed the item that is about to be displayed as its only argument.
     *
     * @type    {Function}
     */
    onChange: noop,

    /**
     * A hook function to be fired when closing. Is passed the most recent item
     * as its only argument.
     *
     * @type    {Function}
     */
    onClose: noop,

    /**
     * A hook funciton to be fires when content is finished loading. Is passed the
     * current gallery item as its only argument.
     *
     * @type    {Function}
     */
    onFinish: noop,

    /**
     * A hook function to be fired when opening. Is passed the current gallery item
     * as its only argument.
     *
     * @type    {Function}
     */
    onOpen: noop,

    /**
     * True to enable movie controls on movie players.
     *
     * @type    {Boolean}
     */
    showMovieControls: true,

    /**
     * True to skip calling setup during init.
     *
     * @type    {Boolean}
     */
    skipSetup: false,

    /**
     * The delay (in seconds) to use when displaying a gallery in slideshow mode. Setting
     * this option to any value other than 0 will trigger slideshow mode.
     *
     * @type    {Number}
     */
    slideshowDelay: 0,

    /**
     * The ammount of padding (in pixels) to maintain around the edge of the viewport at all
     * times.
     *
     * @type    {Number}
     */
    viewportPadding: 20

};

/**
 * Gets the object that is currently being displayed.
 *
 * @return  {Object}
 * @public
 */
S.getCurrent = function() {
    return S.current > -1 ? S.gallery[S.current] : null;
}

/**
 * Returns true if there is another object to display after the current.
 *
 * @return  {Boolean}
 * @public
 */
S.hasNext = function() {
    return S.gallery.length > 1 && (S.current != S.gallery.length - 1 || S.options.continuous);
}

/**
 * Returns true if Shadowbox is currently open.
 *
 * @return  {Boolean}
 * @public
 */
S.isOpen = function() {
    return open;
}

/**
 * Returns true if Shadowbox is currently paused.
 *
 * @return  {Boolean}
 * @public
 */
S.isPaused = function() {
    return slideTimer == "pause";
}

/**
 * Applies the given set of options to Shadowbox' options. May be undone with revertOptions().
 *
 * @param   {Object}    options
 * @public
 */
S.applyOptions = function(options) {
    lastOptions = apply({}, S.options);
    apply(S.options, options);
}

/**
 * Reverts to whatever the options were before applyOptions() was called.
 *
 * @public
 */
S.revertOptions = function() {
    apply(S.options, lastOptions);
}

/**
 * Initializes the Shadowbox environment. If options are given here, they
 * will override the defaults. A callback may be provided that will be called
 * when the document is ready. This function can be used for setting up links
 * using Shadowbox.setup.
 *
 * @param   {Object}    options
 * @param   {Function}  callback
 * @public
 */
S.init = function(options, callback) {
    if (initialized)
        return;

    initialized = true;

    if (S.skin.options)
        apply(S.options, S.skin.options);

    if (options)
        apply(S.options, options);

    if (!S.path) {
        // determine script path automatically
        var path, scripts = document.getElementsByTagName("script");
        for (var i = 0, len = scripts.length; i < len; ++i) {
            path = scriptPath.exec(scripts[i].src);
            if (path) {
                S.path = path[1];
                break;
            }
        }
    }

    if (callback)
        S.onReady = callback;

    bindLoad();
}

/**
 * Opens the given object in Shadowbox. This object may be any of the following:
 *
 * - A URL specifying the location of some content to display
 * - An HTML link object (A or AREA tag) that links to some content
 * - A custom object similar to one produced by Shadowbox.makeObject
 * - An array of any of the above
 *
 * Note: When a single link object is given, Shadowbox will automatically search
 * for other cached link objects that have been set up in the same gallery and
 * display them all together.
 *
 * @param   {mixed}     obj
 * @public
 */
S.open = function(obj) {
    if (open)
        return;

    var gc = S.makeGallery(obj);
    S.gallery = gc[0];
    S.current = gc[1];

    obj = S.getCurrent();

    if (obj == null)
        return;

    S.applyOptions(obj.options || {});

    filterGallery();

    // anything left to display?
    if (S.gallery.length) {
        obj = S.getCurrent();

        if (S.options.onOpen(obj) === false)
            return;

        open = true;

        S.skin.onOpen(obj, load);
    }
}

/**
 * Closes Shadowbox.
 *
 * @public
 */
S.close = function() {
    if (!open)
        return;

    open = false;

    if (S.player) {
        S.player.remove();
        S.player = null;
    }

    if (typeof slideTimer == "number") {
        clearTimeout(slideTimer);
        slideTimer = null;
    }
    slideDelay = 0;

    listenKeys(false);

    S.options.onClose(S.getCurrent());

    S.skin.onClose();

    S.revertOptions();
}

/**
 * Starts a slideshow when a gallery is being displayed. Is called automatically
 * when the slideshowDelay option is set to anything other than 0.
 *
 * @public
 */
S.play = function() {
    if (!S.hasNext())
        return;

    if (!slideDelay)
        slideDelay = S.options.slideshowDelay * 1000;

    if (slideDelay) {
        slideStart = now();
        slideTimer = setTimeout(function(){
            slideDelay = slideStart = 0; // reset slideshow
            S.next();
        }, slideDelay);

        if(S.skin.onPlay)
            S.skin.onPlay();
    }
}

/**
 * Pauses a slideshow on the current object.
 *
 * @public
 */
S.pause = function() {
    if (typeof slideTimer != "number")
        return;

    slideDelay = Math.max(0, slideDelay - (now() - slideStart));

    // if there's any time left on current slide, pause the timer
    if (slideDelay) {
        clearTimeout(slideTimer);
        slideTimer = "pause";

        if(S.skin.onPause)
            S.skin.onPause();
    }
}

/**
 * Changes Shadowbox to display the item in the gallery specified by index.
 *
 * @param   {Number}    index
 * @public
 */
S.change = function(index) {
    if (!(index in S.gallery)) {
        if (S.options.continuous) {
            index = (index < 0 ? S.gallery.length + index : 0); // loop
            if (!(index in S.gallery))
                return;
        } else {
            return;
        }
    }

    S.current = index;

    if (typeof slideTimer == "number") {
        clearTimeout(slideTimer);
        slideTimer = null;
        slideDelay = slideStart = 0;
    }

    S.options.onChange(S.getCurrent());

    load(true);
}

/**
 * Advances to the next item in the gallery.
 *
 * @public
 */
S.next = function() {
    S.change(S.current + 1);
}

/**
 * Rewinds to the previous gallery item.
 *
 * @public
 */
S.previous = function() {
    S.change(S.current - 1);
}

/**
 * Calculates the dimensions for Shadowbox.
 *
 * @param   {Number}    height          The height of the object
 * @param   {Number}    width           The width of the object
 * @param   {Number}    maxHeight       The maximum available height
 * @param   {Number}    maxWidth        The maximum available width
 * @param   {Number}    topBottom       The extra top/bottom required for borders/toolbars
 * @param   {Number}    leftRight       The extra left/right required for borders/toolbars
 * @param   {Number}    padding         The amount of padding (in pixels) to maintain around
 *                                      the edge of the viewport
 * @param   {Boolean}   preserveAspect  True to preserve the original aspect ratio when the
 *                                      given dimensions are too large
 * @return  {Object}                    The new dimensions object
 * @public
 */
S.setDimensions = function(height, width, maxHeight, maxWidth, topBottom, leftRight, padding, preserveAspect) {
    var originalHeight = height,
        originalWidth = width;

    // constrain height/width to max
    var extraHeight = 2 * padding + topBottom;
    if (height + extraHeight > maxHeight)
        height = maxHeight - extraHeight;
    var extraWidth = 2 * padding + leftRight;
    if (width + extraWidth > maxWidth)
        width = maxWidth - extraWidth;

    // determine if object is oversized
    var changeHeight = (originalHeight - height) / originalHeight,
        changeWidth = (originalWidth - width) / originalWidth,
        oversized = (changeHeight > 0 || changeWidth > 0);

    // adjust height/width if too large
    if (preserveAspect && oversized) {
        // preserve aspect ratio according to greatest change
        if (changeHeight > changeWidth) {
            width = Math.round((originalWidth / originalHeight) * height);
        } else if (changeWidth > changeHeight) {
            height = Math.round((originalHeight / originalWidth) * width);
        }
    }

    S.dimensions = {
        height:         height + topBottom,
        width:          width + leftRight,
        innerHeight:    height,
        innerWidth:     width,
        top:            Math.floor((maxHeight - (height + extraHeight)) / 2 + padding),
        left:           Math.floor((maxWidth - (width + extraWidth)) / 2 + padding),
        oversized:      oversized
    };

    return S.dimensions;
}

/**
 * Returns an array with two elements. The first is an array of objects that
 * constitutes the gallery, and the second is the index of the given object in
 * that array.
 *
 * @param   {mixed}     obj
 * @return  {Array}     An array containing the gallery and current index
 * @public
 */
S.makeGallery = function(obj) {
    var gallery = [], current = -1;

    if (typeof obj == "string")
        obj = [obj];

    if (typeof obj.length == "number") {
        each(obj, function(i, o) {
            if (o.content) {
                gallery[i] = o;
            } else {
                gallery[i] = {content: o};
            }
        });
        current = 0;
    } else {
        if (obj.tagName) {
            // check the cache for this object before building one on the fly
            var cacheObj = S.getCache(obj);
            obj = cacheObj ? cacheObj : S.makeObject(obj);
        }

        if (obj.gallery) {
            // gallery object, build gallery from cached gallery objects
            gallery = [];

            var o;
            for (var key in S.cache) {
                o = S.cache[key];
                if (o.gallery && o.gallery == obj.gallery) {
                    if (current == -1 && o.content == obj.content)
                        current = gallery.length;
                    gallery.push(o);
                }
            }

            if (current == -1) {
                gallery.unshift(obj);
                current = 0;
            }
        } else {
            // single object, no gallery
            gallery = [obj];
            current = 0;
        }
    }

    // use apply to break references to each gallery object here because
    // the code may modify certain properties of these objects from here
    // on out and we want to preserve the original in case the same object
    // is used again in a future call
    each(gallery, function(i, o) {
        gallery[i] = apply({}, o);
    });

    return [gallery, current];
}

/**
 * Extracts parameters from a link element and returns an object containing
 * (most of) the following keys:
 *
 * - content:  The URL of the linked to content
 * - player:   The abbreviated name of the player to use for the object (can automatically
 *             be determined in most cases)
 * - title:    The title to use for the object (optional)
 * - gallery:  The name of the gallery the object belongs to (optional)
 * - height:   The height of the object (in pixels, only required for movies and Flash)
 * - width:    The width of the object (in pixels, only required for movies and Flash)
 * - options:  A set of options to use for this object (optional)
 * - link:     A reference to the original link element
 *
 * A custom set of options may be passed in here that will be applied when
 * this object is displayed. However, any options that are specified in
 * the link's HTML markup will trump options given here.
 *
 * @param   {HTMLElement}   link
 * @param   {Object}        options
 * @return  {Object}        An object representing the link
 * @public
 */
S.makeObject = function(link, options) {
    var obj = {
        // accessing the href attribute directly here (instead of using
        // getAttribute) should give a full URL instead of a relative one
        content:    link.href,
        title:      link.getAttribute("title") || "",
        link:       link
    };

    // remove link-level options from top-level options
    if (options) {
        options = apply({}, options);
        each(["player", "title", "height", "width", "gallery"], function(i, o) {
            if (typeof options[o] != "undefined") {
                obj[o] = options[o];
                delete options[o];
            }
        });
        obj.options = options;
    } else {
        obj.options = {};
    }

    if (!obj.player)
        obj.player = S.getPlayer(obj.content);

    // HTML options always trump JavaScript options, so do these last
    var rel = link.getAttribute("rel");
    if (rel) {
        // extract gallery name from shadowbox[name] format
        var match = rel.match(galleryName);
        if (match)
            obj.gallery = escape(match[2]);

        // extract any other parameters
        each(rel.split(';'), function(i, p) {
            match = p.match(inlineParam);
            if (match)
                obj[match[1]] = match[2];
        });
    }

    return obj;
}

/**
 * Attempts to automatically determine the correct player to use for an object based
 * on its content attribute. Defaults to "iframe" when the content type cannot
 * automatically be determined.
 *
 * @param   {String}    content     The content attribute of the object
 * @return  {String}                The name of the player to use
 * @public
 */
S.getPlayer = function(content) {
    // strip query string for player detection purposes
    var q = content.indexOf("?");
    if (q > -1) {
        content = content.substring(0, q);
    }

    // get file extension
    var ext, m = content.match(fileExtension);
    if (m) {
        ext = m[0].toLowerCase();
    }

    if (ext) {
        if (S.img && S.img.ext.contains(ext)) {
            return "img";
        }
        if (S.swf && S.swf.ext.contains(ext)) {
            return "swf";
        }
        if (S.flv && S.flv.ext.contains(ext)) {
            return "flv";
        }
        if (S.qt && S.qt.ext.contains(ext)) {
            return "qt";
        }
    }

    return "iframe";
}

/**
 * Filters the current gallery for unsupported objects.
 *
 * @private
 */
function filterGallery() {
    var err = S.errorInfo, plugins = S.plugins, obj, remove, needed,
        m, flashVersion;

    for (var i = 0; i < S.gallery.length; ++i) {
        obj = S.gallery[i]

        remove = false; // remove the object?
        needed = null; // what plugins are needed?

        switch (obj.player) {
        case "flv":
        case "swf":
            if (!plugins.fla) {
                needed = "fla";
            }
            break;
        case "qt":
            if (!plugins.qt) {
                needed = "qt";
            }
            break;
        }

        // handle unsupported elements
        if (needed) {
            if (S.options.handleUnsupported == "link") {
                // generate a link to the appropriate plugin download page
                obj.player = "html";
                obj.content = '<div class="sb-message">Please download <a href="' + err[needed].url + '">' + err[needed].name + '</a> in order to view this content.</div>';
            } else {
                remove = true;
            }
        } else if (obj.player == "swf" || obj.player == "flv") {
            flashVersion = (obj.options && obj.options.flashVersion) || S.options.flashVersion;

            if (S.flash && !S.flash.hasFlashPlayerVersion(flashVersion)) {
                // express install will be triggered because the client does not meet the
                // minimum required version of Flash. set height and width to those of expressInstall.swf
                obj.width = 310;
                // minimum height is 127, but +20 pixels on top and bottom looks better
                obj.height = 177;
            }
        }

        if (remove) {
            S.gallery.splice(i, 1);

            if (i < S.current) {
                --S.current; // maintain integrity of S.current
            } else if (i == S.current) {
                S.current = i > 0 ? i - 1 : i; // look for supported neighbor
            }

            // decrement index for next loop
            --i;
        }
    }
}

/**
 * Sets up a listener on the document for keydown events.
 *
 * @param   {Boolean}   on      True to enable the listener, false to disable
 * @private
 */
function listenKeys(on) {
    if (!S.options.enableKeys)
        return;

    (on ? addEvent : removeEvent)(document, "keydown", handleKey);
}

/**
 * A listener function that is fired when a key is pressed.
 *
 * @param   {Event}     e   The keydown event
 * @private
 */
function handleKey(e) {
    // don't handle events with modifier keys
    if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) {
        return;
    }

    var handler;

    switch (e.keyCode) {
    case 81: // q
    case 88: // x
    case 27: // esc
        handler = S.close;
        break;
    case 37: // left
        handler = S.previous;
        break;
    case 39: // right
        handler = S.next;
        break;
    case 32: // space
        handler = typeof slideTimer == "number" ? S.pause : S.play;
        break;
    }

    if (handler) {
        e.preventDefault();
        handler();
    }
}

/**
 * Loads the current object.
 *
 * @param   {Boolean}   True if changing from a previous object
 * @private
 */
function load(changing) {
    listenKeys(false);

    var obj = S.getCurrent(),
        player = obj.player;

    if (typeof S[player] !== "function") {
        throw "unknown player " + player;
    }

    if (changing) {
        S.player.remove();
        S.revertOptions();
        S.applyOptions(obj.options || {});
    }

    S.player = new S[player](obj, S.playerId);

    // preload neighboring gallery images
    if (S.gallery.length > 1) {
        var next = S.gallery[S.current + 1] || S.gallery[0];
        if (next.player === "img") {
            var a = new Image();
            a.src = next.content;
        }
        var prev = S.gallery[S.current - 1] || S.gallery[S.gallery.length - 1];
        if (prev.player === "img") {
            var b = new Image();
            b.src = prev.content;
        }
    }

    S.skin.onLoad(changing, waitReady);
}

/**
 * Waits until the current object is ready to be displayed.
 *
 * @private
 */
function waitReady() {
    if (!open)
        return;

    if (typeof S.player.ready != "undefined") {
        // wait for content to be ready before loading
        var timer = setInterval(function() {
            if (open) {
                if (S.player.ready) {
                    clearInterval(timer);
                    timer = null;
                    S.skin.onReady(show);
                }
            } else {
                clearInterval(timer);
                timer = null;
            }
        }, 10);
    } else {
        S.skin.onReady(show);
    }
}

/**
 * Displays the current object.
 *
 * @private
 */
function show() {
    if (!open)
        return;

    S.player.append(S.skin.body, S.dimensions);

    S.skin.onShow(finish);
}

/**
 * Finishes up any remaining tasks after the object is displayed.
 *
 * @private
 */
function finish() {
    if (!open)
        return;

    if (S.player.onLoad)
        S.player.onLoad();

    S.options.onFinish(S.getCurrent());

    if (!S.isPaused())
        S.play(); // kick off next slide

    listenKeys(true);
}

/**
 * Gets the current time in milliseconds.
 *
 * @return  {Number}
 * @private
 */
function now() {
    return (new Date).getTime();
}

/**
 * Applies all properties of extension to original.
 *
 * @param   {Object}    original
 * @param   {Object}    extension
 * @return  {Object}    The original object
 * @private
 */
function apply(original, extension) {
    for (var property in extension)
        original[property] = extension[property];
    return original;
}

/**
 * Calls the given callback function for each element in obj. Note: obj must be an array-like
 * object.
 *
 * @param   {Array|mixed}   obj
 * @param   {Function}      callback
 * @private
 */
function each(obj, callback) {
    var i = 0, len = obj.length;
    for (var value = obj[0]; i < len && callback.call(value, i, value) !== false; value = obj[++i]) {}
}

/**
 * A no-op function.
 *
 * @private
 */
function noop() {}

/**
 * Gets the element with the given id.
 *
 * @param   {String}        id
 * @return  {HTMLElement}
 * @private
 */
function get(id) {
    return document.getElementById(id);
}

/**
 * Removes an element from the DOM.
 *
 * @param   {HTMLElement}   el          The element to remove
 * @private
 */
function remove(el) {
    el.parentNode.removeChild(el);
}

/**
 * Gets the computed value of the style on the given element.
 *
 * Note: This function is not safe for retrieving float values or non-pixel values
 * in IE.
 *
 * @param   {HTMLElement}   el          The element
 * @param   {String}        style       The camel-cased name of the style
 * @return  {mixed}                     The computed value of the given style
 * @public
 */
S.getStyle = (function() {
    var opacity = /opacity=([^)]*)/,
        getComputedStyle = document.defaultView && document.defaultView.getComputedStyle;

    return function(el, style) {
        var ret;

        if (!supportsOpacity && style == "opacity" && el.currentStyle) {
            ret = opacity.test(el.currentStyle.filter || "") ? (parseFloat(RegExp.$1) / 100) + "" : "";
            return ret === "" ? "1" : ret;
        }

        if (getComputedStyle) {
            var computedStyle = getComputedStyle(el, null);

            if (computedStyle)
                ret = computedStyle[style];

            if (style == "opacity" && ret == "")
                ret = "1";
        } else {
            ret = el.currentStyle[style];
        }

        return ret;
    }
})();

/**
 * Appends an HTML fragment to the given element.
 *
 * @param   {HTMLElement}   el
 * @param   {String}        html    The HTML fragment to use
 * @public
 */
S.appendHTML = function(el, html) {
    if (el.insertAdjacentHTML) {
        el.insertAdjacentHTML("BeforeEnd", html);
    } else if (el.lastChild) {
        var range = el.ownerDocument.createRange();
        range.setStartAfter(el.lastChild);
        var frag = range.createContextualFragment(html);
        el.appendChild(frag);
    } else {
        el.innerHTML = html;
    }
}

/**
 * Gets the window size. The dimension may be either "Height" or "Width".
 *
 * @param   {String}    dimension
 * @return  {Number}
 * @public
 */
S.getWindowSize = function(dimension) {
    if (document.compatMode === "CSS1Compat")
        return document.documentElement["client" + dimension];

    return document.body["client" + dimension];
}

/**
 * Sets an element's opacity.
 *
 * @param   {HTMLElement}   el
 * @param   {Number}        opacity
 * @public
 */
S.setOpacity = function(el, opacity) {
    var style = el.style;
    if (supportsOpacity) {
        style.opacity = (opacity == 1 ? "" : opacity);
    } else {
        style.zoom = 1; // trigger hasLayout
        if (opacity == 1) {
            if (typeof style.filter == "string" && (/alpha/i).test(style.filter))
                style.filter = style.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi, "");
        } else {
            style.filter = (style.filter || "").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi, "") +
                " alpha(opacity=" + (opacity * 100) + ")";
        }
    }
}

/**
 * Clears the opacity setting on the given element. Needed for some cases in IE.
 *
 * @param   {HTMLElement}   el
 * @public
 */
S.clearOpacity = function(el) {
    S.setOpacity(el, 1);
}

/**
 * Gets the target of the given event. The event object passed will be
 * the same object that is passed to listeners registered with
 * addEvent().
 *
 * @param   {Event}     e       The event object
 * @return  {HTMLElement}       The event's target element
 * @private
 */
function getTarget(e) {
    var target = e.target ? e.target : e.srcElement;
    return target.nodeType == 3 ? target.parentNode : target;
}

/**
 * Gets the page X/Y coordinates of the mouse event in an [x, y] array.
 * The page coordinates should be relative to the document, and not the
 * viewport. The event object provided here will be the same object that
 * is passed to listeners registered with addEvent().
 *
 * @param   {Event}     e       The event object
 * @return  {Array}             The page X/Y coordinates
 * @private
 */
function getPageXY(e) {
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
        y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    return [x, y];
}

// Event handling functions below modified from original by Dean Edwards
// http://dean.edwards.name/my/events.js

/**
 * Adds an event handler to the given element. The handler should be called
 * in the scope of the element with the event object as its only argument.
 *
 * @param   {HTMLElement}   el          The element to listen to
 * @param   {String}        type        The type of the event to add
 * @param   {Function}      handler     The event handler function
 * @private
 */
function addEvent(el, type, handler) {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false);
    } else {
        if (el.nodeType === 3 || el.nodeType === 8)
            return;

        if (el.setInterval && (el !== window && !el.frameElement))
            el = window;

        if (!handler.__guid)
            handler.__guid = addEvent.guid++;

        if (!el.events)
            el.events = {};

        var handlers = el.events[type];
        if (!handlers) {
            handlers = el.events[type] = {};

            if (el["on" + type])
                handlers[0] = el["on" + type];
        }

        handlers[handler.__guid] = handler;

        el["on" + type] = addEvent.handleEvent;
    }
}

addEvent.guid = 1;

addEvent.handleEvent = function(event) {
    var result = true;
    event = event || addEvent.fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
    var handlers = this.events[event.type];

    for (var i in handlers) {
        this.__handleEvent = handlers[i];
        if (this.__handleEvent(event) === false) {
            result = false;
        }
    }

    return result;
}

addEvent.preventDefault = function() {
    this.returnValue = false;
}

addEvent.stopPropagation = function() {
    this.cancelBubble = true;
}

addEvent.fixEvent = function(e) {
    e.preventDefault = addEvent.preventDefault;
    e.stopPropagation = addEvent.stopPropagation;
    e.keyCode = e.which;
    return e;
}

/**
 * Removes an event handler from the given element.
 *
 * @param   {HTMLElement}   el          The DOM element to stop listening to
 * @param   {String}        type        The type of the event to remove
 * @param   {Function}      handler     The event handler function
 * @private
 */
function removeEvent(el, type, handler) {
    if (el.removeEventListener) {
        el.removeEventListener(type, handler, false);
    } else {
        if (el.events && el.events[type])
            delete el.events[type][handler.__guid];
    }
}
// The code in this file is adapted for Shadowbox from the jQuery JavaScript library

/**
 * True if Shadowbox has been loaded into the DOM, false otherwise.
 *
 * @type    {Boolean}
 * @private
 */
var loaded = false,

/**
 * The callback function for the DOMContentLoaded browser event.
 *
 * @type    {Function}
 * @private
 */
DOMContentLoaded;

if (document.addEventListener) {
    DOMContentLoaded = function() {
        document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
        S.load();
    }
} else if (document.attachEvent) {
    DOMContentLoaded = function() {
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            S.load();
        }
    }
}

/**
 * A DOM ready check for IE.
 *
 * @private
 */
function doScrollCheck() {
    if (loaded)
        return;

    try {
        document.documentElement.doScroll("left");
    } catch (e) {
        setTimeout(doScrollCheck, 1);
        return;
    }

    S.load();
}

/**
 * Waits for the DOM to be ready before firing the given callback function.
 *
 * @param   {Function}  callback
 * @private
 */
function bindLoad() {
    if (document.readyState === "complete")
        return S.load();

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        window.addEventListener("load", S.load, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent("onload", S.load);

        var topLevel = false;
        try {
            topLevel = window.frameElement === null;
        } catch (e) {}

        if (document.documentElement.doScroll && topLevel)
            doScrollCheck();
    }
}

/**
 * Loads the Shadowbox code into the DOM. Is called automatically when the document
 * is ready.
 *
 * @public
 */
S.load = function() {
    if (loaded)
        return;

    if (!document.body)
        return setTimeout(S.load, 13);

    loaded = true;

    S.onReady();

    if (!S.options.skipSetup)
        S.setup();

    S.skin.init();
}
/**
 * Contains plugin support information. Each property of this object is a
 * boolean indicating whether that plugin is supported. Keys are:
 *
 * - fla: Flash player
 * - qt: QuickTime player
 *
 * @type    {Object}
 * @public
 */
S.plugins = {};

if (navigator.plugins && navigator.plugins.length) {
    var names = [];
    each(navigator.plugins, function(i, p) {
        names.push(p.name);
    });
    names = names.join(',');

    S.plugins = {
        fla:    names.contains('Shockwave Flash'),
        qt:     names.contains('QuickTime')
    };
} else {
    var detectPlugin = function(name) {
        var axo;

        try {
            axo = new ActiveXObject(name);
        } catch(e) {}

        return !!axo;
    }

    S.plugins = {
        fla:    detectPlugin('ShockwaveFlash.ShockwaveFlash'),
        qt:     detectPlugin('QuickTime.QuickTime')
    };
}
// used to match the rel attribute of links
var relAttr = /^(light|shadow)box/i,

/**
 * The name of the expando property that Shadowbox uses on HTML elements
 * to store the cache index of that element.
 *
 * @type    {String}
 * @private
 */
expando = "shadowboxCacheKey",

/**
 * A unique id counter.
 *
 * @type    {Number}
 * @private
 */
cacheKey = 1;

/**
 * Contains all link objects that have been cached.
 *
 * @type    {Object}
 * @public
 */
S.cache = {};

/**
 * Resolves a link selector. The selector may be omitted to select all anchor elements
 * on the page with rel="shadowbox" or, if Shadowbox.find is used, it may be a single CSS
 * selector or an array of [selector, [context]].
 *
 * @param   {mixed}     selector
 * @return  {Array}     An array of matching link elements
 * @public
 */
S.select = function(selector) {
    var links = [];

    if (!selector) {
        var rel;
        each(document.getElementsByTagName("a"), function(i, el) {
            rel = el.getAttribute("rel");
            if (rel && relAttr.test(rel)) {
                links.push(el);
            }
        });
    } else {
        var type = typeof selector;
        if ((type === "object" || type === "function") && selector.length) {
            // array of links (or node list)
            for (var i = 0; i < selector.length; ++i) {
                links[i] = selector[i];
            }
        } else {
            // single link
            links.push(selector);
        }
    }

    return links;
}

/**
 * Adds all links specified by the given selector to the cache. If no selector
 * is provided, will select every anchor element on the page with rel="shadowbox".
 *
 * Note: Options given here apply only to links selected by the given selector.
 * Also, because <area> elements do not support the rel attribute, they must be
 * explicitly passed to this method.
 *
 * @param   {mixed}     selector
 * @param   {Object}    options     Some options to use for the given links
 * @public
 */
S.setup = function(selector, options) {
    each(S.select(selector), function(i, link) {
        S.addCache(link, options);
    });
}

/**
 * Removes all links specified by the given selector from the cache.
 *
 * @param   {mixed}     selector
 * @public
 */
S.teardown = function(selector) {
    each(S.select(selector), function(i, link) {
        S.removeCache(link);
    });
}

/**
 * Adds the given link element to the cache with the given options.
 *
 * @param   {HTMLElement}   link
 * @param   {Object}        options
 * @public
 */
S.addCache = function(link, options) {
    var key = link[expando];

    if (key == undefined) {
        key = cacheKey++;
        // assign cache key expando, use integer primitive to avoid memory leak in IE
        link[expando] = key;
        // add onclick listener
        addEvent(link, "click", handleClick);
    }

    S.cache[key] = S.makeObject(link, options);
}

/**
 * Removes the given link element from the cache.
 *
 * @param   {HTMLElement}   link
 * @public
 */
S.removeCache = function(link) {
    removeEvent(link, "click", handleClick);
    delete S.cache[link[expando]];
    link[expando] = null;
}

/**
 * Gets the object from cache representative of the given link element (if there is one).
 *
 * @param   {HTMLElement}   link
 * @return  {Object}
 * @public
 */
S.getCache = function(link) {
    var key = link[expando];
    return (key in S.cache && S.cache[key]);
}

/**
 * Removes all onclick listeners from elements that have previously been setup with
 * Shadowbox and clears all objects from cache.
 *
 * @public
 */
S.clearCache = function() {
    for (var key in S.cache)
        S.removeCache(S.cache[key].link);

    S.cache = {};
}

/**
 * Handles all clicks on links that have been set up to work with Shadowbox
 * and cancels the default event behavior when appropriate.
 *
 * @param   {Event}     e   The click event
 * @private
 */
function handleClick(e) {
    //e.preventDefault(); // good for debugging

    S.open(this);

    if (S.gallery.length) {
        e.preventDefault();
    }
}
/**
 * The HTML player for Shadowbox.
 */

/**
 * Constructor. The HTML player class for Shadowbox.
 *
 * @constructor
 * @param   {Object}    obj     The content object
 * @param   {String}    id      The player id
 * @public
 */
S.html = function(obj, id) {
    this.obj = obj;
    this.id = id;

    // height defaults to 300, width defaults to 500
    this.height = obj.height ? parseInt(obj.height, 10) : 300;
    this.width = obj.width ? parseInt(obj.width, 10) : 500;
}

S.html.prototype = {

    /**
     * Appends this object to the DOM.
     *
     * @param   {HTMLElement}   body    The body element
     * @param   {Object}        dims    The current Shadowbox dimensions
     * @public
     */
    append: function(body, dims) {
        var div = document.createElement("div");
        div.id = this.id;
        div.className = "html"; // give special class to enable scrolling
        div.innerHTML = this.obj.content;

        body.appendChild(div);
    },

    /**
     * Removes this object from the DOM.
     *
     * @public
     */
    remove: function() {
        var el = get(this.id);
        if (el)
            remove(el);
    }

}
/**
 * The iframe player for Shadowbox.
 */

/**
 * Constructor. The iframe player class for Shadowbox.
 *
 * @constructor
 * @param   {Object}    obj     The content object
 * @param   {String}    id      The player id
 * @public
 */
S.iframe = function(obj, id) {
    this.obj = obj;
    this.id = id;

    // height/width default to full viewport height/width
    var overlay = get("sb-overlay");
    this.height = obj.height ? parseInt(obj.height, 10) : overlay.offsetHeight;
    this.width = obj.width ? parseInt(obj.width, 10) : overlay.offsetWidth;
}

S.iframe.prototype = {

    /**
     * Appends this iframe to the DOM.
     *
     * @param   {HTMLElement}   body    The body element
     * @param   {Object}        dims    The current Shadowbox dimensions
     * @public
     */
    append: function(body, dims) {
        var html = '<iframe id="' + this.id + '" name="' + this.id + '" height="100%" ' +
            'width="100%" frameborder="0" marginwidth="0" marginheight="0" ' +
            'style="visibility:hidden" onload="this.style.visibility=\'visible\'" ' +
            'scrolling="auto" allowtransparency="true" src="about:blank"></iframe>';

        // use innerHTML method of insertion here instead of appendChild
        // because IE renders frameborder otherwise
        body.innerHTML = html;
    },

    /**
     * Removes this iframe from the DOM.
     *
     * @public
     */
    remove: function() {
        var el = get(this.id);
        if (el) {
            remove(el);
            try {
                // needed for Firefox, IE <= 8 throws error
                delete window.frames[this.id];
            } catch (err) {}
        }
    },

    /**
     * An optional callback function to process after this content has been loaded.
     *
     * @public
     */
    onLoad: function() {
        var win = window.frames[this.id];
        win.location.href = this.obj.content;
    }

}
/**
 * The image player for Shadowbox.
 */

/**
 * Resource used to preload images. It's class-level so that when a new image is requested,
 * the same resource can be reassigned, cancelling the original's callback.
 *
 * @type    {Image}
 * @private
 */
var pre,

/**
 * The id to use for the drag proxy element.
 *
 * @type    {String}
 * @private
 */
proxyId = "sb-drag-proxy",

/**
 * Keeps track of 4 floating values (x, y, startx, & starty) that are used in the drag calculations.
 *
 * @type    {Object}
 * @private
 */
dragData,

/**
 * The transparent element that is used to listen for drag events.
 *
 * @type    {HTMLElement}
 * @private
 */
dragProxy,

/**
 * The draggable element.
 *
 * @type    {HTMLElement}
 * @private
 */
dragTarget;

/**
 * Resets the class drag variable.
 *
 * @private
 */
function resetDrag() {
    dragData = {
        x:      0,
        y:      0,
        startX: null,
        startY: null
    };
}

/**
 * Updates the drag proxy dimensions.
 *
 * @private
 */
function updateProxy() {
    var dims = S.dimensions;
    apply(dragProxy.style, {
        height: dims.innerHeight + "px",
        width: dims.innerWidth + "px"
    });
}

/**
 * Enables a transparent drag layer on top of images.
 *
 * @private
 */
function enableDrag() {
    resetDrag();

    // add transparent proxy layer to prevent browser dragging of actual image
    var style = [
        "position:absolute",
        "cursor:move",
        "background-color:" + (supportsOpacity ? "transparent" : "#fff;filter:alpha(opacity=0)")
    ].join(";");
    S.appendHTML(S.skin.body, '<div id="' + proxyId + '" style="' + style + '"></div>');

    dragProxy = get(proxyId);
    updateProxy();

    addEvent(dragProxy, "mousedown", startDrag);
}

/**
 * Disables the drag layer.
 *
 * @private
 */
function disableDrag() {
    if (dragProxy) {
        removeEvent(dragProxy, "mousedown", startDrag);
        remove(dragProxy);
        dragProxy = null;
    }

    dragTarget = null;
}

/**
 * Sets up a drag listener on the document.
 *
 * @param   {Event}     e   The mousedown event
 * @private
 */
function startDrag(e) {
    // prevent browser dragging
    e.preventDefault();

    var xy = getPageXY(e);
    dragData.startX = xy[0];
    dragData.startY = xy[1];

    dragTarget = get(S.player.id);

    addEvent(document, "mousemove", positionDrag);
    addEvent(document, "mouseup", endDrag);
}

/**
 * Positions an oversized image on drag.
 *
 * @param   {Event}     e   The mousemove event
 * @private
 */
function positionDrag(e) {
    var player = S.player,
        dims = S.dimensions,
        xy = getPageXY(e);

    var moveX = xy[0] - dragData.startX;
    dragData.startX += moveX;
    dragData.x = Math.max(Math.min(0, dragData.x + moveX), dims.innerWidth - player.width);

    var moveY = xy[1] - dragData.startY;
    dragData.startY += moveY;
    dragData.y = Math.max(Math.min(0, dragData.y + moveY), dims.innerHeight - player.height);

    apply(dragTarget.style, {
        left: dragData.x + "px",
        top: dragData.y + "px"
    });
}

/**
 * Removes the drag listener from the document.
 *
 * @private
 */
function endDrag() {
    removeEvent(document, "mousemove", positionDrag);
    removeEvent(document, "mouseup", endDrag);
}

/**
 * Constructor. The image player class for Shadowbox.
 *
 * @constructor
 * @param   {Object}    obj     The content object
 * @param   {String}    id      The player id
 * @public
 */
S.img = function(obj, id) {
    this.obj = obj;
    this.id = id;

    // preload the image
    this.ready = false;
    var self = this;
    pre = new Image();
    pre.onload = function() {
        // height/width defaults to image height/width
        self.height = obj.height ? parseInt(obj.height, 10) : pre.height;
        self.width = obj.width ? parseInt(obj.width, 10) : pre.width;

        // ready to go
        self.ready = true;

        // clean up to prevent memory leak in IE
        pre.onload = null;
        pre = null;
    }
    pre.src = obj.content;
}

S.img.ext = ["bmp", "gif", "jpg", "jpeg", "png"];

S.img.prototype = {

    /**
     * Appends this image to the document.
     *
     * @param   {HTMLElement}   body    The body element
     * @param   {Object}        dims    The current Shadowbox dimensions
     * @public
     */
    append: function(body, dims) {
        var img = document.createElement("img");
        img.id = this.id;
        img.src = this.obj.content;
        img.style.position = "absolute";

        var height, width;
        if (dims.oversized && S.options.handleOversize == "resize") {
            height = dims.innerHeight;
            width = dims.innerWidth;
        } else {
            height = this.height;
            width = this.width;
        }

        // need to use setAttribute here for IE's sake
        img.setAttribute("height", height);
        img.setAttribute("width", width);

        body.appendChild(img);
    },

    /**
     * Removes this image from the document.
     *
     * @public
     */
    remove: function() {
        var el = get(this.id);
        if (el)
            remove(el);

        disableDrag();

        // prevent old image requests from loading
        if (pre) {
            pre.onload = null;
            pre = null;
        }
    },

    /**
     * An optional callback function to process after this content has been
     * loaded.
     *
     * @public
     */
    onLoad: function() {
        var dims = S.dimensions;

        // listen for drag when image is oversized
        if (dims.oversized && S.options.handleOversize == "drag")
            enableDrag();
    },

    /**
     * Called when the window is resized.
     *
     * @public
     */
    onWindowResize: function() {
        var dims = S.dimensions;

        switch (S.options.handleOversize) {
        case "resize":
            var el = get(this.id);
            el.height = dims.innerHeight;
            el.width = dims.innerWidth;
            break;
        case "drag":
            if (dragTarget) {
                var top = parseInt(S.getStyle(dragTarget, "top")),
                    left = parseInt(S.getStyle(dragTarget, "left"));

                // fix positioning when viewport is enlarged
                if (top + this.height < dims.innerHeight)
                    dragTarget.style.top = dims.innerHeight - this.height + "px";
                if (left + this.width < dims.innerWidth)
                    dragTarget.style.left = dims.innerWidth - this.width + "px";

                updateProxy();
            }
            break;
        }
    }

}
/**
 * Keeps track of whether or not the overlay is activated.
 *
 * @type    {Boolean}
 * @private
 */
var overlayOn = false,

/**
 * A cache of elements that are troublesome for modal overlays.
 *
 * @type    {Array}
 * @private
 */
visibilityCache = [],

/**
 * Id's of elements that need transparent PNG support.
 *
 * @type    {Array}
 * @private
 */
pngIds = [
    "sb-nav-close",
    "sb-nav-next",
    "sb-nav-play",
    "sb-nav-pause",
    "sb-nav-previous"
],

/**
 * The container element.
 *
 * @type    {HTMLElement}
 * @private
 */
container,

/**
 * The overlay element.
 *
 * @type    {HTMLElement}
 * @private
 */
overlay,

/**
 * The wrapper element.
 *
 * @type    {HTMLElement}
 * @private
 */
wrapper,

/**
 * True if the window resize event is allowed to fire.
 *
 * @type    {Boolean}
 * @private
 */
doWindowResize = true;

/**
 * Animates the given property of el to the given value over a specified duration. If a
 * callback is provided, it will be called when the animation is finished.
 *
 * @param   {HTMLElement}   el
 * @param   {String}        property
 * @param   {mixed}         to
 * @param   {Number}        duration
 * @param   {Function}      callback
 * @private
 */
function animate(el, property, to, duration, callback) {
    var isOpacity = (property == "opacity"),
    anim = isOpacity ? S.setOpacity : function(el, value) {
        // default unit is px for properties other than opacity
        el.style[property] = "" +
            value + "px";
    };

    if (duration == 0 || (!isOpacity && !S.options.animate) || (isOpacity && !S.options.animateFade)) {
        anim(el, to);
        if (callback)
            callback();
        return;
    }

    var from = parseFloat(S.getStyle(el, property)) || 0;
    var delta = to - from;
    if (delta == 0) {
        if (callback)
            callback();
        return; // nothing to animate
    }

    duration *= 1000; // convert to milliseconds

    var begin = now(),
        ease = S.ease,
        end = begin + duration,
        time;

    var interval = setInterval(function() {
        time = now();
        if (time >= end) {
            clearInterval(interval);
            interval = null;
            anim(el, to);
            if (callback)
                callback();
        } else {
            anim(el, from + ease((time - begin) / duration) * delta);
        }
    }, 10); // 10 ms interval is minimum on WebKit
}

/**
 * Sets the size of the container element.
 *
 * @private
 */
function setSize() {
    container.style.height = S.getWindowSize("Height") + "px";
    container.style.width = S.getWindowSize("Width") + "px";
}

/**
 * Sets the top of the container element. This is only necessary in browsers that
 * don't support fixed positioning, such as IE6.
 *
 * @private
 */
function setPosition() {
    container.style.top = document.documentElement.scrollTop + "px";
    container.style.left = document.documentElement.scrollLeft + "px";
}

/**
 * Toggles the visibility of elements that are troublesome for overlays.
 *
 * @param   {Boolean}   on  True to make visible, false to hide
 * @private
 */
function toggleTroubleElements(on) {
    if (on) {
        each(visibilityCache, function(i, el){
            el[0].style.visibility = el[1] || '';
        });
    } else {
        visibilityCache = [];
        each(S.options.troubleElements, function(i, tag) {
            each(document.getElementsByTagName(tag), function(j, el) {
                visibilityCache.push([el, el.style.visibility]);
                el.style.visibility = "hidden";
            });
        });
    }
}

/**
 * Toggles the display of the nav control with the given id.
 *
 * @param   {String}    id      The id of the navigation control
 * @param   {Boolean}   on      True to toggle on, false to toggle off
 * @private
 */
function toggleNav(id, on) {
    var el = get("sb-nav-" + id);
    if (el)
        el.style.display = on ? "" : "none";
}

/**
 * Toggles the visibility of the loading layer.
 *
 * @param   {Boolean}   on          True to toggle on, false to toggle off
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function toggleLoading(on, callback) {
    var loading = get("sb-loading"),
        playerName = S.getCurrent().player,
        anim = (playerName == "img" || playerName == "html"); // fade on images & html

    if (on) {
        S.setOpacity(loading, 0);
        loading.style.display = "block";

        var wrapped = function() {
            S.clearOpacity(loading);
            if (callback)
                callback();
        }

        if (anim) {
            animate(loading, "opacity", 1, S.options.fadeDuration, wrapped);
        } else {
            wrapped();
        }
    } else {
        var wrapped = function() {
            loading.style.display = "none";
            S.clearOpacity(loading);
            if (callback)
                callback();
        }

        if (anim) {
            animate(loading, "opacity", 0, S.options.fadeDuration, wrapped);
        } else {
            wrapped();
        }
    }
}

/**
 * Builds the content for the title and information bars.
 *
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function buildBars(callback) {
    var obj = S.getCurrent();

    get("sb-title-inner").innerHTML = obj.title || "";

    // build the nav
    var close, next, play, pause, previous;
    if (S.options.displayNav) {
        close = true;
        var len = S.gallery.length;
        if (len > 1) {
            if (S.options.continuous) {
                next = previous = true;
            } else {
                next = (len - 1) > S.current; // not last in gallery, show next
                previous = S.current > 0; // not first in gallery, show previous
            }
        }
        // in a slideshow?
        if (S.options.slideshowDelay > 0 && S.hasNext()) {
            pause = !S.isPaused();
            play = !pause;
        }
    } else {
        close = next = play = pause = previous = false;
    }
    toggleNav("close", close);
    toggleNav("next", next);
    toggleNav("play", play);
    toggleNav("pause", pause);
    toggleNav("previous", previous);

    // build the counter
    var counter = "";
    if (S.options.displayCounter && S.gallery.length > 1) {
        var len = S.gallery.length;
        if (S.options.counterType == "skip") {
            // limit the counter?
            var i = 0,
                end = len,
                limit = parseInt(S.options.counterLimit) || 0;

            if (limit < len && limit > 2) { // support large galleries
                var h = Math.floor(limit / 2);
                i = S.current - h;
                if (i < 0)
                    i += len;
                end = S.current + (limit - h);
                if (end > len)
                    end -= len;
            }

            while (i != end) {
                if (i == len)
                    i = 0;
                counter += '<a onclick="Shadowbox.change(' + i + ');"'
                if (i == S.current)
                    counter += ' class="sb-counter-current"';
                counter += ">" + (++i) + "</a>";
            }
        } else {
            counter = [S.current + 1, len].join('/');
        }
    }

    get("sb-counter").innerHTML = counter;

    callback();
}

/**
 * Shows the title and info bars.
 *
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function showBars(callback) {
    var titleInner = get("sb-title-inner"),
        infoInner = get("sb-info-inner"),
        duration = 0.35;

    // clear visibility before animating into view
    titleInner.style.visibility = infoInner.style.visibility = "";

    if (titleInner.innerHTML != "")
        animate(titleInner, "marginTop", 0, duration);
    animate(infoInner, "marginTop", 0, duration, callback);
}

/**
 * Hides the title and info bars.
 *
 * @param   {Boolean}   anim        True to animate the transition
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function hideBars(anim, callback) {
    var title = get("sb-title"),
        info = get("sb-info"),
        titleHeight = title.offsetHeight,
        infoHeight = info.offsetHeight,
        titleInner = get("sb-title-inner"),
        infoInner = get("sb-info-inner"),
        duration = (anim ? 0.35 : 0);

    animate(titleInner, "marginTop", titleHeight, duration);
    animate(infoInner, "marginTop", infoHeight * -1, duration, function() {
        titleInner.style.visibility = infoInner.style.visibility = "hidden";
        callback();
    });
}

/**
 * Adjusts the height of #sb-wrapper-inner and centers #sb-wrapper vertically
 * in the viewport.
 *
 * @param   {Number}    height      The height (in pixels)
 * @param   {Number}    top         The top (in pixels)
 * @param   {Boolean}   anim        True to animate the transition
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function adjustHeight(height, top, anim, callback) {
    var wrapperInner = get("sb-wrapper-inner"),
        duration = (anim ? S.options.resizeDuration : 0);

    animate(wrapper, "top", top, duration);
    animate(wrapperInner, "height", height, duration, callback);
}

/**
 * Adjusts the width and left position of #sb-wrapper.
 *
 * @param   {Number}    width       The width (in pixels)
 * @param   {Number}    left        The left (in pixels)
 * @param   {Boolean}   anim        True to animate the transition
 * @param   {Function}  callback    The callback to use when finished
 * @private
 */
function adjustWidth(width, left, anim, callback) {
    var duration = (anim ? S.options.resizeDuration : 0);

    animate(wrapper, "left", left, duration);
    animate(wrapper, "width", width, duration, callback);
}

/**
 * Calculates the dimensions for Shadowbox.
 *
 * @param   {Number}    height      The content height
 * @param   {Number}    width       The content width
 * @return  {Object}                The new dimensions object
 * @private
 */
function setDimensions(height, width) {
    var bodyInner = get("sb-body-inner"),
        height = parseInt(height),
        width = parseInt(width),
        topBottom = wrapper.offsetHeight - bodyInner.offsetHeight,
        leftRight = wrapper.offsetWidth - bodyInner.offsetWidth,

        // overlay should provide proper window dimensions here
        maxHeight = overlay.offsetHeight,
        maxWidth = overlay.offsetWidth,

        // default to the default viewport padding
        padding = parseInt(S.options.viewportPadding) || 20,

        // only preserve aspect ratio if there is something to display and
        // it's not draggable
        preserveAspect = (S.player && S.options.handleOversize != "drag");

    return S.setDimensions(height, width, maxHeight, maxWidth, topBottom, leftRight, padding, preserveAspect);
}

/**
 * The Shadowbox.skin object.
 *
 * @type    {Object}
 * @public
 */
var K = {};

/**
 * The HTML markup to use.
 *
 * @type    {String}
 * @public
 */
K.markup = "" +
'<div id="sb-container">' +
    '<div id="sb-overlay"></div>' +
    '<div id="sb-wrapper">' +
        '<div id="sb-title">' +
            '<div id="sb-title-inner"></div>' +
        '</div>' +
        '<div id="sb-wrapper-inner">' +
            '<div id="sb-body">' +
                '<div id="sb-body-inner"></div>' +
                '<div id="sb-loading"></div>' +
            '</div>' +
        '</div>' +
        '<div id="sb-info">' +
            '<div id="sb-info-inner">' +
                '<div id="sb-counter"></div>' +
                '<div id="sb-nav">' +
                    '<a id="sb-nav-close" onclick="Shadowbox.close()"></a>' +
                    '<a id="sb-nav-next" onclick="Shadowbox.next()"></a>' +
                    '<a id="sb-nav-play" onclick="Shadowbox.play()"></a>' +
                    '<a id="sb-nav-pause" onclick="Shadowbox.pause()"></a>' +
                    '<a id="sb-nav-previous" onclick="Shadowbox.previous()"></a>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>';

/**
 * Various options that control the behavior of Shadowbox' skin.
 *
 * @type    {Object}
 * @public
 */
K.options = {

    /**
     * The sequence of the resizing animations. "hw" will resize height, then width. "wh" resizes
     * width, then height. "sync" resizes both simultaneously.
     *
     * @type    {String}
     */
    animSequence: "sync",

    /**
     * The limit to the number of counter links that are displayed in a "skip"-style counter.
     *
     * @type    {Number}
     */
    counterLimit: 10,

    /**
     * The counter type to use. May be either "default" or "skip". A skip counter displays a
     * link for each object in the gallery.
     *
     * @type    {String}
     */
    counterType: "default",

    /**
     * True to display the gallery counter.
     *
     * @type    {Boolean}
     */
    displayCounter: true,

    /**
     * True to show the navigation controls.
     *
     * @type    {Boolean}
     */
    displayNav: true,

    /**
     * The duration (in seconds) of opacity animations.
     *
     * @type    {Number}
     */
    fadeDuration: 0.35,

    /**
     * The initial height (in pixels).
     *
     * @type    {Number}
     */
    initialHeight: 160,

    /**
     * The initial width (in pixels).
     *
     * @type    {Number}
     */
    initialWidth: 320,

    /**
     * True to trigger Shadowbox.close when the overlay is clicked.
     *
     * @type    {Boolean}
     */
    modal: false,

    /**
     * The color (in hex) to use for the overlay.
     *
     * @type    {String}
     */
    overlayColor: "#000",

    /**
     * The opacity to use for the overlay.
     *
     * @type    {Number}
     */
    overlayOpacity: 0.5,

    /**
     * The duration (in seconds) to use for resizing animations.
     *
     * @type    {Number}
     */
    resizeDuration: 0.35,

    /**
     * True to show the overlay, false to hide it.
     *
     * @type    {Boolean}
     */
    showOverlay: true,

    /**
     * Names of elements that should be hidden when the overlay is enabled.
     *
     * @type    {String}
     */
    troubleElements: ["select", "object", "embed", "canvas"]

};

/**
 * Initialization function. Called immediately after this skin's markup has been
 * appended to the document.
 *
 * @public
 */
K.init = function() {
    S.appendHTML(document.body, K.markup);

    K.body = get("sb-body-inner");

    // cache oft-used elements
    container = get("sb-container");
    overlay = get("sb-overlay");
    wrapper = get("sb-wrapper");

    // use absolute positioning in browsers that don't support fixed
    if (!supportsFixed)
        container.style.position = "absolute";

    if (!supportsOpacity) {
        // support transparent PNG's via AlphaImageLoader
        var el, m, re = /url\("(.*\.png)"\)/;
        each(pngIds, function(i, id) {
            el = get(id);
            if (el) {
                m = S.getStyle(el, "backgroundImage").match(re);
                if (m) {
                    el.style.backgroundImage = "none";
                    el.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=" +
                        m[1] + ",sizingMethod=scale);";
                }
            }
        });
    }

    // add window resize event handler, use 10 ms buffer to prevent jerky resizing
    var timer;
    addEvent(window, "resize", function() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (open)
            timer = setTimeout(K.onWindowResize, 10);
    });
}

/**
 * Called when Shadowbox opens.
 *
 * @param   {Object}    obj         The object to open
 * @param   {Function}  callback    The callback to use when finished
 * @public
 */
K.onOpen = function(obj, callback) {
    // prevent window resize events from firing until we're finished
    doWindowResize = false;

    container.style.display = "block";

    setSize();

    var dims = setDimensions(S.options.initialHeight, S.options.initialWidth);
    adjustHeight(dims.innerHeight, dims.top);
    adjustWidth(dims.width, dims.left);

    if (S.options.showOverlay) {
        overlay.style.backgroundColor = S.options.overlayColor;
        S.setOpacity(overlay, 0);

        if (!S.options.modal)
            addEvent(overlay, "click", S.close);

        overlayOn = true;
    }

    if (!supportsFixed) {
        setPosition();
        addEvent(window, "scroll", setPosition);
    }

    toggleTroubleElements();
    container.style.visibility = "visible";

    if (overlayOn) {
        animate(overlay, "opacity", S.options.overlayOpacity, S.options.fadeDuration, callback);
    } else {
        callback();
    }
}

/**
 * Called when a new object is being loaded.
 *
 * @param   {Boolean}   changing    True if the content is changing from some
 *                                  previous object
 * @param   {Function}  callback    The callback to use when finished
 * @public
 */
K.onLoad = function(changing, callback) {
    toggleLoading(true);

    // make sure the body doesn't have any children
    while (K.body.firstChild)
        remove(K.body.firstChild);

    hideBars(changing, function() {
        if (!open)
            return;

        if (!changing)
            wrapper.style.visibility = "visible";

        buildBars(callback);
    });
}

/**
 * Called when the content is ready to be loaded (e.g. when the image has finished
 * loading). Should resize the content box and make any other necessary adjustments.
 *
 * @param   {Function}  callback    The callback to use when finished
 * @public
 */
K.onReady = function(callback) {
    if (!open)
        return;

    var player = S.player,
        dims = setDimensions(player.height, player.width);

    var wrapped = function() {
        showBars(callback);
    }

    switch (S.options.animSequence) {
    case "hw":
        adjustHeight(dims.innerHeight, dims.top, true, function() {
            adjustWidth(dims.width, dims.left, true, wrapped);
        });
        break;
    case "wh":
        adjustWidth(dims.width, dims.left, true, function() {
            adjustHeight(dims.innerHeight, dims.top, true, wrapped);
        });
        break;
    default: // sync
        adjustWidth(dims.width, dims.left, true);
        adjustHeight(dims.innerHeight, dims.top, true, wrapped);
    }
}

/**
 * Called when the content is loaded into the box and is ready to be displayed.
 *
 * @param   {Function}  callback    The callback to use when finished
 * @public
 */
K.onShow = function(callback) {
    toggleLoading(false, callback);

    // re-enable window resize events
    doWindowResize = true;
}

/**
 * Called in Shadowbox.close.
 *
 * @public
 */
K.onClose = function() {
    if (!supportsFixed)
        removeEvent(window, "scroll", setPosition);

    removeEvent(overlay, "click", S.close);

    wrapper.style.visibility = "hidden";

    var callback = function() {
        container.style.visibility = "hidden";
        container.style.display = "none";
        toggleTroubleElements(true);
    }

    if (overlayOn) {
        animate(overlay, "opacity", 0, S.options.fadeDuration, callback);
    } else {
        callback();
    }
}

/**
 * Called in Shadowbox.play.
 *
 * @public
 */
K.onPlay = function() {
    toggleNav("play", false);
    toggleNav("pause", true);
}

/**
 * Called in Shadowbox.pause.
 *
 * @public
 */
K.onPause = function() {
    toggleNav("pause", false);
    toggleNav("play", true);
}

/**
 * Called when the window is resized.
 *
 * @public
 */
K.onWindowResize = function() {
    if (!doWindowResize)
        return;

    setSize();

    var player = S.player,
        dims = setDimensions(player.height, player.width);

    // adjust width first to eliminate horizontal scroll bar
    adjustWidth(dims.width, dims.left);
    adjustHeight(dims.innerHeight, dims.top);

    if (player.onWindowResize)
        player.onWindowResize();
}

S.skin = K;
// expose
window['Shadowbox'] = S;

})(window);
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


/*!
 * JQuery Spliter Plugin
 * Copyright (C) 2010 Jakub Jankiewicz <http://jcubic.pl> 
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function($, undefined) {
    var count = 0;
    var spliter_id = null;
    var spliters = [];
    var current_spliter = null;
    $.fn.split = function(options) {
        var panel_1;
        var panel_2;
        var settings = {
            limit: 100,
            orientation: 'horizontal',
            position: '50%'
        };
        options && $.extend(settings, options);
        var cls;
        var children = this.children();
        if (settings.orientation == 'vertical') {
            panel_1 = children.first().addClass('left_panel');
            panel_2 = panel_1.next().addClass('right_panel');
            cls = 'vspliter';
        } else if (settings.orientation == 'horizontal') {
            panel_1 = children.first().addClass('top_panel')
            panel_2 = panel_1.next().addClass('bottom_panel');
            cls = 'hspliter';
        }
        var width = this.width();
        var height = this.height();
        var id = count++;
        this.addClass('spliter_panel');
        var spliter = $('<div/>').addClass(cls).mouseenter(function() {
            spliter_id = id;
        }).mouseleave(function() {
            spliter_id = null;
        }).insertAfter(panel_1);
        var position;
        var self = $.extend(this, {
            position: (function() {
                if (settings.orientation == 'vertical') {
                    return function(n) {
                        if (n === undefined) {
                            return position;
                        } else {
                            position = n;
                            var sw = spliter.width()/2;
                            spliter.css('left', n-sw);
                            panel_1.width(n-sw);
                            panel_2.width(self.width()-n-sw);
                        }
                    };
                } else if (settings.orientation == 'horizontal') {
                    return function(n) {
                        if (n === undefined) {
                            return position;
                        } else {
                            var sw = spliter.height()/2;
                            spliter.css('top', n-sw);
                            panel_1.height(n-sw);
                            panel_2.height(self.height()-n-sw);
                            position = n;
                        }
                    };
                } else {
                    return null;
                }
            })(),
            orientation: settings.orientation,
            limit: settings.limit,
            destroy: function() {
                spliter.unbind('mouseenter');
                spliter.unbind('mouseleave');
                if (settings.orientation == 'vertical') {
                    panel_1.removeClass('left_panel');
                    panel_2.removeClass('right_panel');
                } else if (settings.orientation == 'horizontal') {
                    panel_1.removeClass('top_panel');
                    panel_2.removeClass('bottom_panel');
                }
                self.unbind('spliter.resize');
                spliters[id] = null;
                spliter.remove();
                var not_null = false;
                for (var i=spliters.length; i--;) {
                    if (spliters[i] !== null) {
                        not_null = true;
                        break;
                    }
                }
                //remove document events when no spliters
                if (!not_null) {
                    $(document.documentElement).bind('.spliter');
                    spliters = [];
                }
            }
        });
        
        self.bind('spliter.resize', function() {
            var pos = self.position();
            if (self.orientation == 'vertical' && 
                pos > self.width()) {
                pos = self.width() - self.limit-1;
            } else if (self.orientation == 'horizontal' && 
                       pos > self.height()) {
                pos = self.height() - self.limit-1;
            }
            if(pos < self.limit) pos = self.limit + 1;
            self.position(pos);
        });
        //inital position of spliter
        var m = settings.position.match(/^([0-9]+)(%)?$/);
        var pos;
        if (settings.orientation == 'vertical') {
            if (!m[2]) {
                pos = settings.position;
            } else {
                pos = (width * +m[1]) / 100;
            }
            if (pos > width-settings.limit) {
                pos = width-settings.limit;
            }
        } else if (settings.orientation == 'horizontal') {
            //position = height/2;
            if (!m[2]) {
                pos = settings.position;
            } else {
                pos = (height * +m[1]) / 100;
            }
            if (pos > height-settings.limit) {
                pos = height-settings.limit;
            }
        }
        if (pos < settings.limit) {
            pos = settings.limit;
        }
        self.position(pos);
        if (spliters.length == 0) { // first time bind events to document
            $(document.documentElement).bind('mousedown.spliter', function() {
                if (spliter_id !== null) {
                    current_spliter = spliters[spliter_id];
                    $('<div class="splitterMask"></div>').insertAfter(current_spliter);
                    if (current_spliter.orientation == 'horizontal') {
                        $('body').css('cursor', 'row-resize');
                    } else if (current_spliter.orientation == 'vertical') {
                        $('body').css('cursor', 'col-resize');
                    }
                    return false;
                }
            }).bind('mouseup.spliter', function() {
                current_spliter = null;$('div.splitterMask').remove();
                $('body').css('cursor', 'auto');
            }).bind('mousemove.spliter', function(e) {
                if (current_spliter !== null) {
                    var limit = current_spliter.limit;
                    var offset = current_spliter.offset();
                    if (current_spliter.orientation == 'vertical') {
                        var x = e.pageX - offset.left;
                        if(x <= current_spliter.limit) {
                            x = current_spliter.limit + 1;
                        }
                        else if (x >= current_spliter.width() - limit) {
                            x = current_spliter.width() - limit - 1;
                        }
                        if (x > current_spliter.limit &&
                            x < current_spliter.width()-limit) {
                            current_spliter.position(x);
                            current_spliter.find('.spliter_panel').trigger('spliter.resize');
                            return false;
                        }
                    } else if (current_spliter.orientation == 'horizontal') {
                        var y = e.pageY-offset.top;
                        if(y <= current_spliter.limit) {
                            y = current_spliter.limit + 1;
                        }
                        else if (y >= current_spliter.height() - limit) {
                            y = current_spliter.height() - limit - 1;
                        }
                        if (y > current_spliter.limit &&
                            y < current_spliter.height()-limit) {
                            current_spliter.position(y);
                            current_spliter.trigger('spliter.resize');
                            return false;
                        }
                    }
                }
            });
        }
        spliters.push(self);
        return self;
    };
})(jQuery);
"use strict";

/* ========================================================================= */
/*                                UTILITY                                    */
/* ========================================================================= */

Shadowbox.init();

function EventDispatcher() {
	this.listeners = {};
};

EventDispatcher.prototype = {
	constructor: EventDispatcher,

	addEventListener: function(type, listener) {
		if (typeof this.listeners[type] == "undefined") {
			this.listeners[type] = [];
		}
		this.listeners[type].push(listener);
	},

	dispatchEvent: function(event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.listeners[event.type] instanceof Array) {
			var listeners = this.listeners[event.type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i](event);
			}
		}
	},

	removeEventListener: function(type, listener) {
		if (this.listeners[type] instanceof Array) {
			var listeners = this.listeners[type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i] === listener) {
					break;
				}
			}

			listeners.splice(i,1);
		}
	},

	hasEventListener: function(type) {
		if (this.listeners[type] instanceof Array) {
			var listeners = this.listeners[type];
			return (listeners.length > 0);
		}

		return false;
	}
};

var trace = console.log;

// Validates that a string exists
function validateString(str) {
	return (typeof str == 'string' && str.length > 0);
};

// Display a string or a default value if not passed
function displayString(str, strDefault) {
	if (typeof strDefault != 'string') throw Error('displayString() - strDefault must be a string. (' + strDefault + ')');
	if (typeof str != 'string' || str.length <= 0) return strDefault;
	return str;
};

// Pull a localized string
function s(type) {
	return STRINGS[lang][type] || STRINGS["en_us"][type];
}

/* ========================================================================= */
/*                                CONTROLLER                                 */
/* ========================================================================= */

var Constants = {
	DISPLAY_SCREEN : 'DISPLAY_SCREEN',
	DISPLAY_EDIT : 'DISPLAY_EDIT',
	ALERT_WARNING: 'warning',
	ALERT_INFORMATION: 'information',
	ALERT_ERROR: 'error',
	ALERT_CONFIRM: 'confirm',
	ALERT_NONE: 'none',
	ASCENDING: 'ASCENDING',
	DESCENDING: 'DESCENDING'
};

var Notifications = {
	SHADOWBOX: 'SHADOWBOX',
	ALERT: 'ALERT',
	MODAL: 'MODAL',
	ADD_RECIPE: 'ADD_RECIPE',
	EDIT_RECIPE: 'EDIT_RECIPE',
	DELETE_RECIPE: 'DELETE_RECIPE',
	PRINT_RECIPE: 'PRINT_RECIPE',
	CANCEL_EDIT: 'CANCEL_EDIT',
	SAVE_EDIT: 'SAVE_EDIT',
	SHOW_ABOUT: 'SHOW_ABOUT',
	CHANGE: 'CHANGE',
	ADD_ING: 'ADD_ING',
	RECIPE_CHANGE: 'RECIPE_CHANGE',
	RECIPE_ADD: 'RECIPE_ADD',
	RECIPE_REMOVE: 'RECIPE_REMOVE',
	SORT_RATING: 'SORT_RATING',
	SORT_LABEL: 'SORT_LABEL'
};

var STRINGS = {
	en_us : {
		NEED_RECIPE_TITLE: "Please enter a recipe name.",
		NEED_RECIPE_DIR: "Please enter the recipe directions.",
		NEED_RECIPE_ING: "Please add at-least one ingredient.",
		NEED_RECIPE_ING2: "Please enter atleast one ingredient.",
		NO_RECIPE_FOUND: "No recipes found.",
		NO_RECIPE_SEL: "No recipes selected.",
		MULT_RECIPE_SEL: "Multiple recipes selected.",
		REMOVE_ING: "Remove Ingredient",
		REMOVE_PIC: "Remove Picture",
		DELETE_WARN: "You are about to delete recipes: \n\n",
		COURTESY_OF: "Courtesy of ",
		COURTESY_UNKNOWN: "Unknown",
		YIELDS: " - Yields: "
	}
};

var lang = "en_us";

var pxyRecipe = null;
var medHeader = null;
var medDisplayScreen = null;
var medEditScreen = null;
var medModal = null;
var medModalImage = null;

// Application startup
$().ready(function() {
	init();
});

function init() {
	//--------------------------------------
	//  Model
	//--------------------------------------
	pxyRecipe = new RecipeProxy();
	pxyRecipe.addEventListener(Notifications.RECIPE_CHANGE, commandHandler);
	pxyRecipe.addEventListener(Notifications.RECIPE_ADD, commandHandler);
	pxyRecipe.addEventListener(Notifications.RECIPE_REMOVE, commandHandler);

	//--------------------------------------
	//  View
	//--------------------------------------
	medHeader = new HeaderMediator($('.header'));
	medHeader.addEventListener(Notifications.ADD_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.EDIT_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.DELETE_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.PRINT_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.CANCEL_EDIT, commandHandler);
	medHeader.addEventListener(Notifications.SAVE_EDIT, commandHandler);
	medHeader.addEventListener(Notifications.SHOW_ABOUT, commandHandler);
	medHeader.addEventListener(Notifications.ADD_ING, commandHandler);

	medDisplayScreen = new DisplayScreenMediator($('#screen-display'));
	medDisplayScreen.addEventListener(Notifications.CHANGE, commandHandler);
	medDisplayScreen.addEventListener(Notifications.ALERT, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SORT_RATING, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SORT_LABEL, commandHandler);
	medDisplayScreen.addEventListener(Notifications.MODAL, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SHADOWBOX, commandHandler);
	
	medEditScreen = new EditScreenMediator($('#screen-edit'));

	medModal = new ModalMediator($('.modalDialog'));
	medModalImage = new ModalImageMediator($('.modalImage'));

	// Init
	medDisplayScreen.updateList(pxyRecipe.getRecipes());
	medDisplayScreen.selectRecipeAt(0);
	setScreen(Constants.DISPLAY_SCREEN);
};

function commandHandler(note) {
	switch(note.type) {
		case Notifications.SHADOWBOX :
			Shadowbox.clearCache();
			var asdf = $('.recipe-detail img');
			Shadowbox.setup();
			break;
		case Notifications.MODAL :
			trace("main.js::commandHandler() - Image popup");
			//medModalImage.init(note.body);
			//medModalImage.open();
			/*Shadowbox.open({
                    content: 'img/recipes/' + note.body,
                    player:     "img",
            });*/
			break;
		case Notifications.ALERT :
			medModal.init(note.body);
			medModal.open();
			break;
		case Notifications.ADD_RECIPE :
			// Reset edit screen
			medEditScreen.load(null);
			medEditScreen.isModified = true;

			// Goto edit screen
			setScreen(Constants.DISPLAY_EDIT);
			break;
		case Notifications.EDIT_RECIPE :
			// Get selected recipe
			var numSelected = medDisplayScreen.getNumSelected();
			if (numSelected === 1) {
				var selectedRecipe = medDisplayScreen.getSelectedRecipe();
				var recipe = pxyRecipe.getRecipe(selectedRecipe);

				// Set recipe in edit screen
				medEditScreen.load(recipe);

				// Goto edit screen
				setScreen(Constants.DISPLAY_EDIT);
			}
			break;
		case Notifications.DELETE_RECIPE :
			var str = s('DELETE_WARN');
			var selectedRecipes = medDisplayScreen.getSelectedRecipes();
			for (var i = 0, l = selectedRecipes.length; i < l; i++) {
				var recipe = pxyRecipe.getRecipe(selectedRecipes[i]);
				str += recipe.title + "\n";
			}
			if (confirm(str)) {
				pxyRecipe.removeRecipes(selectedRecipes);
				//medDisplayScreen.updateList(pxyRecipe.getRecipes());
				//medDisplayScreen.selectRecipeAt(0);
			}
			break;
		// Print
		// Import
		// Export

		case Notifications.CANCEL_EDIT :
			if (medEditScreen.isModified) {
				if (confirm("Would you like to save changes?")) {
					if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
				} else {
					setScreen(Constants.DISPLAY_SCREEN);
				}
			} else {
				setScreen(Constants.DISPLAY_SCREEN);
			}
			break;
		case Notifications.SAVE_EDIT :
			// Skip saving if nothing changed
			if (medEditScreen.isModified) {
				if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
			} else {
				setScreen(Constants.DISPLAY_SCREEN);
			}			
			break;
		case Notifications.ADD_ING :
			medEditScreen.addIngredient();
			break;
		
		case Notifications.CHANGE :
			var numSelected = medDisplayScreen.getNumSelected();
			medHeader.updateButtons(numSelected);

			if (numSelected === 1) {
				var selectedRecipe = medDisplayScreen.getSelectedRecipe();
				var recipe = pxyRecipe.getRecipe(selectedRecipe);
				medDisplayScreen.displayRecipe(recipe);
			}
			break;
		case Notifications.SORT_LABEL :
		case Notifications.SORT_RATING	:
			if (note.body === Constants.DESCENDING) {
				pxyRecipe.sort(note.type, Constants.DESCENDING);
			} else {
				pxyRecipe.sort(note.type, Constants.ASCENDING);
			}
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			break;
		case Notifications.DISPLAY_CHANGE :
			setScreen(note.body);
			break;
		case Notifications.RECIPE_CHANGE :
			medDisplayScreen.displayRecipe(note.body);
			medDisplayScreen.updateSelected(note.body);
			break;
		case Notifications.RECIPE_ADD :
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			medDisplayScreen.selectRecipeById(note.body[0].id);
			break;
		case Notifications.RECIPE_REMOVE :
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			medDisplayScreen.selectRecipeAt(0);
			break;
	};
};

function saveRecipe() {
	if (medEditScreen.validate()) {
		var recipe = medEditScreen.unload();
		// Save edited recipe
		if (!isNaN(recipe.id)) {
			trace('main.js::saveRecipe() - ' + recipe.id + ' recipe saved');
			//var recipeId = medDisplayScreen.getSelectedRecipe();
			pxyRecipe.setRecipe(recipe.id, recipe);
		}
		// Save new recipe
		else {
			trace('main.js::saveRecipe() - New recipe saved');
			pxyRecipe.addRecipes([recipe]);
		}
		return true;
	}
	return false;
}

function setScreen(screen) {
	if (typeof screen !== 'string') screen = Constants.DISPLAY_SCREEN;

	medHeader.setScreen(screen);
	if (screen == Constants.DISPLAY_SCREEN) {
		$('#content').removeClass('screen-edit').addClass('screen-display');
	} else {
		$('#content').removeClass('screen-display').addClass('screen-edit');
	}
};

/* ========================================================================= */
/*                                   MODEL                                   */
/* ========================================================================= */

function Note(type, body) {
	this.type = type;
	this.body = body;
};

var Recipe = function(id, title, author, source, category, yields, rating, tags, directions, notes, ingredients, picture) {
	this.id = id >= 0 ? id : NaN;
	this.title = displayString(title, ''); // String
	this.author = displayString(author, ''); // String
	this.source = displayString(source, ''); // String
	this.category = displayString(category, ''); // String
	this.yields = displayString(yields, ''); // String
	this.rating = rating || 0; // Int
	this.tags = tags || []; // Array
	this.directions = displayString(directions, ''); // String
	this.notes = displayString(notes, ''); // String
	this.ingredients = ingredients || []; // Array
	this.picture = displayString(picture, ''); // URL-String
	
	return this;
};

var StarRating = function(id) {
	var t = this;
	this.source = id ? $(id) : null;
	this.setStars = function(num) {
		if (t.source) {
			var radios = t.source.find('input:checked');
			radios.prop('checked', false);

			var radio = t.source.find('input[value=' + num +']');
			radio.prop('checked', true);
		}
	};
	this.getStars = function() {
		if (t.source) {
			var radio = t.source.find('input:checked');
			var num = radio.val();
			console.log(num);
			return num;
		}
		return 0;
	};
	this.reset = function() {
		t.setStars(1);
	}
};var RecipeProxy = function() {
	var pxy = new EventDispatcher();
	var KEY = 4; // increment with each recipe
	// TEMP: Will be housed on SQL
	var arrRecipes = [
		new Recipe(0, 'Rainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '4 Servings', 5, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', 'Test Note', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(1, 'ZRainbow Slaw', 'Jennifer Mariani', '', 'Side Dish', '4 Servings', 2, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'], "151679.jpg"),
		new Recipe(2, 'FRainbow Slaw', '', 'Family Recipe', 'Side Dish', '4 Servings', 1, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(3, 'ARainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '', 3, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'])
	];

	////////////
	// Public //
	////////////
	pxy.sort = function(type, direction) {
		if (type === Notifications.SORT_LABEL) {
			if (direction === Constants.DESCENDING) {
				arrRecipes.sort(sortOnLabel);
				arrRecipes.reverse();
			} else {
				arrRecipes.sort(sortOnLabel);
			}
		} else if (type === Notifications.SORT_RATING) {
			if (direction === Constants.DESCENDING) {
				arrRecipes.sort(sortOnRating);
				arrRecipes.reverse();
			} else {
				arrRecipes.sort(sortOnRating);
			}
		}
	}

	/*
	Get all recipes
	*/
	pxy.getRecipes = function() {
		return arrRecipes;
	}

	/* Get a recipe with a given ID
	*/
	pxy.getRecipe = function(id) {
		for (var i in arrRecipes) {
			var r = arrRecipes[i];
			if (r.id === id) return r;
		}
		return null;
	}

	/*
	Updated a recipe with a given ID
	*/
	pxy.setRecipe = function(id, recipe) {
		for (var i = 0, l = arrRecipes.length; i < l; i++) {
			if (arrRecipes[i].id === id) {
				arrRecipes[i] = recipe;
			}
		}
		pxy.dispatchEvent(new Note(Notifications.RECIPE_CHANGE, recipe));
	}

	/*
	Add recipe(s)
	@param arr An array of recipe objects to be added
	@return An array of IDs for the added recipes
	*/
	pxy.addRecipes = function(arr) {
		var arrResult = [];
		for (var i = 0, l = arr.length; i < l; i++) {
			var r = arr[i];
			r.id = KEY++;
			// todo: validate recipe
			arrRecipes.push(r);
			// todo: notifiy new recipe added
			// todo: return id or index
			arrResult.push(r.id);
		}
		pxy.dispatchEvent(new Note(Notifications.RECIPE_ADD, arr));
		return arrResult;
	}

	/*
	Remove recipe(s)
	@param arr An array of recipe objects to be removed
	*/
	pxy.removeRecipes = function(arr) {
		for (var i = 0, l = arr.length; i < l; i++) {
			for (var j = 0, l2 = arrRecipes.length; j < l2; j++) {
				if (arr[i] === arrRecipes[j].id) {
					arrRecipes.splice(j, 1);
					break;
				}
			}
		}
		/*var arrIDs = [];
		for (var i in arr) {
			arrIDs.push(arr[i].rowid);
		}
		var strIDs = arrIDs.join(',');*/
		
		//dbStatement.text = "DELETE FROM recipes WHERE rowid IN (" + strIDs + ")";
		//sendNotification(ApplicationFacade.SQL_START, "Deleting Recipe...");
		//dbStatement.execute(-1, new Responder(updateDBHandler, errorDBHandler));
		pxy.dispatchEvent(new Note(Notifications.RECIPE_REMOVE, arr));
	}

	/////////////
	// Private //
	/////////////

	function sortOnRating(a, b) {
		var aRating = a.rating;
		var bRating = b.rating;
		
		if(aRating > bRating) {
			return 1;
		} else if(aRating < bRating) {
			return -1;
		} else  {
			//aRating == bRating
			return 0;
		}
	}

	function sortOnLabel(a, b) {
		return (a.title > b.title) - (a.title < b.title);
	}

	return pxy;
};var HeaderMediator = function(node) {
	var med = new EventDispatcher();
	var nav = node.find('nav');

	// Display
	var btnAdd = nav.find('.nav-button-add');
	var btnEdit = nav.find('.nav-button-edit');
	var btnDelete = nav.find('.nav-button-delete');
	var btnPrint = nav.find('.nav-button-print');
	var btnImport = nav.find('.nav-button-import');
	var btnExport = nav.find('.nav-button-export');
	
	// Edit
	var btnCancel = nav.find('.nav-button-cancel');
	var btnSave = nav.find('.nav-button-save');
	var btnAddIng = nav.find('.nav-button-add-ing');

	// Init
	node.find('#logo').on('click', onClickLogo);
	btnAdd.on('click', onClickAdd);
	btnEdit.on('click', onClickEdit);
	btnDelete.on('click', onClickDelete);
	btnPrint.on('click', onClickPrint);
	btnImport.on('click', onClickImport);
	btnExport.on('click', onClickExport);
	btnCancel.on('click', onClickCancel);
	btnSave.on('click', onClickSave);
	btnAddIng.on('click', onClickAddIng);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.setScreen = function(screen) {
		if (typeof screen !== 'string') screen = Constants.DISPLAY_SCREEN;

		if (screen === Constants.DISPLAY_SCREEN) {
			nav.removeClass('nav-edit');
			nav.addClass('nav-display');
		} else {
			nav.removeClass('nav-display');
			nav.addClass('nav-edit');
		}
	};

	/*
	Update buttons based on the number of recipes selected
	*/
	med.updateButtons = function(numSelected) {
		if (numSelected < 1) {
			// isNone
			disableButton(btnEdit);
			disableButton(btnDelete);
			disableButton(btnPrint);
			disableButton(btnImport);
			disableButton(btnExport);
		} else if (numSelected > 1) {
			// !isNone && isMulti
			disableButton(btnEdit);
			disableButton(btnExport);
		} else if (numSelected === 1) {
			// !isNone && !isMulti
			enableButton(btnEdit);
			enableButton(btnDelete);
			enableButton(btnPrint);
			enableButton(btnImport);
			enableButton(btnExport);
		} else {
			// disable all except add
			disableButton(btnEdit);
			disableButton(btnDelete);
			disableButton(btnPrint);
			disableButton(btnImport);
			disableButton(btnExport);
		}
	};

	/////////////
	// Private //
	/////////////
	function disableButton(btn) {
		btn.parent().addClass('hidden-w');
	};

	function enableButton(btn) {
		btn.parent().removeClass('hidden-w');
	};

	function onClickAdd(e) {
		med.dispatchEvent(new Note(Notifications.ADD_RECIPE));
	};

	function onClickEdit(e) {
		med.dispatchEvent(new Note(Notifications.EDIT_RECIPE));
	};

	function onClickDelete(e) {
		med.dispatchEvent(new Note(Notifications.DELETE_RECIPE));
	};

	function onClickPrint(e) {
		med.dispatchEvent(new Note(Notifications.PRINT_RECIPE));
	};

	function onClickImport(e) {
		//var allFilter:FileFilter = new FileFilter("All Files", "*.*;");
		//var recipeFilter:FileFilter = new FileFilter("Recipes", "*.rcpe;");
		//fileDir.browseForOpenMultiple("Select a recipe", [recipeFilter, allFilter]);
	};

	function onClickExport(e) {
		//fileRecipe.browseForSave("Save As");
	};

	function onClickCancel(e) {
		med.dispatchEvent(new Note(Notifications.CANCEL_EDIT));
	};

	function onClickSave(e) {
		med.dispatchEvent(new Note(Notifications.SAVE_EDIT));
	};

	function onClickLogo(e) {
		med.dispatchEvent(new Note(Notifications.SHOW_ABOUT));
	};

	function onClickAddIng(e) {
		med.dispatchEvent(new Note(Notifications.ADD_ING));
	}

	return med;
};var EditScreenMediator = function(node) {
	var ulIngredients = node.find('.ingredient-list');
	var txtName = node.find('#recipe-name');
	var ddCategory = node.find('#recipe-category');
	var starRating = new StarRating('#recipe-rating');
	var txtAuthor = node.find('#recipe-author');
	var txtSource = node.find('#recipe-source');
	var txtYields = node.find('#recipe-yields');
	var txtDirections = node.find('#recipe-directions');
	var txtNotes = node.find('#recipe-notes');
	var txtPictureBrowse = node.find('#recipe-image-browse');
	var divPicture = node.find('#recipe-image');
	var med = new EventDispatcher();
	var curRecipe;

	// Add change listeners
	txtName.on('change', onModified);
	ddCategory.on('change', onModified);
	txtAuthor.on('change', onModified);
	txtSource.on('change', onModified);
	txtYields.on('change', onModified);
	txtDirections.on('change', onModified);
	txtNotes.on('change', onModified);
	ulIngredients.on('change', onModified);
	ulIngredients.on('click', onRemoveIngredient);
	starRating.source.on('click', onModified);

	// Init Image Drag-n-Drop
	if (typeof window.FileReader === 'undefined') {
		// Show file browse button
	} else {
		// File API available
		var holder = $('#recipe-image');
		holder.on('dragenter', function(e) {
			$(this).addClass('hover');
			e.preventDefault();
		});
		holder.on('dragover', function(e) {
			e.preventDefault();
		});
		holder.on('dragleave dragend', function(e) {
			$(this).removeClass('hover');
			e.preventDefault();
		});
		holder.on('drop', function(e) {
			$(this).removeClass('hover');
			e.preventDefault();
			med.isModified = true;
			var reader = new FileReader();
			reader.onload = function(event) {
				holder.css('background-image', 'url(' + event.target.result + ') no-repeat center');
			};
			reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
		});
	};

	////////////
	// Public //
	////////////
	med.reset = function() {
		ulIngredients.empty();
		txtName.val('');
		ddCategory.val(1);
		starRating.setStars(1);
		txtAuthor.val('');
		txtSource.val('');
		txtYields.val('');
		txtDirections.val('');
		txtNotes.val('');
		this.isModified = false;
	};

	med.load = function(recipe) {
		// Is a new recipe
		if (!recipe) {
			med.reset();
			curRecipe = new Recipe();
		} else {
			// Draw ingredients
			var strIng = '';
			for (var i = 0, l = recipe.ingredients.length; i < l; i++) {
				strIng += '<li><input type="text" value="' + unescape(recipe.ingredients[i]) + '" /><button class="recipe-button-remove ingredient-button-remove" title="' + s("REMOVE_ING") + '">' + s("REMOVE_ING") + '</button></li>';
			}
			ulIngredients.html(strIng);

			txtName.val(recipe.title);
			ddCategory.val(recipe.category);
			starRating.setStars(recipe.rating);
			txtAuthor.val(recipe.author);
			txtSource.val(recipe.source);
			txtYields.val(recipe.yields);
			txtDirections.val(recipe.directions);
			txtNotes.val(recipe.notes);
			txtPictureBrowse.val(recipe.picture);
			curRecipe = recipe;
		}
		this.isModified = false;
	};

	med.unload = function() {
		var arr = [];
		var children = ulIngredients[0].getElementsByTagName("input");
		for (var i = 0, l = children.length; i < l; i++) {
			var str = children[i].value;
			if (validateString(str)) arr.push(str);
		}
		curRecipe.ingredients = arr;

		curRecipe.title = txtName.val();
		curRecipe.category = ddCategory.val();
		curRecipe.rating = starRating.getStars();
		curRecipe.author = txtAuthor.val();
		curRecipe.source = txtSource.val();
		curRecipe.yields = txtYields.val();
		curRecipe.directions = txtDirections.val();
		curRecipe.notes = txtNotes.val();

		return curRecipe;
	}

	// Ensure that all required items have some value
	med.validate = function() {
		var children = ulIngredients[0].getElementsByTagName("input");
		if (!validateString(txtName.val())) {
			alert(s("NEED_RECIPE_TITLE"));
			return false;
		}
		if (!validateString(txtDirections.val())) {
			alert(s("NEED_RECIPE_DIR"));
			return false;
		}
		if (children.length <= 0) {
			alert(s("NEED_RECIPE_ING"));
			return false;
		}
		if (!validateString($(children[0]).val())) {
			alert(s("NEED_RECIPE_ING2"));
			return false;
		}
		return true;
	}

	med.addIngredient = function() {
		ulIngredients.append('<li><input type="text" value="" /><button class="recipe-button-remove ingredient-button-remove" title="' + s("REMOVE_ING") + '">' + s("REMOVE_ING") + '</button></li>');
	}

	med.isModified = false;

	/////////////
	// Private //
	/////////////
	function onModified(e) {
		med.isModified = true;
	};

	// Remove the ingredient from the edit screen list
	function onRemoveIngredient(e) {
		var btnRemove = $(e.target);
		if (btnRemove.hasClass('ingredient-button-remove')) {
			var liNode = btnRemove.parent();
			liNode.remove();
			onModified();
		}
	}

	return med;
};var DisplayScreenMediator = function(node) {
	var isSortAZ = true;
	var isSortStar = false;
	var starRatingHolder = node.find('.recipe-rating');
	var starRating = new StarRating('.recipe-rating span');
	var starRatingTemp = new StarRating(null);
	var sortTypeLabel = node.find('#sortTypeLabel');
	var sortStar = node.find('#sortStar');
	var sortType = node.find('#sortType');
	var recipeList = node.find('.recipe-list');
	var recipeImage = node.find('.recipe-detail img');
	var recipeLink = node.find('.recipe-detail a');
	var recipeNote = '';
	var recipeImageURL = '';
	var btnNotes = node.find('#btnNotes');
	var _numSelected = 0;
	var med = new EventDispatcher();
	var _selected = [];

	sortStar.on('click', onClickSort);
	sortType.on('click', onClickSort);
	node.find('#btnRandom').on('click', onClickRandom);
	recipeList.children().on('click', onItemClickList);
	btnNotes.on('click', onClickNote);
	recipeImage.on('click', onClickImage);

	// Init Splitter
	$('#screen-display').split({orientation:'vertical', limit:2, position:'30%'});

	////////////
	// Public //
	////////////

	// Returns selected recipe ID
	med.getSelectedRecipe = function() {
		return _selected.length > 0 ? _selected[0] : null;
	}

	// Selects a recipe in the list by index
	med.selectRecipeAt = function(idx) {
		var liAll = recipeList.children();
		liAll.removeClass('selected');
		_selected = [];

		if (typeof idx === 'number') {
			var li = $(liAll[idx]);
			li.addClass('selected');
			_selected.push(li.data("recipe-id"));
		}
		
		selectRecipe();
	};

	// Selects a recipe in the list by ID
	med.selectRecipeById = function(id) {
		var liAll = recipeList.children();
		liAll.removeClass('selected');
		_selected = [];

		var li = recipeList.find("li[data-recipe-id='" + id + "']");
		if (li) {
			li.addClass('selected');
			_selected.push(li.data("recipe-id"));
		}
		//recipeList.find("li[data-recipe-id='" + id + "']").addClass('selected');
		selectRecipe();
	};
	
	// Return an array of all recipe IDs that are selected
	med.getSelectedRecipes = function() {
		/*var arr = recipeList.find('li.selected').map(function() {
			return $(this).data('recipe-id');
		}).get();
		return arr;*/
		return _selected;
	};

	med.getNumSelected = function() {
		//return _numSelected;
		return _selected.length;
	};

	med.displayRecipe = function(recipe) {
		// Show/hide notes if available
		if (validateString(recipe.notes)) {
			btnNotes.removeClass('hidden-h');
		} else {
			btnNotes.addClass('hidden-h');
		}
		
		// Populate recipe
		var str;
		var recipeDiv = $('#recipe');
		recipeDiv.find('h1').text(recipe.title);
		str = s("COURTESY_OF") + displayString(recipe.author, s("COURTESY_UNKNOWN"));
		if (validateString(recipe.source)) str += ' (' + recipe.source + ')';
		recipeDiv.find('h2').text(str);
		str = recipe.category;
		if (validateString(recipe.yields)) str += s("YIELDS") + recipe.yields;
		recipeDiv.find('h3').text(str);

		// Set rating
		starRating.setStars(recipe.rating);
		
		// Draw ingredients
		var strRecipe = '';
		for (var i = 0, l = recipe.ingredients.length; i < l; i++) {
			strRecipe += '<li>' + unescape(recipe.ingredients[i]) + '</li>';
		}
		recipeDiv.children('ul').html(strRecipe);

		// Set note
		recipeNote = displayString(recipe.notes, '');
		
		// Show Picture
		if (recipe.picture != "" && recipe.picture) {
			recipeImageURL = recipe.picture;
			recipeLink.attr('href', 'img/recipes/' + recipe.picture);
			recipeImage.attr('src', 'img/recipes/' + recipe.picture);
			recipeImage.removeClass('hidden-h');
		} else {
			recipeImageURL = '';
			recipeImage.addClass('hidden-h');
		}
		
		recipeDiv.children('p').text(recipe.directions);
		med.dispatchEvent(new Note(Notifications.SHADOWBOX));
	};

	// expensive
	med.updateList = function(arrRecipes) {
		var strHTML = '';
		for (var i = 0, l = arrRecipes.length; i < l; i++) {
			var r = arrRecipes[i];
			strHTML += '<li data-recipe-id="' + r.id + '">';
			// Create Rating Radiobuttons
			strHTML += '<span class="rating">';
			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-5" name="rating-input-' + i + '" value="5"' + (r.rating == 5 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-5" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-4" name="rating-input-' + i + '" value="4"' + (r.rating == 4 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-4" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-3" name="rating-input-' + i + '" value="3"' + (r.rating == 3 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-3" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-2" name="rating-input-' + i + '" value="2"' + (r.rating == 2 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-2" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-1" name="rating-input-' + i + '" value="1"' + (r.rating == 1 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-1" class="rating-star"></label>';
			strHTML += '</span>';
			strHTML += '<p>' + r.title + '</p>';
			strHTML += '</li>';
		}
		
		recipeList.children().off('click', onItemClickList);
		recipeList.html(strHTML);
		recipeList.children().on('click', onItemClickList);
	};

	med.updateSelected = function(recipe) {
		var selected = $(recipeList.find('li.selected')[0]);
		starRatingTemp.source = selected.find('.rating');
		starRatingTemp.setStars(recipe.rating);

		selected.find('p').text(recipe.title);
	}

	/////////////
	// Private //
	/////////////
	function onClickNote(e) {
		med.dispatchEvent(new Note(Notifications.ALERT, {title:"Notes", icon:Constants.ALERT_INFORMATION, message:recipeNote }));
	};

	function onClickImage(e) {
		med.dispatchEvent(new Note(Notifications.MODAL, recipeImageURL));
	}

	function onClickSort(e) {
		updateSort();
	};

	function onItemClickList(e) {
		if (!e.shiftKey) {
			recipeList.children().removeClass('selected');
			_selected = [];
		}

		$(this).addClass('selected');
		_selected.push($(this).data('recipe-id'));

		selectRecipe();
	};

	function onClickRandom() {
		var li = recipeList.children(),
			l = li.length,
			idx = null;

		if (l > 0) {
			idx = parseInt(l * Math.random());
			if (idx == l) idx = l - 1;
			if (idx < 0) idx = 0;
		}

		med.selectRecipeAt(idx);
	};

	function updateSort() {
		isSortAZ = sortType.is(':checked');
		isSortStar = sortStar.is(':checked');
		
		// Determine Sort Icon
		if (isSortAZ) {
			if (isSortStar) {
				sortTypeLabel.text('1-5');
			} else {
				sortTypeLabel.text('A-Z');
			}
		} else {
			if (isSortStar) {
				sortTypeLabel.text('5-1');
			} else {
				sortTypeLabel.text('Z-A');
			}
		}

		// Sort
		if (isSortAZ) {
			if (isSortStar) {
				med.dispatchEvent(new Note(Notifications.SORT_RATING, Constants.ASCENDING));
			} else {
				med.dispatchEvent(new Note(Notifications.SORT_LABEL, Constants.ASCENDING));
			}
		} else {
			if (isSortStar) {
				med.dispatchEvent(new Note(Notifications.SORT_RATING, Constants.DESCENDING));
			} else {
				med.dispatchEvent(new Note(Notifications.SORT_LABEL, Constants.DESCENDING));
			}
		}
	};

	/*function sortOnRating(a, b) {
		var aRating = a.data.rating;
		var bRating = b.data.rating;
		
		if(aRating > bRating) {
			return 1;
		} else if(aRating < bRating) {
			return -1;
		} else  {
			//aRating == bRating
			return 0;
		}
	}*/

	function displayMessage(msg) {
		btnNotes.addClass('hidden-h');
		recipeImage.addClass('hidden-h');
		
		var recipe = $('#recipe');
		recipe.find('h1').text(msg);
		recipe.find('h2').text('');
		recipe.find('h3').text('');
		recipe.children('ul').html('');
		recipe.children('p').text('');
		starRating.setStars(0);
	};

	function selectRecipe() {
		var startY = 0;
		var arrRecipes = med.getSelectedRecipes();
		_numSelected = arrRecipes.length;

		var isSearch = false;
		
		if (_numSelected < 1) {
			// If no recipe, hide notes button and rating
			btnNotes.addClass('hidden-h');
			starRatingHolder.addClass('hidden-h');
			displayMessage(((isSearch == true) ? s("NO_RECIPE_FOUND") : s("NO_RECIPE_SEL")));
		} else if (_numSelected > 1) {
			// If multiple recipe, hide notes button
			btnNotes.addClass('hidden-h');
			starRatingHolder.addClass('hidden-h');
			displayMessage(s("MULT_RECIPE_SEL"));
		} else {
			starRatingHolder.removeClass('hidden-h');
			btnNotes.removeClass('hidden-h');
			recipeImage.removeClass('hidden-h');
		}

		med.dispatchEvent(new Note(Notifications.CHANGE));
	};

	return med;
};var ModalMediator = function(node) {
	var med = new EventDispatcher();
	var title = node.find('h1');
	var content = node.find('#modal-content');
	var icon = node.find('#modal-icon');
	var btnClose = node.find('.close');

	// Init
	btnClose.on('click', onClickClose);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.init = function(note) {
		title.text(note.title);
		content.html(note.message);
		icon.removeClass();
		if (note.icon !== Constants.ALERT_WARNING &&
			note.icon !== Constants.ALERT_NONE &&
			note.icon !== Constants.ALERT_INFORMATION &&
			note.icon !== Constants.ALERT_ERROR) {
			note.icon = Constants.ALERT_INFORMATION;
		}
		icon.addClass(note.icon);
	};

	med.open = function() {
		node.addClass('open');
	};

	med.close = function() {
		node.removeClass('open');
	};

	/////////////
	// Private //
	/////////////
	function onClickClose(e) {
		med.close();
	}

	return med;
};var ModalImageMediator = function(node) {
	var med = new EventDispatcher();
	var content = node.find('div > div');
	var btnClose = node.find('.close');

	// Init
	btnClose.on('click', onClickClose);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.init = function(url) {
		content.html("<img src='img/recipes/" + url + "'>");
	};

	med.open = function() {
		node.addClass('open');
	};

	med.close = function() {
		node.removeClass('open');
	};

	/////////////
	// Private //
	/////////////
	function onClickClose(e) {
		med.close();
	}

	return med;
};