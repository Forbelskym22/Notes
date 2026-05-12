# Paradigmata
**Definice:** Způsob myšlení, kterým chceme program popsat a napsat.
**Přístup:** Popisujeme buď **postup** (jak to udělat), nebo **výsledek** (co chceme).

---

## Imperativní programování *(JAK)*
Píšeme krok za krokem postup (algoritmus), jak dojít k výsledku. *Zástupci: C, Assembler.*
> rozkazovací způsob
### Strukturované programování
Prevence **špagetového kódu** (nepřehledného kódu plného skoků). Větvení probíhá pomocí **podmínek**, **cyklů** a **funkcí** → program se čte logicky shora dolů.

### Nestrukturované programování
Větvení pomocí příkazu `GOTO` — kód se vrací zpět na dřívější řádky.

### Objektově orientované programování *([[3_Objektově orientované programování (OOP)|OOP]])*
Kód skládáme z **objektů**.
- **Třída** — vzor / šablona / formička
	
- **Objekt** — instance třídy (konkrétní vytvoření z dané třídy)
	
- **Zapouzdření** — data objektu nejsou veřejná; přistupuje se k nim pouze přes gettery a settery
	
- **Dědičnost** — podobné třídy sdílejí metody a vlastnosti skrze vztah rodič–dítě
	
	
- **Polymorfismus:**
  - *Statický* — stejný název metody, různé parametry → řeší se při **kompilaci**
    
    ```csharp
    void Secti(int a, int b) { }
    void Secti(string a, string b) { }
    ```
	  
- *Dynamický* — děti přepisují metodu rodiče, přistupujeme přes rodičovský typ → řeší se za **běhu**
	
    ```csharp
    List<Tvar> tvary = ...;
    foreach (Tvar t in tvary) { t.Obsah(); }
    ```

---

## Deklarativní programování *(CO)*
Definujeme rovnou **cílový stav / výsledek** — jak k němu dojít je starost samotného systému. *Zástupci: SQL, HTML.*

---

## Úrovně jazyků
**Nízkoúrovňové** (Assembly) — přímá práce s pamětí a registry, optimalizováno pro konkrétní hardware.
**Vysokoúrovňové** — vyšší abstrakce, přenosné mezi hardwarem, kompilujeme nebo interpretujeme.

### Způsoby překladu
- **Kompilace** — přeložíme celý kód najednou (např. do `.exe`), pak spouštíme
- **Interpretace** — překládáme a vykonáváme řádek po řádku
- **Bytecode** — jazyk se zkompiluje do bytecodu a pak se spouští přes virtuální HW
	- kompilace za chodu

---

## Řídicí struktury
- **Sekvence** — příkazy jdou za sebou
- **Blok** — kus kódu (funkce)
- **Větvení** — `IF-ELSE`, `SWITCH`
- **Cykly** — `FOR`, `WHILE`, `DO WHILE`

## Datové struktury
- **Pole** — fixní délka, rychlý přístup přes index
- **Seznam (Spojový)** — proměnná délka
- **Slovník** — soubor klíčů a hodnot
- **Zásobník** — LIFO *(Last In, First Out)*
- **Fronta** — FIFO *(First In, First Out)*

---

## Rekurze
Funkce, která volá sama sebe. Musí mít **ukončující podmínku** , jinak běží donekonečna. Některé problémy jsou rekurzivní.
