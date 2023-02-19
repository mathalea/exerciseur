/**
 * Source : https://git.sesamath.net/sesamath/sesajs-dom/
 * Auteur : Daniel Caillibaud
 * Modifications : Rémi Angot pour le passage en TS
 */
/**
 * Ajoute une css dans le <head> de la page
 * @param {string}  file Chemin du fichier css (mis dans href tel quel)
 * @param {Object} [options]
 * @param {Object} [options.verbose=false] Passer true pour râler en console si le css était déjà chargé
 */
export function addCss (file: string, { verbose }: { verbose?: boolean } = {}) {
  if (typeof file !== 'string' || !/\.css(\?.*)?$/.test(file)) throw Error(`href invalide pour un css ${file}`)
  const head = document.querySelector('head')
  if (!head) throw Error('Pas de <head> dans le document courant')
  const links = document.querySelectorAll('head link')
  if (links.every((link) => link.href !== file)) {
    const elt = window.document.createElement('link')
    elt.rel = 'stylesheet'
    elt.type = 'text/css'
    elt.href = file
    head.appendChild(elt)
  } else if (verbose) {
    console.error(Error(`${file} était déjà chargé`))
  }
}

/**
 * Ajoute un js à la fin du body et appelle la callback quand il est chargé
 * @param {string}  file Chemin du fichier jss (mis dans src tel quel)
 * @param {boolean} [isModule=false]
 * @param {number} timeout
 * @return {Promise<undefined, Error>}
 */
export async function addJs (file: string, isModule = false, timeout = 30) {
  return await new Promise((resolve, reject) => {
    /**
     * @private
     * @type {HTMLElement}
     */
    const { body } = document
    const elt = window.document.createElement('script')
    elt.type = isModule ? 'module' : 'text/javascript'
    // pour que ça marche mieux partout, il vaut mieux mettre le listener onload après avoir mis l'élément dans le dom et ensuite ajouter src
    body.appendChild(elt)
    const onLoad = () => {
      if (timerId) clearTimeout(timerId)
      elt.removeEventListener('load', onLoad)
      resolve()
    }
    elt.addEventListener('load', onLoad)
    elt.src = file
    let timerId: number
    if (timeout > 0) {
      timerId = setTimeout(() => reject(Error(`${file} n’est toujours pas chargé après ${timeout}s`)), timeout * 1000)
    }
  })
}

/**
 * Ajoute un élément html de type tag à parent
 * @param {HTMLElement} parent
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs
 * @param {string} [content=]
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElement (parent: HTMLElement, tag: string, attrs = {}, content = '') {
  const elt = getElement(tag, attrs, content)
  parent.appendChild(elt)
  return elt
}

export function addDiv (parent: HTMLElement, attrs = {}, content = ''): HTMLDivElement {
  return <HTMLDivElement>addElement(parent, 'div', attrs, content)
}

/**
 * Ajoute un élément html juste après element
 * @param {HTMLElement} element
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs
 * @param {string} [content=]
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElementAfter (element: HTMLElement, tag: string, attrs = {}, content = '') {
  const newElt = getElement(tag, attrs, content)
  const parent = element.parentNode
  // pas de insertAfter, si nextSibling est null ça le mettra à la fin, cf https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  if (parent) parent.insertBefore(newElt, element.nextSibling)
  else console.error(new Error("Navigateur ou element incompatible (pas de parentNode), impossible d'ajouter l'élément"))
  return newElt
}

/**
 * Ajoute un élément html juste avant element
 * @param {HTMLElement} element
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs
 * @param {string} [content=]
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElementBefore (element: HTMLElement, tag: string, attrs = {}, content = '') {
  const newElt = getElement(tag, attrs, content)
  const parent = element.parentNode
  if (parent) parent.insertBefore(newElt, element)
  else console.error(new Error("Navigateur incompatible (pas de parentNode), impossible d'insérer l'élément"))

  return newElt
}

/**
 * Ajoute un élément html comme premier enfant de parent
 * @param {HTMLElement} parent
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs
 * @param {string} [content=]
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElementFirstChild (parent: HTMLElement, tag: string, attrs = {}, content = '') {
  const newElt = getElement(tag, attrs, content)
  parent.insertBefore(newElt, parent.firstChild)
  return newElt
}

/**
 * Ajoute un élément html comme frère aîné de elementRef
 * @param {HTMLElement} elementRef
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs
 * @param {string} [content=]
 * @returns {HTMLElement} L'élément ajouté
 */
export function addElementFirstSibling (elementRef: HTMLElement, tag: string, attrs = {}, content = '') {
  return addElementFirstChild(<HTMLElement>elementRef.parentNode, tag, attrs, content)
}

/**
 * Ajoute du texte dans un élément
 * @param {HTMLElement} elt
 * @param {string} text
 */
export function addText (elt: HTMLElement, text: string) {
  elt.appendChild(window.document.createTextNode(text))
}

/**
 * Vide un élément html de tous ses enfants
 * @param {HTMLElement} element
 */
export function empty (element: HTMLElement) {
  while (element.firstChild) element.removeChild(element.firstChild)
}

/**
 * Retourne un élément html de type tag
 * @param {string} tag
 * @param {Object} [attrs={}] Les attributs éventuels
 * @param {string} [content=]
 */
export function getElement (tag: string, attrs = {}, txtContent = '') {
  if (typeof attrs === 'string') {
    txtContent = attrs
    attrs = {}
  }
  const elt = window.document.createElement(tag)
  if (typeof attrs === 'object') {
    Object.entries(attrs).forEach(([attr, value]) => {
      // pour l'attribut class on passe par la prop className
      if (['class', 'className'].includes(attr)) elt.className = value
      else if (attr === 'style') setStyles(elt, value)
      else elt.setAttribute(attr, value)
    })
  }
  if (txtContent) addText(elt, txtContent)
  return elt
}

/**
 * Retourne la taille de la fenêtre
 * @returns {{width: number, height: number}}
 */
export function getWindowSize () {
  const { body } = document
  // en cas de zoom, window.innerWidth est plus petit, et c'est la bonne valeur
  return {
    width: Math.floor(Math.min(body.clientWidth, window.innerWidth)),
    height: Math.floor(Math.min(body.clientHeight, window.innerHeight))
  }
}

/**
 * Retourne un id qui n'existe pas encore dans le dom (mais ne le créé pas), de la forme sesaXX ou XX est numérique
 */
export const getNewId = (function () {
  // au dela de 100000 id dans un dom y'a un pb !
  const max = 100000
  // une closure pour conserver la valeur de cette variable privée entre 2 appels
  let lastId = 0
  let id = 'sesa' + lastId
  return function getNewId () {
    while (window.document.getElementById(id) && lastId < max) {
      lastId++
      id = 'sesa' + lastId
    }
    if (lastId === max) throw Error('Max de ' + max + ' id générés atteint')
    return id
  }
})()

/**
 * Affecte des styles à un élément html (on peut pas affecter elt.style directement car read only, faut faire du elt.style.foo = bar)
 * sans planter en cas de pb (on le signale juste en console)
 * @param {HTMLElement} elt
 * @param {string|object} styles
 */
export function setStyles (elt: HTMLElement, styles: string | object) {
  try {
    if (elt && elt.style) {
      if (typeof styles === 'string') {
        styles.split(';').forEach(function (chunk) {
          const paire = /([\w]+):(.+)/.exec(chunk)
          if (paire) {
            const [, prop, value] = paire
            elt.style[prop.trim()] = value.trim()
          } else {
            console.error(Error(`propriété de style mal formulée : ${chunk}`))
          }
        })
      } else if (typeof styles === 'object') {
        Object.entries(styles).forEach(([prop, value]) => {
          elt.style[prop] = value
        })
      } else {
        console.error(Error('styles invalide'), styles)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
