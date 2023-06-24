import { SchemaName } from '../../types/schema';

// TODO maybe on higher level along with entire schema validation
type ValidateSchemaName = (name: SchemaName) => void;

export const validateSchemaName: ValidateSchemaName = name => {
    if (name.match(/\W/)) {
        throw new Error(
            'validateSchemaName: schema name must consists of ASCII based characters'
        );
    }
}
