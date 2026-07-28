import { Input } from "../../../../_template/src/Base/FormControls/Input"
import { useState, useEffect } from "react"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 */

export const MediumEditableContent = ({ 
    item, 
    onChange = () => {},
    onBlur = () => {},
    onSave = () => {}, 
    onCancel = () => {},
    children 
}) => {

    // Lokální stav formuláře
    // Uchovává všechny editovatelné hodnoty
    const [formData, setFormData] = useState({
        name: "",
        nameEn: "",
        description: "",
        startDate: "",
        endDate: "",
        valid: true,
    })

    // Vrátí aktuální datum a čas ve formátu,
    // který používají HTML inputy typu date a time
    const getCurrentDateTime = () => {
        const now = new Date()

        // Pomocná funkce - doplní nulu zleva (např. 8 -> 08)
        const pad = (value) => String(value).padStart(2, "0")
        return {
            date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
            time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
        }
    }

    // Rozdělí ISO datum (YYYY-MM-DDTHH:mm:ss)
    // na samostatné datum a čas
    const extractDateTime = (value) => {

        // Pokud datum neexistuje,
        // použijeme aktuální datum a čas
        if (!value) return getCurrentDateTime()
        const [datePart, timePart] = String(value).split("T")
        return {
            date: datePart || getCurrentDateTime().date,

            // Z času ponecháme pouze HH:mm
            time: timePart ? timePart.slice(0, 5) : getCurrentDateTime().time,
        }
    }

    // Složí datum a čas zpět do ISO formátu
    const buildIsoDateTime = (dateTime) => {

        // Pokud některá část chybí,
        // nelze vytvořit platné datum
        if (!dateTime || !dateTime.date || !dateTime.time) return null
        return `${dateTime.date}T${dateTime.time}:00`
    }

    // Připraví objekt pro odeslání na backend
    // Přidá hodnoty startdate a enddate ve správném formátu
    const buildPayload = (nextFormData) => ({
        ...nextFormData,
        startdate: buildIsoDateTime(nextFormData.startDate),
        enddate: buildIsoDateTime(nextFormData.endDate),
    })

    // Spustí se při načtení komponenty
    // nebo při změně objektu item
    useEffect(() => {
        if (item) {

            // Pokud upravujeme existující událost,
            // načteme její data do formuláře
            const startDateTime = extractDateTime(item.startdate)
            const endDateTime = extractDateTime(item.enddate)
            setFormData({
                name: item.name || "",
                nameEn: item.nameEn || "",
                description: item.description || "",
                startDate: startDateTime,
                endDate: endDateTime,
                valid: true,
            })
        } else {

            // Pokud vytváříme novou událost,
            // předvyplníme aktuální datum a čas
            const currentDateTime = getCurrentDateTime()
            setFormData({
                name: "",
                nameEn: "",
                description: "",
                startDate: currentDateTime,
                endDate: currentDateTime,
                valid: true,
            })
        }
    }, [item])

    // Zpracování změny libovolného pole formuláře
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target

        // Vytvoří novou kopii formuláře
        // se změněnou hodnotou
        const nextFormData = {
            ...formData,
            [id]: type === "checkbox" ? checked : value,
        }

        // Uloží změny do stavu komponenty
        setFormData(nextFormData)
        
        // Okamžitě informuje rodičovskou komponentu,
        // že se formulář změnil.
        // Současně vytvoří payload obsahující
        // startdate a enddate pro backend.
        try { onChange({ target: { value: buildPayload(nextFormData) } }); } catch (err) { /* ignore */ }
    }
    
    // Uložení formuláře
    const handleSave = () => {

        // Připravíme data ve formátu,
        // který očekává backend
        const payload = buildPayload(formData)
        try { console.debug("MediumEditableContent.handleSave payload", payload) } catch (e) {}

        // Zavoláme callback pro uložení
        onSave(payload)
    }

    // Zrušení editace
    const handleCancel = () => {
        if (item) {

            // Obnovíme původní hodnoty
            // načtené z databáze
            const startDateTime = extractDateTime(item.startdate)
            const endDateTime = extractDateTime(item.enddate)
            setFormData({
                name: item.name || "",
                nameEn: item.nameEn || "",
                description: item.description || "",
                startDate: startDateTime,
                endDate: endDateTime,
                valid: true,
            })
        }

        // Informujeme rodičovskou komponentu,
        // že editace byla zrušena
        onCancel()
    }

    return (  
        <>
            <Input id="name" label="Jméno" className="form-control" value={formData.name} onChange={handleChange} />
            <Input id="nameEn" label="Jméno (EN)" className="form-control" value={formData.nameEn} onChange={handleChange} />
            <Input id="description" label="Popis" className="form-control" value={formData.description} onChange={handleChange} as="textarea" rows={3}/>
            <Input id="startDate" label="Začátek" className="form-control" value={formData.startDate.date} onChange={(e) => handleChange({ target: { id: "startDate", value: { ...formData.startDate, date: e.target.value } } })} type="date" />

            {/* Mění pouze datum, čas zůstává zachovaný*/}
            <Input id="startTime" label="Čas začátku" className="form-control" value={formData.startDate.time} onChange={(e) => handleChange({ target: { id: "startDate", value: { ...formData.startDate, time: e.target.value } } })} type="time" />
            <Input id="endDate" label="Konec" className="form-control" value={formData.endDate.date} onChange={(e) => handleChange({ target: { id: "endDate", value: { ...formData.endDate, date: e.target.value } } })} type="date" />
            <Input id="endTime" label="Čas konce" className="form-control" value={formData.endDate.time} onChange={(e) => handleChange({ target: { id: "endDate", value: { ...formData.endDate, time: e.target.value } } })} type="time" />
            {children}
        </>
    )
}
