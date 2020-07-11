(this.webpackJsonpshopper=this.webpackJsonpshopper||[]).push([[0],{124:function(e,t,n){e.exports=n(188)},129:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var o,a=n(0),i=n.n(a),r=n(7),c=n.n(r),l=(n(129),n(10)),s=n(15),u=n(69),d=n(12),f={title:"ShopperState",type:"object",properties:{selectedList:{type:"number"},sortMode:{type:"string",enum:["default","categories"]},categoryMode:{type:"string",enum:["text","color","hidden"]},categories:{type:"array",minItems:0,items:{type:"object",required:["name"],properties:{name:{type:"string",minLength:1}}}},lists:{type:"array",minItems:0,items:{type:"object",required:["id","name","items"],properties:{id:{type:"string",minLength:1},name:{type:"string",minLength:1},items:{type:"array",minItems:0,items:{type:"object",required:["id","name","enabled"],properties:{id:{type:"string",minLength:1},name:{type:"string",minLength:1},comment:{type:"string"},enabled:{type:"boolean"},category:{type:"string",minLength:1}}}}}}}},additionalProperties:!1,required:["lists"]};!function(e){e[e.ADD_LIST=0]="ADD_LIST",e[e.EDIT_LIST=1]="EDIT_LIST",e[e.ADD_ITEM=2]="ADD_ITEM",e[e.EDIT_ITEM=3]="EDIT_ITEM"}(o||(o={}));var m=n(96),p=n.n(m),g="shopper-state";function v(e){var t=new p.a({allErrors:!0}).compile(f);if(t(e))return e;throw console.error("Existing state object:\n".concat(JSON.stringify(e,null,2),"\nFailed validation:\n").concat(JSON.stringify(t.errors,null,2))),Error("Invalid object")}var b=n(39),h=(n(168),b.c),y=function(){var e=Object(b.b)({enter:"Toastify__slide-enter",exit:"Toastify__slide-exit",duration:[200,200],appendPosition:!0});return i.a.createElement(b.a,{transition:e,position:"bottom-left",autoClose:2e3,hideProgressBar:!0,newestOnTop:!0,closeOnClick:!1,rtl:!1,pauseOnFocusLoss:!1,draggable:!1,pauseOnHover:!1})},E=Date.now().toString(36),C=0;function x(e){var t=void 0===e?"":"".concat(e,"-");return"".concat(t,"id(").concat(E,":").concat(C++,")")}var O=function(){return x("item")},L=function(e){var t=localStorage.getItem(g);return null===t?e:v(JSON.parse(t))}({selectedList:void 0,sortMode:void 0,lists:[]}),k=function(e,t){return e>=0&&e<t.length},I=Object(u.b)({name:"shopper",initialState:L,reducers:{setDefaultSort:function(e){e.sortMode="default"},setCategorySort:function(e){e.sortMode="categories"},setTextCategoryMode:function(e){e.categoryMode="text"},setHiddenCategoryMode:function(e){e.categoryMode="hidden"},setColorCategoryMode:function(e){e.categoryMode="color"},addList:function(e,t){var n=t.payload,o=n.name,a=n.items;e.lists.push({id:x("list"),name:o,items:a.map((function(e){var t=e.name,n=e.comment;return{id:O(),name:t,comment:n,enabled:!0}}))})},editList:function(e,t){var n=e.dialogState;if(n&&n.type===o.EDIT_LIST){var a=n.index,i=t.payload;k(a,e.lists)&&(e.lists[a].name=i,h.info("List updated"))}},deleteList:function(e,t){var n=t.payload;if(k(n,e.lists)){var o=e.lists.splice(n,1),a=Object(d.a)(o,1)[0];void 0===e.listUndo&&(e.listUndo=[]),e.listUndo.push(a),h.info('List "'.concat(a.name,'" deleted'))}},selectList:function(e,t){e.selectedList=t.payload},deselectList:function(e){e.selectedList=void 0,e.itemUndo=void 0},undoItemDeletion:function(e){var t=e.selectedList;if(void 0!==t&&k(t,e.lists)&&void 0!==e.itemUndo&&e.itemUndo.length>0){var n=e.itemUndo.pop();if(void 0!==n)return e.lists[t].items.push(n),void h.info("Item restored")}h.warn("Nothing to undo")},undoListDeletion:function(e){if(void 0!==e.listUndo&&e.listUndo.length>0){var t=e.listUndo.pop();if(void 0!==t)return e.lists.push(t),void h.info('List "'.concat(t.name,'" restored'))}h.warn("Nothing to undo")},addItem:function(e,t){var n=t.payload,o=n.name,a=n.comment,i=n.category,r=e.selectedList;void 0!==r&&k(r,e.lists)&&e.lists[r].items.push({id:O(),name:o,comment:a,enabled:!0,category:i})},editItem:function(e,t){var n=e.dialogState;if(n&&n.type===o.EDIT_ITEM){var a=n.index,i=t.payload,r=i.name,c=i.comment,l=i.listIndex,s=i.category,u=e.selectedList,f=a;if(void 0!==u&&k(u,e.lists)&&k(f,e.lists[u].items)){var m=e.lists[u].items[f];if(m.name=r,m.comment=c,m.category=s,void 0!==l&&u!==l&&k(l,e.lists)){var p=e.lists[u].items.splice(f,1),g=Object(d.a)(p,1)[0];e.lists[l].items.push(g),h.info("Item moved")}else h.info("Item updated")}}},deleteItem:function(e,t){var n=e.selectedList,o=t.payload;if(void 0!==n&&k(n,e.lists)&&k(o,e.lists[n].items)){var a=e.lists[n].items.splice(o,1),i=Object(d.a)(a,1)[0];void 0===e.itemUndo&&(e.itemUndo=[]),e.itemUndo.push(i),h.info("Item deleted")}},toggleItem:function(e,t){var n=e.selectedList,o=t.payload;if(void 0!==n&&k(n,e.lists)&&k(o,e.lists[n].items)){var a=e.lists[n].items[o];a.enabled=!a.enabled}},openAddListDialog:function(e){e.dialogState={type:o.ADD_LIST}},openEditListDialog:function(e,t){e.dialogState={type:o.EDIT_LIST,index:t.payload}},openAddItemDialog:function(e){e.dialogState={type:o.ADD_ITEM}},openEditItemDialog:function(e,t){e.dialogState={type:o.EDIT_ITEM,index:t.payload}},closeDialog:function(e){e.dialogState=void 0},copyToClipboard:function(e){var t,n;(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.writeText)?(navigator.clipboard.writeText(JSON.stringify(e)),h.info("Copied to clipboard")):h.error("ERROR: denied use of browser clipboard")},copyItemsToClipboard:function(e){var t,n,o=e.selectedList;if(void 0!==o&&k(o,e.lists))if(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.writeText){var a=e.lists[o].items,i=a.map((function(e){var t=e.name,n=e.comment;return"".concat(t," ").concat(n)})).join("\n");navigator.clipboard.writeText(i),h.info("Copied ".concat(a.length," items to clipboard"))}else h.error("ERROR: denied use of browser clipboard")},updateState:function(e,t){e.lists=t.payload.lists,e.selectedList=void 0}}}),T=I.actions,j=I.reducer,D=Object(u.a)({reducer:j}),S=Object(s.a)({},T,{importFromClipboard:function(){return function(e){var t,n;(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.readText)?navigator.clipboard.readText().then((function(t){var n=v(JSON.parse(t));e(T.updateState(n)),h.info("Imported from clipboard")})).catch((function(e){console.log(e),h.error("ERROR: ".concat(e))})):h.error("ERROR: denied use of browser clipboard")}}});D.subscribe((function(){!function(e){var t=Object(s.a)({},e,{dialogState:void 0,listUndo:void 0,itemUndo:void 0});localStorage.setItem(g,JSON.stringify(t))}(D.getState())}));var w=n(232),M=n(251),N=n(236),R=n(237),A=n(35),_=n(99),U=n.n(_),W=n(228),P=n(97),B=n.n(P),V=Object(w.a)((function(e){return Object(M.a)({button:{color:"inherit"}})})),F=Object(l.b)((function(){return{}}),{openDialog:function(){return S.openAddListDialog()}})((function(e){var t=V();return i.a.createElement(W.a,{className:t.button,edge:"end",title:"Add list",color:"secondary","aria-label":"add",onClick:function(){return e.openDialog()}},i.a.createElement(B.a,null))})),J=n(98),H=n.n(J),q=Object(w.a)((function(e){return Object(M.a)({button:{color:"inherit"}})})),G=Object(l.b)((function(){return{}}),{openDialog:function(){return S.openAddItemDialog()}})((function(e){var t=q();return i.a.createElement(W.a,{className:t.button,edge:"end",title:"Add item",color:"secondary","aria-label":"add",onClick:function(){return e.openDialog()}},i.a.createElement(H.a,null))})),X=n(109),Y=n(234),Z=n(235),$=function(e){var t=z(),n=i.a.useState(null),o=Object(d.a)(n,2),a=o[0],r=o[1],c=function(){r(null)};return i.a.createElement("div",null,i.a.createElement(W.a,{className:t.button,"aria-controls":"simple-menu",edge:"end","aria-label":"menu",color:"secondary","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},e.children),i.a.createElement(X.a,{anchorEl:a,keepMounted:!0,open:Boolean(a),onClose:c},e.actions.flatMap((function(e,t){var n=e.map((function(e,n){var o=e.label,a=e.action,r=e.selected;return i.a.createElement(Y.a,{key:"outer=".concat(t,"-inner").concat(n),onClick:function(){c(),a()},selected:!!r},o)}));return 0!==t&&n.unshift(i.a.createElement(Z.a,{key:"divider-".concat(t)})),n}))))},z=Object(w.a)((function(e){return Object(M.a)({button:{color:"inherit"}})})),K=n(101),Q=n.n(K),ee=n(100),te=n.n(ee),ne=Object(w.a)((function(e){return Object(M.a)({root:{flexGrow:0},title:{flexGrow:0},menuButton:{flexGrow:0},rightButton:{flexGrow:1,display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}})}));var oe=Object(l.b)((function(e){if(void 0!==e.selectedList){var t=e.lists[e.selectedList],n=t.name;return{selectedList:{totalItemCount:t.items.length,pendingItemCount:t.items.reduce((function(e,t){return e+Number(!!t.enabled)}),0),listName:n},sortMode:e.sortMode||"default",categoryMode:e.categoryMode||"text"}}return{selectedList:void 0,sortMode:"default",categoryMode:"text"}}),{deselectList:function(){return S.deselectList()},copyItemsToClipboard:function(){return S.copyItemsToClipboard()},copyToClipboard:function(){return S.copyToClipboard()},importFromClipboard:function(){return S.importFromClipboard()},undoItemDeletion:function(){return S.undoItemDeletion()},undoListDeletion:function(){return S.undoListDeletion()},setDefaultSort:function(){return S.setDefaultSort()},setCategorySort:function(){return S.setCategorySort()},setTextCategoryMode:function(){return S.setTextCategoryMode()},setHiddenCategoryMode:function(){return S.setHiddenCategoryMode()},setColorCategoryMode:function(){return S.setColorCategoryMode()}})((function(e){var t=ne(),n="Shopper";if(e.selectedList){var o=e.selectedList,a=o.listName,r=o.pendingItemCount,c=o.totalItemCount;n=a,c>0&&(n="(".concat(r,") ").concat(n))}var l=[{label:"copy list items to clipboard",action:function(){return e.copyItemsToClipboard()}}],s=[[{label:"import state from clipboard",action:function(){return e.importFromClipboard()}},{label:"copy state to clipboard",action:function(){return e.copyToClipboard()}}],[{label:"undo ".concat(e.selectedList?"item":"list"," deletion"),action:function(){return e.selectedList?e.undoItemDeletion():e.undoListDeletion()}}]];e.selectedList&&s.unshift(l);var u=[[{label:"default sort",action:function(){return e.setDefaultSort()},selected:"default"===e.sortMode},{label:"category sort",action:function(){return e.setCategorySort()},selected:"categories"===e.sortMode}],[{label:"hidden category",action:function(){return e.setHiddenCategoryMode()},selected:"hidden"===e.categoryMode},{label:"text category",action:function(){return e.setTextCategoryMode()},selected:"text"===e.categoryMode},{label:"color category",action:function(){return e.setColorCategoryMode()},selected:"color"===e.categoryMode}]];return i.a.createElement("div",{className:t.root},i.a.createElement(N.a,{position:"static"},i.a.createElement(R.a,null,e.selectedList&&i.a.createElement(W.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu",onClick:function(){return e.deselectList()}},i.a.createElement(U.a,null)),i.a.createElement(A.a,{variant:"h6",className:t.title,onClick:function(){"Shopper"===n&&b.c.info("commit: 49c3ef8 (2020-07-11T16:39:37.878Z)")}},n),i.a.createElement("div",{className:t.rightButton},e.selectedList?i.a.createElement(G,null):i.a.createElement(F,null)),e.selectedList&&i.a.createElement($,{actions:u},i.a.createElement(te.a,null)),i.a.createElement($,{actions:s},i.a.createElement(Q.a,null)))))})),ae=n(233),ie=n(191),re=n(238),ce=function(e){var t=void 0!==e.position,n=void 0!==e.position?{top:e.position.y,left:e.position.x}:void 0;return i.a.createElement(X.a,{keepMounted:!0,open:t,onClose:function(){return e.onClose()},anchorReference:"anchorPosition",anchorPosition:n},e.actions.flatMap((function(t,n){var o=t.map((function(t,o){var a=t.label,r=t.action;return i.a.createElement(Y.a,{key:"outer=".concat(n,"-inner").concat(o),onClick:function(){if(e.position){var t=e.position.index;e.onClose(),null!==t&&r(t)}}},a)}));return 0!==n&&o.unshift(i.a.createElement(Z.a,{key:"divider-".concat(n)})),o})))},le=n(106),se=n.n(le),ue=n(105),de=n.n(ue),fe=n(103),me=n.n(fe),pe=n(104),ge=n.n(pe),ve=n(102),be=n.n(ve),he=function(e){var t=Ce(),n=i.a.useRef({x:0,time:0}),o=function(e){n.current.x=e.screenX,n.current.time=Date.now()},a=function(t){return function(o){Math.abs(o.screenX-n.current.x)>10?o.preventDefault():"click"!==o.type||e.onClick(t)}},r=function(t,n){return function(o){o<n?e.onClick(t):o>n&&e.onDelete(t)}},c=i.a.useState(void 0),l=Object(d.a)(c,2),s=l[0],u=l[1],f=function(e){return function(t){t.preventDefault(),u({x:t.clientX-4,y:t.clientY-4,index:e})}};return i.a.createElement("div",{className:t.root},i.a.createElement(ce,{position:s,onClose:function(){u(void 0)},actions:e.actions}),i.a.createElement(ae.a,{component:"nav",className:t.list},e.lists.map((function(n){var c=n.id,l=n.name,s=n.comment,u=n.enabled,d=n.index,m=n.category,p=[i.a.createElement(ie.a,{key:"middle-panel",className:!1!==u?t.enabledItem:t.disabledItem,style:{backgroundColor:"color"===e.categoryMode&&e.extractColor?e.extractColor(m):void 0},button:!0,onContextMenu:f(d),onClick:a(d),onMouseDown:o},i.a.createElement(re.a,{primary:l,secondary:s}),m&&"text"===e.categoryMode&&i.a.createElement("div",{style:{}},m)),Ee];e.swipeRight&&p.unshift(ye);var g=e.swipeRight?1:0;return i.a.createElement(be.a,{key:"".concat(c,"-").concat(u),index:g,enableMouseEvents:!0,onChangeIndex:r(d,g)},p)}))))},ye=i.a.createElement("div",{key:"left-panel",style:{backgroundColor:"#a9f58c",height:"100%",direction:"rtl"}},i.a.createElement(me.a,{style:{height:"100%",marginRight:"10px",color:"gray"}}),i.a.createElement(ge.a,{style:{height:"100%",marginRight:"10px"}})),Ee=i.a.createElement("div",{key:"right-panel",style:{backgroundColor:"#ed837b",height:"100%"}},i.a.createElement(de.a,{style:{height:"100%",marginLeft:"10px",color:"gray"}}),i.a.createElement(se.a,{style:{height:"100%",marginLeft:"10px"}})),Ce=Object(w.a)((function(e){return Object(M.a)({root:{backgroundColor:e.palette.background.default,flex:"1",height:"90vh",display:"flex",flexDirection:"column"},list:{overflow:"scroll",backgroundColor:e.palette.background.default},enabledItem:{backgroundColor:"white",marginTop:"2px",marginBottom:"2px",userSelect:"none",textDecoration:"none",opacity:"1"},disabledItem:{backgroundColor:"white",marginTop:"2px",marginBottom:"2px",userSelect:"none",textDecoration:"line-through",opacity:"0.5","&:hover":{textDecoration:"line-through"}},menuButton:{color:e.palette.grey[500]}})})),xe={onDelete:function(e){return S.deleteList(e)},onEdit:function(e){return S.openEditListDialog(e)},onClick:function(e){return S.selectList(e)}};var Oe=Object(l.b)((function(e){return{lists:e.lists.map((function(e,t){var n=e.id,o=e.name,a=e.items;return{id:n,name:o,comment:"".concat(a.length," items"),index:t}}))}}),xe)((function(e){return i.a.createElement(he,Object.assign({},e,{swipeRight:!1,actions:[[{label:"Edit",action:function(t){return e.onEdit(t)}}],[{label:"Delete",action:function(t){return e.onDelete(t)}}]]}))})),Le=n(52),ke=n.n(Le),Ie=n(75),Te=n(247),je=n(249),De=n(243),Se=n(250),we=n(242),Me=n(240),Ne=n(241),Re=n(239),Ae=function(e){var t=Object(l.c)();function n(n){var o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n?e.onClose(!0):e.onClose(!1),o?t(T.closeDialog()):e.onOpen()}return i.a.createElement("div",null,i.a.createElement(Se.a,{fullScreen:!0,open:e.isOpen,onEnter:function(){e.onOpen()},onClose:function(){return n(!1)}},i.a.createElement(Re.a,null,e.title),i.a.createElement(Me.a,null,i.a.createElement(Ne.a,null,e.description),e.children),i.a.createElement(we.a,null,void 0!==e.another&&i.a.createElement(De.a,{onClick:function(){return n(!0,!1)},color:"primary",disabled:!e.isValid},e.another),void 0!==e.another&&i.a.createElement("div",{style:{flex:"1 0 0"}}),void 0!==e.cancel&&i.a.createElement(De.a,{onClick:function(){return n(!1)},color:"primary"},e.cancel),i.a.createElement(De.a,{onClick:function(){return n(!0)},color:"primary",disabled:!e.isValid},e.ok))))},_e=n(244),Ue=/(.*) (\d+.*)/;function We(e){return null!==e}function Pe(e){return e.split("\n").map((function(e){return e.trim()})).filter((function(e){return e.length>0})).map((function(e){var t=e.match(Ue);if(!t)return null;var n=Object(d.a)(t,3);return{name:n[1],comment:n[2]}})).filter(We)}var Be=function(e){return e.trim().length>0},Ve=function(e){var t,n,o=Be(e.value),a=i.a.useState(o),r=Object(d.a)(a,2),c=r[0],l=r[1],s=i.a.useState(e.value),u=Object(d.a)(s,2),f=u[0],m=u[1],p=i.a.useState({includeClipboard:!1,items:[]}),g=Object(d.a)(p,2),v=g[0],b=g[1];function h(){return y.apply(this,arguments)}function y(){return(y=Object(Ie.a)(ke.a.mark((function e(){var t;return ke.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.clipboard.readText();case 3:return t=e.sent,e.abrupt("return",Pe(t));case 7:return e.prev=7,e.t0=e.catch(0),console.log("Error importing from clipboard: ".concat(e.t0)),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function E(){return(E=Object(Ie.a)(ke.a.mark((function e(t){var n,o;return ke.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.target.checked)){e.next=7;break}return e.next=4,h();case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0=[];case 8:o=e.t0,b({includeClipboard:n,items:o});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=v.includeClipboard?"".concat(v.items.length," "):" ",x="Include ".concat(C,"items from clipboard"),O=void 0!==(null===(t=navigator)||void 0===t||null===(n=t.clipboard)||void 0===n?void 0:n.readText),L=i.a.useRef(null);return i.a.createElement(Ae,{isOpen:e.isOpen,isValid:c,onOpen:function(){m(e.value),l(Be(e.value)),b({includeClipboard:!1,items:[]}),L.current&&L.current.focus()},onClose:function(t){t&&e.onCommit({name:f,items:v.includeClipboard?v.items:[]})},title:e.title,description:e.descriptionText,ok:e.okText,another:e.anotherText,cancel:e.cancelText},i.a.createElement(Te.a,{error:!c,inputRef:function(e){L.current=e},margin:"dense",label:"List name",type:"text",onChange:function(e){var t=e.target.value;m(t),l(Be(t))},fullWidth:!0,value:f,InputLabelProps:{shrink:!0}}),!e.isEdit&&O&&i.a.createElement(_e.a,{control:i.a.createElement(je.a,{checked:v.includeClipboard,onChange:function(e){return E.apply(this,arguments)},color:"primary"}),label:x}))},Fe=Object(l.b)((function(e){var t;return{isOpen:(null===(t=e.dialogState)||void 0===t?void 0:t.type)===o.ADD_LIST}}),{onCommit:function(e){return e&&S.addList(e)}})((function(e){return i.a.createElement(Ve,Object.assign({value:"",title:"Create List",okText:"Add",cancelText:"Cancel",anotherText:"Add Another",isEdit:!1,descriptionText:"Pick the name for your new list."},e))})),Je=n(108),He=n(252),qe=n(107);function Ge(e){return i.a.createElement("div",{style:{marginTop:10}},i.a.createElement(He.a,{shrink:!0,htmlFor:"age-native-label-placeholder"},e.title),i.a.createElement(qe.a,{fullWidth:!0,value:e.value,onChange:function(t){return e.onChange(t.target.selectedIndex)}},e.choices.map((function(e,t){return i.a.createElement("option",{value:e,key:t},e)}))))}var Xe=function(e){var t=e.name;e.category;return{name:t.trim().length>0,comment:!0,category:!0}},Ye=function(e){var t=Xe(e.value),n=i.a.useState(t),o=Object(d.a)(n,2),a=o[0],r=o[1],c=i.a.useState(Object(s.a)({},e.value,{category:e.value.category||""})),l=Object(d.a)(c,2),u=l[0],f=l[1],m=i.a.useState(e.selectedList),p=Object(d.a)(m,2),g=p[0],v=p[1],b=i.a.useState(!1),h=Object(d.a)(b,2),y=h[0],E=h[1];var C=i.a.useRef(null),x=e.value.category,O=e.categories.length<=0,L=void 0!==x&&e.categories.indexOf(x)<0,k=y||O||L;return i.a.createElement("div",null,i.a.createElement(Ae,{isOpen:e.isOpen,description:e.descriptionText,isValid:a.name&&a.comment&&a.category,onOpen:function(){f(Object(s.a)({},e.value,{category:e.value.category||""})),r(Xe(e.value)),v(e.selectedList),E(!1),C.current&&C.current.focus()},onClose:function(t){if(t){var n=u.category;e.onCommit(Object(s.a)({},u,{category:n.trim().length<=0?void 0:n,listIndex:g}))}},title:e.title,ok:e.okText,another:e.anotherText,cancel:e.cancelText},i.a.createElement(Te.a,{error:!a.name,inputRef:function(e){C.current=e},margin:"dense",label:"Item name",placeholder:"What's the name of the item?",type:"text",onChange:function(e){var t=Object(s.a)({},u,{name:e.target.value});f(t),r(Xe(t))},fullWidth:!0,value:u.name,InputLabelProps:{shrink:!0}}),i.a.createElement(Te.a,{error:!a.comment,margin:"dense",label:"Comment (optional)",placeholder:"How many of this item?",value:u.comment,onChange:function(e){var t=Object(s.a)({},u,{comment:e.target.value});f(t),r(Xe(t))},type:"text",fullWidth:!0,InputLabelProps:{shrink:!0}}),!k&&i.a.createElement(Ge,{title:"Category",value:u.category,onChange:function(t){return function(t){if(0===t){var n=Object(s.a)({},u,{category:""});return f(n),void r(Xe(n))}if(t-1<e.categories.length){var o=Object(s.a)({},u,{category:e.categories[t-1]});return f(o),void r(Xe(o))}var a=Object(s.a)({},u,{category:""});f(a),r(Xe(a)),E(!0)}(t)},choices:["[None]"].concat(Object(Je.a)(e.categories),["[Add Category]"])}),k&&i.a.createElement(Te.a,{autoFocus:!0,error:!a.category,margin:"dense",label:"Category (optional)",placeholder:"Which category?",value:u.category,onChange:function(e){var t=Object(s.a)({},u,{category:e.target.value});f(t),r(Xe(t))},type:"text",fullWidth:!0,InputLabelProps:{shrink:!0}}),e.listOptions&&void 0!==g&&i.a.createElement(Ge,{title:"List (optional, moves item to another list)",value:e.listOptions[g],onChange:function(e){v(e)},choices:e.listOptions})))},Ze={name:"",comment:"",category:void 0};function $e(e){var t=new Set;return e.lists.forEach((function(e){return e.items.filter((function(e){return void 0!==e.category})).forEach((function(e){return t.add(e.category)}))})),Array.from(t)}var ze=Object(l.b)((function(e){var t;return{isOpen:(null===(t=e.dialogState)||void 0===t?void 0:t.type)===o.ADD_ITEM,categories:$e(e)}}),{onCommit:function(e){return e&&S.addItem(e)}})((function(e){return i.a.createElement(Ye,Object.assign({value:Ze,title:"Create Item",okText:"Add",cancelText:"Cancel",anotherText:"Add Another",descriptionText:"Pick the name for your new item."},e))})),Ke=Object(l.b)((function(e){var t=e.dialogState;return(null===t||void 0===t?void 0:t.type)===o.EDIT_LIST&&t.index>=0&&t.index<e.lists.length?{isOpen:!0,initialValue:e.lists[t.index].name}:{isOpen:!1,initialValue:""}}),{onCommit:function(e){return S.editList(e)}})((function(e){return i.a.createElement(Ve,Object.assign({value:e.initialValue,title:"Edit List",okText:"Update",cancelText:"Cancel",isEdit:!0,descriptionText:"Pick the name for your list."},e,{onCommit:function(t){return t&&e.onCommit(t.name)}}))})),Qe=Object(l.b)((function(e){var t=e.dialogState,n=e.selectedList;return void 0!==n&&n>=0&&n<e.lists.length&&(null===t||void 0===t?void 0:t.type)===o.EDIT_ITEM&&t.index>=0&&t.index<e.lists[n].items.length?{isOpen:!0,initialValue:e.lists[n].items[t.index],listOptions:e.lists.map((function(e){return e.name})),selectedList:n,categories:$e(e)}:{isOpen:!1,initialValue:{name:"",comment:""},categories:[],listOptions:void 0,selectedList:void 0}}),{onCommit:function(e){return e&&S.editItem(e)}})((function(e){return i.a.createElement(Ye,Object.assign({value:e.initialValue,title:"Edit List",okText:"Update",cancelText:"Cancel",descriptionText:"Pick the name for your list."},e))})),et=["#70d470","#42af44","#ffdb66","#0076ff","#d5ff00","#ff937e","#007db5","#ff00f6","#90fb92","#7979fa","#f16d6d","#40f7f7","#ffa6fe","#6a826c","#ff029d","#fe8900","#7a4782","#7e2dd2","#85a900","#ff0056","#a42400","#00ae7e","#683d3b","#bdd393","#00b917","#9e008e","#c28c9f","#ff74a3","#01d0ff","#004754","#e56ffe","#788231","#0e4ca1","#91d0cb","#be9970","#968ae8","#bb8800","#deff74","#00ffc6","#ffe502","#620e00","#008f9c","#98ff52","#7544b1","#b500ff","#00ff78","#ff6e41","#005f39","#6b6882","#5fad4e","#a75740","#a5ffd2","#ffb167","#009bff","#e85ebe"],tt=function(e,t){return Number(!e.enabled)-Number(!t.enabled)},nt=function(e,t){var n=tt(e,t);if(0!==n)return n;var o=e.category,a=t.category;return void 0===o||void 0===a?Number(void 0===o)-Number(void 0===a):o.localeCompare(a)};var ot={onDelete:function(e){return S.deleteItem(e)},onEdit:function(e){return S.openEditItemDialog(e)},onClick:function(e){return S.toggleItem(e)}};var at=Object(l.b)((function(e){var t=e.selectedList,n="categories"===e.sortMode?nt:tt;if(void 0!==t){var o="color"===e.categoryMode?function(e){var t=$e(e);return function(e){if(void 0!==e){var n=t.indexOf(e);return-1!==n&&n<et.length?et[n]:void 0}}}(e):function(){};return{lists:e.lists[t].items.map((function(e,t){return Object(s.a)({},e,{index:t})})).sort(n),categoryMode:e.categoryMode,extractColor:o}}return{lists:[]}}),ot)((function(e){return i.a.createElement(he,Object.assign({},e,{swipeRight:!0,actions:[[{label:"Edit",action:function(t){return e.onEdit(t)}}],[{label:"Delete",action:function(t){return e.onDelete(t)}}]]}))}));var it=Object(l.b)((function(e){return{isListSelected:void 0!==e.selectedList}}))((function(e){var t=[];return e.isListSelected?(t.push(i.a.createElement(at,{key:"item-list"})),t.push(i.a.createElement(ze,{key:"item-add-dialog"})),t.push(i.a.createElement(Qe,{key:"item-edit-dialog"}))):(t.push(i.a.createElement(Oe,{key:"list"})),t.push(i.a.createElement(Fe,{key:"list-add-dialog"})),t.push(i.a.createElement(Ke,{key:"list-edit-dialog"}))),i.a.createElement("div",{style:{flex:1,display:"flex",flexFlow:"column",height:"100%"}},i.a.createElement(oe,null),i.a.createElement(y,null),t)})),rt=n(245),ct=n(246),lt=Object(rt.a)({props:{MuiButtonBase:{disableRipple:!0}},transitions:{create:function(){return"none"}}}),st=Object(w.a)((function(e){return Object(M.a)({app:{minHeight:"100vh",height:"100%",display:"flex",overflow:"hidden",flexDirection:"column"}})})),ut=function(){var e=st();return i.a.createElement(ct.a,{theme:lt},i.a.createElement("div",{className:e.app},i.a.createElement(it,null)))},dt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ft(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(l.a,{store:D},i.a.createElement(ut,null))),document.getElementById("root")),function(){var e=new URL(window.location.href).searchParams.get("debug");return Boolean(e)}()?(console.log("No service worker enabled."),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))):function(e){if("serviceWorker"in navigator){if(new URL("/shopper",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/shopper","/service-worker.js");dt?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ft(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ft(t,e)}))}}()}},[[124,1,2]]]);
//# sourceMappingURL=main.ece8cd74.chunk.js.map