import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-BR')
dayjs.extend(relativeTime)

export { dayjs }
