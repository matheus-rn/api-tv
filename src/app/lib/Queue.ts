import Queue from 'bull'
import redis from '../../config/redis'

import ScrapyTv from '../jobs/ScrapyTv'

const scrapyQueue = new Queue(ScrapyTv.key, { redis })

export default scrapyQueue
