
## Aktivní vs. pasivní síťové prvky

- **Pasivní** – pouze fyzicky propojují média, nepracují se signálem (kabely, patch panely, rozvaděče)
- **Aktivní** – zpracovávají, zesilují nebo přeposílají signál/data (repeater, hub, switch, router…)

---

## Aktivní síťové prvky

### Repeater (opakovač)
- **OSI vrstva 1 – fyzická**
- Zesiluje a obnovuje elektrický/optický signál – překonává útlum na dlouhých kabelech
- Nepracuje s adresami ani daty, pouze regeneruje signál
- Dnes nahrazen switchi a access pointy

### Hub (rozbočovač)
- **OSI vrstva 1 – fyzická**
- Propojuje více zařízení do hvězdicové topologie
- Přijatý signál rozesílá na **všechny porty** (broadcast) – všechna zařízení sdílejí jednu kolizní doménu
- Pomalý, neefektivní, dnes obsoletní – nahrazen switchem

### Bridge (most)
- **OSI vrstva 2 – linková**
- Propojuje dvě síťové segmenty a filtruje provoz na základě **MAC adres**
- Udržuje tabulku MAC adres a přeposílá rámce pouze do správného segmentu
- Snižuje počet kolizí oproti hubu
- Dnes funkčně nahrazen switchem

### Switch (přepínač)
- **OSI vrstva 2 – linková** (L2 switch), některé modely i **vrstva 3 – síťová** (L3 switch)
- Propojuje zařízení v LAN a přeposílá rámce pouze na konkrétní port podle **MAC adresy** cíle
- Každý port = samostatná kolizní doména → eliminuje kolize
- **L3 switch** navíc umí směrovat IP provoz (jako router, ale rychleji v rámci LAN)
- Funkce: VLAN, STP, EtherChannel, PoE (napájení přes kabel)

**Jak funguje switch – MAC tabulka (CAM table):**
1. Příchozí rámec – switch si zapamatuje zdrojovou MAC adresu a port, ze kterého přišel  
2. Hledá cílovou MAC adresu v tabulce:
   - **Nalezena** → přepošle rámec pouze na daný port
   - **Nenalezena** → rozešle rámec na všechny porty kromě zdrojového (flooding)
3. Tabulka se časem plní; záznamy expirují po určité době nečinnosti

Příklad MAC tabulky (`show mac address-table` na Cisco):

| VLAN | MAC adresa        | Typ     | Port  |
| ---- | ----------------- | ------- | ----- |
| 1    | 00:0a:1234:ab:cd  | DYNAMIC | Fa0/1 |
| 1    | 00:0b:56:78:ef:01 | DYNAMIC | Fa0/3 |

### Router (směrovač)
- **OSI vrstva 3 – síťová**
- Propojuje různé sítě a směruje pakety na základě **IP adres** pomocí směrovací tabulky
- Odděluje broadcastové domény
- Funkce: NAT, DHCP, firewall, QoS, VPN
- Používá statické nebo dynamické směrovací protokoly (RIP, OSPF, BGP…)

**Jak funguje router – směrovací tabulka:**
- Router přijme paket, podívá se na cílovou IP adresu a hledá nejdelší shodu (longest prefix match) v tabulce
- Podle záznamu odešle paket na příslušné rozhraní nebo next-hop router

Příklad směrovací tabulky (`show ip route` na Cisco):

| Typ | Síť / prefix      | AD/Metrika | Next-hop / rozhraní       |
| --- | ----------------- | ---------- | ------------------------- |
| C   | 192.168.1.0/24    | –          | directly connected, Gi0/0 |
| C   | 10.0.0.0/30       | –          | directly connected, Gi0/1 |
| S   | 0.0.0.0/0         | [1/0]      | via 10.0.0.1 (výchozí brána) |
| O   | 172.16.0.0/24     | [110/2]    | via 10.0.0.2 (OSPF)       |

- **C** = Connected (přímo připojená síť)
- **S** = Static (statická trasa)
- **O** = OSPF (dynamický protokol)
- **[AD/metrika]** – AD (administrative distance) = důvěryhodnost zdroje; metrika = cena cesty

### Firewall
- **OSI vrstva 3–7** (podle typu)
- Filtruje síťový provoz podle pravidel (IP, port, protokol, obsah)
- Více v [[11_Firewally a služby síťových bran]]

### Access Point (AP)
- **OSI vrstva 2 – linková**
- Bezdrátový přístupový bod – připojuje Wi-Fi zařízení do drátové sítě
- Více v [[16_Bezdrátové sítě]]

---

## Srovnání prvků

| Prvek | OSI vrstva | Pracuje s | Kolizní doména | Broadcastová doména |
| ----- | ---------- | --------- | -------------- | ------------------- |
| Repeater | 1 | Signál | Společná | Společná |
| Hub | 1 | Signál | Společná | Společná |
| Bridge | 2 | MAC adresy | Oddělená | Společná |
| Switch | 2 (3) | MAC (IP) adresy | Oddělená (per port) | Společná |
| Router | 3 | IP adresy | Oddělená | Oddělená |

---

## Síťové topologie

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

### Úplná (Mesh / Full Mesh)
- Každé zařízení propojeno s každým
- Maximální redundance a spolehlivost
- Nevýhoda: vysoké náklady na kabely a porty
- Používá se v páteřních/WAN sítích
