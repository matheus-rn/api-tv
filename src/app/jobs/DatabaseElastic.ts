import esClient from '../../config/elasticsearch'

import { format, zonedTimeToUtc } from 'date-fns-tz'
import { subDays } from 'date-fns'

export default {
  key: 'DatabaseQueue',
  async handle (index: string):Promise<void> {
    const timeZone = zonedTimeToUtc(subDays(new Date(), 1), 'America/Sao_Paulo')
    const date = format(timeZone, 'yyyy-MM-dd')
    const newDate = date.split('-')

    await esClient.deleteByQuery({
      index: index,
      type: 'doc',
      body: {
        query: {
          bool: {
            must: [
              {
                range: {
                  datetime: {
                    gte: `2020-04-${newDate[2]}T00:00:00`,
                    lte: `2020-04-${newDate[2]}T23:59:00`
                  }
                }
              }
            ]
          }
        },
        size: 1000
      }
    })
  }
}
