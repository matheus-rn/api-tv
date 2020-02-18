import puppeteer from 'puppeteer'

class Scrapy {
  public async channels (): Promise<void> {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await this.getCategories(page)
    await browser.close()
  }

  private async getCategories (page: puppeteer.Page): Promise<void> {
    const url = 'https://meuguia.tv/programacao/categoria'
    // const categories = ['Filmes', 'Series', 'Esportes', 'Infantil', 'Variedades',
    //  'Documentarios', 'Noticias', 'Aberta']

    await page.goto('https://meuguia.tv/programacao/canal/MGM')

    let countStartEnd = await page.evaluate(sel => {
      const elements = Array.from(document.querySelectorAll(sel))
      const a = elements.map((element, index) => {
        if ((element.textContent).indexOf(', 19/02') > 0 || (element.textContent).indexOf(', 20/02') > 0) {
          return index
        }
      })
      return a
    }, 'ul > li')

    countStartEnd = countStartEnd.filter(Number)

    let data = []
    for (let i = countStartEnd[0] + 2; i < countStartEnd[1]; i++) {
      const time = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.lileft.time`, e => e.innerHTML)
      const title = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h2`, e => e.innerHTML)
      const category = await page.$eval(`body > div.whitebg > div > ul > li:nth-child(${i}) > a > div.licontent > h3`, e => e.innerHTML)

      const program = {
        time: time,
        title: title,
        category: category
      }
      data = [...data, program]
    }

    console.log(data)
  }
}

export default new Scrapy()
