module.exports = [
	{
		name : "LotusMPU6050",
		blocks : [
			"mpu6050_setup",
			"mpu6050_update",
			"mpu6050_read_accel",
			"mpu6050_read_gyro",
			"mpu6050_read_temp",
			"mpu6050_read_angle",
			"mpu6050_set_accel_range",
			"mpu6050_set_gyro_range",
			"mpu6050_connected"
		]
	}
];
