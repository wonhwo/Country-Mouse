"""Download and crop square icons for favorites (played games) from Steam CDN."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "favorites"

# slug -> Steam app id
STEAM_APPS: dict[str, int] = {
    "monster-hunter": 582010,  # Monster Hunter: World
    "stellar-blade": 3489700,
    "warframe": 230410,
    "ark": 346110,
    "ghost-of-tsushima": 2215430,
    "god-of-war": 1593500,
    "maplestory": 216150,
    "cities-skylines": 949230,  # Cities: Skylines II
}

SIZE = 192


def fetch_image(app_id: int) -> Image.Image:
    urls = [
        f"https://cdn.cloudflare.steamstatic.com/steam/apps/{app_id}/library_600x900.jpg",
        f"https://cdn.cloudflare.steamstatic.com/steam/apps/{app_id}/header.jpg",
        f"https://cdn.cloudflare.steamstatic.com/steam/apps/{app_id}/capsule_616x353.jpg",
    ]
    last_err = None
    for url in urls:
        try:
            r = requests.get(url, timeout=30)
            r.raise_for_status()
            return Image.open(BytesIO(r.content)).convert("RGB")
        except Exception as e:
            last_err = e
    raise RuntimeError(f"app {app_id}: {last_err}")


def to_square_icon(img: Image.Image, size: int = SIZE) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    crop = img.crop((left, top, left + side, top + side))
    return crop.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, app_id in STEAM_APPS.items():
        img = fetch_image(app_id)
        icon = to_square_icon(img)
        out = OUT / f"{slug}.jpg"
        icon.save(out, "JPEG", quality=88, optimize=True)
        print(f"saved {out}")


if __name__ == "__main__":
    main()
