# Case study images

Three files, referenced from `src/components/site/Work.tsx`:

| File | Card |
|---|---|
| `northlight.jpg` | Northlight Coffee — brand identity |
| `tidewater.jpg` | Tidewater Outfitters — online store |
| `meridian.jpg` | Meridian Dental — booking tool |

Each is 11:6 (about 1.83), 1408x768 or larger. next/image converts to WebP and AVIF at request time, so the source can stay JPEG. `next/image` handles the
resizing and the responsive srcset, so one large file per card is enough.

To switch a card from its drawn fallback to a photograph, set `image` on that
entry in `Work.tsx`:

    image: "/work/northlight.jpg",

Leave it `null` and the card falls back to its SVG composition rather than
showing a broken image.

The alt text lives beside it in the same entry and describes the photograph,
not the project — screen reader users get the project title and body from the
text next to the card.
