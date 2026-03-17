# Földrengések API – Példa kérések

Base URL: `http://localhost:3000`

---

## 1. GET /rengesek/telepulesek/:varmegye

Visszaadja a megadott vármegye települései nevét ábécérendben.

```http
GET http://localhost:3000/rengesek/telepulesek/Veszprém
```

**Válasz (200 OK):**

```json
[
  "Balatonfűzfő",
  "Berhida",
  "Csót",
  "Döbrönte",
  "Ganna",
  "Hárskút",
  "Magyarpolány",
  "Pápa",
  "Pápasalamon",
  "Várpalota",
  "Vilonya"
]
```

---

## 2. GET /rengesek/varmegye/statisztika

Visszaadja, hogy az egyes vármegyékhez hány feljegyzett földrengés tartozik, csökkenő sorrendben.

```http
GET http://localhost:3000/rengesek/varmegye/statisztika
```

**Válasz (200 OK):**

```json
[
  { "varmegye": "Nógrád", "db": 20 },
  { "varmegye": "Borsod-Abaúj-Zemplén", "db": 20 },
  { "varmegye": "Pest", "db": 18 },
  ...
]
```

---

## 3. GET /rengesek/intenzitas

Visszaadja azt a 3 évet, amikor a legtöbb 3,0-nál nagyobb intenzitású földrengés volt.

```http
GET http://localhost:3000/rengesek/intenzitas
```

**Válasz (200 OK):**

```json
[
  { "ev": "2013", "db": 20 },
  { "ev": "2003", "db": 15 },
  { "ev": "2010", "db": 14 }
]
```

---

## 4. POST /rengesek/uj

Új földrengést rögzít az adatbázisba.

```http
POST http://localhost:3000/rengesek/uj
Content-Type: application/json

{
  "datum": "2026.03.12.",
  "ido": "20:45:51",
  "telepules": "Kishuta",
  "varmegye": "Borsod-Abaúj-Zemplén",
  "magnitudo": 1.6,
  "intenzitas": 3.5
}
```

**Válasz (201 Created):**

```json
{
  "message": "Földrengés sikeresen rögzítve",
  "id": 174
}
```

**Hiányzó adat esetén (400 Bad Request):**

```json
{
  "message": "Hiányzó adatok."
}
```
