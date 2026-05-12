# Structured Query Language

**Typ jazyka:** Deklarativní — říkáme *co* chceme, ne *jak* to získat

**Využití:** práce s relačními databázemi (MySQL, PostgreSQL, SQLite, MSSQL) — dotazování, vkládání, úprava a mazání dat

---

## Základní příkazy

| Skupina                      | Příkazy                                | Účel              |
| ---------------------------- | -------------------------------------- | ----------------- |
| Data Manipulation Language   | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | manipulace s daty |
| Data Definition Language     | `CREATE`, `ALTER`, `DROP`              | definice struktur |
| Data Control Language        | `GRANT`, `REVOKE`                      | oprávnění         |
| Transaction Control Language | `COMMIT`, `ROLLBACK`                   | transakce         |

---

## SELECT

#### Základní způsob zápisu
```sql
SELECT * FROM <název tabulky>;
SELECT * FROM zamestnanci;

SELECT sloupec1, sloupec2 FROM <název tabulky>;
SELECT jmeno, prijmeni FROM zamestnanci;
-- * = výběr všech sloupců
```

#### Podmíněný SELECT — WHERE
```sql
SELECT * FROM <tabulka> WHERE <podmínka>;
SELECT * FROM zamestnanci WHERE mesto = 'Londýn';

-- Operátory: =, <, >, >=, <=, <>, !=
-- LIKE, NOT LIKE  →  % (libovolný počet znaků), _ (jeden znak)
-- IS NULL, IS NOT NULL
-- BETWEEN, IN
-- AND, NOT, OR

SELECT * FROM zamestnanci WHERE jmeno LIKE 'Jan%';
SELECT * FROM zamestnanci WHERE vek BETWEEN 20 AND 30;
SELECT * FROM zamestnanci WHERE mesto IN ('Praha', 'Brno');
```

#### Řazení dat — ORDER BY
```sql
SELECT * FROM <tabulka> ORDER BY <sloupec>;
SELECT * FROM zamestnanci ORDER BY mesto, prijmeni;

-- směr: ASC (vzestupně, výchozí), DESC (sestupně)
SELECT prijmeni FROM zamestnanci
WHERE mesto = 'Seattle'
ORDER BY prijmeni DESC;
```

#### Práce s atributy — AS, výpočty
```sql
-- alias AS — přejmenování sloupce ve výsledku
SELECT jmeno + ' ' + prijmeni AS celeJmeno
FROM zamestnanci;

-- matematické operace
SELECT nazev, (cena * (1 + dph)) AS cenaSdph
FROM zbozi;
```

#### Skupiny a agregace — GROUP BY, HAVING
```sql
-- GROUP BY — seskupí záznamy se stejnou hodnotou
SELECT jmeno, COUNT(id) FROM zamestnanci GROUP BY jmeno;

SELECT Country, Region, SUM(sales) AS TotalSales
FROM Sales
GROUP BY Country, Region;

-- Agregační funkce: min(), max(), sum(), avg(), count()
SELECT SUM(mnozstvi) AS [Celkem ks]
FROM rozpis WHERE cisloObjednavky = 10248;

-- HAVING — filtrování skupin (jako WHERE, ale po GROUP BY)
SELECT jmeno, COUNT(id) FROM zamestnanci
GROUP BY jmeno
HAVING COUNT(id) > 1;
```

#### Další klauzule
```sql
-- DISTINCT — pouze jedinečné řádky
SELECT DISTINCT jmeno FROM zamestnanci;

-- TOP — prvních X řádků (MS SQL)
SELECT TOP(10) * FROM objednavky;

-- LIMIT — prvních X řádků (MySQL, SQLite)
SELECT * FROM objednavky LIMIT 10;

-- SELECT INTO — výběr do nové tabulky (záloha)
SELECT * INTO zalohaOsob FROM seznamOsob;
```

---

## Vkládání a úprava dat

```sql
-- INSERT — vložení nového záznamu
INSERT INTO tabulka (sl1, sl2) VALUES ('X', 'Y');
INSERT INTO osoby (jmeno, prijmeni) VALUES ('Jan', 'Novák');

-- UPDATE — úprava dat
UPDATE tabulka SET sloupec='X' WHERE (sloupec<>'Y');
UPDATE osoby SET jmeno='Johan' WHERE id=10;

-- DELETE — smazání dat
DELETE FROM tabulka WHERE (sloupec='X');
DELETE FROM osoby WHERE id=80;
```

---

## Spojování tabulek (JOIN)

```sql
-- INNER JOIN — pouze záznamy se shodou v obou tabulkách
SELECT o.cisloObjednavky, p.firma
FROM objednavky o
INNER JOIN prepravci p ON o.preprava = p.cisloPrepravce;

-- LEFT JOIN  — vše z levé tabulky + shody z pravé (NULL kde není shoda)
-- RIGHT JOIN — vše z pravé tabulky + shody z levé
-- FULL JOIN  — vše z obou tabulek
```

```
INNER JOIN     LEFT JOIN      RIGHT JOIN     FULL JOIN
  A ∩ B         A + A∩B        B + A∩B        A + B
```

---

## Poddotaz

SELECT uvnitř jiného SELECT:

```sql
-- zaměstnanci s platem nad průměrem
SELECT jmeno, plat FROM osoby
WHERE plat > (SELECT AVG(plat) FROM osoby);
```

#### Klauzule WITH — čitelnější alternativa k poddotazu

WITH vytvoří dočasný pojmenovaný výsledek — stejný dotaz, ale přehledněji:

```sql
-- Ekvivalent s WITH (přehledněji):
WITH PrumernyPlat AS (
    SELECT AVG(plat) AS avg_plat FROM osoby
)
SELECT jmeno, plat FROM osoby, PrumernyPlat
WHERE plat > avg_plat;
```

---
