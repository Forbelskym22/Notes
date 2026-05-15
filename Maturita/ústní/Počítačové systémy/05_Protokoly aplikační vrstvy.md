
Aplikační vrstva je nejvyšší vrstva síťového modelu (OSI vrstva 7, TCP/IP vrstva 4). Protokoly aplikační vrstvy definují formát a způsob komunikace mezi aplikacemi.

---

## Web

### HTTP – HyperText Transfer Protocol
- Přenos webových stránek (HTML, obrázky, soubory)
- Port **80**
- **Bezstavový protokol** – server si nepamatuje předchozí komunikaci; stav se udržuje pomocí **cookies/sessions**
- Data přenášena jako čistý text (bezpečnostní riziko – sniffing)
- Metody: GET (získání dat), POST (odeslání dat), PUT, DELETE, HEAD

### HTTPS – HTTP Secure
- HTTP šifrované pomocí **TLS** (dříve SSL)
- Port **443**
- Zajišťuje:
  - **Důvěrnost** – šifrování obsahu
  - **Integritu** – data nebyla cestou změněna
  - **Autentizaci** – certifikát ověřuje identitu serveru (vydává CA – Certificate Authority)

---

## E-mail

### SMTP – Simple Mail Transfer Protocol
- **Odesílání** e-mailů (klient → server, server → server)
- Port **25** (server–server), **587** (klient → server, STARTTLS), **465** (SSL)
- Používá **SMTP AUTH** – autentizace klienta, zabraňuje zneužití jako Open Relay (přeposílání spamu)

### POP3 – Post Office Protocol v3
- **Stahování** e-mailů ze serveru do klienta
- Port **110** (995 pro SSL)
- E-maily se stáhnou a ze serveru smažou → nevhodné pro více zařízení (co stáhne mobil, nevidí PC)

### IMAP – Internet Message Access Protocol
- **Přístup** k e-mailům přímo na serveru
- Port **143** (993 pro SSL)
- E-maily zůstávají na serveru, plná synchronizace mezi zařízeními (PC, telefon, webmail)
- Podporuje složky, příznaky (přečteno/nepřečteno), vyhledávání na serveru

---

## Přenos souborů

### FTP – File Transfer Protocol
- Přenos souborů mezi klientem a serverem
- Porty **20** (data), **21** (řízení)
- Nešifrovaný – přihlašovací údaje i data přenášeny v čistém textu
- **Aktivní režim** – server navazuje datové spojení zpět ke klientovi (problém s NAT/firewallem)
- **Pasivní režim** – klient se připojuje na náhodný port serveru; vhodnější za firewallem

### SFTP – SSH File Transfer Protocol
- Přenos souborů šifrovaný přes SSH
- Port **22**

### FTPS – FTP Secure
- FTP šifrované pomocí TLS
- Port **990**

---

## Vzdálený přístup

### Telnet
- Nešifrovaný vzdálený přístup k příkazové řádce
- Port **23**
- Dnes obsoletní (vše přenášeno v čistém textu)

### SSH – Secure Shell
- Šifrované vzdálené připojení k příkazové řádce
- Port **22**
- Nahradil nezabezpečený Telnet
- **Autentizace heslem** – heslo se ověřuje na serveru; riziko brute-force útoku, heslo musí být silné
- **Autentizace klíči** – klient má privátní klíč (tajný, nikdy neopouští zařízení), server zná veřejný klíč; server ověří, že klient vlastní privátní klíč bez toho, aby ho po síti posílal → bezpečnější, nelze brute-forcovat
- Další funkce: **SSH tunneling** (zapouzdření jiného protokolu přes SSH), SCP/SFTP
- **Příklady použití:** vzdálená správa serverů (Linux admin), Git operace přes SSH (GitHub, GitLab), přenos souborů přes SCP/SFTP



---

## Síťové služby

### DNS – Domain Name System
- Překlad doménových jmen na IP adresy (a zpět)
- Port **53** (UDP pro dotazy, TCP pro zónové přenosy)
- **Typy záznamů:**
  - **A** – doménové jméno → IPv4 adresa
  - **AAAA** – doménové jméno → IPv6 adresa
  - **CNAME** – alias na jiné doménové jméno
  - **MX** – poštovní server pro danou doménu
  - **NS** – autoritativní DNS server pro zónu
  - **TXT** – textové informace (SPF, DKIM pro e-mail)
- **Průběh dotazu:** klient → rekurzivní resolver (ISP) → kořenový server → TLD server (.cz, .com) → autoritativní server domény

### DHCP – Dynamic Host Configuration Protocol
- Automatické přidělování IP adres klientům
- Porty **67** (server), **68** (klient), UDP
- Více v otázce č. 12

### NTP – Network Time Protocol
- Synchronizace času mezi zařízeními v síti
- Port **123**, UDP

---

## Přehledová tabulka

| Protokol | Port | TCP/UDP | Popis |
| -------- | ---- | ------- | ----- |
| HTTP | 80 | TCP | Webové stránky |
| HTTPS | 443 | TCP | Webové stránky (šifrované, TLS) |
| FTP | 20/21 | TCP | Přenos souborů |
| SFTP | 22 | TCP | Přenos souborů (přes SSH) |
| SSH | 22 | TCP | Vzdálený přístup (šifrovaný) |
| Telnet | 23 | TCP | Vzdálený přístup (nešifrovaný) |
| SMTP | 25/587 | TCP | Odesílání e-mailů |
| DNS | 53 | UDP (TCP pro zónové přenosy) | Překlad jmen na IP |
| DHCP | 67/68 | UDP | Přidělování IP adres |
| POP3 | 110 | TCP | Stahování e-mailů |
| IMAP | 143 | TCP | Přístup k e-mailům na serveru |
| NTP | 123 | UDP | Synchronizace času |
