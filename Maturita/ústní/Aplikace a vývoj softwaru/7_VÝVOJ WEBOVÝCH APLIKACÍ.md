
**MODEL KLIENT-SERVER**

Základní architektura komunikace mezi klientem a serverem.

**Klient:**
- Aplikace která aktivně zahajuje komunikaci — odesílá požadavky (requests)
- Zpracovává odpovědi a vykresluje je uživateli (rendering)
- Příklady: prohlížeč, mobilní aplikace, jiný server

**Server:**
- Pasivně čeká na požadavky a odpovídá (response)
- Zpracovává logiku, pracuje s databází
- Příklady: Apache, Nginx


**TECHNOLOGICKÝ STACK**

Soubor všech jazyků, nástrojů a frameworků pro vytvoření aplikace. Dělí se na Frontend a Backend (dohromady = Full Stack).

**Frontend** — vše co vidí uživatel, běží na straně klienta
- **HTML** — základní kostra a obsah stránky
- **CSS** — vzhled, barvy, fonty, rozložení
- **JavaScript** — logika, animace, výpočty na klientské straně
- Frameworky: Angluar, Vue.js

**Backend** — logika a výpočty, běží na serveru, uživatel nevidí
- **Webový server** — vyřizuje HTTP požadavky (Apache, Nginx)
- **Serverový jazyk** — zpracovává logiku (Python, C# .NET, Node.js)
- **Databáze:**
    - SQL (relační) — strukturovaná data, pevné schéma (MySQL, PostgreSQL)
    - NoSQL (nerelační) — flexibilní data bez pevného schématu, JSON formát (MongoDB, Redis)

**Příklady stacků:**
- **MERN** — MongoDB, Express.js, React, Node.js
- **LAMP** — Linux, Apache, MySQL, PHP
- **WAMP** — Windows, Apache, MySQL, PHP


**NÁVRHOVÝ VZOR MVC (Model-View-Controller)**

Architektura rozdělující aplikaci na tři logické části.

- **Router** — zachytí URL a rozhodne který Controller spustit
- **Controller** — zprostředkovatel, přijme vstup, vyžádá data od Modelu, vybere View
- **Model** — business logika, výpočty, práce s databází
- **View** — viditelná část pro uživatele, zobrazuje data (výstup) a přijímá interakce (vstup)

**Datový tok:**
Request → Router → Controller → Model → Controller → View → Response

**Výhody:**
- Strukturovanější kód
- Separation of Concerns — každá část řeší konkrétní problém
- Paralelní vývoj frontendu a backendu


**SPA (Single Page Application)**

Webová aplikace která se načte jako jeden HTML dokument a dynamicky aktualizuje obsah bez přenačtení celé stránky.

- Frontend běží v prohlížeči, stará se o zobrazení a logiku
- Backend slouží pouze jako zdroj dat — odpovídá v JSON formátu
- Komunikace přes **API** — přesně definované adresy (/produkty, /uzivatel)
- **DOM** — objektová reprezentace HTML jako strom, SPA mění jen jeho části

**Výhody:**
- Plynulost — žádné blikání při přechodu mezi stránkami
- Méně přenesených dat po startu
- Oddělený vývoj frontendu a backendu

**Rozdíl oproti klasické aplikaci:**
- Klasická = Server-Side rendering — server sestaví celou stránku
- SPA = Client-Side rendering — prohlížeč sestaví stránku sám z dat


**DEVOPS**

Kulturní a technologický přístup propojující vývoj (Development) a provoz (Operations). Cílem je zkrátit vývojový cyklus a dodávat software rychleji a spolehlivěji.

**Klíčové principy:**
- Automatizace opakujících se procesů
- Spolupráce místo izolace týmů
- Sdílená odpovědnost za produkt
- Monitoring dle získaných dat se zlepšuje efektivita a kvalita

**CI/CD (Continuous Integration / Continuous Delivery):**
- Vývojář commitne kód → automaticky se spustí testy → automatické nasazení
- Nástroje: GitHub Actions, GitLab CI/CD

**Kontejnerizace:**

Bez Dockeru musíš na každém stroji instalovat runtime, knihovny atd. zvlášť. Docker to řeší — kontejner obsahuje vše:

| Vrstva | Popis |
|---|---|
| APP | tvůj kód |
| RUNTIME + KNIHOVNY | Node.js, Python, .NET... |
| DOCKER | kontejner — zabalí vše výše |
| WSL | Linux vrstva na Windows |
| OS | Windows / Linux / Mac |

Umožňuje vyvíjet na Windows a nasadit na Linux bez problémů s kompatibilitou.

- **Kubernetes** — orchestrace více kontejnerů ve velkém měřítku

**Cloudové platformy:** AWS, Azure, Google Cloud