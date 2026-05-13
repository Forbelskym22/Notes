
VLAN (Virtual Local Area Network) je logické rozdělení fyzické sítě na více nezávislých broadcastových domén v rámci jednoho nebo více switchů. Zařízení ve stejné VLAN spolu komunikují jako by byla ve stejné fyzické síti – bez ohledu na fyzické umístění.

---

## Proč používat VLAN

**Bez VLAN:** všechna zařízení na switchi sdílejí jednu broadcastovou doménu.

**S VLAN:** každá VLAN = samostatná broadcastová doména; provoz jedné VLANy se nedostane do jiné bez routeru.

### Výhody
- **Bezpečnost** – oddělení citlivého provozu (účetnictví, management) od ostatních
- **Výkon** – menší broadcastové domény = méně zbytečného provozu
- **Flexibilita** – přesun zařízení do jiné VLAN změnou konfigurace, ne fyzickým přepojením
- **Úspora HW** – jeden fyzický switch nahrazuje více logicky oddělených sítí

### Nevýhody
- Komunikace mezi VLANami vyžaduje router nebo L3 switch
- Složitější správa a konfigurace

---

## Typy portů na switchi

**Access port**
- Přiřazen do jedné VLAN
- Připojení koncových zařízení (PC, tiskárna)
- Rámce procházejí bez VLAN značky

**Trunk port**
- Přenáší provoz více VLANů najednou
- Propojení switch–switch nebo switch–router
- Rámce jsou označeny **VLAN tagem** (IEEE 802.1Q)

---

## IEEE 802.1Q – VLAN tagging

Při průchodu trunk portem se do Ethernet rámce vloží **4bytový tag** (32 bitů):
- TPID = `0x8100` – identifikace 802.1Q rámce
- **VLAN ID** – číslo 1–4094
- PCP – priorita pro QoS

**Native VLAN** – VLAN, jejíž provoz na trunk portu nejde tagován (výchozí VLAN 1). Musí být shodná na obou stranách trunk spoje.

---

## Konfigurace VLAN na Cisco

```
! Vytvoření VLAN:
vlan 10
 name UCETNICTVI
vlan 20
 name IT

! Access port:
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

! Trunk port:
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 99

! Ověření:
show vlan brief
show interfaces trunk
```

---

## Routování mezi VLANami

Zařízení v různých VLANách nemohou komunikovat bez L3 zařízení.

### 1. Legacy routing (tradiční)
- Každá VLAN má vlastní **fyzický port** na routeru
- Switch port připojený k routeru = access port v dané VLAN
- Nevýhoda: potřeba mnoho fyzických portů – neškálovatelné

### 2. Router-on-a-Stick (ROAS)
- Jeden fyzický port routeru rozdělen na **subinterface** pro každou VLAN
- Trunk linka mezi switchem a routerem

```
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
```

### 3. L3 switch (multilayer switch)
- Switch se schopností routování na vrstvě 3 – efektivnější pro větší sítě
- **SVI (Switched Virtual Interface)** – virtuální rozhraní pro každou VLAN

```
ip routing

interface vlan 10
 ip address 192.168.10.1 255.255.255.0

interface vlan 20
 ip address 192.168.20.1 255.255.255.0
```

---

## VTP – VLAN Trunking Protocol

Cisco proprietary protokol pro automatickou distribuci VLAN konfigurace mezi switchi – nemusíme vytvářet VLANy na každém switchi ručně.

### VTP módy

| Mód | Popis |
| --- | ----- |
| **Server** | Vytváří/upravuje/maže VLANy, šíří změny do domény |
| **Client** | Přijímá VTP aktualizace, nemůže lokálně měnit VLANy |
| **Transparent** | Konfiguruje VLANy lokálně, VTP zprávy přeposílá ale neaplikuje |

- Switche ve stejné **VTP doméně** sdílejí VLAN databázi
- Každá změna zvýší **revision number** – switch s vyšším číslem přepíše ostatní
- Nebezpečí: přidání starého switche s vysokým revision number může smazat VLANy v celé doméně

```
vtp mode server
vtp domain FIRMA
vtp password heslo123
```

---

## DTP – Dynamic Trunking Protocol

Cisco protokol pro automatické vyjednání trunk portu mezi switchi.

### DTP módy

| Mód | Chování |
| --- | ------- |
| **dynamic auto** | Pasivně čeká; trunk vznikne jen pokud druhá strana je desirable nebo trunk |
| **dynamic desirable** | Aktivně vyjednává trunk |
| **trunk** | Vždy trunk |
| **access** | Vždy access, DTP vypnuté |
| **nonegotiate** | Trunk bez DTP – manuální, bezpečnější |

> V produkčních sítích se doporučuje DTP vypnout (`switchport nonegotiate`) a porty konfigurovat ručně – DTP lze zneužít k útoku.
