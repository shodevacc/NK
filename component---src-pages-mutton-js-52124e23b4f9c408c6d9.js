(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"9U3v":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),l=a("NfK6"),c=a("Bl7J");t.default=function(){return r.a.createElement(c.a,{title:"mutton biryani"},r.a.createElement(l.a,{data:{id:1,title:"Mutton Biryani",basePrice:200,description:"This is the mutton biryani",minimumWeight:3,src:"mutton",link:"/mutton"}}))}},NfK6:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a("q1tI"),r=a.n(n),l=a("/MKj"),c=a("t61m"),o=a("71H8"),i=a("sqfr"),u=a("qMvY"),m=a.n(u);function d(e){e.pk,e.category,e.src;var t=e.data,a=Object(n.useRef)(null),u=Object(l.c)((function(e){return e.cart})),d="undefined"!=typeof window,s=Object(l.b)(),p=!0,g=d&&u.CartProducts.filter((function(e){return e.id==t.id})),E=t.minimumWeight;u.CartProducts.length>0&&g.length>0&&(p=!1,E=g[0].weight);var b=Object(n.useState)(E),f=b[0],v=b[1],h=function(){return g.length>0&&f==g[0].weight?(console.log("ITEMS ARE NOT CHANGED"),r.a.createElement("button",{className:"logo-red-btn-disabled",type:"submit"},"No Changes")):(console.log("ITEMS ARE CHANGED",g),r.a.createElement("input",{onClick:function(e){return w(e)},className:"logo-red-btn ",type:"submit",value:"confirm"}))},w=function(e){if(console.log(e,e.target),console.log(a.current.value),e.preventDefault(),e.stopPropagation(),p){var n=Object.assign({},t,{weight:parseInt(f),price:parseInt((f*t.basePrice/t.minimumWeight).toFixed(2))});s(Object(c.a)(n)),s(Object(i.a)())}else{var r={id:t.id,newWeight:f,newPrice:parseInt((f*t.basePrice/t.minimumWeight).toFixed(2))};s(Object(c.c)(r)),s(Object(i.a)())}},N=function(){return u.CartLoading?r.a.createElement("div",null,"Loading"):r.a.createElement("div",{className:m.a.container},r.a.createElement(o.a,{className:m.a.productFlexImage,src:t.src}),r.a.createElement("div",{className:m.a.productFlexInfo},r.a.createElement("div",{className:m.a.card,style:{width:"100%"}},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:m.a.cardHeader},r.a.createElement("h5",{className:m.a.cardTitle},t.title)),r.a.createElement("p",null,t.description),r.a.createElement("div",{className:m.a.flexColMd},r.a.createElement("p",null,r.a.createElement("b",{style:{color:"#f9090a"}},"MRP: ₹",(f*t.basePrice/t.minimumWeight).toFixed(2))," ")),r.a.createElement("div",{className:m.a.productAddForm},r.a.createElement("form",{onSubmit:function(){return w()}},r.a.createElement("label",{htmlFor:"weight"},r.a.createElement("b",null,"Net Weight:")),r.a.createElement("select",{onChange:function(e){v(parseInt(a.current.value))},ref:a,name:"weight",id:"weight",value:f},r.a.createElement("option",{value:"3"},"3kg"),r.a.createElement("option",{value:"4"},"4kg"),r.a.createElement("option",{value:"5"},"5kg"),r.a.createElement("option",{value:"6"},"6kg")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(h,null)))))))};return r.a.createElement(N,null)}},qMvY:function(e,t,a){e.exports={container:"buy-module--container--3IfgP",productFlexImage:"buy-module--productFlexImage--2aoqT",productFlexInfo:"buy-module--productFlexInfo--2fZF8",productAddForm:"buy-module--productAddForm--27B9w",productButtonGroup:"buy-module--productButtonGroup--3BEMi",groupButton:"buy-module--groupButton--z-apE"}}}]);
//# sourceMappingURL=component---src-pages-mutton-js-52124e23b4f9c408c6d9.js.map