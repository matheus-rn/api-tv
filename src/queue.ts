import ScrapyTv from './app/jobs/ScrapyTv'
// import Queue from './app/lib/Queue'
// import { format, zonedTimeToUtc } from 'date-fns-tz'
// import { addDays, parseISO } from 'date-fns'

const url = process.env.API_SCRAPY
const categories = process.env.CATEGORIES.split(',')

ScrapyTv.handle(`${url}/${categories[0]}`)

// const parsedDate = parseISO('2018-04-01 16:00:00')
// const znDate = zonedTimeToUtc(parsedDate, 'America/Sao_Paulo')
// console.log(new Date('2018-04-01 16:00:00'))

// categories.forEach(categorie => {
//   const data = {
//     url: `${url}/${categorie}`
//   }
// })

// Queue.process(async job => {
//   await ScrapyTv.handle(job.data.url)
// })

// Queue.process(async job => {
// console.log(job.data.url)
// })

// Queue.add(data, { repeat: { cron: '0 0/1 * * * *' } })
