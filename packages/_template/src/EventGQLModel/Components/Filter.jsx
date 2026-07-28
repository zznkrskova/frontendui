import { DateTimeFilter, Filter as BaseFilter, StringFilter, UUIDFilter } from "../../../../_template/src/Base/FormControls/Filter"

export const Filter = ({ id, onChange: handleChange, children }) => {
    return (
        <BaseFilter id={id} onChange={handleChange} allowJoinSwitch={false}>
            <UUIDFilter id="id" />
            <StringFilter id="name" />

            {/* Filtr podle data a času začátku.
                emitUtcIso={false} znamená, že datum nebude
                převáděno do UTC ISO formátu při odesílání filtru. */}
            <DateTimeFilter id="start_date" emitUtcIso={false} />
            {children}
        </BaseFilter>
    )
}
