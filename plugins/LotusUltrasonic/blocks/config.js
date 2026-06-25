module.exports = [{
    name: "LotusUltrasonic",
    blocks: [
        "ultrasonic_setup",
        "ultrasonic_read_distance_cm",
        "ultrasonic_read_distance_mm",
        {
            xml:
                `<block type="ultrasonic_detected">
                    <value name="DIST">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>`
        }
    ]
}];
