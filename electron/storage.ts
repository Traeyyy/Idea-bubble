import fs from 'node:fs'
import path from 'node:path'
import { app } from 'electron'

interface Idea {
  text: string
  createdAt: string
}

export function saveIdeaToFile(text: string) {
  const dataPath = app.getPath('userData')
  const filePath = path.join(dataPath, 'ideas.json')
  let ideas: Idea[] = []

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const parsed: unknown = JSON.parse(content)

    if (!Array.isArray(parsed)) {
      throw new Error('ideas.json must contain an array')
    }

    ideas = parsed as Idea[]
  }

  ideas.push({
    text,
    createdAt: new Date().toISOString(),
  })

  fs.writeFileSync(filePath, JSON.stringify(ideas, null, 2), 'utf-8')

  console.log('保存成功:', filePath)

  return true
}
