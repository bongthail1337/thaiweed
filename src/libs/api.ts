import fs from 'fs'
import { join } from 'path'

const baseDirectory = join(process.cwd(), '_points')

export function getSlugs() {
  return fs.readdirSync(baseDirectory)
}

export function getContentBySlug(slug) {
  const realSlug = slug.replace(/\.json$/, '')
  const fullPath = join(baseDirectory, `${realSlug}.json`)

  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

export function getAllPoints() {
  const slugs = getSlugs()
  return slugs.map(getContentBySlug)
}