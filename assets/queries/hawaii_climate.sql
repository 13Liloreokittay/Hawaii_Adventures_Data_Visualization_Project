DROP TABLE climate

CREATE TABLE climate (
	island VARCHAR(30),
	weather_type VARCHAR(45),
	data_year INTEGER,
	jan DECIMAL,
	feb DECIMAL,
	march DECIMAL,
	april DECIMAL,
	may DECIMAL,
	june DECIMAL,
	july DECIMAL,
	aug DECIMAL,
	sep DECIMAL, 
	oct DECIMAL, 
	nov DECIMAL,
	december DECIMAL,
	annual DECIMAL

);
SELECT * FROM climate