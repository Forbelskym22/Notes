
## Data

> Data jsou jakékoli vyjádření (reprezentace) skutečnosti, schopné přenosu, interpretace či zpracování. Jsou to jakékoli zaznamenané poznatky či fakta.

> Data jsou vhodným způsobem zachycené (zakódované) zprávy, které vypovídají o světě a jsou srozumitelné pro příjemce — člověka nebo počítač. *(Molnár)*

**Kódování dat** — data lze reprezentovat různými způsoby:
- binárně (`01101101…`)
- jako ASCII kód (`071082065…`)
- jako text (recept, tabulka, mapa)

---

## Informace

> Informace je výsledek zpracování dat. *(Hayes)*

> Informace jsou data přetvořená požadovaným způsobem. *(Cigánek)*

> Informace je to, co vyplývá z důkladných analýz, zpracování a prezentace dat v takové formě, která bude vhodná pro **rozhodovací proces**. *(Long)*

Informace je obsažena ve zprávě jen tehdy, jestliže u přijímajícího subjektu **odstraňuje nevědění**. Stejná data mohou být pro jednoho člověka informací a pro jiného ne.

**Znalost** — informace zpracovaná a zasazená do zkušenosti → základ pro rozhodování

**Prezentace dat** — stejná data lze prezentovat různě. Graf s oříznutou osou Y působí dramatičtěji než graf začínající od nuly, přestože zobrazuje totéž. Volba měřítka a typu grafu ovlivňuje, jak příjemce data interpretuje → data lze manipulovat formou prezentace.

---

## Modelování dat

**Modelování dat** = návrh struktury dat ještě před tím, než se databáze nebo IS vytvoří. Odpovídá na otázku: *co budeme ukládat, jaké entity existují a jak spolu souvisejí?*

Výsledkem je **ER diagram** (Entity-Relationship) — grafické znázornění entit, jejich atributů a vzájemných vazeb:

```
[Zákazník] ——1—— <Zadal> ——N—— [Objednávka] ——N—— <Obsahuje> ——M—— [Produkt]
```

Modelování dat je součástí návrhu IS — každý IS potřebuje datový model jako základ své databáze.

### Normalizační pravidla

Sada pravidel pro odstranění redundancí a nekonzistencí — aby se stejná data neukládala vícekrát a oprava na jednom místě stačila. V praxi se používají 3 normální formy, každá vyšší zahrnuje tu předchozí.

- **1. NF** — každá hodnota musí být atomická (dále nedělitelná) a nesmí existovat opakující se skupiny sloupců. Prostě: *"jeden sloupec = jedna věc."*
  - adresa jako jeden řetězec porušuje 1NF → rozdělit na `Ulice`, `Čp.`, `Město`, `PSČ`
  - sloupce `Zboží1`, `Zboží2`, `Zboží3`… porušují 1NF → udělat zvláštní tabulku položek

- **2. NF** — každý atribut musí záviset na **celém** primárním klíči, ne jen na jeho části. Prostě: *"pokud se něco opakuje pořád dokola, patří to jinam."*
  - datum faktury se opakuje u každé položky → oddělit tabulku `Faktury` od `PoložkyFaktury`

- **3. NF** — žádný atribut nesmí záviset na jiném neklíčovém atributu, odvozené hodnoty se neukládají. Prostě: *"co se dá dopočítat, to neukládej."*
  - sloupec `Celkem = Ks × Cena` → zbytečný, stačí dopočítat při dotazu
  - `Základní plat` závisí na `Platové třídě`, ne na ID pracovníka → oddělit číselník platových tříd

---

## Co je informační systém?

> IS je soubor lidí, technických prostředků a metod (programů), zabezpečujících **sběr, přenos, zpracování a uchování dat**, za účelem prezentace informací pro potřeby uživatelů. *(Molnár)*

Základní úloha: získávání, spravování a poskytování informací na správné místo, ve správném čase a vhodné formě.

---

## Komponenty IS

| Komponenta | Popis |
|---|---|
| **Hardware** | servery, PC, síť, tiskárny |
| **Software** | aplikace, OS, databázový systém |
| **Datové zdroje** | databáze, souborové systémy |
| **Procesy** | postupy a pravidla zpracování dat |
| **Lidské zdroje** | uživatelé, správci, analytici |

---

## Architektura IS — pyramida

```
        ┌─────────┐
        │   EIS   │  ← vrcholový management (strategické rozhodování)
        ├─────────┤
        │   MIS   │  ← střední management (reporty, analýzy)
        ├─────────┤
        │   TPS   │  ← operativní úroveň (každodenní transakce)
        └─────────┘
     EDI ↕               ↕ OIS
```

Čím výš v pyramidě, tím dál od samotného IS — pracuje se s **výsledky** místo se surovými daty:

```
EIS  →  "Otevřeme nové pobočky?"     ← rozhodnutí
MIS  →  "Tržby rostou o 15 %"        ← přehled
TPS  →  "Zákazník koupil rohlík"     ← záznam
```

- **TPS** (Transaction Processing System) — zaznamenává každou transakci v reálném čase (objednávky, platby, docházka). Prostě: *"Stalo se X, zapiš to."*
- **MIS** (Management Information System) — bere data z TPS a dělá z nich reporty a přehledy pro střední management. Prostě: *"Co se děje? Jak si vedeme?"*
- **EIS/ESS** (Executive Information/Support System) — strategické analýzy, trendy, prognózy pro vrcholový management. Prostě: *"Kam míříme? Co nás čeká?"*
- **DSS** (Decision Support System) — součást MIS vrstvy, simuluje scénáře pro podporu rozhodování ("pokud zdražíme o 2 Kč, jak to ovlivní tržby?")

---

## Požadavky na IS

- propojení subsystémů, centralizovanost, vzájemná komunikace modulů
- rozšiřitelnost a pružnost
- efektivnost a spolehlivost
- rychlé zpracování, přehledné výstupy, nepřetržitá dostupnost dat

---

## Typy IS — příklady

### ERP — Enterprise Resource Planning
Software pro řízení každodenních podnikových procesů — účetnictví, nákup, projektové řízení, dodavatelský řetězec.

- **Malé/střední podniky:** KARAT, Solitea, STORMWARE
- **Velké podniky:** SAP, Helios, Oracle
- **Modely dodání:**
  - **On-premise** — software běží na vlastních serverech firmy, firma si ho spravuje sama
  - **On-demand (SaaS/cloud)** — software běží na serverech dodavatele, firma platí za užívání (předplatné), příklad: ERPNext

### CRM — Customer Relationship Management
Systém pro správu a analýzu vztahů se zákazníky za účelem **zvýšení prodejů a zlepšení zákaznické péče**.

- správa kontaktů, automatizace prodeje, marketingové kampaně, zákaznická podpora, analytika
- CRM vidí vše o každém zákazníkovi — kdy nakoupil, co kupuje, zda si stěžoval
- umožňuje cílený marketing ("Martin kupuje kávu → nabídni mu kávovár") a udržení zákazníků ("Martin 3 měsíce nenakoupil → pošli slevu")
- zlepšení produktu je vedlejší efekt — pokud 500 zákazníků hlásí stejný problém, produkt se upraví

### Veřejné IS
- **Knihovny** — NKP, katalogy (vyhledání děl)
- **Veřejná správa** — Katastr, Justice, Monitor MF (hospodaření obcí, veřejné zakázky)
- **Statistiky** — Český statistický úřad (platy, cestovní ruch)
- **Spotřebitelské** — Hlídač shopů (vývoj cen, odhalení falešných slev)

---

## Zdroje informací

- **Veřejné databáze** — ČSÚ, otevřená data státu, Katastr
- **Vlastní měření / pozorování** — senzory, průzkumy, experimenty
- **Informační kanály** — zpravodajství, odborné publikace
- **Informační systémy** — ERP, CRM, databáze organizace
- **Zdroje v IS:** databáze, souborové systémy, API, senzory
- **Validita:** kontrola aktuálnosti, přesnosti, konzistence dat
- **Zabezpečení:** šifrování, přístupová práva, zálohování

---

## Modelování IS — příklad e-shop

IS není jen software — zahrnuje všechny komponenty dohromady:

| Vrstva | Příklad (e-shop) |
|---|---|
| Frontend | uživatelské rozhraní, produktový katalog |
| Backend | administrace, logika objednávek |
| Databáze | zákazníci, produkty, objednávky |
| Procesy | příjem objednávky → sklad → platba → doprava |
| Hardware | servery, síť, zálohy, mobilní zařízení |
| Lidé | zákaznická podpora, správci systému |
