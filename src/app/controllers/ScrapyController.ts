import puppeteer from 'puppeteer'
import esClient from '../../config/elasticsearch'
import { format, zonedTimeToUtc } from 'date-fns-tz'
import { addDays } from 'date-fns'

class Scrapy {
  public constructor () {
    this.url = ''
  }

  private url: string

  public setUrl (url:string):void {
    this.url = url
  }

  public async channels (): Promise<void> {
    console.log('chegou channel')

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()

    console.log('chegou categorias')

    await this.getCategories(page)

    await browser.close()
  }

  private async getCategories (page: puppeteer.Page): Promise<void> {
    console.log('getCategories0')
    const linkChannel = await this.getLinksChannels(page, this.url)
    console.log('getCategories')
    for (let i = 0; i < linkChannel.length; i++) {
      await this.getProgramsChannel(page, `https://meuguia.tv${linkChannel[i]}`)
    }
  }

  private async getLinksChannels (page:puppeteer.Page, url: string):Promise<string[]> {
    console.log(url)
    await page.goto(url)

    await page.$eval('body > div.whitebg > div > ul > li.divider.ad_group', element => {
      return element.remove()
    })

    let linksChannels = await page.$$eval('ul > li', elements => {
      const links = elements.map(element => {
        return element.querySelector('a').getAttribute('href')
      })
      return links
    })

    linksChannels = linksChannels.filter(link => link !== null)
    console.log('getlinkschannels')
    return linksChannels
  }

  private async getProgramsChannel (page:puppeteer.Page, linkChannel: string):Promise<void> {
    await page.goto(linkChannel).catch(() => {
      throw new Error('Erro ao acessar a url enviada')
    })

    let indexStartEnd = await this.getIndexStartEnd(page)
    indexStartEnd = indexStartEnd.filter(e => e !== null)
    console.log('getProhrams')
    await this.getPrograms(indexStartEnd, page)
  }

  private async getIndexStartEnd (page:puppeteer.Page):Promise<number[]> {
    await page.waitForSelector('body > div.whitebg > div > ul > li.divider.ad_group')

    await page.$eval('body > div.whitebg > div > ul > li.divider.ad_group', element => {
      return element.remove()
    })

    await page.$$eval('body > div.whitebg > div > ul > li.divider', elements => {
      return elements.forEach(element => element.remove())
    })

    const dateTomorrow = this.getDateLimite(1).split('-')
    const dateAfterTomorrow = this.getDateLimite(2).split('-')

    const indexStartEnd = await page.evaluate((sel, dateTomorrow, dateAfterTomorrow) => {
      const elements = Array.from(document.querySelectorAll(sel))

      const arrayIndexs = elements.map((element, index) => {
        if ((element.textContent).indexOf(`, ${dateTomorrow[2]}/${dateTomorrow[1]}`) > 0 ||
            (element.textContent).indexOf(`, ${dateAfterTomorrow[2]}/${dateAfterTomorrow[1]}`) > 0) {
          return index
        }
      })
      return arrayIndexs
    }, 'ul > li', dateTomorrow, dateAfterTomorrow)

    console.log('getindex')
    return indexStartEnd
  }

  private async getPrograms (indexStartEnd:number[], page:puppeteer.Page):Promise<void> {
    const dateTomorrow = this.getDateLimite(1)

    for (let i = indexStartEnd[0] + 2; i <= indexStartEnd[1]; i++) {
      const time = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.lileft.time`, e => e.innerHTML)
      const title = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h2`, e => e.innerHTML)
      const category = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h3`, e => e.innerHTML)
      const channel = await page.$eval('#canal_header > div > h1', e => e.innerHTML)
      console.log(channel)
      await esClient.index({
        index: 'channels',
        type: '_doc',
        body: {
          channel: channel.toUpperCase(),
          title: title,
          category: category,
          datetime: `${dateTomorrow}T${time}:00`
        }
      })
    }
  }

  private getDateLimite (days: number):string {
    const timeZone = zonedTimeToUtc(addDays(new Date(), days), 'America/Sao_Paulo')
    const date = format(timeZone, 'yyyy-MM-dd')
    return date
  }
}

export default new Scrapy()
