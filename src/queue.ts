import ScrapyTv from './app/jobs/ScrapyTv'
import DatabaseElastic from './app/jobs/DatabaseElastic'
import Queue from './app/lib/Queue'
import DatabaseQueue from './app/lib/DatabaseQueue'

import ScrapyController from './app/controllers/ScrapyController'

import esClient from './config/elasticsearch'

const url = process.env.API_SCRAPY
const categories = process.env.CATEGORIES.split(',')

const hourScrapy = process.env.HOUR_SCRAPY
const minuteScrapy = process.env.MINUTE_SCRAPY
const hourDatabase = process.env.HOUR_DATABASE
const minuteDatabase = process.env.MINUTE_DATABASE

console.log(`Horário: ${new Date()}`)

// DatabaseQueue.process(async (job, jobDone) => {
//   await DatabaseElastic.handle(job.data.index)
//   jobDone()
// })

// DatabaseQueue.add({ index: 'channels' }
//   , {
//     repeat: {
//       cron: `${minuteDatabase} ${hourDatabase} * * *`
//     }
//   }
// )

// Queue.process(async (job, jobDone) => {
//   await ScrapyTv.handle(job.data.url)
//   jobDone()
// })

// Queue.add({ url: `${url}/${categories[0]}` }
//   , {
//     repeat: {
//       cron: `${minuteScrapy} ${hourScrapy} * * *`
//     }
//   }
// )

// Queue.add({ url: `${url}/${categories[1]}` }, {
//   repeat: {
//     cron: '53 18 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[1]}` }, {
//   repeat: {
//     cron: '05 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[2]}` }, {
//   repeat: {
//     cron: '10 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[3]}` }, {
//   repeat: {
//     cron: '15 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[4]}` }, {
//   repeat: {
//     cron: '20 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[5]}` }, {
//   repeat: {
//     cron: '25 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[6]}` }, {
//   repeat: {
//     cron: '30 15 * * *'
//   }
// })

// Queue.add({ url: `${url}/${categories[7]}` }, {
//   repeat: {
//     cron: '35 15 * * *'
//   }
// })
