## Proč síťové modely

Síťové modely rozdělují komunikaci do vrstev – každá vrstva má jasně definovanou funkci a komunikuje pouze s vrstvou bezprostředně nad/pod sebou. Usnadňuje vývoj, ladění a interoperabilitu různých výrobců.

---

## Model ISO/OSI

7 vrstev, referenční model – popisuje **jak by komunikace měla fungovat**, v praxi se přesně neimplementuje.

| Vrstva | Název                        | Funkce                                    | PDU     | Příklady                   |
| ------ | ---------------------------- | ----------------------------------------- | ------- | -------------------------- |
| 7      | **Aplikační** / Application  | Rozhraní pro aplikace                     | Data    | HTTP, FTP, DNS, DHCP, SMTP |
| 6      | **Prezentační** / Presentation | Kódování, šifrování, komprese           | Data    | SSL/TLS, JPEG, ASCII       |
| 5      | **Relační** / Session        | Správa relací (sessions)                  | Data    | neřešil bych               |
| 4      | **Transportní** / Transport  | Spolehlivý/nespolehlivý přenos, porty     | Segment | TCP, UDP                   |
| 3      | **Síťová** / Network         | Logické adresování, směrování             | Paket   | IP, ICMP, ARP              |
| 2      | **Linková** / Data Link      | Fyzické adresování (MAC), přístup k médiu | Rámec   | Ethernet, Wi-Fi, PPP       |
| 1      | **Fyzická** / Physical       | Přenos bitů po médiu                      | Bit     | Kabely, konektory, signál  |

---

## Model TCP/IP

4 vrstvy, praktický model – popisuje **jak komunikace skutečně funguje** na internetu.

| Vrstva TCP/IP                          | Odpovídá OSI vrstvám | Příklady |
| -------------------------------------- | -------------------- | -------- |
| **Aplikační** / Application            | 5–7 | HTTP, FTP, DNS, SMTP, SSH |
| **Transportní** / Transport            | 4 | TCP, UDP |
| **Internetová** / Internet             | 3 | IP, ICMP, ARP |
| **Síťového přístupu** / Network Access | 1–2 | Ethernet, Wi-Fi |

---

## Srovnání OSI vs TCP/IP

| Vlastnost | OSI | TCP/IP |
| --------- | --- | ------ |
| Počet vrstev | 7 | 4 |
| Účel | Referenční/teoretický model | Praktická implementace |
| Vznik | ISO, 1984 | ARPANET, 1970s |
| Využití | Vzdělávání, troubleshooting | Reálná síťová komunikace |

---

## TCP vs UDP

| Vlastnost | TCP | UDP |
| --------- | --- | --- |
| Spojení | Spojované (3-way handshake) | Bezespojové |
| Spolehlivost | Zaručená (ACK, retransmise) | Nezaručená |
| Pořadí | Garantované | Nezaručené |
| Rychlost | Pomalejší | Rychlejší |
| Overhead | Větší | Menší |
| Použití | HTTP, FTP, SSH, e-mail | DNS, DHCP, VoIP, streaming |

**TCP 3-way handshake:**
```
Klient → SYN → Server
Klient ← SYN-ACK ← Server
Klient → ACK → Server
(spojení navázáno)
```

---

## Zapouzdření dat (Encapsulation)

Při odesílání dat každá vrstva přidá svou **hlavičku** (případně patičku) – to je zapouzdření.

```
Aplikační data
    ↓ + TCP/UDP hlavička → Segment
    ↓ + IP hlavička      → Paket
    ↓ + Ethernet hlavička + patička → Rámec
    ↓ převod na bity     → Bity
```

### Co se přidává na každé vrstvě

**Transportní vrstva → Segment**
- Zdrojový a cílový **port** (16 bit)
- TCP: sekvenční číslo, potvrzovací číslo (ACK), příznaky (SYN, FIN, RST…), velikost okna
- UDP: pouze porty a délka (jednoduchá hlavička, 8 bajtů)

**Síťová vrstva → Paket**
- Zdrojová a cílová **IP adresa**
- TTL (Time to Live) – zabraňuje nekonečnému putování paketu
- Protokol vyšší vrstvy (TCP=6, UDP=17, ICMP=1)

**Linková vrstva → Rámec**
- Zdrojová a cílová **MAC adresa**
- Typ protokolu (EtherType – IPv4, IPv6, ARP…)
- **FCS** (Frame Check Sequence) – patička pro detekci chyb (CRC kontrolní součet)

### Odpouzdření (Decapsulation)

Na přijímací straně probíhá opačný proces – každá vrstva odstraní svou hlavičku a předá data vrstvě výše.

### PDU – Protocol Data Unit

Název pro datovou jednotku na každé vrstvě:

| Vrstva | PDU |
|--------|-----|
| Aplikační | Data |
| Transportní | Segment (TCP) / Datagram (UDP) |
| Síťová | Paket |
| Linková | Rámec (Frame) |
| Fyzická | Bit |

---

## Kolizní doména

Oblast sítě, kde může dojít ke kolizi (dva uzly vysílají současně).

- **Hub** – všechny porty v jedné kolizní doméně
- **Switch** – každý port = samostatná kolizní doména
- **Full-duplex** – eliminuje kolize úplně (oddělené linky pro příjem a vysílání)

---

## Broadcastová doména

Oblast sítě, kam je doručen broadcast (zpráva pro všechny).

- **Switch** – všechny porty ve stejné broadcastové doméně (pokud bez VLAN)
- **Router** – odděluje broadcastové domény; broadcast nepřeposílá
- **VLAN** – logicky rozdělí broadcastové domény v rámci switche

---

## Síťová topologie

Topologie popisuje fyzické nebo logické uspořádání zařízení v síti.

### Sběrnicová (Bus)
- Všechna zařízení připojena na jeden sdílený kabel (páteř)
- Výhoda: jednoduché, levné
- Nevýhoda: výpadek kabelu = výpadek celé sítě, kolize, obtížná diagnostika
- Dnes obsoletní

### Hvězdicová (Star)
- Všechna zařízení připojena do centrálního prvku (switch/hub)
- **Nejrozšířenější topologie** pro LAN
- Výhoda: výpadek jednoho zařízení neovlivní ostatní, snadná správa
- Nevýhoda: výpadek centrálního prvku = výpadek celé sítě

### Kruhová (Ring)
- Každé zařízení připojeno ke dvěma sousedům, data putují dokola
- Používáno v Token Ring (historicky) nebo FDDI
- Nevýhoda: výpadek jednoho uzlu může ovlivnit celý kruh (řeší dual ring)

### Stromová (Tree)
- Hierarchická kombinace hvězdic
- Typická pro větší sítě (páteřní switch → distribuční switche → přístupové switche)

### Úplná síť (Mesh / Full Mesh)
- Každé zařízení propojeno s každým
- Maximální redundance a spolehlivost
- Nevýhoda: vysoké náklady na kabely a porty
- Používá se v páteřních/WAN sítích

### Částečná síť (Partial Mesh)
- Klíčové uzly propojeny vícenásobně, ostatní jednodušeji
- Kompromis mezi redundancí a cenou
