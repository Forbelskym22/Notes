
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