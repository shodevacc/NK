(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"N+lm":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),c=a("NfK6"),l=a("Bl7J");t.default=function(){return r.a.createElement(l.a,{title:"chicken biryani"},r.a.createElement(c.a,{data:{title:"Chicken Biryani",price:100,description:"This is the chicken biryani",minimumWeight:3,src:"chicken"}}))}},NfK6:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a("q1tI"),r=a.n(n),c=a("/MKj"),l=a("Wbzz"),o=a("9eSz"),u=a.n(o),i=function(e){var t=e.className,a=e.src,n=e.id,c=e.style,o=e.reference,i=Object(l.useStaticQuery)("1353074897"),m={};for(var d in i.HomeImages.edges.forEach((function(e){m[e.node.name]=e.node.childImageSharp.fluid})),m)if(a==d)return r.a.createElement(u.a,{ref:o,style:c,id:n,className:t,fluid:m[d]});return r.a.createElement("div",null)},m=a("sqfr"),d=a("qMvY"),s=a.n(d);function p(e){e.pk,e.category,e.src;var t=e.data;console.log("RENDERING Buy");var a=Object(n.useRef)(null),l=Object(c.c)((function(e){return e.cart})),o=Object(c.b)(),u={title:"chicken",weight:"500",serves:"2",price:10,category:"CHICKEN"},d=Object(n.useState)(3),p=d[0],f=d[1],E=function(){return r.a.createElement("input",{onClick:function(e){return g(e)},className:"logo-red-btn ",type:"submit",value:"confirm"})},g=function(e){console.log(e,e.target),console.log(a.current.value),e.preventDefault(),e.stopPropagation();Number(u.id);o(Object(m.a)())},b=function(){return l.CartLoading?r.a.createElement("div",null,"Loading"):r.a.createElement("div",{className:s.a.container},r.a.createElement(i,{className:s.a.productFlexImage,src:t.src}),r.a.createElement("div",{className:s.a.productFlexInfo},r.a.createElement("div",{className:s.a.card,style:{width:"100%"}},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:s.a.cardHeader},r.a.createElement("h5",{className:s.a.cardTitle},t.title)),r.a.createElement("p",null,t.description),r.a.createElement("div",{className:s.a.flexColMd},r.a.createElement("p",null,r.a.createElement("b",{style:{color:"#f9090a"}},"MRP: ₹",(p*t.price/t.minimumWeight).toFixed(2))," "),r.a.createElement("p",null,r.a.createElement("b",null,"Net: ",t.weight," kg")," ")),r.a.createElement("div",{className:s.a.productAddForm},r.a.createElement("form",{onSubmit:function(){return g()}},r.a.createElement("label",{for:"weight"},"Net Weight"),r.a.createElement("select",{onChange:function(e){f(parseInt(a.current.value))},ref:a,name:"weight",id:"weight",value:p},r.a.createElement("option",{value:"3"},"3kg"),r.a.createElement("option",{value:"4"},"4kg"),r.a.createElement("option",{value:"5"},"5kg"),r.a.createElement("option",{value:"6"},"6kg")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(E,null)))))))};return r.a.createElement(b,null)}},qMvY:function(e,t,a){e.exports={container:"buy-module--container--3IfgP",productFlexImage:"buy-module--productFlexImage--2aoqT",productFlexInfo:"buy-module--productFlexInfo--2fZF8",productAddForm:"buy-module--productAddForm--27B9w",productButtonGroup:"buy-module--productButtonGroup--3BEMi",groupButton:"buy-module--groupButton--z-apE"}}}]);
//# sourceMappingURL=component---src-pages-chicken-js-750550d2dced96312ced.js.map