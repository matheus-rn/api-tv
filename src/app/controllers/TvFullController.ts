import { Request, Response } from 'express'
import esClient from '../../config/elasticsearch'
import { zonedTimeToUtc } from 'date-fns-tz'

class TvFullController {
  public async searchCurrentPrograms (req: Request, res: Response): Promise<Response> {
    const channel = req.query.channel

    const paramsQuery = {
      index: 'channels',
      type: 'doc',
      body: {
        query: {
          match: {
            'channel.keyword': channel
          }
        },
        sort: [{ datetime: 'asc' }],
        size: 1000
      }
    }

    let documents = (await esClient.search(paramsQuery)).body.hits.hits
    documents = documents.map((document: any) => document._source)

    const timeZone = zonedTimeToUtc(new Date(), 'America/Sao_Paulo')

    const indexProgram = documents.findIndex((document: any) => {
      const timeZoneProgram = zonedTimeToUtc(new Date(document.datetime), 'America/Sao_Paulo')

      return timeZoneProgram.getTime() > timeZone.getTime()
    })

    const programs = {
      currentProgram: documents[indexProgram - 1],
      nextProgram: documents[indexProgram]
    }

    return res.json(programs)
  }
}

export default new TvFullController()
