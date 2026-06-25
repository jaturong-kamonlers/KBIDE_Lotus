// LotusDueBot toolbox
const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = {
    blocks : [
        {
            name : 'TFT LCD',
            color : '200',
            icon: `file:///${dirIcon}/static/icons/tft.png`,
            blocks : [
                {
                    xml :
                    `<block type="tft_clear">
                        <value name="C">
                            <shadow type="tft_color"><field name="C">COLOR_BLACK</field></shadow>
                        </value>
                    </block>`
                },
                'tft_color',
                'tft_set_rotation',
                {
                    xml :
                    `<block type="tft_print_at">
                        <field name="TXT">Hello world!</field>
                        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_print_number_at">
                        <value name="N"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_draw_pixel">
                        <value name="X"><shadow type="math_number"><field name="NUM">64</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_draw_line">
                        <value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                        <value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                        <value name="X1"><shadow type="math_number"><field name="NUM">127</field></shadow></value>
                        <value name="Y1"><shadow type="math_number"><field name="NUM">159</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_draw_rect">
                        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="W"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                        <value name="H"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_draw_circle">
                        <value name="X"><shadow type="math_number"><field name="NUM">64</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                        <value name="R"><shadow type="math_number"><field name="NUM">20</field></shadow></value>
                        <value name="C"><shadow type="tft_color"><field name="C">COLOR_WHITE</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="tft_draw_image">
                        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                        <value name="Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                    </block>`
                },
            ]
        },
        {
            name : 'Motor & Servo',
            color : '230',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'sw1_press',
                {
                    xml :
                    `<block type="Lotus_servo">
                        <value name="angle"><shadow type="math_number"><field name="NUM">90</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="Lotus_motor">
                        <value name="speed1"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                        <value name="speed2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="Lotus_motor_4ch">
                        <value name="speedL"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                        <value name="speedR"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="Lotus_motor_2ch">
                        <value name="speedL"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                        <value name="speedR"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="Lotus_motor_single">
                        <value name="speed"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="Lotus_all_motor">
                        <value name="speed"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                'Lotus_motor_stop',
                'nano_beep',
                {
                    xml :
                    `<block type="nano_beep_custom">
                        <value name="FREQUENCY"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>
                        <value name="DURATION"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>
                    </block>`
                },
                'knob_read',
                {
                    xml :
                    `<block type="map_func">
                        <value name="V1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                    </block>`
                },
            ]
        },
        {
            name : 'GPIO',
            color : '20',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'analog_sensor',
                'gpio_digital',
                'gpio_analog',
                'gpio_analog_pin',
                'gpio_pwm_pin',
                'gpio_i2c',
                'gpio_spi',
            ]
        },
        {
            name : 'Encoder x4',
            color : '290',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'encoder_init',
                'encoder_read',
                'encoder_reset',
                {
                    xml :
                    `<block type="encoder_drive">
                        <value name="TICKS"><shadow type="math_number"><field name="NUM">400</field></shadow></value>
                        <value name="SPEED"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="encoder_spin">
                        <value name="TICKS"><shadow type="math_number"><field name="NUM">200</field></shadow></value>
                        <value name="SPEED"><shadow type="math_number"><field name="NUM">40</field></shadow></value>
                    </block>`
                },
            ]
        },
        {
            // IMPORTANT: do NOT name this "Serial" -- the platform also has a "Serial"
            // group, and KBIDE's mergeBlockConfig() will try to merge them and produce
            // a malformed category that breaks rendering of every later group.
            name : 'Lotus Serial',
            color : '160',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'serial_begin',
                'serial_print',
                {
                    xml :
                    `<block type="serial_print_number">
                        <value name="N"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                    </block>`
                },
            ]
        },
        {
            name : 'I2C',
            color : '180',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'i2c_begin',
                {
                    xml :
                    `<block type="i2c_write_byte">
                        <value name="ADDR"><shadow type="math_number"><field name="NUM">104</field></shadow></value>
                        <value name="REG"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                        <value name="VAL"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                    </block>`
                },
                {
                    xml :
                    `<block type="i2c_read_byte">
                        <value name="ADDR"><shadow type="math_number"><field name="NUM">104</field></shadow></value>
                        <value name="REG"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                    </block>`
                },
            ]
        },
        {
            name : 'SD card',
            color : '140',
            icon: `file:///${dirIcon}/static/icons/module.png`,
            blocks : [
                'sd_begin',
                'sd_write_line',
            ]
        },
    ],
};
