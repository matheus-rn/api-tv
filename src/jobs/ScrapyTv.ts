import ScrapyController from '../controllers/ScrapyController'

export default {
  key: 'ScrapyTv',
  async handle ():Promise<void> {
    await ScrapyController.channels()
  }
}
