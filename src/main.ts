import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'


const divApp = document.getElementById("app")
if (divApp) {
    divApp.innerHTML = ''
    const app = mount(App, { target: divApp })
}
