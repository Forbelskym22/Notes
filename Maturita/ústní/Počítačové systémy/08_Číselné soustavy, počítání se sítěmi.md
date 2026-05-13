# Číselné soustavy, počítání se sítěmi

## Číselné soustavy

### Desítková (dekadická) – základ 10
- Číslice: 0–9
- Běžné lidské počítání

### Dvojková (binární) – základ 2
- Číslice: 0, 1
- Základní jazyk počítačů – vše je reprezentováno jako bity
- Každá pozice = mocnina 2: 2⁷ 2⁶ 2⁵ 2⁴ 2³ 2² 2¹ 2⁰ = 128 64 32 16 8 4 2 1

### Šestnáctková (hexadecimální) – základ 16
- Číslice: 0–9, A–F (A=10, B=11, C=12, D=13, E=14, F=15)
- Kompaktní zápis binárních dat (1 hex cifra = 4 bity)
- Používá se pro MAC adresy, IPv6, barvy v HTML

---

## Převody mezi soustavami

### Desítková → Binární
Dělení 2 se zbytkem (zbytky čteme zdola nahoru):

```
156 ÷ 2 = 78 zbytek 0
 78 ÷ 2 = 39 zbytek 0
 39 ÷ 2 = 19 zbytek 1
 19 ÷ 2 =  9 zbytek 1
  9 ÷ 2 =  4 zbytek 1
  4 ÷ 2 =  2 zbytek 0
  2 ÷ 2 =  1 zbytek 0
  1 ÷ 2 =  0 zbytek 1

156₁₀ = 10011100₂
```

### Binární → Desítková
Součet mocnin 2 na pozicích, kde je 1:

```
10011100₂
= 1×128 + 0×64 + 0×32 + 1×16 + 1×8 + 1×4 + 0×2 + 0×1
= 128 + 16 + 8 + 4
= 156₁₀
```

### Binární → Hexadecimální
Rozdělení do skupin po 4 bitech zprava, každou skupinu převést na hex:

```
1001 1100
  9    C
= 9C₁₆
```

### Hexadecimální → Binární
Každou hex cifru převést na 4 bity:

```
9C₁₆
9 = 1001
C = 1100
= 10011100₂
```

### Hexadecimální → Desítková
Každou cifru vynásobit příslušnou mocninou 16 (zprava: 16⁰, 16¹, 16²…):

```
9C₁₆
= 9×16¹ + 12×16⁰
= 144 + 12
= 156₁₀
```

### Desítková → Hexadecimální
Dělení 16 se zbytkem (nebo přes binární):

```
156 ÷ 16 = 9 zbytek 12 (C)
  9 ÷ 16 = 0 zbytek 9

156₁₀ = 9C₁₆
```

---

## Maska podsítě a CIDR

- **Maska podsítě** – 32bitové číslo určující, kolik bitů patří síti a kolik hostiteli
- **CIDR notace** – lomítko + počet síťových bitů (např. `/24`)


**Vzorce:**
- Počet hostů = **2ⁿ – 2** (n = počet hostitelských bitů; –2 pro adresu sítě a broadcast)
- Počet podsítí = **2ˢ** (s = počet půjčených bitů)

---

## Subneting – výpočet podsítí

### Příklad: Rozdělení sítě 192.168.1.0/24 na 4 stejné podsítě

1. Potřebujeme 4 podsítě → 2ˢ ≥ 4 → s = 2 bity
2. Nová maska: /24 + 2 = **/26** (255.255.255.192)
3. Počet hostů v každé podsíti: 2⁶ – 2 = **62 hostů**
4. Krok (velikost bloku): 256 – 192 = **64**

| Podsíť | Adresa sítě      | Rozsah hostů              | Broadcast        |
| ------ | ---------------- | ------------------------- | ---------------- |
| 1      | 192.168.1.0/26   | 192.168.1.1 – .62         | 192.168.1.63     |
| 2      | 192.168.1.64/26  | 192.168.1.65 – .126       | 192.168.1.127    |
| 3      | 192.168.1.128/26 | 192.168.1.129 – .190      | 192.168.1.191    |
| 4      | 192.168.1.192/26 | 192.168.1.193 – .254      | 192.168.1.255    |

### Jak číst adresu sítě a broadcast rychle
- **Adresa sítě** – hostitelská část = samé 0
- **Broadcast** – hostitelská část = samé 1
- **První použitelný host** = adresa sítě + 1
- **Poslední použitelný host** = broadcast – 1

---

## VLSM – Variable Length Subnet Mask

- Podsítě různých velikostí podle potřeby (na rozdíl od subnettingu kde jsou všechny stejně velké)
- Efektivnější využití adresního prostoru
- Příklad: linka mezi routery potřebuje jen 2 hostitele → použijeme /30

---

## Rychlé taháky

**Binární hodnoty oktetů:**
128 – 64 – 32 – 16 – 8 – 4 – 2 – 1

