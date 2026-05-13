
Dynamické protokoly umožňují routerům **automaticky sdílet informace o sítích** a reagovat na změny topologie (výpadek linky, přidání sítě) bez ruční konfigurace.

---

## Rozdělení dynamických protokolů

![[routing_protokoly.svg|697]]

### Podle oblasti působení

| Typ | Popis | Příklady |
| --- | ----- | -------- |
| **IGP** (Interior Gateway Protocol) | Uvnitř jednoho autonomního systému (AS) | RIP, OSPF, EIGRP |
| **EGP** (Exterior Gateway Protocol) | Mezi autonomními systémy (internet) | BGP |

### Podle algoritmu

#### Distance Vector
- Router zná pouze vzdálenost (metriku) a směr (next-hop) k cíli
- Informace sdílí se sousedy – sousedi je dál šíří (**routing by rumor**)
- Pomalá konvergence, riziko routing loops
- Příklady: **RIP** (metrika = počet hopů, max 15), **EIGRP** (Cisco proprietary, hybridní)

#### Link State
- Každý router zná **celou topologii** sítě
- Routery sdílejí LSA (Link State Advertisement) – informace o svých spojeních
- Každý router si sám počítá nejkratší cesty pomocí algoritmu
- Rychlá konvergence, škálovatelné
- Příklad: **OSPF**

#### Path Vector
- Rozšíření distance vector o celou cestu (seznam AS)
- Příklad: **BGP** – páteř internetu

---

## Metrika

Číslo vyjadřující "cenu" cesty – router vybírá trasu s **nejnižší metrikou**:

| Protokol | Metrika |
| -------- | ------- |
| RIP | Počet hopů (max 15) |
| OSPF | Cost (odvozeno od šířky pásma: 10⁸ / bandwidth) |
| EIGRP | Složená metrika (bandwidth + delay) |
| BGP | AS-path + řada atributů |

---

## Konvergence

Čas, za který všechny routery v síti mají shodnou a správnou směrovací tabulku po změně topologie. Rychlá konvergence = lepší protokol.

---

## OSPF – Open Shortest Path First

### Základní vlastnosti
- **Link state** protokol, IGP
- Otevřený standard (RFC 2328 pro OSPFv2, RFC 5340 pro OSPFv3 / IPv6)
- Metrika = **cost** (10⁸ / bandwidth rozhraní v bps)
- Rychlá konvergence, škálovatelné díky oblastem (areas)
- Používá **SPF algoritmus** pro výpočet nejkratší cesty
- Přenáší zprávy přímo přes IP (protokol číslo 89), nepoužívá TCP/UDP

### OSPF oblasti (Areas)

- Síť se dělí do oblastí pro snížení zátěže (menší LSDB, méně výpočtů)
- **Area 0 (backbone)** – páteřní oblast, všechny ostatní oblasti se musí připojit přes Area 0
- Routery na hranici oblastí = **ABR** (Area Border Router)
- Routery spojující OSPF s jiným AS = **ASBR** (Autonomous System Boundary Router)

### OSPF role routerů

| Role | Popis |
| ---- | ----- |
| **DR** (Designated Router) | Hlavní router segmentu – sbírá a distribuuje LSA |
| **BDR** (Backup DR) | Záloha DR |
| **DROther** | Ostatní routery – komunikují pouze s DR/BDR |

DR/BDR volba probíhá na multiaccess sítích (Ethernet) – snižuje počet LSA zpráv. Volí se podle nejvyššího **priority** (výchozí 1), při shodě nejvyšší **Router ID**.

### Router ID

- Unikátní identifikátor routeru v OSPF (formát IPv4 adresy, např. `1.1.1.1`)
- Výběr: 1. ručně nastavené, 2. nejvyšší loopback IP, 3. nejvyšší fyzická IP

### Navázání sousedství (Adjacency)
>nemusíme znát celé

OSPF routery procházejí stavy před plným sousedstvím:

1. **Down** – žádná komunikace
2. **Init** – přijat Hello paket od souseda
3. **2-Way** – oboustranná komunikace (u DROther routerů se zastaví zde)
4. **ExStart** – dohodnutí Master/Slave pro výměnu DB
5. **Exchange** – výměna DBD (Database Description) paketů
6. **Loading** – stahování chybějících LSA
7. **Full** – plné sousedství, shodná LSDB

### OSPF Hello protokol

- Routery posílají **Hello pakety** pro nalezení sousedů a udržení sousedství
- Multicast adresa `224.0.0.5` (all OSPF routers)
- **Hello interval** – jak často se posílá Hello (výchozí 10 s na Ethernet)
- **Dead interval** – po jaké době bez Hello je soused prohlášen za mrtvého (výchozí 40 s)
- Aby vzniklo sousedství, musí sousedé mít shodné: Hello/Dead interval, Area ID, maska, MTU

### Konfigurace OSPF na Cisco

```
Router(config)# router ospf 1                        ! process ID (lokální, nemusí souhlasit)
Router(config-router)# router-id 1.1.1.1             ! nastavení Router ID
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0   ! přidání sítě do OSPF
Router(config-router)# network 10.0.0.0 0.0.0.3 area 0

! Pasivní rozhraní (nepošle Hello, ale síť se inzeruje):
Router(config-router)# passive-interface GigabitEthernet0/0
```

### Ověření OSPF

```
show ip ospf neighbor          ! seznam sousedů a jejich stav
show ip ospf interface         ! OSPF nastavení na rozhraních
show ip route ospf             ! OSPF trasy v směrovací tabulce
show ip ospf database          ! LSDB (Link State Database)
```

### SPF algoritmus (Shortest Path First)

Každý router si na základě LSDB (kompletní mapa sítě) sám vypočítá strom nejkratších cest:

1. Router umístí sám sebe jako kořen stromu (cost = 0)
2. Přidá všechny přímo připojené sousedy s jejich cost
3. Z dosud nepřidaných sítí vybere tu s **nejnižším celkovým costem** a přidá ji do stromu
4. Opakuje bod 3, dokud nejsou všechny sítě ve stromě
5. Výsledek = strom nejkratších cest → z něj se plní směrovací tabulka

```
Příklad:
R1 --cost 1-- R2 --cost 10-- R3
R1 --cost 5-- R3

Z pohledu R1:
- R2: cost 1
- R3 přes R2: cost 1+10 = 11
- R3 přímo: cost 5  ← kratší, tato trasa vyhraje
```

### Cost výpočet

```
Cost = 10⁸ / bandwidth (bps)

FastEthernet (100 Mb/s):  10⁸ / 100 000 000 = 1
GigabitEthernet (1 Gb/s): 10⁸ / 1 000 000 000 = 0,1 → zaokrouhlí se na 1
Serial (1,544 Mb/s):      10⁸ / 1 544 000 = 64
```

> Na GigabitEthernet a rychlejší se cost ručně upravuje příkazem `auto-cost reference-bandwidth`
