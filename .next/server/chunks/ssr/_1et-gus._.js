module.exports=[5050,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={callServer:function(){return f.callServer},createServerReference:function(){return h.createServerReference},findSourceMapURL:function(){return g.findSourceMapURL}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(20611),g=a.r(1722),h=a.r(38783)},6704,a=>{"use strict";let b,c;var d,e=a.i(72131);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f="-"==f[1]?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/go\d/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${E} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,K=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=q`
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
}`,M=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,N=r("div")`
  position: absolute;
`,O=r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,P=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${P} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,R=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?e.createElement(Q,null,b):b:"blank"===c?null:e.createElement(O,null,e.createElement(J,{...d}),"loading"!==c&&e.createElement(N,null,"error"===c?e.createElement(H,{...d}):e.createElement(M,{...d})))},S=r("div")`
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
`,T=r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;e.memo(({toast:a,position:b,style:d,children:f})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${q(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${q(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=e.createElement(R,{toast:a}),i=e.createElement(T,{...a.ariaProps},s(a.message,a));return e.createElement(S,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof f?f({icon:h,message:i}):e.createElement(e.Fragment,null,h,i))}),d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0,m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,a.s(["default",0,D],6704)},23565,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(73761),e=a.i(63519),f=a.i(92258),g=a.i(45222),h=a.i(24987),i=a.i(92759);let j=(0,a.i(70106).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var k=a.i(48136),l=a.i(6704),m=a.i(5050);let n=(0,m.createServerReference)("403d2ac8ed1013cfed921256ad60179c02bbc99cf4",m.callServer,void 0,m.findSourceMapURL,"submitContactForm");a.s(["default",0,function({data:a}){let{language:m,t:o}=(0,k.useLanguage)(),p="VN"===m,q=p?"vi":"en",[r,s]=(0,c.useState)(!1),[t,u]=(0,c.useState)(!1),v=async a=>{a.preventDefault(),s(!0);let b=a.target;try{let a=new FormData(b),c=await n(a);c.error?l.default.error(c.error):(u(!0),b.reset(),setTimeout(()=>u(!1),5e3))}catch(a){l.default.error(p?"Có lỗi xảy ra, vui lòng thử lại!":"An error occurred, please try again!")}finally{s(!1)}},w=()=>{},x=(a,b,c="")=>a?"string"==typeof a?a||c:a?.[b]||a?.vi||a?.en||c:c,y=(a.contactInfo?.hotlines&&a.contactInfo.hotlines[0]||a.contactInfo?.hotline||"0918 458 399").replace(/[^0-9+]/g,"");return x(a.pageContent?.title,q,p?"CHÚNG TÔI LUÔN SẴN SÀNG LẮNG NGHE":"WE ARE ALWAYS READY TO LISTEN"),(0,b.jsxs)("div",{className:"flex flex-col flex-1",children:[(0,b.jsx)(d.default,{pageKey:"BANNER_CONTACT",centered:!0,customImage:"/images/maintech-page-banner.png",overlayOpacity:a.hero.overlayOpacity,vi:{badge:x(a.pageContent?.subtitle,"vi","KẾT NỐI"),title:x(a.hero.title,"vi",o("contact_page.hero.title")),desc:""},en:{badge:x(a.pageContent?.subtitle,"en","CONNECT"),title:x(a.hero.title,"en",o("contact_page.hero.title")),desc:""}}),(0,b.jsx)("section",{className:"pt-16 md:pt-24 pb-8 md:pb-12 bg-white relative z-10",children:(0,b.jsx)("div",{className:"mx-auto w-full max-w-[1400px] px-6",children:(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24",children:[(0,b.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,b.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400 group-hover:text-[#C8102E] transition-colors",children:(0,b.jsx)(h.MapPin,{size:24,className:"text-[#C8102E]"})}),(0,b.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:p?"Địa Chỉ":"Address"}),a.addresses?.list?.map((a,c)=>(0,b.jsx)("p",{className:`text-slate-500 text-sm leading-relaxed ${c>0?"mt-2":""}`,children:a},c))]}),(0,b.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,b.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,b.jsx)(f.Mail,{size:24,className:"text-[#C8102E]"})}),(0,b.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:p?"Gửi Email":"Email Us"}),a.contactInfo?.emails?.map((a,c)=>(0,b.jsx)("p",{className:`text-slate-500 text-sm leading-relaxed ${c>0?"mt-2":""}`,children:a},c))]}),(0,b.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,b.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,b.jsx)(e.Phone,{size:24,className:"text-[#C8102E]"})}),(0,b.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:p?"Gọi Ngay":"Call Now"}),a.contactInfo?.hotlines?.map((a,c)=>(0,b.jsx)("a",{href:`tel:${a.replace(/[^0-9+]/g,"")}`,onClick:w,className:`text-slate-500 text-sm leading-relaxed hover:text-[#C8102E] ${c>0?"mt-2":""}`,children:a},c))]}),(0,b.jsxs)("div",{className:"h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300",children:[(0,b.jsx)("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6",children:(0,b.jsx)(g.MessageCircle,{size:24,className:"text-[#C8102E]"})}),(0,b.jsx)("h3",{className:"text-lg font-semibold text-slate-900 mb-4",children:p?"Kênh Trực Tuyến":"Online Channels"}),(0,b.jsx)("div",{className:"flex flex-col gap-2 w-full",children:["zalo","whatsapp","telegram"].map(c=>{let d=a.quickChannels?.[c];return d?.enabled?(0,b.jsx)("a",{href:(b=>{let c=a.quickChannels[b];if(!c?.enabled)return null;let d=c.value||y;return"zalo"===b?`https://zalo.me/${d}`:"whatsapp"===b?`https://wa.me/${d.replace("+","")}`:"telegram"===b?`https://t.me/${d}`:"twitter"===b?`https://x.com/${d}`:"#"})(c)||"#",target:"_blank",rel:"noopener noreferrer",className:"text-slate-500 hover:text-[#C8102E] text-sm leading-relaxed transition-colors font-medium",children:d.label||c},c):null})})]})]})})}),(0,b.jsx)("section",{className:"w-full bg-white pb-16 md:pb-24 pt-4 md:pt-8 flex justify-center",children:(0,b.jsxs)("div",{className:"w-full max-w-4xl px-4",children:[(0,b.jsxs)("div",{className:"text-center mb-10",children:[(0,b.jsx)("h2",{className:"text-3xl md:text-4xl font-bold text-[#0a1930] mb-4 tracking-tight",children:x(a.pageContent?.title,q,p?"Bạn Cần Hỗ Trợ?":"Have Any Question?")}),(0,b.jsx)("p",{className:"text-slate-500 max-w-2xl mx-auto",children:x(a.pageContent?.description,q,p?"Hãy để lại thông tin, đội ngũ kỹ thuật của Maintech sẽ liên hệ và tư vấn giải pháp tối ưu nhất cho bạn.":"Regardless of your request for maintenance, spare parts or advice on new solutions, Maintech's engineering team is always ready to accompany your business.")})]}),(0,b.jsx)("div",{className:"bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-12 w-full rounded-sm",children:t?(0,b.jsxs)("div",{className:"flex flex-col items-center justify-center py-12 text-green-600",children:[(0,b.jsx)("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4",children:(0,b.jsx)(i.Send,{size:32,className:"text-green-600"})}),(0,b.jsx)("h3",{className:"text-xl font-bold",children:p?"Gửi Thành Công!":"Successfully Sent!"}),(0,b.jsx)("p",{className:"text-slate-500 mt-2 text-center",children:p?"Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.":"We will get back to you as soon as possible."})]}):(0,b.jsxs)("form",{onSubmit:v,className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,b.jsx)("div",{children:(0,b.jsx)("input",{type:"text",name:"name",required:!0,placeholder:p?"Tên của bạn *":"Your Name *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,b.jsx)("div",{children:(0,b.jsx)("input",{type:"email",name:"email",required:!0,placeholder:p?"Email của bạn *":"Your Email *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,b.jsx)("div",{children:(0,b.jsx)("input",{type:"text",name:"company",required:!0,placeholder:p?"Tên công ty *":"Company Name *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,b.jsx)("div",{children:(0,b.jsx)("input",{type:"text",name:"phone",required:!0,placeholder:p?"Số điện thoại *":"Phone Number *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"})}),(0,b.jsx)("div",{className:"md:col-span-2",children:(0,b.jsxs)("select",{name:"service_interest",required:!0,className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all text-slate-500 appearance-none",children:[(0,b.jsx)("option",{value:"",children:p?"Dịch vụ quan tâm *":"Services *"}),(0,b.jsx)("option",{value:"Bảo trì & Sửa chữa",children:p?"Bảo trì & Sửa chữa":"Maintenance & Repair"}),(0,b.jsx)("option",{value:"Cung cấp phụ tùng",children:p?"Cung cấp phụ tùng":"Spare Parts"}),(0,b.jsx)("option",{value:"Giải pháp tự động hóa",children:p?"Giải pháp tự động hóa":"Automation Solutions"})]})}),(0,b.jsx)("div",{className:"md:col-span-2",children:(0,b.jsx)("textarea",{name:"message",rows:5,required:!0,placeholder:p?"Nội dung tin nhắn... *":"Message... *",className:"w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"})}),(0,b.jsx)("div",{className:"md:col-span-2 flex justify-center mt-4",children:(0,b.jsx)("button",{type:"submit",disabled:r,className:"bg-[#C8102E] hover:bg-[#9a0c22] text-white px-10 py-4 font-bold uppercase tracking-wider transition-colors min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-70",children:r?(0,b.jsx)(j,{size:20,className:"animate-spin"}):p?"Gửi Liên Hệ":"Get In Touch"})})]})})]})}),(0,b.jsx)("section",{className:"h-[500px] border-t border-slate-100",children:(0,b.jsx)("iframe",{src:a.addresses.mapUrl||"https://maps.google.com/maps?q=Maintech+Vietnam+%C4%90%E1%BB%93ng+Nai&output=embed&z=15",width:"100%",height:"100%",style:{border:0},allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade",title:"Maintech Vietnam Locations",className:"grayscale hover:grayscale-0 transition-all duration-1000"})})]})}],23565)},73761,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(46271),e=a.i(48136),f=a.i(38246);a.s(["default",0,function({pageKey:a,children:g,isLight:h=!1,overlayColor:i,customImage:j,overlayOpacity:k,centered:l=!1,vi:m,en:n}){let o="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85",[p,q]=(0,c.useState)(void 0!==j?j||"":"BANNER_ABOUT"===a?o:""),{language:r}=(0,e.useLanguage)(),s="VN"===r,t=s?m:n,u="BANNER_ABOUT"===a,v=l||u;(0,c.useEffect)(()=>{void 0!==j?q(j||""):q(u?o:"")},[a,j,u]);let w=Number(k),x=Number.isFinite(w)?Math.min(1,Math.max(0,w)):h?.2:1,y=a?({BANNER_ABOUT:{vi:"Về chúng tôi",en:"About",href:"/about"},BANNER_SERVICES:{vi:"Dịch vụ",en:"Services",href:"/services"},BANNER_PRODUCTS:{vi:"Sản phẩm",en:"Products",href:"/products"},BANNER_NEWS:{vi:"Tin tức",en:"News",href:"/news"},BANNER_CONTACT:{vi:"Liên hệ",en:"Contact",href:"/contact"}})[a]:void 0,{top:z,highlight:A}=(a=>{if(!a)return{top:"",highlight:""};if(v&&a.title&&!a.titleTop&&!a.titleHighlight)return{top:"",highlight:a.title};if(a.titleTop||a.titleHighlight)return{top:a.titleTop||"",highlight:a.titleHighlight||""};let b=a.title||"",c=b.toLowerCase();if(c.includes("về chúng tôi")||c.includes("giới thiệu")||c.includes("about us"))return u?{top:"",highlight:b||(s?"Về Chúng Tôi":"About Us")}:s?{top:"Chúng tôi là",highlight:"Maintech Việt Nam"}:{top:"We are",highlight:"Maintech Vietnam"};if(c.includes("dịch vụ")||c.includes("services"))return s?{top:"Dịch vụ chuyên biệt",highlight:"Giải pháp tối ưu"}:{top:"Specialized Services",highlight:"Optimal Solutions"};if(c.includes("sản phẩm")||c.includes("products"))return s?{top:"Sản phẩm & thiết bị",highlight:"Công nghiệp"}:{top:"Products & Equipment",highlight:"Industrial"};if(c.includes("tin tức")||c.includes("news"))return s?{top:"Tin tức kỹ thuật",highlight:"Dự án Maintech"}:{top:"Technical News",highlight:"Maintech Projects"};if(c.includes("liên hệ")||c.includes("contact"))return s?{top:"Liên hệ",highlight:"Maintech Việt Nam"}:{top:"Contact",highlight:"Maintech Vietnam"};let d=b.split(" ");return d.length>2?{top:d.slice(0,d.length-2).join(" "),highlight:d.slice(d.length-2).join(" ")}:2===d.length?{top:d[0],highlight:d[1]}:{top:"",highlight:b}})(t);return(0,b.jsxs)("section",{className:`relative w-full min-h-[350px] md:min-h-[380px] flex items-center justify-center overflow-hidden ${h?"bg-white":"bg-[#050505]"}`,children:[(0,b.jsxs)("div",{className:"absolute inset-0 z-0",children:[p&&(0,b.jsx)(d.motion.div,{initial:{scale:1.1,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1.5,ease:"easeOut"},className:"w-full h-full",children:(0,b.jsx)("img",{src:p,alt:"Banner Background",className:"w-full h-full object-cover"})}),(0,b.jsx)("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"radial-gradient(#ffffff 1px, transparent 1px)",backgroundSize:"30px 30px"}}),(0,b.jsx)("div",{className:"absolute inset-0 transition-opacity duration-300",style:{background:h?"rgba(255, 255, 255, 0.2)":`linear-gradient(to right, rgba(2,6,23,${.9*x>.95?.95:.9*x}) 0%, rgba(2,6,23,${.35*x}) 100%)`,opacity:1}}),!h&&(0,b.jsx)("div",{className:"absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/95 to-transparent z-10 pointer-events-none"})]}),(0,b.jsx)("div",{className:"absolute bottom-0 left-0 w-full h-[3px] bg-[#C8102E] z-20"}),(0,b.jsx)("div",{className:`relative z-10 mx-auto w-full ${v?"max-w-none":"max-w-[1400px]"} px-4 pt-20 md:px-8 md:pt-28 ${v?"text-center":""}`,children:(0,b.jsx)(d.motion.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},className:`flex w-full flex-col ${v?"items-center text-center":"items-start text-left"}`,children:t?(0,b.jsxs)(b.Fragment,{children:[!1,(0,b.jsxs)("h1",{className:`${v?"text-3xl sm:text-4xl lg:text-5xl":"text-3xl md:text-4xl lg:text-5xl xl:text-6xl"} mb-8 font-semibold tracking-tight leading-[1.1] break-words`,children:[!1,v?(0,b.jsx)("span",{className:"block text-white break-words",children:A.split(/(maintech)/gi).map((a,c)=>"maintech"===a.toLowerCase()?(0,b.jsx)("span",{className:"text-[#C8102E]",children:a},c):a)}):(0,b.jsx)("span",{className:"block text-[#C8102E]",children:A})]}),y&&(0,b.jsxs)("nav",{"aria-label":"Breadcrumb",className:"mt-0 mb-6 text-xs font-semibold uppercase tracking-widest text-white/80",children:[(0,b.jsx)(f.default,{href:"/",className:"text-white/80 transition-colors hover:text-white",children:s?"Trang chủ":"Home"}),(0,b.jsx)("span",{className:"mx-3 text-base font-bold leading-none text-white/80",children:"/"}),(0,b.jsx)(f.default,{href:y.href,className:"text-white/80 transition-colors hover:text-white",children:s?y.vi:y.en})]}),t.desc&&(0,b.jsx)("p",{className:"text-base md:text-lg text-white/80 font-medium tracking-wide max-w-[640px] leading-relaxed",children:"Trang chủ / Tin tức"===t.desc?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f.default,{href:"/",className:"hover:text-white transition-colors hover:underline",children:"Trang chủ"})," / ",(0,b.jsx)(f.default,{href:"/news",className:"hover:text-white transition-colors hover:underline",children:"Tin tức"})]}):"Home / News"===t.desc?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f.default,{href:"/",className:"hover:text-white transition-colors hover:underline",children:"Home"})," / ",(0,b.jsx)(f.default,{href:"/news",className:"hover:text-white transition-colors hover:underline",children:"News"})]}):t.desc})]}):g})})]})}])}];

//# sourceMappingURL=_1et-gus._.js.map