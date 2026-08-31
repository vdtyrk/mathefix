var Te = Object.defineProperty;
var Fe = (e, n, i) => n in e ? Te(e, n, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: i
}) : e[n] = i;
var W = (e, n, i) => Fe(e, typeof n != "symbol" ? n + "" : n, i);
// (Vite-Preload-Polyfill entfernt — App lädt als klassisches Skript)

// (Eingebettete Fallback-Daten entfernt — einzige Datenquelle ist data/*.json)
async function re(e) {
  const n = await fetch(e);
  if (!n.ok) throw new Error(`${e} konnte nicht geladen werden (${n.status}).`);
  return await n.json()
}
async function kn() {
  const [e, n, i] = await Promise.all([re("data/aufgaben.json"), re("data/rechenblatt_regeln.json"), re("data/motivation.json")]);
  if (!Array.isArray(e) || e.length === 0) throw new Error("data/aufgaben.json ist leer oder kein Array.");
  return {
    aufgaben: e,
    regeln: n,
    motivation: i
  }
}

function be(e) {
  for (const n of e.kinder) {
    n.auswertungFaellig ?? (n.auswertungFaellig = null), n.pauseNachRechenblattFaellig ?? (n.pauseNachRechenblattFaellig = !1), n.serie ?? (n.serie = {
      letzterTag: null,
      tage: 0
    });
    for (const i of n.rechenblaetter) i.block ?? (i.block = i.gruppe + "c")
  }
  return e
}
const bn = "mathefix.v1";
class fn {
  constructor(n = bn) {
    this.schluessel = n
  }
  laden() {
    try {
      const n = localStorage.getItem(this.schluessel);
      if (!n) return null;
      const i = JSON.parse(n);
      return i.version === 1 ? i : null
    } catch {
      return null
    }
  }
  speichern(n) {
    try {
      localStorage.setItem(this.schluessel, JSON.stringify(n))
    } catch {
      console.error("Mathefix: Fortschritt konnte nicht gespeichert werden.")
    }
  }
}

function pn(e) {
  return JSON.stringify({
    mathefixExport: 1,
    stand: e
  }, null, 2)
}

function wn(e) {
  const n = JSON.parse(e);
  if (n.mathefixExport !== 1 || !n.stand || n.stand.version !== 1) throw new Error("Das ist keine gültige Mathefix-Exportdatei.");
  return n.stand
}
const G = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

function ce(e) {
  return e <= "F" ? 1 : 2
}
const le = {
    A: "Plus & Minus",
    B: "+ − und Mal",
    C: "+ − × ÷",
    D: "Alles gemischt",
    E: "Geld",
    F: "Zeit, Längen & Gewicht",
    G: "Plus & Minus – Profi",
    H: "+ − und Mal – Profi",
    I: "+ − × ÷ – Profi",
    J: "Alles gemischt – Profi",
    K: "Geld – Profi",
    L: "Zeit, Längen & Gewicht – Profi"
  },
  x = {
    A: "#22D3EE",
    B: "#A3E635",
    C: "#F472B6",
    D: "#FB923C",
    E: "#A78BFA",
    F: "#FACC15",
    G: "#22D3EE",
    H: "#A3E635",
    I: "#F472B6",
    J: "#FB923C",
    K: "#A78BFA",
    L: "#FACC15"
  };

function fe(e) {
  return e.replaceAll("*", "×").replaceAll("/", ":")
}

function zn() {
  return {
    version: 1,
    kinder: [],
    eltern: {
      pinHash: null,
      pinSalt: pe(),
      pausenMinuten: 1,
      spracheAn: !0,
      tempo: "normal",
      soundsAn: !0
    },
    aktivesKindId: null
  }
}

function pe() {
  const e = new Uint8Array(8);
  return crypto.getRandomValues(e), [...e].map(n => n.toString(16).padStart(2, "0")).join("")
}

function Sn(e, n) {
  return {
    id: pe(),
    name: e,
    avatar: n,
    angelegtAm: new Date().toISOString(),
    laufenderBlock: null,
    durchgaenge: [],
    rechenblaetter: [],
    gruppenAbschluesse: [],
    journal: [],
    pauseBisTs: null,
    pauseNachRechenblattFaellig: !1,
    auswertungFaellig: null,
    serie: {
      letzterTag: null,
      tage: 0
    }
  }
}

function ue(e, n) {
  return e.kinder.find(i => i.id === n) ?? null
}

function ae(e = new Date) {
  const n = e.getFullYear(),
    i = String(e.getMonth() + 1).padStart(2, "0"),
    t = String(e.getDate()).padStart(2, "0");
  return `${n}-${i}-${t}`
}

function we(e, n = ae()) {
  if (e.serie.letzterTag === n) return;
  const i = new Date(n + "T12:00:00");
  i.setDate(i.getDate() - 1);
  const t = ae(i);
  e.serie.tage = e.serie.letzterTag === t ? e.serie.tage + 1 : 1, e.serie.letzterTag = n
}

function O(e, n) {
  for (let i = e.durchgaenge.length - 1; i >= 0; i--)
    if (e.durchgaenge[i].block === n) return e.durchgaenge[i];
  return null
}

function ne(e, n) {
  return O(e, n) !== null
}

function J(e, n) {
  let i = 0;
  for (const t of e.durchgaenge) t.block === n && t.sterne > i && (i = t.sterne);
  return i
}

function ze(e) {
  let n = 0;
  for (const i of ve()) n += J(e, i);
  return n
}

function ie(e, n) {
  return e.rechenblaetter.some(i => i.block === n)
}

function Se(e, n) {
  let i = null;
  for (const t of e.rechenblaetter) t.block === n && (i === null || t.ergebnis > i) && (i = t.ergebnis);
  return i
}

function ve() {
  const e = [];
  for (const n of G)
    for (const i of ["a", "b", "c"]) e.push(n + i);
  return e
}
async function Ee(e, n) {
  const i = new TextEncoder().encode(n + ":" + e),
    t = await crypto.subtle.digest("SHA-256", i);
  return [...new Uint8Array(t)].map(a => a.toString(16).padStart(2, "0")).join("")
}
async function Ae(e, n) {
  if (!/^\d{4}$/.test(n)) throw new Error("Die PIN muss aus genau 4 Ziffern bestehen.");
  e.pinHash = await Ee(n, e.pinSalt)
}
async function De(e, n) {
  return e.pinHash === null ? !1 : await Ee(n, e.pinSalt) === e.pinHash
}
class vn {
  constructor(n, i = Math.random) {
    W(this, "letzterIndex", {});
    this.texte = n, this.rng = i
  }
  hole(n, i) {
    const t = this.texte[n] ?? [];
    if (t.length === 0) return "";
    let a = Math.floor(this.rng() * t.length);
    return t.length > 1 && a === this.letzterIndex[n] && (a = (a + 1) % t.length), this.letzterIndex[n] = a, t[a].replaceAll("{name}", i)
  }
}
class En {
  constructor() {
    W(this, "aktiv", !0);
    W(this, "tempo", "normal");
    W(this, "stimme", null);
    W(this, "verfuegbar", typeof speechSynthesis < "u");
    this.verfuegbar && (this.stimmeWaehlen(), speechSynthesis.addEventListener?.("voiceschanged", () => this.stimmeWaehlen()))
  }
  stimmeWaehlen() {
    const n = speechSynthesis.getVoices();
    this.stimme = n.find(i => i.lang.toLowerCase().startsWith("de-at")) ?? n.find(i => i.lang.toLowerCase().startsWith("de-de")) ?? n.find(i => i.lang.toLowerCase().startsWith("de")) ?? null
  }
  deutscheStimmeGefunden() {
    return this.verfuegbar ? (this.stimme || this.stimmeWaehlen(), this.stimme !== null) : !1
  }
  sprich(n) {
    if (!this.aktiv || !this.verfuegbar || !n) return;
    speechSynthesis.cancel();
    const i = new SpeechSynthesisUtterance(n);
    i.lang = this.stimme?.lang ?? "de-DE", this.stimme && (i.voice = this.stimme), i.rate = this.tempo === "langsam" ? .82 : 1, speechSynthesis.speak(i)
  }
  stopp() {
    this.verfuegbar && speechSynthesis.cancel()
  }
}
class An {
  constructor() {
    W(this, "aktiv", !0);
    W(this, "ctx", null)
  }
  kontext() {
    if (!this.aktiv) return null;
    try {
      return this.ctx ?? (this.ctx = new AudioContext), this.ctx.state === "suspended" && this.ctx.resume(), this.ctx
    } catch {
      return null
    }
  }
  ton(n, i, t, a = "sine", s = .18) {
    const l = this.kontext();
    if (!l) return;
    const c = l.createOscillator(),
      u = l.createGain();
    c.type = a, c.frequency.value = n;
    const d = l.currentTime + i;
    u.gain.setValueAtTime(0, d), u.gain.linearRampToValueAtTime(s, d + .015), u.gain.exponentialRampToValueAtTime(.001, d + t), c.connect(u).connect(l.destination), c.start(d), c.stop(d + t + .05)
  }
  richtig() {
    this.ton(523, 0, .14), this.ton(784, .1, .2)
  }
  falsch() {
    this.ton(196, 0, .2, "triangle", .14)
  }
  blockFertig() {
    [523, 659, 784, 1047].forEach((n, i) => this.ton(n, i * .12, .22))
  }
  pauseEnde() {
    this.ton(880, 0, .15), this.ton(880, .25, .3)
  }
}

function r(e, n = {}, ...i) {
  const t = document.createElement(e);
  for (const [a, s] of Object.entries(n)) typeof s == "function" ? t.addEventListener(a.replace(/^on/, ""), s) : a === "class" ? t.className = s : t.setAttribute(a, s);
  for (const a of i) a != null && t.append(typeof a == "string" ? document.createTextNode(a) : a);
  return t
}

function C(e, n = "") {
  const i = document.createElement("span");
  return n && (i.className = n), i.innerHTML = e, i
}
const Dn = '<svg class="logo-blitz" viewBox="0 0 34 34" aria-hidden="true"><polygon points="19,2 6,20 16,20 13,32 28,13 18,13 22,2" fill="#A3E635"/></svg>';

function Ke() {
  const e = r("div", {
    class: "logo"
  });
  return e.append(C(Dn)), e.append("MATHE"), e.append(r("b", {}, "FIX")), e
}

function Be(e, n = 3) {
  return "★".repeat(e) + "☆".repeat(Math.max(0, n - e))
}

function ye(e = 28) {
  const n = r("div", {
      class: "konfetti-regen",
      "aria-hidden": "true"
    }),
    i = ["#22D3EE", "#A3E635", "#F472B6", "#FB923C", "#A78BFA", "#FACC15"];
  for (let t = 0; t < e; t++) n.append(r("i", {
    style: `left:${(Math.random()*100).toFixed(1)}%;background:${i[t%i.length]};animation-delay:${(Math.random()*.9).toFixed(2)}s;animation-duration:${(1.7+Math.random()*1.2).toFixed(2)}s;transform:rotate(${Math.floor(Math.random()*360)}deg)`
  }));
  return n
}

function Me(e) {
  const n = r("div", {
      class: "modal-hintergrund"
    }),
    i = r("div", {
      class: "modal"
    });
  return i.append(e), n.append(i), document.body.append(n), {
    schliessen: () => n.remove()
  }
}

function L(e, n = "") {
  return new Promise(i => {
    let t = "";
    const a = r("div", {
        class: "pin-anzeige"
      }),
      s = () => {
        a.replaceChildren(...[0, 1, 2, 3].map(o => r("span", {
          class: "pin-punkt" + (o < t.length ? " voll" : "")
        })))
      };
    s();
    const l = r("div", {});
    l.append(r("h3", {}, e)), n && l.append(r("p", {
      class: "hinweis-leise"
    }, n)), l.append(a);
    const c = r("div", {
        class: "zahlenfeld"
      }),
      u = (o, m, f) => c.append(r("button", {
        class: m,
        onclick: f
      }, o));
    for (const o of ["7", "8", "9", "4", "5", "6", "1", "2", "3"]) u(o, "", () => {
      t.length < 4 && (t += o), s()
    });
    u("⌫", "", () => {
      t = t.slice(0, -1), s()
    }), u("0", "", () => {
      t.length < 4 && (t += "0"), s()
    }), u("✔", "los", () => {
      t.length === 4 && (g.schliessen(), h(), i(t))
    }), l.append(c), l.append(r("div", {
      style: "margin-top:12px;text-align:right"
    }, r("button", {
      class: "knopf leise",
      onclick: () => {
        g.schliessen(), h(), i(null)
      }
    }, "Abbrechen")));
    const d = o => {
        if (/^\d$/.test(o.key) && t.length < 4) t += o.key;
        else if (o.key === "Backspace") t = t.slice(0, -1);
        else if (o.key === "Enter" && t.length === 4) {
          g.schliessen(), h(), i(t);
          return
        } else return;
        s()
      },
      h = () => window.removeEventListener("keydown", d);
    window.addEventListener("keydown", d);
    const g = Me(l)
  })
}
const de = ["🤖", "🦊", "🐯", "🚀", "⚽", "🐺", "🎮", "🦅", "🐉", "🏀"];

function se(e) {
  const n = r("div", {
      class: "schirm"
    }),
    i = r("div", {
      class: "kopf"
    });
  i.append(Ke()), n.append(i), n.append(r("p", {
    class: "hinweis-leise"
  }, "Wer übt heute? Profil antippen."));
  const t = r("div", {
    class: "profil-gitter"
  });
  for (const a of e.stand.kinder) t.append(r("button", {
    class: "profil-knopf",
    onclick: () => {
      e.stand.aktivesKindId = a.id, e.speichern(), e.tts.sprich(e.motivation.hole("begruessung", a.name)), a.pauseBisTs && a.pauseBisTs > Date.now() ? e.zeige({
        name: "pause",
        danach: {
          name: "levelkarte"
        }
      }) : e.zeige({
        name: "levelkarte"
      })
    }
  }, r("span", {
    class: "profil-avatar"
  }, a.avatar), a.name));
  t.append(r("button", {
    class: "profil-knopf",
    onclick: () => Kn(e)
  }, r("span", {
    class: "profil-avatar"
  }, "＋"), "Neues Profil")), n.append(t), e.wurzel.replaceChildren(n)
}

function Kn(e) {
  let n = de[0];
  const i = r("input", {
      class: "feld",
      maxlength: "20",
      placeholder: "z. B. Aslan"
    }),
    t = r("div", {
      class: "avatar-wahl"
    }),
    a = () => {
      t.replaceChildren(...de.map(c => r("button", {
        class: c === n ? "gewaehlt" : "",
        onclick: () => {
          n = c, a()
        }
      }, c)))
    };
  a();
  const s = r("div", {});
  s.append(r("h3", {}, "Neues Profil")), s.append(r("label", {}, "Name")), s.append(i), s.append(r("label", {}, "Avatar")), s.append(t), s.append(r("div", {
    style: "display:flex;gap:8px;justify-content:flex-end;margin-top:14px"
  }, r("button", {
    class: "knopf leise",
    onclick: () => l.schliessen()
  }, "Abbrechen"), r("button", {
    class: "knopf primaer",
    onclick: () => {
      const c = i.value.trim();
      c && (e.stand.kinder.push(Sn(c, n)), e.speichern(), l.schliessen(), se(e))
    }
  }, "Anlegen")));
  const l = Me(s);
  i.focus()
}

function Bn() {
  const e = [];
  for (const n of G)
    for (const i of ["a", "b", "c"]) e.push({
      id: n + i,
      art: "block",
      gruppe: n,
      block: n + i
    }), e.push({
      id: "RB-" + n + i,
      art: "rechenblatt",
      gruppe: n,
      block: n + i
    });
  return e
}

function oe(e, n) {
  return n.art === "block" ? ne(e, n.block) : ie(e, n.block)
}

function he(e, n) {
  let i = 0;
  for (const t of ["a", "b", "c"]) i += O(e, n + t)?.richtig ?? 0;
  return i
}

function U(e, n) {
  return he(e, n) >= 15
}

function Ze(e, n) {
  return ["a", "b", "c"].every(i => ne(e, n + i) && ie(e, n + i))
}

function X(e, n) {
  return Ze(e, n) && U(e, n)
}

function Ne(e, n) {
  let i = n + "a",
    t = 1 / 0;
  for (const a of ["a", "b", "c"]) {
    const s = O(e, n + a)?.richtig ?? 0;
    s < t && (t = s, i = n + a)
  }
  return i
}

function q(e, n) {
  const i = Bn(),
    t = i.findIndex(s => s.id === n);
  if (t < 0) return !1;
  const a = i[t];
  if (oe(e, a)) return !0;
  for (let s = 0; s < t; s++)
    if (!oe(e, i[s])) return !1;
  for (const s of G) {
    if (s === a.gruppe) break;
    if (!X(e, s)) return !1
  }
  return !0
}

function yn(e, n) {
  return e.aufgaben.filter(i => i.block === n).sort((i, t) => i.nr - t.nr)
}

function V(e, n) {
  return e.aufgaben.find(i => i.id === n) ?? null
}

function N(e) {
  return `Block ${{a:1,b:2,c:3}[e[1]]}`
}

function Mn(e) {
  const n = e.kind(),
    i = r("div", {
      class: "schirm"
    }),
    t = e.aufgaben.length * 3,
    a = r("div", {
      class: "kopf"
    });
  a.append(Ke());
  const s = r("div", {
    class: "rechts"
  });
  if (s.append(r("span", {
      class: "gruppe-sterne"
    }, `★ ${ze(n)} / ${t}`)), n.serie.tage >= 2 && s.append(r("span", {}, `🔥 ${n.serie.tage} Tage`)), s.append(r("button", {
      class: "knopf leise",
      onclick: () => e.zeige({
        name: "journal"
      })
    }, "📒"), r("button", {
      class: "knopf leise",
      onclick: () => e.zeige({
        name: "eltern"
      })
    }, "🔒 Eltern"), r("button", {
      class: "knopf leise",
      title: "Profil wechseln",
      onclick: () => e.zeige({
        name: "profile"
      })
    }, n.avatar)), a.append(s), i.append(a), n.auswertungFaellig) {
    const c = n.auswertungFaellig;
    i.append(r("div", {
      class: "banner"
    }, `Deine Auswertung für Gruppe ${c} ist fertig! `, r("button", {
      class: "knopf primaer",
      onclick: () => e.zeige({
        name: "auswertung",
        gruppe: c
      })
    }, "Ansehen")))
  } else
    for (const c of G)
      if (Ze(n, c) && !U(n, c)) {
        const u = Ne(n, c);
        i.append(r("div", {
          class: "banner"
        }, `${N(u)} von Gruppe ${c} nochmal – dann ist die Gruppe komplett.`));
        break
      } let l = 0;
  for (const c of G) ce(c) !== l && (l = ce(c), i.append(r("div", {
    class: "modul-titel"
  }, l === 1 ? "Modul 1" : "Modul 2 – die Profi-Runde"))), i.append(Zn(e, c));
  e.wurzel.replaceChildren(i)
}

function Zn(e, n) {
  const i = e.kind(),
    t = x[n],
    a = ["a", "b", "c"].some(d => q(i, n + d) || q(i, "RB-" + n + d)),
    s = r("div", {
      class: "karte gruppe-karte" + (a ? "" : " gesperrt-gruppe"),
      style: `--gfarbe:${t}`
    }),
    l = ["a", "b", "c"].reduce((d, h) => d + J(i, n + h), 0),
    c = r("div", {
      class: "gruppe-kopf"
    });
  c.append(r("div", {
    class: "gruppe-tag"
  }, n)), c.append(r("div", {
    class: "gruppe-name"
  }, le[n])), X(i, n) && c.append(r("span", {
    class: "abzeichen",
    title: "Abzeichen"
  }, "🏅")), c.append(r("span", {
    class: "gruppe-sterne"
  }, `★ ${l} / 90`)), s.append(c);
  const u = r("div", {
    class: "kachel-reihe"
  });
  for (const d of ["a", "b", "c"]) {
    const h = n + d,
      g = q(i, h),
      o = ne(i, h),
      m = r("div", {
        class: "kachel" + (o ? " fertig" : "") + (g && !o ? " aktiv" : "") + (g ? "" : " gesperrt"),
        onclick: () => {
          g && Nn(e, h)
        }
      });
    if (m.append(N(h)), m.append(r("br", {})), o) {
      const f = Math.round(J(i, h) / 10);
      m.append(r("span", {
        class: "sterne"
      }, Be(Math.min(3, f)) + ` ${J(i,h)}`))
    } else m.append(r("span", {
      class: "sterne"
    }, g ? "▶ weiter" : "🔒"));
    u.append(m)
  }
  for (const d of ["a", "b", "c"]) {
    const h = n + d,
      g = q(i, "RB-" + h),
      o = Se(i, h),
      m = r("div", {
        class: "kachel" + (o !== null ? " fertig" : "") + (g && o === null ? " aktiv" : "") + (g ? " " : " gesperrt"),
        onclick: () => {
          g && (e.kind().auswertungFaellig === n ? e.zeige({
            name: "auswertung",
            gruppe: n
          }) : e.zeige({
            name: "rechenblatt",
            block: h
          }))
        }
      });
    m.append(`Blatt ${{a:1,b:2,c:3}[d]}`), m.append(r("br", {})), m.append(r("span", {
      class: "sterne"
    }, o !== null ? `${o}/15` : g ? "▶ los" : "🔒")), u.append(m)
  }
  return s.append(u), s
}

function Nn(e, n) {
  const i = e.kind();
  if (i.pauseBisTs && i.pauseBisTs > Date.now()) {
    e.zeige({
      name: "pause",
      danach: {
        name: "block",
        block: n
      }
    });
    return
  }
  if (i.pauseNachRechenblattFaellig) {
    i.pauseNachRechenblattFaellig = !1, i.pauseBisTs = Date.now() + e.stand.eltern.pausenMinuten * 6e4, e.speichern(), e.zeige({
      name: "pause",
      danach: {
        name: "block",
        block: n
      }
    });
    return
  }
  e.zeige({
    name: "block",
    block: n
  })
}

function Wn() {
  return {
    versuche: 0,
    falscheEingaben: [],
    hinweisSichtbar: !1,
    geloest: !1,
    aufgedeckt: !1
  }
}

// Versuchslogik (Patron-Vorgabe 31.08.2026): 1. Fehler → Rechentipp,
// 3. Fehler → Aufgabe wird aufgedeckt und illustrativ erklärt.
function Gn(e, n, i) {
  return e.geloest || e.aufgedeckt ? e.geloest ? "richtig" : "aufgedeckt" : (e.versuche++, i === n.antwort ? (e.geloest = !0, "richtig") : (e.falscheEingaben.push(i), e.versuche === 1 ? (e.hinweisSichtbar = !0, "hinweis") : e.versuche >= 3 ? (e.aufgedeckt = !0, "aufgedeckt") : "falsch"))
}

// Sterne: 1. Versuch = 3★, 2. Versuch = 2★, 3. Versuch = 1★, aufgedeckt = 0
function ge(e) {
  return e.geloest ? e.versuche === 1 ? 3 : e.versuche === 2 ? 2 : 1 : 0
}

function We(e) {
  const n = r("div", {
      class: "zahlenfeld"
    }),
    i = (t, a, s) => n.append(r("button", {
      class: a,
      type: "button",
      onclick: s
    }, t));
  for (const t of ["7", "8", "9", "4", "5", "6", "1", "2", "3"]) i(t, "", () => e.ziffer(t));
  return i("⌫", "", () => e.loeschen()), i("0", "", () => e.ziffer("0")), i("✔", "los", () => e.ok()), n
}

function Ge(e) {
  const n = i => {
    i.target instanceof HTMLInputElement || (/^\d$/.test(i.key) ? e.ziffer(i.key) : i.key === "Backspace" ? e.loeschen() : i.key === "Enter" && e.ok())
  };
  return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n)
}
const Rn = {
  froh: '<path d="M32 54 q11 8 22 0" stroke="#A3E635" stroke-width="3" fill="none" stroke-linecap="round"/>',
  jubel: '<path d="M31 52 q12 12 24 0" stroke="#A3E635" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
  neutral: '<line x1="34" y1="55" x2="52" y2="55" stroke="#A3E635" stroke-width="3" stroke-linecap="round"/>',
  denkt: '<path d="M34 56 q9 -6 18 0" stroke="#FACC15" stroke-width="3" fill="none" stroke-linecap="round"/>'
};

function $(e = "froh", n = 86) {
  const i = e === "denkt" ? "#FACC15" : "#A3E635";
  return `
  <svg width="${n}" height="${Math.round(n*1.12)}" viewBox="0 0 86 96" aria-hidden="true">
    <defs><filter id="fixglow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <line x1="43" y1="6" x2="43" y2="18" stroke="#22D3EE" stroke-width="3"/>
    <circle cx="43" cy="5" r="4" fill="${i}" filter="url(#fixglow)"/>
    <rect x="13" y="18" width="60" height="46" rx="16" fill="#1C2445" stroke="#22D3EE" stroke-width="3"/>
    <rect x="21" y="30" width="44" height="18" rx="9" fill="#0B1020"/>
    <rect x="27" y="35" width="10" height="8" rx="3" fill="#22D3EE" filter="url(#fixglow)"/>
    <rect x="49" y="35" width="10" height="8" rx="3" fill="#22D3EE" filter="url(#fixglow)"/>
    ${Rn[e]}
    <rect x="25" y="66" width="36" height="24" rx="8" fill="#151B33" stroke="#2A3563" stroke-width="2"/>
    <rect x="5" y="70" width="18" height="8" rx="4" fill="#22D3EE"/>
    <rect x="63" y="70" width="18" height="8" rx="4" fill="#22D3EE"/>
  </svg>`
}

function Pn(e, n) {
  const i = e.kind(),
    t = ae(),
    a = i.laufenderBlock;
  if (a && (a.block !== n || a.tag !== t)) {
    const l = a.eintraege.filter(c => c.richtig).length;
    a.eintraege.length > 0 && i.journal.push({
      datum: new Date().toISOString(),
      typ: "block",
      text: `${N(a.block)} (Gruppe ${a.block[0]}) abgebrochen: ${l} von ${a.eintraege.length} bearbeiteten Aufgaben gelöst.`
    }), i.laufenderBlock = null
  }
  i.laufenderBlock ?? (i.laufenderBlock = {
    block: n,
    tag: t,
    eintraege: []
  }), e.speichern();
  const s = yn(e, n);
  Re(e, s, n)
}

function Re(e, n, i) {
  const a = e.kind().laufenderBlock?.eintraege.length ?? 0;
  if (a >= n.length) {
    jn(e, i);
    return
  }
  Pe(e, n[a], {
    titel: `${i[0]} · ${N(i)} · Aufgabe ${a+1} / ${n.length}`,
    fortschritt: {
      geschafft: a,
      gesamt: n.length
    },
    farbe: x[i[0]],
    zurueck: () => e.zeige({
      name: "levelkarte"
    }),
    fertig: s => {
      const l = e.kind().laufenderBlock;
      l && (l.eintraege.push(s), we(e.kind()), e.speichern()), Re(e, n, i)
    }
  })
}

function Tn(e, n) {
  const i = V(e, n);
  if (!i) {
    e.zeige({
      name: "levelkarte"
    });
    return
  }
  Pe(e, i, {
    titel: `Übung · Aufgabe ${i.id}`,
    farbe: x[i.gruppe],
    zurueck: () => e.zeige({
      name: "auswertung",
      gruppe: i.gruppe
    }),
    fertig: () => e.zeige({
      name: "auswertung",
      gruppe: i.gruppe
    })
  })
}

// ============================================================================
// Zahlen-Baukasten (Patron-Auftrag 31.08.2026)
// Unter jeder Textaufgabe: Bausteine mit den Zahlen aus der Geschichte,
// die in Kästchen UNTEREINANDER gezogen werden (wie beim schriftlichen
// Rechnen) – nur die linke Seite vom "=". Das Ergebnis tippt das Kind selbst.
// ============================================================================

// "50 - 4 * 8" → Baum unter Beachtung von Klammern und Punkt-vor-Strich
function rechenwegParsen(text) {
  const token = text.match(/\d+|[+\-*/()]/g) ?? [];
  let pos = 0;
  const schauen = () => token[pos] ?? null;
  const nehmen = () => token[pos++];

  function ausdruck() {
    let links = produkt();
    while (schauen() === "+" || schauen() === "-") {
      const op = nehmen();
      links = { art: "op", op, links, rechts: produkt() };
    }
    return links;
  }

  function produkt() {
    let links = wert();
    while (schauen() === "*" || schauen() === "/") {
      const op = nehmen();
      links = { art: "op", op, links, rechts: wert() };
    }
    return links;
  }

  function wert() {
    if (schauen() === "(") {
      nehmen();
      const innen = ausdruck();
      if (schauen() !== ")") throw new Error("Klammer fehlt");
      nehmen();
      return innen;
    }
    const z = nehmen();
    if (!/^\d+$/.test(z ?? "")) throw new Error("Zahl erwartet");
    return { art: "zahl", wert: Number(z) };
  }
  try {
    const baum = ausdruck();
    return pos === token.length ? baum : null;
  } catch {
    return null;
  }
}

// Baum → Schritte in Rechenreihenfolge. Operanden sind entweder
// {art:"zahl", wert} (Zahl aus der Geschichte, wird Zieh-Kästchen) oder
// {art:"schritt", index} (Zwischenergebnis eines früheren Schritts).
function rechenwegSchritte(baum) {
  const schritte = [];

  function ab(knoten) {
    if (knoten.art === "zahl") return { art: "zahl", wert: knoten.wert };
    const links = ab(knoten.links),
      rechts = ab(knoten.rechts);
    schritte.push({ op: knoten.op, links, rechts });
    return { art: "schritt", index: schritte.length - 1 };
  }
  ab(baum);
  const wertVon = o => o.art === "zahl" ? o.wert : schritte[o.index].ergebnis;
  for (const s of schritte) {
    const a = wertVon(s.links),
      b = wertVon(s.rechts);
    s.ergebnis = s.op === "+" ? a + b : s.op === "-" ? a - b : s.op === "*" ? a * b : a / b;
  }
  return schritte;
}

// Kettenform: jeder Folgeschritt rechnet mit dem Ergebnis davor weiter.
// Dann reicht die Spaltenform – eine Zahl pro Zeile untereinander.
function schritteSindKette(schritte) {
  return schritte.every((s, i) => i === 0 || s.links.art === "schritt" && s.links.index === i - 1);
}

// Bausteine: alle Zahlen aus Geschichte und Frage (inklusive Ablenker);
// fehlt eine Rechenweg-Zahl im Text, wird sie ergänzt, damit jedes
// Kästchen füllbar bleibt.
function bausteinZahlen(aufgabe) {
  const imText = (aufgabe.geschichte + " " + aufgabe.frage).match(/\d+/g) ?? [];
  const zahlen = [...new Set(imText.map(Number))];
  for (const z of (aufgabe.rechenweg?.match(/\d+/g) ?? []).map(Number)) zahlen.includes(z) || zahlen.push(z);
  return zahlen;
}
const OP_ZEICHEN = { "+": "+", "-": "−", "*": "×", "/": ":" };

function baukastenBauen(aufgabe) {
  const baum = aufgabe.rechenweg ? rechenwegParsen(aufgabe.rechenweg) : null;
  if (!baum) return null;
  const schritte = rechenwegSchritte(baum),
    kette = schritteSindKette(schritte),
    zahlen = bausteinZahlen(aufgabe);
  if (schritte.length === 0 || zahlen.length === 0) return null;

  const wurzel = r("div", { class: "baukasten" });
  wurzel.append(r("div", { class: "bk-titel" }, "🧩 Zieh die Zahlen aus der Geschichte in die Kästchen – dann rechne."));

  // --- Zieh-Bausteine (bleiben liegen, dürfen mehrfach benutzt werden) ---
  const chipsZeile = r("div", { class: "bk-chips" });
  const slots = [];
  const naechsterFreierSlot = () => slots.find(s => s.dataset.wert === "");

  const ablegen = (slot, wert) => {
    slot.dataset.wert = String(wert);
    slot.textContent = String(wert);
    // Bei Plus und Mal ist die Reihenfolge egal – beide Zahlen des Schritts gelten
    const passt = String(wert) === slot.dataset.erwartet || slot.dataset.auch && String(wert) === slot.dataset.auch;
    slot.classList.toggle("passt", !!passt);
    slot.classList.add("voll");
  };
  const leeren = slot => {
    slot.dataset.wert = "";
    slot.textContent = "";
    slot.classList.remove("passt", "voll");
  };

  for (const z of zahlen) {
    const chip = r("button", { class: "bk-chip", type: "button" }, String(z));
    // Nach einem Zieh-Vorgang feuert der Browser zusätzlich "click" –
    // das darf die Zahl nicht ein zweites Mal ablegen.
    let ebenGezogen = false;
    // Antippen legt die Zahl ins nächste freie Kästchen …
    chip.addEventListener("click", () => {
      if (ebenGezogen) {
        ebenGezogen = false;
        return;
      }
      const frei = naechsterFreierSlot();
      frei && ablegen(frei, z);
    });
    // … Ziehen legt sie in ein bestimmtes Kästchen (Finger und Maus).
    chip.addEventListener("pointerdown", start => {
      if (!start.isPrimary) return;
      let geist = null;
      const beiBewegung = ev => {
        if (!geist) {
          if (Math.hypot(ev.clientX - start.clientX, ev.clientY - start.clientY) < 8) return;
          geist = r("div", { class: "bk-chip bk-geist" }, String(z));
          document.body.append(geist);
          chip.setPointerCapture(start.pointerId);
        }
        geist.style.left = ev.clientX + "px";
        geist.style.top = ev.clientY + "px";
        const unter = document.elementFromPoint(ev.clientX, ev.clientY),
          ziel = unter?.closest?.(".bk-slot");
        for (const s of slots) s.classList.toggle("ziel", s === ziel);
      };
      const beiLoslassen = ev => {
        window.removeEventListener("pointermove", beiBewegung);
        window.removeEventListener("pointerup", beiLoslassen);
        window.removeEventListener("pointercancel", beiLoslassen);
        if (!geist) return;
        ebenGezogen = true;
        geist.remove();
        const unter = document.elementFromPoint(ev.clientX, ev.clientY),
          ziel = unter?.closest?.(".bk-slot");
        for (const s of slots) s.classList.remove("ziel");
        ziel && slots.includes(ziel) && ablegen(ziel, z);
      };
      window.addEventListener("pointermove", beiBewegung);
      window.addEventListener("pointerup", beiLoslassen);
      window.addEventListener("pointercancel", beiLoslassen);
    });
    chipsZeile.append(chip);
  }
  wurzel.append(chipsZeile);

  // --- Kästchen untereinander (Treppenform, Patron-Vorgabe 31.08.2026) ---
  // Beispiel 7 + 5 − 4:   [7]
  //                     + [5] = [12]   ← Zwischenergebnis TIPPT das Kind
  //                             − [4]  ← nächste Zahl UNTER dem Ergebnisblock
  //                             =  ?   ← Endergebnis unten im großen Eingabefeld
  const slotBauen = (erwartet, auch = null) => {
    const s = r("span", { class: "bk-slot", "data-erwartet": String(erwartet), "data-wert": "" });
    auch !== null && (s.dataset.auch = String(auch));
    s.addEventListener("click", () => s.dataset.wert !== "" && leeren(s));
    slots.push(s);
    return s;
  };
  const kommutativ = op => op === "+" || op === "*";

  // Tippfelder für Zwischenergebnisse; der Ziffernblock schreibt hinein,
  // solange eines aktiv ist (Steuerung wird an den Aufgaben-Bildschirm gereicht).
  const tippfelder = [],
    spiegel = [];
  let aktivesFeld = null;
  const feldZeichnen = f => {
    f.textContent = f.dataset.wert;
    const erwartet = f.dataset.erwartet,
      wert = f.dataset.wert;
    f.classList.toggle("passt", wert === erwartet);
    f.classList.toggle("daneben", wert !== erwartet && wert.length >= erwartet.length);
    for (const sp of spiegel) sp.dataset.schritt === f.dataset.schritt && (sp.textContent = wert || `▢${Number(f.dataset.schritt)+1}`);
  };
  const setzeAktiv = f => {
    aktivesFeld = f;
    for (const t of tippfelder) t.classList.toggle("aktiv", t === f);
  };
  const tippfeldBauen = (ergebnis, schrittIndex) => {
    const f = r("span", { class: "bk-tipp", "data-erwartet": String(ergebnis), "data-wert": "", "data-schritt": String(schrittIndex) });
    f.addEventListener("click", () => setzeAktiv(f));
    tippfelder.push(f);
    return f;
  };
  // Spiegel zeigt das getippte Zwischenergebnis eines früheren Schritts an
  const spiegelBauen = schrittIndex => {
    const sp = r("span", { class: "bk-merker", "data-schritt": String(schrittIndex) }, `▢${schrittIndex+1}`);
    spiegel.push(sp);
    return sp;
  };
  const steuerung = {
    aktiv: () => aktivesFeld !== null,
    deaktivieren: () => setzeAktiv(null),
    ziffer: z => {
      if (!aktivesFeld) return;
      const f = aktivesFeld;
      if (f.dataset.wert.length >= 3) return;
      f.dataset.wert = f.dataset.wert === "0" ? z : f.dataset.wert + z;
      feldZeichnen(f);
      // richtig getippt → weiter zum nächsten leeren Tippfeld, sonst zurück zur Antwort
      f.dataset.wert === f.dataset.erwartet && setzeAktiv(tippfelder.find(t => t.dataset.wert !== t.dataset.erwartet) ?? null);
    },
    loeschen: () => {
      if (!aktivesFeld) return;
      aktivesFeld.dataset.wert = aktivesFeld.dataset.wert.slice(0, -1);
      feldZeichnen(aktivesFeld);
    },
    bestaetigen: () => setzeAktiv(null)
  };

  const EINZUG = 104; // op(26) + Lücke(10) + Kästchen(58) + Lücke(10) – Treppe rückt pro Schritt so weit ein
  const zeile = (einzug, ...kinder) => r("div", { class: "bk-zeile", style: einzug ? `margin-left:${einzug}px` : "" }, ...kinder);
  const rechnung = r("div", { class: "bk-rechnung" });
  const frageBox = () => r("span", { class: "bk-frage", title: "Endergebnis unten eintippen" }, "?");
  if (kette) {
    schritte.forEach((s, i) => {
      const letzter = i === schritte.length - 1,
        ergebnisFeld = letzter ? frageBox() : tippfeldBauen(s.ergebnis, i),
        tausch = i === 0 && kommutativ(s.op);
      i === 0 && rechnung.append(zeile(0, r("span", { class: "bk-op" }, ""), slotBauen(s.links.wert, tausch ? s.rechts.wert : null)));
      rechnung.append(zeile(EINZUG * i, r("span", { class: "bk-op" }, OP_ZEICHEN[s.op]), slotBauen(s.rechts.wert, tausch ? s.links.wert : null), r("span", { class: "bk-op" }, "="), ergebnisFeld));
    });
  } else {
    // Punkt-vor-Strich: jeder Schritt eine Zeile; frühere Ergebnisse
    // erscheinen als Spiegel-Kästchen und füllen sich beim Tippen.
    schritte.forEach((s, i) => {
      const letzter = i === schritte.length - 1,
        tausch = kommutativ(s.op) && s.links.art === "zahl" && s.rechts.art === "zahl";
      const operand = o => o.art === "zahl" ? slotBauen(o.wert, tausch ? (o === s.links ? s.rechts.wert : s.links.wert) : null) : spiegelBauen(o.index);
      rechnung.append(zeile(0,
        r("span", { class: "bk-schritt-nr" }, `${i+1}.`),
        operand(s.links),
        r("span", { class: "bk-op" }, OP_ZEICHEN[s.op]),
        operand(s.rechts),
        r("span", { class: "bk-op" }, "="),
        letzter ? frageBox() : tippfeldBauen(s.ergebnis, i)));
    });
  }
  wurzel.append(rechnung);
  return { element: wurzel, steuerung };
}

// Illustrative Aufdeckung nach dem 3. Fehler: Rechenweg Schritt für Schritt,
// bei kleinen Plus/Minus-Schritten zusätzlich mit Symbol-Bildern.
function illustrationBauen(aufgabe) {
  const wurzel = r("div", {});
  wurzel.append(r("b", {}, `Die richtige Antwort ist ${aufgabe.antwort}. `));
  const baum = aufgabe.rechenweg ? rechenwegParsen(aufgabe.rechenweg) : null;
  if (baum) {
    const schritte = rechenwegSchritte(baum),
      liste = r("div", { class: "illu-schritte" }),
      wertVon = o => o.art === "zahl" ? o.wert : schritte[o.index].ergebnis,
      symbol = aufgabe.symbol ?? "🔵";
    schritte.forEach((s, i) => {
      const a = wertVon(s.links),
        b = wertVon(s.rechts),
        zeile = r("div", { class: "illu-zeile", style: `animation-delay:${i*.9}s` });
      zeile.append(r("span", { class: "illu-term" }, `${a} ${OP_ZEICHEN[s.op]} ${b} = `), r("span", { class: "illu-ergebnis" }, String(s.ergebnis)));
      // Bild-Reihe nur, wo sie wirklich hilft: kleines Plus/Minus
      if ((s.op === "+" || s.op === "-") && a <= 12 && b <= 12 && a + b <= 20) {
        const bild = r("div", { class: "illu-bild" });
        if (s.op === "+") {
          bild.append(symbol.repeat(a), r("span", { class: "illu-plus" }, " + "), symbol.repeat(b));
        } else {
          bild.append(symbol.repeat(a - b), r("span", { class: "illu-weg" }, symbol.repeat(b)));
        }
        zeile.append(bild);
      }
      liste.append(zeile);
    });
    wurzel.append(liste);
  }
  wurzel.append(r("div", { style: "margin-top:8px" }, aufgabe.erklaerung));
  return wurzel;
}

function Pe(e, n, i) {
  const t = e.kind(),
    a = Wn(),
    s = Date.now();
  let l = "";
  const c = r("div", {
      class: "schirm aufgabe-schirm"
    }),
    u = r("div", {
      class: "kopf"
    });
  u.append(r("div", {
    class: "hinweis-leise"
  }, i.titel));
  const d = () => e.tts.sprich(n.sprachtext ?? `${n.geschichte} ${n.frage}`);
  if (u.append(r("div", {
      class: "rechts"
    }, r("button", {
      class: "knopf leise",
      title: "Vorlesen",
      onclick: d
    }, "🔊"), r("button", {
      class: "knopf leise",
      onclick: () => {
        e.tts.stopp(), i.zurueck()
      }
    }, "✕"))), c.append(u), i.fortschritt) {
    const y = r("div", {
      class: "fortschritt"
    });
    for (let v = 0; v < i.fortschritt.gesamt; v++) y.append(r("i", {
      class: v < i.fortschritt.geschafft ? "geschafft" : v === i.fortschritt.geschafft ? "jetzt" : ""
    }));
    c.append(y)
  }
  const h = r("div", {
    class: "karte",
    style: `border-color:${i.farbe}`
  });
  h.append(r("span", {
    class: "symbol"
  }, n.symbol)), h.append(r("div", {
    class: "geschichte"
  }, n.geschichte)), h.append(r("div", {
    class: "frage"
  }, n.frage));
  const bk = baukastenBauen(n);
  bk && h.append(bk.element);
  const g = r("div", {
    class: "eingabe-anzeige leer",
    title: "Hier kommt deine Antwort hin",
    onclick: () => bk?.steuerung.deaktivieren()
  }, "?");
  h.append(r("div", {
    class: "eingabe-zeile"
  }, g));
  const o = r("div", {
    class: "hinweis-box",
    style: "display:none"
  });
  o.append(r("b", {}, "Tipp: "), n.hinweis), h.append(o);
  const m = r("div", {
    class: "loesung-box",
    style: "display:none"
  });
  h.append(m);
  const f = r("div", {
    class: "sterne-gross",
    style: "display:none;text-align:center;margin:8px 0"
  });
  h.append(f);
  const p = () => {
      g.textContent = l === "" ? "?" : l, g.className = "eingabe-anzeige" + (l === "" ? " leer" : "")
    },
    A = {
      // Ist ein Zwischenergebnis-Feld im Baukasten aktiv, tippt der
      // Ziffernblock dort hinein – sonst in die Antwort.
      ziffer: y => {
        E || (bk?.steuerung.aktiv() ? bk.steuerung.ziffer(y) : l.length >= 4 || (l = l === "0" ? y : l + y, p()))
      },
      loeschen: () => {
        E || (bk?.steuerung.aktiv() ? bk.steuerung.loeschen() : (l = l.slice(0, -1), p()))
      },
      ok: () => E ? R() : bk?.steuerung.aktiv() ? bk.steuerung.bestaetigen() : F()
    },
    D = We(A);
  h.append(D);
  const B = Ge(A);
  e.beimVerlassen(B), c.append(h);
  const S = r("span", {});
  S.append(C($("froh")));
  const k = r("div", {
    class: "blase"
  }, "Lies die Geschichte genau. Du schaffst das!");
  c.append(r("div", {
    class: "figur-zeile"
  }, S, k));
  const w = r("button", {
    class: "knopf primaer gross",
    style: "display:none;margin-top:10px",
    onclick: () => R()
  }, "Weiter →");
  c.append(w);
  let E = !1;
  const Z = (y, v) => {
      k.textContent = y, S.replaceChildren(C($(v))), e.tts.sprich(y)
    },
    F = () => {
      if (E || l === "") return;
      const y = Number(l),
        v = Gn(a, n, y);
      if (v === "richtig") {
        E = !0, e.toene.richtig();
        const P = Fn(e) + 1,
          _ = P > 0 && P % 3 === 0 ? "serie_3" : a.versuche === 1 ? "richtig_1" : "richtig_mehr";
        Z(e.motivation.hole(_, t.name), "jubel"), f.textContent = Be(ge(a)), f.style.display = "block", w.style.display = "inline-block"
      } else v === "hinweis" ? (e.toene.falsch(), o.style.display = "block", k.textContent = e.motivation.hole("falsch_3", t.name), S.replaceChildren(C($("denkt"))), e.tts.sprich(`${k.textContent} ${n.hinweis}`), g.classList.add("falsch"), setTimeout(() => g.classList.remove("falsch"), 400), l = "", p()) : v === "aufgedeckt" ? (E = !0, e.toene.falsch(), m.replaceChildren(illustrationBauen(n)), m.style.display = "block", o.style.display = "none", Z(e.motivation.hole("fehler_geloggt", t.name), "neutral"), e.tts.sprich(`Die richtige Antwort ist ${n.antwort}. ${n.erklaerung}`), w.style.display = "inline-block") : (e.toene.falsch(), Z(e.motivation.hole("falsch_1_2", t.name), "denkt"), g.classList.add("falsch"), setTimeout(() => g.classList.remove("falsch"), 400), l = "", p())
    },
    R = () => {
      B(), e.tts.stopp(), i.fertig({
        aufgabeId: n.id,
        datum: new Date().toISOString(),
        versuche: a.versuche,
        falscheEingaben: a.falscheEingaben,
        hinweisGenutzt: a.hinweisSichtbar,
        richtig: a.geloest,
        sterne: ge(a),
        dauerSekunden: Math.round((Date.now() - s) / 1e3)
      })
    };
  e.wurzel.replaceChildren(c), d()
}

function Fn(e) {
  const n = e.kind().laufenderBlock?.eintraege ?? [];
  let i = 0;
  for (let t = n.length - 1; t >= 0 && n[t].richtig; t--) i++;
  return i
}

function jn(e, n) {
  const i = e.kind(),
    t = i.laufenderBlock;
  if (!t) {
    e.zeige({
      name: "levelkarte"
    });
    return
  }
  const a = t.eintraege.filter(m => m.richtig).length,
    s = t.eintraege.reduce((m, f) => m + f.sterne, 0),
    l = t.eintraege.filter(m => m.hinweisGenutzt).length,
    c = t.eintraege.filter(m => !m.richtig).length;
  i.durchgaenge.push({
    block: n,
    datum: new Date().toISOString(),
    richtig: a,
    sterne: s,
    eintraege: t.eintraege
  }), i.journal.push({
    datum: new Date().toISOString(),
    typ: "block",
    text: `${N(n)} (Gruppe ${n[0]}): ${a}/10 richtig, ★ ${s}, ${l}× Hinweis, ${c} Fehler.`
  }), i.laufenderBlock = null;
  const u = n[0],
    d = ["a", "b", "c"].every(m => ne(i, u + m)),
    h = i.gruppenAbschluesse.some(m => m.gruppe === u);
  d && (!h || !U(i, u)) && (i.auswertungFaellig = u), i.pauseBisTs = Date.now() + e.stand.eltern.pausenMinuten * 6e4, e.speichern(), e.toene.blockFertig();
  const g = e.motivation.hole("block_fertig", i.name);
  e.tts.sprich(`${a} von 10 richtig. ${g}`);
  const o = r("div", {
    class: "schirm pause-schirm"
  });
  o.append(ye(), r("span", {
    class: "konfetti"
  }, "🎉"), r("div", {
    class: "gross-titel"
  }, "Block geschafft!"), r("div", {
    class: "wert-reihe",
    style: "max-width:420px"
  }, me(`${a} / 10`, "richtig"), me(`★ ${s}`, "Sterne")), r("p", {
    class: "pause-tipp"
  }, g), r("button", {
    class: "knopf primaer gross",
    onclick: () => {
      const m = i.auswertungFaellig === u ? {
        name: "auswertung",
        gruppe: u
      } : ie(i, n) ? {
        name: "levelkarte"
      } : {
        name: "rechenblatt",
        block: n
      };
      e.zeige({
        name: "pause",
        danach: m
      })
    }
  }, "Weiter →")), e.wurzel.replaceChildren(o)
}

function me(e, n) {
  const i = r("div", {
    class: "wert-kachel"
  });
  return i.append(r("div", {
    class: "zahl"
  }, e), r("div", {
    class: "was"
  }, n)), i
}
const ke = ["Steh auf und streck dich einmal richtig durch.", "Trink ein Glas Wasser – dein Kopf arbeitet besser mit Treibstoff.", "10 Hampelmänner. Los!", "Schau kurz aus dem Fenster in die Ferne – gut für die Augen.", "Geh eine Runde durchs Zimmer und schüttel die Arme aus."];

function Cn(e, n) {
  const i = e.kind();
  if (!i.pauseBisTs || i.pauseBisTs <= Date.now()) {
    i.pauseBisTs = null, e.speichern(), e.zeige(n);
    return
  }
  const t = r("div", {
      class: "schirm pause-schirm"
    }),
    a = r("div", {
      class: "pause-zahl"
    }, "–:––"),
    s = ke[Math.floor(Math.random() * ke.length)];
  t.append(r("div", {
    class: "gross-titel"
  }, "Pause"), C($("neutral", 72)), a, r("p", {
    class: "pause-tipp"
  }, `💧 ${s}`));
  const l = r("button", {
    class: "knopf leise",
    onclick: async () => {
      const h = await L("Pause beenden", "Nur für Eltern – PIN eingeben.");
      h !== null && await De(e.stand.eltern, h) && u(!0)
    }
  }, "🔒 Eltern: Pause beenden");
  t.append(l);
  let c = !1;
  const u = h => {
      if (!c) {
        if (c = !0, clearInterval(d), i.pauseBisTs = null, e.speichern(), !h) {
          e.toene.pauseEnde();
          const g = e.motivation.hole("pause_ende", i.name);
          e.tts.sprich(g)
        }
        e.zeige(n)
      }
    },
    d = setInterval(() => {
      if (!t.isConnected) {
        clearInterval(d);
        return
      }
      const h = (i.pauseBisTs ?? 0) - Date.now();
      if (h <= 0) {
        u(!1);
        return
      }
      const g = Math.floor(h / 6e4),
        o = Math.floor(h % 6e4 / 1e3);
      a.textContent = `${g}:${String(o).padStart(2,"0")}`
    }, 250);
  e.beimVerlassen(() => clearInterval(d)), e.wurzel.replaceChildren(t)
}

function Ln(e, n, i) {
  const t = new Map(i.map(f => [f.id, f])),
    a = {},
    s = {},
    l = {},
    c = [];
  let u = 0,
    d = 0,
    h = 0,
    g = 0;
  for (const f of ["a", "b", "c"]) {
    const p = n + f,
      A = O(e, p);
    a[p] = A?.richtig ?? 0, s[p] = A?.sterne ?? 0, u += A?.sterne ?? 0;
    for (const D of A?.eintraege ?? []) {
      d += D.versuche, h++, g += D.dauerSekunden, D.richtig || c.push(D);
      const B = t.get(D.aufgabeId)?.rechenarten ?? [];
      for (const S of B) {
        const k = l[S] ?? (l[S] = {
          aufgaben: 0,
          richtig: 0,
          versuche: 0
        });
        k.aufgaben++, k.versuche += D.versuche, D.richtig && k.richtig++
      }
    }
  }
  let o = null,
    m = 1 / 0;
  for (const f of ["+", "-", "*", "/"]) {
    const p = l[f];
    if (!p || p.aufgaben < 2) continue;
    const A = p.versuche / p.aufgaben;
    A < m && (m = A, o = f)
  }
  return {
    gruppe: n,
    richtigProBlock: a,
    sterneProBlock: s,
    richtigGesamt: he(e, n),
    sterneGesamt: u,
    staerksteRechenart: o,
    proRechenart: l,
    fehlerEintraege: c,
    quoteErreicht: U(e, n),
    schwaechsterBlock: Ne(e, n),
    durchschnittVersuche: h > 0 ? d / h : 0,
    uebungsSekunden: g
  }
}
const xn = {
  "+": "Plus-Meister",
  "-": "Minus-Meister",
  "*": "Mal-Meister",
  "/": "Geteilt-Meister"
};

function In(e, n) {
  const i = e.kind(),
    t = Ln(i, n, e.aufgaben);
  if (i.auswertungFaellig === n) {
    i.auswertungFaellig = null, i.gruppenAbschluesse.push({
      gruppe: n,
      datum: new Date().toISOString(),
      richtig: t.richtigGesamt,
      sterne: t.sterneGesamt,
      quoteErreicht: t.quoteErreicht,
      wiederholterBlock: t.quoteErreicht ? null : t.schwaechsterBlock,
      rechenblattErgebnis: Se(i, n + "c"),
      staerksteRechenart: t.staerksteRechenart
    }), i.journal.push({
      datum: new Date().toISOString(),
      typ: "gruppe",
      text: `Gruppe ${n} ausgewertet: ${t.richtigGesamt}/30 richtig, ★ ${t.sterneGesamt}, Mindestquote ${t.quoteErreicht?"erreicht":"noch nicht erreicht"}.`
    }), e.speichern();
    const h = t.quoteErreicht ? e.motivation.hole("gruppe_fertig", i.name) : e.motivation.hole("block_wiederholen", i.name);
    e.tts.sprich(`${t.richtigGesamt} von 30 richtig. ${h}`)
  }
  const a = r("div", {
    class: "schirm"
  });
  t.quoteErreicht && a.append(ye(36));
  const s = r("div", {
    class: "kopf"
  });
  s.append(r("div", {
    class: "gross-titel"
  }, t.quoteErreicht ? `Gruppe ${n} geschafft!` : `Gruppe ${n} – fast geschafft!`), r("button", {
    class: "knopf leise",
    onclick: () => e.zeige({
      name: "levelkarte"
    })
  }, "✕")), a.append(s);
  const l = r("div", {
    class: "karte gruppe-karte",
    style: `--gfarbe:${x[n]}`
  });
  l.append(r("div", {
    class: "gruppe-name"
  }, le[n]));
  const c = r("div", {
      class: "wert-reihe"
    }),
    u = (h, g) => {
      const o = r("div", {
        class: "wert-kachel"
      });
      o.append(r("div", {
        class: "zahl"
      }, h), r("div", {
        class: "was"
      }, g)), c.append(o)
    };
  u(`${t.richtigGesamt} / 30`, "richtig"), u(`★ ${t.sterneGesamt}`, "von 90 Sternen");
  for (const h of ["a", "b", "c"]) u(`★ ${t.sterneProBlock[n+h]??0}`, `${N(n+h)} (${t.richtigProBlock[n+h]??0}/10)`);
  if (l.append(c), t.staerksteRechenart && l.append(r("p", {}, `💪 Deine Stärke: ${xn[t.staerksteRechenart]}!`)), a.append(l), t.fehlerEintraege.length > 0) {
    const h = r("div", {
      class: "karte"
    });
    h.append(r("div", {
      class: "gruppe-name"
    }, "Hier übst du nochmal (freiwillig):"));
    for (const g of t.fehlerEintraege.slice(0, 3)) {
      const o = V(e, g.aufgabeId);
      o && h.append(r("div", {
        style: "display:flex;align-items:center;gap:10px;margin:8px 0"
      }, r("span", {
        class: "symbol"
      }, o.symbol), r("span", {
        style: "flex:1"
      }, o.frage), r("button", {
        class: "knopf",
        onclick: () => e.zeige({
          name: "uebung",
          aufgabeId: o.id
        })
      }, "Nochmal versuchen")))
    }
    a.append(h)
  }
  const d = r("div", {
    style: "display:flex;gap:10px;align-items:center"
  });
  if (d.append(C($(t.quoteErreicht ? "jubel" : "froh"))), !ie(i, n + "c")) d.append(r("button", {
    class: "knopf primaer gross",
    onclick: () => e.zeige({
      name: "rechenblatt",
      block: n + "c"
    })
  }, "Jetzt kommt dein Rechenblatt →"));
  else if (t.quoteErreicht) d.append(r("button", {
    class: "knopf primaer gross",
    onclick: () => e.zeige({
      name: "levelkarte"
    })
  }, "Zur Karte →"));
  else {
    const h = t.schwaechsterBlock;
    d.append(r("button", {
      class: "knopf primaer gross",
      onclick: () => e.zeige({
        name: "block",
        block: h
      })
    }, `${N(h)} nochmal →`))
  }
  a.append(d), e.wurzel.replaceChildren(a)
}

function Hn(e) {
  let n = e >>> 0;
  return () => {
    n += 1831565813;
    let i = n;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296
  }
}

function K(e, n, i) {
  return n + Math.floor(e() * (i - n + 1))
}

function Y(e, n) {
  return n[Math.floor(e() * n.length)]
}

function Jn(e) {
  const n = new Set;
  for (const i of e) "+-*/".includes(i) && n.add(i);
  return [...n].sort().join("")
}

function j(e, n) {
  return Math.round(100 * e / n.maxErgebnis)
}

function $n(e, n, i) {
  if (e === "+") {
    const t = K(i, 3, n.maxZahl - 3);
    let a = K(i, 2, n.maxZahl - t);
    if (n.zehneruebergang && i() < .6) {
      const s = t % 10;
      if (s > 0) {
        const l = K(i, 11 - s, 9),
          c = Math.max(2, a - a % 10 + l);
        t + c <= n.maxZahl && (a = c)
      }
    }
    return {
      term: `${t} + ${a}`,
      loesung: t + a,
      kette: !1,
      // Schwere: Zehnerübergang (Einer ergeben zusammen ≥ 10) wiegt am meisten,
      // die Zahlengröße nur halb – 96+2 ist leichter als 12+29.
      schwere: Math.round(j(t + a, n) / 2) + (t % 10 + a % 10 >= 10 ? 60 : 0)
    }
  }
  if (e === "-") {
    const t = K(i, 8, n.maxZahl);
    let a = K(i, 2, t - 1);
    if (i() < .5 && t % 10 < 9 && t >= 12) {
      const s = K(i, t % 10 + 1, 9),
        l = Math.floor((t - 1 - s) / 10);
      l >= 0 && (a = K(i, 0, l) * 10 + s)
    }
    return (a < 1 || a >= t) && (a = Math.max(1, t - 1)), {
      term: `${t} - ${a}`,
      loesung: t - a,
      kette: !1,
      // Schwere: Zehnerunterschreitung (Einer des Abziehers größer) wiegt am meisten
      schwere: Math.round(j(t, n) / 2) + 4 + (t % 10 < a % 10 ? 60 : 0)
    }
  }
  if (e === "*") {
    for (let t = 0; t < 100; t++) {
      const a = Y(i, n.faktoren),
        s = K(i, 2, 10);
      if (a * s <= n.maxErgebnis) {
        const [l, c] = i() < .5 ? [a, s] : [s, a];
        return {
          term: `${l} * ${c}`,
          loesung: a * s,
          kette: !1,
          schwere: Math.round(j(a * s, n) / 2) + 12
        }
      }
    }
    return {
      term: "2 * 2",
      loesung: 4,
      kette: !1,
      schwere: 12
    }
  }
  for (let t = 0; t < 100; t++) {
    const a = Y(i, n.faktoren),
      s = K(i, 2, 10);
    if (a * s <= n.maxZahl) return {
      term: `${a*s} / ${a}`,
      loesung: s,
      kette: !1,
      schwere: Math.round(j(a * s, n) / 2) + 16
    }
  }
  return {
    term: "4 / 2",
    loesung: 2,
    kette: !1,
    schwere: 14
  }
}

function Vn(e, n) {
  for (let i = 0; i < 200; i++) {
    const t = K(n, 5, e.maxZahl - 5),
      a = n() < .5 ? "+" : "-";
    if (a === "-" && t < 4) continue;
    const s = a === "+" ? K(n, 2, e.maxZahl - t) : K(n, 2, t - 1),
      l = a === "+" ? t + s : t - s;
    if (l < 3 || l > e.maxZahl) continue;
    const c = n() < .5 ? "+" : "-";
    if (c === "+" && e.maxZahl - l < 2) continue;
    const u = c === "+" ? K(n, 2, e.maxZahl - l) : K(n, 1, l - 1),
      d = c === "+" ? l + u : l - u;
    if (!(d < 0 || d > e.maxErgebnis)) return {
      term: `${t} ${a} ${s} ${c} ${u}`,
      loesung: d,
      kette: !0,
      schwere: 130 + Math.round(j(Math.max(t, l, d), e) / 2)
    }
  }
  return {
    term: "5 + 4 - 3",
    loesung: 6,
    kette: !0,
    schwere: 133
  }
}

function On(e, n) {
  if (e.kettenarten.length === 0) return Vn(e, n);
  for (let i = 0; i < 200; i++) {
    const t = Y(n, e.kettenarten),
      a = Y(n, e.faktoren),
      s = K(n, 2, 10);
    if (t === "*" && s * a > e.maxErgebnis) continue;
    const l = t === "*" ? s : s * a;
    if (l + 1 > e.maxZahl || l < 2) continue;
    let c;
    if (n() < .5 && l >= 3) {
      const d = K(n, 1, l - 1);
      c = `(${d} + ${l-d})`
    } else {
      const d = K(n, 1, Math.min(20, e.maxZahl - l));
      c = `(${l+d} - ${d})`
    }
    const u = t === "*" ? s * a : s;
    return {
      term: `${c} ${t} ${a}`,
      loesung: u,
      kette: !0,
      schwere: 130 + Math.round(j(t === "*" ? s * a : l, e) / 2)
    }
  }
  return {
    term: "(2 + 2) * 2",
    loesung: 8,
    kette: !0,
    schwere: 134
  }
}

function Un(e, n) {
  const i = Hn(n),
    t = new Set,
    a = [],
    s = m => {
      for (let f = 0; f < 300; f++) {
        const p = m();
        if (!t.has(p.term)) {
          t.add(p.term), a.push(p);
          return
        }
      }
      throw new Error("Rechenblatt: keine neue Aufgabe gefunden")
    },
    l = e.anzahl - e.kettenanzahl;
  for (let m = 0; m < l; m++) {
    const f = e.rechenarten[m % e.rechenarten.length];
    s(() => $n(f, e, i))
  }
  for (let m = 0; m < e.kettenanzahl; m++) s(() => On(e, i));
  // Blatt streng von leicht nach schwer: einfache Aufgaben nach Schwere aufsteigend,
  // Kettenaufgaben (Schwere 100+) landen dadurch automatisch am Ende.
  return [...a].sort((m, f) => m.schwere - f.schwere)
}

function _n(e, n) {
  const i = e.kind(),
    t = n[0],
    a = e.regeln[t],
    s = Un(a, Date.now() >>> 0),
    l = s.length,
    c = Date.now(),
    u = Array(l).fill(""),
    d = Array(l).fill(null),
    h = Array(l).fill(null);
  let g = "eingabe",
    o = 0;
  const m = r("div", {
      class: "schirm"
    }),
    f = r("div", {
      class: "kopf"
    });
  f.append(r("div", {}, r("div", {
    class: "gross-titel",
    style: `color:${x[t]}`
  }, `Rechenblatt · Gruppe ${t} · ${N(n)}`), r("div", {
    class: "hinweis-leise"
  }, `Alle ${l} lösen, Reihenfolge egal. Zum Vorlesen auf die Rechnung tippen.`)), r("button", {
    class: "knopf leise",
    onclick: () => R()
  }, "✕")), m.append(f);
  const p = r("div", {
      class: "rb-gitter"
    }),
    A = [],
    D = [];
  s.forEach((z, b) => {
    const M = r("span", {
        class: "rb-eingabe"
      }, ""),
      I = r("div", {
        class: "rb-aufgabe",
        onclick: () => {
          e.tts.sprich(qn(z.term)), B(b) && (o = b, S())
        }
      }, r("span", {
        class: "term"
      }, `${fe(z.term)} =`), M);
    A.push(I), D.push(M), p.append(I)
  }), m.append(p);
  const B = z => g === "eingabe" || g === "korrektur" && h[z] === !1,
    S = () => {
      s.forEach((z, b) => {
        D[b].textContent = u[b], A[b].className = "rb-aufgabe" + (h[b] === !0 ? " richtig" : h[b] === !1 ? " falsch" : "") + (B(b) && b === o && g !== "fertig" ? " aktivfeld" : ""), g === "fertig" && h[b] === !1 && (A[b].querySelector(".rb-loesung") || A[b].append(r("span", {
          class: "rb-loesung"
        }, `→ ${z.loesung}`)))
      }), v.textContent = g === "eingabe" ? "Prüfen ✔" : "Nochmal prüfen ✔", v.style.display = g === "fertig" ? "none" : "inline-block", v.disabled = u.some((z, b) => B(b) && z === "")
    },
    k = () => {
      for (let z = 1; z <= l; z++) {
        const b = (o + z) % l;
        if (B(b) && u[b] === "") {
          o = b;
          return
        }
      }
    },
    w = {
      ziffer: z => {
        g === "fertig" || !B(o) || (u[o].length < 4 && (u[o] = u[o] === "0" ? z : u[o] + z), S())
      },
      loeschen: () => {
        g === "fertig" || !B(o) || (u[o] = u[o].slice(0, -1), S())
      },
      ok: () => {
        if (g !== "fertig") {
          if (u[o] !== "" && k(), u.every((z, b) => !B(b) || z !== "")) {
            E();
            return
          }
          S()
        }
      }
    },
    E = () => {
      if (g === "eingabe") {
        s.forEach((b, M) => {
          d[M] = Number(u[M]), h[M] = Number(u[M]) === b.loesung
        });
        const z = h.filter(b => b === !1).length;
        if (z === 0) F(0);
        else {
          g = "korrektur", e.toene.falsch(), e.tts.sprich(`${l-z} von ${l} richtig. ${z} ${z===1?"Rechnung ist":"Rechnungen sind"} noch falsch – du darfst einmal korrigieren.`);
          const b = h.findIndex(M => M === !1);
          b >= 0 && (o = b)
        }
        S()
      } else g === "korrektur" && (s.forEach((z, b) => {
        h[b] === !1 && (h[b] = Number(u[b]) === z.loesung)
      }), F(Z()), S())
    },
    Z = () => s.filter((z, b) => (d[b] ?? NaN) !== z.loesung).length,
    F = z => {
      g = "fertig";
      const b = h.filter(H => H === !1).length,
        M = l - b;
      i.rechenblaetter.push({
        gruppe: t,
        block: n,
        datum: new Date().toISOString(),
        aufgaben: s.map((H, te) => ({
          term: H.term,
          loesung: H.loesung,
          kette: H.kette,
          eingabe1: d[te],
          eingabe2: Number(u[te]),
          richtig: h[te] === !0
        })),
        ergebnis: M,
        fehlerErstePruefung: z,
        fehlerNachKorrektur: b,
        dauerSekunden: Math.round((Date.now() - c) / 1e3)
      }), i.journal.push({
        datum: new Date().toISOString(),
        typ: "rechenblatt",
        text: `Rechenblatt ${N(n)} (Gruppe ${t}): ${M}/${l} richtig (${z} Fehler beim 1. Prüfen).`
      }), i.pauseNachRechenblattFaellig = !0, we(i), e.speichern(), b <= 3 && e.toene.blockFertig();
      const I = e.motivation.hole("rechenblatt_fertig", i.name);
      e.tts.sprich(`${M} von ${l} richtig. ${I}`), P.replaceChildren(r("div", {
        class: "gross-titel"
      }, `${M} / ${l} richtig`), r("p", {
        class: "pause-tipp"
      }, I), r("button", {
        class: "knopf primaer gross",
        onclick: () => R()
      }, "Zur Karte →")), S()
    },
    R = () => {
      _(), e.tts.stopp(), e.zeige({
        name: "levelkarte"
      })
    },
    y = r("div", {
      class: "rb-fuss"
    }),
    v = r("button", {
      class: "knopf gruen gross",
      onclick: E
    }, "Prüfen ✔"),
    P = r("div", {
      style: "text-align:center"
    });
  y.append(We(w), r("div", {
    style: "text-align:center;margin-top:8px"
  }, v), P), m.append(y);
  const _ = Ge(w);
  e.beimVerlassen(_), S(), e.wurzel.replaceChildren(m)
}

function qn(e) {
  return fe(e).replaceAll("(", "Klammer auf, ").replaceAll(")", ", Klammer zu,").replaceAll("+", "plus").replaceAll("−", "minus").replaceAll("-", "minus").replaceAll("×", "mal").replaceAll(":", "geteilt durch")
}
const Qn = {
  "+": "Plus",
  "-": "Minus",
  "*": "Mal",
  "/": "Geteilt"
};

function Xn(e) {
  const n = e.kind(),
    i = r("div", {
      class: "schirm"
    }),
    t = r("div", {
      class: "kopf"
    });
  t.append(r("div", {
    class: "gross-titel"
  }, `Dein Journal, ${n.name}`), r("button", {
    class: "knopf leise",
    onclick: () => e.zeige({
      name: "levelkarte"
    })
  }, "✕")), i.append(t);
  const a = r("div", {
      class: "wert-reihe"
    }),
    s = (h, g) => {
      const o = r("div", {
        class: "wert-kachel"
      });
      o.append(r("div", {
        class: "zahl"
      }, h), r("div", {
        class: "was"
      }, g)), a.append(o)
    };
  s(`★ ${ze(n)}`, `von ${e.aufgaben.length*3} Sternen`), s(`${G.filter(h=>X(n,h)).length}`, "Abzeichen 🏅"), s(n.serie.tage >= 1 ? `🔥 ${n.serie.tage}` : "–", "Tage-Serie");
  const l = Yn(e);
  l && s(Qn[l], "deine Stärke 💪"), i.append(r("div", {
    class: "karte"
  }, a));
  const c = r("div", {
    class: "karte"
  });
  c.append(r("div", {
    class: "gruppe-name"
  }, "Deine Sterne"));
  for (const h of G) {
    const g = ["a", "b", "c"].reduce((m, f) => m + J(n, h + f), 0),
      o = r("div", {
        style: "display:flex;align-items:center;gap:10px;margin:6px 0"
      }, r("span", {
        class: "gruppe-tag",
        style: `background:${x[h]}`
      }, h), r("span", {
        style: "flex:1"
      }, le[h]), X(n, h) ? r("span", {
        class: "abzeichen"
      }, "🏅") : null, r("span", {
        class: "gruppe-sterne"
      }, `★ ${g} / 90`));
    c.append(o)
  }
  i.append(c);
  const u = r("div", {
    class: "karte"
  });
  u.append(r("div", {
    class: "gruppe-name"
  }, "Zuletzt gemacht"));
  const d = [...n.journal].reverse().slice(0, 10);
  d.length === 0 && u.append(r("p", {
    class: "hinweis-leise"
  }, "Noch nichts – leg los!"));
  for (const h of d) u.append(r("div", {
    class: "journal-eintrag"
  }, `${Q(h.datum)} · ${h.text}`));
  i.append(u), e.wurzel.replaceChildren(i)
}

function Yn(e) {
  const n = e.kind(),
    i = new Map;
  for (const s of n.durchgaenge)
    for (const l of s.eintraege) {
      const c = V(e, l.aufgabeId)?.rechenarten ?? [];
      for (const u of c) {
        const d = i.get(u) ?? {
          versuche: 0,
          aufgaben: 0
        };
        d.versuche += l.versuche, d.aufgaben++, i.set(u, d)
      }
    }
  let t = null,
    a = 1 / 0;
  for (const [s, l] of i) {
    if (l.aufgaben < 3) continue;
    const c = l.versuche / l.aufgaben;
    c < a && (a = c, t = s)
  }
  return t
}

function Q(e) {
  const n = new Date(e);
  return `${String(n.getDate()).padStart(2,"0")}.${String(n.getMonth()+1).padStart(2,"0")}.`
}
async function ei(e) {
  const n = e.stand.eltern;
  if (n.pinHash === null) {
    const i = await L("Eltern-PIN festlegen", "4 Ziffern – damit öffnest du künftig den Elternbereich.");
    if (i === null) return e.zeige({
      name: "levelkarte"
    });
    if (await L("PIN wiederholen", "") !== i) return alert("Die PINs stimmen nicht überein. Bitte nochmal."), e.zeige({
      name: "levelkarte"
    });
    await Ae(n, i), e.speichern()
  } else {
    const i = await L("Elternbereich", "PIN eingeben");
    if (i === null) return e.zeige({
      name: "levelkarte"
    });
    if (!await De(n, i)) return alert("Falsche PIN."), e.zeige({
      name: "levelkarte"
    })
  }
  ee(e, "statistik")
}

function ee(e, n, i = 0) {
  const t = r("div", {
      class: "schirm"
    }),
    a = r("div", {
      class: "kopf"
    });
  a.append(r("div", {
    class: "gross-titel"
  }, "Elternbereich"), r("button", {
    class: "knopf leise",
    onclick: () => e.zeige({
      name: "levelkarte"
    })
  }, "✕ Schließen")), t.append(a), e.tts.deutscheStimmeGefunden() || t.append(r("div", {
    class: "banner"
  }, "⚠️ Auf diesem Gerät wurde keine deutsche Computerstimme gefunden. Die Sprachausgabe klingt dann falsch oder bleibt stumm."));
  const s = r("div", {
      class: "tab-leiste"
    }),
    l = (c, u) => s.append(r("button", {
      class: "knopf" + (n === c ? " gewaehlt" : ""),
      onclick: () => ee(e, c, i)
    }, u));
  l("statistik", "📊 Statistik"), l("einstellungen", "⚙️ Einstellungen"), l("daten", "💾 Daten"), t.append(s), n === "statistik" && t.append(ni(e, i, c => ee(e, "statistik", c))), n === "einstellungen" && t.append(ii(e)), n === "daten" && t.append(ti(e, i)), e.wurzel.replaceChildren(t)
}

function ni(e, n, i) {
  const t = r("div", {}),
    a = e.stand.kinder;
  if (a.length === 0) return t.append(r("p", {
    class: "hinweis-leise"
  }, "Noch kein Kinderprofil angelegt.")), t;
  const s = a[Math.min(n, a.length - 1)];
  if (a.length > 1) {
    const k = r("div", {
      class: "tab-leiste"
    });
    a.forEach((w, E) => k.append(r("button", {
      class: "knopf" + (w === s ? " gewaehlt" : ""),
      onclick: () => i(E)
    }, `${w.avatar} ${w.name}`))), t.append(k)
  }
  const l = s.durchgaenge.flatMap(k => k.eintraege),
    c = l.reduce((k, w) => k + w.dauerSekunden, 0),
    u = r("div", {
      class: "karte"
    });
  u.append(r("div", {
    class: "gruppe-name"
  }, `${s.avatar} ${s.name}`)), u.append(r("p", {}, `Übungszeit gesamt: ${Math.round(c/60)} Minuten · bearbeitete Aufgaben: ${l.length} · Rechenblätter: ${s.rechenblaetter.length}`)), t.append(u);
  const d = r("div", {
    class: "karte"
  });
  d.append(r("div", {
    class: "gruppe-name"
  }, "Pro Block (letzter Durchgang)"));
  const h = r("table", {
    class: "tabelle"
  });
  h.append(T("th", ["Block", "richtig", "mit Hinweis", "Fehler", "Ø Versuche"]));
  for (const k of G) {
    let w = !1;
    for (const E of ["a", "b", "c"]) {
      const Z = O(s, k + E);
      if (!Z) continue;
      w = !0;
      const F = Z.eintraege.filter(v => v.hinweisGenutzt && v.richtig).length,
        R = Z.eintraege.filter(v => !v.richtig).length,
        y = Z.eintraege.length ? (Z.eintraege.reduce((v, P) => v + P.versuche, 0) / Z.eintraege.length).toFixed(1) : "–";
      h.append(T("td", [`${k+E} (${N(k+E)})`, `${Z.richtig}/10`, String(F), String(R), y]))
    }
    w && h.append(T("td", [`Gruppe ${k} gesamt`, `${he(s,k)}/30 ${U(s,k)?"✔ Quote":"– Quote offen"}`, "", "", ""]))
  }
  d.append(h), t.append(d);
  const g = r("div", {
    class: "karte"
  });
  g.append(r("div", {
    class: "gruppe-name"
  }, "Pro Rechenart"));
  const o = r("table", {
    class: "tabelle"
  });
  o.append(T("th", ["Rechenart", "Aufgaben", "richtig", "Ø Versuche"]));
  const m = new Map;
  for (const k of l)
    for (const w of V(e, k.aufgabeId)?.rechenarten ?? []) {
      const E = m.get(w) ?? {
        aufgaben: 0,
        richtig: 0,
        versuche: 0
      };
      E.aufgaben++, E.versuche += k.versuche, k.richtig && E.richtig++, m.set(w, E)
    }
  const f = {
    "+": "Plus",
    "-": "Minus",
    "*": "Mal (×)",
    "/": "Geteilt (÷)"
  };
  for (const k of ["+", "-", "*", "/"]) {
    const w = m.get(k);
    w && o.append(T("td", [f[k], String(w.aufgaben), `${w.richtig} von ${w.aufgaben}`, (w.versuche / w.aufgaben).toFixed(1)]))
  }
  g.append(o), t.append(g);
  const p = r("div", {
    class: "karte"
  });
  p.append(r("div", {
    class: "gruppe-name"
  }, "Fehlerliste (als Fehler geloggte Aufgaben)"));
  const A = s.durchgaenge.flatMap(k => k.eintraege.filter(w => !w.richtig));
  A.length === 0 && p.append(r("p", {
    class: "hinweis-leise"
  }, "Keine – stark!"));
  for (const k of A.slice(-30).reverse()) {
    const w = V(e, k.aufgabeId);
    p.append(r("div", {
      class: "fehler-eintrag"
    }, `${Q(k.datum)} · ${k.aufgabeId}: ${w?.frage??""} — eingegeben: ${k.falscheEingaben.join(", ")} · richtig: ${w?.antwort??"?"}`))
  }
  t.append(p);
  const D = r("div", {
    class: "karte"
  });
  D.append(r("div", {
    class: "gruppe-name"
  }, "Rechenblätter (getrennt von den Textaufgaben)"));
  const B = r("table", {
    class: "tabelle"
  });
  B.append(T("th", ["Datum", "Block", "Ergebnis", "Fehler 1. Prüfung", "nach Korrektur", "Dauer"]));
  for (const k of [...s.rechenblaetter].reverse()) B.append(T("td", [Q(k.datum), k.block ?? k.gruppe, `${k.ergebnis}/${k.aufgaben.length||15}`, String(k.fehlerErstePruefung), String(k.fehlerNachKorrektur), `${Math.round(k.dauerSekunden/60)} min`]));
  s.rechenblaetter.length === 0 ? D.append(r("p", {
    class: "hinweis-leise"
  }, "Noch keines gemacht.")) : D.append(B), t.append(D);
  const S = r("div", {
    class: "karte"
  });
  S.append(r("div", {
    class: "gruppe-name"
  }, "Verlauf (Journal)"));
  for (const k of [...s.journal].reverse().slice(0, 40)) S.append(r("div", {
    class: "journal-eintrag"
  }, `${Q(k.datum)} · ${k.text}`));
  return s.journal.length === 0 && S.append(r("p", {
    class: "hinweis-leise"
  }, "Noch leer.")), t.append(S), t
}

function T(e, n) {
  const i = document.createElement("tr");
  for (const t of n) i.append(r(e, {}, t));
  return i
}

function ii(e) {
  const n = e.stand.eltern,
    i = r("div", {
      class: "karte"
    });
  i.append(r("label", {}, "Pausenlänge (Minuten, Standard 3)"));
  const t = r("input", {
    class: "feld",
    type: "number",
    min: "1",
    max: "10",
    value: String(n.pausenMinuten)
  });
  t.addEventListener("change", () => {
    const l = Math.min(10, Math.max(1, Number(t.value) || 3));
    n.pausenMinuten = l, t.value = String(l), e.speichern()
  }), i.append(t);
  const a = (l, c, u) => {
    const d = r("input", {
      type: "checkbox"
    });
    d.checked = c, d.addEventListener("change", () => {
      u(d.checked), e.speichern()
    });
    const h = r("label", {
      style: "display:flex;align-items:center;gap:8px;margin-top:12px;color:var(--text)"
    });
    h.append(d, l), i.append(h)
  };
  a("Sprachausgabe (Computerstimme) an", n.spracheAn, l => {
    n.spracheAn = l, e.tts.aktiv = l
  }), a("Sounds an", n.soundsAn, l => {
    n.soundsAn = l, e.toene.aktiv = l
  }), i.append(r("label", {}, "Sprechtempo"));
  const s = r("select", {
    class: "feld"
  });
  for (const [l, c] of [
      ["normal", "normal"],
      ["langsam", "langsam"]
    ]) {
    const u = r("option", {
      value: l
    }, c);
    n.tempo === l && u.setAttribute("selected", ""), s.append(u)
  }
  return s.addEventListener("change", () => {
    n.tempo = s.value, e.tts.tempo = n.tempo, e.speichern()
  }), i.append(s), i.append(r("div", {
    style: "margin-top:16px"
  }, r("button", {
    class: "knopf",
    onclick: async () => {
      const l = await L("Neue PIN festlegen", "4 Ziffern");
      if (l === null) return;
      if (await L("Neue PIN wiederholen", "") !== l) return alert("Die PINs stimmen nicht überein.");
      await Ae(n, l), e.speichern(), alert("PIN geändert.")
    }
  }, "PIN ändern"))), i
}

function ti(e, n) {
  const i = r("div", {
    class: "karte"
  });
  i.append(r("div", {
    class: "gruppe-name"
  }, "Fortschritt übertragen (Tablet ↔ PC)")), i.append(r("p", {
    class: "hinweis-leise"
  }, "Export speichert ALLE Profile dieses Geräts als Datei. Import ersetzt den Stand dieses Geräts durch die Datei."));
  const t = r("button", {
      class: "knopf primaer",
      onclick: () => {
        const h = new Blob([pn(e.stand)], {
            type: "application/json"
          }),
          g = URL.createObjectURL(h),
          o = new Date().toISOString().slice(0, 10),
          m = r("a", {
            href: g,
            download: `mathefix-export-${o}.json`
          });
        document.body.append(m), m.click(), m.remove(), URL.revokeObjectURL(g)
      }
    }, "⬇ Export"),
    a = r("input", {
      type: "file",
      accept: ".json,application/json",
      style: "display:none"
    });
  a.addEventListener("change", async () => {
    const h = a.files?.[0];
    if (h) try {
      const g = be(wn(await h.text()));
      if (!confirm("Import ersetzt den kompletten Fortschritt auf DIESEM Gerät. Fortfahren?")) return;
      const o = {
        hash: e.stand.eltern.pinHash,
        salt: e.stand.eltern.pinSalt
      };
      e.stand.kinder = g.kinder, e.stand.eltern = g.eltern, o.hash !== null && (e.stand.eltern.pinHash = o.hash, e.stand.eltern.pinSalt = o.salt), e.stand.aktivesKindId = null, e.speichern(), alert("Import fertig."), e.zeige({
        name: "profile"
      })
    } catch (g) {
      alert(g instanceof Error ? g.message : "Import fehlgeschlagen.")
    }
  });
  const s = r("button", {
    class: "knopf",
    onclick: () => a.click()
  }, "⬆ Import");
  i.append(r("div", {
    style: "display:flex;gap:10px;margin:10px 0"
  }, t, s, a)), i.append(r("div", {
    class: "gruppe-name",
    style: "margin-top:14px"
  }, "Block zurücksetzen"));
  const l = e.stand.kinder;
  if (l.length === 0) return i;
  const c = l[Math.min(n, l.length - 1)],
    u = r("select", {
      class: "feld"
    });
  l.forEach((h, g) => {
    const o = r("option", {
      value: String(g)
    }, `${h.avatar} ${h.name}`);
    h === c && o.setAttribute("selected", ""), u.append(o)
  });
  const d = r("select", {
    class: "feld"
  });
  for (const h of ve()) d.append(r("option", {
    value: h
  }, `${h} (Gruppe ${h[0]}, ${N(h)})`));
  return i.append(r("div", {
    style: "display:flex;gap:10px;flex-wrap:wrap;align-items:center"
  }, u, d, r("button", {
    class: "knopf",
    onclick: () => {
      const h = l[Number(u.value)],
        g = d.value;
      confirm(`Alle Durchgänge von Block ${g} bei ${h.name} löschen?`) && (ri(h, g), e.speichern(), alert(`Block ${g} wurde zurückgesetzt.`), ai(e))
    }
  }, "Zurücksetzen"))), i
}

function ri(e, n) {
  e.durchgaenge = e.durchgaenge.filter(t => t.block !== n), e.laufenderBlock?.block === n && (e.laufenderBlock = null);
  const i = n[0];
  e.auswertungFaellig === i && (e.auswertungFaellig = null)
}

function ai(e) {
  ee(e, "daten")
}
async function si() {
  const e = document.getElementById("app");
  if (!e) return;
  let n;
  try {
    const i = await kn(),
      t = new fn,
      a = be(t.laden() ?? zn()),
      s = new En;
    s.aktiv = a.eltern.spracheAn, s.tempo = a.eltern.tempo;
    const l = new An;
    l.aktiv = a.eltern.soundsAn;
    const c = [];
    n = {
      stand: a,
      adapter: t,
      aufgaben: i.aufgaben,
      regeln: i.regeln,
      motivation: new vn(i.motivation),
      tts: s,
      toene: l,
      wurzel: e,
      speichern: () => t.speichern(a),
      kind: () => {
        const u = ue(a, a.aktivesKindId);
        if (!u) throw new Error("Kein Profil gewählt.");
        return u
      },
      beimVerlassen: u => c.push(u),
      zeige: u => {
        for (const d of c.splice(0)) try {
          d()
        } catch {}
        if (s.stopp(), u.name !== "profile" && !ue(a, a.aktivesKindId)) {
          se(n);
          return
        }
        switch (u.name) {
          case "profile":
            return se(n);
          case "levelkarte":
            return Mn(n);
          case "block":
            return Pn(n, u.block);
          case "pause":
            return Cn(n, u.danach);
          case "auswertung":
            return In(n, u.gruppe);
          case "rechenblatt":
            return _n(n, u.block);
          case "uebung":
            return Tn(n, u.aufgabeId);
          case "journal":
            return Xn(n);
          case "eltern":
            ei(n);
            return
        }
      }
    }, n.zeige({
      name: "profile"
    })
  } catch (i) {
    const t = i instanceof Error ? i.message : String(i);
    e.replaceChildren(r("div", {
      class: "laden"
    }, r("div", {
      class: "laden-logo"
    }, "MATHEFIX"), r("p", {}, `Fehler beim Start: ${t}`), r("p", {
      class: "hinweis-leise"
    }, "Bitte die Seite neu laden. Liegt der Ordner data/ neben der App?")))
  }
}
si();
"serviceWorker" in navigator && window.addEventListener("load", () => {
  navigator.serviceWorker.register("sw.js").catch(() => {})
});
