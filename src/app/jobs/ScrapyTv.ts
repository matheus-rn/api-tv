import ScrapyController from '../controllers/ScrapyController'

export default {
  key: 'ScrapyTv',
  async handle (url: string):Promise<void> {
    ScrapyController.setUrl(url)
    await ScrapyController.channels()
  }
}
