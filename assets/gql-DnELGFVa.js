var yt=Object.defineProperty;var Ne=t=>{throw TypeError(t)};var gt=(t,e,s)=>e in t?yt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var we=(t,e,s)=>gt(t,typeof e!="symbol"?e+"":e,s),Se=(t,e,s)=>e.has(t)||Ne("Cannot "+s);var n=(t,e,s)=>(Se(t,e,"read from private field"),s?s.call(t):e.get(t)),d=(t,e,s)=>e.has(t)?Ne("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),u=(t,e,s,r)=>(Se(t,e,"write to private field"),r?r.call(t,s):e.set(t,s),s),y=(t,e,s)=>(Se(t,e,"access private method"),s);import{a as U,p as vt}from"./chunk-EPOLDU6W-BUbbWhPN.js";var $e=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},bt={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)},M,ke,Xe,wt=(Xe=class{constructor(){d(this,M,bt);d(this,ke,!1)}setTimeoutProvider(t){u(this,M,t)}setTimeout(t,e){return n(this,M).setTimeout(t,e)}clearTimeout(t){n(this,M).clearTimeout(t)}setInterval(t,e){return n(this,M).setInterval(t,e)}clearInterval(t){n(this,M).clearInterval(t)}},M=new WeakMap,ke=new WeakMap,Xe),V=new wt;function Pt(t){setTimeout(t,0)}var te=typeof window>"u"||"Deno"in globalThis;function pe(){}function ps(t,e){return typeof t=="function"?t(e):t}function Ce(t){return typeof t=="number"&&t>=0&&t!==1/0}function it(t,e){return Math.max(t+(e||0)-Date.now(),0)}function se(t,e){return typeof t=="function"?t(e):t}function _(t,e){return typeof t=="function"?t(e):t}function fs(t,e){const{type:s="all",exact:r,fetchStatus:i,predicate:a,queryKey:c,stale:o}=t;if(c){if(r){if(e.queryHash!==St(c,e.options))return!1}else if(!Ge(e.queryKey,c))return!1}if(s!=="all"){const g=e.isActive();if(s==="active"&&!g||s==="inactive"&&g)return!1}return!(typeof o=="boolean"&&e.isStale()!==o||i&&i!==e.state.fetchStatus||a&&!a(e))}function ms(t,e){const{exact:s,status:r,predicate:i,mutationKey:a}=t;if(a){if(!e.options.mutationKey)return!1;if(s){if(Re(e.options.mutationKey)!==Re(a))return!1}else if(!Ge(e.options.mutationKey,a))return!1}return!(r&&e.state.status!==r||i&&!i(e))}function St(t,e){return((e==null?void 0:e.queryKeyHashFn)||Re)(t)}function Re(t){return JSON.stringify(t,(e,s)=>De(s)?Object.keys(s).sort().reduce((r,i)=>(r[i]=s[i],r),{}):s)}function Ge(t,e){return t===e?!0:typeof t!=typeof e?!1:t&&e&&typeof t=="object"&&typeof e=="object"?Object.keys(e).every(s=>Ge(t[s],e[s])):!1}var Ct=Object.prototype.hasOwnProperty;function at(t,e,s=0){if(t===e)return t;if(s>500)return e;const r=Ve(t)&&Ve(e);if(!r&&!(De(t)&&De(e)))return e;const a=(r?t:Object.keys(t)).length,c=r?e:Object.keys(e),o=c.length,g=r?new Array(o):{};let v=0;for(let P=0;P<o;P++){const p=r?P:c[P],S=t[p],m=e[p];if(S===m){g[p]=S,(r?P<a:Ct.call(t,p))&&v++;continue}if(S===null||m===null||typeof S!="object"||typeof m!="object"){g[p]=m;continue}const I=at(S,m,s+1);g[p]=I,I===S&&v++}return a===o&&v===a?t:g}function Ie(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const s in t)if(t[s]!==e[s])return!1;return!0}function Ve(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function De(t){if(!We(t))return!1;const e=t.constructor;if(e===void 0)return!0;const s=e.prototype;return!(!We(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(t)!==Object.prototype)}function We(t){return Object.prototype.toString.call(t)==="[object Object]"}function Rt(t){return new Promise(e=>{V.setTimeout(e,t)})}function Ee(t,e,s){return typeof s.structuralSharing=="function"?s.structuralSharing(t,e):s.structuralSharing!==!1?at(t,e):e}function ys(t){return t}function gs(t,e,s=0){const r=[...t,e];return s&&r.length>s?r.slice(1):r}function vs(t,e,s=0){const r=[e,...t];return s&&r.length>s?r.slice(0,-1):r}var ot=Symbol();function It(t,e){return!t.queryFn&&(e!=null&&e.initialPromise)?()=>e.initialPromise:!t.queryFn||t.queryFn===ot?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function ut(t,e){return typeof t=="function"?t(...e):!!t}function bs(t,e,s){let r=!1,i;return Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(i??(i=e()),r||(r=!0,i.aborted?s():i.addEventListener("abort",s,{once:!0})),i)}),t}var W,z,ne,et,Dt=(et=class extends $e{constructor(){super();d(this,W);d(this,z);d(this,ne);u(this,ne,e=>{if(!te&&window.addEventListener){const s=()=>e();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){n(this,z)||this.setEventListener(n(this,ne))}onUnsubscribe(){var e;this.hasListeners()||((e=n(this,z))==null||e.call(this),u(this,z,void 0))}setEventListener(e){var s;u(this,ne,e),(s=n(this,z))==null||s.call(this),u(this,z,e(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(e){n(this,W)!==e&&(u(this,W,e),this.onFocus())}onFocus(){const e=this.isFocused();this.listeners.forEach(s=>{s(e)})}isFocused(){var e;return typeof n(this,W)=="boolean"?n(this,W):((e=globalThis.document)==null?void 0:e.visibilityState)!=="hidden"}},W=new WeakMap,z=new WeakMap,ne=new WeakMap,et),ct=new Dt;function Oe(){let t,e;const s=new Promise((i,a)=>{t=i,e=a});s.status="pending",s.catch(()=>{});function r(i){Object.assign(s,i),delete s.resolve,delete s.reject}return s.resolve=i=>{r({status:"fulfilled",value:i}),t(i)},s.reject=i=>{r({status:"rejected",reason:i}),e(i)},s}var Et=Pt;function Ot(){let t=[],e=0,s=o=>{o()},r=o=>{o()},i=Et;const a=o=>{e?t.push(o):i(()=>{s(o)})},c=()=>{const o=t;t=[],o.length&&i(()=>{r(()=>{o.forEach(g=>{s(g)})})})};return{batch:o=>{let g;e++;try{g=o()}finally{e--,e||c()}return g},batchCalls:o=>(...g)=>{a(()=>{o(...g)})},schedule:a,setNotifyFunction:o=>{s=o},setBatchNotifyFunction:o=>{r=o},setScheduler:o=>{i=o}}}var Me=Ot(),re,L,ie,tt,Tt=(tt=class extends $e{constructor(){super();d(this,re,!0);d(this,L);d(this,ie);u(this,ie,e=>{if(!te&&window.addEventListener){const s=()=>e(!0),r=()=>e(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",r)}}})}onSubscribe(){n(this,L)||this.setEventListener(n(this,ie))}onUnsubscribe(){var e;this.hasListeners()||((e=n(this,L))==null||e.call(this),u(this,L,void 0))}setEventListener(e){var s;u(this,ie,e),(s=n(this,L))==null||s.call(this),u(this,L,e(this.setOnline.bind(this)))}setOnline(e){n(this,re)!==e&&(u(this,re,e),this.listeners.forEach(r=>{r(e)}))}isOnline(){return n(this,re)}},re=new WeakMap,L=new WeakMap,ie=new WeakMap,tt),lt=new Tt;function Ft(t){return Math.min(1e3*2**t,3e4)}function ht(t){return(t??"online")==="online"?lt.isOnline():!0}var Te=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function At(t){let e=!1,s=0,r;const i=Oe(),a=()=>i.status!=="pending",c=w=>{var b;if(!a()){const C=new Te(w);S(C),(b=t.onCancel)==null||b.call(t,C)}},o=()=>{e=!0},g=()=>{e=!1},v=()=>ct.isFocused()&&(t.networkMode==="always"||lt.isOnline())&&t.canRun(),P=()=>ht(t.networkMode)&&t.canRun(),p=w=>{a()||(r==null||r(),i.resolve(w))},S=w=>{a()||(r==null||r(),i.reject(w))},m=()=>new Promise(w=>{var b;r=C=>{(a()||v())&&w(C)},(b=t.onPause)==null||b.call(t)}).then(()=>{var w;r=void 0,a()||(w=t.onContinue)==null||w.call(t)}),I=()=>{if(a())return;let w;const b=s===0?t.initialPromise:void 0;try{w=b??t.fn()}catch(C){w=Promise.reject(C)}Promise.resolve(w).then(p).catch(C=>{var $;if(a())return;const T=t.retry??(te?0:3),x=t.retryDelay??Ft,l=typeof x=="function"?x(s,C):x,B=T===!0||typeof T=="number"&&s<T||typeof T=="function"&&T(s,C);if(e||!B){S(C);return}s++,($=t.onFail)==null||$.call(t,s,C),Rt(l).then(()=>v()?void 0:m()).then(()=>{e?S(C):I()})})};return{promise:i,status:()=>i.status,cancel:c,continue:()=>(r==null||r(),i),cancelRetry:o,continueRetry:g,canStart:P,start:()=>(P()?I():m().then(I),i)}}var K,st,_t=(st=class{constructor(){d(this,K)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Ce(this.gcTime)&&u(this,K,V.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(te?1/0:300*1e3))}clearGcTimeout(){n(this,K)&&(V.clearTimeout(n(this,K)),u(this,K,void 0))}},K=new WeakMap,st),Y,ae,A,H,R,fe,J,j,q,nt,ws=(nt=class extends _t{constructor(e){super();d(this,j);d(this,Y);d(this,ae);d(this,A);d(this,H);d(this,R);d(this,fe);d(this,J);u(this,J,!1),u(this,fe,e.defaultOptions),this.setOptions(e.options),this.observers=[],u(this,H,e.client),u(this,A,n(this,H).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,u(this,Y,Ye(this.options)),this.state=e.state??n(this,Y),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var e;return(e=n(this,R))==null?void 0:e.promise}setOptions(e){if(this.options={...n(this,fe),...e},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const s=Ye(this.options);s.data!==void 0&&(this.setState(Ke(s.data,s.dataUpdatedAt)),u(this,Y,s))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&n(this,A).remove(this)}setData(e,s){const r=Ee(this.state.data,e,this.options);return y(this,j,q).call(this,{data:r,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),r}setState(e,s){y(this,j,q).call(this,{type:"setState",state:e,setStateOptions:s})}cancel(e){var r,i;const s=(r=n(this,R))==null?void 0:r.promise;return(i=n(this,R))==null||i.cancel(e),s?s.then(pe).catch(pe):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(n(this,Y))}isActive(){return this.observers.some(e=>_(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===ot||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(e=>se(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!it(this.state.dataUpdatedAt,e)}onFocus(){var s;const e=this.observers.find(r=>r.shouldFetchOnWindowFocus());e==null||e.refetch({cancelRefetch:!1}),(s=n(this,R))==null||s.continue()}onOnline(){var s;const e=this.observers.find(r=>r.shouldFetchOnReconnect());e==null||e.refetch({cancelRefetch:!1}),(s=n(this,R))==null||s.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),n(this,A).notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(s=>s!==e),this.observers.length||(n(this,R)&&(n(this,J)?n(this,R).cancel({revert:!0}):n(this,R).cancelRetry()),this.scheduleGc()),n(this,A).notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||y(this,j,q).call(this,{type:"invalidate"})}async fetch(e,s){var g,v,P,p,S,m,I,w,b,C,T,x;if(this.state.fetchStatus!=="idle"&&((g=n(this,R))==null?void 0:g.status())!=="rejected"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(n(this,R))return n(this,R).continueRetry(),n(this,R).promise}if(e&&this.setOptions(e),!this.options.queryFn){const l=this.observers.find(B=>B.options.queryFn);l&&this.setOptions(l.options)}const r=new AbortController,i=l=>{Object.defineProperty(l,"signal",{enumerable:!0,get:()=>(u(this,J,!0),r.signal)})},a=()=>{const l=It(this.options,s),$=(()=>{const Pe={client:n(this,H),queryKey:this.queryKey,meta:this.meta};return i(Pe),Pe})();return u(this,J,!1),this.options.persister?this.options.persister(l,$,this):l($)},o=(()=>{const l={fetchOptions:s,options:this.options,queryKey:this.queryKey,client:n(this,H),state:this.state,fetchFn:a};return i(l),l})();(v=this.options.behavior)==null||v.onFetch(o,this),u(this,ae,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((P=o.fetchOptions)==null?void 0:P.meta))&&y(this,j,q).call(this,{type:"fetch",meta:(p=o.fetchOptions)==null?void 0:p.meta}),u(this,R,At({initialPromise:s==null?void 0:s.initialPromise,fn:o.fetchFn,onCancel:l=>{l instanceof Te&&l.revert&&this.setState({...n(this,ae),fetchStatus:"idle"}),r.abort()},onFail:(l,B)=>{y(this,j,q).call(this,{type:"failed",failureCount:l,error:B})},onPause:()=>{y(this,j,q).call(this,{type:"pause"})},onContinue:()=>{y(this,j,q).call(this,{type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0}));try{const l=await n(this,R).start();if(l===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(l),(m=(S=n(this,A).config).onSuccess)==null||m.call(S,l,this),(w=(I=n(this,A).config).onSettled)==null||w.call(I,l,this.state.error,this),l}catch(l){if(l instanceof Te){if(l.silent)return n(this,R).promise;if(l.revert){if(this.state.data===void 0)throw l;return this.state.data}}throw y(this,j,q).call(this,{type:"error",error:l}),(C=(b=n(this,A).config).onError)==null||C.call(b,l,this),(x=(T=n(this,A).config).onSettled)==null||x.call(T,this.state.data,l,this),l}finally{this.scheduleGc()}}},Y=new WeakMap,ae=new WeakMap,A=new WeakMap,H=new WeakMap,R=new WeakMap,fe=new WeakMap,J=new WeakMap,j=new WeakSet,q=function(e){const s=r=>{switch(e.type){case"failed":return{...r,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...dt(r.data,this.options),fetchMeta:e.meta??null};case"success":const i={...r,...Ke(e.data,e.dataUpdatedAt),dataUpdateCount:r.dataUpdateCount+1,...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return u(this,ae,e.manual?i:void 0),i;case"error":const a=e.error;return{...r,error:a,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...e.state}}};this.state=s(this.state),Me.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),n(this,A).notify({query:this,type:"updated",action:e})})},nt);function dt(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:ht(e.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function Ke(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function Ye(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,s=e!==void 0,r=s?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:s?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var O,h,me,D,Z,oe,k,Q,ye,ue,ce,X,ee,N,le,f,de,Fe,Ae,_e,Ue,je,xe,Be,pt,rt,Ut=(rt=class extends $e{constructor(e,s){super();d(this,f);d(this,O);d(this,h);d(this,me);d(this,D);d(this,Z);d(this,oe);d(this,k);d(this,Q);d(this,ye);d(this,ue);d(this,ce);d(this,X);d(this,ee);d(this,N);d(this,le,new Set);this.options=s,u(this,O,e),u(this,Q,null),u(this,k,Oe()),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(n(this,h).addObserver(this),He(n(this,h),this.options)?y(this,f,de).call(this):this.updateResult(),y(this,f,Ue).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return qe(n(this,h),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return qe(n(this,h),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,y(this,f,je).call(this),y(this,f,xe).call(this),n(this,h).removeObserver(this)}setOptions(e){const s=this.options,r=n(this,h);if(this.options=n(this,O).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof _(this.options.enabled,n(this,h))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");y(this,f,Be).call(this),n(this,h).setOptions(this.options),s._defaulted&&!Ie(this.options,s)&&n(this,O).getQueryCache().notify({type:"observerOptionsUpdated",query:n(this,h),observer:this});const i=this.hasListeners();i&&Je(n(this,h),r,this.options,s)&&y(this,f,de).call(this),this.updateResult(),i&&(n(this,h)!==r||_(this.options.enabled,n(this,h))!==_(s.enabled,n(this,h))||se(this.options.staleTime,n(this,h))!==se(s.staleTime,n(this,h)))&&y(this,f,Fe).call(this);const a=y(this,f,Ae).call(this);i&&(n(this,h)!==r||_(this.options.enabled,n(this,h))!==_(s.enabled,n(this,h))||a!==n(this,N))&&y(this,f,_e).call(this,a)}getOptimisticResult(e){const s=n(this,O).getQueryCache().build(n(this,O),e),r=this.createResult(s,e);return xt(this,r)&&(u(this,D,r),u(this,oe,this.options),u(this,Z,n(this,h).state)),r}getCurrentResult(){return n(this,D)}trackResult(e,s){return new Proxy(e,{get:(r,i)=>(this.trackProp(i),s==null||s(i),i==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&n(this,k).status==="pending"&&n(this,k).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(r,i))})}trackProp(e){n(this,le).add(e)}getCurrentQuery(){return n(this,h)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const s=n(this,O).defaultQueryOptions(e),r=n(this,O).getQueryCache().build(n(this,O),s);return r.fetch().then(()=>this.createResult(r,s))}fetch(e){return y(this,f,de).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),n(this,D)))}createResult(e,s){var Le;const r=n(this,h),i=this.options,a=n(this,D),c=n(this,Z),o=n(this,oe),v=e!==r?e.state:n(this,me),{state:P}=e;let p={...P},S=!1,m;if(s._optimisticResults){const F=this.hasListeners(),he=!F&&He(e,s),ge=F&&Je(e,r,s,i);(he||ge)&&(p={...p,...dt(P.data,e.options)}),s._optimisticResults==="isRestoring"&&(p.fetchStatus="idle")}let{error:I,errorUpdatedAt:w,status:b}=p;m=p.data;let C=!1;if(s.placeholderData!==void 0&&m===void 0&&b==="pending"){let F;a!=null&&a.isPlaceholderData&&s.placeholderData===(o==null?void 0:o.placeholderData)?(F=a.data,C=!0):F=typeof s.placeholderData=="function"?s.placeholderData((Le=n(this,ce))==null?void 0:Le.state.data,n(this,ce)):s.placeholderData,F!==void 0&&(b="success",m=Ee(a==null?void 0:a.data,F,s),S=!0)}if(s.select&&m!==void 0&&!C)if(a&&m===(c==null?void 0:c.data)&&s.select===n(this,ye))m=n(this,ue);else try{u(this,ye,s.select),m=s.select(m),m=Ee(a==null?void 0:a.data,m,s),u(this,ue,m),u(this,Q,null)}catch(F){u(this,Q,F)}n(this,Q)&&(I=n(this,Q),m=n(this,ue),w=Date.now(),b="error");const T=p.fetchStatus==="fetching",x=b==="pending",l=b==="error",B=x&&T,$=m!==void 0,G={status:b,fetchStatus:p.fetchStatus,isPending:x,isSuccess:b==="success",isError:l,isInitialLoading:B,isLoading:B,data:m,dataUpdatedAt:p.dataUpdatedAt,error:I,errorUpdatedAt:w,failureCount:p.fetchFailureCount,failureReason:p.fetchFailureReason,errorUpdateCount:p.errorUpdateCount,isFetched:p.dataUpdateCount>0||p.errorUpdateCount>0,isFetchedAfterMount:p.dataUpdateCount>v.dataUpdateCount||p.errorUpdateCount>v.errorUpdateCount,isFetching:T,isRefetching:T&&!x,isLoadingError:l&&!$,isPaused:p.fetchStatus==="paused",isPlaceholderData:S,isRefetchError:l&&$,isStale:ze(e,s),refetch:this.refetch,promise:n(this,k),isEnabled:_(s.enabled,e)!==!1};if(this.options.experimental_prefetchInRender){const F=G.data!==void 0,he=G.status==="error"&&!F,ge=be=>{he?be.reject(G.error):F&&be.resolve(G.data)},Qe=()=>{const be=u(this,k,G.promise=Oe());ge(be)},ve=n(this,k);switch(ve.status){case"pending":e.queryHash===r.queryHash&&ge(ve);break;case"fulfilled":(he||G.data!==ve.value)&&Qe();break;case"rejected":(!he||G.error!==ve.reason)&&Qe();break}}return G}updateResult(){const e=n(this,D),s=this.createResult(n(this,h),this.options);if(u(this,Z,n(this,h).state),u(this,oe,this.options),n(this,Z).data!==void 0&&u(this,ce,n(this,h)),Ie(s,e))return;u(this,D,s);const r=()=>{if(!e)return!0;const{notifyOnChangeProps:i}=this.options,a=typeof i=="function"?i():i;if(a==="all"||!a&&!n(this,le).size)return!0;const c=new Set(a??n(this,le));return this.options.throwOnError&&c.add("error"),Object.keys(n(this,D)).some(o=>{const g=o;return n(this,D)[g]!==e[g]&&c.has(g)})};y(this,f,pt).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&y(this,f,Ue).call(this)}},O=new WeakMap,h=new WeakMap,me=new WeakMap,D=new WeakMap,Z=new WeakMap,oe=new WeakMap,k=new WeakMap,Q=new WeakMap,ye=new WeakMap,ue=new WeakMap,ce=new WeakMap,X=new WeakMap,ee=new WeakMap,N=new WeakMap,le=new WeakMap,f=new WeakSet,de=function(e){y(this,f,Be).call(this);let s=n(this,h).fetch(this.options,e);return e!=null&&e.throwOnError||(s=s.catch(pe)),s},Fe=function(){y(this,f,je).call(this);const e=se(this.options.staleTime,n(this,h));if(te||n(this,D).isStale||!Ce(e))return;const r=it(n(this,D).dataUpdatedAt,e)+1;u(this,X,V.setTimeout(()=>{n(this,D).isStale||this.updateResult()},r))},Ae=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(n(this,h)):this.options.refetchInterval)??!1},_e=function(e){y(this,f,xe).call(this),u(this,N,e),!(te||_(this.options.enabled,n(this,h))===!1||!Ce(n(this,N))||n(this,N)===0)&&u(this,ee,V.setInterval(()=>{(this.options.refetchIntervalInBackground||ct.isFocused())&&y(this,f,de).call(this)},n(this,N)))},Ue=function(){y(this,f,Fe).call(this),y(this,f,_e).call(this,y(this,f,Ae).call(this))},je=function(){n(this,X)&&(V.clearTimeout(n(this,X)),u(this,X,void 0))},xe=function(){n(this,ee)&&(V.clearInterval(n(this,ee)),u(this,ee,void 0))},Be=function(){const e=n(this,O).getQueryCache().build(n(this,O),this.options);if(e===n(this,h))return;const s=n(this,h);u(this,h,e),u(this,me,e.state),this.hasListeners()&&(s==null||s.removeObserver(this),e.addObserver(this))},pt=function(e){Me.batch(()=>{e.listeners&&this.listeners.forEach(s=>{s(n(this,D))}),n(this,O).getQueryCache().notify({query:n(this,h),type:"observerResultsUpdated"})})},rt);function jt(t,e){return _(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&e.retryOnMount===!1)}function He(t,e){return jt(t,e)||t.state.data!==void 0&&qe(t,e,e.refetchOnMount)}function qe(t,e,s){if(_(e.enabled,t)!==!1&&se(e.staleTime,t)!=="static"){const r=typeof s=="function"?s(t):s;return r==="always"||r!==!1&&ze(t,e)}return!1}function Je(t,e,s,r){return(t!==e||_(r.enabled,t)===!1)&&(!s.suspense||t.state.status!=="error")&&ze(t,s)}function ze(t,e){return _(e.enabled,t)!==!1&&t.isStaleByTime(se(e.staleTime,t))}function xt(t,e){return!Ie(t.getCurrentResult(),e)}var ft=U.createContext(void 0),Bt=t=>{const e=U.useContext(ft);if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Ps=({client:t,children:e})=>(U.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),vt.jsx(ft.Provider,{value:t,children:e})),mt=U.createContext(!1),qt=()=>U.useContext(mt);mt.Provider;function kt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var $t=U.createContext(kt()),Gt=()=>U.useContext($t),Mt=(t,e,s)=>{const r=s!=null&&s.state.error&&typeof t.throwOnError=="function"?ut(t.throwOnError,[s.state.error,s]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||r)&&(e.isReset()||(t.retryOnMount=!1))},zt=t=>{U.useEffect(()=>{t.clearReset()},[t])},Lt=({result:t,errorResetBoundary:e,throwOnError:s,query:r,suspense:i})=>t.isError&&!e.isReset()&&!t.isFetching&&r&&(i&&t.data===void 0||ut(s,[t.error,r])),Qt=t=>{if(t.suspense){const s=i=>i==="static"?i:Math.max(i??1e3,1e3),r=t.staleTime;t.staleTime=typeof r=="function"?(...i)=>s(r(...i)):s(r),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Nt=(t,e)=>t.isLoading&&t.isFetching&&!e,Vt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Ze=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function Wt(t,e,s){var S,m,I,w;const r=qt(),i=Gt(),a=Bt(),c=a.defaultQueryOptions(t);(m=(S=a.getDefaultOptions().queries)==null?void 0:S._experimental_beforeQuery)==null||m.call(S,c);const o=a.getQueryCache().get(c.queryHash);c._optimisticResults=r?"isRestoring":"optimistic",Qt(c),Mt(c,i,o),zt(i);const g=!a.getQueryCache().get(c.queryHash),[v]=U.useState(()=>new e(a,c)),P=v.getOptimisticResult(c),p=!r&&t.subscribed!==!1;if(U.useSyncExternalStore(U.useCallback(b=>{const C=p?v.subscribe(Me.batchCalls(b)):pe;return v.updateResult(),C},[v,p]),()=>v.getCurrentResult(),()=>v.getCurrentResult()),U.useEffect(()=>{v.setOptions(c)},[c,v]),Vt(c,P))throw Ze(c,v,i);if(Lt({result:P,errorResetBoundary:i,throwOnError:c.throwOnError,query:o,suspense:c.suspense}))throw P.error;if((w=(I=a.getDefaultOptions().queries)==null?void 0:I._experimental_afterQuery)==null||w.call(I,c,P),c.experimental_prefetchInRender&&!te&&Nt(P,r)){const b=g?Ze(c,v,i):o==null?void 0:o.promise;b==null||b.catch(pe).finally(()=>{v.updateResult()})}return c.notifyOnChangeProps?P:v.trackResult(P)}function Ss(t,e){return Wt(t,Ut)}const Kt="https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql",Cs="/";async function Rs(t,...[e]){const s=await fetch(Kt,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/graphql-response+json"},body:JSON.stringify({query:t,variables:e})});if(!s.ok)throw new Error("Network response was not ok");return(await s.json()).data}var Yt=(t=>(t.Asc="asc",t.Desc="desc",t))(Yt||{}),Ht=(t=>(t.Freeze="freeze",t.Other="other",t.Reduce="reduce",t))(Ht||{});class E extends String{constructor(s,r){super(s);we(this,"__apiType");we(this,"value");we(this,"__meta__");this.value=s,this.__meta__=r}toString(){return this.value}}const Is=new E(`
    fragment VisualizationProposalBase on Proposal {
  id
  freezeAmount
  reductionAmount
  proposalTypes
  proposers {
    id
    name
    party {
      name
      color
    }
  }
}
    `,{fragmentName:"VisualizationProposalBase"}),Ds=new E(`
    fragment VisualizationProposalWithContext on Proposal {
  ...VisualizationProposalBase
  government {
    name
    category
  }
  year {
    year
  }
}
    fragment VisualizationProposalBase on Proposal {
  id
  freezeAmount
  reductionAmount
  proposalTypes
  proposers {
    id
    name
    party {
      name
      color
    }
  }
}`,{fragmentName:"VisualizationProposalWithContext"}),Jt=new E(`
    query GetLatestBudgetYear($skip: Int!, $take: Int!) {
  budgetYears(orderBy: [{year: desc}], skip: $skip, take: $take) {
    year
    budgetProgress
    dataProgress
  }
}
    `),Zt=new E(`
    query GetBudgetYearsList {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),Xt=new E(`
    query GetBudgetsWithGovernment {
  budgets {
    id
    type
    year
    projectName
    projectDescription
    budgetAmount
    majorCategory
    mediumCategory
    minorCategory
    description
    government {
      id
      name
      category
    }
  }
  budgetsCount
}
    `),es=new E(`
    query GetGovernments {
  governments {
    id
    name
    category
    description
  }
}
    `),ts=new E(`
    query GetPeopleList {
  peopleList(orderBy: [{name: asc}]) {
    id
    name
    type
    description
    party {
      id
      name
    }
  }
}
    `),ss=new E(`
    query RecognitionImages {
  recognitionImages(where: {verificationStatus: {equals: "verified"}}) {
    result
  }
  recognitionImagesCount
}
    `),ns=new E(`
    query People($where: PeopleWhereUniqueInput!) {
  people(where: $where) {
    id
    name
    description
    party {
      id
      color
      name
    }
    term {
      termNumber
      id
    }
    termCount
    committees {
      id
      name
      session
      term {
        id
        startDate
        termNumber
      }
    }
  }
}
    `),rs=new E(`
    query GetProposalsOrderedByIdDesc {
  proposals(orderBy: [{id: desc}]) {
    id
    description
    reason
    publishStatus
    result
    freezeAmount
    reductionAmount
    budgetImageUrl
    proposalTypes
    recognitionAnswer
    unfreezeStatus
    government {
      id
      name
      category
      description
    }
    budget {
      id
      projectName
      budgetAmount
      year
      type
      majorCategory
      mediumCategory
      minorCategory
    }
    proposers {
      id
      name
      type
      description
    }
    coSigners {
      id
      name
      type
    }
  }
  proposalsCount
}
    `),is=new E(`
    query GetProposalById($id: ID!) {
  proposal(where: {id: $id}) {
    id
    description
    reason
    publishStatus
    result
    freezeAmount
    reductionAmount
    budgetImageUrl
    proposalTypes
    recognitionAnswer
    unfreezeStatus
    react_angry
    react_disappoint
    react_good
    react_whatever
    budgetImageUrl
    historicalParentProposals {
      id
    }
    mergedParentProposals {
      id
      proposers {
        id
        name
      }
    }
    historicalProposals {
      id
    }
    government {
      id
      name
      category
      description
    }
    budget {
      id
      projectName
      projectDescription
      budgetAmount
      budgetUrl
      lastYearSettlement
      year
      type
      majorCategory
      mediumCategory
      minorCategory
      description
    }
    proposers {
      id
      name
      type
      description
    }
    coSigners {
      id
      name
      type
    }
    meetings(orderBy: [{meetingDate: desc}]) {
      id
      displayName
      meetingDate
      description
      location
      meetingRecordUrl
      type
      committee {
        displayName
        name
        endDate
        startDate
      }
    }
    mergedProposals {
      id
      proposers {
        id
        name
      }
    }
    historicalProposals {
      id
      meetings {
        id
      }
      proposers {
        id
        name
      }
    }
  }
}
    `),as=new E(`
    query GetProposalYears {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),os=new E(`
    query GetPaginatedProposals($skip: Int!, $take: Int!, $orderBy: [ProposalOrderByInput!]!, $where: ProposalWhereInput!) {
  proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    id
    description
    year {
      id
      year
    }
    meetings {
      id
      type
      committee {
        displayName
        name
        endDate
        startDate
      }
    }
    reason
    result
    freezeAmount
    reductionAmount
    proposalTypes
    react_angry
    react_disappoint
    react_good
    react_whatever
    government {
      id
      name
    }
    budget {
      id
      budgetAmount
    }
    proposers {
      id
      name
    }
  }
  proposalsCount(where: $where)
}
    `),us=new E(`
    mutation UPDATE_PROPOSAL_REACTS($where: ProposalWhereUniqueInput!, $data: ProposalUpdateInput!) {
  updateProposal(where: $where, data: $data) {
    id
    react_angry
    react_disappoint
    react_good
    react_whatever
  }
}
    `),cs=new E(`
    query GetVisualizationProposals($where: ProposalWhereInput!) {
  proposals(where: $where) {
    ...VisualizationProposalWithContext
  }
}
    fragment VisualizationProposalWithContext on Proposal {
  ...VisualizationProposalBase
  government {
    name
    category
  }
  year {
    year
  }
}
fragment VisualizationProposalBase on Proposal {
  id
  freezeAmount
  reductionAmount
  proposalTypes
  proposers {
    id
    name
    party {
      name
      color
    }
  }
}`),ls={"\n  query GetLatestBudgetYear($skip: Int!, $take: Int!) {\n    budgetYears(orderBy: [{ year: desc }], skip: $skip, take: $take) {\n      year\n      budgetProgress\n      dataProgress\n    }\n  }\n":Jt,"\n  query GetBudgetYearsList {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":Zt,"\n  query GetBudgetsWithGovernment {\n    budgets {\n      id\n      type\n      year\n      projectName\n      projectDescription\n      budgetAmount\n      majorCategory\n      mediumCategory\n      minorCategory\n      description\n      government {\n        id\n        name\n        category\n      }\n    }\n    budgetsCount\n  }\n":Xt,"\n  query GetGovernments {\n    governments {\n      id\n      name\n      category\n      description\n    }\n  }\n":es,"\n  query GetPeopleList {\n    peopleList(orderBy: [{ name: asc }]) {\n      id\n      name\n      type\n      description\n      party {\n        id\n        name\n      }\n    }\n  }\n":ts,'\n  query RecognitionImages {\n    recognitionImages(where: { verificationStatus: { equals: "verified" } }) {\n      result\n    }\n    recognitionImagesCount\n  }\n':ss,"\n  query People($where: PeopleWhereUniqueInput!) {\n    people(where: $where) {\n      id\n      name\n      description\n      party {\n        id\n        color\n        name\n      }\n      term {\n        termNumber\n        id\n      }\n      termCount\n      committees {\n        id\n        name\n        session\n        term {\n          id\n          startDate\n          termNumber\n        }\n      }\n    }\n  }\n":ns,"\n  query GetProposalsOrderedByIdDesc {\n    proposals(orderBy: [{ id: desc }]) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        budgetAmount\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n    }\n    proposalsCount\n  }\n":rs,"\n  query GetProposalById($id: ID!) {\n    proposal(where: { id: $id }) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      budgetImageUrl\n      historicalParentProposals {\n        id\n      }\n      mergedParentProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n      }\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        projectDescription\n        budgetAmount\n        budgetUrl\n        lastYearSettlement\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n        description\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n      meetings(orderBy: [{ meetingDate: desc }]) {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      mergedProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n        meetings {\n          id\n        }\n        proposers {\n          id\n          name\n        }\n      }\n    }\n  }\n":is,"\n  query GetProposalYears {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":as,"\n  query GetPaginatedProposals(\n    $skip: Int!\n    $take: Int!\n    $orderBy: [ProposalOrderByInput!]!\n    $where: ProposalWhereInput!\n  ) {\n    proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {\n      id\n      description\n      year {\n        id\n        year\n      }\n      meetings {\n        id\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      reason\n      result\n      freezeAmount\n      reductionAmount\n      proposalTypes\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      government {\n        id\n        name\n      }\n      budget {\n        id\n        budgetAmount\n      }\n      proposers {\n        id\n        name\n      }\n    }\n    proposalsCount(where: $where)\n  }\n":os,"\n  mutation UPDATE_PROPOSAL_REACTS(\n    $where: ProposalWhereUniqueInput!\n    $data: ProposalUpdateInput!\n  ) {\n    updateProposal(where: $where, data: $data) {\n      id\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n    }\n  }\n":us,"\n  query GetVisualizationProposals($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      ...VisualizationProposalWithContext\n    }\n  }\n\n  fragment VisualizationProposalWithContext on Proposal {\n    ...VisualizationProposalBase\n    government {\n      name\n      category\n    }\n    year {\n      year\n    }\n  }\n\n  fragment VisualizationProposalBase on Proposal {\n    id\n    freezeAmount\n    reductionAmount\n    proposalTypes\n    proposers {\n      id\n      name\n      party {\n        name\n        color\n      }\n    }\n  }\n":cs};function Es(t){return ls[t]??{}}export{Cs as E,Yt as O,Ht as P,ws as Q,_t as R,$e as S,Ds as V,vs as a,gs as b,bs as c,pe as d,It as e,fs as f,ct as g,St as h,ps as i,Re as j,Rs as k,Ps as l,ms as m,Me as n,lt as o,Ge as p,ys as q,se as r,ot as s,Is as t,Ss as u,Es as v,Ie as w,Bt as x,ut as y,At as z};
