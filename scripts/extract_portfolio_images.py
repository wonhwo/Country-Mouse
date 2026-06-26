"""Extract game screenshots from portfolio slides into public/assets/games/."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

PORTFOLIO_DIR = Path(
    r"C:\Users\reppy\Documents\카카오톡 받은 파일\이효원_포트폴리오_복사본"
)
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "assets" / "games"

# Normalized crop boxes (x0, y0, x1, y1) on 1920×1080 slides
SLIDE_PRESETS: dict[str, list[tuple[float, float, float, float]]] = {
    "006": [(0.70, 0.08, 0.97, 0.62)],
    "007": [(0.19, 0.06, 0.48, 0.72), (0.52, 0.06, 0.81, 0.72)],
    "008": [(0.21, 0.06, 0.49, 0.52), (0.51, 0.06, 0.79, 0.52), (0.39, 0.55, 0.61, 0.92)],
    "009": [(0.52, 0.04, 0.98, 0.55)],
    "011": [(0.19, 0.06, 0.48, 0.72), (0.52, 0.06, 0.81, 0.72)],
    "012": [(0.19, 0.06, 0.48, 0.72), (0.52, 0.06, 0.81, 0.72)],
    "014": [(0.52, 0.04, 0.98, 0.55)],
    "016": [(0.58, 0.04, 0.98, 0.52)],
    "020": [(0.52, 0.04, 0.98, 0.55)],
    "021": [(0.72, 0.06, 0.98, 0.92)],
    "022": [(0.52, 0.06, 0.98, 0.92)],
    "023": [(0.52, 0.06, 0.98, 0.92)],
    "024": [(0.52, 0.04, 0.98, 0.55)],
    "025": [(0.52, 0.04, 0.98, 0.92)],
    "026": [(0.52, 0.04, 0.98, 0.55)],
    "027": [(0.54, 0.08, 0.95, 0.88)],
    "029": [
        (0.02, 0.04, 0.48, 0.48),
        (0.52, 0.04, 0.98, 0.48),
        (0.02, 0.52, 0.48, 0.98),
        (0.52, 0.52, 0.98, 0.98),
    ],
    "030": [(0.55, 0.04, 0.97, 0.42)],
    "031": [(0.02, 0.05, 0.48, 0.95)],
    "032": [(0.52, 0.05, 0.98, 0.95)],
}

GAME_SLIDES: dict[str, list[str]] = {
    "project-aurora": ["007", "008", "006"],
    "tetoru-wa-airu": ["009", "011", "012"],
    "soultown": ["027", "029"],
    "geek-lol": ["030", "031", "032"],
    "sususu-supernova": ["014", "016"],
    "sacred-sprout-empire": ["020", "021", "022", "023"],
    "seark": ["024", "025", "026"],
    "projectarc": ["007", "008"],
}


def frac_crop(img: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
    w, h = img.size
    x0, y0, x1, y1 = box
    return img.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))


def screenshot_score(img: Image.Image) -> float:
    arr = np.array(img.convert("RGB"))
    white_ratio = (arr.min(axis=2) > 210).mean()
    if white_ratio > 0.5:
        return 0.0
    colorful = arr.std()
    if colorful < 18:
        return 0.0
    return colorful * (1 - white_ratio) * img.width * img.height


def extract_game(game_id: str, slides: list[str]) -> dict:
    game_dir = OUT_DIR / game_id
    game_dir.mkdir(parents=True, exist_ok=True)

    shots: list[tuple[Image.Image, float]] = []
    for slide in slides:
        path = PORTFOLIO_DIR / f"{slide}.png"
        if not path.exists():
            continue
        img = Image.open(path)
        presets = SLIDE_PRESETS.get(slide, [])
        for box in presets:
            crop = frac_crop(img, box)
            score = screenshot_score(crop)
            if score > 0:
                shots.append((crop, score))

    shots.sort(key=lambda s: -s[1])
    if not shots:
        return {"thumbnail": None, "screenshots": []}

    saved_paths: list[str] = []
    seen_sizes: set[tuple[int, int]] = set()
    for shot, _ in shots:
        key = (shot.width // 20, shot.height // 20)
        if key in seen_sizes:
            continue
        seen_sizes.add(key)
        if len(saved_paths) >= 4:
            break
        name = f"screen-{len(saved_paths) + 1:02d}.jpg"
        out = game_dir / name
        shot.convert("RGB").save(out, "JPEG", quality=85, optimize=True)
        saved_paths.append(f"/assets/games/{game_id}/{name}")

    best = shots[0][0].convert("RGB")
    thumb_path = game_dir / "thumbnail.jpg"
    ImageOps.fit(best, (920, 430), method=Image.Resampling.LANCZOS).save(
        thumb_path, "JPEG", quality=85, optimize=True
    )

    return {
        "thumbnail": f"/assets/games/{game_id}/thumbnail.jpg",
        "screenshots": saved_paths,
    }


def main() -> None:
    manifest: dict[str, dict] = {}
    for game_id, slides in GAME_SLIDES.items():
        manifest[game_id] = extract_game(game_id, slides)
        n = len(manifest[game_id]["screenshots"])
        print(f"{game_id}: thumb={'yes' if manifest[game_id]['thumbnail'] else 'no'} shots={n}")

    manifest_path = OUT_DIR / "manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"wrote {manifest_path}")


if __name__ == "__main__":
    main()
