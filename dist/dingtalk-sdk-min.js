"use strict";function dingtalkContainer(){return isWeex?"DingTalk"===weexEnv.appName||"com.alibaba.android.rimet"===weexEnv.appName:UA&&UA.indexOf("dingtalk")>-1}function initRequireModule$1(){var e=function(e){var n="@weex-module/"+e;return __weex_require__(n)};return"undefined"!=typeof weex&&(e=weex.requireModule),e}function android_exec(e,n){var i=n.body,t=n.onSuccess,r=n.onFail,o=n.context;e&&"function"==typeof e?e(i,function(e){if(void 0!==e&&e.__status__){var n=e.__status__,i=e.__message__;STATUS_OK===n?t&&t.call(o,i):STATUS_ERROR===n&&r&&r.call(o,i)}else r&&r.call("-1","")}):r&&r.call("-1","")}function ios_exec(e,n){var i=n.body,t=n.onSuccess,r=n.onFail,o=n.context;e&&"function"==typeof e?e(i,function(e){void 0!==e?"0"===e.errorCode?t&&t.call(o,e.result):r&&r.call(o,e.result):r&&r.call("-1","")}):r&&r.call("-1","")}function ios_exec$1(e){var n=window._WebViewJavascriptBridge;if(!n)throw"runtime and bridge are not ready";var i=e.body,t=e.onSuccess,r=e.onFail,o=e.context;n.callHandler("exec",i,function(e){void 0!==e&&("0"===e.errorCode?"function"==typeof t&&t.call(o,e.result):"function"==typeof r&&r.call(o,e.result)),"function"==typeof r&&r.call("-1","")})}function android_exec$1(e){var n=e.body,i=e.onSuccess,t=e.onFail,r=e.context,o=n.plugin,a=n.action,u=n.args;(0,window.WebViewJavascriptBridgeAndroid)(o,a,u,i,t,r)}function runAndroid(){window.WebViewJavascriptBridgeAndroid=window.nuva.require()}function web_exec(e){if(isIOS)window._WebViewJavascriptBridge?ios_exec$1(e):document.addEventListener("_WebViewJavascriptBridgeReady",function(){ios_exec$1(e)},!1);else if(isAndroid){var n=window;n.nuva&&(void 0===n.nuva.isReady||n.nuva.isReady)?(bridgeReady||runAndroid(),android_exec$1(e)):document.addEventListener("runtimeready",function(){bridgeReady||runAndroid(),android_exec$1(e)},!1)}}function exec(e){var n=nativeExec||function(){};"iOS"===platform$2?ios_exec(n,e):"android"===platform$2?android_exec(n,e):web_exec(e)}function toArray(e,n){for(var i=n||0,t=e.length-i,r=new Array(t);t--;)r[t]=e[t+i];return r}function createApi(e,n){return function(i){i||(i={});var t=i.onSuccess,r=i.onFail;delete i.onSuccess,delete i.onFail,delete i.onCancel,exec({body:{plugin:e,action:n,args:i},onSuccess:t,onFail:r})}}function createFuns(e,n){var i=Object.create(null);return n.forEach(function(n){i[n]=createApi(e,n)}),i}function parseJsApis(e){var n=Object.create(null);for(var i in e)for(var t=i.split("."),r=e[i],o=null,a=0,u=t.length;;)if(o){if(u-1===a){o[t[a]]=createFuns(i,r);break}if(o[t[a]])a++;else if(o[t[a]]={},o=o[t[a]],++a>u)break}else{if(1===u){var l=!1,c=n[t[a]],f=createFuns(i,r);for(var s in c)if(c.hasOwnProperty(s)){l=!0;break}if(l)for(var d in f)c[d]=f[d];else n[t[a]]=createFuns(i,r);break}if(n[t[a]]){o=n[t[a]],a++;continue}n[t[a]]={},o=n[t[a]],a++}return n}function rtFunc(e){return function(n){exec({body:{plugin:"runtime",action:e,args:{}},onSuccess:function(e){"function"==typeof n&&n(e)},onFail:function(){},context:null})}}function initDingtalkRequire(e){rtFunc("getModules")(e)}function checkConfigVars(e){var n=Object.keys(e);checks.map(function(e){0===n.filter(function(n){return e===n}).length&&logger.warn("configure : "+e+"is empty")})}function permissionJsApis(e,n,i){if(!n)return void ship.ready(function(){e(null)});ship.ready(function(){var t=ship.apis.runtime.permission,r=n||{},o=i||null;r.onSuccess=function(n){e(null,n)},r.onFail=function(n){"function"==typeof o?o(n):e(n,null)},t.requestJsApis(r)})}function performQueue(){dingtalkQueue&&dingtalkQueue.length>0&&(dingtalkQueue.forEach(function(e){e()}),dingtalkQueue.length=0)}function initDingtalkSDK(){var e={apis:{},config:function(e){function n(n){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}(function(e){if(!e)return void logger.warn("config is undefined,you must configure Dingtalk parameters");"production"!==process.env.NODE_ENV&&checkConfigVars(e),dingtalkJsApisConfig=e}),init:function(){dingtalkQueue=[],ship.init(),ship.ready(function(){isReady=ship.isReady,e.apis=ship.apis?ship.apis:{},performQueue()})},ready:function(e){if(!e||"function"!=typeof e)return void logger.warn("callback is undefined");if(isReady)permissionJsApis(e,dingtalkJsApisConfig,dingtalkErrorCb);else{dingtalkQueue&&dingtalkQueue.push(function(e){return function(){permissionJsApis(e,dingtalkJsApisConfig,dingtalkErrorCb)}}(e))}},error:function(e){"function"==typeof e&&(dingtalkErrorCb=e)},EventEmitter:ship.EventEmitter};return e}function installNativeEvent(e){e.on=function(e,n,i){document.addEventListener(e,n,i)},e.off=function(e,n,i){document.removeEventListener(e,n,i)}}function initWebDingtalkSDK(){var e=initDingtalkSDK();return installNativeEvent(e),e}function installNativeEvent$2(e){e.on=ship.on,e.off=ship.off}function initWeexDingtalkSDK(){var e=initDingtalkSDK();return installNativeEvent$2(e),e}var weexEnv={};if("undefined"!=typeof weex){var config=weex.config,_env=config.env;weexEnv.platform=_env.platform,weexEnv.bundleFrameworkType="Vue","Web"!==weexEnv.platform&&(weexEnv.dingtalk={bundleUrl:config.bundleUrl,originalUrl:config.originalUrl},weexEnv.appVersion=_env.appVersion,weexEnv.appName=_env.appName)}else"function"==typeof callNative?(weexEnv.platform=navigator.platform,weexEnv.appName=navigator.appName):weexEnv.platform="Web",weexEnv.bundleFrameworkType="Rax";var isWeb="Web"===weexEnv.platform,isWeexiOS="iOS"===env.platform,isWeexAndroid="android"===env.platform,isWeex=isWeexiOS||isWeexAndroid,UA=void 0;isWeb&&(UA=window.navigator.userAgent.toLowerCase()),weexEnv.isDingtalk=dingtalkContainer();var weexEnvVar={env:weexEnv,requireModule:initRequireModule$1()},STATUS_OK="1",STATUS_ERROR="2",platform$3=weexEnvVar.env.platform,isAndroid=null,isIOS=null,bridgeReady=!1;if("Web"===platform$3){var UA$1=window.navigator.userAgent.toLowerCase();isAndroid=UA$1&&UA$1.indexOf("android")>-1,isIOS=UA$1&&/iphone|ipad|ipod|ios/.test(UA$1)}var platform$2=weexEnvVar.env.platform,nativeExec=null;"Web"!==platform$2&&(nativeExec=weexEnvVar.requireModule("nuvajs-exec").exec);var cat={},EventEmitter={on:function(e,n){var i=cat[e];i?i.push(n):cat[e]=[],i||cat[e].push(n)},off:function(e,n){var i=cat[e];if(!i)return!1;if(!e&&!n)return cat={},!0;if(e&&!n)return cat[e]=null,!0;for(var t=void 0,r=i.length;r--;)if((t=i[r])===n||t.fun===n){i.splice(r,1);break}return!0},once:function(e,n){function i(){EventEmitter.off(e,i),n.apply(this,arguments)}i.fun=n,EventEmitter.on(e,i)},emit:function(e){if("string"==typeof e){var n=cat[e],i=toArray(arguments,1);if(n)for(var t=0,r=n.length;t<r;t++){var o=n[t];o.apply(this,i)}}}},platform$1=weexEnvVar.env.platform,globalEvent={};"Web"!==platform$1&&(globalEvent=weexEnvVar.requireModule("globalEvent"));var ship={getModules:null,isReady:!1,runtime:{info:rtFunc("info"),_interceptBackButton:rtFunc("interceptBackButton"),_interceptNavTitle:rtFunc("interceptNavTitle"),_recoverNavTitle:rtFunc("recoverNavTitle"),_getModules:rtFunc("getModules")},init:function(){initDingtalkRequire(function(e){e&&(ship.isReady=!0,ship.apis=parseJsApis(e),EventEmitter.emit("__ship_ready__"))})},ready:function(e){ship.isReady?"function"==typeof e&&e():"function"==typeof e&&EventEmitter.once("__ship_ready__",function(){e()})},on:function(e,n){globalEvent.addEventListener(e,function(e){var i={preventDefault:function(){console.warn("当前环境不支持 preventDefault")},detail:e};n.call(this,i)})},off:globalEvent.removeEventListener,EventEmitter:EventEmitter},logger={warn:function(e,n){if(console.warn("[DINGTALK JS SDK Warning]:",e),n)throw n;var i=new Error("WARNING STACK TRACE");console.warn(i.stack)},info:function(e){console.info("[DINGTALK JS SDK INFO]:",e)},error:function(e){console.error("[DINGTALK JS SDK ERROR]:",e)}},checks=["agentId","corpId","timeStamp","nonceStr","signature","jsApiList"],dingtalkJsApisConfig=null,dingtalkQueue=null,dingtalkErrorCb=null,isReady=!1,initCtrl=!0,platform=weexEnvVar.env.platform,isDingtalk=weexEnvVar.env.isDingtalk,dingtalkSDK={};if(isDingtalk||logger.warn("can only open the page be Dingtalk Container"),initCtrl){switch(initCtrl=!1,platform){case"Web":dingtalkSDK=initWebDingtalkSDK();break;default:dingtalkSDK=initWeexDingtalkSDK()}dingtalkSDK.init()}var dingtalkSDK$1=dingtalkSDK;module.exports=dingtalkSDK$1;
//# sourceMappingURL=dingtalk-sdk-min.js.map
