# Architektur

**Stack:** Vanilla JS (klassisches Skript, kein Build, kein Node), reine PWA. Lokal testen: `python3 -m http.server 8340` im Projektordner (Browser-Preview `mathefix` in `~/Claude/.claude/launch.json`).

```
index.html            Gerüst (lädt css/app.css + js/app.js)
css/app.css           komplettes Styling (dunkles Design, Gruppenfarben A–L)
js/app.js             gesamte App-Logik (aus dem Vite-Bundle zurückgewonnen;
                      Alt-Code trägt minifizierte Namen, neuer Code deutsche Namen)
data/aufgaben.json    360 Textaufgaben (12 Gruppen × 3 Blöcke × 10), einzige Quelle
data/rechenblatt_regeln.json   Generator-Regeln pro Gruppe (15 Aufgaben/Blatt)
data/motivation.json  Motivationstexte pro Situation ({name}-Platzhalter)
sw.js                 Service Worker (Netz zuerst, Cache-Fallback), CACHE-Version pflegen!
tests.html            Logiktests im Browser (http://localhost:8340/tests.html)
```

**Ablauf:** `si()` (ganz unten in app.js) lädt Daten → baut App-Objekt (`stand`, `tts`, `toene`, `zeige`) → Router `zeige({name})`: profile / levelkarte / block / pause / auswertung / rechenblatt / uebung / journal / eltern.

**Wichtige Module in js/app.js** (minifizierte Alt-Namen):
- `Gn` Versuchslogik (1 Fehler→Tipp, 3→aufgedeckt) · `ge` Sterne (3/2/1/0)
- `Pe` Aufgaben-Bildschirm (bindet Baukasten + Illustration ein)
- `Un` Rechenblatt-Generator (sortiert leicht→schwer), `$n` einfache Aufgabe, `Vn`/`On` Ketten
- **Neu (deutsche Namen):** `rechenwegParsen`, `rechenwegSchritte`, `schritteSindKette`, `bausteinZahlen`, `baukastenBauen` (liefert `{element, steuerung}`), `illustrationBauen`
- Speicher: `localStorage` Schlüssel `mathefix.v1`; Export/Import im Elternbereich

**Deployment-Lage:** Live-URL start.mathefix.here.now kann nur aus der Cowork-Session (anderer Rechner) deployt werden. `main` auf GitHub = Umzugs-Weiterleitung. Alternative: GitHub Pages wieder aktivieren, wenn Cowork unerreichbar bleibt.
