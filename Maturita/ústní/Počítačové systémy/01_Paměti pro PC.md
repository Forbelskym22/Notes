## Paměti pro dočasné ukládání dat

### Princip a rozdělení

Operační paměť uchovává data pouze po dobu, kdy je počítač zapnutý – po vypnutí se obsah ztrácí (**volatilní paměť**). Slouží jako pracovní prostor procesoru.

### ROM – Read Only Memory

- Pouze pro čtení, obsah je zachován i po vypnutí napájení
- Používá se pro firmware (BIOS/UEFI)
- Varianty:
  - **PROM** – programovatelná jednorázově
  - **EPROM** – mazatelná UV světlem
  - **EEPROM** – elektricky mazatelná (základ flash pamětí)

### RAM – Random Access Memory

Paměť s náhodným přístupem – libovolná buňka je přístupná přímo (bez procházení předchozích).

#### SRAM – Static RAM

- Uchovává bit pomocí klopného obvodu (6 tranzistorů na buňku)
- **Výhody:** velmi rychlá, nevyžaduje refresh
- **Nevýhody:** drahá, velká spotřeba plochy čipu
- **Použití:** cache procesoru (L1, L2, L3)

#### DRAM – Dynamic RAM

- Uchovává bit jako náboj v kondenzátoru (1 tranzistor + kondenzátor na buňku)
- **Výhody:** hustší, levnější
- **Nevýhody:** pomalejší, vyžaduje pravidelný **refresh** (kondenzátor se vybíjí)
- **Použití:** hlavní operační paměť, VRAM

### Typy operační paměti pro PC

| Typ       | Frekvence      | Napětí | Poznámka                                               |
| --------- | -------------- | ------ | ------------------------------------------------------ |
| **SDRAM** | 66–133 MT/s    | 3,3 V  | Synchronní DRAM, synchronizována s hodinami sběrnice   |
| **DDR**   | 200–400 MT/s   | 2,5 V  | Double Data Rate – přenos na obě hrany hodinového sig. |
| **DDR2**  | 400–1066 MT/s  | 1,8 V  | Vyšší frekvence, nižší napětí oproti DDR               |
| **DDR3**  | 800–2133 MT/s  | 1,5 V  | Typická latence CL9–CL11                               |
| **DDR4**  | 2133–4800 MT/s | 1,2 V  | Typická latence CL14–CL18                              |
| **DDR5**  | 4800+ MT/s     | 1,1 V  | On-die ECC, vyšší propustnost, nový slot ~CL30-60      |

> **Frekvence vs. přenosová rychlost:** frekvence v tabulce je hodinová frekvence (clock). Díky DDR (přenos na obě hrany) je výsledná přenosová rychlost 2× vyšší – např. DDR4 s clockem 1600 MHz = DDR4-3200 = 3200 MT/s (megatransferů za sekundu).

> **ECC (Error-Correcting Code)** vlastnost – modul s ECC dokáže detekovat a opravit jednobitové chyby. Podporu musí mít i procesor a základní deska (typicky servery a workstations).

### Parametry operační paměti

- **Kapacita** – GB (typicky 8–64 GB pro stolní PC)
- **Frekvence** – MHz (např. DDR4-3200 = 3200 MT/s)
- **Latence (CAS Latency)** – počet taktů čekání na data (CL16, CL18…) – nižší = lepší
- **Napětí** – ovlivňuje spotřebu a přetaktování
- **Fyzické provedení:**
  - **DIMM** – pro stolní PC (168/184/240/288 pinů dle generace)
  - **SO-DIMM** – notebooky
  - **LPDDR** – notebooky a mobilní zařízení (nižší spotřeba, pájen na desce)
- **Počet kanálů** – dual channel, quad channel zvyšují propustnost; závisí na podpoře CPU a základní desky, ne na samotném modulu

---

## Paměti pro trvalé ukládání dat

Uchování dat i po vypnutí napájení (**nevolatilní paměť**).

### HDD – Hard Disk Drive

**Princip:** magnetický záznam na rotující plotny (disky) čtený/zapisovaný magnetickými hlavami.

**Stavba:**
- Plotny (platters) – hliník/sklo potažený magnetickou vrstvou; typicky 2–6 ploten, každá má dvě strany
- Ramena s hlavami (read/write heads) – jedna hlava na každou stranu plotny, všechna ramena pohybuje jeden aktuátor synchronně
- Vyrovnávací paměť (cache) – přímo na desce disku, dočasně ukládá čtená/zapisovaná data

**Parametry:**
- **Kapacita** – TB (typicky 1–20 TB)
- **Rychlost otáčení** – 5400 nebo 7200 RPM (vyšší = rychlejší)
- **Velikost vyrovnávací paměti (cache)** – MB
- **Průměrná přístupová doba** – ms (5–10 ms)
- **Rozhraní** – SATA (6 Gb/s), SAS (pro servery)
- **Faktor formy** – 3,5" (stolní), 2,5" (notebooky)

**Výhody:** velká kapacita, nízká cena za GB  
**Nevýhody:** pomalý, citlivý na otřesy, mechanické opotřebení

### SSD – Solid State Drive

**Princip:** flash paměť (NAND) – elektricky mazatelné paměťové buňky bez pohyblivých částí.

**Typy NAND buněk:**
- **SLC** (Single Level Cell) – 1 bit/buňku – nejrychlejší, nejdražší, nejtrvanlivější
- **MLC** (Multi Level Cell) – 2 bity/buňku
- **TLC** (Triple Level Cell) – 3 bity/buňku – levné, pomalejší, méně zápisů
- **QLC** (Quad Level Cell) – 4 bity/buňku – největší kapacita, nejkratší životnost

**Fyzické provedení:**
- **2,5" SATA SSD** – náhrada za HDD, rozhraní SATA (max ~550 MB/s)
- **M.2 SATA** – menší formát, stále SATA protokol
- **M.2 NVMe (PCIe)** – využívá PCIe sběrnici, rychlosti 3500–7000+ MB/s
- **U.2** – serverové SSD

**Parametry:**
- **Kapacita** – typicky 250 GB – 4 TB
- **Sekvenční čtení/zápis** – MB/s
- **Náhodné čtení/zápis (IOPS)** – operace za sekundu
- **TBW (Terabytes Written)** – celkový objem dat, který lze zapsat (životnost)
- **MTBF** – střední doba mezi poruchami
- **Rozhraní** – SATA, PCIe 3.0/4.0/5.0, NVMe protokol

**Výhody:** rychlý, tichý, odolný, nízká spotřeba  
**Nevýhody:** vyšší cena za GB, omezený počet zápisů

### FDD – Floppy Disk Drive

**Princip:** magnetický záznam na flexibilní magnetický disk.

- Formáty: 8", 5,25", 3,5"
- Kapacita 3,5" HD: **1,44 MB**
- Rozhraní: FDC (Floppy Disk Controller), později USB
- Dnes obsoletní, historický nosič

### Optická média

**Princip:** čtení/zápis laserovým paprskem (odraz od pit/land struktur nebo změna reflexivity barviva).

| Typ | Kapacita | Laser |
|-----|----------|-------|
| **CD** | 700 MB | Infračervený (780 nm) |
| **DVD** | 4,7 GB (SL) / 8,5 GB (DL) | Červený (650 nm) |
| **Blu-ray (BD)** | 25 GB (SL) / 50 GB (DL) / 100 GB (BDXL) | Modrý (405 nm) |

**Varianty zápisu:**
- **ROM** – lisováno výrobcem, pouze pro čtení
- **-R / +R** – zapisovatelné jednorázově
- **-RW / +RW / RAM** – přepisovatelné

**Parametry:** kapacita, rychlost čtení/zápisu (1× = 150 KB/s pro CD, 1× = 1,385 MB/s pro DVD)

### Ostatní paměťová média

**Flash paměti (USB, SD karty):**
- Stejný princip jako SSD (NAND flash)
- **USB flash disk** – rozhraní USB 2.0 / 3.0 / 3.1
- **SD karta** – formáty SD / SDHC / SDXC, rychlostní třídy (Class 10, UHS-I/II/III, V30/V60/V90)
- **Využití:** fotoaparáty, telefony, přenosné úložiště

**Magnetická páska (LTO – Linear Tape-Open):**
- Sekvenční přístup, velmi pomalé vyhledávání
- Obrovská kapacita (LTO-9: 18 TB nativně)
- Využití: archivace a zálohy v datových centrech

---

## Srovnání přístupových dob

| Typ paměti | Přístupová doba |
|------------|-----------------|
| Registr CPU | < 1 ns |
| Cache L1 | ~1 ns |
| Cache L2/L3 | 3–30 ns |
| RAM (DRAM) | ~50–100 ns |
| SSD (NVMe) | ~0,1 ms |
| SSD (SATA) | ~0,1 ms |
| HDD | 5–10 ms |
| Optická média | 100–200 ms |
