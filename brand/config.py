"""
A&H Legal Partners: brand constants and firm details.

EDIT THE DETAILS BELOW, then run `npm run brand` to regenerate every file
(logos, business card, letterhead, envelopes, file cover, QR codes, guidelines).

Items marked SAMPLE are placeholders and must be replaced before printing.
"""

# ---------------------------------------------------------------- firm details
FIRM = {
    "name": "A&H Legal Partners",
    "mark": "A&H",
    "descriptor": "Advocates High Court",
    "tagline": "Measured advice. Decisive advocacy.",
    # Urdu rendering of the name. Transliteration: have a native reader confirm it.
    "urdu": "اے اینڈ ایچ لیگل پارٹنرز",
    "address": ["1 Turner Road", "Near Lahore High Court, Lahore"],
    # Domain and email exactly as supplied by the firm (note: "patners", without the "r" of "Partners").
    # The QR codes encode `url`. Change all three together if the registered spelling differs.
    "web": "ahlegalpatners.com",
    "url": "https://ahlegalpatners.com",
    "email": "info@ahlegalpatners.com",
}

# The business card, envelope and file cover list both partners.
# Numbers confirmed by the firm: 0301 7466260 is Azhaar's, 0307 2058771 is Haris's.
PEOPLE = [
    {
        "name": "Azhaar Ahmad Choudhary",
        "title": "Advocate High Court",
        "phone": "0301 7466260",
    },
    {
        "name": "Haris Ali Choudhary",
        "title": "Advocate High Court",
        "phone": "0307 2058771",
    },
]

# ---------------------------------------------------------------------- colour
INK = "#0A1512"        # deep library green (backgrounds, text on paper)
FOREST = "#0F201B"
MOSS = "#152B24"
GILT = "#C6A96B"       # champagne gilt: print as gold foil
GILT_SOFT = "#D9C18F"
IVORY = "#EDE8DC"      # type on dark
PAPER = "#F2F4EE"      # stock: pale sage white
STONE = "#A9B1A6"
SLATE = "#4C5A52"      # secondary text on paper
