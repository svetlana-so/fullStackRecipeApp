import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { z } from 'zod'
import { Recipe } from './recipe'

@Entity()
export class Step {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  name: string

  @Column('text')
  ingredients: string

  @Column('text')
  description: string

  @Column('integer')
  recipeId: number

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, { onDelete: 'CASCADE' })
  @JoinColumn()
  recipe: Recipe
}

export type StepBare = Omit<Step, 'recipe'>

export const stepSchema = validates<StepBare>().with({
  id: z.number().int().positive(),
  name: z.string().trim(),
  recipeId: z.number().positive(),
  ingredients: z.string(),
  description: z.string(),
})

export const stepInsertSchema = stepSchema.omit({
  id: true,
})

export type StepInsert = z.infer<typeof stepInsertSchema>
