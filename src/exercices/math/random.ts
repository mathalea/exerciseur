/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {int[]} liste - Tous les éléments que l'on souhaite supprimer
* @return {int} Nombre au hasard entre min et max non compris dans la listeAEviter
*
* @example
* // Renvoie 1, 2 ou 3
* randint (1,3)
* @example
* // Renvoie -1 ou 1
* randint(-1,1,[0])
* @example
* Renvoie 0 ou 1 ou 4 ou 6 ou 8 ou 9
* randint(0,9, '2357') // même résultat avec randint(0,9, ['2','3','5','7']) ou randint(0,9, [2,3,5,7])
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
export function randint (min: number, max: number, listeAEviter: number[] = []) {
  // Source : https://gist.github.com/pc035860/6546661
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    console.log('Les min et max de randint doivent être entiers', { min, max })
    min = Math.floor(min)
    max = Math.ceil(max)
    if (max - min < 1) max = min + 1
  }
  const range = max - min
  let rand = Math.floor(Math.random() * (range + 1))
  // if (typeof listeAEviter === 'string') {
  //   listeAEviter = listeAEviter.split('')
  // }
  if (typeof listeAEviter === 'number') {
    if (Number.isInteger(listeAEviter)) {
      listeAEviter = [listeAEviter]
    } else {
      console.log('Le nombre fourni à randint en exclusion n\'est pas un entier', { listeAEviter })
      listeAEviter = [listeAEviter] // ce n'est pas grave de mettre un nombre non entier, randint ne choisit que des entiers
    }
  }
  if (Array.isArray(listeAEviter)) {
    listeAEviter = listeAEviter.map(Number).filter(el => Math.round(el) === el) // on filtre les non nombres et les non-entiers
  } else {
    console.log('La liste d\'exclusion de randint n\'est pas d\'un type pris en compte', { listeAEviter })
    listeAEviter = []
  }
  if (listeAEviter.length > 0) {
    while (listeAEviter.includes(min + rand)) {
      rand = Math.floor(Math.random() * (range + 1))
    }
  }
  return min + rand
}
