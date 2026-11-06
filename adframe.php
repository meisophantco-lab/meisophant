<?php

/*
|--------------------------------------------------------------------------
| ad-host/adframe.php: the ad page for ANOTHER domain or subdomain of yours
|--------------------------------------------------------------------------
| Why: the ad network gives nothing to the locked box on the chat's own address. Put THIS ONE FILE on a different
| address (a different domain, or a subdomain like ads.yourdomain.com that points to its own folder), add that address
| as a website in Adsterra, and tell SudoBot to use it:
|
|     define('KYRO_AD_FRAME_URL', 'https://ads.yourdomain.com/adframe.php');     // in config.local.php of the chat site
|
| The chat then shows this page in a box. Because the address is NOT the chat's, the ad network sees a normal website,
| and its code still cannot read the chat. Never put this file on the chat's own domain.
|
| It needs nothing else: no database, no other SudoBot files. Fill in the three lines below (the values Adsterra shows
| in the "Get code" snippet of the ad unit you created for THIS address).
*/

$KEY = '5a83870b41192b947c9454cf8864f66a';      // the unit key
$SRC = 'https://bauval.org/22/5a83870b41192b947c9454cf8864f66a';                                       // empty = https://bauval.org/21/<key> (native) or /22/<key> (banner)
$FORMAT = 'iframe';                              // 'native' or 'iframe' (the 300x250 banner)
$WIDTH = 300;
$HEIGHT = 250;

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('Referrer-Policy: strict-origin-when-cross-origin');

$key = trim($KEY);
$src = trim($SRC) !== '' ? trim($SRC) : 'https://bauval.org/' . ($FORMAT === 'native' ? '21' : '22') . '/' . rawurlencode($key);

if ($key === '' || strpos($src, 'https://') !== 0) {
    echo '<!doctype html><meta charset="utf-8"><script>parent.postMessage({kyroAd:"fail"},"*");</script>';
    exit;
}

$box = 'container-' . preg_replace('/[^a-zA-Z0-9_-]/', '', $key);
$jsKey = json_encode($key, JSON_HEX_TAG | JSON_HEX_AMP);
$jsBox = json_encode($box, JSON_HEX_TAG | JSON_HEX_AMP);
$srcAttr = htmlspecialchars($src, ENT_QUOTES);
?><!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>html,body{margin:0;background:transparent}</style>
</head>
<body>
<?php if ($FORMAT === 'iframe') { ?>
<script>atOptions={key:<?= $jsKey ?>,format:"iframe",height:<?= (int) $HEIGHT ?>,width:<?= (int) $WIDTH ?>,params:{}};</script>
<script src="<?= $srcAttr ?>" onload="parent.postMessage({kyroAd:'loaded'},'*')" onerror="parent.postMessage({kyroAd:'fail'},'*')"></script>
<?php } else { ?>
<script async="async" data-cfasync="false" src="<?= $srcAttr ?>" onerror="parent.postMessage({kyroAd:'fail'},'*')"></script>
<div id="<?= htmlspecialchars($box, ENT_QUOTES) ?>"></div>
<script>
(function () {
    var done = false, b = document.getElementById(<?= $jsBox ?>);
    function ok() { if (done) return; done = true; parent.postMessage({kyroAd: 'filled', h: Math.ceil(b.getBoundingClientRect().height) + 2}, '*'); }
    function look() { return b && (b.children.length > 0 || b.textContent.trim() !== '' || b.offsetHeight > 20); }
    try { new MutationObserver(function () { if (look()) ok(); }).observe(b, {childList: true, subtree: true}); } catch (e) {}
    var lastH = 0;
    function size() {
        var h = Math.ceil(Math.max(b ? b.getBoundingClientRect().height : 0, 0)) + 2;
        if (h > 20 && Math.abs(h - lastH) > 1) { lastH = h; parent.postMessage({kyroAd: 'size', h: h}, '*'); }
    }
    setInterval(size, 400);
    var n = 0, t = setInterval(function () {
        n++;
        if (look()) { clearInterval(t); ok(); }
        else if (n >= 40) { clearInterval(t); if (!done) { done = true; parent.postMessage({kyroAd: 'empty'}, '*'); } }
    }, 500);
})();
</script>
<?php } ?>
</body>
</html>
