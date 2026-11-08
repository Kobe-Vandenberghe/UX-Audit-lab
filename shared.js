'use strict';
const sites = [
 ['NovaShop','Electronics & essentials','Browse the store and attempt to purchase a product.','Beginner','novashop','01-webshop','↗'],
 ['Finora','Everyday banking','Find your balance and try sending money to another account.','Beginner','finora','02-banking','ƒ'],
 ['TaskForge','Projects & productivity','Find a task, update its status, and delete an outdated task.','Intermediate','taskforge','03-project-manager','▤'],
 ['EchoWave','Music & discovery','Find a song, play it, and manage a playlist.','Intermediate','echowave','04-streaming','≋'],
 ['StayNest','Stays & getaways','Find and attempt to book a hotel for a weekend trip.','Intermediate','staynest','05-travel','⌂'],
 ['FitPulse','Training & wellbeing','Start a workout and review your progress.','Intermediate','fitpulse','06-fitness','ϟ'],
 ['CloudBox','Storage & subscriptions','Compare plans and create a simulated account.','Advanced','cloudbox','07-cloud-storage','☁'],
 ['QuickBite','Good food, delivered','Customize a meal and place a simulated order.','Advanced','quickbite','08-food-ordering','◒'],
 ['FileFlow','Your digital workspace','Upload a document, locate an existing file, and delete an outdated file.','Advanced','fileflow','09-file-manager','▱'],
 ['LearnSpace','Learning & growth','Continue a course, complete a quiz, and review your progress.','Advanced','learnspace','10-learning-platform','✳'],
 ['Roamly','European travel · Full application','Plan a European city break: compare stays, save favourites, make a reservation, and manage your travel plans.','Extended exam · 20 min','roamly','roamly/index','↗']
];
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR'}).format(n);
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button = (text, action, cls='') => {
 const label={'•••':'More options','♡':'Save stay','⏮':'Previous track','⏭':'Next track','▶':'Play track','❚❚':'Pause playback'}[text];
 return `<button type="button" class="${cls}" data-action="${action}"${label?` aria-label="${label}"`:''}>${text}</button>`;
};
const field = (label,name,type='text',value='',extra='') => `<label>${label}<input name="${name}" type="${type}" value="${escapeHTML(value)}" ${extra}></label>`;
function mountSite(index, markup) {
 const site=sites[index]; document.title=site[0]+' · UX Audit Lab'; document.body.className=site[4];
 $('#app').innerHTML=`<div class="lab-bar"><a href="../index.html">← The collection</a><span>${String(index+1).padStart(2,'0')} / ${sites.length} <span class="bar-divider">·</span> Local simulation</span><button id="restart" type="button">Restart site ↻</button></div><main id="site">${markup}</main><div id="toast" role="status" aria-live="polite" hidden></div><dialog id="modal"><div id="modal-content"></div><form method="dialog"><button class="dialog-close" aria-label="Close dialog">×</button></form></dialog>`;
 $('#restart').onclick=()=>location.reload();
 $('#modal').addEventListener('click',e=>{if(e.target===$('#modal')) $('#modal').close();});
}
function modal(content) { $('#modal-content').innerHTML=content; $('#modal').setAttribute('aria-label',$('#modal-content h2, #modal-content h1')?.textContent||'Details'); if(!$('#modal').open) $('#modal').showModal(); }
let toastTimer;
function toast(text) { const el=$('#toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,4500); }
function header(brand,nav,aside='') {return `<header class="site-header"><a class="brand" href="${location.pathname.split('/').pop()}">${brand}</a><nav aria-label="Main navigation">${nav}</nav><div class="header-aside">${aside}</div></header>`;}
function onAction(handler) { document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(el)handler(el.dataset.action,el);}); }
function art(type, color='#c8dfc0') {
 const shapes={headphones:'<path d="M95 150v-42a55 55 0 0 1 110 0v42" fill="none" stroke="#262b32" stroke-width="17"/><rect x="78" y="127" width="35" height="63" rx="15" fill="#3d4650"/><rect x="187" y="127" width="35" height="63" rx="15" fill="#3d4650"/>',laptop:'<rect x="67" y="62" width="166" height="108" rx="8" fill="#333b48"/><rect x="76" y="71" width="148" height="90" fill="#9eaed2"/><path d="M52 176h196l-15 13H67z" fill="#9099a4"/><circle cx="150" cy="113" r="24" fill="#c7cbee"/>',keyboard:'<rect x="45" y="98" width="210" height="83" rx="10" fill="#e9e5dd"/><path d="M60 117h180M60 135h180M60 153h180M80 108v51M106 108v51M132 108v51M158 108v51M184 108v51M210 108v51" stroke="#95948e" stroke-width="6"/>',speaker:'<rect x="107" y="57" width="86" height="145" rx="28" fill="#343b3d"/><circle cx="150" cy="109" r="24" fill="#191e23"/><circle cx="150" cy="166" r="15" fill="#879582"/>',hotel:'<path d="M0 180L80 70l80 110 70-85 70 85v70H0z" fill="#729a7b"/><rect x="72" y="84" width="156" height="136" rx="5" fill="#f5e6c9"/><path d="M62 87l88-53 88 53z" fill="#b87b62"/><path d="M95 110h25v29H95zm43 0h25v29h-25zm43 0h25v29h-25zM95 156h25v29H95zm86 0h25v29h-25z" fill="#5a7d7d"/><path d="M138 220v-54h25v54" fill="#a57354"/>',food:'<ellipse cx="150" cy="152" rx="92" ry="63" fill="#f6efdf"/><ellipse cx="150" cy="144" rx="70" ry="45" fill="#7d9a48"/><path d="M92 139q55-75 116 0z" fill="#e7aa5b"/><path d="M93 147h114M101 157h98" stroke="#a54e35" stroke-width="11"/><path d="M100 168h100q-50 32-100 0" fill="#e7aa5b"/>',exercise:'<circle cx="149" cy="65" r="17" fill="#244232"/><path d="M145 87l-26 51 47 19 28 51M122 137l-31 58M134 108l-36-5-21-29M137 108l43 3 29-35" fill="none" stroke="#244232" stroke-width="14" stroke-linecap="round"/>'};
 Object.assign(shapes,{
 pizza:'<ellipse cx="150" cy="145" rx="95" ry="65" fill="#f8f1e2"/><ellipse cx="150" cy="137" rx="78" ry="53" fill="#c98b47"/><ellipse cx="150" cy="133" rx="69" ry="45" fill="#dbb45b"/><g fill="#b95438"><circle cx="118" cy="118" r="12"/><circle cx="173" cy="116" r="12"/><circle cx="151" cy="153" r="12"/><circle cx="197" cy="147" r="9"/></g><path d="M123 147l13-8m25-33l10-10m9 61l13 7" stroke="#5d793c" stroke-width="8"/>',
 bowl:'<ellipse cx="150" cy="148" rx="91" ry="58" fill="#f6efdf"/><path d="M65 146q85 117 170 0" fill="#d2c6ac"/><ellipse cx="150" cy="136" rx="78" ry="42" fill="#89a04f"/><path d="M92 126l20-10m14 38l19-11m24-28l18-8" stroke="#e7b04c" stroke-width="15"/><circle cx="172" cy="141" r="14" fill="#bd6444"/><circle cx="115" cy="136" r="11" fill="#ded3a1"/>',
 fries:'<path d="M90 105l20 103h80l20-103" fill="#be6347"/><path d="M108 144L96 67m32 73l-4-89m24 90l8-83m13 82l17-77m-2 78l23-65" stroke="#e4b855" stroke-width="17"/><path d="M90 117l20 91h80l20-91q-60 33-120 0" fill="#ca7350"/>',
 wrap:'<ellipse cx="150" cy="165" rx="91" ry="43" fill="#f6efdf"/><path d="M83 142l85-58 47 57-85 58z" fill="#d6af76"/><path d="M92 139l74-44 30 39-75 50z" fill="#e8ca92"/><path d="M118 126l43-24 25 29-46 29z" fill="#7f994d"/><path d="M142 114l23 10m-35 16l25 11" stroke="#bc6243" stroke-width="13"/>',
 drink:'<path d="M109 86l12 127h62l12-127z" fill="#d7ad60"/><ellipse cx="152" cy="86" rx="43" ry="13" fill="#f2dca3"/><path d="M163 177l13-125h26" stroke="#9f6e57" stroke-width="9" fill="none"/><path d="M118 111h68" stroke="#e2c27c" stroke-width="15"/>',
 dessert:'<ellipse cx="150" cy="181" rx="85" ry="39" fill="#f6efdf"/><path d="M93 120l73-35 50 56-80 44z" fill="#78513d"/><path d="M93 120v42l43 42v-44z" fill="#936749"/><path d="M136 160l80-19v43l-80 20z" fill="#614634"/><path d="M128 113l32-13 20 23-36 18z" fill="#d2b18a"/>'
 });
 return `<svg viewBox="0 0 300 250" role="img" aria-label="${type}" class="illustration"><rect width="300" height="250" fill="${color}"/><circle cx="235" cy="48" r="68" fill="white" opacity=".18"/>${shapes[type]||shapes.speaker}</svg>`;
}
