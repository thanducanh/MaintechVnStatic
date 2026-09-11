(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95187,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={callServer:function(){return r.callServer},createServerReference:function(){return n.createServerReference},findSourceMapURL:function(){return l.findSourceMapURL}};for(var s in i)Object.defineProperty(a,s,{enumerable:!0,get:i[s]});let r=e.r(32120),l=e.r(92245),n=e.r(35326)},5766,e=>{"use strict";let t,a;var i,s=e.i(71645);let r={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,c=(e,t)=>{let a="",i="",s="";for(let r in e){let l=e[r];"@"==r[0]?"i"==r[1]?a=r+" "+l+";":i+="f"==r[1]?c(l,r):r+"{"+c(l,"k"==r[1]?"":t)+"}":"object"==typeof l?i+=c(l,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=l&&(r="-"==r[1]?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(r,l):r+":"+l+";")}return a+(t&&s?t+"{"+s+"}":s)+i},d={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e};function p(e){let t,a,i=this||{},s=e.call?e(i.p):e;return((e,t,a,i,s)=>{var r;let p=h(e),m=d[p]||(d[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!d[m]){let t=p!==e?e:(e=>{let t,a,i=[{}];for(;t=l.exec(e.replace(n,""));)t[4]?i.shift():t[3]?(a=t[3].replace(o," ").trim(),i.unshift(i[0][a]=i[0][a]||{})):i[0][t[1]]=t[2].replace(o," ").trim();return i[0]})(e);d[m]=c(s?{["@keyframes "+m]:t}:t,a?"":"."+m)}let u=a&&d.g;return a&&(d.g=d[m]),r=d[m],u?t.data=t.data.replace(u,r):-1===t.data.indexOf(r)&&(t.data=i?r+t.data:t.data+r),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=i.p,s.reduce((e,i,s)=>{let r=t[s];if(r&&r.call){let e=r(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+i+(null==r?"":r)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(i.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||r})(i.target),i.g,i.o,i.k)}p.bind({g:1});let m,u,x,g=p.bind({k:1});function f(e,t){let a=this||{};return function(){let i=arguments;function s(r,l){let n=Object.assign({},r),o=n.className||s.className;a.p=Object.assign({theme:u&&u()},n),a.o=/go\d/.test(o),n.className=p.apply(a,i)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),x&&c[0]&&x(n),m(c,n)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),y="default",w=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===i.id),toast:i});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},N=[],j={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=y)=>{C[t]=w(C[t]||j,e),N.forEach(([e,a])=>{e===t&&a(C[t])})},_=e=>Object.keys(C).forEach(t=>E(e,t)),S=(e=y)=>t=>{E(t,e)},T=e=>(t,a)=>{let i,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||v()}))(t,e,a);return S(s.toasterId||(i=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===i))))({type:2,toast:s}),s.id},k=(e,t)=>T("blank")(e,t);k.error=T("error"),k.success=T("success"),k.loading=T("loading"),k.custom=T("custom"),k.dismiss=(e,t)=>{let a={type:3,toastId:e};t?S(t)(a):_(a)},k.dismissAll=e=>k.dismiss(void 0,e),k.remove=(e,t)=>{let a={type:4,toastId:e};t?S(t)(a):_(a)},k.removeAll=e=>k.remove(void 0,e),k.promise=(e,t,a)=>{let i=k.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?k.success(s,{id:i,...a,...null==a?void 0:a.success}):k.dismiss(i),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?k.error(s,{id:i,...a,...null==a?void 0:a.error}):k.dismiss(i)}),e};var A=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,O=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,B=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,I=g`
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
}`,L=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${I} 0.2s ease-out forwards;
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
`,P=f("div")`
  position: absolute;
`,q=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,H=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,D=({toast:e})=>{let{icon:t,type:a,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(U,null,t):t:"blank"===a?null:s.createElement(q,null,s.createElement(R,{...i}),"loading"!==a&&s.createElement(P,null,"error"===a?s.createElement(M,{...i}):s.createElement(L,{...i})))},F=f("div")`
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
`,G=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;s.memo(({toast:e,position:t,style:i,children:r})=>{let l=e.height?((e,t)=>{let i=e.includes("top")?1:-1,[s,r]=(()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*i}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*i}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(D,{toast:e}),o=s.createElement(G,{...e.ariaProps},b(e.message,e));return s.createElement(F,{className:e.className,style:{...l,...i,...e.style}},"function"==typeof r?r({icon:n,message:o}):s.createElement(s.Fragment,null,n,o))}),i=s.createElement,c.p=void 0,m=i,u=void 0,x=void 0,p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",0,k],5766)},49086,e=>{"use strict";var t=e.i(43476),a=e.i(71645),i=e.i(34201),s=e.i(43432),r=e.i(63488),l=e.i(94983),n=e.i(46897),o=e.i(14764);let c=(0,e.i(75254).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var d=e.i(83773),h=e.i(5766),p=e.i(95187);let m=(0,p.createServerReference)("403d2ac8ed1013cfed921256ad60179c02bbc99cf4",p.callServer,void 0,p.findSourceMapURL,"submitContactForm");e.s(["default",0,function({data:e}){let{language:p,t:u}=(0,d.useLanguage)(),x="VN"===p,g=x?"vi":"en",[f,b]=(0,a.useState)(!1),[v,y]=(0,a.useState)(!1),w=async e=>{e.preventDefault(),b(!0);let t=e.target;try{let e=new FormData(t),a=await m(e);a.error?h.default.error(a.error):(y(!0),t.reset(),setTimeout(()=>y(!1),5e3))}catch(e){h.default.error(x?"Có lỗi xảy ra, vui lòng thử lại!":"An error occurred, please try again!")}finally{b(!1)}},N=()=>{},j=(e,t,a="")=>e?"string"==typeof e?e||a:e?.[t]||e?.vi||e?.en||a:a,C=(e.contactInfo?.hotlines&&e.contactInfo.hotlines[0]||e.contactInfo?.hotline||"0918 458 399").replace(/[^0-9+]/g,"");return j(e.pageContent?.title,g,x?"CHÚNG TÔI LUÔN SẴN SÀNG LẮNG NGHE":"WE ARE ALWAYS READY TO LISTEN"),(0,t.jsxs)("div",{className:"flex flex-col flex-1",children:[(0,t.jsx)(i.default,{pageKey:"BANNER_CONTACT",centered:!0,customImage:"/images/maintech-page-banner.png",overlayOpacity:e.hero.overlayOpacity,vi:{badge:j(e.pageContent?.subtitle,"vi","KẾT NỐI"),title:j(e.hero.title,"vi",u("contact_page.hero.title")),desc:""},en:{badge:j(e.pageContent?.subtitle,"en","CONNECT"),title:j(e.hero.title,"en",u("contact_page.hero.title")),desc:""}}),(0,t.jsx)("section",{className:"pt-16 md:pt-24 pb-8 md:pb-12 bg-white relative z-10",children:(0,t.jsx)("div",{className:"mx-auto w-full max-w-[1400px] px-6",children:(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24",children:[(0,t.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400 group-hover:text-[#C8102E] transition-colors",children:(0,t.jsx)(n.MapPin,{size:24,className:"text-[#C8102E]"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:x?"Địa Chỉ":"Address"}),e.addresses?.list?.map((e,a)=>(0,t.jsx)("p",{className:`text-slate-500 text-sm leading-relaxed ${a>0?"mt-2":""}`,children:e},a))]}),(0,t.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,t.jsx)(r.Mail,{size:24,className:"text-[#C8102E]"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:x?"Gửi Email":"Email Us"}),e.contactInfo?.emails?.map((e,a)=>(0,t.jsx)("p",{className:`text-slate-500 text-sm leading-relaxed ${a>0?"mt-2":""}`,children:e},a))]}),(0,t.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,t.jsx)(s.Phone,{size:24,className:"text-[#C8102E]"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:x?"Gọi Ngay":"Call Now"}),e.contactInfo?.hotlines?.map((e,a)=>(0,t.jsx)("a",{href:`tel:${e.replace(/[^0-9+]/g,"")}`,onClick:N,className:`text-slate-500 text-sm leading-relaxed hover:text-[#C8102E] ${a>0?"mt-2":""}`,children:e},a))]}),(0,t.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,t.jsx)(l.MessageCircle,{size:24,className:"text-[#C8102E]"})}),(0,t.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:x?"Kênh Trực Tuyến":"Online Channels"}),(0,t.jsx)("div",{className:"flex flex-col gap-2 w-full",children:["zalo","whatsapp","telegram"].map(a=>{let i=e.quickChannels?.[a];return i?.enabled?(0,t.jsx)("a",{href:(t=>{let a=e.quickChannels[t];if(!a?.enabled)return null;let i=a.value||C;return"zalo"===t?`https://zalo.me/${i}`:"whatsapp"===t?`https://wa.me/${i.replace("+","")}`:"telegram"===t?`https://t.me/${i}`:"twitter"===t?`https://x.com/${i}`:"#"})(a)||"#",target:"_blank",rel:"noopener noreferrer",className:"text-slate-500 hover:text-[#C8102E] text-sm leading-relaxed transition-colors font-medium",children:i.label||a},a):null})})]})]})})}),(0,t.jsx)("section",{className:"w-full bg-white pb-16 md:pb-24 pt-4 md:pt-8 flex justify-center",children:(0,t.jsxs)("div",{className:"w-full max-w-4xl px-4",children:[(0,t.jsxs)("div",{className:"text-center mb-10",children:[(0,t.jsx)("h2",{className:"text-3xl md:text-4xl font-bold text-[#0a1930] mb-4 tracking-tight",children:j(e.pageContent?.title,g,x?"Bạn Cần Hỗ Trợ?":"Have Any Question?")}),(0,t.jsx)("p",{className:"text-slate-500 max-w-2xl mx-auto",children:j(e.pageContent?.description,g,x?"Hãy để lại thông tin, đội ngũ kỹ thuật của Maintech sẽ liên hệ và tư vấn giải pháp tối ưu nhất cho bạn.":"Regardless of your request for maintenance, spare parts or advice on new solutions, Maintech's engineering team is always ready to accompany your business.")})]}),(0,t.jsx)("div",{className:"bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-12 w-full rounded-sm",children:v?(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-12 text-green-600",children:[(0,t.jsx)("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4",children:(0,t.jsx)(o.Send,{size:32,className:"text-green-600"})}),(0,t.jsx)("h3",{className:"text-xl font-bold",children:x?"Gửi Thành Công!":"Successfully Sent!"}),(0,t.jsx)("p",{className:"text-slate-500 mt-2 text-center",children:x?"Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.":"We will get back to you as soon as possible."})]}):(0,t.jsxs)("form",{onSubmit:w,className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsx)("div",{children:(0,t.jsx)("input",{type:"text",name:"name",required:!0,placeholder:x?"Tên của bạn *":"Your Name *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,t.jsx)("div",{children:(0,t.jsx)("input",{type:"email",name:"email",required:!0,placeholder:x?"Email của bạn *":"Your Email *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,t.jsx)("div",{children:(0,t.jsx)("input",{type:"text",name:"company",required:!0,placeholder:x?"Tên công ty *":"Company Name *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,t.jsx)("div",{children:(0,t.jsx)("input",{type:"text",name:"phone",required:!0,placeholder:x?"Số điện thoại *":"Phone Number *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,t.jsx)("div",{className:"md:col-span-2",children:(0,t.jsxs)("select",{name:"service_interest",required:!0,className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all text-slate-500 appearance-none",children:[(0,t.jsx)("option",{value:"",children:x?"Dịch vụ quan tâm *":"Services *"}),(0,t.jsx)("option",{value:"Bảo trì & Sửa chữa",children:x?"Bảo trì & Sửa chữa":"Maintenance & Repair"}),(0,t.jsx)("option",{value:"Cung cấp phụ tùng",children:x?"Cung cấp phụ tùng":"Spare Parts"}),(0,t.jsx)("option",{value:"Giải pháp tự động hóa",children:x?"Giải pháp tự động hóa":"Automation Solutions"})]})}),(0,t.jsx)("div",{className:"md:col-span-2",children:(0,t.jsx)("textarea",{name:"message",rows:5,required:!0,placeholder:x?"Nội dung tin nhắn... *":"Message... *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"})}),(0,t.jsx)("div",{className:"md:col-span-2 flex justify-center mt-4",children:(0,t.jsx)("button",{type:"submit",disabled:f,className:"bg-[#C8102E] hover:bg-[#9a0c22] text-white px-10 py-4 font-bold uppercase tracking-wider transition-colors min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-70",children:f?(0,t.jsx)(c,{size:20,className:"animate-spin"}):x?"Gửi Liên Hệ":"Get In Touch"})})]})})]})}),(0,t.jsx)("section",{className:"h-[500px] border-t border-slate-100",children:(0,t.jsx)("iframe",{src:e.addresses.mapUrl||"https://maps.google.com/maps?q=Maintech+Vietnam+%C4%90%E1%BB%93ng+Nai&output=embed&z=15",width:"100%",height:"100%",style:{border:0},allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade",title:"Maintech Vietnam Locations",className:"grayscale hover:grayscale-0 transition-all duration-1000"})})]})}],49086)},34201,e=>{"use strict";var t=e.i(43476),a=e.i(71645),i=e.i(46932),s=e.i(83773),r=e.i(22016);e.s(["default",0,function({pageKey:e,children:l,isLight:n=!1,overlayColor:o,customImage:c,overlayOpacity:d,centered:h=!1,vi:p,en:m}){let u="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85",[x,g]=(0,a.useState)(void 0!==c?c||"":"BANNER_ABOUT"===e?u:""),{language:f}=(0,s.useLanguage)(),b="VN"===f,v=b?p:m,y="BANNER_ABOUT"===e,w=h||y;(0,a.useEffect)(()=>{void 0!==c?g(c||""):g(y?u:"")},[e,c,y]);let N=Number(d),j=Number.isFinite(N)?Math.min(1,Math.max(0,N)):n?.2:1,C=e?({BANNER_ABOUT:{vi:"Về chúng tôi",en:"About",href:"/about"},BANNER_SERVICES:{vi:"Dịch vụ",en:"Services",href:"/services"},BANNER_PRODUCTS:{vi:"Sản phẩm",en:"Products",href:"/products"},BANNER_NEWS:{vi:"Tin tức",en:"News",href:"/news"},BANNER_CONTACT:{vi:"Liên hệ",en:"Contact",href:"/contact"}})[e]:void 0,{top:E,highlight:_}=(e=>{if(!e)return{top:"",highlight:""};if(w&&e.title&&!e.titleTop&&!e.titleHighlight)return{top:"",highlight:e.title};if(e.titleTop||e.titleHighlight)return{top:e.titleTop||"",highlight:e.titleHighlight||""};let t=e.title||"",a=t.toLowerCase();if(a.includes("về chúng tôi")||a.includes("giới thiệu")||a.includes("about us"))return y?{top:"",highlight:t||(b?"Về Chúng Tôi":"About Us")}:b?{top:"Chúng tôi là",highlight:"Maintech Việt Nam"}:{top:"We are",highlight:"Maintech Vietnam"};if(a.includes("dịch vụ")||a.includes("services"))return b?{top:"Dịch vụ chuyên biệt",highlight:"Giải pháp tối ưu"}:{top:"Specialized Services",highlight:"Optimal Solutions"};if(a.includes("sản phẩm")||a.includes("products"))return b?{top:"Sản phẩm & thiết bị",highlight:"Công nghiệp"}:{top:"Products & Equipment",highlight:"Industrial"};if(a.includes("tin tức")||a.includes("news"))return b?{top:"Tin tức kỹ thuật",highlight:"Dự án Maintech"}:{top:"Technical News",highlight:"Maintech Projects"};if(a.includes("liên hệ")||a.includes("contact"))return b?{top:"Liên hệ",highlight:"Maintech Việt Nam"}:{top:"Contact",highlight:"Maintech Vietnam"};let i=t.split(" ");return i.length>2?{top:i.slice(0,i.length-2).join(" "),highlight:i.slice(i.length-2).join(" ")}:2===i.length?{top:i[0],highlight:i[1]}:{top:"",highlight:t}})(v);return(0,t.jsxs)("section",{className:`relative w-full min-h-[350px] md:min-h-[380px] flex items-center justify-center overflow-hidden ${n?"bg-white":"bg-[#050505]"}`,children:[(0,t.jsxs)("div",{className:"absolute inset-0 z-0",children:[x&&(0,t.jsx)(i.motion.div,{initial:{scale:1.1,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1.5,ease:"easeOut"},className:"w-full h-full",children:(0,t.jsx)("img",{src:x,alt:"Banner Background",className:"w-full h-full object-cover"})}),(0,t.jsx)("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"radial-gradient(#ffffff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),(0,t.jsx)("div",{className:"absolute inset-0 transition-opacity duration-300",style:{background:n?"rgba(255, 255, 255, 0.2)":`linear-gradient(to right, rgba(2,6,23,${.9*j>.95?.95:.9*j}) 0%, rgba(2,6,23,${.35*j}) 100%)`,opacity:1}}),!n&&(0,t.jsx)("div",{className:"absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/95 to-transparent z-10 pointer-events-none"})]}),(0,t.jsx)("div",{className:"absolute bottom-0 left-0 w-full h-[3px] bg-[#C8102E] z-20"}),(0,t.jsx)("div",{className:`relative z-10 mx-auto w-full ${w?"max-w-none":"max-w-[1400px]"} px-4 pt-20 md:px-8 md:pt-28 ${w?"text-center":""}`,children:(0,t.jsx)(i.motion.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},className:`flex w-full flex-col ${w?"items-center text-center":"items-start text-left"}`,children:v?(0,t.jsxs)(t.Fragment,{children:[!1,(0,t.jsxs)("h1",{className:`${w?"text-3xl sm:text-4xl lg:text-5xl":"text-3xl md:text-4xl lg:text-5xl xl:text-6xl"} mb-8 font-semibold tracking-tight leading-[1.1] break-words`,children:[!1,w?(0,t.jsx)("span",{className:"block text-white break-words",children:_.split(/(maintech)/gi).map((e,a)=>"maintech"===e.toLowerCase()?(0,t.jsx)("span",{className:"text-[#C8102E]",children:e},a):e)}):(0,t.jsx)("span",{className:"block text-[#C8102E]",children:_})]}),C&&(0,t.jsxs)("nav",{"aria-label":"Breadcrumb",className:"mt-0 mb-6 text-xs font-semibold uppercase tracking-widest text-white/80",children:[(0,t.jsx)(r.default,{href:"/",className:"text-white/80 transition-colors hover:text-white",children:b?"Trang chủ":"Home"}),(0,t.jsx)("span",{className:"mx-3 text-base font-bold leading-none text-white/80",children:"/"}),(0,t.jsx)(r.default,{href:C.href,className:"text-white/80 transition-colors hover:text-white",children:b?C.vi:C.en})]}),v.desc&&(0,t.jsx)("p",{className:"text-base md:text-lg text-white/80 font-medium tracking-wide max-w-[640px] leading-relaxed",children:"Trang chủ / Tin tức"===v.desc?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/",className:"hover:text-white transition-colors hover:underline",children:"Trang chủ"})," / ",(0,t.jsx)(r.default,{href:"/news",className:"hover:text-white transition-colors hover:underline",children:"Tin tức"})]}):"Home / News"===v.desc?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/",className:"hover:text-white transition-colors hover:underline",children:"Home"})," / ",(0,t.jsx)(r.default,{href:"/news",className:"hover:text-white transition-colors hover:underline",children:"News"})]}):v.desc})]}):l})})]})}])}]);