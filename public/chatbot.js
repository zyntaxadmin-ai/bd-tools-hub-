/* BD Flow Helper - chat widget for https://bdtoolsflow.cyou
   Plain JavaScript, no libraries. The conversation lives in memory only.
   All text from the AI is inserted with textContent, never innerHTML. */
(function () {
  'use strict';

  if (window.__bdFlowHelperLoaded) return;
  window.__bdFlowHelperLoaded = true;

  var API_URL = '/api/chat';
  var SITE = 'https://bdtoolsflow.cyou';
  var MAX_CHARS = 500;
  var MAX_HISTORY = 10;

  var TEXT = {
    bn: {
      welcome:
        'স্বাগতম! আমি BD Flow Helper, BD Tools Flow-এর AI সহকারী। 😊 bKash চার্জ, GPA, PDF সহ ফ্রি টুল খুঁজে পেতে সাহায্য করব। কী দরকার বলুন!',
      quick: [
        ['bKash চার্জ', 'bKash ক্যাশ আউট চার্জ কীভাবে হিসাব করব?'],
        ['GPA হিসাব', 'SSC/HSC GPA ক্যালকুলেটর কোথায় পাব?'],
        ['PDF টুলস', 'PDF টুল কী কী আছে?'],
        ['যোগাযোগ', 'সমস্যা বা পরামর্শ কীভাবে জানাব?']
      ],
      placeholder: 'আপনার প্রশ্ন লিখুন…',
      send: 'পাঠান',
      newChat: 'নতুন চ্যাট',
      close: 'বন্ধ করুন',
      open: 'চ্যাট খুলুন',
      toggle: 'EN',
      toggleLabel: 'Switch to English',
      typing: 'উত্তর লিখছি…',
      netError: 'দুঃখিত, এখন উত্তর দিতে পারছি না। একটু পরে আবার চেষ্টা করুন।',
      notice: 'এটি একটি AI সহকারী। পাসওয়ার্ড, OTP, NID বা কার্ডের তথ্য লিখবেন না।',
      privacy: 'গোপনীয়তা নীতি'
    },
    en: {
      welcome:
        'Welcome! 👋 I’m BD Flow Helper, the AI assistant of BD Tools Flow. I can help you find the right free tool or understand how to use it. What would you like to do today?',
      quick: [
        ['bKash Charge', 'How do I calculate bKash cash-out charges?'],
        ['GPA Calculator', 'Where can I find the SSC/HSC GPA calculator?'],
        ['PDF Tools', 'What PDF tools are available?'],
        ['Contact', 'How can I report a problem or send a suggestion?']
      ],
      placeholder: 'Type your question…',
      send: 'Send',
      newChat: 'New chat',
      close: 'Close',
      open: 'Open chat',
      toggle: 'বাং',
      toggleLabel: 'বাংলায় দেখুন',
      typing: 'Writing a reply…',
      netError: 'Sorry, I cannot answer right now. Please try again in a moment.',
      notice: 'This is an AI assistant. Do not enter passwords, OTPs, NID or card details.',
      privacy: 'Privacy Policy'
    }
  };

  var state = { lang: 'bn', open: false, busy: false, chatId: 0, messages: [] };

  /* ---------- small helpers ---------- */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function isSiteUrl(url) {
    return url === SITE || url.indexOf(SITE + '/') === 0;
  }

  // Writes text into parent. Only links to bdtoolsflow.cyou become clickable.
  function appendLinked(parent, text) {
    var re = /https?:\/\/[^\s<>]+/g;
    var last = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      var raw = m[0];
      var trail = (raw.match(/[।.,;:!?)\]}"'”’»]+$/) || [''])[0];
      var url = trail ? raw.slice(0, raw.length - trail.length) : raw;
      parent.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (isSiteUrl(url)) {
        var a = el('a', 'bdfc-link', url);
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        parent.appendChild(a);
      } else {
        parent.appendChild(document.createTextNode(url));
      }
      parent.appendChild(document.createTextNode(trail));
      last = m.index + raw.length;
    }
    parent.appendChild(document.createTextNode(text.slice(last)));
  }

  function chatIcon() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '26');
    svg.setAttribute('height', '26');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9.5L5 22v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z');
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);
    return svg;
  }

  /* ---------- build the shell once ---------- */

  var launcher = el('button', 'bdfc-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-controls', 'bdfc-panel');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.appendChild(chatIcon());

  var panel = el('div', 'bdfc-panel');
  panel.id = 'bdfc-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'BD Flow Helper');

  var head = el('div', 'bdfc-head');
  var title = el('div', 'bdfc-title', 'BD Flow Helper');
  var langBtn = el('button', 'bdfc-headbtn');
  langBtn.type = 'button';
  var newBtn = el('button', 'bdfc-headbtn');
  newBtn.type = 'button';
  var closeBtn = el('button', 'bdfc-headbtn', '✕');
  closeBtn.type = 'button';
  head.appendChild(title);
  head.appendChild(langBtn);
  head.appendChild(newBtn);
  head.appendChild(closeBtn);

  var box = el('div', 'bdfc-messages');
  box.setAttribute('role', 'log');
  box.setAttribute('aria-live', 'polite');

  var foot = el('div', 'bdfc-foot');
  var notice = el('p', 'bdfc-notice');
  var row = el('div', 'bdfc-row');
  var input = el('input', 'bdfc-input');
  input.type = 'text';
  input.maxLength = MAX_CHARS;
  input.autocomplete = 'off';
  input.setAttribute('enterkeyhint', 'send');
  var sendBtn = el('button', 'bdfc-send');
  sendBtn.type = 'button';
  row.appendChild(input);
  row.appendChild(sendBtn);
  foot.appendChild(notice);
  foot.appendChild(row);

  panel.appendChild(head);
  panel.appendChild(box);
  panel.appendChild(foot);

  /* ---------- rendering ---------- */

  function renderLabels() {
    var t = TEXT[state.lang];
    panel.setAttribute('lang', state.lang === 'bn' ? 'bn' : 'en');
    input.placeholder = t.placeholder;
    input.setAttribute('aria-label', t.placeholder);
    sendBtn.textContent = t.send;
    newBtn.textContent = t.newChat;
    closeBtn.setAttribute('aria-label', t.close);
    langBtn.textContent = t.toggle;
    langBtn.setAttribute('aria-label', t.toggleLabel);
    launcher.setAttribute('aria-label', t.open);
    notice.textContent = '';
    notice.appendChild(document.createTextNode(t.notice + ' '));
    var a = el('a', 'bdfc-link', t.privacy);
    a.href = SITE + '/privacy-policy';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    notice.appendChild(a);
  }

  function addBubble(kind, text) {
    var bubble = el('div', 'bdfc-msg bdfc-' + kind);
    if (kind === 'user') bubble.textContent = text;
    else appendLinked(bubble, text);
    box.appendChild(bubble);
  }

  function renderMessages() {
    var t = TEXT[state.lang];
    box.textContent = '';
    addBubble('bot', t.welcome);

    if (state.messages.length === 0) {
      var quick = el('div', 'bdfc-quick');
      t.quick.forEach(function (pair) {
        var b = el('button', 'bdfc-quickbtn', pair[0]);
        b.type = 'button';
        b.addEventListener('click', function () {
          send(pair[1]);
        });
        quick.appendChild(b);
      });
      box.appendChild(quick);
    }

    state.messages.forEach(function (m) {
      addBubble(m.role === 'user' ? 'user' : m.error ? 'err' : 'bot', m.content);
    });

    if (state.busy) {
      var typing = el('div', 'bdfc-msg bdfc-bot bdfc-typing');
      typing.setAttribute('role', 'status');
      typing.setAttribute('aria-label', t.typing);
      typing.appendChild(el('span', 'bdfc-dot'));
      typing.appendChild(el('span', 'bdfc-dot'));
      typing.appendChild(el('span', 'bdfc-dot'));
      box.appendChild(typing);
    }
    box.scrollTop = box.scrollHeight;
  }

  /* ---------- sending ---------- */

  function send(text) {
    text = String(text || '').trim();
    if (!text || state.busy) return;
    if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS);

    var chatId = state.chatId;
    var userMsg = { role: 'user', content: text };
    state.messages.push(userMsg);
    input.value = '';
    state.busy = true;
    sendBtn.disabled = true;
    renderMessages();

    var history = state.messages
      .filter(function (m) {
        return !m.error && !m.failed;
      })
      .slice(-MAX_HISTORY)
      .map(function (m) {
        return { role: m.role, content: m.content };
      });

    function fail(message) {
      userMsg.failed = true;
      state.messages.push({ role: 'assistant', content: message, error: true });
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      cache: 'no-store',
      body: JSON.stringify({ messages: history })
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { ok: res.ok, data: data };
          });
      })
      .then(function (r) {
        if (chatId !== state.chatId) return;
        if (r.ok && r.data && typeof r.data.reply === 'string') {
          state.messages.push({ role: 'assistant', content: r.data.reply });
        } else {
          fail(r.data && typeof r.data.error === 'string' ? r.data.error : TEXT[state.lang].netError);
        }
      })
      .catch(function () {
        if (chatId !== state.chatId) return;
        fail(TEXT[state.lang].netError);
      })
      .then(function () {
        if (chatId !== state.chatId) return;
        state.busy = false;
        sendBtn.disabled = false;
        renderMessages();
      });
  }

  /* ---------- open / close / phone keyboard ---------- */

  function fitToViewport() {
    var vv = window.visualViewport;
    var phone = window.matchMedia && window.matchMedia('(max-width: 480px)').matches;
    if (state.open && vv && phone) {
      panel.style.height = vv.height + 'px';
      panel.style.top = vv.offsetTop + 'px';
      panel.style.bottom = 'auto';
    } else {
      panel.style.height = '';
      panel.style.top = '';
      panel.style.bottom = '';
    }
  }

  function setOpen(open) {
    state.open = open;
    panel.classList.toggle('bdfc-open', open);
    launcher.classList.toggle('bdfc-active', open);
    launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
    fitToViewport();
    if (open) {
      box.scrollTop = box.scrollHeight;
      input.focus();
    } else {
      launcher.focus();
    }
  }

  launcher.addEventListener('click', function () {
    setOpen(!state.open);
  });
  closeBtn.addEventListener('click', function () {
    setOpen(false);
  });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  sendBtn.addEventListener('click', function () {
    send(input.value);
    input.focus();
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send(input.value);
    }
  });
  langBtn.addEventListener('click', function () {
    state.lang = state.lang === 'bn' ? 'en' : 'bn';
    renderLabels();
    renderMessages();
  });
  newBtn.addEventListener('click', function () {
    state.chatId += 1;
    state.messages = [];
    state.busy = false;
    sendBtn.disabled = false;
    input.value = '';
    renderMessages();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fitToViewport);
    window.visualViewport.addEventListener('scroll', fitToViewport);
  }

  /* ---------- mount ---------- */

  function mount() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/chatbot.css';
    document.head.appendChild(css);

    renderLabels();
    renderMessages();
    document.body.appendChild(launcher);
    document.body.appendChild(panel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
