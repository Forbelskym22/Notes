
**Využití:** datová analýza, trénování AI, scripty, webové aplikace

**Typ jazyka:** Vysokoúrovňový — vyšší míra abstrakce, nemusíme řešit logiku na úrovni hardware (paměť, registry). Kód je přenositelný mezi různým hardwarem.

- Datová analýza (pandas, numpy)
- Scripting a automatizace
- AI/ML (TensorFlow, PyTorch)

**Syntaxe — klíčové vlastnosti:**

- **Dynamicky typovaný**  — nemusíš psát typ proměnné
- **Interpretovaný** → bytekód (.pyc)
- **Odsazení místo složených závorek** — struktura kódu se určuje mezerami/tabulátory
- Boolean: `True` / `False`  — velká písmena

**Proměnné:**


```python
# Datové typy v Pythonu
jmeno = "Martin"    # str — řetězec znaků
vek = 18            # int — celé číslo
pi = 3.14           # float — desetinné číslo
aktivni = True      # bool — velká písmena! (rozdíl od JS a C#)
nic = None          # None — prázdná hodnota (rozdíl od null v JS/C#)

# Zjištění typu
type(vek)           # <class 'int'>
```

**Řídicí struktury:**


```python
if vek >= 18:
    print("dospělý")
elif vek >= 15:
    print("teenager")
else:
    print("dítě")

for i in range(5):
    print(i)

while vek < 20:
    vek += 1
```

**Datové struktury:**


```python
seznam = [1, 2, 3]        # list — měnitelný, indexovaný
ntice = (1, 2, 3)         # tuple — neměnitelný
slovnik = {"klic": "hodnota"}  # dict — klíč:hodnota
mnozina = {1, 2, 3}       # set — unikátní hodnoty
```

**Podprogramy:**


```python
def pozdrav(jmeno):
    return f"Ahoj {jmeno}!"

print(pozdrav("Martin"))
```

**Slicování:**


```python
s = [1, 2, 3, 4, 5]

print(s[1:3])   # od indexu 1 do 3 (3 se nezahrne)
# [2, 3]

print(s[:2])    # od začátku do indexu 2
# [1, 2]

print(s[2:])    # od indexu 2 do konce
# [3, 4, 5]

print(s[::2])   # každý druhý prvek (krok 2)
# [1, 3, 5]

print(s[::-1])  # obrácení (krok -1 = pozpátku)
# [5, 4, 3, 2, 1]
```