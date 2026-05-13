## Napájecí zdroje PC

### Funkce

Napájecí zdroj (PSU – Power Supply Unit) převádí střídavé napětí ze sítě (230 V / 50 Hz v Evropě) na stejnosměrné napětí používané komponentami PC.

### Výstupní napětí

| Napětí     | Použití                               |
| ---------- | ------------------------------------- |
| **+12 V**  | CPU, GPU, motory HDD/ventilátory      |
| **+5 V**   | USB, starší periferie, logické obvody |
| **+3,3 V** | RAM, PCIe zařízení, logické obvody    |


### Parametry

- **Výkon (wattáž)** – W; celkový výkon, který zdroj dodá (typicky 450–1000 W pro domácí PC)
- **Účinnost** – % energie ze sítě přeměněné na použitelný výkon (zbytek = teplo)
  - **80 PLUS certifikace:** Bronze (82 %), Silver (85 %), Gold (87 %), Platinum (90 %), Titanium (92 %+)
- **Faktor formy** – ATX (standardní), SFX (malé skříně), TFX
- **Modulárnost:**
  - **Nemodulární** – všechny kabely pevně připojeny
  - **Semi-modulární** – hlavní kabely pevné, ostatní odnímatelné
  - **Plně modulární** – všechny kabely odnímatelné (lepší správa kabelů)
- **PFC (Power Factor Correction)** – aktivní PFC = lepší využití příkonu ze sítě
- **Ochranné obvody** – OVP (přepětí), OCP (přeproud), SCP (zkrat), OTP (přehřátí)
- **Konektory** – 24pin ATX (základní deska), 8pin EPS (CPU), PCIe 6+2pin (GPU), SATA, Molex
- **Chlazení** – pasivní (bez ventilátoru, tichý, nižší výkon) nebo aktivní (ventilátor)
- **Výrobce** – Be Quiet!, Corsair, Seasonic, EVGA
- **Cena** – odvíjí se od výkonu, účinnosti a modulárnosti

---

## Grafické karty

### Funkce

Grafická karta (GPU – Graphics Processing Unit) zpracovává grafická data a zobrazuje obraz na monitoru. Obsahuje vlastní procesor (GPU čip), VRAM a výstupní porty.

### Typy

- **Diskrétní GPU** – samostatná karta v PCIe slotech (výkonné, vlastní chlazení)
- **Integrovaná GPU (iGPU)** – součást CPU čipu; sdílí systémovou RAM; slabší výkon, nízká spotřeba
- **Externí GPU (eGPU)** – přes Thunderbolt; pro notebooky

### Parametry GPU

- **Výrobci** – NVIDIA (GeForce RTX/GTX), AMD (Radeon RX), Intel (Arc)
- **Frekvence čipu** – MHz/GHz; základní a boost frekvence
- **Cena**
- **VRAM** – dedikovaná video paměť (GDDR6/GDDR6X nebo HBM); typicky 8–24 GB
- **Sběrnice VRAM** – šířka paměťové sběrnice v bitech (128, 192, 256, 384 bit) – ovlivňuje propustnost
- **TDP** – W; spotřeba a tepelný výkon
- **Výstupní porty** – DisplayPort, HDMI, DVI (starší), VGA (obsoletní)
- **Rozhraní** – PCIe x16

### Principy zpracování obrazu

- GPU zpracovává obraz paralelně pomocí tisíců shader jader (CUDA cores u NVIDIA, Stream Processors u AMD)
- **Rasterizace** – převod 3D scény na 2D pixely (tradiční metoda)
- **Ray tracing** – simulace fyzikálního šíření světla (realistické odrazy/stíny, výpočetně náročné)

---

## Monitory

### Typy panelů

**LCD** (Liquid Crystal Display) – tekuté krystaly modulují světlo z podsvícení (LED). Podtypy se liší orientací krystalů:

- **TN** (Twisted Nematic) – krystaly se otáčejí o 90°; nejjednodušší a nejlevnější technologie
  - rychlá odezva (1 ms), vysoké obnovovací frekvence
  - špatné pozorovací úhly, nepřesné barvy
  - použití: gaming monitory nižší třídy

- **IPS** (In-Plane Switching) – krystaly se pohybují ve stejné rovině; lepší kontrola nad barvami
  - přesné barvy, dobré pozorovací úhly (178°)
  - pomalejší odezva než TN, vyšší cena, možný IPS glow (světlý nádech v rozích)
  - použití: grafici, profesionální práce, běžné použití

- **VA** (Vertical Alignment) – krystaly kolmo na panel; vysoký nativní kontrast
  - nejlepší kontrast ze všech LCD (až 3000:1), dobré barvy
  - ghosting při rychlém pohybu, horší pozorovací úhly než IPS
  - použití: sledování filmů, kompromis mezi TN a IPS

**OLED** (Organic LED) – každý pixel svítí samostatně, žádné podsvícení
- dokonalý kontrast (skutečná černá = pixel vypnutý), rychlá odezva
- riziko burn-in (vypálení statického obrazu), vyšší cena
- použití: high-end monitory, TV, notebooky

### Parametry monitoru

- **Velikost** – palce (diagonála); typicky 24–32" pro stolní PC
- **Rozlišení** – FHD (1920×1080), QHD (2560×1440), 4K UHD (3840×2160)
- **Typ panelu** – TN, IPS, VA, OLED
- **Obnovovací frekvence** – Hz; 60 Hz (standard), 144 Hz, 240 Hz (gaming)
- **Doba odezvy** – ms; nižší = méně ghostingu
- **Jas** – cd/m² (nity); typicky 250–400 cd/m²
- **Kontrast** – poměr nejsvětlejšího a nejtmavšího bodu (např. 1000:1)
- **Barevná hloubka** – 8 bit (16,7 mil. barev), 10 bit (1,07 mld. barev); vyšší = plynulejší přechody
- **Porty** – HDMI, DisplayPort, USB-C, VGA (starší)
- **Adaptivní sync** – G-Sync (NVIDIA), FreeSync (AMD) – eliminace trhání obrazu
- **VESA mount** – standardizovaný otvorový vzor pro uchycení na rameno/stěnu (např. 75×75 mm, 100×100 mm)
- **Ergonomie** – výškové nastavení, náklon, otočení (pivot), horizontální otočení
- **Hmotnost** – kg; důležité při montáži na rameno
- **Spotřeba** – W
- **Cena**

---

## Tiskárny

### Typy tiskáren a principy

**Inkoustová tiskárna:**
- Trysky vystřikují mikrokapičky inkoustu na papír
- Typy: termální (zahřátí inkoustu = kapička) nebo piezoelektrické (Epson)
- Vhodná pro fotografie a barevný tisk
- Nevýhoda: pomalá, inkoust zasychá při nepoužívání

**Laserová tiskárna:**
- Laserový paprsek nabíjí fotoválec → toner se přichytí na nabité oblasti → přenese se na papír → fixuje se teplem
- Rychlá, levný tisk na stránku, vhodná pro kancelářské použití
- Nevýhoda: vyšší pořizovací cena, horší fotografie

**Jehličková tiskárna (dot matrix):**
- Jehličky přes barvicí pásku vytváří body na papíru
- Hlučná, pomalá, ale umí tisknout přes průklepový papír
- Využití: pokladny, průmysl
- Výhody: zvládne tisknout na víc listů najednou


**Termální tiskárna:**
- Teplo aktivuje speciální termální papír (tmavne v místě zahřátí) – žádný inkoust ani toner
- Rychlá, tichá, jednoduchá mechanika
- Nevýhoda: výtisk časem bledne, nutný speciální papír
- Využití: účtenky, štítky, pokladny

### Parametry tiskáren

- **Rozlišení** – DPI (dots per inch); vyšší = ostřejší tisk
- **Rychlost tisku** – stran za minutu (ppm)
- **Konektivita** – USB, Wi-Fi, Ethernet, Bluetooth
- **Formát papíru** – A4, A3
- **Duplexní tisk** – automatický oboustranný tisk
- **Multifunkčnost** – integrovaný skener/kopírka (MFP – Multi-Function Printer)
- **Výrobce** – HP, Canon, Epson, Brother
- **Cena**
