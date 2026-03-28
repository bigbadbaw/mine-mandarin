// Dragon Words — Main Application Logic

// ========== STATE ==========
var currentModule = null;
var currentMode = 'all';
var sessionQueue = [];
var sessionIndex = 0;
var sessionXP = 0;
var sessionStreak = 0;
var sessionBestStreak = 0;
var sessionCorrect = 0;
var sessionTotal = 0;
var sessionNewMastered = 0;
var revealed = false;
var ttsInitialized = false;
var micFailCount = 0;
var cardAttempts = 0;
var cardCorrect = false;
var inputLocked = false;
var requeuedWords = [];

// ========== CREEPER SVG CONSTANT ==========
var CREEPER_SVG_STRING = '<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block;width:100%;height:100%">' +
  '<rect x="0" y="0" width="1080" height="1080" fill="rgb(29, 181, 60)"/>' +
  '<g transform="matrix(1, 0, 0, 1, 1.534, -73.165)">' +
    '<rect x="162.98" y="225.18" width="240.09" height="229.043" fill="rgb(0,0,0)"/>' +
    '<rect x="163.213" y="225.574" width="64.832" height="228.084" fill="rgb(7, 62, 33)"/>' +
    '<rect x="163.291" y="223.08" width="239.415" height="43.174" fill="rgb(8, 61, 32)"/>' +
  '</g>' +
  '<g transform="matrix(1, 0, 0, 1, 486.138, -59.903)">' +
    '<rect x="162.98" y="225.18" width="240.09" height="229.043" fill="rgb(0,0,0)"/>' +
    '<rect x="339.636" y="222.239" width="64.832" height="232.013" fill="rgb(7, 62, 33)"/>' +
    '<rect x="163.291" y="223.08" width="239.415" height="43.174" fill="rgb(8, 61, 32)"/>' +
  '</g>' +
  '<rect x="407.652" y="496.72" width="229.654" height="288.882" fill="rgb(0,0,0)"/>' +
  '<rect x="408.112" y="443.469" width="229.654" height="58.917" fill="rgb(8, 61, 32)"/>' +
  '<rect x="292.922" y="502.117" width="114.094" height="62.302" fill="rgb(8, 61, 32)"/>' +
  '<rect x="638.473" y="502.591" width="114.244" height="62.302" fill="rgb(8, 61, 32)"/>' +
  '<rect x="636.169" y="565.958" width="116.499" height="393.218" fill="rgb(0,0,0)"/>' +
  '<rect x="293.611" y="562.607" width="116.499" height="393.218" fill="rgb(0,0,0)"/>' +
  '</svg>';

// ========== PASSWORD GATE ==========
var CORRECT_PASSWORD = 'dragonsword';

function checkPasswordAuth() {
  try {
    if (localStorage.getItem('mm_auth') === 'true') return true;
  } catch(e) {}
  return false;
}

function checkPassword() {
  var input = document.getElementById('password-input');
  if (!input) return;
  var val = input.value.trim().toLowerCase();
  var correct = CORRECT_PASSWORD.toLowerCase();

  if (val === correct) {
    try { localStorage.setItem('mm_auth', 'true'); } catch(e) {}
    var ps = document.getElementById('password-screen');
    if (ps) ps.style.display = 'none';
    var app = document.getElementById('app-container');
    if (app) app.style.display = '';
    initApp();
  } else {
    showWrongPasswordFeedback();
  }
}

function showWrongPasswordFeedback() {
  var screen = document.getElementById('password-screen');
  if (screen) {
    screen.classList.add('wrong-flash');
    setTimeout(function() { screen.classList.remove('wrong-flash'); }, 600);
  }
  var msg = document.getElementById('wrong-message');
  if (msg) msg.style.display = 'block';
  var input = document.getElementById('password-input');
  if (input) { input.value = ''; input.focus(); }
}

// ========== INIT ==========
var micPermissionRequested = false;

document.addEventListener('DOMContentLoaded', function() {
  // Password gate
  if (checkPasswordAuth()) {
    var ps = document.getElementById('password-screen');
    if (ps) ps.style.display = 'none';
    var app = document.getElementById('app-container');
    if (app) app.style.display = '';
    initApp();
  } else {
    var ps = document.getElementById('password-screen');
    if (ps) ps.style.display = '';
    var app = document.getElementById('app-container');
    if (app) app.style.display = 'none';
    // Focus input
    var input = document.getElementById('password-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') checkPassword();
      });
    }
  }
});

function initApp() {
  initTTS();
  renderHome();
  checkTTSWarning();
  document.addEventListener('touchstart', initTTSOnTouch, { once: true });
  document.addEventListener('click', initTTSOnTouch, { once: true });

  // iOS standalone PWA: request mic permission on first touch
  document.addEventListener('touchend', function onFirstTouch() {
    if (!micPermissionRequested) {
      micPermissionRequested = true;
      requestMicPermission();
    }
    document.removeEventListener('touchend', onFirstTouch);
  }, { once: true });

  // Also handle click for non-touch
  document.addEventListener('click', function onFirstClick() {
    if (!micPermissionRequested) {
      micPermissionRequested = true;
      requestMicPermission();
    }
    document.removeEventListener('click', onFirstClick);
  }, { once: true });

  // Check mic on startup for standalone mode
  checkMicOnStartup();

  // Show browser compatibility banner if needed
  showBrowserCompatBanner();

  // Fix orientation change jitter — disable transitions during rotation
  window.addEventListener('orientationchange', function() {
    document.body.classList.add('no-transitions');
    setTimeout(function() {
      document.body.classList.remove('no-transitions');
      // Recalculate viewport height after rotation
      if (window.visualViewport) {
        document.documentElement.style.setProperty('--vh', window.visualViewport.height + 'px');
      }
    }, 400);
  });

  // Track visual viewport height for iOS
  if (window.visualViewport) {
    document.documentElement.style.setProperty('--vh', window.visualViewport.height + 'px');
    window.visualViewport.addEventListener('resize', function() {
      document.documentElement.style.setProperty('--vh', window.visualViewport.height + 'px');
    });
  }
}

function initTTSOnTouch() {
  if (!ttsInitialized) {
    var u = new SpeechSynthesisUtterance('');
    u.lang = 'zh-CN'; u.volume = 0;
    window.speechSynthesis.speak(u);
    ttsInitialized = true;
  }
}

// ========== MIC PERMISSION (iOS PWA) ==========
function isStandalone() {
  return window.navigator.standalone === true ||
         window.matchMedia('(display-mode: standalone)').matches;
}

function requestMicPermission() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.warn('[Mic] getUserMedia not available');
    return;
  }
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
    stream.getTracks().forEach(function(track) { track.stop(); });
    console.log('[Mic] Permission granted');
    localStorage.setItem('micPermissionGranted', 'true');
    // Remove any banner
    var banner = document.getElementById('mic-banner');
    if (banner) banner.remove();
  }).catch(function(err) {
    console.warn('[Mic] Permission denied or unavailable:', err.name);
    localStorage.setItem('micPermissionGranted', 'false');
    if (err.name === 'NotAllowedError') {
      showMicDeniedBanner();
    }
  });
}

function checkMicOnStartup() {
  if (!isStandalone()) return;
  console.log('[Mic] Running in standalone PWA mode');

  if (navigator.permissions) {
    navigator.permissions.query({ name: 'microphone' }).then(function(result) {
      console.log('[Mic] Permission state:', result.state);
      if (result.state === 'denied') {
        showMicDeniedBanner();
      } else if (result.state === 'prompt') {
        showMicPromptBanner();
      }
    }).catch(function() {
      // permissions API not available — rely on first-touch request
      showMicPromptBanner();
    });
  } else {
    // No permissions API — show prompt banner
    showMicPromptBanner();
  }
}

function showMicPromptBanner() {
  if (document.getElementById('mic-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'mic-banner';
  banner.innerHTML = mcIcon('note_block', 24) +
    '<span style="font-family:Press Start 2P,monospace;font-size:clamp(5px,0.9vw,8px)">TAP ANYWHERE TO ENABLE MIC</span>';
  banner.style.cssText =
    'position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;' +
    'background:#1A6B70;color:#FFD700;padding:10px 16px;display:flex;' +
    'align-items:center;gap:10px;justify-content:center;z-index:9998;' +
    'border-bottom:3px solid #5DE8F0;text-shadow:1px 1px 0 #000;';
  document.body.appendChild(banner);

  // Auto-remove after mic permission granted
  document.addEventListener('touchend', function() {
    setTimeout(function() {
      var b = document.getElementById('mic-banner');
      if (b) b.remove();
    }, 800);
  }, { once: true });
}

function showMicDeniedBanner() {
  // Remove prompt banner if present
  var old = document.getElementById('mic-banner');
  if (old) old.remove();

  if (document.getElementById('mic-denied-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'mic-denied-banner';
  banner.innerHTML =
    '<span style="font-family:Press Start 2P,monospace;font-size:clamp(4px,0.7vw,7px);text-align:center;line-height:1.6">' +
    'MIC BLOCKED<br>Settings → Safari → Microphone → Allow' +
    '</span>';
  banner.style.cssText =
    'position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;' +
    'background:#8B1A1A;color:#FFD700;padding:10px 16px;display:flex;' +
    'align-items:center;justify-content:center;z-index:9998;' +
    'border-bottom:3px solid #CC3333;text-shadow:1px 1px 0 #000;cursor:pointer;';
  banner.onclick = function() { banner.remove(); };
  document.body.appendChild(banner);
}

function checkTTSWarning() {
  setTimeout(function() {
    var voices = window.speechSynthesis.getVoices();
    if (voices.length > 0 && !voices.some(function(v) { return v.lang.startsWith('zh'); })) showTTSWarning();
  }, 2000);
}

function showTTSWarning() {
  var w = document.createElement('div');
  w.className = 'tts-warning';
  w.innerHTML = '<span>No Chinese voice found. Install it:</span><br>' +
    '<span>Settings → Accessibility → Spoken Content → Voices → Chinese (Simplified)</span><br>' +
    '<span class="tts-warning-close" onclick="this.parentElement.remove()">OK</span>';
  document.body.appendChild(w);
}

// ========== NAVIGATION ==========
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  updateNavButtons();
}

function updateNavButtons() {
  var home = document.getElementById('home-screen').classList.contains('active');
  var enchant = document.getElementById('enchant-screen').classList.contains('active');
  var showModuleNav = !home && !enchant;
  var homeBtn = document.getElementById('top-bar-home');
  var wordsBtn = document.getElementById('top-bar-words');
  if (homeBtn) homeBtn.style.display = showModuleNav ? 'flex' : 'none';
  if (wordsBtn) wordsBtn.style.display = showModuleNav ? 'flex' : 'none';
}

function goHome() {
  cleanupMicAndTTS();
  showScreen('home-screen');
  renderHome();
}

// ========== HOME SCREEN ==========
function renderHome() {
  var mastered = getMasteredCount();
  var total = WORDS.length;
  var pct = Math.round((mastered / total) * 100);
  var xp = getTotalXP();
  var tier = getTierForXP(xp);
  var prog = getXPProgressToNextTier(xp);

  // Tier display
  document.getElementById('home-tier-icon').innerHTML = mcIcon(tier.icon, 48);
  document.getElementById('home-tier-name').textContent = tier.name;
  document.getElementById('home-xp-total').textContent = xp + ' XP';

  // XP bar (progress to next tier)
  document.getElementById('xp-fill').style.width = prog.pct + '%';
  document.getElementById('xp-text').textContent = prog.next
    ? prog.current + '/' + prog.needed + ' to ' + prog.next.name
    : 'MAX TIER!';

  // Mastery bar
  document.getElementById('mastery-fill').style.width = pct + '%';
  document.getElementById('mastery-text').textContent = mastered + '/' + total + ' mastered';

  // Top bar
  updateHomeTopBar(xp, tier);
  updateCreeper('idle');
}

function updateHomeTopBar(xp, tier) {
  document.getElementById('home-topbar-icon').innerHTML = mcIcon(tier.icon, 24);
  document.getElementById('home-topbar-xp').textContent = xp;
}

// ========== STUDY MODE ==========
function selectMode(mode) {
  currentMode = mode;
  document.getElementById('mode-label').textContent = STUDY_MODES[mode].label;
}

function openModeSelector() {
  var el = document.getElementById('mode-dropdown');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ========== START MODULE ==========
function startModule(module) {
  // Clean up mic/TTS from previous module
  cleanupMicAndTTS();
  currentModule = module;

  if (module === 'enchant') {
    startEnchantTable();
    return;
  }

  var modeFilter = STUDY_MODES[currentMode].filter;
  var filtered = WORDS.filter(modeFilter);
  if (filtered.length === 0) { alert('No words in this category yet!'); return; }

  sessionQueue = buildSessionQueue(filtered);
  sessionIndex = 0;
  sessionXP = 0;
  sessionStreak = 0;
  sessionBestStreak = 0;
  sessionCorrect = 0;
  sessionTotal = 0;
  sessionNewMastered = 0;
  revealed = false;

  document.getElementById('top-bar-title').textContent =
    module === 'readsay' ? 'Read & Say' :
    module === 'sayit' ? 'Say It In Chinese' : 'Mine The Word';

  updateTopBar();
  showScreen('card-screen');
  renderCard();
}

function updateTopBar() {
  var xp = getTotalXP();
  var tier = getTierForXP(xp);
  var prog = getXPProgressToNextTier(xp);
  document.getElementById('session-tier-icon').innerHTML = mcIcon(tier.icon, 20);
  document.getElementById('session-xp').textContent = '+' + sessionXP;
  document.getElementById('session-streak').textContent = sessionStreak;

  // Session XP bar
  var bar = document.getElementById('session-xp-bar');
  if (bar) bar.style.width = prog.pct + '%';
}

// ============================================================
//  ACHIEVEMENT TOAST — Minecraft style
// ============================================================
var achievementQueue = [];
var achievementShowing = false;

function showAchievement(iconName, title, name) {
  achievementQueue.push({ iconName: iconName, title: title, name: name });
  if (!achievementShowing) processAchievementQueue();
}

function processAchievementQueue() {
  if (achievementQueue.length === 0) { achievementShowing = false; return; }
  achievementShowing = true;
  var a = achievementQueue.shift();
  var el = document.createElement('div');
  el.className = 'achievement-toast';
  el.innerHTML = mcIcon(a.iconName, 32) +
    '<div><span class="achievement-title">' + a.title + '</span><span class="achievement-name">' + a.name + '</span></div>';
  document.body.appendChild(el);
  setTimeout(function() { el.classList.add('show'); }, 50);
  setTimeout(function() { el.classList.remove('show'); }, 3200);
  setTimeout(function() { el.remove(); processAchievementQueue(); }, 3600);
}

// Check and trigger milestone achievements
function checkMilestoneAchievements() {
  var mastered = getMasteredCount();
  var total = WORDS.length;
  var pct = Math.round((mastered / total) * 100);

  if (pct >= 10 && unlockAchievement('mastery_10')) {
    showAchievement('emerald', 'Milestone Reached', '10% Mastered!');
  }
  if (pct >= 25 && unlockAchievement('mastery_25')) {
    showAchievement('emerald', 'Milestone Reached', '25% Mastered!');
  }
  if (pct >= 50 && unlockAchievement('mastery_50')) {
    showAchievement('diamond', 'Halfway There!', '50% Mastered!');
  }
}

// ============================================================
//  ENCHANTMENT TABLE — Study / Browse Mode
// ============================================================
var enchantWords = [];
var enchantIndex = 0;
var enchantMode = 'all';
var enchantWriters = [];

function startEnchantTable() {
  enchantMode = currentMode;
  var modeFilter = STUDY_MODES[enchantMode].filter;
  enchantWords = WORDS.filter(modeFilter);
  if (enchantWords.length === 0) { alert('No words in this category!'); return; }
  enchantIndex = 0;
  showScreen('enchant-screen');
  renderEnchantCard();
}

function destroyEnchantWriters() {
  enchantWriters.forEach(function(w) { try { w.cancelQuiz(); } catch(e) {} });
  enchantWriters = [];
}

function renderEnchantCard() {
  destroyEnchantWriters();
  var word = enchantWords[enchantIndex];
  var container = document.getElementById('enchant-card');
  var counter = document.getElementById('enchant-counter');
  counter.textContent = (enchantIndex + 1) + ' / ' + enchantWords.length;

  var chars = word.chinese.split('');
  var charBoxes = chars.map(function(ch, i) {
    return '<div class="hw-char-box">' +
      '<div class="hw-char-target" id="hw-target-' + i + '"></div>' +
      '<div class="hw-char-label" lang="zh-CN">' + ch + '</div>' +
      '<div class="hw-char-btns" id="hw-btns-' + i + '">' +
        '<button class="hw-btn" onclick="enchantAnimate(' + i + ')">▶ ANIMATE</button>' +
      '</div></div>';
  }).join('');

  container.innerHTML =
    '<div class="enchant-unit">' + word.unit + '</div>' +
    '<div class="card-chinese' + (word.chinese.length > 3 ? ' small' : '') + '" lang="zh-CN">' + word.chinese + '</div>' +
    '<div class="card-pinyin">' + word.pinyin + '</div>' +
    '<div class="card-english">' + word.english + '</div>' +
    '<button class="tts-btn" onclick="speakEnchant()" id="enchant-tts">' + mcIcon('note_block', 24) + '</button>' +
    '<div class="hw-section" id="hw-section">' +
      '<div class="hw-section-title">' + mcIcon('paper', 16) + ' STROKE ORDER</div>' +
      '<div class="hw-chars-row">' + charBoxes + '</div>' +
    '</div>';

  setTimeout(function() { speakChinese(word.chinese); }, 300);
  setTimeout(function() { initEnchantWriters(chars); }, 100);
}

function initEnchantWriters(chars) {
  if (typeof HanziWriter === 'undefined') {
    var section = document.getElementById('hw-section');
    if (section) section.style.display = 'none';
    return;
  }
  var boxSize = chars.length >= 4 ? 100 : chars.length === 3 ? 120 : chars.length === 1 ? 200 : 160;
  chars.forEach(function(ch, i) {
    var targetId = 'hw-target-' + i;
    var target = document.getElementById(targetId);
    if (!target) return;
    try {
      var writer = HanziWriter.create(targetId, ch, {
        width: boxSize, height: boxSize, padding: 10,
        showOutline: true, showCharacter: false,
        strokeColor: '#5DE8F0', outlineColor: '#444444',
        drawingColor: '#FFD700', drawingWidth: 10,
        showHintAfterMisses: 2, highlightOnComplete: true, highlightColor: '#5DE8F0',
        charDataLoader: function(char, onComplete) {
          fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + char + '.json')
            .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
            .then(function(data) { onComplete(data); })
            .catch(function() {
              var box = document.getElementById(targetId);
              if (box) { var p = box.closest('.hw-char-box'); if (p) p.style.display = 'none'; }
            });
        }
      });
      writer._charIndex = i;
      enchantWriters[i] = writer;
    } catch(e) {
      var section = document.getElementById('hw-section');
      if (section) section.style.display = 'none';
    }
  });
}

function enchantAnimate(idx) {
  var writer = enchantWriters[idx];
  if (!writer) return;
  writer.animateCharacter({
    onComplete: function() {
      var btns = document.getElementById('hw-btns-' + idx);
      if (btns) {
        btns.innerHTML =
          '<button class="hw-btn hw-btn-practice" onclick="enchantPractice(' + idx + ')">PRACTICE</button>' +
          '<button class="hw-btn" onclick="enchantAnimate(' + idx + ')">▶ REPLAY</button>';
      }
    }
  });
}

function enchantPractice(idx) {
  var writer = enchantWriters[idx];
  if (!writer) return;
  var btns = document.getElementById('hw-btns-' + idx);
  if (btns) btns.innerHTML = '<button class="hw-btn" onclick="enchantReset(' + idx + ')">↩ RESET</button>';
  writer.quiz({
    onMistake: function() {},
    onCorrectStroke: function() {},
    onComplete: function() {
      var target = document.getElementById('hw-target-' + idx);
      if (target) { target.style.boxShadow = '0 0 20px #5DE8F0'; setTimeout(function() { target.style.boxShadow = ''; }, 800); }
      if (btns) {
        btns.innerHTML = mcIcon('emerald', 18) +
          '<button class="hw-btn" onclick="enchantReset(' + idx + ')">↩ RESET</button>';
      }
    }
  });
}

function enchantReset(idx) {
  var chars = enchantWords[enchantIndex].chinese.split('');
  var ch = chars[idx];
  var targetId = 'hw-target-' + idx;
  var target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = '';
  target.style.boxShadow = '';
  var btns = document.getElementById('hw-btns-' + idx);
  if (btns) btns.innerHTML = '<button class="hw-btn" onclick="enchantAnimate(' + idx + ')">▶ ANIMATE</button>';
  if (typeof HanziWriter === 'undefined') return;
  var boxSize = chars.length >= 4 ? 100 : chars.length === 3 ? 120 : chars.length === 1 ? 200 : 160;
  try {
    var writer = HanziWriter.create(targetId, ch, {
      width: boxSize, height: boxSize, padding: 10,
      showOutline: true, showCharacter: false,
      strokeColor: '#5DE8F0', outlineColor: '#444444',
      drawingColor: '#FFD700', drawingWidth: 10,
      showHintAfterMisses: 2, highlightOnComplete: true, highlightColor: '#5DE8F0',
      charDataLoader: function(char, onComplete) {
        fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + char + '.json')
          .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
          .then(function(data) { onComplete(data); })
          .catch(function() {});
      }
    });
    enchantWriters[idx] = writer;
  } catch(e) {}
}

function speakEnchant() {
  var word = enchantWords[enchantIndex];
  var btn = document.getElementById('enchant-tts');
  if (btn) btn.classList.add('speaking');
  var utt = speakChinese(word.chinese);
  if (utt) {
    utt.onend = function() { if (btn) btn.classList.remove('speaking'); };
    setTimeout(function() { if (btn) btn.classList.remove('speaking'); }, 3000);
  }
}

function enchantPrev() { if (enchantIndex > 0) { enchantIndex--; renderEnchantCard(); } }
function enchantNext() { if (enchantIndex < enchantWords.length - 1) { enchantIndex++; renderEnchantCard(); } }

function selectEnchantFilter(mode) {
  enchantMode = mode;
  var modeFilter = STUDY_MODES[mode].filter;
  enchantWords = WORDS.filter(modeFilter);
  if (enchantWords.length === 0) { alert('No words here!'); return; }
  enchantIndex = 0;
  document.getElementById('enchant-filter-label').textContent = STUDY_MODES[mode].label;
  document.getElementById('enchant-filter-dropdown').style.display = 'none';
  renderEnchantCard();
}

function toggleEnchantFilter() {
  var el = document.getElementById('enchant-filter-dropdown');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ============================================================
//  SHARED SPEECH RECOGNITION ENGINE
// ============================================================
var speechRecAvailable = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
var recognitionActive = false;
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
var isIPhone = /iPhone/.test(navigator.userAgent);
var micPermissionCached = false; // once confirmed, skip pre-check on iPad
var activeMicStream = null;
var activeRecognition = null;

// Stop mic + TTS when app goes to background or loses focus
function cleanupMicAndTTS() {
  if (activeMicStream) {
    activeMicStream.getTracks().forEach(function(t) { t.stop(); });
    activeMicStream = null;
  }
  if (activeRecognition) {
    try { activeRecognition.abort(); } catch(e) {}
    activeRecognition = null;
  }
  recognitionActive = false;
  hideListeningUI();
  window.speechSynthesis.cancel();
}

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    cleanupMicAndTTS();
  } else {
    // App returned to foreground — reset state cleanly
    recognitionActive = false;
    micPermissionCached = false;
    hideListeningUI();
  }
});

window.addEventListener('blur', function() {
  cleanupMicAndTTS();
});

// Detect non-Safari iOS or Firefox for compatibility banner
var isIOSSafari = isIOS && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);
var isFirefox = /Firefox/.test(navigator.userAgent) && !isIOS;
var isIOSNonSafari = isIOS && !isIOSSafari;

function showBrowserCompatBanner() {
  if (localStorage.getItem('mm_browser_banner_dismissed')) return;
  var msg = '';
  if (isIOSNonSafari) {
    msg = 'For best experience use Safari on iPhone/iPad';
  } else if (isFirefox) {
    msg = 'Firefox does not support microphone — Read & Say and Say It In Chinese will use self-grade mode';
  } else {
    return; // no banner needed
  }

  var banner = document.createElement('div');
  banner.id = 'browser-compat-banner';
  banner.innerHTML = '<span>' + msg + '</span><button onclick="dismissBrowserBanner()">OK</button>';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99990;background:#1A1A2E;color:#FFD700;' +
    'font-family:\'Press Start 2P\',monospace;font-size:clamp(5px,0.9vw,8px);padding:12px 16px;' +
    'display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap;' +
    'border-bottom:3px solid #FFD700;text-shadow:1px 1px 0 #000;text-align:center;line-height:1.8;';
  document.body.appendChild(banner);
}

function dismissBrowserBanner() {
  localStorage.setItem('mm_browser_banner_dismissed', 'true');
  var b = document.getElementById('browser-compat-banner');
  if (b) b.remove();
}

function startMicRecognition(expectedText, onSuccess, onFail, onUnavailable) {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { onUnavailable(); return; }
  if (recognitionActive) return;
  recognitionActive = true;

  // Cancel any TTS that might interfere with mic capture
  window.speechSynthesis.cancel();

  // iOS mic pre-check:
  // iPhone: always pre-check (strictest about mic in standalone/PWA)
  // iPad: pre-check once per session, then cache result
  var micPreCheck;
  var needsPreCheck = isIOS && navigator.mediaDevices && navigator.mediaDevices.getUserMedia &&
    (isIPhone || !micPermissionCached);

  if (needsPreCheck) {
    micPreCheck = navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      stream.getTracks().forEach(function(track) { track.stop(); });
      micPermissionCached = true;
      console.log('[Mic] Pre-check: permission active');
    }).catch(function(err) {
      console.warn('[Mic] Pre-check failed:', err.name);
      if (err.name === 'NotAllowedError') {
        recognitionActive = false;
        showMicDeniedBanner();
        onUnavailable();
        return Promise.reject(err);
      }
    });
  } else {
    micPreCheck = Promise.resolve();
  }

  micPreCheck.then(function() {
    var recognition = new SR();
    activeRecognition = recognition; // store for background cleanup
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.continuous = false;

    var resultReceived = false;
    var recTimeout = null;

    recognition.onstart = function() {
      showListeningUI();
      recTimeout = setTimeout(function() {
        if (!resultReceived) {
          console.warn('[Mic] 5s timeout — no result received');
          try { recognition.abort(); } catch(e) {}
          activeRecognition = null;
          recognitionActive = false;
          hideListeningUI();
          showNoSpeechUI();
        }
      }, 5500);
    };

    recognition.onresult = function(event) {
      resultReceived = true;
      activeRecognition = null;
      if (recTimeout) clearTimeout(recTimeout);
      hideListeningUI();
      var alternatives = Array.from(event.results[0]).map(function(r) { return r.transcript.trim(); });
      console.log('[Mic] Heard:', alternatives);
      var normalize = function(s) { return s.replace(/\s+/g, '').toLowerCase(); };
      var matched = alternatives.some(function(t) {
        return normalize(t) === normalize(expectedText) || t.includes(expectedText);
      });
      if (matched) onSuccess(alternatives[0]);
      else onFail(alternatives[0]);
    };

    recognition.onerror = function(event) {
      console.error('[Mic] Error type:', event.error);
      if (recTimeout) clearTimeout(recTimeout);
      activeRecognition = null;
      hideListeningUI();
      resultReceived = true;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        speechRecAvailable = false;
        showMicDeniedBanner();
        onUnavailable();
      } else if (event.error === 'no-speech') {
        showNoSpeechUI();
      } else if (event.error === 'network') {
        showMicErrorUI('Network error — try WiFi');
      } else if (event.error === 'audio-capture') {
        showMicErrorUI('Mic not found');
      } else {
        console.warn('[Mic] Unhandled error:', event.error);
        onFail('');
      }
    };

    recognition.onend = function() {
      if (recTimeout) clearTimeout(recTimeout);
      activeRecognition = null;
      recognitionActive = false;
      hideListeningUI();
      if (!resultReceived) {
        console.warn('[Mic] Recognition ended with no result — iOS issue');
        showNoSpeechUI();
      }
    };

    setTimeout(function() {
      try { recognition.start(); }
      catch(e) { console.error('[Mic] start() error:', e); activeRecognition = null; recognitionActive = false; speechRecAvailable = false; onUnavailable(); }
    }, 100);
  }).catch(function() {
    recognitionActive = false;
  });
}

function showMicErrorUI(msg) {
  var label = document.getElementById('mic-label');
  var btn = document.getElementById('mic-btn');
  if (label) label.textContent = msg;
  if (btn) { btn.classList.remove('listening'); btn.classList.add('no-speech');
    setTimeout(function() { if (btn) btn.classList.remove('no-speech'); if (label) label.textContent = 'SAY IT!'; }, 3000); }
}

var showNoSpeechUI = function() {
  var label = document.getElementById('mic-label');
  var btn = document.getElementById('mic-btn');
  if (label) label.textContent = "Didn't catch that! Tap to try again";
  if (btn) { btn.classList.remove('listening'); btn.classList.add('no-speech');
    setTimeout(function() { if (btn) btn.classList.remove('no-speech'); }, 2000); }
};

var showListeningUI = function() {
  var btn = document.getElementById('mic-btn');
  var label = document.getElementById('mic-label');
  if (btn) btn.classList.add('listening');
  if (label) label.textContent = 'LISTENING...';
};

var hideListeningUI = function() {
  var btn = document.getElementById('mic-btn');
  var label = document.getElementById('mic-label');
  if (btn) btn.classList.remove('listening');
  if (label) label.textContent = 'SAY IT!';
};

// ============================================================
//  RENDER CARD (dispatch to module)
// ============================================================
function getNextCard() {
  // Check if any requeued words are due
  for (var i = 0; i < requeuedWords.length; i++) {
    if (requeuedWords[i].insertAt <= sessionIndex) {
      var due = requeuedWords.splice(i, 1)[0];
      return due.word;
    }
  }
  return sessionQueue[sessionIndex];
}

function requeueWord(word, cardsLater) {
  requeuedWords.push({ word: word, insertAt: sessionIndex + cardsLater });
}

function resetCardState() {
  cardAttempts = 0;
  cardCorrect = false;
}

function renderCard() {
  if (sessionIndex >= sessionQueue.length) { showComplete(); return; }
  revealed = false;
  micFailCount = 0;
  resetCardState();
  var word = sessionQueue[sessionIndex];
  var container = document.getElementById('card-content');
  document.getElementById('card-progress').textContent = (sessionIndex + 1) + ' / ' + sessionQueue.length;

  if (currentModule === 'readsay') container.innerHTML = renderReadSayCard(word);
  else if (currentModule === 'sayit') container.innerHTML = renderSayItCard(word);
  else if (currentModule === 'mine') container.innerHTML = renderMineCard(word);

  if (currentModule === 'mine') {
    setTimeout(function() { speakChinese(word.chinese); }, 400);
  }
}

// ============================================================
//  READ & SAY
// ============================================================
function renderReadSayCard(word) {
  var sz = word.chinese.length > 3 ? ' small' : '';
  var ttsBtn = '<button class="tts-btn" onclick="playTTS()" id="tts-btn">' + mcIcon('note_block', 24) + '</button>';
  var micBtnHTML = '<button class="mic-btn" id="mic-btn" onclick="readSayMic()">' +
    '<span class="mic-icon">' + mcIcon('note_block', 48) + '</span>' +
    '<span class="mic-label" id="mic-label">SAY IT!</span></button>';
  var actionBtns = '<div class="action-row" id="action-row" style="display:none">' +
    '<button class="mc-btn mc-btn-primary" onclick="markCorrect()">' + mcIcon('emerald', 16) + ' Got it</button>' +
    '<button class="mc-btn mc-btn-danger" onclick="markWrong()">' + mcIcon('redstone', 16) + ' Again</button></div>';

  var iosHint = isIOS ? '<div class="ios-mic-hint">TAP MIC THEN SPEAK IMMEDIATELY</div>' : '';

  if (speechRecAvailable) {
    return '<div class="card-prompt">Read this out loud:</div>' +
      '<div class="card-chinese' + sz + '" lang="zh-CN">' + word.chinese + '</div>' +
      ttsBtn + micBtnHTML + iosHint +
      '<div class="speech-result" id="speech-result"></div>' +
      '<div class="card-reveal" id="card-reveal">' +
        '<div class="card-pinyin">' + word.pinyin + '</div>' +
        '<div class="card-english">' + word.english + '</div>' +
      '</div>' + actionBtns;
  }
  return '<div class="card-prompt">Read this out loud:</div>' +
    '<div class="card-chinese' + sz + '" lang="zh-CN">' + word.chinese + '</div>' +
    ttsBtn +
    '<div class="mic-unavailable">Mic unavailable — self grade</div>' +
    '<div class="card-reveal" id="card-reveal">' +
      '<div class="card-pinyin">' + word.pinyin + '</div>' +
      '<div class="card-english">' + word.english + '</div>' +
    '</div>' +
    '<button class="reveal-btn" id="reveal-btn" onclick="revealCard()">TAP TO CHECK</button>' + actionBtns;
}

function readSayMic() {
  if (inputLocked || cardCorrect) return;
  var word = sessionQueue[sessionIndex];
  var resultEl = document.getElementById('speech-result');
  startMicRecognition(word.chinese,
    function(heard) {
      // Success
      cardCorrect = true;
      cardAttempts++;
      var xpGain = cardAttempts === 1 ? 15 : 10;
      resultEl.className = 'speech-result perfect';
      resultEl.innerHTML = 'PERFECT! <span lang="zh-CN">' + heard + '</span>';
      var reveal = document.getElementById('card-reveal');
      if (reveal) reveal.classList.add('visible');
      revealed = cardAttempts > 1;
      setTimeout(function() { markCorrect(); }, 800);
    },
    function(heard) {
      // Failure
      cardAttempts++;
      var remaining = 3 - cardAttempts;
      if (cardAttempts >= 3) {
        // Third failure — creeper attack!
        resultEl.className = 'speech-result wrong';
        resultEl.innerHTML = heard ? 'I heard: <span lang="zh-CN">' + heard + '</span>' : '';
        triggerCreeperAttack(function() {
          sessionStreak = 0;
          sessionTotal++;
          recordWrong(word.chinese);
          requeueWord(word, 5);
          // Show correct answer
          var r = document.getElementById('card-reveal'); if (r) r.classList.add('visible');
          var micBtn = document.getElementById('mic-btn'); if (micBtn) micBtn.style.display = 'none';
          // Show "next" button
          resultEl.className = 'speech-result wrong';
          resultEl.innerHTML = '<div style="margin-bottom:8px">Keep practicing!</div>' +
            '<button class="mc-btn mc-btn-secondary" onclick="sessionIndex++;renderCard();updateCreeper(\'idle\')" style="font-size:9px">' +
            'NEXT WORD →</button>';
          updateTopBar();
          updateCreeper('sad');
        });
      } else {
        resultEl.className = 'speech-result wrong';
        resultEl.innerHTML = heard
          ? 'I heard: <span lang="zh-CN">' + heard + '</span> — Try again! (' + remaining + ' left)'
          : "Didn't catch that — try again! (" + remaining + ' left)';
      }
    },
    function() { speechRecAvailable = false; renderCard(); }
  );
}

// ============================================================
//  SAY IT IN CHINESE
// ============================================================
var showPinyinHint = false;

function renderSayItCard(word) {
  var ttsBtn = '<button class="tts-btn" onclick="playTTS()" id="tts-btn">' + mcIcon('note_block', 24) + '</button>';
  var micBtnHTML = '<button class="mic-btn" id="mic-btn" onclick="sayItMic()">' +
    '<span class="mic-icon">' + mcIcon('note_block', 48) + '</span>' +
    '<span class="mic-label" id="mic-label">SAY IT!</span></button>';
  var actionBtns = '<div class="action-row" id="action-row" style="display:none">' +
    '<button class="mc-btn mc-btn-primary" onclick="markCorrect()">' + mcIcon('emerald', 16) + ' Got it</button>' +
    '<button class="mc-btn mc-btn-danger" onclick="markWrong()">' + mcIcon('redstone', 16) + ' Again</button></div>';

  var hint = '<button class="hint-toggle ' + (showPinyinHint ? 'on' : '') + '" onclick="toggleHint()">' +
    (showPinyinHint ? 'HIDE' : 'SHOW') + ' PINYIN</button>';
  var pinyinLine = showPinyinHint ? '<div class="card-pinyin">' + word.pinyin + '</div>' : '';

  var iosHint = isIOS ? '<div class="ios-mic-hint">TAP MIC THEN SPEAK IMMEDIATELY</div>' : '';

  if (speechRecAvailable) {
    return '<div class="card-prompt">Say this in Chinese:</div>' +
      '<div class="card-english" style="font-size:24px">' + word.english + '</div>' +
      hint + pinyinLine + micBtnHTML + iosHint +
      '<div class="speech-result" id="speech-result"></div>' +
      '<div class="card-reveal" id="card-reveal">' +
        '<div class="card-chinese" lang="zh-CN" style="font-size:56px">' + word.chinese + '</div>' +
        '<div class="card-pinyin">' + word.pinyin + '</div>' + ttsBtn +
      '</div>' + actionBtns;
  }
  return '<div class="card-prompt">Say this in Chinese:</div>' +
    '<div class="card-english" style="font-size:24px">' + word.english + '</div>' +
    hint + pinyinLine +
    '<div class="mic-unavailable">Mic unavailable — self grade</div>' +
    '<div class="card-reveal" id="card-reveal">' +
      '<div class="card-chinese" lang="zh-CN" style="font-size:56px">' + word.chinese + '</div>' +
      '<div class="card-pinyin">' + word.pinyin + '</div>' + ttsBtn +
    '</div>' +
    '<button class="reveal-btn" id="reveal-btn" onclick="revealCard()">TAP TO CHECK</button>' + actionBtns;
}

function sayItMic() {
  if (inputLocked || cardCorrect) return;
  var word = sessionQueue[sessionIndex];
  var resultEl = document.getElementById('speech-result');
  startMicRecognition(word.chinese,
    function(heard) {
      cardCorrect = true;
      cardAttempts++;
      var xpGain = cardAttempts === 1 ? 15 : 10;
      resultEl.className = 'speech-result perfect';
      resultEl.innerHTML = 'PERFECT! I heard: <span lang="zh-CN">' + heard + '</span>';
      var r = document.getElementById('card-reveal'); if (r) r.classList.add('visible');
      revealed = cardAttempts > 1;
      setTimeout(function() { markCorrect(); }, 800);
    },
    function(heard) {
      cardAttempts++;
      var remaining = 3 - cardAttempts;
      if (cardAttempts >= 3) {
        resultEl.className = 'speech-result wrong';
        resultEl.innerHTML = heard ? 'I heard: <span lang="zh-CN">' + heard + '</span>' : '';
        triggerCreeperAttack(function() {
          sessionStreak = 0;
          sessionTotal++;
          recordWrong(word.chinese);
          requeueWord(word, 5);
          var r = document.getElementById('card-reveal'); if (r) r.classList.add('visible');
          var micBtn = document.getElementById('mic-btn'); if (micBtn) micBtn.style.display = 'none';
          resultEl.className = 'speech-result wrong';
          resultEl.innerHTML = '<div style="margin-bottom:8px">Keep practicing!</div>' +
            '<button class="mc-btn mc-btn-secondary" onclick="sessionIndex++;renderCard();updateCreeper(\'idle\')" style="font-size:9px">' +
            'NEXT WORD →</button>';
          updateTopBar();
          updateCreeper('sad');
        });
      } else {
        resultEl.className = 'speech-result wrong';
        resultEl.innerHTML = heard
          ? 'I heard: <span lang="zh-CN">' + heard + '</span> — Try again! (' + remaining + ' left)'
          : "Didn't catch that — try again! (" + remaining + ' left)';
      }
    },
    function() { speechRecAvailable = false; renderCard(); }
  );
}

function toggleHint() { showPinyinHint = !showPinyinHint; renderCard(); }

// ============================================================
//  MINE THE WORD
// ============================================================
var mineWriteMode = null;
var isDrawing = false;
var mineCanvasCtxs = []; // array of canvas contexts (one per character)
var mineCanvasCount = 0;

function renderMineCard(word) {
  var chars = word.chinese.split('');
  mineCanvasCount = chars.length;
  console.log('[Mine] Word: ' + word.chinese + ' | Characters: ' + chars.length + ' | Canvases: ' + chars.join(', '));
  var ttsBtnLg = '<button class="tts-btn tts-btn-large" onclick="playTTS()" id="tts-btn">' + mcIcon('note_block', 32) + '</button>';

  // Build canvas boxes HTML
  var canvasBoxes = '';
  for (var i = 0; i < chars.length; i++) {
    canvasBoxes += '<div class="mine-canvas-box">' +
      '<canvas class="mine-char-canvas" id="mine-canvas-' + i + '" width="500" height="500"></canvas>' +
      '<div class="mine-canvas-footer">' +
        '<span class="mine-canvas-label">' + (i + 1) + '</span>' +
        '<button class="mine-canvas-clear" onclick="clearSingleCanvas(' + i + ')">' + mcIcon('tnt_side', 16) + '</button>' +
      '</div>' +
    '</div>';
  }

  // Layout class based on char count
  var gridClass = chars.length <= 3 ? 'mine-grid-row' : 'mine-grid-2x2';

  // Build verify section with per-character display
  var verifyChars = '';
  for (var j = 0; j < chars.length; j++) {
    verifyChars += '<div class="mine-verify-char">' +
      '<div class="mine-verify-correct" lang="zh-CN">' + chars[j] + '</div>' +
      '<div class="mine-verify-drawing" id="mine-verify-draw-' + j + '"></div>' +
    '</div>';
  }

  return '<div class="card-prompt">Listen and write the word!</div>' +
    '<div class="card-english">' + word.english + '</div>' + ttsBtnLg +
    '<div class="mine-choice" id="mine-choice">' +
      '<button class="mc-btn mc-btn-diamond" onclick="mineChoose(\'ipad\')" style="flex:1;font-size:9px;flex-direction:column;gap:4px">' +
        mcIcon('paper', 24) + ' Write on iPad</button>' +
      '<button class="mc-btn mc-btn-secondary" onclick="mineChoose(\'paper\')" style="flex:1;font-size:9px;flex-direction:column;gap:4px">' +
        mcIcon('book', 24) + ' Write on Paper</button>' +
    '</div>' +
    '<div id="mine-canvas-area" style="display:none">' +
      '<div class="mine-canvas-grid ' + gridClass + '" id="mine-canvas-grid" style="--char-count:' + chars.length + '">' +
        canvasBoxes +
      '</div>' +
      '<button class="mc-btn mc-btn-gold" onclick="mineCheck()" style="width:100%;max-width:300px;margin:8px auto;font-size:10px">CHECK IT</button>' +
    '</div>' +
    '<div id="mine-paper-area" style="display:none;text-align:center;padding:16px">' +
      '<div style="font-size:11px;color:var(--text-light);margin-bottom:16px;line-height:1.6">Write it on your paper!<br>Tap when ready to check.</div>' +
      '<button class="mc-btn mc-btn-gold" onclick="mineCheck()" style="width:100%;max-width:300px;margin:0 auto;font-size:10px">SHOW ANSWER</button>' +
    '</div>' +
    '<div id="mine-verify" style="display:none">' +
      '<div class="mine-verify-chars-row">' + verifyChars + '</div>' +
      '<div class="card-pinyin" style="text-align:center;margin-top:8px">' + word.pinyin + '</div>' +
      '<div class="mine-countdown" id="mine-countdown" style="display:none">' +
        '<div class="countdown-text" style="font-family:\'Press Start 2P\';font-size:clamp(5px,0.9vw,8px);color:#FFD700;text-shadow:1px 1px 0 #000;margin-bottom:4px;text-align:center">Check carefully... 3</div>' +
        '<div class="countdown-bar-container"><div class="countdown-bar-fill" id="mine-countdown-fill"></div></div>' +
      '</div>' +
      '<div class="action-row" style="margin-top:12px">' +
        '<button class="mc-btn mc-btn-primary" id="mine-got-it" onclick="mineGrade(true)" style="flex:1;font-size:9px" disabled>' + mcIcon('emerald', 16) + ' I GOT IT!</button>' +
        '<button class="mc-btn mc-btn-danger" id="mine-need-practice" onclick="mineGrade(false)" style="flex:1;font-size:9px">' + mcIcon('redstone', 16) + ' NEED PRACTICE</button>' +
      '</div>' +
    '</div>';
}

function mineChoose(mode) {
  mineWriteMode = mode;
  document.getElementById('mine-choice').style.display = 'none';
  if (mode === 'ipad') {
    document.getElementById('mine-canvas-area').style.display = 'block';
    setupMineCanvases();
  } else {
    document.getElementById('mine-paper-area').style.display = 'block';
  }
}

function mineCheck() {
  var word = sessionQueue[sessionIndex];
  document.getElementById('mine-canvas-area').style.display = 'none';
  document.getElementById('mine-paper-area').style.display = 'none';

  // Populate verify drawings
  if (mineWriteMode === 'ipad') {
    for (var i = 0; i < mineCanvasCount; i++) {
      var canvas = document.getElementById('mine-canvas-' + i);
      var slot = document.getElementById('mine-verify-draw-' + i);
      if (canvas && slot) {
        var img = canvas.toDataURL('image/png');
        slot.innerHTML = '<img src="' + img + '" class="mine-verify-img">';
      }
    }
  } else {
    for (var j = 0; j < mineCanvasCount; j++) {
      var slot2 = document.getElementById('mine-verify-draw-' + j);
      if (slot2) slot2.innerHTML = '<div style="display:flex;justify-content:center">' + mcIcon('paper', 40) + '</div>';
    }
  }
  document.getElementById('mine-verify').style.display = 'block';
  speakChinese(word.chinese);

  // Anti-cheat: disable "Got it" for 3 seconds
  var gotItBtn = document.getElementById('mine-got-it');
  var needPracticeBtn = document.getElementById('mine-need-practice');
  var countdownEl = document.getElementById('mine-countdown');
  var countdownBarFill = document.getElementById('mine-countdown-fill');

  if (gotItBtn) {
    gotItBtn.disabled = true;
    gotItBtn.style.opacity = '0.4';
  }
  if (needPracticeBtn) needPracticeBtn.disabled = false;
  if (countdownEl) countdownEl.style.display = 'block';
  if (countdownBarFill) countdownBarFill.style.width = '100%';

  var countdown = 3;
  if (countdownEl) countdownEl.querySelector('.countdown-text').textContent = 'Check carefully... ' + countdown;

  var timer = setInterval(function() {
    countdown--;
    if (countdownEl) {
      countdownEl.querySelector('.countdown-text').textContent =
        countdown > 0 ? 'Check carefully... ' + countdown : 'Ready to grade!';
    }
    if (countdownBarFill) {
      countdownBarFill.style.width = Math.round((countdown / 3) * 100) + '%';
    }
    if (countdown <= 0) {
      clearInterval(timer);
      if (gotItBtn) {
        gotItBtn.disabled = false;
        gotItBtn.style.opacity = '1';
        gotItBtn.classList.add('pulse-ready');
      }
    }
  }, 1000);
}

function mineGrade(correct) {
  if (correct) {
    // Show confirm screen before awarding XP
    var word = sessionQueue[sessionIndex];
    showMineConfirm(word, function() {
      // Confirmed correct
      mineAwardXP(word);
    }, function() {
      // Denied — honest about failure, no creeper attack
      mineMarkWrong(word);
    });
  } else {
    // "Need Practice" — honest, no creeper attack, no penalty delay
    var word = sessionQueue[sessionIndex];
    mineMarkWrong(word);
  }
}

function showMineConfirm(word, onConfirm, onDeny) {
  var overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.id = 'mine-confirm-overlay';
  overlay.innerHTML =
    '<div class="confirm-card">' +
      '<div class="confirm-char" lang="zh-CN">' + word.chinese + '</div>' +
      '<div class="confirm-pinyin">' + word.pinyin + '</div>' +
      '<p class="confirm-question">Does yours look like this?</p>' +
      '<div class="confirm-buttons">' +
        '<button class="mc-btn mc-btn-primary confirm-btn" id="confirm-yes">' + mcIcon('emerald', 16) + ' YES, I GOT IT!</button>' +
        '<button class="mc-btn mc-btn-danger confirm-btn" id="confirm-no">' + mcIcon('redstone', 16) + ' HMM, NOT QUITE</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  document.getElementById('confirm-yes').addEventListener('click', function() {
    overlay.remove();
    onConfirm();
  });
  document.getElementById('confirm-no').addEventListener('click', function() {
    overlay.remove();
    onDeny();
  });
}

function mineAwardXP(word) {
  sessionTotal++;
  sessionXP += 10;
  sessionCorrect++;
  sessionStreak++;
  if (sessionStreak > sessionBestStreak) sessionBestStreak = sessionStreak;
  var result = addXP(10);
  if (result.tierUp) showTierUp(result.tierUp);
  var prog = recordCorrect(word.chinese);
  if (prog.mastered && prog.correct === 3) {
    sessionNewMastered++;
    if (unlockAchievement('word_' + word.chinese)) {
      showAchievement('enchanted_book', 'Word Mastered!', word.chinese);
    }
  }
  showXPFloat(10);
  blockBreakEffect();
  updateCreeper('happy');
  checkStreak();
  checkMilestoneAchievements();
  updateTopBar();
  setTimeout(function() { sessionIndex++; renderCard(); updateCreeper('idle'); }, 600);
}

function mineMarkWrong(word) {
  sessionTotal++;
  sessionStreak = 0;
  recordWrong(word.chinese);
  updateCreeper('sad');
  document.getElementById('card-screen').classList.add('wrong-flash');
  setTimeout(function() { document.getElementById('card-screen').classList.remove('wrong-flash'); }, 400);
  // Requeue the word for later
  requeueWord(word, 5);
  updateTopBar();
  setTimeout(function() { sessionIndex++; renderCard(); updateCreeper('idle'); }, 600);
}

// ========== MULTI-CANVAS DRAWING ==========
var activeCanvasCtx = null; // whichever canvas is currently being drawn on

function setupMineCanvases() {
  mineCanvasCtxs = [];
  for (var i = 0; i < mineCanvasCount; i++) {
    var canvas = document.getElementById('mine-canvas-' + i);
    if (!canvas) continue;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    mineCanvasCtxs.push(ctx);

    // Touch events — each canvas independently drawn
    canvas.addEventListener('touchstart', canvasTouchStart, { passive: false });
    canvas.addEventListener('touchmove', canvasTouchMove, { passive: false });
    canvas.addEventListener('touchend', canvasTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', canvasMouseDown);
    canvas.addEventListener('mousemove', canvasMouseMove);
    canvas.addEventListener('mouseup', canvasMouseUp);
  }
}

function getTouchPos(canvas, touch) { var r = canvas.getBoundingClientRect(); return { x: (touch.clientX - r.left) * (canvas.width / r.width), y: (touch.clientY - r.top) * (canvas.height / r.height) }; }
function getMousePos(canvas, e) { var r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) }; }

function canvasTouchStart(e) {
  e.preventDefault(); isDrawing = true;
  activeCanvasCtx = e.target.getContext('2d');
  var p = getTouchPos(e.target, e.touches[0]);
  activeCanvasCtx.beginPath(); activeCanvasCtx.moveTo(p.x, p.y);
}
function canvasTouchMove(e) {
  e.preventDefault(); if (!isDrawing || !activeCanvasCtx) return;
  var p = getTouchPos(e.target, e.touches[0]);
  activeCanvasCtx.lineTo(p.x, p.y); activeCanvasCtx.stroke();
}
function canvasTouchEnd(e) { e.preventDefault(); isDrawing = false; }
function canvasMouseDown(e) {
  isDrawing = true;
  activeCanvasCtx = e.target.getContext('2d');
  var p = getMousePos(e.target, e);
  activeCanvasCtx.beginPath(); activeCanvasCtx.moveTo(p.x, p.y);
}
function canvasMouseMove(e) {
  if (!isDrawing || !activeCanvasCtx) return;
  var p = getMousePos(e.target, e);
  activeCanvasCtx.lineTo(p.x, p.y); activeCanvasCtx.stroke();
}
function canvasMouseUp() { isDrawing = false; }

function clearSingleCanvas(idx) {
  var c = document.getElementById('mine-canvas-' + idx);
  if (c) { var ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height); }
}
function clearCanvas() {
  for (var i = 0; i < mineCanvasCount; i++) clearSingleCanvas(i);
}

// ============================================================
//  CARD ACTIONS (shared)
// ============================================================
function revealCard() {
  revealed = true;
  var reveal = document.getElementById('card-reveal');
  var btn = document.getElementById('reveal-btn');
  var actions = document.getElementById('action-row');
  if (reveal) reveal.classList.add('visible');
  if (btn) btn.style.display = 'none';
  if (actions) actions.style.display = 'flex';
}

function playTTS() {
  var word = currentModule === 'enchant' ? enchantWords[enchantIndex] : sessionQueue[sessionIndex];
  var btn = document.getElementById('tts-btn') || document.getElementById('enchant-tts');
  if (btn) btn.classList.add('speaking');
  var utt = speakChinese(word.chinese);
  if (utt) {
    utt.onend = function() { if (btn) btn.classList.remove('speaking'); };
    setTimeout(function() { if (btn) btn.classList.remove('speaking'); }, 3000);
  }
}

function markCorrect() {
  var word = sessionQueue[sessionIndex];
  var xpGain = revealed ? 10 : 15;
  sessionXP += xpGain;
  sessionCorrect++;
  sessionTotal++;
  sessionStreak++;
  if (sessionStreak > sessionBestStreak) sessionBestStreak = sessionStreak;

  var result = addXP(xpGain);
  if (result.tierUp) showTierUp(result.tierUp);
  var prog = recordCorrect(word.chinese);
  if (prog.mastered && prog.correct === 3) {
    sessionNewMastered++;
    if (unlockAchievement('word_' + word.chinese)) {
      showAchievement('enchanted_book', 'Word Mastered!', word.chinese);
    }
  }

  showXPFloat(xpGain);
  blockBreakEffect();
  updateCreeper('happy');
  checkStreak();
  checkMilestoneAchievements();
  updateTopBar();
  setTimeout(function() { sessionIndex++; renderCard(); updateCreeper('idle'); }, 600);
}

function markWrong() {
  var word = sessionQueue[sessionIndex];
  sessionTotal++;
  sessionStreak = 0;
  recordWrong(word.chinese);

  if (sessionIndex + 2 < sessionQueue.length) {
    sessionQueue.splice(sessionIndex + 2 + Math.floor(Math.random() * 3), 0, word);
  } else { sessionQueue.push(word); }

  updateCreeper('sad');
  document.getElementById('card-screen').classList.add('wrong-flash');
  setTimeout(function() { document.getElementById('card-screen').classList.remove('wrong-flash'); }, 400);
  updateTopBar();
  setTimeout(function() { sessionIndex++; renderCard(); updateCreeper('idle'); }, 600);
}

function nextCard() { sessionIndex++; renderCard(); }

// ========== CREEPER ==========
function updateCreeper(state) {
  var c = document.getElementById('creeper');
  if (!c) return;
  c.className = 'creeper-face-wrap';
  if (state === 'happy') { c.classList.add('creeper-happy'); c.classList.add('creeper-bounce'); }
  else if (state === 'sad') { c.classList.add('creeper-sad'); c.classList.add('creeper-shake'); }
  else if (state === 'glow') c.classList.add('creeper-glow');
  else if (state === 'flash') c.classList.add('creeper-flash');
  else if (state === 'spin') c.classList.add('creeper-spin');
}

// ========== TIER UP ANIMATION ==========
function showTierUp(tier) {
  showAchievement(tier.icon, 'Tier Up!', tier.name);

  // Full screen flash
  var flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:' + tier.color + ';opacity:0.4;z-index:9998;pointer-events:none';
  document.body.appendChild(flash);
  setTimeout(function() { flash.style.opacity = '0'; flash.style.transition = 'opacity 0.5s'; }, 200);
  setTimeout(function() { flash.remove(); }, 800);

  // Sword drop animation
  var sword = document.createElement('div');
  sword.className = 'sword-drop';
  sword.innerHTML = mcIcon(tier.icon, 64);
  document.body.appendChild(sword);
  setTimeout(function() { sword.remove(); }, 2000);

  updateCreeper('happy');
  pixelConfetti(40);
}

// ========== STREAK ==========
function checkStreak() {
  if (sessionStreak === 3) {
    showStreakBanner('ON FIRE!');
    updateCreeper('glow');
  } else if (sessionStreak === 5) {
    showStreakBanner('POWER SURGE!');
    updateCreeper('flash');
    // Golden shimmer
    var shimmer = document.createElement('div');
    shimmer.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(45deg,transparent,rgba(255,215,0,0.15),transparent);z-index:9997;pointer-events:none;animation:shimmer 0.6s ease forwards';
    document.body.appendChild(shimmer);
    setTimeout(function() { shimmer.remove(); }, 700);
  } else if (sessionStreak === 10) {
    showStreakBanner('ENCHANTED!');
    updateCreeper('spin');
    pixelConfetti(60);
    if (unlockAchievement('streak_10')) showAchievement('blaze_powder', 'Achievement Unlocked', 'First 10-Streak!');
  } else if (sessionStreak === 20) {
    showStreakBanner('NETHERITE MIND!');
    updateCreeper('spin');
    pixelConfetti(80);
    // Dark flash with purple glow
    var dark = document.createElement('div');
    dark.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#000;opacity:0.6;z-index:9997;pointer-events:none';
    document.body.appendChild(dark);
    setTimeout(function() { dark.style.background = '#9B59B6'; dark.style.opacity = '0.2'; }, 300);
    setTimeout(function() { dark.style.opacity = '0'; dark.style.transition = 'opacity 0.5s'; }, 600);
    setTimeout(function() { dark.remove(); }, 1200);
    if (unlockAchievement('streak_20')) showAchievement('netherite_sword', 'Achievement Unlocked', 'First 20-Streak!');
  }
}

function showStreakBanner(text) {
  var el = document.createElement('div');
  el.className = 'streak-banner';
  el.innerHTML = mcIcon('blaze_powder', 24) + ' ' + text;
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 1300);
}

// ========== EFFECTS ==========
function showXPFloat(amount) {
  var el = document.createElement('div');
  el.className = 'diamond-float';
  el.innerHTML = mcIcon('diamond', 16) + ' +' + amount + ' XP';
  el.style.left = '50%'; el.style.top = '40%'; el.style.transform = 'translateX(-50%)';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 1100);
}

function blockBreakEffect() {
  var colors = ['#5A9B3C', '#86642A', '#7A7A7A', '#5DE8F0', '#FFD700'];
  for (var i = 0; i < 12; i++) {
    var p = document.createElement('div');
    p.className = 'block-break';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = '50%'; p.style.top = '40%';
    var angle = (Math.PI * 2 * i) / 12;
    var dist = 40 + Math.random() * 60;
    p.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    document.body.appendChild(p);
    setTimeout(function(el) { el.remove(); }, 700, p);
  }
}

function pixelConfetti(count) {
  var colors = ['#5DE8F0', '#FFD700', '#5A9B3C', '#CC3333', '#FF6600', '#AAAAAA'];
  for (var i = 0; i < count; i++) {
    var p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = Math.random() * 100 + 'vw'; p.style.top = '-10px';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    p.style.animationDuration = (1.5 + Math.random()) + 's';
    document.body.appendChild(p);
    setTimeout(function(el) { el.remove(); }, 3000, p);
  }
}

function diamondRain() {
  for (var i = 0; i < 20; i++) {
    var d = document.createElement('div');
    d.className = 'diamond-rain';
    d.innerHTML = mcIcon('diamond', 24);
    d.style.left = Math.random() * 100 + 'vw'; d.style.top = '-30px';
    d.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(d);
    setTimeout(function(el) { el.remove(); }, 5000, d);
  }
}

// ============================================================
//  CREEPER ATTACK ANIMATION
// ============================================================
function setInputLocked(locked) {
  inputLocked = locked;
  // Disable/enable all buttons in card area
  var btns = document.querySelectorAll('#card-content button, .mic-btn');
  btns.forEach(function(b) { b.disabled = locked; });
}

function triggerCreeperAttack(onComplete) {
  setInputLocked(true);

  var overlay = document.createElement('div');
  overlay.id = 'creeper-attack-overlay';
  overlay.innerHTML =
    '<div id="attack-creeper-wrap">' +
      '<div id="attack-creeper-face" class="creeper-face-svg">' + CREEPER_SVG_STRING + '</div>' +
    '</div>' +
    '<div id="attack-text-sss" class="attack-text" style="opacity:0">S S S S S S . . .</div>' +
    '<div id="attack-text-boom" class="attack-text attack-boom-text" style="opacity:0">BOOM!</div>' +
    '<div id="attack-text-msg" class="attack-text attack-msg-text" style="opacity:0">' +
      'YOU\'LL GET IT<br>NEXT TIME!</div>';
  document.body.appendChild(overlay);

  var wrap = document.getElementById('attack-creeper-wrap');
  var face = document.getElementById('attack-creeper-face');
  var sss  = document.getElementById('attack-text-sss');
  var boom = document.getElementById('attack-text-boom');
  var msg  = document.getElementById('attack-text-msg');

  // PHASE 1: Walk in from right (0 → 600ms)
  setTimeout(function() {
    wrap.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    wrap.style.transform = 'translateX(0)';
  }, 30);

  // PHASE 2: SSS text (650ms)
  setTimeout(function() {
    sss.style.opacity = '1';
    sss.style.animation = 'sssGlow 0.4s ease-in-out infinite alternate';
  }, 650);

  // PHASE 3: Flash white (950ms)
  setTimeout(function() {
    face.classList.add('creeper-flash');
  }, 950);

  // PHASE 4: BOOM (1400ms)
  setTimeout(function() {
    sss.style.opacity = '0';
    boom.style.opacity = '1';
    boom.style.animation = 'boomPop 0.35s ease-out forwards';

    // Screen shake
    document.body.classList.add('screen-shake');

    // Red flash
    var redFlash = document.createElement('div');
    redFlash.className = 'red-flash-overlay';
    document.body.appendChild(redFlash);
    setTimeout(function() { redFlash.remove(); }, 500);

    // Explosion particles from creeper center
    spawnExplosionParticles(wrap.getBoundingClientRect());

    // Stop flashing
    face.classList.remove('creeper-flash');

    // PHASE 4b: Creeper blasted to upper-left corner (50ms later)
    setTimeout(function() {
      wrap.style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), width 0.4s ease, height 0.4s ease';
      wrap.style.transform = 'translate(-35vw, -30vh)';
      wrap.style.width = 'clamp(40px, 8vw, 64px)';
      wrap.style.height = 'clamp(40px, 8vw, 64px)';
    }, 50);
  }, 1400);

  // PHASE 5: Message + creeper waves (2200ms)
  setTimeout(function() {
    document.body.classList.remove('screen-shake');
    boom.style.opacity = '0';
    msg.style.opacity = '1';
    msg.style.animation = 'msgSlideIn 0.4s ease-out forwards';

    // Creeper waves from corner
    wrap.style.animation = 'creeperWave 0.5s ease-in-out 2';
  }, 2200);

  // PHASE 6: Fade out and cleanup (3800ms)
  setTimeout(function() {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(function() {
      overlay.remove();
      setInputLocked(false);
      onComplete();
    }, 400);
  }, 3800);
}

function spawnExplosionParticles(rect) {
  var colors = ['#FFD700', '#CC3333', '#FF6600', '#5DE8F0', '#7A7A7A'];
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;

  for (var i = 0; i < 24; i++) {
    var p = document.createElement('div');
    var angle = (i / 24) * Math.PI * 2;
    var speed = 80 + Math.random() * 120;
    var size = 6 + Math.floor(Math.random() * 8);

    p.style.cssText =
      'position:fixed;left:' + cx + 'px;top:' + cy + 'px;' +
      'width:' + size + 'px;height:' + size + 'px;' +
      'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
      'border-radius:0;pointer-events:none;z-index:9999;image-rendering:pixelated;';
    document.body.appendChild(p);

    var tx = Math.cos(angle) * speed;
    var ty = Math.sin(angle) * speed;

    p.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(0)', opacity: 0 }
    ], {
      duration: 600 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards'
    }).onfinish = (function(el) { return function() { el.remove(); }; })(p);
  }
}

// ========== SESSION COMPLETE ==========
function showComplete() {
  showScreen('complete-screen');
  diamondRain();
  pixelConfetti(40);

  var xp = getTotalXP();
  var tier = getTierForXP(xp);
  var prog = getXPProgressToNextTier(xp);
  var mastered = getMasteredCount();
  var total = WORDS.length;
  var masteryPct = Math.round((mastered / total) * 100);

  // Rank display
  document.getElementById('complete-tier-icon').innerHTML = mcIcon(tier.icon, 64);
  document.getElementById('complete-tier-name').textContent = tier.name;

  // Stats — reveal one at a time
  var stats = document.querySelectorAll('.stat-row');
  stats.forEach(function(s, i) { s.style.opacity = '0'; s.style.transform = 'translateY(10px)'; });

  document.getElementById('complete-xp').textContent = '+' + sessionXP + ' XP';
  document.getElementById('complete-correct').textContent = sessionCorrect + ' / ' + sessionTotal;
  document.getElementById('complete-mastered').textContent = sessionNewMastered > 0 ? '+' + sessionNewMastered + ' new!' : 'None this round';
  document.getElementById('complete-streak').textContent = sessionBestStreak;

  // Mastery bar
  document.getElementById('complete-mastery-fill').style.width = '0%';
  document.getElementById('complete-mastery-text').textContent = mastered + '/' + total + ' (' + masteryPct + '%)';

  // Animate stats appearing
  stats.forEach(function(s, i) {
    setTimeout(function() {
      s.style.transition = 'all 0.3s ease';
      s.style.opacity = '1';
      s.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });

  // Animate mastery bar
  setTimeout(function() {
    document.getElementById('complete-mastery-fill').style.width = masteryPct + '%';
  }, 1200);
}

// ========== WORD LIST OVERLAY ==========
var wordlistFilterMode = 'all';

function openWordListOverlay() {
  var overlay = document.getElementById('wordlist-overlay');
  overlay.style.display = 'flex';

  // Build filter buttons
  var filters = document.getElementById('wordlist-filters');
  var modes = ['all','u3','u5','u3l1','u3l2','u3l3','u5l1','u5l2','u5l3'];
  filters.innerHTML = modes.map(function(m) {
    var active = m === wordlistFilterMode ? ' wl-filter-active' : '';
    return '<button class="wl-filter-btn' + active + '" onclick="filterWordList(\'' + m + '\')">' + STUDY_MODES[m].label + '</button>';
  }).join('');

  renderWordListItems();
}

function closeWordListOverlay() {
  document.getElementById('wordlist-overlay').style.display = 'none';
}

function filterWordList(mode) {
  wordlistFilterMode = mode;
  // Update active state
  document.querySelectorAll('.wl-filter-btn').forEach(function(btn) { btn.classList.remove('wl-filter-active'); });
  event.target.classList.add('wl-filter-active');
  renderWordListItems();
}

function renderWordListItems() {
  var container = document.getElementById('wordlist-items');
  var modeFilter = STUDY_MODES[wordlistFilterMode].filter;
  var filtered = WORDS.filter(modeFilter);
  var prog = loadProgress();

  container.innerHTML = filtered.map(function(w) {
    var p = prog[w.chinese] || { correct: 0, mastered: false };
    var icon;
    if (p.mastered) {
      icon = '<span class="word-mastered-icon">' + mcIcon('enchanted_book', 22) + '</span>';
    } else if (p.correct > 0) {
      icon = mcIcon('book', 22);
    } else {
      icon = '<span style="width:22px;height:22px;display:inline-block;background:#3A3A3A;border:2px solid #555"></span>';
    }
    return '<div class="wordlist-item">' +
      '<span class="mastery-icon">' + icon + '</span>' +
      '<span class="word-chinese" lang="zh-CN">' + w.chinese + '</span>' +
      '<span class="word-pinyin">' + w.pinyin + '</span>' +
      '<span class="word-english">' + w.english + '</span>' +
    '</div>';
  }).join('');
}

// Legacy compat — old showWordList calls redirect to overlay
function showWordList() { openWordListOverlay(); }
