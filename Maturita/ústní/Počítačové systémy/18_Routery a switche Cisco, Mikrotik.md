## Cisco

Cisco je jedna z největších síťových firem současnosti. Jejich routery a switche běží na operačním systému **Cisco IOS** (Internetwork Operating System).

---

## Hardware routeru

| Komponenta | Obsah / Funkce |
| ---------- | -------------- |
| **CPU + RAM** | Zpracování paketů, spouštění IOS, směrovací tabulka – ztratí se po restartu |
| **ROM** | Bootstrap a diagnostický software (POST) |
| **Flash** | IOS image – zachová se po restartu |
| **NVRAM** | Startup-config – zachová se po restartu |

---

## Verze a licencování Cisco IOS

```
Router# show version
```

| Verze                 | Popis                                                                          |
| --------------------- | ------------------------------------------------------------------------------ |
| **IOS 12.4 a starší** | Starší, stabilní; funkce přímo zabudované v systému                            |
| **IOS 15.x**          | Aktuální standard; Universal Image – funkce se aktivují softwarovými licencemi |


**Licenční balíčky:**
- **IP Base** – základní směrování a síťové služby
- **Data / Security / UC** – doplňkové balíčky (pokročilý firewall, VPN, IP telefonie)

---

## Prvotní připojení – konzole

- Router se poprvé konfiguruje přes **konzolový port**
- **Konzolový kabel** – RJ-45 na straně routeru, USB nebo DB-9 na straně PC
- Na PC se používá emulátor terminálu (např. **PuTTY**) pro přístup k CLI

---

## Módy CLI

```
Router>           User EXEC      – základní příkazy, monitoring
Router#           Privileged EXEC – show příkazy, ukládání konfigurace
Router(config)#   Global config  – nastavení celého zařízení
Router(config-if)# Interface config – nastavení konkrétního rozhraní
```

```bash
enable                        # → Privileged EXEC
configure terminal             # → Global config
interface GigabitEthernet0/1  # → Interface config
exit                           # o úroveň výš
end / Ctrl+Z                   # → zpět do Privileged EXEC
```

---

## Základní konfigurace

```bash
hostname R1

! Heslo pro Privileged EXEC (šifrované):
enable secret cisco123

! Šifrování všech hesel v config (plain text → hash):
service password-encryption

! Konzolový přístup:
line console 0
 password cisco
 login

! Vzdálený přístup (Telnet/SSH):
line vty 0 4
 password cisco
 login
 transport input ssh          ! pouze SSH, bez Telnetu

! SSH (vyžaduje domain-name a RSA klíč):
ip domain-name firma.cz
crypto key generate rsa modulus 2048
ip ssh version 2
username admin privilege 15 secret heslo
line vty 0 4
 login local                  ! ověření přes lokální uživatele

! Rozhraní:
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 description LAN
 no shutdown

! Uložení (RAM → NVRAM):
copy running-config startup-config
```

## Základní příkazy

```bash
! Zobrazení:
show running-config           # aktuální konfigurace (RAM)
show startup-config           # uložená konfigurace (NVRAM)
show ip interface brief       # přehled rozhraní a jejich IP + stav
show ip route                 # směrovací tabulka
show version                  # verze IOS, uptime, HW, paměti
show interfaces               # detailní statistiky rozhraní
show mac address-table        # MAC tabulka (switch)
show vlan brief               # VLANy (switch)
show ip ospf neighbor         # OSPF sousedé

! Správa:
copy running-config startup-config   # uložení konfigurace
erase startup-config                 # smazání startup-config
reload                               # restart zařízení
no shutdown                          # zapnutí rozhraní
shutdown                             # vypnutí rozhraní
```

---

## MikroTik RouterOS

MikroTik je lotyšská společnost (založena 1996) specializující se na síťový hardware a software. Proslavila se cenově dostupným a výkonným routerovým softwarem **RouterOS** a hardwarem **RouterBoard (RB)**. Původně cílila na poskytovatele bezdrátového internetu (WISP) v rozvojových zemích, dnes je rozšířená globálně.

### RouterOS – základní info

- Postaven na **Linuxovém jádře**
- Nabízí komplexní funkce: routing, VPN, firewall, QoS, Hotspot…
- RouterBoardy jsou malé počítače s RouterOS

### Licencování

Licence jsou trvalé (nekončí) a dělí se do úrovní:

| Level | Určení |
| ----- | ------ |
| **0** | Demo – omezená funkcionalita |
| **4** | Základní router + Wi-Fi |
| **5** | Pro ISP – větší limit uživatelů |
| **6** | Controller – neomezené funkce |

### Instalace a verze

- **Netinstall** – instalace čistého OS přes ethernet; obnova poškozeného systému
- **Factory preinstall** – většina RouterBoardů přichází s předinstalovaným systémem (výchozí IP `192.168.88.1`, bez hesla)
- **Upgrade** – nahrání `.npk` balíčku a restart

| Verze | Popis |
| ----- | ----- |
| **RouterOS v6** | Starší, prověřená, stále rozšířená |
| **RouterOS v7** | Modernější jádro, vyšší výkon, novější protokoly |

---

## Správa MikroTik

| Rozhraní | Popis |
| -------- | ----- |
| **WinBox** | Nativní desktopová aplikace; připojení přes MAC nebo IP – nejjednodušší způsob |
| **WebFig** | Webové rozhraní přes prohlížeč |
| **CLI** | SSH, Telnet nebo konzolový port |

### CLI – hierarchická struktura

```bash
/interface ethernet print      # výpis ethernet rozhraní

/ip address add address=192.168.88.1/24 interface=ether1

/ip address print              # zobrazení IP adres

export file=muj_backup         # záloha konfigurace do souboru
```

**Navigace:**
- `..` – o úroveň výš
- `/` – kořen

---

## Srovnání Cisco vs MikroTik

| | Cisco | MikroTik |
| - | ----- | -------- |
| Cena | Vysoká | Nízká |
| Použití | Enterprise, ISP | ISP, SMB, domácnosti |
| OS | IOS / IOS-XE | RouterOS (Linux) |
| Správa | CLI | CLI + WinBox + WebFig |
| Certifikace | CCNA, CCNP | MTCNA, MTCRE |
