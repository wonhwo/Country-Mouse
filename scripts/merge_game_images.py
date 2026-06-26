import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
manifest = json.loads(
    (root / "public/assets/games/manifest.json").read_text(encoding="utf-8")
)
text = (root / "src/data/games.js").read_text(encoding="utf-8")

for gid, data in manifest.items():
    thumb = data.get("thumbnail")
    shots = data.get("screenshots") or []
    thumb_js = json.dumps(thumb) if thumb else "null"
    shots_js = json.dumps(shots, ensure_ascii=False)
    block = f"    links: [],\n    videoUrl: null,\n    thumbnail: {thumb_js},\n    screenshots: {shots_js},"
    pattern = rf"(id: '{gid}'[\s\S]*?)    links: \[\],\n"
    text, n = re.subn(pattern, rf"\1{block}\n", text, count=1)
    if n == 0:
        print("miss", gid)

# operation-ddt not in manifest GAME_SLIDES - add null manually if missed
if "operation-ddt" not in manifest:
    pattern = r"(id: 'operation-ddt'[\s\S]*?)    links: \[\],\n"
    block = "    links: [],\n    videoUrl: null,\n    thumbnail: null,\n    screenshots: [],"
    text, n = re.subn(pattern, rf"\1{block}\n", text, count=1)

(root / "src/data/games.js").write_text(text, encoding="utf-8")
print("merged")
