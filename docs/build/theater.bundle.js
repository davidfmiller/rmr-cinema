!function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,i){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,o){!function(){"use strict";window.Theater=o(1)}()},function(t,e){!function(){var e=function(t,e){var o={},i=void 0;for(i in t)t.hasOwnProperty(i)&&(o[i]=t[i]);if(!e)return o;for(i in e)e.hasOwnProperty(i)&&(o[i]=e[i]);return o},o=function(t){this.options=e({debug:!1},t);var o=!1,i=this;this.parent="string"==typeof t.node?document.querySelector(t.node):t.node;var n=this.options.hasOwnProperty("aspect")?this.options.aspect:16/9,r={load:function(){i.options.debug&&console.log("video loaded")}};if(this.video=this.parent?document.createElement("video"):null,!this.video)throw new Error("Invalid root in Theater constructor");this.parent.classList.add("vw-theater-root"),this.video.addEventListener("loadeddata",function(){r.load(),o=!0,i.parent.classList.add("vw-theater-loaded")}),this.video.addEventListener("play",function(){console.log("play!!"),o=!0}),this.video.addEventListener("pause",function(){console.log("pause!!"),o=!1});var s=document.createElement("div");s.classList.add("vw-theater-curtains");var d=e({muted:"muted",loop:"loop",autoplay:"autoplay",preload:"auto"},t.attrs);for(var a in d)d.hasOwnProperty(a)&&this.video.setAttribute(a,d[a]);document.body.classList.add("vw-theater");var u=function(){var t=window.getComputedStyle(i.parent),e={width:i.options.resize?window.innerWidth:parseInt(t.width,10),height:i.options.resize?window.innerHeight:parseInt(t.width,10)};e.width/e.height>n?(i.video.style.width=e.width+"px",i.video.style.height=""):(i.video.style.height=e.height+"px",i.video.style.width=""),i.options.debug&&console.log("resized video to "+JSON.stringify(e))};u(),t.resize&&window.addEventListener("resize",function(){u()}),window.addEventListener("blur",function(){i.video.pause()}),window.addEventListener("focus",function(){i.video.play()}),this.parent.insertBefore(this.video,this.parent.childNodes[0]),this.parent.insertBefore(s,this.parent.childNodes[0]),this.load=function(t){if(arguments.length>0)return void this.video.setAttribute("src",t);for(var e in this.options.sources)if(this.options.sources.hasOwnProperty(e)){var o=document.createElement("source");o.setAttribute("type",e),o.setAttribute("src",this.options.sources[e]),this.video.appendChild(o)}return this},this.playPause=function(){return i.options.debug&&console.log("toggling play/pause"),o?this.video.pause():this.video.play(),this},this.on=function(t,e){return r[t]=e,this},this.toString=function(){return JSON.stringify({parent:this.parent,options:i.options})}};t.exports=o}()}]);