package TicketManager.Repository;

import TicketManager.Entity.EventDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface EvenntDetailRepository extends JpaRepository<EventDetail, UUID> {
    List<EventDetail> findByEventId(UUID eventId);
    Optional<EventDetail> findByEventIdAndNameImage(UUID eventId, String nameImage);
}

