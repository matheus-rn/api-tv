import ScrapyTv from './app/jobs/ScrapyTv'
import Queue from './app/lib/Queue'

const url = process.env.API_SCRAPY
const categories = process.env.CATEGORIES.split(',')

// Queue.process(async job => {
//   await ScrapyTv.handle(job.data.url)
// })

Queue.process('queue of the categories', async (job, done) => {
  for (let i = 0; i < categories.length; i++) {
    const data = {
      url: `${url}/${job.data.categories[i]}`
    }

    await Queue.add(ScrapyTv.key, data)
  }
  done()
})

Queue.process(ScrapyTv.key, async (job, done) => {
  console.log(job.data.url)
  done()
})

Queue.add('queue of the categories', { categories }, {
  repeat: {
    cron: '*/5 * * * * *'
  }
})
