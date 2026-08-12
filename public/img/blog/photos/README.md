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

## Inline photo credits

The following Wikimedia Commons photos replace generic vector placeholders in
the travel guides. The published files are cropped derivatives at 1200×675.

| Local file | Original | Creator | License |
| --- | --- | --- | --- |
| `inline-cat-ba-lan-ha-bay.jpg` | [Panoramic of Lan Ha Bay](https://commons.wikimedia.org/wiki/File:Panoramic_of_Lan_Ha_Bay.jpg) | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `inline-pho-hanoi.jpg` | [Pho ga, Hanoi](https://commons.wikimedia.org/wiki/File:Pho_ga_(noodle_soup_with_chicken),_Hanoi_(6945821707).jpg) | David McKelvey | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `inline-ban-gioc-waterfall.jpg` | [Ban Gioc – Detian Falls](https://commons.wikimedia.org/wiki/File:Ban_Gioc_-_Detian_Falls2.jpg) | jankgo | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `inline-hue-imperial-city.jpg` | [Gate to the Imperial City](https://commons.wikimedia.org/wiki/File:Gate_to_the_Imperial_City_(7351240992).jpg) | Francisco Anzola | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `inline-ma-pi-leng-pass.jpg` | [Ma Pi Leng Pass winding road](https://commons.wikimedia.org/wiki/File:Ma_Pi_Leng_Pass_winding_road_Ha_Giang_Vietnam.jpg) | Khánh Hmoong | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `inline-ben-thanh-market.jpg` | [Ben Thanh Market, 2023](https://commons.wikimedia.org/wiki/File:Ben_Thanh_Market,_2023_(06).jpg) | Bahnfrend | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `inline-ta-phin-rice-terraces.jpg` | [Rice terraces in Tả Phìn](https://commons.wikimedia.org/wiki/File:Rice_terraces_in_T%E1%BA%A3_Ph%C3%ACn_01.jpg) | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `inline-water-puppet-theatre.jpg` | [Vietnam water puppet theatre](https://commons.wikimedia.org/wiki/File:Vietnam_08_-_18_-_water_puppet_theatre_(3167669454).jpg) | McKay Savage | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
