// ============================================================
// 使用說明（script.js）
// - 首頁主視覺輪播：最下方的「slides / showSlide / setInterval」段落。
//   · 想改輪播時間：調整 setInterval 的毫秒數（目前 3000 = 3 秒）。
// - 第 8 區段「店鋪卡片」：請在下方 const stores = [...] 內直接改資料。
//   · 每一家店的欄位說明：
//     id：英數識別，不會顯示在畫面，但要唯一。
//     name：店名（顯示在卡片 / 彈窗標題）。
//     subtitle：副標或一句話介紹（可留空）。
//     coords：{x, y} 若你有自訂地圖點位使用；否則可忽略。
//     img：卡片縮圖（出現在店家列表卡片上）。
//     photos：彈窗輪播相片清單（字串陣列，放圖片路徑）。
//     ownerName：店主顯示名稱（可留空）。
//     hours：營業時間（支援多行字串）。
//     desc：店家介紹。
// - 如需增刪店家：增刪 stores 陣列中的物件即可。
// - 若需要更改店家彈窗位置／開啟方式：搜尋 openModalNear(target) 段落中的邏輯。
// ============================================================


// === Bootstrap: ensure global slider button aliases exist ===
(function(){
  function setAliases(){
    try{
      var prev = document.getElementById('shopSlidePrev') || document.getElementById('shopslidePrev') || null;
      var next = document.getElementById('shopSlideNext') || document.getElementById('shopslideNext') || null;
      if (prev) window.SlidePrev = prev;
      if (next) window.SlideNext = next;
      window.slidePrev = prev || window.slidePrev || null;
      window.slideNext = next || window.slideNext || null;
    }catch(e){}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setAliases, {once:true});
  } else {
    setAliases();
  }
})();
// === /Bootstrap ===



(function(){
  
  if (typeof window.buildSlides !== 'function'){
    window.buildSlides = function(urls, altBase){
      const track = document.getElementById('shopSlideTrack');
      const dots  = document.getElementById('shopSlideDots');
      if (!track || !dots) return;
      const list = Array.isArray(urls) ? urls : [];
      track.innerHTML = list.map(u => `<div class="shop-slide"><img src="${u}" alt="${altBase||''} 照片"></div>`).join('');
      dots.innerHTML  = list.map((_,i)=>`<div class="shop-slide-dot${i===0?' is-active':''}" data-idx="${i}"></div>`).join('');
    };
  }

  
  const section8 = document.getElementById('section8');
  const grid     = document.getElementById('shopGrid') || document.querySelector('.shop-grid');
  const modal    = document.getElementById('shopModal');
  const mClose   = document.getElementById('shopModalClose');

  if (!section8 || !modal) return;

  
  
function openModalNear(target){
  
  const section8 = document.getElementById('section8');
  const grid = document.getElementById('shopGrid') || document.querySelector('.shop-grid');
  const modal = document.getElementById('shopModal');
  if (!modal || !section8 || !grid) return;

  
  if (!section8.contains(modal)) section8.appendChild(modal);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  
  Object.assign(modal.style, {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'min(88vw, 860px)',
    maxHeight: '92vh',
    overflow: 'auto'
  });

  const secRect  = section8.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();

  
  let cx = (gridRect.left + gridRect.width / 2) - secRect.left;
  let cy = (gridRect.top  + gridRect.height/ 2) - secRect.top;

  
  const PADDING = 12;
  const modalW = modal.offsetWidth  || 0;
  const modalH = modal.offsetHeight || 0;
  const minX = PADDING + modalW / 2;
  const maxX = Math.max(minX, section8.clientWidth  - PADDING - modalW / 2);
  const minY = PADDING + modalH / 2;
  const maxY = Math.max(minY, section8.clientHeight - PADDING - modalH / 2);
  cx = Math.min(Math.max(cx, minX), maxX);
  cy = Math.min(Math.max(cy, minY), maxY);

  modal.style.left = Math.round(cx) + 'px';
  modal.style.top  = Math.round(cy) + 'px';
}
})();


const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}
if (slides.length) {
  showSlide(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 3000);
}




// === 第 8 區段｜店鋪卡片資料：在這裡改內容 ===
// 範例：{
//   id: "myshop",                 // 唯一識別字串（不要重複）
//   name: "我的小店",             // 店名
//   subtitle: "一句話介紹",       // 副標（可留空）
//   coords: { x: 35, y: 38 },      // 若有用到地圖標記（無則忽略）
//   img: 'img/store.png',          // 列表卡片縮圖路徑
//   photos: ['pic/1.jpg','pic/2.jpg'], // 彈窗可左右切換的相片
//   ownerName: "店主名稱",        // 可留空
//   hours: `每日 10:00–18:00`,     // 可用多行反引號字串
//   desc: `這裡是店家介紹…`        // 較長文字
// }

const stores = [
{
  id: "xianrou",
  name: "Q發柴燒雞蛋糕",
  subtitle: `小小的攤位，烤出大大的溫度`,
  product: "販售：香噴噴的雞蛋糕",
  coords: { x: 26, y: 64 },
  img: 'img/store (2).png', 
  photos: [                           
  'pic/cake1.jpg',
  'pic/cake2.jpg',
  ],
  ownerName: "小鮮肉姐姐",
  hours: `12：00～19：00 
  (星期三到星期日)`,
  desc: `Q發柴燒雞蛋糕，不只鬆軟，更帶著獨特紮實口感與濃郁奶香，不加發泡粉，真材實料吃得到！除了經典卡士達、黑糖麻糬，還有限定麻辣口味，驚喜不斷。

老闆淑婷姐原本是土木科出身，將「比例精準」的精神融入麵糊調製，做出獨樹一幟的雞蛋糕。她更推出學生折扣、考一百分免費吃，並與長照機構、社福單位合作，把甜點變成溫暖陪伴。

在她眼中，雞蛋糕不只是點心，更是一份心意。下次來菱潭街，不妨停下腳步，嚐一口奶香，也嚐一份最真誠的溫度。
`
},
{
  id: "qfa",
  name: "GS飾品館",
  subtitle: "來找尋那一件專屬於您的飾品吧!",
  product: "販售：各式手作飾品",
  coords: { x: 41, y: 52 },
  img: 'img/store (5).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "淑婷姐",
  hours: `12：00～19：00
  （星期三到星期日）`,
  desc: `七年前，小哥從台南搬來龍潭，把飾品事業帶進菱潭街。店內耳環、項鍊、戒指琳瑯滿目，從細緻優雅到嘻哈龐克應有盡有，成為街區青少年的最愛。每一件飾品都是小哥31年經驗的結晶，不只是裝飾，更是自我風格的展現。

除了販售精選飾品，Gs飾品館也提供街區導覽與手作課程，讓顧客親手體驗設計與製作的樂趣。走進店裡，不只購物，還能感受菱潭街的人情味與文創氛圍。

櫥窗永遠閃亮，熟客與鄰里支持的凝聚力，便是店家堅持的理由。
`
},
{
  id: "suixin",
  name: "小仙肉の家",
  subtitle: " 一起來，找到屬於自己的療癒時光",
  product: "販售：水泥盆栽、手作裝飾品",
  coords: { x: 58, y: 47 },
  img: 'img/store (3).png', 
  photos: [                           
  'pic/rou1.jpg',
  'pic/rou2.jpg'
  ],
  ownerName: "",
  hours: `12：00～18：00
  （星期三到星期日）`,
  desc: `水泥盆栽、鋁線作品，這些都是在你進入小仙肉姊姊的「森林小店」時，第一眼就會看見的明星作品！ 

  無論是從模具裁切還是到紋理設計，全都由小仙肉姐姐親手製作，每一件都是獨一無二的創作。

  小仙肉姐姐從早期從市集活動接觸到手作領域，逐漸轉為固定店鋪。
  
  她每天準時開門，等待喜歡細心用綠植妝點生活，又或是在為原有的盆栽找尋合眼緣的新家的朋友們路過。`
},
{
  id: "gs",
  name: "武威學堂",
  subtitle: "來這裡，找到屬於自己的小小快樂",
  product: "販售：鋼琴課程與手作DIY",
  coords: { x: 35, y: 38 },
  img: 'img/store (11).png', 
  photos: [                           
  'pic/wuwei.jpg',
  ],
  ownerName: "小哥",
  hours: `11：00～17：00 星期三到星期五 
   12：00～18：30 星期六和星期日`,
  desc: `三年前，武威學堂以「把學堂打造為前堂」的初心落腳菱潭街，讓孩子和家長不只是拿著課本，也能在這裡學到新知。
  
  起初以 DIY 手作與地方講學為主，疫情後轉型鋼琴教學，提供線上、一對一及小班制課程，靈活滿足不同學生需求。學員上課還可累積點數，兌換精選娃娃、公仔模型，將學習變成趣味小冒險。
  
  武威學堂用穩定課程與特色禮品，讓菱潭街的學習空間充滿溫度，是居民與遊客不可錯過的探索據點。
`
},
{
  id: "catfive",
  name: "石麻谷",
  subtitle: "每件手作飾品，都是一份平安的祝福",
  product: "販售：手作飾品",
  coords: { x: 68, y: 61 },
  img: 'img/store (4).png', 
  photos: [                           
  'img/mo(01).jpg',
  'img/mo(02).jpg',
  'img/mo(03).jpg'
  ],
  ownerName: "Mo姐",
  hours:  `13：00～19：30
  （星期三到星期日）`,
  desc: `走進石麻谷，你會被牆上五顏六色的「五色線」吸引，象徵守護與祝福；店裡滿是貓咪元素，成了mo姐的創意標誌。八年前，她因緣際會來到菱潭街，從擺攤到擁有自己的小空間，始終以「平安」為核心，手作每一件小物。

石麻谷的產品不追流行，但充滿溫度：五色線手環、祈福石、舊作品改造，每件都承載用心守護的意涵。mo姐也提供手作體驗課程，讓大小朋友親手編織專屬小物，享受創作樂趣。店內氛圍自在溫馨，顧客不只是購物，更能感受陪伴與安心。

無論是送禮、收藏，或親自動手製作，石麻谷都是菱潭街上用心、充滿溫度的手作小店，每一件作品都是愛與祝福的延續。
`
},
{
  id: "love",
  name: "隨心所欲 ",
  subtitle: " 一針一線，縫出自在生活的溫度",
  product: "販售：各式手織小物",
  coords: { x: 35, y: 38 },
  img: 'img/store (1).png', 
  photos: [                           
  'pic/heart1.jpg',
  ],
  ownerName: "小哥",
  hours: `9:30～16：00 
  (星期四到星期日以及周一)`,
  desc: `隨心所欲，帶你走進童趣小樂園！店裡有布花、大肚魚包與各式拼布吊飾，全都由庸子姊親手縫製，每件都藏著故事。

從合興車站到菱潭街，她十年來始終專注在手工裁縫與創意布作，堅持做自己快樂的事。對她來說，只要能安心縫著小東西，就是最理想的日子。

除了販售成品，她也在青埔開設「DIY 小時光」課程，帶大小朋友挑布、裁片、車縫，循序完成專屬作品。溫馨氛圍讓初學者也能享受手作樂趣。

想感受自在生活的溫度？來菱潭街找庸子姊，或到粉專逛逛吧！
`
},
{
  id: "flover",
  name: "涵花綻放&涵花小集",
  subtitle: "以靜謐與創意，讓花之美在生活中綻放",
  product: "販售：永生花以及相關文創商品",
  coords: { x: 35, y: 38 },
  img: 'img/store (9).png', 
  photos: [                           
  'pic/flower1.jpg',
  ],
  ownerName: "小哥",
  hours: "每日營業 8:00–21:00",
  desc: `靜謐、浪漫，在涵花綻放與涵花小集中，各式各樣的永生花綻放在眼前。它們被時間輕輕定格，停留在最盛放的姿態，像是將瞬間的美延展成永恆。

涵花綻放專注於呈現花最純粹的模樣，色彩鮮明卻安靜，象徵著記憶與祝福的長久。這裡的永生花，不僅是一種景緻，更是一種將重要時刻凝固下來的方式。

而涵花小集，則在浪漫之中注入巧思，把永生花與文創結合，轉化為貼近日常的小物。它讓花不只是靜態的存在，而是以創意延伸進生活，賦予日常更多質感與柔和。
`
},{
id: "candy",
name: "糖糖鮮菓小站",
subtitle: "裝載糖果的玻璃罐中，也盛放著童年的美好時光",
product: "販售：各式糖果零食",
coords: { x: 35, y: 38 },
img: 'img/store (10).png', 
photos: [                           
'pic/candy.jpg',
],
ownerName: "",
hours: `11：30～18：30 
(星期三到星期日)`,
desc: `走進菱潭街，總會被一股甜香吸引，那就是「糖糖鮮菓小站」。店裡一罐罐透明玻璃瓶裡裝著三色軟糖、汽水糖，色彩繽紛卻樸實單純，像極了童年街角的小攤。

在這裡，不需要整袋購買，而是能慢慢挑選，像從前一樣把心情裝進小小的紙袋。這份自由與期待，是現代快節奏生活裡少有的片刻。孩子因新奇雀躍，大人則在熟悉的滋味裡微笑，彷彿回到童年的午後。

糖糖鮮菓小站賣的不只是糖果，而是一種回到從前的感覺。
`
},{
id: "lingtan",
name: "龍潭文風造庄聯盟",
subtitle: "走讀菱潭街，發現龍潭的美好",
product: "販售：在地導覽",
coords: { x: 35, y: 38 },
img: 'img/store (6).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "蔡老師",
hours: `12:00–20:00
（週三公休）`,
desc: `深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。`
},{
id: "masaji",
name: "療癒鬆筋精品鋪",
subtitle: "從手感到生活，讓自己成為身體真正的夥伴",
product: "販售：深層鬆筋護理服務與精品服飾",
coords: { x: 35, y: 38 },
img: 'img/store (13).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: `11：00～18：00 
(星期三到星期日)`,
desc: `34年來，老闆專注於「讓人從裡到外都放鬆」，親手為每位客人提供深層鬆筋護理，解開筋膜沾黏，讓身體重獲輕盈感。近期，她進修身心靈療癒，結合七輪、五行與芳香精油，打造客製化滾珠瓶，幫助釋放壓力與疲憊。

店內不僅有專業護理，還精選獨特精品服飾與小物，兼具實用與美感。私人訂製精油體驗，更讓每位顧客從身到心找到專屬平衡。

在這裡，護理不是單純消費，而是一種長期陪伴，讓身心同時得到呵護。
`
},{
id: "shot",
name: "稜光映像",
subtitle: "把美好的瞬間，化作永恆的記憶",
product: "販售：專業攝影服務",
coords: { x: 35, y: 38 },
img: 'img/store (7).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: `預約制
聯絡方式：0911205370`,
desc: `「喀擦」——快門聲響起的瞬間，光影被攝影師凝結成故事。位在菱潭街上的「稜光映像」，以預約制經營，讓每一位客人都能擁有專屬的拍攝時光。

不同於匆促的快速攝影，這裡強調細緻與從容。攝影師會傾聽需求，耐心調整姿勢、表情與燈光，等待最自然的神采浮現。

在菱潭街的氛圍裡，稜光映像像是一個安靜的節點，用鏡頭留存屬於每個人的獨特篇章。

這裡留下的，不只是照片，而是一段能被記住的時光。
`
},{
id: "stone",
name: "乘石匠物所",
subtitle: "水晶所串起的，是一段專屬於你的療癒旅程",
product: "販售：水晶飾品與脈輪療癒服務",
coords: { x: 35, y: 38 },
img: 'img/store (12).png', 
photos: [                           
'pic/stone1.jpg',
],
ownerName: "小哥",
hours: `17：00～20：00 
(星期三到星期日)`,
desc: `想放鬆，讓自己被療癒嗎？

 在 「乘石匠務所」，店主透過脈輪服務，帶領你覺察當下最需要的能量。這是一場柔和的交流，不是檢測，而是一段理解自我的過程。

依循服務結果，挑選合適的水晶，慢慢串連成一條專屬手串。每一顆晶石都承載著獨特寓意：守護、平衡，或是一份小小的祝福。當雙手專注於穿引時，思緒漸漸安靜下來，療癒就在其中發生。

「乘石匠務所」在夜晚迎接來訪，為忙碌後的你留下片刻靜謐。開啟一段專屬於你的療癒旅程。
`
},{
id: "noodle",
name: "阿海麵店",
subtitle: "一碗承載著記憶的麵的味道，讓人流連忘返",
product: "販售：各式麵食",
coords: { x: 35, y: 38 },
img: 'img/store (15).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "12:00–20:00（週三公休）",
desc: `熱湯翻滾的聲響，伴隨麵香瀰漫街頭，空氣裡的鹹香與暖意，總能讓人停下腳步。

在阿海麵店，烹調不是例行的動作，而是一份不容妥協的專注。火候的拿捏、湯頭的濃淡、調味的比例，步步都要到位，唯恐稍有偏差。這種細膩的堅持，讓一碗麵不僅僅是果腹，而是承載了記憶與傳承。

即使口碑傳開，許多媒體也曾報導。但這些外在聲音，對阿海麵店來說都只是附帶。對店主來說，真正的價值，在於每一位坐下來的人，都能從從這碗麵中體會到這份不曾變過的好滋味。

一碗麵，延續著上一代留下的手藝與滋味。它不只是一餐的飽足，而是一份堅持，一份歷史的記憶。
`
},{
id: "cafe",
name: "AIR KAFE",
subtitle: "來品味溫暖，走進菱潭街的小秘境",
product: "販售：咖啡",
coords: { x: 35, y: 38 },
img: 'img/store (8).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: `10：00～18：00
(星期四至星期日)`,
desc: `走進菱潭街，你會被Air Kafe散發的濃郁咖啡香與溫暖氛圍吸引。

創辦人憑多年咖啡經驗，七年前以「把咖啡做好」為初心創業，帶來手沖咖啡與自家烘焙豆。店內提供外帶與少量精緻甜點，讓逛街或散步時也能享受片刻療癒。

熟悉的味道、用心的調配，以及與新老客的互動，都承載著對社區的情感與承諾。無論是咖啡愛好者或想放鬆的人，都能在這裡找到屬於自己的溫暖角落。`
},{
id: "god",
name: "龍潭神捕",
subtitle: "甚麼都能補!",
product: "販售：修補各式物品",
coords: { x: 35, y: 38 },
img: 'img/store (14).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: `08:00–18:00
（全年無休，只休星期八）`,
desc: `在龍潭老街的街角，「神補」朱大哥的修補行默默守護街區超過三十年。鍋碗瓢盆、鞋子、收音機，甚至各種奇趣小物，在他手中都能重獲新生。接手老師傅的店舖，朱大哥以「什麼都能補」的口號吸引客人，而隨著時間與客人之間的口碑，成為街區熟客心中的必訪匠人。

除了專業修補，他也陪伴街區走過繁華與沉寂，參與市場、美食街活動，並成為第八屆組織成員，維護地方文化。每一件物品在他手中延續生命，每一次服務也延續人情味。

來「神補」，不只是修補舊物，更是感受老街匠心與日常力量的溫度。`
},
];

const markerLayer   = document.getElementById("store-markers");
const infoBox       = document.getElementById("info-box");
const infoTitle     = document.getElementById("info-title");
const infoSubtitle  = document.getElementById("info-subtitle");
const infoDesc      = document.getElementById("info-desc");
const infoClose     = document.getElementById("info-close");
const infoLogo      = document.getElementById("info-logo");
const infoOwnerPhoto= document.getElementById("info-owner-photo");
const infoOwnerName = document.getElementById("info-owner-name");


let __shopSlideTimer = null;
function __setupShopSlideshow(infoBoxEl, photos, fallbackImg){
  const body = infoBoxEl.querySelector('.info-body') || infoBoxEl;
  let slideshow = infoBoxEl.querySelector('.slideshow');
  if (!slideshow) {
    slideshow = document.createElement('div');
    slideshow.className = 'slideshow';
    slideshow.style.marginBottom = '10px';
    body.prepend(slideshow);
  }
slideshow.innerHTML = '';
const img = document.createElement('img');

img.style.width = '100%';
img.style.aspectRatio = '16 / 9';
img.style.objectFit = 'cover';
img.style.borderRadius = '8px';
img.style.display = 'block';
slideshow.appendChild(img);

let idx = 0;
const list = Array.isArray(photos) && photos.length ? photos.slice() : (fallbackImg ? [fallbackImg] : []);
if (!list.length) return;

img.src = list[0];

if (__shopSlideTimer) {
  clearInterval(__shopSlideTimer);
  __shopSlideTimer = null;
}
if (list.length > 1) {
  __shopSlideTimer = setInterval(() => {
    idx = (idx + 1) % list.length;
    img.src = list[idx];
  }, 3000);
}
}

function positionInfoBox() {
    if (!infoBox) return;
    const map = document.querySelector('.map-container');
    if (!map) return;
    const rect   = map.getBoundingClientRect();
    const padding= 12;
    const boxW   = infoBox.offsetWidth || 340;
    const nav    = document.querySelector('nav.fixed');
    const navH   = (nav && nav.offsetHeight) ? nav.offsetHeight : 64;
    let top  = rect.top + padding;
    let left = rect.right - boxW - padding;
    top  = Math.max(top, navH + 8);
    left = Math.max(left, 8);
    left = Math.min(left, window.innerWidth - boxW - 8);
    infoBox.style.position = 'fixed';
    infoBox.style.top  = `${top}px`;
    infoBox.style.left = `${left}px`;
    infoBox.style.right= 'auto';
    
}


if (markerLayer && infoBox) {
  stores.forEach(store => {
    const btn = document.createElement("button");
    btn.style.left = store.coords.x + "%";
    btn.style.top  = store.coords.y + "%";
    btn.innerHTML = `
    <img src="${store.mascotSrc}" alt="${store.name}">
    <span class="marker-label">${store.name}</span>
    `;

    btn.addEventListener("click", () => {
      infoTitle.textContent    = store.name || "未命名店鋪";
      infoSubtitle.textContent = store.subtitle || "";
      infoDesc.textContent     = store.desc || "";

      
      try {
        __setupShopSlideshow(infoBox, store.photos, store.img);
      } catch (e) {
      console.warn('slideshow error', e);
    }
  if (store.logoSrc) {
    infoLogo.src = store.logoSrc;
    infoLogo.alt = `${store.name} Logo`;
    infoLogo.style.display = "";
  } else {
  infoLogo.style.display = "none";
}

if (store.ownerPhoto) {
  infoOwnerPhoto.src = store.ownerPhoto;
  infoOwnerPhoto.alt = `${store.name} 店主照片`;
  infoOwnerPhoto.style.display = "";
} else {
infoOwnerPhoto.style.display = "none";
}
infoOwnerName.textContent = store.ownerName || "";

infoBox.classList.remove("hidden");
positionInfoBox();


});

markerLayer.appendChild(btn);
});

infoClose && infoClose.addEventListener("click", () => {
  infoBox.classList.add("hidden");

  if (__shopSlideTimer) { clearInterval(__shopSlideTimer); __shopSlideTimer = null; }
  
});

const mapContainer = document.querySelector('.map-container');
mapContainer && mapContainer.addEventListener('click', (e) => {
  if (e.target.closest('.marker-layer button')) return;
  infoBox.classList.add('hidden');

  if (__shopSlideTimer) { clearInterval(__shopSlideTimer); __shopSlideTimer = null; }
  
});
}

(function(){

  const box = document.querySelector('#section8 .info-box');
  if (!box) return;
  const closeBtn = box.querySelector('.info-close');

  window.openShopInfoFixed = function(){
    box.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

function close7(){
  box.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}
closeBtn?.addEventListener('click', close7);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close7(); });
})();



(function () {
  const header = document.querySelector('nav.fixed');

  function easeInOutQuad(t){ return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }

  function animateScrollTo(toY, duration = 700) {
    const startY = window.pageYOffset;
    const delta  = toY - startY;
    const start  = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const y = startY + delta * easeInOutQuad(t);
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
    }
  requestAnimationFrame(step);
}

function scrollToHash(hash, replaceHistory = false) {
  const target = document.querySelector(hash);
  if (!target) return;

  const headerH = header ? header.offsetHeight : 0;
  const extraGap = 12; 
  const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - extraGap;

  animateScrollTo(top, 720);  
  if (replaceHistory) history.replaceState(null, '', hash);
  else history.pushState(null, '', hash);
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const url = new URL(a.href, location.href);
  const hash = url.hash;
  if (!hash) return;

  if (url.pathname === location.pathname) {
    e.preventDefault();
    scrollToHash(hash);
  }
});

window.addEventListener('load', () => {
  if (location.hash) setTimeout(() => scrollToHash(location.hash, true), 0);
});
})();


(function () {
  const sections = ['section3', 'section4', 'section5', 'section6', 'section7'];

  // 仍保留圖片來源設定；可照原檔名路徑調整
  const IMAGE_SOURCES = {
    section3: ['./img/3_1.jpg'],
    section4: ['./img/4-1.jpg','./img/4-2.jpg','./img/4-3.jpg','./img/4-4.jpg'],
    section5: ['./img/5-1.jpg','./img/5-2.jpg','./img/5-3.jpg'],
    section6: ['./img/6-1.jpg','./img/6-2.jpg','./img/6-3.jpg'],
    section7: ['./img/7-1.jpg','./img/7-2.jpg','./img/7-3.jpg'],
  };

  // ⛔ 已撤除：黑色遮罩與 hover 中央文字的 CSS 注入
  // ⛔ 已撤除：CAPTION_SOURCES 與所有說明文字相關邏輯

  sections.forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;

    const imgBlock = root.querySelector('.image-block');
    if (!imgBlock) return;

    // 圖片來源
    const imgs = Array.from(imgBlock.querySelectorAll('img'));
    let sources = (IMAGE_SOURCES[id] && IMAGE_SOURCES[id].length)
      ? IMAGE_SOURCES[id].slice()
      : imgs.map(img => img.currentSrc || img.src).filter(Boolean);
    if (!sources.length) return;

    // 主顯示圖元
    const displayImg = imgs[0] || (function(){
      const el = document.createElement('img');
      el.alt = '';
      imgBlock.appendChild(el);
      return el;
    })();
    // 隱藏多餘 img
    imgs.slice(1).forEach(el => { el.style.display = 'none'; });

    // 導航按鈕
    let nav = imgBlock.querySelector('.img-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'img-nav';
      imgBlock.appendChild(nav);
    }
    nav.innerHTML = `
      <button class="prev" aria-label="上一張"><i class="arrow"></i></button>
      <button class="next" aria-label="下一張"><i class="arrow"></i></button>
    `;
    if (id === 'section3') nav.style.display = 'none'; // 單張不顯示切換

    // 圓點
    let dots = imgBlock.querySelector('.img-dots');
    if (!dots) {
      dots = document.createElement('div');
      dots.className = 'img-dots';
      imgBlock.appendChild(dots);
    }
    dots.innerHTML = sources.map((_, i) =>
      `<button type="button" aria-label="第 ${i+1} 張"${i===0?' aria-current="true"':''}></button>`
    ).join('');

    // 狀態 + 顯示
    let index = 0;
    function updateDots() {
      const bs = dots.querySelectorAll('button');
      bs.forEach((b,k)=> b.setAttribute('aria-current', k===index ? 'true' : 'false'));
    }
    function show(i){
      index = (i + sources.length) % sources.length;
      displayImg.src = sources[index];
      updateDots();
    }

    // 初始化
    show(0);

    // 事件
    const prevBtn = nav.querySelector('.prev');
    const nextBtn = nav.querySelector('.next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
    dots.querySelectorAll('button').forEach((b,i)=> b.addEventListener('click', ()=> show(i)));

    // 自動播放（滑入暫停、滑出繼續）
    const AUTOPLAY_MS = 5000;
    let timer = null;
    function start(){ if(!timer) timer = setInterval(()=>show(index+1), AUTOPLAY_MS); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }
    imgBlock.addEventListener('mouseenter', stop);
    imgBlock.addEventListener('mouseleave', start);
    start();
  });
})();



(function(){

  const track = document.getElementById('store-strip-track');
  if (!track || !stores || !stores.length) return;
  const prev = document.querySelector('.strip-prev');
  const next = document.querySelector('.strip-next');

  function openStoreInfo(store){
    infoTitle.textContent    = store.name || "未命名店鋪";
    infoSubtitle.textContent = store.subtitle || "";
    infoDesc.textContent     = store.desc || "";
    if (store.logoSrc) { infoLogo.src = store.logoSrc; infoLogo.alt = (store.name||"") + " Logo"; infoLogo.style.display=""; }
    else { infoLogo.style.display="none"; }
    if (store.ownerPhoto) { infoOwnerPhoto.src = store.ownerPhoto; infoOwnerPhoto.alt = (store.name||"") + " 店主照片"; infoOwnerPhoto.style.display=""; }
    else { infoOwnerPhoto.style.display="none"; }
    infoOwnerName.textContent = store.ownerName || "";
    infoBox.classList.remove("hidden");
    positionInfoBox();
    
}

stores.forEach(s => {
  const li = document.createElement('li');
  li.className = 'strip-card';
  const hoursHTML = s.hours ? `<p class="card-hours">營業時間：${s.hours}</p>` : '';
  li.innerHTML = `

  <img class="card-image" src="${s.logoSrc || s.mascotSrc || ''}" alt="${s.name || ''}">
  <div class="card-body">
  <p class="card-title">${s.name || ''}</p>
  <p class="card-sub">${s.subtitle || ''}</p>
  ${hoursHTML}
  </div>`;
  li.addEventListener('click', () => openStoreInfo(s));
  track.appendChild(li);
});

function itemsPerView(){
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth <= 640)  return 2;
  return 3;
}

let index = 0;
function update(){
  const n = itemsPerView();
  const total = track.children.length;
  const pages = Math.max(1, Math.ceil(total / n));
  index = ((index % pages) + pages) % pages;
  const card = track.querySelector('.strip-card');
  const cardW = card ? card.getBoundingClientRect().width : 0;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const shift = index * (n * cardW + (n - 1) * gap);
  track.style.transform = `translateX(${-shift}px)`;
}

prev && prev.addEventListener('click', () => { index = index - 1; update(); });
next && next.addEventListener('click', () => { index = index + 1; update(); });
requestAnimationFrame(update);
})();


(function () {
  const header = document.querySelector('nav.fixed');
  const headerH = header ? header.offsetHeight : 64;

  
  const navLinks = Array.from(document.querySelectorAll('nav.fixed a[href^="#"]'));
  if (!navLinks.length) return;

  
  const secMap = new Map();
  const sections = [];
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) {
      secMap.set(id, a);
      sections.push(sec);
    }
});
if (!sections.length) return;

let currentId = null;


const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.__v = e.intersectionRatio);

  
  const top = sections
  .filter(s => (s.__v || 0) > 0)
  .sort((a, b) => (b.__v || 0) - (a.__v || 0))[0];

  if (!top) return;
  if (top.id === currentId) return;

  
  if (currentId && secMap.get(currentId)) {
    secMap.get(currentId).classList.remove('is-active');
  }
currentId = top.id;
const link = secMap.get(currentId);
link && link.classList.add('is-active');


if (history.replaceState) history.replaceState(null, '', '#' + currentId);
}, {

rootMargin: `-${headerH + 8}px 0px -60% 0px`,
threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
});

sections.forEach(s => io.observe(s));


window.addEventListener('load', () => {
  const hashId = location.hash.replace('#', '');
  const initId = hashId && secMap.has(hashId) ? hashId : sections[0].id;
  const initLink = secMap.get(initId);
  initLink && initLink.classList.add('is-active');
});
})();




(function(){
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const pageIndicator = document.getElementById('shopPageIndicator');
  const prevBtn = document.querySelector('#section8 .shop-nav.prev');
  const nextBtn = document.querySelector('#section8 .shop-nav.next');

  
  const raw = (typeof stores !== 'undefined' && Array.isArray(stores)) ? stores : (Array.isArray(window.stores) ? window.stores : []);
  const data = raw.map((s, i) => ({
    id: (s.id || String(i)),
    name: s.name || s.title || s.storeName || '未命名店鋪',
    subtitle: s.subtitle || '',
    hours: s.hours || '',
    desc: s.desc || '',
    img: s.img || '',                 
    photos: Array.isArray(s.photos) ? s.photos.filter(Boolean) : [] ,
    product: s.product ?? s.products ?? s.goods ?? s.sell ?? ''
    
  }));

const pageSize = 4;
let page = 0;

function pageCount(){ return Math.max(1, Math.ceil(data.length / pageSize)); }

function render(){
  const start = page * pageSize;
  const slice = data.slice(start, start + pageSize);

  grid.innerHTML = slice.map(item => `
  <li class="store-card" data-id="${item.id}" tabindex="0">
    <figure class="store-figure">
      ${item.img ? `<img src="${item.img}" alt="${item.name} 圖像">` : ''}
    </figure>
    <div class="store-text">
      <div class="store-name">${item.name}</div>
      <div class="store-sub">${item.subtitle || ''}</div>
      <div class="store-product">${item.product}</div>
    </div>
  </li>
`).join('');


  const total = pageCount();
  pageIndicator.textContent = total > 1 ? `第 ${page+1} / ${total} 頁` : '';
  pageIndicator.setAttribute('aria-hidden', total <= 1 ? 'true' : 'false');
}

function goto(delta){
  const total = pageCount();
  page = (page + delta + total) % total; 
  render();
}

prevBtn?.addEventListener('click', () => goto(-1));
nextBtn?.addEventListener('click', () => goto(+1));


// === Section8：手機（<=640px）左右滑動切頁 ===
(function(){
  const isPhone = () => window.matchMedia('(max-width: 640px)').matches;
  const viewport = document.querySelector('#section8 .shop-viewport');
  if (!viewport) return;

  let startX=0,startY=0,dx=0,dy=0,tracking=false,locked=null;
  const THRESHOLD = 40; // 觸發翻頁的最小水平距離
  const MIN_HINT = 10;  // 初期判向門檻

  function onTouchStart(e){
    if (!isPhone()) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    startX=t.clientX; startY=t.clientY;
    dx=dy=0; tracking=true; locked=null;
  }
  function onTouchMove(e){
    if (!tracking || !isPhone()) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    dx = t.clientX - startX;
    dy = t.clientY - startY;
    if (!locked){
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > MIN_HINT) locked='h';
      else if (Math.abs(dy) > Math.abs(dx)) locked='v';
    }
    if (locked==='h') e.preventDefault();
  }
  function onTouchEnd(){
    if (!tracking || !isPhone()) return; tracking=false;
    if (locked==='h' && Math.abs(dx)>=THRESHOLD){
      if (typeof goto === 'function'){
        if (dx < 0) goto(+1); else goto(-1);
      }
    }
    startX=startY=dx=dy=0; locked=null;
  }
  viewport.addEventListener('touchstart', onTouchStart, {passive:true});
  viewport.addEventListener('touchmove',  onTouchMove,  {passive:false});
  viewport.addEventListener('touchend',   onTouchEnd,   {passive:true});
  viewport.addEventListener('touchcancel',onTouchEnd,   {passive:true});
})();



// ...existing code...
const modal = document.getElementById('shopModal');
const mClose = document.getElementById('shopModalClose');
const mTitle = document.getElementById('shopModalTitle');
const mHours = document.getElementById('shopModalHours');
const mSub   = document.getElementById('shopModalSubtitle');
const mDesc  = document.getElementById('shopModalDesc');

if (modal && modal.parentElement !== document.body) {
  document.body.appendChild(modal);
}

let slideImages = [];
let slideIndex = 0;
let slideTimer = null;

function stopAutoplay(){ 
  if (slideTimer) { 
    clearInterval(slideTimer); 
    slideTimer = null; 
  } 
}

function startAutoplay(interval = 3000){
  stopAutoplay();
  if (!Array.isArray(slideImages) || slideImages.length <= 1) return;
  slideTimer = setInterval(()=>{
    slideIndex = (slideIndex + 1) % slideImages.length;
    updateSlidePosition();
  }, interval);
}

// 建立 slider DOM（插入到 modal 內 .shop-slider）
function buildSlides(urls = [], altBase){
  const sliderContainer = modal.querySelector('.shop-slider');
  if (!sliderContainer) return;
  const list = Array.isArray(urls) ? urls : [];
  const trackHtml = list.map(u => `<div class="shop-slide"><img src="${u}" alt="${altBase||''} 照片"></div>`).join('');
  const arrowsHtml = list.length > 1 ? `
    <button type="button" class="img-nav prev" aria-label="上一張"><span class="arrow"></span></button>
    <button type="button" class="img-nav next" aria-label="下一張"><span class="arrow"></span></button>
  ` : '';
  const dotsHtml = `<div class="shop-slide-dots">${list.map((_,i)=>`<span class="${i===0?'active':''}" data-idx="${i}"></span>`).join('')}</div>`;

  sliderContainer.innerHTML = `<div class="shop-slide-track">${trackHtml}</div>${arrowsHtml}${dotsHtml}`;

  // 取得新建立的元素
  const trackEl = sliderContainer.querySelector('.shop-slide-track');
  const prevBtn = sliderContainer.querySelector('.img-nav.prev');
  const nextBtn = sliderContainer.querySelector('.img-nav.next');
  const dots = sliderContainer.querySelectorAll('.shop-slide-dots span');

  // 確保 layout
  if (trackEl) {
    trackEl.style.display = 'flex';
    trackEl.style.width = '100%';
    trackEl.style.transition = 'transform .35s ease';
  }

  // reset index & position
  slideIndex = 0;
  updateSlidePosition();

  // 綁定按鈕與圓點（每次建立都綁新的）
  if (list.length > 1) {
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoplay();
      slideIndex = (slideIndex - 1 + list.length) % list.length;
      updateSlidePosition();
      startAutoplay(3000);
    });
    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoplay();
      slideIndex = (slideIndex + 1) % list.length;
      updateSlidePosition();
      startAutoplay(3000);
    });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoplay();
        slideIndex = i;
        updateSlidePosition();
        startAutoplay(3000);
      });
    });

    // 側滑暫停（滑鼠移入暫停、自動播放）
    sliderContainer.addEventListener('mouseenter', () => stopAutoplay());
    sliderContainer.addEventListener('mouseleave', () => startAutoplay(3000));
  }
}

function updateSlidePosition(){
  const track = modal.querySelector('.shop-slide-track');
  const dots = modal.querySelectorAll('.shop-slide-dots span');
  if (!track) return;

  // 每張 slide 寬度為容器 100%（flex），使用百分比位移
  track.style.transform = `translateX(-${slideIndex * 100}%)`;

  // 更新 dots
  dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));

  // 顯示/隱藏箭頭（避免蓋到關閉按鈕）
  const prevBtn = modal.querySelector('.img-nav.prev');
  const nextBtn = modal.querySelector('.img-nav.next');
  const disabled = (!Array.isArray(slideImages) || slideImages.length <= 1);
  if (prevBtn) prevBtn.style.display = disabled ? 'none' : '';
  if (nextBtn) nextBtn.style.display = disabled ? 'none' : '';
}

// window resize 保持位置正確
window.addEventListener('resize', () => requestAnimationFrame(updateSlidePosition));

// open modal 並初始化 slides
function openModalFor(item){
  if (!item) return;
  mTitle.textContent = item.name || '—';
  mHours.textContent = item.hours || '';
  mSub.textContent = item.subtitle || '';
  mDesc.textContent = item.desc || '';

  slideImages = Array.isArray(item.photos) && item.photos.length ? item.photos.slice() : (item.img ? [item.img] : []);
  buildSlides(slideImages, item.name);
  startAutoplay(3000);

  const section8 = document.getElementById('section8');
  const grid = document.getElementById('shopGrid');
  if (!modal || !section8 || !grid) return;
  if (!section8.contains(modal)) section8.appendChild(modal);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  // 計算並設定彈窗位置（保留原邏輯）
  Object.assign(modal.style, {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'min(88vw, 860px)',
    maxHeight: '92vh',
    overflow: 'auto'
  });
  const secRect = section8.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  let cx = gridRect.left + gridRect.width/2 - secRect.left;
  let cy = gridRect.top + gridRect.height/2 - secRect.top;

  const PADDING = 12;
  const modalW = modal.offsetWidth || 0;
  const modalH = modal.offsetHeight || 0;
  const minX = PADDING + modalW/2;
  const maxX = Math.max(minX, section8.clientWidth - PADDING - modalW/2);
  const minY = PADDING + modalH/2;
  const maxY = Math.max(minY, section8.clientHeight - PADDING - modalH/2);
  cx = Math.min(Math.max(cx, minX), maxX);
  cy = Math.min(Math.max(cy, minY), maxY);

  modal.style.left = Math.round(cx) + 'px';
  modal.style.top  = Math.round(cy) + 'px';
}

function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.left = '';
  modal.style.top  = '';
  modal.style.transform = '';
  stopAutoplay();
}

// 綁定關閉
mClose?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

// 允許外部呼叫 openModalFor（保持與既有呼叫相容）
window.openModalFor = window.openModalFor || openModalFor;

// refresh helper（若外部呼叫）
function refreshShopSlides(){
  try{ requestAnimationFrame(updateSlidePosition); }catch(e){}
}
// ...existing code...
  
  
  
  const CARD_SELECTOR = 'li, .strip-card, .shop-card, .card';

  
  modal.addEventListener('click', (e) => e.stopPropagation());

  function shouldSkipForOpener(target){
    return !!target.closest(CARD_SELECTOR);
  }

  document.addEventListener('pointerdown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    const t = e.target;
    if (modal.contains(t)) return;            
    if (shouldSkipForOpener(t)) return;       
    closeModal();
  }, true); 

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

mClose?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.store-card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const item = data.find(d => d.id === id);
  if (!item) return;
  openModalFor(item, card);
});

grid.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const card = e.target.closest('.store-card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const item = data.find(d => d.id === id);
  if (!item) return;
  openModalFor(item, card);
});

render();
})();


(function () {
  
  const targets = Array.from(document.querySelectorAll([
    '#section2 .map-wrap',
    '#section3 .text-image-wrap',
    '#section4 .text-image-wrap',
    '#section5 .text-image-wrap',
    '#section6 .text-image-wrap',
    '#section7 .text-image-wrap',
    '#section8 .map-inner',
    '#section8 .store-strip'
  ].join(',')));

  if (!targets.length) return;

  
  let alt = 0;
  targets.forEach(el => {
    let dir = el.getAttribute('data-reveal');

    
    if (!dir && el.classList.contains('text-image-wrap')) {
      const text = el.querySelector('.text-block');
      const img  = el.querySelector('.image-block');
      if (text && img) {
        const tl = text.getBoundingClientRect().left;
        const il = img.getBoundingClientRect().left;
        dir = (tl < il) ? 'left' : 'right';
      }
    }

    
    if (!dir) dir = (alt++ % 2 === 0) ? 'left' : 'right';

    el.setAttribute('data-reveal', dir);
    el.classList.add('reveal-init');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  });

  targets.forEach(el => io.observe(el));
})();


(function () {
  const wrap = document.querySelector('#section1 .slider-container');
  if (!wrap) return;

  const textEl = wrap.querySelector('.hero-hover-overlay .overlay-text');
  if (!textEl) return;

  const getActiveSlide = () =>
    wrap.querySelector('.slide.opacity-100') ||          
    Array.from(wrap.querySelectorAll('.slide')).find(el => !el.classList.contains('opacity-0'));

  const updateCaption = () => {
    const cur = getActiveSlide();
    if (!cur) return;
    const caption = cur.getAttribute('data-caption') || cur.getAttribute('alt') || '';
    textEl.textContent = caption;
  };

  
  updateCaption();

  
  const mo = new MutationObserver(updateCaption);
  wrap.querySelectorAll('.slide').forEach(img => {
    mo.observe(img, { attributes: true, attributeFilter: ['class'] });
  });
})();


(function () {
  const wrap = document.querySelector('#section1 .slider-container');
  if (!wrap) return;

  
  const overlay = document.createElement('div');
  overlay.className = 'hero-hover-overlay';
  overlay.innerHTML = `<div class="overlay-inner"><div class="overlay-text"></div></div>`;
  wrap.appendChild(overlay);

  const textEl = overlay.querySelector('.overlay-text');
  const slides = wrap.querySelectorAll('.slide');
  if (!slides.length) return;

  
  
  function getActiveIndexByOpacity() {
    let idx = 0, max = -1;
    slides.forEach((img, i) => {
      const op = parseFloat(getComputedStyle(img).opacity || '0');
      if (op > max) { max = op; idx = i; }
    });
    return idx;
  }

  function setCaptionByIndex(i) {
    const s = slides[i];
    const cap = s.getAttribute('data-caption') || s.getAttribute('alt') || '';
    textEl.textContent = cap;
  }

  
  
  let patched = false;
  try {
    const origShow = window.showSlide || (typeof showSlide === 'function' ? showSlide : null);
    if (origShow) {
      const wrapped = function (index) {
        origShow(index);
        setCaptionByIndex(index);
      };
      
      window.showSlide = wrapped;
      try { showSlide = wrapped; } catch (e) {}
      patched = true;
    }
  } catch (e) {  }

  
  setCaptionByIndex(getActiveIndexByOpacity());

  
  if (!patched) {
    let last = -1;
    setInterval(() => {
      const now = getActiveIndexByOpacity();
      if (now !== last) {
        setCaptionByIndex(now);
        last = now;
      }
    }, 300);
  }
})();


let slideTimer = null;

function stopSlideAutoplay(){
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
}

function startAutoplay(intervalMs = 3000){
  stopSlideAutoplay();
  
  if (!Array.isArray(slideImages) || slideImages.length <= 1) return;
  slideTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % slideImages.length;
    updateSlidePosition();
  }, intervalMs);
}


const _origBuildSlides = buildSlides;
buildSlides = function(urls, altBase){
  _origBuildSlides(urls, altBase);
  startAutoplay(3000);   
};


const modalCloseBtn = document.getElementById('shopModalClose');
modalCloseBtn?.addEventListener('click', stopSlideAutoplay);


document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') stopSlideAutoplay();
});


const modalEl = document.getElementById('shopModal');
if (modalEl) {
  const mo = new MutationObserver(() => {
    const hidden = modalEl.getAttribute('aria-hidden') === 'true';
    if (hidden) stopSlideAutoplay();
  });
  mo.observe(modalEl, { attributes: true, attributeFilter: ['aria-hidden', 'class', 'style'] });
}


const dotsEl = document.getElementById('shopSlideDots');
dotsEl?.addEventListener('click', () => {
  
  startAutoplay(3000);
});






slidePrev && slidePrev && slidePrev.addEventListener('click', () => {
  if (!slideImages || !slideImages.length) return;
  stopAutoplay?.();
  slideIndex = (slideIndex - 1 + slideImages.length) % slideImages.length;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});

slideNext && slideNext && slideNext.addEventListener('click', () => {
  if (!slideImages || !slideImages.length) return;
  stopAutoplay?.();
  slideIndex = (slideIndex + 1) % slideImages.length;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});

slideDots.addEventListener('click', (e) => {
  const dot = e.target.closest('.shop-slide-dot');
  if (!dot) return;
  stopAutoplay?.();
  slideIndex = +dot.dataset.idx;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});




(function () {
  const modal = document.getElementById('shopModal');
  if (!modal) return;

  
  modal.addEventListener('click', (e) => e.stopPropagation());

  function hardClose() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  
  document.addEventListener('click', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (modal.contains(e.target)) return; 
    
    if (e.target.closest('li, .strip-card, .shop-card, .card')) return;
    hardClose();
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      hardClose();
    }
  });
})();

// === Mobile Nav Toggle (no body lock → no layout shift) ===
(function () {
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function open() {
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
  function close() {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggle() {
    if (menu.classList.contains('hidden')) open(); else close();
  }

  btn.addEventListener('click', toggle);

  // 點選選單後自動收合
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) close();
  });

  // 視窗改到 md 尺寸以上，自動收合（桌機用原生導覽）
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', () => close());

  // 按 ESC 關閉
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* === 2025-10-23 Auto-fit images — center content, show full image when possible ===
   規則：
   - 以容器與圖片的長寬比比對，差距在 6% 以內 → object-fit: contain（顯示全圖）；
     否則 → object-fit: cover（置中裁切，重心在中央）。
   - 監聽載入、視窗尺寸變化、方向改變與 DOM 變更。
   - 可用 data-fit="cover|contain" 在單張圖上強制指定，跳過自動判斷。
*/
(function(){
  const SELECTOR = [
    '#section1 .slider-container img',
    '#section2 .s2-slide > img',
    '#section3 .image-block img', '#section3 .frame-tilt img',
    '#section4 .image-block img', '#section4 .frame-tilt img',
    '#section5 .image-block img', '#section5 .frame-tilt img',
    '#section6 .image-block img', '#section6 .frame-tilt img',
    '#section7 .image-block img', '#section7 .frame-tilt img',
    '#section8 .shop-card img',   '#section8 .item-card img'
  ].join(', ');

  const THRESHOLD = 0.06; // 6% 以內視為「比例相近」

  function pickContainer(img){
    return img.closest('.s2-slide, .image-block, .frame-tilt, .slider-container, .shop-card, .item-card') || img.parentElement;
  }

  function computeFit(img, container){
    if (!img || !container) return;

    // 手動強制：data-fit="cover|contain"
    const force = img.getAttribute('data-fit');
    if (force === 'cover' || force === 'contain') {
      img.style.objectFit = force;
      img.style.objectPosition = 'center center';
      return;
    }

    const cw = container.clientWidth || container.getBoundingClientRect().width;
    const ch = container.clientHeight || container.getBoundingClientRect().height;
    const iw = img.naturalWidth  || img.width;
    const ih = img.naturalHeight || img.height;
    if (!cw || !ch || !iw || !ih) return;

    const cr = cw / ch;
    const ir = iw / ih;
    const close = Math.abs(cr - ir) / cr < THRESHOLD;

    img.style.objectPosition = 'center center';
    img.style.objectFit = close ? 'contain' : 'cover';
  }

  function retarget(root){
    const scope = root || document;
    const imgs = scope.querySelectorAll(SELECTOR);
    imgs.forEach(img => {
      const container = pickContainer(img);
      if (!container) return;
      if (img.complete && img.naturalWidth) {
        computeFit(img, container);
      } else {
        img.addEventListener('load', () => computeFit(img, container), { once: true });
      }
    });
  }

  function refreshAll(){ retarget(document); }

  window.addEventListener('load', refreshAll);
  window.addEventListener('resize', refreshAll);
  window.addEventListener('orientationchange', refreshAll);

  const mo = new MutationObserver(() => refreshAll());
  mo.observe(document.documentElement, { subtree: true, childList: true });
})();


// === Section8 modal: safety refresh after dynamic images appended ===
function refreshShopSlides(){
  try{
    if (!window.requestAnimationFrame) return updateSlidePosition && updateSlidePosition();
    requestAnimationFrame(()=>{ updateSlidePosition && updateSlidePosition(); });
  }catch(e){}
}

