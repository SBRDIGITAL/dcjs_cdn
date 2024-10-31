var DataCollectorEngine;(()=>{"use strict";var t,e,o,i,n={14:(t,e,o)=>{o.d(e,{LT:()=>i,bO:()=>r});const i={AddProductToCart:"ДОБАВИЛ ТОВАР В КОРЗИНУ",PlaceOrder:"СДЕЛАЛ ЗАКАЗ",SubmitApplication:"ОСТАВИЛ ЗАЯВКУ",RemoveProductFromCart:"УДАЛИЛ ТОВАР ИЗ КОРЗИНЫ",RemoveAllFromCart:"ОЧИСТИЛ КОРЗИНУ",StartCall:"НАЧАЛ ЗВОНОК",SubmitFeedback:"ОСТАВИЛ ОТЗЫВ",UserSuccesAuth:"УСПЕШНО АВТОРИЗОВАЛСЯ"},n="POST";const s=new class{constructor(){this.apiUrl="https://sbrdigital.pro/",this.dataPath="user_info/"}},r={init:{endpoint:"init",method:"GET"},entry:{endpoint:"entry",method:n},sourceDomain:{endpoint:"source_domain",method:n},recordAction:{endpoint:"record_action",method:n},addCartInfo:{endpoint:"add_cart_info",method:n},trackTimeSpent:{endpoint:"track_time_spent",method:n},authHandler:{endpoint:"auth_handler",method:n}};!function(t,e){for(let o in e)e.hasOwnProperty(o)&&(e[o].url=`${t.apiUrl}${t.dataPath}${e[o].endpoint}`)}(s,r)},879:(t,e,o)=>{o.d(e,{tj:()=>c,ZK:()=>l});var i=o(14),n=o(592),s=o(335),r=o(998);class a{constructor(){this.toCartBtnClassSelectorWithoutDot="to-cart",this.endpoint="addCartInfo"}async getTotalPrice(t){let e=null;if(t){let o=t.querySelector("div.wrap_total");if(o){let t=o.querySelector("div.price");if(t){let o=t.textContent.trim();e=Number(o.replace(/[^\d]/g,"")),isNaN(e)?console.log("Не удалось преобразовать стоимость в число."):console.log(`Общая стоимость корзины: ${e} ₽`)}else console.log("Элемент с ценой не найден внутри wrap_total.")}else console.log("Элемент wrap_total не найден.")}else console.log("Форма с id #basket_form не найдена.");return e}async waitForDOMChange(t){return new Promise((e=>{new MutationObserver(((t,o)=>{o.disconnect(),e()})).observe(t,{childList:!0,subtree:!0})}))}async trackingCartItems(){let t=document.querySelector("form#basket_form");if(t){t.style.visibility="visible",await this.waitForDOMChange(t);let e=t.querySelectorAll("div.product_name");console.log(`basketItemsElements: ${e.length} товаров найдено`);let o=[],i=await this.getTotalPrice(t);if(e.length>0)for(let t of e){let e=t.querySelector("a");e&&o.push(e.textContent.trim())}return console.log("Массив с названиями товаров:"),console.log(o),console.log("totalPrice"),console.log(i),{productNames:o,totalPrice:i}}return console.log("Форма с id #basket_form не найдена."),null}async#t(t,e){const o=n.I.getEndpoingInfo(this.endpoint),i={item_names:t,amount:e},r=await s.N.sendRequest(o,i);r?console.log("Событие успешно сохранено:",r.message):console.error("Ошибка при сохранении события.")}async checkAddToCartBtn(t){if(r.c.ifElementContainsClass(t,this.toCartBtnClassSelectorWithoutDot)){let t=[],e=null;for(let o=0;o<3;o++){await(0,r.L)(500);let o=await this.trackingCartItems();t=o.productNames,e=o.totalPrice,await(0,r.L)(1500)}t.length>0&&e&&await this.#t(t,e)}}async startTrack(t){await this.checkAddToCartBtn(t)}}class c{static async recordAction(t,e="recordAction"){const o=window.location.href,i=n.I.getEndpoingInfo(e),r={event_url:{url:o},event:{event_name:t}},a=await s.N.sendRequest(i,r);a?console.log("Событие успешно сохранено:",a.message):console.error("Ошибка при сохранении события.")}static async dcAttributesSet(t,e="data-collector-inited",o="true"){t.setAttribute(e,o)}}const l=new class{constructor(){this.dcInitedAttr="data-collector-inited",this.setIntervalPauseMs=100,this.cartInfoTracker=new a,this.toCartBtnClassSelectorWithoutDot=this.cartInfoTracker.toCartBtnClassSelectorWithoutDot,this.endpoint="recordAction",this.cartButtons=null,this.removeButtons=null,this.createOrderBtn=document.querySelector("div#bx-soa-orderSave"),this.oneClickBuyButton=document.querySelector("button#one_click_buy_form_button"),this.callbackButton=document.evaluate("//span[text()='Заказать звонок']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}async recordAction(t,e){await c.recordAction(t,e)}async initButtonTracking(t,e,o,i){t?t.addEventListener("click",(async n=>{await r.c.ifElementContainsClass(t,this.toCartBtnClassSelectorWithoutDot)?(console.log("Это кнопка добавления товара в корзину"),await this.cartInfoTracker.startTrack(t),await this.recordAction(e)):await this.recordAction(e).then((()=>{console.log(o)})).catch((t=>{console.error(i,t)}))})):console.error("Кнопка не найдена.")}async initCreateOrderButton(){await this.initButtonTracking(this.createOrderBtn,i.LT.PlaceOrder,"Заказ успешно оформлен.","Ошибка при оформлении заказа:")}async initRemoveButtons(){return new Promise((t=>{setInterval((async()=>{this.removeButtons=document.querySelectorAll('span[data-entity="basket-item-delete"]'),this.removeButtons.length>0&&(this.removeButtons.forEach((t=>{this.initButtonTracking(t,i.LT.RemoveProductFromCart,"Товар удален из корзины.","Ошибка при удалении товара из корзины:")})),t())}),this.setIntervalPauseMs)}))}async initCartButtons(){const t=setInterval((async()=>{if(this.cartButtons=document.querySelectorAll(`.${this.toCartBtnClassSelectorWithoutDot}`),this.cartButtons.length>0){for(const t of this.cartButtons){const e=`Товар с ID ${t.getAttribute("data-item")} добавлен в корзину.`;t.hasAttribute(this.dcInitedAttr)||(await this.initButtonTracking(t,i.LT.AddProductToCart,e,"Ошибка при добавлении товара в корзину:"),await c.dcAttributesSet(t,this.dcInitedAttr))}clearInterval(t)}console.log(`*****************************\nКнопок для добавления товаров в корзину ${this.cartButtons.length}\n*****************************`)}),this.setIntervalPauseMs+100)}async initOneClickBuy(){await this.initButtonTracking(this.oneClickBuyButton,i.LT.PlaceOrder,"Выполнен заказ в 1 клик","Ошибка при выполнении заказа в 1 клик")}async initCallbackFormTracking(){this.callbackButton&&this.callbackButton.addEventListener("click",(async()=>{await this.addSubmitButtonListener()}))}async addSubmitButtonListener(){const t=setInterval((async()=>{const e=document.querySelector('form[name="CALLBACK_RkUzu"]');if(e){const o=e.querySelector('button[type="submit"]')||e.querySelector('button[type="button"]');if(o){console.log(`Мы нашли кнопку отправки заявки: ${o}`);try{console.log("Добавили слушатель нажатия на кнопку"),await this.initButtonTracking(o,i.LT.SubmitApplication,"Оставлена заявка","Ошибка при оставлении заявки")}catch(t){console.error("Произошла ошибка:",t)}clearInterval(t)}}}),this.setIntervalPauseMs)}async addSubmitButtonListeners(){const t=/SERVICES_/;document.querySelectorAll("form").forEach((e=>{if(t.test(e.name)){const t=e.querySelector('button[type="submit"]')||e.querySelector('button[type="button"]');t&&(console.log(`Мы нашли кнопку отправки заявки: ${t}`),t.addEventListener("click",(async e=>{e.preventDefault();try{await this.initButtonTracking(t,i.LT.SubmitApplication,"Оставлена заявка","Ошибка при оставлении заявки")}catch(t){console.error("Произошла ошибка:",t)}})))}}))}async initDeleteAllFromBasketBtn(){const t=document.querySelector("div#basket-root");if(t){const e=t.querySelector("span.delete_all");if(e)try{console.log(`Добавили слушатель нажатия на кнопку deleteAllSpan: ${e}`),await this.initButtonTracking(e,i.LT.RemoveAllFromCart,"Корзина очищена","Ошибка при очистке корзины")}catch(t){console.error("Произошла ошибка:",t)}}}async initFastOrderFromBasketForm(){return new Promise((t=>{setInterval((async()=>{const e=document.querySelector("form#basket_form");if(e){const o=e.querySelector("div.basket_fast_order");if(o){console.log(`Мы нашли кнопку быстрог заказа в корзине: ${o}`);try{o.hasAttribute(this.dcInitedAttr)||(await this.initButtonTracking(o,i.LT.PlaceOrder,"Оформлен быстрый заказ","Ошибка при оформлении быстрого заказазаявки"),await c.dcAttributesSet(o,this.dcInitedAttr),console.log(`Добавили слушатель нажатия на кнопку fastOrderBtn: ${o}`))}catch(t){console.error("Произошла ошибка:",t)}t()}}}),this.setIntervalPauseMs)}))}async initCallButtonTracking(){if(document.querySelector("div.phone-block")){const t=document.querySelector('a[rel="nofollow"]');t&&await this.initButtonTracking(t,i.LT.StartCall,"Начало звонка зафиксировано.","Ошибка при фиксации начала звонка.")}}async initFeedbackButtonTracking(){const t=document.querySelector('[data-param-form_id="FEEDBACK_GK"]');await this.initButtonTracking(t,i.LT.SubmitFeedback,"Отзыв успешно оставлен.","Ошибка при оставлении отзыва:")}async initActionTrackers(){await this.addSubmitButtonListeners(),await this.initCartButtons(),await this.initDeleteAllFromBasketBtn(),await this.initRemoveButtons(),await this.initCreateOrderButton(),await this.initOneClickBuy(),await this.initCallbackFormTracking(),await this.initCallButtonTracking(),await this.initFeedbackButtonTracking(),await this.initFastOrderFromBasketForm()}}},819:(t,e,o)=>{o.d(e,{d:()=>c});var i=o(18),n=o(879),s=o(14),r=o(592),a=o(335);const c=new class{constructor(){this.LSAuthInfoKey="bx-compositeCache",this.userIdKey="USER_ID",this.dcSendedKey="DC_AUTH_INFO_SENDED",this.isUserAuthDcInfoValue=!0,this.checkInterval=200,this.endpoint="authHandler"}async setDcInfoSendedLsKey(t=!1){i.S.setItem(this.dcSendedKey,t)}async getLsInfo(){let t=null;const e=i.S.getItem(this.LSAuthInfoKey)||null,o=i.S.getItem(this.dcSendedKey)||"false";if(e&&"string"==typeof e){const o=e.indexOf(":");if(-1!==o){const i=e.substring(o+1);try{t=JSON.parse(i)}catch(t){console.error("Ошибка при разборе JSON:",t)}}}else console.error("Двоеточие не найдено в строке:",e);return{result:t,sendedInfo:o}}async checkUserId(){let{result:t,sendedInfo:e}=await this.getLsInfo();if(!t)return null;{let o=t[this.userIdKey]||"";if(""===o)return null;if(console.log("Юзер айди не пустой!"),"false"===e)return{uID:o,sended:!1};if(e&&"true"===e)return{uID:o,sended:!0}}}async#e(t){try{await n.tj.recordAction(s.LT.UserSuccesAuth);const e=r.I.getEndpoingInfo(this.endpoint);console.log("Информация об ендпоинте"),console.log(e);const o={cms_user_id:Number(t)};await a.N.sendRequest(e,o)}catch(t){console.error("При отправке запроса возникла ошибка:",t)}}async sendInfo(){const t=setInterval((async()=>{let e=await this.checkUserId();if(e&&"object"==typeof e){let{uID:o,sended:i}=e;!0===i?(console.log("Информация о пользователе уже отправлена. Завершение цикла."),clearInterval(t)):!1===i&&(await this.#e(o),await this.setDcInfoSendedLsKey(this.isUserAuthDcInfoValue),console.log("Информация о пользователе отправлена на сервер."))}}),this.checkInterval)}async start(){await this.sendInfo()}}},992:(t,e,o)=>{o.d(e,{c:()=>s});var i=o(592),n=o(335);async function s(t="init",e=2){let o=i.I.getEndpoingInfo(t);const s={};for(let t=0;t<e;t++)return await n.N.sendRequest(o,s)}},28:(t,e,o)=>{o.d(e,{H:()=>r});var i=o(18),n=o(335),s=o(592);class r{constructor(){this.visitsKey="pageVisits",this.checkInterval=3e3,this.endpoint="trackTimeSpent",this.visits=this.loadVisitsFromLocalStorage(),this.currentVisit=null}loadVisitsFromLocalStorage(){const t=i.S.getItem(this.visitsKey);return t?JSON.parse(t):[]}saveVisitsToLocalStorage(){i.S.setItem(this.visitsKey,JSON.stringify(this.visits))}startVisit(t){this.currentVisit&&this.endVisit(),this.currentVisit={url:t,startTime:performance.now()}}endVisit(){if(this.currentVisit){const t=Math.round((performance.now()-this.currentVisit.startTime)/1e3),e=(new Date).toISOString(),o=this.visits.findIndex((t=>t.url===this.currentVisit.url));-1!==o?this.visits[o].duration+=t:this.visits.push({url:this.currentVisit.url,visit_time:e,duration:t}),this.saveVisitsToLocalStorage(),this.currentVisit=null}}async sendVisits(){if(0===this.visits.length)return;const t=s.I.getEndpoingInfo(this.endpoint),e={visits_info:this.visits};try{await n.N.sendRequest(t,e),console.log("Информация о посещенных страницах успешно отправлена на сервер.")}catch(t){console.error("Ошибка при отправке данных на сервер:",t)}}startTracking(){this.startVisit(window.location.href),setInterval((()=>{this.endVisit(),this.startVisit(window.location.href),this.sendVisits()}),this.checkInterval),window.onpopstate=()=>{this.startVisit(window.location.href)};const t=history.pushState;history.pushState=(...e)=>{t.apply(history,e),this.startVisit(window.location.href)};const e=history.replaceState;history.replaceState=(...t)=>{e.apply(history,t),this.startVisit(window.location.href)},window.addEventListener("beforeunload",(()=>{this.endVisit()}))}}},55:(t,e,o)=>{o.d(e,{o:()=>a});var i=o(998);class n{constructor(){}static setCookie(t,e,o){const n="expires="+i.c.getExpiresTime(o);document.cookie=`${t}=${e}; ${n}; path=/`}static getCookie(t){const e=`; ${document.cookie}`.split(`; ${t}=`);return 2===e.length?e.pop().split(";").shift():null}}var s=o(592),r=o(335);const a=new class{constructor(){this.modes=["entry","sourceDomain"],this.entryUrlEndpoint=this.modes[0],this.sourceDomainEndpoint=this.modes[1],this.entryUrlCookieName="entryUrl",this.sourceDomainCookieName=this.sourceDomainEndpoint,this.expirationMinutes=5,this.currentUrl=null,this.endpoint=null,this.cookieName=null}#o(t,e){n.setCookie(t,e,this.expirationMinutes)}async#i(){let t=s.I.getEndpoingInfo(this.endpoint);const e={url:this.currentUrl};await r.N.sendRequest(t,e)&&this.#o(this.cookieName,e.url)}async#n(t){t===this.entryUrlEndpoint?(this.currentUrl=window.location.href,this.endpoint=t,this.cookieName=this.entryUrlCookieName):t===this.sourceDomainEndpoint&&(this.currentUrl=document.referrer||null,this.endpoint=t,this.cookieName=this.sourceDomainCookieName);const e=n.getCookie(this.cookieName);e?this.#o(this.cookieName,e):await this.#i()}async trackInfo(){for(let t of this.modes)await this.#n(t)}}},592:(t,e,o)=>{o.d(e,{I:()=>s});var i=o(14);class n{constructor(){this.endpoints=i.bO}getEndpointConfig(t){return this.endpoints[t]||null}}const s=new class{constructor(){this.endpointsConfig=new n}getEndpoingInfo(t){return this.endpointsConfig.getEndpointConfig(t)}}},998:(t,e,o)=>{o.d(e,{L:()=>n,c:()=>i});class i{static getExpiresTime(t){const e=new Date;return e.setTime(e.getTime()+60*t*1e3),e.toUTCString()}static async getNewObject(t){return JSON.parse(JSON.stringify(t))}static async logToConsole(t){const e=await i.getNewObject(t);console.log(e)}static async ifElementContainsClass(t,e){if("string"==typeof e)return t.classList.contains(e);if(Array.isArray(e))for(const o of e)if(t.classList.contains(o))return!0;return!1}}const n=t=>new Promise((e=>setTimeout(e,t)))},18:(t,e,o)=>{o.d(e,{S:()=>i});class i{static setItem(t,e){"object"==typeof e&&null!==e?e=JSON.stringify(e):"string"!=typeof e&&(e=String(e)),localStorage.setItem(t,e)}static getItem(t){const e=localStorage.getItem(t);return null!==e?e:null}static removeItem(t){localStorage.removeItem(t)}static clear(){localStorage.clear()}}},335:(t,e,o)=>{o.d(e,{N:()=>i});class i{constructor(){}static async sendRequest(t,e={}){const{url:o,method:i,endpoint:n}=t;console.log(`Отправка запроса на: ${o}`),console.log(`Метод: ${i}`),console.log(`Конечная точка: ${n}`);const s={method:i,credentials:"include",headers:{"Content-Type":"application/json"},body:"POST"===i?JSON.stringify(e):void 0};try{const t=await fetch(o,s);if(!t.ok)throw new Error("Сетевая ошибка: "+t.statusText);const e=await t.json();return console.log(`Ответ от сервера: ${JSON.stringify(e)}\nКонечная точка: ${n}`),e}catch(t){console.error("Ошибка при отправке запроса:",t)}}}},994:(t,e,o)=>{o.a(t,(async(t,i)=>{try{o.r(e);var n=o(992),s=o(55),r=o(879),a=o(819),c=o(28);class t{static pageVisitTracker=new c.H;static async#s(t,...e){try{await t(...e)}catch(e){console.error(`Ошибка при выполнении метода ${t.name}:`,e)}}static#r(e=10){setInterval((()=>{t.#s(n.c)}),1e3*e)}static async start(){this.#r(),await t.#s(s.o.trackInfo.bind(s.o)),await t.#s(a.d.start.bind(a.d)),await t.#s(this.pageVisitTracker.startTracking.bind(this.pageVisitTracker)),await t.#s(r.ZK.initActionTrackers.bind(r.ZK))}}await t.start(),i()}catch(t){i(t)}}),1)}},s={};function r(t){var e=s[t];if(void 0!==e)return e.exports;var o=s[t]={exports:{}};return n[t](o,o.exports,r),o.exports}t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",i=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},r.a=(n,s,r)=>{var a;r&&((a=[]).d=-1);var c,l,u,d=new Set,h=n.exports,m=new Promise(((t,e)=>{u=e,l=t}));m[e]=h,m[t]=t=>(a&&t(a),d.forEach(t),m.catch((t=>{}))),n.exports=m,s((n=>{var s;c=(n=>n.map((n=>{if(null!==n&&"object"==typeof n){if(n[t])return n;if(n.then){var s=[];s.d=0,n.then((t=>{r[e]=t,i(s)}),(t=>{r[o]=t,i(s)}));var r={};return r[t]=t=>t(s),r}}var a={};return a[t]=t=>{},a[e]=n,a})))(n);var r=()=>c.map((t=>{if(t[o])throw t[o];return t[e]})),l=new Promise((e=>{(s=()=>e(r)).r=0;var o=t=>t!==a&&!d.has(t)&&(d.add(t),t&&!t.d&&(s.r++,t.push(s)));c.map((e=>e[t](o)))}));return s.r?l:r()}),(t=>(t?u(m[o]=t):l(h),i(a)))),a&&a.d<0&&(a.d=0)},r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var a=r(994);DataCollectorEngine=a})();
