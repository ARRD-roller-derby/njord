import { vi} from 'vitest'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import frFns from 'date-fns/locale/fr'

registerLocale('fr', frFns)
setDefaultLocale('fr')

const date = new Date(2022, 7, 7,7)
vi.setSystemTime(date)
