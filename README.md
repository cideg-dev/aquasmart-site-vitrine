# AquaSmart Control — site vitrine

![Logo AquaSmart Control](./assets/logo-aquasmart.png)

Site vitrine bilingue (français / anglais) d’AquaSmart Control SARL, hébergé gratuitement sur GitHub Pages. Aucun framework, aucune dépendance à installer, aucune requête vers un service tiers.

**En ligne : <https://cideg-dev.github.io/aquasmart-site-vitrine/>**

## Contenu

- `index.html` — page d’accueil, 8 sections : héro, à propos, solution, offre & vente, technologie, ambition, équipe, contact.
- `mentions-legales.html` — éditeur, RCCM, IFU, gérance, responsable de la publication, hébergement, données personnelles.
- `styles.css` — mise en page responsive, palette et styles des composants.
- `script.js` — menu mobile, changement de langue mémorisé, bouton WhatsApp, année automatique, formulaire de contact.
- `robots.txt` et `sitemap.xml` — indexation.
- `assets/favicon.svg` — icône de l’onglet (avec repli PNG).
- `assets/logo-aquasmart.png` et `assets/logo-mark.png` — logos redimensionnés pour le web.
- `assets/prototype-installe.jpg` et les cinq visuels de composants — visuels extraits du plan d’affaires, recompressés.
- `assets/og-image.jpg` — image 1200 × 630 pour les aperçus WhatsApp, LinkedIn et Facebook.

Le site est une vitrine statique. Le formulaire ouvre l’application de messagerie du visiteur avec un brouillon prérempli : aucun message n’est stocké ni envoyé par un serveur. Les visuels montrent le prototype ; les caractéristiques techniques sont données à titre indicatif.

## Coordonnées publiées

Définies dans `script.js` (constante `contact`) et reprises dans la page légale :

- e-mail : `aquasmartcontrole@gmail.com`
- téléphone / WhatsApp : `+229 01 64 28 51 72`

Le numéro alimente le lien d’appel et le bouton « Discuter sur WhatsApp » (lien `wa.me` avec message prérempli, dans la langue du visiteur).

## Offre & vente

La section `#vente` présente la démarche commerciale, les canaux de vente, le lancement progressif et des repères tarifaires issus du plan financier (60 000 FCFA pour le dispositif, 15 000 FCFA pour l’installation, maintenance sur devis). Les montants sont indicatifs et renvoient au devis.

## Fonctionnement de la version bilingue

- Le français est la langue par défaut.
- Le choix de langue est mémorisé dans le navigateur (`localStorage`) et reflété dans l’URL : `?lang=en` / `?lang=fr`. Un lien partagé conserve donc la langue.
- L’attribut `lang` du document, le titre, la description, Open Graph et Twitter sont mis à jour au changement de langue.
- Le bouton de langue annonce sa cible dans la bonne langue (`lang="en"` sur le bouton quand il affiche « EN »).

## Prévisualiser sur son ordinateur

Depuis la racine du dépôt, lancez :

```powershell
python -m http.server 8000
```

Ouvrez ensuite <http://localhost:8000>. Les polices sont des polices système (aucun téléchargement de police) : Manrope et DM Sans sont utilisées si elles sont installées localement, sinon le site bascule sur la police système du visiteur.

## Publier avec GitHub Pages

Le workflow [`.github/workflows/deploy-site.yml`](./.github/workflows/deploy-site.yml) publie le dépôt à chaque push sur `main` ou `master`, ou manuellement depuis l’onglet **Actions**.

1. Poussez sur `main`.
2. Vérifiez l’exécution du workflow **Deploy AquaSmart site** dans **Actions**.
3. Le site est publié sur `https://cideg-dev.github.io/aquasmart-site-vitrine/` (source : **Settings > Pages > GitHub Actions**).

> Si un nom de domaine est ajouté, remplacez l’URL GitHub Pages dans `index.html` (`canonical`, `og:url`, `og:image`, Twitter), `mentions-legales.html` (`canonical`), `robots.txt` et `sitemap.xml`.

Le site n’utilise pas d’URL absolues pour ses propres fichiers : il fonctionne aussi bien à la racine d’un domaine qu’à la racine du dépôt GitHub Pages.

## Qualité

- Contenu bilingue, contrastes vérifiés (WCAG AA sur les textes courants), navigation clavier, lien d’évitement, `prefers-reduced-motion`.
- Images dimensionnées, chargées en différé hors écran, sans décalage de mise en page.
- Le rapport d’audit complet se trouve dans le projet principal, `docs/audit_site_vitrine.md`.
