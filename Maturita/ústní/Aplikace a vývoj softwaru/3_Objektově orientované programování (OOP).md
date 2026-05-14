
**Definice:** Programovací paradigma kde kód skládáme z objektů. **Třída** je šablona která definuje atributy a metody. **Objekt** je instance třídy — uchovává konkrétní hodnoty atributů, metody sdílí ze třídy.

---

### Základní pojmy

- **Třída** — šablona/vzor pro objekty. Existuje v kódu, nezabírá paměť za běhu.
- **Objekt** — konkrétní instance třídy. Vzniká za běhu, zabírá paměť.
- **Atribut** — vlastnost objektu (data která objekt uchovává)
- **Metoda** — funkce definovaná uvnitř třídy, pracuje s atributy objektu
- **Konstruktor** — speciální metoda volaná při vytváření objektu, nastavuje počáteční hodnoty atributů

```csharp
class Auto
{
    public string Barva { get; set; }
    public string Znacka { get; set; }

    public Auto(string barva, string znacka) // konstruktor
    {
        Barva = barva;
        Znacka = znacka;
    }
}

Auto a = new Auto("červená", "Škoda"); // objekt = instance třídy
```

---

### Statické vs. Instanční atributy

- **Instanční** — patří konkrétnímu objektu, každý objekt má svou hodnotu
- **Statické (`static`)** — patří třídě, sdílené všemi objekty

```csharp
class Auto
{
    public string Barva { get; set; }   // instanční - každé auto má jinou
    public static int PocetKol = 4;     // statický - stejné pro všechna auta
}

Console.WriteLine(Auto.PocetKol); // přístup přes třídu, ne objekt!
```

---

### 4 pilíře OOP

#### 1. Zapouzdření

Data objektu jsou ideálně skrytá (`private`/`protected`), přistupuje se k nim pouze přes gettery a settery. Umožňuje validaci dat při zápisu.

- `private` — přístupné pouze ve třídě
- `protected` — přístupné ve třídě a jejích dětech
- `public` — přístupné odkudkoliv

```csharp
class Osoba
{
    private int _vek;

    public int Vek
    {
        get { return _vek; }
        set
        {
            if (value < 0) throw new Exception("Věk nemůže být záporný");
            _vek = value;
        }
    }
}
```

---

#### 2. Dědičnost

Třída (dítě) přebírá atributy a metody jiné třídy (rodiče). V C# lze dědit pouze od **jedné** třídy. Dítě může metody rodiče přepsat pomocí `override`. Rodič musí metodu označit jako `virtual`.

**Konstruktor se nedědí** — dítě musí definovat vlastní konstruktor a explicitně zavolat konstruktor rodiče přes `base()`.

```csharp
class Zvíře
{
    public string Jméno { get; set; }

    public Zvíře(string jméno)
    {
        Jméno = jméno;
    }

    public virtual void Zvuk() { Console.WriteLine("..."); }
}

class Pes : Zvíře
{
    public string Plemeno { get; set; }

    public Pes(string jméno, string plemeno) : base(jméno) // volá konstruktor rodiče
    {
        Plemeno = plemeno;
    }

    public override void Zvuk() { Console.WriteLine("Haf!"); }
}
```

---

#### 3. Polymorfismus

**Statický (overloading)** — stejný název metody, různé parametry → řeší se při **kompilaci**

```csharp
void Secti(int a, int b) { }
void Secti(string a, string b) { }
```

**Dynamický (override)** — děti přepisují metodu rodiče, přistupujeme k nim přes rodičovský typ → řeší se za **běhu**

```csharp
List<Zvíře> zvířata = new List<Zvíře> { new Pes("Rex", "Labrador"), new Kočka("Micka") };
foreach (Zvíře z in zvířata) { z.Zvuk(); } // za běhu se rozhodne která metoda
```

---

#### 4. Abstrakce

Třída definuje **co** objekt umí, ne jak to dělá. Implementaci si řeší každá podtřída sama. Realizuje se pomocí **abstraktních tříd** nebo **rozhraní (interface)**.

Abstraktní třídu **nelze instanciovat** — nelze z ní přímo vytvořit objekt.

```csharp
abstract class Tvar
{
    public abstract double Obsah(); // předpis - každý tvar si řeší sám
}

class Kruh : Tvar
{
    public double Polomer { get; set; }
    public override double Obsah() { return Math.PI * Polomer * Polomer; }
}
```

---

### Abstraktní třída vs. Interface

||Abstraktní třída|Interface|
|---|---|---|
|Hotový kód|✅|❌|
|Atributy|✅|❌|
|Dědičnost|pouze jedna|více najednou|
|Použití|třídy sdílí kód|třídy sdílí chování|

```csharp
interface ILetající { void Letej(); }
interface IZpívající { void Zpívej(); }

class Pták : Zvíře, ILetající, IZpívající { } // jedna třída + více interfaců
```

---

### SOLID principy

#### S — Single Responsibility
Každá třída má **jednu zodpovědnost**. Pokud ji změníš, máš jen jeden důvod proč.

Špatně — třída `Zvíře` ukládá data, posílá emaily i generuje report:
```csharp
class Zvíře
{
    public string Jméno { get; set; }
    public void UložDodatabáze() { /* ... */ }
    public void PošliEmail() { /* ... */ }
    public string GenerujReport() { /* ... */ }
}
```
Dobře — každá třída dělá jednu věc:
```csharp
class Zvíře { public string Jméno { get; set; } }
class ZvířeRepository { public void Ulož(Zvíře z) { /* ... */ } }
class EmailService { public void Pošli(string zpráva) { /* ... */ } }
```

---

#### O — Open/Closed
Třída je **otevřená pro rozšíření, uzavřená pro úpravu**. Přidáváš nové třídy, ne upravuješ stávající kód.

Špatně — při přidání nového zvířete musíš upravit metodu:
```csharp
void VydejZvuk(string typ)
{
    if (typ == "pes") Console.WriteLine("Haf");
    else if (typ == "kočka") Console.WriteLine("Mňau");
    // při každém novém zvířeti sem musíš sahat
}
```
Dobře — přidáš novou třídu, stávající kód se nedotýkáš:
```csharp
abstract class Zvíře { public abstract void Zvuk(); }
class Pes : Zvíře { public override void Zvuk() => Console.WriteLine("Haf"); }
class Kočka : Zvíře { public override void Zvuk() => Console.WriteLine("Mňau"); }
```

---

#### L — Liskov Substitution
**Dítě musí fungovat všude kde funguje rodič** — nesmí rozbít chování.

```csharp
// funguje s Zvíře...
void NakrmZvíře(Zvíře z) { Console.WriteLine($"Krmím {z.Jméno}"); }

// ...a musí fungovat i s Pes (dítětem)
Pes pes = new Pes("Rex", "Labrador");
NakrmZvíře(pes); // OK — Pes je stále Zvíře
```

---

#### I — Interface Segregation
**Více malých interfaců > jeden velký**. Třída nemá implementovat metody které nepotřebuje.

Špatně — Ryba musí implementovat `Letej()` i když neumí létat:
```csharp
interface IZvíře { void Běž(); void Plav(); void Letej(); }
class Ryba : IZvíře
{
    public void Letej() { throw new Exception("Ryba neumí létat!"); }
}
```
Dobře — implementuje jen to co umí:
```csharp
interface IBěžec { void Běž(); }
interface IPlavec { void Plav(); }
interface ILetec { void Letej(); }

class Ryba : IPlavec { public void Plav() { /* ... */ } }
class Pták : IBěžec, ILetec { /* ... */ }
```

---

#### D — Dependency Inversion
**Záviset na abstrakci (interface), ne na konkrétní třídě**. Snadno vyměníš implementaci.

Špatně — `Výcvikář` je pevně svázán s `Pes`:
```csharp
class Výcvikář
{
    private Pes _zvíře = new Pes("Rex", "Lab"); // nelze vyměnit za jiné zvíře
    public void Trénuj() { _zvíře.Zvuk(); }
}
```
Dobře — závisí na abstrakci, konkrétní zvíře se předá zvenku:
```csharp
class Výcvikář
{
    private Zvíře _zvíře;
    public Výcvikář(Zvíře zvíře) { _zvíře = zvíře; } // lze předat Pes, Kočka, cokoliv
    public void Trénuj() { _zvíře.Zvuk(); }
}
```
