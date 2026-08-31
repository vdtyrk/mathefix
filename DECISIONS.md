# Entscheidungen

| Datum | Entscheidung | Warum / Alternativen |
|---|---|---|
| 31.08. | Basis = Git `d419e71`, nicht der Live-Build | Beide funktional identisch (verifiziert); Git-Stand ist die einzige zugängliche Quelle, Cowork-Rechner offline. |
| 31.08. | Bundle auftrennen statt weiter minifiziert editieren | Wartbarkeit; kein Build-Schritt nötig (kein Node am Mac). Alt-Code behält minifizierte Namen (Umbenennen ohne AST-Tooling zu riskant), neuer Code deutsch. |
| 31.08. | Eingebettete Fallback-Daten entfernt | 257 KB Duplikat der data/*.json; zwei Wahrheiten = Fehlerquelle. App zeigt bei Ladefehler eine klare Meldung. |
| 31.08. | Schwere-Modell: Übergang +60, Größe ÷2 | Reines Größenmodell stufte 96+2 schwerer ein als 38−9. Übergang dominiert jetzt; Ketten Basis 130 → immer am Ende. |
| 31.08. | Baukasten-Treppenform mit getippten Zwischenergebnissen | Patron-Skizze (Chat 31.08.): „7+5 untereinander … neben der 5 ein = wo der Anwender tippt … die 4 unter dem Ergebnisblock 12". |
| 31.08. | Zwischenergebnisse validieren live (grün/orange), Endergebnis zählt für Sterne | Zwischenfelder sind Lernhilfe, keine zweite Bewertungsebene. |
| 31.08. | Bausteine = Zahlen aus dem Text, fehlende Rechenweg-Zahlen ergänzt | 10 von 360 Aufgaben haben eine Rechenweg-Zahl, die nicht wörtlich im Text steht (z. B. „je zwei" → 2); ohne Ergänzung wäre das Kästchen unfüllbar. |
| 31.08. | Bei Plus/Mal beide Reihenfolgen als richtig werten | Kommutativgesetz; 7+5 statt 5+7 ist kein Fehler. |
| 31.08. | Sterne neu 3/2/1 nach Versuch (0 aufgedeckt) | Alte Staffel (3/2/1 mit Hinweis-Malus) passt nicht zur neuen Logik, in der der Tipp schon nach Fehler 1 kommt. |
