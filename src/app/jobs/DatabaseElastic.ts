import esClient from '../../config/elasticsearch'

export default {
  key: 'DatabaseQueue',
  async handle (index: string):Promise<void> {
    await esClient.deleteByQuery({
      index: index,
      type: 'doc',
      body: {
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          match_all: {}
        }
      }
    })
  }
}
