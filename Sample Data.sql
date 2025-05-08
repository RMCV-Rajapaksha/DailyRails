use dailyrails;


-- --  Station table
-- -- Main Line Stations
-- INSERT INTO STATION (StationID, StationName, StationAddress, StationLine, ContactNumber, createdAt, updatedAt) VALUES
-- ('ST001', 'Colombo Fort', 'Olcott Mawatha, Colombo 11', 'Main Line', '011-2421281', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST002', 'Maradana', 'Maradana Road, Colombo 10', 'Main Line', '011-2695772', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST003', 'Kandy', 'Railway Station Road, Kandy', 'Main Line', '081-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST004', 'Peradeniya', 'Station Road, Peradeniya', 'Main Line', '081-2388271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST005', 'Gampola', 'Station Road, Gampola', 'Main Line', '081-2352271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- -- Coastal Line Stations
-- INSERT INTO STATION (StationID, StationName, StationAddress, StationLine, ContactNumber, createdAt, updatedAt) VALUES
-- ('ST006', 'Panadura', 'Station Road, Panadura', 'Coastal Line', '038-2232271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST007', 'Kalutara South', 'Station Road, Kalutara', 'Coastal Line', '034-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST008', 'Galle', 'Station Road, Galle', 'Coastal Line', '091-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST009', 'Matara', 'Station Road, Matara', 'Coastal Line', '041-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST010', 'Beliatta', 'Station Road, Beliatta', 'Coastal Line', '047-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- -- Northern Line Stations
-- INSERT INTO STATION (StationID, StationName, StationAddress, StationLine, ContactNumber, createdAt, updatedAt) VALUES
-- ('ST011', 'Kurunegala', 'Station Road, Kurunegala', 'Northern Line', '037-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST012', 'Anuradhapura', 'Station Road, Anuradhapura', 'Northern Line', '025-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST013', 'Vavuniya', 'Station Road, Vavuniya', 'Northern Line', '024-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST014', 'Jaffna', 'Station Road, Jaffna', 'Northern Line', '021-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST015', 'Kankesanthurai', 'Station Road, Kankesanthurai', 'Northern Line', '021-2232271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- -- Upcountry Line Stations
-- INSERT INTO STATION (StationID, StationName, StationAddress, StationLine, ContactNumber, createdAt, updatedAt) VALUES
-- ('ST016', 'Nanuoya', 'Station Road, Nanuoya', 'Upcountry Line', '052-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST017', 'Hatton', 'Station Road, Hatton', 'Upcountry Line', '051-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST018', 'Haputale', 'Station Road, Haputale', 'Upcountry Line', '057-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST019', 'Ella', 'Station Road, Ella', 'Upcountry Line', '057-2232271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('ST020', 'Badulla', 'Station Road, Badulla', 'Upcountry Line', '055-2222271', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- -- Populate TRAINS table
-- INSERT INTO TRAINS (TrainID, Name, StartStations, EndStations, StartTime, EndTime, createdAt, updatedAt) VALUES
-- -- Main Line Trains
-- ('TR001', 'Udarata Menike', 'ST001', 'ST003', '06:00:00', '09:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR002', 'Podi Menike', 'ST001', 'ST003', '09:30:00', '13:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR003', 'Night Mail', 'ST003', 'ST001', '20:00:00', '23:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Coastal Line Trains
-- ('TR004', 'Galu Kumari', 'ST001', 'ST008', '06:30:00', '09:45:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR005', 'Ruhunu Kumari', 'ST001', 'ST009', '07:00:00', '11:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR006', 'Sagarika', 'ST008', 'ST001', '15:30:00', '18:45:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Northern Line Trains
-- ('TR007', 'Yal Devi', 'ST001', 'ST014', '06:15:00', '12:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR008', 'Uttara Devi', 'ST014', 'ST001', '13:30:00', '19:45:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('TR009', 'Rajarata Rejini', 'ST001', 'ST012', '08:30:00', '13:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- -- Populate STOPPING_POINTS table
-- INSERT INTO STOPPING_POINTS (PointID, TrainID, StationID, ArrivalTime, DepartureTime, createdAt, updatedAt) VALUES
-- -- Udarata Menike (TR001) stops
-- ('SPTR00101', 'TR001', 'ST001', '06:00:00', '06:15:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00102', 'TR001', 'ST002', '06:30:00', '06:35:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00103', 'TR001', 'ST005', '08:15:00', '08:20:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00104', 'TR001', 'ST003', '09:25:00', '09:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Galu Kumari (TR004) stops
-- ('SPTR00401', 'TR004', 'ST001', '06:30:00', '06:45:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00402', 'TR004', 'ST006', '07:30:00', '07:35:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00403', 'TR004', 'ST007', '08:15:00', '08:20:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00404', 'TR004', 'ST008', '09:40:00', '09:45:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Yal Devi (TR007) stops
-- ('SPTR00701', 'TR007', 'ST001', '06:15:00', '06:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00702', 'TR007', 'ST011', '08:30:00', '08:35:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00703', 'TR007', 'ST012', '09:45:00', '09:50:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00704', 'TR007', 'ST013', '11:00:00', '11:05:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('SPTR00705', 'TR007', 'ST014', '12:25:00', '12:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);




-- -- Main Line Journeys
-- INSERT INTO JOURNEY (JourneyID, RouteID, Price, StartPoint, EndPoint, createdAt, updatedAt) VALUES
-- -- Colombo - Kandy Route
-- ('JN0001', 101, 400, 'ST001', 'ST003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0002', 102, 400, 'ST003', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Colombo - Badulla Route
-- ('JN0003', 103, 1000, 'ST001', 'ST020', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0004', 104, 1000, 'ST020', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Kandy - Badulla Route
-- ('JN0005', 105, 600, 'ST003', 'ST020', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0006', 106, 600, 'ST020', 'ST003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Coastal Line Journeys
-- -- Colombo - Galle Route
-- ('JN0007', 201, 350, 'ST001', 'ST008', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0008', 202, 350, 'ST008', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Colombo - Matara Route
-- ('JN0009', 203, 500, 'ST001', 'ST009', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0010', 204, 500, 'ST009', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Galle - Matara Route
-- ('JN0011', 205, 150, 'ST008', 'ST009', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0012', 206, 150, 'ST009', 'ST008', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- -- Northern Line Journeys
-- -- Colombo - Anuradhapura Route
-- ('JN0013', 301, 600, 'ST001', 'ST012', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0014', 302, 600, 'ST012', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Colombo - Jaffna Route
-- ('JN0015', 303, 1200, 'ST001', 'ST014', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0016', 304, 1200, 'ST014', 'ST001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- -- Anuradhapura - Jaffna Route
-- ('JN0017', 305, 600, 'ST012', 'ST014', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('JN0018', 306, 600, 'ST014', 'ST012', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);



-- -- Add these to your Sample Data.sql file

-- -- Populate PASSENGER table
-- INSERT INTO PASSENGER (PassengerNIC, FirstName, LastName, PhoneNumber, Email, Gender, DateOfBirth, createdAt, updatedAt) VALUES
-- ('982761234V', 'Kasun', 'Perera', '0712345678', 'kasun.perera@gmail.com', 'Male', '1998-10-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('956782341V', 'Malini', 'Silva', '0723456789', 'malini.silva@gmail.com', 'Female', '1995-03-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('906543217V', 'Nuwan', 'Fernando', '0734567890', 'nuwan.fernando@gmail.com', 'Male', '1990-07-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('887654321V', 'Chamari', 'Gunasekara', '0745678901', 'chamari.g@gmail.com', 'Female', '1988-12-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('927865439V', 'Anjana', 'Wijethilaka', '0756789012', 'anjana.w@gmail.com', 'Male', '1992-05-28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('967654328V', 'Dilini', 'Bandara', '0767890123', 'dilini.b@gmail.com', 'Female', '1996-11-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('851234567V', 'Rohan', 'Gunawardena', '0778901234', 'rohan.g@gmail.com', 'Male', '1985-02-14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('937812345V', 'Thilini', 'Rathnayake', '0789012345', 'thilini.r@gmail.com', 'Female', '1993-09-17', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('947865432V', 'Dinesh', 'Jayasinghe', '0790123456', 'dinesh.j@gmail.com', 'Male', '1994-04-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('917654329V', 'Anusha', 'Karunaratne', '0701234567', 'anusha.k@gmail.com', 'Female', '1991-08-21', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
