import Queue from 'bull'
import redis from '../../config/redis'

import DatabaseElastic from '../jobs/DatabaseElastic'

const DatabaseQueue = new Queue(DatabaseElastic.key, { redis })

export default DatabaseQueue
