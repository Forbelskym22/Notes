
Switch přeposílá rámce na základě MAC adres – každý port je samostatná kolizní doména. Ve větších sítích se switche propojují redundantně (více linek mezi nimi) pro zvýšení spolehlivosti.

**Problém redundance bez STP – broadcast storm:**
1. Zařízení odešle broadcast (např. ARP request)
2. Switch A přepošle broadcast na všechny porty včetně linky na Switch B
3. Switch B přepošle broadcast zpět na Switch A (a opačnou linkou znovu)
4. Rámec se nekončíme šíří oběma směry zároveň – počet kopií exponenciálně roste
5. Switche plní MAC tabulku nestabilními záznamy (MAC flapping)
6. Procesory switchů jsou vytíženy na 100 %, provoz reálných dat je zcela zahlcen

**Následky:** výpadek celé L2 sítě, nedostupnost zařízení, přehřátí switchů.

---

## STP – Spanning Tree Protocol

**STP** – protokol zabraňující L2 smyčkám; blokuje redundantní porty a při výpadku linky odblokuje záložní port.

### Bridge ID

Bridge ID má 8 bajtů a skládá se ze tří částí:

```
[ Priorita (4 bity) | VLAN ID (12 bitů) | MAC adresa (48 bitů) ]
```

- **Priorita** — 4 bity, hodnoty 0–61440 v krocích po 4096 (výchozí = 32768)
- **VLAN ID** — 12 bitů, identifikuje VLAN (0–4095)
- **MAC adresa** — 48 bitů, unikátní adresa switche

Priorita + VLAN ID dohromady tvoří 16bitové pole zvané **Bridge Priority**. Například výchozí priorita 32768 pro VLAN 1 = 32768 + 1 = **32769**.

### Volba Root Bridge
1. Všechny switche začnou jako kandidáti
2. Volí se switch s **nejnižším Bridge ID** (= priorita + VLAN ID + MAC adresa)
3. Výchozí priorita = 32768; lze ručně snížit pro preferovaný switch
4. Zvolený switch = **Root Bridge** – všechny jeho porty jsou Designated (přeposílají)

### Stavy portů STP

| Stav | Popis |
| ---- | ----- |
| **Blocking** | Nepřeposílá rámce, pouze přijímá BPDU |
| **Listening** | Zpracovává BPDU, neplní MAC tabulku |
| **Learning** | Plní MAC tabulku, nepřeposílá data |
| **Forwarding** | Normálně přeposílá rámce |
| **Disabled** | Administrativně vypnutý |

Přechod Blocking → Forwarding trvá výchozích **50 sekund** (30 s listening+learning, 20 s max age).

### Varianty STP

| Protokol | Standard | Proprietární? | Popis |
| -------- | -------- | ------------- | ----- |
| **STP** | IEEE 802.1D | Ne | Původní, pomalá konvergence (~50 s) |
| **RSTP** | IEEE 802.1w | Ne | Rapid STP – rychlejší konvergence (~1–2 s) |
| **PVST+** | Cisco | **Ano (Cisco)** | Per-VLAN STP – samostatný strom pro každou VLAN |
| **Rapid PVST+** | Cisco | **Ano (Cisco)** | PVST+ s rychlou konvergencí jako RSTP |
| **MSTP** | IEEE 802.1s | Ne | Multiple STP – skupiny VLANů sdílejí strom |

### Konfigurace STP na Cisco

```
! Nastavení priority (nižší = preferovaný Root Bridge):
spanning-tree vlan 1 priority 4096

! Nebo zkratka:
spanning-tree vlan 1 root primary

! PortFast – přeskočí STP stavy na access portech (připojení PC):
interface GigabitEthernet0/1
 spanning-tree portfast

! BPDU Guard – vypne port, pokud přijde BPDU (ochrana proti smyčkám):
 spanning-tree bpduguard enable
```

---

## EtherChannel

**EtherChannel** – sdružuje více fyzických linek do jednoho logického kanálu; zvyšuje šířku pásma a redundanci. STP vidí kanál jako jeden port → žádné blokování.

### Protokoly EtherChannel

**PAgP – Port Aggregation Protocol**
- Cisco proprietary
- Funguje pouze mezi Cisco zařízeními
- Módy: `desirable` (aktivně vyjednává) / `auto` (pasivně čeká) / `on` (bez vyjednávání)

**PAgP – kompatibilita módů:**

| Strana A \ Strana B | desirable | auto | on |
| ------------------- | --------- | ---- | -- |
| **desirable** | funguje | funguje | ne |
| **auto** | funguje | ne | ne |
| **on** | ne | ne | funguje |

**LACP – Link Aggregation Control Protocol**
- Otevřený standard IEEE 802.3ad
- Funguje mezi různými výrobci
- Módy: `active` (aktivně vyjednává) / `passive` (pasivně čeká) / `on` (bez vyjednávání)

**LACP – kompatibilita módů:**

| Strana A \ Strana B | active | passive | on |
| ------------------- | ------ | ------- | -- |
| **active** | funguje | funguje | ne |
| **passive** | funguje | ne | ne |
| **on** | ne | ne | funguje |

> `auto–auto` a `passive–passive` nefungují – obě strany čekají, kdo začne.
> `on–on` funguje, ale bez protokolu – při chybné konfiguraci nevznikne žádná chyba ani varování.

### Konfigurace EtherChannel na Cisco

```
interface range GigabitEthernet0/1 - 2
 channel-group 1 mode active          ! LACP active
 ! nebo: channel-group 1 mode desirable  (PAgP)

interface Port-channel1
 switchport mode trunk
```

---

## FHRP – First Hop Redundancy Protocol

**FHRP** – řeší redundanci výchozí brány. Routery vytvoří virtuální router se sdílenou **virtuální IP adresou**, která není vázána na konkrétní hardware – při výpadku hlavního routeru ji záloha okamžitě převezme.

- Vrstva: **3. vrstva OSI** (síťová)

### VRRP – Virtual Router Redundancy Protocol
- Open standard
- Role: **Master** (aktivní, posílá VRRP advertisements) / **Backup** (záloha, poslouchá)
- Master volen podle priority

### HSRP – Hot Standby Router Protocol
- Cisco proprietary
- Role: **Active** (přenáší provoz) / **Standby** (čeká na selhání Active)
- Routery si vzájemně posílají Hello pakety

### GLBP – Gateway Load Balancing Protocol
- Cisco proprietary
- Jako jediný umožňuje **load balancing** – více routerů aktivně přenáší data současně
- Role: **AVG** (Active Virtual Gateway) – hlavní router, přiděluje MAC / **AVF** (Active Virtual Forwarder) – ostatní routery přenášející data
- Výhoda: větší celková propustnost; při výpadku jednoho AVF síť pokračuje, jen se sníží maximální šířka pásma

### Návrat Active routeru (preempt)

Když Active router selže, Standby převezme virtuální IP a stane se novým Active.

- **Bez `preempt`** – původní router se po návratu stane pouze Standby, i když má vyšší prioritu; nový Active zůstává aktivní
- **S `preempt`** – původní router po návratu porovná priority; pokud má vyšší, převezme roli Active zpět

### Konfigurace HSRP na Cisco

```
standby 1 ip 192.168.1.254       ! virtuální IP (výchozí brána klientů)
standby 1 priority 150           ! nejvyšší priorita = Active
standby 1 preempt                ! převezme roli Active při návratu
standby 1 timers 3 10            ! Hello interval 3 s, Dead timer 10 s
```
