CREATE TRIGGER update_subscription_active
BEFORE INSERT ON SUBSCRIPTION
FOR EACH ROW
BEGIN
    IF NEW.renewDate < CURDATE() THEN
        SET NEW.subcriptionActive = 0;
    END IF;
END;

mark_popular_song` AFTER INSERT ON `TRACK_LIKED` FOR EACH ROW BEGIN
    -- Log to debug
    INSERT INTO DEBUG_LOG (message) VALUES ('Trigger fired');

    -- Update the TRACK table to mark songs as popular based on the number of likes
    UPDATE TRACK t
    SET t.isPopular = 1
    WHERE t.trackID = NEW.trackID
    AND (SELECT COUNT(*) FROM TRACK_LIKED tl WHERE tl.trackID = t.trackID) >= 100;
END */;