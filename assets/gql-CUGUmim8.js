var mt=Object.defineProperty;var ke=t=>{throw TypeError(t)};var yt=(t,e,n)=>e in t?mt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var me=(t,e,n)=>yt(t,typeof e!="symbol"?e+"":e,n),ge=(t,e,n)=>e.has(t)||ke("Cannot "+n);var r=(t,e,n)=>(ge(t,e,"read from private field"),n?n.call(t):e.get(t)),f=(t,e,n)=>e.has(t)?ke("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),u=(t,e,n,s)=>(ge(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),v=(t,e,n)=>(ge(t,e,"access private method"),n);import{r as G,j as gt}from"./jsx-runtime-DxlmTGZR.js";const et=G.createContext(void 0),vt=t=>{const e=G.useContext(et);if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Cn=({client:t,children:e})=>(G.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),gt.jsx(et.Provider,{value:t,children:e})),bt={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)};var z,Ue,Ke,Pt=(Ke=class{constructor(){f(this,z,bt);f(this,Ue,!1)}setTimeoutProvider(t){u(this,z,t)}setTimeout(t,e){return r(this,z).setTimeout(t,e)}clearTimeout(t){r(this,z).clearTimeout(t)}setInterval(t,e){return r(this,z).setInterval(t,e)}clearInterval(t){r(this,z).clearInterval(t)}},z=new WeakMap,Ue=new WeakMap,Ke);const V=new Pt;function wt(t){setTimeout(t,0)}const St=typeof window>"u"||"Deno"in globalThis;function de(){}function Rn(t,e){return typeof t=="function"?t(e):t}function tt(t){return typeof t=="number"&&t>=0&&t!==1/0}function nt(t,e){return Math.max(t+(e||0)-Date.now(),0)}function I(t,e){return typeof t=="function"?t(e):t}function In(t,e){const{type:n="all",exact:s,fetchStatus:i,predicate:o,queryKey:l,stale:a}=t;if(l){if(s){if(e.queryHash!==Ct(l,e.options))return!1}else if(!ye(e.queryKey,l))return!1}if(n!=="all"){const d=e.isActive();if(n==="active"&&!d||n==="inactive"&&d)return!1}return!(typeof a=="boolean"&&e.isStale()!==a||i&&i!==e.state.fetchStatus||o&&!o(e))}function Dn(t,e){const{exact:n,status:s,predicate:i,mutationKey:o}=t;if(o){if(!e.options.mutationKey)return!1;if(n){if(Pe(e.options.mutationKey)!==Pe(o))return!1}else if(!ye(e.options.mutationKey,o))return!1}return!(s&&e.state.status!==s||i&&!i(e))}function Ct(t,e){return((e==null?void 0:e.queryKeyHashFn)||Pe)(t)}function Pe(t){return JSON.stringify(t,(e,n)=>we(n)?Object.keys(n).sort().reduce((s,i)=>(s[i]=n[i],s),{}):n)}function ye(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(Array.isArray(t)&&Array.isArray(e)){for(let s=0;s<e.length;s++)if(!ye(t[s],e[s]))return!1;return!0}const n=Object.keys(e);for(const s of n)if(!ye(t[s],e[s]))return!1;return!0}return!1}const Rt=Object.prototype.hasOwnProperty;function st(t,e,n=0){if(t===e)return t;if(n>500)return e;const s=ze(t)&&ze(e);if(!s&&!(we(t)&&we(e)))return e;const i=(s?t:Object.keys(t)).length,o=s?e:Object.keys(e),l=o.length,a=s?new Array(l):{};let d=0;for(let y=0;y<l;y++){const h=s?y:o[y],S=t[h],m=e[h];if(S===m){a[h]=S,(s?y<i:Rt.call(t,h))&&d++;continue}if(S===null||m===null||typeof S!="object"||typeof m!="object"){a[h]=m;continue}const D=st(S,m,n+1);a[h]=D,D===S&&d++}return i===l&&d===i?t:a}function ve(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}function ze(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function we(t){if(!Le(t))return!1;const e=t.constructor;if(e===void 0)return!0;const n=e.prototype;return!(!Le(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(t)!==Object.prototype)}function Le(t){return Object.prototype.toString.call(t)==="[object Object]"}function It(t){return new Promise(e=>{V.setTimeout(e,t)})}function Se(t,e,n){return typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?st(t,e):e}function En(t){return t}function Dt(t,e,n=0){const s=[...t,e];return n&&s.length>n?s.slice(1):s}function Et(t,e,n=0){const s=[e,...t];return n&&s.length>n?s.slice(0,-1):s}const rt=Symbol();function it(t,e){return!t.queryFn&&(e!=null&&e.initialPromise)?()=>e.initialPromise:!t.queryFn||t.queryFn===rt?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function at(t,e){return typeof t=="function"?t(...e):!!t}function Ot(t,e,n){let s=!1,i;return Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(i??(i=e()),s||(s=!0,i.aborted?n():i.addEventListener("abort",n,{once:!0})),i)}),t}let Tt=()=>St;const qe=()=>Tt();var Ge=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},W,L,te,Ye,Ft=(Ye=class extends Ge{constructor(){super();f(this,W);f(this,L);f(this,te);u(this,te,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){r(this,L)||this.setEventListener(r(this,te))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,L))==null||e.call(this),u(this,L,void 0))}setEventListener(e){var n;u(this,te,e),(n=r(this,L))==null||n.call(this),u(this,L,e(s=>{typeof s=="boolean"?this.setFocused(s):this.onFocus()}))}setFocused(e){r(this,W)!==e&&(u(this,W,e),this.onFocus())}onFocus(){const e=this.isFocused();this.listeners.forEach(n=>{n(e)})}isFocused(){var e;return typeof r(this,W)=="boolean"?r(this,W):((e=globalThis.document)==null?void 0:e.visibilityState)!=="hidden"}},W=new WeakMap,L=new WeakMap,te=new WeakMap,Ye);const ot=new Ft,_t=wt;function At(){let t=[],e=0,n=a=>{a()},s=a=>{a()},i=_t;const o=a=>{e?t.push(a):i(()=>{n(a)})},l=()=>{const a=t;t=[],a.length&&i(()=>{s(()=>{a.forEach(d=>{n(d)})})})};return{batch:a=>{let d;e++;try{d=a()}finally{e--,e||l()}return d},batchCalls:a=>(...d)=>{o(()=>{a(...d)})},schedule:o,setNotifyFunction:a=>{n=a},setBatchNotifyFunction:a=>{s=a},setScheduler:a=>{i=a}}}const Be=At();var ne,M,se,He,Ut=(He=class extends Ge{constructor(){super();f(this,ne,!0);f(this,M);f(this,se);u(this,se,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e(!0),s=()=>e(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",s)}}})}onSubscribe(){r(this,M)||this.setEventListener(r(this,se))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,M))==null||e.call(this),u(this,M,void 0))}setEventListener(e){var n;u(this,se,e),(n=r(this,M))==null||n.call(this),u(this,M,e(this.setOnline.bind(this)))}setOnline(e){r(this,ne)!==e&&(u(this,ne,e),this.listeners.forEach(n=>{n(e)}))}isOnline(){return r(this,ne)}},ne=new WeakMap,M=new WeakMap,se=new WeakMap,He);const ut=new Ut;function qt(t){return Math.min(1e3*2**t,3e4)}function ct(t){return(t??"online")==="online"?ut.isOnline():!0}var Ce=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function Gt(t){let e=!1,n=0,s,i="pending",o,l;const a=new Promise((w,b)=>{o=w,l=b});a.catch(de);const d=()=>i!=="pending",y=w=>{var b;if(!d()){const P=new Ce(w);C(P),(b=t.onCancel)==null||b.call(t,P)}},h=()=>{e=!0},S=()=>{e=!1},m=()=>ot.isFocused()&&(t.networkMode==="always"||ut.isOnline())&&t.canRun(),D=()=>ct(t.networkMode)&&t.canRun(),N=w=>{d()||(s==null||s(),i="resolved",o(w))},C=w=>{d()||(s==null||s(),i="rejected",l(w))},_=()=>new Promise(w=>{var b;s=P=>{(d()||m())&&w(P)},(b=t.onPause)==null||b.call(t)}).then(()=>{var w;s=void 0,d()||(w=t.onContinue)==null||w.call(t)}),A=()=>{if(d())return;let w;const b=n===0?t.initialPromise:void 0;try{w=b??t.fn()}catch(P){w=Promise.reject(P)}Promise.resolve(w).then(N).catch(P=>{var x;if(d())return;const c=t.retry??(qe()?0:3),U=t.retryDelay??qt,E=typeof U=="function"?U(n,P):U,k=c===!0||typeof c=="number"&&n<c||typeof c=="function"&&c(n,P);if(e||!k){C(P);return}n++,(x=t.onFail)==null||x.call(t,n,P),It(E).then(()=>m()?void 0:_()).then(()=>{e?C(P):A()})})};return{promise:a,status:()=>i,cancel:y,continue:()=>(s==null||s(),a),cancelRetry:h,continueRetry:S,canStart:D,start:()=>(D()?A():_().then(A),a)}}var K,Je,Bt=(Je=class{constructor(){f(this,K)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),tt(this.gcTime)&&u(this,K,V.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(qe()?1/0:3e5))}clearGcTimeout(){r(this,K)!==void 0&&(V.clearTimeout(r(this,K)),u(this,K,void 0))}},K=new WeakMap,Je);function Nt(t){return{onFetch:(e,n)=>{var h,S,m,D,N;const s=e.options,i=(m=(S=(h=e.fetchOptions)==null?void 0:h.meta)==null?void 0:S.fetchMore)==null?void 0:m.direction,o=((D=e.state.data)==null?void 0:D.pages)||[],l=((N=e.state.data)==null?void 0:N.pageParams)||[];let a={pages:[],pageParams:[]},d=0;const y=async()=>{let C=!1;const _=b=>{Ot(b,()=>e.signal,()=>C=!0)},A=it(e.options,e.fetchOptions),w=async(b,P,c)=>{if(C)return Promise.reject(e.signal.reason);if(P==null&&b.pages.length)return Promise.resolve(b);const E=(()=>{const je={client:e.client,queryKey:e.queryKey,pageParam:P,direction:c?"backward":"forward",meta:e.options.meta};return _(je),je})(),k=await A(E),{maxPages:x}=e.options,$e=c?Et:Dt;return{pages:$e(b.pages,k,x),pageParams:$e(b.pageParams,P,x)}};if(i&&o.length){const b=i==="backward",P=b?$t:Me,c={pages:o,pageParams:l};a=await w(c,P(s,c),b)}else{const b=t??o.length;do{const P=d===0?l[0]??s.initialPageParam:Me(s,a);if(d>0&&P==null)break;a=await w(a,P),d++}while(d<b)}return a};e.options.persister?e.fetchFn=()=>{var C,_;return(_=(C=e.options).persister)==null?void 0:_.call(C,y,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},n)}:e.fetchFn=y}}}function Me(t,{pages:e,pageParams:n}){const s=e.length-1;return e.length>0?t.getNextPageParam(e[s],e,n[s],n):void 0}function $t(t,{pages:e,pageParams:n}){var s;return e.length>0?(s=t.getPreviousPageParam)==null?void 0:s.call(t,e[0],e,n[0],n):void 0}var re,Y,ie,q,H,R,he,J,B,$,Ze,On=(Ze=class extends Bt{constructor(e){super();f(this,B);f(this,re);f(this,Y);f(this,ie);f(this,q);f(this,H);f(this,R);f(this,he);f(this,J);u(this,J,!1),u(this,he,e.defaultOptions),this.setOptions(e.options),this.observers=[],u(this,H,e.client),u(this,q,r(this,H).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,u(this,Y,xe(this.options)),this.state=e.state??r(this,Y),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return r(this,re)}get promise(){var e;return(e=r(this,R))==null?void 0:e.promise}setOptions(e){if(this.options={...r(this,he),...e},e!=null&&e._type&&u(this,re,e._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=xe(this.options);n.data!==void 0&&(this.setState(Qe(n.data,n.dataUpdatedAt)),u(this,Y,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,q).remove(this)}setData(e,n){const s=Se(this.state.data,e,this.options);return v(this,B,$).call(this,{data:s,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),s}setState(e){v(this,B,$).call(this,{type:"setState",state:e})}cancel(e){var s,i;const n=(s=r(this,R))==null?void 0:s.promise;return(i=r(this,R))==null||i.cancel(e),n?n.then(de).catch(de):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return r(this,Y)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(e=>I(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===rt||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0?this.observers.some(e=>I(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!nt(this.state.dataUpdatedAt,e)}onFocus(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnWindowFocus()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,R))==null||n.continue()}onOnline(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnReconnect()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,R))==null||n.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),r(this,q).notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){const n=this.observers.indexOf(e);n!==-1&&(this.observers.splice(n,1),this.observers.length||(r(this,R)&&(r(this,J)||this.state.fetchStatus==="paused"&&this.state.status==="pending"?r(this,R).cancel({revert:!0}):r(this,R).cancelRetry()),this.scheduleGc()),r(this,q).notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||v(this,B,$).call(this,{type:"invalidate"})}async fetch(e,n){var y,h,S,m,D,N,C,_,A,w,b,P;if(this.state.fetchStatus!=="idle"&&((y=r(this,R))==null?void 0:y.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(r(this,R))return r(this,R).continueRetry(),r(this,R).promise}if(e&&this.setOptions(e),!this.options.queryFn){const c=this.observers.find(U=>U.options.queryFn);c&&this.setOptions(c.options)}const s=new AbortController,i=c=>{Object.defineProperty(c,"signal",{enumerable:!0,get:()=>(u(this,J,!0),s.signal)})},o=()=>{const c=it(this.options,n),E=(()=>{const k={client:r(this,H),queryKey:this.queryKey,meta:this.meta};return i(k),k})();return u(this,J,!1),this.options.persister?this.options.persister(c,E,this):c(E)},a=(()=>{const c={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:r(this,H),state:this.state,fetchFn:o};return i(c),c})();(h=r(this,re)==="infinite"?Nt(this.options.pages):this.options.behavior)==null||h.onFetch(a,this),u(this,ie,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((S=a.fetchOptions)==null?void 0:S.meta))&&v(this,B,$).call(this,{type:"fetch",meta:(m=a.fetchOptions)==null?void 0:m.meta});const d=u(this,R,Gt({initialPromise:n==null?void 0:n.initialPromise,fn:a.fetchFn,onCancel:c=>{c instanceof Ce&&c.revert&&this.setState({...r(this,ie),fetchStatus:"idle"}),s.abort()},onFail:(c,U)=>{v(this,B,$).call(this,{type:"failed",failureCount:c,error:U})},onPause:()=>{v(this,B,$).call(this,{type:"pause"})},onContinue:()=>{v(this,B,$).call(this,{type:"continue"})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0}));try{const c=await d.start();if(c===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(c),(N=(D=r(this,q).config).onSuccess)==null||N.call(D,c,this),(_=(C=r(this,q).config).onSettled)==null||_.call(C,c,this.state.error,this),c}catch(c){if(c instanceof Ce){if(c.silent)return r(this,R).promise;if(c.revert){if(this.state.data===void 0)throw c;return this.state.data}}throw v(this,B,$).call(this,{type:"error",error:c}),(w=(A=r(this,q).config).onError)==null||w.call(A,c,this),(P=(b=r(this,q).config).onSettled)==null||P.call(b,this.state.data,c,this),c}finally{r(this,R)===d&&u(this,R,void 0),this.scheduleGc()}}},re=new WeakMap,Y=new WeakMap,ie=new WeakMap,q=new WeakMap,H=new WeakMap,R=new WeakMap,he=new WeakMap,J=new WeakMap,B=new WeakSet,$=function(e){const n=s=>{switch(e.type){case"failed":return{...s,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,...lt(s.data,this.options),fetchMeta:e.meta??null};case"success":const i={...s,...Qe(e.data,e.dataUpdatedAt),dataUpdateCount:s.dataUpdateCount+1,...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return u(this,ie,e.manual?i:void 0),i;case"error":const o=e.error;return{...s,error:o,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:o,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...e.state}}};this.state=n(this.state),Be.batch(()=>{this.observers.slice().forEach(s=>{s.onQueryUpdate()}),r(this,q).notify({query:this,type:"updated",action:e})})},Ze);function lt(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:ct(e.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function Qe(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function xe(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=e!==void 0,s=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var T,p,pe,F,Z,ae,j,fe,oe,ue,X,ee,Q,ce,g,le,Re,Ie,De,Ee,Oe,Te,Fe,_e,Xe,jt=(Xe=class extends Ge{constructor(e,n){super();f(this,g);f(this,T);f(this,p);f(this,pe);f(this,F);f(this,Z);f(this,ae);f(this,j);f(this,fe);f(this,oe);f(this,ue);f(this,X);f(this,ee);f(this,Q);f(this,ce,new Set);this.options=n,u(this,T,e),u(this,j,null),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,p).addObserver(this),Ve(r(this,p),this.options)?v(this,g,le).call(this):this.updateResult(),v(this,g,Oe).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ae(r(this,p),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ae(r(this,p),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,v(this,g,Te).call(this),v(this,g,Fe).call(this),r(this,p).removeObserver(this)}setOptions(e){const n=this.options,s=r(this,p);if(this.options=r(this,T).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof I(this.options.enabled,r(this,p))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");v(this,g,_e).call(this),r(this,p).setOptions(this.options),n._defaulted&&!ve(this.options,n)&&r(this,T).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,p),observer:this});const i=this.hasListeners();i&&We(r(this,p),s,this.options,n)&&v(this,g,le).call(this),this.updateResult(),i&&(r(this,p)!==s||I(this.options.enabled,r(this,p))!==I(n.enabled,r(this,p))||I(this.options.staleTime,r(this,p))!==I(n.staleTime,r(this,p)))&&v(this,g,Ie).call(this);const o=v(this,g,De).call(this);i&&(r(this,p)!==s||I(this.options.enabled,r(this,p))!==I(n.enabled,r(this,p))||o!==r(this,Q))&&v(this,g,Ee).call(this,o)}getOptimisticResult(e){const n=r(this,T).getQueryCache().build(r(this,T),e),s=this.createResult(n,e);return ve(this.getCurrentResult(),s)||(u(this,F,s),u(this,ae,this.options),u(this,Z,r(this,p).state)),s}getCurrentResult(){return r(this,F)}trackResult(e,n){return new Proxy(e,{get:(s,i)=>(this.trackProp(i),n==null||n(i),Reflect.get(s,i))})}trackProp(e){r(this,ce).add(e)}getCurrentQuery(){return r(this,p)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const n=r(this,T).defaultQueryOptions(e),s=r(this,T).getQueryCache().build(r(this,T),n);let i=()=>{},o;const l=new Promise(a=>{o=a,i=r(this,T).getQueryCache().subscribe(d=>{d.type==="updated"&&d.query.queryHash===s.queryHash&&s.state.data!==void 0&&(i(),a(this.createResult(s,n)))})});return Promise.race([s.fetch().then(()=>{const a=this.createResult(s,n);return o==null||o(a),a}).finally(()=>{i()}),l])}fetch(e){return v(this,g,le).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,F)))}createResult(e,n){var U;const s=r(this,p),i=this.options,o=r(this,F),l=r(this,Z),a=r(this,ae),d=e!==s?e.state:r(this,pe),{state:y}=e;let h={...y},S=!1,m;if(n._optimisticResults){const E=this.hasListeners(),k=!E&&Ve(e,n),x=E&&We(e,s,n,i);(k||x)&&(h={...h,...lt(y.data,e.options)}),n._optimisticResults==="isRestoring"&&(h.fetchStatus="idle")}let{error:D,errorUpdatedAt:N,status:C}=h;m=h.data;let _=!1;if(n.placeholderData!==void 0&&m===void 0&&C==="pending"){let E;o!=null&&o.isPlaceholderData&&n.placeholderData===(a==null?void 0:a.placeholderData)?(E=o.data,_=!0):E=typeof n.placeholderData=="function"?n.placeholderData((U=r(this,ue))==null?void 0:U.state.data,r(this,ue)):n.placeholderData,E!==void 0&&(C="success",m=Se(o==null?void 0:o.data,E,n),S=!0)}if(n.select&&m!==void 0&&!_)if(o&&m===(l==null?void 0:l.data)&&n.select===r(this,fe))m=r(this,oe);else try{u(this,fe,n.select),m=n.select(m),m=Se(o==null?void 0:o.data,m,n),u(this,oe,m),u(this,j,null)}catch(E){u(this,j,E)}else m===void 0&&u(this,j,null);r(this,j)&&(D=r(this,j),m=r(this,oe),N=Date.now(),C="error",S=!1);const A=h.fetchStatus==="fetching",w=C==="pending",b=C==="error",P=w&&A,c=m!==void 0;return{status:C,fetchStatus:h.fetchStatus,isPending:w,isSuccess:C==="success",isError:b,isInitialLoading:P,isLoading:P,data:m,dataUpdatedAt:h.dataUpdatedAt,error:D,errorUpdatedAt:N,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:h.dataUpdateCount>d.dataUpdateCount||h.errorUpdateCount>d.errorUpdateCount,isFetching:A,isRefetching:A&&!w,isLoadingError:b&&!c,isPaused:h.fetchStatus==="paused",isPlaceholderData:S,isRefetchError:b&&c,isStale:Ne(e,n),refetch:this.refetch,isEnabled:I(n.enabled,e)!==!1}}updateResult(){const e=r(this,F),n=this.createResult(r(this,p),this.options);if(u(this,Z,r(this,p).state),u(this,ae,this.options),r(this,Z).data!==void 0&&u(this,ue,r(this,p)),ve(n,e))return;u(this,F,n);const i=(()=>{if(!e)return!0;const{notifyOnChangeProps:o}=this.options,l=typeof o=="function"?o():o;if(l==="all"||!l&&!r(this,ce).size)return!0;const a=new Set(l??r(this,ce));return this.options.throwOnError&&a.add("error"),Object.keys(r(this,F)).some(d=>{const y=d;return r(this,F)[y]!==e[y]&&a.has(y)})})();Be.batch(()=>{i&&this.listeners.forEach(o=>{o(r(this,F))}),r(this,T).getQueryCache().notify({query:r(this,p),type:"observerResultsUpdated"})})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&v(this,g,Oe).call(this)}},T=new WeakMap,p=new WeakMap,pe=new WeakMap,F=new WeakMap,Z=new WeakMap,ae=new WeakMap,j=new WeakMap,fe=new WeakMap,oe=new WeakMap,ue=new WeakMap,X=new WeakMap,ee=new WeakMap,Q=new WeakMap,ce=new WeakMap,g=new WeakSet,le=function(e){v(this,g,_e).call(this);let n=r(this,p).fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(de)),n},Re=function(e){return!qe()&&I(this.options.enabled,r(this,p))!==!1&&tt(e)},Ie=function(){v(this,g,Te).call(this);const e=I(this.options.staleTime,r(this,p));if(r(this,F).isStale||!v(this,g,Re).call(this,e))return;const n=nt(r(this,F).dataUpdatedAt,e)+1;u(this,X,V.setTimeout(()=>{r(this,F).isStale||this.updateResult()},n))},De=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,p)):this.options.refetchInterval)??!1},Ee=function(e){v(this,g,Fe).call(this),u(this,Q,e),!(r(this,Q)===0||!v(this,g,Re).call(this,r(this,Q)))&&u(this,ee,V.setInterval(()=>{(this.options.refetchIntervalInBackground||ot.isFocused())&&v(this,g,le).call(this)},r(this,Q)))},Oe=function(){v(this,g,Ie).call(this),v(this,g,Ee).call(this,v(this,g,De).call(this))},Te=function(){r(this,X)!==void 0&&(V.clearTimeout(r(this,X)),u(this,X,void 0))},Fe=function(){r(this,ee)!==void 0&&(V.clearInterval(r(this,ee)),u(this,ee,void 0))},_e=function(){const e=r(this,T).getQueryCache().build(r(this,T),this.options);if(e===r(this,p))return;const n=r(this,p);u(this,p,e),u(this,pe,e.state),this.hasListeners()&&(n==null||n.removeObserver(this),e.addObserver(this))},Xe);function kt(t,e){return I(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&I(e.retryOnMount,t)===!1)}function Ve(t,e){return kt(t,e)||t.state.data!==void 0&&Ae(t,e,e.refetchOnMount)}function Ae(t,e,n){if(I(e.enabled,t)!==!1&&I(e.staleTime,t)!=="static"){const s=typeof n=="function"?n(t):n;return s==="always"||s!==!1&&Ne(t,e)}return!1}function We(t,e,n,s){return(t!==e||I(s.enabled,t)===!1)&&(!n.suspense||t.state.status!=="error")&&Ne(t,n)}function Ne(t,e){return I(e.enabled,t)!==!1&&t.isStaleByTime(I(e.staleTime,t))}const dt=G.createContext(!1),zt=()=>G.useContext(dt);dt.Provider;function Lt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}const Mt=G.createContext(Lt()),Qt=()=>G.useContext(Mt),xt=(t,e,n)=>{const s=n!=null&&n.state.error&&typeof t.throwOnError=="function"?at(t.throwOnError,[n.state.error,n]):t.throwOnError;(t.suspense||s)&&(e.isReset()||(t.retryOnMount=!1))},Vt=t=>{G.useEffect(()=>{t.clearReset()},[t])},Wt=({result:t,errorResetBoundary:e,throwOnError:n,query:s,suspense:i})=>t.isError&&!e.isReset()&&!t.isFetching&&s&&(i&&t.data===void 0||at(n,[t.error,s])),Kt=t=>{if(t.suspense){const n=i=>i==="static"?i:Math.max(i??1e3,1e3),s=t.staleTime;t.staleTime=typeof s=="function"?(...i)=>n(s(...i)):n(s),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Yt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Ht=(t,e,n)=>e.fetchOptimistic(t).catch(()=>{n.clearReset()});function Jt(t,e,n){const s=zt(),i=Qt(),o=vt(),l=o.defaultQueryOptions(t),a=o.getQueryCache().get(l.queryHash),d=t.subscribed!==!1;l._optimisticResults=s?"isRestoring":d?"optimistic":void 0,Kt(l),xt(l,i,a),Vt(i);const[y]=G.useState(()=>new e(o,l)),h=y.getOptimisticResult(l),S=!s&&d;if(G.useSyncExternalStore(G.useCallback(m=>{const D=S?y.subscribe(Be.batchCalls(m)):de;return y.updateResult(),D},[y,S]),()=>y.getCurrentResult(),()=>y.getCurrentResult()),G.useEffect(()=>{y.setOptions(l)},[l,y]),Yt(l,h))throw Ht(l,y,i);if(Wt({result:h,errorResetBoundary:i,throwOnError:l.throwOnError,query:a,suspense:l.suspense}))throw h.error;return l.notifyOnChangeProps?h:y.trackResult(h)}function Tn(t,e){return Jt(t,jt)}const ht={};var be={};const Zt="https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql",Xt="https://ly-budget-gql-dev-702918025200.asia-east1.run.app/api/graphql",en=()=>typeof import.meta<"u"&&typeof ht<"u"?"https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql":typeof process<"u"?be.VITE_GQL_ENDPOINT??be.GQL_ENDPOINT??be.GRAPHQL_ENDPOINT??null:null,tn=()=>typeof import.meta<"u"&&typeof ht<"u"||typeof process<"u"?"production":null,nn=en(),pt=tn();console.log({mode:pt});const ft=nn??(pt==="production"?Zt:Xt);console.log({GQL_ENDPOINTS:ft});const Fn="/";async function _n(t,...[e]){const n=await fetch(ft,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/graphql-response+json"},body:JSON.stringify({query:t,variables:e})});if(!n.ok)throw new Error("Network response was not ok");return(await n.json()).data}var sn=(t=>(t.Asc="asc",t.Desc="desc",t))(sn||{}),rn=(t=>(t.Freeze="freeze",t.Other="other",t.Reduce="reduce",t))(rn||{});class O extends String{constructor(n,s){super(n);me(this,"__apiType");me(this,"value");me(this,"__meta__");this.value=n,this.__meta__=s}toString(){return this.value}}const An=new O(`
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
    `,{fragmentName:"VisualizationProposalBase"}),Un=new O(`
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
}`,{fragmentName:"VisualizationProposalWithContext"}),an=new O(`
    query GetLatestBudgetYear($skip: Int!, $take: Int!) {
  budgetYears(orderBy: [{year: desc}], skip: $skip, take: $take) {
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),on=new O(`
    query GetBudgetYearsList {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),un=new O(`
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
    `),cn=new O(`
    query GetGovernments {
  governments {
    id
    name
    category
    description
  }
}
    `),ln=new O(`
    query GetProposalGovernments($where: ProposalWhereInput!) {
  proposals(where: $where) {
    government {
      id
      name
      category
      description
    }
  }
}
    `),dn=new O(`
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
    `),hn=new O(`
    query RecognitionImages {
  recognitionImages(where: {verificationStatus: {equals: "verified"}}) {
    result
  }
  recognitionImagesCount
}
    `),pn=new O(`
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
    `),fn=new O(`
    query GetProposalsOrderedByIdDesc {
  proposals(orderBy: [{id: desc}]) {
    id
    description
    reason
    publishStatus
    result
    freezeAmount
    reductionAmount
    cost
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
    `),mn=new O(`
    query GetProposalById($id: ID!) {
  proposal(where: {id: $id}) {
    id
    description
    reason
    publishStatus
    result
    freezeAmount
    reductionAmount
    cost
    budgetImageUrls
    budgetImageUrl
    proposalTypes
    recognitionAnswer
    unfreezeStatus
    unfreezeReport
    react_angry
    react_disappoint
    react_good
    react_whatever
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
    `),yn=new O(`
    query GetProposalYears {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),gn=new O(`
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
    cost
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
    `),vn=new O(`
    mutation UPDATE_PROPOSAL_REACTS($where: ProposalWhereUniqueInput!, $data: ProposalUpdateInput!) {
  updateProposal(where: $where, data: $data) {
    id
    react_angry
    react_disappoint
    react_good
    react_whatever
  }
}
    `),bn=new O(`
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
}`),Pn={"\n  query GetLatestBudgetYear($skip: Int!, $take: Int!) {\n    budgetYears(orderBy: [{ year: desc }], skip: $skip, take: $take) {\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":an,"\n  query GetBudgetYearsList {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":on,"\n  query GetBudgetsWithGovernment {\n    budgets {\n      id\n      type\n      year\n      projectName\n      projectDescription\n      budgetAmount\n      majorCategory\n      mediumCategory\n      minorCategory\n      description\n      government {\n        id\n        name\n        category\n      }\n    }\n    budgetsCount\n  }\n":un,"\n  query GetGovernments {\n    governments {\n      id\n      name\n      category\n      description\n    }\n  }\n":cn,"\n  query GetProposalGovernments($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      government {\n        id\n        name\n        category\n        description\n      }\n    }\n  }\n":ln,"\n  query GetPeopleList {\n    peopleList(orderBy: [{ name: asc }]) {\n      id\n      name\n      type\n      description\n      party {\n        id\n        name\n      }\n    }\n  }\n":dn,'\n  query RecognitionImages {\n    recognitionImages(where: { verificationStatus: { equals: "verified" } }) {\n      result\n    }\n    recognitionImagesCount\n  }\n':hn,"\n  query People($where: PeopleWhereUniqueInput!) {\n    people(where: $where) {\n      id\n      name\n      description\n      party {\n        id\n        color\n        name\n      }\n      term {\n        termNumber\n        id\n      }\n      termCount\n      committees {\n        id\n        name\n        session\n        term {\n          id\n          startDate\n          termNumber\n        }\n      }\n    }\n  }\n":pn,"\n  query GetProposalsOrderedByIdDesc {\n    proposals(orderBy: [{ id: desc }]) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        budgetAmount\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n    }\n    proposalsCount\n  }\n":fn,"\n  query GetProposalById($id: ID!) {\n    proposal(where: { id: $id }) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrls\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      unfreezeReport\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      historicalParentProposals {\n        id\n      }\n      mergedParentProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n      }\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        projectDescription\n        budgetAmount\n        budgetUrl\n        lastYearSettlement\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n        description\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n      meetings(orderBy: [{ meetingDate: desc }]) {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      unfreezeHistory {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      mergedProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n        meetings {\n          id\n        }\n        proposers {\n          id\n          name\n        }\n      }\n    }\n  }\n":mn,"\n  query GetProposalYears {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":yn,"\n  query GetPaginatedProposals(\n    $skip: Int!\n    $take: Int!\n    $orderBy: [ProposalOrderByInput!]!\n    $where: ProposalWhereInput!\n  ) {\n    proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {\n      id\n      description\n      year {\n        id\n        year\n      }\n      unfreezeStatus\n      meetings {\n        id\n        type\n        meetingDate\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      reason\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      proposalTypes\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      government {\n        id\n        name\n      }\n      budget {\n        id\n        budgetAmount\n      }\n      proposers {\n        id\n        name\n      }\n    }\n    proposalsCount(where: $where)\n  }\n":gn,"\n  mutation UPDATE_PROPOSAL_REACTS(\n    $where: ProposalWhereUniqueInput!\n    $data: ProposalUpdateInput!\n  ) {\n    updateProposal(where: $where, data: $data) {\n      id\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n    }\n  }\n":vn,"\n  query GetVisualizationProposals($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      ...VisualizationProposalWithContext\n    }\n  }\n\n  fragment VisualizationProposalWithContext on Proposal {\n    ...VisualizationProposalBase\n    government {\n      name\n      category\n    }\n    year {\n      year\n    }\n  }\n\n  fragment VisualizationProposalBase on Proposal {\n    id\n    freezeAmount\n    reductionAmount\n    proposalTypes\n    proposers {\n      id\n      name\n      party {\n        name\n        color\n      }\n    }\n  }\n":bn};function qn(t){return Pn[t]??{}}export{Fn as E,ft as G,sn as O,rn as P,On as Q,Bt as R,Ge as S,Un as V,de as a,In as b,Rn as c,Pe as d,_n as e,ot as f,Cn as g,Ct as h,qn as i,An as j,En as k,ve as l,Dn as m,Be as n,ut as o,ye as p,vt as q,I as r,rt as s,at as t,Tn as u,Gt as v};
