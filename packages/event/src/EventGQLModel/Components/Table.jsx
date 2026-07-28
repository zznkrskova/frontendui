import { Table as BaseTable, CellName, } from "../../../../_template/src/Base/Components/Table"
import { CreateButton } from "../Mutations/Create"
import { Link } from "./Link"

// Funkce, která upraví data před zobrazením v tabulce.
// Z původních objektů ponechá pouze sloupce,
// které chceme v tabulce zobrazit
const filterDataColumns = (data, columns) => {

    // Pokud data nejsou pole, není co filtrovat.
    // Vrátíme je beze změny
    if (!data || !Array.isArray(data)) return data

    // Projdeme všechny řádky tabulky
    return data.map(row => {

        // Nový objekt obsahující pouze vybrané atributy
        const filtered = {}

        // ID ponecháváme vždy,
        // protože se často používá pro odkazy nebo identifikaci řádku
        if (row?.id !== undefined) filtered.id = row.id
        if (row?.__typename) filtered.__typename = row.__typename

        // Přidáme pouze sloupce,
        // které jsou uvedené v seznamu columns
        columns.forEach(col => {

            // Kontrola, že hodnota skutečně existuje
            if (row?.[col] !== undefined) filtered[col] = row[col]
        })

        return filtered
    })
}

// Převod data do českého formátu
const formatDateValue = (value) => {
    if (!value) return ""

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value

    return new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

// Komponenta pro vykreslení buňky s datem
const CellDate = ({ row, name }) => {

    // Získáme hodnotu konkrétního sloupce.
    // Pokud neexistuje, použijeme prázdný text
    const value = row?.[name] ?? ""
    return <td key={name}>{formatDateValue(value)}</td>
}

export const Table = ({ data }) => {

    // Sloupce, které chceme v tabulce zobrazit
    const columnsToShow = ['name', 'nameEn', 'startdate', 'enddate', 'description', 'facility', 'type']

    // Data ořízneme pouze na požadované sloupce
    const filteredData = filterDataColumns(data, columnsToShow)

    // Definice vzhledu a chování jednotlivých sloupců tabulky.
    const table_def = {
        name: {
            label: "Název události",
            component: CellName,
        },
        nameEn: {
            label: "Name",
            component: CellName,
        },
        startdate: {
            label: "Začátek",
            component: CellDate,
        },
        enddate: {
            label: "Konec",
            component: CellDate,
        },
        description: {
            label: "Popis",
            component: CellName,
        },

        // Prostor, kde se událost koná.
        // Pokud existuje celý objekt facility,
        // zobrazíme odkaz.
        // Jinak pouze jeho ID
        facility: {
            label: "Prostor",
            component: ({ row, name }) => (
                <td key={name}>
                    {row?.facility ? <Link item={row.facility} /> : (row?.facilityId || "")}
                </td>
            ),
        },

        // Typ události.
        // Stejná logika jako u facility
        type: {
            label: "Typ",
            component: ({ row, name }) => (
                <td key={name}>
                    {row?.type ? (
                        <Link item={row.type} />
                    ) : (
                        (row?.typeId || "")
                    )}
                </td>
            ),
        }
    }

    return (
        <>
            {/* Tlačítko pro vytvoření nové události */}
            <div className="d-flex justify-content-start my-4">
                <CreateButton className="btn btn-primary">Vytvořit novou událost</CreateButton>
            </div>
            <BaseTable data={filteredData} table_def={table_def} />
        </>
    )
}