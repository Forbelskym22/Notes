# Firewally a služby síťových bran

## Firewall

### Co je firewall
Firewall je síťové zařízení nebo software, který filtruje provoz mezi sítěmi podle definovaných pravidel. Chrání síť před neoprávněným přístupem a útoky.

### Rozdělení firewallů

#### Podle umístění
- **Hardwarový firewall** – samostatné zařízení (Cisco ASA, Fortinet, pfSense na dedikovaném HW)
- **Softwarový firewall** – program na koncovém zařízení (Windows Defender Firewall, iptables na Linuxu)

#### Podle generace / způsobu filtrování

**1. Paketový filtr (Packet Filter) – OSI vrstva 3–4**
- Filtruje pakety podle hlavičky: zdrojová/cílová IP, port, protokol (TCP/UDP)
- Bezestavový – každý paket hodnotí samostatně, nezná kontext spojení
- Rychlý, jednoduchý, ale omezený

**2. Stavový firewall (Stateful Inspection) – OSI vrstva 3–4**
- Sleduje stav TCP/UDP spojení – ví, která spojení byla navázána zevnitř
- Umožňuje odpovědi na odchozí provoz bez explicitních pravidel
- Dnes standard pro většinu firewallů

**3. Application Layer Gateway (ALG) / Proxy firewall – OSI vrstva 7**
- Analyzuje obsah na aplikační vrstvě (HTTP, FTP, DNS…)
- Může filtrovat podle URL, obsahu, uživatele
- Pomalejší, ale mnohem podrobnější kontrola

**4. NGFW – Next Generation Firewall**
- Kombinuje stavový firewall + DPI (Deep Packet Inspection) + IPS + aplikační filtrování
- Identifikuje aplikace bez ohledu na port (Facebook, YouTube, BitTorrent…)
- Příklady: Cisco Firepower, Palo Alto, Fortinet

### Základní funkce firewallu
- **Filtrování provozu** – povolení/blokování podle pravidel (ACL)
- **NAT** – překlad adres (viz níže)
- **VPN** – šifrované tunely
- **IDS/IPS** – detekce/prevence průniků
- **Logging** – záznam provozu

### Konfigurace – Access Control List (ACL)

Pravidla se vyhodnocují **shora dolů**, první shoda vyhraje. Na konci je implicitní **deny all**.

Příklad Cisco ACL:
```
! Standardní ACL (pouze zdrojová IP):
access-list 10 permit 192.168.1.0 0.0.0.255
access-list 10 deny any

! Rozšířená ACL (IP, port, protokol):
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 443
access-list 100 deny ip any any

! Aplikace na rozhraní:
interface GigabitEthernet0/0
 ip access-group 100 in
```

---

## NAT – Network Address Translation

### Co je NAT
Překlad IP adres – umožňuje více zařízením s privátními IP adresami sdílet jednu veřejnou IP adresu při komunikaci s internetem.

### Typy NAT

**Static NAT**
- Pevné mapování: jedna privátní IP ↔ jedna veřejná IP
- Použití: servery dostupné z internetu (webserver, mailserver)

**Dynamic NAT**
- Pool veřejných IP adres – privátní IP se mapuje na dostupnou veřejnou z poolu
- Méně časté

**PAT – Port Address Translation (NAT Overload)**
- Nejrozšířenější – více privátních IP sdílí **jednu veřejnou IP**
- Rozlišení pomocí **čísla portu** – každé spojení dostane unikátní zdrojový port
- Typické v domácích routerech

### Jak funguje PAT

```
Interní zařízení:
192.168.1.10:1234 → internet (google.com:80)

Router provede překlad:
192.168.1.10:1234 → 203.0.113.1:5001   (veřejná IP:náhodný port)

Odpověď přijde na 203.0.113.1:5001
Router přeloží zpět: → 192.168.1.10:1234
```

### NAT tabulka

| Interní IP:port    | Veřejná IP:port    | Cíl              |
| ------------------ | ------------------ | ---------------- |
| 192.168.1.10:1234  | 203.0.113.1:5001   | 8.8.8.8:80       |
| 192.168.1.20:5678  | 203.0.113.1:5002   | 8.8.8.8:80       |

### Konfigurace NAT na Cisco

```
! Označení rozhraní:
interface GigabitEthernet0/0
 ip nat inside          ! vnitřní síť

interface GigabitEthernet0/1
 ip nat outside         ! směrem k internetu

! PAT (overload):
ip nat inside source list 1 interface GigabitEthernet0/1 overload
access-list 1 permit 192.168.1.0 0.0.0.255
```

---

## Proxy

### Co je proxy
Proxy server je prostředník mezi klientem a cílovým serverem. Klient komunikuje s proxy, proxy komunikuje se serverem – klient a server spolu přímo nekomunikují.

### Typy proxy

**Forward proxy**
- Klient → Proxy → Internet
- Skrývá identitu klienta, filtruje obsah, cachuje odpovědi
- Použití: firemní sítě (kontrola přístupu), anonymizace

**Reverse proxy**
- Internet → Proxy → Interní server
- Skrývá identitu serveru, load balancing, SSL terminace, ochrana před DDoS
- Příklady: Nginx, HAProxy, Cloudflare

### Výhody proxy
- **Cache** – ukládá odpovědi, snižuje zátěž sítě
- **Filtrování** – blokování URL, kategorií obsahu
- **Anonymizace** – server nevidí skutečnou IP klienta
- **Logging** – záznam přístupů uživatelů
