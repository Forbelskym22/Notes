
Bezdrátové sítě přenášejí data pomocí **elektromagnetických vln** (rádiové frekvence). Signál se šíří vzduchem a může být rušen fyzickými překážkami, jinými zařízeními nebo interferencí na stejném kanálu.

---

## Wi-Fi – standardy IEEE 802.11

| Standard                  | Pásmo           | Max. rychlost | Poznámka                                      |
| ------------------------- | --------------- | ------------- | --------------------------------------------- |
| **802.11**                | 2,4 GHz         | 2 Mb/s        | Původní standard                              |
| **802.11a**               | 5 GHz           | 54 Mb/s       | První 5 GHz standard, není kompatibilní s b/g |
| **802.11b**               | 2,4 GHz         | 11 Mb/s       | Starý, dnes obsoletní                         |
| **802.11g**               | 2,4 GHz         | 54 Mb/s       | Zpětně kompatibilní s b                       |
| **802.11n** (Wi-Fi 4)     | 2,4 / 5 GHz     | 600 Mb/s      | MIMO antény                                   |
| **802.11ac** (Wi-Fi 5)    | 5 GHz           | 3,5 Gb/s      | MU-MIMO, beamforming                          |
| **802.11ax** (Wi-Fi 6/6E) | 2,4 / 5 / 6 GHz | 9,6 Gb/s      | OFDMA, lepší hustá prostředí                  |

---

## Frekvenční pásma

**2,4 GHz**
- Větší dosah, lepší průchod zdmi
- Více rušení (mikrovlnky, Bluetooth, sousední sítě)
- V ČR dostupné kanály **1–13**, šířka kanálu 20 MHz (nebo 40 MHz u 802.11n+)
- Kanály jsou rozestupy 5 MHz a překrývají se – nepřekrývající se jsou pouze **1, 6, 11**

| Kanál | Střední frekvence |
| ----- | ----------------- |
| 1 | 2412 MHz |
| 2 | 2417 MHz |
| 3 | 2422 MHz |
| 4 | 2427 MHz |
| 5 | 2432 MHz |
| 6 | 2437 MHz |
| 7 | 2442 MHz |
| 8 | 2447 MHz |
| 9 | 2452 MHz |
| 10 | 2457 MHz |
| 11 | 2462 MHz |
| 12 | 2467 MHz |
| 13 | 2472 MHz |

**5 GHz**
- Kratší dosah, horší průchod překážkami
- Vyšší rychlost, méně rušení
- Šířka kanálu: 20 / 40 / 80 / 160 MHz
- V ČR dostupné kanály (EU regulace):

| Pásmo           | Kanály         | Frekvence     | Poznámka     |
| --------------- | -------------- | ------------- | ------------ |
| UNII-1          | 36, 40, 44, 48 | 5150–5250 MHz | Pouze indoor |
| UNII-2          | 52, 56, 60, 64 | 5250–5350 MHz | Vyžaduje DFS |
| UNII-2 Extended | 100–140        | 5470–5725 MHz | Vyžaduje DFS |

> **DFS (Dynamic Frequency Selection)** – AP sleduje, zda pásmo nepoužívá radar; při detekci automaticky přepne kanál.

**6 GHz** (Wi-Fi 6E)
- Nejméně rušení, nejvyšší rychlost
- Nejkratší dosah
- Kanály 1–233, šířka až 160 MHz

---

## Parametry Wi-Fi sítě

- **SSID** – název sítě (Service Set Identifier)
- **BSSID** – MAC adresa AP
- **Kanál** – část frekvenčního pásma, na které AP vysílá
- **Šifrování** – zabezpečení přenosu (viz níže)
- **Výkon signálu** – měří se v dBm (čím méně záporné, tím lepší signál)

---

## Zabezpečení Wi-Fi

| Protokol | Bezpečnost | Poznámka |
| -------- | ---------- | -------- |
| **WEP** | Velmi slabá | Prolomitelný za minuty, nepoužívat |
| **WPA** | Slabá | TKIP šifrování, dočasná náhrada WEP |
| **WPA2** | Dobrá | AES šifrování, standard pro většinu sítí |
| **WPA3** | Silná | SAE handshake, odolný vůči slovníkovým útokům |

**WPA2/WPA3 módy:**
- **Personal (PSK)** – sdílené heslo; pro domácnosti
- **Enterprise** – ověření pomocí RADIUS serveru a certifikátů; pro firmy

---

## Interference a rušení

- **Ko-kanálová interference** – více AP na stejném kanálu v dosahu
- **Sousední kanálová interference** – překrývající se kanály (proto kanály 1, 6, 11 na 2,4 GHz)
- **Fyzické překážky** – zdi, kovy, sklo zeslabují signál
- **Řešení:** správné rozmístění AP, plánování kanálů, 5 GHz pásmo

---

## CSMA/CA – přístupová metoda

Bezdrátové sítě nemohou detekovat kolize jako drátové (CSMA/CD), proto kolizím předcházejí pomocí **CSMA/CA** (Collision Avoidance).

Klient se před vysíláním domluví s AP pomocí **RTS/CTS**:

1. Klient pošle AP zprávu **RTS** (Request to Send) – žádost o vysílání
2. AP odpoví zprávou **CTS** (Clear to Send) – přidělí klientovi časový slot
3. Ostatní klienti, kteří CTS slyší, mlčí po dobu přiděleného slotu
4. Klient vysílá, AP potvrdí přijetím **ACK**
5. Pokud ACK nepřijde, klient opakuje od začátku
