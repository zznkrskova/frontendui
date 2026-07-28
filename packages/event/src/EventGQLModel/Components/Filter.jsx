import { DateTimeFilter, Filter as BaseFilter, StringFilter, UUIDFilter } from "../../../../_template/src/Base/FormControls/Filter"

export const Filter = ({ id, onChange: handleChange, children }) => {
    return (
        <BaseFilter id={id} onChange={handleChange}>
            <UUIDFilter id="id" />
            <StringFilter id="name" />

            {/* Filtr podle data a času začátku události.
                emitUtcIso={false} znamená, že datum nebude
                převáděno do UTC ISO formátu. */}
            <DateTimeFilter id="start_date" emitUtcIso={false} />

            {/* Filtr podle data a času konce události. */}
            <DateTimeFilter id="end_date" emitUtcIso={false} />
            {/* <FloatFilter id="count" /> */}
            {children}
        </BaseFilter>
    )
}
