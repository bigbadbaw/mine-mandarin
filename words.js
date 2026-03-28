// Dragon Words — Vocabulary Data & Utilities
// Step Up 4 (Level Learning), Units 3 and 5

var WORDS = [
  { chinese: "沙漠", pinyin: "shāmò", english: "desert", unit: "U3L1" },
  { chinese: "动物", pinyin: "dòngwù", english: "animal", unit: "U3L1" },
  { chinese: "热水", pinyin: "rèshuǐ", english: "hot water", unit: "U3L1" },
  { chinese: "森林", pinyin: "sēnlín", english: "forest", unit: "U3L1" },
  { chinese: "大海", pinyin: "dàhǎi", english: "ocean / sea", unit: "U3L1" },
  { chinese: "很干", pinyin: "hěn gān", english: "very dry", unit: "U3L1" },
  { chinese: "海洋", pinyin: "hǎiyáng", english: "ocean", unit: "U3L1" },
  { chinese: "还有", pinyin: "háiyǒu", english: "also / and also", unit: "U3L1" },
  { chinese: "树干", pinyin: "shùgàn", english: "tree trunk", unit: "U3L1" },
  { chinese: "昆虫", pinyin: "kūnchóng", english: "insect", unit: "U3L2" },
  { chinese: "蛋", pinyin: "dàn", english: "egg", unit: "U3L2" },
  { chinese: "植物", pinyin: "zhíwù", english: "plant", unit: "U3L2" },
  { chinese: "陆地", pinyin: "lùdì", english: "land", unit: "U3L2" },
  { chinese: "栖息地", pinyin: "qīxīdì", english: "habitat", unit: "U3L2" },
  { chinese: "湿地", pinyin: "shīdì", english: "wetland", unit: "U3L2" },
  { chinese: "环境", pinyin: "huánjìng", english: "environment", unit: "U3L2" },
  { chinese: "水鸟", pinyin: "shuǐniǎo", english: "water bird", unit: "U3L2" },
  { chinese: "之间", pinyin: "zhījiān", english: "between / among", unit: "U3L2" },
  { chinese: "食物链", pinyin: "shíwùliàn", english: "food chain", unit: "U3L3" },
  { chinese: "重要", pinyin: "zhòngyào", english: "important", unit: "U3L3" },
  { chinese: "组成", pinyin: "zǔchéng", english: "to make up / compose", unit: "U3L3" },
  { chinese: "阳光", pinyin: "yángguāng", english: "sunlight", unit: "U3L3" },
  { chinese: "地球", pinyin: "dìqiú", english: "Earth / globe", unit: "U3L3" },
  { chinese: "各种各样", pinyin: "gèzhǒng gèyàng", english: "all kinds of / various", unit: "U3L3" },
  { chinese: "开始", pinyin: "kāishǐ", english: "to begin / start", unit: "U3L3" },
  { chinese: "放风筝", pinyin: "fàng fēngzheng", english: "fly a kite", unit: "U5L1" },
  { chinese: "划船", pinyin: "huáchuán", english: "row a boat", unit: "U5L1" },
  { chinese: "爬山", pinyin: "páshān", english: "climb a mountain", unit: "U5L1" },
  { chinese: "大雁", pinyin: "dàyàn", english: "wild goose", unit: "U5L1" },
  { chinese: "滑雪", pinyin: "huáxuě", english: "skiing / ski", unit: "U5L1" },
  { chinese: "风景", pinyin: "fēngjǐng", english: "scenery / landscape", unit: "U5L1" },
  { chinese: "春天", pinyin: "chūntiān", english: "spring (season)", unit: "U5L1" },
  { chinese: "花儿", pinyin: "huār", english: "flower", unit: "U5L1" },
  { chinese: "季节", pinyin: "jìjié", english: "season", unit: "U5L1" },
  { chinese: "回答", pinyin: "huídá", english: "to answer", unit: "U5L2" },
  { chinese: "下雨", pinyin: "xiàyǔ", english: "to rain", unit: "U5L2" },
  { chinese: "玩儿", pinyin: "wánr", english: "to play", unit: "U5L2" },
  { chinese: "昨天", pinyin: "zuótiān", english: "yesterday", unit: "U5L2" },
  { chinese: "怎么样", pinyin: "zěnmeyàng", english: "how / what's it like", unit: "U5L2" },
  { chinese: "睡觉", pinyin: "shuìjiào", english: "to sleep", unit: "U5L2" },
  { chinese: "接着", pinyin: "jiēzhe", english: "then / followed by", unit: "U5L2" },
  { chinese: "时候", pinyin: "shíhòu", english: "time / moment / when", unit: "U5L2" },
  { chinese: "天气", pinyin: "tiānqì", english: "weather", unit: "U5L2" },
  { chinese: "滚雪球", pinyin: "gǔn xuěqiú", english: "roll a snowball", unit: "U5L3" },
  { chinese: "胳膊", pinyin: "gēbo", english: "arm", unit: "U5L3" },
  { chinese: "胡萝卜", pinyin: "húluóbo", english: "carrot", unit: "U5L3" },
  { chinese: "扣子", pinyin: "kòuzi", english: "button", unit: "U5L3" },
  { chinese: "窗外", pinyin: "chuāngwài", english: "outside the window", unit: "U5L3" },
  { chinese: "周围", pinyin: "zhōuwéi", english: "surroundings / around", unit: "U5L3" },
  { chinese: "围巾", pinyin: "wéijīn", english: "scarf", unit: "U5L3" },
  { chinese: "戴帽子", pinyin: "dài màozi", english: "wear a hat", unit: "U5L3" },
  { chinese: "堆雪人", pinyin: "duī xuěrén", english: "build a snowman", unit: "U5L3" }
];

// Study mode filters
var STUDY_MODES = {
  all: { label: "All Words", filter: () => true },
  u3: { label: "Unit 3", filter: w => w.unit.startsWith("U3") },
  u5: { label: "Unit 5", filter: w => w.unit.startsWith("U5") },
  u3l1: { label: "U3 Lesson 1", filter: w => w.unit === "U3L1" },
  u3l2: { label: "U3 Lesson 2", filter: w => w.unit === "U3L2" },
  u3l3: { label: "U3 Lesson 3", filter: w => w.unit === "U3L3" },
  u5l1: { label: "U5 Lesson 1", filter: w => w.unit === "U5L1" },
  u5l2: { label: "U5 Lesson 2", filter: w => w.unit === "U5L2" },
  u5l3: { label: "U5 Lesson 3", filter: w => w.unit === "U5L3" },
  mastered: { label: "Review Mastered", filter: w => getWordProgress(w.chinese).mastered }
};

// ============================================================
//  MINECRAFT ASSET CDN
// ============================================================
var MC_CDN_ITEM = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.21.1/assets/minecraft/textures/item/';
var MC_CDN_BLOCK = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.21.1/assets/minecraft/textures/block/';

var MC_ICONS = {
  diamond:    MC_CDN_ITEM + 'diamond.png',
  wooden_sword: MC_CDN_ITEM + 'wooden_sword.png',
  stone_sword:  MC_CDN_ITEM + 'stone_sword.png',
  iron_sword:   MC_CDN_ITEM + 'iron_sword.png',
  diamond_sword: MC_CDN_ITEM + 'diamond_sword.png',
  netherite_sword: MC_CDN_ITEM + 'netherite_sword.png',
  blaze_powder: MC_CDN_ITEM + 'blaze_powder.png',
  book:         MC_CDN_ITEM + 'book.png',
  enchanted_book: MC_CDN_ITEM + 'enchanted_book.png',
  paper:        MC_CDN_ITEM + 'paper.png',
  emerald:      MC_CDN_ITEM + 'emerald.png',
  redstone:     MC_CDN_ITEM + 'redstone.png',
  note_block:   MC_CDN_BLOCK + 'note_block.png',
  tnt_side:     MC_CDN_BLOCK + 'tnt_side.png',
  grass_block:  MC_CDN_BLOCK + 'grass_block_side.png',
};

// Helper to create an <img> with fallback
var MC_FALLBACK_COLORS = {
  diamond: '#5DE8F0', wooden_sword: '#A47834', stone_sword: '#7A7A7A',
  iron_sword: '#CCCCCC', diamond_sword: '#5DE8F0', netherite_sword: '#333333',
  blaze_powder: '#FFD700', book: '#86642A', enchanted_book: '#9B59B6',
  paper: '#F5F5DC', emerald: '#5A9B3C', redstone: '#CC3333',
  note_block: '#86642A', tnt_side: '#CC3333', grass_block: '#5A9B3C',
};

function mcIconFallback(el) {
  var w = el.width || 32;
  var c = el.getAttribute('data-fallback') || '#7A7A7A';
  var d = document.createElement('div');
  d.style.cssText = 'width:' + w + 'px;height:' + w + 'px;background:' + c + ';border:2px solid #000;display:inline-block';
  el.replaceWith(d);
}

function mcIcon(name, size, extraClass) {
  var sz = size || 32;
  var cls = 'mc-icon' + (extraClass ? ' ' + extraClass : '');
  var color = MC_FALLBACK_COLORS[name] || '#7A7A7A';
  return '<img src="' + MC_ICONS[name] + '" class="' + cls + '" width="' + sz + '" height="' + sz +
    '" data-fallback="' + color + '" onerror="mcIconFallback(this)" alt="' + name + '">';
}

// ============================================================
//  TIER / XP PROGRESSION SYSTEM
// ============================================================
var TIERS = [
  { name: 'Wooden Sword',    icon: 'wooden_sword',    xp: 0,   color: '#A47834', msg: 'Starting gear!' },
  { name: 'Stone Sword',     icon: 'stone_sword',     xp: 50,  color: '#7A7A7A', msg: 'Upgraded!' },
  { name: 'Iron Sword',      icon: 'iron_sword',      xp: 150, color: '#CCCCCC', msg: 'Getting stronger!' },
  { name: 'Diamond Sword',   icon: 'diamond_sword',   xp: 350, color: '#5DE8F0', msg: 'LEGENDARY WARRIOR!' },
  { name: 'Netherite Sword', icon: 'netherite_sword',  xp: 700, color: '#555555', msg: 'ULTIMATE MASTER!' },
];

function getTotalXP() {
  try { return parseInt(localStorage.getItem("dragonwords_xp")) || 0; } catch { return 0; }
}

function addXP(n) {
  var oldXP = getTotalXP();
  var oldTier = getTierForXP(oldXP);
  var newXP = oldXP + n;
  localStorage.setItem("dragonwords_xp", newXP);
  var newTier = getTierForXP(newXP);
  if (newTier.name !== oldTier.name) {
    // Tier up! Return the new tier for animation
    return { xp: newXP, tierUp: newTier };
  }
  return { xp: newXP, tierUp: null };
}

function getTierForXP(xp) {
  var tier = TIERS[0];
  for (var i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].xp) { tier = TIERS[i]; break; }
  }
  return tier;
}

function getTierIndex(xp) {
  for (var i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].xp) return i;
  }
  return 0;
}

function getXPProgressToNextTier(xp) {
  var idx = getTierIndex(xp);
  if (idx >= TIERS.length - 1) return { pct: 100, current: xp, needed: TIERS[idx].xp, next: null };
  var current = xp - TIERS[idx].xp;
  var needed = TIERS[idx + 1].xp - TIERS[idx].xp;
  return { pct: Math.min(100, Math.round((current / needed) * 100)), current: current, needed: needed, next: TIERS[idx + 1] };
}

// Legacy compat: keep getTotalDiamonds/addDiamonds wrappers pointing to XP
function getTotalDiamonds() { return getTotalXP(); }
function addDiamonds(n) { return addXP(n); }

// ============================================================
//  ACHIEVEMENTS
// ============================================================
var ACHIEVEMENTS_KEY = 'dragonwords_achievements';

function getAchievements() {
  try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)) || {}; } catch { return {}; }
}

function unlockAchievement(id) {
  var ach = getAchievements();
  if (ach[id]) return false; // already unlocked
  ach[id] = Date.now();
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(ach));
  return true; // newly unlocked
}

function hasAchievement(id) {
  return !!getAchievements()[id];
}

// --- localStorage Progress ---
var STORAGE_KEY = "dragonwords_progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getWordProgress(chinese) {
  const prog = loadProgress();
  return prog[chinese] || { correct: 0, mastered: false, lastSeen: 0 };
}

function recordCorrect(chinese) {
  const prog = loadProgress();
  if (!prog[chinese]) prog[chinese] = { correct: 0, mastered: false, lastSeen: 0 };
  prog[chinese].correct++;
  prog[chinese].lastSeen = Date.now();
  if (prog[chinese].correct >= 3) prog[chinese].mastered = true;
  saveProgress(prog);
  return prog[chinese];
}

function recordWrong(chinese) {
  const prog = loadProgress();
  if (!prog[chinese]) prog[chinese] = { correct: 0, mastered: false, lastSeen: 0 };
  prog[chinese].lastSeen = Date.now();
  saveProgress(prog);
}

function getMasteredCount() {
  const prog = loadProgress();
  return Object.values(prog).filter(p => p.mastered).length;
}

// --- Spaced Repetition Light ---
function buildSessionQueue(words) {
  const prog = loadProgress();
  const unmastered = words.filter(w => { const p = prog[w.chinese]; return !p || !p.mastered; });
  const mastered = words.filter(w => { const p = prog[w.chinese]; return p && p.mastered; });

  let queue = [];
  const batchSize = 10;
  const unmasteredMastered = unmastered.filter(w => { const p = prog[w.chinese]; return p && p.correct >= 2; });
  const batchReady = unmasteredMastered.length / Math.min(batchSize, unmastered.length) >= 0.7;

  let currentBatch;
  if (batchReady && unmastered.length > batchSize) {
    currentBatch = unmastered.slice(0, batchSize * 2);
  } else {
    currentBatch = unmastered.slice(0, batchSize);
  }

  let masteredIdx = 0;
  for (let i = 0; i < currentBatch.length; i++) {
    queue.push(currentBatch[i]);
    if ((i + 1) % 4 === 0 && mastered.length > 0) {
      queue.push(mastered[masteredIdx % mastered.length]);
      masteredIdx++;
    }
  }

  if (queue.length === 0) {
    queue = shuffleArray([...mastered]).slice(0, 15);
  }

  return shuffleArray(queue);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- TTS ---
var ttsReady = false;
var ttsVoice = null;

function initTTS() {
  const synth = window.speechSynthesis;
  function findVoice() {
    const voices = synth.getVoices();
    ttsVoice = voices.find(v => v.lang === 'zh-CN') ||
               voices.find(v => v.lang.startsWith('zh')) || null;
    ttsReady = true;
  }
  if (synth.getVoices().length > 0) findVoice();
  synth.addEventListener('voiceschanged', findVoice);
}

function speakChinese(text) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  if (ttsVoice) utterance.voice = ttsVoice;
  synth.speak(utterance);
  return utterance;
}

// --- Pinyin matching ---
function normalizePinyin(str) {
  return str.toLowerCase().trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function pinyinExactMatch(input, target) {
  return input.trim().toLowerCase() === target.trim().toLowerCase();
}

function pinyinLooseMatch(input, target) {
  return normalizePinyin(input) === normalizePinyin(target);
}
