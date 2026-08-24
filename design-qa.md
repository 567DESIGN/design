# Design QA

- Source visual truth: `public/qa/project-module-reference.png`
- Browser implementation: `public/qa/project-module-implementation.png`
- Combined comparison: `public/qa/project-module-comparison.png`
- Source pixels: 1016 × 558
- Implementation viewport: 1280 × 720 CSS px, density 1
- State: CREMAISH project detail, project information module at page start
- Normalization: top-aligned equal-aspect comparison frames; implementation includes the shared 57 px navigation above the module.

## Evidence

The comparison shows the same sparse white module, approximately 30/70 two-column grid, gray metadata labels, stacked service values, two separated Chinese paragraphs, and large unused lower whitespace. A focused crop was unnecessary because all metadata and paragraph typography are readable in the full comparison.

## Fidelity surfaces

- Typography: neutral sans-serif stack, 15 px metadata, 21 px project copy, subdued gray labels, and compact line height reproduce the source hierarchy.
- Layout rhythm: left metadata column, right narrative column, 18 px outer gutter, 46 px metadata groups, 42 px paragraph gap, and viewport-height module match the reference structure.
- Colors: pure white background, black content, and light-gray labels; no unintended borders or decoration.
- Image fidelity: the module is HTML text; the unchanged uploaded project JPGs continue immediately after it and load at full width.
- Copy: each of the three projects has project-specific client, service, partner, and description content.

## Findings

- No actionable P0/P1/P2 finding remains.
- P3: exact line wrapping varies with viewport width, as expected for responsive text.

## Comparison history

1. Initial pass found a P1 duplicate information page: the new HTML module was followed by the old raster information page.
2. Removed that raster information page from each detail gallery while retaining every subsequent project image and its existing layout.
3. Increased the module to the viewport height beneath navigation so the next image no longer intrudes into the reference-like information screen.
4. Recaptured and confirmed the corrected structure in `public/qa/project-module-comparison.png`.

## Runtime checks

- ABITUA, CREMAISH, and DAARTEMIS each render exactly one information module.
- Remaining full-width image counts: 6, 5, and 15.
- Broken images: 0.
- Production build: passed.

final result: passed
