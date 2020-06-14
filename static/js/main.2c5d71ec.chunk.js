(this.webpackJsonpshopper=this.webpackJsonpshopper||[]).push([[0],{104:function(e,t,n){},144:function(e,t,n){"use strict";n.r(t);var a,i=n(0),o=n.n(i),r=n(8),l=n.n(r),c=(n(104),n(11)),s=n(51),u=n(50),d={title:"ShopperState",type:"object",properties:{selectedList:{type:"number"},lists:{type:"array",minItems:0,items:{type:"object",required:["name","items"],properties:{name:{type:"string"},items:{type:"array",minItems:0,items:{type:"object",required:["name","quantity","enabled"],properties:{name:{type:"string"},quantity:{type:"number"},enabled:{type:"boolean"}}}}}}}},additionalProperties:!1,required:["lists"]};!function(e){e[e.ADD_LIST=0]="ADD_LIST",e[e.EDIT_LIST=1]="EDIT_LIST",e[e.ADD_ITEM=2]="ADD_ITEM",e[e.EDIT_ITEM=3]="EDIT_ITEM"}(a||(a={}));var m=n(76),f=n.n(m),p="shopper-state";function v(e){var t=new f.a({allErrors:!0}).compile(d);if(t(e))return e;throw console.error("Existing state object:\n".concat(JSON.stringify(e,null,2),"\nFailed validation:\n").concat(JSON.stringify(t.errors,null,2))),Error("Invalid localStorage object")}var g=function(e){var t=localStorage.getItem(p);return null===t?e:v(JSON.parse(t))}({selectedList:void 0,lists:[]}),b=function(e,t){return e>=0&&e<t.length},E=Object(u.b)({name:"shopper",initialState:g,reducers:{addList:function(e,t){e.dialogState=void 0,e.lists.push({name:t.payload,items:[]})},editList:function(e,t){var n=e.dialogState;if(n&&n.type===a.EDIT_LIST){var i=n.index,o=t.payload;b(i,e.lists)&&(e.lists[i].name=o)}e.dialogState=void 0},deleteList:function(e,t){var n=t.payload;b(n,e.lists)&&e.lists.splice(n,1)},selectList:function(e,t){e.selectedList=t.payload},deselectList:function(e){e.selectedList=void 0},addItem:function(e,t){e.dialogState=void 0;var n=t.payload,a=n.name,i=n.quantity,o=e.selectedList;void 0!==o&&b(o,e.lists)&&e.lists[o].items.push({name:a,quantity:i,enabled:!0})},editItem:function(e,t){var n=e.dialogState;if(n&&n.type===a.EDIT_ITEM){var i=n.index,o=t.payload,r=o.name,l=o.quantity,c=e.selectedList,s=i;if(void 0!==c&&b(c,e.lists)&&b(s,e.lists[c].items)){var u=e.lists[c].items[s];u.name=r,u.quantity=l}}e.dialogState=void 0},deleteItem:function(e,t){var n=e.selectedList,a=t.payload;void 0!==n&&b(n,e.lists)&&b(a,e.lists[n].items)&&e.lists[n].items.splice(a,1)},toggleItem:function(e,t){var n=e.selectedList,a=t.payload;if(void 0!==n&&b(n,e.lists)&&b(a,e.lists[n].items)){var i=e.lists[n].items[a];i.enabled=!i.enabled}},openAddListDialog:function(e){e.dialogState={type:a.ADD_LIST}},openEditListDialog:function(e,t){e.dialogState={type:a.EDIT_LIST,index:t.payload}},openAddItemDialog:function(e){e.dialogState={type:a.ADD_ITEM}},openEditItemDialog:function(e,t){e.dialogState={type:a.EDIT_ITEM,index:t.payload}},closeDialog:function(e){e.dialogState=void 0},copyToClipboard:function(e){var t,n;(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.writeText)?(navigator.clipboard.writeText(JSON.stringify(e)),S.log("Copied to clipboard.")):S.log("ERROR: Missing clipboard browser functionality")},updateState:function(e,t){e.lists=t.payload.lists,e.selectedList=void 0}}}),y=E.actions,h=E.reducer,O=Object(u.a)({reducer:h}),C=Object(s.a)({},y,{importFromClipboard:function(){return function(e){var t,n;(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.readText)?navigator.clipboard.readText().then((function(t){var n=v(JSON.parse(t));e(y.updateState(n)),S.log("Imported from clipboard")})).catch((function(e){console.log(e),S.log("ERROR: ".concat(e))})):S.log("ERROR: Missing clipboard browser functionality")}}}),S={log:function(e){return console.log(e)}};O.subscribe((function(){!function(e){var t=Object(s.a)({},e,{dialogState:void 0});localStorage.setItem(p,JSON.stringify(t))}(O.getState())}));var I=n(183),L=n(201),T=n(187),x=n(188),D=n(36),k=n(80),j=n.n(k),w=n(179),N=n(77),q=n.n(N),A=Object(I.a)((function(e){return Object(L.a)({button:{color:"inherit"}})})),_=Object(c.b)((function(){return{}}),{openDialog:function(){return C.openAddListDialog()}})((function(e){var t=A();return o.a.createElement(w.a,{className:t.button,edge:"end",title:"Add list",color:"secondary","aria-label":"add",onClick:function(){return e.openDialog()}},o.a.createElement(q.a,null))})),M=n(78),R=n.n(M),W=Object(I.a)((function(e){return Object(L.a)({button:{color:"inherit"}})})),B=Object(c.b)((function(){return{}}),{openDialog:function(){return C.openAddItemDialog()}})((function(e){var t=W();return o.a.createElement(w.a,{className:t.button,edge:"end",title:"Add item",color:"secondary","aria-label":"add",onClick:function(){return e.openDialog()}},o.a.createElement(R.a,null))})),P=n(18),F=n(83),J=n(186),U=n(79),V=n.n(U),G=function(e){var t=H(),n=o.a.useState(null),a=Object(P.a)(n,2),i=a[0],r=a[1],l=function(){r(null)};return o.a.createElement("div",null,o.a.createElement(w.a,{className:t.button,"aria-controls":"simple-menu",edge:"end","aria-label":"menu",color:"secondary","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},o.a.createElement(V.a,null)),o.a.createElement(F.a,{anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:l},e.actions.map((function(e,t){var n=e.label,a=e.action;return o.a.createElement(J.a,{key:t,onClick:function(){l(),a()}},n)}))))},H=Object(I.a)((function(e){return Object(L.a)({button:{color:"inherit"}})})),z=Object(I.a)((function(e){return Object(L.a)({root:{flexGrow:0},title:{flexGrow:0},menuButton:{flexGrow:0},rightButton:{flexGrow:1,display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}})}));var Q=Object(c.b)((function(e){if(void 0!==e.selectedList){var t=e.lists[e.selectedList],n=t.name;return{selectedList:{totalItemCount:t.items.length,pendingItemCount:t.items.reduce((function(e,t){return e+Number(!!t.enabled)}),0),listName:n}}}return{selectedList:void 0}}),{deselectList:function(){return C.deselectList()},copyToClipboard:function(){return C.copyToClipboard()},importFromClipboard:function(){return C.importFromClipboard()}})((function(e){var t=z(),n="Shopper";if(e.selectedList){var a=e.selectedList,i=a.listName,r=a.pendingItemCount,l=a.totalItemCount;n=i,l>0&&(n="(".concat(r,") ").concat(n))}return o.a.createElement("div",{className:t.root},o.a.createElement(T.a,{position:"static"},o.a.createElement(x.a,null,e.selectedList&&o.a.createElement(w.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu",onClick:function(){return e.deselectList()}},o.a.createElement(j.a,null)),o.a.createElement(D.a,{variant:"h6",className:t.title,onClick:function(){"Shopper"===n&&S.log("commit: 01777e7 (2020-06-14T12:03:39.835Z)")}},n),o.a.createElement("div",{className:t.rightButton},e.selectedList?o.a.createElement(B,null):o.a.createElement(_,null)),o.a.createElement(G,{actions:[{label:"import from clipboard",action:function(){return e.importFromClipboard()}},{label:"copy to clipboard",action:function(){return e.copyToClipboard()}}]}))))})),Z=n(185),$=n(146),K=n(189),X=n(190);function Y(e){var t=ee(),n=e.lists.sort((function(e,t){return Number(!e.enabled)-Number(!t.enabled)}));return o.a.createElement("div",{className:t.root},o.a.createElement(Z.a,{component:"nav",className:t.list},n.map((function(n){var a=n.name,i=n.comment,r=n.enabled,l=n.index;return o.a.createElement($.a,{style:{backgroundColor:!1!==r?"white":"gray"},key:l,button:!0,onClick:function(){return e.onClick(l)}},o.a.createElement(K.a,{primary:a,secondary:i}),o.a.createElement(X.a,{className:t.menuButton},o.a.createElement(G,{actions:[{label:"edit",action:function(){return e.onEdit(l)}},{label:"delete",action:function(){return e.onDelete(l)}}]})))}))))}var ee=Object(I.a)((function(e){return Object(L.a)({root:{backgroundColor:e.palette.background.default,flex:"1",height:"90vh",display:"flex",flexDirection:"column"},list:{overflow:"scroll"},menuButton:{color:e.palette.grey[500]}})})),te={onDelete:function(e){return C.deleteList(e)},onEdit:function(e){return C.openEditListDialog(e)},onClick:function(e){return C.selectList(e)}},ne=Object(c.b)((function(e){return{lists:e.lists.map((function(e,t){var n=e.name,a=e.items;return{name:n,comment:"".concat(a.length," items"),index:t}}))}}),te)(Y),ae=n(195),ie=n(197),oe=n(200),re=n(194),le=n(192),ce=n(193),se=n(191),ue=function(e){return e.trim().length>0},de=function(e){var t=ue(e.value),n=o.a.useState(t),a=Object(P.a)(n,2),i=a[0],r=a[1],l=o.a.useState(e.value),c=Object(P.a)(l,2),s=c[0],u=c[1];function d(t){t?e.onClose(s):e.onClose()}return o.a.createElement(oe.a,{open:e.isOpen,onEnter:function(){return u(e.value),void r(ue(e.value))},onClose:function(){return d(!1)}},o.a.createElement(se.a,null,e.title),o.a.createElement(le.a,null,o.a.createElement(ce.a,null,e.descriptionText),o.a.createElement(ie.a,{error:!i,autoFocus:!0,margin:"dense",label:"List name",type:"text",onChange:function(e){var t=e.target.value;u(t),r(ue(t))},fullWidth:!0,value:s})),o.a.createElement(re.a,null,o.a.createElement(ae.a,{onClick:function(){return d(!1)},color:"primary"},"Cancel"),o.a.createElement(ae.a,{onClick:function(){return d(!0)},color:"primary",disabled:!i},e.okText)))},me=Object(c.b)((function(e){var t;return{isOpen:(null===(t=e.dialogState)||void 0===t?void 0:t.type)===a.ADD_LIST}}),{onClose:function(e){return e?C.addList(e):C.closeDialog()}})((function(e){return o.a.createElement(de,Object.assign({value:"",title:"Create List",okText:"Create",descriptionText:"Pick the name for your new list."},e))})),fe=function(e){return{name:e.name.trim().length>0,quantity:e.quantity>0}},pe=function(e){var t=fe(e.value),n=o.a.useState(t),a=Object(P.a)(n,2),i=a[0],r=a[1],l=o.a.useState(e.value),c=Object(P.a)(l,2),s=c[0],u=c[1];function d(t){t?e.onClose(s):e.onClose(),u(e.value)}return o.a.createElement("div",null,o.a.createElement(oe.a,{open:e.isOpen,onEnter:function(){return u(e.value),void r(fe(e.value))},onClose:function(){return d(!1)}},o.a.createElement(se.a,null,e.title),o.a.createElement(le.a,null,o.a.createElement(ce.a,null,e.descriptionText),o.a.createElement(ie.a,{error:!i.name,autoFocus:!0,margin:"dense",label:"Item name",type:"text",onChange:function(e){var t={name:e.target.value,quantity:s.quantity};u(t),r(fe(t))},fullWidth:!0,value:s.name}),o.a.createElement(ie.a,{error:!i.quantity,id:"standard-number",label:"Quantity",placeholder:"How many of this item",value:s.quantity,onChange:function(e){var t={name:s.name,quantity:Number(e.target.value)};u(t),r(fe(t))},type:"number",fullWidth:!0,InputLabelProps:{shrink:!0},margin:"normal"})),o.a.createElement(re.a,null,o.a.createElement(ae.a,{onClick:function(){return d(!1)},color:"primary"},"Cancel"),o.a.createElement(ae.a,{onClick:function(){return d(!0)},color:"primary",disabled:!i.name||!i.quantity},e.okText))))},ve={name:"",quantity:1},ge=Object(c.b)((function(e){var t;return{isOpen:(null===(t=e.dialogState)||void 0===t?void 0:t.type)===a.ADD_ITEM}}),{onClose:function(e){return e?C.addItem(e):C.closeDialog()}})((function(e){return o.a.createElement(pe,Object.assign({value:ve,title:"Create Item",okText:"Create",descriptionText:"Pick the name for your new item."},e))})),be=Object(c.b)((function(e){var t=e.dialogState;return(null===t||void 0===t?void 0:t.type)===a.EDIT_LIST&&t.index>=0&&t.index<e.lists.length?{isOpen:!0,initialValue:e.lists[t.index].name}:{isOpen:!1,initialValue:""}}),{onClose:function(e){return e?C.editList(e):C.closeDialog()}})((function(e){return o.a.createElement(de,Object.assign({value:e.initialValue,title:"Edit List",okText:"Update",descriptionText:"Pick the name for your list."},e))})),Ee=Object(c.b)((function(e){var t=e.dialogState,n=e.selectedList;return void 0!==n&&n>=0&&n<e.lists.length&&(null===t||void 0===t?void 0:t.type)===a.EDIT_ITEM&&t.index>=0&&t.index<e.lists[n].items.length?{isOpen:!0,initialValue:e.lists[n].items[t.index]}:{isOpen:!1,initialValue:{name:"",quantity:1}}}),{onClose:function(e){return e?C.editItem(e):C.closeDialog()}})((function(e){return o.a.createElement(pe,Object.assign({value:e.initialValue,title:"Edit List",okText:"Update",descriptionText:"Pick the name for your list."},e))})),ye={onDelete:function(e){return C.deleteItem(e)},onEdit:function(e){return C.openEditItemDialog(e)},onClick:function(e){return C.toggleItem(e)}},he=Object(c.b)((function(e){var t=e.selectedList;return void 0!==t?{lists:e.lists[t].items.map((function(e,t){var n=e.name,a=e.quantity,i=e.enabled;return{name:n,comment:"".concat(a," elements"),enabled:i,index:t}}))}:{lists:[]}}),ye)(Y),Oe=n(199),Ce=n(81),Se=n.n(Ce),Ie=Object(I.a)((function(e){return{close:{padding:e.spacing(.5)}}})),Le=function(){var e=Ie(),t=o.a.useState(!1),n=Object(P.a)(t,2),a=n[0],i=n[1],r=o.a.useState("Hello!"),l=Object(P.a)(r,2),c=l[0],s=l[1];function u(e,t){"clickaway"!==t&&i(!1)}return S.log=function(e){s(e),i(!0)},o.a.createElement(Oe.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:a,autoHideDuration:2e3,onClose:u,message:c,action:[o.a.createElement(w.a,{key:"close","aria-label":"Close",color:"inherit",className:e.close,onClick:u},o.a.createElement(Se.a,null))]})};var Te=Object(c.b)((function(e){return{isListSelected:void 0!==e.selectedList}}))((function(e){var t=e.isListSelected;return o.a.createElement("div",{style:{flex:1,display:"flex",flexFlow:"column",height:"100%"}},o.a.createElement(Q,null),t?o.a.createElement(he,null):o.a.createElement(ne,null),t?o.a.createElement(ge,null):o.a.createElement(me,null),t?o.a.createElement(Ee,null):o.a.createElement(be,null),o.a.createElement(Le,null))})),xe=n(82),De=n(196),ke=Object(xe.a)({props:{MuiButtonBase:{disableRipple:!0}},transitions:{create:function(){return"none"}}}),je=Object(I.a)((function(e){return Object(L.a)({app:{minHeight:"100vh",height:"100%",display:"flex",overflow:"hidden",flexDirection:"column"}})})),we=function(){var e=je();return o.a.createElement(De.a,{theme:ke},o.a.createElement("div",{className:e.app},o.a.createElement(Te,null)))},Ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function qe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(c.a,{store:O},o.a.createElement(we,null))),document.getElementById("root")),function(){var e=new URL(window.location.href).searchParams.get("debug");return Boolean(e)}()?(console.log("No service worker enabled."),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))):function(e){if("serviceWorker"in navigator){if(new URL("/shopper",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/shopper","/service-worker.js");Ne?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):qe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):qe(t,e)}))}}()},99:function(e,t,n){e.exports=n(144)}},[[99,1,2]]]);
//# sourceMappingURL=main.2c5d71ec.chunk.js.map