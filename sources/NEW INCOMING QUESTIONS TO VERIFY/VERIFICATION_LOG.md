# Incoming Questions Verification Log

## Workflow

1. New question papers/images arrive in `pending/unfiled/`
2. Sort into topic folders under `pending/` (e.g. `pending/Corporate Finance/`)
3. Verify each item (OCR, cross-check against existing papers)
4. Move verified items to `verified/`
5. Move rejected/duplicates to `rejected/`

## Current Status

- `pending/` — items awaiting verification
- `verified/` — verified and processed (empty until items are cleared)
- `rejected/` — duplicates or invalid items (empty until items are cleared)

## Topic Folders Under pending/

- `Audit & Assurance Questions/`
- `Corporate Finance/`
- `Cost Accounting Questions/`
- `VAT Questions/`
- `unfiled/` — loose PDFs, images not yet sorted by topic

## Next Steps

For each item in `pending/`:
1. OCR/transcribe into `ocr/incoming/` per `OCR_SPEC.md`
2. Cross-check against existing papers for duplicates
3. Move to `verified/` or `rejected/`
