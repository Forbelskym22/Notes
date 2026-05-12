## Zálohování (Backup)

### Co je záloha
- **záloha** = kopie dat uložená na odděleném místě, slouží k obnově při ztrátě originálních dat
- důvody ztráty dat: selhání HW, ransomware, lidská chyba, požár/krádež, výpadek proudu

### Typy záloh

| Typ | Popis | Výhody | Nevýhody |
|---|---|---|---|
| **Plná (Full)** | kopíruje vše | jednoduchá obnova | pomalá, velká |
| **Přírůstková (Incremental)** | jen změny od poslední zálohy (jakékoli) | rychlá, malá | obnova vyžaduje všechny přírůstky |
| **Rozdílová (Differential)** | změny od poslední **plné** zálohy | rychlejší obnova než incremental | větší než incremental |
| **Zrcadlová (Mirror)** | přesná kopie, stará data se přepisují | vždy aktuální | žádná historie verzí |
| **Snapshot** | zachycení stavu systému v daném okamžiku | rychlé, časté | závislé na původním úložišti |

### Pravidlo 3-2-1
- **3** kopie dat celkem (originál + 2 zálohy)
- **2** různá úložná média (např. HDD + cloud)
- **1** záloha mimo místo (off-site) — ochrana před fyzickou katastrofou

### RPO a RTO
- **RPO** (Recovery Point Objective) — maximální přijatelná ztráta dat (jak stará může záloha být)
- **RTO** (Recovery Time Objective) — maximální přijatelná doba obnovy systému

### Archivace vs. zálohování

| | Zálohování | Archivace |
|---|---|---|
| **Cíl** | obnova dat při ztrátě | dlouhodobé uchování neaktivních dat |
| **Data** | aktuálně používaná | data, která se už nemění |
| **Délka uchování** | dny až měsíce | roky až desítky let |
| **Příklad** | záloha pracovních souborů | účetní doklady, projektová dokumentace |

### Zálohovací software
- **Windows** — Historie souborů, Záloha a obnovení, Windows Server Backup
- **Linux** — rsync, Timeshift, Bacula
- **Komerční** — Veeam, Acronis True Image, Macrium Reflect

### Zabezpečení zálohy
- záloha by měla být šifrována, aby ji nemohl zneužít útočník
- nástroje: **BitLocker** (Windows), **VeraCrypt** (open-source)

### RAID
Technologie pro propojení více disků — **není náhrada zálohy**, ale zvyšuje dostupnost dat:

| Typ | Princip | Výhoda |
|---|---|---|
| **RAID 0** | data rozdělena mezi disky (striping) | rychlost, žádná redundance |
| **RAID 1** | zrcadlení — data na dvou discích současně | ochrana při selhání jednoho disku |
| **RAID 5** | data + parita rozloženy mezi 3+ disky | výkon i ochrana, výpadek 1 disku |

---

## Komprese dat

### Proč komprimovat
- zmenšení velikosti souboru → úspora místa a rychlejší přenos
- **kompresní poměr** = původní velikost / komprimovaná velikost
  - poměr 3:1 = soubor je 3× menší

### Bezztrátová komprese (Lossless)
- data lze **přesně obnovit** do původní podoby — žádná ztráta informací
- principy:
  - **Huffmanovo kódování** — časté znaky mají kratší kód
  - **RLE** (Run-Length Encoding) — opakující se bajty nahradí počtem: `AAAABBB → 4A3B`
  - **LZW** — vytváří slovník opakujících se vzorů; používá se v GIF, TIFF
- formáty: ZIP, 7z, PNG, FLAC, GZIP

### Ztrátová komprese (Lossy)
- část dat se **trvale zahodí** — nelze obnovit do originálu
- hodí se tam, kde ztrátu lidské smysly nevnímají
- čím vyšší komprese, tím viditelnější artefakty (rozmazání, šum)
- formáty: JPEG, MP3, AAC, H.264

### Archivační formáty

| Formát | Vlastnosti | Využití |
|---|---|---|
| **ZIP** | bezztrátový, Windows nativně, univerzální | obecné použití |
| **7z** | vyšší kompresní poměr, open-source | maximální komprese |
| **RAR** | proprietární, podpora více dílů, obnova při chybě | populární sdílení |
| **TAR** | jen archiv bez komprese (Unix); .tar.gz, .tar.bz2 | Linux |
| **GZ (gzip)** | komprese jednoho souboru | Linux standard |

---

## Programové vybavení PC (Software)

### Dělení softwaru

**Podle účelu:**
- **Systémový software** — OS, ovladače, firmware
- **Aplikační software** — kancelářské balíky, hry, prohlížeče
- **Vývojový software** — IDE, kompilátory, debuggery

**Podle způsobu distribuce:**
- **Komerční** — za úplatu, uzavřený kód (Microsoft Office, Adobe CC)
- **Freeware** — zdarma, uzavřený kód (VLC, 7-Zip)
- **Shareware** — zkušební verze zdarma, plná verze placená
- **Open-source** — volně dostupný zdrojový kód (Linux, Firefox, GIMP)
- **Public domain** — bez autorských práv, volně použitelné

### Příklady softwaru

| Kategorie         | Příklady                                        |
| ----------------- | ----------------------------------------------- |
| Kancelářský balík | Microsoft Office, LibreOffice, Google Workspace |
| Webový prohlížeč  | Brave, Chrome, Firefox, Edge, Safari            |
| Přehrávač médií   | VLC, foobar2000                                 |
| Antivirový SW     | Avast, Windows Defender, ESET, Kaspersky        |
| Archivační SW     | 7-Zip, WinRAR                                   |
| Zálohovací SW     | Macrium Reflect, Veeam, Acronis                 |
| Virtualizace      | VirtualBox, VMware, Hyper-V                     |

---

## Cloudové služby

### Co je cloud
- poskytování výpočetních zdrojů (úložiště, servery, SW) přes internet
- model **pay-as-you-go** — platíš jen za co využiješ

### Modely nasazení

| Model | Popis | Příklad |
|---|---|---|
| **Public cloud** | sdílená infrastruktura třetí strany | AWS, Azure, Google Cloud |
| **Private cloud** | dedikovaná infrastruktura jedné organizace | firemní datacentrum |
| **Hybrid cloud** | kombinace public + private | citlivá data on-premise, zbytek v cloudu |
| **Multi-cloud** | více cloudových poskytovatelů najednou | AWS + Azure |

### Modely služeb

| Model                           | Co poskytuje                     | Příklad                   |
| ------------------------------- | -------------------------------- | ------------------------- |
| **Infrastructure as a Service** | virtuální servery, síť, úložiště | AWS EC2, Azure VMs        |
| **Platform as a Service**       | prostředí pro vývoj a nasazení   | Heroku, Google App Engine |
| **Software as a Service**       | hotové aplikace přes prohlížeč   | Gmail, Office 365         |

### Cloudové úložiště
- **Google Drive** — 15 GB zdarma, integrace s Google Workspace
- **OneDrive** — integrace s Windows a Office, 5 GB zdarma
- **iCloud** — Apple ekosystém, 5 GB zdarma
- **Dropbox** — synchronizace a sdílení
- **Backblaze B2** — levné zálohovací úložiště

### Výhody a nevýhody cloudu

| Výhody | Nevýhody |
|---|---|
| škálovatelnost | závislost na internetu |
| dostupnost odkudkoli | bezpečnostní rizika (data u třetí strany) |
| žádná správa HW | opakující se náklady |
| automatické zálohy | možné problémy s GDPR |
