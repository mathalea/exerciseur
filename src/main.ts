import './style.css'
import duree from './exercices/duree'

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
  const paths = url.pathname.split("/").filter(entry => entry !== "")
  const lastPath = paths[paths.length - 1];
  resolveRoute(lastPath)
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
