// import ScrapyTv from './app/jobs/ScrapyTv'
// import Queue from './app/lib/Queue'

// const url = process.env.API_SCRAPY
// const categories = process.env.CATEGORIES.split(',')

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
