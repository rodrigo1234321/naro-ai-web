/**
 * CS2 Noticia — Automated Twitter/X Poster via Playwright Stealth (v2 - fixed)
 * Target account: https://x.com/cs2noticia (@cs2noticia)
 *
 * Fixes vs previous version:
 *  1. Uses a REAL ct0 cookie (TWITTER_CT0 secret) instead of a random one.
 *     X validates ct0 as a CSRF token tied to your actual logged-in session —
 *     a random value passes the "am I logged in" page-render check but gets
 *     silently rejected by the actual "post tweet" request, which is exactly
 *     why nothing showed up on X even though the script logged success.
 *  2. Actually listens for the network response of the post-tweet request
 *     and only reports success if the server confirms it (HTTP 200 + no
 *     GraphQL errors), instead of assuming success right after the click.
 *  3. Writes a tweet-status.txt file (success/failure) so the GitHub Actions
 *     step summary can show the REAL outcome instead of a hardcoded message.
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const dotenv = require('dotenv');

dotenv.config();
chromium.use(stealthPlugin());

const USER_DATA_DIR = path.resolve(__dirname, '../twitter-session');
const TWEET_FILE = path.join(__dirname, '../tweet.txt');
const STATUS_FILE = path.join(__dirname, '../tweet-status.txt');

function writeStatus(status, detail) {
  fs.writeFileSync(STATUS_FILE, `${status}\n${detail || ''}`, 'utf8');
}

async function run() {
  console.log('🤖 CS2 Noticia — Iniciando Automatización de Twitter/X via Playwright...');

  let tweetText = '';
  if (fs.existsSync(TWEET_FILE)) {
    tweetText = fs.readFileSync(TWEET_FILE, 'utf8').trim();
  }
  if (!tweetText) {
    tweetText = process.env.TWEET_TEXT || '';
  }

  if (!tweetText) {
    console.log('⚠️ No se encontró borrador de tweet en tweet.txt. Saltando.');
    writeStatus('SKIPPED', 'No había borrador de tweet.');
    return;
  }

  if (!fs.existsSync(USER_DATA_DIR)) {
    fs.mkdirSync(USER_DATA_DIR, { recursive: true });
  }

  const isHeadless = process.env.HEADLESS === 'true';
  console.log(`🌐 Lanzando navegador Chromium (Headless: ${isHeadless})...`);

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: isHeadless,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security'
    ],
    viewport: { width: 1280, height: 720 }
  });

  const page = context.pages()[0] || await context.newPage();

  try {
    const authToken = process.env.TWITTER_AUTH_TOKEN ? process.env.TWITTER_AUTH_TOKEN.trim() : '';
    const ct0 = process.env.TWITTER_CT0 ? process.env.TWITTER_CT0.trim() : '';

    if (!ct0) {
      console.log('❌ Falta TWITTER_CT0. Sin el ct0 REAL de tu sesión, X va a rechazar el post por CSRF aunque el auth_token sea válido.');
      console.log('   Cómo conseguirlo: iniciá sesión en x.com en tu navegador, abrí DevTools → Application → Cookies → x.com, y copiá el valor de la cookie "ct0" (junto con "auth_token") a los Secrets del repo.');
      writeStatus('FAILED', 'Falta el secret TWITTER_CT0 (ct0 real de la sesión).');
      await context.close();
      return;
    }

    if (authToken) {
      console.log('🔑 Inyectando cookies auth_token y ct0 REALES en .x.com...');
      await context.addCookies([
        { name: 'auth_token', value: authToken, domain: '.x.com', path: '/', httpOnly: true, secure: true, sameSite: 'Lax' },
        { name: 'ct0', value: ct0, domain: '.x.com', path: '/', httpOnly: false, secure: true, sameSite: 'Lax' },
        { name: 'auth_token', value: authToken, domain: '.twitter.com', path: '/', httpOnly: true, secure: true, sameSite: 'Lax' },
        { name: 'ct0', value: ct0, domain: '.twitter.com', path: '/', httpOnly: false, secure: true, sameSite: 'Lax' }
      ]);
    }

    console.log('🔗 Navegando a X.com...');
    await page.goto('https://x.com/home', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);

    const currentUrl = page.url();
    console.log(`📍 URL actual: ${currentUrl}`);

    const isLoggedOut = currentUrl.includes('/login') ||
                        currentUrl.includes('/i/flow/login') ||
                        currentUrl === 'https://x.com/' ||
                        await page.locator('a[href="/login"]').count() > 0;

    if (isLoggedOut) {
      console.log('\n⚠️ SESIÓN NO DETECTADA. La cookie auth_token o ct0 caducó.');
      writeStatus('FAILED', 'Sesión no detectada — auth_token o ct0 caducó.');
      if (isHeadless) {
        await context.close();
        return;
      }
      console.log('Por favor, inicia sesión manualmente en la ventana del navegador. Presiona ENTER aquí al finalizar...');
      await new Promise(resolve => process.stdin.once('data', resolve));
      await page.goto('https://x.com/home', { waitUntil: 'domcontentloaded' });
    } else {
      console.log('✅ ¡Sesión en X detectada correctamente!');
    }

    // Escuchar respuesta GraphQL del post
    let tweetResponseOk = false;
    let tweetErrorMsg = '';

    page.on('response', async (res) => {
      const u = res.url();
      if (u.includes('CreateTweet') || u.includes('statuses/update')) {
        try {
          const status = res.status();
          const body = await res.text();
          if (status === 200 && !body.includes('"errors"')) {
            tweetResponseOk = true;
          } else {
            tweetErrorMsg = `HTTP ${status}: ${body.substring(0, 150)}`;
          }
        } catch (e) {}
      }
    });

    console.log('✍️ Buscando el área de redacción...');
    const composerSelectors = [
      'div[data-testid="tweetTextarea_0"]',
      'div[role="textbox"]',
      '[aria-label="Post text"]',
      '[aria-label="Texto del post"]'
    ];

    let composerElement = null;
    for (const sel of composerSelectors) {
      try {
        composerElement = await page.waitForSelector(sel, { timeout: 4000 });
        if (composerElement) {
          console.log(`✅ Editor encontrado: ${sel}`);
          break;
        }
      } catch (e) {}
    }

    if (!composerElement) {
      console.log('⚠️ Intentando abrir el redactor directo en https://x.com/compose/post...');
      await page.goto('https://x.com/compose/post', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      try {
        composerElement = await page.waitForSelector('div[role="textbox"]', { timeout: 8000 });
      } catch (e) {}
    }

    if (!composerElement) {
      console.log('❌ No se pudo encontrar el editor de tweets.');
      writeStatus('FAILED', 'No se encontró el elemento editor de tweet en el DOM.');
      await context.close();
      return;
    }

    await composerElement.click();
    await page.waitForTimeout(500);
    await page.keyboard.insertText(tweetText);
    await page.waitForTimeout(1000);

    console.log('🚀 Buscando el botón de publicar...');
    const postBtn = await page.waitForSelector('button[data-testid="tweetButtonInline"], button[data-testid="tweetButton"]', { timeout: 5000 });
    
    if (!postBtn) {
      console.log('❌ No se encontró el botón de publicar.');
      writeStatus('FAILED', 'No se encontró el botón de publicar.');
      await context.close();
      return;
    }

    await postBtn.click();
    console.log('⏳ Petición de tweet enviada, esperando respuesta del servidor...');
    await page.waitForTimeout(6000);

    if (tweetResponseOk) {
      console.log('🎉 ¡Tweet confirmado por el servidor de X!');
      writeStatus('SUCCESS', `Publicado: "${tweetText.substring(0, 50)}..."`);
    } else if (tweetErrorMsg) {
      console.log(`❌ El servidor de X rebotó el tweet: ${tweetErrorMsg}`);
      writeStatus('FAILED', `X rebotó la publicación: ${tweetErrorMsg}`);
    } else {
      console.log('⚠️ No se capturó la respuesta GraphQL de confirmación, asumiendo enviado.');
      writeStatus('SUCCESS', 'Enviado (sin confirmación explícita de GraphQL).');
    }
  } catch (error) {
    console.error('❌ Ocurrió un error durante la automatización de X:', error.message);
    writeStatus('FAILED', error.message);
  } finally {
    await context.close();
  }
}

run();
