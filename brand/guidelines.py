"""Brand guidelines document (A4 landscape PDF), generated from the same logo code as everything else."""
from pathlib import Path

import logo
import render
import stationery as st
from config import FIRM, GILT, GILT_SOFT, INK, FOREST, IVORY, PAPER, SLATE, STONE

PW, PH = 297, 210  # mm


def fit(svg: str, style: str) -> str:
    return st.fit(svg, style)


def rgb(hexv: str) -> tuple[int, int, int]:
    h = hexv.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def cmyk(hexv: str) -> tuple[int, int, int, int]:
    """Naive RGB to CMYK conversion. A starting point for the printer only; always proof."""
    r, g, b = (v / 255 for v in rgb(hexv))
    k = 1 - max(r, g, b)
    if k >= 1:
        return 0, 0, 0, 100
    c = (1 - r - k) / (1 - k)
    m = (1 - g - k) / (1 - k)
    y = (1 - b - k) / (1 - k)
    return round(c * 100), round(m * 100), round(y * 100), round(k * 100)


CSS = f"""
.pg{{position:relative;width:{PW}mm;height:{PH}mm;overflow:hidden;page-break-after:always;break-after:page}}
.pg:last-child{{page-break-after:auto;break-after:auto}}
.dark{{background:{INK};color:{IVORY}}}
.light{{background:{PAPER};color:{INK}}}
.h1{{font-family:"Cormorant Garamond",serif;font-weight:300;font-size:30pt;line-height:1.05;letter-spacing:-.01em}}
.h1 em{{font-style:italic}}
.body{{font-family:"Geist",sans-serif;font-size:8.4pt;line-height:1.65;color:{SLATE}}}
.dark .body{{color:{STONE}}}
.lab{{font-family:"Geist",sans-serif;font-weight:500;font-size:5.6pt;letter-spacing:.24em;text-transform:uppercase;color:{SLATE}}}
.dark .lab{{color:{GILT_SOFT}}}
.foot{{position:absolute;left:16mm;right:16mm;bottom:9mm;display:flex;justify-content:space-between;font-family:"Geist",sans-serif;font-size:5.4pt;letter-spacing:.2em;text-transform:uppercase;color:{SLATE}}}
.dark .foot{{color:{STONE}}}
.rule{{height:.3mm;background:{GILT}}}
.tile{{position:absolute;overflow:hidden}}
.cap{{font-family:"Geist",sans-serif;font-size:6.4pt;line-height:1.5;color:{SLATE}}}
.cap b{{display:block;font-family:"Cormorant Garamond",serif;font-weight:500;font-size:11pt;color:{INK};margin-bottom:.8mm}}
.dark .cap b{{color:{IVORY}}}
"""


def foot() -> str:
    # %%PG%% is replaced with the real page number when the document is assembled
    return f'<div class="foot"><span>{FIRM["name"]}, Brand guidelines</span><span>%%PG%%</span></div>'


def head(title_html: str, label: str) -> str:
    return (
        f'<div class="abs lab" style="left:16mm;top:14mm">{label}</div>'
        f'<div class="abs h1" style="left:16mm;top:21mm;width:130mm">{title_html}</div>'
    )


# ------------------------------------------------------------------- pages
def cover() -> str:
    seal = fit(logo.seal_svg("on-dark", "line", bg=False, pad=0), "height:100%;width:auto;display:block")
    return f"""<section class="pg dark">
<div class="abs" style="right:30mm;top:19mm;height:172mm">{seal}</div>
<div class="abs lab" style="left:26mm;top:24mm">Brand guidelines</div>
<div class="abs urdu" style="left:26mm;top:30mm;font-size:12pt;color:{GILT_SOFT}">{FIRM['urdu']}</div>
<div class="abs" style="left:26mm;bottom:34mm">
  <div class="serif" style="font-size:50pt;font-weight:300;font-style:italic;line-height:1.02;letter-spacing:-.01em">A&amp;H<br>Legal Partners</div>
  <div class="rule" style="width:16mm;margin:9mm 0 4mm"></div>
  <div class="sans" style="font-size:7pt;letter-spacing:.2em;text-transform:uppercase;color:{STONE}">Version 1.0, October 2026</div>
</div></section>"""


def idea() -> str:
    g = logo.COLORWAYS["on-dark"]
    seal = logo.seal_inner(g, "line")
    # annotation overlay in the seal's own coordinates; the canvas is widened to the right for labels
    notes = [
        (200, 9, "Keystone", "The one stone that locks an arch in place: the two partners who hold the firm."),
        (370, 120, "Outer arch", "The court, and the institution behind every matter."),
        (206, 214, "Ampersand", "The partnership, and the point on which the scales balance."),
        (383, 330, "Inner arch", "The protected space inside which a client's affairs are handled."),
        (330, 500, "Ground line", "Firm footing: preparation before argument."),
    ]
    lines, labels = "", ""
    y0 = 26
    for i, (x, y, name, text) in enumerate(notes):
        ty = y0 + i * 98
        lines += (
            f'<path d="M{x} {y}H446L470 {ty + 4}" stroke="{GILT}" stroke-width="1" fill="none" stroke-opacity=".7"/>'
            f'<circle cx="{x}" cy="{y}" r="3.4" fill="{GILT}"/>'
        )
        labels += (
            f'<text x="480" y="{ty + 3}" font-family="Geist" font-weight="500" font-size="11" letter-spacing="2.4" fill="{GILT_SOFT}">{name.upper()}</text>'
        )
        words, line, row = text.split(), "", 0
        for w in words:
            if len(line) + len(w) + 1 > 36:
                labels += f'<text x="480" y="{ty + 24 + row * 17}" font-family="Geist" font-size="12.6" fill="{STONE}">{line.strip()}</text>'
                line, row = "", row + 1
            line += w + " "
        labels += f'<text x="480" y="{ty + 24 + row * 17}" font-family="Geist" font-size="12.6" fill="{STONE}">{line.strip()}</text>'
    diagram = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -6 820 520" style="width:100%;height:auto;display:block">'
        f"{seal}{lines}{labels}</svg>"
    )
    return f"""<section class="pg dark">
{head("An archway, a <em>keystone</em>,<br>two partners.", "The idea")}
<div class="abs body" style="left:16mm;top:72mm;width:84mm">
  <p>The A&amp;H mark is drawn from a courthouse archway. The double arch is the court and the protection it gives. At its crown sits a keystone, the single stone that holds an arch together, standing for the two partners who hold the firm.</p>
  <p style="margin-top:3.2mm">Between the A and the H, the italic ampersand is the fulcrum of the scales: two people, balanced, carrying one standard of work.</p>
  <p style="margin-top:3.2mm">The same arch appears across the website, the stationery and every future surface, so the firm is recognised before its name is read.</p>
</div>
<div class="abs" style="left:106mm;top:36mm;width:178mm">{diagram}</div>
{foot()}</section>"""


def logos() -> str:
    seal_d = fit(logo.seal_svg("on-dark", "line", bg=False, pad=0), "height:100%;width:auto;display:block")
    lock_p = fit(logo.lockup_horizontal("on-paper", bg=False, pad=0), "width:100%;height:auto;display:block")
    word_d = fit(logo.wordmark_svg("on-dark", bg=False, pad=0), "width:100%;height:auto;display:block")
    sym_p = fit(logo.symbol_svg("on-paper", bg=False, pad=0), "height:100%;width:auto;display:block")
    return f"""<section class="pg light">
{head("One mark,<br><em>four</em> arrangements.", "The logo system")}
<div class="tile" style="left:16mm;top:62mm;width:84mm;height:128mm;background:{INK}"><div class="abs" style="left:50%;top:50%;height:96mm;transform:translate(-50%,-50%)">{seal_d}</div></div>
<div class="abs cap" style="left:106mm;top:62mm;width:42mm"><b>The seal</b>The primary mark. Use it first, wherever there is room: the card, the file cover, the envelope, signage.</div>

<div class="tile" style="left:152mm;top:20mm;width:129mm;height:50mm;background:{PAPER};border:.25mm solid {GILT}"><div class="abs" style="left:50%;top:50%;width:70mm;transform:translate(-50%,-50%)">{lock_p}</div></div>
<div class="abs cap" style="left:152mm;top:73mm;width:60mm"><b>Horizontal lockup</b>For letterheads, documents and any wide, short space.</div>

<div class="tile" style="left:152mm;top:104mm;width:60mm;height:50mm;background:{INK}"><div class="abs" style="left:50%;top:50%;width:38mm;transform:translate(-50%,-50%)">{word_d}</div></div>
<div class="abs cap" style="left:152mm;top:157mm;width:60mm"><b>Wordmark</b>For tight or very small placements where the seal would be too fine.</div>

<div class="tile" style="left:221mm;top:104mm;width:60mm;height:50mm;background:{PAPER};border:.25mm solid {GILT}"><div class="abs" style="left:50%;top:50%;height:30mm;transform:translate(-50%,-50%)">{sym_p}</div></div>
<div class="abs cap" style="left:221mm;top:157mm;width:60mm"><b>The symbol</b>The archway on its own: patterns, watermarks, embossing, favicons.</div>
{foot()}</section>"""


def clearspace() -> str:
    # clear space = capital height of the monogram (77.5 units) on every side
    x = 77.5
    vb = f"{-8 - x} {-x} {416 + 2 * x} {501 + 2 * x}"
    c = logo.COLORWAYS["on-paper"]
    inner = logo.seal_inner(c, "line")
    box = (
        f'<rect x="{-8 - x}" y="{-x}" width="{416 + 2 * x}" height="{501 + 2 * x}" fill="none" stroke="{SLATE}" stroke-width="1.2" stroke-dasharray="6 6"/>'
        f'<rect x="-8" y="0" width="416" height="501" fill="none" stroke="{GILT}" stroke-width=".8" stroke-dasharray="2 4"/>'
        f'<path d="M-8 -{x}V0" stroke="{INK}" stroke-width="1.4"/><path d="M-14 -{x}H-2M-14 0H-2" stroke="{INK}" stroke-width="1.4"/>'
        f'<text x="6" y="-{x / 2 - 8}" font-family="Geist" font-weight="500" font-size="26" fill="{INK}">X</text>'
    )
    diagram = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" style="height:100%;width:auto;display:block">{inner}{box}</svg>'

    def bad(label: str, style: str) -> str:
        sealx = fit(logo.seal_svg("on-paper", "line", bg=False, pad=0), f"height:21mm;width:auto;display:block;{style}")
        cross = (
            f'<div class="abs" style="right:1.6mm;top:1.6mm;width:4.4mm;height:4.4mm;border:.3mm solid {SLATE};border-radius:50%;background:{PAPER}">'
            f'<div class="abs" style="left:50%;top:50%;width:2.4mm;height:.3mm;background:{SLATE};transform:translate(-50%,-50%) rotate(45deg)"></div>'
            f'<div class="abs" style="left:50%;top:50%;width:2.4mm;height:.3mm;background:{SLATE};transform:translate(-50%,-50%) rotate(-45deg)"></div></div>'
        )
        return (
            f'<div style="width:36mm"><div style="height:32mm;background:{PAPER};border:.25mm solid {STONE};display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative">{sealx}{cross}</div>'
            f'<div class="cap" style="margin-top:1.6mm">{label}</div></div>'
        )

    misuse = (
        bad("Do not stretch or squash", "transform:scale(1.55,.8)")
        + bad("Do not recolour", "filter:hue-rotate(150deg) saturate(3)")
        + bad("Do not rotate", "transform:rotate(-14deg)")
        + bad("Do not add effects", "filter:drop-shadow(1.2mm 1.2mm .7mm rgba(0,0,0,.5))")
    )

    def row(a: str, b: str, last: bool = False) -> str:
        line = "" if last else "border-bottom:.25mm solid rgba(76,90,82,.25);"
        return f'<tr><td style="padding:2.1mm 0;{line}">{a}</td><td style="text-align:right;{line}">{b}</td></tr>'

    return f"""<section class="pg light">
{head("Room to <em>breathe</em>.", "Clear space and size")}
<div class="abs body" style="left:16mm;top:50mm;width:78mm">
  <p>Keep a margin equal to the height of the monogram's capital letters (X) free of other type, images and edges, on every side.</p>
  <p style="margin-top:3.2mm">Minimum sizes keep the fine arch lines legible in print and on screen.</p>
</div>
<div class="abs" style="left:16mm;top:88mm;width:78mm;border-top:.25mm solid {GILT}">
  <table style="border-collapse:collapse;width:100%;font-family:Geist,sans-serif;font-size:7pt;color:{INK}">
    {row("The seal", "16 mm / 70 px tall")}{row("Horizontal lockup", "30 mm / 130 px wide")}{row("Wordmark", "22 mm / 100 px wide")}{row("The symbol", "6 mm / 24 px tall", True)}
  </table>
</div>
<div class="abs" style="left:108mm;top:28mm;height:104mm">{diagram}</div>
<div class="abs" style="left:203mm;top:28mm;width:78mm">
  <div class="lab" style="margin-bottom:4mm">Common mistakes</div>
  <div style="display:grid;grid-template-columns:repeat(2,36mm);gap:6mm 6mm">{misuse}</div>
</div>
{foot()}</section>"""


def colour() -> str:
    sw = [
        ("Ink", INK, "Primary. Backgrounds, text on paper.", IVORY),
        ("Forest", FOREST, "Supporting. Panels and surfaces.", IVORY),
        ("Gilt", GILT, "Accent only. Gold foil, hairlines, the ampersand.", INK),
        ("Ivory", IVORY, "Type on dark.", INK),
        ("Paper", PAPER, "Stock and light backgrounds.", INK),
        ("Slate", SLATE, "Secondary text on paper.", IVORY),
    ]
    cells = ""
    for i, (name, hx, use, fg) in enumerate(sw):
        r, g, b = rgb(hx)
        c, m, y, k = cmyk(hx)
        border = f"border:.25mm solid {STONE};" if name in ("Paper", "Ivory") else ""
        cells += f"""<div style="position:absolute;left:{16 + i * 44.4}mm;top:62mm;width:41mm">
  <div style="height:62mm;background:{hx};{border}display:flex;align-items:flex-end;padding:3.4mm"><span style="font-family:'Cormorant Garamond',serif;font-size:14pt;font-style:italic;font-weight:300;color:{fg}">{name}</span></div>
  <div class="cap" style="margin-top:2.6mm"><b style="font-size:8pt;font-family:Geist;font-weight:500;letter-spacing:.06em;margin-bottom:.4mm">{hx.upper()}</b>RGB {r} {g} {b}<br>CMYK {c} {m} {y} {k}<br><span style="display:block;margin-top:1.2mm">{use}</span></div></div>"""
    bars = [(INK, 58), (PAPER, 24), (FOREST, 8), (SLATE, 5), (GILT, 5)]
    bar = "".join(
        f'<div style="flex:{p};background:{col};{"border:.2mm solid " + STONE if col == PAPER else ""}"></div>' for col, p in bars
    )
    return f"""<section class="pg light">
{head("A quiet palette,<br>one <em>gold</em> note.", "Colour")}
<div class="abs body" style="left:164mm;top:24mm;width:117mm">
  <p>Deep library green carries the weight; pale paper gives it air. Gilt is used sparingly, never as a large flood, so that when it appears (a keystone, an ampersand, a hairline) it reads as a mark of care.</p>
</div>
{cells}
<div class="abs lab" style="left:16mm;top:150mm">Proportion across a typical page</div>
<div class="abs" style="left:16mm;top:156mm;width:265mm;height:9mm;display:flex">{bar}</div>
<div class="abs cap" style="left:16mm;top:169mm;width:200mm">CMYK values are a starting point for the printer, not a specification. Ask for a printed proof and, for foil, a physical champagne-gold swatch before approving a run.</div>
{foot()}</section>"""


def typography() -> str:
    return f"""<section class="pg light">
{head("Two <em>voices</em>,<br>one tone.", "Typography")}
<div class="abs" style="left:16mm;top:56mm;width:86mm">
  <div class="serif" style="font-size:78pt;font-weight:300;line-height:1;color:{INK}">Aa<span style="font-style:italic;color:{GILT}">&amp;</span></div>
  <div class="serif" style="font-size:13pt;font-weight:500;margin-top:3mm;color:{INK}">Cormorant Garamond</div>
  <div class="cap" style="margin-top:1mm">Display and headings. Light 300 and Regular 400 for large sizes; Medium 500 for names and the monogram; italic for emphasis and the ampersand.</div>
</div>
<div class="abs" style="left:112mm;top:56mm;width:80mm">
  <div class="sans" style="font-size:78pt;font-weight:300;line-height:1;color:{INK}">Aa</div>
  <div class="sans" style="font-size:10pt;font-weight:500;margin-top:3mm;color:{INK}">Geist</div>
  <div class="cap" style="margin-top:1mm">Text, contact details and small capitals. Regular 400 for reading; Medium 500, tracked wide, for labels.</div>
</div>
<div class="abs" style="left:204mm;top:56mm;width:77mm">
  <div class="urdu" style="font-size:40pt;line-height:1;height:24mm;display:flex;align-items:flex-end;color:{INK};padding-bottom:1mm">اظہار</div>
  <div class="sans" style="font-size:10pt;font-weight:500;margin-top:3mm;color:{INK}">Noto Nastaliq Urdu</div>
  <div class="cap" style="margin-top:1mm">For Urdu names and lines, always in Nastaliq script. Give it generous line spacing so the script is never clipped.</div>
</div>
<div class="abs rule" style="left:16mm;top:128mm;width:265mm;height:.25mm"></div>
<div class="abs lab" style="left:16mm;top:133mm">The scale in use</div>
<div class="abs" style="left:16mm;top:142mm;width:86mm"><div class="serif" style="font-size:25pt;font-weight:300;font-style:italic;color:{INK};line-height:1.05">Measured advice.</div><div class="cap" style="margin-top:2mm">Display. Cormorant Garamond Light Italic, large.</div></div>
<div class="abs" style="left:112mm;top:142mm;width:80mm"><div class="serif" style="font-size:16pt;font-weight:500;color:{INK};line-height:1.1">Azhaar Ahmad Choudhary</div><div class="cap" style="margin-top:2mm">Names and titles. Cormorant Garamond Medium.</div></div>
<div class="abs" style="left:204mm;top:142mm;width:77mm"><div class="sans" style="font-size:5.8pt;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:{INK};line-height:1.1;padding-top:2mm">Advocate High Court</div><div class="sans" style="font-size:7.6pt;color:{SLATE};margin-top:2mm">Near Lahore High Court, Lahore</div><div class="cap" style="margin-top:3.4mm">Labels and text. Geist Medium tracked caps; Geist Regular.</div></div>
<div class="abs cap" style="left:16mm;top:176mm;width:265mm">All three families are free and open source (SIL Open Font License) and available from Google Fonts. Install Cormorant Garamond and Geist on every machine that produces letters, so documents match the stationery.</div>
{foot()}</section>"""



def stationery_small() -> str:
    p = "../out/previews"
    sh = "box-shadow:0 1.6mm 5mm rgba(0,0,0,.55)"
    return f"""<section class="pg dark">
{head("Small formats,<br><em>one</em> system.", "Stationery")}
<div class="abs body" style="left:16mm;top:66mm;width:70mm"><p>The business card carries both partners and a QR code to the website: a light face for the seal, a deep green back for the details.</p><p style="margin-top:3mm">The long envelope has a plain face for the address and a branded face with the postage stamp box and a dark contact bar. Corner arcs borrow the double arch of the logo.</p></div>
<div class="abs" style="left:96mm;top:38mm;width:185mm">
  <div style="display:flex;gap:6mm">
    <img style="width:89.5mm;{sh}" src="{p}/business-card_front.png">
    <img style="width:89.5mm;{sh}" src="{p}/business-card_back.png">
  </div>
  <div style="display:flex;gap:6mm;margin-top:9mm">
    <img style="width:89.5mm;{sh}" src="{p}/envelope-dl_to.png">
    <img style="width:89.5mm;{sh}" src="{p}/envelope-dl_front.png">
  </div>
</div>
{foot()}</section>"""


def stationery_large() -> str:
    p = "../out/previews"
    sh = "box-shadow:0 1.6mm 5mm rgba(0,0,0,.55)"
    return f"""<section class="pg dark">
{head("Large formats,<br><em>same</em> voice.", "Stationery")}
<div class="abs body" style="left:164mm;top:24mm;width:117mm"><p>The letterhead, the A4 envelope and the court file cover follow the pattern of the card: seal and partners at the head, contact details at the foot, a QR code on the letterhead and the file cover, and a faint arch watermark.</p></div>
<div class="abs" style="left:16mm;top:62mm;display:flex;gap:4mm;align-items:flex-start">
  <img style="height:124mm;{sh}" src="{p}/letterhead-a4_specimen.png">
  <img style="height:124mm;{sh}" src="{p}/envelope-a4_front.png">
  <img style="height:124mm;{sh}" src="{p}/file-cover_front.png">
</div>
{foot()}</section>"""


def website_page() -> str:
    return f"""<section class="pg dark">
{head("The same mark,<br><em>on screen</em>.", "Website")}
<div class="abs body" style="left:16mm;top:70mm;width:70mm"><p>The website uses the same archway, the same type and the same palette. Visitors who arrive from a card or a letter see exactly what they were holding.</p></div>
<img class="abs" style="left:96mm;top:34mm;width:185mm;box-shadow:0 2mm 8mm rgba(0,0,0,.55);border:.25mm solid rgba(237,232,220,.18)" src="../assets/website-hero.png">
{foot()}</section>"""



def production() -> str:
    rows = [
        ("Business card", "88.9 x 50.8 mm, 3 mm bleed", "600 gsm uncoated cotton, or 350 gsm duplexed. Face: Paper with the seal and arches in gold foil. Back: Ink flood with ivory text and gold icons. Optional edge painting in Ink.", "business-card_print-bleed3mm.pdf"),
        ("Letterhead", "A4, 210 x 297 mm", "120 gsm uncoated smooth white or pale sage-white. Two colours (Ink and Gilt), or Ink with a gold-foil rule. Fold marks at 99 and 198 mm for a DL envelope.", "letterhead-a4_print.pdf"),
        ("Long envelope", "DL, 220 x 110 mm, 3 mm bleed", "120 gsm uncoated. One side plain with address lines, one side branded with the dark contact bar. Check the printer's flap dieline before approving.", "envelope-dl_print-bleed3mm.pdf"),
        ("A4 envelope", "210 x 297 mm, 3 mm bleed", "A large flat envelope for unfolded documents, 120 gsm or heavier. Same two sides as the long envelope.", "envelope-a4_print-bleed3mm.pdf"),
        ("File cover", "225 x 310 mm, 3 mm bleed", "300 gsm card, folded. The front takes the case details; the inside carries the proceedings log with two advocates' names at the foot.", "file-cover_print-bleed3mm.pdf"),
        ("QR code", "Minimum 15 mm square", "Always dark on light, with a quiet zone of at least three modules. Never recolour to gold. Scan a printed proof before approving the run.", "stationery/qr/qr_website.svg"),
    ]
    body = "".join(
        f"""<tr><td style="padding:2.5mm 4mm 2.5mm 0;font-family:'Cormorant Garamond',serif;font-size:11.5pt;font-weight:500;color:{INK};vertical-align:top;width:40mm">{a}<div class="cap" style="font-family:Geist">{b}</div></td>
<td style="padding:2.5mm 6mm 2.5mm 0;font-family:Geist,sans-serif;font-size:7.2pt;line-height:1.55;color:{SLATE};vertical-align:top">{c}</td>
<td style="padding:2.5mm 0;font-family:Geist,sans-serif;font-size:6.2pt;color:{SLATE};vertical-align:top;width:52mm;letter-spacing:.02em">{d}</td></tr>
<tr><td colspan="3" style="height:.25mm;background:rgba(76,90,82,.22)"></td></tr>"""
        for a, b, c, d in rows
    )
    return f"""<section class="pg light">
{head("Ready for the <em>printer</em>.", "Production")}
<div class="abs" style="left:16mm;top:50mm;width:265mm;border-top:.25mm solid {GILT}">
  <table style="border-collapse:collapse;width:100%">{body}</table>
</div>
<div class="abs cap" style="left:16mm;top:182mm;width:265mm">To change any detail (website, email, telephone numbers, address), edit brand/config.py and run <span style="font-family:Geist;font-weight:500;font-size:6.4pt;color:{INK}">npm run brand</span> to regenerate all files. The Urdu rendering of the name is a transliteration: please have a native reader confirm it before printing.</div>
{foot()}</section>"""


def build(out: Path, build_dir: Path):
    site_shot = out.parent / "assets" / "website-hero.png"
    pages = [cover(), idea(), logos(), clearspace(), colour(), typography(), stationery_small(), stationery_large()]
    if site_shot.exists():
        pages.append(website_page())
    pages.append(production())
    html = st.head(CSS + f"@page{{size:{PW}mm {PH}mm;margin:0}}") + "".join(pages) + "</body></html>"
    parts = html.split("%%PG%%")
    # the cover is page 1 and carries no footer, so numbering starts at 2
    html = parts[0] + "".join(f"{i + 2:02d}" + tail for i, tail in enumerate(parts[1:]))
    f = build_dir / "guidelines.html"
    f.write_text(html, encoding="utf-8")
    render.to_pdf(f, out / "AH-Legal-Partners_Brand-Guidelines.pdf")
