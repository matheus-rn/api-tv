import { Request, Response } from 'express'
import esClient from '../../config/elasticsearch'
import { zonedTimeToUtc } from 'date-fns-tz'
import { subHours } from 'date-fns'

class TvFullController {
  public async searchCurrentPrograms (req: Request, res: Response): Promise<Response> {
    const paramsQuery = {
      index: 'channels',
      type: 'doc',
      body: {
        query: {
          match: {
            channel: 'Canal Brasil'
          }
        },
        sort: [{ datetime: 'asc' }],
        size: 1000
      }
    }

    let documents = (await esClient.search(paramsQuery)).body.hits.hits
    documents = documents.map(document => document._source)

    const timeZone = zonedTimeToUtc(subHours(new Date(), 3), 'America/Sao_Paulo')

    const indexProgram = documents.findIndex(document => {
      const timeZoneProgram = zonedTimeToUtc(subHours(new Date(document.datetime), 3), 'America/Sao_Paulo')

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
