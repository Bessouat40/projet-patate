Documentation de Prompt Engineering pour le LLM
Objectif
Permettre à un modèle de langage léger (1 à 7 milliards de paramètres) de générer des recettes adaptées aux restrictions alimentaires causées par des maladies. Lorsqu'un utilisateur décrit une maladie, le modèle doit :

Fournir une liste d'ingrédients avec les quantités pour une recette existante qui évite les aliments interdits associés à la maladie.
Expliquer le processus de préparation du plat.
Informations nécessaires pour le modèle
Maladies et restrictions alimentaires

Une correspondance entre les maladies et les aliments interdits. Par exemple :
Maladie cœliaque : Éviter les céréales contenant du gluten (blé, orge, seigle).
Intolérance au lactose : Éviter les produits laitiers contenant du lactose.
Hypertension : Limiter l'apport en sel ; éviter les aliments riches en sodium.
Diabète : Limiter les sucres et les glucides simples.
Allergie aux noix : Éviter tous types de noix et les produits en contenant.
Base de données de recettes

Une collection de recettes avec les ingrédients et les quantités.
Chaque recette doit être étiquetée avec ses ingrédients pour permettre le filtrage en fonction des aliments interdits.
Étapes de préparation

Des instructions étape par étape pour préparer chaque recette.
Un langage clair et concis pour guider l'utilisateur tout au long du processus de cuisson.
Instructions pour le modèle
Comprendre la demande de l'utilisateur

Identifier la maladie mentionnée par l'utilisateur.
Récupérer la liste des aliments interdits associés à cette maladie.
Sélectionner une recette appropriée

Rechercher dans la base de données des recettes qui n'incluent aucun aliment interdit.
Si aucune correspondance directe n'est disponible, suggérer des recettes où les ingrédients interdits peuvent être remplacés par des alternatives sûres.
Générer la réponse

Partie 1 : Liste des ingrédients avec les quantités

Présenter une liste claire des ingrédients nécessaires pour la recette.
Inclure des quantités précises pour chaque ingrédient.
Partie 2 : Étapes de préparation

Fournir des instructions détaillées, étape par étape, pour préparer le plat.
S'assurer que le langage est facile à comprendre et à suivre.
Exemple
Demande de l'utilisateur :

"J'ai de l'hypertension. Pouvez-vous me suggérer une recette pour le dîner ?"

Réponse du modèle :

Partie 1 : Ingrédients

2 filets de saumon (environ 150g chacun)
1 citron
2 cuillères à soupe d'huile d'olive
1 cuillère à café d'aneth séché
1 gousse d'ail émincée
Poivre noir fraîchement moulu au goût
200g d'asperges
100g de quinoa
250ml d'eau
Partie 2 : Étapes de préparation

Préparer le quinoa :

Rincer le quinoa sous l'eau froide.
Dans une casserole, porter à ébullition 250ml d'eau.
Ajouter le quinoa, réduire le feu à doux, couvrir et laisser mijoter pendant 15 minutes ou jusqu'à absorption de l'eau.
Aérer avec une fourchette et réserver.
Préparer la marinade du saumon :

Dans un petit bol, mélanger l'huile d'olive, le jus d'un demi-citron, l'ail émincé, l'aneth séché et le poivre.
Placer les filets de saumon dans un plat et verser la marinade dessus.
Laisser mariner pendant 15 minutes.
Cuire le saumon :

Préchauffer le four à 180°C (350°F).
Déposer le saumon mariné sur une plaque de cuisson recouverte de papier sulfurisé.
Cuire au four pendant 15-20 minutes, ou jusqu'à ce que le saumon soit cuit à point.
Préparer les asperges :

Pendant la cuisson du saumon, couper les extrémités des asperges.
Cuire à la vapeur ou bouillir les asperges pendant 5-7 minutes jusqu'à ce qu'elles soient tendres.
Servir :

Dresser le quinoa dans les assiettes, placer le saumon cuit dessus et servir avec les asperges à côté.
Garnir de tranches de citron si désiré.
Considérations
Éviter les aliments interdits : S'assurer que la recette évite les ingrédients riches en sodium, car les personnes hypertendues doivent limiter leur apport en sel.
Méthodes de cuisson saines : Privilégier la cuisson au four, à la vapeur ou au gril plutôt que la friture.
Substitutions d'ingrédients : Utiliser des herbes et des épices pour rehausser la saveur sans ajouter de sel.
Notes d'implémentation
Contraintes du modèle : Étant donné la taille du modèle, garder les invites et les réponses concises.

Prétraitement des données : Simplifier les correspondances maladie-aliments et les ingrédients des recettes aux informations essentielles.

Exemple d'invite :

L'utilisateur a [Maladie]. Suggérez une recette qui évite les aliments interdits. Fournissez les ingrédients avec les quantités et les étapes de préparation.
