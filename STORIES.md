# User Stories — Asim'UT

## Utilisateurs
- Élève
- Secrétariat
- Proviseur
- Professeur référent

---

## User Stories

| # | En tant que... | Je veux... | Afin de... |
|---|---|---|---|
| 1 | Élève | voir mon prof référent | savoir qui contacter |
| 2 | Élève | consulter mes moyennes par semestre | suivre mon évolution |
| 3 | Secrétariat | importer un fichier CSV d'élèves | gagner du temps en début d'année |
| 4 | Secrétariat | saisir les moyennes | les enregistrer dans le système |
| 5 | Proviseur | corriger une moyenne saisie | rectifier une erreur du secrétariat |
| 6 | Référent | voir la liste de mes élèves | assurer leur suivi |
| 7 | Référent | voir les élèves ayant contacté 15+ entreprises | détecter ceux en difficulté de stage |

---

## Abuser Stories

| # | En tant que... | Je pourrais... | Donc on doit... |
|---|---|---|---|
| 1 | Élève malveillant | modifier la moyenne d'un autre élève via l'API | vérifier les droits à chaque requête |
| 2 | Secrétariat | valider deux fois la même moyenne | bloquer la double saisie |
| 3 | Inconnu | injecter du SQL via le formulaire CSV | utiliser des requêtes préparées |
