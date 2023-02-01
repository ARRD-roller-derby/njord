import { Schema, model, models } from 'mongoose'
import { ArticleInterface } from '../types/article.interface'

const articleSchema = new Schema<ArticleInterface>({
  content: String,
  profile: String,
  leagueId: String,
  visibility: String,
  updatedAt: Date,
})

const Article = models.articles || model('articles', articleSchema)

articleSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Article