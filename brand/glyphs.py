"""Turn text into SVG outlines using the project's own font files (so logos are pure vector)."""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules"


class Face:
    def __init__(self, path: Path, wght: int | None = None):
        font = TTFont(path)
        if wght is not None and "fvar" in font:
            font = instancer.instantiateVariableFont(font, {"wght": wght})
        self.font = font
        self.glyphs = font.getGlyphSet()
        self.cmap = font.getBestCmap()
        self.upm = font["head"].unitsPerEm
        self.hmtx = font["hmtx"]

    def _name(self, ch: str) -> str:
        return self.cmap[ord(ch)]

    def advance(self, text: str, size: float, tracking: float = 0.0) -> float:
        """Width of text in px. tracking is in em (0.1 = 10% of size)."""
        s = size / self.upm
        total = 0.0
        for i, ch in enumerate(text):
            total += self.hmtx[self._name(ch)][0] * s
            if i < len(text) - 1:
                total += tracking * size
        return total

    def path(self, text: str, size: float, x: float = 0, y: float = 0,
             tracking: float = 0.0, anchor: str = "start") -> tuple[str, float]:
        """SVG path data for text with its baseline at y. Returns (d, width)."""
        width = self.advance(text, size, tracking)
        if anchor == "middle":
            x -= width / 2
        elif anchor == "end":
            x -= width
        s = size / self.upm
        pen = SVGPathPen(self.glyphs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        cursor = x
        for ch in text:
            name = self._name(ch)
            tp = TransformPen(pen, (s, 0, 0, -s, cursor, y))
            self.glyphs[name].draw(tp)
            cursor += self.hmtx[name][0] * s + tracking * size
        return pen.getCommands(), width

    def cap_height(self, size: float) -> float:
        os2 = self.font["OS/2"]
        return getattr(os2, "sCapHeight", 0.65 * self.upm) * size / self.upm


def corm(weight: int, italic: bool = False) -> Face:
    style = "italic" if italic else "normal"
    return Face(FONTS / "@fontsource/cormorant-garamond/files" / f"cormorant-garamond-latin-{weight}-{style}.woff2")


def geist(weight: int = 500) -> Face:
    return Face(FONTS / "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2", wght=weight)
