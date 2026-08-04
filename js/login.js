(() => {
  'use strict';

  const langBtn = document.getElementById('langBtn');
  const toast = document.getElementById('toast');
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const auth = window.BaoLongAuthSession;
  const api = window.BaoLongPublicApi;

  if (!auth || !api) throw new Error('BaoLong auth scripts failed to load.');

  function getLang() { return localStorage.getItem('baolongLanguage') || 'zh'; }
  function setLang(lang) { localStorage.setItem('baolongLanguage', lang); applyLang(lang); }
  function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '白名单登录 | BaoLong Lab' : 'Allowlist Login | BaoLong Lab';
    document.querySelectorAll('[data-zh][data-en]').forEach((element) => {
      element.textContent = element.dataset[lang];
    });
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.setAttribute('aria-label', lang === 'zh' ? '进入你的 BaoLong Lab' : 'Enter your BaoLong Lab');
    langBtn.textContent = '中文 / EN';
    langBtn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
  }

  function showToast(message) {
    window.clearTimeout(window.__toastTimer);
    toast.classList.remove('show');
    toast.textContent = '';
    window.requestAnimationFrame(() => {
      toast.textContent = message;
      toast.classList.add('show');
      window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
    });
  }

  function t(zh, en) { return getLang() === 'zh' ? zh : en; }

  function safeReturnTarget() {
    const token = new URLSearchParams(window.location.search).get('return');
    if (token !== 'case25') return 'index.html';
    const path = document.documentElement.dataset.baolongNoAiPreview === 'true'
      ? new URL('preview-no-ai/template-generator.html', document.baseURI).href
      : 'template-generator.html';
    return `${path}?template=su-white-model-competition-atmosphere-v1`;
  }

  function setBusy(busy) {
    loginBtn.disabled = busy;
    emailInput.disabled = busy;
    passwordInput.disabled = busy;
    loginBtn.textContent = busy ? t('正在登录…', 'Signing in…') : t('登录', 'Log in');
  }

  function mapLoginError(error) {
    if (!(error instanceof api.ApiError)) return t('登录未完成，请稍后重试。', 'Sign-in could not be completed. Please try again later.');
    if (error.code === 'PUBLIC_ACCESS_NOT_ALLOWED') return t('当前账号不在内测名单。', 'This account is not on the test allowlist.');
    if (error.code === 'PUBLIC_ORIGIN_FORBIDDEN') return t('当前访问来源不受支持。', 'This access origin is not supported.');
    if (error.code === 'CSRF_COOKIE_UNAVAILABLE') return t('安全 Cookie 未建立，请刷新后重新登录。', 'The security cookie was not established. Refresh and sign in again.');
    if (error.status === 422 || error.code === 'LOGIN_INPUT_REQUIRED') return t('请填写有效邮箱和密码。', 'Enter a valid email and password.');
    if (error.status === 429) return t('请求过于频繁，请稍后再试。', 'Too many requests. Please try again later.');
    if (error.status === 401 || error.status === 403) return t('邮箱或密码不正确。', 'The email or password is incorrect.');
    return t('登录未完成，请稍后重试。', 'Sign-in could not be completed. Please try again later.');
  }

  async function submitLogin() {
    if (loginBtn.disabled) return;
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    setBusy(true);
    try {
      await auth.login({email, password});
      passwordInput.value = '';
      if (!auth.csrfCookieToken()) {
        auth.clear();
        throw new api.ApiError({status: 403, code: 'CSRF_COOKIE_UNAVAILABLE', message: 'The readable CSRF cookie was not established.'});
      }
      showToast(t('登录成功，正在进入内测页面。', 'Signed in. Opening the test page.'));
      window.setTimeout(() => {
        window.location.assign(safeReturnTarget());
      }, 220);
    } catch (error) {
      passwordInput.value = '';
      showToast(mapLoginError(error));
      setBusy(false);
      passwordInput.focus();
    }
  }

  langBtn.addEventListener('click', () => setLang(getLang() === 'zh' ? 'en' : 'zh'));
  document.getElementById('headerHomeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.getElementById('forgotPasswordBtn').addEventListener('click', () => {
    showToast(t('找回密码仍未开放。', 'Password recovery remains closed.'));
  });
  document.getElementById('createAccountBtn').addEventListener('click', () => {
    showToast(t('普通用户注册仍未开放。', 'Public registration remains closed.'));
  });
  document.getElementById('browseHomeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  loginBtn.addEventListener('click', submitLogin);
  loginForm.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.isComposing) return;
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !['email', 'password'].includes(target.id)) return;
    event.preventDefault();
    submitLogin();
  });

  applyLang(getLang());

  auth.me({quiet: true}).then((user) => {
    if (!user) return;
    if (!auth.csrfCookieToken()) {
      auth.clear();
      showToast(t('登录会话缺少安全 Cookie，请重新登录。', 'The session is missing its security cookie. Sign in again.'));
      return;
    }
    showToast(t('当前已登录白名单账号。', 'An allowlisted account is already signed in.'));
    window.setTimeout(() => window.location.assign(safeReturnTarget()), 220);
  }).catch(() => {
    // Login page remains available; do not expose diagnostic details.
  });
})();
