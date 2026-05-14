
**Definice:** Způsob vytváření algoritmů které by člověk nedokázal napsat ručně. Systém se učí ze vzorů v datech.

---

### Typy strojového učení

#### Supervised learning (s učitelem)

- Data jsou **tagovaná** (označená) — systém ví jaká má být správná odpověď
- Systém se trénuje a pomocí **zpětné propagace (backpropagation)** upravuje váhy dokud nemá dostatečnou přesnost
- Příklady úloh: klasifikace (spam/ne spam), regrese (předpověď ceny)

#### Unsupervised learning (bez učitele)

- Data jsou **netagovaná** — systém sám hledá vzory a skupiny
- Příklad: **shlukování (clustering)** — segmentace zákazníků

#### Reinforcement learning (zpětnovazební)

- Systém se učí akcemi v prostředí pomocí **systému odměn a penalizací**
- Příklad: autonomní vozifdla (odměna za bezpečnou cestu)

---

### Funkce neuronu

```
výstup = aktivační_funkce( (vstupy × váhy) + bias )
```

1. **Vstupy × váhy** — každý vstup má váhu (důležitost)
2. **Součet** — sečteme vážené vstupy
3. **+ bias** — přičteme posun (neuron může být aktivní i bez vstupů)
4. **Aktivační funkce** — převede výsledek do požadovaného rozsahu

|Funkce|Výstup|Použití|
|---|---|---|
|**ReLU**|0 nebo kladné číslo|skryté vrstvy|
|**Sigmoid**|0 až 1|binární klasifikace|
|**Softmax**|pravděpodobnosti 0–1|více kategorií|

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:12px 0">

<div>
<svg viewBox="0 0 240 150" width="240" height="150" xmlns="http://www.w3.org/2000/svg" style="display:block;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb">
  <!-- mřížka -->
  <line x1="20" y1="20" x2="20" y2="130" stroke="#e5e7eb" stroke-width="1"/>
  <line x1="20" y1="130" x2="225" y2="130" stroke="#e5e7eb" stroke-width="1"/>
  <!-- osy -->
  <line x1="120" y1="15" x2="120" y2="133" stroke="#d1d5db" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="18" y1="130" x2="228" y2="130" stroke="#9ca3af" stroke-width="1.5"/>
  <line x1="120" y1="15" x2="120" y2="133" stroke="#9ca3af" stroke-width="1.5"/>
  <!-- ReLU: max(0,x) — rovná čára na 0 pro x<0, pak diagonála -->
  <polyline points="20,130 120,130 225,25" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- popisky os -->
  <text x="229" y="134" font-size="11" fill="#9ca3af" font-family="sans-serif">x</text>
  <text x="124" y="13" font-size="11" fill="#9ca3af" font-family="sans-serif">y</text>
  <text x="108" y="143" font-size="10" fill="#9ca3af" font-family="sans-serif">0</text>
  <!-- název -->
  <text x="30" y="40" font-size="12" fill="#f59e0b" font-weight="bold" font-family="sans-serif">ReLU</text>
  <text x="30" y="54" font-size="10" fill="#9ca3af" font-family="sans-serif">max(0, x)</text>
</svg>
</div>

<div>
<svg viewBox="0 0 240 150" width="240" height="150" xmlns="http://www.w3.org/2000/svg" style="display:block;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb">
  <!-- asymptoty -->
  <line x1="18" y1="25" x2="228" y2="25" stroke="#e0e7ff" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="18" y1="127" x2="228" y2="127" stroke="#e0e7ff" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- osy -->
  <line x1="18" y1="76" x2="228" y2="76" stroke="#9ca3af" stroke-width="1.5"/>
  <line x1="123" y1="15" x2="123" y2="137" stroke="#9ca3af" stroke-width="1.5"/>
  <!-- sigmoid: 1/(1+e^-x), x od -5 do 5 -->
  <polyline points="18,126 40,124 63,120 85,112 108,97 123,76 138,55 160,40 183,32 205,28 228,26"
    fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- popisky -->
  <text x="229" y="79" font-size="11" fill="#9ca3af" font-family="sans-serif">x</text>
  <text x="127" y="13" font-size="11" fill="#9ca3af" font-family="sans-serif">y</text>
  <text x="5" y="29" font-size="10" fill="#a5b4fc" font-family="sans-serif">1</text>
  <text x="130" y="79" font-size="10" fill="#9ca3af" font-family="sans-serif">0.5</text>
  <text x="5" y="130" font-size="10" fill="#a5b4fc" font-family="sans-serif">0</text>
  <!-- název -->
  <text x="30" y="50" font-size="12" fill="#6366f1" font-weight="bold" font-family="sans-serif">Sigmoid</text>
  <text x="30" y="64" font-size="10" fill="#9ca3af" font-family="sans-serif">1 / (1 + e⁻ˣ)</text>
</svg>
</div>

</div>

---

### Druhy neuronových sítí

#### Feedforward (MLP)

- Nejjednodušší typ — data jdou pouze **dopředu** vrstva po vrstvě
- Použití: základní klasifikace, předpovědi

#### Konvoluční (CNN)

- Specializovaná na **obrázky** — hledá vzory, hrany, tvary
- Použití: rozpoznávání obličejů, objektů na fotkách

#### Rekurentní (RNN)

- Má **paměť** — výstup předchozího kroku vstupuje do dalšího
- Použití: text, řeč, časové řady — záleží na **pořadí**

#### Autoenkodér

- Síť která se učí **komprimovat a rekonstruovat** data
- Použití: odstranění šumu z obrázků, detekce anomálií

#### Transformer

- Moderní architektura, základ dnešních LLM modelů
- Místo sekvenčního zpracování používá **attention mechanismus** — sleduje vztahy mezi všemi částmi vstupu najednou
- Použití: **GPT, Claude** — generativní AI

---

### Využití AI

| Oblast                 | Příklad                      |
| ---------------------- | ---------------------------- |
| **Generování textu**   | ChatGPT, Claude — psaní, kód |
| **Generování obrázků** | Midjourney, DALL-E           |
| **Analýza dat**        | hledání vzorů, předpovědi    |
| **Rozpoznávání**       | obličeje, řeč, objekty       |
| **Editace**            | opravy textu, úpravy fotek   |
|                        |                              |

---