## Metalická média

### Princip

Přenos dat pomocí elektrického signálu po vodičích z kovu (zpravidla měď).

### Kroucená dvojlinka (Twisted Pair)

Nejrozšířenější síťové médium pro LAN. Páry vodičů jsou zkrouceny – zkroucení snižuje elektromagnetické rušení (EMI) a přeslechy mezi páry.

**Typy dle stínění:**

| Typ | Popis |
| --- | ----- |
| **UTP** (Unshielded Twisted Pair) | Bez stínění, nejlevnější, nejběžnější |
| **FTP** (Foiled TP) | Fóliové stínění celého kabelu |
| **STP** (Shielded TP) | Stínění každého páru zvlášť |
| **SFTP** | Stínění párů + celkové stínění |

**Kategorie (Cat):**

| Kategorie | Max. rychlost | Max. vzdálenost | Použití |
| --------- | ------------- | --------------- | ------- |
| Cat 5e | 1 Gb/s | 100 m | Starší sítě |
| Cat 6 | 1 Gb/s (10 Gb/s do 55 m) | 100 m | Běžné LAN |
| Cat 6A | 10 Gb/s | 100 m | Datová centra |
| Cat 7 | 10 Gb/s | 100 m | Průmysl, STP |
| Cat 8 | 25/40 Gb/s | 30 m | Datová centra |

**Konektory:** RJ-45 (8P8C) – standardní konektor pro Ethernet; RJ-11 – telefonní linka, používán i pro DSL připojení k internetu


**Zapojení:**
- **Přímý kabel (straight-through)** – jiná úroveň zařízení
- **Křížený kabel (crossover)** – stejná úroveň zařízení 
> (dnes řeší Auto-MDI/X automaticky)

### Koaxiální kabel

- Centrální vodič obklopený izolantem, opletením a vnějším pláštěm
- Dříve používán pro Ethernet (10BASE2, 10BASE5) – dnes nepoužitelný pro LAN
- Stále se používá pro kabelovou televizi, anténní rozvody

---

## Optická média

### Princip

Přenos dat pomocí světelných impulzů (laser nebo LED) po skleněném nebo plastovém vláknu. Využívá **totální odraz** – světlo se odráží od rozhraní jádra a pláště a postupuje vláknem.

### Struktura optického vlákna

- **Jádro (core)** – sklo s vyšším indexem lomu; tudy se šíří světlo
- **Plášť (cladding)** – sklo s nižším indexem lomu; způsobuje totální odraz světla zpět do jádra
- **Izolace a ochrana** – vrstvy plastu chránící vlákno před vlhkostí, mechanickým poškozením a přetržením

### Jednovidové vlákno (Single-mode)

- Velmi úzké jádro (~9 µm) – světlo cestuje pouze jednou cestou (videm)
- Nízký útlum, velmi dlouhé vzdálenosti (desítky až stovky km)
- Zdroj: laser
- Použití: páteřní sítě, telekomunikace, WAN

### Mnohovidové vlákno (Multi-mode)

- Širší jádro (50 nebo 62,5 µm) – světlo cestuje více cestami
- Vyšší útlum, kratší vzdálenosti (do ~2 km)
- Zdroj: laser
- Použití: LAN, datová centra
- Barva konektoru: **oranžová nebo tyrkysová**

### Konektory optických vláken

| Konektor | Popis |
| -------- | ----- |
| **LC** | Malý, nejrozšířenější v datových centrech |
| **SC** | Čtvercový, push-pull |
| **ST** | Bajonetový zámek, starší |
| **FC** | Šroubovací, pro měřicí techniku |
| **MTP/MPO** | Vícevidový, 12/24 vláken najednou |

### Parametry optických vláken

- **Útlum** – dB/km; ztráta signálu na délku
- **Šířka pásma** – GHz·km (u MMF)
- **Vlnová délka** – nm; SMF: 1310/1550 nm, MMF: 850/1300 nm

---

## Srovnání metalika vs. optika

| Parametr | Kroucená dvojlinka | Optické vlákno |
| -------- | ------------------ | -------------- |
| Přenosové médium | Elektrický signál | Světlo |
| Max. vzdálenost | ~100 m | Desítky km (SMF) |
| Rychlost | až 40 Gb/s (Cat 8) | až Tb/s |
| Odolnost vůči EMI | Nízká (UTP) / střední (STP) | Imunní |
| Cena | Nízká | Vyšší |
| Instalace | Jednoduchá | Náročnější |
| Použití | LAN, přístupová vrstva | Páteřní sítě, WAN, datová centra |

---

## Rozhraní (porty a standardy)

### Ethernet standardy

| Standard | Rychlost | Médium |
| -------- | -------- | ------ |
| 10BASE-T | 10 Mb/s | UTP Cat 3 |
| 100BASE-TX (Fast Ethernet) | 100 Mb/s | UTP Cat 5 |
| 1000BASE-T (Gigabit Ethernet) | 1 Gb/s | UTP Cat 5e/6 |
| 1000BASE-SX/LX | 1 Gb/s | MMF/SMF |
| 10GBASE-T | 10 Gb/s | UTP Cat 6A |
| 10GBASE-SR/LR | 10 Gb/s | MMF/SMF |

### Fyzické porty

- **RJ-45** – metalický Ethernet (kroucená dvojlinka)
- **SFP (Small Form-factor Pluggable)** – modulární port pro optiku nebo metaliku; vyměnitelný transceiver
- **SFP+** – 10 Gb/s varianta SFP
- **QSFP** – 40/100 Gb/s, 4 kanály

### Parametry síťových médií

- **Šířka pásma** – Mb/s nebo Gb/s; maximální přenosová rychlost
- **Vzdálenost** – maximální délka segmentu bez opakovače
- **Útlum** – pokles signálu na délku (dB/km)
- **Rušení (EMI)** – citlivost na elektromagnetické rušení
- **Cena** – pořizovací náklady na metr + konektory + instalace

---

## Nářadí a nástroje

**Metalická média:**
- **Stripovací kleště** – odstraní vnější plášť kabelu a odizolují jednotlivé vodiče
- **Krimpovací kleště** – zalisují konektor RJ-45 na kabel (zmáčknutím se kontakty zapíchnou do vodičů)
- **Tester kabelu** – ověří správnost zapojení a kontinuitu vodičů

**Optická média:**
- **Svářečka vláken (fusion splicer)** – spojuje dvě vlákna elektrickým obloukem (tavením); minimální útlum spoje
- **Štípačka vláken (cleaver)** – přesně přeřízne vlákno do rovného řezu nutného pro sváření
- **Stripovací kleště pro optiku** – odstraní ochranné vrstvy vlákna před svařením
