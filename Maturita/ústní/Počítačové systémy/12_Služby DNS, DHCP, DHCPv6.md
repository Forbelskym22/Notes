## DNS – Domain Name System

### Co je DNS
Hierarchický distribuovaný systém pro překlad doménových jmen na IP adresy (a zpět). Port **53** (UDP pro dotazy, TCP pro zónové přenosy).

### Hierarchie DNS

```
. (root)
├── .com
│   ├── google.com
│   └── microsoft.com
├── .cz
│   ├── seznam.cz
│   └── fit.cvut.cz
```

- **Root servery** – 13 sad root serverů (A–M), znají adresy TLD serverů
- **TLD servery** (Top Level Domain) – `.cz`, `.com`, `.org`…
- **Autoritativní servery** – znají záznamy konkrétní domény
- **Rekurzivní resolver** – typicky u ISP nebo veřejný (8.8.8.8 Google, 1.1.1.1 Cloudflare); ptá se jménem klienta

### Průběh DNS dotazu

1. Klient zkontroluje **vlastní cache** (hosts soubor + dříve přeložené záznamy) → pokud nalezeno, hotovo
2. Klient se ptá **rekurzivního resolveru** (ISP nebo 8.8.8.8)
3. Resolver zkontroluje **svou cache** → pokud nalezeno, vrátí odpověď
4. Resolver se ptá **root serveru** → dostane adresu TLD serveru
5. Resolver se ptá **TLD serveru** → dostane adresu autoritativního serveru
6. Resolver se ptá **autoritativního serveru** → dostane IP adresu
7. Resolver vrátí odpověď klientovi a uloží do **cache** (po dobu TTL)

### Typy DNS záznamů

| Typ | Popis | Příklad |
| --- | ----- | ------- |
| **A** | Doménové jméno → IPv4 | `google.com → 142.250.1.1` |
| **AAAA** | Doménové jméno → IPv6 | `google.com → 2a00::1` |
| **CNAME** | Alias na jiné jméno | `www → google.com` |
| **MX** | Poštovní server domény | `google.com → smtp.google.com` |
| **NS** | Autoritativní DNS server | `google.com → ns1.google.com` |
| **PTR** | IP → doménové jméno (reverzní DNS) | `1.1.250.142 → google.com` |
| **TXT** | Textový záznam | SPF, DKIM, ověření domény |
| **SOA** | Start of Authority – info o zóně | správce, serial, refresh… |

### DNSsec

- Rozšíření DNS o digitální podpisy – ověřuje autenticitu DNS odpovědí
- Chrání před **DNS spoofingem** (útočník podstrčí falešný záznam)
- Každá zóna podepisuje své záznamy privátním klíčem; klient ověří veřejným klíčem
- Nešifruje obsah (jména jsou stále viditelná), pouze ověřuje integritu

---

## DHCP – Dynamic Host Configuration Protocol

### Co je DHCP
Protokol pro automatické přidělování síťové konfigurace klientům. Porty **67** (server), **68** (klient), UDP.

### Co DHCP přiděluje
- IP adresa
- Maska podsítě
- Výchozí brána (default gateway)
- Adresa DNS serveru
- Volitelně: NTP server, doménové jméno…

### DORA proces (navázání)

| Krok | Zpráva | Popis |
| ---- | ------ | ----- |
| 1 | **Discover** | Klient broadcastem hledá DHCP server |
| 2 | **Offer** | Server nabídne IP adresu a konfiguraci |
| 3 | **Request** | Klient potvrdí zájem o nabízenou adresu |
| 4 | **Acknowledge** | Server potvrdí přidělení, klient konfiguraci přijme |

### Lease (pronájem)
- IP adresa je přidělena na omezenou dobu (**lease time**)
- Před vypršením klient obnoví pronájem (unicast Request → Acknowledge)
- Po vypršení bez obnovy se adresa vrátí do poolu

### DHCP Relay Agent
- DHCP používá broadcast → nefunguje přes routery (routery broadcast nepřeposílají)
- **DHCP Relay Agent** – router nebo L3 switch, který přeposílá DHCP zprávy unicastem na DHCP server v jiné síti
- Konfigurace na Cisco:
```
interface GigabitEthernet0/0
 ip helper-address 10.0.0.1      ! IP adresa DHCP serveru
```

### Konfigurace DHCP serveru na Cisco

```
ip dhcp pool SITI_1
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 7                          ! pronájem na 7 dní

! Vyloučení adres (pro routery, servery):
ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

### Útoky na DHCP

**DHCP Starvation** — útočník posílá DHCP Discover zprávy s falešnými MAC adresami a vyčerpá celý pool IP adres. Legitimní zařízení pak nedostanou IP adresu.
- Obrana: **Port security** — omezí počet MAC adres na port → útočník nemůže používat tisíce různých MAC

**DHCP Spoofing** — útočník spustí falešný DHCP server, který odpovídá klientům dříve než legitimní server. Klientům podstrčí špatnou výchozí bránu nebo DNS → Man-in-the-Middle útok.
- Obrana: **DHCP Snooping** — funkce switche, která rozlišuje důvěryhodné a nedůvěryhodné porty
  - Důvěryhodné porty (uplink na legitimní DHCP server) — DHCP odpovědi povoleny
  - Nedůvěryhodné porty (přípojky klientů) — DHCP odpovědi blokovány; pokud přijde odpověď z klientského portu, port se zablokuje

---

## DHCPv6

### Co je DHCPv6
IPv6 obdoba DHCP – přiděluje IPv6 adresy a konfiguraci. Port **546** (klient), **547** (server), UDP.

### Módy konfigurace IPv6 adres

**SLAAC (Stateless Address Autoconfiguration)**
- Zařízení si samo vygeneruje IPv6 adresu z prefixu získaného od routeru (RA zpráva) + EUI-64 nebo náhodný suffix
- Nevyžaduje DHCP server
- Router posílá **RA (Router Advertisement)** s prefixem sítě

**DHCPv6 Stateful**
- Jako klasické DHCP – server přiděluje konkrétní adresy a vede záznamy
- Klient dostane adresu + DNS + další volby

**DHCPv6 Stateless**
- Adresu si klient vygeneruje přes SLAAC, ale ostatní parametry (DNS, NTP) dostane od DHCPv6 serveru
- Kombinace obou přístupů

### Jak router oznamuje mód (RA flagy)
- **M flag** (Managed) = 1 → použij DHCPv6 Stateful pro adresu
- **O flag** (Other) = 1 → použij DHCPv6 Stateless pro ostatní parametry
- M=0, O=0 → čistý SLAAC
