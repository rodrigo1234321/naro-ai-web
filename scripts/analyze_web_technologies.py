import sys
import re
import urllib3
import requests

urllib3.disable_warnings()

CHAT_BOT_PATTERNS = [
    r"tawk\.to",
    r"intercom",
    r"crisp\.chat",
    r"botpress",
    r"landbot",
    r"voiceflow",
    r"drift\.com",
    r"livechat",
    r"chatgpt",
    r"manychat",
    r"zopim",
    r"zendesk.*chat",
    r"api\.whatsapp\.com",
    r"wa\.me",
    r"whatsapp-widget",
    r"whatsapp_widget",
    r"chat-widget",
    r"chatbot",
]


def inspect_website(url):
    if not url or not url.startswith("http"):
        return {
            "web_activa": False,
            "es_responsive": False,
            "tiene_ssl": False,
            "tiene_bot_o_chat": False,
            "bot_detectado": "",
        }

    has_ssl = url.startswith("https://")
    try:
        r = requests.get(url, timeout=8, verify=False, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code >= 400:
            return {
                "web_activa": False,
                "es_responsive": False,
                "tiene_ssl": has_ssl,
                "tiene_bot_o_chat": False,
                "bot_detectado": "",
            }

        html = r.text.lower()
        is_responsive = bool(re.search(r'<meta[^>]+name=["\']viewport["\']', html))

        bot_found = ""
        has_bot = False
        for pat in CHAT_BOT_PATTERNS:
            if re.search(pat, html):
                has_bot = True
                bot_found = pat.replace("\\", "").replace(".*", " ")
                break

        return {
            "web_activa": True,
            "es_responsive": is_responsive,
            "tiene_ssl": has_ssl,
            "tiene_bot_o_chat": has_bot,
            "bot_detectado": bot_found,
        }

    except Exception:
        return {
            "web_activa": False,
            "es_responsive": False,
            "tiene_ssl": has_ssl,
            "tiene_bot_o_chat": False,
            "bot_detectado": "",
        }


if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_url = sys.argv[1]
        print(f"Inspeccionando {test_url}...")
        res = inspect_website(test_url)
        print(res)
