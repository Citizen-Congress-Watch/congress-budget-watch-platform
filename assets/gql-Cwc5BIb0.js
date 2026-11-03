var bt=Object.defineProperty;var Me=t=>{throw TypeError(t)};var Pt=(t,e,n)=>e in t?bt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ye=(t,e,n)=>Pt(t,typeof e!="symbol"?e+"":e,n),ve=(t,e,n)=>e.has(t)||Me("Cannot "+n);var r=(t,e,n)=>(ve(t,e,"read from private field"),n?n.call(t):e.get(t)),d=(t,e,n)=>e.has(t)?Me("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),u=(t,e,n,s)=>(ve(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),g=(t,e,n)=>(ve(t,e,"access private method"),n);import{r as B,j as wt}from"./jsx-runtime-CmMgrD05.js";const st=B.createContext(void 0),St=t=>{const e=B.useContext(st);if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Dn=({client:t,children:e})=>(B.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),wt.jsx(st.Provider,{value:t,children:e})),Ct={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)};var z,qe,Je,Rt=(Je=class{constructor(){d(this,z,Ct);d(this,qe,!1)}setTimeoutProvider(t){u(this,z,t)}setTimeout(t,e){return r(this,z).setTimeout(t,e)}clearTimeout(t){r(this,z).clearTimeout(t)}setInterval(t,e){return r(this,z).setInterval(t,e)}clearInterval(t){r(this,z).clearInterval(t)}},z=new WeakMap,qe=new WeakMap,Je);const x=new Rt;function It(t){setTimeout(t,0)}const Dt=typeof window>"u"||"Deno"in globalThis;function de(){}function En(t,e){return typeof t=="function"?t(e):t}function rt(t){return typeof t=="number"&&t>=0&&t!==1/0}function it(t,e){return Math.max(t+(e||0)-Date.now(),0)}function D(t,e){return typeof t=="function"?t(e):t}function On(t,e){const{type:n="all",exact:s,fetchStatus:i,predicate:o,queryKey:c,stale:a}=t;if(c){if(s){if(e.queryHash!==Et(c,e.options))return!1}else if(!ge(e.queryKey,c))return!1}if(n!=="all"){const l=e.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof a=="boolean"&&e.isStale()!==a||i&&i!==e.state.fetchStatus||o&&!o(e))}function Tn(t,e){const{exact:n,status:s,predicate:i,mutationKey:o}=t;if(o){if(!e.options.mutationKey)return!1;if(n){if(we(e.options.mutationKey)!==we(o))return!1}else if(!ge(e.options.mutationKey,o))return!1}return!(s&&e.state.status!==s||i&&!i(e))}function Et(t,e){return((e==null?void 0:e.queryKeyHashFn)||we)(t)}function we(t){return JSON.stringify(t,(e,n)=>Se(n)?Object.keys(n).sort().reduce((s,i)=>(s[i]=n[i],s),{}):n)}function ge(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(Array.isArray(t)&&Array.isArray(e)){if(e.length>t.length)return!1;for(let s=0;s<e.length;s++)if(!ge(t[s],e[s]))return!1;return!0}const n=Object.keys(e);for(const s of n)if(!ge(t[s],e[s]))return!1;return!0}return!1}const at=Object.prototype.hasOwnProperty;function ot(t,e,n=0){if(t===e)return t;if(n>500)return e;const s=Qe(t)&&Qe(e);if(!s&&!(Se(t)&&Se(e)))return e;const i=(s?t:Object.keys(t)).length,o=s?e:Object.keys(e),c=o.length,a=s?new Array(c):{};let l=0;for(let b=0;b<c;b++){const h=s?b:o[b],R=t[h],f=e[h];if(R===f){a[h]=R,(s?b<i:at.call(t,h))&&l++;continue}if(R===null||f===null||typeof R!="object"||typeof f!="object"){a[h]=f;continue}const O=ot(R,f,n+1);a[h]=O,O===R&&l++}return i===c&&l===i?t:a}function be(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const n of Object.keys(t))if(!at.call(e,n)||t[n]!==e[n])return!1;return!0}function Qe(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function Se(t){if(!xe(t))return!1;const e=Object.getPrototypeOf(t),n=e==null?void 0:e.constructor;if(n===void 0)return!0;if(typeof n!="function")return!1;const s=n.prototype;return!(!xe(s)||!s.hasOwnProperty("isPrototypeOf")||e!==Object.prototype)}function xe(t){return Object.prototype.toString.call(t)==="[object Object]"}function Ot(t){return new Promise(e=>{x.setTimeout(e,t)})}function Ce(t,e,n){return typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?ot(t,e):e}function Fn(t){return t}function Tt(t,e,n=0){const s=[...t,e];return n&&s.length>n?s.slice(-n):s}function Ft(t,e,n=0){const s=[e,...t];return n&&s.length>n?s.slice(0,n):s}const ut=Symbol();function ct(t,e){return!t.queryFn&&(e!=null&&e.initialPromise)?()=>e.initialPromise:!t.queryFn||t.queryFn===ut?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function lt(t,e){return typeof t=="function"?t(...e):!!t}const Ge=Symbol();function _t(t,e,n,s){let i=!1,o;return Object.defineProperties(t,{[Ge]:{value:s},signal:{enumerable:!0,get:()=>(o??(o=e()),i||(i=!0,o.aborted?n():o.addEventListener("abort",n,{once:!0})),o)}}),t}let At=()=>Dt;const Be=()=>At();var Ne=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},V,L,te,Ze,Ut=(Ze=class extends Ne{constructor(){super();d(this,V);d(this,L);d(this,te);u(this,te,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){r(this,L)||this.setEventListener(r(this,te))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,L))==null||e.call(this),u(this,L,void 0))}setEventListener(e){var n;u(this,te,e),(n=r(this,L))==null||n.call(this),u(this,L,e(s=>{typeof s=="boolean"?this.setFocused(s):this.onFocus()}))}setFocused(e){r(this,V)!==e&&(u(this,V,e),this.onFocus())}onFocus(){const e=this.isFocused();this.listeners.forEach(n=>{n(e)})}isFocused(){var e;return typeof r(this,V)=="boolean"?r(this,V):((e=globalThis.document)==null?void 0:e.visibilityState)!=="hidden"}},V=new WeakMap,L=new WeakMap,te=new WeakMap,Ze);const ht=new Ut,qt=It;function Gt(){let t=[],e=0,n=a=>{a()},s=a=>{a()},i=qt;const o=a=>{e?t.push(a):i(()=>{n(a)})},c=()=>{const a=t;t=[],a.length&&i(()=>{s(()=>{a.forEach(l=>{n(l)})})})};return{batch:a=>{let l;e++;try{l=a()}finally{e--,e||c()}return l},batchCalls:a=>(...l)=>{o(()=>{a(...l)})},schedule:o,setNotifyFunction:a=>{n=a},setBatchNotifyFunction:a=>{s=a},setScheduler:a=>{i=a}}}const $e=Gt();var ne,M,se,Xe,Bt=(Xe=class extends Ne{constructor(){super();d(this,ne,!0);d(this,M);d(this,se);u(this,se,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e(!0),s=()=>e(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",s)}}})}onSubscribe(){r(this,M)||this.setEventListener(r(this,se))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,M))==null||e.call(this),u(this,M,void 0))}setEventListener(e){var n;u(this,se,e),(n=r(this,M))==null||n.call(this),u(this,M,e(this.setOnline.bind(this)))}setOnline(e){r(this,ne)!==e&&(u(this,ne,e),this.listeners.forEach(n=>{n(e)}))}isOnline(){return r(this,ne)}},ne=new WeakMap,M=new WeakMap,se=new WeakMap,Xe);const dt=new Bt;function Nt(t){return Math.min(1e3*2**t,3e4)}function pt(t){return(t??"online")==="online"?dt.isOnline():!0}var Re=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function $t(t){let e=!1,n=0,s,i="pending",o,c;const a=new Promise((S,I)=>{o=S,c=I});a.catch(de);const l=()=>i!=="pending",b=S=>{var I;if(!l()){const m=new Re(S);w(m),(I=t.onCancel)==null||I.call(t,m)}},h=()=>{e=!0},R=()=>{e=!1},f=()=>ht.isFocused()&&(t.networkMode==="always"||dt.isOnline())&&t.canRun(),O=()=>pt(t.networkMode)&&t.canRun(),P=S=>{l()||(s==null||s(),i="resolved",o(S))},w=S=>{l()||(s==null||s(),i="rejected",c(S))},T=S=>new Promise(I=>{var m;s=C=>{(l()||S())&&I(C)},(m=t.onPause)==null||m.call(t)}).then(()=>{var I;s=void 0,l()||(I=t.onContinue)==null||I.call(t)}),_=()=>{if(l())return;let S;const I=n===0?t.initialPromise:void 0;try{S=I??t.fn()}catch(m){S=Promise.reject(m)}Promise.resolve(S).then(P).catch(m=>{var ee;if(l())return;const C=t.retry??(Be()?0:3),v=t.retryDelay??Nt,q=typeof v=="function"?v(n,m):v,le=C===!0||typeof C=="number"&&n<C||typeof C=="function"&&C(n,m);if(e||!le){w(m);return}n++,(ee=t.onFail)==null||ee.call(t,n,m),Ot(q).then(()=>l()||f()?void 0:T(f)).then(()=>{e?w(m):_()})})};return{promise:a,status:()=>i,cancel:b,continue:()=>(s==null||s(),a),cancelRetry:h,continueRetry:R,canStart:O,start:()=>(O()?_():T(O).then(_),a)}}var W,et,kt=(et=class{constructor(){d(this,W)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),rt(this.gcTime)&&u(this,W,x.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(Be()?1/0:3e5))}clearGcTimeout(){r(this,W)!==void 0&&(x.clearTimeout(r(this,W)),u(this,W,void 0))}},W=new WeakMap,et);function jt(t){return{onFetch:(e,n)=>{var h,R,f,O,P;const s=e.options,i=(f=(R=(h=e.fetchOptions)==null?void 0:h.meta)==null?void 0:R.fetchMore)==null?void 0:f.direction,o=((O=e.state.data)==null?void 0:O.pages)||[],c=((P=e.state.data)==null?void 0:P.pageParams)||[];let a={pages:[],pageParams:[]},l=0;const b=async()=>{let w=!1;const T=e,_=m=>{_t(m,()=>e.signal,()=>w=!0,T[Ge])},S=ct(e.options,e.fetchOptions),I=async(m,C,v)=>{if(w)return Promise.reject(e.signal.reason);if(C==null&&m.pages.length)return Promise.resolve(m);const le=(()=>{const Le={client:e.client,queryKey:e.queryKey,pageParam:C,direction:v?"backward":"forward",meta:e.options.meta};return _(Le),Le})(),ee=await S(le),{maxPages:je}=e.options,ze=v?Ft:Tt;return{pages:ze(m.pages,ee,je),pageParams:ze(m.pageParams,C,je)}};if(i&&o.length){const m=i==="backward",C=m?zt:Ve,v={pages:o,pageParams:c};a=await I(v,C(s,v),m)}else{const m=t??o.length;do{const C=l===0?c[0]===void 0?s.initialPageParam:c[0]:Ve(s,a);if(l>0&&C==null)break;a=await I(a,C),l++}while(l<m)}return a};e.options.persister?e.fetchFn=()=>{var w,T;return(T=(w=e.options).persister)==null?void 0:T.call(w,b,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},n)}:e.fetchFn=b}}}function Ve(t,{pages:e,pageParams:n}){const s=e.length-1;return e.length>0?t.getNextPageParam(e[s],e,n[s],n):void 0}function zt(t,{pages:e,pageParams:n}){var s;return e.length>0?(s=t.getPreviousPageParam)==null?void 0:s.call(t,e[0],e,n[0],n):void 0}var re,K,ie,G,Y,E,k,pe,H,N,$,tt,_n=(tt=class extends kt{constructor(e){super();d(this,N);d(this,re);d(this,K);d(this,ie);d(this,G);d(this,Y);d(this,E);d(this,k);d(this,pe);d(this,H);u(this,H,!1),u(this,pe,e.defaultOptions),this.setOptions(e.options),this.observers=[],u(this,Y,e.client),u(this,G,r(this,Y).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,u(this,K,Ke(this.options)),this.state=e.state??r(this,K),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return r(this,re)}get promise(){var e;return(e=r(this,E))==null?void 0:e.promise}setOptions(e){if(this.options={...r(this,pe),...e},e!=null&&e._type&&u(this,re,e._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=Ke(this.options);n.data!==void 0&&(this.setState(We(n.data,n.dataUpdatedAt)),u(this,K,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,G).remove(this)}setData(e,n){const s=Ce(this.state.data,e,this.options);return g(this,N,$).call(this,{data:s,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),s}setState(e){g(this,N,$).call(this,{type:"setState",state:e})}cancel(e){var s,i;const n=(s=r(this,E))==null?void 0:s.promise;return(i=r(this,E))==null||i.cancel(e),n?n.then(de).catch(de):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return r(this,K)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(e=>D(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===ut||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.state.data===void 0?!1:this.getObserversCount()>0?this.observers.some(e=>D(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!it(this.state.dataUpdatedAt,e)}onFocus(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnWindowFocus()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,E))==null||n.continue()}onOnline(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnReconnect()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,E))==null||n.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),r(this,G).notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){const n=this.observers.indexOf(e);n!==-1&&(this.observers.splice(n,1),this.observers.length||(r(this,E)&&(r(this,H)||this.state.fetchStatus==="paused"&&this.state.status==="pending"?r(this,E).cancel({revert:!0}):r(this,E).cancelRetry()),this.scheduleGc()),r(this,G).notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||g(this,N,$).call(this,{type:"invalidate"})}async fetch(e,n){var h,R,f,O;if(this.state.fetchStatus!=="idle"&&((h=r(this,E))==null?void 0:h.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(r(this,E)&&r(this,k))return r(this,E).continueRetry(),r(this,k)}if(e&&this.setOptions(e),!this.options.queryFn){const P=this.observers.find(w=>w.options.queryFn);P&&this.setOptions(P.options)}const s=new AbortController,i=P=>{Object.defineProperties(P,{[Ge]:{value:s.signal,enumerable:!0},signal:{enumerable:!0,get:()=>(u(this,H,!0),s.signal)}})},o=()=>{const P=ct(this.options,n),T=(()=>{const _={client:r(this,Y),queryKey:this.queryKey,meta:this.meta};return i(_),_})();return u(this,H,!1),this.options.persister?this.options.persister(P,T,this):P(T)},a=(()=>{const P={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:r(this,Y),state:this.state,fetchFn:o};return i(P),P})();(R=r(this,re)==="infinite"?jt(this.options.pages):this.options.behavior)==null||R.onFetch(a,this),u(this,ie,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((f=a.fetchOptions)==null?void 0:f.meta))&&g(this,N,$).call(this,{type:"fetch",meta:(O=a.fetchOptions)==null?void 0:O.meta});const l=u(this,E,$t({initialPromise:n==null?void 0:n.initialPromise,fn:a.fetchFn,onCancel:P=>{P instanceof Re&&P.revert&&this.setState({...r(this,ie),fetchStatus:"idle"}),s.abort()},onFail:(P,w)=>{g(this,N,$).call(this,{type:"failed",failureCount:P,error:w})},onPause:()=>{g(this,N,$).call(this,{type:"pause"})},onContinue:()=>{g(this,N,$).call(this,{type:"continue"})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0})),b=(async()=>{var P,w,T,_,S,I,m,C;try{const v=await l.promise;if(v===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(v),(w=(P=r(this,G).config).onSuccess)==null||w.call(P,v,this),(_=(T=r(this,G).config).onSettled)==null||_.call(T,v,this.state.error,this),v}catch(v){if(v instanceof Re){if(v.silent){if(r(this,E)!==l&&r(this,k))return r(this,k);throw v}else if(v.revert){if(this.state.data===void 0)throw v;return this.state.data}}throw g(this,N,$).call(this,{type:"error",error:v}),(I=(S=r(this,G).config).onError)==null||I.call(S,v,this),(C=(m=r(this,G).config).onSettled)==null||C.call(m,this.state.data,v,this),v}finally{r(this,E)===l&&(u(this,E,void 0),u(this,k,void 0)),this.scheduleGc()}})();return u(this,k,b),l.start(),b}},re=new WeakMap,K=new WeakMap,ie=new WeakMap,G=new WeakMap,Y=new WeakMap,E=new WeakMap,k=new WeakMap,pe=new WeakMap,H=new WeakMap,N=new WeakSet,$=function(e){const n=s=>{switch(e.type){case"failed":return{...s,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,...ft(s.data,this.options),fetchMeta:e.meta??null};case"success":const i={...s,...We(e.data,e.dataUpdatedAt),dataUpdateCount:s.dataUpdateCount+1,...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return u(this,ie,e.manual?i:void 0),i;case"error":const o=e.error;return{...s,error:o,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:o,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...e.state}}};this.state=n(this.state),$e.batch(()=>{this.observers.slice().forEach(s=>{s.onQueryUpdate()}),r(this,G).notify({query:this,type:"updated",action:e})})},tt);function ft(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:pt(e.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function We(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function Ke(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=e!==void 0,s=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var A,p,fe,U,J,ae,j,me,oe,ue,Z,X,Q,ce,y,he,Ie,De,Ee,Oe,Te,Fe,_e,Ae,nt,Lt=(nt=class extends Ne{constructor(e,n){super();d(this,y);d(this,A);d(this,p);d(this,fe);d(this,U);d(this,J);d(this,ae);d(this,j);d(this,me);d(this,oe);d(this,ue);d(this,Z);d(this,X);d(this,Q);d(this,ce,new Set);this.options=n,u(this,A,e),u(this,j,null),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,p).addObserver(this),Ye(r(this,p),this.options)?g(this,y,he).call(this):this.updateResult(),g(this,y,Te).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ue(r(this,p),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ue(r(this,p),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,g(this,y,Fe).call(this),g(this,y,_e).call(this),r(this,p).removeObserver(this)}setOptions(e){const n=this.options,s=r(this,p);if(this.options=r(this,A).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof D(this.options.enabled,r(this,p))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");g(this,y,Ae).call(this),r(this,p).setOptions(this.options),n._defaulted&&!be(this.options,n)&&r(this,A).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,p),observer:this});const i=this.hasListeners();i&&He(r(this,p),s,this.options,n)&&g(this,y,he).call(this),this.updateResult(),i&&(r(this,p)!==s||D(this.options.enabled,r(this,p))!==D(n.enabled,r(this,p))||D(this.options.staleTime,r(this,p))!==D(n.staleTime,r(this,p)))&&g(this,y,De).call(this);const o=g(this,y,Ee).call(this);i&&(r(this,p)!==s||D(this.options.enabled,r(this,p))!==D(n.enabled,r(this,p))||o!==r(this,Q))&&g(this,y,Oe).call(this,o)}getOptimisticResult(e){const n=r(this,A).getQueryCache().build(r(this,A),e),s=this.createResult(n,e);return be(this.getCurrentResult(),s)||(u(this,U,s),u(this,ae,this.options),u(this,J,r(this,p).state)),s}getCurrentResult(){return r(this,U)}trackResult(e,n){return new Proxy(e,{get:(s,i)=>(this.trackProp(i),n==null||n(i),Reflect.get(s,i))})}trackProp(e){r(this,ce).add(e)}getCurrentQuery(){return r(this,p)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const n=r(this,A).defaultQueryOptions(e),s=r(this,A).getQueryCache().build(r(this,A),n);let i=()=>{},o;const c=new Promise(a=>{o=a,i=r(this,A).getQueryCache().subscribe(l=>{l.type==="updated"&&l.query.queryHash===s.queryHash&&s.state.data!==void 0&&(i(),a(this.createResult(s,n)))})});return Promise.race([s.fetch(n).then(()=>{const a=this.createResult(s,n);return o==null||o(a),a}).finally(()=>{i()}),c])}fetch(e){return g(this,y,he).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,U)))}createResult(e,n){var v;const s=r(this,p),i=this.options,o=r(this,U),c=r(this,J),a=r(this,ae),l=e!==s?e.state:r(this,fe),{state:b}=e;let h={...b},R=!1,f;if(n._optimisticResults){const q=this.hasListeners(),le=!q&&Ye(e,n),ee=q&&He(e,s,n,i);(le||ee)&&(h={...h,...ft(b.data,e.options)}),n._optimisticResults==="isRestoring"&&(h.fetchStatus="idle")}let{error:O,errorUpdatedAt:P,status:w}=h;f=h.data;let T=!1;if(n.placeholderData!==void 0&&f===void 0&&w==="pending"){let q;o!=null&&o.isPlaceholderData&&n.placeholderData===(a==null?void 0:a.placeholderData)?(q=o.data,T=!0):q=typeof n.placeholderData=="function"?n.placeholderData((v=r(this,ue))==null?void 0:v.state.data,r(this,ue)):n.placeholderData,q!==void 0&&(w="success",f=Ce(o==null?void 0:o.data,q,n),R=!0)}if(n.select&&f!==void 0&&!T)if(o&&f===(c==null?void 0:c.data)&&n.select===r(this,me))f=r(this,oe);else try{u(this,me,n.select),f=n.select(f),f=Ce(o==null?void 0:o.data,f,n),u(this,oe,f),u(this,j,null)}catch(q){u(this,j,q)}else f===void 0&&u(this,j,null);r(this,j)&&(O=r(this,j),f=r(this,oe),P=Date.now(),w="error",R=!1);const _=h.fetchStatus==="fetching",S=w==="pending",I=w==="error",m=S&&_,C=f!==void 0;return{status:w,fetchStatus:h.fetchStatus,isPending:S,isSuccess:w==="success",isError:I,isInitialLoading:m,isLoading:m,data:f,dataUpdatedAt:h.dataUpdatedAt,error:O,errorUpdatedAt:P,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:h.dataUpdateCount>l.dataUpdateCount||h.errorUpdateCount>l.errorUpdateCount,isFetching:_,isRefetching:_&&!S,isLoadingError:I&&!C,isPaused:h.fetchStatus==="paused",isPlaceholderData:R,isRefetchError:I&&C,isStale:ke(e,n),refetch:this.refetch,isEnabled:D(n.enabled,e)!==!1}}updateResult(){const e=r(this,U),n=this.createResult(r(this,p),this.options);if(u(this,J,r(this,p).state),u(this,ae,this.options),r(this,J).data!==void 0&&u(this,ue,r(this,p)),be(n,e))return;u(this,U,n);const i=(()=>{if(!e)return!0;const{notifyOnChangeProps:o}=this.options,c=typeof o=="function"?o():o;if(c==="all"||!c&&!r(this,ce).size||this.options.throwOnError&&r(this,U).error!==e.error)return!0;for(const a of c??r(this,ce))if(r(this,U)[a]!==e[a])return!0;return!1})();$e.batch(()=>{i&&this.listeners.forEach(o=>{o(r(this,U))}),r(this,A).getQueryCache().notify({query:r(this,p),type:"observerResultsUpdated"})})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&g(this,y,Te).call(this)}},A=new WeakMap,p=new WeakMap,fe=new WeakMap,U=new WeakMap,J=new WeakMap,ae=new WeakMap,j=new WeakMap,me=new WeakMap,oe=new WeakMap,ue=new WeakMap,Z=new WeakMap,X=new WeakMap,Q=new WeakMap,ce=new WeakMap,y=new WeakSet,he=function(e){g(this,y,Ae).call(this);let n=r(this,p).fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(de)),n},Ie=function(e){return!Be()&&D(this.options.enabled,r(this,p))!==!1&&rt(e)},De=function(){g(this,y,Fe).call(this);const e=D(this.options.staleTime,r(this,p));if(r(this,U).isStale||!g(this,y,Ie).call(this,e))return;const n=it(r(this,U).dataUpdatedAt,e)+1;u(this,Z,x.setTimeout(()=>{r(this,U).isStale||this.updateResult()},n))},Ee=function(){return D(this.options.refetchInterval,r(this,p))??!1},Oe=function(e){g(this,y,_e).call(this),u(this,Q,e),!(r(this,Q)===0||!g(this,y,Ie).call(this,r(this,Q)))&&u(this,X,x.setInterval(()=>{(this.options.refetchIntervalInBackground||ht.isFocused())&&g(this,y,he).call(this)},r(this,Q)))},Te=function(){g(this,y,De).call(this),g(this,y,Oe).call(this,g(this,y,Ee).call(this))},Fe=function(){r(this,Z)!==void 0&&(x.clearTimeout(r(this,Z)),u(this,Z,void 0))},_e=function(){r(this,X)!==void 0&&(x.clearInterval(r(this,X)),u(this,X,void 0))},Ae=function(){const e=r(this,A).getQueryCache().build(r(this,A),this.options);if(e===r(this,p))return;const n=r(this,p);u(this,p,e),u(this,fe,e.state),this.hasListeners()&&(n==null||n.removeObserver(this),e.addObserver(this))},nt);function Mt(t,e){return D(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&D(e.retryOnMount,t)===!1)}function Ye(t,e){return Mt(t,e)||t.state.data!==void 0&&Ue(t,e,e.refetchOnMount)}function Ue(t,e,n){if(D(e.enabled,t)!==!1&&D(e.staleTime,t)!=="static"){const s=D(n,t);return s==="always"||s!==!1&&ke(t,e)}return!1}function He(t,e,n,s){return(t!==e||D(s.enabled,t)===!1)&&(!n.suspense||t.state.status!=="error")&&ke(t,n)}function ke(t,e){return D(e.enabled,t)!==!1&&t.isStaleByTime(D(e.staleTime,t))}const mt=B.createContext(!1),Qt=()=>B.useContext(mt);mt.Provider;function xt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}const Vt=B.createContext(xt()),Wt=()=>B.useContext(Vt),Kt=(t,e,n)=>{const s=(n==null?void 0:n.state.status)==="error"&&typeof t.throwOnError=="function"?lt(t.throwOnError,[n.state.error,n]):t.throwOnError;(t.suspense||s)&&(e.isReset()||(t.retryOnMount=!1))},Yt=t=>{B.useEffect(()=>{t.clearReset()},[t])},Ht=({result:t,errorResetBoundary:e,throwOnError:n,query:s,suspense:i})=>t.isError&&!e.isReset()&&!t.isFetching&&s&&(i&&t.data===void 0||lt(n,[t.error,s])),Jt=t=>{if(t.suspense){const n=i=>i==="static"?i:Math.max(i??1e3,1e3),s=t.staleTime;t.staleTime=typeof s=="function"?(...i)=>n(s(...i)):n(s),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Zt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Xt=(t,e,n)=>e.fetchOptimistic(t).catch(()=>{n.clearReset()});function en(t,e,n){const s=Qt(),i=Wt(),o=St(),c=o.defaultQueryOptions(t),a=o.getQueryCache().get(c.queryHash),l=t.subscribed!==!1;c._optimisticResults=s?"isRestoring":l?"optimistic":void 0,Jt(c),Kt(c,i,a),Yt(i);const[b]=B.useState(()=>new e(o,c)),h=b.getOptimisticResult(c);B.useEffect(()=>{b.setOptions(c)},[c,b]);const R=!s&&l;if(B.useSyncExternalStore(B.useCallback(f=>{const O=R?b.subscribe($e.batchCalls(f)):de;return b.updateResult(),O},[b,R]),()=>b.getCurrentResult(),()=>b.getCurrentResult()),Zt(c,h))throw Xt(c,b,i);if(Ht({result:h,errorResetBoundary:i,throwOnError:c.throwOnError,query:a,suspense:c.suspense}))throw h.error;return c.notifyOnChangeProps?h:b.trackResult(h)}function An(t,e){return en(t,Lt)}const yt={};var Pe={};const tn="https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql",nn="https://ly-budget-gql-dev-702918025200.asia-east1.run.app/api/graphql",sn=()=>typeof import.meta<"u"&&typeof yt<"u"?"https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql":typeof process<"u"?Pe.VITE_GQL_ENDPOINT??Pe.GQL_ENDPOINT??Pe.GRAPHQL_ENDPOINT??null:null,rn=()=>typeof import.meta<"u"&&typeof yt<"u"||typeof process<"u"?"production":null,an=sn(),gt=rn();console.log({mode:gt});const vt=an??(gt==="production"?tn:nn);console.log({GQL_ENDPOINTS:vt});const Un="/";async function qn(t,...[e]){const n=await fetch(vt,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/graphql-response+json"},body:JSON.stringify({query:t,variables:e})});if(!n.ok)throw new Error("Network response was not ok");return(await n.json()).data}var on=(t=>(t.Asc="asc",t.Desc="desc",t))(on||{}),un=(t=>(t.Freeze="freeze",t.Other="other",t.Reduce="reduce",t))(un||{});class F extends String{constructor(n,s){super(n);ye(this,"__apiType");ye(this,"value");ye(this,"__meta__");this.value=n,this.__meta__=s}toString(){return this.value}}const Gn=new F(`
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
    `,{fragmentName:"VisualizationProposalBase"}),Bn=new F(`
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
}`,{fragmentName:"VisualizationProposalWithContext"}),cn=new F(`
    query GetLatestBudgetYear($skip: Int!, $take: Int!) {
  budgetYears(orderBy: [{year: desc}], skip: $skip, take: $take) {
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),ln=new F(`
    query GetBudgetYearsList {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),hn=new F(`
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
    `),dn=new F(`
    query GetGovernments {
  governments {
    id
    name
    category
    description
  }
}
    `),pn=new F(`
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
    `),fn=new F(`
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
    `),mn=new F(`
    query RecognitionImages {
  recognitionImages(where: {verificationStatus: {equals: "verified"}}) {
    result
  }
  recognitionImagesCount
}
    `),yn=new F(`
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
    `),gn=new F(`
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
    `),vn=new F(`
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
    `),bn=new F(`
    query GetProposalYears {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),Pn=new F(`
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
    `),wn=new F(`
    mutation UPDATE_PROPOSAL_REACTS($where: ProposalWhereUniqueInput!, $data: ProposalUpdateInput!) {
  updateProposal(where: $where, data: $data) {
    id
    react_angry
    react_disappoint
    react_good
    react_whatever
  }
}
    `),Sn=new F(`
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
}`),Cn={"\n  query GetLatestBudgetYear($skip: Int!, $take: Int!) {\n    budgetYears(orderBy: [{ year: desc }], skip: $skip, take: $take) {\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":cn,"\n  query GetBudgetYearsList {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":ln,"\n  query GetBudgetsWithGovernment {\n    budgets {\n      id\n      type\n      year\n      projectName\n      projectDescription\n      budgetAmount\n      majorCategory\n      mediumCategory\n      minorCategory\n      description\n      government {\n        id\n        name\n        category\n      }\n    }\n    budgetsCount\n  }\n":hn,"\n  query GetGovernments {\n    governments {\n      id\n      name\n      category\n      description\n    }\n  }\n":dn,"\n  query GetProposalGovernments($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      government {\n        id\n        name\n        category\n        description\n      }\n    }\n  }\n":pn,"\n  query GetPeopleList {\n    peopleList(orderBy: [{ name: asc }]) {\n      id\n      name\n      type\n      description\n      party {\n        id\n        name\n      }\n    }\n  }\n":fn,'\n  query RecognitionImages {\n    recognitionImages(where: { verificationStatus: { equals: "verified" } }) {\n      result\n    }\n    recognitionImagesCount\n  }\n':mn,"\n  query People($where: PeopleWhereUniqueInput!) {\n    people(where: $where) {\n      id\n      name\n      description\n      party {\n        id\n        color\n        name\n      }\n      term {\n        termNumber\n        id\n      }\n      termCount\n      committees {\n        id\n        name\n        session\n        term {\n          id\n          startDate\n          termNumber\n        }\n      }\n    }\n  }\n":yn,"\n  query GetProposalsOrderedByIdDesc {\n    proposals(orderBy: [{ id: desc }]) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        budgetAmount\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n    }\n    proposalsCount\n  }\n":gn,"\n  query GetProposalById($id: ID!) {\n    proposal(where: { id: $id }) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrls\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      unfreezeReport\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      historicalParentProposals {\n        id\n      }\n      mergedParentProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n      }\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        projectDescription\n        budgetAmount\n        budgetUrl\n        lastYearSettlement\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n        description\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n      meetings(orderBy: [{ meetingDate: desc }]) {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      unfreezeHistory {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      mergedProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n        meetings {\n          id\n        }\n        proposers {\n          id\n          name\n        }\n      }\n    }\n  }\n":vn,"\n  query GetProposalYears {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":bn,"\n  query GetPaginatedProposals(\n    $skip: Int!\n    $take: Int!\n    $orderBy: [ProposalOrderByInput!]!\n    $where: ProposalWhereInput!\n  ) {\n    proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {\n      id\n      description\n      year {\n        id\n        year\n      }\n      unfreezeStatus\n      meetings {\n        id\n        type\n        meetingDate\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      reason\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      proposalTypes\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      government {\n        id\n        name\n      }\n      budget {\n        id\n        budgetAmount\n      }\n      proposers {\n        id\n        name\n      }\n    }\n    proposalsCount(where: $where)\n  }\n":Pn,"\n  mutation UPDATE_PROPOSAL_REACTS(\n    $where: ProposalWhereUniqueInput!\n    $data: ProposalUpdateInput!\n  ) {\n    updateProposal(where: $where, data: $data) {\n      id\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n    }\n  }\n":wn,"\n  query GetVisualizationProposals($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      ...VisualizationProposalWithContext\n    }\n  }\n\n  fragment VisualizationProposalWithContext on Proposal {\n    ...VisualizationProposalBase\n    government {\n      name\n      category\n    }\n    year {\n      year\n    }\n  }\n\n  fragment VisualizationProposalBase on Proposal {\n    id\n    freezeAmount\n    reductionAmount\n    proposalTypes\n    proposers {\n      id\n      name\n      party {\n        name\n        color\n      }\n    }\n  }\n":Sn};function Nn(t){return Cn[t]??{}}export{Un as E,vt as G,on as O,un as P,_n as Q,kt as R,Ne as S,Bn as V,de as a,On as b,En as c,we as d,qn as e,ht as f,Dn as g,Et as h,Nn as i,Gn as j,Fn as k,be as l,Tn as m,$e as n,dt as o,ge as p,St as q,D as r,ut as s,lt as t,An as u,$t as v};
