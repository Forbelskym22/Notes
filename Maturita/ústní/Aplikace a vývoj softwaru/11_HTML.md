
**Typ jazyka:** Značkovací (HyperText Markup Language) — popisuje strukturu a obsah webové stránky

> značkovací - text obklopuji značkami (tagy), které říkají jak ten text má vypadat

**Využití:** základ každé webové stránky — struktura textu, obrázků, odkazů, formulářů

---
HTML má stromovou strukturu

```
html
├── head
│   ├── meta
│   └── title
└── body
    ├── h1
    ├── p
    └── div
        ├── p
        └── a
```

každý element má:
- rodiče
- děti
- sourozence

---
## Minimální struktura dokumentu

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Název stránky</title>
</head>
<body>
    <h1>Nadpis</h1>
    <p>Odstavec textu.</p>
</body>
</html>
```

---

## Hlavička `<head>`

Obsahuje metadata — informace pro prohlížeč a vyhledávače, nezobrazuje se na stránce:

```html
<head>
    <meta charset="UTF-8">                          <!-- kódování znaků -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- responzivita -->
    <meta name="description" content="Popis stránky">
    <title>Název záložky v prohlížeči</title>
    <link rel="stylesheet" href="style.css">        <!-- odkaz na CSS -->
    <script src="script.js" defer></script>         <!-- odkaz na JS -->
</head>
```

---

## Základní elementy

**Nadpisy a text:**
```html
<h1>Nadpis 1. úrovně</h1>   <!-- h1–h6, h1 je největší -->
<p>Odstavec</p>
<strong>tučný text</strong>
<em>kurzíva</em>
<br>                         <!-- zalomení řádku (nepárový) -->
<hr>                         <!-- vodorovná čára (nepárový) -->
```

**Odkazy a obrázky:**
```html
<a href="https://example.com" target="_blank / _self">odkaz</a>

<img src="obrazek.jpg" alt="popis obrázku">   <!-- nepárový -->
```

**Seznamy:**
```html
<ul>                         <!-- neuspořádaný seznam (odrážky) -->
    <li>položka</li>
</ul>

<ol>                         <!-- uspořádaný seznam (čísla) -->
    <li>první</li>
    <li>druhý</li>
</ol>
```

**Tabulky:**
```html
<table>
    <thead>
        <tr>
	        <th>Jméno</th>
	        <th>Věk</th>
		</tr>
    </thead>
    <tbody>
        <tr>
	        <td>Martin</td>
	        <td>18</td>
        </tr>
    </tbody>
</table>
```

**Strukturální (sémantické) elementy:**
```html
<header>záhlaví stránky</header>
<nav>navigace</nav>
<main>hlavní obsah</main>
<section>tematická sekce</section>
<article>samostatný článek</article>
<aside>postranní obsah</aside>
<footer>zápatí stránky</footer>
<div>obecný blokový kontejner</div>
<span>obecný řádkový kontejner</span>
```

---

## Atributy

Atributy doplňují elementy o vlastnosti, píší se do otevírací značky:

```html
<a href="url" target="_blank" title="tooltip">text</a>
<!--  href = cíl odkazu
      target="_blank" = otevřít v nové záložce
      title = text po najetí myší -->

<img src="cesta" alt="popis" width="300" height="200">
<!--  src = zdroj obrázku
      alt = alternativní text (dostupnost, SEO)  -->

<input type="text" id="jmeno" name="jmeno" placeholder="Zadej jméno" required>
<!--  id = unikátní identifikátor
      name = název při odesílání formuláře
      placeholder = nápověda v poli
      required = povinné pole  -->
```

---

## Formuláře

```html
<form action="/odeslat" method="POST">

    <label for="jmeno">Jméno:</label>
    <input type="text" id="jmeno" name="jmeno" required>

    <label for="email">E-mail:</label>
    <input type="email" id="email" name="email">

    <label for="heslo">Heslo:</label>
    <input type="password" id="heslo" name="heslo">

    <label for="vek">Věk:</label>
    <input type="number" id="vek" name="vek" min="0" max="120">

    <!-- Výběr z možností -->
    <select name="barva">
        <option value="red">Červená</option>
        <option value="blue">Modrá</option>
    </select>

    <!-- Zaškrtávací políčko -->
    <input type="checkbox" id="souhlas" name="souhlas">
    <label for="souhlas">Souhlasím s podmínkami</label>

    <!-- Radio tlačítka -->
    <input type="radio" name="pohlavi" value="muz"> Muž
    <input type="radio" name="pohlavi" value="zena"> Žena

    <!-- Víceřádkový text -->
    <textarea name="zprava" rows="4" cols="40"></textarea>

    <button type="submit">Odeslat</button>
    <button type="reset">Vymazat</button>

</form>
```

**`method`:** `GET` — data v URL (viditelná, pro vyhledávání) | `POST` — data v těle požadavku (bezpečnější, pro přihlášení, citlivá data)
