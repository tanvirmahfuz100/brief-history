#!/usr/bin/env python3
import base64
import csv
import io
import os
import re
import sys

import fitz
from PIL import Image, ImageEnhance, ImageOps, ImageFilter

ROOT = "/media/tanvir/Knowledge1/Questions"
WORK = "/media/tanvir/Knowledge1/Questions/.work/ocr"
GROUP_WORK = "/media/tanvir/Knowledge1/Questions/.work/group"
HTML = os.path.join(
    ROOT,
    "QUESTION BANK, DEPT.OF ACCOUNTING & INFORMATION SYSTEMS,BU ｜ Facebook (10_21_2026 4：37：51 PM).html",
)


def slugify(s):
    s = s.lower()
    s = s.replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:80]


def enhance(im):
    im = im.convert("RGB")
    im = ImageOps.autocontrast(im, cutoff=1)
    im = ImageEnhance.Contrast(im).enhance(1.12)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=3))
    return im


def save_page(img, path, upscale=1.0):
    if upscale != 1.0:
        img = img.resize(
            (int(img.width * upscale), int(img.height * upscale)), Image.LANCZOS
        )
    img.save(path, "JPEG", quality=90, optimize=True)


def extract_pdf_pages(pdf_name, sid):
    outdir = os.path.join(WORK, sid)
    os.makedirs(outdir, exist_ok=True)
    doc = fitz.open(os.path.join(ROOT, pdf_name))
    rows = []
    for i, page in enumerate(doc, 1):
        imgs = page.get_images(full=True)
        best = None
        for im in imgs:
            xref = im[0]
            try:
                info = doc.extract_image(xref)
            except Exception:
                continue
            if best is None or info["width"] * info["height"] > best["width"] * best["height"]:
                best = info
        if best and best["width"] >= 600:
            img = Image.open(io.BytesIO(best["image"]))
            native_w = img.width
        else:
            pix = page.get_pixmap(dpi=200)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            native_w = pix.width
        scale = 1.0
        if native_w < 1400:
            scale = 1.8 if native_w >= 1000 else 2.2
        img = enhance(img)
        path = os.path.join(outdir, f"page-{i:02d}.jpg")
        save_page(img, path, scale)
        rows.append(
            {
                "source_id": sid,
                "source_file": pdf_name,
                "page": i,
                "image": path,
                "native_width": native_w,
                "out_width": int(img.width * scale),
                "kind": "pdf",
            }
        )
    return rows


def extract_jpgs():
    rows = []
    for dirpath, _, files in os.walk(ROOT):
        if "/ocr" in dirpath or "/analysis" in dirpath or "/scripts" in dirpath:
            continue
        for fn in sorted(files):
            if not fn.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT)
            course = os.path.basename(dirpath)
            sid = "jpg-" + slugify(course) + "-" + slugify(os.path.splitext(fn)[0])
            outdir = os.path.join(WORK, sid)
            os.makedirs(outdir, exist_ok=True)
            img = Image.open(full)
            img = enhance(img)
            path = os.path.join(outdir, "page-01.jpg")
            save_page(img, path, 1.0)
            rows.append(
                {
                    "source_id": sid,
                    "source_file": rel,
                    "page": 1,
                    "image": path,
                    "native_width": img.width,
                    "out_width": img.width,
                    "kind": "jpg",
                }
            )
    return rows


def extract_group_images():
    s = open(HTML, encoding="utf-8", errors="replace").read()
    found = re.findall(r"data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)", s)
    outdir = os.path.join(GROUP_WORK, "papers")
    os.makedirs(outdir, exist_ok=True)
    rows = []
    idx = 0
    for fmt, b64 in found:
        try:
            data = base64.b64decode(b64)
            im = Image.open(io.BytesIO(data))
            w, h = im.size
        except Exception:
            continue
        if w * h < 120000 or w < 250 or h < 250:
            continue
        ratio = h / w
        if not (1.15 < ratio < 1.75):
            continue
        idx += 1
        im = im.convert("RGB")
        up = max(1.0, 1600 / w)
        im2 = im.resize((int(w * up), int(h * up)), Image.LANCZOS)
        im2 = enhance(im2)
        path = os.path.join(outdir, f"grp-{idx:02d}.jpg")
        im2.save(path, "JPEG", quality=92, optimize=True)
        rows.append(
            {
                "source_id": f"grp-{idx:02d}",
                "source_file": "group.html",
                "page": 1,
                "image": path,
                "native_width": w,
                "out_width": im2.width,
                "kind": "group",
                "bytes": len(data),
            }
        )
    return rows


def main():
    os.makedirs(WORK, exist_ok=True)
    rows = []
    pdfs = sorted(f for f in os.listdir(ROOT) if f.lower().endswith(".pdf"))
    for pdf in pdfs:
        sid = "pdf-" + slugify(os.path.splitext(pdf)[0])
        print("pdf:", pdf, "->", sid)
        rows.extend(extract_pdf_pages(pdf, sid))
    jrows = extract_jpgs()
    print("jpg pages:", len(jrows))
    rows.extend(jrows)
    grows = extract_group_images()
    print("group images:", len(grows))
    rows.extend(grows)
    with open(os.path.join(ROOT, "sources", "extracted_pages.csv"), "w", newline="") as fh:
        wr = csv.DictWriter(
            fh,
            fieldnames=[
                "source_id",
                "source_file",
                "page",
                "image",
                "native_width",
                "out_width",
                "kind",
                "bytes",
            ],
        )
        wr.writeheader()
        for r in rows:
            wr.writerow(r)
    print("total pages:", len(rows))


if __name__ == "__main__":
    main()
