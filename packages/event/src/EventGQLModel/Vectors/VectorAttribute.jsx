import { CardCapsule } from "../Components/CardCapsule"
import { Table } from "../Components/Table"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"

export const VectorAttributeFactory = (attribute_name) => ({ item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <Row key={attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <CardCapsule item={item}>
                    <Table data={attribute_value} />
                </CardCapsule>
            </Col>
        </Row>
    )
}

export const VectorAttribute_ = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <Row key={attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <CardCapsule item={item}>
                    <Table data={attribute_value} />
                </CardCapsule>
            </Col>
        </Row>
    )
}

export const VectorAttribute = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <CardCapsule item={item} title={attribute_name+'[]'}>
            <Table data={attribute_value} />
        </CardCapsule>
    )
}


export const MediumCardVectors = ({ item }) => {
    return (
        <CardCapsule item={item} title="Vektorové atributy">

            {/* Projdeme všechny atributy objektu item.
                Object.entries() převede objekt na pole dvojic:
                [
                   ["název_atributu", hodnota],
                   ["jiný_atribut", hodnota]
                ]
            */}
            {Object.entries(item).map(([attribute_name, attribute_value]) => {

                // Kontrolujeme, jestli je hodnota atributu pole.
                // Pole zde představuje vektorový atribut
                if (Array.isArray(attribute_value)) {

                    // Pokud atribut obsahuje pole,
                    // zobrazíme komponentu pro jeho vykreslení
                    return <VectorAttribute key={attribute_name} attribute_name={attribute_name} item={item} />
                } else {
                    // Pokud atribut není pole,
                    // ignorujeme ho a nic nevykreslíme
                    return null
                }
            })}
        </CardCapsule>
    )
}
