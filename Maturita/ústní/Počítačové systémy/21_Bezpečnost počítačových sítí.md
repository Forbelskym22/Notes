
## Bezpečnostní hrozby a zranitelnosti

**Hrozba** — potenciální nebezpečí, které může způsobit škodu (útok, výpadek, krádež dat).

**Zranitelnost** — slabina v systému, kterou hrozba může zneužít (nezáplatovaný SW, slabé heslo).

**Riziko** = hrozba × zranitelnost — pravděpodobnost že hrozba zranitelnost skutečně zneužije.

Cíl bezpečnosti — **CIA triáda:**
- **Confidentiality** (důvěrnost) — data vidí jen oprávnění
- **Integrity** (integrita) — data nebyla neoprávněně změněna
- **Availability** (dostupnost) — systém funguje když ho potřebuješ

---

## Fyzická bezpečnost

Ochrana hardwaru a fyzického přístupu — nejzákladnější vrstva, vše ostatní je zbytečné pokud útočník sedí u serveru.

- **Serverovna** — zamčená místnost, kamerový systém, čipové karty nebo biometrika
- **Rack** — uzamčená skříň se síťovými prvky
- **UPS** (Uninterruptible Power Supply) — záložní napájení při výpadku proudu
- **Kabeláž** — fyzicky oddělená od veřejně přístupných prostor

---

## Síťové útoky a obrana proti nim

### Pasivní útoky — útočník odposlouchává, nezasahuje

**Sniffing** — zachytávání síťového provozu (Wireshark). Obrana: šifrování (HTTPS, VPN).

**Reconnaissance** — průzkum sítě před útokem — skenování portů (nmap), zjišťování topologie.

### Aktivní útoky — útočník aktivně zasahuje

**DoS / DDoS** (Denial of Service) — zahlcení serveru požadavky tak aby přestal odpovídat.
- DoS = jeden útočník, DDoS = tisíce zařízení (botnet)
- Obrana: firewall, rate limiting, CDN (Cloudflare)

**Man-in-the-Middle (MitM)** — útočník se vloží mezi dvě komunikující strany a odposlouchává nebo mění provoz.
- Obrana: HTTPS, certifikáty, VPN

**Spoofing** — podvržení identity (IP spoofing, MAC spoofing, DNS spoofing).
- DNS spoofing — útočník podvrhne odpověď DNS serveru a přesměruje uživatele na falešnou stránku

**Brute force** — systematické zkoušení všech kombinací hesel.
- Obrana: silná hesla, limit pokusů, dvoufaktorová autentizace (2FA)

**SQL injection** — vložení SQL kódu do vstupu aplikace za účelem manipulace s databází.
- Příklad: `' OR 1=1 --` do přihlašovacího formuláře
- Obrana: parametrizované dotazy, validace vstupu

**Cross-Site Scripting (XSS)** — vložení škodlivého JS kódu do webové stránky zobrazené jiným uživatelům.

---

## Malware

Škodlivý software — software navržený k poškození, špionáži nebo získání neoprávněného přístupu.

| Typ | Popis |
|---|---|
| **Virus** | připojí se k souboru, šíří se spuštěním infikovaného souboru |
| **Worm (červ)** | šíří se sám po síti bez interakce uživatele |
| **Trojan** | tváří se jako legitimní program, skrytě škodí |
| **Ransomware** | zašifruje data a požaduje výkupné (WannaCry, 2017) |
| **Spyware** | sbírá data o uživateli bez jeho vědomí |
| **Keylogger** | zaznamenává stisknuté klávesy (krádeže hesel) |
| **Botnet** | síť infikovaných zařízení ovládaných útočníkem (DDoS, spam) |
| **Rootkit** | skryje svou přítomnost v systému, obtížně detekovatelný |

Obrana: antivirus, pravidelné aktualizace, neotevírat podezřelé přílohy, zálohy.

---

## Bezpečnost síťových prvků

**Firewall** — filtruje síťový provoz podle pravidel (povolení/blokování portů, IP adres, protokolů).
- Stavový firewall — sleduje stav spojení (povolí odpověď na odchozí požadavek)
- Next-Generation Firewall (NGFW) — inspekce obsahu paketů, detekce aplikací

**IDS / IPS** (Intrusion Detection/Prevention System)
- IDS — detekuje podezřelý provoz a upozorní administrátora
- IPS — detekuje a aktivně blokuje

**DMZ** (Demilitarizovaná zóna) — oddělená síťová zóna pro veřejně přístupné servery (web, mail) — odděluje je od interní sítě.

**VLAN** — logické oddělení sítě, omezuje dosah útoku (kompromitovaný počítač nevidí zbytek sítě).

**Port security** — funkce switche která omezuje které MAC adresy se mohou připojit na daný port.
- Lze nastavit maximální počet MAC adres na port
- Při připojení neznámé MAC adresy switch port zablokuje, pošle alert nebo zahodí paket
- Obrana proti MAC flooding útokům a neoprávněnému připojení zařízení
- Obrana proti **DHCP starvation** — útočník posílá DHCP requesty s falešnými MAC adresami a vyčerpá celý pool IP adres; port security omezí počet MAC na port → útok selže

**DHCP Snooping** — funkce switche která rozlišuje důvěryhodné a nedůvěryhodné porty pro DHCP.
- Obrana proti **DHCP spoofing** — útočník spustí falešný DHCP server, který klientům posílá špatnou výchozí bránu nebo DNS → MitM útok
- Důvěryhodné porty (uplink na legitimní DHCP server) — DHCP odpovědi povoleny
- Nedůvěryhodné porty (přípojky klientů) — DHCP odpovědi blokovány; pokud přijde DHCP odpověď z klientského portu, port se zablokuje

**Aktualizace** — záplatování zranitelností v OS a síťových prvcích.

**Silná hesla + 2FA** — ochrana přístupu ke správě zařízení.

---

## Základy kryptografie

Kryptografie = věda o šifrování dat za účelem zajištění důvěrnosti, integrity a autenticity.

### Symetrické šifrování
Stejný klíč pro šifrování i dešifrování. Rychlé, ale problém s bezpečnou výměnou klíče.
- Příklady: **AES**, DES

### Asymetrické šifrování
Dvojice klíčů — **veřejný** (šifruje) a **soukromý** (dešifruje). Pomalejší, ale bezpečná výměna.
- Příklady: **RSA**, ECC
- Použití: HTTPS, SSH, digitální podpisy

### Hašování
Jednosměrná funkce — ze vstupu vytvoří otisk pevné délky (hash). Nelze zpětně získat původní data.
- Příklady: **SHA-256**, MD5 (zastaralý)
- Použití: ukládání hesel, ověření integrity souborů

### Diffie-Hellman výměna klíčů
Způsob jak si dvě strany bezpečně dohodnou sdílený klíč přes nezabezpečený kanál — bez toho aby klíč někdy přenášely.

Analogie s barvami — míchání barev je jednosměrné (jako matematická operace, nelze snadno odvodit složky):

<div style="font-family:monospace;line-height:2;font-size:13px">
  <span style="color:#888">Veřejná barva (vidí všichni):</span> <span style="background:#f5c518;color:#000;padding:1px 8px;border-radius:3px">žlutá</span>
  <br><br>
  <b>Alice</b> — tajná barva: <span style="background:#e74c3c;color:#fff;padding:1px 8px;border-radius:3px">červená</span> &nbsp;→&nbsp; smíchá: <span style="background:#e67e22;color:#fff;padding:1px 8px;border-radius:3px">oranžová</span> &nbsp;→&nbsp; pošle Bobovi<br>
  <b>Bob</b> &nbsp;&nbsp;— tajná barva: <span style="background:#2980b9;color:#fff;padding:1px 8px;border-radius:3px">modrá</span> &nbsp;&nbsp;&nbsp;→&nbsp; smíchá: <span style="background:#27ae60;color:#fff;padding:1px 8px;border-radius:3px">zelená</span> &nbsp;&nbsp;→&nbsp; pošle Alici
  <br><br>
  <b>Alice</b> přidá svou <span style="background:#e74c3c;color:#fff;padding:1px 8px;border-radius:3px">červenou</span> k přijaté <span style="background:#27ae60;color:#fff;padding:1px 8px;border-radius:3px">zelené</span> &nbsp;→&nbsp; <span style="background:#6d4c41;color:#fff;padding:1px 8px;border-radius:3px">hnědá</span><br>
  <b>Bob</b> &nbsp;&nbsp;přidá svou <span style="background:#2980b9;color:#fff;padding:1px 8px;border-radius:3px">modrou</span> k přijaté <span style="background:#e67e22;color:#fff;padding:1px 8px;border-radius:3px">oranžové</span> &nbsp;→&nbsp; <span style="background:#6d4c41;color:#fff;padding:1px 8px;border-radius:3px">hnědá</span>
  <br><br>
  <span style="color:#888">Útočník vidí: <span style="background:#f5c518;color:#000;padding:1px 8px;border-radius:3px">žlutá</span> + <span style="background:#e67e22;color:#fff;padding:1px 8px;border-radius:3px">oranžová</span> + <span style="background:#27ae60;color:#fff;padding:1px 8px;border-radius:3px">zelená</span> — bez tajných barev <span style="background:#6d4c41;color:#fff;padding:1px 8px;border-radius:3px">hnědou</span> nezíská</span>
</div>

Sdílený klíč (hnědá) vznikl na obou stranách stejný — aniž by ho někdo přenesl po síti.

### VPN (Virtual Private Network)
Šifrovaný tunel přes internet — umožňuje bezpečné připojení do vzdálené sítě (firemní síť z domova).
