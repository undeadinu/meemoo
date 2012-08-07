/*! Meemoo.js - v1 - 2012-08-07
* http://meemoo.org/
* https://github.com/meemoo/meemoo/
* Copyright (c) 2012 Forrest Oliphant; Licensed MIT, AGPL 
*/
(function(){"use strict";if(window.Meemoo)return!1;var a={parentWindow:window.opener?window.opener:window.parent?window.parent:void 0,nodeid:undefined,sendThroughParent:!1,connectedTo:[],setInfo:function(b){var c={};b.hasOwnProperty("title")?c.title=b.title:document.title&&(c.title=document.title),b.hasOwnProperty("author")?c.author=b.author:document.getElementsByName("author").length>0&&document.getElementsByName("author")[0].content&&(c.author=document.getElementsByName("author")[0].content),b.hasOwnProperty("description")?c.description=b.description:document.getElementsByName("description").length>0&&document.getElementsByName("description")[0].content&&(c.description=document.getElementsByName("description")[0].content),a.info=c,this.sendParent("info",c);var d=setTimeout(function(){a.stateReadySent||(a.sendParent("stateReady"),a.stateReadySent=!0)},3e3);return a},sendParent:function(b,c){if(this.parentWindow){var d={};d[b]=c?c:b,d.nodeid=a.nodeid,this.parentWindow.postMessage(d,"*")}},send:function(a,b){if(a===undefined||this.connectedTo.length<1)return;b===undefined&&(b=a);var c={};if(this.sendThroughParent)c.output=a,c.value=b,this.sendParent("message",c);else for(var d=0;d<this.connectedTo.length;d++)if(this.connectedTo[d].source[1]===a){c[this.connectedTo[d].target[1]]=b;var e=this.parentWindow.frames[this.connectedTo[d].target[0]];e.postMessage(c,"*")}},set:function(a,b){var c={};c[a]=b,this.sendParent("set",c)},recieve:function(b){var c=b.source===a.parentWindow;for(var d in b.data)a.inputs.hasOwnProperty(d)?a.inputs[d](b.data[d],b):c&&a.frameworkActions.hasOwnProperty(d)&&a.frameworkActions[d](b.data[d],b)},addInput:function(b,c){a.inputs[b]=c.action;var d={};return d.name=b,d.type=c.hasOwnProperty("type")?c.type:"",d.description=c.hasOwnProperty("description")?c.description:"",d.min=c.hasOwnProperty("min")?c.min:"",d.max=c.hasOwnProperty("max")?c.max:"",d.options=c.hasOwnProperty("options")?c.options:"",d["default"]=c.hasOwnProperty("default")?c["default"]:"",c.port!==!1&&this.sendParent("addInput",d),a},stateReadySent:!1,addInputs:function(b){for(var c in b)b.hasOwnProperty(c)&&a.addInput(c,b[c]);return this.sendParent("stateReady"),this.stateReadySent=!0,a},inputs:{},addOutput:function(b,c){return c.connected=!1,a.outputs[b]=c,c.port!==!1&&this.sendParent("addOutput",{name:b,type:c.type}),a},addOutputs:function(b){for(var c in b)b.hasOwnProperty(c)&&a.addOutput(c,b[c]);return a},outputs:{},connected:function(b){return a.outputs.hasOwnProperty(b)&&a.outputs[b].connected},frameworkActions:{connect:function(b){if(!a.outputs.hasOwnProperty(b.source[1]))return!1;for(var c=0;c<a.connectedTo.length;c++){var d=a.connectedTo[c];if(d.source[0]===b.source[0]&&d.source[1]===b.source[1]&&d.target[0]===b.target[0]&&d.target[1]===b.target[1])return!1}a.outputs[b.source[1]].connected=!0,a.connectedTo.push(b)},disconnect:function(b){var c=[];for(var d=0;d<a.connectedTo.length;d++){var e=a.connectedTo[d];(e.source[0]!==b.source[0]||e.source[1]!==b.source[1]||e.target[0]!==b.target[0]||e.target[1]!==b.target[1])&&c.push(e)}var f=0;for(d=0;d<c.length;d++)c[d].source[1]===b.source[1]&&f++;f===0&&(a.outputs[b.source[1]].connected=!1),a.connectedTo=c},getState:function(){var b={};a.sendParent("state",b)},setState:function(b){for(var c in b)a.inputs.hasOwnProperty(c)&&a.inputs[c](b[c])}}};window.addEventListener("message",a.recieve,!1);var b=setTimeout(function(){document.body&&document.getElementById&&(a.info||a.setInfo({}))},2e3),c=function(){if(document.body&&document.getElementById){var a=document.createElement("div");a.innerHTML='<div style="color: #666; background-color:#FFE87C; border: 1px dotted #7d95ff; text-align:center; font-size:15px; padding:20px;">You are looking are a Meemoo module that should be loaded in a Meemoo app.<br />Check out <a href="http://meemoo.org/iframework/">meemoo.org/iframework</a> to see how it works. &lt;3</div>',document.body.appendChild(a)}else setTimeout(c,100)};if(window.name){var d=window.name.split("_"),e=d[1];e=parseInt(e,10),a.nodeid=e;var f=d[d.length-1];f==="through"&&(a.sendThroughParent=!0)}else setTimeout(c,100);window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),window.Meemoo=a})();