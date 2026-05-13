# Mikroprocesory a základní desky pro PC

## Mikroprocesory pro PC

### Co je mikroprocesor

Mikroprocesor (CPU – Central Processing Unit) je integrovaný obvod, který vykonává instrukce programu. Provádí aritmetické, logické a řídicí operace. Je hlavní výpočetní jednotkou počítače.

### Historie

| Rok  | Procesor        | Výrobce | Poznámka                                          |
| ---- | --------------- | ------- | ------------------------------------------------- |
| 1971 | Intel 4004      | Intel   | První komerční mikroprocesor, 4bitový, 740 kHz    |
| 1974 | Intel 8080      | Intel   | 8bitový, základ prvních osobních počítačů         |
| 1978 | Intel 8086      | Intel   | 16bitový, základ architektury x86                 |
| 1982 | Intel 80286     | Intel   | Chráněný režim, adresace 16 MB RAM                |
| 1985 | Intel 80386     | Intel   | 32bitový, multitasking                            |
| 1989 | Intel 80486     | Intel   | Integrovaná FPU a cache L1                        |
| 1993 | Intel Pentium   | Intel   | 64bitová datová sběrnice, superskalar              |
| 2003 | AMD Athlon 64   | AMD     | První 64bitový procesor pro spotřebitelský trh    |
| 2006 | Intel Core 2    | Intel   | Dual-core, architektura Core                      |
| 2017 | AMD Ryzen       | AMD     | Architektura Zen, návrat AMD do vysoké výkonnosti |
| 2019+| Intel Core i9 / AMD Ryzen 9 | — | Mnoho jader, vysoké frekvence, vlákna          |

### Architektura

- **x86 / x86-64** – dominantní architektura pro stolní PC a notebooky (CISC)
- **ARM** – mobilní zařízení, Apple Silicon (M1/M2), nízká spotřeba (RISC)
### Instrukční sady

- **RISC vs CISC:**
  - CISC (Complex Instruction Set) – složité instrukce, méně řádků kódu
  - RISC (Reduced Instruction Set) – jednoduché instrukce, vyšší výkon při správné optimalizaci

### Parametry procesoru

- **Počet jader (cores)** – každé jádro zpracovává instrukce nezávisle; více jader = lepší paralelní výkon
- **Počet vláken (threads)** – díky Hyper-Threading (Intel) / SMT (AMD) může jedno jádro zpracovávat 2 vlákna
- **Taktovací frekvence** – GHz; základní (base) a boost (turbo) frekvence
- **Cache** – L1 (nejrychlejší, nejmenší, per-core), L2 (per-core), L3 (sdílená mezi jádry)
- **TDP (Thermal Design Power)** – W; tepelný výkon, který musí chladit chladič
- **Výrobní proces (lithografie)** – nm (nanometry); menší = nižší spotřeba, vyšší hustota tranzistorů
- **Patice (socket)** – fyzické rozhraní pro připojení k základní desce; musí souhlasit (např. LGA1700, AM5)
- **Integrovaná grafika (iGPU)** – někteří procesory obsahují GPU přímo na čipu (Intel UHD, AMD Radeon)
- **Paměťový řadič** – integrovaný v CPU; podporované typy a frekvence RAM
- **Počet paměťových kanálů** – dual channel (běžné spotřebitelské CPU), quad channel (HEDT – Intel X-series, AMD Threadripper), 8-channel (serverové Xeon/EPYC); více kanálů = vyšší propustnost RAM
- **Kompatibilita s chipsetem** – CPU funguje pouze s podporovanými chipsety (např. Ryzen 7000 – X670/B650; Core 13. gen – Z790/B760); chipset ovlivňuje dostupné funkce (přetaktování, počet PCIe linek, USB portů)
- Výrobce – Intel, AMD, Apple, Qualcomm
- Hyper-Threading – jestli jádra procesoru podporují více vláken (typicky 2 vlákna na jádro)

### Hlavní výrobci CPU pro PC

- **Intel** – série Core i3/i5/i7/i9, patice LGA
- **AMD** – série Ryzen 3/5/7/9, patice AM4/AM5
- Apple – série M1-5, armové procesory

---

## Základní desky pro PC

### Co je základní deska

Základní deska (motherboard) je hlavní plošný spoj počítače. Propojuje všechny komponenty – CPU, RAM, úložiště, grafickou kartu, periferie.

### Chipset

Chipset je sada čipů na základní desce, která řídí komunikaci mezi CPU a ostatními komponentami.

- **Dříve:** Northbridge (rychlé komponenty – RAM, PCIe) + Southbridge (pomalejší – USB, SATA, audio)
- **Dnes:** Northbridge je integrován přímo v CPU
- Chipset určuje, které procesory a paměti deska podporuje, kolik PCIe linek, USB portů atd.

### Sběrnice

Sběrnice je cesta pro přenos dat mezi komponentami.

| Sběrnice      | Použití                                |
| ------------- | -------------------------------------- |
| **PCIe**      | Grafické karty, NVMe SSD, síťové karty |
| **DMI**       | Propojení CPU a chipsetu (Intel)       |
| **USB**       | Periferie (USB 2.0 / 3.x / 4.0)        |
| **SATA**      | HDD, SSD                               |
| **I²C/SMBus** | Senzory, správa napájení               |
|               |                                        |

**PCIe (PCI Express):**
- Sériová sběrnice s linkami (lanes): x1, x4, x8, x16
- Generace: PCIe 3.0 (~1 GB/s/linka), 4.0 (~2 GB/s/linka), 5.0 (~4 GB/s/linka)
- Grafické karty využívají slot x16

### Rozhraní na základní desce

**Interní:**
- **Socket CPU** – patice pro procesor (LGA = piny na desce, PGA = piny na CPU, BGA = pájen)
- **DIMM sloty** – pro RAM moduly (typicky 2 nebo 4 sloty)
- **PCIe sloty** – pro GPU, NVMe karty, rozšiřující karty
- **M.2 sloty** – pro NVMe/SATA SSD
- **SATA konektory** – pro HDD/SSD
- **24pin ATX** – hlavní napájení od zdroje
- **8pin EPS** – napájení CPU

**Externí (zadní panel):**
- USB (2.0 / 3.0 / 3.1 / Type-C)
- DisplayPort, HDMI (pokud CPU má iGPU)
- Audio jacky (3,5 mm)
- LAN (RJ-45)
- PS/2 (historicky)

### Faktor formy (form factor)

Určuje fyzické rozměry a rozmístění komponent:

| Form factor | Rozměry        | Použití                        |
| ----------- | -------------- | ------------------------------ |
| **ATX**     | 305 × 244 mm   | Standardní stolní PC           |
| **Micro-ATX** | 244 × 244 mm | Menší skříně, méně slotů       |
| **Mini-ITX** | 170 × 170 mm  | Kompaktní sestavy              |
| **E-ATX**   | 305 × 330 mm+  | Workstations, high-end sestavy |

### BIOS / UEFI

- **BIOS** (Basic Input/Output System) – starší firmware, 16bitový, omezení na disky do 2 TB (MBR)
- **UEFI** (Unified Extensible Firmware Interface) – nástupce BIOSu, grafické prostředí, podpora GPT (disky > 2 TB), Secure Boot, rychlejší boot
