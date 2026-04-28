import { Document, model, Schema } from "mongoose";

interface ICounterDocument extends Document {
    _id: string;
    seq: number;
}

const CounterSchema = new Schema<ICounterDocument>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = model('counter', CounterSchema);

//export default Counter;



/**
 * Plugin de auto-incremento para Mongoose.
 * @param schema El esquema Mongoose al que se aplica el plugin
 * @param options Opciones de configuración
 *  - id: ID único del contador
 *  - field: nombre del campo a rellenar (default: 'seq')
 */
export function autoIncrementPlugin(
  schema: Schema,
  options: { id: string; field?: string; string?: boolean }
): void {
  const field = options.field ?? 'seq';
  const counterModel = Counter;

  schema.pre('save', async function (next) {
    const doc = this as Document & { [key: string]: any };

    if (!doc.isNew) return next();

    try {
      const counter = await counterModel.findByIdAndUpdate(
        options.id,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      if (counter) {
        doc[field] = options.string ? counter.seq.toString() : counter.seq;
      }

      next();
    } catch (err) {
      next(err as any);
    }
  });
}




/* Ejemplo de uso

VehicleSchema.plugin(autoIncrementPlugin, {
  id: "vehicleId",  // Identificador del contador.
  field: "ID"       // Propiedad que va a incrementar.
});

*/