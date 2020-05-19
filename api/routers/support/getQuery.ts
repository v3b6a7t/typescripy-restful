import { Model, Document } from 'mongoose';

const forbidden: string[] = ['_id', '__v'];

export default function <D extends object, M extends Model<Document>>(data: D, model: M): object {
    return Object.entries(data).reduce((succ, [key, val]) => {
        if (!forbidden.includes(key) && (key in model.schema.paths)) return Object.assign(succ, { [key]: val });
        return succ;
    }, {})
}