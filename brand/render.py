"""Render HTML to PDF / PNG with Microsoft Edge (headless). No extra dependencies."""
import math
import subprocess
import time
from pathlib import Path

import os
import shutil


def _find_browser() -> str:
    """Microsoft Edge or Google Chrome (set BROWSER_PATH to override)."""
    candidates = [
        os.environ.get("BROWSER_PATH", ""),
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        shutil.which("google-chrome") or "",
        shutil.which("chromium") or "",
        shutil.which("microsoft-edge") or "",
    ]
    for c in candidates:
        if c and os.path.exists(c):
            return c
    raise SystemExit("No Chrome or Edge found. Install one, or set BROWSER_PATH to its executable.")


EDGE = _find_browser()
MM = 96 / 25.4  # css px per mm


def _run(args: list[str]):
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", *args],
                   check=True, capture_output=True, timeout=120)


def _wait(path: Path, timeout: float = 20.0):
    """Edge can return before the file is fully written; wait until it exists and stops growing."""
    end = time.time() + timeout
    last = -1
    while time.time() < end:
        if path.exists():
            size = path.stat().st_size
            if size > 0 and size == last:
                return
            last = size
        time.sleep(0.4)


def to_pdf(html: Path, pdf: Path):
    pdf.parent.mkdir(parents=True, exist_ok=True)
    if pdf.exists():
        pdf.unlink()
    _run(["--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri()])
    _wait(pdf)


def to_png(html: Path, png: Path, w_mm: float, h_mm: float, scale: float = 4, transparent: bool = False):
    png.parent.mkdir(parents=True, exist_ok=True)
    if png.exists():
        png.unlink()
    args = [f"--force-device-scale-factor={scale}",
            f"--window-size={math.ceil(w_mm * MM)},{math.ceil(h_mm * MM)}",
            f"--screenshot={png}", html.as_uri()]
    if transparent:
        args.insert(0, "--default-background-color=00000000")
    _run(args)
    _wait(png)


def to_png_px(html: Path, png: Path, w_px: int, h_px: int, scale: float = 1, transparent: bool = False):
    """Screenshot an HTML file at an exact CSS pixel size."""
    png.parent.mkdir(parents=True, exist_ok=True)
    if png.exists():
        png.unlink()
    args = [f"--force-device-scale-factor={scale}", f"--window-size={w_px},{h_px}",
            f"--screenshot={png}", html.as_uri()]
    if transparent:
        args.insert(0, "--default-background-color=00000000")
    _run(args)
    _wait(png)
