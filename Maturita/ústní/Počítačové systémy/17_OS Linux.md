# OS Linux

## Co je Linux

Linux je open-source **jádro (kernel)** operačního systému, které vytvořil Linus Torvalds v roce 1991. Samotný Linux je pouze kernel – kompletní systém tvoří kombinace kernelu s nástroji GNU → označuje se jako **GNU/Linux**.

- **Open-source** – zdrojový kód je veřejně dostupný, lze ho upravovat a distribuovat
- **Multiuživatelský** – více uživatelů může pracovat současně
- **Multitaskingový** – spouští více procesů najednou
- **Unixového původu** – unix like operační systém (commandy jsou podobné unixu)

---

## Distribuce (distro)

Distribuce = kernel + balíčkovací systém + předinstalované nástroje + prostředí.

| Distribuce     | Balíčkovací systém | Použití              |
| -------------- | ------------------ | -------------------- |
| **Debian**     | apt (.deb)         | Desktop, servery     |
| **Fedora**     | dnf / yum (.rpm)   | Servery, enterprise  |
| **Arch Linux** | pacman             | Pokročilí uživatelé  |
| **Kali Linux** | apt (.deb)         | Penetrační testování |
| **Alpine**     | apk                | Kontejnery, embedded |

---

## Souborový systém – FHS

**V Linuxu je vše soubor** – disky, tiskárny, síťová rozhraní, procesy – vše se zobrazuje jako soubor někde ve stromu adresářů. Díky tomu lze se vším pracovat stejnými nástroji (čtení, zápis, oprávnění).

Linux používá **jeden strom adresářů** začínající v **rootu** (`/`) – na rozdíl od Windows (C:\, D:\…) zde neexistují písmena disků. Disky a oddíly se připojují (mountují) do podadresářů stromu.

| Adresář | Co tam je | Poznámka |
| ------- | --------- | -------- |
| `/` | Kořen celého systému | Vše začíná zde |
| `/bin` | Binárky – základní příkazy (ls, cp, mv, bash…) | Dostupné i bez připojených dalších FS |
| `/etc` | Konfigurační soubory systému a služeb | Vše je textový soubor – lze editovat |
| `/home` | Domovské adresáře uživatelů (`/home/jan`) | Každý uživatel má svůj prostor |
| `/root` | Domovský adresář roota | Root nemá složku v `/home` |
| `/var` | Proměnná data – logy, databáze, pošta | Obsah se mění za běhu systému |
| `/tmp` | Dočasné soubory | Vymazány při restartu |
| `/dev` | Zařízení jako soubory (`/dev/sda` = disk) | "Vše je soubor" v praxi |
| `/proc` | Virtuální FS – informace o procesech a kernelu | Neexistuje na disku, generuje kernel |
| `/usr` | Uživatelské programy a knihovny | Většina nainstalovaného SW |
| `/boot` | Soubory pro zavádění systému (kernel, GRUB) | Nutné pro start |

---

## Rozdělení disku – oddíly

Při instalaci Linuxu je potřeba disk rozdělit na oddíly. Povinné minimum:

| Oddíl | Velikost | Účel |
| ----- | -------- | ---- |
| **EFI** (`/boot/efi`) | ~500 MB | Bootloader pro UEFI systémy (FAT32) |
| **/** (root) | 20+ GB | Celý systém – povinný |
| **swap** | RAM nebo 2× RAM | Odkládací prostor (virtuální RAM) |

Doporučeně navíc:

| Oddíl     | Účel                                                               |
| --------- | ------------------------------------------------------------------ |
| **/home** | Oddělení dat uživatelů od systému – při reinstalaci se zachová     |
| **/var**  | Pokud server generuje hodně logů – oddělení zabrání zaplnění rootu |

> Na starším BIOS (ne UEFI) místo EFI oddílu stačí `/boot` (~500 MB, ext4).


### Souborové systémy

| FS        | Použití           | Poznámka                         |
| --------- | ----------------- | -------------------------------- |
| **ext4**  | Výchozí pro Linux | Žurnálování, spolehlivý, rychlý  |
| **FAT32** | EFI oddíl, USB    | Kompatibilní s Windows i Linuxem |
| **NTFS**  | Windows disky     | Linux čte/zapisuje přes ntfs-3g  |
| **swap**  | Odkládací prostor | Není klasický FS, nemá adresáře  |


---

## Základní příkazy

```bash
# Navigace
pwd                  # aktuální adresář
ls -la               # výpis souborů včetně skrytých
cd /etc              # přechod do adresáře

# Soubory
cp soubor cil        # kopírování
mv soubor cil        # přesun / přejmenování
rm soubor            # smazání souboru
rm -rf adresar       # smazání adresáře rekurzivně
mkdir novy           # vytvoření adresáře
cat soubor           # výpis obsahu
less soubor          # stránkovaný výpis
grep "text" soubor   # hledání textu

# Systém
top / htop           # procesy a využití zdrojů
df -h                # využití disků
lsblk                # disky
free -h              # využití RAM
uname -r             # verze kernelu
```

---

## Uživatelé a oprávnění

### Uživatelé a skupiny
- Každý soubor má **vlastníka** (user) a **skupinu** (group)
- **root** – superuživatel, neomezená práva (UID 0)
- `sudo` – spuštění příkazu s právy roota

```bash
adduser jmeno              # přidání uživatele
passwd jmeno               # změna hesla
groupadd nazev_skupiny     # vytvoření skupiny
usermod -aG skupina jmeno  # přidání uživatele do skupiny (-a = append, -G = groups)
groups jmeno               # výpis skupin uživatele
```

> `-aG` je důležité – bez `-a` by se uživatel odebral ze všech ostatních skupin a zůstal jen v té zadané.

### Oprávnění souborů (chmod)

```
-rwxr-xr--  1  user  group  1234  ...
 ^^^         vlastník
    ^^^      skupina
       ^^^   ostatní

r = read (4)
w = write (2)
x = execute (1)
```

```bash
chmod 755 soubor     # rwxr-xr-x
chmod 644 soubor     # rw-r--r--
chown user:group soubor   # změna vlastníka
```

---

## Správa balíčků

```bash
# Debian (apt):
apt update           # aktualizace seznamu balíčků
apt upgrade          # aktualizace nainstalovaných balíčků
apt install nginx    # instalace
apt remove nginx     # odinstalace
apt purge nginx      # úplné odstranění balíčku ze systému
```

---

## Procesy

```bash
ps aux               # výpis všech procesů
kill PID             # ukončení procesu (SIGTERM)
kill -9 PID          # vynucené ukončení (SIGKILL)
```

- Každý proces má **PID** (Process ID)
- Procesy mají rodiče – strom procesů, kořen je `init` (PID 1)

---

## Systemd – správa služeb

Moderní init systém, spravuje služby (démony) a jejich závislosti.

```bash
systemctl start nginx      # spuštění služby
systemctl stop nginx       # zastavení
systemctl restart nginx    # restart
systemctl enable nginx     # spuštění při startu systému
systemctl status nginx     # stav služby

journalctl -u nginx        # logy služby
```

---

## Síťování

```bash
ip addr                    # IP adresy rozhraní
ip route                   # směrovací tabulka
ping 8.8.8.8               # test konektivity

```

**Konfigurace sítě na Debian** – soubor `/etc/network/interfaces`:

```bash
# Statická IP:
auto eth0
iface eth0 inet static
  address 192.168.1.10
  netmask 255.255.255.0
  gateway 192.168.1.1
  dns-nameservers 8.8.8.8

# DHCP:
auto eth0
iface eth0 inet dhcp
```

Po úpravě restartovat síťování:
```bash
systemctl restart networking
# nebo jen konkrétní rozhraní:
ifdown eth0 && ifup eth0
```

