import sys
import os
import fitz  # PyMuPDF

def main():
    pdf_path = sys.argv[1]
    out_dir = sys.argv[2]
    dpi = int(sys.argv[3]) if len(sys.argv) > 3 else 150

    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    zoom = dpi / 72.0
    mat = fitz.Matrix(zoom, zoom)

    print(f"pages: {doc.page_count}")
    total_text = 0
    for i, page in enumerate(doc):
        text = page.get_text().strip()
        total_text += len(text)
        pix = page.get_pixmap(matrix=mat)
        out = os.path.join(out_dir, f"page-{i + 1:02d}.png")
        pix.save(out)
        print(f"saved {out}  ({pix.width}x{pix.height})  text_chars={len(text)}")

    print(f"total_text_chars: {total_text}")

if __name__ == "__main__":
    main()
