# Audio

### Základní pojmy
- **vzorkování (sampling)** — zvuk je analogový signál; digitalizace probíhá jeho měřením v pravidelných intervalech
- **vzorkovací frekvence (sample rate)** — kolikrát za sekundu se zvuk změří
  - 44 100 Hz (44,1 kHz) — standard pro hudbu (CD)
  - 48 000 Hz — standard pro video a broadcast
  - 96 000 Hz — studiová kvalita
- **bitová hloubka (bit depth)** — přesnost každého vzorku
  - 16 bit — CD kvalita (65 536 úrovní)
  - 24 bit — studiová kvalita
- **datový tok (bitrate)** — množství dat za sekundu (kbps / Mbps); vyšší = lepší kvalita, větší soubor

### Audio formáty

| Formát         | Typ         | Vlastnosti                                | Využití                   |
| -------------- | ----------- | ----------------------------------------- | ------------------------- |
| **WAV**        | bezztrátový | nekomprimovaný, velké soubory             | studiová produkce         |
| **FLAC**       | bezztrátový | komprimovaný bez ztráty, menší než WAV    | archivace, audiofili      |
| **MP3**        | ztrátový    | velmi malé soubory, drobná ztráta kvality | hudba pro přehrávání      |
| **AAC**        | ztrátový    | lepší kvalita než MP3 při stejném bitratu | Apple, YouTube, streaming |
| **OGG Vorbis** | ztrátový    | open-source alternativa k MP3             | hry, web                  |
| **AIFF**       | bezztrátový | Apple ekvivalent WAV                      | macOS produkce            |


### Kodek vs. kontejner (audio)
- **kodek** — algoritmus komprese/dekomprese zvuku (MP3, AAC, FLAC)
- **kontejner** — soubor, který drží zakódovaná data (např. .mp4 může obsahovat AAC zvuk)

---

## Video

### Základní pojmy
- **snímková frekvence (frame rate / FPS)** — počet snímků za sekundu
  - 24 fps — film (kinematografický pocit)
  - 25/30 fps — televize (PAL/NTSC)
  - 60 fps — plynulé video, sport, hry
  - 120+ fps — slow motion, VR
- **rozlišení obrazu** — počet pixelů

| Označení | Rozlišení | Využití |
|---|---|---|
| SD | 720 × 480 / 576 | starší televize |
| HD (720p) | 1280 × 720 | web, starší obsah |
| Full HD (1080p) | 1920 × 1080 | standard dnes |
| 4K (UHD) | 3840 × 2160 | moderní streaming, kino |
| 8K | 7680 × 4320 | špičkové produkce |

- **poměr stran (aspect ratio)**: 16:9 standard, 4:3 starší TV, 21:9 kino
- **bitrate videa** — množství dat za sekundu; ovlivňuje kvalitu a velikost souboru

### Kodeky

| Kodek | Vlastnosti |
|---|---|
| **H.264 (AVC)** | nejrozšířenější, dobrá kvalita/velikost, HW akcelerace |
| **H.265 (HEVC)** | 2× lepší komprese než H.264, vyšší nároky na HW |
| **AV1** | open-source, velmi efektivní, pomalé kódování |
| **VP9** | Google, používaný na YouTube |
| **ProRes** | Apple, minimální komprese pro střih |

### Kontejnery

| Kontejner | Přípona | Vlastnosti |
|---|---|---|
| MPEG-4 | .mp4 | H.264/H.265 + AAC — univerzální standard |
| Matroska | .mkv | libovolné kodeky, titulky, kapitoly |
| AVI | .avi | starší, Windows |
| MOV | .mov | Apple QuickTime |
| WebM | .webm | VP9/AV1 — pro web |

### Enkodér a dekodér
- **enkodér** — převádí raw video do komprimovaného formátu (při exportu)
- **dekodér** — dekomprimuje video pro přehrávání
- **transcodování** — převod z jednoho kodeku/formátu do jiného
- **HW enkodér** (GPU — NVENC, QuickSync) = rychlý; **SW enkodér** (CPU — x264) = lepší kvalita

---

## Distribuce hudby a videa

### Distribuce hudby
- **fyzická média** — CD (44,1 kHz / 16 bit), vinyl (analog)
- **digitální stahování** — MP3/AAC soubory (iTunes Store, Bandcamp)
- **streaming** — Spotify (320 kbps OGG Premium), Apple Music (Lossless AAC), YouTube Music
- **DRM** (Digital Rights Management) — ochrana proti kopírování

### Distribuce videa
- **fyzická média** — DVD (MPEG-2), Blu-ray (H.264/H.265), 4K UHD Blu-ray
- **VOD streaming** — Netflix, YouTube, Disney+
  - **adaptivní bitrate (ABR)** — kvalita se přizpůsobuje rychlosti připojení
  - protokoly: **HLS** (Apple), **MPEG-DASH**
- **živé vysílání (livestream)** — OBS Studio → RTMP → Twitch/YouTube
