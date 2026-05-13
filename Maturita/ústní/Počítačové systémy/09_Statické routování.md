Routování je proces výběru cesty pro pakety mezi různými sítěmi. Router rozhoduje na základě **směrovací tabulky** – hledá nejdelší shodu (longest prefix match) s cílovou IP adresou paketu.

---

## Typy routů

### Connected (C)
- Automaticky přidán při konfiguraci IP adresy na rozhraní routeru
- Reprezentuje přímo připojenou síť
- Nevyžaduje žádnou ruční konfiguraci

### Static (S)
- Ručně nakonfigurovaný správcem
- Výhody: jednoduché, předvídatelné, nízká zátěž CPU
- Nevýhody: nereaguje automaticky na změny topologie, náročná správa ve větších sítích

### Default route (výchozí trasa)
- Speciální statická trasa `0.0.0.0/0`
- Použita pro pakety, které neodpovídají žádné konkrétnější trase
- Typicky ukazuje na poskytovatele internetu (ISP)

### Floating static route (záložní statická trasa)
- Statická trasa s **uměle zvýšeným AD** – aktivuje se pouze když primární trasa vypadne
- Dokud primární trasa existuje (nižší AD), záložní trasa není v tabulce vidět
- Příklad: primární trasa přes OSPF (AD 110), záložní statická s AD 200 → záložní se použije jen při výpadku OSPF

```
! Záložní trasa s AD 200 (vyšší než OSPF = 110)
ip route 10.0.0.0 255.255.255.0 192.168.1.2 200
```

---

## Administrative Distance (AD)

Číslo vyjadřující důvěryhodnost zdroje routu – čím nižší, tím důvěryhodnější:

| Zdroj | AD |
| ----- | -- |
| Connected | 0 |
| Static | 1 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |

Pokud router zná stejnou síť z více zdrojů, vybere záznam s nejnižším AD.

---

## Konfigurace na Cisco (IOS)

### Základní konfigurace rozhraní

```
Router> enable
Router# configure terminal

Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
```

### Přidání statické trasy

```
ip route <cílová síť> <maska> <next-hop IP nebo výstupní rozhraní>
```

Příklady:
```
! Přes next-hop IP:
ip route 10.0.0.0 255.255.255.0 192.168.1.2

! Přes výstupní rozhraní:
ip route 10.0.0.0 255.255.255.0 GigabitEthernet0/1

! Výchozí trasa (default route):
ip route 0.0.0.0 0.0.0.0 192.168.1.1
```

### Ověření

```
show ip route              ! zobrazí celou směrovací tabulku
show ip route static       ! pouze statické trasy
ping 10.0.0.1              ! test dosažitelnosti
traceroute 10.0.0.1        ! trasa paketu
```

---

## Práce routeru se směrovací tabulkou

1. Příchozí paket – router přečte cílovou IP adresu
2. Hledá **nejdelší shodu** (longest prefix match) – konkrétnější trasa má přednost
3. Pokud nalezena → odešle paket na příslušné rozhraní / next-hop
4. Pokud nenalezena a existuje default route → použije ji
5. Pokud ani default route není → zahodí paket a odešle ICMP "Destination Unreachable"

**Příklad longest prefix match:**
```
Směrovací tabulka:
S  10.0.0.0/8    via 192.168.1.2
S  10.1.0.0/16   via 192.168.1.3
S  10.1.1.0/24   via 192.168.1.4

Paket cílí na 10.1.1.5 → router vybere 10.1.1.0/24 (nejdelší shoda)
```

---

## Sumarizace routů (Route Summarization)

Sloučení více konkrétních tras do jedné souhrnné – zjednodušuje směrovací tabulku.

**Příklad:**
Máme sítě:
```
192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24
```

Vše lze shrnout do: **192.168.0.0/22**

Jak na to – hledáme společné bity:
```
192.168.0.0 = 11000000.10101000.00000000.00000000
192.168.1.0 = 11000000.10101000.00000001.00000000
192.168.2.0 = 11000000.10101000.00000010.00000000
192.168.3.0 = 11000000.10101000.00000011.00000000
                                        ^^
Společných bitů: 22 → maska /22
Souhrnná adresa: 192.168.0.0/22
```

**Výhody sumarizace:**
- Menší směrovací tabulky → rychlejší lookup
- Méně routovacích update zpráv
- Změna v sumarizované oblasti neovlivní ostatní routery
