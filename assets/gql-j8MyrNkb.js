var It=Object.defineProperty;var We=t=>{throw TypeError(t)};var Rt=(t,e,n)=>e in t?It(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Ce=(t,e,n)=>Rt(t,typeof e!="symbol"?e+"":e,n),Ie=(t,e,n)=>e.has(t)||We("Cannot "+n);var r=(t,e,n)=>(Ie(t,e,"read from private field"),n?n.call(t):e.get(t)),d=(t,e,n)=>e.has(t)?We("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),u=(t,e,n,s)=>(Ie(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),b=(t,e,n)=>(Ie(t,e,"access private method"),n);import{w as B,t as Dt}from"./chunk-QUQL4437-Ce7C6B2x.js";var Le=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},K,L,se,nt,Et=(nt=class extends Le{constructor(){super();d(this,K);d(this,L);d(this,se);u(this,se,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){r(this,L)||this.setEventListener(r(this,se))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,L))==null||e.call(this),u(this,L,void 0))}setEventListener(e){var n;u(this,se,e),(n=r(this,L))==null||n.call(this),u(this,L,e(s=>{typeof s=="boolean"?this.setFocused(s):this.onFocus()}))}setFocused(e){r(this,K)!==e&&(u(this,K,e),this.onFocus())}onFocus(){const e=this.isFocused();this.listeners.forEach(n=>{n(e)})}isFocused(){var e;return typeof r(this,K)=="boolean"?r(this,K):((e=globalThis.document)==null?void 0:e.visibilityState)!=="hidden"}},K=new WeakMap,L=new WeakMap,se=new WeakMap,nt),ut=new Et,_t={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)},M,Qe,st,Ot=(st=class{constructor(){d(this,M,_t);d(this,Qe,!1)}setTimeoutProvider(t){u(this,M,t)}setTimeout(t,e){return r(this,M).setTimeout(t,e)}clearTimeout(t){r(this,M).clearTimeout(t)}setInterval(t,e){return r(this,M).setInterval(t,e)}clearInterval(t){r(this,M).clearInterval(t)}},M=new WeakMap,Qe=new WeakMap,st),W=new Ot;function Ft(t){setTimeout(t,0)}var Tt=typeof window>"u"||"Deno"in globalThis;function me(){}function Tn(t,e){return typeof t=="function"?t(e):t}function De(t){return typeof t=="number"&&t>=0&&t!==1/0}function ct(t,e){return Math.max(t+(e||0)-Date.now(),0)}function ne(t,e){return typeof t=="function"?t(e):t}function q(t,e){return typeof t=="function"?t(e):t}function An(t,e){const{type:n="all",exact:s,fetchStatus:i,predicate:a,queryKey:l,stale:o}=t;if(l){if(s){if(e.queryHash!==At(l,e.options))return!1}else if(!Me(e.queryKey,l))return!1}if(n!=="all"){const m=e.isActive();if(n==="active"&&!m||n==="inactive"&&m)return!1}return!(typeof o=="boolean"&&e.isStale()!==o||i&&i!==e.state.fetchStatus||a&&!a(e))}function Un(t,e){const{exact:n,status:s,predicate:i,mutationKey:a}=t;if(a){if(!e.options.mutationKey)return!1;if(n){if(Ee(e.options.mutationKey)!==Ee(a))return!1}else if(!Me(e.options.mutationKey,a))return!1}return!(s&&e.state.status!==s||i&&!i(e))}function At(t,e){return((e==null?void 0:e.queryKeyHashFn)||Ee)(t)}function Ee(t){return JSON.stringify(t,(e,n)=>Oe(n)?Object.keys(n).sort().reduce((s,i)=>(s[i]=n[i],s),{}):n)}function Me(t,e){return t===e?!0:typeof t!=typeof e?!1:t&&e&&typeof t=="object"&&typeof e=="object"?Object.keys(e).every(n=>Me(t[n],e[n])):!1}var Ut=Object.prototype.hasOwnProperty;function lt(t,e,n=0){if(t===e)return t;if(n>500)return e;const s=Ke(t)&&Ke(e);if(!s&&!(Oe(t)&&Oe(e)))return e;const a=(s?t:Object.keys(t)).length,l=s?e:Object.keys(e),o=l.length,m=s?new Array(o):{};let I=0;for(let g=0;g<o;g++){const h=s?g:l[g],S=t[h],f=e[h];if(S===f){m[h]=S,(s?g<a:Ut.call(t,h))&&I++;continue}if(S===null||f===null||typeof S!="object"||typeof f!="object"){m[h]=f;continue}const R=lt(S,f,n+1);m[h]=R,R===S&&I++}return a===o&&I===a?t:m}function _e(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}function Ke(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function Oe(t){if(!Ye(t))return!1;const e=t.constructor;if(e===void 0)return!0;const n=e.prototype;return!(!Ye(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(t)!==Object.prototype)}function Ye(t){return Object.prototype.toString.call(t)==="[object Object]"}function qt(t){return new Promise(e=>{W.setTimeout(e,t)})}function Fe(t,e,n){return typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?lt(t,e):e}function qn(t){return t}function jt(t,e,n=0){const s=[...t,e];return n&&s.length>n?s.slice(1):s}function Bt(t,e,n=0){const s=[e,...t];return n&&s.length>n?s.slice(0,-1):s}var ht=Symbol();function dt(t,e){return!t.queryFn&&(e!=null&&e.initialPromise)?()=>e.initialPromise:!t.queryFn||t.queryFn===ht?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function pt(t,e){return typeof t=="function"?t(...e):!!t}function Nt(t,e,n){let s=!1,i;return Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(i??(i=e()),s||(s=!0,i.aborted?n():i.addEventListener("abort",n,{once:!0})),i)}),t}var ye=(()=>{let t=()=>Tt;return{isServer(){return t()},setIsServer(e){t=e}}})();function Te(){let t,e;const n=new Promise((i,a)=>{t=i,e=a});n.status="pending",n.catch(()=>{});function s(i){Object.assign(n,i),delete n.resolve,delete n.reject}return n.resolve=i=>{s({status:"fulfilled",value:i}),t(i)},n.reject=i=>{s({status:"rejected",reason:i}),e(i)},n}var kt=Ft;function zt(){let t=[],e=0,n=o=>{o()},s=o=>{o()},i=kt;const a=o=>{e?t.push(o):i(()=>{n(o)})},l=()=>{const o=t;t=[],o.length&&i(()=>{s(()=>{o.forEach(m=>{n(m)})})})};return{batch:o=>{let m;e++;try{m=o()}finally{e--,e||l()}return m},batchCalls:o=>(...m)=>{a(()=>{o(...m)})},schedule:a,setNotifyFunction:o=>{n=o},setBatchNotifyFunction:o=>{s=o},setScheduler:o=>{i=o}}}var $e=zt(),re,$,ie,rt,Gt=(rt=class extends Le{constructor(){super();d(this,re,!0);d(this,$);d(this,ie);u(this,ie,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e(!0),s=()=>e(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",s)}}})}onSubscribe(){r(this,$)||this.setEventListener(r(this,ie))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,$))==null||e.call(this),u(this,$,void 0))}setEventListener(e){var n;u(this,ie,e),(n=r(this,$))==null||n.call(this),u(this,$,e(this.setOnline.bind(this)))}setOnline(e){r(this,re)!==e&&(u(this,re,e),this.listeners.forEach(s=>{s(e)}))}isOnline(){return r(this,re)}},re=new WeakMap,$=new WeakMap,ie=new WeakMap,rt),ft=new Gt;function Qt(t){return Math.min(1e3*2**t,3e4)}function mt(t){return(t??"online")==="online"?ft.isOnline():!0}var Ae=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function Lt(t){let e=!1,n=0,s;const i=Te(),a=()=>i.status!=="pending",l=y=>{var P;if(!a()){const w=new Ae(y);S(w),(P=t.onCancel)==null||P.call(t,w)}},o=()=>{e=!0},m=()=>{e=!1},I=()=>ut.isFocused()&&(t.networkMode==="always"||ft.isOnline())&&t.canRun(),g=()=>mt(t.networkMode)&&t.canRun(),h=y=>{a()||(s==null||s(),i.resolve(y))},S=y=>{a()||(s==null||s(),i.reject(y))},f=()=>new Promise(y=>{var P;s=w=>{(a()||I())&&y(w)},(P=t.onPause)==null||P.call(t)}).then(()=>{var y;s=void 0,a()||(y=t.onContinue)==null||y.call(t)}),R=()=>{if(a())return;let y;const P=n===0?t.initialPromise:void 0;try{y=P??t.fn()}catch(w){y=Promise.reject(w)}Promise.resolve(y).then(h).catch(w=>{var N;if(a())return;const E=t.retry??(ye.isServer()?0:3),C=t.retryDelay??Qt,c=typeof C=="function"?C(n,w):C,_=E===!0||typeof E=="number"&&n<E||typeof E=="function"&&E(n,w);if(e||!_){S(w);return}n++,(N=t.onFail)==null||N.call(t,n,w),qt(c).then(()=>I()?void 0:f()).then(()=>{e?S(w):R()})})};return{promise:i,status:()=>i.status,cancel:l,continue:()=>(s==null||s(),i),cancelRetry:o,continueRetry:m,canStart:g,start:()=>(g()?R():f().then(R),i)}}var Y,it,Mt=(it=class{constructor(){d(this,Y)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),De(this.gcTime)&&u(this,Y,W.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(ye.isServer()?1/0:300*1e3))}clearGcTimeout(){r(this,Y)!==void 0&&(W.clearTimeout(r(this,Y)),u(this,Y,void 0))}},Y=new WeakMap,it);function $t(t){return{onFetch:(e,n)=>{var g,h,S,f,R;const s=e.options,i=(S=(h=(g=e.fetchOptions)==null?void 0:g.meta)==null?void 0:h.fetchMore)==null?void 0:S.direction,a=((f=e.state.data)==null?void 0:f.pages)||[],l=((R=e.state.data)==null?void 0:R.pageParams)||[];let o={pages:[],pageParams:[]},m=0;const I=async()=>{let y=!1;const P=C=>{Nt(C,()=>e.signal,()=>y=!0)},w=dt(e.options,e.fetchOptions),E=async(C,c,_)=>{if(y)return Promise.reject(e.signal.reason);if(c==null&&C.pages.length)return Promise.resolve(C);const de=(()=>{const Q={client:e.client,queryKey:e.queryKey,pageParam:c,direction:_?"backward":"forward",meta:e.options.meta};return P(Q),Q})(),k=await w(de),{maxPages:pe}=e.options,O=_?Bt:jt;return{pages:O(C.pages,k,pe),pageParams:O(C.pageParams,c,pe)}};if(i&&a.length){const C=i==="backward",c=C?xt:He,_={pages:a,pageParams:l},N=c(s,_);o=await E(_,N,C)}else{const C=t??a.length;do{const c=m===0?l[0]??s.initialPageParam:He(s,o);if(m>0&&c==null)break;o=await E(o,c),m++}while(m<C)}return o};e.options.persister?e.fetchFn=()=>{var y,P;return(P=(y=e.options).persister)==null?void 0:P.call(y,I,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},n)}:e.fetchFn=I}}}function He(t,{pages:e,pageParams:n}){const s=e.length-1;return e.length>0?t.getNextPageParam(e[s],e,n[s],n):void 0}function xt(t,{pages:e,pageParams:n}){var s;return e.length>0?(s=t.getPreviousPageParam)==null?void 0:s.call(t,e[0],e,n[0],n):void 0}var ae,H,oe,j,J,D,ge,Z,U,yt,z,at,jn=(at=class extends Mt{constructor(e){super();d(this,U);d(this,ae);d(this,H);d(this,oe);d(this,j);d(this,J);d(this,D);d(this,ge);d(this,Z);u(this,Z,!1),u(this,ge,e.defaultOptions),this.setOptions(e.options),this.observers=[],u(this,J,e.client),u(this,j,r(this,J).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,u(this,H,Ze(this.options)),this.state=e.state??r(this,H),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return r(this,ae)}get promise(){var e;return(e=r(this,D))==null?void 0:e.promise}setOptions(e){if(this.options={...r(this,ge),...e},e!=null&&e._type&&u(this,ae,e._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=Ze(this.options);n.data!==void 0&&(this.setState(Je(n.data,n.dataUpdatedAt)),u(this,H,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,j).remove(this)}setData(e,n){const s=Fe(this.state.data,e,this.options);return b(this,U,z).call(this,{data:s,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),s}setState(e){b(this,U,z).call(this,{type:"setState",state:e})}cancel(e){var s,i;const n=(s=r(this,D))==null?void 0:s.promise;return(i=r(this,D))==null||i.cancel(e),n?n.then(me).catch(me):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return r(this,H)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(e=>q(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===ht||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0?this.observers.some(e=>ne(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!ct(this.state.dataUpdatedAt,e)}onFocus(){var n;const e=this.observers.find(s=>s.shouldFetchOnWindowFocus());e==null||e.refetch({cancelRefetch:!1}),(n=r(this,D))==null||n.continue()}onOnline(){var n;const e=this.observers.find(s=>s.shouldFetchOnReconnect());e==null||e.refetch({cancelRefetch:!1}),(n=r(this,D))==null||n.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),r(this,j).notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(n=>n!==e),this.observers.length||(r(this,D)&&(r(this,Z)||b(this,U,yt).call(this)?r(this,D).cancel({revert:!0}):r(this,D).cancelRetry()),this.scheduleGc()),r(this,j).notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||b(this,U,z).call(this,{type:"invalidate"})}async fetch(e,n){var I,g,h,S,f,R,y,P,w,E,C;if(this.state.fetchStatus!=="idle"&&((I=r(this,D))==null?void 0:I.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(r(this,D))return r(this,D).continueRetry(),r(this,D).promise}if(e&&this.setOptions(e),!this.options.queryFn){const c=this.observers.find(_=>_.options.queryFn);c&&this.setOptions(c.options)}const s=new AbortController,i=c=>{Object.defineProperty(c,"signal",{enumerable:!0,get:()=>(u(this,Z,!0),s.signal)})},a=()=>{const c=dt(this.options,n),N=(()=>{const de={client:r(this,J),queryKey:this.queryKey,meta:this.meta};return i(de),de})();return u(this,Z,!1),this.options.persister?this.options.persister(c,N,this):c(N)},o=(()=>{const c={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:r(this,J),state:this.state,fetchFn:a};return i(c),c})(),m=r(this,ae)==="infinite"?$t(this.options.pages):this.options.behavior;m==null||m.onFetch(o,this),u(this,oe,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((g=o.fetchOptions)==null?void 0:g.meta))&&b(this,U,z).call(this,{type:"fetch",meta:(h=o.fetchOptions)==null?void 0:h.meta}),u(this,D,Lt({initialPromise:n==null?void 0:n.initialPromise,fn:o.fetchFn,onCancel:c=>{c instanceof Ae&&c.revert&&this.setState({...r(this,oe),fetchStatus:"idle"}),s.abort()},onFail:(c,_)=>{b(this,U,z).call(this,{type:"failed",failureCount:c,error:_})},onPause:()=>{b(this,U,z).call(this,{type:"pause"})},onContinue:()=>{b(this,U,z).call(this,{type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0}));try{const c=await r(this,D).start();if(c===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(c),(f=(S=r(this,j).config).onSuccess)==null||f.call(S,c,this),(y=(R=r(this,j).config).onSettled)==null||y.call(R,c,this.state.error,this),c}catch(c){if(c instanceof Ae){if(c.silent)return r(this,D).promise;if(c.revert){if(this.state.data===void 0)throw c;return this.state.data}}throw b(this,U,z).call(this,{type:"error",error:c}),(w=(P=r(this,j).config).onError)==null||w.call(P,c,this),(C=(E=r(this,j).config).onSettled)==null||C.call(E,this.state.data,c,this),c}finally{this.scheduleGc()}}},ae=new WeakMap,H=new WeakMap,oe=new WeakMap,j=new WeakMap,J=new WeakMap,D=new WeakMap,ge=new WeakMap,Z=new WeakMap,U=new WeakSet,yt=function(){return this.state.fetchStatus==="paused"&&this.state.status==="pending"},z=function(e){const n=s=>{switch(e.type){case"failed":return{...s,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,...gt(s.data,this.options),fetchMeta:e.meta??null};case"success":const i={...s,...Je(e.data,e.dataUpdatedAt),dataUpdateCount:s.dataUpdateCount+1,...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return u(this,oe,e.manual?i:void 0),i;case"error":const a=e.error;return{...s,error:a,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...e.state}}};this.state=n(this.state),$e.batch(()=>{this.observers.forEach(s=>{s.onQueryUpdate()}),r(this,j).notify({query:this,type:"updated",action:e})})},at);function gt(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:mt(e.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function Je(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function Ze(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=e!==void 0,s=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var A,p,ve,F,X,ue,G,x,be,ce,le,ee,te,V,he,v,fe,Ue,qe,je,Be,Ne,ke,ze,vt,ot,Vt=(ot=class extends Le{constructor(e,n){super();d(this,v);d(this,A);d(this,p);d(this,ve);d(this,F);d(this,X);d(this,ue);d(this,G);d(this,x);d(this,be);d(this,ce);d(this,le);d(this,ee);d(this,te);d(this,V);d(this,he,new Set);this.options=n,u(this,A,e),u(this,x,null),u(this,G,Te()),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,p).addObserver(this),Xe(r(this,p),this.options)?b(this,v,fe).call(this):this.updateResult(),b(this,v,Be).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ge(r(this,p),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ge(r(this,p),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,b(this,v,Ne).call(this),b(this,v,ke).call(this),r(this,p).removeObserver(this)}setOptions(e){const n=this.options,s=r(this,p);if(this.options=r(this,A).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof q(this.options.enabled,r(this,p))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");b(this,v,ze).call(this),r(this,p).setOptions(this.options),n._defaulted&&!_e(this.options,n)&&r(this,A).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,p),observer:this});const i=this.hasListeners();i&&et(r(this,p),s,this.options,n)&&b(this,v,fe).call(this),this.updateResult(),i&&(r(this,p)!==s||q(this.options.enabled,r(this,p))!==q(n.enabled,r(this,p))||ne(this.options.staleTime,r(this,p))!==ne(n.staleTime,r(this,p)))&&b(this,v,Ue).call(this);const a=b(this,v,qe).call(this);i&&(r(this,p)!==s||q(this.options.enabled,r(this,p))!==q(n.enabled,r(this,p))||a!==r(this,V))&&b(this,v,je).call(this,a)}getOptimisticResult(e){const n=r(this,A).getQueryCache().build(r(this,A),e),s=this.createResult(n,e);return Kt(this,s)&&(u(this,F,s),u(this,ue,this.options),u(this,X,r(this,p).state)),s}getCurrentResult(){return r(this,F)}trackResult(e,n){return new Proxy(e,{get:(s,i)=>(this.trackProp(i),n==null||n(i),i==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&r(this,G).status==="pending"&&r(this,G).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(s,i))})}trackProp(e){r(this,he).add(e)}getCurrentQuery(){return r(this,p)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const n=r(this,A).defaultQueryOptions(e),s=r(this,A).getQueryCache().build(r(this,A),n);return s.fetch().then(()=>this.createResult(s,n))}fetch(e){return b(this,v,fe).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,F)))}createResult(e,n){var pe;const s=r(this,p),i=this.options,a=r(this,F),l=r(this,X),o=r(this,ue),I=e!==s?e.state:r(this,ve),{state:g}=e;let h={...g},S=!1,f;if(n._optimisticResults){const O=this.hasListeners(),Q=!O&&Xe(e,n),Pe=O&&et(e,s,n,i);(Q||Pe)&&(h={...h,...gt(g.data,e.options)}),n._optimisticResults==="isRestoring"&&(h.fetchStatus="idle")}let{error:R,errorUpdatedAt:y,status:P}=h;f=h.data;let w=!1;if(n.placeholderData!==void 0&&f===void 0&&P==="pending"){let O;a!=null&&a.isPlaceholderData&&n.placeholderData===(o==null?void 0:o.placeholderData)?(O=a.data,w=!0):O=typeof n.placeholderData=="function"?n.placeholderData((pe=r(this,le))==null?void 0:pe.state.data,r(this,le)):n.placeholderData,O!==void 0&&(P="success",f=Fe(a==null?void 0:a.data,O,n),S=!0)}if(n.select&&f!==void 0&&!w)if(a&&f===(l==null?void 0:l.data)&&n.select===r(this,be))f=r(this,ce);else try{u(this,be,n.select),f=n.select(f),f=Fe(a==null?void 0:a.data,f,n),u(this,ce,f),u(this,x,null)}catch(O){u(this,x,O)}r(this,x)&&(R=r(this,x),f=r(this,ce),y=Date.now(),P="error");const E=h.fetchStatus==="fetching",C=P==="pending",c=P==="error",_=C&&E,N=f!==void 0,k={status:P,fetchStatus:h.fetchStatus,isPending:C,isSuccess:P==="success",isError:c,isInitialLoading:_,isLoading:_,data:f,dataUpdatedAt:h.dataUpdatedAt,error:R,errorUpdatedAt:y,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:h.dataUpdateCount>I.dataUpdateCount||h.errorUpdateCount>I.errorUpdateCount,isFetching:E,isRefetching:E&&!C,isLoadingError:c&&!N,isPaused:h.fetchStatus==="paused",isPlaceholderData:S,isRefetchError:c&&N,isStale:xe(e,n),refetch:this.refetch,promise:r(this,G),isEnabled:q(n.enabled,e)!==!1};if(this.options.experimental_prefetchInRender){const O=k.data!==void 0,Q=k.status==="error"&&!O,Pe=Se=>{Q?Se.reject(k.error):O&&Se.resolve(k.data)},Ve=()=>{const Se=u(this,G,k.promise=Te());Pe(Se)},we=r(this,G);switch(we.status){case"pending":e.queryHash===s.queryHash&&Pe(we);break;case"fulfilled":(Q||k.data!==we.value)&&Ve();break;case"rejected":(!Q||k.error!==we.reason)&&Ve();break}}return k}updateResult(){const e=r(this,F),n=this.createResult(r(this,p),this.options);if(u(this,X,r(this,p).state),u(this,ue,this.options),r(this,X).data!==void 0&&u(this,le,r(this,p)),_e(n,e))return;u(this,F,n);const s=()=>{if(!e)return!0;const{notifyOnChangeProps:i}=this.options,a=typeof i=="function"?i():i;if(a==="all"||!a&&!r(this,he).size)return!0;const l=new Set(a??r(this,he));return this.options.throwOnError&&l.add("error"),Object.keys(r(this,F)).some(o=>{const m=o;return r(this,F)[m]!==e[m]&&l.has(m)})};b(this,v,vt).call(this,{listeners:s()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&b(this,v,Be).call(this)}},A=new WeakMap,p=new WeakMap,ve=new WeakMap,F=new WeakMap,X=new WeakMap,ue=new WeakMap,G=new WeakMap,x=new WeakMap,be=new WeakMap,ce=new WeakMap,le=new WeakMap,ee=new WeakMap,te=new WeakMap,V=new WeakMap,he=new WeakMap,v=new WeakSet,fe=function(e){b(this,v,ze).call(this);let n=r(this,p).fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(me)),n},Ue=function(){b(this,v,Ne).call(this);const e=ne(this.options.staleTime,r(this,p));if(ye.isServer()||r(this,F).isStale||!De(e))return;const s=ct(r(this,F).dataUpdatedAt,e)+1;u(this,ee,W.setTimeout(()=>{r(this,F).isStale||this.updateResult()},s))},qe=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,p)):this.options.refetchInterval)??!1},je=function(e){b(this,v,ke).call(this),u(this,V,e),!(ye.isServer()||q(this.options.enabled,r(this,p))===!1||!De(r(this,V))||r(this,V)===0)&&u(this,te,W.setInterval(()=>{(this.options.refetchIntervalInBackground||ut.isFocused())&&b(this,v,fe).call(this)},r(this,V)))},Be=function(){b(this,v,Ue).call(this),b(this,v,je).call(this,b(this,v,qe).call(this))},Ne=function(){r(this,ee)!==void 0&&(W.clearTimeout(r(this,ee)),u(this,ee,void 0))},ke=function(){r(this,te)!==void 0&&(W.clearInterval(r(this,te)),u(this,te,void 0))},ze=function(){const e=r(this,A).getQueryCache().build(r(this,A),this.options);if(e===r(this,p))return;const n=r(this,p);u(this,p,e),u(this,ve,e.state),this.hasListeners()&&(n==null||n.removeObserver(this),e.addObserver(this))},vt=function(e){$e.batch(()=>{e.listeners&&this.listeners.forEach(n=>{n(r(this,F))}),r(this,A).getQueryCache().notify({query:r(this,p),type:"observerResultsUpdated"})})},ot);function Wt(t,e){return q(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&q(e.retryOnMount,t)===!1)}function Xe(t,e){return Wt(t,e)||t.state.data!==void 0&&Ge(t,e,e.refetchOnMount)}function Ge(t,e,n){if(q(e.enabled,t)!==!1&&ne(e.staleTime,t)!=="static"){const s=typeof n=="function"?n(t):n;return s==="always"||s!==!1&&xe(t,e)}return!1}function et(t,e,n,s){return(t!==e||q(s.enabled,t)===!1)&&(!n.suspense||t.state.status!=="error")&&xe(t,n)}function xe(t,e){return q(e.enabled,t)!==!1&&t.isStaleByTime(ne(e.staleTime,t))}function Kt(t,e){return!_e(t.getCurrentResult(),e)}var bt=B.createContext(void 0),Yt=t=>{const e=B.useContext(bt);if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Bn=({client:t,children:e})=>(B.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),Dt.jsx(bt.Provider,{value:t,children:e})),Pt=B.createContext(!1),Ht=()=>B.useContext(Pt);Pt.Provider;function Jt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var Zt=B.createContext(Jt()),Xt=()=>B.useContext(Zt),en=(t,e,n)=>{const s=n!=null&&n.state.error&&typeof t.throwOnError=="function"?pt(t.throwOnError,[n.state.error,n]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||s)&&(e.isReset()||(t.retryOnMount=!1))},tn=t=>{B.useEffect(()=>{t.clearReset()},[t])},nn=({result:t,errorResetBoundary:e,throwOnError:n,query:s,suspense:i})=>t.isError&&!e.isReset()&&!t.isFetching&&s&&(i&&t.data===void 0||pt(n,[t.error,s])),sn=t=>{if(t.suspense){const n=i=>i==="static"?i:Math.max(i??1e3,1e3),s=t.staleTime;t.staleTime=typeof s=="function"?(...i)=>n(s(...i)):n(s),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},rn=(t,e)=>t.isLoading&&t.isFetching&&!e,an=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,tt=(t,e,n)=>e.fetchOptimistic(t).catch(()=>{n.clearReset()});function on(t,e,n){var f,R,y,P;const s=Ht(),i=Xt(),a=Yt(),l=a.defaultQueryOptions(t);(R=(f=a.getDefaultOptions().queries)==null?void 0:f._experimental_beforeQuery)==null||R.call(f,l);const o=a.getQueryCache().get(l.queryHash),m=t.subscribed!==!1;l._optimisticResults=s?"isRestoring":m?"optimistic":void 0,sn(l),en(l,i,o),tn(i);const I=!a.getQueryCache().get(l.queryHash),[g]=B.useState(()=>new e(a,l)),h=g.getOptimisticResult(l),S=!s&&m;if(B.useSyncExternalStore(B.useCallback(w=>{const E=S?g.subscribe($e.batchCalls(w)):me;return g.updateResult(),E},[g,S]),()=>g.getCurrentResult(),()=>g.getCurrentResult()),B.useEffect(()=>{g.setOptions(l)},[l,g]),an(l,h))throw tt(l,g,i);if(nn({result:h,errorResetBoundary:i,throwOnError:l.throwOnError,query:o,suspense:l.suspense}))throw h.error;if((P=(y=a.getDefaultOptions().queries)==null?void 0:y._experimental_afterQuery)==null||P.call(y,l,h),l.experimental_prefetchInRender&&!ye.isServer()&&rn(h,s)){const w=I?tt(l,g,i):o==null?void 0:o.promise;w==null||w.catch(me).finally(()=>{g.updateResult()})}return l.notifyOnChangeProps?h:g.trackResult(h)}function Nn(t,e){return on(t,Vt)}const wt={};var Re={};const un="https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql",cn="https://ly-budget-gql-dev-702918025200.asia-east1.run.app/api/graphql",ln=()=>typeof import.meta<"u"&&typeof wt<"u"?"https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql":typeof process<"u"?Re.VITE_GQL_ENDPOINT??Re.GQL_ENDPOINT??Re.GRAPHQL_ENDPOINT??null:null,hn=()=>typeof import.meta<"u"&&typeof wt<"u"||typeof process<"u"?"production":null,dn=ln(),St=hn();console.log({mode:St});const Ct=dn??(St==="production"?un:cn);console.log({GQL_ENDPOINTS:Ct});const kn="/";async function zn(t,...[e]){const n=await fetch(Ct,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/graphql-response+json"},body:JSON.stringify({query:t,variables:e})});if(!n.ok)throw new Error("Network response was not ok");return(await n.json()).data}var pn=(t=>(t.Asc="asc",t.Desc="desc",t))(pn||{}),fn=(t=>(t.Freeze="freeze",t.Other="other",t.Reduce="reduce",t))(fn||{});class T extends String{constructor(n,s){super(n);Ce(this,"__apiType");Ce(this,"value");Ce(this,"__meta__");this.value=n,this.__meta__=s}toString(){return this.value}}const Gn=new T(`
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
    `,{fragmentName:"VisualizationProposalBase"}),Qn=new T(`
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
}`,{fragmentName:"VisualizationProposalWithContext"}),mn=new T(`
    query GetLatestBudgetYear($skip: Int!, $take: Int!) {
  budgetYears(orderBy: [{year: desc}], skip: $skip, take: $take) {
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),yn=new T(`
    query GetBudgetYearsList {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),gn=new T(`
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
    `),vn=new T(`
    query GetGovernments {
  governments {
    id
    name
    category
    description
  }
}
    `),bn=new T(`
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
    `),Pn=new T(`
    query RecognitionImages {
  recognitionImages(where: {verificationStatus: {equals: "verified"}}) {
    result
  }
  recognitionImagesCount
}
    `),wn=new T(`
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
    `),Sn=new T(`
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
    `),Cn=new T(`
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
    unfreezeReport
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
    unfreezeHistory {
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
    `),In=new T(`
    query GetProposalYears {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),Rn=new T(`
    query GetPaginatedProposals($skip: Int!, $take: Int!, $orderBy: [ProposalOrderByInput!]!, $where: ProposalWhereInput!) {
  proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    id
    description
    year {
      id
      year
    }
    unfreezeStatus
    meetings {
      id
      type
      meetingDate
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
    `),Dn=new T(`
    mutation UPDATE_PROPOSAL_REACTS($where: ProposalWhereUniqueInput!, $data: ProposalUpdateInput!) {
  updateProposal(where: $where, data: $data) {
    id
    react_angry
    react_disappoint
    react_good
    react_whatever
  }
}
    `),En=new T(`
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
}`),_n={"\n  query GetLatestBudgetYear($skip: Int!, $take: Int!) {\n    budgetYears(orderBy: [{ year: desc }], skip: $skip, take: $take) {\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":mn,"\n  query GetBudgetYearsList {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":yn,"\n  query GetBudgetsWithGovernment {\n    budgets {\n      id\n      type\n      year\n      projectName\n      projectDescription\n      budgetAmount\n      majorCategory\n      mediumCategory\n      minorCategory\n      description\n      government {\n        id\n        name\n        category\n      }\n    }\n    budgetsCount\n  }\n":gn,"\n  query GetGovernments {\n    governments {\n      id\n      name\n      category\n      description\n    }\n  }\n":vn,"\n  query GetPeopleList {\n    peopleList(orderBy: [{ name: asc }]) {\n      id\n      name\n      type\n      description\n      party {\n        id\n        name\n      }\n    }\n  }\n":bn,'\n  query RecognitionImages {\n    recognitionImages(where: { verificationStatus: { equals: "verified" } }) {\n      result\n    }\n    recognitionImagesCount\n  }\n':Pn,"\n  query People($where: PeopleWhereUniqueInput!) {\n    people(where: $where) {\n      id\n      name\n      description\n      party {\n        id\n        color\n        name\n      }\n      term {\n        termNumber\n        id\n      }\n      termCount\n      committees {\n        id\n        name\n        session\n        term {\n          id\n          startDate\n          termNumber\n        }\n      }\n    }\n  }\n":wn,"\n  query GetProposalsOrderedByIdDesc {\n    proposals(orderBy: [{ id: desc }]) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        budgetAmount\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n    }\n    proposalsCount\n  }\n":Sn,"\n  query GetProposalById($id: ID!) {\n    proposal(where: { id: $id }) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      unfreezeReport\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      budgetImageUrl\n      historicalParentProposals {\n        id\n      }\n      mergedParentProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n      }\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        projectDescription\n        budgetAmount\n        budgetUrl\n        lastYearSettlement\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n        description\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n      meetings(orderBy: [{ meetingDate: desc }]) {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      unfreezeHistory {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      mergedProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n        meetings {\n          id\n        }\n        proposers {\n          id\n          name\n        }\n      }\n    }\n  }\n":Cn,"\n  query GetProposalYears {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":In,"\n  query GetPaginatedProposals(\n    $skip: Int!\n    $take: Int!\n    $orderBy: [ProposalOrderByInput!]!\n    $where: ProposalWhereInput!\n  ) {\n    proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {\n      id\n      description\n      year {\n        id\n        year\n      }\n      unfreezeStatus\n      meetings {\n        id\n        type\n        meetingDate\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      reason\n      result\n      freezeAmount\n      reductionAmount\n      proposalTypes\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      government {\n        id\n        name\n      }\n      budget {\n        id\n        budgetAmount\n      }\n      proposers {\n        id\n        name\n      }\n    }\n    proposalsCount(where: $where)\n  }\n":Rn,"\n  mutation UPDATE_PROPOSAL_REACTS(\n    $where: ProposalWhereUniqueInput!\n    $data: ProposalUpdateInput!\n  ) {\n    updateProposal(where: $where, data: $data) {\n      id\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n    }\n  }\n":Dn,"\n  query GetVisualizationProposals($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      ...VisualizationProposalWithContext\n    }\n  }\n\n  fragment VisualizationProposalWithContext on Proposal {\n    ...VisualizationProposalBase\n    government {\n      name\n      category\n    }\n    year {\n      year\n    }\n  }\n\n  fragment VisualizationProposalBase on Proposal {\n    id\n    freezeAmount\n    reductionAmount\n    proposalTypes\n    proposers {\n      id\n      name\n      party {\n        name\n        color\n      }\n    }\n  }\n":En};function Ln(t){return _n[t]??{}}export{kn as E,pn as O,fn as P,jn as Q,Mt as R,Le as S,Gn as V,Bn as a,Qn as b,Lt as c,Tn as d,zn as e,ut as f,Ln as g,Ee as h,At as i,An as j,qn as k,$e as l,Un as m,me as n,ft as o,Me as p,pt as q,ne as r,_e as s,ht as t,Nn as u,Yt as v};
