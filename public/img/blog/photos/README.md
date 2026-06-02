# Blog cover photos

Real photographs of Vietnam used for blog cards and Open Graph previews. Each
file is named after its blog slug and is cropped to **1200×675 (16:9)** and
compressed with mozjpeg.

Most covers are sourced from [Wikimedia Commons](https://commons.wikimedia.org)
(public domain / free licenses). The food cover is from Unsplash.

## Pipeline

1. Fetch landscape candidates from Wikimedia Commons into `.img-candidates/`:

```bash
node scripts/fetch-image-candidates.mjs --batch .img-candidates/queries.json
```

2. Review candidates as contact sheets:

```bash
node scripts/make-contact-sheets.mjs   # writes .img-candidates/_sheets/*.jpg
```

3. Map the chosen candidate per slug in `scripts/build-blog-images.mjs`, then
   build the finals (use `--preview` to dry-run into `.img-candidates/_finals/`):

```bash
node scripts/build-blog-images.mjs
```

Hero image: `public/img/vietnam-hero.jpg` (Ha Long Bay).
