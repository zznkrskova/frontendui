import { children } from "happy-dom/lib/PropertySymbol"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { Link } from "./Link"
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
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */
// export const MediumContent = ({ item, children}) => {
//     return (
//         <MediumContent_ item={item}>
//             {children}
//         </MediumContent_>
//     )
// }

// export const MediumContent_ = ({ item, children }) => {
//     return (
//         <>
//             {Object.entries(item).map(([attribute_name, attribute_value]) => {
//                 // if (attribute_name !== "id") return null
//                 if (Array.isArray(attribute_value)) return null
//                 if (typeof attribute_value === "object" && attribute_value !== null) return null
//                 let attribute_value_result = attribute_value
//                 // let attribute_value_result = attribute_value
//                 if (Array.isArray(attribute_value))
//                     // attribute_value_result = <CardCapsule><Table data={attribute_value} /></CardCapsule>
//                     return null
//                 else if (typeof attribute_value === "object" && attribute_value !== null)
//                     // attribute_value_result = <MediumCard item={attribute_value} />
//                     return null
//                 else if (attribute_name === "__typename") {
//                     /*attribute_value_result = <Link item={attribute_value} />*/
//                     // console.log("else1", attribute_name, attribute_value)
//                 }
//                 if (attribute_name === "id")
//                     attribute_value_result = <Link item={item}>{item?.id || "Data error"}</Link>
//                 if (attribute_name === "name")
//                     attribute_value_result = <Link item={item} />
//                 // else return null
//                 if (attribute_value)
//                     return (
//                         <Row key={attribute_name}>
//                             <Col className="col-4"><b>{attribute_name}</b></Col>
//                             <Col className="col-8">{attribute_value_result}</Col>
//                         </Row>
//                     )
//                 else return null
//             })}
//             {Object.entries(item).map(([attribute_name, attribute_value]) => {
//                 if (attribute_value !== null) return null
//                 let attribute_value_result = JSON.stringify(attribute_value)
//                 if (Array.isArray(attribute_value))
//                     // attribute_value_result = <CardCapsule><Table data={attribute_value} /></CardCapsule>
//                     return null
//                 else if (typeof attribute_value === "object" && attribute_value !== null)
//                     // attribute_value_result = <MediumCard item={attribute_value} />
//                     return null
//                 else if (attribute_name === "__typename") {
//                     /*attribute_value_result = <Link item={attribute_value} />*/
//                     console.log("else2", attribute_name, attribute_value)
//                 }
//                 if (attribute_value)
//                     return null
//                 else
//                     return (
//                         <Row key={attribute_name}>
//                             <Col className="col-4"><b>{attribute_name}</b></Col>
//                             <Col className="col-8">{attribute_value_result}</Col>
//                         </Row>
//                     )
//             })}
//             {children}
//         </>
//     )
// }

import { MediumContent as MediumContent_ } from "../../../../_template/src/Base/Components/MediumContent"
import { Attribute, formatDateTime } from "../../../../_template/src/Base/Components"

// Funkce pro převod data do českého formátu (dd.mm.rrrr)
const formatDateOnly = (value) => {
    if (!value) return "-"

    let date = value

    // Pokud hodnota není objekt typu Date,
    // pokusíme se ji převést
    if (!(date instanceof Date)) {

        // Převedeme hodnotu na text.
        const text = String(value)

        // Pokud text neobsahuje čas (T),
        // doplníme půlnoc, aby šel správně vytvořit objekt Date
        const normalized = text.includes("T") ? text : `${text}T00:00:00`
        date = new Date(normalized)
    }

    // Pokud se datum nepodařilo vytvořit,
    // zkusíme jej ručně naformátovat
    if (Number.isNaN(date.getTime())) {

        // Vezmeme pouze část s datem (bez času)
        const datePart = String(value).split("T")[0]
        const parts = datePart.split("-")

        // Pokud datum nemá správný tvar YYYY-MM-DD,
        // vrátíme původní hodnotu
        if (parts.length !== 3) return datePart || "-"
        const [year, month, day] = parts

        // Vrátíme datum ve formátu DD.MM.RRRR
        return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`
    }

    // Pokud se datum podařilo vytvořit,
    // použijeme české formátování
    return new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
}

export const MediumContent = ({ item, children }) => {
    return (
        <>
        <Attribute label="Id">
            <Link item={item}>
                {item?.id}
            </Link>
        </Attribute>
        <Attribute label="Začátek">
            {formatDateTime(item?.startdate)}
        </Attribute>
        <Attribute label="Konec">
            {formatDateTime(item?.enddate)}
        </Attribute>
        <hr/>
        <Attribute label="Vytvořeno uživatelem">
            {
                item?.createdbyId ? (
                    <Link item={{id : item.createdbyId}} LinkURI="/ug/UserGQLModel/view/">
                        {item.createdby?.fullname}
                    </Link>
                ) : (
                    "-"
                )
            }
        </Attribute>
        <hr/>
        <Attribute label="Změněno">
            {formatDateTime(item?.lastchange)}
        </Attribute>
        <Attribute label="uživatelem">
            {
                item?.createdbyId ? (
                        <Link item={{id : item.changedbyId}} LinkURI="/ug/UserGQLModel/view/">
                            {item.changedby?.fullname}
                        </Link>
                    ) : (
                        "-"
                    )
            }
        </Attribute>

        <hr/>
        <Attribute label="Nadřazená událost">
            {
                item?.mastereventId ? (
                    <Link item={{id : item.mastereventId}}>
                        {item.mastereventId}
                    </Link>
                ) : (
                    "-"
                )
                
            }
        </Attribute>
        
        <Attribute label="Popis">
            {item?.description || "-"}
        </Attribute>

        <Attribute label="RBAC role">
            {
                item?.rbacobject?.currentUserRoles?.length > 0 ? (

                    // Projdeme všechny role a každou zobrazíme na samostatném řádku
                    item.rbacobject.currentUserRoles.map((role, index) => (
                        <div key={role.id || index} className="mb-1">
                            {role.roletype?.name}
                        </div>
                    ))
                ) : (
                    "Žádná role"
                )
            }
        </Attribute>

        <hr/>
        <Attribute label="Pozvaní účastníci">
            {
                item?.userInvitations && item.userInvitations.length > 0 ? (

                    // Projdeme všechny pozvánky
                    item.userInvitations.map((inv) => (
                        <div key={inv.id} className="mb-1">

                            {/* Pokud je dostupný objekt uživatele,
                                zobrazíme jeho jméno jako odkaz. */}
                            {inv.user ? (
                                <Link item={inv.user} LinkURI="/ug/UserGQLModel/view/">{inv.user.fullname || inv.user.id}</Link>
                            ) : (
                                // Jinak zobrazíme alespoň jeho ID.
                                inv.userId || "-"
                            )}
                            
                            {/* Pokud existuje stav pozvánky,
                                zobrazíme jej za jménem. */}
                            {inv.state?.name ? (<span className="text-muted"> — {inv.state.name}</span>) : null}
                        </div>
                    ))
                ) : (
                    "Žádní pozvaní"
                )
            }
        </Attribute>

        <Attribute label="Typ události">
            {item?.type?.name || "-"}
        </Attribute>

        <hr/>
        <Attribute label="ID události">
            {item?.id}
        </Attribute>

        {/*
        <MediumContent_ item = {item}>
            Byl jsem zde, Fantomas.
            {children}
        </MediumContent_>
        */}
        </>
    )
}