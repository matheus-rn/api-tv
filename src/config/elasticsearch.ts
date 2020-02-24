import { Client } from '@elastic/elasticsearch'

const esClient = new Client({
  node: process.env.ELASTIC_HOST
})

export default esClient
