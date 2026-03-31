# Plan des routes — API Asim'UT

Base URL : `http://localhost:3000`

---

## Élèves `/eleves`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /eleves | Liste tous les élèves | Tous |
| GET | /eleves/:id | Détail d'un élève | Tous |
| POST | /eleves | Créer un élève | Secrétariat |
| PUT | /eleves/:id | Modifier un élève | Secrétariat |
| DELETE | /eleves/:id | Supprimer un élève | Admin |

## Classes `/classes`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /classes | Liste toutes les classes | Tous |
| GET | /classes/:id | Détail d'une classe | Tous |
| GET | /classes/:id/eleves | Élèves d'une classe | Tous |
| POST | /classes | Créer une classe | Admin |
| PUT | /classes/:id | Modifier une classe | Admin |
| DELETE | /classes/:id | Supprimer une classe | Admin |

## Parents `/parents`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /parents | Liste tous les parents | Secrétariat |
| GET | /parents/:id | Détail d'un parent | Secrétariat |
| GET | /parents/:id/eleves | Enfants d'un parent | Secrétariat |
| POST | /parents | Créer un parent | Secrétariat |
| PUT | /parents/:id | Modifier un parent | Secrétariat |
| DELETE | /parents/:id | Supprimer un parent | Admin |

## Professeurs `/professeurs`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /professeurs | Liste tous les professeurs | Tous |
| GET | /professeurs/:id | Détail d'un professeur | Tous |
| GET | /professeurs/:id/eleves | Élèves référencés | Professeur |
| POST | /professeurs | Créer un professeur | Admin |
| PUT | /professeurs/:id | Modifier un professeur | Admin |
| DELETE | /professeurs/:id | Supprimer un professeur | Admin |

## Moyennes `/moyennes`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /eleves/:id/moyennes | Moyennes d'un élève | Élève, Prof, Secrétariat |
| POST | /eleves/:id/moyennes | Saisir une moyenne | Secrétariat |
| PUT | /eleves/:id/moyennes/:mid | Corriger une moyenne | Proviseur uniquement |

## Stages `/stages`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /stages | Liste tous les stages | Référents |
| GET | /stages/:id | Détail d'un stage | Référents |
| GET | /eleves/:id/stages | Stages d'un élève | Tous |
| POST | /eleves/:id/stages | Créer un stage | Élève |
| PUT | /stages/:id | Modifier un stage | Élève |
| DELETE | /stages/:id | Supprimer un stage | Admin |

## Projets `/projets`
| Méthode | Route | Description | Accès |
|---|---|---|---|
| GET | /projets | Liste tous les projets | Tous |
| GET | /projets/:id | Détail d'un projet | Tous |
| GET | /eleves/:id/projets | Projets d'un élève | Tous |
| POST | /projets | Créer un projet | Élève (validé commission) |
| PUT | /projets/:id | Modifier un projet | Responsable projet |
| DELETE | /projets/:id | Supprimer un projet | Admin |