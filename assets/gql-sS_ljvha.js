var gt=Object.defineProperty;var ze=t=>{throw TypeError(t)};var vt=(t,e,n)=>e in t?gt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ye=(t,e,n)=>vt(t,typeof e!="symbol"?e+"":e,n),be=(t,e,n)=>e.has(t)||ze("Cannot "+n);var r=(t,e,n)=>(be(t,e,"read from private field"),n?n.call(t):e.get(t)),f=(t,e,n)=>e.has(t)?ze("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),u=(t,e,n,s)=>(be(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),g=(t,e,n)=>(be(t,e,"access private method"),n);import{r as B,j as bt}from"./jsx-runtime-DmS2nb87.js";const tt=B.createContext(void 0),Pt=t=>{const e=B.useContext(tt);if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},In=({client:t,children:e})=>(B.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),bt.jsx(tt.Provider,{value:t,children:e})),wt={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)};var z,Ge,Ye,St=(Ye=class{constructor(){f(this,z,wt);f(this,Ge,!1)}setTimeoutProvider(t){u(this,z,t)}setTimeout(t,e){return r(this,z).setTimeout(t,e)}clearTimeout(t){r(this,z).clearTimeout(t)}setInterval(t,e){return r(this,z).setInterval(t,e)}clearInterval(t){r(this,z).clearInterval(t)}},z=new WeakMap,Ge=new WeakMap,Ye);const V=new St;function Ct(t){setTimeout(t,0)}const Rt=typeof window>"u"||"Deno"in globalThis;function he(){}function Dn(t,e){return typeof t=="function"?t(e):t}function we(t){return typeof t=="number"&&t>=0&&t!==1/0}function nt(t,e){return Math.max(t+(e||0)-Date.now(),0)}function te(t,e){return typeof t=="function"?t(e):t}function A(t,e){return typeof t=="function"?t(e):t}function En(t,e){const{type:n="all",exact:s,fetchStatus:i,predicate:o,queryKey:d,stale:a}=t;if(d){if(s){if(e.queryHash!==It(d,e.options))return!1}else if(!ge(e.queryKey,d))return!1}if(n!=="all"){const l=e.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof a=="boolean"&&e.isStale()!==a||i&&i!==e.state.fetchStatus||o&&!o(e))}function On(t,e){const{exact:n,status:s,predicate:i,mutationKey:o}=t;if(o){if(!e.options.mutationKey)return!1;if(n){if(Se(e.options.mutationKey)!==Se(o))return!1}else if(!ge(e.options.mutationKey,o))return!1}return!(s&&e.state.status!==s||i&&!i(e))}function It(t,e){return((e==null?void 0:e.queryKeyHashFn)||Se)(t)}function Se(t){return JSON.stringify(t,(e,n)=>Re(n)?Object.keys(n).sort().reduce((s,i)=>(s[i]=n[i],s),{}):n)}function ge(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(Array.isArray(t)&&Array.isArray(e)){for(let s=0;s<e.length;s++)if(!ge(t[s],e[s]))return!1;return!0}const n=Object.keys(e);for(const s of n)if(!ge(t[s],e[s]))return!1;return!0}return!1}const Dt=Object.prototype.hasOwnProperty;function st(t,e,n=0){if(t===e)return t;if(n>500)return e;const s=Me(t)&&Me(e);if(!s&&!(Re(t)&&Re(e)))return e;const i=(s?t:Object.keys(t)).length,o=s?e:Object.keys(e),d=o.length,a=s?new Array(d):{};let l=0;for(let b=0;b<d;b++){const h=s?b:o[b],S=t[h],m=e[h];if(S===m){a[h]=S,(s?b<i:Dt.call(t,h))&&l++;continue}if(S===null||m===null||typeof S!="object"||typeof m!="object"){a[h]=m;continue}const I=st(S,m,n+1);a[h]=I,I===S&&l++}return i===d&&l===i?t:a}function Ce(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}function Me(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function Re(t){if(!Le(t))return!1;const e=t.constructor;if(e===void 0)return!0;const n=e.prototype;return!(!Le(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(t)!==Object.prototype)}function Le(t){return Object.prototype.toString.call(t)==="[object Object]"}function Et(t){return new Promise(e=>{V.setTimeout(e,t)})}function Ie(t,e,n){return typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?st(t,e):e}function Fn(t){return t}function Ot(t,e,n=0){const s=[...t,e];return n&&s.length>n?s.slice(1):s}function Ft(t,e,n=0){const s=[e,...t];return n&&s.length>n?s.slice(0,-1):s}const rt=Symbol();function it(t,e){return!t.queryFn&&(e!=null&&e.initialPromise)?()=>e.initialPromise:!t.queryFn||t.queryFn===rt?()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)):t.queryFn}function at(t,e){return typeof t=="function"?t(...e):!!t}function Tt(t,e,n){let s=!1,i;return Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(i??(i=e()),s||(s=!0,i.aborted?n():i.addEventListener("abort",n,{once:!0})),i)}),t}const ve=(()=>{let t=()=>Rt;return{isServer(){return t()},setIsServer(e){t=e}}})();var Be=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},W,M,ne,He,_t=(He=class extends Be{constructor(){super();f(this,W);f(this,M);f(this,ne);u(this,ne,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){r(this,M)||this.setEventListener(r(this,ne))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,M))==null||e.call(this),u(this,M,void 0))}setEventListener(e){var n;u(this,ne,e),(n=r(this,M))==null||n.call(this),u(this,M,e(s=>{typeof s=="boolean"?this.setFocused(s):this.onFocus()}))}setFocused(e){r(this,W)!==e&&(u(this,W,e),this.onFocus())}onFocus(){const e=this.isFocused();this.listeners.forEach(n=>{n(e)})}isFocused(){var e;return typeof r(this,W)=="boolean"?r(this,W):((e=globalThis.document)==null?void 0:e.visibilityState)!=="hidden"}},W=new WeakMap,M=new WeakMap,ne=new WeakMap,He);const ot=new _t,At=Ct;function Ut(){let t=[],e=0,n=a=>{a()},s=a=>{a()},i=At;const o=a=>{e?t.push(a):i(()=>{n(a)})},d=()=>{const a=t;t=[],a.length&&i(()=>{s(()=>{a.forEach(l=>{n(l)})})})};return{batch:a=>{let l;e++;try{l=a()}finally{e--,e||d()}return l},batchCalls:a=>(...l)=>{o(()=>{a(...l)})},schedule:o,setNotifyFunction:a=>{n=a},setBatchNotifyFunction:a=>{s=a},setScheduler:a=>{i=a}}}const Ne=Ut();var se,L,re,Je,qt=(Je=class extends Be{constructor(){super();f(this,se,!0);f(this,L);f(this,re);u(this,re,e=>{if(typeof window<"u"&&window.addEventListener){const n=()=>e(!0),s=()=>e(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",s)}}})}onSubscribe(){r(this,L)||this.setEventListener(r(this,re))}onUnsubscribe(){var e;this.hasListeners()||((e=r(this,L))==null||e.call(this),u(this,L,void 0))}setEventListener(e){var n;u(this,re,e),(n=r(this,L))==null||n.call(this),u(this,L,e(this.setOnline.bind(this)))}setOnline(e){r(this,se)!==e&&(u(this,se,e),this.listeners.forEach(n=>{n(e)}))}isOnline(){return r(this,se)}},se=new WeakMap,L=new WeakMap,re=new WeakMap,Je);const ut=new qt;function Gt(t){return Math.min(1e3*2**t,3e4)}function ct(t){return(t??"online")==="online"?ut.isOnline():!0}var De=class extends Error{constructor(t){super("CancelledError"),this.revert=t==null?void 0:t.revert,this.silent=t==null?void 0:t.silent}};function Bt(t){let e=!1,n=0,s,i="pending",o,d;const a=new Promise((w,v)=>{o=w,d=v});a.catch(he);const l=()=>i!=="pending",b=w=>{var v;if(!l()){const P=new De(w);C(P),(v=t.onCancel)==null||v.call(t,P)}},h=()=>{e=!0},S=()=>{e=!1},m=()=>ot.isFocused()&&(t.networkMode==="always"||ut.isOnline())&&t.canRun(),I=()=>ct(t.networkMode)&&t.canRun(),N=w=>{l()||(s==null||s(),i="resolved",o(w))},C=w=>{l()||(s==null||s(),i="rejected",d(w))},T=()=>new Promise(w=>{var v;s=P=>{(l()||m())&&w(P)},(v=t.onPause)==null||v.call(t)}).then(()=>{var w;s=void 0,l()||(w=t.onContinue)==null||w.call(t)}),U=()=>{if(l())return;let w;const v=n===0?t.initialPromise:void 0;try{w=v??t.fn()}catch(P){w=Promise.reject(P)}Promise.resolve(w).then(N).catch(P=>{var x;if(l())return;const c=t.retry??(ve.isServer()?0:3),q=t.retryDelay??Gt,D=typeof q=="function"?q(n,P):q,k=c===!0||typeof c=="number"&&n<c||typeof c=="function"&&c(n,P);if(e||!k){C(P);return}n++,(x=t.onFail)==null||x.call(t,n,P),Et(D).then(()=>m()?void 0:T()).then(()=>{e?C(P):U()})})};return{promise:a,status:()=>i,cancel:b,continue:()=>(s==null||s(),a),cancelRetry:h,continueRetry:S,canStart:I,start:()=>(I()?U():T().then(U),a)}}var K,Ze,Nt=(Ze=class{constructor(){f(this,K)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),we(this.gcTime)&&u(this,K,V.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(ve.isServer()?1/0:3e5))}clearGcTimeout(){r(this,K)!==void 0&&(V.clearTimeout(r(this,K)),u(this,K,void 0))}},K=new WeakMap,Ze);function jt(t){return{onFetch:(e,n)=>{var h,S,m,I,N;const s=e.options,i=(m=(S=(h=e.fetchOptions)==null?void 0:h.meta)==null?void 0:S.fetchMore)==null?void 0:m.direction,o=((I=e.state.data)==null?void 0:I.pages)||[],d=((N=e.state.data)==null?void 0:N.pageParams)||[];let a={pages:[],pageParams:[]},l=0;const b=async()=>{let C=!1;const T=v=>{Tt(v,()=>e.signal,()=>C=!0)},U=it(e.options,e.fetchOptions),w=async(v,P,c)=>{if(C)return Promise.reject(e.signal.reason);if(P==null&&v.pages.length)return Promise.resolve(v);const D=(()=>{const ke={client:e.client,queryKey:e.queryKey,pageParam:P,direction:c?"backward":"forward",meta:e.options.meta};return T(ke),ke})(),k=await U(D),{maxPages:x}=e.options,$e=c?Ft:Ot;return{pages:$e(v.pages,k,x),pageParams:$e(v.pageParams,P,x)}};if(i&&o.length){const v=i==="backward",P=v?$t:Qe,c={pages:o,pageParams:d};a=await w(c,P(s,c),v)}else{const v=t??o.length;do{const P=l===0?d[0]??s.initialPageParam:Qe(s,a);if(l>0&&P==null)break;a=await w(a,P),l++}while(l<v)}return a};e.options.persister?e.fetchFn=()=>{var C,T;return(T=(C=e.options).persister)==null?void 0:T.call(C,b,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},n)}:e.fetchFn=b}}}function Qe(t,{pages:e,pageParams:n}){const s=e.length-1;return e.length>0?t.getNextPageParam(e[s],e,n[s],n):void 0}function $t(t,{pages:e,pageParams:n}){var s;return e.length>0?(s=t.getPreviousPageParam)==null?void 0:s.call(t,e[0],e,n[0],n):void 0}var ie,Y,ae,G,H,R,pe,J,_,lt,j,Xe,Tn=(Xe=class extends Nt{constructor(e){super();f(this,_);f(this,ie);f(this,Y);f(this,ae);f(this,G);f(this,H);f(this,R);f(this,pe);f(this,J);u(this,J,!1),u(this,pe,e.defaultOptions),this.setOptions(e.options),this.observers=[],u(this,H,e.client),u(this,G,r(this,H).getQueryCache()),this.queryKey=e.queryKey,this.queryHash=e.queryHash,u(this,Y,Ve(this.options)),this.state=e.state??r(this,Y),this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return r(this,ie)}get promise(){var e;return(e=r(this,R))==null?void 0:e.promise}setOptions(e){if(this.options={...r(this,pe),...e},e!=null&&e._type&&u(this,ie,e._type),this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=Ve(this.options);n.data!==void 0&&(this.setState(xe(n.data,n.dataUpdatedAt)),u(this,Y,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,G).remove(this)}setData(e,n){const s=Ie(this.state.data,e,this.options);return g(this,_,j).call(this,{data:s,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),s}setState(e){g(this,_,j).call(this,{type:"setState",state:e})}cancel(e){var s,i;const n=(s=r(this,R))==null?void 0:s.promise;return(i=r(this,R))==null||i.cancel(e),n?n.then(he).catch(he):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return r(this,Y)}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(e=>A(e.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===rt||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0?this.observers.some(e=>te(e.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(e=0){return this.state.data===void 0?!0:e==="static"?!1:this.state.isInvalidated?!0:!nt(this.state.dataUpdatedAt,e)}onFocus(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnWindowFocus()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,R))==null||n.continue()}onOnline(){var e,n;(e=this.observers.find(s=>s.shouldFetchOnReconnect()))==null||e.refetch({cancelRefetch:!1}),(n=r(this,R))==null||n.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),r(this,G).notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){const n=this.observers.indexOf(e);n!==-1&&(this.observers.splice(n,1),this.observers.length||(r(this,R)&&(r(this,J)||g(this,_,lt).call(this)?r(this,R).cancel({revert:!0}):r(this,R).cancelRetry()),this.scheduleGc()),r(this,G).notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||g(this,_,j).call(this,{type:"invalidate"})}async fetch(e,n){var b,h,S,m,I,N,C,T,U,w,v,P;if(this.state.fetchStatus!=="idle"&&((b=r(this,R))==null?void 0:b.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(r(this,R))return r(this,R).continueRetry(),r(this,R).promise}if(e&&this.setOptions(e),!this.options.queryFn){const c=this.observers.find(q=>q.options.queryFn);c&&this.setOptions(c.options)}const s=new AbortController,i=c=>{Object.defineProperty(c,"signal",{enumerable:!0,get:()=>(u(this,J,!0),s.signal)})},o=()=>{const c=it(this.options,n),D=(()=>{const k={client:r(this,H),queryKey:this.queryKey,meta:this.meta};return i(k),k})();return u(this,J,!1),this.options.persister?this.options.persister(c,D,this):c(D)},a=(()=>{const c={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:r(this,H),state:this.state,fetchFn:o};return i(c),c})();(h=r(this,ie)==="infinite"?jt(this.options.pages):this.options.behavior)==null||h.onFetch(a,this),u(this,ae,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((S=a.fetchOptions)==null?void 0:S.meta))&&g(this,_,j).call(this,{type:"fetch",meta:(m=a.fetchOptions)==null?void 0:m.meta});const l=u(this,R,Bt({initialPromise:n==null?void 0:n.initialPromise,fn:a.fetchFn,onCancel:c=>{c instanceof De&&c.revert&&this.setState({...r(this,ae),fetchStatus:"idle"}),s.abort()},onFail:(c,q)=>{g(this,_,j).call(this,{type:"failed",failureCount:c,error:q})},onPause:()=>{g(this,_,j).call(this,{type:"pause"})},onContinue:()=>{g(this,_,j).call(this,{type:"continue"})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0}));try{const c=await l.start();if(c===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(c),(N=(I=r(this,G).config).onSuccess)==null||N.call(I,c,this),(T=(C=r(this,G).config).onSettled)==null||T.call(C,c,this.state.error,this),c}catch(c){if(c instanceof De){if(c.silent)return r(this,R).promise;if(c.revert){if(this.state.data===void 0)throw c;return this.state.data}}throw g(this,_,j).call(this,{type:"error",error:c}),(w=(U=r(this,G).config).onError)==null||w.call(U,c,this),(P=(v=r(this,G).config).onSettled)==null||P.call(v,this.state.data,c,this),c}finally{r(this,R)===l&&u(this,R,void 0),this.scheduleGc()}}},ie=new WeakMap,Y=new WeakMap,ae=new WeakMap,G=new WeakMap,H=new WeakMap,R=new WeakMap,pe=new WeakMap,J=new WeakMap,_=new WeakSet,lt=function(){return this.state.fetchStatus==="paused"&&this.state.status==="pending"},j=function(e){const n=s=>{switch(e.type){case"failed":return{...s,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,...dt(s.data,this.options),fetchMeta:e.meta??null};case"success":const i={...s,...xe(e.data,e.dataUpdatedAt),dataUpdateCount:s.dataUpdateCount+1,...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return u(this,ae,e.manual?i:void 0),i;case"error":const o=e.error;return{...s,error:o,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:o,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...e.state}}};this.state=n(this.state),Ne.batch(()=>{this.observers.slice().forEach(s=>{s.onQueryUpdate()}),r(this,G).notify({query:this,type:"updated",action:e})})},Xe);function dt(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:ct(e.networkMode)?"fetching":"paused",...t===void 0&&{error:null,status:"pending"}}}function xe(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function Ve(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=e!==void 0,s=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var O,p,fe,F,Z,oe,$,me,ue,ce,X,ee,Q,le,y,de,Ee,Oe,Fe,Te,_e,Ae,Ue,ht,et,kt=(et=class extends Be{constructor(e,n){super();f(this,y);f(this,O);f(this,p);f(this,fe);f(this,F);f(this,Z);f(this,oe);f(this,$);f(this,me);f(this,ue);f(this,ce);f(this,X);f(this,ee);f(this,Q);f(this,le,new Set);this.options=n,u(this,O,e),u(this,$,null),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,p).addObserver(this),We(r(this,p),this.options)?g(this,y,de).call(this):this.updateResult(),g(this,y,Te).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return qe(r(this,p),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return qe(r(this,p),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,g(this,y,_e).call(this),g(this,y,Ae).call(this),r(this,p).removeObserver(this)}setOptions(e){const n=this.options,s=r(this,p);if(this.options=r(this,O).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof A(this.options.enabled,r(this,p))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");g(this,y,Ue).call(this),r(this,p).setOptions(this.options),n._defaulted&&!Ce(this.options,n)&&r(this,O).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,p),observer:this});const i=this.hasListeners();i&&Ke(r(this,p),s,this.options,n)&&g(this,y,de).call(this),this.updateResult(),i&&(r(this,p)!==s||A(this.options.enabled,r(this,p))!==A(n.enabled,r(this,p))||te(this.options.staleTime,r(this,p))!==te(n.staleTime,r(this,p)))&&g(this,y,Ee).call(this);const o=g(this,y,Oe).call(this);i&&(r(this,p)!==s||A(this.options.enabled,r(this,p))!==A(n.enabled,r(this,p))||o!==r(this,Q))&&g(this,y,Fe).call(this,o)}getOptimisticResult(e){const n=r(this,O).getQueryCache().build(r(this,O),e),s=this.createResult(n,e);return Mt(this,s)&&(u(this,F,s),u(this,oe,this.options),u(this,Z,r(this,p).state)),s}getCurrentResult(){return r(this,F)}trackResult(e,n){return new Proxy(e,{get:(s,i)=>(this.trackProp(i),n==null||n(i),Reflect.get(s,i))})}trackProp(e){r(this,le).add(e)}getCurrentQuery(){return r(this,p)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const n=r(this,O).defaultQueryOptions(e),s=r(this,O).getQueryCache().build(r(this,O),n);let i=()=>{},o;const d=new Promise(a=>{o=a,i=r(this,O).getQueryCache().subscribe(l=>{l.type==="updated"&&l.query.queryHash===s.queryHash&&s.state.data!==void 0&&(i(),a(this.createResult(s,n)))})});return Promise.race([s.fetch().then(()=>{const a=this.createResult(s,n);return o==null||o(a),a}).finally(()=>{i()}),d])}fetch(e){return g(this,y,de).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,F)))}createResult(e,n){var q;const s=r(this,p),i=this.options,o=r(this,F),d=r(this,Z),a=r(this,oe),l=e!==s?e.state:r(this,fe),{state:b}=e;let h={...b},S=!1,m;if(n._optimisticResults){const D=this.hasListeners(),k=!D&&We(e,n),x=D&&Ke(e,s,n,i);(k||x)&&(h={...h,...dt(b.data,e.options)}),n._optimisticResults==="isRestoring"&&(h.fetchStatus="idle")}let{error:I,errorUpdatedAt:N,status:C}=h;m=h.data;let T=!1;if(n.placeholderData!==void 0&&m===void 0&&C==="pending"){let D;o!=null&&o.isPlaceholderData&&n.placeholderData===(a==null?void 0:a.placeholderData)?(D=o.data,T=!0):D=typeof n.placeholderData=="function"?n.placeholderData((q=r(this,ce))==null?void 0:q.state.data,r(this,ce)):n.placeholderData,D!==void 0&&(C="success",m=Ie(o==null?void 0:o.data,D,n),S=!0)}if(n.select&&m!==void 0&&!T)if(o&&m===(d==null?void 0:d.data)&&n.select===r(this,me))m=r(this,ue);else try{u(this,me,n.select),m=n.select(m),m=Ie(o==null?void 0:o.data,m,n),u(this,ue,m),u(this,$,null)}catch(D){u(this,$,D)}else m===void 0&&u(this,$,null);r(this,$)&&(I=r(this,$),m=r(this,ue),N=Date.now(),C="error",S=!1);const U=h.fetchStatus==="fetching",w=C==="pending",v=C==="error",P=w&&U,c=m!==void 0;return{status:C,fetchStatus:h.fetchStatus,isPending:w,isSuccess:C==="success",isError:v,isInitialLoading:P,isLoading:P,data:m,dataUpdatedAt:h.dataUpdatedAt,error:I,errorUpdatedAt:N,failureCount:h.fetchFailureCount,failureReason:h.fetchFailureReason,errorUpdateCount:h.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:h.dataUpdateCount>l.dataUpdateCount||h.errorUpdateCount>l.errorUpdateCount,isFetching:U,isRefetching:U&&!w,isLoadingError:v&&!c,isPaused:h.fetchStatus==="paused",isPlaceholderData:S,isRefetchError:v&&c,isStale:je(e,n),refetch:this.refetch,isEnabled:A(n.enabled,e)!==!1}}updateResult(){const e=r(this,F),n=this.createResult(r(this,p),this.options);if(u(this,Z,r(this,p).state),u(this,oe,this.options),r(this,Z).data!==void 0&&u(this,ce,r(this,p)),Ce(n,e))return;u(this,F,n);const s=()=>{if(!e)return!0;const{notifyOnChangeProps:i}=this.options,o=typeof i=="function"?i():i;if(o==="all"||!o&&!r(this,le).size)return!0;const d=new Set(o??r(this,le));return this.options.throwOnError&&d.add("error"),Object.keys(r(this,F)).some(a=>{const l=a;return r(this,F)[l]!==e[l]&&d.has(l)})};g(this,y,ht).call(this,{listeners:s()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&g(this,y,Te).call(this)}},O=new WeakMap,p=new WeakMap,fe=new WeakMap,F=new WeakMap,Z=new WeakMap,oe=new WeakMap,$=new WeakMap,me=new WeakMap,ue=new WeakMap,ce=new WeakMap,X=new WeakMap,ee=new WeakMap,Q=new WeakMap,le=new WeakMap,y=new WeakSet,de=function(e){g(this,y,Ue).call(this);let n=r(this,p).fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(he)),n},Ee=function(){g(this,y,_e).call(this);const e=te(this.options.staleTime,r(this,p));if(ve.isServer()||r(this,F).isStale||!we(e))return;const n=nt(r(this,F).dataUpdatedAt,e)+1;u(this,X,V.setTimeout(()=>{r(this,F).isStale||this.updateResult()},n))},Oe=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,p)):this.options.refetchInterval)??!1},Fe=function(e){g(this,y,Ae).call(this),u(this,Q,e),!(ve.isServer()||A(this.options.enabled,r(this,p))===!1||!we(r(this,Q))||r(this,Q)===0)&&u(this,ee,V.setInterval(()=>{(this.options.refetchIntervalInBackground||ot.isFocused())&&g(this,y,de).call(this)},r(this,Q)))},Te=function(){g(this,y,Ee).call(this),g(this,y,Fe).call(this,g(this,y,Oe).call(this))},_e=function(){r(this,X)!==void 0&&(V.clearTimeout(r(this,X)),u(this,X,void 0))},Ae=function(){r(this,ee)!==void 0&&(V.clearInterval(r(this,ee)),u(this,ee,void 0))},Ue=function(){const e=r(this,O).getQueryCache().build(r(this,O),this.options);if(e===r(this,p))return;const n=r(this,p);u(this,p,e),u(this,fe,e.state),this.hasListeners()&&(n==null||n.removeObserver(this),e.addObserver(this))},ht=function(e){Ne.batch(()=>{e.listeners&&this.listeners.forEach(n=>{n(r(this,F))}),r(this,O).getQueryCache().notify({query:r(this,p),type:"observerResultsUpdated"})})},et);function zt(t,e){return A(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&A(e.retryOnMount,t)===!1)}function We(t,e){return zt(t,e)||t.state.data!==void 0&&qe(t,e,e.refetchOnMount)}function qe(t,e,n){if(A(e.enabled,t)!==!1&&te(e.staleTime,t)!=="static"){const s=typeof n=="function"?n(t):n;return s==="always"||s!==!1&&je(t,e)}return!1}function Ke(t,e,n,s){return(t!==e||A(s.enabled,t)===!1)&&(!n.suspense||t.state.status!=="error")&&je(t,n)}function je(t,e){return A(e.enabled,t)!==!1&&t.isStaleByTime(te(e.staleTime,t))}function Mt(t,e){return!Ce(t.getCurrentResult(),e)}const pt=B.createContext(!1),Lt=()=>B.useContext(pt);pt.Provider;function Qt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}const xt=B.createContext(Qt()),Vt=()=>B.useContext(xt),Wt=(t,e,n)=>{const s=n!=null&&n.state.error&&typeof t.throwOnError=="function"?at(t.throwOnError,[n.state.error,n]):t.throwOnError;(t.suspense||s)&&(e.isReset()||(t.retryOnMount=!1))},Kt=t=>{B.useEffect(()=>{t.clearReset()},[t])},Yt=({result:t,errorResetBoundary:e,throwOnError:n,query:s,suspense:i})=>t.isError&&!e.isReset()&&!t.isFetching&&s&&(i&&t.data===void 0||at(n,[t.error,s])),Ht=t=>{if(t.suspense){const n=i=>i==="static"?i:Math.max(i??1e3,1e3),s=t.staleTime;t.staleTime=typeof s=="function"?(...i)=>n(s(...i)):n(s),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Jt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Zt=(t,e,n)=>e.fetchOptimistic(t).catch(()=>{n.clearReset()});function Xt(t,e,n){const s=Lt(),i=Vt(),o=Pt(),d=o.defaultQueryOptions(t),a=o.getQueryCache().get(d.queryHash),l=t.subscribed!==!1;d._optimisticResults=s?"isRestoring":l?"optimistic":void 0,Ht(d),Wt(d,i,a),Kt(i);const[b]=B.useState(()=>new e(o,d)),h=b.getOptimisticResult(d),S=!s&&l;if(B.useSyncExternalStore(B.useCallback(m=>{const I=S?b.subscribe(Ne.batchCalls(m)):he;return b.updateResult(),I},[b,S]),()=>b.getCurrentResult(),()=>b.getCurrentResult()),B.useEffect(()=>{b.setOptions(d)},[d,b]),Jt(d,h))throw Zt(d,b,i);if(Yt({result:h,errorResetBoundary:i,throwOnError:d.throwOnError,query:a,suspense:d.suspense}))throw h.error;return d.notifyOnChangeProps?h:b.trackResult(h)}function _n(t,e){return Xt(t,kt)}const ft={};var Pe={};const en="https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql",tn="https://ly-budget-gql-dev-702918025200.asia-east1.run.app/api/graphql",nn=()=>typeof import.meta<"u"&&typeof ft<"u"?"https://ly-budget-gql-prod-702918025200.asia-east1.run.app/api/graphql":typeof process<"u"?Pe.VITE_GQL_ENDPOINT??Pe.GQL_ENDPOINT??Pe.GRAPHQL_ENDPOINT??null:null,sn=()=>typeof import.meta<"u"&&typeof ft<"u"||typeof process<"u"?"production":null,rn=nn(),mt=sn();console.log({mode:mt});const yt=rn??(mt==="production"?en:tn);console.log({GQL_ENDPOINTS:yt});const An="/";async function Un(t,...[e]){const n=await fetch(yt,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/graphql-response+json"},body:JSON.stringify({query:t,variables:e})});if(!n.ok)throw new Error("Network response was not ok");return(await n.json()).data}var an=(t=>(t.Asc="asc",t.Desc="desc",t))(an||{}),on=(t=>(t.Freeze="freeze",t.Other="other",t.Reduce="reduce",t))(on||{});class E extends String{constructor(n,s){super(n);ye(this,"__apiType");ye(this,"value");ye(this,"__meta__");this.value=n,this.__meta__=s}toString(){return this.value}}const qn=new E(`
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
    `,{fragmentName:"VisualizationProposalBase"}),Gn=new E(`
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
}`,{fragmentName:"VisualizationProposalWithContext"}),un=new E(`
    query GetLatestBudgetYear($skip: Int!, $take: Int!) {
  budgetYears(orderBy: [{year: desc}], skip: $skip, take: $take) {
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),cn=new E(`
    query GetBudgetYearsList {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
  }
}
    `),ln=new E(`
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
    `),dn=new E(`
    query GetGovernments {
  governments {
    id
    name
    category
    description
  }
}
    `),hn=new E(`
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
    `),pn=new E(`
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
    `),fn=new E(`
    query RecognitionImages {
  recognitionImages(where: {verificationStatus: {equals: "verified"}}) {
    result
  }
  recognitionImagesCount
}
    `),mn=new E(`
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
    `),yn=new E(`
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
    `),gn=new E(`
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
    `),vn=new E(`
    query GetProposalYears {
  budgetYears(orderBy: [{year: desc}]) {
    id
    year
    budgetProgress
    dataProgress
    unfreezeProgress
  }
}
    `),bn=new E(`
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
    `),Pn=new E(`
    mutation UPDATE_PROPOSAL_REACTS($where: ProposalWhereUniqueInput!, $data: ProposalUpdateInput!) {
  updateProposal(where: $where, data: $data) {
    id
    react_angry
    react_disappoint
    react_good
    react_whatever
  }
}
    `),wn=new E(`
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
}`),Sn={"\n  query GetLatestBudgetYear($skip: Int!, $take: Int!) {\n    budgetYears(orderBy: [{ year: desc }], skip: $skip, take: $take) {\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":un,"\n  query GetBudgetYearsList {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n    }\n  }\n":cn,"\n  query GetBudgetsWithGovernment {\n    budgets {\n      id\n      type\n      year\n      projectName\n      projectDescription\n      budgetAmount\n      majorCategory\n      mediumCategory\n      minorCategory\n      description\n      government {\n        id\n        name\n        category\n      }\n    }\n    budgetsCount\n  }\n":ln,"\n  query GetGovernments {\n    governments {\n      id\n      name\n      category\n      description\n    }\n  }\n":dn,"\n  query GetProposalGovernments($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      government {\n        id\n        name\n        category\n        description\n      }\n    }\n  }\n":hn,"\n  query GetPeopleList {\n    peopleList(orderBy: [{ name: asc }]) {\n      id\n      name\n      type\n      description\n      party {\n        id\n        name\n      }\n    }\n  }\n":pn,'\n  query RecognitionImages {\n    recognitionImages(where: { verificationStatus: { equals: "verified" } }) {\n      result\n    }\n    recognitionImagesCount\n  }\n':fn,"\n  query People($where: PeopleWhereUniqueInput!) {\n    people(where: $where) {\n      id\n      name\n      description\n      party {\n        id\n        color\n        name\n      }\n      term {\n        termNumber\n        id\n      }\n      termCount\n      committees {\n        id\n        name\n        session\n        term {\n          id\n          startDate\n          termNumber\n        }\n      }\n    }\n  }\n":mn,"\n  query GetProposalsOrderedByIdDesc {\n    proposals(orderBy: [{ id: desc }]) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        budgetAmount\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n    }\n    proposalsCount\n  }\n":yn,"\n  query GetProposalById($id: ID!) {\n    proposal(where: { id: $id }) {\n      id\n      description\n      reason\n      publishStatus\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      budgetImageUrls\n      budgetImageUrl\n      proposalTypes\n      recognitionAnswer\n      unfreezeStatus\n      unfreezeReport\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      historicalParentProposals {\n        id\n      }\n      mergedParentProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n      }\n      government {\n        id\n        name\n        category\n        description\n      }\n      budget {\n        id\n        projectName\n        projectDescription\n        budgetAmount\n        budgetUrl\n        lastYearSettlement\n        year\n        type\n        majorCategory\n        mediumCategory\n        minorCategory\n        description\n      }\n      proposers {\n        id\n        name\n        type\n        description\n      }\n      coSigners {\n        id\n        name\n        type\n      }\n      meetings(orderBy: [{ meetingDate: desc }]) {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      unfreezeHistory {\n        id\n        displayName\n        meetingDate\n        description\n        location\n        meetingRecordUrl\n        type\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      mergedProposals {\n        id\n        proposers {\n          id\n          name\n        }\n      }\n      historicalProposals {\n        id\n        meetings {\n          id\n        }\n        proposers {\n          id\n          name\n        }\n      }\n    }\n  }\n":gn,"\n  query GetProposalYears {\n    budgetYears(orderBy: [{ year: desc }]) {\n      id\n      year\n      budgetProgress\n      dataProgress\n      unfreezeProgress\n    }\n  }\n":vn,"\n  query GetPaginatedProposals(\n    $skip: Int!\n    $take: Int!\n    $orderBy: [ProposalOrderByInput!]!\n    $where: ProposalWhereInput!\n  ) {\n    proposals(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {\n      id\n      description\n      year {\n        id\n        year\n      }\n      unfreezeStatus\n      meetings {\n        id\n        type\n        meetingDate\n        committee {\n          displayName\n          name\n          endDate\n          startDate\n        }\n      }\n      reason\n      result\n      freezeAmount\n      reductionAmount\n      cost\n      proposalTypes\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n      government {\n        id\n        name\n      }\n      budget {\n        id\n        budgetAmount\n      }\n      proposers {\n        id\n        name\n      }\n    }\n    proposalsCount(where: $where)\n  }\n":bn,"\n  mutation UPDATE_PROPOSAL_REACTS(\n    $where: ProposalWhereUniqueInput!\n    $data: ProposalUpdateInput!\n  ) {\n    updateProposal(where: $where, data: $data) {\n      id\n      react_angry\n      react_disappoint\n      react_good\n      react_whatever\n    }\n  }\n":Pn,"\n  query GetVisualizationProposals($where: ProposalWhereInput!) {\n    proposals(where: $where) {\n      ...VisualizationProposalWithContext\n    }\n  }\n\n  fragment VisualizationProposalWithContext on Proposal {\n    ...VisualizationProposalBase\n    government {\n      name\n      category\n    }\n    year {\n      year\n    }\n  }\n\n  fragment VisualizationProposalBase on Proposal {\n    id\n    freezeAmount\n    reductionAmount\n    proposalTypes\n    proposers {\n      id\n      name\n      party {\n        name\n        color\n      }\n    }\n  }\n":wn};function Bn(t){return Sn[t]??{}}export{An as E,yt as G,an as O,on as P,Tn as Q,Nt as R,Be as S,Gn as V,he as a,En as b,Dn as c,Se as d,Un as e,ot as f,In as g,It as h,Bn as i,qn as j,Fn as k,Ce as l,On as m,Ne as n,ut as o,ge as p,Pt as q,te as r,rt as s,at as t,_n as u,Bt as v};
