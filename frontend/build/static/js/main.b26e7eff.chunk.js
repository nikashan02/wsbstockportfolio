(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{142:function(t,e,n){},144:function(t,e,n){"use strict";n.r(e);var r=n(2),s=n(0),c=n.n(s),o=n(7),i=n.n(o),a=(n(65),n(8)),l=n(9),d=n(11),u=n(10),h=n(52),j=n.n(h),b=(n(105),n(53)),p=n.n(b),f=n(54),O=n.n(f),x=(n(129),n(130),function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this.props.stock,e=this.props.listOfTickers.find((function(e){return e.stock===t})).posts.map((function(t){return Object(r.jsxs)("li",{style:{margin:"0 0 15px 0"},children:[Object(r.jsx)("span",{children:Object(r.jsx)("a",{href:t.url,children:t.title})}),Object(r.jsx)("br",{}),Object(r.jsxs)("span",{children:[t.upvotes," upvotes | Price: $",t.historical," on ",t.created]})]})}));return Object(r.jsx)("div",{children:Object(r.jsx)("ul",{children:e})})}}]),n}(s.Component)),g=[{dataField:"stock",text:"Stock",sort:!0},{dataField:"shares",text:"Shares",sort:!0},{dataField:"sentiment",text:"Sentiment",sort:!0},{dataField:"avg_cost",text:"Average Cost",sort:!0},{dataField:"curr_price",text:"Current Price",sort:!0},{dataField:"total_return",text:"Total Return",sort:!0,style:function(t,e,n,r){return"+"===t.charAt(0)?{color:"#4CAF50",fontWeight:"bold"}:"0"===t.charAt(0)?{backgroundColor:"#FFFFFF",fontWeight:"bold"}:{color:"#EF5350",fontWeight:"bold"}}}],k=[{dataField:"shares",order:"desc"}],v=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){var t;return Object(a.a)(this,n),(t=e.call(this)).componentDidMount=function(){p.a.get("/getPosts").then((function(e){t.setState({stocks:e.data.res.sort((function(t,e){return t.shares+e.shares})).slice(0,30)})}))},t.state={stocks:[{stock:"",shares:0,sentiment:0,avg_cost:"$0",total_return:"0%",curr_price:"",posts:[{title:"",upvotes:0,url:"",created:"",historical:0}]}],width:400},t}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e={renderer:function(e){return Object(r.jsx)(x,{stock:e.stock,listOfTickers:t.state.stocks})}};return Object(r.jsx)(j.a,{bootstrap4:!0,keyField:"stock",pagination:O()(),data:this.state.stocks,columns:g,defaultSorted:k,expandRow:e})}}]),n}(s.Component),m=n(55),F=n.n(m),y=(n(142),function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)(F.a,{imageSrc:"https://i.imgur.com/2pIUj46.jpg",minHeight:"30vh",opacity:"0",parallaxOffset:"100",children:Object(r.jsxs)("div",{style:{background:"#E8E9C9",fontSize:"20px",padding:"10px",margin:"10px",transform:"rotate(-6deg)",borderRadius:"5px"},children:[Object(r.jsx)("h1",{style:{color:"#3E3E3C"},children:"The r/WallStreetBets Weekly Stock Portfolio"}),Object(r.jsx)("h4",{children:Object(r.jsx)("a",{href:"https://github.com/nikashan02/wsbstockportfolio",children:Object(r.jsx)("u",{children:"github"})})})]})}),Object(r.jsx)("br",{}),Object(r.jsx)("div",{className:"App",style:{width:"70%",position:"absolute",left:"50%",transform:"translate(-50%, 0%)"},children:Object(r.jsx)(v,{})})]})}}]),n}(s.Component)),C=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,145)).then((function(e){var n=e.getCLS,r=e.getFID,s=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),r(t),s(t),c(t),o(t)}))};i.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(y,{})}),document.getElementById("root")),C()},65:function(t,e,n){}},[[144,1,2]]]);
//# sourceMappingURL=main.b26e7eff.chunk.js.map