import ScrapyTy from '../jobs/ScrapyTv'

const url = process.env.API_SCRAPY
const categories = process.env.CATEGORIES

ScrapyTy.handle(`${url}/${categories[0]}`)
