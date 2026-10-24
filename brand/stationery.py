"""
Stationery templates for A&H Legal Partners. All sizes are in millimetres.

    business card      88.9 x 50.8 mm   two sides: logo + website QR / both partners' details
    letterhead         A4               logo, website QR, watermark, contact footer
    envelope (DL)      220 x 110 mm     "TO:" side + branded side with stamp box and contact bar
    envelope (A4)      210 x 297 mm     same system on a large flat envelope
    file cover         225 x 310 mm     court case front + proceedings log inside

Each function returns the HTML for one or more `.page` blocks. Rendering to PDF/PNG
happens in build.py (Edge/Chrome headless).
"""
import re
from pathlib import Path

import segno

import logo
from config import FIRM, GILT, GILT_SOFT, INK, IVORY, PAPER, PEOPLE, SLATE, STONE

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "node_modules" / "@phosphor-icons" / "core" / "assets" / "light"
BLEED = 3  # mm

CARD_W, CARD_H = 88.9, 50.8
A4_W, A4_H = 210.0, 297.0
ENV_W, ENV_H = 220.0, 110.0
FILE_W, FILE_H = 225.0, 310.0

ADDRESS = ", ".join(FIRM["address"])


# ------------------------------------------------------------------ building blocks
def fit(svg: str, style: str) -> str:
    return svg.replace("<svg ", f'<svg style="{style}" ', 1)


def qr_svg(data: str, dark: str = INK, error: str = "m") -> str:
    """Vector QR code (no quiet zone; the layout supplies the margin).

    One filled path made of horizontal runs. Each run is a hair taller than a module so that
    adjacent rows overlap: stroked lines or exactly-touching rectangles can leave faint seams
    in some PDF viewers and print RIPs.
    """
    code = segno.make(data, error=error, micro=False)
    n = code.symbol_size(scale=1, border=0)[0]
    parts = []
    for y, row in enumerate(code.matrix):
        x = 0
        while x < n:
            if row[x]:
                start = x
                while x < n and row[x]:
                    x += 1
                parts.append(f"M{start} {y}h{x - start}v1.04h-{x - start}z")
            else:
                x += 1
    return (
        f'<svg viewBox="0 0 {n} {n}" xmlns="http://www.w3.org/2000/svg">'
        f'<path d="{"".join(parts)}" fill="{dark}"/></svg>'
    )


def icon(name: str, size: float, color: str) -> str:
    """Phosphor 'light' icon, sized in mm."""
    svg = (ICONS / f"{name}-light.svg").read_text(encoding="utf-8")
    return svg.replace(
        "<svg ", f'<svg style="width:{size}mm;height:{size}mm;color:{color};flex:none;display:block" ', 1
    )


def box(inner: str = "", x=None, y=None, w=None, h=None, right=None, bottom=None, style: str = "") -> str:
    """Absolutely positioned block, coordinates in mm."""
    pos = []
    for key, val in (("left", x), ("right", right), ("top", y), ("bottom", bottom), ("width", w), ("height", h)):
        if val is not None:
            pos.append(f"{key}:{val}mm")
    return f'<div class="abs" style="{";".join(pos)};{style}">{inner}</div>'


def rule(x=None, y=None, w=None, right=None, color=GILT, thick=0.28, opacity=1.0) -> str:
    return box("", x=x, y=y, w=w, h=thick, right=right, style=f"background:{color};opacity:{opacity}")


def corner_arcs(corner: str, r: float, gap: float = 2.4, color: str = GILT, opacity: float = 1.0, sw: float = 0.24) -> str:
    """Two concentric quarter-arcs hugging a corner of the trim box: the double-arch motif, scaled to a corner."""
    pos = {"tl": "left:0;top:0", "tr": "right:0;top:0", "br": "right:0;bottom:0", "bl": "left:0;bottom:0"}[corner]
    rot = {"tl": 0, "tr": 90, "br": 180, "bl": 270}[corner]
    r2 = r - gap
    svg = (
        f'<svg viewBox="0 0 {r} {r}" fill="none" style="width:{r}mm;height:{r}mm;display:block;overflow:visible;'
        f'transform:rotate({rot}deg);opacity:{opacity}">'
        f'<path d="M{r} 0A{r} {r} 0 0 1 0 {r}" stroke="{color}" stroke-width="{sw}"/>'
        f'<path d="M{r2} 0A{r2} {r2} 0 0 1 0 {r2}" stroke="{color}" stroke-width="{sw}" stroke-opacity=".7"/></svg>'
    )
    return f'<div class="abs" style="{pos};width:{r}mm;height:{r}mm">{svg}</div>'


def row(icon_name: str, text: str, pt: float = 6, icon_mm: float = 3.2, icon_color: str = GILT,
        color: str = INK, gap: float = 1.6, weight: int = 400, style: str = "") -> str:
    """Icon + text line, as used for phones, website and address."""
    return (
        f'<div style="display:flex;align-items:center;gap:{gap}mm;font-family:Geist,sans-serif;font-size:{pt}pt;'
        f'line-height:1.4;color:{color};font-weight:{weight};{style}">'
        f"{icon(icon_name, icon_mm, icon_color)}<span>{text}</span></div>"
    )


def names_caps(sep: str = "<br>") -> str:
    return sep.join(p["name"].upper() for p in PEOPLE)


def seal(cw: str = "on-paper", height: float = 30) -> str:
    return fit(logo.seal_svg(cw, "line", bg=False, pad=0), f"height:{height}mm;width:auto;display:block")


def lockup(cw: str = "on-paper", width: float = 50) -> str:
    return fit(logo.lockup_horizontal(cw, bg=False, pad=0), f"width:{width}mm;height:auto;display:block")


def wordmark(cw: str = "on-paper", width: float = 20) -> str:
    return fit(logo.wordmark_svg(cw, bg=False, pad=0), f"width:{width}mm;height:auto;display:block")


def qr_block(size: float, caption_pt: float = 3.6, x=None, y=None, right=None, dark: str = INK, color: str = INK, with_rule: bool = True) -> str:
    """QR code with the 'scan to visit our website' caption and a small rule, as in the reference pieces."""
    qr = fit(qr_svg(FIRM["url"], dark), "width:100%;height:100%;display:block")
    w = max(size + 8, 24)
    inner = (
        f'<div style="width:{size}mm;height:{size}mm;margin:0 auto">{qr}</div>'
        f'<div class="sans caps" style="margin-top:{size * 0.12:.2f}mm;font-size:{caption_pt}pt;letter-spacing:.16em;'
        f'line-height:1.6;color:{color}">Scan to visit<br>our website</div>'
        + (f'<div style="width:{size * 0.36:.2f}mm;height:.25mm;background:{GILT};margin:{size * 0.1:.2f}mm auto 0"></div>' if with_rule else "")
    )
    # centre the block on the QR: `x`/`right` refer to the QR square itself
    shift = (w - size) / 2
    return box(
        inner,
        x=None if x is None else x - shift,
        right=None if right is None else right - shift,
        y=y, w=w, style="text-align:center",
    )


def watermark(height: float, x=None, y=None, right=None, bottom=None, opacity: float = 0.09) -> str:
    svg = fit(logo.seal_svg("gilt", "mono", bg=False, pad=0), "height:100%;width:auto;display:block")
    return box(svg, x=x, y=y, h=height, right=right, bottom=bottom, style=f"opacity:{opacity}")


# ------------------------------------------------------------------ page plumbing
def head(css: str = "") -> str:
    return f"""<!doctype html><html lang="en"><meta charset="utf-8">
<style>
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-300-normal.woff2");font-weight:300;font-style:normal}}
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-400-normal.woff2");font-weight:400;font-style:normal}}
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-500-normal.woff2");font-weight:500;font-style:normal}}
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-600-normal.woff2");font-weight:600;font-style:normal}}
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-300-italic.woff2");font-weight:300;font-style:italic}}
@font-face{{font-family:"Cormorant Garamond";src:url("fonts/cormorant-garamond-latin-400-italic.woff2");font-weight:400;font-style:italic}}
@font-face{{font-family:"Geist";src:url("fonts/geist-latin-wght-normal.woff2");font-weight:100 900}}
@font-face{{font-family:"Noto Nastaliq Urdu";src:url("fonts/noto-nastaliq-urdu-arabic-400-normal.woff2");font-weight:400}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.page{{position:relative;overflow:hidden;page-break-after:always;break-after:page}}
.page:last-child{{page-break-after:auto;break-after:auto}}
.abs{{position:absolute}}
.serif{{font-family:"Cormorant Garamond",serif}}
.sans{{font-family:"Geist",sans-serif}}
.urdu{{font-family:"Noto Nastaliq Urdu",serif;direction:rtl;line-height:2}}
.caps{{text-transform:uppercase;letter-spacing:.22em;font-weight:500}}
{css}
</style><body>"""


def doc(pages: list[str], size: tuple[float, float]) -> str:
    w, h = size
    return head(f"@page{{size:{w}mm {h}mm;margin:0}}") + "".join(pages) + "</body></html>"


def page(trim_w: float, trim_h: float, inner: str, bg: str | None = None, bleed: float = BLEED) -> str:
    """A page of trim size plus bleed. `inner` is positioned in trim coordinates."""
    b = f"background:{bg};" if bg else ""
    w, h = trim_w + 2 * bleed, trim_h + 2 * bleed
    return (
        f'<section class="page" style="width:{w}mm;height:{h}mm;{b}">'
        f'<div class="abs" style="left:{bleed}mm;top:{bleed}mm;width:{trim_w}mm;height:{trim_h}mm">{inner}</div></section>'
    )


def page_size(trim_w: float, trim_h: float, bleed: float = BLEED) -> tuple[float, float]:
    return trim_w + 2 * bleed, trim_h + 2 * bleed


# ------------------------------------------------------------------ business card
def card_front() -> str:
    W, H = CARD_W, CARD_H
    cx = 63.2  # centre line of the right-hand column
    names = (
        f'<div class="sans" style="font-size:4.3pt;font-weight:600;letter-spacing:.17em;line-height:1.8;color:{INK};text-align:center">{names_caps()}</div>'
        f'<div style="width:7mm;height:.28mm;background:{GILT};margin:1.5mm auto 1.4mm"></div>'
        f'<div class="sans caps" style="font-size:3.4pt;letter-spacing:.26em;color:{SLATE};text-align:center">{FIRM["descriptor"]}</div>'
    )
    inner = (
        corner_arcs("tl", 11, 2.2, GILT, 0.95)
        + corner_arcs("br", 11, 2.2, GILT, 0.95)
        + box(seal("on-paper", 34), x=9.0, y=8.4)
        + qr_block(16, 3.4, x=cx - 8, y=6.4, with_rule=False)
        + box(names, x=cx - 20, y=32.6, w=40)
    )
    return page(W, H, inner, PAPER)


def card_back() -> str:
    W, H = CARD_W, CARD_H
    cols = ""
    for i, p in enumerate(PEOPLE):
        x = 7.2 + i * 40.6
        cols += box(
            f'<div class="serif" style="font-size:9.6pt;font-weight:500;line-height:1.1;color:{IVORY};white-space:nowrap">{p["name"]}</div>'
            f'<div class="sans caps" style="font-size:3.5pt;letter-spacing:.24em;color:{GILT_SOFT};margin-top:1.3mm">{p["title"]}</div>'
            f'<div style="margin-top:2.6mm">{row("device-mobile", p["phone"], 6.6, 3.4, GILT, IVORY, 1.5, 500)}</div>',
            x=x, y=18.2, w=36,
        )
    bottom = (
        box(row("map-pin", f'{FIRM["address"][0]},<br>{FIRM["address"][1]}', 4.9, 3.2, GILT, IVORY, 1.5, 400,
                "line-height:1.5;opacity:.88"), x=7.2, y=40.6, w=38)
        + box(
            row("envelope-simple", FIRM["email"], 4.9, 3.2, GILT, IVORY, 1.5, 400, "opacity:.88")
            + '<div style="height:1.1mm"></div>'
            + row("globe", FIRM["web"], 4.9, 3.2, GILT, IVORY, 1.5, 400, "opacity:.88"),
            x=47.8, y=40.6, w=36,
        )
    )
    inner = (
        corner_arcs("br", 12, 2.2, GILT, 0.6)
        + box(wordmark("on-dark", 17), x=7.2, y=4.2)
        + box(f'<span class="urdu" style="font-size:5.8pt;color:{GILT_SOFT}">{FIRM["urdu"]}</span>', right=7.2, y=4.4)
        + rule(7.2, 14.6, W - 14.4, color=GILT, opacity=0.6)
        + cols
        + box("", x=45.2, y=18.2, w=0.2, h=17.4, style=f"background:{IVORY};opacity:.2")
        + rule(7.2, 38.4, W - 14.4, color=IVORY, opacity=0.18)
        + bottom
    )
    return page(W, H, inner, INK)


def business_card_doc(sides=("front", "back")) -> str:
    pages = []
    if "front" in sides:
        pages.append(card_front())
    if "back" in sides:
        pages.append(card_back())
    return doc(pages, page_size(CARD_W, CARD_H))


# ------------------------------------------------------------------ letterhead
def letterhead_page(specimen: bool = False, preview_bg: bool = False) -> str:
    ML = 20
    folds = "".join(
        f'<div class="abs" style="left:0;top:{y}mm;width:5mm;height:.25mm;background:{SLATE};opacity:.55"></div>'
        for y in (99, 198)
    )
    header = (
        box(lockup("on-paper", 47), x=ML, y=13)
        + box(
            f'<div class="sans" style="font-size:4.9pt;font-weight:600;letter-spacing:.2em;color:{INK}">{names_caps(" &nbsp;|&nbsp; ")}</div>'
            f'<div class="sans caps" style="font-size:4.2pt;letter-spacing:.26em;color:{SLATE};margin-top:1.4mm">{FIRM["descriptor"]}</div>'
            f'<div class="serif" style="font-size:9.4pt;font-style:italic;font-weight:400;color:{SLATE};margin-top:1.6mm">{FIRM["tagline"]}</div>',
            x=ML, y=40.5,
        )
        + qr_block(19, 3.6, right=ML, y=12.5)
        + rule(ML, 57, 210 - 2 * ML, color=GILT)
    )
    footer = (
        rule(ML, 259, 210 - 2 * ML, color=GILT)
        + box(
            f'<div style="display:flex;justify-content:center;align-items:center;gap:6.5mm">'
            + row("device-mobile", PEOPLE[0]["phone"], 6.4, 3.4, GILT, INK, 1.5, 500)
            + row("device-mobile", PEOPLE[1]["phone"], 6.4, 3.4, GILT, INK, 1.5, 500)
            + row("envelope-simple", FIRM["email"], 6.4, 3.4, GILT, INK, 1.5, 500)
            + row("globe", FIRM["web"], 6.4, 3.4, GILT, INK, 1.5, 500)
            + "</div>",
            x=0, w=210, y=264.6,
        )
        + box(
            f'<div style="display:flex;justify-content:center">{row("map-pin", ADDRESS, 5.8, 3.2, GILT, SLATE, 1.5, 400)}</div>',
            x=0, w=210, y=272.4,
        )
    )
    body = ""
    if specimen:
        body = box(
            f'<div class="sans" style="font-size:7.4pt;color:{SLATE};line-height:1.8">Ref: AH/2026/014<br>24 October 2026</div>'
            f'<div style="margin-top:9mm">The Managing Director<br>[Client company name]<br>[Address], Lahore</div>'
            f'<div style="margin-top:9mm">Dear Sir,</div>'
            f'<div class="sans caps" style="margin-top:5mm;font-size:6.6pt;letter-spacing:.16em">Re: Legal opinion on the proposed share purchase agreement</div>'
            f'<p style="margin-top:5mm">We write further to our meeting of last week. Having reviewed the draft agreement and the supporting corporate records, we set out below our advice on the principal risks and the amendments we recommend before signature.</p>'
            f'<p style="margin-top:3.6mm">In summary, the draft is workable but leaves the buyer exposed on the warranty and indemnity provisions. We propose a short list of changes, and we would be glad to discuss them at your convenience.</p>'
            f'<p style="margin-top:3.6mm">Please do not hesitate to contact us should you require anything further.</p>'
            f'<div style="margin-top:7mm">Yours faithfully,</div>'
            f'<div style="margin-top:14mm;font-weight:600">{PEOPLE[0]["name"]}</div>'
            f'<div class="sans" style="font-size:7pt;color:{SLATE};line-height:1.6;font-weight:400">{PEOPLE[0]["title"]}</div>',
            x=ML, y=68, w=210 - 2 * ML,
            style=f"font-family:'Cormorant Garamond',serif;font-size:11.5pt;line-height:1.5;color:{INK};font-weight:500",
        )
    inner = (
        watermark(168, x=(210 - 134.4) / 2, y=84, opacity=0.075)
        + corner_arcs("tl", 15, 2.6, GILT, 0.9)
        + corner_arcs("br", 15, 2.6, GILT, 0.9)
        + folds + header + body + footer
    )
    # Letterhead prints on the firm's own stock, so no bleed and no tint unless previewing.
    return page(A4_W, A4_H, inner, PAPER if preview_bg else "#fff", bleed=0)


def letterhead_doc(specimen: bool = False, preview_bg: bool = False) -> str:
    return doc([letterhead_page(specimen, preview_bg)], (A4_W, A4_H))


# ------------------------------------------------------------------ envelope helpers
def to_lines(x0: float, x1: float, y0: float, n: int, step: float, label_pt: float = 12) -> str:
    """'TO:' label followed by n hand-writing lines."""
    out = box(f'<span class="serif" style="font-size:{label_pt}pt;font-weight:600;letter-spacing:.06em;color:{INK}">TO:</span>', x=x0, y=y0 - 6.4)
    out += rule(x0 + 13, y0, x1 - x0 - 13, color=GILT, thick=0.25)
    for i in range(1, n):
        out += rule(x0, y0 + i * step, x1 - x0, color=GILT, thick=0.25)
    return out


def contact_bar(W: float, y0: float, h: float, label_pt: float = 5.8, pad: float = 14, col_w=(86, 54, 50),
                bleed: float = BLEED) -> str:
    """Dark footer band with address, phones and website. Spans the full page width including bleed."""
    gx = pad
    c2 = gx + col_w[0] + 6
    c3 = c2 + col_w[1] + 6
    mid = y0 + h / 2
    band = box("", x=-bleed, y=y0, w=W + 2 * bleed, h=h + bleed, style=f"background:{INK}")
    hair = box("", x=-bleed, y=y0, w=W + 2 * bleed, h=0.35, style=f"background:{GILT}")
    wm = watermark(h * 1.7, right=-9, y=-h * 0.3, opacity=0.13)
    clip = box(wm, x=0, y=y0, w=W, h=h, style="overflow:hidden")
    col1 = box(row("map-pin", f'{FIRM["address"][0]},<br>{FIRM["address"][1]}', label_pt, 3.8, GILT, IVORY, 2.2, 400, "line-height:1.55"),
               x=gx, y=mid - 4.2, w=col_w[0])
    col2 = box(
        row("device-mobile", PEOPLE[0]["phone"], label_pt, 3.8, GILT, IVORY, 2.2, 500)
        + '<div style="height:1.4mm"></div>'
        + row("device-mobile", PEOPLE[1]["phone"], label_pt, 3.8, GILT, IVORY, 2.2, 500),
        x=c2, y=mid - 4.4, w=col_w[1],
    )
    col3 = box(
        row("envelope-simple", FIRM["email"], label_pt, 3.8, GILT, IVORY, 2.2, 500)
        + '<div style="height:1.4mm"></div>'
        + row("globe", FIRM["web"], label_pt, 3.8, GILT, IVORY, 2.2, 500),
        x=c3, y=mid - 4.4, w=col_w[2],
    )
    seps = (
        box("", x=c2 - 3, y=mid - 5.6, w=0.2, h=11.2, style=f"background:{IVORY};opacity:.25")
        + box("", x=c3 - 3, y=mid - 5.6, w=0.2, h=11.2, style=f"background:{IVORY};opacity:.25")
    )
    return band + hair + clip + col1 + col2 + col3 + seps


def partners_block(x: float, y: float, w: float, name_pt: float = 9.4, title_pt: float = 5.8, gap: float = 3.4) -> str:
    out = ""
    for p in PEOPLE:
        out += (
            f'<div class="serif" style="font-size:{name_pt}pt;font-weight:500;color:{INK};line-height:1.15">{p["name"]}</div>'
            f'<div class="sans" style="font-size:{title_pt}pt;color:{SLATE};margin:.7mm 0 {gap}mm">{p["title"]}</div>'
        )
    return box(out, x=x, y=y, w=w)


# ------------------------------------------------------------------ envelope (DL)
def envelope_dl_to() -> str:
    W, H = ENV_W, ENV_H
    inner = (
        corner_arcs("tl", 13, 2.4, GILT, 0.6)
        + corner_arcs("br", 13, 2.4, GILT, 0.6)
        + to_lines(74, 196, 46, 3, 12.5, 12)
    )
    return page(W, H, inner, PAPER)


def envelope_dl_front() -> str:
    W, H = ENV_W, ENV_H
    stamp = box(
        f'<div class="sans caps" style="font-size:4.8pt;letter-spacing:.2em;line-height:1.7;color:{SLATE};text-align:center">Postage<br>stamp</div>',
        right=11, y=9, w=24, h=26,
        style=f"border:.3mm solid {GILT};display:flex;align-items:center;justify-content:center",
    )
    inner = (
        corner_arcs("tl", 10, 2.2, GILT, 0.6)
        + box(lockup("on-paper", 54), x=14, y=11)
        + rule(14, 43.5, 82, color=GILT)
        + partners_block(14, 47.5, 82)
        + rule(14, 71.2, 82, color=GILT)
        + stamp
        + contact_bar(W, 87.5, 22.5)
    )
    return page(W, H, inner, PAPER)


def envelope_dl_doc(sides=("to", "front")) -> str:
    pages = []
    if "to" in sides:
        pages.append(envelope_dl_to())
    if "front" in sides:
        pages.append(envelope_dl_front())
    return doc(pages, page_size(ENV_W, ENV_H))


# ------------------------------------------------------------------ envelope (A4)
def envelope_a4_to() -> str:
    inner = (
        corner_arcs("tl", 18, 2.8, GILT, 0.6)
        + corner_arcs("br", 18, 2.8, GILT, 0.6)
        + to_lines(48, 182, 126, 6, 11.5, 13)
    )
    return page(A4_W, A4_H, inner, PAPER)


def envelope_a4_front() -> str:
    tag = box(
        f'<div class="sans caps" style="font-size:5.2pt;letter-spacing:.32em;line-height:2;color:{SLATE};text-align:right;'
        f'padding:3.4mm 0;border-top:.3mm solid {GILT};border-bottom:.3mm solid {GILT}">Measured<br>advice.<br>Decisive<br>advocacy.</div>',
        right=16, y=16, w=38,
    )
    inner = (
        corner_arcs("tl", 12, 2.4, GILT, 0.6)
        + watermark(150, right=-30, y=128, opacity=0.1)
        + box(lockup("on-paper", 66), x=16, y=16)
        + rule(16, 62, 110, color=GILT)
        + partners_block(16, 66.5, 110, 10.6, 6.4, 4)
        + rule(16, 92.5, 110, color=GILT)
        + tag
        + contact_bar(A4_W, 265, 32, 6.2, 16, (84, 50, 46))
    )
    return page(A4_W, A4_H, inner, PAPER)


def envelope_a4_doc(sides=("to", "front")) -> str:
    pages = []
    if "to" in sides:
        pages.append(envelope_a4_to())
    if "front" in sides:
        pages.append(envelope_a4_front())
    return doc(pages, page_size(A4_W, A4_H))


# ------------------------------------------------------------------ file cover (court file)
def _field(label: str, y: float, x0: float = 22, x1: float = 203, label_w: float | None = None) -> str:
    lw = label_w if label_w is not None else len(label) * 2.55 + 4
    return (
        box(f'<span class="serif" style="font-size:14.5pt;font-weight:500;color:{INK}">{label}</span>', x=x0, y=y - 6.1)
        + rule(x0 + lw, y, x1 - x0 - lw, color=INK, thick=0.22, opacity=0.55)
    )


def file_cover_front() -> str:
    W, H = FILE_W, FILE_H
    fields = (
        _field("In the Court of", 125)
        + rule(55, 146, 115, color=INK, thick=0.22, opacity=0.55)
        + box('<span class="serif" style="font-size:14.5pt;font-weight:500;letter-spacing:.1em">VS</span>', x=0, w=W, y=152.2, style="text-align:center")
        + rule(55, 178, 115, color=INK, thick=0.22, opacity=0.55)
        + _field("Nature of Case", 199)
        + _field("Advocate", 218)
        + _field("On behalf of", 237)
    )
    head_block = (
        box(seal("on-paper", 62), x=(W - 49.6) / 2, y=14)
        + box(
            f'<div class="sans caps" style="font-size:5.8pt;letter-spacing:.28em;color:{INK};text-align:center">{FIRM["descriptor"]}</div>'
            f'<div class="sans" style="font-size:5.4pt;font-weight:600;letter-spacing:.2em;color:{SLATE};text-align:center;margin-top:1.6mm">{names_caps("  &nbsp;|&nbsp;  ")}</div>'
            f'<div class="serif" style="font-size:10.5pt;font-style:italic;color:{SLATE};text-align:center;margin-top:2mm">{FIRM["tagline"]}</div>',
            x=0, w=W, y=82,
        )
    )
    footer = (
        rule(14, 259, W - 28, color=INK, thick=0.22, opacity=0.6)
        + qr_block(21, 3.6, x=14, y=264.5, color=INK)
        + box(
            row("device-mobile", PEOPLE[0]["phone"], 7, 3.6, GILT, INK, 1.8, 500, "justify-content:flex-end")
            + '<div style="height:1.5mm"></div>'
            + row("device-mobile", PEOPLE[1]["phone"], 7, 3.6, GILT, INK, 1.8, 500, "justify-content:flex-end")
            + '<div style="height:1.5mm"></div>'
            + row("envelope-simple", FIRM["email"], 7, 3.6, GILT, INK, 1.8, 500, "justify-content:flex-end")
            + '<div style="height:1.5mm"></div>'
            + row("globe", FIRM["web"], 7, 3.6, GILT, INK, 1.8, 500, "justify-content:flex-end")
            + '<div style="height:1.5mm"></div>'
            + row("map-pin", ADDRESS, 6.2, 3.4, GILT, SLATE, 1.8, 400, "justify-content:flex-end"),
            right=14, y=265.4, w=120,
        )
    )
    inner = (
        corner_arcs("tl", 22, 3, GILT, 0.9)
        + corner_arcs("br", 18, 2.8, GILT, 0.9)
        + head_block + fields + footer
    )
    return page(W, H, inner, PAPER)


def file_cover_inside() -> str:
    W, H = FILE_W, FILE_H
    L, T, TW = 13, 13, W - 26
    col = [26, 72.5, 26, 72.5]
    rows, rh = 15, 15.4
    head_y = T
    # header row + body rows drawn as boxes with hairlines
    cells = ""
    x = L
    for i, (name, wcol) in enumerate(zip(["Date", "Proceeding", "Date", "Proceeding"], col)):
        cells += box(
            f'<span class="serif" style="font-size:12.5pt;font-weight:500;color:{INK}">{name}</span>',
            x=x, y=head_y, w=wcol, h=9.6,
            style=f"background:{INK};background:rgba(10,21,18,.07);display:flex;align-items:center;justify-content:center",
        )
        x += wcol
    grid = ""
    body_top = T + 9.6
    for r in range(rows + 1):
        grid += rule(L, body_top + r * rh, TW, color=INK, thick=0.18, opacity=0.38)
    x = L
    for wcol in col[:-1]:
        x += wcol
        grid += box("", x=x, y=T, w=0.18, h=9.6 + rows * rh, style=f"background:{INK};opacity:.38")
    table_h = 9.6 + rows * rh
    frame = box("", x=L, y=T, w=TW, h=table_h + 44, style=f"border:.4mm solid {INK}")
    bottom_y = T + table_h
    sign = box("", x=L, y=bottom_y, w=TW, h=0.4, style=f"background:{INK}")
    partners = ""
    for i, p in enumerate(PEOPLE):
        partners += box(
            f'<div class="serif" style="font-size:12.5pt;font-weight:500;color:{INK};text-align:center">{p["name"]}</div>'
            f'<div class="sans" style="font-size:6.4pt;color:{SLATE};text-align:center;margin-top:.8mm">{p["title"]}</div>',
            x=L + i * (TW / 2), w=TW / 2, y=bottom_y + 4.2,
        )
    midline = box("", x=L + TW / 2, y=bottom_y + 3.8, w=0.2, h=11.5, style=f"background:{INK};opacity:.4")
    foot_lines = (
        rule(L + 14, bottom_y + 18.6, TW - 28, color=INK, thick=0.18, opacity=0.3)
        + box(
            f'<div style="display:flex;justify-content:center">{row("map-pin", ADDRESS, 6.6, 3.4, GILT, SLATE, 1.6, 400)}</div>',
            x=L, w=TW, y=bottom_y + 22.2,
        )
        + box(
            f'<div style="display:flex;justify-content:center;align-items:center;gap:6mm">'
            + row("device-mobile", PEOPLE[0]["phone"], 6.8, 3.5, GILT, INK, 1.6, 500)
            + row("device-mobile", PEOPLE[1]["phone"], 6.8, 3.5, GILT, INK, 1.6, 500)
            + row("envelope-simple", FIRM["email"], 6.8, 3.5, GILT, INK, 1.6, 500)
            + row("globe", FIRM["web"], 6.8, 3.5, GILT, INK, 1.6, 500)
            + "</div>",
            x=L, w=TW, y=bottom_y + 30,
        )
    )
    inner = (
        corner_arcs("tl", 8, 2, GILT, 0.9)
        + corner_arcs("br", 8, 2, GILT, 0.9)
        + frame + cells + grid + sign + partners + midline + foot_lines
    )
    return page(W, H, inner, PAPER)


def file_cover_doc(sides=("front", "inside")) -> str:
    pages = []
    if "front" in sides:
        pages.append(file_cover_front())
    if "inside" in sides:
        pages.append(file_cover_inside())
    return doc(pages, page_size(FILE_W, FILE_H))
