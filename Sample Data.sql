use dailyrails;

-- Populate Stations with Sri Lankan railway stations
INSERT INTO STATION (StationName, StationID, StationAddress, StationLine, ContactNumber, createdAt, updatedAt) VALUES
('Colombo Fort', 'CMB001', 'Olcott Mawatha, Colombo 01', 'Main Line', '0112432121', NOW(), NOW()),
('Kandy', 'KDY002', 'Railway Station Road, Kandy', 'Main Line', '0812222271', NOW(), NOW()),
('Galle', 'GLE003', 'Railway Station Road, Galle', 'Coastal Line', '0912245245', NOW(), NOW()),
('Badulla', 'BDL004', 'Railway Station Road, Badulla', 'Main Line', '0552222525', NOW(), NOW()),
('Anuradhapura', 'ANU005', 'Railway Station Road, Anuradhapura', 'Northern Line', '0252222424', NOW(), NOW()),
('Matara', 'MTR006', 'Railway Station Road, Matara', 'Coastal Line', '0412222828', NOW(), NOW()),
('Jaffna', 'JFN007', 'Railway Station Road, Jaffna', 'Northern Line', '0212222929', NOW(), NOW()),
('Polonnaruwa', 'PLN008', 'Railway Station Road, Polonnaruwa', 'Northern Line', '0272222626', NOW(), NOW()),
('Ella', 'ELL009', 'Railway Station Road, Ella', 'Main Line', '0572223030', NOW(), NOW()),
('Nanu Oya', 'NNO010', 'Nanu Oya Station Road, Nuwara Eliya', 'Main Line', '0522222727', NOW(), NOW());

-- Populate Trains with Sri Lankan trains
INSERT INTO TRAINS (TrainID, Name, StartStations, EndStations, StartTime, EndTime, createdAt, updatedAt) VALUES
('TR001', 'Udarata Menike', 'CMB001', 'BDL004', '05:55:00', '15:30:00', NOW(), NOW()),
('TR002', 'Podi Menike', 'CMB001', 'BDL004', '08:30:00', '18:05:00', NOW(), NOW()),
('TR003', 'Ruhunu Kumari', 'CMB001', 'MTR006', '06:30:00', '12:55:00', NOW(), NOW()),
('TR004', 'Yal Devi', 'CMB001', 'JFN007', '05:45:00', '16:00:00', NOW(), NOW()),
('TR005', 'Rajarata Rajina', 'CMB001', 'ANU005', '06:15:00', '11:05:00', NOW(), NOW()),
('TR006', 'Night Mail', 'CMB001', 'KDY002', '20:00:00', '04:30:00', NOW(), NOW()),
('TR007', 'Sagarika', 'CMB001', 'GLE003', '07:00:00', '11:30:00', NOW(), NOW()),
('TR008', 'Galu Kumari', 'CMB001', 'GLE003', '08:30:00', '13:00:00', NOW(), NOW()),
('TR009', 'Ella Odyssey', 'CMB001', 'ELL009', '05:55:00', '14:25:00', NOW(), NOW()),
('TR010', 'Udaya Devi', 'CMB001', 'NNO010', '08:40:00', '16:45:00', NOW(), NOW());

-- Populate Stopping Points
INSERT INTO STOPPING_POINTS (PointID, TrainID, StationID, ArrivalTime, DepartureTime, createdAt, updatedAt) VALUES
-- Udarata Menike (TR001) stops
('SP001', 'TR001', 'CMB001', '05:55:00', '06:00:00', NOW(), NOW()),
('SP002', 'TR001', 'KDY002', '10:20:00', '10:30:00', NOW(), NOW()),
('SP003', 'TR001', 'ELL009', '13:45:00', '13:55:00', NOW(), NOW()),
('SP004', 'TR001', 'BDL004', '15:30:00', '15:40:00', NOW(), NOW()),

-- Podi Menike (TR002) stops
('SP005', 'TR002', 'CMB001', '08:30:00', '08:35:00', NOW(), NOW()),
('SP006', 'TR002', 'KDY002', '13:10:00', '13:20:00', NOW(), NOW()),
('SP007', 'TR002', 'NNO010', '15:30:00', '15:40:00', NOW(), NOW()),
('SP008', 'TR002', 'BDL004', '18:05:00', '18:15:00', NOW(), NOW()),

-- Ruhunu Kumari (TR003) stops
('SP009', 'TR003', 'CMB001', '06:30:00', '06:35:00', NOW(), NOW()),
('SP010', 'TR003', 'GLE003', '10:30:00', '10:40:00', NOW(), NOW()),
('SP011', 'TR003', 'MTR006', '12:55:00', '13:05:00', NOW(), NOW()),

-- Yal Devi (TR004) stops
('SP012', 'TR004', 'CMB001', '05:45:00', '05:50:00', NOW(), NOW()),
('SP013', 'TR004', 'ANU005', '10:30:00', '10:40:00', NOW(), NOW()),
('SP014', 'TR004', 'PLN008', '12:35:00', '12:45:00', NOW(), NOW()),
('SP015', 'TR004', 'JFN007', '16:00:00', '16:10:00', NOW(), NOW());

-- Populate Journeys (connections between stations with pricing)
INSERT INTO JOURNEY (JourneyID, RouteID, Price, StartPoint, EndPoint, createdAt, updatedAt) VALUES
('JRN001', 1, 1200, 'CMB001', 'KDY002', NOW(), NOW()),
('JRN002', 2, 1800, 'CMB001', 'BDL004', NOW(), NOW()),
('JRN003', 3, 800, 'CMB001', 'GLE003', NOW(), NOW()),
('JRN004', 4, 1000, 'CMB001', 'MTR006', NOW(), NOW()),
('JRN005', 5, 1500, 'CMB001', 'JFN007', NOW(), NOW()),
('JRN006', 6, 1100, 'CMB001', 'ANU005', NOW(), NOW()),
('JRN007', 7, 950, 'CMB001', 'PLN008', NOW(), NOW()),
('JRN008', 8, 1400, 'CMB001', 'ELL009', NOW(), NOW()),
('JRN009', 9, 1300, 'CMB001', 'NNO010', NOW(), NOW()),
('JRN010', 10, 600, 'KDY002', 'BDL004', NOW(), NOW()),
('JRN011', 11, 700, 'KDY002', 'ELL009', NOW(), NOW()),
('JRN012', 12, 500, 'GLE003', 'MTR006', NOW(), NOW());

-- Populate Passengers
INSERT INTO PASSENGER (PassengerNIC, FirstName, LastName, PhoneNumber, Email, Gender, DateOfBirth, createdAt, updatedAt) VALUES
('985623741V', 'Amith', 'Perera', '0771234567', 'amith@gmail.com', 'Male', '1998-03-15', NOW(), NOW()),
('967456321V', 'Kumari', 'Silva', '0712345678', 'kumari@gmail.com', 'Female', '1996-07-22', NOW(), NOW()),
('913456789V', 'Nimal', 'Fernando', '0763456789', 'nimal@gmail.com', 'Male', '1991-11-05', NOW(), NOW()),
('945678123V', 'Priyanka', 'Jayawardena', '0724567890', 'priyanka@gmail.com', 'Female', '1994-09-14', NOW(), NOW()),
('956789123V', 'Thilak', 'Gunaratne', '0775678901', 'thilak@gmail.com', 'Male', '1995-05-30', NOW(), NOW()),
('932345678V', 'Samanthi', 'Bandara', '0716789012', 'samanthi@gmail.com', 'Female', '1993-08-17', NOW(), NOW()),
('902345678V', 'Chamara', 'Weerasinghe', '0767890123', 'chamara@gmail.com', 'Male', '1990-12-24', NOW(), NOW()),
('978901234V', 'Dilani', 'Ranaweera', '0728901234', 'dilani@gmail.com', 'Female', '1997-04-08', NOW(), NOW()),
('969012345V', 'Sunil', 'Seneviratne', '0779012345', 'sunil@gmail.com', 'Male', '1996-02-11', NOW(), NOW()),
('950123456V', 'Malini', 'Karunaratne', '0710123456', 'malini@gmail.com', 'Female', '1995-10-19', NOW(), NOW());

-- Populate Bookings
INSERT INTO BOOKING (BookingID, TrainID, JourneyID, PassengerNIC, Class, NoOfSeats, Date, Time, createdAt, updatedAt) VALUES
('BK00001', 'TR001', 'JRN001', '985623741V', 1, 2, '2023-06-15', '05:55:00', NOW(), NOW()),
('BK00002', 'TR003', 'JRN004', '967456321V', 2, 1, '2023-06-16', '06:30:00', NOW(), NOW()),
('BK00003', 'TR004', 'JRN005', '913456789V', 1, 3, '2023-06-17', '05:45:00', NOW(), NOW()),
('BK00004', 'TR002', 'JRN002', '945678123V', 2, 2, '2023-06-18', '08:30:00', NOW(), NOW()),
('BK00005', 'TR007', 'JRN003', '956789123V', 1, 1, '2023-06-19', '07:00:00', NOW(), NOW()),
('BK00006', 'TR005', 'JRN006', '932345678V', 2, 2, '2023-06-20', '06:15:00', NOW(), NOW()),
('BK00007', 'TR001', 'JRN008', '902345678V', 1, 4, '2023-06-21', '05:55:00', NOW(), NOW()),
('BK00008', 'TR010', 'JRN009', '978901234V', 2, 2, '2023-06-22', '08:40:00', NOW(), NOW()),
('BK00009', 'TR002', 'JRN010', '969012345V', 1, 1, '2023-06-23', '08:30:00', NOW(), NOW()),
('BK00010', 'TR001', 'JRN011', '950123456V', 2, 3, '2023-06-24', '05:55:00', NOW(), NOW());

-- Populate Booking Seats
INSERT INTO BOOKING_SEATS (TicketID, BookingID, SeatNumber, createdAt, updatedAt) VALUES
('TKT00001', 'BK00001', 'A1', NOW(), NOW()),
('TKT00002', 'BK00001', 'A2', NOW(), NOW()),
('TKT00003', 'BK00002', 'B5', NOW(), NOW()),
('TKT00004', 'BK00003', 'A3', NOW(), NOW()),
('TKT00005', 'BK00003', 'A4', NOW(), NOW()),
('TKT00006', 'BK00003', 'A5', NOW(), NOW()),
('TKT00007', 'BK00004', 'C1', NOW(), NOW()),
('TKT00008', 'BK00004', 'C2', NOW(), NOW()),
('TKT00009', 'BK00005', 'D3', NOW(), NOW()),
('TKT00010', 'BK00006', 'B1', NOW(), NOW()),
('TKT00011', 'BK00006', 'B2', NOW(), NOW()),
('TKT00012', 'BK00007', 'A6', NOW(), NOW()),
('TKT00013', 'BK00007', 'A7', NOW(), NOW()),
('TKT00014', 'BK00007', 'A8', NOW(), NOW()),
('TKT00015', 'BK00007', 'A9', NOW(), NOW()),
('TKT00016', 'BK00008', 'C3', NOW(), NOW()),
('TKT00017', 'BK00008', 'C4', NOW(), NOW()),
('TKT00018', 'BK00009', 'D1', NOW(), NOW()),
('TKT00019', 'BK00010', 'B3', NOW(), NOW()),
('TKT00020', 'BK00010', 'B4', NOW(), NOW()),
('TKT00021', 'BK00010', 'B5', NOW(), NOW());

-- Populate Payments
INSERT INTO PAYMENT (PaymentID, BookingID, Amount, Status, createdAt, updatedAt) VALUES
('PMT00001', 'BK00001', 2400, 'Completed', NOW(), NOW()),
('PMT00002', 'BK00002', 800, 'Completed', NOW(), NOW()),
('PMT00003', 'BK00003', 4500, 'Completed', NOW(), NOW()),
('PMT00004', 'BK00004', 3600, 'Completed', NOW(), NOW()),
('PMT00005', 'BK00005', 800, 'Completed', NOW(), NOW()),
('PMT00006', 'BK00006', 2200, 'Completed', NOW(), NOW()),
('PMT00007', 'BK00007', 5600, 'Completed', NOW(), NOW()),
('PMT00008', 'BK00008', 2600, 'Pending', NOW(), NOW()),
('PMT00009', 'BK00009', 600, 'Completed', NOW(), NOW()),
('PMT00010', 'BK00010', 2100, 'Completed', NOW(), NOW());

-- Populate Admin Users
INSERT INTO ADMIN (EmployeeID, Name, Email, Password, JobTitle, createdAt, updatedAt) VALUES
('EMP001', 'Dinesh Rajapaksa', 'dinesh@dailyrails.lk', '$2a$10$XdVw1Qm4Vy.XzRl3nJJRg.1E5NzUPj.1Rd7Svbm5qWTgx4gBFv4gK', 'System Administrator', NOW(), NOW()),
('EMP002', 'Hasini Wickremasinghe', 'hasini@dailyrails.lk', '$2a$10$5cDQzmQh0OwJZt.tz8cFluRf0TfGLMI7KvZNCjQFWF2I3j/CmV.Ru', 'Station Master', NOW(), NOW()),
('EMP003', 'Rohan De Silva', 'rohan@dailyrails.lk', '$2a$10$6hR9qJKP7qDxgW3gdf/9se0TFb6TGn6m5DSztYGhBJ9BdX/Onlx7i', 'Booking Manager', NOW(), NOW());

-- Populate Regular Users
INSERT INTO USER (UserID, Name, Email, Password, createdAt, updatedAt) VALUES
('USR001', 'Amith Perera', 'amith@gmail.com', '$2a$10$XdVw1Qm4Vy.XzRl3nJJRg.1E5NzUPj.1Rd7Svbm5qWTgx4gBFv4gK', NOW(), NOW()),
('USR002', 'Kumari Silva', 'kumari@gmail.com', '$2a$10$5cDQzmQh0OwJZt.tz8cFluRf0TfGLMI7KvZNCjQFWF2I3j/CmV.Ru', NOW(), NOW()),
('USR003', 'Nimal Fernando', 'nimal@gmail.com', '$2a$10$6hR9qJKP7qDxgW3gdf/9se0TFb6TGn6m5DSztYGhBJ9BdX/Onlx7i', NOW(), NOW()),
('USR004', 'Priyanka Jayawardena', 'priyanka@gmail.com', '$2a$10$7CnWd9XsUe2NbM/C1LZrLezrUfD.tQSVvP1OT0hJqy3RCgkVZcW96', NOW(), NOW()),
('USR005', 'Thilak Gunaratne', 'thilak@gmail.com', '$2a$10$9KnzFP.J3rgBEy8Qdl3tQuJw4uY55.jN8jnxQJR8l9q/2tYZNZpvi', NOW(), NOW());

-- Populate Announcements
INSERT INTO ANNOUNCEMENTS (AnnouncementID, AnnouncementTo, Title, Description, createdAt, updatedAt) VALUES
('ANN001', 'All', 'Schedule Changes for Poya Day', 'Please note that all train schedules will be adjusted on June 4th due to the Poson Full Moon Poya Day. Check the website for updated timings.', NOW(), NOW()),
('ANN002', 'JRN001', 'Delays on Colombo-Kandy Route', 'Due to maintenance work on the tracks, trains on the Colombo-Kandy route may experience delays of 15-20 minutes on June 10-12.', NOW(), NOW()),
('ANN003', 'All', 'Special Vesak Trains', 'Special trains will operate during Vesak week (May 22-28) to accommodate increased passenger traffic. Extra bookings available now.', NOW(), NOW()),
('ANN004', 'JRN005', 'Northern Line Renovation', 'The Northern Line will undergo renovations starting July 1st. Reduced service frequency should be expected for approximately 2 weeks.', NOW(), NOW()),
('ANN005', 'All', 'New Online Booking System', 'We are pleased to announce the launch of our new online booking system, making it easier to reserve train tickets from anywhere.', NOW(), NOW());

-- Populate Lost & Found Items
INSERT INTO ITEM (ItemID, Name, ItemType, Title, Description, ContactNo, Status, createdAt, updatedAt) VALUES
('ITM001', 'Saman Perera', 'Lost', 'Blue Backpack Lost on Udarata Menike', 'Lost my blue Reebok backpack on the Udarata Menike train on June 5th. Contains important documents and a laptop.', '0771234567', 'Not Approved', NOW(), NOW()),
('ITM002', 'Kamal Silva', 'Found', 'Mobile Phone Found at Kandy Station', 'Found a Samsung smartphone at Kandy station platform 2 on June 7th. Owner can identify by describing the phone case and lock screen.', '0712345678', 'Approved', NOW(), NOW()),
('ITM003', 'Nimali Fernando', 'Lost', 'Gold Bracelet Lost on Ruhunu Kumari', 'Lost a gold bracelet with sentimental value on the Ruhunu Kumari train on June 8th.', '0763456789', 'Approved', NOW(), NOW()),
('ITM004', 'Ruwan Bandara', 'Found', 'Wallet Found at Colombo Fort', 'Found a brown leather wallet near the ticket counter at Colombo Fort station on June 9th.', '0724567890', 'Approved', NOW(), NOW()),
('ITM005', 'Tharushi Perera', 'Lost', 'Prescription Glasses in Black Case', 'Lost my prescription glasses in a black case on the train from Colombo to Ella on June 10th.', '0775678901', 'Not Approved', NOW(), NOW());

-- Populate Reports
INSERT INTO REPORT (ReportID, Name, NIC, Type, Description, ClosestStation, createdAt, updatedAt) VALUES
('RPT001', 'Chaminda Fernando', '853456789V', 'Facility Issue', 'The washroom at Colombo Fort station platform 3 is out of order and needs immediate attention.', 'CMB001', NOW(), NOW()),
('RPT002', 'Gayani Jayasuriya', '912345678V', 'Service Complaint', 'The ticket counter at Kandy station was closed 30 minutes before the scheduled time on June 8th.', 'KDY002', NOW(), NOW()),
('RPT003', 'Lasantha Wickremasinghe', '875678123V', 'Safety Concern', 'There is a broken railway sleeper about 5km north of Anuradhapura station that needs repair.', 'ANU005', NOW(), NOW()),
('RPT004', 'Pradeep Kumara', '925678901V', 'Other', 'The announcement system at Galle station is not functioning properly, making it difficult to hear train information.', 'GLE003', NOW(), NOW()),
('RPT005', 'Dilrukshi Pathirana', '897890123V', 'Suggestion', 'Would like to suggest adding more benches at Ella station for the comfort of passengers waiting for trains.', 'ELL009', NOW(), NOW());