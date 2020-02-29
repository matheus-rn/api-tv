import { Request, Response } from 'express'
import esClient from '../../config/elasticsearch'

class TvFullController {
  public async searchCurrentPrograms (req: Request, res: Response): Promise<Response> {
    const programs = []
    const paramsQuery = {
      index: 'channels',
      type: 'doc',
      body: {
        query: {
          match: {
            channel: 'Canal Brasil'
          }
        },
        sort: [{ datetime: 'asc' }]
      }
    }

    let documents = (await esClient.search(paramsQuery)).body.hits.hits
    documents = documents.map(document => document._source)
    const indexProgram = documents.findIndex(document => document.datetime === '2020-02-29T04:00:00')
    return res.json(indexProgram)
  }
}

export default new TvFullController()
