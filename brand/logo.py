"""
A&H Legal Partners logo system, drawn as pure vector.

Symbol  : "The Archway", a double arch with a keystone. Echoes the courthouse
          arch used across the website.
Seal    : the symbol with the A&H monogram set inside.
Lockups : horizontal and stacked arrangements with the wordmark.

All geometry lives in a 400 x 500 box (4:5), the same ratio as the website's
hero arch, so site and stationery share one shape.
"""
from config import FOREST, GILT, GILT_SOFT, INK, IVORY, PAPER
from glyphs import corm, geist

W, H = 400, 500

# colourways: lines = arch strokes, key = keystone, a/h = letters, amp = ampersand, text = small caps
COLORWAYS = {
    "on-dark":   dict(bg=INK,   lines=GILT, key=GILT, letters=IVORY, amp=GILT, text=GILT_SOFT),
    "on-paper":  dict(bg=PAPER, lines=GILT, key=GILT, letters=INK,   amp=GILT, text=INK),
    "ink":       dict(bg=None,  lines=INK,  key=INK,  letters=INK,   amp=INK,  text=INK),
    "gilt":      dict(bg=None,  lines=GILT, key=GILT, letters=GILT,  amp=GILT, text=GILT),
    "ivory":     dict(bg=None,  lines=IVORY, key=IVORY, letters=IVORY, amp=IVORY, text=IVORY),
}

_A = corm(500)          # caps
_AMP = corm(300, True)  # italic ampersand
_SANS = geist(500)


def arch_group(c: dict, stroke_outer=2.4, stroke_inner=1.3, base=True, fill=0.0) -> str:
    """Double arch + keystone in the 400x500 box (open at the bottom, with a ground line)."""
    o = 199.0 - stroke_outer / 2 + 0.6
    i = 183.0
    outer = f"M{200 - o:.2f} 499V200A{o:.2f} {o:.2f} 0 0 1 {200 + o:.2f} 200V499"
    inner = f"M{200 - i:.2f} 499V200A{i:.2f} {i:.2f} 0 0 1 {200 + i:.2f} 200V499"
    ground = f'<path d="M-8 500.5H408" stroke="{c["lines"]}" stroke-width="{stroke_outer}" fill="none"/>' if base else ""
    key = (
        f'<path d="M188.4 1.6H211.6L207 17.2H193Z" fill="{c["key"]}"/>'
    )
    panel = (
        f'<path d="{inner}Z" fill="{c["lines"]}" fill-opacity="{fill}" stroke="none"/>' if fill else ""
    )
    return (
        f'{panel}<path d="{outer}" stroke="{c["lines"]}" stroke-width="{stroke_outer}" fill="none"/>'
        f'<path d="{inner}" stroke="{c["lines"]}" stroke-width="{stroke_inner}" fill="none" stroke-opacity=".75"/>'
        f"{key}{ground}"
    )


def monogram_parts(cx=200.0, baseline=330.0, size=150.0) -> tuple[str, str, str]:
    """Path data for A, & and H on one line, centred on cx. The ampersand is italic, lighter and a little larger."""
    amp_size = size * 1.08
    gap = size * 0.02
    wa = _A.advance("A", size)
    wh = _A.advance("H", size)
    wamp = _AMP.advance("&", amp_size)
    total = wa + wamp + wh + 2 * gap
    x = cx - total / 2
    da, _ = _A.path("A", size, x, baseline)
    damp, _ = _AMP.path("&", amp_size, x + wa + gap, baseline + size * 0.01)
    dh, _ = _A.path("H", size, x + wa + gap + wamp + gap, baseline)
    return da, damp, dh


def monogram(c: dict, cx=200.0, baseline=330.0, size=150.0) -> str:
    da, damp, dh = monogram_parts(cx, baseline, size)
    return (
        f'<path d="{da}" fill="{c["letters"]}"/>'
        f'<path d="{damp}" fill="{c["amp"]}"/>'
        f'<path d="{dh}" fill="{c["letters"]}"/>'
    )


def small_caps(text: str, c: dict, cx: float, baseline: float, size: float, tracking=0.32, fill=None) -> str:
    d, _ = _SANS.path(text, size, cx, baseline, tracking=tracking, anchor="middle")
    return f'<path d="{d}" fill="{fill or c["text"]}"/>'


def _svg(inner: str, vb: tuple, c: dict, pad: float = 0, bg: bool = False) -> str:
    x, y, w, h = vb
    bgrect = f'<rect x="{x - pad}" y="{y - pad}" width="{w + 2 * pad}" height="{h + 2 * pad}" fill="{c["bg"]}"/>' if bg and c["bg"] else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x - pad} {y - pad} {w + 2 * pad} {h + 2 * pad}">'
        f"{bgrect}{inner}</svg>"
    )


# ------------------------------------------------------------------ the marks
def symbol_svg(cw="on-dark", bg=False, pad=24) -> str:
    c = COLORWAYS[cw]
    return _svg(arch_group(c, fill=0.06 if c["bg"] else 0.0), (0, 0, W, H), c, pad, bg)


def seal_inner(c: dict, variant="line") -> str:
    inner = arch_group(c, fill=0.06 if c["bg"] else 0.0)
    if variant == "line":      # monogram + small caps beneath
        inner += monogram(c, baseline=306, size=124)
        inner += f'<path d="M158 338H242" stroke="{c["lines"]}" stroke-width="1.1" stroke-opacity=".8"/>'
        inner += small_caps("LEGAL PARTNERS", c, 200, 376, 14.5)
    elif variant == "mono":    # arch + monogram, no text (for lockups)
        inner += monogram(c, baseline=338, size=124)
    elif variant == "stack":   # A / & / H stacked like pillars
        s = 118
        da, _ = _A.path("A", s, 200, 205, anchor="middle")
        damp, _ = _AMP.path("&", s * 1.05, 200, 330, anchor="middle")
        dh, _ = _A.path("H", s, 200, 450, anchor="middle")
        inner += (
            f'<path d="{da}" fill="{c["letters"]}"/><path d="{damp}" fill="{c["amp"]}"/>'
            f'<path d="{dh}" fill="{c["letters"]}"/>'
        )
    return inner


def seal_svg(cw="on-dark", variant="line", bg=False, pad=24) -> str:
    c = COLORWAYS[cw]
    return _svg(seal_inner(c, variant), (0, 0, W, H), c, pad, bg)


def lockup_horizontal(cw="on-dark", bg=False, pad=30, stack=True) -> str:
    """Mini seal (arch + monogram) on the left, LEGAL PARTNERS on the right."""
    c = COLORWAYS[cw]
    sc = 0.28
    sw, sh = W * sc, H * sc
    # stroke widths are scaled up so the lines stay visible at small sizes
    sym = f'<g transform="scale({sc})">{seal_inner(c, "mono").replace(f"stroke-width=\"2.4\"", "stroke-width=\"3.4\"").replace(f"stroke-width=\"1.3\"", "stroke-width=\"2.2\"")}</g>'
    cy = 296 * sc                      # vertical centre of the monogram
    size = 15.5
    gapx = 20
    x_line = sw + gapx
    x_txt = x_line + 18
    if stack:
        d1, w1 = _SANS.path("LEGAL", size, x_txt, cy - 5, tracking=0.34)
        d2, w2 = _SANS.path("PARTNERS", size, x_txt, cy + 17, tracking=0.34)
        txt = f'<path d="{d1}" fill="{c["text"]}"/><path d="{d2}" fill="{c["text"]}"/>'
        tw = max(w1, w2)
        ly0, ly1 = cy - 22, cy + 22
    else:
        d1, tw = _SANS.path("LEGAL PARTNERS", size, x_txt, cy + 5, tracking=0.34)
        txt = f'<path d="{d1}" fill="{c["text"]}"/>'
        ly0, ly1 = cy - 14, cy + 14
    rule = f'<path d="M{x_line} {ly0}V{ly1}" stroke="{c["lines"]}" stroke-width="1.2"/>'
    return _svg(sym + rule + txt, (0, 0, x_txt + tw, sh), c, pad, bg)


def lockup_stacked(cw="on-dark", bg=False, pad=30) -> str:
    """Seal-less stack: symbol above, A&H, then LEGAL PARTNERS."""
    c = COLORWAYS[cw]
    sc = 0.34
    sw, sh = W * sc, H * sc
    cx = sw / 2
    sym = f'<g transform="scale({sc})">{arch_group(c, 2.4 / sc * 0.55, 1.3 / sc * 0.55, fill=0.08 if c["bg"] else 0.0)}</g>'
    size = 76
    amp_size = size * 1.08
    wa, wh = _A.advance("A", size), _A.advance("H", size)
    wamp = _AMP.advance("&", amp_size)
    gap = size * 0.02
    total = wa + wamp + wh + 2 * gap
    x = cx - total / 2
    base = sh + 78
    da, _ = _A.path("A", size, x, base)
    damp, _ = _AMP.path("&", amp_size, x + wa + gap, base + size * 0.01)
    dh, _ = _A.path("H", size, x + wa + gap + wamp + gap, base)
    dtxt, tw = _SANS.path("LEGAL PARTNERS", 12.5, cx, base + 34, tracking=0.34, anchor="middle")
    inner = (
        sym
        + f'<path d="{da}" fill="{c["letters"]}"/><path d="{damp}" fill="{c["amp"]}"/><path d="{dh}" fill="{c["letters"]}"/>'
        + f'<path d="{dtxt}" fill="{c["text"]}"/>'
    )
    w = max(sw, total, tw)
    return _svg(inner, (cx - w / 2, 0, w, base + 44), c, pad, bg)


def wordmark_svg(cw="on-dark", bg=False, pad=30) -> str:
    """A&H over LEGAL PARTNERS, no arch. For tight or very small placements."""
    c = COLORWAYS[cw]
    size = 96
    amp_size = size * 1.08
    wa, wh = _A.advance("A", size), _A.advance("H", size)
    wamp = _AMP.advance("&", amp_size)
    gap = size * 0.02
    total = wa + wamp + wh + 2 * gap
    cx = total / 2
    base = size * 0.72
    da, _ = _A.path("A", size, 0, base)
    damp, _ = _AMP.path("&", amp_size, wa + gap, base + size * 0.01)
    dh, _ = _A.path("H", size, wa + gap + wamp + gap, base)
    dtxt, tw = _SANS.path("LEGAL PARTNERS", 15, cx, base + 44, tracking=0.34, anchor="middle")
    inner = (
        f'<path d="{da}" fill="{c["letters"]}"/><path d="{damp}" fill="{c["amp"]}"/>'
        f'<path d="{dh}" fill="{c["letters"]}"/><path d="{dtxt}" fill="{c["text"]}"/>'
    )
    return _svg(inner, (min(0, cx - tw / 2), 0, max(total, tw), base + 56), c, pad, bg)


# ------------------------------------------------------- exports for the web
def seal_geometry() -> dict:
    """Raw path data for the seal, so the website can draw and animate the same artwork."""
    o = 199.0 - 2.4 / 2 + 0.6
    i = 183.0
    da, damp, dh = monogram_parts(baseline=306, size=124)
    lp, _ = _SANS.path("LEGAL PARTNERS", 14.5, 200, 376, tracking=0.32, anchor="middle")
    return {
        "outer": f"M{200 - o:.2f} 499V200A{o:.2f} {o:.2f} 0 0 1 {200 + o:.2f} 200V499",
        "inner": f"M{200 - i:.2f} 499V200A{i:.2f} {i:.2f} 0 0 1 {200 + i:.2f} 200V499",
        "panel": f"M{200 - i:.2f} 499V200A{i:.2f} {i:.2f} 0 0 1 {200 + i:.2f} 200V499Z",
        "ground": "M-8 500.5H408",
        "key": "M188.4 1.6H211.6L207 17.2H193Z",
        "A": da, "AMP": damp, "H": dh,
        "rule": "M158 338H242",
        "lp": lp,
    }


def favicon_svg(square: bool = False) -> str:
    """Compact mark for tiny sizes: a bold arch with a gilt ampersand, on the ink square.
    The fine inner arch and ground line are dropped so it stays legible at 16 px."""
    c = COLORWAYS["on-dark"]
    sc = 0.118
    tx, ty = (64 - W * sc) / 2, (64 - H * sc) / 2 + 0.6
    _, amp_w = _AMP.path("&", 250, 0, 0)
    amp_d, _ = _AMP.path("&", 250, 200 - amp_w / 2, 372)
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        f'<rect width="64" height="64" rx="{0 if square else 14}" fill="{c["bg"]}"/>'
        f'<g transform="translate({tx:.2f} {ty:.2f}) scale({sc})">'
        f'<path d="M10 505V200A190 190 0 0 1 390 200V505" stroke="{GILT}" stroke-width="22" fill="none"/>'
        f'<path d="M176 -2H224L214 40H186Z" fill="{GILT}"/>'
        f'<path d="{amp_d}" fill="{GILT}"/></g></svg>'
    )
