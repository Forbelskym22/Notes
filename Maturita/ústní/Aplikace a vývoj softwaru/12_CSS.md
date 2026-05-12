# Kaskádové styly CSS

- **Box model** — každý element je obdélník
- Pokud více pravidel cílí na stejný element, vyhraje to s nejvyšší **specificitou**
- elementy dědí své vlastnosti

**Využití:** vizuální formátování HTML dokumentů — barvy, rozložení, velikosti, animace

---

## Způsoby kombinace s HTML

**Inline** — přímo v elementu, nejvyšší priorita:
```html
<p style="color: red;">text</p>
```

**Interní** — v `<style>` tagu v `<head>`:
```html
<style>
    p { color: red; }
</style>
```

**Externí** — odkaz na samostatný `.css` soubor (doporučený způsob):
```html
<link rel="stylesheet" href="style.css">
```

---

## Základní syntaxe

```css
				deklarace
selektor {vlastnost: hodnota;}

p {
    color: red;
    font-size: 16px;
}
```

---

## Selektory

```css
p { }               /* element — všechny <p> */
.trida { }          /* třída — elementy s class="trida" */
p.trida { }         /* pouze `<p>` elementy s danou třídou */
#id { }             /* id — element s id="id" (unikátní) */
p#id { }            /* pouze `<p>` element s daným id (id je unikátní) */
* { }               /* univerzální — vše */

a:hover { }         /* pseudotřída — stav elementu */
p::first-line { }   /* pseudoelement — část elementu */

div p { }           /* potomek — všechny <p> uvnitř <div> */
div + p { }         /* hned **následující sourozenec**, ne potomek*/
div > p { }         /* přímý potomek */
h1, h2, h3 { }      /* více selektorů najednou */
```

---

## Vybrané vlastnosti a hodnoty

**Text a písmo:**
```css
color: red;                  /* barva textu */
font-size: 16px;             /* velikost písma */
font-family: Arial, sans-serif;
font-weight: bold;
text-align: center;          /* left | right | center | justify */
text-decoration: underline;  /* none | underline | line-through */
```

**Box model**:
```css
width: 200px;
height: 100px;
padding: 10px;       /* mezera uvnitř (mezi obsahem a okrajem) */
margin: 20px;        /* mezera vně (mezi elementy) */
border: 1px solid black;
box-sizing: border-box;  /* padding a border se počítají do width/height */
```

**Pozadí:**
```css
background-color: #f0f0f0;
background-image: url("obrazek.jpg");
```

**Display a layout:**
```css
display: block;      /* blokový element — zabere celý řádek */
display: inline;     /* řádkový — jen tolik místa, kolik potřebuje */
display: flex;       /* flexbox — moderní rozvržení */
display: none;       /* skryje element */

/* Flexbox: */
.kontejner {
    display: flex;
    justify-content: center;   /* horizontální zarovnání */
    align-items: center;       /* vertikální zarovnání */
    gap: 10px;
}
```

**Pozicování:**
```css
position: static;    /* výchozí — normální tok */
position: relative;  /* relativní k původní pozici */
position: absolute;  /* relativní k nejbližšímu position: relative rodiči */
position: fixed;     /* fixní k oknu prohlížeče */
top: 10px;
left: 20px;
```

---

## Kaskáda a specificita

Pokud více pravidel cílí na stejný element, vyhraje to s nejvyšší **specificitou** — čím přesnější (konkrétnější) selektor, tím vyšší priorita:

1. `!important` — přebije vše (vyhýbat se)
2. Inline styl (`style=""`)
3. ID selektor (`#id`)
4. Třída (`.trida`), pseudotřída (`:hover`)
5. Element (`p`, `div`)

```css
p { color: blue; }
.text { color: green; }      /* vyhraje nad p — třída > element */
p.text { color: orange; }    /* vyhraje nad .text — přesnější (element + třída) */
#hlavni { color: red; }      /* vyhraje nad vším — ID > třída */
```

---

## Dědičnost

Některé vlastnosti se dědí z rodiče na potomky automaticky — zejména typografické:

```css
body {
    font-family: Arial;   /* zdědí všechny elementy uvnitř */
    color: #333;
}

/* Děděné vlastnosti: color, font-*, line-height, text-align... */
/* Neděděné vlastnosti: margin, padding, border, background... */
```

Dědičnost lze vynutit nebo zrušit:
```css
p {
    color: inherit;   /* vynutí dědění od rodiče */
    border: inherit;
}

p {
    color: initial;   /* resetuje na výchozí hodnotu prohlížeče */
    color: unset;     /* zruší dědění
}
```
