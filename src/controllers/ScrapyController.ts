import puppeteer from 'puppeteer'

class Scrapy {
  private url: string

  public constructor (url:string) {
    this.url = url
  }

  public async channels (): Promise<void> {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    const programs = await this.getCategories(page)
    console.log(programs)
    await browser.close()
  }

  private async getCategories (page: puppeteer.Page): Promise<{}[]> {
    const linkChannel = await this.getLinksChannels(page, this.url)

    let programs = []

    for (let i = 0; i < linkChannel.length; i++) {
      await this.getProgramsChannel(page, `https://meuguia.tv${linkChannel[i]}`).then(program => {
        programs = [...programs, program]
      }).catch(() => {
        throw new Error('Erro ao raspar programas canais')
      })
    }

    return programs
  }

  private async getLinksChannels (page:puppeteer.Page, url: string):Promise<string[]> {
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

    return linksChannels
  }

  private async getProgramsChannel (page:puppeteer.Page, linkChannel: string):Promise<{}> {
    await page.goto(linkChannel)

    let indexStartEnd = await this.getIndexStartEnd(page)
    indexStartEnd = indexStartEnd.filter(e => e !== null)

    const dataChannnels = await this.getPrograms(indexStartEnd, page)

    return dataChannnels
  }

  private async getIndexStartEnd (page:puppeteer.Page):Promise<number[]> {
    await page.$eval('body > div.whitebg > div > ul > li.divider.ad_group', element => {
      return element.remove()
    })

    const indexStartEnd = await page.evaluate(sel => {
      const elements = Array.from(document.querySelectorAll(sel))
      const a = elements.map((element, index) => {
        if ((element.textContent).indexOf(', 19/02') > 0 || (element.textContent).indexOf(', 20/02') > 0) {
          return index
        }
      })
      return a
    }, 'ul > li')

    return indexStartEnd
  }

  private async getPrograms (indexStartEnd:number[], page:puppeteer.Page):Promise<{}[]> {
    let dataChannnels = []
    for (let i = indexStartEnd[0] + 2; i < indexStartEnd[1]; i++) {
      const time = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.lileft.time`, e => e.innerHTML)
      const title = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h2`, e => e.innerHTML)
      const category = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h3`, e => e.innerHTML)
      const channel = await page.$eval('#canal_header > div > h1', e => e.innerHTML)
      const program = {
        time: time,
        title: title,
        category: category,
        channel: channel
      }
      dataChannnels = [...dataChannnels, program]
    }

    return dataChannnels
  }
}

export default Scrapy
