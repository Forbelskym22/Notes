# Protokol IP, IPv6

## Fyzické adresy – MAC

- **MAC adresa** (Media Access Control) – fyzická adresa síťového rozhraní
- Délka: **48 bitů** (6 bajtů), zapsaná hexadecimálně (např. `00:1A:2B:3C:4D:5E`)
- Přiděluje ji výrobce, uložena v hardware (NIC)
- Prvních 24 bitů = **OUI** (Organizationally Unique Identifier) – identifikuje výrobce
- Dalších 24 bitů = unikátní číslo zařízení
- Platí pouze v rámci **jednoho síťového segmentu** (L2) – router MAC adresu nemění, ale při přechodu přes router se mění zdrojová i cílová MAC

---

## Logické adresy – IP

### IPv4

- Délka: **32 bitů**, zapsaná dekadicky ve čtyřech oktetech (např. `192.168.1.1`)
- Adresa se skládá z **části sítě** a **části hostitele** – rozdělení určuje maska podsítě
- Přiděluje ji správce sítě nebo DHCP

**Privátní rozsahy (RFC 1918) – nerou továny na internetu:**
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

**Speciální adresy:**
- `127.0.0.1` – loopback (localhost)
- `0.0.0.0` – výchozí trasa / neurčená adresa
- `255.255.255.255` – limited broadcast

### IPv6

- Délka: **128 bitů**, zapsaná hexadecimálně v 8 skupinách po 16 bitech (např. `2001:0db8:85a3::8a2e:0370:7334`)
- Zkracování: po sobě jdoucí skupiny nul lze nahradit `::` (jednou v adrese)
- Vytvořeno kvůli vyčerpání IPv4 adresního prostoru

**Typy adres IPv6:**
- **Unicast** – jedna adresa, jeden příjemce
  - **Global unicast** – veřejná adresa (`2000::/3`)
  - **Link-local** – platí jen v rámci segmentu (`fe80::/10`), automaticky přidělena každému rozhraní
  - **Loopback** – `::1`
- **Multicast** – jedna adresa, více příjemců (`ff00::/8`) – nahrazuje broadcast
- **Anycast** – jedna adresa, nejbližší příjemce z dané skupiny

**Výhody IPv6 oproti IPv4:**
- Obrovský adresní prostor (3,4 × 10³⁸ adres)
- Automatická konfigurace adres (SLAAC)
- Integrovaný IPsec
- Žádný broadcast (nahrazen multicastem)
- Jednodušší hlavička paketu

---

## Protokol IP

- **Bezespojová** (connectionless) služba – každý paket je doručován nezávisle
- **Nespolehlivá** – nezaručuje doručení, pořadí ani integritu; to řeší TCP (vrstva 4)
- Pracuje na **OSI vrstvě 3**

**Hlavička IPv4 paketu (vybrané položky):**
- **Version** – verze IP (4)
- **TTL** (Time to Live) – počet hopů, než je paket zahozen (snižuje se o 1 na každém routeru)
- **Protocol** – protokol vyšší vrstvy (6 = TCP, 17 = UDP, 1 = ICMP)
- **Source/Destination IP** – zdrojová a cílová IP adresa

---

## Protokol ICMP

- **Internet Control Message Protocol** – řídící protokol pro IP
- OSI vrstva 3, pracuje přímo nad IP
- Přenáší chybové zprávy a diagnostické informace, **nepřenáší uživatelská data**

**Typy zpráv:**
- **Echo Request / Echo Reply** – základ příkazu `ping`
- **Destination Unreachable** – cíl nedosažitelný (síť, host, port)
- **Time Exceeded** – TTL vypršelo (základ příkazu `traceroute`)
- **Redirect** – router informuje hostitele o lepší trase

---

## Protokol ND (Neighbor Discovery)

- **Neighbor Discovery Protocol** – IPv6 náhrada za ARP (IPv4)
- Pracuje na OSI vrstvě 3, využívá ICMPv6 zprávy
- Funkce:
  - **Zjištění MAC adresy** souseda (jako ARP) – pomocí NS/NA zpráv
  - **Zjištění routeru** v síti – RS/RA zprávy (Router Solicitation / Router Advertisement)
  - **SLAAC** – automatická konfigurace IPv6 adresy bez DHCP
  - **DAD** (Duplicate Address Detection) – ověření unikátnosti adresy před použitím

**Srovnání ARP vs. ND:**

| Funkce | ARP (IPv4) | ND (IPv6) |
| ------ | ---------- | --------- |
| Zjištění MAC adresy | ARP Request/Reply (broadcast) | NS/NA (multicast) |
| Zjištění routeru | – | RS/RA |
| Automatická konfigurace | DHCP | SLAAC + DHCPv6 |
| Detekce duplicit | – | DAD |
