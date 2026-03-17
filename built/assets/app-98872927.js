import{a as k,f as le,C as y,V as R,m as be,v as pe,P as re,l as w,b as we,c as ve,d as _e,e as xe,g as ye,h as Ce,i as Se,j as Re,k as ke,n as Fe,o as qe,p as Pe,q as $e,r as Ae,s as Ve,t as je,u as Ee,w as Oe,x as Ie,y as Ne,z as Le,A as Qe,B as Be,D as Te,E as De,F as Me,G as He}from"./vendor-e47612d7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const V={sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1400px)"},ce=typeof window<"u"&&typeof window.matchMedia=="function";let j=null;class Ue{constructor(){if(this._subscribers=new Set,this._mqls={},this.hiddenBreakpoints=[],this._onChange=this._onChange.bind(this),this._compute(),ce)for(const e in V){const t=window.matchMedia(V[e]);this._mqls[e]=t,t.addEventListener?t.addEventListener("change",this._onChange):t.addListener(this._onChange)}}_onChange(){this._compute()}_compute(){const e=[];if(ce)for(const t in V)window.matchMedia(V[t]).matches||e.push(t);e.push("all"),this.hiddenBreakpoints=e,this._subscribers.forEach(t=>t(e))}subscribe(e){this._subscribers.add(e),e(this.hiddenBreakpoints)}unsubscribe(e){this._subscribers.delete(e),this._subscribers.size===0&&(this._destroy(),j=null)}_destroy(){for(const e in this._mqls){const t=this._mqls[e];t.removeEventListener?t.removeEventListener("change",this._onChange):t.removeListener(this._onChange)}this._mqls={},this._subscribers.clear()}}function fe(){return j||(j=new Ue),j}function p(n,e,t,s,i,a,o,r){var l=typeof n=="function"?n.options:n;e&&(l.render=e,l.staticRenderFns=t,l._compiled=!0),s&&(l.functional=!0),a&&(l._scopeId="data-v-"+a);var c;if(o?(c=function(f){f=f||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!f&&typeof __VUE_SSR_CONTEXT__<"u"&&(f=__VUE_SSR_CONTEXT__),i&&i.call(this,f),f&&f._registeredComponents&&f._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=r?function(){i.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var d=l.render;l.render=function(_,x){return c.call(x),d(_,x)}}else{var h=l.beforeCreate;l.beforeCreate=h?[].concat(h,c):[c]}return{exports:n,options:l}}const Je={name:"SelectCheckbox",props:{value:{type:Boolean,default:!1},pretty:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},smooth:{type:Boolean,default:!1},partial:{type:Boolean,default:!1},showPartial:{type:Boolean,default:!1}},computed:{proxyValue:{get(){return this.value},set(n){this.$emit("input",n)}}}};var Ge=function(){var e=this,t=e._self._c;return t("span",{staticStyle:{display:"contents"}},[e.pretty?t("p-check",{staticClass:"p-icon",class:e.smooth?"p-smooth":"",attrs:{name:"check",disabled:e.disabled},on:{change:function(s){return e.$emit("change",s)}},model:{value:e.proxyValue,callback:function(s){e.proxyValue=s},expression:"proxyValue"}},[t("template",{slot:"extra"},[t("span",[e.proxyValue?t("font-awesome-icon",{staticClass:"text-success icon-check",attrs:{icon:"check"}}):e._e()],1),e.showPartial?t("span",[e.partial&&!e.proxyValue?t("font-awesome-icon",{staticClass:"text-success icon-check",attrs:{icon:"square"}}):e._e()],1):e._e()])],2):t("label",{staticClass:"mb-0 mt-0"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.proxyValue,expression:"proxyValue"}],attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:Array.isArray(e.proxyValue)?e._i(e.proxyValue,null)>-1:e.proxyValue},on:{change:[function(s){var i=e.proxyValue,a=s.target,o=!!a.checked;if(Array.isArray(i)){var r=null,l=e._i(i,r);a.checked?l<0&&(e.proxyValue=i.concat([r])):l>-1&&(e.proxyValue=i.slice(0,l).concat(i.slice(l+1)))}else e.proxyValue=o},function(s){return e.$emit("change",s)}]}})])],1)},ze=[],Ke=p(Je,Ge,ze,!1,null,null,null,null);const me=Ke.exports,We={name:"TableHeader",inject:["quintable"],components:{SelectCheckbox:me},methods:{isColumnVisible(n){return this.quintable.cellVisible[n]}}};var Ye=function(){var e=this,t=e._self._c;return e.quintable.configFinal.headlines.length?t("thead",[t("tr",{staticClass:"vue-quintable-header-row quintable--table-container--table--header-row"},[e.quintable.hasGeneratedRows&&!e.quintable.configFinal.hideRowToggle?t("th",{staticClass:"placeholder-th toggle-th toggle-cell quintable--table-container--table--header-row--placeholder-th"},[t("wbr")]):e._e(),e.quintable.configFinal.select&&e.quintable.configFinal.selectPosition==="pre"?t("th",{staticClass:"select-th pre quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--pre"},[e.quintable.configFinal.selectAll&&!e.quintable.noRows?t("select-checkbox",{attrs:{value:e.quintable.allSelectedProperty,pretty:e.quintable.configFinal.prettySelect,smooth:!0,"show-partial":!0,partial:e.quintable.someSelected},on:{input:function(s){e.quintable.allSelectedProperty=s},change:function(s){return e.quintable.checkAll()}}}):e._e()],1):e._e(),e._l(e.quintable.configFinal.headlines,function(s,i){return[e.isColumnVisible(i)?t("th",{key:"headline-"+i,class:e.quintable.headerClass[i],attrs:{title:e.quintable.configFinal.columns[i].title},on:{click:function(a){return a.stopPropagation(),e.quintable.setSortColumn(i)}}},[e.quintable.showHeadlines[i]?t("span",{staticClass:"headline quintable--table-container--table--header-row--th--headline",domProps:{innerHTML:e._s(s)}}):t("span",{staticClass:"headline quintable--table-container--table--header-row--th--headline"},[t("wbr")]),e.quintable.configFinal.sorts[i]?t("span",{staticClass:"sorting-icon ms-2 quintable--table-container--table--header-row--th--sorting-icon"},[e.quintable.currentSortIndexes[i]?e._e():t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort"}}),e.quintable.currentSortIndexes[i]&&e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down-alt"}}):e._e(),e.quintable.currentSortIndexes[i]&&!e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down"}}):e._e(),e.quintable.currentSortIndexes[i]?t("span",{staticClass:"ms-1 text-muted",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.quintable.removeSort(i)}}},[e.quintable.numberOfSorts>1?t("span",{staticClass:"badge bg-info text-white"},[e._v(" "+e._s(e.quintable.currentSortIndexes[i].order+1)+" ")]):t("small",[t("font-awesome-icon",{attrs:{icon:"times"}})],1)]):e._e()],1):e._e()]):e._e()]}),e.quintable.configFinal.select&&e.quintable.configFinal.selectPosition==="post"?t("th",{staticClass:"select-th post quintable--table-container--table--header-row--select-th quintable--table-container--table--header-row--select-th--post"},[e.quintable.configFinal.selectAll&&!e.quintable.noRows?t("select-checkbox",{attrs:{value:e.quintable.allSelectedProperty,pretty:e.quintable.configFinal.prettySelect,smooth:!0,"show-partial":!0,partial:e.quintable.someSelected},on:{input:function(s){e.quintable.allSelectedProperty=s},change:function(s){return e.quintable.checkAll()}}}):e._e()],1):e._e()],2)]):e._e()},Xe=[],Ze=p(We,Ye,Xe,!1,null,null,null,null);const et=Ze.exports,tt={name:"ExpandedRow",inject:["quintable"],components:{},props:{rIndex:{type:[Number,String],required:!0}},computed:{shouldRender(){return this.quintable.generatedUpdatedKey&&this.quintable.openRows[this.rIndex]&&this._hasKeys(this.quintable.generatedRows[this.rIndex])||this._hasKeys(this.quintable.stickyRows[this.rIndex])},showToggleCell(){return!this.quintable.configFinal.hideRowToggle&&this.quintable.generatedRows[this.rIndex]&&this._hasKeys(this.quintable.generatedRows[this.rIndex])},innerClasses(){const n=[];return this.quintable.hoveredRow===this.rIndex&&n.push(this.quintable.configFinal.hoverClass),this.quintable.activeRow===this.rIndex&&n.push(this.quintable.configFinal.activeClass),n},formattedGenerated(){const n=this.quintable.generatedRows[this.rIndex];if(!n)return{};const e={},t=this.quintable.configFinal.columns;for(let s in n)Object.prototype.hasOwnProperty.call(n,s)&&t[s]&&t[s].cellFormatter&&(e[s]=this.quintable.cellFormatters(s,n[s]));return e},formattedSticky(){const n=this.quintable.stickyRows[this.rIndex];if(!n)return{};const e={},t=this.quintable.configFinal.columns;for(let s in n)Object.prototype.hasOwnProperty.call(n,s)&&t[s]&&t[s].cellFormatter&&(e[s]=this.quintable.cellFormatters(s,n[s]));return e}},methods:{_hasKeys(n){if(!n)return!1;for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!0;return!1}}};var nt=function(){var e=this,t=e._self._c;return e.shouldRender?t("tr",{ref:"generated-row-highlighted-"+e.rIndex,staticClass:"generated-row quintable--table-container--table--tbody--generated-row",class:{"parent-row-expanded":e.quintable.openRows[e.rIndex],"parent-row-collapsed":e.quintable.hiddenColumns[e.rIndex]>0&&!e.quintable.openRows[e.rIndex]},on:{mouseenter:function(s){return e.quintable.onMouseenterRow(e.rIndex)},click:function(s){return e.quintable.onRowClick(s,e.rIndex)}}},[t("td",{staticClass:"ps-0 pe-0 pt-0",attrs:{colspan:e.quintable.configFinal.number+1}},[t("div",{class:e.innerClasses},[t("table",{staticClass:"mb-2 generated-table quintable--table-container--table--tbody--generated-row--generated-table"},[t("tbody",[e._l(e.quintable.generatedRows[e.rIndex],function(s,i){return[e.quintable.openRows[e.rIndex]?t("tr",{key:"vue-quintable-"+e.quintable.uuid+"-generated-row-cell-"+e.rIndex+"-"+i,staticClass:"generated-row-cell quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell",attrs:{id:"vue-quintable-"+e.quintable.uuid+"-generated-row-cell-"+e.rIndex+"-"+i}},[e.showToggleCell?t("td",{staticClass:"toggle-cell invisible"},[e.quintable.hiddenColumns[e.rIndex]>0?t("span",[e.quintable.openRows[e.rIndex]?t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.quintable.configFinal.expandedRowIcon}})],1):t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.quintable.configFinal.collapsedRowIcon}})],1)]):e._e()]):e._e(),e.quintable.showHeadlines[i]||e.quintable.configFinal.sorts[i]?t("td",{staticClass:"generated-cell-element generated-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-headline",class:e.quintable.configFinal.columnClasses[i],on:{click:function(a){return a.stopPropagation(),e.quintable.setSortColumn(i)}}},[e.quintable.showHeadlines[i]?t("strong",{domProps:{innerHTML:e._s(e.quintable.configFinal.headlines[i])}}):t("span",{staticClass:"headline"},[t("wbr")]),e.quintable.configFinal.sorts[i]?t("span",{directives:[{name:"show",rawName:"v-show",value:e.quintable.hoveredRow===e.rIndex,expression:"quintable.hoveredRow === rIndex"}],staticClass:"sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"},[e.quintable.currentSortIndexes[i]?e._e():t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort"}}),e.quintable.currentSortIndexes[i]&&e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down-alt"}}):e._e(),e.quintable.currentSortIndexes[i]&&!e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down"}}):e._e(),e.quintable.currentSortIndexes[i]?t("span",{staticClass:"ms-1 text-muted",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.quintable.removeSort(i)}}},[e.quintable.numberOfSorts>1?t("span",{staticClass:"badge bg-info text-white"},[e._v(" "+e._s(e.quintable.currentSortIndexes[i].order+1)+" ")]):t("small",[t("font-awesome-icon",{attrs:{icon:"times"}})],1)]):e._e()],1):e._e()]):e._e(),t("td",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"top",content:s.tooltip,trigger:s.tooltip?"hover":"manual"},expression:`{
                  placement: 'top',
                  content: cell.tooltip,
                  trigger: cell.tooltip ? 'hover' : 'manual',
                }`}],staticClass:"generated-cell-element generated-cell-element-content generated-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell-content",class:e.quintable.configFinal.columnClasses[i]+" "+e.quintable.cellClassesParsed[e.rIndex][i],attrs:{colspan:!e.quintable.showHeadlines[i]&&!e.quintable.configFinal.sorts[i]?2:1},on:{click:function(a){return e.quintable.onCellClick(a,s)}}},[e._t("generated-cell-complete",function(){return[e._t("generated-cell-content",function(){return[e.formattedGenerated[i]&&e.formattedGenerated[i].type==="html"?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-html",domProps:{innerHTML:e._s(e.formattedGenerated[i].value)}}):e.formattedGenerated[i]?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--formatted-value"},[e._v(" "+e._s(e.formattedGenerated[i].value)+" ")]):s.html!=null&&String(s.html)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--html",domProps:{innerHTML:e._s(s.html)}}):s.component?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--component"},[t(s.component.name,e._b({tag:"component",on:{action:e.quintable.handleComponentEvent}},"component",s.component.props,!1))],1):s.text!=null&&String(s.text)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--generated-cell--cell-inner--text"},[e._v(" "+e._s(s.text)+" ")]):e._e()]},{cell:s})]},{cell:s})],2)]):e._e()]}),e._l(e.quintable.stickyRows[e.rIndex],function(s,i){return t("tr",{key:"vue-quintable-"+e.quintable.uuid+"-sticky-row-cell-"+e.rIndex+"-"+i,staticClass:"sticky-row-cell quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell",attrs:{id:"vue-quintable-"+e.quintable.uuid+"-sticky-row-cell-"+e.rIndex+"-"+i}},[e.showToggleCell?t("td",{staticClass:"toggle-cell invisible"},[e.quintable.hiddenColumns[e.rIndex]>0?t("span",[e.quintable.openRows[e.rIndex]?t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.quintable.configFinal.expandedRowIcon}})],1):t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.quintable.configFinal.collapsedRowIcon}})],1)]):e._e()]):e._e(),e.quintable.showHeadlines[i]||e.quintable.configFinal.sorts[i]?t("td",{staticClass:"generated-cell-element sticky-cell-headline quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-headline",class:e.quintable.configFinal.columnClasses[i],on:{click:function(a){return a.stopPropagation(),e.quintable.setSortColumn(i)}}},[e.quintable.showHeadlines[i]?t("strong",{domProps:{innerHTML:e._s(e.quintable.configFinal.headlines[i])}}):t("span",{staticClass:"headline"},[t("wbr")]),e.quintable.configFinal.sorts[i]?t("span",{directives:[{name:"show",rawName:"v-show",value:e.quintable.hoveredRow===e.rIndex,expression:"quintable.hoveredRow === rIndex"}],staticClass:"sorting-icon ms-2 cursor-pointer quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sorting-icon"},[e.quintable.currentSortIndexes[i]?e._e():t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort"}}),e.quintable.currentSortIndexes[i]&&e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down-alt"}}):e._e(),e.quintable.currentSortIndexes[i]&&!e.quintable.currentSortIndexes[i].asc?t("font-awesome-icon",{staticClass:"text-primary",attrs:{icon:"sort-amount-down"}}):e._e(),e.quintable.currentSortIndexes[i]?t("span",{staticClass:"ms-1 text-muted",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.quintable.removeSort(i)}}},[e.quintable.numberOfSorts>1?t("span",{staticClass:"badge bg-info text-white"},[e._v(" "+e._s(e.quintable.currentSortIndexes[i].order+1)+" ")]):t("small",[t("font-awesome-icon",{attrs:{icon:"times"}})],1)]):e._e()],1):e._e()]):e._e(),t("td",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"top",content:s.tooltip,trigger:s.tooltip?"hover":"manual"},expression:`{
                placement: 'top',
                content: cell.tooltip,
                trigger: cell.tooltip ? 'hover' : 'manual',
              }`}],staticClass:"generated-cell-element generated-cell-element-content sticky-cell-content quintable--table-container--table--tbody--generated-row--generated-table--generated-row-cell--sticky-cell-content",class:e.quintable.configFinal.columnClasses[i]+" "+e.quintable.cellClassesParsed[e.rIndex][i],attrs:{colspan:!e.quintable.showHeadlines[i]&&!e.quintable.configFinal.sorts[i]?2:1},on:{click:function(a){return e.quintable.onCellClick(a,s)}}},[e._t("sticky-cell-complete",function(){return[e._t("sticky-cell-content",function(){return[e.formattedSticky[i]&&e.formattedSticky[i].type==="html"?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-html",domProps:{innerHTML:e._s(e.formattedSticky[i].value)}}):e.formattedSticky[i]?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--formatted-value"},[e._v(" "+e._s(e.formattedSticky[i].value)+" ")]):s.html!=null&&String(s.html)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--html",domProps:{innerHTML:e._s(s.html)}}):s.component?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--component"},[t(s.component.name,e._b({tag:"component",on:{action:e.quintable.handleComponentEvent}},"component",s.component.props,!1))],1):s.text!=null&&String(s.text)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--generated-row--generated-table--sticky-row-cell--sticky-cell--cell-inner--text"},[e._v(" "+e._s(s.text)+" ")]):e._e()]},{cell:s})]},{cell:s})],2)])})],2)])])])]):e._e()},st=[],it=p(tt,nt,st,!1,null,null,null,null);const at=it.exports,ot={name:"PaginationNav",props:{pages:{type:Number,required:!0},currentPage:{type:Number,required:!0},pageRange:{type:Number,required:!0},visiblePages:{type:Array,required:!0},hasVisibleRows:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}}};var lt=function(){var e=this,t=e._self._c;return e.pages>1?t("nav",{staticClass:"d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--nav",class:{"me-3":e.hasVisibleRows,disabled:e.disabled}},[t("ul",{staticClass:"pagination mb-0 quintable--table-footer-container--pagination-wrapper--pagination-container--nav--pagination"},[e.pages>e.pageRange?t("li",{staticClass:"page-item",class:{disabled:e.currentPage<=1},on:{click:function(s){return e.$emit("goto","first")}}},[t("span",{staticClass:"page-link"},[t("font-awesome-icon",{attrs:{icon:"angle-double-left"}})],1)]):e._e(),t("li",{staticClass:"page-item",class:{disabled:e.currentPage<=1},on:{click:function(s){return e.$emit("goto","prev")}}},[t("span",{staticClass:"page-link"},[t("font-awesome-icon",{attrs:{icon:"angle-left"}})],1)]),e.pageRange<e.pages&&e.visiblePages[0]>1?t("li",{staticClass:"page-item",on:{click:function(s){return e.$emit("offset",-1)}}},[t("span",{staticClass:"page-link"},[e._v(" ... ")])]):e._e(),e._l(e.visiblePages,function(s){return t("li",{key:"pagination-item-"+s,staticClass:"page-item",class:{active:s===e.currentPage},on:{click:function(i){return e.$emit("goto",s)}}},[t("span",{staticClass:"page-link"},[e._v(" "+e._s(s)+" ")])])}),e.pageRange<e.pages&&e.visiblePages[e.visiblePages.length-1]<e.pages?t("li",{staticClass:"page-item",on:{click:function(s){return e.$emit("offset",1)}}},[t("span",{staticClass:"page-link"},[e._v(" ... ")])]):e._e(),t("li",{staticClass:"page-item",class:{disabled:e.pages===e.currentPage},on:{click:function(s){return e.$emit("goto","next")}}},[t("span",{staticClass:"page-link"},[t("font-awesome-icon",{attrs:{icon:"angle-right"}})],1)]),e.pages>e.pageRange?t("li",{staticClass:"page-item",class:{disabled:e.pages===e.currentPage},on:{click:function(s){return e.$emit("goto","last")}}},[t("span",{staticClass:"page-link"},[t("font-awesome-icon",{attrs:{icon:"angle-double-right"}})],1)]):e._e()],2)]):e._e()},rt=[],ct=p(ot,lt,rt,!1,null,null,null,null);const dt=ct.exports,ut={name:"PaginationFooter",inject:["quintable"],components:{PaginationNav:dt}};var ht=function(){var e=this,t=e._self._c;return t("div",{staticClass:"clearfix quintable--table-footer-container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-4 quintable--table-footer-container--sort-container"},[e.quintable.configFinal.multiSortSelect||e.quintable.configFinal.pageSortSelect?t("div",{staticClass:"pb-lg-0 pb-3 float-start quintable--table-footer-container--sort-container--sort-select"},[e.quintable.configFinal.multiSortSelect?t("span",{class:e.quintable.configFinal.pageSort?"me-3":""},[t("p-check",{staticClass:"p-switch quintable--table-footer-container--sort-container--sort-select--multi-sort-select",attrs:{value:"true"},model:{value:e.quintable.multiSort,callback:function(s){e.$set(e.quintable,"multiSort",s)},expression:"quintable.multiSort"}},[e._v(e._s(e.quintable.configFinal.multiSortPlaceholder))])],1):e._e(),e.quintable.configFinal.pageSortSelect?t("p-check",{staticClass:"p-switch quintable--table-footer-container--sort-container--sort-select--page-sort-select",attrs:{value:"true"},model:{value:e.quintable.pageSort,callback:function(s){e.$set(e.quintable,"pageSort",s)},expression:"quintable.pageSort"}},[e._v(e._s(e.quintable.configFinal.pageSortPlaceholder))]):e._e()],1):e._e()]),t("div",{staticClass:"col-lg-8 quintable--table-footer-container--pagination-wrapper"},[e.quintable.configFinal&&e.quintable.configFinal.pagination?t("div",{staticClass:"float-lg-end me-3 pagination-container quintable--table-footer-container--pagination-wrapper--pagination-container"},[e.quintable.configFinal.rowsSelect?t("div",{staticClass:"mb-2 d-inline-block me-3 align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select"},[t("span",{staticClass:"d-inline-block align-middle me-2 quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--placeholder",domProps:{innerHTML:e._s(e.quintable.configFinal.rowsPlaceholder)}}),t("v-select",{staticClass:"d-inline-block align-middle quintable--table-footer-container--pagination-wrapper--pagination-container--rows-select--select",attrs:{options:e.quintable.paginationOptionsFilled,clearable:!1},model:{value:e.quintable.currentRowsPerPageProperty,callback:function(s){e.$set(e.quintable,"currentRowsPerPageProperty",s)},expression:"quintable.currentRowsPerPageProperty"}})],1):e._e(),e.quintable.configFinal&&e.quintable.configFinal.pagination&&e.quintable.pages>1?t("pagination-nav",{attrs:{pages:e.quintable.pages,"current-page":e.quintable.currentPage,"page-range":e.quintable.pageRange,"visible-pages":e.quintable.visiblePages,"has-visible-rows":!!e.quintable.numberOfVisibleRows,disabled:e.quintable.ajaxLoading},on:{goto:function(s){return e.quintable.gotoPage(s)},offset:function(s){return e.quintable.updatePageOffset(s)}}}):e._e(),e.quintable.numberOfVisibleRows?t("span",{staticClass:"d-inline-block align-middle mb-2 quintable--table-footer-container--pagination-wrapper--pagination-container--visible-rows"},[e._v(e._s(e.quintable.firstVisibleRow)+"-"+e._s(e.quintable.lastVisibleRow)+" "+e._s(e.quintable.configFinal.numberOfVisibleRowsFillerWord)+" "+e._s(e.quintable.numberOfVisibleRows))]):e._e()],1):e._e()])])])},pt=[],ft=p(ut,ht,pt,!1,null,null,null,null);const mt=ft.exports,gt={name:"SearchBar",inject:["quintable"]};var bt=function(){var e=this,t=e._self._c;return e.quintable.configFinal.search?t("div",{staticClass:"mb-3 quintable--search-container",class:e.quintable.configFinal.searchContainerClass},[e._t("before-search"),e._t("search",function(){return[t("div",{staticClass:"quintable--search-container--input-container",class:e.quintable.configFinal.searchClass},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.quintable.query,expression:"quintable.query"}],staticClass:"form-control",attrs:{type:"search",placeholder:e.quintable.configFinal.searchPlaceholder},domProps:{value:e.quintable.query},on:{input:function(s){s.target.composing||e.$set(e.quintable,"query",s.target.value)}}})])]},{value:e.quintable.query,loading:e.quintable.loading,setSearchQuery:e.quintable.setSearchQuery,placeholder:e.quintable.configFinal.searchPlaceholder,searchClass:e.quintable.configFinal.searchClass}),e._t("after-search")],2):e._e()},wt=[],vt=p(gt,bt,wt,!1,null,null,null,null);const _t=vt.exports;let q=null;function xt(){if(q!==null)return q;try{const n="test-local-storage";localStorage.setItem(n,n),localStorage.removeItem(n),q=!0}catch{q=!1}return q}const yt={computed:{DEBUG(){return this.verbose},axiosFinal(){return this.axios?this.axios:this.$globalVueQuintableaxios?this.$globalVueQuintableaxios:k},configFinal(){if(!this.config)return{};let n=!1;if(this.config.pagination===!0)n=25;else if(this.config.pagination){let u=0;for(;this.paginationOptions[u]<=this.config.pagination&&u<this.paginationOptions.length;)u++;n=this.paginationOptions[Math.min(u-1,this.paginationOptions.length-1)]}let e="of";this.config.numberOfVisibleRowsFillerWord&&(e=this.config.numberOfVisibleRowsFillerWord);let t=!1;this.config.select&&(t=!0);let s=250;this.config.ajaxRequestDelay&&(s=this.config.ajaxRequestDelay);let i="bg-muted";this.config.hoverClass===!1?i="":this.config.hoverClass&&this.config.hoverClass!==!0&&(i=this.config.hoverClass);let a="bg-muted";this.config.activeClass===!1?a="":this.config.activeClass&&this.config.activeClass!==!0&&(a=this.config.activeClass);let o=!1;this.config.multiSort&&(o=!0);let r=!1;this.config.pageSort&&(r=!0);let l=!1;this.config.multiSortSelect&&(l=!0);let c=!1;this.config.pageSortSelect&&(c=!0);let d=!1;this.config.ajaxUrl&&(d=this.config.ajaxUrl);let h="post";["pre","post"].includes(this.config.selectPosition)&&(h=this.config.selectPosition);let f=!1;this.config.expandedAll&&(f=!0);let _=!1;this.config.useFuzzySearch&&(_=!0);let x=!1;this.config.prettySelect&&(x=!0);let m=!1;this.config.rowsSelect&&(m=!0);let C=!1;this.config.keepSelect&&(C=!0);let S=!1;this.config.disallowAllOption&&(S=!0);let g=!1;this.config.hideEmptyColumns&&(g=!0);let b="none";["none","active","all"].includes(this.config.ignoreSortEmptyColumns)&&(b=this.config.ignoreSortEmptyColumns);let B=!1;this.config.search&&(B=!0);let T=1;this.config.searchLength&&(T=this.config.searchLength);let D="Search...";this.config.searchPlaceholder&&(D=this.config.searchPlaceholder);let M="Multiple sort";this.config.multiSortPlaceholder&&(M=this.config.multiSortPlaceholder);let H="Page sort";this.config.pageSortPlaceholder&&(H=this.config.pageSortPlaceholder);let U="AND";["AND","OR"].includes(this.config.filterRelation)&&(U=this.config.filterRelation);let J="AND";["AND","OR"].includes(this.config.filterGroupRelation)&&(J=this.config.filterGroupRelation);let G="Rows per page:";this.config.rowsPlaceholder&&(G=this.config.rowsPlaceholder);let z="No rows...";this.config.emptyPlaceholder&&(z=this.config.emptyPlaceholder);let K=!1;this.config.selectAll&&(K=!0);let P=!1;this.config.selectAllRows&&(P=!0),d&&P&&(console.warn("Option selectAllRows was deactivated automatically because ajaxUrl is set!"),P=!1);let $=!1;this.config.storeState&&($=!0),!this.identifier&&this.config.storeState&&(console.warn("Option storeState was deactivated automatically because table identifier is not set!"),$=!1),xt()||(console.warn("Option storeState was deactivated automatically because local storage is not available!"),$=!1);let W=!1;this.config.defaultSelected&&(W=!0);let Y=!1;this.config.hideRowToggle&&(Y=!0);let X=!1;this.config.enableRowTabIndex&&(X=!0);let Z="chevron-up";this.config.expandedRowIcon&&typeof this.config.expandedRowIcon=="string"&&["chevron-up","minus","caret-up","eye-slash"].includes(this.config.expandedRowIcon.toLowerCase())&&(Z=this.config.expandedRowIcon.toLowerCase());let ee="chevron-down";this.config.collapsedRowIcon&&typeof this.config.collapsedRowIcon=="string"&&["chevron-down","plus","caret-down","eye"].includes(this.config.collapsedRowIcon.toLowerCase())&&(ee=this.config.collapsedRowIcon.toLowerCase());let te=5;this.config.pageRange&&(te=this.config.pageRange);let ne="col-12";this.config.searchClass&&(ne=this.config.searchClass);let se="row";this.config.searchContainerClass&&(se=this.config.searchContainerClass);let ie="GET";this.config.requestMethod&&typeof this.config.requestMethod=="string"&&["POST","GET"].includes(this.config.requestMethod.toUpperCase())&&(ie=this.config.requestMethod.toUpperCase());let ae=0,E=[],O=[],I=[],A=[],N=[],L=[],F=[],Q=[],oe=null;if(this.config.columns){ae=this.config.columns.length;for(let u=0;u<this.config.columns.length;u++)F[u]="",this.config.columns[u]&&this.config.columns[u].headline?(E[u]=this.config.columns[u].headline,F[u]+=this.config.columns[u].headline.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/\s+/g,"-").toLowerCase()):E[u]="",F[u]+=" column-"+(u+1),this.config.columns[u].classes&&(F[u]+=" "+this.config.columns[u].classes),this.config.columns[u]&&this.config.columns[u].breakpoint?O[u]=this.config.columns[u].breakpoint:O[u]="",this.config.columns[u]&&this.config.columns[u].sort?this.config.columns[u].firstSortDirection&&typeof this.config.columns[u].firstSortDirection=="string"&&["DESC","ASC"].includes(this.config.columns[u].firstSortDirection.toUpperCase())?A[u]=this.config.columns[u].firstSortDirection.toUpperCase():A[u]=!0:A[u]=!1,this.config.columns[u]&&this.config.columns[u].ignoreEmpty?Q[u]=!0:Q[u]=!1,this.config.columns[u]&&this.config.columns[u].sticky?N[u]=!0:N[u]=!1,this.config.columns[u]&&this.config.columns[u].hidden?I[u]=!0:I[u]=!1,this.config.columns[u]&&this.config.columns[u].align?L[u]=this.config.columns[u].align:L[u]=!1;oe=this.config.columns}return Object.freeze({headlines:E,columnClasses:F,sorts:A,pageSort:r,multiSort:o,pageSortSelect:c,multiSortSelect:l,filterGroupRelation:J,filterRelation:U,rowsSelect:m,keepSelect:C,disallowAllOption:S,defaultSelected:W,searchLength:T,search:B,searchPlaceholder:D,useFuzzySearch:_,ajaxUrl:d,pageSortPlaceholder:H,multiSortPlaceholder:M,rowsPlaceholder:G,emptyPlaceholder:z,stickyCols:N,alignments:L,breakpoints:O,hiddenCols:I,ignoreEmpty:Q,hideEmptyColumns:g,ignoreSortEmptyColumns:b,pagination:n,numberOfVisibleRowsFillerWord:e,select:t,selectAll:K,selectAllRows:P,hoverClass:i,activeClass:a,expandedAll:f,pageRange:te,prettySelect:x,number:ae,columns:oe,hideRowToggle:Y,enableRowTabIndex:X,expandedRowIcon:Z,collapsedRowIcon:ee,selectPosition:h,searchClass:ne,searchContainerClass:se,requestMethod:ie,storeState:$,ajaxRequestDelay:s})}}},Ct={data(){return{sortedIndexes:{},currentSortIndexes:{}}},computed:{numberOfSorts(){return Object.keys(this.currentSortIndexes).length},sortingColumns(){let n={};for(let e in this.currentSortIndexes)Object.prototype.hasOwnProperty.call(this.currentSortIndexes,e)&&(n[e]=this.configFinal.columns[e]);return n}},watch:{pageSort(){this.currentSortIndexes={},this.resetSorts(),this.recomputeEssentials()},customMultiSort(n){if(!n&&Object.keys(this.currentSortIndexes).length>1){let e,t;for(let s in this.currentSortIndexes)if(Object.prototype.hasOwnProperty.call(this.currentSortIndexes,s)&&this.currentSortIndexes[s].order===0){e=this.currentSortIndexes[s],t=s;break}this.currentSortIndexes={},this.$set(this.currentSortIndexes,t,e),this.sort()}},sortOrder:{immediate:!0,handler(){this.currentSortIndexes={};for(let n=0;n<this.sortOrder.length;n++)typeof this.sortOrder[n]=="object"?this.setSortColumn(this.sortOrder[n].index,this.sortOrder[n].asc):typeof this.sortOrder[n]=="number"&&this.setSortColumn(this.sortOrder[n])}}},methods:{removeSort(n){for(let e in this.currentSortIndexes)if(Object.prototype.hasOwnProperty.call(this.currentSortIndexes,e)){let t=this.currentSortIndexes[e];t.order>this.currentSortIndexes[n].order&&t.order--,this.$set(this.currentSortIndexes,e,t)}this.$delete(this.currentSortIndexes,n),this.numberOfSorts===0?(this.resetSorts(),this.currentPage!==1?this.currentPage=1:this.recomputeEssentials(),this.configFinal.ajaxUrl&&!this.pageSort&&this.loadViaAjax(!0,!0,"SORT")):this.sort()},resetSorts(){for(let n=0;n<this.rowsFinal.length;n++){const e=n.toString();this.$set(this.sortedIndexes,e,n)}},setSortColumn(n,e){const t=parseInt(n),s=n.toString();if(!this.configFinal.sorts[t])return;let i;this.currentSortIndexes[s]?(i=this.currentSortIndexes[s],i.asc=!i.asc):(this.multiSort||(this.currentSortIndexes={}),i={headline:this.configFinal.headlines[t],index:t,asc:this.configFinal.sorts[t]===!0?!0:this.configFinal.sorts[t]==="ASC",order:this.numberOfSorts}),typeof e<"u"&&(i.asc=e),this.$set(this.currentSortIndexes,s,i),this.configFinal.storeState&&localStorage.setItem(`vue-quintable-${this.identifier}-sort-indexes`,JSON.stringify(this.currentSortIndexes)),this.$emit("update:sort",this.currentSortIndexes,"update:sort"),this.sort()},sort(n=!1){if(this.configFinal.ajaxUrl&&!this.pageSort){this.loadViaAjax(!n,!n,"SORT");return}let e=this.rowsFinal.slice(),t=[],s=[],i={};if(this.pageSort){if(s=this.visibleRowIndexes.slice(),!s.length){const h=this.configFinal.pagination?this.configFinal.pagination:this.rowsFinal.length;for(let f=0;f<h;f++)s.push(f)}let d=0;for(let h=0;h<e.length;h++)e[h].index=h,s.indexOf(h)!==-1&&(d<this.configFinal.pagination&&t.push(e[h]),d++);if(Object.keys(this.sortedIndexes).length)i=Object.assign({},this.sortedIndexes);else for(let h=0;h<e.length;h++)this.$set(i,h.toString(),h)}else{t=this.rowsFinal.slice();for(let d=0;d<t.length;d++)t[d].index=d}let a=[];for(let d in this.currentSortIndexes)if(Object.prototype.hasOwnProperty.call(this.currentSortIndexes,d)){let h=this.currentSortIndexes[d];h.index=d,a.push(h)}a.sort(function(d,h){return d.order-h.order});let o=(d,h,f,_)=>{_=_||0;let x=f[_],m=x.index,C=d.cells?d.cells:d,S=h.cells?h.cells:h,g=typeof C[m].sortValue<"u"&&C[m].sortValue!==null?C[m].sortValue:C[m].html?C[m].html:C[m].text;typeof C[m].computeSortValue=="function"&&(g=C[m].computeSortValue(this.currentSortIndexes));let b=typeof S[m].sortValue<"u"&&S[m].sortValue!==null?S[m].sortValue:S[m].html?S[m].html:S[m].text;return typeof S[m].computeSortValue=="function"&&(b=S[m].computeSortValue(this.currentSortIndexes)),typeof g=="string"&&(g=g.toLowerCase()),typeof b=="string"&&(b=b.toLowerCase()),isNaN(g)?(typeof g=="string"&&g.match(/^-?\d+$/)||typeof g=="string"&&g.match(/^\d+\.\d+$/))&&(g=parseFloat(g)):g=parseFloat(g),isNaN(b)?(typeof b=="string"&&b.match(/^-?\d+$/)||typeof b=="string"&&b.match(/^\d+\.\d+$/))&&(b=parseFloat(b)):b=parseFloat(b),x.asc?g>b?1:g<b?-1:f[_+1]?o(d,h,f,_+1):1:g<b?1:g>b?-1:f[_+1]?o(d,h,f,_+1):-1};t.sort(function(d,h){return o(d,h,a)});const r=[];let l=0,c=0;for(let d=0;d<e.length;d++){const h=d.toString();this.pageSort&&s.indexOf(d)!==-1?(l<this.configFinal.pagination?(r.push(t[c]),c++):r.push(e[i[h]]),l++):this.pageSort?r.push(e[i[h]]):r.push(t[d])}for(let d=0;d<r.length;d++){const h=d.toString();this.$set(this.sortedIndexes,h,parseInt(r[d].index))}!this.pageSort&&!n&&(this.currentPage=1),!this.configFinal.selectAllRows&&!this.pageSort&&!n&&!this.configFinal.keepSelect&&this.resetSelect("sort method"),this.recomputeEssentials()}}},ge=Object.freeze({equal:(n,e)=>e===n,greater:(n,e)=>e>n,less:(n,e)=>e<n,greaterEqual:(n,e)=>e>=n,lessEqual:(n,e)=>e<=n,contains:(n,e)=>!Array.isArray(e)&&typeof e!="string"?!1:e.indexOf(n)!==-1,notContains:(n,e)=>!Array.isArray(e)&&typeof e!="string"?!1:e.indexOf(n)===-1,startsWith:(n,e)=>typeof e!="string"?!1:e.indexOf(n)===0,endsWitch:(n,e)=>typeof e!="string"?!1:e.indexOf(n,globalThis.length-n.length)!==-1,matches(n,e){return!(n instanceof RegExp)||typeof e!="string"?!1:n.test(e)}}),St=Object.keys(ge),Rt={data(){return{defaultOperator:"equal",operatorFunctions:ge}},computed:{operators(){return St},filterActive(){return this.filtersFinal&&Object.keys(this.filtersFinal).length},filtersFinal(){return!this.configFinal.storeState||!this.storedState.filters?this.filters:this.storedState.filters},filteredRows(){if(this.configFinal.ajaxUrl)return this.rowsFinal;let n=new Array(this.rowsFinal.length).fill(!0);if(!this.configFinal.search&&!this.filterActive||!this.filterActive&&this.configFinal.search&&this.query.length<this.configFinal.searchLength)return n;const e=(this.query+"").toLowerCase();for(let t=0;t<this.rowsFinal.length;t++){let s=this.rowsFinal[t].cells?this.rowsFinal[t].cells:this.rowsFinal[t],i=!1,a=!1;if(this.configFinal.search&&this.query.length>=this.configFinal.searchLength){for(let o=0;o<s.length;o++){let r=s[o],l=r.html?r.html:r.text;if(l){const c=(l+"").toLowerCase();if(this.configFinal.useFuzzySearch&&le(c,e).score>6){i=!0;break}if(c.indexOf(e)!==-1){i=!0;break}}}if(!i&&this.rowsFinal[t].keywords)for(let o=0;o<this.rowsFinal[t].keywords.length;o++){const r=(this.rowsFinal[t].keywords[o]+"").toLowerCase();if(this.configFinal.useFuzzySearch&&le(r,e).score>6){i=!0;break}if(r.indexOf(e)!==-1){i=!0;break}}a=!0}if(this.filterActive&&!this.rowsFinal[t].filters)i=!1;else if((a&&i||!a)&&this.filterActive){if(this.filterGroups.length)i=this.doFiltering(this.rowsFinal[t].filters);else{let o={items:[],relation:this.configFinal.filterRelation};const r=Object.keys(this.filtersFinal);for(let l=0;l<r.length;l++)o.items.push({name:r[l]});i=this.doFilteringForGroup(this.filtersFinal,this.rowsFinal[t].filters,o),this.DEBUG&&console.log("FILTER GROUPS CALCULATED",this.filterGroups)}this.DEBUG&&(console.log(`
`),console.log("ROW "+t,i,this.rowsFinal[t].filters),console.log(`
`))}n[t]=i}return n}},watch:{filters:{handler(){if(this.configFinal.ajaxUrl){const n=!(this.configFinal.storeState&&this.storedState.filters);this.pageSort=!1,this.loadViaAjax(n,n,"FILTERS")}this.pageSort&&(this.currentSortIndexes={},this.resetSorts(),this.recomputeEssentials()),this.configFinal.storeState&&(this.$delete(this.storedState,"filters"),localStorage.setItem(`vue-quintable-${this.identifier}-filters`,JSON.stringify(this.filtersFinal)))},deep:!0},filtersFinal(n){this.$emit("update:filters",n,"update:filters")},filteredRows:{handler(n,e){if(this.configFinal.ajaxUrl||n===e)return;if(e&&n.length===e.length){let i=!0;for(let a=0;a<n.length;a++)if(n[a]!==e[a]){i=!1;break}if(i)return}(this.activeRow!==null&&this._visibleRowIndexMap[this.activeRow]!==void 0?this._visibleRowIndexMap[this.activeRow]:-1)<0&&(this.activeRow=null),this.currentPage!==1?this.currentPage=1:this.configFinal.keepSelect||this.resetSelect("filteredRows watcher");const s=[];for(let i=0;i<n.length;i++){const a=i.toString();n[i]&&s.push(this.rowsFinal[this.sortedIndexes[a]?this.sortedIndexes[a]:i])}this.$emit("filtered:rows",s,"filtered:rows")},immediate:!0}},methods:{doFiltering(n){let e=[];for(let t=0;t<this.filterGroups.length;t++)e.push(this.doFilteringForGroup(this.filtersFinal,n,this.filterGroups[t])),this.DEBUG&&t<this.filterGroups.length-1&&console.log(this.configFinal.filterGroupRelation);return this.DEBUG&&console.log("RESULTS FOR GROUPS:",e,this.configFinal.filterGroupRelation),this.configFinal.filterGroupRelation==="AND"?e.indexOf(!1)===-1:this.configFinal.filterGroupRelation==="OR"?e.indexOf(!0)!==-1:!0},doFilteringForGroup(n,e,t,s=0){let i="   ";for(let o=0;o<s;o++)i+="   ";if(this.DEBUG){if(t.items){let o=i,r=t.items.slice(),l=function(c,d){return c.name===void 0?1:d.name===void 0?-1:0};r=r.sort(l);for(let c=0;c<r.length;c++)r[c].name&&(o+=r[c].name,c<r.length-1&&(o+=" "+t.relation+" "));console.log(o)}console.log(i,"GROUP:",t)}let a=!1;if(t.relation==="AND"){for(let o in n)if(Object.prototype.hasOwnProperty.call(n,o)){if(this.filterGroups.length&&!this.findInFilterGroups(o,this.filterGroups))continue;let r=!0;for(let l=0;l<t.items.length;l++){let c=t.items[l];if(c.name&&e[c.name]===void 0){r=!1;break}}if(r)for(let l=0;l<t.items.length;l++){let c=t.items[l];if(a=!0,c.items&&(a=this.doFilteringForGroup(n,e,c,s+1)),!a)break;if(typeof n[c.name]>"u")continue;let d=typeof n[c.name]=="object"&&n[c.name]!==null&&n[c.name].operator&&this.operators.includes(n[c.name].operator)?n[c.name].operator:this.defaultOperator,h=this.getFilterValues(n[c.name]);const f=typeof n[c.name].compare=="function"?n[c.name].compare:this.operatorFunctions[d];for(let _=0;_<h.length;_++)if(!f(h[_],e[c.name])){a=!1;break}if(!a)break}}return a}else if(t.relation==="OR"||t.items){for(let o in n)if(Object.prototype.hasOwnProperty.call(n,o)){if(this.filterGroups.length&&!this.findInFilterGroups(o,this.filterGroups))continue;for(let r=0;r<t.items.length;r++){let l=t.items[r];if(l.items&&(a=this.doFilteringForGroup(n,e,l,s+1),a))break;if(typeof n[l.name]>"u")continue;let c=typeof n[l.name]=="object"&&n[l.name]!==null&&n[l.name].operator&&this.operators.includes(n[l.name].operator)?n[l.name].operator:this.defaultOperator,d=this.getFilterValues(n[l.name]);const h=typeof n[l.name].compare=="function"?n[l.name].compare:this.operatorFunctions[c];for(let f=0;f<d.length;f++)if(h(d[f],e[l.name])){a=!0;break}if(a)break}}return a}else return!0},getFilterValues(n){return n instanceof RegExp||typeof n!="object"||n===null?[n]:Array.isArray(n)?n:this.getFilterValues(n.values)},findInFilterGroups(n,e,t=0){if(!e)return!1;let s=!1;for(let i=0;i<e.length;i++){let a=e[i];if(a.items&&(s=this.findInFilterGroups(n,a.items,t+1),s))break;if(a.name===n){s=!0;break}}return s}}},kt={data(){return{fetching:!1,ajaxRows:[],ajaxPages:0,ajaxAll:0,cancelSource:null,lastQuery:"",queryAjaxTimeout:null}},computed:{ajaxLoading(){return this.loading||this.fetching}},watch:{updated(n){this.configFinal.ajaxUrl&&(n&&n.clear?this.loadViaAjax(!0,!0,"UPDATED"):n&&this.loadViaAjax(!1,!0,"UPDATED"))},loading(){this.loaderHeight=this.$refs["height-wrapper"]?this.$refs["height-wrapper"].clientHeight:0}},methods:{loadViaAjax(n=!1,e=!0,t=null){this.DEBUG&&console.log("CALLED FROM:",t);let s=this.query;if(s&&s.length<this.configFinal.searchLength&&(this.lastQuery.length<s.length||this.lastQuery.length<this.configFinal.searchLength))return;if(!s&&this.lastQuery){const o=this.lastQuery;if(this.lastQuery="",o.length<this.configFinal.searchLength)return}else s&&s.length<this.configFinal.searchLength&&(s="");this.cancelSource&&this.cancelSource.cancel("Operation canceled by the user."),this.clearLists(e),this.ajaxRows=[],n&&(this.currentPage=1,this.resetSelect("loadViaAjax method")),this.loaderHeight=this.$refs["height-wrapper"]?this.$refs["height-wrapper"].clientHeight:0,this.fetching=!0;let i={search:s,filters:this.filtersFinal,perPage:this.currentRowsPerPage,page:this.currentPage,hiddenColumns:this.configFinal.hiddenCols,sort:this.numberOfSorts>0?{indexes:this.currentSortIndexes,columns:this.sortingColumns}:null};this.cancelSource=this.axiosFinal.CancelToken.source();const a={"Content-Type":"application/json"};this.axiosFinal.request(this.configFinal.ajaxUrl,{method:this.configFinal.requestMethod,params:this.configFinal.requestMethod==="GET"?i:null,data:this.configFinal.requestMethod==="POST"?i:null,cancelToken:this.cancelSource.token,headers:a}).then(o=>{if(!o.data.rows||typeof o.data.rows.length>"u")throw"Response data has to contain rows property. Please see Readme.md for details";if(typeof o.data.all>"u")throw"Response data has to contain all property. Please see Readme.md for details";this.ajaxAll=o.data.all,this.ajaxPages=Math.max(1,Math.ceil(o.data.all/this.currentRowsPerPage)),this.$emit("ajax:rows",{rows:o.data.rows,old:JSON.parse(JSON.stringify(this.ajaxRows)),all:this.ajaxAll},"ajax:rows"),o.data.all&&(this.ajaxRows=o.data.rows,this.initLists()),this.fetching=!1}).catch(o=>{this.axiosFinal.isCancel(o)?console.log("Request canceled",o.message):(this.fetching=!1,console.error(o),this.$emit("ajax:error",o,"ajax:error"))})}}},Ft=Object.freeze([1,2,3,4,5,6,7,8,9,10,15,20,25,30,50,100]),qt={data(){return{currentPage:1,paginationOptions:Ft,customRowsPerPage:null,pageOffset:0}},computed:{currentRowsPerPageProperty:{get(){return this.customRowsPerPage?this.customRowsPerPage:this.currentRowsPerPage},set(n){this.customRowsPerPage=n}},currentRowsPerPage(){return this.customRowsPerPage?this.customRowsPerPage:this.configFinal.pagination?this.configFinal.pagination:"All"},paginationOptionsFilled(){return(this.configFinal.disallowAllOption?[]:["All"]).concat(this.paginationOptions)},pageRange(){return Math.min(this.configFinal.pageRange,this.pages)},pages(){return this.ajaxPages?this.ajaxPages:!this.currentRowsPerPage||this.currentRowsPerPage==="All"?1:Math.max(1,Math.ceil(this.numberOfVisibleRows/this.currentRowsPerPage))},numberOfVisibleRows(){if(this.configFinal.ajaxUrl)return this.ajaxAll;let n=0;for(let e=0;e<this.filteredRows.length;e++)this.filteredRows[e]&&n++;return n},visiblePages(){let n=[],e=0;if(this.pages<this.pageRange||this.currentPage===1)e=1;else if(this.currentPage===this.pages)e=this.currentPage-(this.pageRange-1);else{let t;this.pageRange%2===0?t=this.pageRange/2:(t=(this.pageRange-1)/2,this.currentPage+t>this.pages&&t++),e=this.currentPage-t}e=Math.max(e+this.pageOffset,1);for(let t=0;t<this.pageRange&&!(t+e>this.pages);t++)n.push(t+e);return n},noRows(){return!this.numberOfVisibleRows},firstVisibleRow(){return this.currentRowsPerPage==="All"||this.pages===1?1:this.currentPage*this.currentRowsPerPage-this.currentRowsPerPage+1},lastVisibleRow(){return this.currentRowsPerPage==="All"||this.pages===1?this.numberOfVisibleRows:Math.min(this.firstVisibleRow+this.currentRowsPerPage-1,this.numberOfVisibleRows)}},watch:{currentRowsPerPage(n){this.$emit("update:rows-per-page",n,"update:rows-per-page");const e=!(this.configFinal.storeState&&this.storedState["rows-per-page"]);if(this.configFinal.storeState&&(this.$delete(this.storedState,"rows-per-page"),localStorage.setItem(`vue-quintable-${this.identifier}-rows-per-page`,this.currentRowsPerPage)),this.configFinal.ajaxUrl){this.loadViaAjax(e,e,"PAGE_ROWS");return}this.currentPage!==1?this.currentPage=1:this.configFinal.selectAllRows||this.resetSelect("currentRowsPerPage watcher")},currentPage(n){this.pageOffset=0,this.activeRow=null,this.$emit("update:page",n,"update:page");const e=!(this.configFinal.storeState&&this.storedState["current-page"]);if(this.configFinal.storeState&&(this.$delete(this.storedState,"current-page"),localStorage.setItem(`vue-quintable-${this.identifier}-current-page`,this.currentPage)),this.configFinal.ajaxUrl){this.resetSelect("currentPage watcher ajax"),this.loadViaAjax(!1,e,"PAGE");return}this.configFinal.selectAllRows||this.resetSelect("currentPage watcher"),this.pageSort&&(this.currentSortIndexes={},this.resetSorts()),this.recomputeEssentials()}},methods:{gotoPage(n){n==="prev"?this.currentPage-1>0&&this.currentPage--:n==="next"?this.currentPage+1<=this.pages&&this.currentPage++:n==="first"?this.currentPage=1:n==="last"?this.currentPage=this.pages:this.currentPage=n},updatePageOffset(n){let e=this.pageOffset+this.pageRange*n;if(n>0){let t=Math.min(e,this.pages-this.pageRange);this.pageOffset=Math.min(t,this.pages-this.currentPage)}else n<0?this.pageOffset=Math.max(e,-(this.pages-this.pageRange)):this.pageOffset=0}}},Pt={data(){return{allSelectedCustom:null,selected:{}}},computed:{allSelectedProperty:{get(){return this.allSelectedCustom===null?this.configFinal.defaultSelected:this.allSelectedCustom},set(n){this.allSelectedCustom=n}},someSelected(){return Object.values(this.selected).some(n=>n)}},watch:{preSelectedRows(n){if(n){for(let e=0;e<this.rowsFinal.length;e++)this.$set(this.selected,e,!1);if(n&&n.length){let e=0;const t=this.configFinal.selectAllRows?this.rowsFinal.map((s,i)=>i):this.visibleRowIndexes;for(let s=0;s<n.length;s++){const i=n[s].key,a=n[s].value;for(let o=0;o<t.length;o++){const r=t[o];!this.rowsFinal[r].disableSelect&&this.rowsFinal[r][i]===a&&(this.$set(this.selected,r,!0),e++)}}if(this.configFinal.selectAllRows){let s=0;for(let i=0;i<this.rowsFinal.length;i++)this.rowsFinal[i].disableSelect||s++;this.allSelectedCustom=e&&e===s}else{let s=0;for(let i=0;i<this.rowsFinal.length;i++)!this.rowsFinal[i].disableSelect&&this.visibleRows[this.sortedIndexes[i]]&&s++;this.allSelectedCustom=e&&e===s}}else this.allSelectedCustom=!1}},selected:{handler(n){let e=[];for(let t in this.sortedIndexes)if(Object.prototype.hasOwnProperty.call(this.sortedIndexes,t)&&n[this.sortedIndexes[t]]){const s=this.rowsFinal[this.sortedIndexes[t]];s&&!s.disableSelect&&e.push(s)}this.configFinal.storeState&&localStorage.setItem(`vue-quintable-${this.identifier}-selected-rows`,JSON.stringify(n)),this.$emit("input",e),this.$emit("update:selected-rows",e,"update:selected-rows")},deep:!0}},methods:{checkAll(n=!1){let e=this.allSelectedProperty;n&&(e=!0);let t=0;for(let s in this.sortedIndexes)Object.prototype.hasOwnProperty.call(this.sortedIndexes,s)&&(s=parseInt(s),!this.rowsFinal[this.sortedIndexes[s]].disableSelect&&(!this.configFinal.selectAllRows&&this.visibleRows[this.sortedIndexes[s]]||this.configFinal.selectAllRows&&this.filteredRows[this.sortedIndexes[s]])?(this.$set(this.selected,this.sortedIndexes[s],e),t++):this.$set(this.selected,this.sortedIndexes[s],!1));if(e)if(this.configFinal.selectAllRows){let s=0;for(let i=0;i<this.rowsFinal.length;i++)this.rowsFinal[i].disableSelect||s++;this.allSelectedCustom=t&&t===s}else{let s=0;for(let i=0;i<this.rowsFinal.length;i++)!this.rowsFinal[i].disableSelect&&this.visibleRows[this.sortedIndexes[i]]&&s++;this.allSelectedCustom=t&&t===s}},checkListener(n,e){let t=!0;if(this.configFinal.selectAllRows){for(let s=0;s<this.rowsFinal.length;s++)if(!(s===e?!!n:!!(this.selected[s]||this.rowsFinal[s]&&this.rowsFinal[s].disableSelect))){t=!1;break}}else for(let s=0;s<this.visibleRowIndexes.length;s++){const i=this.visibleRowIndexes[s];if(!(i===e?!!n:!!(this.selected[i]||this.rowsFinal[i]&&this.rowsFinal[i].disableSelect))){t=!1;break}}this.allSelectedProperty=t},resetSelect(n){this.DEBUG&&console.log("CALLED FROM:",n),this.allSelectedProperty=!1;for(let e=0;e<this.rowsFinal.length;e++)this.$set(this.selected,e,!1)},checkStoredSelectedRows(n=!1){if(this.storedState["pre-selected-rows"],this.storedState["selected-rows"]){this.selected=JSON.parse(JSON.stringify(this.storedState["selected-rows"]));const e=Object.values(this.selected).filter(t=>t).length;if(this.configFinal.selectAllRows)this.allSelectedCustom=e&&e===this.rowsFinal.length;else{let t=0;for(let s=0;s<this.visibleRows.length;s++)this.visibleRows[s]&&t++;this.allSelectedCustom=e&&e===t}n&&this.$delete(this.storedState,"selected-rows")}}}},$t={methods:{handleComponentEvent(n){this.$emit("component:event",n,"component:event")},hasSomeParentTheClass(n,e){return n instanceof HTMLElement&&n.classList.contains(e)?!0:n instanceof Element&&n.parentNode&&this.hasSomeParentTheClass(n.parentNode,e)},hasSomeParentTagName(n,e){return n instanceof HTMLElement&&n.tagName.toLowerCase()===e.toLowerCase()?!0:n instanceof Element&&n.parentNode&&this.hasSomeParentTagName(n.parentNode,e)},onRowAuxClick(n,e){if(n.button===1){const t=parseInt(e);this.$emit("auxclick:row",this.rowsFinal[t],"auxclick:row",n.target,n,t)}},onRowMousedown(n){n.which===2&&n.preventDefault()},onRowClick(n,e){if((n.target||{}).type==="checkbox")return;if(this.hasSomeParentTheClass(n.target,"generated-table")&&!this.nested)return;let t=this.hasSomeParentTagName(n.target,"a"),s=this.hasSomeParentTheClass(n.target,"prevent-toggle");const i=e.toString(),a=parseInt(e);this.hiddenColumns[i]&&!t&&!s&&(this.openRows[i]?(this.$set(this.openRows,i,!1),this.$emit("expand:row",this.rowsFinal[this.sortedIndexes[i]],"collapse:row",this.sortedIndexes[i])):(this.$set(this.openRows,i,!0),this.$emit("expand:row",this.rowsFinal[this.sortedIndexes[i]],"expand:row",this.sortedIndexes[i])),this.generatedUpdatedKey=Date.now()),this.configFinal.enableRowTabIndex&&(this.activeRow===a?this.activeRow=null:this.activeRow=a),this.$emit("click:row",this.rowsFinal[a],"click:row",n.target,n,a)},onCellClick(n,e){this.$emit("click:cell",e,"click:cell",n.target,n)},onCellAuxClick(n,e){n.button===1&&this.$emit("auxclick:cell",e,"auxclick:cell",n.target,n)},onCellMousedown(n){n.which===2&&n.preventDefault()},onMouseenterRow(n){this.hoveredRow!==n&&(this.hoveredRow=n)},onMouseleaveTable(){const n=this.configFinal.hoverClass;n&&this._lastHoveredEl&&(this._lastHoveredEl.classList.remove(n),this._lastHoveredEl=null),this.hoveredRow=null}}},At={data(){return{hiddenBreakpoints:[],initBreakpoints:!0,breakpointTimeout:null}},watch:{hiddenBreakpoints(n){this.initBreakpoints||this.$emit("change:breakpoints",n,"change:breakpoints"),this.initBreakpoints=!1}},methods:{_onBreakpointChange(n){(this.hiddenBreakpoints.length!==n.length||this.hiddenBreakpoints.some((e,t)=>e!==n[t]))&&(this.hiddenBreakpoints=n)},elementVisible(n){return n?window.getComputedStyle(n).display!=="none":!1},generateHiddenBreakpoints(){const n=fe();this._onBreakpointChange(n.hiddenBreakpoints)},breakpointListener(){clearTimeout(this.breakpointTimeout),this.breakpointTimeout=setTimeout(()=>{this.generateHiddenBreakpoints()},200)}}};let Vt=0;const jt={name:"VueQuintable",mixins:[yt,Ct,Rt,kt,qt,Pt,$t,At],components:{TableHeader:et,SelectCheckbox:me,ExpandedRow:at,PaginationFooter:mt,SearchBar:_t},provide(){return{quintable:this}},props:{rows:{type:Array,default(){return[]}},config:{type:Object,default(){return{}}},dynamicConfig:{type:Boolean,default:!1},value:{type:Array,default(){return[]}},selectedRows:{type:Array,default(){return[]}},preSelectedRows:{type:Array,default(){return[]}},loading:{type:Boolean,default:!1},filters:{type:Object,default(){return{}}},filterGroups:{type:Array,default(){return[]}},verbose:{type:Boolean,default:!1},nested:{type:Boolean,default:!1},tableClasses:{type:String,default:""},sortOrder:{type:Array,default(){return[]}},updated:{type:[Boolean,Object,Date],default:!1},axios:{type:Function},identifier:{type:String,default:null},initialSearchTerm:{type:String,default:null}},data(){return{essentialsKey:Date.now(),generatedUpdatedKey:Date.now(),hoveredRow:null,openRows:{},query:"",customMultiSort:null,customPageSort:null,uuid:"qt-"+ ++Vt+"-"+Date.now(),loaderHeight:0,lastSearchQueryUpdated:null,storedState:{},activeRow:null}},computed:{visibleRows(){if(!this.configFinal.ajaxUrl&&this.currentRowsPerPage!=="All"){let n=new Array(this.rowsFinal.length).fill(!1),e={};for(let a in this.sortedIndexes)Object.prototype.hasOwnProperty.call(this.sortedIndexes,a)&&this.filteredRows[this.sortedIndexes[a]]&&(e[a]=this.sortedIndexes[a]);let t=this.currentPage*this.currentRowsPerPage,s=t-this.currentRowsPerPage,i=0;for(let a in e)Object.prototype.hasOwnProperty.call(e,a)&&(a=parseInt(a),i<t&&i>=s&&(n[e[a]]=!0),i++);return n}else return this.filteredRows},visibleRowIndexes(){let n=[];if(this.configFinal.ajaxUrl&&!this.pageSort)for(let e=0;e<this.rowsFinal.length;e++)n.push(e);else for(let e in this.sortedIndexes)Object.prototype.hasOwnProperty.call(this.sortedIndexes,e)&&this.visibleRows[this.sortedIndexes[e]]&&n.push(this.sortedIndexes[e]);return n},_hiddenBreakpointSet(){return Object.freeze(new Set(this.hiddenBreakpoints))},_colBreakpointMatch(){const n=this._hiddenBreakpointSet;return Object.freeze(this.configFinal.columns.map(e=>{if(!e||!e.breakpoint)return!1;const t=e.breakpoint.toLocaleLowerCase();return t==="all"||n.has(t)}))},_colEmptyCache(){const n={};for(let e=0;e<this.configFinal.number;e++)n[e]=this.isColEmpty(e);return Object.freeze(n)},_colHideCache(){const n={};for(let e=0;e<this.configFinal.columns.length;e++)n[e]=this.configFinal.hiddenCols[e]||!this.configFinal.ignoreEmpty[e]&&this.configFinal.hideEmptyColumns&&this._colEmptyCache[e]||this.emptyColumns[e];return Object.freeze(n)},cellVisible(){return Object.freeze(this.configFinal.columns.map((n,e)=>!(this.configFinal.hiddenCols[e]||this.emptyColumns[e]||!n||this._colBreakpointMatch[e]||this.configFinal.stickyCols[e])))},generatedRows(){let n={};if(this.generatedUpdatedKey){const e=this._colBreakpointMatch,t=this._colHideCache,s=this.configFinal.hideEmptyColumns,i=this.visibleRowIndexes;for(let a=0;a<i.length;a++){const o=i[a];let r=this.rowsFinal[o].cells?this.rowsFinal[o].cells:this.rowsFinal[o],l={};for(let c=0;c<this.configFinal.columns.length;c++){if(!e[c])continue;let d=this.configFinal.columns[c];!(t[c]||s&&!this.configFinal.ignoreEmpty[c]&&this.isColEmpty(c,o))&&!d.sticky&&!d.alwaysExpanded&&(l[c]=r[c])}n[o]=l}}return n},stickyRows(){let n={};const e=this._colBreakpointMatch,t=this._colHideCache,s=this.configFinal.hideEmptyColumns,i=this.visibleRowIndexes;for(let a=0;a<i.length;a++){const o=i[a];let r=this.rowsFinal[o].cells?this.rowsFinal[o].cells:this.rowsFinal[o],l={};for(let c=0;c<this.configFinal.columns.length;c++){let d=this.configFinal.columns[c];const h=t[c]||s&&!this.configFinal.ignoreEmpty[c]&&this.isColEmpty(c,o);(!h&&d.sticky||!h&&d.alwaysExpanded&&e[c])&&(l[c]=r[c])}n[o]=l}return n},pageSort:{get(){return this.customPageSort===null?this.configFinal.pageSort:this.customPageSort},set(n){this.customPageSort=n}},multiSort:{get(){return this.customMultiSort===null?this.configFinal.multiSort:this.customMultiSort},set(n){this.customMultiSort=n}},hasGeneratedRows(){const n=this._colBreakpointMatch,e=this._colHideCache;for(let t=0;t<this.configFinal.columns.length;t++)if(n[t]&&!e[t]){const s=this.configFinal.columns[t];if(!s.sticky&&!s.alwaysExpanded)return!0}return!1},cellClassesParsed(){let n={};const e=this.visibleRowIndexes.length>0?this.visibleRowIndexes:Object.keys(this.rowsFinal).map(Number);for(let t=0;t<e.length;t++){const s=e[t];if(!this.rowsFinal[s])continue;n[s]=[];let i=this.rowsFinal[s].align,a=this.rowsFinal[s].cells?this.rowsFinal[s].cells:this.rowsFinal[s];for(let o=0;o<a.length;o++){let r=[],l=this.configFinal.alignments[o];if((a[o].align||i||l)&&(a[o].align?r.push("text-"+a[o].align):i?r.push("text-"+i):r.push("text-"+l)),a[o].classes){let c=a[o].classes.split(" ");Array.prototype.push.apply(r,c)}n[s].push(r.join(" "))}}return n},hiddenColumns(){const n=this._colBreakpointMatch,e=this._colHideCache;let t=!1;for(let i=0;i<this.configFinal.columns.length;i++)if(n[i]&&!e[i]){t=!0;break}const s={};if(t)for(let i=0;i<this.visibleRowIndexes.length;i++)s[this.visibleRowIndexes[i]]=1;else if(this.configFinal.hideEmptyColumns)for(let i=0;i<this.visibleRowIndexes.length;i++){let a=0;const o=this.visibleRowIndexes[i];for(let r=0;r<this.configFinal.columns.length;r++){if(!n[r])continue;if(!(e[r]||!this.configFinal.ignoreEmpty[r]&&this.isColEmpty(r,o))){a++;break}}s[o]=a}else for(let i=0;i<this.visibleRowIndexes.length;i++)s[this.visibleRowIndexes[i]]=0;return s},rowsFinal(){return this.configFinal.ajaxUrl?this.ajaxRows:this.rows?this.rows:[]},headerClass(){let n=[];for(let e=0;e<this.configFinal.number;e++){let t=[];this.configFinal.alignments[e]&&t.push("text-"+this.configFinal.alignments[e]),this.configFinal.sorts[e]&&(t.push("sort-header"),this.currentSortIndexes[e]&&t.push("active")),n.push(t.join(" ")+"  quintable--table-container--table--header-row--th "+this.configFinal.columnClasses[e])}return Object.freeze(n)},showHeadlines(){const n=this._hiddenBreakpointSet;let e=[];for(let t=0;t<this.configFinal.number;t++){const s=this.configFinal.columns[t];this.configFinal.headlines[t]&&(!s.showHeadlineBreakpoint||s.showHeadlineBreakpoint&&n.has(s.showHeadlineBreakpoint))&&(!s.hideHeadlineBreakpoint||s.hideHeadlineBreakpoint&&!n.has(s.hideHeadlineBreakpoint))?e.push(!0):e.push(!1)}return Object.freeze(e)},emptyColumns(){const n={},e=this._colEmptyCache,t=this.configFinal.ignoreSortEmptyColumns;for(let s=0;s<this.configFinal.number;s++){const i=this.configFinal.ignoreEmpty[s],a=this.configFinal.sorts[s];!this.configFinal.hideEmptyColumns||i||t==="none"&&a||t==="active"&&Object.prototype.hasOwnProperty.call(this.currentSortIndexes,s)?n[s]=!1:n[s]=e[s]}return n},rowClasses(){const n={};for(let e=0;e<this.visibleRowIndexes.length;e++){const t=this.visibleRowIndexes[e],s=[];this.rowsFinal[t].classes&&s.push(this.rowsFinal[t].classes),this.openRows[t]&&s.push("row-expanded"),this.hiddenColumns[t]>0&&!this.openRows[t]&&s.push("row-collapsed"),n[t]=s.join(" ")}return n},_fmtCells(){const n={},e=this.configFinal.columns;for(let t=0;t<this.visibleRowIndexes.length;t++){const s=this.visibleRowIndexes[t],i=this.rowsFinal[s];if(!i)continue;const a=i.cells?i.cells:i;let o=!1;const r={};for(let l=0;l<a.length;l++)e[l]&&e[l].cellFormatter&&(r[l]=this.cellFormatters(l,a[l]),o=!0);o&&(n[s]=r)}return n},_renderRows(){const n={},e=this.configFinal.columnClasses,t=this.cellVisible,s=this.cellClassesParsed,i=this._fmtCells,a=this.uuid;for(let o=0;o<this.visibleRowIndexes.length;o++){const r=this.visibleRowIndexes[o],l=this.rowsFinal[r];if(!l)continue;const c=l.cells?l.cells:l,d="vue-quintable-"+a+"-cell-"+r+"-",h=s[r],f=i[r],_=[];for(let x=0;x<c.length;x++){const m=c[x];_.push(Object.freeze({cell:m,cls:(h&&h[x]||"")+" "+(e[x]||""),vis:!!(t[x]&&m),fmt:f&&f[x]||null,key:d+x}))}n[r]=Object.freeze(_)}return n},_visibleRowIndexMap(){const n={};for(let e=0;e<this.visibleRowIndexes.length;e++)n[this.visibleRowIndexes[e]]=e;return n}},watch:{rowsFinal:{handler(n){if(this.verbose&&n&&n.length)for(let e=0;e<n.length;e++){let t=n[e].cells?n[e].cells:n[e];t.length!==this.config.columns.length&&console.error(`Column count on row index ${e} doesn't fit for column config! expected: ${this.config.columns.length}, got: ${t.length}`+(this.configFinal.ajaxUrl?` | URL: ${this.configFinal.ajaxUrl}`:"")+(this.identifier?` | IDENTIFIER: ${this.identifier}`:""),n[e])}},immediate:!0},hoveredRow(n){n!==null&&this.$emit("hover:row",this.rowsFinal[n],"hover:row")},query(n,e){if(this.lastQuery=e,this.configFinal.ajaxUrl){this.pageSort=!1;const t=!(this.configFinal.storeState&&this.storedState.query);clearTimeout(this.queryAjaxTimeout),this.queryAjaxTimeout=setTimeout(()=>{this.loadViaAjax(t,t,"QUERY")},this.configFinal.ajaxRequestDelay)}n.length>=this.configFinal.searchLength&&this.lastSearchQueryUpdated!==n?(this.$emit("update:search",n,"update:search"),this.lastSearchQueryUpdated=n):this.lastSearchQueryUpdated!==null&&(this.lastSearchQueryUpdated=null,this.$emit("update:search",null,"update:search")),this.pageSort&&(this.currentSortIndexes={},this.resetSorts(),this.recomputeEssentials()),this.configFinal.storeState&&(this.$delete(this.storedState,"query"),localStorage.setItem(`vue-quintable-${this.identifier}-query`,this.query))},rows(){this.clearLists(),this.initLists(),this.activeRow=null,this.$nextTick(()=>{this.recomputeEssentials(),this.configFinal.defaultSelected&&(this.allSelectedCustom=null,this.checkAll(!0))})},config(n){if(typeof n!="object")throw"config must be an object";this.dynamicConfig||(this.initLists(),this.activeRow=null,this.configFinal.ajaxUrl&&this.loadViaAjax(!1,!0,"CONFIG"),this.configFinal.defaultSelected&&this.checkAll(!0))},activeRow(n,e){const t=this.configFinal.activeClass;if(t){if(e!==null){const i=this.$refs["row-highlighted-"+e],a=i&&(Array.isArray(i)?i[0]:i);a&&a.classList.remove(t)}if(n!==null){const i=this.$refs["row-highlighted-"+n],a=i&&(Array.isArray(i)?i[0]:i);a&&a.classList.add(t)}}const s=n!==null&&this._visibleRowIndexMap[n]!==void 0?this._visibleRowIndexMap[n]:-1;this.$emit("active:row",this.rowsFinal[n],"active:row",s)}},methods:{setSearchQuery(n){this.query=n},valueToString:function(n){switch(n){case"":case null:case!1:case void 0:return"";case 0:case"0":default:return String(n)}},isColEmpty(n,e=-1){const t=e>-1?[e]:this.visibleRowIndexes;for(let s=0;s<t.length;s++){const i=this.rowsFinal[t[s]];if(!i)continue;const o=(i.cells?i.cells:i)[n];if(o){if(typeof o.isEmpty=="boolean"){if(!o.isEmpty)return!1;continue}if(typeof o.text<"u"&&this.valueToString(o.text)||typeof o.html<"u"&&this.valueToString(o.html))return!1}}return!0},cellFormatters(n,e){if(typeof this.configFinal.columns[n].cellFormatter=="function"){let t=this.configFinal.columns[n].cellFormatter(e);return typeof t!="object"&&(t={value:t}),t}return this.valueToString(e.html)?e.html:this.valueToString(e.text)?e.text:""},_rowCells(n){const e=this.rowsFinal[n];return e?e.cells?e.cells:e:[]},_hoverRow(n,e){if(this.hoveredRow!==n){const t=this.configFinal.hoverClass;t&&this._lastHoveredEl&&this._lastHoveredEl.classList.remove(t),this.hoveredRow=n,t&&e&&e.currentTarget&&(e.currentTarget.classList.add(t),this._lastHoveredEl=e.currentTarget)}},recomputeEssentials(){this.$nextTick(()=>{const n=Date.now();this.essentialsKey=n,this.generatedUpdatedKey=n})},initLists(){if(this.rowsFinal)for(let n=0;n<this.rowsFinal.length;n++){const e=n.toString();typeof this.sortedIndexes[e]>"u"&&this.$set(this.sortedIndexes,e,n),typeof this.selected[e]>"u"&&this.$set(this.selected,e,!1),this.configFinal.expandedAll||this.rowsFinal[n].expanded?this.$set(this.openRows,e,!0):this.$set(this.openRows,e,!1)}},clearLists(n=!0){n&&(this.selected={}),this.openRows={},this.sortedIndexes={}},checkKey(n){if(this.activeRow!==null){if(n.keyCode===40){n.preventDefault();const e=this._visibleRowIndexMap[this.activeRow];e===void 0||e===this.visibleRowIndexes.length-1?this.activeRow=0:this.activeRow=this.visibleRowIndexes[e+1]}if(n.keyCode===38){n.preventDefault();const e=this._visibleRowIndexMap[this.activeRow];e===void 0||e===0?this.activeRow=this.visibleRowIndexes[this.visibleRowIndexes.length-1]:this.activeRow=this.visibleRowIndexes[e-1]}}}},created(){if(this._lastHoveredEl=null,this.configFinal.storeState){const t=localStorage.getItem(`vue-quintable-${this.identifier}-filters`);if(t){const l=JSON.parse(t);for(let c in this.filters)Object.prototype.hasOwnProperty.call(this.filters,c)&&!Object.prototype.hasOwnProperty.call(l,c)&&(l[c]=this.filters[c]);this.$set(this.storedState,"filters",l)}const s=localStorage.getItem(`vue-quintable-${this.identifier}-query`);s&&this.$set(this.storedState,"query",s);const i=localStorage.getItem(`vue-quintable-${this.identifier}-rows-per-page`);i&&this.$set(this.storedState,"rows-per-page",parseInt(i));const a=localStorage.getItem(`vue-quintable-${this.identifier}-selected-rows`);a&&this.$set(this.storedState,"selected-rows",JSON.parse(a));const o=localStorage.getItem(`vue-quintable-${this.identifier}-current-page`);o&&this.$set(this.storedState,"current-page",parseInt(o));const r=localStorage.getItem(`vue-quintable-${this.identifier}-sort-indexes`);r&&this.$set(this.storedState,"sort-indexes",JSON.parse(r))}this.initLists();let n=0;const e=this.configFinal.selectAllRows?this.rowsFinal.map((t,s)=>s):this.visibleRowIndexes;for(let t=0;t<e.length;t++){let s=this.rowsFinal[t];s.selected&&this.$set(this.selected,t,!0),s.selected&&n++}if(!this.configFinal.selectAllRows&&n){let t=0;for(let s=0;s<this.rowsFinal.length;s++)!this.rowsFinal[s].disableSelect&&this.visibleRows[this.sortedIndexes[s]]&&t++;n===t&&(this.allSelectedCustom=!0)}else if(this.configFinal.selectAllRows&&n){let t=0;for(let s=0;s<this.rowsFinal.length;s++)this.rowsFinal[s].disableSelect||t++;n===t&&(this.allSelectedCustom=!0)}this.initialSearchTerm&&(this.query=this.initialSearchTerm),this.storedState.query&&(this.query=this.storedState.query),this.storedState["rows-per-page"]&&(this.customRowsPerPage=this.storedState["rows-per-page"]),this.storedState["sort-indexes"]&&(this.currentSortIndexes=this.storedState["sort-indexes"],this.sort(!0)),this.storedState["current-page"]&&this.$nextTick(()=>{this.currentPage=this.storedState["current-page"]}),this.$nextTick(this.checkStoredSelectedRows),this.configFinal.enableRowTabIndex&&document.addEventListener("keydown",this.checkKey)},mounted(){this.configFinal.ajaxUrl&&this.loadViaAjax(!1,!0,"MOUNTED"),this.configFinal.defaultSelected&&this.checkAll(!0),this._sharedBP=fe(),this._sharedBP.subscribe(this._onBreakpointChange)},beforeDestroy(){this._sharedBP&&this._sharedBP.unsubscribe(this._onBreakpointChange),this.configFinal.enableRowTabIndex&&document.removeEventListener("keydown",this.checkKey)}};var Et=function(){var e=this,t=e._self._c;return t("div",{staticClass:"table-wrapper quintable"},[t("div",{staticClass:"header slot slot-header quintable--header"},[e._t("header")],2),t("search-bar",{scopedSlots:e._u([e.$scopedSlots["before-search"]?{key:"before-search",fn:function(){return[e._t("before-search")]},proxy:!0}:null,e.$scopedSlots.search?{key:"search",fn:function(s){return[e._t("search",null,null,s)]}}:null,e.$scopedSlots["after-search"]?{key:"after-search",fn:function(){return[e._t("after-search")]},proxy:!0}:null],null,!0)}),t("div",{staticClass:"slot slot-after-search quintable--after-search-container"},[e._t("after-search-container")],2),t("div",{ref:"height-wrapper",staticClass:"clearfix quintable--table-container"},[e.ajaxLoading?e._e():t("table",{staticClass:"vue-quintable table quintable--table-container--table",class:e.tableClasses},[t("table-header"),t("tbody",{staticClass:"quintable--table-container--table--tbody",on:{mouseleave:e.onMouseleaveTable}},[e._l(e.visibleRowIndexes,function(s){return[e.rowsFinal[s]?t("tr",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"top",content:e.rowsFinal[s].tooltip,trigger:e.rowsFinal[s].tooltip?"hover":"manual",offset:5},expression:`{
              placement: 'top',
              content: rowsFinal[rIndex].tooltip,
              trigger: rowsFinal[rIndex].tooltip ? 'hover' : 'manual',
              offset: 5,
            }`}],key:"vue-quintable-"+e.uuid+"-row-"+s,ref:"row-highlighted-"+s,refInFor:!0,staticClass:"vue-quintable-row quintable--table-container--table--tbody--row",class:e.rowClasses[s],style:e.hiddenColumns[s]>0?"cursor:pointer;":"",attrs:{id:"vue-quintable-"+e.uuid+"-row-"+s},on:{click:function(i){return e.onRowClick(i,s)},auxclick:function(i){return e.onRowAuxClick(i,s)},mousedown:function(i){return e.onRowMousedown(i)},mouseenter:function(i){return e._hoverRow(s,i)}}},[e.hasGeneratedRows&&!e.configFinal.hideRowToggle?t("td",{staticClass:"toggle toggle-td toggle-cell quintable--table-container--table--tbody--row--toggle-td"},[e.hiddenColumns[s]>0?t("span",[e.openRows[s]?t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.configFinal.expandedRowIcon}})],1):t("span",[t("font-awesome-icon",{attrs:{"fixed-width":"",icon:e.configFinal.collapsedRowIcon}})],1)]):e._e()]):e._e(),e.configFinal.select&&e.configFinal.selectPosition==="pre"?t("td",{staticClass:"select-td pre quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--pre",class:{"disabled-select":e.rowsFinal[s].disableSelect}},[!e.rowsFinal[s].disableSelect||e.rowsFinal[s].showDisabledSelect?t("select-checkbox",{attrs:{value:e.selected[s],pretty:e.configFinal.prettySelect,disabled:e.rowsFinal[s].disableSelect},on:{input:function(i){return e.$set(e.selected,s,i)},change:function(i){return e.checkListener(i,s)}}}):e._e()],1):e._e(),e._l(e._renderRows[s],function(i){return[i.vis?t("td",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"left",content:i.cell.tooltip,trigger:i.cell.tooltip?"hover":"manual"},expression:`{
                  placement: 'left',
                  content: rc.cell.tooltip,
                  trigger: rc.cell.tooltip ? 'hover' : 'manual',
                }`}],key:i.key,staticClass:"vue-quintable-cell quintable--table-container--table--tbody--row--cell",class:i.cls,attrs:{id:i.key},on:{click:function(a){return e.onCellClick(a,i.cell)},auxclick:function(a){return e.onCellAuxClick(a,i.cell)},mousedown:function(a){return e.onCellMousedown(a)}}},[e._t("cell-complete",function(){return[e._t("cell-content",function(){return[i.fmt&&i.fmt.type==="html"?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-html",domProps:{innerHTML:e._s(i.fmt.value)}}):i.fmt?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--formatted-value"},[e._v(" "+e._s(i.fmt.value)+" ")]):i.cell.html!=null&&String(i.cell.html)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--html",domProps:{innerHTML:e._s(i.cell.html)}}):i.cell.component?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--component"},[t(i.cell.component.name,e._b({tag:"component",on:{action:e.handleComponentEvent}},"component",i.cell.component.props,!1))],1):i.cell.text!=null&&String(i.cell.text)!==""?t("div",{staticClass:"cell-inner quintable--table-container--table--tbody--row--cell--inner-cell--text"},[e._v(" "+e._s(i.cell.text)+" ")]):e._e()]},{cell:i.cell})]},{cell:i.cell})],2):e._e()]}),e.configFinal.select&&e.configFinal.selectPosition==="post"?t("td",{staticClass:"select-td post quintable--table-container--table--tbody--row--select-td quintable--table-container--table--tbody--row--select-td--post",class:{"disabled-select":e.rowsFinal[s].disableSelect}},[!e.rowsFinal[s].disableSelect||e.rowsFinal[s].showDisabledSelect?t("select-checkbox",{attrs:{value:e.selected[s],pretty:e.configFinal.prettySelect,disabled:e.rowsFinal[s].disableSelect},on:{input:function(i){return e.$set(e.selected,s,i)},change:function(i){return e.checkListener(i,s)}}}):e._e()],1):e._e()],2):e._e(),(e.generatedRows[s]||e.stickyRows[s])&&e.visibleRows[s]?t("expanded-row",{key:"vue-quintable-"+e.uuid+"-expanded-"+s,attrs:{"r-index":s},scopedSlots:e._u([e.$scopedSlots["generated-cell-complete"]?{key:"generated-cell-complete",fn:function({cell:i}){return[e._t("generated-cell-complete",null,{cell:i})]}}:null,e.$scopedSlots["generated-cell-content"]?{key:"generated-cell-content",fn:function({cell:i}){return[e._t("generated-cell-content",null,{cell:i})]}}:null,e.$scopedSlots["sticky-cell-complete"]?{key:"sticky-cell-complete",fn:function({cell:i}){return[e._t("sticky-cell-complete",null,{cell:i})]}}:null,e.$scopedSlots["sticky-cell-content"]?{key:"sticky-cell-content",fn:function({cell:i}){return[e._t("sticky-cell-content",null,{cell:i})]}}:null],null,!0)}):e._e()]})],2)],1),e.noRows&&!e.ajaxLoading?[t("div",{staticClass:"clearfix slot-no-results slot quintable--table-container--no-results"},[e._t("no-results",function(){return[t("div",{staticClass:"text-center p-3 quintable--table-container--no-results--results"},[t("em",{domProps:{innerHTML:e._s(e.configFinal.emptyPlaceholder)}})])]}),t("hr")],2)]:e._e()],2),e.ajaxLoading?t("div",{staticClass:"slot-loading slot quintable--loading"},[e._t("loading",function(){return[t("div",{staticClass:"loader-wrapper quintable--loading--loader-wrapper",style:"height:"+e.loaderHeight+"px;"},[t("div",{staticClass:"loader text-center py-4 quintable--loading--loader-wrapper--loader"},[t("font-awesome-icon",{staticClass:"ajax-loader quintable--loading--loader-wrapper--loader--ajax-loader",attrs:{icon:"circle-notch",spin:""}})],1)])]})],2):e._e(),t("pagination-footer"),t("div",{staticClass:"footer slot slot-footer quintable--footer"},[e._t("footer")],2)],1)},Ot=[],It=p(jt,Et,Ot,!1,null,"6e222ec7",null,null);const v=It.exports,Nt={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}]},rows:[[{html:"<em>John Doe</em>"},{text:40},{text:"New York"},{text:"CFO"}],[{text:"Mia Wong",classes:"text-primary"},{text:50},{text:"Beijing"},{text:"CEO"}],[{text:"Peter Stanbridge"},{text:18},{text:"London"},{text:"Trainee",align:"end"}],{cells:[{text:"Natalie Lee-Walsh"},{text:25},{text:"Dublin"},{text:"Managing Director"}],classes:"text-danger"}]}}};var Lt=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Just a simple table ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Qt=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>

<script>
    import VueQuintable from "../components/VueQuintable.vue"

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

                rows: [
                    [
                        {
                            html: "<em>John Doe</em>"
                        },
                        {
                            text: 40
                        },
                        {
                            text: "New York"
                        },
                        {
                            text: "CFO"
                        },
                    ],
                    [
                        {
                            text: "Mia Wong",
                            classes:"text-primary"
                        },
                        {
                            text: 50
                        },
                        {
                            text: "Beijing"
                        },
                        {
                            text: "CEO"
                        },
                    ],
                    [
                        {
                            text: "Peter Stanbridge"
                        },
                        {
                            text: 18
                        },
                        {
                            text: "London"
                        },
                        {
                            text: "Trainee",
                            align:"end"
                        },
                    ],
                    {
                         cells:[   {
                                text: "Natalie Lee-Walsh"
                            },
                            {
                                text: 25
                            },
                            {
                                text: "Dublin"
                            },
                            {
                                text: "Managing Director"
                            },
                        ],
                        classes:"text-danger"
                    },
                ],
            }
        }
    }
<\/script>`)])])])}],Bt=p(Nt,Lt,Qt,!1,null,null,null,null);const Tt=Bt.exports,Dt={components:{VueQuintable:v},data(){return{selectedRows:[],preSelectedRows:[],selectAllRows:!1}},computed:{config(){return{columns:[{headline:"Name",classes:"first-and-last-name",sort:!0},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}],selectPosition:"pre",select:!0,selectAll:!0,prettySelect:!0,pagination:8,selectAllRows:this.selectAllRows,enableRowTabIndex:!0}},rows(){let n=24;const e=[],t=new y;for(let s=0;s<n;s++)e.push({selected:s%2===0,disableSelect:s===1,index:s,cells:[{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession()}]});return e}},watch:{selectAllRows(){this.selectedRows=[];const n=[];for(let e=0;e<this.rows.length;e++)(e===0||e%2!==0)&&n.push({key:"index",value:e});this.preSelectedRows=n},selectedRows(){alert(`Selection Changed - Names:
`+(this.selectedRows.length?"- "+this.selectedRows.map(n=>n.cells[0].text).join(`
- `):"No rows selected"))}}};var Mt=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Select rows by clicking on checkboxes ")],1),t("div",{staticClass:"mb-3"},[t("p-check",{staticClass:"p-switch",model:{value:e.selectAllRows,callback:function(s){e.selectAllRows=s},expression:"selectAllRows"}},[e._v("Select rows cross pages")])],1),t("VueQuintable",{attrs:{preSelectedRows:e.preSelectedRows,"selected-rows":e.selectedRows,config:e.config,rows:e.rows},on:{"update:selectedRows":function(s){e.selectedRows=s},"update:selected-rows":function(s){e.selectedRows=s}}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Ht=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[n._v(" "),e("code",{staticClass:"language-markup"},[n._v(`<template>
    <div class="mb-3">
        <p-check class="p-switch" v-model="selectAllRows">Select rows cross pages</p-check>
    </div>

    <VueQuintable :preSelectedRows="preSelectedRows" selected-rows.sync="selectedRows" :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                selectedRows:[],
                preSelectedRows:[],
                selectAllRows:false,
            }
        },
        computed:{
            config(){
                return {
                    columns: [
                        {
                            headline: "Name",
                            classes: "first-and-last-name",
                            sort:true,
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                    selectPosition:"pre",
                    select:true,
                    selectAll:true,
                    prettySelect:true,
                    pagination:8,
                    selectAllRows:this.selectAllRows,
                    enableRowTabIndex: true,

                }
            },
            rows(){

                let count = 24;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push(
                        {
                            selected:i % 2 === 0,
                            disableSelect: i===1,
                            index:i,
                            cells:[
                            {
                                text:chance.name({ nationality: 'en' })
                            },
                            {
                                text:chance.age()
                            },
                            {
                                text:chance.city()
                            },
                            {
                                text:chance.profession()
                            },
                        ]
                        });
                }

                return rows;


            }
        },
        watch:{
            selectAllRows(){
                this.selectedRows = [];

                const selectedRows = [];
                for(let i = 0; i < this.rows.length; i++){
                    if(i===0 || i % 2 !== 0 ){
                        selectedRows.push({
                            key:"index",
                            value:i,
                        });
                    }
                }

                this.preSelectedRows = selectedRows;

            },
            selectedRows(){
                alert("Selection Changed - Names:\\n" + (this.selectedRows.length?"- "+this.selectedRows.map((row)=>{return row.cells[0].text}).join("\\n- "): "No rows selected"));
            }
        }
    }
<\/script>`)]),n._v(`
`)])])}],Ut=p(Dt,Mt,Ht,!1,null,null,null,null);const Jt=Ut.exports,Gt={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}],pagination:5,pageRange:3,rowsSelect:!0}}},computed:{rows(){let n=250;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession()}]);return e}}};var zt=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Switch pages by clicking on pagination below ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Kt=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import Chance from "chance";
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                    pagination:5,
                    pageRange:3,
                    rowsSelect:true
                },

            }
        },
        computed:{
            rows(){

                let count = 250;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`)])])])}],Wt=p(Gt,zt,Kt,!1,null,null,null,null);const Yt=Wt.exports,Xt={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",sort:!0},{headline:"Birth Place",sort:!0},{headline:"Job",sort:!0,firstSortDirection:"DESC"}],multiSort:!1,multiSortSelect:!0,pageSort:!1,pageSortSelect:!0,pagination:5,search:!0},sortOrder:[{index:1,asc:!1}]}},computed:{rows(){let n=30;const e=[],t=new y;for(let s=0;s<n;s++){const i=Math.ceil(Math.random()*10);e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{html:'<span class="me-2">'+t.profession()+"</span><em>["+i+"]</em>",sortValue:i}])}return e}}};var Zt=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Hover and click on headlines for sorting ")],1),t("VueQuintable",{attrs:{"sort-order":e.sortOrder,config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary mt-3",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},en=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(` <template>
        <VueQuintable  :sort-order="sortOrder" :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            sort:true

                        }, {
                            headline: "Birth Place",
                            sort: true,
                        }, {
                            headline: "Job",
                            sort:true,
                            firstSortDirection: "DESC",
                        }
                    ],
                    multiSort:true,
                    multiSortSelect:true,
                    pageSort:true,
                    pageSortSelect:true,
                    pagination:5,
                    search:true,
                },
                sortOrder:[{
                    index:1,
                    asc:false,
                }]

            }
        },
        computed:{
            rows(){

                let count = 30;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){

                    const randSortValue = Math.ceil(Math.random() * 10);

                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            html:"<span class\\"me-2\\">" + chance.profession() +"</span><em>"+ "["+randSortValue+"]</em>",
                            sortValue: randSortValue
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`)])])])}],tn=p(Xt,Zt,en,!1,null,null,null,null);const nn=tn.exports,sn={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",breakpoint:"md"},{headline:"Birth Place",breakpoint:"xxl"},{headline:"Job",breakpoint:"xl"}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession()}]);return e}}};var an=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Resize your brower window to see responsive behaviour ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},on=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
    <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                        }, {
                            headline: "Birth Place",
                            breakpoint:"xxl"
                        }, {
                            headline: "Job",
                            breakpoint:"xl"
                        }
                    ],
                },


            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`)])])])}],ln=p(sn,an,on,!1,null,null,null,null);const rn=ln.exports,cn={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}]},input:"New York",age:18}},computed:{initialRows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession()}]);return e},rows(){return this.initialRows.map((n,e)=>(e===0&&(n[2].text=this.input),e===0&&(n[1].text=this.age),n))}},mounted(){setInterval(()=>{this.age>=35?this.age=18:this.age++},1e3)}};var dn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Change the value in the input to see affect for the table ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows},scopedSlots:e._u([{key:"header",fn:function(){return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.input},on:{input:function(s){s.target.composing||(e.input=s.target.value)}}})]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},un=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },
                input:"New York",
                age:18
            }
        },
        computed:{
            initialRows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){

                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()

                        },
                    ]);
                }

                return rows;
            },
            rows(){
                return this.initialRows.map((row,index)=>{
                    if(index === 0){
                        row[2].text = this.input;
                    }

                    if(index === 0){
                        row[1].text = this.age;
                    }

                    return row;
                });
            }
        },

        mounted(){
            setInterval(()=>{

                if(this.age >=35){
                    this.age = 18;
                }else{
                    this.age++;
                }

            },1000);
        }

    }
<\/script>`)])])])}],hn=p(cn,dn,un,!1,null,null,null,null);const pn=hn.exports,fn={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",sort:!0},{headline:"Birth Place"},{headline:"Job",breakpoint:"all"}],pagination:5,rowsSelect:!0,search:!0,searchLength:2},eventsLog:[]}},computed:{rows(){let n=20;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{type:"prevent-toggle",value:t.age()},{text:t.city(),classes:"prevent-toggle"},{text:t.profession()}]);return e}},methods:{eventListener(n,e,t){const s=this.eventsLog;if(s.push({event:e,data:JSON.stringify(n),target:t?t.outerHTML:null}),this.eventsLog=s,this.eventsLog.length>4){const i=this.eventsLog;i.splice(0,1),this.eventsLog=i}}}};var mn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Interact with the table to so when events get fired ")],1),this.eventsLog.length?t("div",{staticClass:"list-group mb-3"},e._l(e.eventsLog,function(s,i){return t("div",{key:i,staticClass:"list-group-item",class:{"bg-info text-white":i===e.eventsLog.length-1}},[e._v(" Event "+e._s(s.event)+" was fired with data: "),t("div",[e._v(e._s(s.data))]),s.target?t("div",{staticClass:"mt-2"},[e._v("Target:"+e._s(s.target))]):e._e()])}),0):e._e(),t("VueQuintable",{attrs:{config:e.config,rows:e.rows},on:{"update:sort":e.eventListener,"update:page":e.eventListener,"update:search":e.eventListener,"update:rows-per-page":e.eventListener,"click:row":e.eventListener,"click:cell":e.eventListener,"auxclick:cell":e.eventListener,"auxclick:row":e.eventListener,"expand:row":e.eventListener,"filtered:rows":e.eventListener,"hover:row":e.eventListener,"collapse:row":e.eventListener,"change:breakpoints":e.eventListener},scopedSlots:e._u([{key:"cell-content",fn:function(s){return[s.cell.type==="prevent-toggle"?t("span",{staticClass:"prevent-toggle"},[e._v(" "+e._s(s.cell.value)+" ")]):e._e()]}}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},gn=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{pre:!0,attrs:{class:"language-markup"}},[n._v(`<template>
    <div class="list-group mb-3" v-if="this.eventsLog.length">
      <div
        :key="index"
        class="list-group-item"
        v-for="(event, index) in eventsLog"
        :class="{ 'bg-info text-white': index === eventsLog.length - 1 }"
      >
        Event {{ event.event }} was fired with data:
        <div>{{ event.data }}</div>
        <div class="mt-2" v-if="event.target">Target:{{ event.target }}</div>
      </div>
    </div>
    <VueQuintable
      @update:sort="eventListener"
      @update:page="eventListener"
      @update:search="eventListener"
      @update:rows-per-page="eventListener"
      @click:row="eventListener"
      @click:cell="eventListener"
      @expand:row="eventListener"
      @filtered:rows="eventListener"
      @hover:row="eventListener"
      @collapse:row="eventListener"
      @change:breakpoints="eventListener"
      :config="config"
      :rows="rows"
    >
      <template #cell-content="context">
        <span
          v-if="context.cell.type === 'prevent-toggle'"
          class="prevent-toggle"
        >
          {{ context.cell.value }}
        </span>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            sort: true,
          },
          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
            breakpoint: "all",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        searchLength: 2,
      },
      eventsLog: [],
    };
  },
  computed: {
    rows() {
      let count = 20;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            type: "prevent-toggle",
            value: chance.age(),
          },
          {
            text: chance.city(),
            classes: "prevent-toggle",
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
 methods: {
    eventListener(data, event, target) {
      const eventsLog = this.eventsLog;
      eventsLog.push({
        event: event,
        data: JSON.stringify(data),
        target: target ? target.outerHTML : null,
      });
      this.eventsLog = eventsLog;

      if (this.eventsLog.length > 5) {
        const eventsLog = this.eventsLog;
        eventsLog.splice(0, 1);
        this.eventsLog = eventsLog;
      }
    },
  },
};
<\/script>`)])])])}],bn=p(fn,mn,gn,!1,null,null,null,null);const wn=bn.exports,vn={props:{updated:{type:[Boolean,Date]}},components:{VueQuintable:v},data(){return{loading:!1,remoteConfig:{},remoteRows:[]}},mounted(){this.loading=!0,k.get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true").then(n=>{this.remoteRows=n.data.rows,this.remoteConfig=n.data.config,this.loading=!1})},watch:{updated(){this.remoteConfig=null,this.remoteRows=null,this.loading=!0,k.get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true").then(n=>{this.remoteRows=n.data.rows,this.remoteConfig=n.data.config,this.loading=!1})}}};var _n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Initially pulled config and rows from server via ajax ")],1),t("VueQuintable",{attrs:{loading:e.loading,config:e.remoteConfig,rows:e.remoteRows},scopedSlots:e._u([{key:"loading",fn:function(){return[t("div",{staticClass:"text-center py-3 mb-3 text-white bg-success"},[e._v(" Loading... "),t("font-awesome-icon",{staticClass:"ms-3",attrs:{icon:"circle-notch",spin:""}})],1)]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},xn=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[n._v("           "),e("code",{staticClass:"language-markup"},[n._v(`
      <template>
           <VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows">
              <template v-slot:loading>
                  <div class="text-center py-3 mb-3 text-white bg-success">
                      Loading... <font-awesome-icon class="ms-3" icon="circle-notch" spin></font-awesome-icon>
                  </div>
              </template>
          </VueQuintable>
      </template>

      <script>
          import axios from 'axios'
          import VueQuintable from "../components/VueQuintable.vue"

          export default {
              components:{
                  VueQuintable
              },
              data() {
                  return {
                      loading:false,
                      remoteConfig:{},
                      remoteRows:[]
                  }
              },
              mounted(){
                  this.remoteConfig = null;
                  this.remoteRows = null;
                  this.loading = true;
                  axios.get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true").then((response)=>{
                      this.remoteRows = response.data.rows;
                      this.remoteConfig = response.data.config;
                      this.loading = false;
                  });
              }

          }

      <\/script>
  `)]),n._v(`
      `)])])}],yn=p(vn,_n,xn,!1,null,null,null,null);const Cn=yn.exports,Sn={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Printable"},{headline:"Active"}],search:!0,useFuzzySearch:!0,searchLength:3,filterRelation:"AND",searchPlaceholder:"Search rows..."},filters:{},filterGroupsDefaults:[{items:[{items:[{name:"name"},{name:"active"}],relation:"OR"},{items:[{name:"printable"}]}],relation:"AND"}],filterGroupsActive:!1,printableFilter:!1,activeFilter:!1,dynamicFilter:!1,number:0}},computed:{filterGroups(){return this.filterGroupsActive?this.filterGroupsDefaults:[]},rows(){let n=50;const e=[],t=new y;for(let s=0;s<n;s++){const i=Math.random()>=.5,a=Math.random()>=.5,o=t.name({nationality:"en"}),r=t.age();e.push({keywords:["ROW "+s],cells:[{text:o},{text:r},{component:{name:"font-awesome-icon",props:{icon:i?"check":"times"}}},{component:{name:"font-awesome-icon",props:{icon:a?"check":"times"}}}],filters:{active:a,printable:i,name:o}})}return e}},watch:{activeFilter(n){n?this.$set(this.filters,"active",!0):this.$delete(this.filters,"active")},printableFilter(n){n?this.$set(this.filters,"printable",!0):this.$delete(this.filters,"printable")},dynamicFilter(n){n?this.$set(this.filters,"name",{operator:"matches",values:new RegExp("Ma")}):this.$delete(this.filters,"name")}},methods:{visibleRows(n){this.number=n.length}}};var Rn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Filter rows by adjust filter and settings switches ")],1),t("VueQuintable",{attrs:{"filter-groups":e.filterGroups,filters:e.filters,config:e.config,rows:e.rows},on:{"filtered:rows":e.visibleRows},scopedSlots:e._u([{key:"header",fn:function(){return[t("strong",{staticClass:"mb-2"},[e._v("Filters:")]),t("div",{staticClass:"clearfix py-2"},[t("p-check",{staticClass:"p-switch",attrs:{value:"true"},model:{value:e.activeFilter,callback:function(s){e.activeFilter=s},expression:"activeFilter"}},[e._v("Active")])],1),t("div",{staticClass:"clearfix py-2"},[t("p-check",{staticClass:"p-switch",attrs:{value:"true"},model:{value:e.printableFilter,callback:function(s){e.printableFilter=s},expression:"printableFilter"}},[e._v("Printable")])],1),t("div",{staticClass:"clearfix py-2"},[t("p-check",{staticClass:"p-switch",attrs:{value:"true"},model:{value:e.dynamicFilter,callback:function(s){e.dynamicFilter=s},expression:"dynamicFilter"}},[e._v("Regex for name (/Ma/)")])],1),t("hr"),t("strong",{staticClass:"mb-2"},[e._v("Settings:")]),t("div",{staticClass:"clearfix py-2"},[t("p-check",{staticClass:"p-switch",attrs:{value:"true"},model:{value:e.filterGroupsActive,callback:function(s){e.filterGroupsActive=s},expression:"filterGroupsActive"}},[e._v("Toggle Filter Groups")])],1),t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("p-radio",{attrs:{value:"AND",name:"radio",color:"info"},model:{value:e.config.filterRelation,callback:function(s){e.$set(e.config,"filterRelation",s)},expression:"config.filterRelation"}},[e._v("AND filter relation")]),t("span",{staticClass:"mx-2"}),t("p-radio",{attrs:{value:"OR",name:"radio",color:"info"},model:{value:e.config.filterRelation,callback:function(s){e.$set(e.config,"filterRelation",s)},expression:"config.filterRelation"}},[e._v("OR filter relation")])],1)]),t("hr")]},proxy:!0},{key:"footer",fn:function(){return[t("div",{staticClass:"mb-3 alert alert-info"},[t("em",[e._v("Number of Rows:")]),e._v(" "),t("strong",[e._v(e._s(e.number))])])]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),t("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[t("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[t("code",{staticClass:"language-markup"},[e._v(`<template>
        <VueQuintable :filter-groups="filterGroups" :filters="filters" :config="config" :rows="rows" @filtered:rows="visibleRows">
            <template v-slot:header>

                <strong class="mb-2">Filters:</strong>

                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="activeFilter" value="true">Active</p-check>
                </div>
                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="printableFilter" value="true">Printable</p-check>
                </div>

                <div class="clearfix py-2">
                    <p-check class="p-switch" v-model="dynamicFilter" value="true">Regex for name (/Ma/)</p-check>
                </div>

                <hr>
                <strong class="mb-2">Settings:</strong>
                    <div class="clearfix py-2">
                        <p-check class="p-switch" v-model="filterGroupsActive" value="true">Toggle Filter Groups</p-check>
                    </div>

                <div class="card">
                    <div class="card-body">
                     <p-radio value="AND" name="radio" color="info" v-model="config.filterRelation">AND filter relation</p-radio>
                     <span class="mx-2"></span>
                        <p-radio value="OR" name="radio" color="info" v-model="config.filterRelation">OR filter relation</p-radio>
                    </div>
                    </div>
                <hr>
            </template>

            <template v-slot:footer>
                <div class="mb-3 alert alert-info">
                    <em>Number of Rows:</em> <strong>`+e._s(e.number)+`</strong>
                </div>
            </template>
        </VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Printable",
                        }, {
                            headline: "Active",
                        }
                    ],
                    search:true,
                    useFuzzySearch:true,
                    searchLength:3,
                    filterRelation:"AND",
                    searchPlaceholder:"Search rows...",
                },
                filters:{
                },
                filterGroupsDefaults:[
                    {
                        items:[
                            {
                                items:[
                                    {name:"name"},
                                    {name:"active"}
                                ],
                                relation:"OR",
                            },
                            {
                                items:[
                                    {
                                        name:"printable"
                                    }
                                ],
                            }
                        ],
                        relation:"AND"
                    }
                ],
                filterGroupsActive:false,
                printableFilter:false,
                activeFilter:false,
                dynamicFilter:false,
                number:0,

            }
        },
        computed:{
            filterGroups(){
                  return this.filterGroupsActive?this.filterGroupsDefaults:[];
            },
            rows(){

                let count = 50;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    const printable = Math.random() >= 0.5;
                    const active = Math.random() >= 0.5;
                    const name = chance.name({ nationality: 'en' });
                    const age = chance.age();

                    rows.push(
                        {
                            keywords: ['Row ' + i],
                            cells:[
                                {
                                    text:name
                                },
                                {
                                    text:age
                                },
                                {
                                    component:{
                                        name:"font-awesome-icon",
                                        props: {
                                            icon: (printable ? "check" : "times")
                                        }
                                    }
                                },
                                {
                                    component:{
                                        name:"font-awesome-icon",
                                        props: {
                                            icon: (active ? "check" : "times")
                                        }
                                    }
                                },

                            ],
                            filters: {
                                active: active,
                                printable: printable,
                                name:name,
                            }
                        });
                }

                return rows;


            }
        },
        watch:{
            activeFilter(val){
                if(val){
                    this.$set(this.filters,"active",true);
                }else{
                    this.$delete(this.filters,"active");
                }

            },
            printableFilter(val){
                if(val){
                    this.$set(this.filters,"printable",true);
                }else{
                    this.$delete(this.filters,"printable");
                }
            },

            dynamicFilter(val){
                if(val){
                    this.$set(this.filters,"name",{
                        operator:"matches",
                        values:new RegExp("Ma")
                    });
                }else{
                    this.$delete(this.filters,"name");
                }
            },



        },
        methods:{
            visibleRows(rows){
                this.number = rows.length;
            }
        }

    }
<\/script>`)])])])],1)},kn=[],Fn=p(Sn,Rn,kn,!1,null,null,null,null);const qn=Fn.exports,Pn={props:{index:{type:Number},name:{type:String}},data(){return{checked:!1,reference:"checkbox-component"}},methods:{toggleCheck(){this.$emit("action",{reference:this.reference,index:this.index,checked:this.checked})}}};var $n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"checkbox-wrapper"},[t("div",[t("span",{staticClass:"me-2"},[e._v(e._s(e.name))]),t("p-check",{on:{change:e.toggleCheck},model:{value:e.checked,callback:function(s){e.checked=s},expression:"checked"}},[t("wbr")])],1)])},An=[],Vn=p(Pn,$n,An,!1,null,null,null,null);const de=Vn.exports;R.component("checkbox-component",de.default||de);const jn={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{component:{name:"checkbox-component",props:{index:s+1,name:t.name({nationality:"en"})}}},{text:t.age()},{text:t.city()},{text:t.profession()}]);return e}},methods:{onComponentEvent(n){alert("Component "+n.reference+" on index "+n.index+" has just been"+(n.checked?" checked!":" unchecked!"))}}};var En=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Rows are calculated and passed as a computed property ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows},on:{"component:event":e.onComponentEvent}}),t("button",{staticClass:"btn btn-secondary mb-1 me-2",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code for App ")],1),t("button",{staticClass:"btn btn-secondary mb-1",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-component"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code Component ")],1),e._m(0),e._m(1)],1)},On=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows" @component:event="onComponentEvent" ></VueQuintable>
</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"
    import CheckboxComponent from "./components/CheckboxComponent.vue"
    import Vue from "vue"


    Vue.component(
        "checkbox-component",
        CheckboxComponent.default || CheckboxComponent
    );


    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            component: {
                                name: "checkbox-component",
                                props: {
                                    index: i+1,
                                    name: chance.name({ nationality: 'en' }),
                                }
                            }
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        },
        methods:{
            onComponentEvent(data){
                alert(
                    "Component " +data.reference +
                    " on index " + data.index +
                    " has just been" +
                    (data.checked ? " checked!" : " unchecked!")
                );
            }
        }
    }
<\/script>`)])])])},function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-component"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
    <div class="checkbox-wrapper">
        <div>
            <span class="me-2" v-html="name"></span>
            <p-check v-model="checked" @change="toggleCheck"><wbr></p-check>
        </div>
    </div>
</template>


<script>

    export default {
        props:{
            index:{
                type:Number
            },
            name:{
                type:String
            }
        },
        data(){
            return {
                checked:true,
                reference:"checkbox-component",
            }
        },
        methods: {
            check() {
                this.$emit("action",
                    {
                        reference:this.reference,
                        index:this.index,
                        checked:this.checked,
                    }
                )
            }
        }
    }

<\/script>`)])])])}],In=p(jn,En,On,!1,null,null,null,null);const Nn=In.exports,Ln={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",breakpoint:"lg"},{headline:"Children",breakpoint:"all"},{headline:"Job"}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{type:"nested"},{text:t.profession()}]);return e},configNested(){return{columns:[{headline:"Name",align:"center",sort:!0},{headline:"Country of Birth",cellFormatter:n=>({value:"Country: "+n.value}),align:"center"},{headline:"Time of Birth",breakpoint:"xl",align:"center"}]}},rowsNested(){const n=Math.ceil(Math.random()*24),e=Math.ceil(Math.random()*59);let t=be.tz("Europe/Berlin");t.set({hour:n,minute:e,second:0,millisecond:0});const s=t.format("hh:mm A"),i=t.tz("America/New_York").format("hh:mm A"),a=t.tz("America/Chicago").format("hh:mm A"),o=new y;return[[{text:o.name({nationality:"en"})},{value:o.country({full:!0})},{type:"strong",value:s}],[{text:o.name({nationality:"en"})},{value:o.country({full:!0})},{type:"strong",value:i}],[{text:o.name({nationality:"en"})},{value:o.country({full:!0})},{type:"strong",value:a}]]}}};var Qn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Nested VueQuintable ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows},scopedSlots:e._u([{key:"generated-cell-content",fn:function(s){return[s.cell.type==="nested"?t("div",[t("VueQuintable",{staticClass:"ms-4",attrs:{nested:!0,rows:e.rowsNested,config:e.configNested},scopedSlots:e._u([{key:"cell-complete",fn:function(i){return[i.cell.type==="strong"?t("strong",[e._v(e._s(i.cell.value))]):e._e()]}}],null,!0)})],1):e._e()]}}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Bn=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{pre:!0,attrs:{class:"language-markup"}},[n._v(`<template>
      <VueQuintable
            class="ms-4"
            :nested="true"
            :rows="rowsNested"
            :config="configNested"
          >
            <template v-slot:generated-cell-content="context">
              <strong v-if="context.cell.type === 'strong'">{{context.cell.value }}</strong>
            </template>
          </VueQuintable>
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

import Chance from "chance";
import moment from 'moment-timezone';


export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
          },
          {
            headline: "Children",
            breakpoint: "all",
          },
          {
            headline: "Job",
          },
        ],
      },
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            type: "nested",
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
    configNested() {
      return {
        columns: [
        {
            headline: "Name",
            align: "center",
            sort:true,
          },
          {
            headline: "Country of Birth",
            cellFormatter: (cell) => {
              return { value: "Country: " + cell.value };
            },
            align: "center",
          },
          {
            headline: "Time of Birth",
            breakpoint: "xl",
            align: "center",
          },
        ],
      };
    },

    rowsNested() {
      const chance = new Chance();
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      var m = moment.tz("Europe/Berlin");
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format("hh:mm A");
      const timeNY = m.tz("America/New_York").format("hh:mm A");
      const timeH = m.tz("America/Chicago").format("hh:mm A");


      return [
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true })},
          { type: "strong", value: timeB },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeNY },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeH },
        ],
      ];
    },
  },
};
<\/script>`)])])])}],Tn=p(Ln,Qn,Bn,!1,null,null,null,null);const Dn=Tn.exports,Mn={components:{VueQuintable:v},data(){return{config:{pagination:!0,columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place",sticky:!0},{headline:"Job",breakpoint:"md"}],search:!0,searchClass:"col-md-8"},showRows:!0}},computed:{rows(){if(!this.showRows)return[];let n=500;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession(),type:"nested"}]);return e}},methods:{alert(n){alert("I clicked the slot "+n)}}};var Hn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Customized with configured slots ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows},scopedSlots:e._u([{key:"cell-content",fn:function(s){return[t("div",{staticClass:"btn btn-sm btn-info",on:{click:function(i){return i.stopPropagation(),e.alert(s.cell.text)}}},[e._v(" "+e._s(s.cell.text)+" ")])]}},{key:"generated-cell-content",fn:function(s){return[t("div",{staticClass:"btn btn-sm btn-warning",on:{click:function(i){return i.stopPropagation(),e.alert(s.cell.text)}}},[e._v(" "+e._s(s.cell.text)+" ")])]}},{key:"sticky-cell-content",fn:function(s){return[t("div",{staticClass:"btn btn-sm btn-danger",on:{click:function(i){return i.stopPropagation(),e.alert(s.cell.text)}}},[e._v(" "+e._s(s.cell.text)+" ")])]}},{key:"header",fn:function(){return[t("hr"),t("div",{staticClass:"alert alert-primary"},[t("div",{staticClass:"text-center"},[t("h4",[e._v("VueQuintable")])])])]},proxy:!0},{key:"before-search",fn:function(){return[t("div",{staticClass:"col-md-2"},[t("button",{staticClass:"btn btn-primary w-100 text-center",attrs:{type:"button"}},[e._v(" Button before search ")])])]},proxy:!0},{key:"search",fn:function({placeholder:s,value:i,setSearchQuery:a}){return[t("div",{staticClass:"col-md-8"},[t("input",{staticClass:"form-control",attrs:{type:"search",placeholder:s},domProps:{value:i},on:{input:function(o){return a(o.target.value)}}})])]}},{key:"after-search",fn:function(){return[t("div",{staticClass:"col-md-2"},[t("button",{staticClass:"btn btn-secondary w-100 text-center",attrs:{type:"button"}},[e._v(" Button after search ")])])]},proxy:!0},{key:"after-search-container",fn:function(){return[t("hr"),t("p-check",{staticClass:"p-switch",model:{value:e.showRows,callback:function(s){e.showRows=s},expression:"showRows"}},[e._v("Toggle Rows")]),t("hr")]},proxy:!0},{key:"footer",fn:function(){return[t("div",{staticClass:"text-center py-3 px-3 mt-3 bg-info text-white"},[e._v(" Copyright © 2021 by Sensetence UG (haftungsbeschränkt) ")])]},proxy:!0},{key:"no-results",fn:function(){return[t("div",{staticClass:"text-center"},[t("div",{staticClass:"alert alert-danger"},[e._v("No Results...")])])]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary mt-3",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Un=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{pre:!0,attrs:{class:"language-markup"}},[n._v(`<template>
     <VueQuintable :config="config" :rows="rows">
      <template v-slot:cell-content="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:generated-cell-content="context">
        <div
          class="btn btn-sm btn-warning"
          @click.stop="alert(context.cell.text)"
        >
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:sticky-cell-content="context">
        <div
          class="btn btn-sm btn-danger"
          @click.stop="alert(context.cell.text)"
        >
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:header>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4>VueQuintable</h4>
          </div>
        </div>
      </template>

      <template v-slot:before-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100 text-center">
            Button before search
          </button>
        </div>
      </template>

      <template v-slot:search="{ placeholder, value, setSearchQuery }">
        <div class="col-md-8">
          <input
            type="search"
            :value="value"
            :placeholder="placeholder"
            class="form-control"
            @input="setSearchQuery($event.target.value)"
          />
        </div>
      </template>

      <template v-slot:after-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-secondary w-100 text-center">
            Button after search
          </button>
        </div>
      </template>

      <template v-slot:after-search-container>
        <hr />
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr />
      </template>

      <template v-slot:footer>
        <div class="text-center py-3 px-3 mt-3 bg-info text-white">
          Copyright © 2021 by Sensetence UG (haftungsbeschränkt)
        </div>
      </template>
      <template v-slot:no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
          },
          {
            headline: "Birth Place",
            sticky: true,
          },
          {
            headline: "Job",
            breakpoint: "md",
          },
        ],
        search: true,
        searchClass: "col-md-8",
      },
      showRows: true,
    };
  },
  computed: {
    rows() {
      if (!this.showRows) {
        return [];
      }

      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            text: chance.city(),
          },
          {
            text: chance.profession(),
            type: "nested",
          },
        ]);
      }

      return rows;
    },
  },
  methods: {
    alert(text) {
      alert("I clicked the slot " + text);
    },
  },
};
<\/script>`)])])])}],Jn=p(Mn,Hn,Un,!1,null,null,null,null);const Gn=Jn.exports,zn={props:{index:{type:Number}},components:{Drag:pe.Drag},methods:{dragstart(){this.$emit("action",{index:this.index,type:"dragstart"})},dragend(){this.$emit("action",{index:this.index,type:"dragend"})}}};var Kn=function(){var e=this,t=e._self._c;return t("drag",{staticClass:"d-inline-block",attrs:{"transfer-data":{index:e.index},"effect-allowed":["move"],"drop-effect":"move"},on:{dragend:e.dragend,dragstart:e.dragstart}},[t("div",{staticClass:"btn p-2"},[t("font-awesome-icon",{attrs:{icon:"arrows-alt"}})],1)])},Wn=[],Yn=p(zn,Kn,Wn,!1,null,null,null,null);const ue=Yn.exports;const Xn={props:{first:{type:Boolean,default:!1},last:{type:Boolean,default:!1},index:{type:Number}},components:{Drop:pe.Drop},data(){return{checked:!1,reference:"actions-component"}},methods:{handleDrop(n){this.$emit("action",{index:n.index,type:"move-row",to:this.index})},moveRow(n="up"){n==="up"&&this.first||n==="down"&&this.last||this.$emit("action",{index:this.index,type:"move-row",to:n==="up"?this.index-1:this.index+1})},deleteRow(){this.$emit("action",{index:this.index,type:"delete-row"})}}};var Zn=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("div",{staticClass:"btn-group me-2"},[t("div",{staticClass:"btn btn-info",class:{disabled:e.first},attrs:{disabled:e.first},on:{click:function(s){return e.moveRow("up")}}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}})],1),t("div",{staticClass:"btn btn-info",class:{disabled:e.last},attrs:{disabled:e.last},on:{click:function(s){return e.moveRow("down")}}},[t("font-awesome-icon",{attrs:{icon:"chevron-down"}})],1)]),t("div",{staticClass:"btn btn-danger me-2",attrs:{title:"Delete Row"},on:{click:e.deleteRow}},[t("font-awesome-icon",{attrs:{icon:"times"}})],1),t("drop",{staticClass:"d-inline-block align-middle drop-element",attrs:{title:"Drop your dragging row here to move it"},on:{drop:e.handleDrop}},[t("div",{staticClass:"card px-3 d-inline-block"},[t("div",{staticClass:"py-2 bg-muted"},[t("font-awesome-icon",{attrs:{icon:"expand"}})],1)])])],1)},es=[],ts=p(Xn,Zn,es,!1,null,"7d001535",null,null);const he=ts.exports;R.component("actions-component",he.default||he);R.component("drag-component",ue.default||ue);const ns={components:{VueQuintable:v},data(){return{config:{columns:[{headline:""},{headline:"Name"},{headline:"Age",breakpoint:"md"},{headline:"Birth Place",breakpoint:"lg"},{headline:"Job",breakpoint:"lg"},{headline:"Actions",breakpoint:"sm"}]},rows:[],index:1,name:"",age:null,city:"",job:"",rowCount:10,dragging:!1}},computed:{tableClasses(){return this.dragging?"dragging":""},ages(){return Array.range(1,99)},indexes(){return this.rows.map((n,e)=>e+1)}},created(){Array.range=(t,s)=>Array.from({length:s-t},(i,a)=>a+t);const n=[],e=new y;for(let t=0;t<this.rowCount;t++)n.push([{component:{name:"drag-component",props:{index:t}}},{text:e.name({nationality:"en"})},{text:e.age()},{text:e.city()},{text:e.profession()},{component:{name:"actions-component",props:{index:t,first:t===0,last:t===this.rowCount-1}}}]);this.rows=n},methods:{updateIndexes(){this.rows=this.rows.map((n,e)=>(n[5].component.props.index=e,n[5].component.props.first=e===0,n[5].component.props.last=e===this.rowCount-1,n[0].component.props.index=e,n))},componentListener(n){n.type==="delete-row"?(this.rows.splice(n.index,1),this.rowCount--,this.updateIndexes()):n.type==="move-row"?(this.dragging=!1,this.move(n.index,n.to)):n.type==="dragstart"?this.dragging=!0:n.type==="dragend"&&(this.dragging=!1)},move(n,e){if(e>=this.rows.length)for(var t=e-this.rows.length+1;t--;)this.rows.push(void 0);this.rows.splice(e,0,this.rows.splice(n,1)[0]),this.updateIndexes()},addRow(){if(!this.name||!this.age||!this.city||!this.job){alert("You have to fill out all inputs");return}const n=[{component:{name:"drag-component",props:{index:this.index-1}}},{text:this.name},{text:this.age},{text:this.city},{text:this.job},{component:{name:"actions-component",props:{index:this.index-1}}}];this.index===this.rowCount?this.rows.push(n):this.rows.splice(this.index-1,0,n),this.index=1,this.name="",this.age=null,this.city="",this.job="",this.rowCount++,this.updateIndexes()}}};var ss=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Use buttons to add/remove/move rows or Drag&Drop ["),t("a",{attrs:{target:"_blank",href:"https://github.com/cameronhimself/vue-drag-drop"}},[e._v("vue-drag-drop")]),e._v("]. ")],1),t("VueQuintable",{attrs:{"table-classes":e.tableClasses,config:e.config,rows:e.rows},on:{"component:event":e.componentListener},scopedSlots:e._u([{key:"header",fn:function(){return[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-2"},[t("div",{staticClass:"mb-3"},[t("label",[e._v("Index")]),t("v-select",{attrs:{options:e.indexes,clearable:!1},model:{value:e.index,callback:function(s){e.index=s},expression:"index"}})],1)]),t("div",{staticClass:"col-md-2"},[t("div",{staticClass:"mb-3"},[t("label",{attrs:{for:"name"}},[e._v("Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",type:"text"},domProps:{value:e.name},on:{input:function(s){s.target.composing||(e.name=s.target.value)}}})])]),t("div",{staticClass:"col-md-2"},[t("div",{staticClass:"mb-3"},[t("label",[e._v("Age")]),t("v-select",{attrs:{options:e.ages,placeholder:"Select Age..."},model:{value:e.age,callback:function(s){e.age=s},expression:"age"}})],1)]),t("div",{staticClass:"col-md-2"},[t("div",{staticClass:"mb-3"},[t("label",{attrs:{for:"city"}},[e._v("City")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.city,expression:"city"}],staticClass:"form-control",attrs:{id:"city",type:"text"},domProps:{value:e.city},on:{input:function(s){s.target.composing||(e.city=s.target.value)}}})])]),t("div",{staticClass:"col-md-2"},[t("div",{staticClass:"mb-3"},[t("label",{attrs:{for:"job"}},[e._v("Job")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.job,expression:"job"}],staticClass:"form-control",attrs:{id:"job",type:"text"},domProps:{value:e.job},on:{input:function(s){s.target.composing||(e.job=s.target.value)}}})])]),t("div",{staticClass:"col-md-2"},[t("label",[t("wbr")]),t("div",{staticClass:"mb-3"},[t("span",{staticClass:"btn btn-info",on:{click:e.addRow}},[t("font-awesome-icon",{attrs:{icon:"plus"}}),e._v(" Add Row")],1)])])])]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary me-2 mb-1",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code for App ")],1),t("button",{staticClass:"btn btn-secondary me-2 mb-1",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-component"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code Drag Component ")],1),t("button",{staticClass:"btn btn-secondary mb-1",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-component-drag"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code Actions Component ")],1),e._m(0),e._m(1),e._m(2)],1)},is=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
       <VueQuintable :table-classes="tableClasses" :config="config" :rows="rows" @component:event="componentListener">

            <template v-slot:header>
                <div class="row">
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="index" >Index</label>
                            <v-select id="index" :options="indexes" v-model="index" :clearable="false"></v-select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="name" >Name</label>
                            <input id="name" v-model="name" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="age" >Age</label>
                            <v-select id="age" :options="ages" v-model="age" placeholder="Select Age..."></v-select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="city" >City</label>
                            <input id="city" v-model="city" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="job" >Job</label>
                            <input id="job" v-model="job" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <label><wbr></label>
                        <div class="mb-3">
                            <span class="btn btn-info" @click="addRow"><font-awesome-icon icon="plus"></font-awesome-icon> Add Row</span>
                        </div>
                    </div>
                </div>
            </template>

        </VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    import DragComponent from "./components/DragComponent.vue"
    import ActionsComponent from "./components/ActionsComponent.vue"
    import Vue from "vue"


    Vue.component(
        "actions-component",
        ActionsComponent.default || ActionsComponent
    );

    Vue.component(
        "drag-component",
        DragComponent.default || DragComponent
    );

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "",
                        },{
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md",
                        }, {
                            headline: "Birth Place",
                            breakpoint:"lg",
                        }, {
                            headline: "Job",
                            breakpoint:"lg",
                        },{
                            headline:"Actions",
                            breakpoint:"sm",
                        }
                    ],
                },
                rows:[],
                index:1,
                name:"",
                age:null,
                city:"",
                job:"",
                rowCount:10,
                dragging:false,
            }

        },
        computed:{
            tableClasses() {
                return this.dragging ? "dragging" : "";
            },

            ages() {
                return Array.range(1, 99);
            },

            indexes(){
                return this.rows.map((row,index)=>{
                    return index+1;
                });
            }
        },
        created(){

            Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

            const rows = [];

            const chance = new Chance();

            for(let i = 0; i < this.rowCount; i++){
                rows.push([
                    {
                        component:{
                            name:"drag-component",
                            props:{
                                index:i,
                            },

                        }
                    },
                    {
                        text:chance.name({ nationality: 'en' })
                    },
                    {
                        text:chance.age()
                    },
                    {
                        text:chance.city()
                    },
                    {
                        text:chance.profession()
                    },
                    {
                        component:{
                            name:"actions-component",
                            props:{
                                index:i,
                                first:i===0,
                                last:i===this.rowCount -1,
                            },

                        }
                    }
                ]);
            }

            this.rows = rows;
        },
        methods:{

            updateIndexes(){
                this.rows = this.rows.map((row,index)=>{
                    row[5].component.props.index = index;
                    row[5].component.props.first = index === 0;
                    row[5].component.props.last = index === this.rowCount - 1;
                    row[0].component.props.index = index;
                    return row;
                });
            },

            componentListener(data){
                if(data.type === "delete-row"){
                    this.rows.splice(data.index,1);
                    this.rowCount--;
                    this.updateIndexes();
                }else if(data.type === "move-row"){
                    this.move(data.index,data.to);
                }else if(data.type === "dragstart"){
                    this.dragging = true;
                }else if(data.type === "dragend"){
                    this.dragging = false;
                }
            },

             move(old_index, new_index) {
                if (new_index >= this.rows.length) {
                    var k = new_index - this.rows.length + 1;
                    while (k--) {
                        this.rows.push(undefined);
                    }
                }
                this.rows.splice(new_index, 0, this.rows.splice(old_index, 1)[0]);
                this.updateIndexes();

             },
            addRow(){

                if(!this.name || !this.age || !this.city || !this.job){
                     alert("You have to fill out all inputs");
                     return;
                }

                const data = [
                    {
                        component:{
                            name:"drag-component",
                            props:{
                                index:this.index - 1,
                            },

                        }
                    },
                    {
                        text:this.name
                    },
                    {
                        text:this.age
                    },
                    {
                        text:this.city
                    },
                    {
                        text:this.job
                    },
                    {
                        component:{
                            name:"actions-component",
                            props:{
                                index:this.index - 1,
                            },

                        }
                    }
                ];

                if(this.index === this.rowCount){
                    this.rows.push(data);
                }else{
                    this.rows.splice(this.index - 1 , 0, data);
                }

                this.index = 1;
                this.name = "";
                this.age = null;
                this.city = "";
                this.job = "";
                this.rowCount ++;

                this.updateIndexes();

            }
        }
    }
<\/script>

<style>
    .vue-quintable.dragging .vue-quintable-cell{
        position: relative;
    }

    .vue-quintable.dragging .vue-quintable-cell:after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.75);
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 2;
    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element{
        position: relative;
        z-index: 3;

    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element .card{
        background-color: #28a745;
        color: #fff;
    }

</style>`)])])])},function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-component"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
    <div class="content">
        <div class="btn-group me-2">
            <div class="btn btn-info" :disabled="first" :class="{disabled:first}" @click="moveRow('up')">
                <font-awesome-icon icon="chevron-up"></font-awesome-icon>
            </div>
            <div class="btn btn-info" :disabled="last" :class="{disabled:last}" @click="moveRow('down')">
                <font-awesome-icon icon="chevron-down"></font-awesome-icon>
            </div>
       </div>
        <div class="btn btn-danger me-2" @click="deleteRow" title="Delete Row">
            <font-awesome-icon icon="times"></font-awesome-icon>
        </div>

        <drop  class="d-inline-block align-middle drop-element" @drop="handleDrop" title="Drop your dragging row here to move it">
            <div class="card px-3 d-inline-block">
                <div class="py-2 bg-muted">
                    <font-awesome-icon icon="expand"></font-awesome-icon>
                </div>
            </div>
        </drop>
    </div>
</template>


<script>
    import { Drop } from 'vue-drag-drop';

    export default {
        props:{
            first:{
                type:Boolean,
                default:false
            },
            last:{
                type:Boolean,
                default:false
            },
            index:{
                type:Number
            }
        },
        components:{
            Drop
        },
        data(){
            return {
                checked:false,
                reference:"checkbox-component",
            }
        },
        methods: {
            handleDrop(data) {
                this.$emit("action",
                    {
                        index:data.index,
                        type:"move-row",
                        to:this.index
                    }
                )
            },
            moveRow(mode = "up") {

                if(mode === "up" && this.first || mode === "down" && this.last){
                    return;
                }

                this.$emit("action",
                    {
                        index:this.index,
                        type:"move-row",
                        to:mode === "up" ? this.index - 1:this.index + 1
                    }
                )
            },
            deleteRow(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"delete-row",
                    }
                )
            }
        }
    }

<\/script>
<style scoped>
    .btn.disabled{
        cursor: not-allowed;
    }
</style>


`)])])])},function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-component-drag"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
    <drag class="d-inline-block" :transfer-data="{ index: index }" :effect-allowed="['move']"
          drop-effect="move" @dragend="dragend" @dragstart="dragstart">
        <div class="btn  p-2">
            <font-awesome-icon icon="arrows-alt"></font-awesome-icon>
        </div>
    </drag>
</template>
<script>
    import { Drag } from 'vue-drag-drop';

    export default {
        props:{
            index:{
                type:Number
            }
        },
        components:{
            Drag
        },
        methods:{
            dragstart(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"dragstart",
                    }
                );
            },
            dragend(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"dragend",
                    }
                );
            }
        }
    }
<\/script>`)])])])}],as=p(ns,ss,is,!1,null,null,null,null);const os=as.exports,ls={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",showHeadlineBreakpoint:"md",breakpoint:"md"},{headline:"Birth Place",sticky:!0},{headline:"Job",breakpoint:"md",alwaysExpanded:!0}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push({cells:[{text:t.name({nationality:"en"})},{text:t.age(),tooltip:"Age "+s},{text:t.city(),tooltip:"City "+s},{text:t.profession(),tooltip:"Job "+s}],tooltip:"Row "+s});return e}}};var rs=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Hover over rows and cells to see the tooltips ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},cs=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            showHeadlineBreakpoint: "md",
            breakpoint: "md",
          },
          {
            headline: "Birth Place",
            sticky: true,
          },
          {
            headline: "Job",
            breakpoint: "all",
          },
        ],
      },
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push({
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },
            {
              text: chance.age(),
              tooltip: "Age " + i,
            },
            {
              text: chance.city(),
              tooltip: "City " + i,
            },
            {
              text: chance.profession(),
              tooltip: "Job " + i,
            },
          ],
          tooltip: "Row " + i,
        });
      }

      return rows;
    },
  },
};
<\/script>`)])])])}],ds=p(ls,rs,cs,!1,null,null,null,null);const us=ds.exports,hs={components:{VueQuintable:v},data(){return{hideColumns:!0,ignoreSortingColumns:"none",hideAge:!1,hideJob:!1,dynamicConfig:!1,ignoreOptions:[{value:"none",label:"Don't hide hide empty sorting columns"},{value:"active",label:"Don't hide active empty sorting columns"},{value:"all",label:"Hide empty sorting columns"}]}},computed:{config(){return{columns:[{headline:"Name",ignoreEmpty:!0},{headline:"Age",hidden:this.hideAge,breakpoint:"lg"},{headline:"Birth Place",breakpoint:"md",sort:!0},{headline:"Birth country",breakpoint:"lg"},{headline:"Random Word",breakpoint:"xl"},{headline:"Job",hidden:this.hideJob,sticky:!0}],hideEmptyColumns:this.hideColumns,ignoreSortEmptyColumns:this.ignoreSortingColumns,pagination:10}},rows(){let n=20;const e=[],t=new y;for(let s=0;s<n;s++){const i=s<13?"":t.city(),a=s>=9?"":t.country(),o=s>7?"":t.name({nationality:"en"}),r=s<15;e.push([{text:o},{text:t.age()},{text:i},{text:a},{type:"word",isEmpty:r,value:t.word()},{text:t.profession()}])}return e}},watch:{hideColumns(){this.setConfigDynamicForNextTick()},ignoreSortingColumns(){this.setConfigDynamicForNextTick()},hideAge(){this.setConfigDynamicForNextTick()},hideJob(){this.setConfigDynamicForNextTick()}},methods:{setConfigDynamicForNextTick(){this.dynamicConfig=!0,this.$nextTick(()=>{this.dynamicConfig=!1})}}};var ps=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Toggle switches to hide/show columns ")],1),t("VueQuintable",{attrs:{dynamicConfig:e.dynamicConfig,config:e.config,rows:e.rows},scopedSlots:e._u([{key:"header",fn:function(){return[t("div",{staticClass:"mb-3"},[t("p-check",{staticClass:"p-switch",model:{value:e.hideAge,callback:function(s){e.hideAge=s},expression:"hideAge"}},[e._v("Hide Age Column")])],1),t("div",{staticClass:"mb-3"},[t("p-check",{staticClass:"p-switch",model:{value:e.hideJob,callback:function(s){e.hideJob=s},expression:"hideJob"}},[e._v("Hide Job Column")])],1),t("div",{staticClass:"mb-3"},[t("p-check",{staticClass:"p-switch",model:{value:e.hideColumns,callback:function(s){e.hideColumns=s},expression:"hideColumns"}},[e._v("Hide empty columns automatically")])],1),t("div",{staticClass:"mb-3"},[t("v-select",{attrs:{reduce:s=>s.value,options:e.ignoreOptions,clearable:!1},model:{value:e.ignoreSortingColumns,callback:function(s){e.ignoreSortingColumns=s},expression:"ignoreSortingColumns"}})],1)]},proxy:!0},{key:"cell-content",fn:function({cell:s}){return[s.type==="word"?t("div",[e._v(" "+e._s(s.value)+" ")]):e._e()]}}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},fs=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{pre:!0,attrs:{class:"language-markup"}},[n._v(`<template>
  <VueQuintable :dynamicConfig="dynamicConfig" :config="config" :rows="rows">
      <template v-slot:header>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideAge">Hide Age Column</p-check>
        </div>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideJob">Hide Job Column</p-check>
        </div>
        <div class="mb-3">
          <p-check class="p-switch" v-model="hideColumns"
            >Hide empty columns automatically</p-check
          >
        </div>
        <div class="mb-3">
          <v-select
            v-model="ignoreSortingColumns"
            :reduce="(option) => option.value"
            :options="ignoreOptions"
            :clearable="false"
          ></v-select>
        </div>
      </template>
      <template #cell-content="{ cell }">
        <div v-if="cell.type === 'word'">
          {{ cell.value }}
        </div>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      hideColumns: true,
      ignoreSortingColumns: "none",
      hideAge: false,
      hideJob: false,
      dynamicConfig: false,
      ignoreOptions: [
        {
          value: "none",
          label: "Don't hide hide empty sorting columns",
        },
        {
          value: "active",
          label: "Don't hide active empty sorting columns",
        },
        {
          value: "all",
          label: "Hide empty sorting columns",
        },
      ],
    };
  },
  computed: {
    config() {
      return {
        columns: [
          {
            headline: "Name",
            ignoreEmpty: true,
          },
          {
            headline: "Age",
            hidden: this.hideAge,
            breakpoint: "lg",
          },
          {
            headline: "Birth Place",
            breakpoint: "md",
            sort: true,
          },
          {
            headline: "Birth country",
            breakpoint: "lg",
          },
          {
            headline: "Random Word",
            breakpoint: "xl",
          },
          {
            headline: "Job",
            hidden: this.hideJob,
            sticky: true,
          },
        ],
        hideEmptyColumns: this.hideColumns,
        ignoreSortEmptyColumns: this.ignoreSortingColumns,
        pagination: 10,
      };
    },
    rows() {
      let count = 20;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        //first entry with a birth place will be the 13. row
        const city = i < 13 ? "" : chance.city();
        //last entry with a birth place will be the 9. row
        const country = i >= 9 ? "" : chance.country();
        //lase entry with name will be the 8. row
        const name = i > 7 ? "" : chance.name({ nationality: "en" });
        //hide cell thought it has content
        const alwaysHide = i < 15;

        rows.push([
          {
            text: name,
          },
          {
            text: chance.age(),
          },
          {
            text: city,
          },
          {
            text: country,
          },
          {
            type: "word",
            text: "asd",
            isEmpty: alwaysHide,
            value: chance.word(),
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
  watch: {
    hideColumns() {
      this.setConfigDynamicForNextTick();
    },
    ignoreSortingColumns() {
      this.setConfigDynamicForNextTick();
    },
    hideAge() {
      this.setConfigDynamicForNextTick();
    },
    hideJob() {
      this.setConfigDynamicForNextTick();
    },
  },
  methods: {
    setConfigDynamicForNextTick() {
      this.dynamicConfig = true;
      this.$nextTick(() => {
        this.dynamicConfig = false;
      });
    },
  },
};
<\/script>`)])])])}],ms=p(hs,ps,fs,!1,null,null,null,null);const gs=ms.exports,bs={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age"},{headline:"Birth Place"},{headline:"Job"}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:t.profession()}]);return e}}};var ws=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Rows are calculated and passed as a computed property ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},vs=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>

    import Chance from "chance";
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`)])])])}],_s=p(bs,ws,vs,!1,null,null,null,null);const xs=_s.exports,ys={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name",cellFormatter:n=>"Name: "+n.content.name},{headline:"Age",cellFormatter:n=>({value:"<strong>"+n.content.age+"</strong>",type:"html"})},{headline:"Birth Place",cellFormatter:n=>n.content.city},{headline:"Job",cellFormatter:n=>n.content.profession}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++){const i={name:t.name({nationality:"en"}),age:t.age(),city:t.city(),profession:t.profession()};e.push([{content:i},{content:i},{content:i},{content:i}])}return e}}};var Cs=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Cells will be formatted by custom formatting functions ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Ss=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>

<script>

    import VueQuintable from "../components/VueQuintable.vue"

    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                            cellFormatter:(cell)=>{
                                return "Name: " +  cell.content.name
                            }
                        }, {
                            headline: "Age",
                            cellFormatter:(cell)=>{
                                return {
                                    value:"<strong>"+cell.content.age+"</strong>",
                                    type:"html",
                                }
                            }
                        }, {
                            headline: "Birth Place",
                            cellFormatter:(cell)=>{
                                return cell.content.city
                            }
                        }, {
                            headline: "Job",
                            cellFormatter:(cell)=>{
                                return cell.content.profession
                            }
                        }
                    ],
                },

             }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();



                for(let i = 0; i < count; i++){

                    const row = {
                        name:chance.name({ nationality: 'en' }),
                        age:chance.age(),
                        city:chance.city(),
                        profession:chance.profession(),
                    };

                    rows.push([
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>
`)])])])}],Rs=p(ys,Cs,Ss,!1,null,null,null,null);const ks=Rs.exports;k.interceptors.request.use(n=>(console.warn("Custom axios",n),n),n=>{console.log("ERROR AXIOS",n)});const Fs={components:{VueQuintable:v},data(){return{axios:k,ajaxConfig:{columns:[{headline:"Name",sort:!0},{headline:"Email",breakpoint:"sm",sort:!0},{headline:"Phone",breakpoint:"md"},{headline:"Job Title",breakpoint:"md",sort:!0},{headline:"City",breakpoint:"md"},{headline:"Address",breakpoint:"md"}],pagination:5,search:!0,pageSortSelect:!0,ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php",requestMethod:"POST"}}},methods:{rowsUpdated(n){n.rows.length&&alert("Rows updated from server: "+n.rows.length+" rows.")}}};var qs=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Pagination and sorting will be handled by server side via ajax ")],1),t("VueQuintable",{attrs:{axios:e.axios,config:e.ajaxConfig},on:{"ajax:rows":e.rowsUpdated}}),t("button",{staticClass:"btn btn-secondary mt-3",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Ps=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[n._v("           "),e("code",{staticClass:"language-markup"},[n._v(`
      <template>
              <VueQuintable :axios="axios" :config="ajaxConfig" @ajax:rows="rowsUpdated"></VueQuintable>
      </template>

      <script>

          import VueQuintable from "../components/VueQuintable.vue"
          export default {
              components:{
                VueQuintable
              },
              data() {
                  return {
                      ajaxConfig: {
                          columns: [
                              {
                                  headline: "Name",
                                  sort: true,
                              }, {
                                  headline: "Email",
                                  breakpoint: "sm",
                                  sort: true,
                              }, {
                                  headline: "Phone",
                                  breakpoint: "md",
                              }, {
                                  headline: "Job Title",
                                  breakpoint: "md",
                                  sort: true,
                              }, {
                                  headline: "City",
                                  breakpoint: "md",
                              }, {
                                  headline: "Address",
                                  breakpoint: "md",

                              }
                          ],
                          pagination:5,
                          pageSortSelect:true,
                          ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php",
                          requestMethod: "POST",
                      },
                  }
              },
              methods:{
                  rowsUpdated(rows){
                      if(rows.length){
                          alert("Rows updated from server: "+rows.length +" rows.")
                      }
                  },
              }
          }

      <\/script>
  `)]),n._v(`
      `)])])}],$s=p(Fs,qs,Ps,!1,null,null,null,null);const As=$s.exports;k.interceptors.request.use(n=>(console.warn("Custom axios",n),n),n=>{console.log("ERROR AXIOS",n)});const Vs={components:{VueQuintable:v},data(){return{axios:k,selectedRows:[],allSelectedRows:{},preSelectedRowIds:[],preSelectedRows:[],ajaxRows:[],ajaxConfig:{columns:[{headline:"Name"},{headline:"Email",breakpoint:"sm"},{headline:"Phone",breakpoint:"md"},{headline:"Job Title",breakpoint:"md"},{headline:"City",breakpoint:"md"},{headline:"Address",breakpoint:"md"}],pagination:5,select:!0,selectPosition:"pre",selectAll:!0,prettySelect:!0,ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php/",pageChanged:!1}}},watch:{selectedRows(n){if(!this.pageChanged&&this.ajaxRows){for(let e=0;e<n.length;e++)this.preSelectedRowIds.includes(n[e].id)||(this.preSelectedRowIds.push(n[e].id),this.$set(this.allSelectedRows,n[e].id,n[e]));for(let e=0;e<this.ajaxRows.length;e++){const t=this.ajaxRows[e].id,s=this.preSelectedRowIds.indexOf(t);!n.map(i=>i.id).includes(t)&&s!==-1&&(this.preSelectedRowIds.splice(s,1),this.$delete(this.allSelectedRows,t))}}}},methods:{clearSelection(){this.allSelectedRows={},this.preSelectedRows=[],this.preSelectedRowIds=[]},rowsUpdated(n){this.pageChanged=!1,n&&n.rows&&n.rows.length&&this.$nextTick(()=>{this.preSelectedRows=this.preSelectedRowIds.map(e=>({key:"id",value:e}))}),this.ajaxRows=n.rows},onPageChange(){this.pageChanged=!0}}};var js=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Selecting rows will be persistent, even if pages are changes via ajax ")],1),t("VueQuintable",{attrs:{"selected-rows":e.selectedRows,"pre-selected-rows":e.preSelectedRows,axios:e.axios,config:e.ajaxConfig},on:{"update:selectedRows":function(s){e.selectedRows=s},"update:selected-rows":function(s){e.selectedRows=s},"update:page":e.onPageChange,"ajax:rows":e.rowsUpdated}}),e.preSelectedRowIds.length?t("p",[t("strong",[e._v("Selected Rows:")])]):e._e(),t("div",{staticClass:"list-group"},e._l(e.preSelectedRowIds,function(s){return t("div",{key:s,staticClass:"list-group-item"},[e._v(" "+e._s(e.allSelectedRows[s].cells[0].html)+" ")])}),0),e.preSelectedRowIds.length?t("div",{staticClass:"btn btn-danger mt-2",on:{click:e.clearSelection}},[e._v(" Clear ")]):e._e(),t("div",{staticClass:"clearfix"}),t("button",{staticClass:"btn btn-secondary mt-3",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Es=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[n._v("             "),e("code",{pre:!0,attrs:{class:"language-markup"}},[n._v(`
        <template>
           <VueQuintable
            :selected-rows.sync="selectedRows"
            :pre-selected-rows="preSelectedRows"
            :axios="axios"
            :config="ajaxConfig"
            @update:page="onPageChange"
            @ajax:rows="rowsUpdated"
          />

          <p v-if="preSelectedRowIds.length">
            <strong>Selected Rows:</strong>
          </p>
          <div class="list-group">
            <div class="list-group-item" v-for="id in preSelectedRowIds" :key="id">
              {{ allSelectedRows[id].cells[0].html }}
            </div>
          </div>
          <div
            class="btn btn-danger mt-2"
            v-if="preSelectedRowIds.length"
            @click="clearSelection"
          >
            Clear
          </div>
          <div class="clearfix"></div>
        </template>

        <script>
import VueQuintable from "../components/VueQuintable.vue";
import axiosCustom from "axios";

axiosCustom.interceptors.request.use(
  (config) => {
    console.warn("Custom axios", config);

    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  }
);

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      axios: axiosCustom,
      selectedRows: [],
      allSelectedRows: {},
      preSelectedRowIds: [],
      preSelectedRows: [],
      ajaxRows: [],
      ajaxConfig: {
        //Object[] columns with headline, sticky, breakpoint, align, sort
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Email",
            breakpoint: "sm",
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
          },
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        select: true,
        selectPosition: "pre",
        selectAll: true,
        prettySelect: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php/",
        pageChanged: false,
      },
    };
  },

  watch: {
    selectedRows(rows) {
      if (!this.pageChanged && this.ajaxRows) {
        for (let i = 0; i < rows.length; i++) {
          if (!this.preSelectedRowIds.includes(rows[i].id)) {
            this.preSelectedRowIds.push(rows[i].id);
            this.$set(this.allSelectedRows, rows[i].id, rows[i]);
          }
        }

        for (let j = 0; j < this.ajaxRows.length; j++) {
          const id = this.ajaxRows[j].id;

          const index = this.preSelectedRowIds.indexOf(id);

          if (!rows.map((r) => r.id).includes(id) && index !== -1) {
            this.preSelectedRowIds.splice(index, 1);
            this.$delete(this.allSelectedRows, id);
          }
        }
      }
    },
  },
  methods: {
    clearSelection() {
      this.allSelectedRows = {};
      this.preSelectedRows = [];
      this.preSelectedRowIds = [];
    },
    rowsUpdated(data) {
      this.pageChanged = false;
      if (data && data.rows && data.rows.length) {
        this.$nextTick(() => {
          this.preSelectedRows = this.preSelectedRowIds.map((id) => {
            return {
              key: "id",
              value: id,
            };
          });
        });
      }

      this.ajaxRows = data.rows;
    },
    onPageChange() {
      this.pageChanged = true;
    },
  },
};
<\/script>
    `)]),n._v(`
        `)])])}],Os=p(Vs,js,Es,!1,null,null,null,null);const Is=Os.exports,Ns={components:{VueQuintable:v},data(){return{config:{expandedRowIcon:"caret-up",collapsedRowIcon:"plus",columns:[{headline:"Name"},{headline:"Age",showHeadlineBreakpoint:"md",breakpoint:"md"},{headline:"Birth Place",sticky:!0,sort:!0},{headline:"Description",hideHeadlineBreakpoint:"xxl",sticky:!0},{headline:"Job",breakpoint:"all"}]}}},computed:{rows(){let n=10;const e=[],t=new y;for(let s=0;s<n;s++)e.push([{text:t.name({nationality:"en"})},{text:t.age()},{text:t.city()},{text:[...Array(50).keys()].map(()=>t.word()).join(" ")},{text:t.profession()}]);return e}}};var Ls=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Resize your brower window to see responsive behaviour ")],1),t("VueQuintable",{attrs:{config:e.config,rows:e.rows}}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Qs=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>
<script>
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    expandedRowIcon: "caret-up",
                    collapsedRowIcon: "caret-down",
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                            showHeadlineBreakpoint:"md",
                        }, {
                            headline: "Birth Place",
                            sticky: true,
                            sort: true,
                        }, {
                            headline: "Job",
                            breakpoint: "all"
                        }
                    ],
                },
            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:chance.city()
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
<\/script>`)])])])}],Bs=p(Ns,Ls,Qs,!1,null,null,null,null);const Ts=Bs.exports,Ds={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name"},{headline:"Age",sort:!0},{headline:"Birth Place"},{headline:"Job"},{headline:"Active"}],pagination:5,selectAllRows:!0,pageRange:3,rowsSelect:!0,search:!0,select:!0,prettySelect:!0,storeState:!0},activeOptions:[{label:"All",value:"both"},{label:"Only Active",value:!0},{label:"Only Not Active",value:!1}],active:"both",identifier:"stored-state-table",filters:{},selected:[],rows:[]}},created(){let n=null;try{n=localStorage.getItem("stored-state-table-stored-rows")?JSON.parse(localStorage.getItem("stored-state-table-stored-rows")):null}catch{}if(n)this.rows=n;else{let e=250;const t=[],s=new y;for(let i=0;i<e;i++){const o=Math.random()>=.5;t.push({filters:{active:o},cells:[{text:s.name({nationality:"en"})},{text:s.age()},{text:s.city()},{text:s.profession()},{text:o?"Yes":"No"}]})}this.rows=t;try{localStorage.setItem("stored-state-table-stored-rows",JSON.stringify(t))}catch{}}},watch:{active(){this.active==="both"?this.$delete(this.filters,"active"):this.$set(this.filters,"active",this.active)},filters(){typeof this.filters.active>"u"?this.active="both":this.filters.active!==this.active&&(this.active=this.filters.active)}}};var Ms=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Do some filtering/sorting/selecting and then reload the page, state stays the same ")],1),t("VueQuintable",{attrs:{config:e.config,filters:e.filters,selectedRows:e.selected,rows:e.rows,identifier:e.identifier},on:{"update:filters":function(s){e.filters=s},"update:selectedRows":function(s){e.selected=s},"update:selected-rows":function(s){e.selected=s}},scopedSlots:e._u([{key:"header",fn:function(){return[t("v-select",{staticClass:"mb-3",attrs:{options:e.activeOptions,reduce:s=>s.value,clearable:!1},model:{value:e.active,callback:function(s){e.active=s},expression:"active"}})]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Hs=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
         <VueQuintable
      :config="config"
      :filters.sync="filters"
      :selectedRows.sync="selected"
      :rows="rows"
      :identifier="identifier"
    >
      <template #header>
        <v-select
          v-model="active"
          :options="activeOptions"
          :clearable="false"
          :reduce="(x) => x.value"
          class="mb-3"
        ></v-select>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

import Chance from "chance";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
            sort: true,
          },

          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
          {
            headline: "Active",
          },
        ],
        pagination: 5,
        selectAllRows: true,
        pageRange: 3,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
      },
      activeOptions: [
        { label: "All", value: "both" },
        { label: "Only Active", value: true },
        { label: "Only Not Active", value: false },
      ],
      active: "both",
      identifier: "stored-state-table",
      filters: {},
      selected: [],
      rows: [],
    };
  },

  created() {
    let storedRows = null;

    try {
      storedRows = localStorage.getItem("stored-state-table-stored-rows")
        ? JSON.parse(localStorage.getItem("stored-state-table-stored-rows"))
        : null;
    } catch (e) {
      //do nothing
    }

    if (!storedRows) {
      let count = 250;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const active = rand >= 0.5;
        rows.push({
          filters: {
            active,
          },
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },

            {
              text: chance.age(),
            },
            {
              text: chance.city(),
            },
            {
              text: chance.profession(),
            },
            {
              text: active ? "Yes" : "No",
            },
          ],
        });
      }
      this.rows = rows;
      try {
        localStorage.setItem(
          "stored-state-table-stored-rows",
          JSON.stringify(rows)
        );
      } catch (e) {
        //do nothing
      }
    } else {
      this.rows = storedRows;
    }
  },
  watch: {
    active() {
      if (this.active === "both") {
        this.$delete(this.filters, "active");
      } else {
        this.$set(this.filters, "active", this.active);
      }
    },
    filters() {
      if (typeof this.filters.active === "undefined") {
        this.active = "both";
      } else if (this.filters.active !== this.active) {
        this.active = this.filters.active;
      }
    },
  },
};
<\/script>`)])])])}],Us=p(Ds,Ms,Hs,!1,null,null,null,null);const Js=Us.exports,Gs={components:{VueQuintable:v},data(){return{config:{columns:[{headline:"Name",sort:!0},{headline:"Email",breakpoint:"sm",sort:!0},{headline:"Phone",breakpoint:"md"},{headline:"Job Title",breakpoint:"md",sort:!0},{headline:"City",breakpoint:"md"},{headline:"Address",breakpoint:"md"}],pagination:5,rowsSelect:!0,search:!0,select:!0,prettySelect:!0,storeState:!0,ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php"},indexesOptions:[{label:"All",value:"all"},{label:"Bigger than 100",value:"bigger"},{label:"Smaller than 100",value:"smaller"}],indexes:"all",identifier:"stored-state-table-ajax",filters:{},selected:[],rows:[]}},watch:{indexes(){this.indexes==="all"?(this.$delete(this.filters,"bigger"),this.$delete(this.filters,"smaller")):this.indexes==="bigger"?(this.$set(this.filters,"bigger",!0),this.$delete(this.filters,"smaller")):this.indexes==="smaller"&&(this.$set(this.filters,"smaller",!0),this.$delete(this.filters,"bigger"))},filters(){typeof this.filters.smaller>"u"&&typeof this.filters.bigger>"u"?this.indexes="all":this.filters.smaller?this.indexes="smaller":this.filters.bigger&&(this.indexes="bigger")}}};var zs=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("p",{staticClass:"alert alert-info"},[t("font-awesome-icon",{staticClass:"me-2",attrs:{icon:"info-circle"}}),e._v(" Do some filtering/sorting/selecting and then reload the page, state stays the same ")],1),t("VueQuintable",{attrs:{config:e.config,filters:e.filters,selectedRows:e.selected,rows:e.rows,identifier:e.identifier},on:{"update:filters":function(s){e.filters=s},"update:selectedRows":function(s){e.selected=s},"update:selected-rows":function(s){e.selected=s}},scopedSlots:e._u([{key:"header",fn:function(){return[t("v-select",{staticClass:"mb-3",attrs:{options:e.indexesOptions,reduce:s=>s.value,clearable:!1},model:{value:e.indexes,callback:function(s){e.indexes=s},expression:"indexes"}})]},proxy:!0}])}),t("button",{staticClass:"btn btn-secondary",attrs:{"data-bs-toggle":"collapse","data-bs-target":"#code-basic"}},[t("font-awesome-icon",{attrs:{icon:"chevron-up"}}),t("font-awesome-icon",{attrs:{icon:"chevron-down"}}),t("span",{staticClass:"show ms-2"},[e._v("Show")]),t("span",{staticClass:"hide ms-2"},[e._v("Hide")]),e._v(" Code ")],1),e._m(0)],1)},Ks=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"mt-2 collapse show",attrs:{id:"code-basic"}},[e("pre",{attrs:{"data-toolbar-order":"copy-to-clipboard"}},[e("code",{staticClass:"language-markup"},[n._v(`<template>
        <VueQuintable
      :config="config"
      :filters.sync="filters"
      :selectedRows.sync="selected"
      :rows="rows"
      :identifier="identifier"
    >
      <template #header>
        <v-select
          v-model="indexes"
          :options="indexesOptions"
          :clearable="false"
          :reduce="(x) => x.value"
          class="mb-3"
        ></v-select>
      </template>
    </VueQuintable>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
            sort: true,
          },
          {
            headline: "Email",
            breakpoint: "sm",
            sort: true,
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
            sort: true,
          },
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
      },
      indexesOptions: [
        { label: "All", value: "all" },
        { label: "Bigger than 100", value: "bigger" },
        { label: "Smaller than 100", value: "smaller" },
      ],
      indexes: "all",
      identifier: "stored-state-table-ajax",
      filters: {},
      selected: [],
      rows: [],
    };
  },
  watch: {
    indexes() {
      if (this.indexes === "all") {
        this.$delete(this.filters, "bigger");
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "bigger") {
        this.$set(this.filters, "bigger", true);
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "smaller") {
        this.$set(this.filters, "smaller", true);
        this.$delete(this.filters, "bigger");
      }
    },
    filters() {
      if (
        typeof this.filters.smaller === "undefined" &&
        typeof this.filters.bigger === "undefined"
      ) {
        this.indexes = "all";
      } else if (this.filters.smaller) {
        this.indexes = "smaller";
      } else if (this.filters.bigger) {
        this.indexes = "bigger";
      }
    },
  },
};
<\/script>`)])])])}],Ws=p(Gs,zs,Ks,!1,null,null,null,null);const Ys=Ws.exports;const Xs=""+new URL("banner-0488777d.png",import.meta.url).href;k.interceptors.request.use(n=>(console.warn("Custom axios",n),n),n=>{console.log("ERROR AXIOS",n)});const Zs={name:"app",components:{BasicExample:Tt,BreakpointsExample:rn,AjaxSelectExample:Is,BreakpointsAdvancedExample:Ts,AjaxExample:As,AjaxLoadedExample:Cn,PaginationExample:Yt,SortExample:nn,BindedExample:pn,TooltipsExample:us,SelectExample:Jt,FiltersExample:qn,ComponentsExample:Nn,EventsExample:wn,NestedExample:Dn,SlotsExample:Gn,HiddenExample:gs,AddRemoveExample:os,ComputedRowsExample:xs,CellFormattersExample:ks,StoreStateExample:Js,AjaxStoreStateExample:Ys},data(){return{example:{value:"BasicExample",label:"Basic Example"},examples:[{value:"BasicExample",label:"Basic Example"},{value:"ComputedRowsExample",label:"Computed Rows Example"},{value:"PaginationExample",label:"Pagination Example"},{value:"SortExample",label:"Sort Example"},{value:"SelectExample",label:"Select Example"},{value:"CellFormattersExample",label:"Cell Formatters Example"},{value:"BreakpointsExample",label:"Breakpoints Example"},{value:"BreakpointsAdvancedExample",label:"Breakpoints Advanced Example"},{value:"TooltipsExample",label:"Tooltips"},{value:"AjaxExample",label:"Ajax Example"},{value:"AjaxSelectExample",label:"Ajax + Select Example"},{value:"AjaxLoadedExample",label:"Ajax Loaded Example"},{value:"EventsExample",label:"Events Example"},{value:"SlotsExample",label:"Slots Example"},{value:"BindedExample",label:"Vue-binded Example"},{value:"FiltersExample",label:"Filter Example"},{value:"ComponentsExample",label:"Component Example"},{value:"HiddenExample",label:"Hide/Show Example"},{value:"AddRemoveExample",label:"Add/Remove/Move Example"},{value:"NestedExample",label:"Nested Example"},{value:"StoreStateExample",label:"Store State"},{value:"AjaxStoreStateExample",label:"Ajax Store State"}]}},watch:{example:{handler(){this.$nextTick(()=>{re.highlightAll()})},immediate:!0}},created(){re.manual=!0}};var ei=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"container py-5"},[e._m(0),t("div",{staticClass:"row"},[t("div",{staticClass:"col-12"},[t("v-select",{staticClass:"mb-3",attrs:{clearable:!1,options:e.examples},model:{value:e.example,callback:function(s){e.example=s},expression:"example"}}),t("div",{staticClass:"example-content"},[t(e.example.value,{tag:"component"})],1)],1)])])])},ti=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"text-center"},[e("img",{attrs:{alt:"VueQuintable Logo",title:"VueQuintable Logo",src:Xs,width:"400",height:"300"}}),e("h1",{staticClass:"mb-4"},[n._v("VueQuintable Demo")])])])])}],ni=p(Zs,ei,ti,!1,null,null,null,null);const si=ni.exports;R.config.productionTip=!1;w.add(we);w.add(ve);w.add(_e);w.add(xe);w.add(ye);w.add(Ce);w.add(Se);w.add(Re);w.add(ke);w.add(Fe);w.add(qe);w.add(Pe);w.add($e);w.add(Ae);w.add(Ve);w.add(je);w.add(Ee);w.add(Oe);w.add(Ie);w.add(Ne);w.add(Le);w.add(Qe);R.component("v-select",Be);R.component("p-check",Te);R.component("p-radio",De);R.component("font-awesome-icon",Me);R.use(He,{defaultTemplate:'<div class="quintable-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',defaultClass:""});new R({render:n=>n(si)}).$mount("#app");
