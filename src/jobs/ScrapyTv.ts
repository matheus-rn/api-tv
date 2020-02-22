import ScrapyController from '../controllers/ScrapyController'

export default {
  key: 'ScrapyTv',
  async handle (url: string):Promise<void> {
    await new ScrapyController(url).channels()
  }
}
