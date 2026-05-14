
**Definice:** Nástroje které vývojář používá při psaní, testování a správě kódu.

---

### **PSANÍ KÓDU**

**Ruční psaní** — programátor píše kód v editoru nebo IDE. Musí ovládat syntaxi jazyka, algoritmy a logiku řešení.

**Generování kódu** — automatická tvorba kódu pomocí nástrojů:
- AI asistenti — GitHub Copilot, Claude, ChatGPT
- Snippety/šablony — Emmet (! → HTML šablona), Live Templates (JetBrains)
- Generátory projektů — Yeoman


**EDITOR VS. IDE**

**Editor** — nástroj pro psaní kódu, bez zabudovaných nástrojů jako debugger.
- Syntax highlighting, autocomplete
- Lze rozšířit pomocí extensions na IDE-like prostředí, technicky jím ale zůstává editorem
- Příklady: VS Code, Sublime Text, NeoVim

**IDE** — kompletní vývojové prostředí, má vše zabudované přímo.
- Debugger, build nástroje, správa projektů, integrace s Gitem
- Často specializované pro konkrétní jazyk
- Příklady: JetBrains (PyCharm → Python, IntelliJ → Java), Visual Studio, Xcode

---
### **ANALÝZA KÓDU**

Zkoumání kódu bez nutnosti ho spustit — hledáme chyby, problémy s výkonem nebo špatný styl.

**Statická analýza** — prochází kód bez spuštění, hledá:
- Syntaktické chyby, nepoužité proměnné, nebezpečné vzory
- Nástroje: **ESLint** (JavaScript), **Pylint** (Python), **Roslyn** (C#)

**Profilování (Profiling)** — analýza za běhu, hledá výkonnostní bottlenecky:
- Která funkce trvá nejdéle? Kde se plýtvá pamětí?
- Nástroje: Chrome DevTools (JS), cProfile (Python), Diagnostics Tools (Visual Studio)

**Code coverage** — kolik procent kódu pokrývají testy:
- 0 % = žádné testy, 100 % = každý řádek je otestován
- Cíl není 100 %, ale pokrýt kritické části

**Code review** — ruční kontrola kódu jiným vývojářem před sloučením (Pull Request)

---
### **LADĚNÍ (DEBUGGING)**

Proces hledání a opravování chyb. Typy chyb:
- **Syntaktické** — chyba v zápisu (chybějící středník)
- **Logické** — program běží ale dává špatné výsledky
- **Runtime** — chyba za běhu (dělení nulou)

**Debugger** umožňuje:
- Breakpoint — zastavení programu v daném místě
- Step over/into — krokování po řádcích
- Sledování hodnot proměnných

**Logování** — zaznamenávání informací o běhu programu.
Úrovně: DEBUG → INFO → WARNING → ERROR

---
### **SPOUŠTĚNÍ**

Proces při kterém se kód přeloží a spustí. Součástí spouštění je překlad kódu:
- **Kompilace** — překlad celého kódu najednou do strojového kódu (C, C++)
- **Interpretace** — překlad a vykonávání řádek po řádku (starší Python)
- **Bytekód** — mezikrok, kód se přeloží do bytekódu který pak interpretuje VM (Python .pyc, C# IL)

**Způsoby spuštění:**
- **S debuggerem** — program lze zastavovat, krokovat a sledovat proměnné
- **Bez debuggeru** — běžné spuštění

**Kde spouštíme:**
- **Lokálně** — na počítači vývojáře
- **Server / Cloud** — produkční prostředí
- **Docker (kontejner)** — zabalí aplikaci i prostředí dohromady, umožňuje vyvíjet na Windows a nasadit (deploynout) na Linux bez problémů s kompatibilitou

Build nástroje:
- **npm** — JavaScript
- **pip** — Python
- **.NET CLI (dotnet run)** — C#

---
### **TESTOVÁNÍ**

Ověřování že program funguje správně — cílem je najít chyby dřív než je najde zákazník.

- **Unit testy** — testují jednotlivé funkce/metody, píšeme kód který záměrně zkouší jestli náš kód selže
- **Integrační testy** — testují spolupráci více částí systému
- **Systémové testy** — testují celý systém jako celek

---
### **VERZOVÁNÍ**

Zaznamenávání změn v souborech v průběhu času — umožňuje vrátit se k předchozí verzi a paralelní vývoj.

**Git** — vytvořil Linus Torvalds v roce 2005 pro vývoj Linuxu. Správu předal Junio Hamano který ho vede dodnes.

Typy:
- **Git** — distribuovaný — každý vývojář má kompletní historii u sebe
- **SVN** — centralizovaný — historie pouze na serveru

Hostingové služby: GitHub (open-source), GitLab (DevOps, CI/CD), Bitbucket (firemní)

**Základní pojmy:**
- Repozitář — úložiště projektu a jeho historie
- Commit — uložení změn = verze projektu v daném čase
- Branch — nezávislá linie vývoje (main, development)
- Merge — sloučení větví
- Pull Request + Code Review — kontrola kódu před sloučením

**Základní příkazy:**
- git clone <url> — stáhne repozitář
- git add . — přidá všechny změny ke commitu
- git commit -m "" — uloží změny s popisem
- git push — nahraje na server
- git pull — stáhne změny aktuální větve ze serveru
- git merge <branch> — sloučí větev do aktuální
- git branch <name> — vytvoří novou větev

--- 

### **KNIHOVNY VS. FRAMEWORKY**

**Knihovna** — sbírka funkcí které si voláš, ty určuješ kdy a jak je použiješ
- Příklady: React, jQuery

**Framework** — kostra aplikace do které doplňuješ kód, framework určuje strukturu
- Příklady: Angular, .NET, Express.js

**TypeScript** — není knihovna ani framework. Je to nadmnožina JavaScriptu (superset) která přidává statické typování. Kompiluje se do JS.