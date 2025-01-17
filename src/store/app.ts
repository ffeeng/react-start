import { devtools } from 'valtio/vanilla/utils/devtools'
import { proxy } from 'valtio/vanilla'
export const appState = proxy({})

devtools(appState, { name: 'appState', enabled: true })
