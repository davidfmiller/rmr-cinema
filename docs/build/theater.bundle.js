!function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,i){!function(){"use strict";window.Theater=i(1)}()},function(t,e){!function(){var e=function(t,e){var i={},n=void 0;for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);if(!e)return i;for(n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i},i=function(t){this.options=e({debug:!1},t);var i=!1,n=this;this.parent="string"==typeof t.node?document.querySelector(t.node):t.node;var o=this.options.hasOwnProperty("aspect")?this.options.aspect:16/9,r={load:function(){n.options.debug&&console.log("video loaded")}};if(this.video=this.parent?document.createElement("video"):null,!this.video)throw new Error("Invalid root in Theater constructor");this.parent.classList.add("vw-theater-root"),this.video.addEventListener("loadeddata",function(){r.load(),i=!0,n.parent.classList.add("vw-theater-loaded")}),this.video.addEventListener("play",function(){i=!0}),this.video.addEventListener("pause",function(){i=!1});var s=document.createElement("div");s.classList.add("vw-theater-curtains");var d=e({muted:"muted",loop:"loop",autoplay:"autoplay",preload:"auto"},t.attrs);for(var a in d)d.hasOwnProperty(a)&&this.video.setAttribute(a,d[a]);document.body.classList.add("vw-theater");var h=function(){var t=window.getComputedStyle(n.parent),e={width:n.options.resize?window.innerWidth:parseInt(t.width,10),height:n.options.resize?window.innerHeight:parseInt(t.height,10)};console.log(o,e.width/e.height),e.width/e.height>o?(n.video.style.width=e.width+"px",n.video.style.height=""):(n.video.style.height=e.height+"px",n.video.style.width=""),n.options.debug&&console.log("resized video to "+JSON.stringify(e))};h(),t.resize&&window.addEventListener("resize",function(){h()}),window.addEventListener("blur",function(){n.video.pause()}),window.addEventListener("focus",function(){n.video.play()}),this.parent.insertBefore(this.video,this.parent.childNodes[0]),this.parent.insertBefore(s,this.parent.childNodes[0]),this.load=function(t){var e=arguments.length>0?t:this.options.sources;for(var i in e)if(e.hasOwnProperty(i)){var n=document.createElement("source");n.setAttribute("type",i),n.setAttribute("src",e[i]),this.video.appendChild(n)}return this},this.playPause=function(){return n.options.debug&&console.log("toggling play/pause"),i?this.video.pause():this.video.play(),this},this.on=function(t,e){return r[t]=e,this},this.toString=function(){return JSON.stringify({parent:this.parent,options:n.options})},this.destroy=function(){for(;this.parent.childNodes.length>0;)this.parent.removeChild(this.parent.childNodes[0]);this.options=this.video=this.parent=null}};t.exports=i}()}]);