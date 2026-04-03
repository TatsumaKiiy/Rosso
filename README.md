# Pepite Rouge - Chocolaterie Artisanale

Site vitrine pour **Pepite Rouge**, chocolaterie artisanale basee a Paris. Chocolat chaud, chocolat froid, patisseries et coffrets cadeaux faits maison.

## Apercu

Site one-page avec animations premium, design responsive et interactions soignees (curseur custom, effets parallax, animations au scroll).

**Stack technique :** HTML5, CSS3 (variables, Grid, Flexbox), JavaScript vanilla.

## Structure du projet

```
pepite-rouge/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles (reset, composants, responsive)
├── js/
│   ├── main.js             # Logique, animations et interactions
│   └── assets-data.js      # Assets encodes en base64
├── images/
│   ├── illustrations/      # Illustrations de la marque (PNG)
│   └── logos/              # Logos en plusieurs variantes (PNG)
├── .editorconfig           # Configuration editeur
├── .gitignore              # Fichiers ignores par Git
└── README.md
```

## Installation

Aucune dependance requise. Ouvrir `index.html` dans un navigateur.

```bash
# Cloner le depot
git clone https://github.com/TatsumaKiiy/Rosso.git
cd Rosso

# Ouvrir dans le navigateur
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Pour le developpement avec rechargement automatique :

```bash
# Avec Node.js
npx serve .

# Ou avec Python
python -m http.server 8000
```

## Fonctionnalites

- **Preloader** avec barre de progression et transition wipe
- **Animations au scroll** (reveal, stagger, compteurs animes)
- **Curseur custom** avec effet mix-blend-mode (desktop)
- **Boutons magnetiques** et effet ripple au clic
- **Cartes 3D tilt** au survol (desktop)
- **Parallax** sur les images hero (desktop)
- **Menu burger** responsive avec CTA integre
- **Marquee** promotionnel en barre superieure
- **Tabs** produits avec indicateur anime
- **Newsletter** formulaire d'inscription
- **Accessibilite** : skip-to-content, aria-labels, prefers-reduced-motion

## Responsive

4 breakpoints :

| Breakpoint | Cible |
|-----------|-------|
| `1024px`  | Tablette |
| `768px`   | Mobile large |
| `480px`   | Petit mobile |
| `360px`   | Tres petit mobile |

## Polices

- **Playfair Display** (700, 800, 900) — titres
- **DM Sans** (400, 700, 800, 900) — corps de texte

## Palette

| Couleur | Hex | Usage |
|---------|-----|-------|
| Rouge | `#E31E24` | Primaire, CTA, accents |
| Rouge fonce | `#C41A1F` | Hover states |
| Creme | `#FDF5ED` | Arriere-plan |
| Sombre | `#1A0A05` | Texte principal, footer |
| Blanc | `#FFFFFF` | Cartes, sections |

## Licence

Tous droits reserves.
