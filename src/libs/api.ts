import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const pointsDirectory = join(process.cwd(), '_points')

export function getPointSlugs() {
  return fs.readdirSync(pointsDirectory)
}

export function getPointBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.json$/, '')
  const fullPath = join(pointsDirectory, `${realSlug}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPoints(fields: string[] = []) {
  const slugs = getPointSlugs()
  const points = slugs
    .map((slug) => getPointBySlug(slug, fields))
    .sort((point1, point2) => (point1.date > point2.date ? -1 : 1))
  return points
}
