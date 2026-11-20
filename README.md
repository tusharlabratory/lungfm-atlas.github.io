# LungFM Atlas

Interactive results of a multicohort benchmark of public CT foundation models used as frozen feature extractors for lung
cancer prediction: 18 encoders, 16 tasks, 12 public cohorts, 13131 model setups, compared with nodule diameter, the
Brock model, radiomics and a random-weight encoder.

**Website:** https://tusharlabratory.github.io/lungfm-atlas.github.io/

All numbers are aggregated study results (AUC with 95% confidence intervals); no participant-level data are included.
The images and labels remain with their original sources, listed on the About page.

## Pages
- **Explorer**: encoder × task heat map (AUC or difference from diameter, radiomics, the Brock model or the best comparator)
- **Models**: one page per encoder (architecture, pretraining data, pretraining overlap, performance in every task)
- **Tasks**: one page per task and cohort with every model on the same test participants
- **Model setups**: all encoder × feature form × classifier combinations per task
- **Which model?**: practical starting points from the two companion articles

## Build
The site is built with [Astro](https://astro.build) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on
every push to `main`.

```bash
npm ci
npm run dev      # local preview
npm run build    # static site in dist/
```

The data in `public/data` and `src/data` are exported from the study results by the analysis code
(`scripts/p40_site_export.py`), which checks the headline numbers against the articles before writing.

## Citation
Preprints of the two companion articles will be linked here when available.

Built by the [Tushar Lab](https://tusharlabratory.github.io/), Department of Medical Imaging, University of Arizona.
