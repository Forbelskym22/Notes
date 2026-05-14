
**JAVASCRIPT**

**Typ jazyka:** Vysokoúrovňový — vyšší míra abstrakce, nemusíme řešit logiku na úrovni hardware.

**Využití:** webový frontend, webový backend (Node.js), mobilní aplikace (React Native), desktopové aplikace (Electron), skriptování

**Klíčové vlastnosti:**

- Dynamicky typovaný — nemusíš psát typ proměnné
- Interpretovaný → V8 engine (Chrome, Node.js)
- Středníky — technicky volitelné (ASI je doplní), ale doporučuje se psát všude kde to nevadí
- Běží v prohlížeči nebo na serveru (Node.js)

**Proměnné:**

```javascript
let cislo = 18;             // number — int i float v jednom
let desetinne = 3.14;       // number — JS nerozlišuje int a float!
let text = "Martin";        // string
let pismo = 'Martin';
let pismenka = `Martin`;
let aktivni = true;         // boolean — malá písmena!
let nic = null;             // null — prázdná hodnota záměrně nastavená
let nedefinovano;           // undefined — proměnná existuje ale nemá hodnotu

// Pozor na floaty!
console.log(0.1 + 0.2);    // = 0.30000000000000004 — IEEE 754 problém

// Bez deklarace = automaticky var (globální scope)
x = 5;                      // implicitní var — vyhýbat se!

// var NERESPEKTUJE tyto bloky:
if (true) { var x = 1; }        // x přežije
for (var i = 0; i < 3; i++) {}  // i přežije
while (true) { var y = 1; break; } // y přežije

console.log(x); // 1  — přežilo
console.log(i); // 3  — přežilo
console.log(y); // 1  — přežilo

// var RESPEKTUJE pouze funkci:
function test() {
    var z = 1;
}
console.log(z); // CHYBA  — z nepřežilo funkci

// "use strict" zakáže implicitní var
"use strict";
x = 5;                      // chyba!
```

```javascript
let jmeno = "Martin";       // let — proměnná, lze přepsat, platí jen v bloku {}
const PI = 3.14;            // const — konstanta, nelze přepsat, platí jen v bloku {}
var stare = "staré";        // var — starý způsob, platí v celé funkci (vyhýbat se!)

// Klíčový rozdíl let vs var:
function test() {
    if (true) {
        let x = 1;   // x existuje jen uvnitř if bloku
        var y = 2;   // y existuje v celé funkci!
    }
    console.log(y);  // funguje
    console.log(x);  // chyba — x neexistuje
}

let vek = 18;               // number (int i float v jednom)
let aktivni = true;         // boolean — malá písmena (rozdíl od C# a Pythonu!)
let nic = null;             // null — prázdná hodnota záměrně nastavená
let nedefinovano;           // undefined — proměnná existuje ale nemá hodnotu
```

**Datové struktury:**

```javascript
let pole = [1, 2, 3];                        // array — měnitelný, indexovaný
let objekt = { klic: "hodnota", vek: 18 };   // object — klíč:hodnota (jako dict)
let mnozina = new Set([1, 2, 3]);            // Set — unikátní hodnoty
let mapa = new Map();                        // Map — klíč:hodnota (libovolný typ klíče)
```

**Řídicí struktury:**

```javascript
// Podmínky
if (vek >= 18) {
    console.log("dospělý");
} else if (vek >= 15) {
    console.log("teenager");
} else {
    console.log("dítě");
}

// For — 3 způsoby
for (let i = 0; i < 5; i++) {          // klasický for — známe index
    console.log(i);
}

for (let item of pole) {               // for...of — průchod HODNOTAMI pole/kolekce
    console.log(item);                 // item = 1, 2, 3...
}

for (let key in objekt) {              // for...in — průchod KLÍČI objektu
    console.log(key);                  // key = "klic", "vek"...
    console.log(objekt[key]);          // hodnota přes klíč
}

// While
while (vek < 20) {
    vek++;
}

do{
console.log("dělám")
}while(true)
```

**Podprogramy:**

```javascript
// Klasická funkce
function pozdrav(jmeno) {
    return `Ahoj ${jmeno}!`;
}

// Arrow funkce (zkrácený zápis)
const pozdrav = (jmeno) => `Ahoj ${jmeno}!`;

// Výchozí hodnota parametru
function predstav(jmeno, vek = 18) {
    console.log(`${jmeno}, ${vek} let`);
}

// Callback — funkce předaná jako parametr
setTimeout(() => {
    console.log("Po 1 sekundě");
}, 1000);
```

**Fetch API:**

JavaScript je jednovláknový — aby neblokoval stránku při čekání na data ze serveru, používá asynchronní zpracování. Async funkce nepozastaví zbytek stránky — stránka dál reaguje na klikání, animace běží atd. Čeká pouze kód uvnitř dané funkce.

Praktický příklad:

```javascript
async function nactiData() {
    // 1. zobraz loading ihned
    document.getElementById("obsah").innerHTML = "Načítám...";

    try {
        // 2. čekej na data — ZBYTEK STRÁNKY FUNGUJE DÁL
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();

        // 3. přepiš loading daty
        document.getElementById("obsah").innerHTML = data.jmeno;
    } catch (error) {
        document.getElementById("obsah").innerHTML = "Chyba!";
    }
}
```

```javascript
// async/await — modernější způsob, čitelnější zápis
// async označí funkci jako asynchronní
// await říká "počkej na výsledek než jedeš dál — ale jen uvnitř této funkce"

async function nactiData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// POST požadavek — odesílání dat na server
fetch("https://api.example.com/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jmeno: "Martin", vek: 18 })
});
```