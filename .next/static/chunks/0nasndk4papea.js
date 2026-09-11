(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3116,e=>{"use strict";let t=(0,e.i(75254).default)("clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]);e.s(["Clock",0,t],3116)},95187,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r={callServer:function(){return i.callServer},createServerReference:function(){return n.createServerReference},findSourceMapURL:function(){return l.findSourceMapURL}};for(var a in r)Object.defineProperty(s,a,{enumerable:!0,get:r[a]});let i=e.r(32120),l=e.r(92245),n=e.r(35326)},5766,e=>{"use strict";let t,s;var r,a=e.i(71645);let i={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+l+";":r+="f"==i[1]?c(l,i):i+"{"+c(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=c(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,l):i+":"+l+";")}return s+(t&&a?t+"{"+a+"}":a)+r},d={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e};function u(e){let t,s,r=this||{},a=e.call?e(r.p):e;return((e,t,s,r,a)=>{var i;let u=m(e),x=d[u]||(d[u]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(u));if(!d[x]){let t=u!==e?e:(e=>{let t,s,r=[{}];for(;t=l.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(s=t[3].replace(o," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);d[x]=c(a?{["@keyframes "+x]:t}:t,s?"":"."+x)}let p=s&&d.g;return s&&(d.g=d[x]),i=d[x],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),x})(a.unshift?a.raw?(t=[].slice.call(arguments,1),s=r.p,a.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}u.bind({g:1});let x,p,h,f=u.bind({k:1});function b(e,t){let s=this||{};return function(){let r=arguments;function a(i,l){let n=Object.assign({},i),o=n.className||a.className;s.p=Object.assign({theme:p&&p()},n),s.o=/go\d/.test(o),n.className=u.apply(s,r)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),x(c,n)}return t?t(a):a}}var g=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),y="default",j=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},S=(e,t=y)=>{k[t]=j(k[t]||N,e),w.forEach(([e,s])=>{e===t&&s(k[t])})},C=e=>Object.keys(k).forEach(t=>S(e,t)),M=(e=y)=>t=>{S(t,e)},z=e=>(t,s)=>{let r,a=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||v()}))(t,e,s);return M(a.toasterId||(r=a.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===r))))({type:2,toast:a}),a.id},R=(e,t)=>z("blank")(e,t);R.error=z("error"),R.success=z("success"),R.loading=z("loading"),R.custom=z("custom"),R.dismiss=(e,t)=>{let s={type:3,toastId:e};t?M(t)(s):C(s)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let s={type:4,toastId:e};t?M(t)(s):C(s)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,s)=>{let r=R.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?g(t.success,e):void 0;return a?R.success(a,{id:r,...s,...null==s?void 0:s.success}):R.dismiss(r),e}).catch(e=>{let a=t.error?g(t.error,e):void 0;a?R.error(a,{id:r,...s,...null==s?void 0:s.error}):R.dismiss(r)}),e};var L=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,E=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${E} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,O=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,U=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,D=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${D} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,_=b("div")`
  position: absolute;
`,q=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,F=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${F} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(I,null,t):t:"blank"===s?null:a.createElement(q,null,a.createElement(O,{...r}),"loading"!==s&&a.createElement(_,null,"error"===s?a.createElement(A,{...r}):a.createElement(T,{...r})))},X=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,H=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;a.memo(({toast:e,position:t,style:r,children:i})=>{let l=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,i]=(()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(V,{toast:e}),o=a.createElement(H,{...e.ariaProps},g(e.message,e));return a.createElement(X,{className:e.className,style:{...l,...r,...e.style}},"function"==typeof i?i({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))}),r=a.createElement,c.p=void 0,x=r,p=void 0,h=void 0,u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",0,R],5766)},58015,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(74080),a=e.i(95187);let i=(0,a.createServerReference)("406235b9337dd67b25692664d78622b746e298e6fa",a.callServer,void 0,a.findSourceMapURL,"deleteMessage"),l=(0,a.createServerReference)("404654251c57de7a22256cc7899dbfd0480fe829f4",a.callServer,void 0,a.findSourceMapURL,"restoreMessage"),n=(0,a.createServerReference)("40afc2d2a610eeaf130c1095609d24abf43be03381",a.callServer,void 0,a.findSourceMapURL,"permanentlyDeleteMessage");var o=e.i(75254);let c=(0,o.default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]),d=(0,o.default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),m=(0,o.default)("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);var u=e.i(18566),x=e.i(5766);function p({id:e}){let s=(0,u.useRouter)();async function r(){if(!confirm("Chuyển tin nhắn này vào thùng rác?"))return;let t=await i(e);t.error?x.default.error(t.error):(x.default.success("Đã chuyển vào thùng rác"),s.refresh())}return(0,t.jsx)("button",{onClick:r,className:"text-red-500 hover:text-red-700 p-1",title:"Xóa vào thùng rác",children:(0,t.jsx)(c,{size:18})})}function h({id:e}){let s=(0,u.useRouter)();async function r(){let t=await l(e);t.error?x.default.error(t.error):(x.default.success("Đã khôi phục"),s.refresh())}async function a(){if(!confirm("Xóa vĩnh viễn tin nhắn này? Bạn không thể hoàn tác!"))return;let t=await n(e);t.error?x.default.error(t.error):(x.default.success("Đã xóa vĩnh viễn"),s.refresh())}return(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:r,className:"text-blue-500 hover:text-blue-700 p-1",title:"Hoàn tác",children:(0,t.jsx)(d,{size:18})}),(0,t.jsx)("button",{onClick:a,className:"text-red-500 hover:text-red-700 p-1",title:"Xóa vĩnh viễn",children:(0,t.jsx)(m,{size:18})})]})}var f=e.i(37727);let b=(0,o.default)("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);var g=e.i(3116);let v=(0,a.createServerReference)("60295a8a1a1f2686f92b3c6f45a7307e49dad33160",a.callServer,void 0,a.findSourceMapURL,"toggleMessageStatus");e.s(["MessageRow",0,function({msg:e,isTrash:a=!1}){let[i,l]=(0,s.useState)(!1),[n,o]=(0,s.useState)(!1),c=(0,u.useRouter)();(0,s.useEffect)(()=>{o(!0)},[]);let d="Đã xử lý"===e.status,m=async()=>{let t=await v(e.id,d?"Mới":"Đã xử lý");t.error?x.default.error(t.error):(x.default.success(d?"Đã chuyển về Chờ xử lý":"Đã đánh dấu Đã xử lý"),c.refresh())};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("tr",{className:`group cursor-pointer transition-colors ${d&&!a?"bg-slate-100/50 opacity-75":"hover:bg-slate-50"}`,onClick:()=>l(!0),children:[(0,t.jsxs)("td",{className:"px-6 py-4 font-medium text-slate-900 flex items-center gap-2",children:[!a&&(0,t.jsx)("div",{title:d?"Đã xử lý":"Chờ xử lý",children:d?(0,t.jsx)(b,{size:16,className:"text-green-500"}):(0,t.jsx)(g.Clock,{size:16,className:"text-amber-500"})}),e.name]}),(0,t.jsxs)("td",{className:"px-6 py-4",children:[(0,t.jsx)("div",{className:"text-slate-900 font-medium",children:e.phone}),(0,t.jsx)("div",{className:"text-slate-500 text-xs",children:e.email}),e.company&&(0,t.jsxs)("div",{className:"text-slate-400 text-xs mt-1",children:["CTY: ",e.company]})]}),(0,t.jsx)("td",{className:"px-6 py-4 text-slate-700 max-w-xs truncate",children:e.message}),(0,t.jsx)("td",{className:`px-6 py-4 font-medium ${a?"text-red-500":"text-slate-500"}`,children:new Date(a?e.deletedAt:e.createdAt).toLocaleString("vi-VN")}),(0,t.jsx)("td",{className:"px-6 py-4 text-center",onClick:e=>e.stopPropagation(),children:(0,t.jsxs)("div",{className:"opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2",children:[!a&&(0,t.jsx)("button",{onClick:m,className:d?"text-amber-500 hover:text-amber-700 p-1":"text-green-500 hover:text-green-700 p-1",title:d?"Đánh dấu chờ xử lý":"Đánh dấu đã xử lý",children:d?(0,t.jsx)(g.Clock,{size:18}):(0,t.jsx)(b,{size:18})}),a?(0,t.jsx)(h,{id:e.id}):(0,t.jsx)(p,{id:e.id})]})})]}),n&&i&&(0,r.createPortal)((0,t.jsx)("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",onClick:()=>l(!1),children:(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex justify-between items-center px-6 py-4 border-b",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-slate-800",children:"Chi tiết tin nhắn"}),!a&&(0,t.jsx)("span",{className:`px-2 py-0.5 text-xs font-semibold rounded-full ${d?"bg-green-100 text-green-700":"bg-amber-100 text-amber-700"}`,children:d?"Đã xử lý":"Chờ xử lý"})]}),(0,t.jsx)("button",{onClick:()=>l(!1),className:"text-slate-400 hover:text-slate-600",children:(0,t.jsx)(f.X,{size:20})})]}),(0,t.jsxs)("div",{className:"p-6 overflow-y-auto max-h-[70vh]",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Khách hàng"}),(0,t.jsx)("p",{className:"font-medium text-slate-900",children:e.name})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Thời gian"}),(0,t.jsx)("p",{className:"font-medium text-slate-900",children:new Date(e.createdAt).toLocaleString("vi-VN")})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Số điện thoại"}),(0,t.jsx)("p",{className:"font-medium text-slate-900",children:(0,t.jsx)("a",{href:`tel:${e.phone}`,className:"hover:text-blue-600",children:e.phone})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Email"}),(0,t.jsx)("p",{className:"font-medium text-slate-900",children:e.email?(0,t.jsx)("a",{href:`mailto:${e.email}`,className:"hover:text-blue-600",children:e.email}):"Không có"})]}),e.company&&(0,t.jsxs)("div",{className:"col-span-2",children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Công ty"}),(0,t.jsx)("p",{className:"font-medium text-slate-900",children:e.company})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2",children:"Nội dung"}),(0,t.jsx)("div",{className:"bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap text-sm leading-relaxed",children:e.message})]})]}),(0,t.jsxs)("div",{className:"px-6 py-4 border-t bg-slate-50 flex justify-between items-center",children:[a?(0,t.jsx)("div",{}):(0,t.jsxs)("button",{onClick:m,className:`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors text-sm ${d?"bg-amber-100 text-amber-700 hover:bg-amber-200":"bg-green-100 text-green-700 hover:bg-green-200"}`,children:[d?(0,t.jsx)(g.Clock,{size:16}):(0,t.jsx)(b,{size:16}),d?"Đánh dấu chờ xử lý":"Đánh dấu đã xử lý"]}),(0,t.jsx)("button",{onClick:()=>l(!1),className:"px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors text-sm",children:"Đóng"})]})]})}),document.body)]})}],58015)},66274,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(75254);let a=(0,r.default)("bell",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]),i=(0,r.default)("check-check",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);var l=e.i(3116),n=e.i(95187);let o=(0,n.createServerReference)("00d68e0b9d2101635f7bdedebd7a1770e6add6097e",n.callServer,void 0,n.findSourceMapURL,"markAllAsResolved");var c=e.i(18566),d=e.i(5766);e.s(["NotificationBell",0,function({messages:e=[]}){let[r,n]=(0,s.useState)(!1),m=(0,s.useRef)(null),u=(0,c.useRouter)(),x=e.length;(0,s.useEffect)(()=>{function e(e){m.current&&!m.current.contains(e.target)&&n(!1)}return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);let p=async e=>{e.stopPropagation();let t=await o();t.error?d.default.error(t.error):(d.default.success("Đã đánh dấu tất cả là đã xử lý!"),n(!1),u.refresh())},h=()=>{n(!1),u.push("/admin?filter=pending")};return(0,t.jsxs)("div",{className:"relative",ref:m,children:[(0,t.jsxs)("div",{className:"flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-slate-600",onClick:()=>n(!r),children:[(0,t.jsx)(a,{size:20}),x>0&&(0,t.jsx)("span",{className:"absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white",children:x>99?"99+":x})]}),r&&(0,t.jsxs)("div",{className:"absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 border-b bg-slate-50",children:[(0,t.jsx)("h4",{className:"font-semibold text-slate-800",children:"Thông báo chờ xử lý"}),x>0&&(0,t.jsxs)("button",{onClick:p,className:"text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium",children:[(0,t.jsx)(i,{size:14})," Đã đọc tất cả"]})]}),(0,t.jsx)("div",{className:"max-h-80 overflow-y-auto",children:0===x?(0,t.jsx)("div",{className:"px-4 py-8 text-center text-slate-500 text-sm",children:"Không có tin nhắn nào chờ xử lý"}):(0,t.jsxs)("div",{className:"divide-y",children:[e.slice(0,10).map(e=>(0,t.jsxs)("div",{className:"px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors",onClick:h,children:[(0,t.jsxs)("div",{className:"flex justify-between items-start mb-1",children:[(0,t.jsx)("span",{className:"font-medium text-sm text-slate-800 line-clamp-1",children:e.name}),(0,t.jsx)("span",{className:"text-xs text-slate-400 whitespace-nowrap ml-2",children:new Date(e.createdAt).toLocaleDateString("vi-VN")})]}),(0,t.jsx)("p",{className:"text-xs text-slate-500 line-clamp-2",children:e.message}),(0,t.jsxs)("div",{className:"mt-2 flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 inline-flex px-2 py-0.5 rounded-md",children:[(0,t.jsx)(l.Clock,{size:12})," Chờ xử lý"]})]},e.id)),x>10&&(0,t.jsxs)("div",{className:"px-4 py-3 text-center text-sm text-blue-600 font-medium hover:bg-slate-50 cursor-pointer",onClick:h,children:["Xem tất cả ",x," tin nhắn..."]})]})})]})]})}],66274)},11856,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(74080);let a=(0,e.i(75254).default)("key-round",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);var i=e.i(37727),l=e.i(39616),n=e.i(92270),o=e.i(95187);let c=(0,o.createServerReference)("405a5f2ba9b7b28f839f3e3e979dc86ab79041647a",o.callServer,void 0,o.findSourceMapURL,"changePassword"),d=(0,o.createServerReference)("0056919e7c293f600bd1ca968e6b22182324230e13",o.callServer,void 0,o.findSourceMapURL,"logout");var m=e.i(5766);e.s(["SettingsDropdown",0,function(){let[e,o]=(0,s.useState)(!1),[u,x]=(0,s.useState)(!1),[p,h]=(0,s.useState)(!1),[f,b]=(0,s.useState)(!1),g=(0,s.useRef)(null);async function v(e){b(!0);let t=await c(e);b(!1),t.error?m.default.error(t.error):(m.default.success("Đổi mật khẩu thành công!"),x(!1))}return(0,s.useEffect)(()=>{function e(e){g.current&&!g.current.contains(e.target)&&o(!1)}return h(!0),document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,t.jsxs)("div",{className:"relative",ref:g,children:[(0,t.jsx)("button",{onClick:()=>o(!e),className:"flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-slate-600",title:"Cài đặt",children:(0,t.jsx)(l.Settings,{size:20})}),e&&(0,t.jsxs)("div",{className:"absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 py-1",children:[(0,t.jsxs)("button",{onClick:()=>{o(!1),x(!0)},className:"w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2",children:[(0,t.jsx)(a,{size:16,className:"text-slate-500"}),"Đổi mật khẩu"]}),(0,t.jsx)("div",{className:"h-px bg-slate-100 my-1"}),(0,t.jsx)("form",{action:d,children:(0,t.jsxs)("button",{type:"submit",className:"w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2 font-medium",children:[(0,t.jsx)(n.LogOut,{size:16}),"Đăng xuất"]})})]}),p&&u&&(0,r.createPortal)((0,t.jsx)("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",onClick:()=>x(!1),children:(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex justify-between items-center px-6 py-4 border-b",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-slate-800",children:"Đổi mật khẩu"}),(0,t.jsx)("button",{onClick:()=>x(!1),className:"text-slate-400 hover:text-slate-600",children:(0,t.jsx)(i.X,{size:20})})]}),(0,t.jsxs)("form",{action:v,className:"p-6",children:[(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-slate-700 mb-1",children:"Mật khẩu cũ"}),(0,t.jsx)("input",{type:"password",name:"oldPassword",required:!0,className:"w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-slate-700 mb-1",children:"Mật khẩu mới"}),(0,t.jsx)("input",{type:"password",name:"newPassword",required:!0,minLength:6,className:"w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500"})]})]}),(0,t.jsxs)("div",{className:"mt-6 flex justify-end gap-3",children:[(0,t.jsx)("button",{type:"button",onClick:()=>x(!1),className:"px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm",children:"Hủy"}),(0,t.jsx)("button",{type:"submit",disabled:f,className:"px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50",children:f?"Đang xử lý...":"Lưu mật khẩu"})]})]})]})}),document.body)]})}],11856)}]);