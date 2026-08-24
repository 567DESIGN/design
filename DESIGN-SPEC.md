# Shijun Peng Portfolio — Design Specification

## 1. Typography

| Area | Desktop | Mobile | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| Main navigation | 16px | 16px | 600 | 1 | -0.055em |
| Contact marquee | 12px | 12px | 600 | 1 | -0.055em |
| Project name and year | 16px | 12px | 600 | 1 | -0.045em |
| Info page content | 16px | 12px | 600 | 2 | -0.045em |
| Project metadata and description | 16px | 12px | 500 | 2 | -0.03em |

Font stack: `Arial`, `Helvetica`, `PingFang SC`, sans-serif.

Navigation links are black by default, light gray on hover and white while pressed.

## 2. Color

| Token | Value | Usage |
| --- | --- | --- |
| Page background | `#FFFFFF` | All pages and project cards |
| Primary text | `#000000` | Navigation, titles and UI |
| Body text | `#111111` | Project descriptions |
| Secondary text | `#AAAAAA` | Project metadata labels |
| Marquee background | `#F5F5F5` | Fixed contact marquee |
| Divider | `#000000` | Navigation bottom border |

## 3. Layout and spacing

### Desktop (`> 760px`)

- Page gutter: 11px.
- Navigation and marquee height: 57px.
- Home project grid: 2 equal columns, 11px column gap and 72px row gap.
- Home content spacing: 20px above the grid and 72px below it.
- Covers: `3:4`, centered and proportionally enlarged to fill the frame (`object-fit: cover`).
- Project information: 30% metadata column plus flexible description column, 24px gap.
- Info content begins 20px below navigation.

### Mobile (`≤ 760px`)

- Page gutter: 10px.
- Navigation and marquee height: 48px.
- Home project grid: 1 column with 42px row gap.
- Home content spacing: 12px above the grid and 46px below it.
- Project metadata uses 3 equal columns; description moves below with a 48px gap.
- Info content begins 24px below navigation.

## 4. Page structure

### Shared layer

1. Fixed contact marquee with `VX 87080780`.
2. Sticky two-link navigation: `Shijun Peng` and `Info`.
3. Circular back-to-top control shown only at the page bottom.

### Home

1. Shared navigation.
2. Four projects in this order: Abitua, Habc, Daartemis, Cremaish.
3. Each card contains one cover followed by project name and year.

### Info

1. Shared navigation.
2. Three-line English introduction.
3. Three-line Chinese introduction.
4. Contact details and portrait aligned to the left.

### Project detail

1. Shared sticky navigation.
2. Information module: Client, Service and Partner on the left; Chinese description on the right.
3. All selected project images stacked vertically at full width.

## 5. Interaction

- Marquee pauses on pointer hover and resumes on pointer leave.
- Marquee close button removes both the marquee and its reserved top space.
- Cover images scale to 101.2% with a slight contrast increase on hover.
- Back-to-top button appears within 24px of the document bottom and scrolls smoothly to the top.
- Reduced-motion preference disables marquee movement, smooth scrolling and cover transitions.
