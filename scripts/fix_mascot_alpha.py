"""Remove baked-in checkerboard / fake transparency from mascot PNGs."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
TARGETS = ["logo-mascot.png", "logo-mascot-gap.png"]


def is_background_pixel(r: int, g: int, b: int, a: int) -> bool:
    if a < 12:
        return True
    peak = max(r, g, b)
    if peak < 170:
        return False
    if peak - min(r, g, b) > 36:
        return False
    return True


def flood_transparent(arr: np.ndarray) -> np.ndarray:
    h, w = arr.shape[:2]
    bg = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    for y in range(h):
        for x in range(w):
            r, g, b, a = arr[y, x]
            on_border = x in (0, w - 1) or y in (0, h - 1)
            if on_border or a < 12:
                if is_background_pixel(int(r), int(g), int(b), int(a)):
                    bg[y, x] = True
                    q.append((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if not (0 <= nx < w and 0 <= ny < h) or bg[ny, nx]:
                continue
            r, g, b, a = arr[ny, nx]
            if is_background_pixel(int(r), int(g), int(b), int(a)):
                bg[ny, nx] = True
                q.append((nx, ny))

    out = arr.copy()
    out[bg, 3] = 0
    return out


def crop_to_alpha_bounds(arr: np.ndarray, pad: int = 24) -> np.ndarray:
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 8)
    if len(xs) == 0:
        return arr
    x0, x1 = max(0, xs.min() - pad), min(arr.shape[1], xs.max() + pad + 1)
    y0, y1 = max(0, ys.min() - pad), min(arr.shape[0], ys.max() + pad + 1)
    return arr[y0:y1, x0:x1]


def strip_checkerboard_pixels(arr: np.ndarray) -> np.ndarray:
    """Remove interior checkerboard pixels not reached by edge flood."""
    out = arr.copy()
    rgb = out[:, :, :3].astype(np.int16)
    spread = rgb.max(axis=2) - rgb.min(axis=2)
    light = rgb.min(axis=2) > 184
    neutral = spread <= 10
    mask = light & neutral & (out[:, :, 3] > 0)
    out[mask, 3] = 0
    return out


def process(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    arr = np.array(img)
    arr = flood_transparent(arr)
    arr = strip_checkerboard_pixels(arr)
    arr = crop_to_alpha_bounds(arr)
    Image.fromarray(arr).save(path)
    print(f"fixed {path.name} -> {arr.shape[1]}x{arr.shape[0]}")


def main() -> None:
    for name in TARGETS:
        path = ASSETS / name
        if path.exists():
            process(path)


if __name__ == "__main__":
    main()
