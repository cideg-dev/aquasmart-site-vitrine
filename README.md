# AquaSmart Control — site vitrine

![Logo AquaSmart Control](./assets/logo-aquasmart.png)

Site vitrine bilingue (français / anglais) d’AquaSmart Control SARL, conçu pour être hébergé gratuitement avec GitHub Pages.

## Contenu

- `index.html` — contenu, métadonnées et structure accessible du site.
- `styles.css` — mise en page responsive, sans framework ni dépendance à installer.
- `script.js` — menu mobile, changement de langue, année automatique et formulaire de contact.
- `assets/favicon.svg` — icône de l’onglet du navigateur.
- `assets/logo-aquasmart.png` — logo de l’entreprise.
- `assets/prototype-installe.jpg` et les cinq photos de composants dans `assets/` — images extraites des pages 20 à 25 du plan d’affaires fourni.

Le site est une vitrine statique. Le formulaire ouvre l’application de messagerie du visiteur avec un brouillon prérempli : aucun message n’est stocké ou envoyé par un serveur. Les photos montrent les visuels du prototype présentés dans le plan d’affaires ; les performances et les fonctionnalités décrites restent à valider.

La stratégie de vente, les canaux commerciaux et les tarifs de référence proviennent du plan d’affaires et du plan financier fournis : 60 000 FCFA pour le dispositif, 15 000 FCFA comme repère de base d’installation, et maintenance annuelle sur devis. Le total dispositif + installation (75 000 FCFA) est indicatif, l’installation pouvant varier selon le site et l’équipement. Les modalités de paiement seront précisées sur le devis, car les documents ne fixent pas de moyen ni d’échéancier standard.

## Prévisualiser sur son ordinateur

Depuis la racine du dépôt, lancez :

```powershell
python -m http.server 8000
```

Ouvrez ensuite <http://localhost:8000>. Le site fonctionne sans installation. Les polices système sont utilisées pour éviter les requêtes vers un service tiers.

## Configurer avant publication

1. Vérifiez que l’adresse `aquasmartcontrole@gmail.com`, le numéro `+229 01 64 28 51 72` et le lien WhatsApp associé sont toujours les coordonnées professionnelles à publier.
2. Vérifiez le nom de l’entreprise, l’adresse indiquée (Natitingou, Atacora, Bénin), les textes, les tarifs prévisionnels et le logo. Ne publiez que des informations exactes et autorisées.
3. Le montant annuel de maintenance reste à confirmer ; le site indique donc « sur devis ».
4. Les conditions de règlement devront être confirmées sur les devis avant la vente ; le site n’annonce pas de mode ni de calendrier de paiement non validé.
5. Gardez à jour la mention « phase de conception et de prototypage » jusqu’à ce que les essais permettent de confirmer un autre état d’avancement.
6. Le formulaire nécessite un logiciel de messagerie configuré chez le visiteur.

## Publier avec GitHub Pages

Le workflow autonome [`.github/workflows/deploy-site.yml`](./.github/workflows/deploy-site.yml) publie le site après un push sur `main` ou `master`. Il peut aussi être lancé manuellement depuis l’onglet **Actions**.

1. Envoyez le dépôt sur GitHub.
2. Ouvrez **Settings > Pages** et sélectionnez **GitHub Actions** comme source de publication.
3. Vérifiez l’exécution du workflow **Deploy AquaSmart site** dans **Actions**.
4. Une fois publié, GitHub Pages affiche l’adresse du site dans **Settings > Pages**. Pour un dépôt de projet, elle ressemble à `https://<utilisateur>.github.io/<nom-du-depot>/`.

Le site n’utilise pas d’URL absolues pour ses propres fichiers : il fonctionne donc aussi bien à la racine d’un domaine qu’à la racine d’un dépôt GitHub Pages.
