
## Historie a verze

Vývoj Windows probíhal dvěma větvemi, které se spojily v XP:

**Spotřebitelská větev:**

| Verze | Rok |
| ----- | --- |
| MS-DOS | 1981 |
| Windows 1.0 | 1985 |
| Windows 3.11 | 1992 |
| Windows 95 | 1995 |
| Windows 98 | 1998 |
| Windows Me | 2000 |

**Serverová / firemní větev (NT):**

| Verze | Rok |
| ----- | --- |
| Windows NT 3.1 | 1993 |
| Windows NT 4.0 | 1996 |
| Windows 2000 | 2000 |

**→ Windows XP (2001) – větve se spojily ←**

| Verze | Rok |
| ----- | --- |
| Windows Vista | 2007 |
| Windows 7 | 2009 |
| Windows 8 / 8.1 | 2012 |
| Windows 10 | 2015 |
| Windows 11 | 2021 |

- **MS-DOS** – textový OS pro IBM PC; základ pro rané Windows
- **Windows 3.11** – první rozšířené grafické prostředí, ještě nad DOS
- **NT větev** – stabilnější, 32bit, oddělená paměť procesů; pro servery a firmy
- **Windows XP** – spojení obou větví; stabilní, dlouhověká
- **Vista** – nepopulární, pomalý, náročný na HW
- **Windows 7** – velmi oblíbený nástupce Visty
- **Windows 8/8.1** – dotykové rozhraní, nepopulární na desktopu
- **Windows 10** – návrat Start menu, free upgrade z Win 7/8
- **Windows 11** – nový design, vyžaduje TPM 2.0 a UEFI

---

## Instalace

### Požadavky (Windows 11)
- 64bit CPU, 1 GHz, 2 jádra
- 4 GB RAM, 64 GB úložiště
- TPM 2.0, Secure Boot
- DirectX 12, UEFI
> nerozběhnete
### Průběh instalace

**1. Boot z média** – bootování z USB / DVD nebo **PXE** (síťová instalace přes DHCP + TFTP); změna boot pořadí v UEFI/BIOS

**2. Windows PE (WinPE)** – minimální prostředí; načte `setup.exe`, výběr jazyka, edice, přijetí EULA, rozdělení disku (GPT/MBR), kopírování souborů (`install.wim`)

**3. Specializace** – instalace ovladačů, přiřazení unikátního SID, přizpůsobení HW; několik automatických restartů

**4. OOBE** (Out-of-Box Experience) – region, časové pásmo, připojení k síti, vytvoření účtu (Microsoft nebo lokální), PIN, soukromí

### Typy instalace
- **Clean install** – čistá instalace, smaže vše
- **Upgrade** – zachová soubory a aplikace
- **In-place upgrade** – přechod na vyšší verzi (Win 10 → Win 11)

---

## Souborové systémy

| FS | Použití | Poznámka |
| -- | ------- | -------- |
| **NTFS** | Windows (výchozí) | Žurnálování, oprávnění, šifrování (EFS), velké soubory |
| **FAT32** | USB, starší zařízení | Max. soubor 4 GB, kompatibilní s vším |
| **exFAT** | USB flash, SD karty | Bez limitu velikosti souboru, bez žurnálování |
| **ReFS** | Windows Server | Odolnost vůči chybám, velké objemy dat |

### NTFS – klíčové vlastnosti
- **Oprávnění** – čtení, zápis, spouštění na úrovni souborů a složek
- **Žurnálování** – záznam změn; rychlá obnova po pádu systému
- **EFS** – Encrypting File System; šifrování souborů klíčem uživatele
- **Komprese** – transparentní komprese souborů
- **Stínové kopie (VSS)** – zálohy verzí souborů

---

## Licencování

### Edice Windows (klientské)
| Edice | Určení |
| ----- | ------ |
| **Home** | Domácnosti; bez doménového připojení, bez BitLockeru |
| **Pro** | Firmy, pokročilí uživatelé; BitLocker, Remote Desktop, doména |
| **Enterprise** | Velké firmy; rozšířené bezpečnostní funkce, hromadné nasazení |
| **Education** | Školy |

### Typy licencí
- **Retail** – vázána na uživatele, přenositelná na jiný PC
- **OEM** – vázána na konkrétní HW (MB), nelze přenést
- **Volume License (MAK/KMS)** – hromadné nasazení ve firmách; KMS server aktivuje zařízení v síti
- **Subscription (Microsoft 365)** – předplatné, zahrnuje Office + Windows Enterprise

---

## Správa systému

### Správce úloh (Task Manager)
- Přehled procesů, výkonu CPU/RAM/disku/sítě
- Ukončení zamrzlých aplikací
- Spouštění při startu (záložka Startup)

### Správce zařízení (Device Manager)
- Přehled HW a ovladačů
- Aktualizace / odebrání ovladačů
- Žluté vykřičníky = problém s ovladačem

### Nástroje správy
```
msconfig      – konfigurace spouštění, služby
regedit       – editor registru
gpedit.msc    – editor skupinových zásad (Group Policy) – pouze Pro+
eventvwr.msc  – prohlížeč událostí (logy systému)
services.msc  – správa služeb
diskmgmt.msc  – správa disků
compmgmt.msc  – správa počítače (vše v jednom)
```

### PowerShell a CMD
- **CMD** – starší příkazový řádek
- **PowerShell** – moderní, skriptovatelný, objektový shell

```powershell
Get-Process              # výpis procesů
Get-Service              # výpis služeb
ipconfig /all            # síťové informace
netstat -ano             # otevřené porty
sfc /scannow             # kontrola integrity systémových souborů
```

### Windows Update
- Automatické aktualizace zabezpečení a funkcí
- **Windows Server Update Services (WSUS)** – centrální správa aktualizací ve firmě

### Uživatelé a skupiny
- **Místní účty** – uloženy na PC
- **Microsoft účet** – synchronizace nastavení přes cloud
- **Skupiny** – Administrators, Users, Guests
- `lusrmgr.msc` – správa místních uživatelů a skupin
