# Deník

## 27. 7.
### Změny
- Funkční filtry

## 26. 7.
### Změny
- Vytvoření dokumentace pomocí jsdoc

## 25. 7.
### Vyřešené problémy
- Mizející práva plánovacího administrátora - přiřazení role Zdeňce Šimečkové v systemdata.hk2026.json

## 23. 7.
### Změny
- Vypsání podudálostí v detailu události

## 21. 7.
### Změny
- Více polí u mutací
- Z části funkční filtr

### Problémy
- Nastavení startdate a enddate u create (nastavení 1. 1. 1970 místo aktuálního času - nelze ani zadat vlastní)

## 9. 7.
### Změny
- Přidán form-control
- Upravení tlačítka pro vytvoření nové události na listu (zarovnání vlevo, zvětšení mezer mezi tlačítkem filtru a vypsanými událostmi, změna textu)

## 30. 6.
### Změny
- Ve výpisu událostí následující změny:
    - Přidáno tlačítko pro vytvoření události
    - Výpis typu eventu

- V detailu události následující změny:
    - Začátek a konec vypisuje i čas
    - Vypsání pozvaných uživatelů
    - Vypsání typu eventu
    - Oprava překlepu

### K vyřešení
- V mutacích řešit i jiné atributy (např. facility)

## 29. 6.
### Změny
- Úhlednější výpis událostí

## 26. 6.
### Změny
- Aplikace běží na portu 33001 (upraveno package.json, aby správně fungovala aplikace na npm)

### Problémy k vyřešení
- Úhlednější výpis událostí (list)
- Přidat možnost vytvoření události na listu (vytváření nebude omezeno pouze na podudálosti)

### Objevy
- Na _uois překlep, který neumožňuje načtení CSS na portu 33001

## 1. 6.
### Změny
- Mutace create a update
- Úprava souborů pro opravu routování na /event

### Problémy k vyřešení
- Zadání data začátku a konce uživatelem (zjednodušení MediumEditableContent.jsx)
- Změna času +2 hod
- Filtr
- Mizející práva plánovacího administrátora

## 20. 5.
### Změny
- Live update patch

## 13. 5.
### Změny
- Mutace update
- Přidání role plánovacího administrátora
- Úprava queries pro mutace

### Problémy k vyřešení
- Zprovoznit mutaci create a delete
- Rozbité routování na /event

## 13. 4.
### Změny
- Vytvoření aplikace app_event
- Vytvoření balíčku pkg-event
- Úprava Fragments.jsx
- Úprava MediumContent.jsx pro zobrazení obsahu

### Problémy k vyřešení
- Zobrazení skalárních a vektorových atributů

### Objevy
- Podmínky pro zobrazení atributů, pokud existují

### Problémy
- Dotazy na atributy jiných entit (např. jméno uživatele a ne pouze jeho id)
