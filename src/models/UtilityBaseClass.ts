import { z } from 'zod';

type ShapeOf<T> = T extends z.ZodObject<infer Shape> ? Shape : never;
type ShapeKeys<T extends z.ZodType<any, any>> = keyof ShapeOf<T>;

interface IValidateOptions<Schema extends z.AnyZodObject> {
  pick?: ShapeKeys<Schema>[];
  omit?: ShapeKeys<Schema>[];
}

/**
 * A utility class for validating and sanitizing objects based on a Zod schema.
 * @template Schema - The Zod schema to use for validation and sanitization.
 */
export class UtilityClass<Schema extends z.AnyZodObject> {
  public schema: Schema;
  public schemaKeys: ShapeKeys<Schema>[];

  /**
   * Creates a new instance of the UtilityClass.
   * @param schema - The Zod schema to use for validation and sanitization.
   */
  constructor(schema: Schema) {
    this.schema = schema;
    this.schemaKeys = Object.keys(schema.shape) as ShapeKeys<Schema>[];
  }

  /**
   * Returns a new object containing only the properties of the input object that are defined in the Zod schema.
   * @param obj - The input object to sanitize.
   * @returns A new object containing only the properties of the input object that are defined in the Zod schema.
   */
  public getSafeObject(obj: Record<any, any>) {
    const safeObject: Record<ShapeKeys<Schema>, any> = {} as Record<ShapeKeys<Schema>, any>;

    for (const key of this.schemaKeys) {
      if (obj.hasOwnProperty(key)) {
        safeObject[key] = obj[key];
      }
    }

    return safeObject;
  }
  
  /**
   * Validates and sanitizes an object based on the UtilityClass's Zod schema.
   * @param obj - The object to validate and sanitize.
   * @param options - An optional object containing `pick` and `omit` properties, which are arrays of keys to include or exclude from the validated object.
   * @returns The validated and sanitized object.
   * @throws An error if both `pick` and `omit` are specified.
   */
  public validate(obj: Record<string, any>, options: IValidateOptions<Schema> = {}) {
    const { pick = [], omit = [] } = options;

    if (pick.length > 0 && omit.length > 0) {
      throw new Error('Cannot use both pick and omit');
    }

    const safeObject = this.getSafeObject(obj);

    if (pick.length > 0) {
      const pickObject: Record<ShapeKeys<Schema>, true> = {} as Record<ShapeKeys<Schema>, true>;

      for (const key of pick) {
        pickObject[key] = true;
      }

      return this.schema.pick(pickObject).parse(safeObject);
    }

    if (omit.length > 0) {
      const omitObject: Record<ShapeKeys<Schema>, true> = {} as Record<ShapeKeys<Schema>, true>;

      for (const key of omit) {
        omitObject[key] = true;
      }

      return this.schema.omit(omitObject).parse(safeObject);
    }

    return this.schema.parse(safeObject);
  }
}