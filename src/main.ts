import './style.css'
import duree from './exercices/duree'
import horaireDebut from './exercices/horaireDebut'

const app = document.querySelector('#app') as HTMLDivElement

interface route {
  path: string
  component: (input: HTMLElement) => void
}

function errorComponent (div: HTMLElement) {
  div.innerText = 'Erreur de chargement...'
}

const routes = [
  {path: 'duree', component: duree},
  {path: 'horaireDebut', component: horaireDebut},
]

const findComponentByPath = (path: string, routes: route[]) => routes.find(route => route.path === path) || undefined;


function resolveRoute(route: string) {
  try {
    const { component = errorComponent } =  findComponentByPath(route, routes) || {}
    component(app)
  } catch (error) {
    console.log(`url ${route} non pris en charge`)
  }
}

function router(): void {
  const url = new URL(document.URL)
  const params = url.search
  resolveRoute(params.replace('?', ''))
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
