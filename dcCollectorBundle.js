var DataCollectorEngine;(()=>{"use strict";(()=>{const t="ДОБАВИЛ ТОВАР В КОРЗИНУ",e="СДЕЛАЛ ЗАКАЗ",n="ОСТАВИЛ ЗАЯВКУ",i="УДАЛИЛ ТОВАР ИЗ КОРЗИНЫ",o="ОЧИСТИЛ КОРЗИНУ",s="НАЧАЛ ЗВОНОК",r="ОСТАВИЛ ОТЗЫВ",a="УСПЕШНО АВТОРИЗОВАЛСЯ",c="POST";const l=new class{constructor(){this.apiUrl="https://sbrdigital.pro/",this.dataPath="user_info/"}},u={init:{endpoint:"init",method:"GET"},entry:{endpoint:"entry",method:c},sourceDomain:{endpoint:"source_domain",method:c},recordAction:{endpoint:"record_action",method:c},addCartInfo:{endpoint:"add_cart_info",method:c},trackTimeSpent:{endpoint:"track_time_spent",method:c},authHandler:{endpoint:"auth_handler",method:c}};!function(t,e){for(let n in e)e.hasOwnProperty(n)&&(e[n].url=`${t.apiUrl}${t.dataPath}${e[n].endpoint}`)}(l,u);class h{constructor(){this.endpoints=u}getEndpointConfig(t){return this.endpoints[t]||null}}const d=new class{constructor(){this.endpointsConfig=new h}getEndpoingInfo(t){return this.endpointsConfig.getEndpointConfig(t)}};class m{constructor(){}static async sendRequest(t,e={}){const{url:n,method:i,endpoint:o}=t;console.log(`Отправка запроса на: ${n}`),console.log(`Метод: ${i}`),console.log(`Конечная точка: ${o}`);const s={method:i,credentials:"include",headers:{"Content-Type":"application/json"},body:"POST"===i?JSON.stringify(e):void 0};try{const t=await fetch(n,s);if(!t.ok)throw new Error("Сетевая ошибка: "+t.statusText);const e=await t.json();return console.log(`Ответ от сервера: ${JSON.stringify(e)}\nКонечная точка: ${o}`),e}catch(t){console.error("Ошибка при отправке запроса:",t)}}}async function y(t="init",e=2){let n=d.getEndpoingInfo(t);const i={};for(let t=0;t<e;t++)return await m.sendRequest(n,i)}class g{static getExpiresTime(t){const e=new Date;return e.setTime(e.getTime()+60*t*1e3),e.toUTCString()}static async getNewObject(t){return JSON.parse(JSON.stringify(t))}static async logToConsole(t){const e=await g.getNewObject(t);console.log(e)}static async ifElementContainsClass(t,e){if("string"==typeof e)return t.classList.contains(e);if(Array.isArray(e))for(const n of e)if(t.classList.contains(n))return!0;return!1}}class f{constructor(){}static setCookie(t,e,n){const i="expires="+g.getExpiresTime(n);document.cookie=`${t}=${e}; ${i}; path=/`}static getCookie(t){const e=`; ${document.cookie}`.split(`; ${t}=`);return 2===e.length?e.pop().split(";").shift():null}}const p=new class{constructor(){this.modes=["entry","sourceDomain"],this.entryUrlEndpoint=this.modes[0],this.sourceDomainEndpoint=this.modes[1],this.entryUrlCookieName="entryUrl",this.sourceDomainCookieName=this.sourceDomainEndpoint,this.expirationMinutes=5,this.currentUrl=null,this.endpoint=null,this.cookieName=null}#t(t,e){f.setCookie(t,e,this.expirationMinutes)}async#e(){let t=d.getEndpoingInfo(this.endpoint);const e={url:this.currentUrl};await m.sendRequest(t,e)&&this.#t(this.cookieName,e.url)}async#n(t){t===this.entryUrlEndpoint?(this.currentUrl=window.location.href,this.endpoint=t,this.cookieName=this.entryUrlCookieName):t===this.sourceDomainEndpoint&&(this.currentUrl=document.referrer||null,this.endpoint=t,this.cookieName=this.sourceDomainCookieName);const e=f.getCookie(this.cookieName);e?this.#t(this.cookieName,e):await this.#e()}async trackInfo(){for(let t of this.modes)await this.#n(t)}};class k{constructor(){this.toCartBtnClassSelectorWithoutDot="to-cart",this.endpoint="addCartInfo"}async getTotalPrice(t){let e=null;if(t){let n=t.querySelector("div.wrap_total");if(n){let t=n.querySelector("div.price");if(t){let n=t.textContent.trim();e=Number(n.replace(/[^\d]/g,"")),isNaN(e)?console.log("Не удалось преобразовать стоимость в число."):console.log(`Общая стоимость корзины: ${e} ₽`)}else console.log("Элемент с ценой не найден внутри wrap_total.")}else console.log("Элемент wrap_total не найден.")}else console.log("Форма с id #basket_form не найдена.");return e}async trackingCartItems(){let t=document.querySelector("form#basket_form");if(t){let e=t.querySelectorAll("div.product_name");console.log(`basketItemsElements: ${e.length} товаров найдено`);let n=[],i=await this.getTotalPrice(t);if(e.length>0)for(let t of e){let e=t.querySelector("a");e&&n.push(e.textContent.trim())}return console.log("Массив с названиями товаров:"),console.log(n),console.log("totalPrice"),console.log(i),{productNames:n,totalPrice:i}}return console.log("Форма с id #basket_form не найдена."),null}async#i(t,e){const n=d.getEndpoingInfo(this.endpoint),i={item_names:t,amount:e},o=await m.sendRequest(n,i);o?console.log("Событие успешно сохранено:",o.message):console.error("Ошибка при сохранении события.")}async checkAddToCartBtn(t){if(g.ifElementContainsClass(t,this.toCartBtnClassSelectorWithoutDot)){let{productNames:t,totalPrice:e}=await this.trackingCartItems();t.length>0&&e&&await this.#i(t,e)}}async startTrack(t){await this.checkAddToCartBtn(t)}}class w{static async recordAction(t,e="recordAction"){const n=window.location.href,i=d.getEndpoingInfo(e),o={event_url:{url:n},event:{event_name:t}},s=await m.sendRequest(i,o);s?console.log("Событие успешно сохранено:",s.message):console.error("Ошибка при сохранении события.")}}const S=new class{constructor(){this.setIntervalPauseMs=100,this.cartInfoTracker=new k,this.toCartBtnClassSelectorWithoutDot=this.cartInfoTracker.toCartBtnClassSelectorWithoutDot,this.endpoint="recordAction",this.cartButtons=null,this.removeButtons=null,this.createOrderBtn=document.querySelector("div#bx-soa-orderSave"),this.oneClickBuyButton=document.querySelector("button#one_click_buy_form_button"),this.callbackButton=document.evaluate("//span[text()='Заказать звонок']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}async recordAction(t,e){await w.recordAction(t,e)}async initButtonTracking(t,e,n,i){t?t.addEventListener("click",(async o=>{await g.ifElementContainsClass(t,this.toCartBtnClassSelectorWithoutDot)?(console.log("Это кнопка добавления товара в корзину"),await this.cartInfoTracker.startTrack(t),await this.recordAction(e)):await this.recordAction(e).then((()=>{console.log(n)})).catch((t=>{console.error(i,t)}))})):console.error("Кнопка не найдена.")}async initCreateOrderButton(){await this.initButtonTracking(this.createOrderBtn,e,"Заказ успешно оформлен.","Ошибка при оформлении заказа:")}async initRemoveButtons(){const t=setInterval((async()=>{this.removeButtons=document.querySelectorAll('span[data-entity="basket-item-delete"]'),this.removeButtons.length>0&&(this.removeButtons.forEach((t=>{this.initButtonTracking(t,i,"Товар удален из корзины.","Ошибка при удалении товара из корзины:")})),clearInterval(t))}),this.setIntervalPauseMs)}async initCartButtons(){const e="data-collector-inited";return new Promise((n=>{setInterval((()=>{this.cartButtons=document.querySelectorAll(`.${this.toCartBtnClassSelectorWithoutDot}`),this.cartButtons.length>0&&(this.cartButtons.forEach((n=>{const i=`Товар с ID ${n.getAttribute("data-item")} добавлен в корзину.`;n.hasAttribute(e)||(this.initButtonTracking(n,t,i,"Ошибка при добавлении товара в корзину:"),n.setAttribute(e,"true"))})),n())}),this.setIntervalPauseMs)}))}async initOneClickBuy(){await this.initButtonTracking(this.oneClickBuyButton,e,"Выполнен заказ в 1 клик","Ошибка при выполнении заказа в 1 клик")}async initCallbackFormTracking(){this.callbackButton&&this.callbackButton.addEventListener("click",(async()=>{await this.addSubmitButtonListener()}))}async addSubmitButtonListener(){const t=setInterval((async()=>{const e=document.querySelector('form[name="CALLBACK_RkUzu"]');if(e){const i=e.querySelector('button[type="submit"]')||e.querySelector('button[type="button"]');if(i){console.log(`Мы нашли кнопку отправки заявки: ${i}`);try{console.log("Добавили слушатель нажатия на кнопку"),await this.initButtonTracking(i,n,"Оставлена заявка","Ошибка при оставлении заявки")}catch(t){console.error("Произошла ошибка:",t)}clearInterval(t)}}}),this.setIntervalPauseMs)}async addSubmitButtonListeners(){const t=/SERVICES_/;document.querySelectorAll("form").forEach((e=>{if(t.test(e.name)){const t=e.querySelector('button[type="submit"]')||e.querySelector('button[type="button"]');t&&(console.log(`Мы нашли кнопку отправки заявки: ${t}`),t.addEventListener("click",(async e=>{e.preventDefault();try{await this.initButtonTracking(t,n,"Оставлена заявка","Ошибка при оставлении заявки")}catch(t){console.error("Произошла ошибка:",t)}})))}}))}async initDeleteAllFromBasketBtn(){const t=document.querySelector("div#basket-root");if(t){const e=t.querySelector("span.delete_all");if(e)try{console.log(`Добавили слушатель нажатия на кнопку deleteAllSpan: ${e}`),await this.initButtonTracking(e,o,"Корзина очищена","Ошибка при очистке корзины")}catch(t){console.error("Произошла ошибка:",t)}}}async initFastOrderFromBasketForm(){const t=setInterval((async()=>{const n=document.querySelector("form#basket_form");if(n){const i=n.querySelector("div.basket_fast_order");if(i){console.log(`Мы нашли кнопку быстрог заказа в корзине: ${i}`);try{console.log(`Добавили слушатель нажатия на кнопку fastOrderBtn: ${i}`),await this.initButtonTracking(i,e,"Оформлен быстрый заказ","Ошибка при оформлении быстрого заказазаявки")}catch(t){console.error("Произошла ошибка:",t)}clearInterval(t)}}}),50)}async initCallButtonTracking(){if(document.querySelector("div.phone-block")){const t=document.querySelector('a[rel="nofollow"]');t&&await this.initButtonTracking(t,s,"Начало звонка зафиксировано.","Ошибка при фиксации начала звонка.")}}async initFeedbackButtonTracking(){const t=document.querySelector('[data-param-form_id="FEEDBACK_GK"]');await this.initButtonTracking(t,r,"Отзыв успешно оставлен.","Ошибка при оставлении отзыва:")}async initActionTrackers(){await this.addSubmitButtonListeners(),await this.initFastOrderFromBasketForm(),await this.initCartButtons(),await this.initDeleteAllFromBasketBtn(),await this.initRemoveButtons(),await this.initCreateOrderButton(),await this.initOneClickBuy(),await this.initCallbackFormTracking(),await this.initCallButtonTracking(),await this.initFeedbackButtonTracking()}};class I{static setItem(t,e){"object"==typeof e&&null!==e?e=JSON.stringify(e):"string"!=typeof e&&(e=String(e)),localStorage.setItem(t,e)}static getItem(t){const e=localStorage.getItem(t);return null!==e?e:null}static removeItem(t){localStorage.removeItem(t)}static clear(){localStorage.clear()}}const C=new class{constructor(){this.LSAuthInfoKey="bx-compositeCache",this.userIdKey="USER_ID",this.testAuthInfo='1729777405:{"bitrix_sessid":"23895098614071263227b4d93491a35f", "USER_ID":"123", "SERVER_TIME":1729775961, "USER_TZ_OFFSET":0, "USER_TZ_AUTO":"Y"}',this.dcSendedKey="DC_AUTH_INFO_SENDED",this.isUserAuthDcInfo=!1,this.checkInterval=200,this.endpoint="authHandler"}async setDcInfoSendedLsKey(t=!1){I.setItem(this.dcSendedKey,t)}async getLsInfo(){let t=null;const e=I.getItem(this.LSAuthInfoKey)||null,n=I.getItem(this.dcSendedKey)||"false";if(e&&"string"==typeof e){const n=e.indexOf(":");if(-1!==n){const i=e.substring(n+1);try{t=JSON.parse(i)}catch(t){console.error("Ошибка при разборе JSON:",t)}}}else console.error("Двоеточие не найдено в строке:",e);return{result:t,sendedInfo:n}}async checkUserId(){let{result:t,sendedInfo:e}=await this.getLsInfo();if(!t)return null;{let n=t[this.userIdKey]||"";if(""===n)return null;if(console.log("Юзер айди не пустой!"),"false"===e)return{uID:n,sended:!1};if(e&&"true"===e)return{uID:n,sended:!0}}}async#o(t){try{await w.recordAction(a);const e=d.getEndpoingInfo(this.endpoint);console.log("Информация об ендпоинте"),console.log(e);const n={cms_user_id:Number(t)};await m.sendRequest(e,n)}catch(t){console.error("При отправке запроса возникла ошибка:",t)}}async sendInfo(){const t=setInterval((async()=>{let e=await this.checkUserId();if(e&&"object"==typeof e){let{uID:n,sended:i}=e;!0===i?(console.log("Информация о пользователе уже отправлена. Завершение цикла."),clearInterval(t)):!1===i&&(await this.#o(n),await this.setDcInfoSendedLsKey(!0),console.log("Информация о пользователе отправлена на сервер."))}}),this.checkInterval)}async start(){await this.sendInfo()}};class v{constructor(){this.visitsKey="pageVisits",this.checkInterval=3e3,this.endpoint="trackTimeSpent",this.visits=this.loadVisitsFromLocalStorage(),this.currentVisit=null}loadVisitsFromLocalStorage(){const t=I.getItem(this.visitsKey);return t?JSON.parse(t):[]}saveVisitsToLocalStorage(){I.setItem(this.visitsKey,JSON.stringify(this.visits))}startVisit(t){this.currentVisit&&this.endVisit(),this.currentVisit={url:t,startTime:performance.now()}}endVisit(){if(this.currentVisit){const t=Math.round((performance.now()-this.currentVisit.startTime)/1e3),e=(new Date).toISOString(),n=this.visits.findIndex((t=>t.url===this.currentVisit.url));-1!==n?this.visits[n].duration+=t:this.visits.push({url:this.currentVisit.url,visit_time:e,duration:t}),this.saveVisitsToLocalStorage(),this.currentVisit=null}}async sendVisits(){if(0===this.visits.length)return;const t=d.getEndpoingInfo(this.endpoint),e={visits_info:this.visits};try{await m.sendRequest(t,e),console.log("Информация о посещенных страницах успешно отправлена на сервер.")}catch(t){console.error("Ошибка при отправке данных на сервер:",t)}}startTracking(){this.startVisit(window.location.href),setInterval((()=>{this.endVisit(),this.startVisit(window.location.href),this.sendVisits()}),this.checkInterval),window.onpopstate=()=>{this.startVisit(window.location.href)};const t=history.pushState;history.pushState=(...e)=>{t.apply(history,e),this.startVisit(window.location.href)};const e=history.replaceState;history.replaceState=(...t)=>{e.apply(history,t),this.startVisit(window.location.href)},window.addEventListener("beforeunload",(()=>{this.endVisit()}))}}class B{static pageVisitTracker=new v;static async#s(t,...e){try{await t(...e)}catch(e){console.error(`Ошибка при выполнении метода ${t.name}:`,e)}}static#r(t=10){setInterval((()=>{B.#s(y)}),1e3*t)}static async start(){this.#r(),await B.#s(p.trackInfo.bind(p)),await B.#s(S.initActionTrackers.bind(S)),await B.#s(C.start.bind(C)),await B.#s(this.pageVisitTracker.startTracking.bind(this.pageVisitTracker))}}async function T(t=3){var e;await(e=1e3*t,new Promise((t=>setTimeout(t,e)))),await B.start()}(async()=>{await T()})()})(),DataCollectorEngine={}})();
