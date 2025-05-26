
import { createPinia } from 'pinia'
import { useUserStore} from './user'

const pinia = createPinia()

export default pinia

export { 
    useUserStore
 }
