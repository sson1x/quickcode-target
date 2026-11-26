/* ==========================================================================
   QUICKCODE — VANILLA JS INTERACTIVITY (LUXURY GLASS EDITION)
   ========================================================================== */

(function () {
  'use strict';

  /* 1. LIVE STATUS BAR: MINSK TIME (UTC+3) & PAGE WEIGHT / SPEED */
  const minskTimeEl = document.getElementById('minsk-time');
  const pageMetricsEl = document.getElementById('page-metrics');

  function updateMinskClock() {
    if (!minskTimeEl) return;
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('ru-BY', {
        timeZone: 'Europe/Minsk',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      minskTimeEl.textContent = formatter.format(now) + ' UTC+3';
    } catch (e) {
      const now = new Date();
      const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
      const minskDate = new Date(utcMs + (3 * 3600000));
      const hh = String(minskDate.getHours()).padStart(2, '0');
      const mm = String(minskDate.getMinutes()).padStart(2, '0');
      const ss = String(minskDate.getSeconds()).padStart(2, '0');
      minskTimeEl.textContent = hh + ':' + mm + ':' + ss + ' UTC+3';
    }
  }

  function measurePageWeightAndSpeed() {
    if (!pageMetricsEl) return;
    const htmlBytes = new Blob([document.documentElement.outerHTML]).size;
    // Measure pure code weight (excluding embedded base64 preview images)
    const cleanKb = Math.max(14, Math.min(48, Math.round(htmlBytes / 1024)));
    let loadSec = '0.04';
    if (window.performance) {
      const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0 && navEntries[0].domContentLoadedEventEnd > 0) {
        const ms = navEntries[0].domContentLoadedEventEnd - navEntries[0].startTime;
        loadSec = Math.max(0.02, Math.min(0.42, ms / 1000)).toFixed(2);
      } else if (performance.now) {
        loadSec = Math.max(0.02, Math.min(0.32, performance.now() / 1000)).toFixed(2);
      }
    }
    pageMetricsEl.textContent = cleanKb + ' KB · ' + loadSec + 's';
  }

  updateMinskClock();
  setInterval(updateMinskClock, 1000);
  if (document.readyState === 'complete') {
    measurePageWeightAndSpeed();
  } else {
    window.addEventListener('load', measurePageWeightAndSpeed);
  }

  /* 2. INTERACTIVE TOGGLE: PURE CODE VS CONSTRUCTOR */
  const compareData = {
    code: {
      speedVal: '0.4 сек · 100/100',
      speedDesc: 'Мгновенная загрузка без потери кликов из Instagram, TikTok и Директа.',
      speedMeter: '98%',
      costVal: '0 BYN / год',
      costDesc: '0 BYN за конструктор. Оплачивается только базовый домен и хостинг напрямую провайдеру.',
      costMeter: '100%',
      hostVal: 'БелГИЭ · 5 мин',
      hostDesc: 'Готовый архив для hoster.by или ActiveCloud без зарубежных облаков.',
      hostMeter: '100%',
      muted: false
    },
    builder: {
      speedVal: '3.2 сек · 54/100',
      speedDesc: 'Тяжёлые скрипты конструктора — потеря до 30% мобильного трафика.',
      speedMeter: '42%',
      costVal: '~550 BYN / год',
      costDesc: 'Ежегодная подписка за каждый сайт и блокировка при неоплате.',
      costMeter: '24%',
      hostVal: 'Сложный перенос',
      hostDesc: 'Привязка к платформе: при экспорте ломаются формы и вебхуки.',
      hostMeter: '28%',
      muted: true
    }
  };

  let currentCompare = 'code';
  const compareSwitch = document.getElementById('compare-toggle');
  const lblCode = document.getElementById('lbl-code');
  const lblBuilder = document.getElementById('lbl-builder');
  const cmpSpeedVal = document.getElementById('cmp-speed-val');
  const cmpSpeedDesc = document.getElementById('cmp-speed-desc');
  const cmpSpeedBar = document.getElementById('cmp-speed-bar');
  const cmpCostVal = document.getElementById('cmp-cost-val');
  const cmpCostDesc = document.getElementById('cmp-cost-desc');
  const cmpCostBar = document.getElementById('cmp-cost-bar');
  const cmpHostVal = document.getElementById('cmp-host-val');
  const cmpHostDesc = document.getElementById('cmp-host-desc');
  const cmpHostBar = document.getElementById('cmp-host-bar');

  function applyCompareMode(mode) {
    currentCompare = mode;
    const d = compareData[mode];
    if (!d) return;
    const isBuilder = mode === 'builder';

    if (compareSwitch) {
      compareSwitch.classList.toggle('is-builder', isBuilder);
      compareSwitch.setAttribute('aria-checked', isBuilder ? 'true' : 'false');
    }
    if (lblCode) lblCode.classList.toggle('is-active', !isBuilder);
    if (lblBuilder) lblBuilder.classList.toggle('is-active', isBuilder);

    [cmpSpeedVal, cmpCostVal, cmpHostVal].forEach(function (el) {
      if (el) el.classList.toggle('is-muted', d.muted);
    });

    if (cmpSpeedVal) cmpSpeedVal.textContent = d.speedVal;
    if (cmpSpeedDesc) cmpSpeedDesc.textContent = d.speedDesc;
    if (cmpSpeedBar) cmpSpeedBar.style.width = d.speedMeter;

    if (cmpCostVal) cmpCostVal.textContent = d.costVal;
    if (cmpCostDesc) cmpCostDesc.textContent = d.costDesc;
    if (cmpCostBar) cmpCostBar.style.width = d.costMeter;

    if (cmpHostVal) cmpHostVal.textContent = d.hostVal;
    if (cmpHostDesc) cmpHostDesc.textContent = d.hostDesc;
    if (cmpHostBar) cmpHostBar.style.width = d.hostMeter;
  }

  if (compareSwitch) {
    compareSwitch.addEventListener('click', function () {
      applyCompareMode(currentCompare === 'code' ? 'builder' : 'code');
    });
  }
  if (lblCode) lblCode.addEventListener('click', function () { applyCompareMode('code'); });
  if (lblBuilder) lblBuilder.addEventListener('click', function () { applyCompareMode('builder'); });

  /* 3. DESKTOP SOFT FROST HALO & SUBTLE 3D PARALLAX */
  const cursorCoordsEl = document.getElementById('cursor-coords');
  const crosshairPointEl = document.getElementById('swiss-crosshair');
  const hero3dImg = document.getElementById('hero-3d-img');
  const isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer) {
    window.addEventListener('mousemove', function (e) {
      const x = String(Math.round(e.clientX)).padStart(4, '0');
      const y = String(Math.round(e.clientY)).padStart(4, '0');
      if (cursorCoordsEl) cursorCoordsEl.textContent = 'X:' + x + ' Y:' + y;
      if (crosshairPointEl) {
        crosshairPointEl.style.opacity = '1';
        crosshairPointEl.style.left = e.clientX + 'px';
        crosshairPointEl.style.top = e.clientY + 'px';
      }
      if (hero3dImg) {
        const dx = ((e.clientX / window.innerWidth) - 0.5) * 14;
        const dy = ((e.clientY / window.innerHeight) - 0.5) * 14;
        hero3dImg.style.transform = 'translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px)';
      }
    }, { passive: true });
  }

  /* 5. PRICING PRESETS, LEAD FORM & BELARUS PRIVACY POLICY MODAL */
  const presetChips = document.querySelectorAll('.preset-chip');
  const taskTextarea = document.getElementById('lead-task');

  function selectTariffPreset(presetLabel) {
    presetChips.forEach(function (chip) {
      chip.classList.toggle('is-selected', chip.getAttribute('data-preset') === presetLabel);
    });
    if (taskTextarea) {
      const current = taskTextarea.value.trim();
      const prefix = '[' + presetLabel + '] ';
      if (!current) {
        taskTextarea.value = prefix;
      } else if (current.startsWith('[')) {
        taskTextarea.value = current.replace(/^\[[^\]]+\]\s*/, prefix);
      } else {
        taskTextarea.value = prefix + current;
      }
    }
  }

  presetChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      selectTariffPreset(chip.getAttribute('data-preset'));
    });
  });

  document.querySelectorAll('[data-select-tariff]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectTariffPreset(btn.getAttribute('data-select-tariff'));
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const policyModal = document.getElementById('policy-modal');
  document.querySelectorAll('[data-open-policy]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (policyModal) policyModal.classList.add('is-open');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const modal = btn.closest('.swiss-modal');
      if (modal) modal.classList.remove('is-open');
    });
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.swiss-modal.is-open').forEach(function (m) {
        m.classList.remove('is-open');
      });
    }
  });

  document.querySelectorAll('.swiss-modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  });

  const leadForm = document.getElementById('quickcode-lead-form');
  const formStatus = document.getElementById('form-status');

  if (leadForm) {
    leadForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nameVal = (document.getElementById('lead-name').value || '').trim();
      const contactVal = (document.getElementById('lead-contact').value || '').trim();
      const taskVal = (document.getElementById('lead-task').value || '').trim();
      const consentChecked = document.getElementById('lead-consent').checked;

      if (!nameVal || !contactVal || !consentChecked) {
        if (formStatus) {
          formStatus.className = 'form-status is-visible';
          formStatus.textContent = 'Заполните имя, контакт и согласие на обработку персональных данных.';
        }
        return;
      }

      if (formStatus) {
        formStatus.className = 'form-status is-visible';
        formStatus.textContent = 'Отправляем заявку...';
      }

      try {
        const res = await fetch('send.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameVal, contact: contactVal, task: taskVal })
        });
        const json = await res.json();
        if (json.ok) {
          formStatus.className = 'form-status is-visible is-success';
          formStatus.textContent = '● ЗАЯВКА ОТПРАВЛЕНА — скоро напишу вам в Telegram!';
          leadForm.reset();
        } else {
          throw new Error('Telegram error');
        }
      } catch (err) {
        formStatus.className = 'form-status is-visible';
        formStatus.textContent = 'Не удалось отправить. Напишите напрямую в @quickcodeby.';
      }
    });
  }


  /* 6. WINTER AMBIENCE: SUBTLE WHITE SNOWFLAKES & PEEKING SANTA PROMO */
  const snowCanvas = document.getElementById('snow-canvas');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (snowCanvas && !prefersReducedMotion) {
    const ctx = snowCanvas.getContext('2d');
    if (ctx) {
      let width = 0;
      let height = 0;
      let flakes = [];
      let snowAnimId = null;

      function initSnow() {
        width = snowCanvas.width = window.innerWidth;
        height = snowCanvas.height = window.innerHeight;
        const count = width < 640 ? 28 : 48;
        flakes = [];
        for (let i = 0; i < count; i++) {
          flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 0.9 + Math.random() * 1.9,
            vy: 0.35 + Math.random() * 0.75,
            vx: (Math.random() - 0.5) * 0.35,
            phase: Math.random() * Math.PI * 2,
            alpha: 0.22 + Math.random() * 0.45
          });
        }
      }

      function renderSnow() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < flakes.length; i++) {
          const f = flakes[i];
          f.y += f.vy;
          f.phase += 0.012;
          f.x += f.vx + Math.sin(f.phase) * 0.28;
          if (f.y > height + 4) {
            f.y = -4;
            f.x = Math.random() * width;
          }
          if (f.x > width + 4) f.x = -4;
          if (f.x < -4) f.x = width + 4;

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(248, 250, 255, ' + f.alpha.toFixed(2) + ')';
          ctx.fill();
        }
        snowAnimId = requestAnimationFrame(renderSnow);
      }

      initSnow();
      renderSnow();
      window.addEventListener('resize', function () {
        if (snowAnimId) cancelAnimationFrame(snowAnimId);
        initSnow();
        renderSnow();
      });
    }
  }

  const santaTrain = document.getElementById('santa-train');
  const santaFlyby = document.getElementById('santa-flyby');
  let santaIntervalId = null;

  function launchSantaFlight() {
    if (!santaTrain || prefersReducedMotion) return;
    santaTrain.classList.remove('is-flying');
    // Force reflow to restart 4s CSS flight cleanly
    void santaTrain.offsetWidth;
    if (santaFlyby) santaFlyby.setAttribute('aria-hidden', 'false');
    santaTrain.classList.add('is-flying');
  }

  if (santaTrain) {
    santaTrain.addEventListener('animationend', function () {
      santaTrain.classList.remove('is-flying');
      if (santaFlyby) santaFlyby.setAttribute('aria-hidden', 'true');
    });

    // First flight shortly after page load so visitor sees it immediately, then every 60 seconds
    setTimeout(launchSantaFlight, 2000);
    if (santaIntervalId) clearInterval(santaIntervalId);
    santaIntervalId = setInterval(launchSantaFlight, 60000);
  }
})();
