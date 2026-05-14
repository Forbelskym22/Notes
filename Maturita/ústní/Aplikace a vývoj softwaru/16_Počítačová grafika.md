## Typy počítačové grafiky

### Rastrová (bitmapová) grafika
- obraz je tvořen **mřížkou pixelů**, každý pixel má přiřazenou barvu
- kvalita závisí na rozlišení — při zvětšení dochází k **pixelizaci**
- vhodná pro fotografie a složité obrazy s přechody barev
- příklady formátů: JPEG, PNG, BMP, GIF, TIFF, WebP

### Vektorová grafika
- obraz je popsán **matematickými křivkami** (Bézierovy křivky, přímky, tvary)
- **libovolně škálovatelná bez ztráty kvality** — ideální pro loga, ikony, ilustrace
- menší velikost souboru u jednoduchých grafik
- příklady formátů: SVG, AI, EPS, CDR

### 3D grafika
- pracuje s objekty v trojrozměrném prostoru
- využívá **modelování, texturování, osvětlení a rendering**
- využití: filmy, hry, architektura, produktová vizualizace

---

## Využití počítačové grafiky

| Oblast          | Příklad                           |
| --------------- | --------------------------------- |
| Web a UI        | bannery, ikony, rozhraní aplikací |
| Tisk            | plakáty, letáky, knihy            |
| Film a TV       | VFX efekty, animace, titulky      |
| Hry             | textury, modely postav, prostředí |
| Věda a technika | vizualizace dat, CAD              |
| Marketing       | reklama, infografiky              |

---

## DPI a rozlišení

- **DPI** (Dots Per Inch) — počet tiskových bodů na palec; relevantní pro **tisk**
- **PPI** (Pixels Per Inch) — počet pixelů na palec; relevantní pro **obrazovky**
- v praxi se oba pojmy často zaměňují

### Typické hodnoty:
- **72–96 DPI** — web a obrazovky (dostačující, nižší nároky na velikost souboru)
- **150 DPI** — tisk nižší kvality (noviny)
- **300 DPI** — standardní kvalitní tisk (letáky, knihy)
- **600+ DPI** — velmi jemný tisk (vizitky, fotografické tisky)

### Rozlišení obrazu:
- udává se v pixelech: např. 1920 × 1080 (Full HD), 3840 × 2160 (4K)
- čím vyšší rozlišení, tím větší soubor a vyšší kvalita

---

## Software pro tvorbu grafiky

### Rastrová grafika
- **Adobe Photoshop** — profesionální standard, úpravy fotografií, retuš
- **GIMP** — open-source alternativa k Photoshopu
- **Malování** - velmi důležité!

### Vektorová grafika
- **Adobe Illustrator** — profesionální standard pro vektory
- **Inkscape** — open-source vektorový editor
- **CorelDRAW** — populární zejména v tiskařském průmyslu
- **Affinity Designer** — moderní alternativa

### 3D grafika
- **Blender** — open-source, velmi výkonný, modelování + animace + rendering
- **Fusion** —
- **Freecad** — 

---

## Grafické formáty

### Rastrové formáty

| Formát | Vlastnosti | Využití |
|---|---|---|
| **JPEG** | ztrátová komprese, malá velikost, nepodporuje průhlednost | fotografie, web |
| **PNG** | bezztrátová komprese, podporuje průhlednost (alpha kanál) | web, grafika s průhledností |
| **GIF** | max. 256 barev, podporuje animace a průhlednost | jednoduché animace |
| **BMP** — | nekomprimovaný, velké soubory | Windows, starší systémy |
| **TIFF** | bezztrátový, vysoká kvalita, velké soubory | profesionální tisk, archivace |
| **WebP** | moderní formát od Google, lepší komprese než JPEG/PNG | web |
| **RAW** | surová data ze senzoru fotoaparátu, nejvyšší kvalita | fotografové |

### Vektorové formáty

| Formát  | Vlastnosti                                 | Využití               |
| ------- | ------------------------------------------ | --------------------- |
| **SVG** | XML-based, škálovatelný, podporuje animace | web, ikony            |
| **AI**  | nativní formát Adobe Illustrator           | profesionální vektory |
| **EPS** | přenosný vektorový formát                  | tiskárny              |
| **PDF** | může obsahovat vektory i rastry            | dokumenty, tisk       |

---

## Barevné modely

### RGB (Red, Green, Blue)
- **aditivní míchání** — světlo se přidává, bílá = všechny barvy, černá = žádné světlo
- každá složka 0–255 (8 bit) → 16,7 milionu barev
- využití: **obrazovky, monitory, web, fotoaparáty**
- příklad: čistě červená = rgb(255, 0, 0)

**Míchání RGB:**
```
R + G = Žlutá
R + B = Magenta
G + B = Azurová (Cyan)
R + G + B = Bílá
```

### CMYK (Cyan, Magenta, Yellow, Key/Black)
- **subtraktivní míchání** — pigmenty pohlcují světlo
- hodnoty v procentech (0–100 %)
- K (černá) přidána kvůli úspoře inkoustu a ostřejšímu textu
- využití: **tisk** — ofset, laserové tiskárny
- grafika určená pro tisk se vždy převádí do CMYK

**Míchání CMYK:**
```
C + M = Modrá
C + Y = Zelená
M + Y = Červená
C + M + Y = Černá (teoreticky; proto se přidává K)
```

### HSV / HSL (Hue, Saturation, Value/Lightness)
- intuitivnější model pro člověka
- **Hue** = odstín (0–360°, kruh barev)
- **Saturation** = sytost (0 % = šedá, 100 % = plná barva)
- **Value/Lightness** = jas/světlost
- využití: výběr barev v grafických editorech (color picker)
