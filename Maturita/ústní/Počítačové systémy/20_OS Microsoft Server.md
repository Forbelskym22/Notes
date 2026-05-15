
Windows Server je serverový operační systém od Microsoftu určený pro správu sítí, uživatelů, služeb a podnikové infrastruktury.

### Historie verzí

| Verze                             | Rok  |
| --------------------------------- | ---- |
| **Windows 2000 Server**           | 2000 |
| **Windows Server 2003**           | 2003 |
| **Windows Server 2008 / 2008 R2** | 2008 |
| **Windows Server 2012 / 2012 R2** | 2012 |
| **Windows Server 2016**           | 2016 |
| **Windows Server 2019**           | 2018 |
| **Windows Server 2022**           | 2021 |
| **Windows Server 2025**           | 2024 |

---

## Instalace a licencování

### Edice
| Edice | Určení |
| ----- | ------ |
| **Standard** | Malé a střední firmy; 2 virtuální stroje v licenci |
| **Datacenter** | Velké firmy, datacentra; neomezené VM |
| **Essentials** | Až 25 uživatelů, 50 zařízení; zjednodušená správa |

### Typy instalace
- **Server with Desktop Experience** – plné GUI (jako Windows 10)
- **Server Core** – pouze CLI, bez GUI; menší plocha útoku, nižší nároky na HW
- **Nano Server** – minimální, pouze pro kontejnery a cloud

### Licencování
- Licence se počítají podle **počtu jader CPU** (Core-based licensing) – minimum 8 jader na socket, 16 jader na server
- **CAL (Client Access License)** – každý uživatel nebo zařízení přistupující na server musí mít CAL (User CAL nebo Device CAL)
- **Datacenter** – zahrnuje neomezenou virtualizaci (neomezený počet VM na licencovaném hostiteli)
- **Standard** – licence pouze na 2 VM
- **Předplatné (Azure Hybrid Benefit)** – možnost přenést on-premise licenci do Azure nebo platit měsíčně přes Microsoft 365 / Azure

---

## Skupiny a doména

### Pracovní skupina (Workgroup)
- Každý PC spravuje uživatele sám lokálně
- Vhodné pro malé sítě (do ~10 PC)
- Bez centrální správy

### Doména (Domain)
- Centrální správa uživatelů, počítačů a politik přes **Domain Controller (DC)**
- Uživatel se přihlásí jedním účtem ke všem prostředkům v doméně (**Single Sign-On**)
- Doménové jméno ve formátu `firma.local` nebo `firma.com`

---

## Active Directory (AD)

Active Directory je adresářová služba Microsoftu – centrální databáze uživatelů, počítačů, skupin a politik v doméně.

### Struktura AD
- **Forest** – nejvyšší kontejner; může obsahovat více domén
- **Domain** – základní administrativní jednotka (`firma.local`)
- **OU (Organizational Unit)** – složka pro organizaci objektů (uživatelé, PC, skupiny); na OU se aplikují GPO
- **Objekty** – uživatelé, počítače, skupiny, tiskárny…

---

## Uživatelé, skupiny a oprávnění

### Typy účtů
- **Lokální účet** – pouze na daném PC
- **Doménový účet** – v AD, přístup ke všem prostředkům domény

### Typy skupin
| Typ | Rozsah | Použití |
| --- | ------ | ------- |
| **Domain Local** | Jen v lokální doméně | Přiřazení oprávnění k prostředkům |
| **Global** | Celý forest | Seskupení uživatelů ze stejné domény |
| **Universal** | Celý forest | Seskupení uživatelů z více domén |

### Práva vs. oprávnění

- **Práva (Rights/Privileges)** — co smíš dělat se systémem (přihlásit se, vypnout server, zálohovat). Nastavují se v GPO → User Rights Assignment. Přiřazují se skupinám.
- **Oprávnění (Permissions)** — co smíš dělat s konkrétním objektem (soubor, složka, sdílení). Čtení, zápis, mazání.

### Oprávnění NTFS
- **Základní:** Číst, Zapisovat, Číst a spustit, Zobrazit obsah složky, Upravit, Úplné řízení
- Oprávnění se **dědí** z nadřazené složky (lze zablokovat)
- **Odepřít** má vždy přednost před Povolit

### Sdílení souborů (SMB)
- Sdílená složka dostane UNC cestu: `\\server\nazev`
- Oprávnění sdílení + NTFS oprávnění se kombinují – platí přísnější
- `\\server\C$` – skryté administrativní sdílení

---

## Group Policy (GPO)

**GPO (Group Policy Object)** – sada nastavení aplikovaná na uživatele nebo počítače v OU/doméně.

- Nastavení hesel (délka, složitost, expirace)
- Mapování síťových disků
- Instalace softwaru
- Zákaz USB, přístupu k ovládacímu panelu…
- Zpracování: **Local → Site → Domain → OU** (LSDOU); pozdější přepíše dřívější

```
gpupdate /force     – okamžitá aplikace politik
gpresult /r         – výpis aplikovaných politik
```

---

## Serverové role a služby

| Role / Služba | Popis |
| ------------- | ----- |
| **AD DS** | Active Directory Domain Services – doménový řadič |
| **DNS** | Překlad jmen; nutný pro funkci AD |
| **DHCP** | Automatické přidělování IP adres |
| **File Server** | Sdílení souborů přes SMB |
| **Print Server** | Centrální správa tiskáren |
| **IIS** | Internet Information Services – webový server |
| **RDS** | Remote Desktop Services – vzdálené plochy |
| **Hyper-V** | Virtualizace – spouštění VM |
| **WDS** | Windows Deployment Services – síťová instalace Windows (PXE) |

---

## Bezpečnostní politiky

- **Password Policy** – minimální délka, složitost, expirace, historie hesel
- **Account Lockout Policy** – uzamčení účtu po X neúspěšných pokusech
- **Audit Policy** – záznam přihlášení, změn souborů, správy účtů
- **BitLocker** – šifrování disků (přes GPO)
- **Windows Firewall** – centrálně řízen přes GPO

---

