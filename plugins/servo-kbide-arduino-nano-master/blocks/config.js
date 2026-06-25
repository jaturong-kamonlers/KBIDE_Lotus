module.exports = [
	{
		name : "Servo",
		blocks : [
			{
                xml:
                   `<block type="arduino_nano_servo_attach">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            },
            'arduino_nano_servo_detach',
            {
                xml:
                   `<block type="arduino_nano_servo_write">
                        <value name="degree">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            },
            {
                xml:
                   `<block type="arduino_nano_servo_write_micros">
                        <value name="degree">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
            },
            'arduino_nano_servo_read',
            'arduino_nano_servo_read_micros',

		]
	}	
];