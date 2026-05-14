
**Využití:** vývoj Windows aplikací, webové aplikace (.NET), hry (Unity), enterprise software

**Typ jazyka:** Vysokoúrovňový — vyšší míra abstrakce, nemusíme řešit logiku na úrovni hardware (paměť, registry). Kód je přenositelný mezi různým hardwarem.

**Klíčové vlastnosti:**
- Staticky typovaný — musíš deklarovat typ proměnné
- Kompilovaný → bytekód (IL) → JIT → strojový kód
- Silně OOP — vše je ve třídě, žádné volné funkce
- Středníky na konci příkazů, složené závorky pro bloky


**Proměnné:**
```csharp
string jmeno = "Martin";    // string — řetězec znaků
int vek = 18;               // int — celé číslo
double pi = 3.14;           // double — desetinné číslo (méně přesné)
decimal cena = 19.99m;      // decimal — přesné desetinné číslo (peníze!) m = přípona
float malo = 3.14f;         // float — desetinné číslo, méně přesné než double f = přípona
bool aktivni = true;        // bool — pravda/nepravda
char pismeno = 'A';         // char — jeden znak (apostrofy!)
var auto = "Škoda";         // var — typ se odvodí automaticky při kompilaci
```

**Datové struktury:**
```csharp
int[] pole = {1, 2, 3};                              // pole — fixní délka, rychlý přístup přes index
string[] pole = new string[4];

List<int> seznam = new List<int>();                  // list — proměnná délka
Dictionary<string, int> slovnik = new Dictionary<string, int>(); // klíč:hodnota
Stack<int> zasobnik = new Stack<int>();              // LIFO
Queue<int> fronta = new Queue<int>();                // FIFO
```

**Řídicí struktury:**
```csharp
if (vek >= 18)              // podmínka
{
    Console.WriteLine("dospělý");
}
else if (vek >= 15)         // další větev
{
    Console.WriteLine("teenager");
}
else                        // výchozí větev
{
    Console.WriteLine("dítě");
}

for (int i = 0; i < 5; i++)    // cyklus s počítadlem
{
    Console.WriteLine(i);
}

foreach (var item in seznam)   // průchod kolekcí
{
    Console.WriteLine(item);
}

while (vek < 20)               // cyklus s podmínkou
{
    vek++;
}
```

**Podprogramy:**
```csharp
// Metoda s návratovou hodnotou
static string Pozdrav(string jmeno)
{
    return $"Ahoj {jmeno}!";
}

// Metoda bez návratové hodnoty
static void Vypis(string text)
{
    Console.WriteLine(text);
}

// Přetížení (overloading)
static int Secti(int a, int b) { return a + b; }
static double Secti(double a, double b) { return a + b; }

// Výchozí hodnota parametru
static void Predstav(string jmeno, int vek = 18) { }
```

**Modifikátory přístupu:**
```csharp
public class Osoba          // public — přístupné odkudkoliv
{
    private string _jmeno;  // private — pouze v této třídě
    protected int Vek;      // protected — v třídě a dětech
    internal string Mesto;  // internal — pouze v rámci projektu
}
```

- public — přístupné odkudkoliv
- private — pouze v dané třídě
- protected — v třídě a jejích dětech
- internal — pouze v rámci stejného projektu (C# specifické)


**Dědičnost:**
```csharp
class Zvire
{
    public string Jmeno { get; set; }
    public virtual void Zvuk()          // virtual — může být přepsáno
    {
        Console.WriteLine("...");
    }
}

class Pes : Zvire                       // : = dědí od Zvire
{
    public override void Zvuk()         // override — přepisuje metodu rodiče
    {
        Console.WriteLine("Haf!");
    }
}

class Pudl : Pes
{
    public Pudl(string jmeno)
        : base(jmeno) { }              // base = volání konstruktoru rodiče
}
```

Klíčová slova:
- : NazevTridy — dědí od rodiče
- virtual — metoda může být přepsána
- override — přepisuje metodu rodiče
- base — odkazuje na rodiče (konstruktor nebo metodu)
- sealed — zakazuje další dědění


**Organizace kódu:**
```csharp
// Namespace — jmenný prostor, zabraňuje konfliktům názvů
namespace MojeAplikace
{
    public class Osoba
    {
        private string _jmeno;
        public int Vek { get; set; }

        // Konstruktor
        public Osoba(string jmeno, int vek)
        {
            _jmeno = jmeno;
            Vek = vek;
        }

        // Metoda
        public string Pozdrav()
        {
            return $"Ahoj, jsem {_jmeno}!";
        }
    }
}

// Interface
interface IUcitel
{
    void Uc();
}

// Abstraktní třída
abstract class Zamestnanec
{
    public abstract decimal VypocitejPlat();
}
```

- Namespace — logické seskupení tříd, zabraňuje konfliktům názvů
- Jedna třída = jeden soubor (konvence)
- Abstraktní třída — nelze instanciovat, definuje předpis pro děti
- Interface — čistý předpis, žádný kód, lze implementovat více najednou